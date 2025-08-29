+++
title = "Python sqlite3.Connection.set_trace_callback Method"
date = 2025-08-29T20:10:36.573+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.set_trace_callback method covering SQL tracing, debugging, and usage patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.set_trace_callback Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.set_trace_callback
method, which allows tracing SQL statements executed by a connection. We'll cover
basic usage, practical examples, and debugging techniques.

## Basic Definitions

The set_trace_callback method registers a callback function that is
invoked for each SQL statement executed by the connection. It's useful for
debugging, logging, or analyzing SQL queries.

Key characteristics: the callback receives the SQL text as a string, it's called
before statement execution, and can be used to monitor all database operations.
The callback can be set to None to disable tracing.

## Basic Trace Callback Example

This example demonstrates setting a simple trace callback that prints all SQL
statements before execution.

basic_trace.py
  

import sqlite3

def trace_callback(sql):
    print(f"Executing SQL: {sql}")

with sqlite3.connect(":memory:") as conn:
    conn.set_trace_callback(trace_callback)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE users (id INTEGER, name TEXT)")
    cursor.execute("INSERT INTO users VALUES (1, 'Alice')")
    cursor.execute("SELECT * FROM users")
    
    print(cursor.fetchall())

The trace callback prints each SQL statement before it's executed. This helps
understand what operations are being performed on the database.

The output will show the CREATE TABLE, INSERT, and SELECT statements in order,
followed by the query results. The callback receives the exact SQL text.

## Filtering Specific SQL Statements

This example shows how to filter and process specific types of SQL statements
using the trace callback.

filter_statements.py
  

import sqlite3

def trace_callback(sql):
    sql_lower = sql.lower()
    if "insert" in sql_lower:
        print(f"Insert operation detected: {sql}")
    elif "select" in sql_lower:
        print(f"Select operation detected: {sql}")

with sqlite3.connect(":memory:") as conn:
    conn.set_trace_callback(trace_callback)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE logs (id INTEGER, message TEXT)")
    cursor.execute("INSERT INTO logs VALUES (1, 'Startup')")
    cursor.execute("SELECT * FROM logs")
    cursor.execute("DELETE FROM logs WHERE id = 1")
    
    conn.commit()

The callback now checks for specific SQL keywords and only prints statements
containing those keywords. This is useful for monitoring particular operations.

Note that the callback still receives all statements, but we selectively process
only those we're interested in. The DELETE statement won't be printed here.

## Measuring Query Execution Time

This example demonstrates using the trace callback with time measurement to
profile query performance.

query_timing.py
  

import sqlite3
import time

class QueryTimer:
    def __init__(self):
        self.start_time = None
    
    def trace_callback(self, sql):
        self.start_time = time.time()
        print(f"Starting query: {sql}")
    
    def print_duration(self):
        if self.start_time:
            duration = (time.time() - self.start_time) * 1000
            print(f"Query completed in {duration:.2f} ms\n")

timer = QueryTimer()

with sqlite3.connect(":memory:") as conn:
    conn.set_trace_callback(timer.trace_callback)
    cursor = conn.cursor()
    
    # Create and populate a table
    cursor.execute("CREATE TABLE data (id INTEGER, value REAL)")
    cursor.executemany("INSERT INTO data VALUES (?, ?)", 
                      [(i, i * 1.5) for i in range(1000)])
    timer.print_duration()
    
    # Run a query
    cursor.execute("SELECT AVG(value) FROM data")
    timer.print_duration()
    print("Average:", cursor.fetchone()[0])

This example uses a class to track query start time and measure duration. The
trace callback records when a query begins, and we measure elapsed time after.

The output shows both the SQL being executed and how long each operation took.
This is valuable for performance optimization and identifying slow queries.

## Counting Database Operations

This example uses the trace callback to count different types of database
operations performed during a session.

operation_counter.py
  

import sqlite3

class OperationCounter:
    def __init__(self):
        self.counts = {
            'select': 0,
            'insert': 0,
            'update': 0,
            'delete': 0,
            'other': 0
        }
    
    def trace_callback(self, sql):
        sql_lower = sql.lower()
        if "select" in sql_lower:
            self.counts['select'] += 1
        elif "insert" in sql_lower:
            self.counts['insert'] += 1
        elif "update" in sql_lower:
            self.counts['update'] += 1
        elif "delete" in sql_lower:
            self.counts['delete'] += 1
        else:
            self.counts['other'] += 1
    
    def print_counts(self):
        print("Database operation counts:")
        for op, count in self.counts.items():
            print(f"{op.capitalize()}: {count}")

counter = OperationCounter()

with sqlite3.connect(":memory:") as conn:
    conn.set_trace_callback(counter.trace_callback)
    cursor = conn.cursor()
    
    cursor.execute("CREATE TABLE products (id INTEGER, name TEXT, price REAL)")
    cursor.executemany("INSERT INTO products VALUES (?, ?, ?)",
                      [(1, 'Apple', 1.2), (2, 'Banana', 0.8)])
    cursor.execute("UPDATE products SET price = 1.3 WHERE name = 'Apple'")
    cursor.execute("SELECT * FROM products")
    cursor.execute("SELECT COUNT(*) FROM products")
    cursor.execute("DELETE FROM products WHERE price &gt; 1.0")
    
    counter.print_counts()

The OperationCounter class maintains counts of different SQL operation types. The
trace callback increments the appropriate counter for each statement.

This is useful for understanding the workload pattern on your database, which can
help with optimization and resource planning. The final counts are printed at the
end.

## Logging SQL Statements to File

This example shows how to log all SQL statements to a file using the trace
callback, which is useful for auditing or debugging.

sql_logger.py
  

import sqlite3
from datetime import datetime

class SQLLogger:
    def __init__(self, filename):
        self.log_file = open(filename, 'a')
    
    def trace_callback(self, sql):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.log_file.write(f"[{timestamp}] {sql}\n")
        self.log_file.flush()
    
    def close(self):
        self.log_file.close()

logger = SQLLogger("sql_log.txt")

try:
    with sqlite3.connect(":memory:") as conn:
        conn.set_trace_callback(logger.trace_callback)
        cursor = conn.cursor()
        
        cursor.execute("CREATE TABLE events (id INTEGER, ts TEXT, desc TEXT)")
        cursor.execute("INSERT INTO events VALUES (1, datetime('now'), 'Start')")
        cursor.execute("SELECT * FROM events")
        
        # Simulate an error
        try:
            cursor.execute("INVALID SQL STATEMENT")
        except sqlite3.OperationalError:
            pass
finally:
    logger.close()
    print("SQL statements logged to sql_log.txt")

The SQLLogger class writes each SQL statement to a file with a timestamp. This
creates an audit trail of all database operations, including their timing.

The log file can be valuable for debugging issues, especially in production
environments where you need to understand what happened before a problem
occurred. The file is properly closed in the finally block.

## Detecting Potential SQL Injection

This example demonstrates using the trace callback to detect potential SQL
injection attempts by looking for suspicious patterns in SQL statements.

injection_detector.py
  

import sqlite3
import re

class InjectionDetector:
    def __init__(self):
        self.suspicious_patterns = [
            r";\s*--",
            r";\s*#",
            r"union\s+select",
            r"1\s*=\s*1",
            r"sleep\s*\("
        ]
    
    def trace_callback(self, sql):
        for pattern in self.suspicious_patterns:
            if re.search(pattern, sql, re.IGNORECASE):
                print(f"WARNING: Potential SQL injection detected!")
                print(f"Suspicious SQL: {sql}")
                break

detector = InjectionDetector()

with sqlite3.connect(":memory:") as conn:
    conn.set_trace_callback(detector.trace_callback)
    cursor = conn.cursor()
    
    # Safe queries
    cursor.execute("CREATE TABLE accounts (id INTEGER, username TEXT)")
    cursor.execute("INSERT INTO accounts VALUES (?, ?)", (1, "admin"))
    
    # Simulate suspicious query (would be from user input in real scenario)
    user_input = "admin' OR 1=1--"
    try:
        cursor.execute(f"SELECT * FROM accounts WHERE username = '{user_input}'")
    except sqlite3.OperationalError:
        pass
    
    # Another suspicious pattern
    cursor.execute("SELECT * FROM accounts WHERE username = 'admin' UNION SELECT 1, 2")

The InjectionDetector class checks each SQL statement against known suspicious
patterns that might indicate SQL injection attempts. When found, it prints a
warning.

While this is a simple example, it demonstrates how the trace callback can be
used for security monitoring. In production, you'd want more sophisticated
detection and proper alerting.

## Combining Trace Callback with Connection Hooks

This advanced example shows how to combine the trace callback with other SQLite
connection hooks for comprehensive monitoring.

combined_hooks.py
  

import sqlite3

class DatabaseMonitor:
    def __init__(self):
        self.total_queries = 0
    
    def trace_callback(self, sql):
        self.total_queries += 1
        print(f"Query #{self.total_queries}: {sql}")
    
    def progress_handler(self):
        print("Database operation in progress...")
        return 0  # Return non-zero to abort operation
    
    def commit_hook(self):
        print("Commit about to be executed")
        return 0  # Return non-zero to abort commit
    
    def rollback_hook(self):
        print("Rollback occurred")

monitor = DatabaseMonitor()

with sqlite3.connect(":memory:") as conn:
    # Set up all hooks
    conn.set_trace_callback(monitor.trace_callback)
    conn.set_progress_handler(monitor.progress_handler, 100)
    conn.commit_hook = monitor.commit_hook
    conn.rollback_hook = monitor.rollback_hook
    
    cursor = conn.cursor()
    
    # Perform operations that will trigger hooks
    cursor.execute("CREATE TABLE test (id INTEGER)")
    for i in range(150):
        cursor.execute("INSERT INTO test VALUES (?)", (i,))
    
    conn.commit()
    
    # Force a rollback
    try:
        cursor.execute("INVALID SQL")
        conn.commit()
    except sqlite3.OperationalError:
        conn.rollback()
    
    print(f"Total queries executed: {monitor.total_queries}")

This example combines the trace callback with SQLite's progress handler, commit
hook, and rollback hook to create a comprehensive monitoring solution.

The progress handler is called periodically during long operations, while the
commit and rollback hooks provide transaction lifecycle monitoring. Together with
the trace callback, this gives complete visibility into database activity.

## Best Practices

- **Keep callbacks fast:** They execute synchronously during queries

- **Use for debugging:** Consider disabling in production

- **Combine with logging:** For persistent trace records

- **Handle exceptions:** Errors in callbacks can crash your app

- **Reset when done:** Set callback to None when not needed

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Tracing and Profiling](https://www.sqlite.org/c3ref/profile.html)

- [SQLite Authorizer Callbacks](https://www.sqlite.org/c3ref/set_authorizer.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).