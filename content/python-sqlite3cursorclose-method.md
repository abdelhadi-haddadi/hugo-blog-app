+++
title = "Python sqlite3.Cursor.close Method"
date = 2025-08-29T20:10:38.917+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.close method covering cursor management, resource cleanup, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.close Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.close method,
which is essential for proper database resource management. We'll cover its purpose,
usage patterns, and best practices with practical examples.

## Basic Definitions

The sqlite3.Cursor.close method closes the cursor, releasing any
associated resources. Once closed, the cursor cannot be used for further operations.

Key characteristics: it's idempotent (safe to call multiple times), releases
database locks, and helps prevent resource leaks. Proper cursor management is
crucial for database applications.

## Basic Cursor Close

This example demonstrates the basic usage of Cursor.close in a
traditional try-finally block to ensure cleanup.

basic_close.py
  

import sqlite3

conn = sqlite3.connect('example.db')
cursor = conn.cursor()

try:
    cursor.execute("SELECT * FROM users")
    for row in cursor:
        print(row)
finally:
    cursor.close()  # Explicitly close the cursor
    conn.close()

The cursor is closed in the finally block to ensure it happens even if an
exception occurs during execution. This pattern guarantees resource cleanup.

While modern Python often uses context managers, understanding explicit close
is important for legacy code or custom resource management scenarios.

## Using Cursor with Context Manager

The cursor can be used as a context manager for automatic cleanup. This is the
recommended approach in modern Python code.

context_manager.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    with conn.cursor() as cursor:  # Cursor as context manager
        cursor.execute("SELECT name, age FROM users")
        print(cursor.fetchall())
    # Cursor automatically closed here
# Connection automatically closed here

The with statement ensures both connection and cursor are properly
closed when the block exits, even if an error occurs. This is cleaner and safer.

Nested context managers handle both connection and cursor cleanup elegantly.
The inner cursor context closes first, then the connection context.

## Multiple Cursors with Context Managers

This example shows how to manage multiple cursors using context managers in
a single connection.

multiple_cursors.py
  

import sqlite3

with sqlite3.connect('inventory.db') as conn:
    with conn.cursor() as items_cursor:
        items_cursor.execute("SELECT * FROM items")
        items = items_cursor.fetchall()
    
    with conn.cursor() as sales_cursor:
        sales_cursor.execute("SELECT * FROM sales")
        sales = sales_cursor.fetchall()
    
    print(f"Total items: {len(items)}, Total sales: {len(sales)}")

Each cursor is managed in its own context block, ensuring proper cleanup after
use. The connection remains open for all operations until the outer block exits.

This pattern is useful when you need separate cursors for different queries but
want to maintain a single transaction scope.

## Cursor Close with Error Handling

This example demonstrates proper cursor cleanup in the face of potential errors.

error_handling.py
  

import sqlite3

try:
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM non_existent_table")
    results = cursor.fetchall()
    
except sqlite3.Error as e:
    print(f"Database error: {e}")
finally:
    if 'cursor' in locals():
        cursor.close()  # Ensure cursor is closed
    if 'conn' in locals():
        conn.close()    # Ensure connection is closed

The finally block checks if resources exist before attempting to close them.
This prevents AttributeError if the connection or cursor creation failed.

Robust error handling with proper cleanup is essential for production database
applications to prevent resource leaks.

## Cursor Close in Function

This example shows proper cursor management within a function that returns data.

function_close.py
  

import sqlite3

def get_user_count():
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()[0]
        return count
    finally:
        cursor.close()
        conn.close()

print(f"Total users: {get_user_count()}")

The function ensures both cursor and connection are closed before returning,
even if an error occurs. This prevents resource leaks when the function is called.

For functions that work with databases, always clean up resources before returning
to avoid leaving open connections or cursors.

## Cursor Close with Connection Pooling

This advanced example demonstrates cursor management with connection pooling.

connection_pool.py
  

import sqlite3
from contextlib import contextmanager

@contextmanager
def db_connection():
    conn = sqlite3.connect('app.db', timeout=10.0)
    try:
        yield conn
    finally:
        conn.close()

@contextmanager
def db_cursor(conn):
    cursor = conn.cursor()
    try:
        yield cursor
    finally:
        cursor.close()

# Usage:
with db_connection() as conn:
    with db_cursor(conn) as cursor:
        cursor.execute("UPDATE stats SET visits = visits + 1")
        conn.commit()

This example creates reusable context managers for both connection and cursor
management. The nested structure ensures proper cleanup order.

Connection pooling patterns like this are useful in web applications or services
that handle many database operations.

## Cursor Close with Row Factory

This example combines cursor management with row factory configuration.

row_factory.py
  

import sqlite3

with sqlite3.connect('products.db') as conn:
    conn.row_factory = sqlite3.Row  # Enable named column access
    with conn.cursor() as cursor:
        cursor.execute("SELECT id, name, price FROM products")
        for row in cursor:
            print(f"{row['id']}: {row['name']} (${row['price']:.2f})")

The cursor inherits the connection's row factory setting. The context managers
ensure both connection and cursor are properly closed after use.

Using sqlite3.Row provides named column access while maintaining
the benefits of proper resource cleanup through context managers.

## Best Practices

- **Always close cursors:** Use context managers for automatic cleanup

- **Close cursors promptly:** Release resources when done

- **Order matters:** Close cursors before connections

- **Prefer context managers:** Safer than manual close calls

- **Check before closing:** In finally blocks, verify existence

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Cursor Close API](https://www.sqlite.org/c3ref/c_close.html)

- [Python DB API 2.0 Specification](https://peps.python.org/pep-0249/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).