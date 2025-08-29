+++
title = "Python sqlite3.Cursor.lastrowid"
date = 2025-08-29T20:10:42.356+01:00
draft = false
description = "Complete guide to Python's sqlite3.Cursor.lastrowid attribute covering database operations, row IDs, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Cursor.lastrowid

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Cursor.lastrowid attribute,
which provides the row ID of the last inserted row. We'll cover basic usage,
common patterns, and practical examples.

## Basic Definitions

The lastrowid attribute of a SQLite cursor returns the row ID of the
last row that was modified by an INSERT operation. This is particularly useful
when working with auto-incrementing primary keys.

Key characteristics: it's read-only, returns None if no row was inserted, and
only works with tables that have an INTEGER PRIMARY KEY column. The value is
database-specific and connection-specific.

## Basic lastrowid Usage

Here's the simplest usage of lastrowid to get the ID of an inserted
row. We'll use a context manager for automatic resource cleanup.

basic_lastrowid.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users
                      (id INTEGER PRIMARY KEY, name TEXT, email TEXT)''')
    
    cursor.execute("INSERT INTO users (name, email) VALUES (?, ?)", 
                   ('Alice', 'alice@example.com'))
    
    print("Last inserted row ID:", cursor.lastrowid)

This example creates a table with an auto-incrementing ID column, inserts a row,
and prints the ID of the newly inserted row. The with statement
ensures proper cleanup.

The lastrowid is available immediately after the INSERT statement
and remains accessible until another INSERT is executed on the same cursor.

## Multiple Insert Operations

When performing multiple inserts, lastrowid always reflects the most
recent insert operation. This example demonstrates this behavior.

multiple_inserts.py
  

import sqlite3

with sqlite3.connect('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS products
                      (id INTEGER PRIMARY KEY, name TEXT, price REAL)''')
    
    # First insert
    cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)",
                  ('Laptop', 999.99))
    print("First insert ID:", cursor.lastrowid)
    
    # Second insert
    cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)",
                  ('Phone', 699.99))
    print("Second insert ID:", cursor.lastrowid)

Each INSERT operation updates the lastrowid value. The output shows
sequential IDs being assigned to each new row.

This behavior is consistent even if the inserts are in different transactions or
if other operations occur between inserts.

## Bulk Insert Operations

When using executemany for bulk inserts, lastrowid
only returns the ID of the last inserted row in the batch.

bulk_insert.py
  

import sqlite3

employees = [
    ('John Doe', 'Engineering'),
    ('Jane Smith', 'Marketing'),
    ('Bob Johnson', 'Sales')
]

with sqlite3.connect('company.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS employees
                      (id INTEGER PRIMARY KEY, name TEXT, department TEXT)''')
    
    cursor.executemany("INSERT INTO employees (name, department) VALUES (?, ?)",
                      employees)
    
    print("Last inserted row ID from bulk operation:", cursor.lastrowid)

The executemany method inserts multiple rows but only the ID of
the last inserted row is available in lastrowid.

To get all inserted IDs, you would need to perform individual INSERT statements
or use a different approach like SELECT last_insert_rowid after
each insert.

## Tables Without Auto-increment

The lastrowid behavior differs when working with tables that don't
have an INTEGER PRIMARY KEY column. This example shows the difference.

no_autoincrement.py
  

import sqlite3

with sqlite3.connect('test.db') as conn:
    cursor = conn.cursor()
    
    # Table with explicit primary key
    cursor.execute('''CREATE TABLE IF NOT EXISTS table1
                      (pk TEXT PRIMARY KEY, data TEXT)''')
    cursor.execute("INSERT INTO table1 VALUES ('key1', 'value1')")
    print("Table with TEXT PK:", cursor.lastrowid)  # None
    
    # Table with composite primary key
    cursor.execute('''CREATE TABLE IF NOT EXISTS table2
                      (id INT, name TEXT, PRIMARY KEY (id, name))''')
    cursor.execute("INSERT INTO table2 VALUES (1, 'test')")
    print("Table with composite PK:", cursor.lastrowid)  # None
    
    # Table with INTEGER PRIMARY KEY
    cursor.execute('''CREATE TABLE IF NOT EXISTS table3
                      (id INTEGER PRIMARY KEY, data TEXT)''')
    cursor.execute("INSERT INTO table3 (data) VALUES ('works')")
    print("Table with INTEGER PK:", cursor.lastrowid)  # Actual ID

Only tables with an INTEGER PRIMARY KEY column (which auto-increments by default)
will populate lastrowid. Other primary key types result in None.

This distinction is important when designing database schemas where you need to
track inserted row IDs.

## Using lastrowid with Transactions

The lastrowid remains valid even if the transaction is rolled back,
but the ID may be reused. This example demonstrates the behavior.

transactions.py
  

import sqlite3

with sqlite3.connect('transactions.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS logs
                      (id INTEGER PRIMARY KEY, message TEXT)''')
    
    # Successful transaction
    cursor.execute("INSERT INTO logs (message) VALUES ('First message')")
    first_id = cursor.lastrowid
    conn.commit()
    print("First ID (committed):", first_id)
    
    # Rolled back transaction
    cursor.execute("INSERT INTO logs (message) VALUES ('Second message')")
    second_id = cursor.lastrowid
    conn.rollback()
    print("Second ID (rolled back):", second_id)
    
    # New insert after rollback
    cursor.execute("INSERT INTO logs (message) VALUES ('Third message')")
    third_id = cursor.lastrowid
    conn.commit()
    print("Third ID (committed):", third_id)

After a rollback, the next insert may reuse the rolled back ID. The exact
behavior depends on SQLite's internal sequence counter.

Applications should not rely on specific ID sequences when transactions might
be rolled back.

## Combining lastrowid with SELECT

You can combine lastrowid with a SELECT statement to retrieve the
full inserted row. This is useful when you need more than just the ID.

select_after_insert.py
  

import sqlite3

with sqlite3.connect('inventory.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS items
                      (id INTEGER PRIMARY KEY, name TEXT, quantity INTEGER)''')
    
    # Insert new item
    cursor.execute("INSERT INTO items (name, quantity) VALUES (?, ?)",
                  ('Widget', 100))
    new_id = cursor.lastrowid
    
    # Retrieve the complete inserted row
    cursor.execute("SELECT * FROM items WHERE id = ?", (new_id,))
    inserted_row = cursor.fetchone()
    print("Inserted row:", inserted_row)

This pattern is efficient because it uses the primary key index to retrieve the
exact row that was just inserted.

It's particularly useful when default values or triggers modify the data during
insertion.

## Alternative to lastrowid

SQLite provides the last_insert_rowid function as an alternative
to cursor.lastrowid. This example shows both approaches.

alternative.py
  

import sqlite3

with sqlite3.connect('alternate.db') as conn:
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS notes
                      (id INTEGER PRIMARY KEY, content TEXT)''')
    
    # Using cursor.lastrowid
    cursor.execute("INSERT INTO notes (content) VALUES ('First note')")
    print("Using cursor.lastrowid:", cursor.lastrowid)
    
    # Using last_insert_rowid() function
    cursor.execute("INSERT INTO notes (content) VALUES ('Second note')")
    cursor.execute("SELECT last_insert_rowid()")
    print("Using last_insert_rowid():", cursor.fetchone()[0])

Both methods return the same value, but last_insert_rowid is a
SQL function that can be used in more complex queries.

The lastrowid attribute is generally more convenient for simple
cases as it doesn't require an additional query.

## Best Practices

- **Use with INTEGER PRIMARY KEY:** lastrowid only works with these columns

- **Check for None:** Always verify lastrowid isn't None before use

- **Immediate access:** Retrieve lastrowid immediately after insert

- **Transaction aware:** Understand behavior with rollbacks

- **Alternative methods:** Consider last_insert_rowid() when needed

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite ROWID Documentation](https://www.sqlite.org/lang_createtable.html#rowid)

- [SQLite last_insert_rowid()](https://www.sqlite.org/c3ref/last_insert_rowid.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).