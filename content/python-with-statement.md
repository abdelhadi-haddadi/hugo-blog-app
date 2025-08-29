+++
title = "Python With Statement"
date = 2025-08-29T20:11:11.665+01:00
draft = false
description = "Python tutorial on the with keyword, covering context managers, resource handling, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python With Statement

last modified February 25, 2025

The with statement in Python simplifies resource management by
ensuring proper setup and cleanup. It works with context managers to handle
exceptions and release resources automatically. This tutorial covers the
with keyword, context managers, and practical applications.

The with statement wraps code execution within methods defined by
context managers. It guarantees that resources like files or network connections
are properly initialized and cleaned up, even if errors occur during processing.

## Basic File Handling

This example demonstrates reading a file using the with statement.
The file is automatically closed after the block executes.

read_file.py
  

with open('data.txt', 'r') as file:
    content = file.read()
    print(content[:50])  # Print first 50 characters

# File is closed automatically here

The open function returns a file object that acts as a context
manager. After the block completes, the file's __exit__ method
closes the resource, even if an exception occurs.

## Custom Context Manager Class

This example creates a custom context manager using a class with
__enter__ and __exit__ methods.

custom_context.py
  

class DatabaseConnection:
    def __enter__(self):
        print("Establishing connection")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")
    
    def query(self):
        print("Executing query")

with DatabaseConnection() as conn:
    conn.query()

# Output:
# Establishing connection
# Executing query
# Closing connection

The __exit__ method always executes after the block, ensuring
resource cleanup. This pattern is useful for managing database connections or
network sockets.

## Using contextlib for Generators

This example uses contextlib.contextmanager to create a context
manager from a generator function.

generator_context.py
  

from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield
    print(f"Elapsed: {time.time() - start:.2f}s")

with timer():
    data = [x**2 for x in range(1000000)]

The @contextmanager decorator converts the generator into a context
manager. Code before yield runs on entry, and code after runs on
exit.

## Handling Multiple Resources

The with statement can manage multiple context managers
simultaneously.

multiple_resources.py
  

with open('input.txt', 'r') as src, open('output.txt', 'w') as dest:
    content = src.read()
    dest.write(content.upper())

print("Files processed and closed")

Both files are closed automatically after the block. This approach ensures all
resources are released, even if an error occurs during processing.

## Error Handling in With Blocks

This example shows how the with statement handles exceptions while
accessing resources.

error_handling.py
  

try:
    with open('missing.txt', 'r') as file:
        print(file.read())
except FileNotFoundError:
    print("Error: File not found")

The with statement ensures the file is closed before the exception
is handled. Context managers handle cleanup regardless of success or failure.

## Best Practices for With Statements

- **Use for Resource Management:** Prefer with for files, databases, and network connections.

- **Leverage Built-in Managers:** Many Python objects like files and locks already support context management.

- **Create Custom Managers:** Implement __enter__/__exit__ for complex resources.

- **Combine with contextlib:** Use decorators for simpler generator-based context managers.

## Source

[Python With Statement Documentation](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement)

In this article, we explored the Python with statement and
demonstrated its use in resource management through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).