+++
title = "Python sqlite3.Connection.commit Method"
date = 2025-08-29T20:10:30.960+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.commit method covering transactions, usage patterns, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.commit Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.commit
method, which finalizes database transactions. We'll cover its purpose, usage
patterns, and practical examples with proper resource management.

## Basic Definitions

The commit method finalizes the current transaction in an SQLite
database. It makes all changes since the last commit or rollback permanent.

Key characteristics: it's called on a connection object, writes changes to disk,
and ends the current transaction. Without committing, changes are only visible
to the current connection.

## Basic Commit Example

This example shows the basic usage of commit to save changes to
the database. We'll create a table and insert some data.

basic_commit.py
  

import sqlite3

with sqlite3.connect('test.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS products
                     (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", 
                  ('Laptop', 999.99))
    
    # Explicitly commit the transaction
    conn.commit()
    
    print("Transaction committed successfully")

The commit call makes the table creation and data insertion
permanent. Without it, changes would be lost when the connection closes.

Note we use a with statement to ensure the connection is properly
closed, even if an error occurs during execution.

## Autocommit Mode Example

SQLite can operate in autocommit mode where each statement is automatically
committed. This example demonstrates how to enable it.

autocommit.py
  

import sqlite3

# Set isolation_level=None for autocommit mode
with sqlite3.connect('autocommit.db', isolation_level=None) as conn:
    cursor = conn.cursor()
    
    # No need for explicit commit - each statement is committed immediately
    cursor.execute("CREATE TABLE IF NOT EXISTS logs (message TEXT, created_at TIMESTAMP)")
    cursor.execute("INSERT INTO logs VALUES ('System started', datetime('now'))")
    
    cursor.execute("SELECT * FROM logs")
    print(cursor.fetchall())

In autocommit mode (isolation_level=None), each SQL statement is
treated as a separate transaction. This can be useful for simple scripts.

Be cautious with autocommit in complex operations as it doesn't provide atomicity
for multiple statements.

## Multiple Operations in Single Transaction

This example shows how to group multiple operations in a single transaction
with explicit commit.

multi_operation.py
  

import sqlite3

with sqlite3.connect('bank.db') as conn:
    try:
        cursor = conn.cursor()
        
        # Start transaction (implicit with first execute)
        cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
        cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
        
        # Commit both updates together
        conn.commit()
        print("Funds transferred successfully")
        
    except sqlite3.Error as e:
        print("Transaction failed:", e)
        conn.rollback()

Both UPDATE statements are part of the same transaction. They will either both
succeed (when committed) or both fail (if rollback occurs).

This atomicity is crucial for operations like financial transactions where
partial updates would leave data inconsistent.

## Commit with Context Managers

Python's context managers can handle commits automatically. This example shows
both connection and cursor as context managers.

context_managers.py
  

import sqlite3
from contextlib import closing

with sqlite3.connect('inventory.db') as conn:
    with closing(conn.cursor()) as cursor:
        cursor.execute('''CREATE TABLE IF NOT EXISTS items
                         (id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER)''')
        cursor.executemany("INSERT INTO items (name, quantity) VALUES (?, ?)",
                          [('Hammer', 10), ('Nails', 500), ('Screwdriver', 8)])
        
        # No explicit commit needed - connection context manager handles it
        print("Items added to inventory")

The connection's context manager automatically commits if no exceptions occur,
or rolls back if there's an error. The closing wrapper ensures the
cursor is properly closed.

This pattern reduces boilerplate code and ensures proper resource cleanup.

## Performance Impact of Frequent Commits

This example demonstrates the performance difference between frequent commits
and batching operations in a single transaction.

performance.py
  

import sqlite3
import time

def time_operations(commit_frequency):
    with sqlite3.connect('perf_test.db') as conn:
        cursor = conn.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS test_data (value INTEGER)")
        cursor.execute("DELETE FROM test_data")  # Clear previous data
        
        start = time.time()
        for i in range(1000):
            cursor.execute("INSERT INTO test_data VALUES (?)", (i,))
            if i % commit_frequency == 0:
                conn.commit()
        conn.commit()  # Final commit
        return time.time() - start

# Test different commit frequencies
print("Commit every 1 row:", time_operations(1), "seconds")
print("Commit every 10 rows:", time_operations(10), "seconds")
print("Commit every 100 rows:", time_operations(100), "seconds")

Each commit operation has overhead as SQLite must write changes to disk. This
example shows how batching operations in fewer transactions improves performance.

Find the right balance between transaction size (performance) and atomicity
requirements (data consistency).

## Commit with Savepoints

SQLite supports savepoints for nested transactions. This example shows how to
use them with commit and rollback.

savepoints.py
  

import sqlite3

with sqlite3.connect('savepoints.db') as conn:
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, description TEXT)")
    
    # Main transaction
    cursor.execute("INSERT INTO tasks (description) VALUES ('Main task')")
    
    # Create savepoint
    cursor.execute("SAVEPOINT checkpoint1")
    try:
        cursor.execute("INSERT INTO tasks (description) VALUES ('Optional subtask 1')")
        cursor.execute("INSERT INTO tasks (description) VALUES ('Optional subtask 2')")
        
        # Commit just the savepoint changes
        cursor.execute("RELEASE SAVEPOINT checkpoint1")
        print("Savepoint changes committed")
        
    except:
        # Rollback only the savepoint changes
        cursor.execute("ROLLBACK TO SAVEPOINT checkpoint1")
        print("Savepoint changes rolled back")
    
    # Commit the main transaction
    conn.commit()
    print("Main transaction committed")

Savepoints allow partial rollback within a larger transaction. The RELEASE
statement commits just the savepoint's changes, while the main transaction
still needs an explicit commit.

This is useful for complex operations where some parts are optional or might fail
without requiring complete rollback.

## Commit in Multi-threaded Environment

This example demonstrates proper commit usage when multiple threads access the
same database.

threading.py
  

import sqlite3
import threading

def worker(worker_id):
    # Each thread gets its own connection
    with sqlite3.connect('threaded.db', timeout=10.0) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO thread_log (thread_id, action) VALUES (?, ?)",
                      (worker_id, f"Started work {worker_id}"))
        
        # Simulate work
        import random
        import time
        time.sleep(random.random())
        
        cursor.execute("UPDATE counters SET value = value + 1 WHERE id = 1")
        conn.commit()
        print(f"Thread {worker_id} committed changes")

# Initialize database
with sqlite3.connect('threaded.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS thread_log (thread_id INTEGER, action TEXT)")
    conn.execute("CREATE TABLE IF NOT EXISTS counters (id INTEGER PRIMARY KEY, value INTEGER)")
    conn.execute("INSERT OR IGNORE INTO counters VALUES (1, 0)")
    conn.commit()

# Start multiple threads
threads = [threading.Thread(target=worker, args=(i,)) for i in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

Each thread must have its own connection and manage its transactions separately.
The timeout parameter prevents indefinite waiting if the database is locked.

Proper commit handling is crucial in multi-threaded scenarios to prevent
deadlocks and ensure data consistency across threads.

## Best Practices

- **Always commit or rollback:** Never leave transactions open

- **Use context managers:** For automatic resource cleanup

- **Batch operations:** Group related changes in single transactions

- **Handle errors:** Implement proper rollback on failure

- **Consider isolation levels:** Choose appropriate for your use case

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Transaction Documentation](https://www.sqlite.org/lang_transaction.html)

- [SQLite Isolation Levels](https://www.sqlite.org/isolation.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).