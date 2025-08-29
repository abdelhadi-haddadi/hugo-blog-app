+++
title = "Python sqlite3.Connection.row_factory"
date = 2025-08-29T20:10:35.434+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.row_factory attribute covering row factories, custom factories, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.row_factory

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.row_factory
attribute, which controls how rows are returned from SQLite queries. We'll cover
basic usage, built-in factories, custom factories, and practical examples.

## Basic Definitions

The row_factory attribute of a SQLite connection determines how
result rows are returned from cursor operations. By default, rows are returned
as tuples.

Key characteristics: it accepts a callable that processes each row, can be
changed at any time, and affects all cursors created from the connection.
The factory receives cursor and row tuple as arguments.

## Default Row Factory (Tuples)

By default, rows are returned as tuples. This example demonstrates the default
behavior without setting any row factory.

default_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE test (id INTEGER, name TEXT)")
    conn.execute("INSERT INTO test VALUES (1, 'Alice')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM test")
    row = cursor.fetchone()
    
    print(type(row))  # &lt;class 'tuple'&gt;
    print(row[0], row[1])  # Access by index

This example shows the default behavior where rows are returned as tuples.
Access to column values is done by numeric index (0 for first column).

The tuple format is simple and memory-efficient but less readable than named
access, especially with many columns or when schema changes.

## Using sqlite3.Row Factory

The sqlite3.Row factory provides named access to columns and other
useful features. This is the recommended built-in factory.

row_factory_builtin.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    conn.execute("CREATE TABLE users (id INTEGER, name TEXT, age INTEGER)")
    conn.execute("INSERT INTO users VALUES (1, 'Bob', 35)")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    row = cursor.fetchone()
    
    print(row['name'])  # Access by name
    print(row.keys())   # Column names
    print(row[1])      # Still accessible by index

This example demonstrates using sqlite3.Row which provides several
advantages over tuples. Columns can be accessed by name or index.

Additional features include: keys method to get column names,
support for equality comparison, and string representation showing values.

## Custom Dictionary Factory

You can create a custom factory that returns rows as dictionaries for more
flexibility. This example shows a simple dictionary factory.

dict_factory.py
  

import sqlite3

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = dict_factory
    conn.execute("CREATE TABLE products (id INTEGER, name TEXT, price REAL)")
    conn.execute("INSERT INTO products VALUES (1, 'Laptop', 999.99)")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    row = cursor.fetchone()
    
    print(row['name'], row['price'])  # Access by name
    print(row)  # Full dictionary

This custom factory converts each row to a dictionary where keys are column names
and values are the row values. The cursor.description provides
column metadata.

Dictionary access is very readable and flexible, though slightly more memory
intensive than tuples. It's especially useful when working with many columns.

## Named Tuple Factory

For a balance between readability and performance, you can use named tuples.
This example creates a factory using collections.namedtuple.

namedtuple_factory.py
  

import sqlite3
from collections import namedtuple

def namedtuple_factory(cursor, row):
    fields = [col[0] for col in cursor.description]
    Row = namedtuple('Row', fields)
    return Row(*row)

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = namedtuple_factory
    conn.execute("CREATE TABLE employees (id INTEGER, name TEXT, department TEXT)")
    conn.execute("INSERT INTO employees VALUES (1, 'Carol', 'HR')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM employees")
    row = cursor.fetchone()
    
    print(row.name, row.department)  # Access by attribute
    print(row[0], row[1])           # Still accessible by index

This factory creates a named tuple class dynamically for each query result.
Named tuples provide attribute-style access while maintaining tuple performance.

The advantage is clean, readable code with minimal memory overhead compared to
dictionaries. The named tuple class is created once per query.

## Type Conversion Factory

A row factory can also perform type conversion. This example converts specific
columns to Python types automatically.

type_conversion_factory.py
  

import sqlite3
from datetime import datetime

def convert_types(row):
    converted = []
    for value in row:
        if isinstance(value, str) and value.startswith('date:'):
            converted.append(datetime.strptime(value[5:], '%Y-%m-%d').date())
        else:
            converted.append(value)
    return converted

def type_aware_factory(cursor, row):
    row = convert_types(row)
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = type_aware_factory
    conn.execute("CREATE TABLE events (id INTEGER, name TEXT, event_date TEXT)")
    conn.execute("INSERT INTO events VALUES (1, 'Meeting', 'date:2025-04-15')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM events")
    row = cursor.fetchone()
    
    print(type(row['event_date']))  # &lt;class 'datetime.date'&gt;
    print(row['event_date'].year)  # 2025

This advanced factory detects special string patterns (like 'date:YYYY-MM-DD')
and converts them to Python date objects automatically.

Such factories are useful when you need consistent type handling across your
application or when working with custom SQLite type adapters.

## Case-Insensitive Dictionary Factory

For case-insensitive column access, you can modify the dictionary factory.
This example shows a factory that normalizes column names to lowercase.

case_insensitive_factory.py
  

import sqlite3

def case_insensitive_factory(cursor, row):
    return {col[0].lower(): row[idx] for idx, col in enumerate(cursor.description)}

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = case_insensitive_factory
    conn.execute("CREATE TABLE books (ID INTEGER, Title TEXT, Author TEXT)")
    conn.execute("INSERT INTO books VALUES (1, 'Python Guide', 'J. Smith')")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM books")
    row = cursor.fetchone()
    
    # All these work regardless of original case
    print(row['id'], row['title'], row['author'])
    print(row['ID'], row['Title'], row['Author'])
    print(row['Id'], row['tiTle'], row['AUTHOR'])

This factory normalizes all column names to lowercase in the returned dictionary,
making column access case-insensitive while preserving the original values.

This is particularly helpful when working with databases that have inconsistent
column naming conventions or when you want to standardize access patterns.

## Custom Class Factory

For maximum control, you can return custom class instances. This example creates
a factory that returns objects with both attribute and dictionary access.

class_factory.py
  

import sqlite3

class Record:
    def __init__(self, data):
        self._data = data
    
    def __getattr__(self, name):
        try:
            return self._data[name]
        except KeyError:
            raise AttributeError(f"No such attribute: {name}")
    
    def __getitem__(self, key):
        return self._data[key]
    
    def __repr__(self):
        return f"Record({self._data})"

def class_factory(cursor, row):
    data = {col[0]: row[idx] for idx, col in enumerate(cursor.description)}
    return Record(data)

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = class_factory
    conn.execute("CREATE TABLE inventory (item_id INTEGER, item_name TEXT, quantity INTEGER)")
    conn.execute("INSERT INTO inventory VALUES (101, 'Keyboard', 15)")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM inventory")
    row = cursor.fetchone()
    
    print(row.item_name)    # Attribute access
    print(row['quantity'])  # Dictionary access
    print(row)              # Custom representation

This factory returns instances of a custom Record class that supports
both attribute-style and dictionary-style access to column values.

Custom class factories provide the most flexibility, allowing you to add methods,
properties, and other behaviors to your result objects.

## Best Practices

- **Prefer sqlite3.Row:** For most cases, it provides the best balance

- **Consider memory usage:** Named tuples use less memory than dictionaries

- **Document your factories:** Especially when using custom ones

- **Set factory early:** Before executing queries that need it

- **Reuse factories:** Create them once and reuse across connections

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Column Metadata](https://www.sqlite.org/c3ref/column_name.html)

- [Python namedtuple](https://docs.python.org/3/library/collections.html#collections.namedtuple)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).