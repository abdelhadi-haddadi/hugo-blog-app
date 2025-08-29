+++
title = "Python Context Managers"
date = 2025-08-29T20:07:51.081+01:00
draft = false
description = "Python tutorial on context managers, covering their usage, benefits, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Context Managers

last modified February 24, 2025

Context managers in Python are used to manage resources such as file handles,
database connections, and locks. They ensure that resources are properly
acquired and released, even if an exception occurs. This tutorial covers the
basics of context managers, their usage with the with statement,
and practical examples.

Context managers are objects that define the runtime context for a block of
code. They are typically used with the with statement to ensure
that resources are properly managed. The most common use case is file handling,
where the file is automatically closed after the block of code is executed.

## File Handling with Context Managers

This example demonstrates how to use a context manager to handle file operations.

file_handling.py
  

with open('example.txt', 'w') as file:
    file.write('Hello, World!')

The with statement ensures that the file is properly closed after
the block of code is executed, even if an exception occurs. This eliminates the
need for explicit try-finally blocks.

## Custom Context Manager

This example demonstrates how to create a custom context manager using a class.

custom_context_manager.py
  

class CustomContextManager:
    def __enter__(self):
        print("Entering the context")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("Exiting the context")
        if exc_type:
            print(f"An exception occurred: {exc_value}")

with CustomContextManager() as manager:
    print("Inside the context")

The __enter__ method is called when entering the context, and the
__exit__ method is called when exiting the context. The
__exit__ method also handles any exceptions that occur within the
context.

## Context Manager with contextlib

This example demonstrates how to create a context manager using the contextlib module.

contextlib_example.py
  

from contextlib import contextmanager

@contextmanager
def custom_context_manager():
    print("Entering the context")
    try:
        yield
    finally:
        print("Exiting the context")

with custom_context_manager():
    print("Inside the context")

The contextmanager decorator is used to create a context manager
from a generator function. The yield statement separates the setup
and teardown code.

## Database Connection Management

This example demonstrates how to use a context manager to manage a database connection.

database_connection.py
  

import sqlite3

class DatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name

    def __enter__(self):
        self.conn = sqlite3.connect(self.db_name)
        return self.conn

    def __exit__(self, exc_type, exc_value, traceback):
        self.conn.close()

with DatabaseConnection('example.db') as conn:
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)')

The DatabaseConnection class ensures that the database connection
is properly closed after the block of code is executed. This prevents resource
leaks and ensures proper cleanup.

## Lock Management

This example demonstrates how to use a context manager to manage a thread lock.

lock_management.py
  

import threading

lock = threading.Lock()

with lock:
    print("Lock acquired")
    # Critical section of code

The with statement ensures that the lock is acquired before
entering the critical section and released after exiting, even if an exception
occurs.

## Timing Code Execution

This example demonstrates how to use a context manager to time the execution of
a block of code.

timing_execution.py
  

import time

class Timer:
    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.end_time = time.time()
        print(f"Execution time: {self.end_time - self.start_time} seconds")

with Timer():
    time.sleep(2)  # Simulate a time-consuming task

The Timer class measures the execution time of the block of code
within the with statement. The elapsed time is printed when the
block is exited.

## Best Practices for Using Context Managers

- **Use for Resource Management:** Context managers are ideal for managing resources like files, database connections, and locks.

- **Handle Exceptions Gracefully:** Ensure that the __exit__ method handles exceptions to avoid resource leaks.

- **Leverage contextlib:** Use the contextlib module to simplify the creation of context managers.

- **Document Usage:** Clearly document the purpose and usage of custom context managers.

## Source

[Python contextlib Documentation](https://docs.python.org/3/library/contextlib.html)

In this article, we have explored Python context managers and demonstrated their
usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).