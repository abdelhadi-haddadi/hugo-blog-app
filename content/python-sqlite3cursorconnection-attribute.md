+++
title = "Python sqlite3.Cursor.connection Attribute"
date = 2025-08-29T20:10:38.913+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.connection attribute covering database connections, cursor usage, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.connection Attribute

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.connection
attribute, which provides access to the parent connection from a cursor object.

## Basic Definitions

The sqlite3.Cursor.connection attribute is a read-only property that
returns the sqlite3.Connection object that created the cursor.

This attribute is useful when you need to access the parent connection from a
cursor object, such as for transaction control or executing additional queries.

## Basic Connection Access

This example demonstrates accessing the parent connection from a cursor object.

basic_connection.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    
    # Access the parent connection
    parent_conn = cursor.connection
    
    # Verify it's the same connection
    print(parent_conn is conn)  # True
    
    cursor.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER)')
    cursor.connection.commit()  # Commit using cursor's connection

The example shows how to access the parent connection through the cursor's
connection attribute. We verify it's the same connection object.

Using the connection attribute allows you to perform connection operations
without needing to keep a separate reference to the connection object.

## Transaction Control via Cursor

This example shows how to use the cursor's connection for transaction control.

transaction_control.py
  

import sqlite3

with sqlite3.connect('transactions.db') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS accounts (id INTEGER, balance REAL)')
    
    try:
        cursor.execute("INSERT INTO accounts VALUES (1, 1000.0)")
        cursor.execute("INSERT INTO accounts VALUES (2, 500.0)")
        
        # Commit using cursor's connection
        cursor.connection.commit()
    except:
        # Rollback using cursor's connection
        cursor.connection.rollback()
        raise

Here we use the cursor's connection attribute to commit or rollback transactions.
This is useful when passing cursor objects between functions.

The pattern ensures proper transaction handling even when you don't have direct
access to the original connection object.

## Creating New Cursors

This example demonstrates creating new cursors from an existing cursor's connection.

new_cursors.py
  

import sqlite3

with sqlite3.connect('multi_cursor.db') as conn:
    main_cursor = conn.cursor()
    main_cursor.execute('CREATE TABLE IF NOT EXISTS data (value TEXT)')
    
    # Create a new cursor from the first cursor's connection
    second_cursor = main_cursor.connection.cursor()
    second_cursor.execute("INSERT INTO data VALUES ('sample')")
    
    # Both cursors share the same connection
    main_cursor.execute("SELECT * FROM data")
    print(main_cursor.fetchall())  # [('sample',)]
    
    main_cursor.connection.commit()

The example shows how to create additional cursors from an existing cursor's
connection. All cursors share the same connection and transaction context.

This technique is useful when you need multiple cursors but only have access to
one cursor object in your current scope.

## Connection Attributes Access

This example demonstrates accessing connection attributes through a cursor.

connection_attributes.py
  

import sqlite3

with sqlite3.connect('attributes.db') as conn:
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Access connection attributes through cursor
    print(cursor.connection.row_factory)  # &lt;class 'sqlite3.Row'&gt;
    
    # Change isolation level through cursor
    cursor.connection.isolation_level = 'IMMEDIATE'
    
    cursor.execute('CREATE TABLE IF NOT EXISTS settings (param TEXT, value TEXT)')
    cursor.connection.commit()

Here we access and modify connection attributes through the cursor's connection
property. This includes row factories and isolation levels.

This approach allows you to configure the connection even when you only have
access to a cursor object.

## Connection in Nested Functions

This example shows using cursor.connection in nested function calls.

nested_functions.py
  

import sqlite3

def process_data(cursor):
    cursor.execute("INSERT INTO records (data) VALUES ('processed')")
    cursor.connection.commit()

def main():
    with sqlite3.connect('nested.db') as conn:
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS records (data TEXT)')
        
        # Pass cursor to nested function
        process_data(cursor)
        
        cursor.execute("SELECT * FROM records")
        print(cursor.fetchall())

if __name__ == '__main__':
    main()

The example demonstrates passing a cursor to a nested function which then uses
the cursor's connection to commit changes.

This pattern is common in larger applications where database operations are
spread across multiple functions or modules.

## Error Handling with Connection

This example shows error handling using the cursor's connection.

error_handling.py
  

import sqlite3

def safe_update(cursor, account_id, amount):
    try:
        cursor.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?",
                      (amount, account_id))
        cursor.connection.commit()
    except sqlite3.Error as e:
        cursor.connection.rollback()
        print(f"Error updating account {account_id}: {e}")
        raise

with sqlite3.connect('bank.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS accounts
                     (id INTEGER PRIMARY KEY, balance REAL)''')
    
    # Insert test data
    cursor.execute("INSERT OR IGNORE INTO accounts VALUES (1, 1000.0)")
    conn.commit()
    
    # Perform safe update
    safe_update(cursor, 1, -200)
    
    cursor.execute("SELECT balance FROM accounts WHERE id = 1")
    print(f"New balance: {cursor.fetchone()[0]}")

The example demonstrates a robust error handling pattern where the nested
function uses the cursor's connection for rollback on errors.

This approach ensures data consistency even when operations fail partway
through execution.

## Connection in Class Methods

This example shows using cursor.connection in class methods.

class_methods.py
  

import sqlite3

class DatabaseManager:
    def __init__(self, cursor):
        self.cursor = cursor
    
    def add_user(self, name, email):
        self.cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)",
                          (name, email))
        self.cursor.connection.commit()
    
    def get_users(self):
        self.cursor.execute("SELECT * FROM users")
        return self.cursor.fetchall()

with sqlite3.connect('users.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                     (id INTEGER PRIMARY KEY, name TEXT, email TEXT)''')
    
    manager = DatabaseManager(cursor)
    manager.add_user('Alice', 'alice@example.com')
    
    print("All users:")
    for user in manager.get_users():
        print(user)

The example demonstrates a class that receives a cursor and uses its connection
for database operations. This is a common pattern in ORMs and database wrappers.

The class methods can perform complete database operations including commits
without needing direct access to the original connection object.

## Best Practices

- **Use connection attribute sparingly:** Prefer passing connection when possible

- **Document cursor expectations:** Clearly state if methods need connection access

- **Maintain transaction boundaries:** Be careful with commits/rollbacks

- **Consider connection state:** Check isolation level and other settings

- **Close cursors properly:** Even when accessing through connection

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Connection Documentation](https://www.sqlite.org/c3ref/sqlite3.html)

- [SQLite Statement Documentation](https://www.sqlite.org/c3ref/stmt.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).