+++
title = "Python Try-Except: Exception Handling"
date = 2025-08-29T20:11:06.970+01:00
draft = false
description = "Python tutorial on exception handling with try-except blocks, covering error catching, cleanup actions, and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Try-Except: Exception Handling

last modified January 15, 2026

The try keyword in Python initiates exception handling blocks to 
gracefully manage runtime errors. Paired with except, 
else, and finally, it prevents program crashes by 
capturing and processing exceptions. This tutorial covers error handling 
techniques with practical examples.

Exception handling allows developers to anticipate potential errors and define 
recovery processes. The try block contains code that might raise 
exceptions, while except blocks handle specific error types. 
Optional else and finally clauses manage successful 
executions and cleanup actions.

## Handling Division Errors

This example demonstrates basic exception handling for division operations.

division_error.py
  

def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Division by zero")
        return None
    return result

print(safe_divide(10, 2))  # Output: 5.0
print(safe_divide(5, 0))   # Output: Error: Division by zero, None

The try block attempts division, while the except 
catches ZeroDivisionError. The function returns None when invalid 
division occurs, preventing program termination.

## Catching Multiple Exceptions

Handle different error types using multiple except clauses.

multiple_errors.py
  

def process_data(value):
    try:
        num = int(value)
        print(100 / num)
    except ValueError:
        print("Invalid integer conversion")
    except ZeroDivisionError:
        print("Cannot divide by zero")

process_data("45")    # Output: 2.222...
process_data("apple") # Output: Invalid integer conversion
process_data("0")     # Output: Cannot divide by zero

Separate except blocks handle conversion errors and division 
errors distinctly. This allows targeted error messages and recovery paths.

## Using Else Clause

Execute code only if the try block succeeds using 
else.

else_clause.py
  

try:
    with open("data.txt", "r") as f:
        contents = f.read()
except FileNotFoundError:
    print("File not found")
else:
    print("File read successfully")
    print(f"Length: {len(contents)} chars")

The else block runs only if no exceptions occur in the 
try block. This separates error handling from successful 
execution logic.

## Finally for Cleanup

Use finally to execute cleanup code regardless of exceptions.

finally_clause.py
  

try:
    file = open("report.txt", "w")
    file.write("Sample data")
    100 / 0
except ZeroDivisionError:
    print("Division error occurred")
finally:
    file.close()
    print("File resource closed")

The finally block ensures the file is closed even after a division 
error interrupts the write operation. This prevents resource leaks.

## Raising Custom Exceptions

Manually trigger exceptions using raise for invalid conditions.

raise_exception.py
  

def validate_age(age):
    if age &lt; 0:
        raise ValueError("Age cannot be negative")
    return f"Valid age: {age}"

try:
    print(validate_age(25))
    print(validate_age(-5))
except ValueError as e:
    print(f"Error: {e}")

The raise statement creates a ValueError for negative 
ages. This propagates the error to be caught in the enclosing 
try-except block.

## Nested Try Blocks

Handle exceptions at different levels using nested try statements.

nested_try.py
  

try:
    try:
        result = 10 / 0
    except ZeroDivisionError:
        print("Inner: Division error")
        raise  # Re-raise the exception
except Exception as e:
    print(f"Outer: Caught {type(e).__name__}")

The inner block catches a division error and re-raises it for the outer block to 
handle. This allows layered error processing and logging.

## Best Practices

- **Avoid Bare Except:** Catch specific exceptions instead of using bare except:

- **Use Finally:** Clean up resources like files or network connections in finally

- **Minimal Try Blocks:** Keep try blocks small to isolate error-prone code

- **Log Exceptions:** Record exceptions with tracebacks for debugging purposes

- **Custom Exceptions:** Create domain-specific exceptions for complex applications

## Source

[Python Errors and Exceptions Documentation](https://docs.python.org/3/tutorial/errors.html)

This tutorial explored Python's exception handling using try-except 
blocks. These constructs enable robust error management and resource cleanup in 
Python applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).