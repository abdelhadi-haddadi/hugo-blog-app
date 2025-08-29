+++
title = "Python sqlite3.Connection.create_aggregate Method"
date = 2025-08-29T20:10:30.968+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.create_aggregate method covering custom aggregate functions in SQLite."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.create_aggregate Method

Last modified April 15, 2025

This comprehensive guide explores Python's create_aggregate method,
which allows creating custom aggregate functions in SQLite. We'll cover the
method's parameters, implementation patterns, and practical examples.

## Basic Definitions

The create_aggregate method registers a Python callable as an SQL
aggregate function. Aggregate functions operate on multiple rows and return a
single result, like SUM or AVG.

Key characteristics: it requires a class with step and finalize
methods, persists for the connection's lifetime, and can handle multiple
parameters. The method expands SQLite's built-in aggregation capabilities.

## Basic Aggregate Function

This example shows how to create a simple aggregate function that calculates
the geometric mean of a set of numbers.

basic_aggregate.py
  

import sqlite3
import math

class GeometricMean:
    def __init__(self):
        self.product = 1
        self.count = 0

    def step(self, value):
        if value is not None:
            self.product *= value
            self.count += 1

    def finalize(self):
        if self.count == 0:
            return None
        return math.pow(self.product, 1/self.count)

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("geomean", 1, GeometricMean)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE data (value REAL)")
    cursor.executemany("INSERT INTO data VALUES (?)", [(2,), (8,), (32,)])
    
    cursor.execute("SELECT geomean(value) FROM data")
    result = cursor.fetchone()[0]
    print(f"Geometric mean: {result:.2f}")  # Output: 8.00

The GeometricMean class maintains state during aggregation. The
step method processes each row, while finalize
computes the final result. The function is registered with create_aggregate.

The example uses an in-memory database for simplicity. The aggregate function
works just like built-in SQL functions in queries.

## String Aggregation

This example demonstrates string aggregation, combining multiple strings with
a custom separator.

string_aggregate.py
  

import sqlite3

class StringAgg:
    def __init__(self):
        self.strings = []
        self.separator = ', '

    def step(self, value, separator=None):
        if separator is not None:
            self.separator = separator
        if value is not None:
            self.strings.append(str(value))

    def finalize(self):
        return self.separator.join(self.strings)

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("str_agg", -1, StringAgg)  # -1 for variable args
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE phrases (text TEXT)")
    data = [('Hello',), ('world',), ('from',), ('SQLite',)]
    cursor.executemany("INSERT INTO phrases VALUES (?)", data)
    
    cursor.execute("SELECT str_agg(text, ' | ') FROM phrases")
    result = cursor.fetchone()[0]
    print(result)  # Output: Hello | world | from | SQLite

The StringAgg class handles variable arguments by checking for an
optional separator parameter. The -1 in create_aggregate
allows variable number of arguments.

This pattern is useful for creating custom string aggregation functions when
SQLite's built-in group_concat isn't sufficient.

## Statistical Mode Calculation

This example implements a statistical mode aggregate function that finds the
most frequent value in a dataset.

mode_aggregate.py
  

import sqlite3
from collections import defaultdict

class Mode:
    def __init__(self):
        self.frequencies = defaultdict(int)
        self.max_count = 0
        self.mode_value = None

    def step(self, value):
        if value is not None:
            self.frequencies[value] += 1
            if self.frequencies[value] &gt; self.max_count:
                self.max_count = self.frequencies[value]
                self.mode_value = value

    def finalize(self):
        return self.mode_value

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("mode", 1, Mode)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE numbers (num INTEGER)")
    data = [(7,), (3,), (7,), (1,), (3,), (7,), (5,)]
    cursor.executemany("INSERT INTO numbers VALUES (?)", data)
    
    cursor.execute("SELECT mode(num) FROM numbers")
    result = cursor.fetchone()[0]
    print(f"Mode: {result}")  # Output: 7

The Mode class uses a dictionary to track value frequencies. The
step method updates counts, while finalize returns
the most frequent value.

This demonstrates how to maintain complex state during aggregation and implement
statistical functions not natively available in SQLite.

## Range Calculation

This example creates an aggregate function that calculates the range (max - min)
of a set of numbers.

range_aggregate.py
  

import sqlite3

class Range:
    def __init__(self):
        self.min_val = None
        self.max_val = None

    def step(self, value):
        if value is not None:
            if self.min_val is None or value &lt; self.min_val:
                self.min_val = value
            if self.max_val is None or value &gt; self.max_val:
                self.max_val = value

    def finalize(self):
        if self.min_val is None or self.max_val is None:
            return None
        return self.max_val - self.min_val

with sqlite3.connect('example.db') as conn:
    conn.create_aggregate("calc_range", 1, Range)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE IF NOT EXISTS measurements (value REAL)")
    cursor.executemany("INSERT INTO measurements VALUES (?)", 
                      [(12.5,), (18.3,), (15.1,), (22.7,), (14.9,)])
    
    cursor.execute("SELECT calc_range(value) FROM measurements")
    result = cursor.fetchone()[0]
    print(f"Range: {result:.1f}")  # Output: 10.2

The Range class tracks minimum and maximum values during processing.
The finalize method computes the difference between them.

This example shows how to create domain-specific aggregate functions that
encapsulate complex calculations in reusable SQL functions.

## Weighted Average

This example implements a weighted average aggregate function that takes values
and weights as parameters.

weighted_avg.py
  

import sqlite3

class WeightedAvg:
    def __init__(self):
        self.total = 0.0
        self.weights_sum = 0.0

    def step(self, value, weight):
        if value is not None and weight is not None:
            self.total += value * weight
            self.weights_sum += weight

    def finalize(self):
        if self.weights_sum == 0:
            return None
        return self.total / self.weights_sum

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("weighted_avg", 2, WeightedAvg)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE scores (score REAL, weight REAL)")
    data = [(85, 0.2), (90, 0.3), (78, 0.5)]
    cursor.executemany("INSERT INTO scores VALUES (?, ?)", data)
    
    cursor.execute("SELECT weighted_avg(score, weight) FROM scores")
    result = cursor.fetchone()[0]
    print(f"Weighted average: {result:.2f}")  # Output: 83.60

The WeightedAvg class handles two parameters per row. It maintains
running totals for the calculation, demonstrating multi-parameter aggregation.

This pattern is useful for financial calculations, grading systems, or any
scenario requiring weighted measurements.

## JSON Array Aggregation

This example creates an aggregate function that builds a JSON array from
column values.

json_aggregate.py
  

import sqlite3
import json

class JSONArray:
    def __init__(self):
        self.items = []

    def step(self, value):
        if value is not None:
            self.items.append(value)

    def finalize(self):
        return json.dumps(self.items)

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("json_array", 1, JSONArray)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE colors (name TEXT)")
    cursor.executemany("INSERT INTO colors VALUES (?)", 
                      [('red',), ('green',), ('blue',)])
    
    cursor.execute("SELECT json_array(name) FROM colors")
    result = cursor.fetchone()[0]
    print(result)  # Output: ["red", "green", "blue"]

The JSONArray class collects values into a list and converts them
to a JSON string. This demonstrates how to create custom serialization formats.

This technique is particularly useful when working with applications that
consume JSON data, providing direct database-to-JSON transformation.

## First/Last Aggregate Functions

This example implements FIRST and LAST aggregate functions that return the
first and last values in a group.

first_last.py
  

import sqlite3

class First:
    def __init__(self):
        self.first_value = None
        self.first_set = False

    def step(self, value):
        if not self.first_set and value is not None:
            self.first_value = value
            self.first_set = True

    def finalize(self):
        return self.first_value

class Last:
    def __init__(self):
        self.last_value = None

    def step(self, value):
        if value is not None:
            self.last_value = value

    def finalize(self):
        return self.last_value

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("first", 1, First)
    conn.create_aggregate("last", 1, Last)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE events (ts TEXT, event TEXT)")
    data = [
        ('2023-01-01 08:00', 'start'),
        ('2023-01-01 09:30', 'progress'),
        ('2023-01-01 12:00', 'complete')
    ]
    cursor.executemany("INSERT INTO events VALUES (?, ?)", data)
    
    cursor.execute("SELECT first(event), last(event) FROM events")
    first, last = cursor.fetchone()
    print(f"First: {first}, Last: {last}")  # Output: First: start, Last: complete

The First class captures the first non-NULL value it encounters,
while Last keeps updating to the most recent value. Both are
registered as separate aggregate functions.

These functions are useful for time-series data analysis, providing easy access
to boundary values without complex window functions.

## Best Practices

- **Initialize state properly:** Clean initialization prevents issues between calls

- **Handle NULL values:** Check for None in step methods

- **Use appropriate parameter counts:** Specify correct num_params or use -1

- **Keep state minimal:** Store only what's needed for final calculation

- **Document behavior:** Clearly document your aggregate functions

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Aggregate Functions](https://www.sqlite.org/lang_aggfunc.html)

- [SQLite Application-Defined Functions](https://www.sqlite.org/appfunc.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).