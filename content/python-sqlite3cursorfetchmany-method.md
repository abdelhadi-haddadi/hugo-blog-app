+++
title = "Python sqlite3.Cursor.fetchmany Method"
date = 2025-08-29T20:10:41.215+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.fetchmany method covering database fetching, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.fetchmany Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.fetchmany method,
used to retrieve multiple rows from a database query result. We'll cover basic usage,
parameters, memory efficiency, and practical examples.

## Basic Definitions

The fetchmany method retrieves the next set of rows from a query result.
It returns a list of tuples, where each tuple represents a row from the database.

Key characteristics: it accepts a size parameter to control how many rows to fetch,
is memory efficient for large result sets, and maintains cursor position between
calls. It's ideal for batch processing of query results.

## Basic fetchmany Usage

Here's the simplest usage of fetchmany to retrieve rows in batches.

basic_fetchmany.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS products (id INTEGER, name TEXT)")
    conn.executemany("INSERT INTO products VALUES (?, ?)", 
                    [(1, 'Laptop'), (2, 'Phone'), (3, 'Tablet'), 
                     (4, 'Monitor'), (5, 'Keyboard')])
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    
    # Fetch first 2 rows
    batch1 = cursor.fetchmany(2)
    print("Batch 1:", batch1)
    
    # Fetch next 2 rows
    batch2 = cursor.fetchmany(2)
    print("Batch 2:", batch2)
    
    # Fetch remaining rows (1 in this case)
    batch3 = cursor.fetchmany(2)
    print("Batch 3:", batch3)

This example shows basic batch fetching. We insert 5 rows, then fetch them in
batches of 2. The cursor maintains position between calls.

The output would show the first two products, then next two, then the remaining
one. The method returns an empty list when no more rows are available.

## Fetching with Default Size

When no size is specified, fetchmany uses the cursor's arraysize.

default_size.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    
    # Set the default fetch size
    cursor.arraysize = 3
    cursor.execute("SELECT * FROM products")
    
    # Fetch using default size
    batch = cursor.fetchmany()
    print("First batch (size 3):", batch)
    
    # Change size and fetch again
    cursor.arraysize = 1
    batch = cursor.fetchmany()
    print("Second batch (size 1):", batch)

This demonstrates how arraysize affects fetchmany when
no size parameter is provided. The first fetch gets 3 rows, the second gets 1.

Setting arraysize is useful when you consistently want the same
fetch size throughout your application.

## Processing Large Result Sets

fetchmany is ideal for processing large result sets without loading
everything into memory.

large_results.py
  

import sqlite3

def process_large_table():
    with sqlite3.connect('large_db.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM big_table")
        
        while True:
            batch = cursor.fetchmany(100)  # Process 100 rows at a time
            if not batch:
                break
                
            # Process the batch
            for row in batch:
                process_row(row)

def process_row(row):
    # Simulate row processing
    print(f"Processing row {row[0]}")

# Create sample large database
with sqlite3.connect('large_db.db') as conn:
    conn.execute("CREATE TABLE big_table AS SELECT value as id, 'Data ' || value as info FROM generate_series(1, 1000)")
    
process_large_table()

This pattern is essential for handling large datasets. It fetches rows in
manageable chunks, processing each batch before fetching the next.

The while loop continues until fetchmany returns an empty list,
indicating all rows have been processed.

## Combining with fetchone

fetchmany can be combined with fetchone for flexible
result processing.

combine_fetchone.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products ORDER BY id")
    
    # Get first row individually
    first_row = cursor.fetchone()
    print("First product:", first_row)
    
    # Then get next 2 rows as a batch
    next_rows = cursor.fetchmany(2)
    print("Next two products:", next_rows)
    
    # Then get one more row
    another_row = cursor.fetchone()
    print("Another product:", another_row)

This example shows mixing fetch styles. We get the first row with fetchone,
then a batch with fetchmany, then another single row.

The cursor maintains position consistently across all fetch methods, allowing
flexible result processing.

## Empty Result Handling

fetchmany gracefully handles empty result sets and partial fetches.

empty_results.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    
    # Query with no results
    cursor.execute("SELECT * FROM products WHERE id = 999")
    empty_result = cursor.fetchmany(5)
    print("Empty result:", empty_result)  # []
    
    # Query with fewer results than requested
    cursor.execute("SELECT * FROM products LIMIT 3")
    partial_result = cursor.fetchmany(5)
    print("Partial result (3 rows):", partial_result)
    
    # Subsequent fetch returns empty list
    next_result = cursor.fetchmany(2)
    print("After exhaustion:", next_result)  # []

This demonstrates fetchmany's behavior with empty or small result
sets. It returns an empty list when no rows are available.

When fewer rows exist than requested, it returns all available rows without
error. Subsequent calls return empty lists.

## Using with Row Factories

fetchmany works with row factories to return customized row formats.

row_factory.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    # Use built-in Row factory
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM products")
    batch = cursor.fetchmany(2)
    
    # Access rows by column name
    for row in batch:
        print(f"Product {row['id']}: {row['name']}")
        print("Columns:", row.keys())

This example shows fetchmany with the sqlite3.Row
factory. Rows can be accessed by column name or index.

The keys method shows available column names, making the result
more self-documenting than plain tuples.

## Error Handling

Proper error handling ensures robust database operations with fetchmany.

error_handling.py
  

import sqlite3

try:
    with sqlite3.connect('example.db') as conn:
        cursor = conn.cursor()
        
        # Invalid query (no such table)
        cursor.execute("SELECT * FROM non_existent_table")
        batch = cursor.fetchmany(2)
        
except sqlite3.Error as e:
    print("Database error:", e)
    
finally:
    print("Operation attempted")

This shows handling errors that might occur during fetch operations. The
with statement ensures proper connection cleanup.

Common errors include invalid SQL, missing tables, or database access errors.
Always handle these cases in production code.

## Best Practices

- **Use appropriate batch sizes:** Balance memory and round trips

- **Always check for empty results:** Handle end-of-data cases

- **Combine with context managers:** Ensure resource cleanup

- **Consider memory efficiency:** Use fetchmany for large results

- **Maintain cursor state:** Be aware of position between calls

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Cursor Fetching](https://www.sqlite.org/c3ref/fetch.html)

- [SQLite Limits](https://www.sqlite.org/limits.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).