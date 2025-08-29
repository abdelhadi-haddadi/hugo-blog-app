+++
title = "Python print Function"
date = 2025-08-29T20:09:57.122+01:00
draft = false
description = "Complete guide to Python's print function covering basic output, formatting options, and practical examples of console printing."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python print Function

Last modified April 11, 2025

This comprehensive guide explores Python's print function, which
outputs text to the standard output stream. We'll cover basic usage, formatting
options, and practical examples of console output in Python.

## Basic Definitions

The print function displays objects to the text stream, typically
the console. It converts objects to strings, separates them with spaces, and
ends with a newline by default.

Key characteristics: accepts multiple objects, handles string conversion,
supports custom separators and line endings, and can redirect to files. It's
Python's primary output mechanism.

## Basic Usage

Here's simple usage showing how print handles different types of
objects and multiple arguments. This demonstrates its default behavior.

basic_print.py
  

# Simple string
print("Hello, World!")

# Multiple arguments
print("The answer is", 42)

# Different types
print("Pi is approximately", 3.14159)

# Mathematical expression
print("2 + 2 =", 2 + 2)

# List output
print([1, 2, 3, 4, 5])

This example shows print's versatility. It automatically converts
numbers to strings, handles multiple arguments, and evaluates expressions.

By default, print separates arguments with spaces and ends with
a newline. These behaviors can be customized as shown in later examples.

## Custom Separators and Endings

The sep and end parameters control how print
joins arguments and terminates output. This example demonstrates customization.

separators.py
  

# Custom separator
print("2025", "04", "11", sep="-")  # 2025-04-11

# No separator
print("Python", "is", "awesome", sep="")  # Pythonisawesome

# Custom end character
print("Loading", end="... ")
print("Done!")  # Loading... Done!

# Multi-line output
print("First line", end="\n\n")
print("Third line")

# Tab-separated values
print("Name", "Age", "City", sep="\t")
print("Alice", 30, "Paris", sep="\t")

The sep parameter replaces the default space between arguments.
The end parameter replaces the default newline at the end.

These features are useful for formatting output precisely, creating CSV/TSV
data, or building progress indicators without line breaks.

## File Output

The print function can write directly to files using the file
parameter. This example shows file output and standard error redirection.

file_output.py
  

# Writing to a file
with open("output.txt", "w") as f:
    print("This goes to a file", file=f)

# Appending to a file
with open("log.txt", "a") as f:
    print("New log entry", file=f)

# Writing to stderr
import sys
print("Error message", file=sys.stderr)

# Multiple file writes
with open("data.csv", "w") as f:
    print("Name,Age,Score", file=f)
    print("Alice,25,95", file=f)
    print("Bob,30,88", file=f)

The file parameter accepts any file-like object with a write
method. This includes standard streams like sys.stderr.

File output is buffered by default. For immediate writing, either flush the
file or use flush=True parameter (Python 3.3+).

## Formatted Output

The print function works with various string formatting techniques.
This example shows f-strings, format(), and %-formatting.

formatting.py
  

# f-strings (Python 3.6+)
name = "Alice"
age = 30
print(f"{name} is {age} years old")

# format() method
print("{} + {} = {}".format(5, 3, 5+3))

# %-formatting
print("Pi: %.2f" % 3.14159)

# Column alignment
print("{:&lt;10} {:&gt;10}".format("Item", "Price"))
print("{:&lt;10} {:&gt;10.2f}".format("Apple", 0.99))
print("{:&lt;10} {:&gt;10.2f}".format("Banana", 1.25))

# Multi-line formatted output
print(f"""\
Name:   {name}
Age:    {age}
Score:  {95}
""")

String formatting allows precise control over output appearance. f-strings
(Python 3.6+) provide the most readable syntax for embedding expressions.

The example demonstrates number formatting, column alignment, and multi-line
output. These techniques are essential for creating professional console output.

## Advanced Features

This example explores less common print features like flush,
printing iterables, and handling non-string types.

advanced.py
  

# Flushing output immediately
print("Loading...", end="", flush=True)
import time
time.sleep(2)
print("Done!")

# Printing iterables with *
numbers = [1, 2, 3, 4, 5]
print(*numbers, sep=", ")  # 1, 2, 3, 4, 5

# Printing dictionaries
person = {"name": "Alice", "age": 30}
print("Person:", person)

# Custom object with __str__
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Point({self.x}, {self.y})"

print(Point(3, 4))  # Point(3, 4)

# Printing bytes
print(b"Hello")  # b'Hello'

The flush parameter forces immediate output, useful for progress
indicators. The * operator unpacks iterables for printing.

Custom objects should implement __str__ for meaningful print
output. print handles bytes and other types by calling their
string representation methods.

## Best Practices

- **Use f-strings:** For clean, readable string formatting (Python 3.6+)

- **Consider end parameter:** For progress indicators without newlines

- **Implement __str__:** For custom objects to print meaningfully

- **Use file parameter:** For writing directly to files or stderr

- **Format consistently:** Maintain uniform output formatting

## Source References

- [Python print() Documentation](https://docs.python.org/3/library/functions.html#print)

- [Python Output Formatting](https://docs.python.org/3/tutorial/inputoutput.html#fancier-output-formatting)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).