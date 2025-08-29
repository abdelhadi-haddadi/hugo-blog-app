+++
title = "Python sqlite3.register_adapter Function"
date = 2025-08-29T20:10:47.909+01:00
draft = false
description = "Complete guide to Python's sqlite3.register_adapter function covering custom type adapters, usage patterns, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.register_adapter Function

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.register_adapter
function, which enables custom Python types to be stored in SQLite databases.

## Basic Definitions

The sqlite3.register_adapter function registers a callable to adapt
Python objects to SQLite-compatible types. It converts custom Python types to
one of SQLite's supported types (TEXT, INTEGER, REAL, BLOB, or NULL).

Key characteristics: it takes a Python type and an adapter function, works
globally for all connections, and enables seamless storage of custom objects.
The adapter function must return a compatible SQLite type.

## Basic Adapter Registration

This example shows how to register a simple adapter for a custom class to store
it as TEXT in SQLite.

basic_adapter.py
  

import sqlite3

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def adapt_point(point):
    return f"{point.x};{point.y}"

# Register the adapter
sqlite3.register_adapter(Point, adapt_point)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE points (id INTEGER PRIMARY KEY, coord TEXT)")
    
    p = Point(10, 20)
    conn.execute("INSERT INTO points (coord) VALUES (?)", (p,))
    
    row = conn.execute("SELECT coord FROM points").fetchone()
    print(row[0])  # Output: "10;20"

The adapter converts the Point object to a string format when storing in SQLite.
The conversion happens automatically when inserting the Point object.

Note that we didn't need to manually call the adapter function - SQLite handles
this automatically for registered types.

## Adapter with Custom Class

This example demonstrates adapting a more complex custom class to store in SQLite.

class_adapter.py
  

import sqlite3
from datetime import datetime

class Event:
    def __init__(self, name, date, attendees):
        self.name = name
        self.date = date
        self.attendees = attendees

def adapt_event(event):
    return f"{event.name}|{event.date.isoformat()}|{','.join(event.attendees)}"

sqlite3.register_adapter(Event, adapt_event)

with sqlite3.connect("events.db") as conn:
    conn.execute("""CREATE TABLE IF NOT EXISTS events
                    (id INTEGER PRIMARY KEY, details TEXT)""")
    
    meeting = Event("Team Meeting", datetime(2023, 6, 15), ["Alice", "Bob"])
    conn.execute("INSERT INTO events (details) VALUES (?)", (meeting,))
    conn.commit()
    
    row = conn.execute("SELECT details FROM events").fetchone()
    print(row[0])  # Output: "Team Meeting|2023-06-15T00:00:00|Alice,Bob"

The Event object is converted to a pipe-separated string containing all its
attributes. The datetime is converted to ISO format for consistent storage.

This pattern allows storing complex objects while maintaining human-readable
format in the database.

## Adapter Returning Different SQLite Types

Adapters can return different SQLite types based on the object's state. This
example shows an adapter that returns either TEXT or INTEGER.

multi_type_adapter.py
  

import sqlite3

class Measurement:
    def __init__(self, value, is_numeric):
        self.value = value
        self.is_numeric = is_numeric

def adapt_measurement(m):
    return m.value if m.is_numeric else str(m.value)

sqlite3.register_adapter(Measurement, adapt_measurement)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE data (num_val INTEGER, text_val TEXT)")
    
    m1 = Measurement(42, True)
    m2 = Measurement("High", False)
    
    conn.execute("INSERT INTO data VALUES (?, NULL)", (m1,))
    conn.execute("INSERT INTO data VALUES (NULL, ?)", (m2,))
    
    for row in conn.execute("SELECT * FROM data"):
        print(row)  # Output: (42, None) and (None, 'High')

The adapter checks the is_numeric flag to determine whether to
return the value as-is (for INTEGER) or as string (for TEXT).

This flexibility allows adapting the same Python type to different SQLite types
based on context.

## Adapter with JSON Serialization

For complex objects, JSON provides a convenient serialization format. This
example uses json.dumps in the adapter.

json_adapter.py
  

import sqlite3
import json

class Product:
    def __init__(self, id, name, specs):
        self.id = id
        self.name = name
        self.specs = specs

def adapt_product(product):
    return json.dumps({
        "id": product.id,
        "name": product.name,
        "specs": product.specs
    })

sqlite3.register_adapter(Product, adapt_product)

with sqlite3.connect("products.db") as conn:
    conn.execute("CREATE TABLE products (data TEXT)")
    
    p = Product(101, "Laptop", {"cpu": "i7", "ram": "16GB"})
    conn.execute("INSERT INTO products VALUES (?)", (p,))
    
    row = conn.execute("SELECT data FROM products").fetchone()
    print(row[0])  # Output: JSON string

The adapter converts the Product object to a JSON string containing all its
attributes. This approach handles nested structures well.

JSON is particularly useful when the object structure might change or contains
complex nested data.

## Adapter for Binary Data

This example shows how to adapt objects to SQLite BLOB type for binary storage.

blob_adapter.py
  

import sqlite3
import pickle

class BinaryData:
    def __init__(self, data):
        self.data = data

def adapt_binary_data(bd):
    return pickle.dumps(bd.data)

sqlite3.register_adapter(BinaryData, adapt_binary_data)

with sqlite3.connect("binary.db") as conn:
    conn.execute("CREATE TABLE binary_store (id INTEGER PRIMARY KEY, data BLOB)")
    
    bd = BinaryData([1, 2, 3, 4, 5])
    conn.execute("INSERT INTO binary_store (data) VALUES (?)", (bd,))
    
    row = conn.execute("SELECT data FROM binary_store").fetchone()
    loaded = pickle.loads(row[0])
    print(loaded)  # Output: [1, 2, 3, 4, 5]

The adapter uses pickle to serialize the data to bytes, which SQLite stores as
BLOB. This is useful for arbitrary Python objects.

Note that pickle has security implications - only unpickle data from trusted
sources.

## Adapter with Database-Specific Formatting

This example demonstrates an adapter that formats data specifically for database
storage, including proper escaping.

db_format_adapter.py
  

import sqlite3
import re

class SQLFormattedText:
    def __init__(self, text):
        self.text = text

def adapt_sql_text(st):
    # Escape single quotes by doubling them for SQL
    escaped = st.text.replace("'", "''")
    # Remove control characters
    cleaned = re.sub(r'[\x00-\x1f\x7f]', '', escaped)
    return cleaned

sqlite3.register_adapter(SQLFormattedText, adapt_sql_text)

with sqlite3.connect("text.db") as conn:
    conn.execute("CREATE TABLE documents (content TEXT)")
    
    text = SQLFormattedText("Don't forget to escape this!")
    conn.execute("INSERT INTO documents VALUES (?)", (text,))
    
    row = conn.execute("SELECT content FROM documents").fetchone()
    print(row[0])  # Output: Don''t forget to escape this!

The adapter performs SQL-specific formatting by escaping quotes and removing
control characters. This makes the data safe for SQL insertion.

This pattern is useful when you need to ensure database-safe formatting while
keeping the original object clean.

## Adapter with Type Conversion

This example shows an adapter that converts between Python and SQLite types with
validation.

type_conversion_adapter.py
  

import sqlite3
from decimal import Decimal

class Money:
    def __init__(self, amount, currency):
        if not isinstance(amount, Decimal):
            raise ValueError("Amount must be Decimal")
        self.amount = amount
        self.currency = currency

def adapt_money(m):
    if m.currency not in ("USD", "EUR", "GBP"):
        raise ValueError("Unsupported currency")
    return float(m.amount)

sqlite3.register_adapter(Money, adapt_money)

with sqlite3.connect("finance.db") as conn:
    conn.execute("CREATE TABLE transactions (amount REAL, currency TEXT)")
    
    try:
        salary = Money(Decimal("2500.50"), "USD")
        conn.execute("INSERT INTO transactions VALUES (?, ?)", 
                     (salary, salary.currency))
        
        for row in conn.execute("SELECT * FROM transactions"):
            print(row)  # Output: (2500.5, 'USD')
    except ValueError as e:
        print("Error:", e)

The adapter validates the Money object before conversion, ensuring only valid
values are stored. The Decimal amount is converted to float for SQLite REAL.

This approach combines type safety with automatic conversion for database
storage.

## Best Practices

- **Keep adapters simple:** Focus on type conversion only

- **Validate input:** Ensure objects are in valid state

- **Use standard formats:** Like ISO for dates, JSON for complex data

- **Consider performance:** Complex adapters may impact speed

- **Document behavior:** Clearly document what your adapter does

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

- [SQLite Expressions](https://www.sqlite.org/lang_expr.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).