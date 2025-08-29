+++
title = "Python sqlite3.PARSE_DECLTYPES Constant"
date = 2025-08-29T20:10:46.805+01:00
draft = false
description = "Complete guide to Python's sqlite3.PARSE_DECLTYPES constant covering type conversion, usage patterns, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.PARSE_DECLTYPES Constant

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.PARSE_DECLTYPES
constant, which enables automatic type conversion when retrieving data from SQLite
databases. We'll cover its usage, benefits, and practical examples.

## Basic Definitions

The sqlite3.PARSE_DECLTYPES constant is used with sqlite3.connect
to enable type conversion based on column declarations. When set, SQLite will
attempt to convert values to Python types matching the column's declared type.

Key characteristics: it works with the detect_types parameter,
supports standard Python types like datetime.date, and requires
proper column type declarations in table definitions.

## Basic Usage with PARSE_DECLTYPES

Here's a simple example demonstrating how to use PARSE_DECLTYPES
for automatic type conversion of date values.

basic_parse_decltypes.py
  

import sqlite3
import datetime

# Connect with PARSE_DECLTYPES enabled
with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    # Create table with DATE type declaration
    cursor.execute('''CREATE TABLE events
                      (id INTEGER PRIMARY KEY, name TEXT, event_date DATE)''')
    
    # Insert current date
    today = datetime.date.today()
    cursor.execute("INSERT INTO events (name, event_date) VALUES (?, ?)",
                  ('Meeting', today))
    
    # Retrieve and verify type
    cursor.execute("SELECT event_date FROM events")
    retrieved_date = cursor.fetchone()[0]
    print(f"Type of retrieved date: {type(retrieved_date)}")  # datetime.date
    print(f"Date matches original: {retrieved_date == today}")  # True

This example shows how PARSE_DECLTYPES automatically converts SQLite
DATE values to Python datetime.date objects. The conversion happens
during data retrieval.

Note the importance of declaring column types properly (DATE in this case) for
the conversion to work correctly. Without the type declaration, no conversion
would occur.

## Working with DATETIME Values

PARSE_DECLTYPES can also handle datetime values when properly
declared in the table schema.

datetime_example.py
  

import sqlite3
from datetime import datetime

with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    # Create table with TIMESTAMP type declaration
    cursor.execute('''CREATE TABLE logs
                      (id INTEGER PRIMARY KEY, message TEXT, 
                       created_at TIMESTAMP)''')
    
    # Insert current datetime
    now = datetime.now()
    cursor.execute("INSERT INTO logs (message, created_at) VALUES (?, ?)",
                  ('System started', now))
    
    # Retrieve and verify datetime
    cursor.execute("SELECT created_at FROM logs")
    retrieved_dt = cursor.fetchone()[0]
    print(f"Type: {type(retrieved_dt)}")  # datetime.datetime
    print(f"Value: {retrieved_dt}")
    print(f"Microseconds preserved: {retrieved_dt.microsecond == now.microsecond}")

This example demonstrates automatic conversion of TIMESTAMP columns to Python
datetime.datetime objects. The conversion preserves all datetime
components including microseconds.

The key requirement is declaring the column as TIMESTAMP in the table schema.
Other declarations like DATETIME would also work for this conversion.

## Combining with PARSE_COLNAMES

PARSE_DECLTYPES can be combined with PARSE_COLNAMES for
more flexible type conversion scenarios.

combined_parsing.py
  

import sqlite3
from decimal import Decimal

# Register converter for DECIMAL type
sqlite3.register_converter("DECIMAL", lambda x: Decimal(x.decode('utf-8')))

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    
    # Create table with mixed types
    cursor.execute('''CREATE TABLE products
                      (id INTEGER PRIMARY KEY, name TEXT, 
                       price DECIMAL, weight REAL)''')
    
    # Insert data with decimal value
    cursor.execute("INSERT INTO products (name, price, weight) VALUES (?, ?, ?)",
                  ('Laptop', '1299.99', 2.5))
    
    # Query with type hints in column names
    cursor.execute('''SELECT price AS "price [DECIMAL]", 
                             weight AS "weight [REAL]" 
                      FROM products''')
    
    product = cursor.fetchone()
    print(f"Price type: {type(product[0])}")  # decimal.Decimal
    print(f"Weight type: {type(product[1])}")  # float

This example shows how to combine both parsing modes. PARSE_DECLTYPES
handles the DECIMAL type from column declarations, while PARSE_COLNAMES
allows type hints in queries.

We also demonstrate registering a custom converter for the DECIMAL type, which
converts string values to Python Decimal objects.

## Handling NULL Values

PARSE_DECLTYPES properly handles NULL values without conversion
attempts, maintaining Python's None for database NULLs.

null_handling.py
  

import sqlite3
from datetime import date

with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE tasks
                      (id INTEGER PRIMARY KEY, description TEXT, 
                       due_date DATE, completed DATE)''')
    
    # Insert data with NULL date
    cursor.execute('''INSERT INTO tasks (description, due_date, completed)
                      VALUES (?, ?, ?)''',
                  ('Write report', date(2025, 6, 15), None))
    
    # Retrieve and check NULL handling
    cursor.execute("SELECT due_date, completed FROM tasks")
    due, completed = cursor.fetchone()
    
    print(f"Due date type: {type(due)}")  # datetime.date
    print(f"Completed type: {type(completed)}")  # NoneType
    print(f"Is completed None: {completed is None}")  # True

This example demonstrates that NULL values in typed columns remain as Python
None when retrieved, even for columns declared with DATE type.

The type conversion only occurs for non-NULL values, making the behavior safe
for nullable columns in your database schema.

## Custom Type Conversion

You can register custom converters to extend PARSE_DECLTYPES for
your own Python types.

custom_converter.py
  

import sqlite3
import json
from typing import Dict

# Define custom type and converter
def dict_converter(value: bytes) -&gt; Dict:
    return json.loads(value.decode('utf-8'))

# Register the converter
sqlite3.register_converter("JSON", dict_converter)

with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    # Create table with JSON type
    cursor.execute('''CREATE TABLE configs
                      (id INTEGER PRIMARY KEY, name TEXT, settings JSON)''')
    
    # Insert dictionary as JSON
    settings = {'theme': 'dark', 'notifications': True, 'timeout': 30}
    cursor.execute("INSERT INTO configs (name, settings) VALUES (?, ?)",
                  ('User Preferences', json.dumps(settings)))
    
    # Retrieve and verify automatic conversion
    cursor.execute("SELECT settings FROM configs")
    retrieved = cursor.fetchone()[0]
    print(f"Type: {type(retrieved)}")  # dict
    print(f"Theme: {retrieved['theme']}")  # dark
    print(f"Original == Retrieved: {settings == retrieved}")  # True

This example shows how to handle JSON data in SQLite by registering a custom
converter. The JSON column type is automatically converted to Python dictionaries.

The converter function receives the value as bytes and must return the converted
Python object. Here we use JSON serialization for the conversion.

## Working with Time Values

PARSE_DECLTYPES can also convert TIME columns to Python
datetime.time objects.

time_conversion.py
  

import sqlite3
from datetime import time

with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    # Create table with TIME type
    cursor.execute('''CREATE TABLE schedule
                      (id INTEGER PRIMARY KEY, event TEXT, 
                       start_time TIME, end_time TIME)''')
    
    # Insert time values
    start = time(9, 30)
    end = time(17, 0)
    cursor.execute('''INSERT INTO schedule (event, start_time, end_time)
                      VALUES (?, ?, ?)''',
                  ('Workday', start, end))
    
    # Retrieve and verify times
    cursor.execute("SELECT start_time, end_time FROM schedule")
    retrieved_start, retrieved_end = cursor.fetchone()
    
    print(f"Start type: {type(retrieved_start)}")  # datetime.time
    print(f"End type: {type(retrieved_end)}")  # datetime.time
    print(f"Start matches: {retrieved_start == start}")  # True
    print(f"End matches: {retrieved_end == end}")  # True

This example demonstrates automatic conversion of TIME columns to Python
datetime.time objects. The conversion preserves all time components.

As with other temporal types, the column must be properly declared as TIME in
the table schema for the conversion to work automatically.

## Best Practices

- **Always declare column types:** PARSE_DECLTYPES relies on proper type declarations

- **Register custom converters:** Extend functionality for your specific needs

- **Handle NULLs properly:** Test with nullable columns

- **Combine with PARSE_COLNAMES:** For maximum flexibility

- **Document type conversions:** Make the behavior clear in your codebase

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

- [SQLite CREATE TABLE](https://www.sqlite.org/lang_createtable.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).