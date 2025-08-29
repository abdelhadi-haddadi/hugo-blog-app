+++
title = "Python sqlite3.Cursor.arraysize Attribute"
date = 2025-08-29T20:10:37.804+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.arraysize attribute covering its usage, optimization, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.arraysize Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.arraysize
attribute. We'll cover its purpose, optimization benefits, and practical usage
examples with SQLite databases.

## Basic Definitions

The arraysize attribute of a SQLite cursor determines how many rows
are fetched at once when calling fetchmany. It optimizes database
operations by reducing round trips.

Default value is 1, meaning each fetchmany call retrieves one row.
Increasing this value can improve performance when processing large result sets.

## Default arraysize Behavior

This example demonstrates the default behavior of arraysize when
not explicitly set. The cursor fetches one row at a time.

default_arraysize.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    conn.execute('CREATE TABLE test (id INTEGER, data TEXT)')
    conn.executemany('INSERT INTO test VALUES (?, ?)', [(i, f'Data {i}') for i in range(1, 6)])
    
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM test')
        print(f"Default arraysize: {cursor.arraysize}")  # Output: 1
        
        # fetchmany() returns 1 row by default
        print(cursor.fetchmany())  # [(1, 'Data 1')]
        print(cursor.fetchmany(2))  # [(2, 'Data 2'), (3, 'Data 3')]

The example shows that without setting arraysize, it defaults to 1.
The fetchmany method can still fetch more rows by specifying a
parameter.

This default behavior is safe but may not be optimal for large datasets where
multiple rows are typically processed together.

## Setting arraysize for Batch Fetching

Here we set arraysize to fetch multiple rows at once, improving
performance for large result sets.

set_arraysize.py
  

import sqlite3

with sqlite3.connect('products.db') as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS products
                    (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    conn.executemany('INSERT INTO products (name, price) VALUES (?, ?)',
                    [('Laptop', 999.99), ('Phone', 699.99), ('Tablet', 399.99),
                     ('Monitor', 249.99), ('Keyboard', 49.99)])
    
    with conn.cursor() as cursor:
        cursor.arraysize = 3  # Set batch size to 3 rows
        cursor.execute('SELECT * FROM products')
        
        while True:
            batch = cursor.fetchmany()
            if not batch:
                break
            print(f"Fetched batch of {len(batch)} items:")
            for product in batch:
                print(f"  {product[1]}: ${product[2]:.2f}")

This example sets arraysize to 3, causing fetchmany
to return 3 rows per call. The loop processes products in batches rather than
individually.

Batch fetching reduces database round trips, which is especially beneficial for
networked databases or large result sets.

## arraysize with Large Datasets

For very large datasets, an appropriate arraysize can significantly
reduce memory usage and improve performance.

large_dataset.py
  

import sqlite3
import time

def process_large_data(arraysize):
    with sqlite3.connect('large_data.db') as conn:
        conn.execute('CREATE TABLE IF NOT EXISTS measurements (id INTEGER, value REAL)')
        
        # Insert sample data (100,000 rows)
        if conn.execute('SELECT COUNT(*) FROM measurements').fetchone()[0] == 0:
            conn.executemany('INSERT INTO measurements VALUES (?, ?)',
                           [(i, i * 0.1) for i in range(1, 100001)])
        
        with conn.cursor() as cursor:
            cursor.arraysize = arraysize
            start_time = time.time()
            
            cursor.execute('SELECT * FROM measurements')
            total_rows = 0
            
            while True:
                batch = cursor.fetchmany()
                if not batch:
                    break
                total_rows += len(batch)
                # Process batch here
            
            elapsed = time.time() - start_time
            print(f"arraysize {arraysize}: Processed {total_rows} rows in {elapsed:.3f} seconds")

# Compare different array sizes
process_large_data(1)     # Default
process_large_data(100)   # Moderate
process_large_data(1000)  # Large

This benchmark compares different arraysize values when processing
100,000 rows. Larger sizes generally perform better but require more memory.

The optimal value depends on your specific use case, available memory, and row
size. Testing different values is recommended.

## arraysize with fetchall()

While arraysize primarily affects fetchmany, it can
influence memory usage with fetchall in some implementations.

fetchall_arraysize.py
  

import sqlite3
import sys

with sqlite3.connect(':memory:') as conn:
    conn.execute('CREATE TABLE data (id INTEGER, content TEXT)')
    conn.executemany('INSERT INTO data VALUES (?, ?)',
                    [(i, 'X' * 1000) for i in range(1, 1001)])  # 1MB of data
    
    with conn.cursor() as cursor:
        # Small arraysize
        cursor.arraysize = 1
        print("Memory with arraysize=1:", end=' ')
        data = cursor.execute('SELECT * FROM data').fetchall()
        print(f"{sys.getsizeof(data) / 1024:.1f} KB")
        
        # Larger arraysize
        cursor.arraysize = 100
        print("Memory with arraysize=100:", end=' ')
        data = cursor.execute('SELECT * FROM data').fetchall()
        print(f"{sys.getsizeof(data) / 1024:.1f} KB")

This example shows how arraysize might affect memory usage even
with fetchall. The difference varies by Python implementation.

For consistent behavior, explicitly manage batch sizes with fetchmany
when memory efficiency is critical.

## Dynamic arraysize Adjustment

The arraysize can be adjusted dynamically based on query results or
system conditions.

dynamic_arraysize.py
  

import sqlite3
import psutil

def get_memory_usage():
    return psutil.virtual_memory().percent

with sqlite3.connect('adaptive.db') as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS sensor_data
                    (timestamp TEXT, sensor_id INTEGER, value REAL)''')
    
    # Insert sample sensor data
    if conn.execute('SELECT COUNT(*) FROM sensor_data').fetchone()[0] == 0:
        import datetime
        now = datetime.datetime.now()
        data = [(str(now - datetime.timedelta(seconds=i)), i % 10, i * 0.1)
               for i in range(10000)]
        conn.executemany('INSERT INTO sensor_data VALUES (?, ?, ?)', data)
    
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM sensor_data ORDER BY timestamp DESC')
        
        # Start with moderate arraysize
        cursor.arraysize = 100
        
        while True:
            # Adjust arraysize based on memory pressure
            if get_memory_usage() &gt; 70:
                cursor.arraysize = max(10, cursor.arraysize // 2)
            elif get_memory_usage() &lt; 50 and cursor.arraysize &lt; 1000:
                cursor.arraysize = min(1000, cursor.arraysize * 2)
            
            batch = cursor.fetchmany()
            if not batch:
                break
                
            print(f"Processing {len(batch)} rows (arraysize: {cursor.arraysize})")
            # Process batch here

This advanced example dynamically adjusts arraysize based on system
memory usage. It reduces batch size when memory is constrained and increases it
when available.

Such adaptive approaches are useful in resource-constrained environments or when
processing unpredictable data sizes.

## arraysize with Different Row Sizes

The optimal arraysize may vary depending on the size of each row in
your result set.

row_size_impact.py
  

import sqlite3
import time

def test_row_size(row_size, arraysize):
    with sqlite3.connect(':memory:') as conn:
        # Create table with specified row size
        conn.execute(f'CREATE TABLE data (id INTEGER, content TEXT)')
        data = [(i, 'X' * row_size) for i in range(1000)]
        conn.executemany('INSERT INTO data VALUES (?, ?)', data)
        
        with conn.cursor() as cursor:
            cursor.arraysize = arraysize
            start = time.time()
            
            cursor.execute('SELECT * FROM data')
            total = 0
            while True:
                batch = cursor.fetchmany()
                if not batch:
                    break
                total += len(batch)
            
            elapsed = time.time() - start
            print(f"Row size {row_size}B, arraysize {arraysize}: {elapsed:.4f}s")

# Test different combinations
test_row_size(10, 100)    # Small rows, large batch
test_row_size(10, 10)     # Small rows, small batch
test_row_size(1000, 100)  # Large rows, large batch
test_row_size(1000, 10)   # Large rows, small batch

This example demonstrates how row size affects the performance of different
arraysize values. Larger rows may require smaller batch sizes to
avoid excessive memory usage.

When dealing with large BLOBs or text fields, consider smaller arraysize
values to balance performance and memory consumption.

## Best Practices

- **Profile performance:** Test different arraysize values for your specific use case

- **Consider memory:** Larger arraysize uses more memory per fetch

- **Network considerations:** Larger batches reduce round trips for remote databases

- **Default is safe:** arraysize=1 works for all cases but may be slower

- **Document your choice:** Comment why you chose a particular arraysize value

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [Python DB API 2.0 Specification](https://www.python.org/dev/peps/pep-0249/)

- [SQLite Cursor Documentation](https://www.sqlite.org/c3ref/cursor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).