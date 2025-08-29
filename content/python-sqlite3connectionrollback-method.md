+++
title = "Python sqlite3.Connection.rollback Method"
date = 2025-08-29T20:10:35.454+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.rollback method covering transaction management and error handling."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.rollback Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.rollback
method, which is essential for transaction management in SQLite databases.

## Basic Definitions

The rollback method reverts all changes made in the current
transaction. It returns the database to its state before the transaction began.

Key characteristics: it only works when not in autocommit mode, affects all
changes since the last commit, and is typically used in error handling to
maintain database consistency.

## Basic Rollback Example

This example demonstrates the fundamental usage of rollback in a transaction.

basic_rollback.py
  

import sqlite3

with sqlite3.connect('transactions.db') as conn:
    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO accounts (name, balance) VALUES (?, ?)", 
                      ('Bob', 1000))
        # Simulate an error
        raise ValueError("Something went wrong")
        conn.commit()
    except Exception as e:
        print(f"Error occurred: {e}")
        conn.rollback()
        print("Transaction rolled back")

In this example, we start a transaction by performing an insert operation.
When an error occurs, we catch it and call rollback to undo the insert.

The with statement ensures the connection is properly closed, while the
try-except block handles the transaction rollback on error.

## Rollback in Multi-Operation Transaction

This example shows rollback affecting multiple operations in a transaction.

multi_op_rollback.py
  

import sqlite3

with sqlite3.connect('bank.db') as conn:
    conn.execute("PRAGMA foreign_keys = ON")  # Enable foreign key constraints
    try:
        cursor = conn.cursor()
        # First operation
        cursor.execute("UPDATE accounts SET balance = balance - 100 WHERE id = 1")
        # Second operation
        cursor.execute("UPDATE accounts SET balance = balance + 100 WHERE id = 2")
        # Verify balances
        cursor.execute("SELECT balance FROM accounts WHERE id = 1")
        balance = cursor.fetchone()[0]
        if balance &lt; 0:
            raise ValueError("Insufficient funds")
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"Transaction failed: {e}. All changes reverted.")

Here we perform two update operations as part of a funds transfer. If any check
fails or an error occurs, both updates are rolled back together.

This demonstrates atomic transaction behavior - either all operations succeed
or none do. The foreign key constraint ensures referential integrity.

## Rollback with Context Managers

This example shows how context managers can simplify rollback handling.

context_rollback.py
  

import sqlite3
from contextlib import contextmanager

@contextmanager
def transaction(conn):
    try:
        yield
        conn.commit()
    except:
        conn.rollback()
        raise

with sqlite3.connect('inventory.db') as conn:
    with transaction(conn):
        cursor = conn.cursor()
        cursor.execute("UPDATE products SET stock = stock - 5 WHERE id = 101")
        cursor.execute("UPDATE inventory SET last_updated = CURRENT_TIMESTAMP")
        # If either update fails, both will be rolled back

We create a custom transaction context manager that automatically handles
commit/rollback based on whether an exception occurs.

This pattern reduces boilerplate code and ensures consistent transaction
handling throughout the application.

## Rollback with Savepoints

This example demonstrates using rollback with savepoints for partial rollbacks.

savepoint_rollback.py
  

import sqlite3

with sqlite3.connect('orders.db') as conn:
    try:
        cursor = conn.cursor()
        # Main transaction
        cursor.execute("INSERT INTO orders (customer_id) VALUES (42)")
        order_id = cursor.lastrowid
        
        # Create savepoint
        cursor.execute("SAVEPOINT item_add")
        try:
            cursor.execute("INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
                         (order_id, 101))
            cursor.execute("INSERT INTO order_items (order_id, product_id) VALUES (?, ?)",
                         (order_id, 205))
        except sqlite3.Error as e:
            print("Item addition failed, rolling back items")
            cursor.execute("ROLLBACK TO SAVEPOINT item_add")
        
        conn.commit()
    except Exception as e:
        conn.rollback()
        print("Order creation failed:", e)

Here we use a savepoint to mark a point in the transaction. If item addition
fails, we roll back just to the savepoint, preserving the order creation.

Savepoints allow for nested transaction-like behavior within a single transaction.

## Rollback in Autocommit Mode

This example shows how rollback behaves differently in autocommit mode.

autocommit_rollback.py
  

import sqlite3

# Connect with isolation_level=None for autocommit mode
with sqlite3.connect('autocommit.db', isolation_level=None) as conn:
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS logs (message TEXT)")
    
    try:
        cursor.execute("INSERT INTO logs VALUES ('First message')")
        # In autocommit mode, each statement is automatically committed
        cursor.execute("INSERT INTO logs VALUES (NULL)")  # Will fail
    except sqlite3.IntegrityError:
        print("Rollback in autocommit mode only affects current statement")
        conn.rollback()  # Has no effect on already committed statements
        
    cursor.execute("SELECT COUNT(*) FROM logs")
    print(f"Total logs: {cursor.fetchone()[0]}")  # First insert remains

In autocommit mode (isolation_level=None), each SQL statement is automatically
committed. Rollback only affects the current statement if it hasn't completed.

This demonstrates why explicit transaction management is often preferable for
multi-statement operations.

## Rollback with Connection Pooling

This example shows rollback usage with connection pooling in a web application.

pooling_rollback.py
  

import sqlite3
from queue import Queue

class ConnectionPool:
    def __init__(self, db_path, pool_size=5):
        self._pool = Queue(pool_size)
        for _ in range(pool_size):
            conn = sqlite3.connect(db_path)
            self._pool.put(conn)
    
    def get_conn(self):
        return self._pool.get()
    
    def return_conn(self, conn):
        # Ensure connection is in a good state before returning
        try:
            conn.rollback()  # Rollback any pending transaction
        except sqlite3.Error:
            conn.close()  # If rollback fails, discard the connection
            conn = sqlite3.connect('app.db')  # Create new connection
        self._pool.put(conn)

# Usage example
pool = ConnectionPool('app.db')
conn = pool.get_conn()
try:
    cursor = conn.cursor()
    cursor.execute("UPDATE settings SET value = 'new' WHERE key = 'theme'")
    conn.commit()
except Exception:
    conn.rollback()
    raise
finally:
    pool.return_conn(conn)

This connection pool implementation automatically rolls back any pending
transactions when returning connections to the pool.

This prevents transaction state leaks between different parts of the application
using the pooled connections.

## Rollback in Concurrent Access Scenario

This example demonstrates rollback handling when multiple connections compete.

concurrent_rollback.py
  

import sqlite3
import threading
import time

def transfer_funds(from_acc, to_acc, amount):
    with sqlite3.connect('bank.db', timeout=10.0) as conn:
        conn.execute("PRAGMA busy_timeout = 5000")  # 5 second timeout
        try:
            cursor = conn.cursor()
            cursor.execute("UPDATE accounts SET balance = balance - ? WHERE id = ?",
                         (amount, from_acc))
            cursor.execute("UPDATE accounts SET balance = balance + ? WHERE id = ?",
                         (amount, to_acc))
            conn.commit()
        except sqlite3.OperationalError as e:
            if "database is locked" in str(e):
                print("Database locked, retrying...")
                time.sleep(0.1)
                transfer_funds(from_acc, to_acc, amount)  # Retry
            else:
                conn.rollback()
                raise

# Simulate concurrent transfers
threads = [
    threading.Thread(target=transfer_funds, args=(1, 2, 100)),
    threading.Thread(target=transfer_funds, args=(2, 1, 50))
]
for t in threads:
    t.start()
for t in threads:
    t.join()

This example handles database locking issues that may occur with concurrent
access. If the database is locked, we retry the transaction after a delay.

The rollback ensures failed transactions don't leave the database in an
inconsistent state when retrying.

## Best Practices

- **Always use rollback in error handling:** Ensure failed transactions are properly reverted

- **Combine with context managers:** For automatic resource cleanup

- **Consider savepoints:** For complex transactions needing partial rollback

- **Handle database locks:** Implement retry logic for concurrent access

- **Test rollback scenarios:** Verify your error handling works as expected

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Transaction Documentation](https://www.sqlite.org/lang_transaction.html)

- [SQLite Savepoint Documentation](https://www.sqlite.org/lang_savepoint.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).