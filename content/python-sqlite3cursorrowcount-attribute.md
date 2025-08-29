+++
title = "Python sqlite3.Cursor.rowcount Attribute"
date = 2025-08-29T20:10:42.347+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.rowcount attribute covering database operations, affected rows, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.rowcount Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.rowcount
attribute, which returns the number of rows modified by the last operation.
We'll cover its behavior, limitations, and practical usage examples.

## Basic Definitions

The rowcount attribute of a SQLite cursor returns the number of rows
affected by the last executed operation. It's useful for UPDATE, DELETE, and
INSERT statements.

Key characteristics: it's read-only, returns -1 if no operation was performed or
for SELECT statements, and reflects only the most recent operation's impact.

## Basic rowcount Example

This example demonstrates the basic usage of rowcount after an
UPDATE operation.

basic_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS users
                    (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)''')
    conn.execute("INSERT INTO users (name, age) VALUES ('Alice', 30)")
    conn.execute("INSERT INTO users (name, age) VALUES ('Bob', 25)")
    
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET age = age + 1 WHERE name LIKE 'A%'")
    print(f"Rows updated: {cursor.rowcount}")  # Output: 1

The example shows that rowcount correctly reports 1 row was updated.
The UPDATE operation only affected Alice's record due to the WHERE clause.

Note how we use a context manager (with) to automatically handle
connection cleanup, ensuring resources are properly released.

## rowcount with DELETE Operation

This example demonstrates rowcount after a DELETE operation.

delete_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    
    # Setup test data
    cursor.executescript('''
        DROP TABLE IF EXISTS products;
        CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT);
        INSERT INTO products (name) VALUES ('Laptop'), ('Phone'), ('Tablet');
    ''')
    
    # Delete operation
    cursor.execute("DELETE FROM products WHERE name LIKE 'P%'")
    print(f"Rows deleted: {cursor.rowcount}")  # Output: 1

The DELETE operation removes only the 'Phone' product, so rowcount
returns 1. The example also shows using executescript for multiple
statements.

The context manager ensures both the connection and cursor are properly closed
after the operations complete, even if an error occurs.

## rowcount with INSERT Operation

This example shows rowcount behavior with INSERT operations.

insert_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS orders
                      (id INTEGER PRIMARY KEY, product TEXT, quantity INTEGER)''')
    
    # Single row insert
    cursor.execute("INSERT INTO orders (product, quantity) VALUES ('Book', 2)")
    print(f"Rows inserted (single): {cursor.rowcount}")  # Output: 1
    
    # Multiple rows insert
    cursor.executemany("INSERT INTO orders (product, quantity) VALUES (?, ?)",
                      [('Pen', 10), ('Pencil', 15)])
    print(f"Rows inserted (multiple): {cursor.rowcount}")  # Output: 1 (last operation only)

For single INSERTs, rowcount correctly reports 1. However, with
executemany, it only reports the count for the last operation.

This demonstrates an important limitation: rowcount doesn't
accumulate counts across multiple operations in a single execute call.

## rowcount with SELECT Statement

This example demonstrates rowcount behavior with SELECT statements.

select_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS cities
                      (id INTEGER PRIMARY KEY, name TEXT, population INTEGER)''')
    cursor.executemany("INSERT INTO cities (name, population) VALUES (?, ?)",
                      [('New York', 8500000), ('London', 9000000)])
    
    # SELECT operation
    cursor.execute("SELECT * FROM cities WHERE population &gt; 8000000")
    print(f"Rowcount after SELECT: {cursor.rowcount}")  # Output: -1
    
    # Verify actual row count
    rows = cursor.fetchall()
    print(f"Actual rows returned: {len(rows)}")  # Output: 2

The example shows that rowcount returns -1 for SELECT statements.
To get the actual count, you must fetch the rows and check the length.

This is a key limitation of rowcount in SQLite - it doesn't work
with SELECT statements as you might expect from other database systems.

## rowcount with Transactions

This example demonstrates how rowcount behaves within transactions.

transaction_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS accounts
                      (id INTEGER PRIMARY KEY, balance INTEGER)''')
    cursor.executemany("INSERT INTO accounts (balance) VALUES (?)",
                      [(1000,), (500,)])
    
    # Start transaction
    cursor.execute("BEGIN")
    cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
    print(f"First update rowcount: {cursor.rowcount}")  # Output: 1
    
    cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
    print(f"Second update rowcount: {cursor.rowcount}")  # Output: 1
    
    # Rollback transaction
    conn.rollback()
    cursor.execute("SELECT balance FROM accounts WHERE id = 1")
    print(f"Balance after rollback: {cursor.fetchone()[0]}")  # Output: 1000

The example shows that rowcount works normally within transactions,
reporting the affected rows for each operation. The rollback demonstrates that
rowcount values aren't affected by transaction state.

Even though the changes were rolled back, the rowcount values
correctly reflected the operations that were attempted.

## rowcount with Multiple Cursors

This example shows how rowcount behaves with multiple cursors.

multi_cursor_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    # Create and populate table
    conn.execute('''CREATE TABLE IF NOT EXISTS inventory
                    (id INTEGER PRIMARY KEY, item TEXT, stock INTEGER)''')
    conn.execute("INSERT INTO inventory (item, stock) VALUES ('Widget', 50)")
    
    # First cursor
    cursor1 = conn.cursor()
    cursor1.execute("UPDATE inventory SET stock = stock - 10 WHERE item = 'Widget'")
    print(f"Cursor1 rowcount: {cursor1.rowcount}")  # Output: 1
    
    # Second cursor
    cursor2 = conn.cursor()
    cursor2.execute("UPDATE inventory SET stock = stock - 5 WHERE item = 'Widget'")
    print(f"Cursor2 rowcount: {cursor2.rowcount}")  # Output: 1
    
    # Verify final state
    cursor1.execute("SELECT stock FROM inventory WHERE item = 'Widget'")
    print(f"Final stock: {cursor1.fetchone()[0]}")  # Output: 35

Each cursor maintains its own rowcount value, reflecting only its
most recent operation. The example shows two separate updates through different
cursors.

The context manager ensures all cursors are properly closed when the connection
is closed, preventing resource leaks.

## rowcount with Conditional Updates

This example demonstrates rowcount with conditional updates that
might affect zero rows.

conditional_rowcount.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                      (id INTEGER PRIMARY KEY, name TEXT, salary INTEGER)''')
    cursor.executemany("INSERT INTO employees (name, salary) VALUES (?, ?)",
                      [('John', 50000), ('Sarah', 60000)])
    
    # Update that affects rows
    cursor.execute("UPDATE employees SET salary = salary + 5000 WHERE salary &lt; 55000")
    print(f"Rows updated (condition matched): {cursor.rowcount}")  # Output: 1
    
    # Update that affects no rows
    cursor.execute("UPDATE employees SET salary = salary + 1000 WHERE name = 'Nonexistent'")
    print(f"Rows updated (no match): {cursor.rowcount}")  # Output: 0

The first UPDATE affects John's record (salary &lt; 55000), so rowcount
returns 1. The second UPDATE affects no records, so it returns 0.

This behavior is useful for determining whether your conditional operations
actually modified any data in the database.

## Best Practices

- **Understand limitations:** rowcount doesn't work with SELECTs

- **Check after operations:** Verify rowcount after UPDATE/DELETE

- **Use transactions:** Combine with transactions for data integrity

- **Close resources:** Always use context managers for cleanup

- **Consider alternatives:** For SELECTs, use len(cursor.fetchall())

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite CREATE TABLE](https://www.sqlite.org/lang_createtable.html)

- [SQLite UPDATE](https://www.sqlite.org/lang_update.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).