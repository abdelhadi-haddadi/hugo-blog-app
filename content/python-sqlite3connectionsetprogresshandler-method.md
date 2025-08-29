+++
title = "Python sqlite3.Connection.set_progress_handler Method"
date = 2025-08-29T20:10:36.578+01:00
draft = false
description = "Complete guide to Python's sqlite3.Connection.set_progress_handler method covering usage patterns and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sqlite3.Connection.set_progress_handler Method

Last modified April 15, 2025

This comprehensive guide explores Python's sqlite3.Connection.set_progress_handler method,
which allows monitoring long-running SQLite operations. We'll cover basic usage,
practical examples, and common patterns.

## Basic Definitions

The set_progress_handler method registers a callback function that
SQLite will invoke periodically during long-running operations. This enables
progress monitoring and potential cancellation.

Key characteristics: the callback is invoked every N SQLite virtual machine
operations, receives no parameters, and can return non-zero to abort the current
operation. It's useful for long queries or updates.

## Basic Progress Handler

This example shows the simplest usage of set_progress_handler to
monitor a database operation.

basic_handler.py
  

import sqlite3

def progress_callback():
    print("SQLite operation in progress...")
    return 0  # Return 0 to continue, non-zero to abort

with sqlite3.connect(':memory:') as conn:
    conn.set_progress_handler(progress_callback, 1000)
    cursor = conn.cursor()
    
    # Create a large table to trigger progress callbacks
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                      [(i, 'x'*100) for i in range(10000)])

The progress callback is called every 1000 SQLite virtual machine operations.
The callback prints a message but doesn't abort the operation (returns 0).

This pattern is useful for providing feedback during long-running database
operations in interactive applications.

## Aborting Long Operations

This example demonstrates how to abort a long-running operation using the
progress handler.

abort_operation.py
  

import sqlite3
import time

class OperationAborted(Exception):
    pass

def progress_callback():
    print("Operation taking too long, aborting...")
    return 1  # Non-zero return aborts the operation

with sqlite3.connect(':memory:') as conn:
    conn.set_progress_handler(progress_callback, 1000)
    cursor = conn.cursor()
    
    try:
        cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
        # This insert will be aborted by the progress handler
        cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                          [(i, 'x'*100) for i in range(100000)])
    except sqlite3.OperationalError as e:
        print(f"Operation aborted: {e}")

The progress callback returns 1 after the first invocation, causing SQLite to
abort the current operation. This raises an OperationalError.

This technique is valuable for implementing query timeouts or user-cancellable
operations in applications.

## Progress Bar Implementation

Here's how to implement a simple progress bar using the progress handler.

progress_bar.py
  

import sqlite3
import sys

class ProgressTracker:
    def __init__(self, total_ops):
        self.count = 0
        self.total_ops = total_ops
    
    def __call__(self):
        self.count += 1
        progress = min(100, int((self.count * 100) / self.total_ops))
        sys.stdout.write(f"\rProgress: {progress}%")
        sys.stdout.flush()
        return 0

with sqlite3.connect(':memory:') as conn:
    tracker = ProgressTracker(500)
    conn.set_progress_handler(tracker, 100)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                      [(i, 'x'*100) for i in range(5000)])
    print("\nOperation completed")

The ProgressTracker class maintains state between callback
invocations and updates a progress percentage. The callback is called every
100 operations.

This provides visual feedback for users during lengthy database operations,
improving user experience.

## Time-based Progress Monitoring

This example shows how to implement time-based operation monitoring using
the progress handler.

time_based.py
  

import sqlite3
import time

class TimeoutMonitor:
    def __init__(self, timeout_seconds):
        self.start_time = time.time()
        self.timeout = timeout_seconds
    
    def __call__(self):
        elapsed = time.time() - self.start_time
        if elapsed &gt; self.timeout:
            print(f"\nTimeout after {elapsed:.1f} seconds")
            return 1  # Abort operation
        print(".", end="", flush=True)
        return 0

with sqlite3.connect(':memory:') as conn:
    monitor = TimeoutMonitor(2)  # 2 second timeout
    conn.set_progress_handler(monitor, 1000)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    try:
        cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                          [(i, 'x'*100) for i in range(100000)])
    except sqlite3.OperationalError:
        print("\nOperation timed out")

The TimeoutMonitor class tracks elapsed time and aborts the
operation if it exceeds the specified timeout. Dots are printed as progress
indicators.

This pattern is useful for enforcing maximum execution times for database
operations in production systems.

## Multi-Operation Progress Tracking

This example demonstrates tracking progress across multiple database operations.

multi_operation.py
  

import sqlite3

class MultiOpTracker:
    def __init__(self):
        self.operation_count = 0
        self.total_steps = 0
    
    def __call__(self):
        self.total_steps += 1
        if self.total_steps % 1000 == 0:
            print(f"Step {self.total_steps} of operation {self.operation_count}")
        return 0
    
    def begin_operation(self, name):
        self.operation_count += 1
        print(f"Starting operation {self.operation_count}: {name}")

with sqlite3.connect(':memory:') as conn:
    tracker = MultiOpTracker()
    conn.set_progress_handler(tracker, 100)
    
    cursor = conn.cursor()
    
    tracker.begin_operation("Create table")
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    
    tracker.begin_operation("Insert data")
    cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                      [(i, 'x'*100) for i in range(5000)])
    
    tracker.begin_operation("Create index")
    cursor.execute("CREATE INDEX idx_test ON test(id)")

The MultiOpTracker maintains counts across multiple operations,
providing detailed progress information. Each operation is tracked separately.

This approach is valuable for complex database operations consisting of
multiple steps where progress tracking is needed.

## Thread-Safe Progress Reporting

This example shows how to implement thread-safe progress reporting using
the progress handler.

thread_safe.py
  

import sqlite3
import threading

class ThreadSafeProgress:
    def __init__(self):
        self.lock = threading.Lock()
        self.counter = 0
    
    def __call__(self):
        with self.lock:
            self.counter += 1
            if self.counter % 1000 == 0:
                print(f"Operations completed: {self.counter}")
        return 0

def worker(db_path, progress):
    with sqlite3.connect(db_path) as conn:
        conn.set_progress_handler(progress, 100)
        cursor = conn.cursor()
        cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                          [(i, 'x'*100) for i in range(5000)])

with sqlite3.connect(':memory:') as main_conn:
    cursor = main_conn.cursor()
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    
    progress = ThreadSafeProgress()
    threads = []
    
    for i in range(3):
        t = threading.Thread(target=worker, args=(':memory:', progress))
        threads.append(t)
        t.start()
    
    for t in threads:
        t.join()

The ThreadSafeProgress class uses a lock to protect shared state
when accessed from multiple threads. Each thread reports progress through the
same handler instance.

This pattern is essential when using progress handlers in multi-threaded
applications to prevent race conditions in progress reporting.

## Custom Progress Handler with State

This advanced example demonstrates a progress handler with complex state
management and external control.

stateful_handler.py
  

import sqlite3
import time

class StatefulProgress:
    def __init__(self, interval=1.0):
        self.last_report = 0
        self.interval = interval
        self.ops_count = 0
        self.should_abort = False
    
    def __call__(self):
        self.ops_count += 1
        now = time.time()
        
        if now - self.last_report &gt;= self.interval:
            print(f"Operations: {self.ops_count}, Abort: {self.should_abort}")
            self.last_report = now
        
        return 1 if self.should_abort else 0

with sqlite3.connect(':memory:') as conn:
    progress = StatefulProgress(0.5)  # Report every 0.5 seconds
    conn.set_progress_handler(progress, 1000)
    
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE test (id INTEGER, data TEXT)")
    
    try:
        # Start long-running operation
        cursor.executemany("INSERT INTO test VALUES (?, ?)", 
                          [(i, 'x'*100) for i in range(100000)])
    except sqlite3.OperationalError:
        print("Operation aborted by user")
    
    # Simulate user abort after 3 seconds
    time.sleep(3)
    progress.should_abort = True

The StatefulProgress class maintains detailed operation state and
allows external control of abortion. It reports progress at regular time
intervals rather than operation counts.

This advanced pattern enables sophisticated progress monitoring scenarios where
external control or complex state management is required.

## Best Practices

- **Keep callbacks fast:** Progress handlers should execute quickly

- **Use appropriate frequency:** Balance between responsiveness and overhead

- **Handle thread safety:** Protect shared state in multi-threaded apps

- **Provide user feedback:** Use progress handlers to improve UX

- **Clean up resources:** Remove handlers when no longer needed

## Source References

- [Python sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html)

- [SQLite Progress Handler](https://www.sqlite.org/c3ref/progress_handler.html)

- [SQLite C Interface](https://www.sqlite.org/cintro.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).