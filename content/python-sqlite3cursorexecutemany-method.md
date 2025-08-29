+++
title = "Python sqlite3.Cursor.executemany Method"
date = 2025-08-29T20:10:40.098+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.executemany method covering batch operations, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.executemany Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.executemany
method for efficient batch operations in SQLite databases. We'll cover basic usage,
parameter handling, performance considerations, and practical examples.

## Basic Definitions

The executemany method executes a parameterized SQL command against
all parameter sequences in a sequence. It's optimized for inserting or updating
multiple rows with a single method call.

Key characteristics: it accepts an SQL template and an iterable of parameters,
executes the statement for each parameter set, and is more efficient than
multiple execute calls for bulk operations.

## Basic Batch Insert

This example demonstrates the simplest usage of executemany to insert
multiple rows into a table with a single call.

basic_executemany.py
  

import sqlite3

with sqlite3.connect('products.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS products
                     (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    products = [
        ('Laptop', 999.99),
        ('Mouse', 19.99),
        ('Keyboard', 49.99),
        ('Monitor', 199.99)
    ]
    
    cursor.executemany("INSERT INTO products (name, price) VALUES (?, ?)", products)
    conn.commit()

The example creates a products table and inserts four products with one
executemany call. Each tuple in the products list corresponds to
one row inserted.

Using with ensures proper resource cleanup. The connection commits
automatically on successful completion or rolls back on exception.

## Batch Insert with Named Parameters

This example shows how to use named parameters with executemany for
clearer code when dealing with many columns.

named_params.py
  

import sqlite3

with sqlite3.connect('employees.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                     (id INTEGER PRIMARY KEY, name TEXT, 
                      department TEXT, salary REAL)''')
    
    employees = [
        {'name': 'Alice', 'department': 'HR', 'salary': 55000},
        {'name': 'Bob', 'department': 'IT', 'salary': 65000},
        {'name': 'Charlie', 'department': 'Finance', 'salary': 70000}
    ]
    
    cursor.executemany(
        "INSERT INTO employees (name, department, salary) VALUES (:name, :department, :salary)",
        employees
    )
    conn.commit()

Here we use dictionary parameters with named placeholders (:name).
This makes the code more readable and maintainable, especially with many columns.

The dictionary keys must match the named placeholders in the SQL statement.
Order doesn't matter when using named parameters.

## Batch Update

executemany isn't just for inserts - it works equally well for
batch updates. This example updates multiple records in one operation.

batch_update.py
  

import sqlite3

with sqlite3.connect('inventory.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS inventory
                     (id INTEGER PRIMARY KEY, item TEXT, quantity INTEGER)''')
    
    # Initial data
    cursor.executemany(
        "INSERT INTO inventory (item, quantity) VALUES (?, ?)",
        [('Apples', 50), ('Oranges', 30), ('Bananas', 40)]
    )
    
    # Update quantities
    updates = [
        (35, 'Apples'),
        (25, 'Oranges'),
        (45, 'Bananas')
    ]
    
    cursor.executemany(
        "UPDATE inventory SET quantity = ? WHERE item = ?",
        updates
    )
    conn.commit()

This example first inserts some inventory items, then updates their quantities.
The update parameters are provided as a list of tuples matching the SQL template.

Note the parameter order in the update tuples must match the placeholders in the
SQL statement (quantity first, then item).

## Large Batch Insert with Generator

For very large datasets, you can use a generator with executemany to
avoid loading all data into memory at once.

generator_executemany.py
  

import sqlite3

def generate_data(num_records):
    for i in range(1, num_records + 1):
        yield (f'Product_{i}', i * 10.0)

with sqlite3.connect('large_data.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS large_products
                     (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    # Insert 10,000 records without loading all into memory
    cursor.executemany(
        "INSERT INTO large_products (name, price) VALUES (?, ?)",
        generate_data(10000)
    )
    conn.commit()

The generate_data function yields one record at a time, allowing
executemany to process them without storing all 10,000 in memory.

This approach is memory-efficient for large datasets. The generator creates data
on-demand as executemany processes each record.

## Transaction Handling with executemany

This example demonstrates transaction behavior with executemany,
showing how errors are handled when part of a batch fails.

transaction_handling.py
  

import sqlite3

with sqlite3.connect('transactions.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS accounts
                     (id INTEGER PRIMARY KEY, name TEXT, balance REAL)''')
    
    # Initial data
    cursor.execute("INSERT INTO accounts (name, balance) VALUES ('Alice', 1000)")
    cursor.execute("INSERT INTO accounts (name, balance) VALUES ('Bob', 500)")
    conn.commit()
    
    # Batch transfer that will fail
    transfers = [
        (100, 'Alice'),  # Valid
        (600, 'Bob'),     # Invalid (Bob only has 500)
        (200, 'Alice')    # Would be valid but won't execute
    ]
    
    try:
        cursor.executemany(
            "UPDATE accounts SET balance = balance - ? WHERE name = ?",
            transfers
        )
        conn.commit()
    except sqlite3.Error as e:
        print("Error occurred:", e)
        conn.rollback()

The example attempts three account updates in one executemany call.
The second update fails (insufficient funds), causing the entire batch to fail.

The transaction is rolled back, leaving the database in its original state. This
shows executemany is atomic - either all operations succeed or none
do.

## Performance Comparison

This example compares executemany performance against individual
execute calls to demonstrate the efficiency difference.

performance_comparison.py
  

import sqlite3
import time

def time_executemany():
    with sqlite3.connect(':memory:') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE test (id INTEGER, data TEXT)''')
        
        data = [(i, f'Data_{i}') for i in range(10000)]
        
        start = time.time()
        cursor.executemany("INSERT INTO test VALUES (?, ?)", data)
        conn.commit()
        return time.time() - start

def time_individual():
    with sqlite3.connect(':memory:') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE test (id INTEGER, data TEXT)''')
        
        data = [(i, f'Data_{i}') for i in range(10000)]
        
        start = time.time()
        for item in data:
            cursor.execute("INSERT INTO test VALUES (?, ?)", item)
        conn.commit()
        return time.time() - start

print(f"executemany time: {time_executemany():.4f} seconds")
print(f"Individual execute time: {time_individual():.4f} seconds")

The example creates an in-memory database and times inserting 10,000 records
using both methods. executemany is typically significantly faster.

The performance difference comes from reduced Python-SQLite round trips and
internal optimizations in SQLite for batch operations.

## Custom Batch Size for Large Operations

For extremely large operations, you might need to chunk the data to avoid memory
issues while still benefiting from batch performance.

chunked_executemany.py
  

import sqlite3

def generate_large_data(num_records):
    for i in range(1, num_records + 1):
        yield (f'Item_{i}', i % 100, i * 1.5)

BATCH_SIZE = 1000

with sqlite3.connect('huge_data.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS huge_table
                     (id INTEGER PRIMARY KEY, name TEXT, 
                      category INTEGER, value REAL)''')
    
    batch = []
    for record in generate_large_data(100000):
        batch.append(record)
        if len(batch) &gt;= BATCH_SIZE:
            cursor.executemany(
                "INSERT INTO huge_table (name, category, value) VALUES (?, ?, ?)",
                batch
            )
            batch = []
    
    # Insert any remaining records
    if batch:
        cursor.executemany(
            "INSERT INTO huge_table (name, category, value) VALUES (?, ?, ?)",
            batch
        )
    
    conn.commit()

This example processes 100,000 records in batches of 1,000. It balances memory
usage with batch performance benefits.

The approach is useful when dealing with datasets too large to process in one
executemany call but where individual inserts would be too slow.

## Best Practices

- **Use for bulk operations:** Significant performance gains with large datasets

- **Mind transaction size:** Very large batches may need chunking

- **Prefer named parameters:** More readable with many columns

- **Handle errors properly:** Remember the operation is atomic

- **Consider memory usage:** Use generators for very large datasets

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite INSERT Documentation](https://www.sqlite.org/lang_insert.html)

- [SQLite Performance Docs](https://www.sqlite.org/np1queryprob.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).