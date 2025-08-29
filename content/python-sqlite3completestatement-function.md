+++
title = "Python sqlite3.complete_statement Function"
date = 2025-08-29T20:10:28.771+01:00
draft = false
description = "Complete guide to Python's sqlite3.complete_statement function covering syntax checking, validation, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.complete_statement Function

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.complete_statement
function, which checks if a string contains one or more complete SQL statements.

## Basic Definitions

The sqlite3.complete_statement function checks if a string contains
one or more complete SQL statements. It returns True if the string appears to
contain complete statements.

Key characteristics: it's a simple syntax checker, doesn't execute the SQL, and
is useful for validating user input or building SQL editors. It follows SQLite's
parsing rules.

## Basic Usage

Here's the simplest usage of sqlite3.complete_statement to validate
a SQL string.

basic_usage.py
  

import sqlite3

# Check a complete statement
sql1 = "SELECT * FROM users;"
print(sqlite3.complete_statement(sql1))  # True

# Check an incomplete statement
sql2 = "SELECT * FROM"
print(sqlite3.complete_statement(sql2))  # False

This example shows basic validation of SQL statements. The function returns True
only when the SQL string contains at least one complete statement.

Note that the semicolon is optional for single statements but required when
multiple statements are present in the string.

## Validating User Input

The function is useful for validating SQL input before execution, preventing
partial statements from being run.

validate_input.py
  

import sqlite3

def execute_safe_query(db_path, query):
    if not sqlite3.complete_statement(query):
        raise ValueError("Incomplete SQL statement")
        
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(query)
        return cursor.fetchall()

# Example usage
try:
    results = execute_safe_query('test.db', 'SELECT * FROM users')
    print(results)
except ValueError as e:
    print(f"Error: {e}")

This wrapper function checks SQL completeness before execution. It raises an
exception for incomplete statements, preventing potential errors.

The with statement ensures proper resource cleanup, closing the
connection automatically.

## Multiple Statements

The function can detect multiple complete statements in a single string.

multiple_statements.py
  

import sqlite3

# Multiple complete statements
sql1 = """
CREATE TABLE IF NOT EXISTS test (id INTEGER);
INSERT INTO test VALUES (1);
"""
print(sqlite3.complete_statement(sql1))  # True

# Mixed complete and incomplete
sql2 = """
SELECT * FROM test;
SELECT * FROM
"""
print(sqlite3.complete_statement(sql2))  # False

When checking multiple statements, all must be complete for the function to
return True. The presence of any incomplete statement makes it return False.

This behavior is useful when processing SQL scripts or batches of statements.

## Building a SQL Editor

The function is particularly useful when building SQL editors or interactive
tools that need to know when a statement is complete.

sql_editor.py
  

import sqlite3

class SQLEditor:
    def __init__(self, db_path):
        self.db_path = db_path
        self.buffer = ""
        
    def add_line(self, line):
        self.buffer += line + "\n"
        if sqlite3.complete_statement(self.buffer):
            self.execute()
            
    def execute(self):
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.executescript(self.buffer)
            conn.commit()
        self.buffer = ""

# Example usage
editor = SQLEditor('test.db')
editor.add_line("CREATE TABLE IF NOT EXISTS logs")
editor.add_line("(id INTEGER PRIMARY KEY, message TEXT);")

This simple editor class buffers input lines until a complete statement is
detected, then executes it. The executescript method runs the SQL.

The with statement ensures the connection is properly closed after
execution.

## Transaction Blocks

The function correctly identifies complete transaction blocks.

transactions.py
  

import sqlite3

# Complete transaction
sql1 = """
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
"""
print(sqlite3.complete_statement(sql1))  # True

# Incomplete transaction
sql2 = """
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1
"""
print(sqlite3.complete_statement(sql2))  # False

Transaction blocks are treated as single logical statements. All statements
within the transaction must be complete for the function to return True.

This example shows how the function works with multi-statement transactions.

## Handling Comments

The function properly handles SQL comments when checking statement completeness.

comments.py
  

import sqlite3

# With comments
sql1 = """
-- This is a complete statement
SELECT * FROM users /* with a comment */;
"""
print(sqlite3.complete_statement(sql1))  # True

# Comment hiding incompleteness
sql2 = """
SELECT * FROM -- this makes the statement incomplete
"""
print(sqlite3.complete_statement(sql2))  # False

Comments don't affect the completeness check. The function ignores them and
only evaluates the actual SQL syntax.

Both single-line (--) and multi-line (/* */) comments are handled correctly.

## DDL Statements

The function works with Data Definition Language (DDL) statements like CREATE,
ALTER, and DROP.

ddl_statements.py
  

import sqlite3

# Complete CREATE TABLE
sql1 = """
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    salary REAL
);
"""
print(sqlite3.complete_statement(sql1))  # True

# Incomplete ALTER TABLE
sql2 = "ALTER TABLE employees ADD COLUMN"
print(sqlite3.complete_statement(sql2))  # False

# Using with connection
with sqlite3.connect(':memory:') as conn:
    if sqlite3.complete_statement(sql1):
        conn.executescript(sql1)

DDL statements follow the same completeness rules as other SQL statements. The
entire statement must be syntactically complete.

The example shows the function being used with a context manager to ensure
proper resource cleanup.

## Best Practices

- **Not a security feature:** Don't rely on it for SQL injection protection

- **Syntax checking only:** Doesn't validate against schema or permissions

- **Combine with try/except:** Still need to handle execution errors

- **Use for interactive tools:** Great for editors and REPLs

- **Consider SQL parsing:** For advanced needs, use a proper SQL parser

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite SQL Syntax](https://www.sqlite.org/lang.html)

- [SQLite C API complete()](https://www.sqlite.org/c3ref/complete.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).