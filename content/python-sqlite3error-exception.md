+++
title = "Python sqlite3.Error Exception"
date = 2025-08-29T20:10:44.616+01:00
draft = false
description = "Complete guide to Python's sqlite3.Error exception covering error handling, examples, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Error Exception

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Error exception,
the base class for all SQLite database errors. We'll cover error handling,
specific exception types, and practical examples.

## Basic Definitions

The sqlite3.Error is the base exception class for SQLite database
errors. It's raised when SQLite encounters problems during database operations.

Key characteristics: it provides error details through its message, has specific
subclasses for different error types, and helps maintain database integrity by
signaling issues.

## Basic Error Handling

This example shows basic error handling with sqlite3.Error when
executing SQL statements.

basic_error.py
  

import sqlite3

try:
    with sqlite3.connect('example.db') as conn:
        cursor = conn.cursor()
        # This will raise sqlite3.Error if table doesn't exist
        cursor.execute("SELECT * FROM non_existent_table")
        print(cursor.fetchall())
except sqlite3.Error as e:
    print(f"Database error occurred: {e}")

This example demonstrates catching the base sqlite3.Error exception.
The with statement ensures proper resource cleanup even if an error
occurs.

The error message will indicate what went wrong, such as "no such table" in this
case. Always handle database errors to prevent crashes.

## Handling Specific Error Types

SQLite provides specific exception subclasses for different error conditions.
This example shows how to handle them separately.

specific_errors.py
  

import sqlite3

try:
    with sqlite3.connect('example.db') as conn:
        cursor = conn.cursor()
        # Attempt to create table with invalid SQL
        cursor.execute("CREATE TABLE users (id INVALID_TYPE)")
except sqlite3.OperationalError as e:
    print(f"Operational error: {e}")
except sqlite3.ProgrammingError as e:
    print(f"Programming error: {e}")
except sqlite3.Error as e:
    print(f"Generic database error: {e}")

This example shows catching specific SQLite exceptions. OperationalError
is for SQL execution problems, while ProgrammingError is for API misuse.

Handling specific exceptions allows for more precise error recovery and user
feedback. The base sqlite3.Error catches any unhandled cases.

## Database Integrity Error

This example demonstrates handling sqlite3.IntegrityError which
occurs when database constraints are violated.

integrity_error.py
  

import sqlite3

try:
    with sqlite3.connect(':memory:') as conn:
        cursor = conn.cursor()
        cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT UNIQUE)")
        cursor.execute("INSERT INTO users (email) VALUES ('test@example.com')")
        # This will violate UNIQUE constraint
        cursor.execute("INSERT INTO users (email) VALUES ('test@example.com')")
except sqlite3.IntegrityError as e:
    print(f"Integrity constraint violated: {e}")
except sqlite3.Error as e:
    print(f"Other database error: {e}")

The example creates a table with a UNIQUE constraint and attempts to insert
duplicate emails. This raises an IntegrityError.

Integrity errors are critical for maintaining data consistency. They should
always be caught and handled appropriately in applications.

## Database Lock Error

This example shows handling sqlite3.OperationalError when the
database is locked by another process.

locked_db.py
  

import sqlite3
import time

def process1():
    with sqlite3.connect('locked.db') as conn:
        cursor = conn.cursor()
        cursor.execute("BEGIN EXCLUSIVE")
        cursor.execute("UPDATE counters SET value = value + 1")
        time.sleep(5)  # Hold lock for 5 seconds
        conn.commit()

def process2():
    try:
        with sqlite3.connect('locked.db', timeout=1) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM counters")
            print(cursor.fetchall())
    except sqlite3.OperationalError as e:
        print(f"Database locked error: {e}")

# In real code, these would be separate processes
process1()
process2()

The example simulates two processes accessing the same database. The second
process fails with an OperationalError when it can't acquire a lock.

Database locking is common in multi-process applications. Proper error handling
and retry logic should be implemented for robustness.

## Transaction Rollback on Error

This example demonstrates automatic transaction rollback when an error occurs
within a context manager.

rollback_on_error.py
  

import sqlite3

try:
    with sqlite3.connect('transactions.db') as conn:
        cursor = conn.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS accounts (id INTEGER, balance REAL)")
        cursor.execute("INSERT INTO accounts VALUES (1, 100.0)")
        cursor.execute("INSERT INTO accounts VALUES (2, 200.0)")
        
        # This will cause an error (division by zero)
        invalid = 1 / 0
        
        cursor.execute("UPDATE accounts SET balance = balance - 50 WHERE id = 1")
        cursor.execute("UPDATE accounts SET balance = balance + 50 WHERE id = 2")
except sqlite3.Error as e:
    print(f"Database error: {e}")
except ZeroDivisionError as e:
    print(f"Application error: {e}")
    # Check that transaction was rolled back
    with sqlite3.connect('transactions.db') as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM accounts")
        print("Accounts after error:", cursor.fetchall())

The example shows that any exception (database or otherwise) within the context
manager triggers a rollback. The initial inserts are reverted.

This automatic rollback behavior helps maintain database consistency when errors
occur during complex operations.

## Custom Error Handling Function

This example demonstrates creating a custom error handler for database operations.

custom_handler.py
  

import sqlite3
from typing import Callable

def db_operation(operation: Callable, error_handler: Callable):
    try:
        with sqlite3.connect('example.db') as conn:
            return operation(conn)
    except sqlite3.Error as e:
        return error_handler(e)

def query_users(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    return cursor.fetchall()

def handle_error(e):
    print(f"Custom error handling: {e}")
    return []

# Usage
result = db_operation(query_users, handle_error)
print("Query result:", result)

The example wraps database operations in a function that handles errors
consistently. The with statement ensures proper cleanup.

This pattern is useful for applications with many database calls that need
uniform error handling and resource management.

## Best Practices

- **Always handle exceptions:** Never let database errors propagate unchecked

- **Use specific exceptions:** Catch the most specific exception possible

- **Clean up resources:** Use context managers for automatic cleanup

- **Provide user feedback:** Translate technical errors to user-friendly messages

- **Log errors:** Record detailed error information for debugging

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Result Codes](https://www.sqlite.org/rescode.html)

- [SQLite Transactions](https://www.sqlite.org/lang_transaction.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).