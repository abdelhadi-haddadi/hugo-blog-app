+++
title = "Python sqlite3.IntegrityError Exception"
date = 2025-08-29T20:10:44.608+01:00
draft = false
description = "Complete guide to Python's sqlite3.IntegrityError covering database constraints, error handling, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.IntegrityError Exception

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.IntegrityError
exception, which occurs when database constraints are violated. We'll cover
common causes, handling techniques, and practical examples.

## Basic Definitions

The sqlite3.IntegrityError is a subclass of sqlite3.DatabaseError
that signals constraint violations in SQLite databases. It's raised when an
operation would break database integrity rules.

Common triggers include: primary key violations, foreign key violations, NOT NULL
constraint failures, and UNIQUE constraint violations. Proper handling ensures
data consistency and application robustness.

## Primary Key Violation

This example demonstrates a primary key violation when inserting duplicate IDs.

primary_key.py
  

import sqlite3

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS products
                          (id INTEGER PRIMARY KEY, name TEXT)''')
        
        # First insert succeeds
        cursor.execute("INSERT INTO products VALUES (1, 'Laptop')")
        
        # Second insert with same ID raises IntegrityError
        cursor.execute("INSERT INTO products VALUES (1, 'Phone')")
        
except sqlite3.IntegrityError as e:
    print(f"Integrity error occurred: {e}")

The second insert fails because it attempts to reuse the primary key value 1.
Primary keys must be unique within a table. The error message indicates the
specific constraint violation.

This example uses a context manager to ensure proper resource cleanup, even when
an exception occurs. The transaction is automatically rolled back on error.

## NOT NULL Constraint Violation

This example shows what happens when trying to insert NULL into a NOT NULL column.

not_null.py
  

import sqlite3

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                          (id INTEGER PRIMARY KEY,
                           name TEXT NOT NULL,
                           department TEXT NOT NULL)''')
        
        # Valid insert
        cursor.execute("INSERT INTO employees (name, department) VALUES (?, ?)",
                      ('Alice', 'HR'))
        
        # Invalid insert - missing department
        cursor.execute("INSERT INTO employees (name) VALUES (?)", ('Bob',))
        
except sqlite3.IntegrityError as e:
    print(f"NOT NULL constraint failed: {e}")

The second insert fails because it doesn't provide a value for the 'department'
column which is marked NOT NULL. SQLite rejects the operation to maintain data
integrity.

The error message specifically indicates which column constraint was violated.
This helps in debugging and fixing the issue in application code.

## UNIQUE Constraint Violation

This example demonstrates a UNIQUE constraint violation when inserting duplicate values.

unique.py
  

import sqlite3

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS users
                          (id INTEGER PRIMARY KEY,
                           email TEXT UNIQUE,
                           username TEXT UNIQUE)''')
        
        # First insert succeeds
        cursor.execute("INSERT INTO users (email, username) VALUES (?, ?)",
                      ('alice@example.com', 'alice'))
        
        # Second insert with duplicate email raises IntegrityError
        cursor.execute("INSERT INTO users (email, username) VALUES (?, ?)",
                      ('alice@example.com', 'alice2'))
        
except sqlite3.IntegrityError as e:
    print(f"UNIQUE constraint failed: {e}")

The UNIQUE constraint ensures no two rows can have the same value in the specified
column. Here, attempting to insert a duplicate email address triggers the error.

The example shows how to properly use parameterized queries to prevent SQL
injection while demonstrating the constraint violation.

## Foreign Key Violation

This example illustrates a foreign key violation when the referenced row doesn't exist.

foreign_key.py
  

import sqlite3

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        
        # Enable foreign key constraints (SQLite has them off by default)
        cursor.execute("PRAGMA foreign_keys = ON")
        
        cursor.execute('''CREATE TABLE IF NOT EXISTS departments
                          (id INTEGER PRIMARY KEY, name TEXT)''')
        
        cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                          (id INTEGER PRIMARY KEY,
                           name TEXT,
                           dept_id INTEGER,
                           FOREIGN KEY(dept_id) REFERENCES departments(id))''')
        
        # Insert into employees without corresponding department
        cursor.execute("INSERT INTO employees (name, dept_id) VALUES (?, ?)",
                      ('Bob', 99))
        
except sqlite3.IntegrityError as e:
    print(f"Foreign key constraint failed: {e}")

The insert fails because department ID 99 doesn't exist in the departments table.
Foreign keys enforce referential integrity between related tables.

Note that SQLite requires explicitly enabling foreign key support with a PRAGMA
statement. This is a common source of confusion when foreign keys don't work.

## CHECK Constraint Violation

This example shows a CHECK constraint violation when a value doesn't meet the condition.

check.py
  

import sqlite3

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS products
                          (id INTEGER PRIMARY KEY,
                           name TEXT,
                           price REAL CHECK(price &gt; 0),
                           stock INTEGER CHECK(stock &gt;= 0))''')
        
        # Valid insert
        cursor.execute("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
                      ('Widget', 9.99, 100))
        
        # Invalid insert - negative price
        cursor.execute("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
                      ('Gadget', -1.99, 50))
        
except sqlite3.IntegrityError as e:
    print(f"CHECK constraint failed: {e}")

The CHECK constraint enforces that price must be greater than 0. The second insert
attempts to set a negative price, which violates this rule.

CHECK constraints are powerful for enforcing business rules at the database level,
ensuring invalid data can't be stored regardless of application logic.

## Handling Multiple Constraints

This example shows how multiple constraints can be violated and handled together.

multiple.py
  

import sqlite3

def handle_integrity_error(error):
    if "NOT NULL" in str(error):
        print("Error: Missing required field")
    elif "UNIQUE" in str(error):
        print("Error: Duplicate value")
    elif "FOREIGN KEY" in str(error):
        print("Error: Invalid reference")
    else:
        print(f"Database integrity error: {error}")

try:
    with sqlite3.connect('test.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS orders
                          (id INTEGER PRIMARY KEY,
                           customer_id INTEGER NOT NULL,
                           product_id INTEGER NOT NULL,
                           quantity INTEGER CHECK(quantity &gt; 0),
                           FOREIGN KEY(customer_id) REFERENCES customers(id),
                           FOREIGN KEY(product_id) REFERENCES products(id))''')
        
        # This will fail multiple constraints
        cursor.execute("INSERT INTO orders (customer_id) VALUES (NULL)")
        
except sqlite3.IntegrityError as e:
    handle_integrity_error(e)

This example demonstrates a sophisticated error handler that examines the error
message to determine which constraint was violated. The insert fails both NOT NULL
and FOREIGN KEY constraints.

The handler provides user-friendly messages based on the specific constraint
failure, improving the user experience in applications.

## Recovering from IntegrityError

This example shows how to recover from an IntegrityError by retrying with valid data.

recovery.py
  

import sqlite3

def create_tables(conn):
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                      (id INTEGER PRIMARY KEY,
                       username TEXT UNIQUE)''')

def add_user(conn, username):
    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username) VALUES (?)", (username,))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        print(f"Username '{username}' already exists")
        return False

with sqlite3.connect('users.db') as conn:
    create_tables(conn)
    
    # First attempt succeeds
    add_user(conn, 'alice')
    
    # Second attempt fails
    if not add_user(conn, 'alice'):
        # Recovery: try alternative username
        add_user(conn, 'alice2')
    
    # Verify results
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users")
    print("Current users:", [row[0] for row in cursor.fetchall()])

When the duplicate username error occurs, the code gracefully recovers by trying
an alternative username. This demonstrates robust error handling in real-world
applications.

The example separates database operations into clean functions and shows how to
structure code for maintainability while handling integrity constraints.

## Best Practices

- **Validate data first:** Check constraints in application code before inserting

- **Use transactions:** Group related operations to maintain consistency

- **Provide clear messages:** Parse error messages for user-friendly feedback

- **Consider constraints:** Design database schema with appropriate constraints

- **Handle gracefully:** Plan recovery paths for common constraint violations

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite CREATE TABLE](https://www.sqlite.org/lang_createtable.html)

- [SQLite Conflict Resolution](https://www.sqlite.org/lang_conflict.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).