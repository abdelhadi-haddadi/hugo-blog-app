+++
title = "Python sqlite3.Connection.executemany Method"
date = 2025-08-29T20:10:33.213+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.executemany method covering batch operations, parameters, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.executemany Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.executemany
method for efficient batch operations in SQLite databases. We'll cover basic usage,
parameters, performance considerations, and practical examples.

## Basic Definitions

The executemany method executes a parameterized SQL command against
all parameter sequences in a sequence. It's optimized for inserting or updating
multiple rows with a single call.

Key characteristics: it's faster than multiple execute calls, reduces
Python-to-SQLite round trips, and maintains transaction integrity automatically.
The method is available on both Connection and Cursor objects.

## Basic Batch Insert

This example demonstrates the simplest usage of executemany to insert
multiple rows into a table with a single call.

basic_executemany.py
  

import sqlite3

# Sample data to insert
users = [
    ('Alice', 30),
    ('Bob', 25),
    ('Charlie', 35),
    ('Diana', 28)
]

with sqlite3.connect('users.db') as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)''')
    
    # Insert all users with executemany
    conn.executemany("INSERT INTO users (name, age) VALUES (?, ?)", users)

The executemany method takes an SQL statement with placeholders and
a sequence of parameter sequences. Each inner sequence provides values for one
row insertion.

This approach is more efficient than individual execute calls as it
uses a single transaction and reduces overhead. The connection is automatically
closed by the context manager.

## Batch Update with Named Parameters

This example shows how to use executemany with named parameters for
updating multiple rows.

named_params.py
  

import sqlite3

# Sample update data
updates = [
    {'new_name': 'Alice Smith', 'user_id': 1},
    {'new_name': 'Robert Brown', 'user_id': 2},
    {'new_name': 'Charles Green', 'user_id': 3}
]

with sqlite3.connect('users.db') as conn:
    # Use named placeholders with :prefix
    conn.executemany(
        "UPDATE users SET name = :new_name WHERE id = :user_id",
        updates
    )

Named parameters make the SQL more readable and maintainable, especially with
many columns. The parameter sequences can be dictionaries mapping names to values.

This pattern is useful when updating multiple rows with different values while
keeping the same update logic for all rows in the batch.

## Large Dataset Insertion

For very large datasets, you can use generators with executemany to
avoid loading all data into memory at once.

large_dataset.py
  

import sqlite3
import random
import string

def generate_users(count):
    """Generate random user data"""
    for i in range(count):
        name = ''.join(random.choices(string.ascii_letters, k=10))
        age = random.randint(18, 99)
        yield (name, age)

with sqlite3.connect('large.db') as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)''')
    
    # Insert 10,000 users without loading all into memory
    conn.executemany(
        "INSERT INTO users (name, age) VALUES (?, ?)",
        generate_users(10000)
    )

The generator generate_users produces data on demand rather than
creating a large list in memory. This is memory-efficient for huge datasets.

SQLite efficiently handles the batch insertion in a single transaction, making
this much faster than individual inserts even with the generator overhead.

## Batch Delete Operation

executemany can also be used for batch delete operations, removing
multiple rows based on different criteria.

batch_delete.py
  

import sqlite3

# IDs to delete
ids_to_delete = [(3,), (7,), (11,), (23,)]

with sqlite3.connect('users.db') as conn:
    # Create a temporary backup table
    conn.execute("CREATE TABLE IF NOT EXISTS users_backup AS SELECT * FROM users")
    
    # Delete multiple users by ID
    conn.executemany("DELETE FROM users WHERE id = ?", ids_to_delete)
    
    # Verify deletions
    remaining = conn.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    print(f"Users remaining: {remaining}")

Note the tuple format (3,) for single parameters - each parameter
sequence must be a sequence (tuple, list, etc.), even with one value per row.

This approach ensures all deletions happen atomically in a single transaction,
maintaining database consistency even if some IDs don't exist.

## Error Handling in Batch Operations

This example demonstrates proper error handling when using executemany
to ensure data integrity when errors occur.

error_handling.py
  

import sqlite3

products = [
    (101, 'Laptop', 999.99),
    (102, 'Phone', 699.99),
    (103, 'Tablet', 399.99),
    (104, None, 199.99),  # Invalid - name cannot be NULL
    (105, 'Monitor', 249.99)
]

try:
    with sqlite3.connect('products.db') as conn:
        conn.execute('''CREATE TABLE products
                        (id INTEGER PRIMARY KEY,
                         name TEXT NOT NULL,
                         price REAL)''')
        
        conn.executemany(
            "INSERT INTO products VALUES (?, ?, ?)",
            products
        )
except sqlite3.IntegrityError as e:
    print(f"Batch insert failed: {e}")
    # Check which rows were inserted
    with sqlite3.connect('products.db') as conn:
        count = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
        print(f"Successfully inserted {count} rows")

When an error occurs during executemany, the entire operation is
rolled back. The example shows how to handle such cases and investigate partial
results.

For more granular error handling, you might need to split large batches or
validate data before insertion.

## Using executemany with Custom Types

This example shows how to use executemany with custom Python types
by registering adapters.

custom_types.py
  

import sqlite3
from datetime import date

# Sample data with dates
events = [
    ('Conference', date(2023, 6, 15), date(2023, 6, 17)),
    ('Workshop', date(2023, 7, 1), date(2023, 7, 1)),
    ('Seminar', date(2023, 8, 12), date(2023, 8, 13))
]

# Register date adapter
def adapt_date(d):
    return d.isoformat()

sqlite3.register_adapter(date, adapt_date)

with sqlite3.connect('events.db') as conn:
    conn.execute('''CREATE TABLE events
                    (name TEXT, start_date TEXT, end_date TEXT)''')
    
    conn.executemany(
        "INSERT INTO events VALUES (?, ?, ?)",
        events
    )
    
    # Verify insertion
    for row in conn.execute("SELECT * FROM events"):
        print(row)

The example registers a custom adapter for Python's date objects to
properly store them in SQLite. The same adapter works for all parameters in the
executemany call.

This pattern is useful when working with non-native SQLite types while still
benefiting from batch operations.

## Performance Comparison

This example compares the performance of executemany versus
individual execute calls.

performance.py
  

import sqlite3
import time

def time_inserts(conn, data, use_executemany):
    conn.execute("CREATE TABLE temp_test (id INTEGER, value TEXT)")
    
    start = time.time()
    
    if use_executemany:
        conn.executemany("INSERT INTO temp_test VALUES (?, ?)", data)
    else:
        for row in data:
            conn.execute("INSERT INTO temp_test VALUES (?, ?)", row)
    
    conn.commit()
    elapsed = time.time() - start
    conn.execute("DROP TABLE temp_test")
    return elapsed

# Generate test data (1000 rows)
test_data = [(i, f"Value {i}") for i in range(1000)]

with sqlite3.connect(':memory:') as conn:
    # Time executemany
    tm_many = time_inserts(conn, test_data, True)
    
    # Time individual executes
    tm_single = time_inserts(conn, test_data, False)
    
    print(f"executemany: {tm_many:.4f} seconds")
    print(f"Individual: {tm_single:.4f} seconds")
    print(f"Speedup: {tm_single/tm_many:.1f}x")

The example creates an in-memory database and times inserting 1000 rows using
both methods. executemany is typically significantly faster.

The performance advantage comes from reduced Python-SQLite round trips and
transaction overhead. The difference grows with larger datasets.

## Best Practices

- **Use for batch operations:** Ideal for inserts/updates of multiple rows

- **Mind memory usage:** For huge datasets, consider generators

- **Handle errors properly:** Entire batch fails on error

- **Consider chunking:** Very large batches may need splitting

- **Use transactions:** executemany runs in single transaction

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite INSERT Documentation](https://www.sqlite.org/lang_insert.html)

- [SQLite Performance Tips](https://www.sqlite.org/np1queryprob.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).