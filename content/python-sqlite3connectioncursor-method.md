+++
title = "Python sqlite3.Connection.cursor Method"
date = 2025-08-29T20:10:32.090+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.cursor method covering cursor creation, execution, and resource management."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.cursor Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.cursor
method, the primary way to execute SQL statements in SQLite databases. We'll cover
basic usage, execution methods, and practical examples with proper resource
management.

## Basic Definitions

The cursor method creates a cursor object associated with the
database connection. Cursors are used to execute SQL commands and fetch results.

Key characteristics: each cursor maintains its own state, can execute multiple
statements, and manages result sets. Cursors are lightweight but should be
properly closed when no longer needed.

## Basic Cursor Usage

Here's the simplest usage of cursor to create a cursor and execute
basic SQL statements.

basic_cursor.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    
    # Create table
    cursor.execute('''CREATE TABLE IF NOT EXISTS products
                     (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    # Insert data
    cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", 
                  ('Laptop', 999.99))
    
    # Query data
    cursor.execute("SELECT * FROM products")
    print(cursor.fetchall())

This example shows the basic workflow: create cursor, execute SQL statements, and
fetch results. The with statement ensures proper resource cleanup.

The cursor is automatically closed when the connection context exits. Parameterized
queries (with ? placeholders) are used for safe value insertion.

## Executing Multiple Statements

A single cursor can execute multiple SQL statements sequentially. This example
demonstrates batch operations.

multiple_statements.py
  

import sqlite3

with sqlite3.connect('inventory.db') as conn:
    cursor = conn.cursor()
    
    # Execute multiple statements
    cursor.executescript('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category_id INTEGER,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );
        
        INSERT INTO categories (name) VALUES ('Electronics');
        INSERT INTO categories (name) VALUES ('Clothing');
    ''')
    
    # Verify inserts
    cursor.execute("SELECT * FROM categories")
    print("Categories:", cursor.fetchall())

The executescript method executes multiple SQL statements at once.
This is useful for schema setup or batch operations. Each statement must be
properly terminated with a semicolon.

Note that executescript commits any pending transaction before
execution. Use it carefully in production code.

## Parameterized Queries with Cursor

Cursors support various parameter substitution methods for safe SQL construction.
This example shows different parameter styles.

parameterized_queries.py
  

import sqlite3

with sqlite3.connect('sales.db') as conn:
    cursor = conn.cursor()
    
    # qmark style (default)
    cursor.execute("INSERT INTO orders VALUES (?, ?, ?)", 
                  (1, '2023-01-15', 149.99))
    
    # named style
    cursor.execute("INSERT INTO orders VALUES (:id, :date, :amount)", 
                  {'id': 2, 'date': '2023-01-16', 'amount': 299.99})
    
    # format style (not recommended for security)
    cursor.execute("INSERT INTO orders VALUES (%s, %s, %s)" % 
                  (3, "'2023-01-17'", 199.99))
    
    # Verify inserts
    cursor.execute("SELECT * FROM orders")
    print("Orders:", cursor.fetchall())

This example demonstrates three parameter styles: qmark (?), named (:name), and
format (%s). The qmark and named styles are recommended for security.

Always prefer parameterized queries over string formatting to prevent SQL injection
attacks. The format style is shown for comparison but should be avoided.

## Cursor with Custom Row Factory

Cursors can return rows in different formats using row factories. This example
shows how to customize row output.

row_factory.py
  

import sqlite3
from collections import namedtuple

with sqlite3.connect('employees.db') as conn:
    # Set row factory for the connection
    conn.row_factory = sqlite3.Row
    
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                     (id INTEGER PRIMARY KEY, name TEXT, department TEXT)''')
    cursor.execute("INSERT INTO employees (name, department) VALUES (?, ?)",
                  ('Alice', 'Engineering'))
    
    # Fetch as dictionary-like Row object
    cursor.execute("SELECT * FROM employees")
    row = cursor.fetchone()
    print("Row as dict:", row['name'], row['department'])
    
    # Alternative: namedtuple factory
    def namedtuple_factory(cursor, row):
        fields = [col[0] for col in cursor.description]
        Employee = namedtuple('Employee', fields)
        return Employee(*row)
    
    cursor.row_factory = namedtuple_factory
    cursor.execute("SELECT * FROM employees")
    employee = cursor.fetchone()
    print("Row as namedtuple:", employee.name, employee.department)

This example shows two row factory approaches: SQLite's built-in Row
factory and a custom namedtuple factory. Both allow named access to
columns.

Row factories can be set at connection or cursor level. They greatly improve code
readability when working with result sets.

## Cursor with Transactions

Cursors play a key role in transaction management. This example demonstrates
manual transaction control.

transactions.py
  

import sqlite3

with sqlite3.connect('bank.db', isolation_level=None) as conn:
    cursor = conn.cursor()
    
    try:
        # Begin transaction explicitly
        cursor.execute("BEGIN")
        
        # Transfer funds
        cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
        cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
        
        # Simulate error
        # raise ValueError("Simulated error")
        
        # Commit if successful
        cursor.execute("COMMIT")
        print("Transaction completed successfully")
        
    except Exception as e:
        # Rollback on error
        cursor.execute("ROLLBACK")
        print("Transaction failed:", e)

This example shows manual transaction control with BEGIN, COMMIT, and ROLLBACK.
The isolation_level=None setting allows explicit transaction management.

Proper transaction handling is crucial for data integrity. The with
statement ensures the cursor is closed even if an error occurs.

## Cursor with Context Manager

Cursors can be used as context managers for automatic cleanup. This example shows
the recommended pattern.

cursor_context.py
  

import sqlite3
from contextlib import closing

with sqlite3.connect('library.db') as conn:
    with closing(conn.cursor()) as cursor:
        cursor.execute('''CREATE TABLE IF NOT EXISTS books
                        (id INTEGER PRIMARY KEY, title TEXT, author TEXT)''')
        
        # Batch insert with executemany
        books = [
            (1, 'Python Basics', 'John Doe'),
            (2, 'Advanced SQL', 'Jane Smith'),
            (3, 'Web Development', 'Alice Johnson')
        ]
        cursor.executemany("INSERT INTO books VALUES (?, ?, ?)", books)
        
        # Iterate through results
        cursor.execute("SELECT * FROM books")
        for row in cursor:
            print(row)

This example uses contextlib.closing to ensure the cursor is properly
closed. The executemany method efficiently inserts multiple rows.

Cursor iteration (for row in cursor) is memory-efficient for large
result sets. The double with statements manage both connection and
cursor resources.

## Cursor with Custom Types

Cursors can handle custom Python types through adapters and converters. This
example demonstrates type customization.

custom_types.py
  

import sqlite3
import json
from datetime import datetime

# Custom type adapter
def adapt_dict(d):
    return json.dumps(d)

# Custom type converter
def convert_dict(s):
    return json.loads(s)

# Register the adapter and converter
sqlite3.register_adapter(dict, adapt_dict)
sqlite3.register_converter("JSON", convert_dict)

with sqlite3.connect('data.db', detect_types=sqlite3.PARSE_DECLTYPES) as conn:
    cursor = conn.cursor()
    
    # Create table with custom type
    cursor.execute('''CREATE TABLE IF NOT EXISTS events
                     (id INTEGER PRIMARY KEY, 
                     timestamp TIMESTAMP,
                     data JSON)''')
    
    # Insert custom types
    event = {
        'type': 'login',
        'user': 'alice',
        'ip': '192.168.1.1'
    }
    cursor.execute("INSERT INTO events (timestamp, data) VALUES (?, ?)",
                  (datetime.now(), event))
    
    # Retrieve custom types
    cursor.execute("SELECT * FROM events")
    row = cursor.fetchone()
    print("Timestamp type:", type(row[1]))  # datetime
    print("Data type:", type(row[2]))      # dict

This example registers custom adapters and converters for Python dictionaries and
datetime objects. The PARSE_DECLTYPES flag enables type detection.

Custom type handling allows seamless storage and retrieval of complex Python
objects while maintaining database compatibility.

## Best Practices

- **Always close cursors:** Use context managers or explicit close()

- **Prefer parameterized queries:** Avoid SQL injection vulnerabilities

- **Manage transactions properly:** Commit or rollback as needed

- **Use appropriate fetch methods:** fetchone(), fetchmany(), or fetchall()

- **Consider cursor arraysize:** Optimize for batch operations

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Cursor Documentation](https://www.sqlite.org/c3ref/cursor.html)

- [Python DB API 2.0 Specification](https://peps.python.org/pep-0249/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).