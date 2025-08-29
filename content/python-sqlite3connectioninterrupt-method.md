+++
title = "Python sqlite3.Connection.interrupt Method"
date = 2025-08-29T20:10:34.343+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.interrupt method covering usage patterns and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.interrupt Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.interrupt
method, which allows interrupting long-running SQLite queries. We'll cover basic
usage, practical examples, and common patterns.

## Basic Definitions

The interrupt method is called on a connection object to abort
any pending database operations. It causes any currently executing SQL statement
to raise an OperationalError.

Key characteristics: it can be called from any thread, affects all cursors on
the connection, and is thread-safe. The method is useful for implementing query
timeouts or cancellation.

## Basic Interrupt Usage

This example shows the simplest usage of interrupt to cancel a
long-running query.

basic_interrupt.py
  

import sqlite3
import threading
import time

def long_running_query(conn):
    with conn:
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT * FROM large_table")
            print("Query completed successfully")
        except sqlite3.OperationalError as e:
            print("Query was interrupted:", e)

# Create database and connection
with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE large_table AS SELECT 1 a FROM generate_series(1, 1000000)")
    
    # Start query in separate thread
    thread = threading.Thread(target=long_running_query, args=(conn,))
    thread.start()
    
    # Wait briefly then interrupt
    time.sleep(0.1)
    conn.interrupt()
    thread.join()

This example creates a large table and starts a query in a separate thread. The
main thread interrupts the query after a short delay. The query raises an
OperationalError when interrupted.

The interrupt method is safe to call from any thread, even while
another thread is executing a query.

## Timeout Implementation

This example demonstrates implementing a query timeout using interrupt
with a timer thread.

query_timeout.py
  

import sqlite3
import threading

def set_timeout(conn, seconds):
    def interrupt():
        conn.interrupt()
    timer = threading.Timer(seconds, interrupt)
    timer.start()
    return timer

with sqlite3.connect(':memory:') as conn:
    # Create test data
    conn.execute("CREATE TABLE test AS SELECT 1 a FROM generate_series(1, 100000)")
    
    try:
        # Set 1 second timeout
        timer = set_timeout(conn, 1.0)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM test JOIN test t2")
        print("Query completed before timeout")
    except sqlite3.OperationalError:
        print("Query timed out")
    finally:
        timer.cancel()

This example creates a timer thread that calls interrupt after
the specified timeout. If the query takes too long, it gets interrupted.

The timer is canceled in the finally block to ensure cleanup if
the query completes before timeout.

## Interrupting Multiple Cursors

This example shows how interrupt affects all cursors on a
connection.

multiple_cursors.py
  

import sqlite3
import threading
import time

def run_query(conn, query):
    with conn:
        cursor = conn.cursor()
        try:
            cursor.execute(query)
            print(f"Query '{query}' completed")
        except sqlite3.OperationalError:
            print(f"Query '{query}' interrupted")

with sqlite3.connect(':memory:') as conn:
    # Create test data
    conn.execute("CREATE TABLE data AS SELECT 1 a FROM generate_series(1, 1000000)")
    
    # Start two queries
    t1 = threading.Thread(target=run_query, args=(conn, "SELECT * FROM data"))
    t2 = threading.Thread(target=run_query, args=(conn, "SELECT COUNT(*) FROM data"))
    t1.start()
    t2.start()
    
    # Interrupt both queries
    time.sleep(0.1)
    conn.interrupt()
    t1.join()
    t2.join()

This example starts two queries on the same connection. Calling interrupt
affects both queries simultaneously, demonstrating it operates at the connection
level.

All active cursors on the connection will receive an interruption when this
method is called.

## Graceful Query Cancellation

This example shows how to implement a graceful cancellation pattern using
interrupt.

graceful_cancel.py
  

import sqlite3
import threading
import time

class QueryExecutor:
    def __init__(self, conn):
        self.conn = conn
        self.cancel_flag = False
        
    def execute(self, query):
        with self.conn:
            cursor = self.conn.cursor()
            try:
                cursor.execute(query)
                while not self.cancel_flag and cursor.fetchone():
                    pass
                if self.cancel_flag:
                    print("Query canceled gracefully")
                else:
                    print("Query completed")
            except sqlite3.OperationalError:
                print("Query interrupted")

with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE data AS SELECT 1 a FROM generate_series(1, 1000000)")
    executor = QueryExecutor(conn)
    
    # Start query
    thread = threading.Thread(target=executor.execute, 
                            args=("SELECT * FROM data",))
    thread.start()
    
    # Cancel after delay
    time.sleep(0.1)
    executor.cancel_flag = True
    conn.interrupt()
    thread.join()

This example combines interrupt with a cancellation flag for
more graceful handling. The query checks the flag during processing.

The pattern allows for cleanup operations before fully aborting the query,
providing better control than immediate interruption.

## Interrupt During Transaction

This example demonstrates the behavior of interrupt during
a transaction.

transaction_interrupt.py
  

import sqlite3
import threading
import time

def run_transaction(conn):
    with conn:
        cursor = conn.cursor()
        try:
            cursor.execute("BEGIN")
            cursor.execute("INSERT INTO test VALUES (1)")
            time.sleep(1)  # Simulate long operation
            cursor.execute("INSERT INTO test VALUES (2)")
            conn.commit()
            print("Transaction committed")
        except sqlite3.OperationalError:
            print("Transaction interrupted")
            conn.rollback()

with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE test (id INTEGER)")
    
    # Start transaction
    thread = threading.Thread(target=run_transaction, args=(conn,))
    thread.start()
    
    # Interrupt during transaction
    time.sleep(0.5)
    conn.interrupt()
    thread.join()
    
    # Verify state
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM test")
    print("Rows in table:", cursor.fetchone()[0])

This example shows that interrupting a transaction causes it to roll back. The
interrupt method preserves database consistency by aborting the
entire transaction.

The final count shows no rows were inserted, confirming the rollback occurred.

## Interrupt With Connection Pool

This example demonstrates using interrupt with a connection
pool in a multi-threaded application.

connection_pool.py
  

import sqlite3
import threading
from queue import Queue
import time

class ConnectionPool:
    def __init__(self, db_path, size=5):
        self.pool = Queue(size)
        for _ in range(size):
            conn = sqlite3.connect(db_path)
            self.pool.put(conn)
            
    def get_connection(self):
        return self.pool.get()
    
    def return_connection(self, conn):
        self.pool.put(conn)

def worker(pool, query):
    conn = pool.get_connection()
    try:
        cursor = conn.cursor()
        try:
            cursor.execute(query)
            print("Query completed")
        except sqlite3.OperationalError:
            print("Query interrupted")
    finally:
        pool.return_connection(conn)

# Setup
with sqlite3.connect('pool.db') as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS data (id INTEGER)")
    conn.execute("INSERT INTO data VALUES (1)")

pool = ConnectionPool('pool.db')

# Start workers
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(pool, "SELECT * FROM data, data d2"))
    t.start()
    threads.append(t)

# Interrupt all connections
time.sleep(0.1)
for _ in range(3):
    conn = pool.get_connection()
    conn.interrupt()
    pool.return_connection(conn)

for t in threads:
    t.join()

This example shows a connection pool where each connection can be interrupted
independently. The pool manages limited database connections efficiently.

Each worker thread gets a connection from the pool, and we interrupt all
connections to demonstrate the pattern.

## Interrupt With Progress Callback

This example combines interrupt with a progress handler for
more sophisticated control.

progress_callback.py
  

import sqlite3
import threading
import time

class QueryMonitor:
    def __init__(self, conn):
        self.conn = conn
        self.should_interrupt = False
        conn.set_progress_handler(self.progress_handler, 1000)
        
    def progress_handler(self):
        if self.should_interrupt:
            return 1  # Non-zero return interrupts operation
        return 0
    
    def execute_query(self, query):
        cursor = self.conn.cursor()
        try:
            cursor.execute(query)
            print("Query completed")
        except sqlite3.OperationalError:
            print("Query interrupted")

with sqlite3.connect(':memory:') as conn:
    conn.execute("CREATE TABLE data AS SELECT 1 a FROM generate_series(1, 1000000)")
    monitor = QueryMonitor(conn)
    
    # Start query
    thread = threading.Thread(target=monitor.execute_query,
                            args=("SELECT * FROM data",))
    thread.start()
    
    # Set interrupt flag after delay
    time.sleep(0.1)
    monitor.should_interrupt = True
    thread.join()

This example uses SQLite's progress handler together with interrupt.
The handler checks a flag periodically and can trigger an interruption.

The progress handler approach provides more frequent interruption points during
query execution compared to interrupt alone.

## Best Practices

- **Use sparingly:** Interruptions should be exceptional cases

- **Clean up resources:** Ensure proper cleanup after interruption

- **Handle errors:** Always catch OperationalError from interrupts

- **Consider alternatives:** Timeouts may be better than interrupts

- **Document usage:** Make interrupt behavior clear in your API

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Interrupt API](https://www.sqlite.org/c3ref/interrupt.html)

- [SQLite Progress Handler](https://www.sqlite.org/c3ref/progress_handler.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).