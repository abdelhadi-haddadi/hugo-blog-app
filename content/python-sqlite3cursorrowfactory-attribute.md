+++
title = "Python sqlite3.Cursor.row_factory Attribute"
date = 2025-08-29T20:10:42.343+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.row_factory attribute covering row factories, custom row formats, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.row_factory Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.row_factory
attribute, which controls how SQLite rows are returned from queries. We'll cover
basic usage, built-in factories, custom implementations, and practical examples.

## Basic Definitions

The row_factory attribute of a sqlite3.Cursor determines
how result rows are formatted when returned from database queries. By default,
rows are returned as tuples.

Key characteristics: it accepts a callable that processes raw rows, can be set at
connection or cursor level, and enables named access to columns. This powerful
feature improves code readability and maintainability.

## Default Row Factory (Tuples)

By default, rows are returned as tuples with values accessible by index position.
This example demonstrates the default behavior.

default_factory.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.execute('CREATE TABLE users(id INTEGER, name TEXT)')
    conn.execute('INSERT INTO users VALUES(1, "Alice")')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users')
    row = cursor.fetchone()
    
    print(row)        # (1, 'Alice')
    print(row[0])     # 1 (access by index)
    print(row[1])     # 'Alice'

This shows the default tuple-based row format. While simple, accessing columns by
index can make code harder to read and maintain, especially with many columns.

The default is efficient but lacks named access to columns, which is where other
row factories become useful.

## Using sqlite3.Row Factory

The built-in sqlite3.Row factory provides named column access and
other useful features. This is the recommended approach for most use cases.

row_factory_builtin.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    conn.execute('CREATE TABLE books(id INTEGER, title TEXT, author TEXT)')
    conn.execute('INSERT INTO books VALUES(1, "Python Basics", "John Doe")')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM books')
    row = cursor.fetchone()
    
    print(row['title'])    # 'Python Basics'
    print(row['author'])   # 'John Doe'
    print(row.keys())      # ['id', 'title', 'author']

sqlite3.Row provides several advantages: column access by name,
case-insensitive names, and dictionary-like methods. It's more memory efficient
than custom dictionary factories.

This factory is ideal when you need named access to columns without the overhead
of creating full dictionaries for each row.

## Custom Dictionary Factory

You can create a custom factory that returns rows as dictionaries. This provides
maximum flexibility in row formatting.

dict_factory.py
  

import sqlite3

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = dict_factory
    conn.execute('CREATE TABLE products(id INTEGER, name TEXT, price REAL)')
    conn.execute('INSERT INTO products VALUES(1, "Laptop", 999.99)')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products')
    product = cursor.fetchone()
    
    print(product)          # {'id': 1, 'name': 'Laptop', 'price': 999.99}
    print(product['name'])  # 'Laptop'

This custom factory converts each row to a dictionary with column names as keys.
The cursor.description attribute provides column metadata.

Dictionary rows are convenient for JSON serialization or when you need full
dictionary functionality. However, they use more memory than sqlite3.Row.

## Named Tuple Factory

For a balance between readability and performance, you can use named tuples as
your row factory. This provides named access with less overhead than dictionaries.

namedtuple_factory.py
  

import sqlite3
from collections import namedtuple

def namedtuple_factory(cursor, row):
    fields = [col[0] for col in cursor.description]
    Row = namedtuple('Row', fields)
    return Row(*row)

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = namedtuple_factory
    conn.execute('CREATE TABLE employees(id INTEGER, name TEXT, department TEXT)')
    conn.execute('INSERT INTO employees VALUES(1, "Alice", "Engineering")')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM employees')
    employee = cursor.fetchone()
    
    print(employee)         # Row(id=1, name='Alice', department='Engineering')
    print(employee.name)    # 'Alice' (attribute access)
    print(employee[0])      # 1 (still supports index access)

This factory creates lightweight named tuple objects for each row. Named tuples
are immutable and memory efficient while providing dot-notation access.

This approach is excellent when you need both named access and tuple-like
behavior, especially in performance-sensitive applications.

## Connection vs Cursor Level Factory

Row factories can be set at either the connection or cursor level. This example
shows how to use different factories at different levels.

factory_levels.py
  

import sqlite3

def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

with sqlite3.connect(':memory:') as conn:
    # Set default factory for all cursors
    conn.row_factory = sqlite3.Row
    
    conn.execute('CREATE TABLE test(id INTEGER, data TEXT)')
    conn.execute('INSERT INTO test VALUES(1, "Connection level")')
    conn.execute('INSERT INTO test VALUES(2, "Cursor level")')
    
    # Default cursor uses connection's factory
    cursor1 = conn.cursor()
    cursor1.execute('SELECT * FROM test WHERE id = 1')
    row1 = cursor1.fetchone()
    print(row1['data'])  # 'Connection level'
    
    # Custom cursor overrides connection factory
    cursor2 = conn.cursor()
    cursor2.row_factory = dict_factory
    cursor2.execute('SELECT * FROM test WHERE id = 2')
    row2 = cursor2.fetchone()
    print(row2['data'])  # 'Cursor level'

Connection-level factories apply to all cursors by default, while cursor-level
factories override the connection setting. This allows flexible row formatting.

Use connection-level for consistency across queries and cursor-level when you
need different formats for specific queries.

## JSON Serialization Factory

For web applications, you might want rows formatted for easy JSON serialization.
This example shows a custom JSON-friendly factory.

json_factory.py
  

import sqlite3
import json
from datetime import datetime

def json_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        value = row[idx]
        if isinstance(value, datetime):
            value = value.isoformat()
        d[col[0]] = value
    return d

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = json_factory
    conn.execute('CREATE TABLE events(id INTEGER, name TEXT, created_at TEXT)')
    conn.execute('INSERT INTO events VALUES(1, "Launch", ?)', 
                (datetime.now().isoformat(),))
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM events')
    event = cursor.fetchone()
    
    print(json.dumps(event))  # {"id": 1, "name": "Launch", "created_at": "2025-04-15T..."}

This factory ensures all values are JSON-serializable, converting dates to ISO
format strings automatically. It's perfect for APIs that return database results.

Custom factories can handle any special formatting needs, making them powerful
tools for data transformation.

## Type Conversion Factory

Row factories can also perform type conversion. This example converts specific
columns to Python types automatically.

type_conversion.py
  

import sqlite3
import json

def convert_types(value):
    if value.startswith('{') and value.endswith('}'):
        try:
            return json.loads(value)
        except:
            return value
    return value

def type_aware_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        value = row[idx]
        if isinstance(value, str):
            value = convert_types(value)
        d[col[0]] = value
    return d

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = type_aware_factory
    conn.execute('CREATE TABLE config(id INTEGER, settings TEXT)')
    conn.execute('INSERT INTO config VALUES(1, \'{"theme":"dark"}\')')
    
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM config')
    config = cursor.fetchone()
    
    print(config['settings']['theme'])  # 'dark' (automatically parsed JSON)

This factory automatically detects and converts JSON strings to Python dicts. You
could extend it to handle dates, decimals, or other specialized formats.

Type conversion factories reduce boilerplate code by handling conversions at the
row level rather than in application logic.

## Best Practices

- **Prefer sqlite3.Row:** For most cases, it offers the best balance

- **Set at connection level:** For consistency across queries

- **Use custom factories sparingly:** They add overhead

- **Consider memory usage:** Dictionaries use more memory than tuples

- **Document your choices:** Especially when using custom factories

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