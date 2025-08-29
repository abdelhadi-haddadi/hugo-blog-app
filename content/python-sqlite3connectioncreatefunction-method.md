+++
title = "Python sqlite3.Connection.create_function Method"
date = 2025-08-29T20:10:32.094+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.create_function method covering custom SQL functions, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.create_function Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.create_function method,
which allows registering Python functions as SQL functions in SQLite databases.

## Basic Definitions

The create_function method registers a Python function as an SQL function.
This function can then be called from SQL statements. It's part of the SQLite
connection object.

Key characteristics: it binds Python functions to SQL names, supports variable
argument counts, and maintains type consistency between Python and SQLite.

## Basic Function Registration

This example shows how to register a simple Python function as an SQL function.

basic_function.py
  

import sqlite3

def square(x):
    return x * x

with sqlite3.connect(':memory:') as conn:
    conn.create_function('square', 1, square)
    
    cursor = conn.cursor()
    cursor.execute("SELECT square(5)")
    result = cursor.fetchone()
    print(result[0])  # Output: 25

The create_function takes three arguments: SQL function name,
number of arguments, and Python function. Here we register square
as an SQL function.

The registered function can then be called in SQL queries just like built-in
SQL functions. The connection automatically manages the function's lifetime.

## String Manipulation Function

This example demonstrates registering a string manipulation function.

string_function.py
  

import sqlite3

def reverse_string(s):
    return s[::-1]

with sqlite3.connect(':memory:') as conn:
    conn.create_function('reverse', 1, reverse_string)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE words (word TEXT)")
    cursor.execute("INSERT INTO words VALUES ('hello'), ('world')")
    
    cursor.execute("SELECT word, reverse(word) FROM words")
    for word, reversed_word in cursor:
        print(f"{word} -&gt; {reversed_word}")

The reverse_string function takes a string and returns it reversed.
We register it with SQL name reverse and use it in a SELECT query.

This shows how Python's string manipulation capabilities can be exposed to SQL,
extending SQLite's functionality beyond its built-in functions.

## Function with Multiple Parameters

This example shows a function that takes multiple parameters.

multi_param_function.py
  

import sqlite3

def power(base, exponent):
    return base ** exponent

with sqlite3.connect(':memory:') as conn:
    conn.create_function('power', 2, power)
    
    cursor = conn.cursor()
    cursor.execute("SELECT power(2, 3), power(5, 2)")
    results = cursor.fetchone()
    print(f"2^3 = {results[0]}, 5^2 = {results[1]}")

The power function takes two arguments and returns the first
argument raised to the power of the second. We register it with 2 parameters.

When calling the function in SQL, we pass two arguments. The function works
just like a built-in SQL function with multiple parameters.

## Variable Number of Arguments

SQLite supports functions with a variable number of arguments. Here's how to
implement one.

varargs_function.py
  

import sqlite3

def concatenate(*args):
    return ''.join(str(arg) for arg in args)

with sqlite3.connect(':memory:') as conn:
    conn.create_function('concat', -1, concatenate)
    
    cursor = conn.cursor()
    cursor.execute("SELECT concat('Hello', ' ', 'World', '!')")
    print(cursor.fetchone()[0])  # Output: Hello World!
    
    cursor.execute("SELECT concat(1, 2, 3)")
    print(cursor.fetchone()[0])  # Output: 123

Using -1 as the parameter count indicates a variable number of
arguments. The Python function receives them as a tuple.

This example concatenates all arguments into a single string, regardless of
how many are provided. The function handles both strings and numbers.

## Function with Database Context

Functions can access database context for more advanced operations.

context_function.py
  

import sqlite3

def count_rows(table_name):
    cursor = conn.cursor()
    cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
    return cursor.fetchone()[0]

with sqlite3.connect(':memory:') as conn:
    conn.create_function('rowcount', 1, count_rows)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE users (id INTEGER, name TEXT)")
    cursor.execute("INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')")
    
    cursor.execute("SELECT rowcount('users')")
    print(f"Row count: {cursor.fetchone()[0]}")  # Output: Row count: 2

This example shows a function that queries the database. Note that we use
the connection object from the outer scope inside our function.

Be cautious with such functions to avoid SQL injection (as shown here with
direct table name interpolation). Always validate inputs.

## Aggregate Function

SQLite supports custom aggregate functions. Here's a simple example.

aggregate_function.py
  

import sqlite3

class GeometricMean:
    def __init__(self):
        self.product = 1.0
        self.count = 0
    
    def step(self, value):
        self.product *= value
        self.count += 1
    
    def finalize(self):
        return self.product ** (1.0 / self.count) if self.count else 0.0

with sqlite3.connect(':memory:') as conn:
    conn.create_aggregate("geom_mean", 1, GeometricMean)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE numbers (value REAL)")
    cursor.execute("INSERT INTO numbers VALUES (2), (8), (32)")
    
    cursor.execute("SELECT geom_mean(value) FROM numbers")
    result = cursor.fetchone()[0]
    print(f"Geometric mean: {result:.2f}")  # Output: Geometric mean: 8.00

Aggregate functions require a class with step and finalize
methods. step processes each row, finalize returns the result.

This example calculates the geometric mean of a set of numbers, demonstrating
how to implement custom aggregation in SQLite.

## Window Function

SQLite also supports window functions. Here's a simple moving average example.

window_function.py
  

import sqlite3

class MovingAverage:
    def __init__(self):
        self.window = []
    
    def step(self, value, size):
        self.window.append(value)
        if len(self.window) &gt; size:
            self.window.pop(0)
        return sum(self.window) / len(self.window) if self.window else 0.0
    
    def finalize(self):
        return None  # Not used for window functions

with sqlite3.connect(':memory:') as conn:
    conn.create_window_function("moving_avg", 2, MovingAverage)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE stock_prices (day INTEGER, price REAL)")
    cursor.executemany("INSERT INTO stock_prices VALUES (?, ?)",
                      [(1, 10), (2, 12), (3, 15), (4, 14), (5, 16)])
    
    cursor.execute("""
        SELECT day, price, 
               moving_avg(price, 3) OVER (ORDER BY day) AS avg_price
        FROM stock_prices
    """)
    
    for row in cursor:
        print(f"Day {row[0]}: Price={row[1]}, Avg={row[2]:.2f}")

Window functions are similar to aggregates but operate on a sliding window of
rows. They're registered with create_window_function.

This example calculates a 3-day moving average of stock prices, showing how
to implement custom window functions in SQLite.

## Best Practices

- **Validate inputs:** Custom functions should validate their inputs

- **Handle errors:** Raise proper exceptions for invalid operations

- **Consider performance:** Complex Python functions may slow queries

- **Use transactions:** Wrap function calls in transactions when needed

- **Document functions:** Clearly document custom SQL functions

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Application-Defined Functions](https://www.sqlite.org/appfunc.html)

- [SQLite Window Functions](https://www.sqlite.org/windowfunctions.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).