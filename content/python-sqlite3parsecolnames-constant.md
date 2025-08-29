+++
title = "Python sqlite3.PARSE_COLNAMES Constant"
date = 2025-08-29T20:10:46.800+01:00
draft = false
description = "Complete guide to Python's sqlite3.PARSE_COLNAMES constant covering column name parsing, usage patterns, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.PARSE_COLNAMES Constant

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.PARSE_COLNAMES
constant, which enables advanced column name parsing in SQLite queries. We'll
cover its purpose, usage patterns, and practical examples.

## Basic Definitions

The sqlite3.PARSE_COLNAMES is a flag used with SQLite connections
to enable parsing of column names in SQL queries. When set, it allows special
syntax in column names for type conversion.

Key characteristics: it's used with sqlite3.connect, enables
type conversion through column name annotations, and provides more control over
query results. It works with the detect_types parameter.

## Basic PARSE_COLNAMES Usage

Here's a simple example showing how to enable column name parsing with
PARSE_COLNAMES for basic type conversion.

basic_parse_colnames.py
  

import sqlite3

with sqlite3.connect(':memory:', detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE test (id INTEGER, data TEXT)''')
    cursor.execute("INSERT INTO test VALUES (1, 'Sample data')")
    
    # Query with column name annotation for type conversion
    cursor.execute('''SELECT data AS "data [str]" FROM test''')
    row = cursor.fetchone()
    print(type(row[0]))  # &lt;class 'str'&gt;

This example creates an in-memory database with PARSE_COLNAMES
enabled. The query uses AS "column [type]" syntax to specify type
conversion for the result column.

The type in brackets (like [str]) tells SQLite how to convert the
column value. This is particularly useful for custom types or when you need
specific Python types.

## Date Type Conversion

This example demonstrates using PARSE_COLNAMES to automatically
convert date strings to Python datetime.date objects.

date_conversion.py
  

import sqlite3
import datetime

def adapt_date(date):
    return date.isoformat()

def convert_date(value):
    return datetime.date.fromisoformat(value.decode())

# Register type adapters
sqlite3.register_adapter(datetime.date, adapt_date)
sqlite3.register_converter("date", convert_date)

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE events 
                     (id INTEGER, event_date TEXT)''')
    
    today = datetime.date.today()
    cursor.execute("INSERT INTO events VALUES (1, ?)", (today,))
    
    # Query with date type conversion
    cursor.execute('''SELECT event_date AS "event_date [date]" 
                     FROM events''')
    row = cursor.fetchone()
    print(type(row[0]), row[0])  # &lt;class 'datetime.date'&gt; YYYY-MM-DD

We first register adapter and converter functions for datetime.date.
The query then uses [date] in the column alias to trigger the
conversion.

This pattern is useful for working with dates in databases while maintaining
proper Python date objects in your application logic.

## Custom Type Conversion

This example shows how to use PARSE_COLNAMES with custom Python
types for more advanced scenarios.

custom_type.py
  

import sqlite3

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

def adapt_point(point):
    return f"{point.x};{point.y}".encode()

def convert_point(value):
    x, y = value.decode().split(';')
    return Point(float(x), float(y))

# Register custom type
sqlite3.register_adapter(Point, adapt_point)
sqlite3.register_converter("point", convert_point)

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE shapes 
                     (id INTEGER, coordinates TEXT)''')
    
    p = Point(3.5, 4.2)
    cursor.execute("INSERT INTO shapes VALUES (1, ?)", (p,))
    
    # Query with custom type conversion
    cursor.execute('''SELECT coordinates AS "coordinates [point]" 
                     FROM shapes''')
    row = cursor.fetchone()
    print(type(row[0]), row[0])  # &lt;class '__main__.Point'&gt; Point(3.5, 4.2)

We define a custom Point class and register adapter/converter
functions. The query then uses [point] to convert the stored
string back to a Point object.

This technique is powerful for storing complex Python objects in SQLite while
maintaining their original type when retrieved.

## Multiple Column Conversion

This example demonstrates converting multiple columns in a single query using
PARSE_COLNAMES with different types.

multi_column.py
  

import sqlite3
import datetime

# Register date converters
sqlite3.register_adapter(datetime.date, lambda d: d.isoformat())
sqlite3.register_converter("date", lambda b: datetime.date.fromisoformat(b.decode()))

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE records 
                     (id INTEGER, record_date TEXT, value REAL)''')
    
    cursor.execute("INSERT INTO records VALUES (1, ?, 42.5)", 
                  (datetime.date.today(),))
    
    # Convert multiple columns with different types
    cursor.execute('''SELECT 
                        id AS "id [int]",
                        record_date AS "record_date [date]",
                        value AS "value [float]"
                     FROM records''')
    row = cursor.fetchone()
    print(type(row[0]), type(row[1]), type(row[2]))
    # &lt;class 'int'&gt; &lt;class 'datetime.date'&gt; &lt;class 'float'&gt;

The query converts three columns to different Python types: integer, date, and
float. Each column uses the AS "column [type]" syntax with its
appropriate type.

This approach provides fine-grained control over the types of each returned
column, which can simplify application code that processes query results.

## Combining with PARSE_DECLTYPES

This example shows how PARSE_COLNAMES can work together with
PARSE_DECLTYPES for comprehensive type handling.

combined_parsing.py
  

import sqlite3
import datetime

# Register type handlers
sqlite3.register_adapter(datetime.date, lambda d: d.isoformat())
sqlite3.register_converter("date", lambda b: datetime.date.fromisoformat(b.decode()))

# Use both PARSE_DECLTYPES and PARSE_COLNAMES
with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_DECLTYPES | 
                               sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    # Declare column type in table definition
    cursor.execute('''CREATE TABLE events 
                     (id INTEGER, event_date DATE)''')
    
    today = datetime.date.today()
    cursor.execute("INSERT INTO events VALUES (1, ?)", (today,))
    
    # Override declared type with column name annotation
    cursor.execute('''SELECT 
                        event_date AS "event_date [str]"
                     FROM events''')
    row = cursor.fetchone()
    print(type(row[0]))  # &lt;class 'str'&gt; (overridden by column name)

We combine both flags using bitwise OR (|). The table declares
event_date as DATE type, but the query overrides this with
[str] in the column alias.

This combination provides maximum flexibility: declared types for normal
operations with the ability to override when needed via column names.

## Handling NULL Values

This example demonstrates how PARSE_COLNAMES handles NULL values
during type conversion.

null_handling.py
  

import sqlite3
import datetime

# Register date converter
sqlite3.register_converter("date", lambda b: datetime.date.fromisoformat(b.decode()))

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE tasks 
                     (id INTEGER, due_date TEXT)''')
    
    # Insert both date and NULL values
    cursor.execute("INSERT INTO tasks VALUES (1, ?)", 
                  (datetime.date.today().isoformat(),))
    cursor.execute("INSERT INTO tasks VALUES (2, NULL)")
    
    # Query with type conversion
    cursor.execute('''SELECT due_date AS "due_date [date]" FROM tasks''')
    rows = cursor.fetchall()
    for row in rows:
        print(type(row[0]), row[0])
    # &lt;class 'datetime.date'&gt; YYYY-MM-DD
    # &lt;class 'NoneType'&gt; None

The example shows that NULL values in the database remain as None
in Python even when type conversion is specified. The converter function is not
called for NULL values.

This behavior is important to remember when writing code that processes query
results with optional fields that might be NULL in the database.

## Complex Type Conversion

This advanced example demonstrates using PARSE_COLNAMES with JSON
data for complex type conversion scenarios.

json_conversion.py
  

import sqlite3
import json

def adapt_json(data):
    return json.dumps(data).encode()

def convert_json(value):
    return json.loads(value.decode())

# Register JSON converter
sqlite3.register_adapter(dict, adapt_json)
sqlite3.register_converter("json", convert_json)

with sqlite3.connect(':memory:', 
                    detect_types=sqlite3.PARSE_COLNAMES) as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE configs 
                     (id INTEGER, settings TEXT)''')
    
    config = {'theme': 'dark', 'notifications': True}
    cursor.execute("INSERT INTO configs VALUES (1, ?)", (config,))
    
    # Query with JSON conversion
    cursor.execute('''SELECT settings AS "settings [json]" 
                     FROM configs''')
    row = cursor.fetchone()
    print(type(row[0]), row[0]['theme'])  # &lt;class 'dict'&gt; dark

We register converters for Python dictionaries to JSON strings and back. The
query uses [json] to automatically convert the stored JSON string
back to a Python dictionary.

This pattern is extremely useful for storing structured configuration data or
other complex objects in SQLite while maintaining easy access to the original
Python data structure.

## Best Practices

- **Use descriptive type names:** Choose clear type names in brackets

- **Register converters carefully:** Ensure converters handle all edge cases

- **Combine with PARSE_DECLTYPES:** For comprehensive type handling

- **Document type conversions:** Make column type expectations clear

- **Handle NULL values:** Ensure your code deals with potential NULLs

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Data Types](https://www.sqlite.org/datatype3.html)

- [SQLite CAST Expressions](https://www.sqlite.org/lang_expr.html#castexpr)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).