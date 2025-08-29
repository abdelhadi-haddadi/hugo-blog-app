+++
title = "Python Exceptions"
date = 2025-08-29T20:08:28.449+01:00
draft = false
description = "Python tutorial on exceptions, covering error handling, try-except blocks, custom exceptions, and best practices. Includes practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Exceptions

last modified February 24, 2025

Exceptions in Python are events that occur during the execution of a program
that disrupt the normal flow of instructions. Python provides a robust mechanism
for handling exceptions using try-except blocks. This tutorial
covers the basics of exceptions, how to handle them, and best practices for
writing clean and maintainable code.

Exceptions are errors that occur during the execution of a program. When an
exception occurs, Python creates an exception object and stops the program
unless the exception is handled. Common exceptions include
ZeroDivisionError, TypeError, and
FileNotFoundError.

## Handling Division by Zero

This example demonstrates how to handle a division by zero error using a
try-except block.

division_by_zero.py
  

try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")

The try block contains the code that might raise an exception. If a
ZeroDivisionError occurs, the except block is
executed, and an error message is printed.

## Handling Multiple Exceptions

This example demonstrates how to handle multiple exceptions using a single try-except block.

multiple_exceptions.py
  

try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Error: Invalid input. Please enter a valid number.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")

The try block attempts to convert user input to an integer and
perform a division. If a ValueError or
ZeroDivisionError occurs, the corresponding except
block is executed.

## Using the Else Clause

This example demonstrates how to use the else clause in a try-except block.

else_clause.py
  

try:
    num = int(input("Enter a number: "))
    result = 10 / num
except ValueError:
    print("Error: Invalid input. Please enter a valid number.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
else:
    print(f"Result: {result}")

The else block is executed if no exceptions occur in the
try block. It is useful for code that should only run when the
try block succeeds.

## Using the Finally Clause

This example demonstrates how to use the finally clause in a try-except block.

finally_clause.py
  

try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Error: File not found.")
finally:
    file.close()
    print("File closed.")

The finally block is executed regardless of whether an exception
occurs. It is typically used for cleanup actions, such as closing files or
releasing resources.

## Raising Custom Exceptions

This example demonstrates how to raise custom exceptions using the raise keyword.

custom_exception.py
  

def check_age(age):
    if age &lt; 0:
        raise ValueError("Age cannot be negative.")
    elif age &lt; 18:
        raise ValueError("You must be at least 18 years old.")
    else:
        print("Access granted.")

try:
    check_age(-5)
except ValueError as e:
    print(f"Error: {e}")

The check_age function raises a ValueError if the age
is negative or below 18. The exception is caught and handled in the
try-except block.

## Creating Custom Exception Classes

This example demonstrates how to create custom exception classes by inheriting
from the Exception class.

custom_exception_class.py
  

class InvalidAgeError(Exception):
    def __init__(self, message="Invalid age."):
        self.message = message
        super().__init__(self.message)

def check_age(age):
    if age &lt; 0:
        raise InvalidAgeError("Age cannot be negative.")
    elif age &lt; 18:
        raise InvalidAgeError("You must be at least 18 years old.")
    else:
        print("Access granted.")

try:
    check_age(-5)
except InvalidAgeError as e:
    print(f"Error: {e}")

The InvalidAgeError class is a custom exception that inherits from
Exception. It is raised in the check_age function and
caught in the try-except block.

## Best Practices for Exception Handling

- **Be Specific:** Catch specific exceptions rather than using a generic except block.

- **Use Finally for Cleanup:** Use the finally block for cleanup actions like closing files or releasing resources.

- **Avoid Silent Failures:** Always log or handle exceptions to avoid silent failures.

- **Create Custom Exceptions:** Use custom exceptions to provide more meaningful error messages.

## Source

[Python Exceptions Documentation](https://docs.python.org/3/tutorial/errors.html)

In this article, we have explored Python exceptions and demonstrated how to
handle them effectively using practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).