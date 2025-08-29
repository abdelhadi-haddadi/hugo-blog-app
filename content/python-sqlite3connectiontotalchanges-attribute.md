+++
title = "Python sqlite3.Connection.total_changes Attribute"
date = 2025-08-29T20:10:37.796+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.total_changes attribute covering database change tracking and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.total_changes Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.total_changes
attribute, which tracks the total number of database rows modified since connection.
We'll cover its behavior, usage patterns, and practical examples.

## Basic Definitions

The total_changes attribute of an SQLite connection object returns
the total number of database rows that have been modified, inserted, or deleted
since the database connection was opened.

Key characteristics: it counts all changes including those from triggers,
it's connection-specific, and the counter resets when the connection closes.
This is different from changes which only shows the last operation.

## Basic Usage of total_changes

This example demonstrates the basic usage of total_changes to track
modifications made through a connection.

basic_usage.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE test (id INTEGER, data TEXT)')
    
    # Initial changes (table creation counts)
    print(f"Initial changes: {conn.total_changes}")
    
    cursor.execute("INSERT INTO test VALUES (1, 'First')")
    cursor.execute("INSERT INTO test VALUES (2, 'Second')")
    
    # Changes after inserts
    print(f"After inserts: {conn.total_changes}")
    
    cursor.execute("UPDATE test SET data = 'Updated' WHERE id = 1")
    
    # Changes after update
    print(f"After update: {conn.total_changes}")

This example creates an in-memory database, makes several modifications, and
prints the change count after each operation. Table creation also counts as
a change in SQLite.

The output would show increasing numbers as each operation affects the database.
This is the simplest way to monitor overall database activity.

## Tracking Changes Within Transactions

This example shows how total_changes behaves with transactions,
including rollbacks.

transaction_changes.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)')
    
    print(f"After create: {conn.total_changes}")
    
    # First transaction
    cursor.execute("INSERT INTO items (name) VALUES ('Apple')")
    cursor.execute("INSERT INTO items (name) VALUES ('Banana')")
    conn.commit()
    print(f"After commit: {conn.total_changes}")
    
    # Second transaction (rolled back)
    cursor.execute("INSERT INTO items (name) VALUES ('Cherry')")
    print(f"Before rollback: {conn.total_changes}")
    conn.rollback()
    print(f"After rollback: {conn.total_changes}")

This demonstrates that total_changes includes uncommitted changes
until a rollback occurs. The counter increases with each operation but decreases
when changes are rolled back.

The rollback reverts the counter to its pre-transaction state, showing that
total_changes reflects the actual persisted state of the database.

## Comparing total_changes and changes

This example contrasts total_changes with the changes
attribute which only shows the last operation's impact.

changes_comparison.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE logs (id INTEGER, message TEXT)')
    
    print(f"Total changes: {conn.total_changes}")
    print(f"Last changes: {conn.changes}")
    
    cursor.executemany("INSERT INTO logs VALUES (?, ?)", 
                      [(1, 'start'), (2, 'middle'), (3, 'end')])
    
    print(f"After multi-insert - Total: {conn.total_changes}")
    print(f"After multi-insert - Last: {conn.changes}")
    
    cursor.execute("DELETE FROM logs WHERE id IN (1, 3)")
    
    print(f"After delete - Total: {conn.total_changes}")
    print(f"After delete - Last: {conn.changes}")

The key difference is that changes only shows the row count from
the most recent operation, while total_changes accumulates all
changes. This is particularly noticeable with multi-row operations.

The changes attribute is useful for immediate feedback, while
total_changes provides a connection-wide activity metric.

## Trigger Impact on total_changes

This example demonstrates how triggers affect the total_changes
count, as they perform additional operations that get counted.

trigger_impact.py
  

import sqlite3

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    
    # Create tables and trigger
    cursor.execute('CREATE TABLE orders (id INTEGER, amount REAL)')
    cursor.execute('CREATE TABLE audit (order_id INTEGER, change TEXT)')
    cursor.execute('''CREATE TRIGGER log_order AFTER INSERT ON orders
                     BEGIN
                         INSERT INTO audit VALUES (NEW.id, 'Order created');
                     END''')
    
    print(f"After setup: {conn.total_changes}")
    
    # Insert that fires the trigger
    cursor.execute("INSERT INTO orders VALUES (1, 99.99)")
    print(f"After insert: {conn.total_changes}")
    
    # Verify both tables were modified
    print("Orders:", cursor.execute("SELECT * FROM orders").fetchall())
    print("Audit:", cursor.execute("SELECT * FROM audit").fetchall())

The trigger causes an additional insert into the audit table, which means a
single INSERT operation results in two counted changes. This shows
how total_changes captures all database modifications.

Understanding this behavior is important when triggers are present, as the
change count may be higher than expected from just the direct operations.

## Monitoring Bulk Operations

This example shows how total_changes can be used to monitor
large batch operations and provide progress feedback.

bulk_operations.py
  

import sqlite3
import random

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE readings (id INTEGER, value REAL)')
    
    # Insert 1000 random readings
    for i in range(1, 1001):
        cursor.execute("INSERT INTO readings VALUES (?, ?)", 
                      (i, random.uniform(0, 100)))
        if i % 100 == 0:
            print(f"Inserted {i} rows, total changes: {conn.total_changes}")
    
    # Delete half the records
    cursor.execute("DELETE FROM readings WHERE id % 2 = 0")
    print(f"After delete: {conn.total_changes}")

This pattern is useful for long-running operations where you want to provide
progress updates. The total_changes gives an accurate count of
all modifications made so far.

The example also shows that deletes are counted the same way as inserts,
with each removed row incrementing the counter.

## Resetting total_changes

While total_changes can't be directly reset, this example shows
how to effectively create a new baseline by using separate connections.

resetting_changes.py
  

import sqlite3

# First connection with initial changes
with sqlite3.connect('test.db') as conn1:
    cursor = conn1.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS temp (id INTEGER)')
    cursor.execute('INSERT INTO temp VALUES (1)')
    print(f"Connection 1 changes: {conn1.total_changes}")
    
# Second connection starts fresh
with sqlite3.connect('test.db') as conn2:
    cursor = conn2.cursor()
    print(f"Connection 2 initial: {conn2.total_changes}")
    cursor.execute('INSERT INTO temp VALUES (2)')
    print(f"Connection 2 after insert: {conn2.total_changes}")

Each new connection starts with a total_changes count of zero.
This example shows how to effectively "reset" tracking by creating a new
connection when needed.

This approach is useful when you want to monitor changes during specific
phases of application execution separately.

## Performance Considerations

This example demonstrates that accessing total_changes has minimal
performance impact, making it safe to use frequently.

performance_test.py
  

import sqlite3
import time

with sqlite3.connect(':memory:') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE test (id INTEGER)')
    
    start_time = time.time()
    for i in range(10000):
        cursor.execute("INSERT INTO test VALUES (?)", (i,))
        changes = conn.total_changes  # Access in each iteration
    duration = time.time() - start_time
    
    print(f"Inserted {conn.total_changes} rows in {duration:.3f} seconds")
    print(f"Average time per insert: {(duration*1000)/10000:.3f} ms")

The total_changes counter is maintained by SQLite internally,
so accessing it is very efficient. This example shows that frequent access
adds negligible overhead.

This makes it practical to use in performance-sensitive code where you need
to monitor database activity without significant impact.

## Best Practices

- **Use for monitoring:** Great for tracking overall database activity

- **Understand scope:** Counts all changes including triggers

- **Connection-specific:** Each connection maintains its own count

- **Combine with changes:** Use both attributes for complete picture

- **No reset:** Create new connection if you need fresh counting

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite total_changes API](https://www.sqlite.org/c3ref/total_changes.html)

- [SQLite Triggers](https://www.sqlite.org/lang_createtrigger.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).