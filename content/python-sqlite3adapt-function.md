+++
title = "Python sqlite3.adapt Function"
date = 2025-08-29T20:10:26.496+01:00
draft = false
description = "Complete guide to Python's sqlite3.adapt function covering type adaptation, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.adapt Function

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.adapt function,
which enables custom type adaptation for SQLite databases. We'll cover basic
usage, registration patterns, and practical examples.

## Basic Definitions

The sqlite3.adapt function registers adapter callables to convert
Python objects to SQLite-compatible types. It's part of SQLite's type system.

Key characteristics: it enables storing custom Python types in SQLite, works with
both classes and callables, and integrates with the DB-API 2.0 interface.

## Basic Type Adaptation

Here's a simple example showing how to adapt a custom Python type for storage in
SQLite using sqlite3.adapt.

basic_adapt.py
  

import sqlite3

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def adapt_point(point):
    return f"{point.x};{point.y}".encode('utf-8')

# Register the adapter
sqlite3.register_adapter(Point, adapt_point)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE points (p BLOB)")
    conn.execute("INSERT INTO points VALUES (?)", (Point(4, 5),))
    
    row = conn.execute("SELECT p FROM points").fetchone()
    print(row[0])  # b'4;5'

This example creates a Point class and registers an adapter function that converts
Point objects to bytes. The adapter is called automatically when storing Points.

The adapter must return a type natively supported by SQLite: None, int, float,
str, or bytes. Here we return bytes for blob storage.

## Adapting Complex Numbers

This example demonstrates adapting Python's built-in complex numbers for SQLite
storage.

complex_adapt.py
  

import sqlite3

def adapt_complex(c):
    return f"{c.real},{c.imag}".encode('utf-8')

sqlite3.register_adapter(complex, adapt_complex)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE complex_nums (num BLOB)")
    conn.execute("INSERT INTO complex_nums VALUES (?)", (3+4j,))
    
    row = conn.execute("SELECT num FROM complex_nums").fetchone()
    print(row[0])  # b'3.0,4.0'

Here we adapt Python's complex numbers to a byte string format. The adapter
converts both real and imaginary parts to a string representation.

This approach allows storing complex numbers in SQLite, though querying them
requires additional conversion logic on retrieval.

## Adapting Decimal Numbers

This example shows how to properly adapt Decimal numbers for precise storage.

decimal_adapt.py
  

import sqlite3
from decimal import Decimal

def adapt_decimal(d):
    return str(d)

sqlite3.register_adapter(Decimal, adapt_decimal)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE prices (amount TEXT)")
    price = Decimal('19.99')
    conn.execute("INSERT INTO prices VALUES (?)", (price,))
    
    row = conn.execute("SELECT amount FROM prices").fetchone()
    print(Decimal(row[0]))  # 19.99

Decimal numbers require careful handling to maintain precision. This adapter
converts them to strings for exact storage in SQLite TEXT columns.

When retrieving, you'll need to convert back to Decimal manually, as shown in
the print statement. This preserves full decimal precision.

## Adapting Custom Objects with Attributes

This example adapts a custom object with multiple attributes to a JSON string.

json_adapt.py
  

import sqlite3
import json

class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

def adapt_product(product):
    return json.dumps({
        'id': product.id,
        'name': product.name,
        'price': product.price
    })

sqlite3.register_adapter(Product, adapt_product)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE products (data TEXT)")
    p = Product(101, "Widget", 9.99)
    conn.execute("INSERT INTO products VALUES (?)", (p,))
    
    row = conn.execute("SELECT data FROM products").fetchone()
    print(row[0])  # JSON string

This approach serializes complex objects to JSON strings for flexible storage.
The JSON format preserves the object structure and allows querying specific
fields with SQLite's JSON functions.

Note that SQLite must be compiled with JSON support for advanced querying
capabilities on the stored JSON data.

## Adapting Datetime Objects

This example adapts Python datetime objects to ISO format strings.

datetime_adapt.py
  

import sqlite3
from datetime import datetime

def adapt_datetime(dt):
    return dt.isoformat()

sqlite3.register_adapter(datetime, adapt_datetime)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE events (time TEXT)")
    now = datetime.now()
    conn.execute("INSERT INTO events VALUES (?)", (now,))
    
    row = conn.execute("SELECT time FROM events").fetchone()
    print(row[0])  # ISO formatted datetime string

The ISO format is ideal for datetime storage as it's both human-readable and
sortable. This adapter converts datetime objects to strings in this standard
format.

For timezone-aware datetimes, you might want to include UTC offset information
in the adapter for complete timezone preservation.

## Adapting with Class Methods

This example shows how to use a class method as an adapter for cleaner code
organization.

class_method_adapt.py
  

import sqlite3

class Color:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b
    
    @classmethod
    def adapt(cls, color):
        return f"{color.r},{color.g},{color.b}"

sqlite3.register_adapter(Color, Color.adapt)

with sqlite3.connect(":memory:") as conn:
    conn.execute("CREATE TABLE colors (value TEXT)")
    red = Color(255, 0, 0)
    conn.execute("INSERT INTO colors VALUES (?)", (red,))
    
    row = conn.execute("SELECT value FROM colors").fetchone()
    print(row[0])  # '255,0,0'

Using a class method as the adapter keeps the conversion logic closely tied to
the class it adapts. This improves code organization and maintainability.

The class method has access to all class attributes and methods, allowing for
more sophisticated adaptation logic if needed.

## Combining Adapters and Converters

This complete example shows both adapting Python objects for storage and
converting SQLite values back to Python objects.

full_conversion.py
  

import sqlite3

class Measurement:
    def __init__(self, value, unit):
        self.value = value
        self.unit = unit
    
    def __repr__(self):
        return f"Measurement({self.value}, '{self.unit}')"

def adapt_measurement(m):
    return f"{m.value}|{m.unit}".encode('utf-8')

def convert_measurement(s):
    value, unit = s.decode('utf-8').split('|')
    return Measurement(float(value), unit)

sqlite3.register_adapter(Measurement, adapt_measurement)
sqlite3.register_converter("MEASUREMENT", convert_measurement)

with sqlite3.connect(":memory:", detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    conn.execute("CREATE TABLE data (m MEASUREMENT)")
    m = Measurement(42.5, "cm")
    conn.execute("INSERT INTO data VALUES (?)", (m,))
    
    row = conn.execute("SELECT m FROM data").fetchone()
    print(row[0])  # Measurement(42.5, 'cm')

This complete solution shows bidirectional conversion. The adapter handles
storage, while the converter reconstructs objects when retrieving data.

Note the detect_types=sqlite3.PARSE_DECLTYPES parameter which
enables the converter functionality based on column type declarations.

## Best Practices

- **Choose appropriate formats:** Use formats that preserve all necessary data

- **Consider query needs:** Adapt to formats that support your query patterns

- **Document adaptations:** Clearly document any custom type adaptations

- **Test thoroughly:** Verify round-trip conversion works correctly

- **Handle edge cases:** Ensure adapters work with null/edge values

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

- [SQLite Type Conversion](https://www.sqlite.org/c3ref/column_blob.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).