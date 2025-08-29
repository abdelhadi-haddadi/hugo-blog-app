+++
title = "Python sqlite3.Row.__getitem__ Method"
date = 2025-08-29T20:10:47.900+01:00
draft = false
description = "Complete guide to Python's sqlite3.Row.__getitem__ method covering row access, indexing, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Row.__getitem__ Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Row.__getitem__ method,
which provides indexed access to row values. We'll cover basic usage, indexing
options, and practical examples.

## Basic Definitions

The sqlite3.Row.__getitem__ method allows accessing row values by
index or column name. It's the underlying implementation for both index-based
and name-based access to row data.

Key characteristics: it supports integer indices for positional access and string
keys for column name access. It's used internally when using square bracket
notation on Row objects.

## Basic Row Access

Here's the simplest usage of __getitem__ to access row values by
index and column name.

basic_access.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE users (id INTEGER, name TEXT)''')
    cursor.execute("INSERT INTO users VALUES (1, 'Alice')")
    
    cursor.execute("SELECT * FROM users")
    row = cursor.fetchone()
    
    # Access by index
    print(row.__getitem__(0))  # 1
    
    # Access by column name
    print(row.__getitem__('name'))  # Alice

This example shows both index-based and name-based access using __getitem__.
The row_factory is set to sqlite3.Row for named access.

Normally you'd use row[0] or row['name'] syntax, which
internally calls __getitem__.

## Accessing Multiple Columns

This example demonstrates accessing multiple columns using __getitem__
in a loop.

multiple_columns.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE products
                     (id INTEGER, name TEXT, price REAL)''')
    cursor.execute("INSERT INTO products VALUES (1, 'Laptop', 999.99)")
    
    cursor.execute("SELECT * FROM products")
    row = cursor.fetchone()
    
    # Access all columns by name
    for col in row.keys():
        print(f"{col}: {row.__getitem__(col)}")

The example shows how to iterate through all columns and access their values using
__getitem__ with column names. The keys method
provides column names.

This pattern is useful when you need to process all columns without knowing their
names in advance.

## Handling Missing Columns

This example shows what happens when trying to access non-existent columns with
__getitem__.

missing_columns.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE test (id INTEGER)''')
    cursor.execute("INSERT INTO test VALUES (1)")
    
    cursor.execute("SELECT * FROM test")
    row = cursor.fetchone()
    
    try:
        # Access non-existent column
        print(row.__getitem__('nonexistent'))
    except IndexError as e:
        print(f"Error: {e}")

Attempting to access a non-existent column with __getitem__ raises
an IndexError. This behavior is consistent with Python's sequence
protocol.

Always check column existence with keys or handle the potential
exception when working with dynamic queries.

## Using with Integer Indices

This example demonstrates using __getitem__ with integer indices for
positional access.

integer_indices.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE data (a INTEGER, b INTEGER, c INTEGER)''')
    cursor.execute("INSERT INTO data VALUES (10, 20, 30)")
    
    cursor.execute("SELECT * FROM data")
    row = cursor.fetchone()
    
    # Access by position
    print(row.__getitem__(0))  # 10
    print(row.__getitem__(2))  # 30
    
    # Negative indices work too
    print(row.__getitem__(-1))  # 30

The example shows standard sequence-style access using integer indices. Negative
indices work as expected, counting from the end.

Positional access is faster than named access but less readable, especially with
many columns.

## Combining with Other Row Methods

This example shows how __getitem__ interacts with other Row methods
like keys and values.

combined_methods.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE events
                     (id INTEGER, name TEXT, date TEXT)''')
    cursor.execute("INSERT INTO events VALUES (1, 'Meeting', '2025-01-01')")
    
    cursor.execute("SELECT * FROM events")
    row = cursor.fetchone()
    
    # Combine with keys() and values()
    for i, col in enumerate(row.keys()):
        print(f"{col}: {row.__getitem__(i)} == {row.__getitem__(col)}")

The example demonstrates that index-based and name-based access return the same
values when referring to the same column. The order matches the query's column
order.

This consistency is important when building dynamic data processing pipelines.

## Performance Comparison

This example compares the performance of __getitem__ with direct
attribute access.

performance.py
  

import sqlite3
import timeit

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE perf (a INTEGER, b INTEGER)''')
    cursor.execute("INSERT INTO perf VALUES (1, 2)")
    
    cursor.execute("SELECT * FROM perf")
    row = cursor.fetchone()
    
    # Time __getitem__ access
    t1 = timeit.timeit(lambda: row.__getitem__('a'), number=100000)
    
    # Time direct attribute access
    t2 = timeit.timeit(lambda: row['a'], number=100000)
    
    print(f"__getitem__: {t1:.3f}s")
    print(f"Direct access: {t2:.3f}s")

The example shows that direct square bracket access (row['a']) is
slightly faster than calling __getitem__ directly. Both methods
are quite efficient.

The performance difference is negligible in most applications, so prefer the
more readable syntax.

## Custom Row Subclass

This advanced example demonstrates creating a custom Row subclass that extends
__getitem__ behavior.

custom_row.py
  

import sqlite3

class CustomRow(sqlite3.Row):
    def __getitem__(self, key):
        val = super().__getitem__(key)
        return f"Custom: {val}"

with sqlite3.connect(':memory:') as conn:
    conn.row_factory = CustomRow
    cursor = conn.cursor()
    
    cursor.execute('''CREATE TABLE items (id INTEGER, name TEXT)''')
    cursor.execute("INSERT INTO items VALUES (1, 'Widget')")
    
    cursor.execute("SELECT * FROM items")
    row = cursor.fetchone()
    
    print(row.__getitem__('name'))  # Custom: Widget
    print(row['id'])  # Custom: 1

The example shows how to subclass sqlite3.Row and modify
__getitem__ behavior. All access methods inherit the new behavior.

This technique is powerful for adding validation, transformation, or logging to
row access operations.

## Best Practices

- **Prefer named access:** Use column names for readability

- **Handle missing columns:** Check with keys() or catch exceptions

- **Use direct syntax:** Prefer row['name'] over __getitem__

- **Consider performance:** Positional access is faster

- **Document column order:** When using positional access

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