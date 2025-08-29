+++
title = "Python sqlite3.Row.__iter__ Method"
date = 2025-08-29T20:10:48.996+01:00
draft = false
description = "Complete guide to Python's sqlite3.Row.__iter__ method covering iteration over database rows and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Row.__iter__ Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Row.__iter__ method,
which enables iteration over database rows. We'll cover basic usage, practical
examples, and integration with other Python features.

## Basic Definitions

The sqlite3.Row.__iter__ method allows iteration over the values in
a database row. It's automatically called when you iterate over a Row object.

Key characteristics: it returns an iterator of column values, preserves column
order, and works with all standard iteration tools. The method enables direct
access to row data without explicit indexing.

## Basic Row Iteration

Here's the simplest usage of __iter__ to iterate over row values.

basic_iteration.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE users (id INTEGER, name TEXT)''')
    cursor.execute("INSERT INTO users VALUES (1, 'Alice')")
    
    cursor.execute("SELECT * FROM users")
    row = cursor.fetchone()
    
    # Iterate over row values
    for value in row:
        print(value)

This example creates an in-memory database with one row. The for
loop implicitly calls __iter__ to access each column value.

Output shows both values from the row: 1 and 'Alice'.
The iteration order matches the column order in the table definition.

## Unpacking Row Values

The __iter__ method enables tuple unpacking of row values.

unpacking.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE products 
                     (id INTEGER, name TEXT, price REAL)''')
    cursor.execute("INSERT INTO products VALUES (101, 'Laptop', 999.99)")
    
    cursor.execute("SELECT * FROM products")
    row = cursor.fetchone()
    
    # Unpack row values
    id, name, price = row
    print(f"Product {id}: {name} costs ${price:.2f}")

This example demonstrates direct unpacking of a row into three variables. The
__iter__ method makes this possible by providing sequential access.

Unpacking is concise and works well when you know the exact column structure.
It's especially useful with small, fixed-schema tables.

## Converting Row to List

The iterator can be converted to a list using the list function.

to_list.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE measurements
                     (timestamp TEXT, temp REAL, humidity REAL)''')
    cursor.execute("INSERT INTO measurements VALUES ('2025-01-01', 22.5, 45.0)")
    
    cursor.execute("SELECT * FROM measurements")
    row = cursor.fetchone()
    
    # Convert row to list
    values = list(row)
    print(f"Measurement at {values[0]}: {values[1]}°C, {values[2]}%")

The list function consumes the iterator and creates a new list
containing all row values. This is useful when you need indexed access.

Converting to a list creates a copy of the data, which consumes additional
memory but allows multiple passes over the values.

## Using with zip()

The row iterator works well with Python's zip function.

zip_columns.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE employees
                     (id INTEGER, name TEXT, department TEXT)''')
    cursor.execute("INSERT INTO employees VALUES (1001, 'Bob', 'IT')")
    
    cursor.execute("SELECT * FROM employees")
    row = cursor.fetchone()
    
    # Combine column names with values
    columns = ['ID', 'Full Name', 'Dept']
    for col, val in zip(columns, row):
        print(f"{col}: {val}")

This example pairs custom column names with row values using zip.
The __iter__ method provides the values for zipping.

Zipping is powerful for creating custom views of your data or when you need to
combine row values with other sequences.

## Multiple Row Iteration

The method also works when processing multiple rows from a query.

multi_row.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE cities
                     (name TEXT, population INTEGER, country TEXT)''')
    cities = [
        ('Tokyo', 37400068, 'Japan'),
        ('Delhi', 28514000, 'India'),
        ('Shanghai', 25582000, 'China')
    ]
    cursor.executemany("INSERT INTO cities VALUES (?, ?, ?)", cities)
    
    cursor.execute("SELECT * FROM cities ORDER BY population DESC")
    for row in cursor:
        # Iterate over each row's values
        name, pop, country = row
        print(f"{name} ({country}): {pop:,}")

This example shows iteration over multiple rows, with each row being iterable
itself. We unpack each row into variables for formatted output.

The pattern is clean and efficient for processing result sets, especially with
known column structures.

## Combining with enumerate()

The iterator pairs well with enumerate for indexed access.

enumerate.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE inventory
                     (item TEXT, quantity INTEGER, price REAL)''')
    cursor.execute("INSERT INTO inventory VALUES ('Widget', 100, 9.99)")
    
    cursor.execute("SELECT * FROM inventory")
    row = cursor.fetchone()
    
    # Get column positions and values
    for idx, value in enumerate(row):
        col_name = row.keys()[idx]
        print(f"Column {idx} ({col_name}): {value}")

Here we use enumerate to get both the index and value for each
column. We then look up the column name using the index.

This technique is useful when you need both positional information and values
during processing.

## Performance Considerations

The __iter__ method has some performance implications to consider.

performance.py
  

import sqlite3
import time

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Create large table
    cursor.execute('''CREATE TABLE big_data (id INTEGER, value TEXT)''')
    cursor.executemany("INSERT INTO big_data VALUES (?, ?)",
                     ((i, str(i)*10) for i in range(100000)))
    
    # Time iteration approaches
    start = time.time()
    cursor.execute("SELECT * FROM big_data")
    for row in cursor:
        list(row)  # Force full iteration
    print(f"Iteration time: {time.time() - start:.3f}s")

This benchmark shows that row iteration is generally fast, but converting to
lists or other structures adds overhead. For large datasets, consider direct
column access.

The __iter__ method itself is optimized, but the way you use it
affects performance. Profile your specific use case.

## Best Practices

- **Prefer direct column access** when you know column names

- **Use unpacking** for small, fixed-schema rows

- **Combine with tools** like zip/enumerate for powerful patterns

- **Avoid unnecessary conversions** to lists/dicts

- **Consider memory** when processing large result sets

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Row Objects](https://www.sqlite.org/c3ref/row.html)

- [Python DB API 2.0 Specification](https://peps.python.org/pep-0249/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).