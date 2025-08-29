+++
title = "Python iter Function"
date = 2025-08-29T20:08:45.366+01:00
draft = false
description = "Complete guide to Python's iter function covering basic usage, custom iterables, sentinel values, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python iter Function

Last modified April 11, 2025

This comprehensive guide explores Python's iter function, which
returns an iterator object for an iterable. We'll cover basic usage, custom
iterables, sentinel values, and practical examples of iteration in Python.

## Basic Definitions

The iter function returns an iterator object for a given iterable.
It's the underlying mechanism behind Python's for loops and iteration protocols.

Key characteristics: takes an iterable object (or a callable and sentinel),
returns an iterator that implements __next__. Used implicitly in
for loops and comprehensions.

## Basic Iterable Usage

Here's simple usage with different iterable types showing how iter
converts collections into iterators.

basic_iter.py
  

# With lists
numbers = [1, 2, 3]
num_iter = iter(numbers)
print(next(num_iter))  # 1
print(next(num_iter))  # 2

# With strings
text = "hello"
char_iter = iter(text)
print(next(char_iter))  # 'h'
print(next(char_iter))  # 'e'

This example shows iter with different iterable types. For lists,
it creates an iterator that yields elements in order. For strings, it yields
characters one by one.

The next function is used to manually advance the iterator. This
is what Python does internally in for loops.

## Custom Iterable Objects

You can make custom objects iterable by implementing the iterator protocol.
This example creates a Countdown class.

custom_iter.py
  

class Countdown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.start &lt;= 0:
            raise StopIteration
        current = self.start
        self.start -= 1
        return current

countdown = Countdown(3)
countdown_iter = iter(countdown)
print(next(countdown_iter))  # 3
print(next(countdown_iter))  # 2
print(next(countdown_iter))  # 1

The Countdown class implements both __iter__ and __next__
methods. When we call iter on it, Python uses these methods.

This pattern is common when you need custom iteration behavior beyond what
built-in types provide.

## Using Sentinel Values

The iter function can take a callable and sentinel value to create
an iterator that stops when the sentinel is returned.

sentinel.py
  

import random

def random_until_5():
    num = random.randint(1, 10)
    print(f"Generated: {num}")
    return num

five_iter = iter(random_until_5, 5)
for num in five_iter:
    print(f"Got: {num}")

This creates an iterator that calls random_until_5 repeatedly until
it returns 5. Each generated number is printed until the sentinel value appears.

This is useful for creating iterators from functions that produce values until
a termination condition is met.

## File Reading with iter

The sentinel form of iter is particularly useful for reading files
until a certain condition is met.

file_iter.py
  

# Read lines until empty line
with open('data.txt') as f:
    for line in iter(f.readline, '\n'):
        print(line.strip())

# Read fixed-size chunks
with open('large_file.bin', 'rb') as f:
    for chunk in iter(lambda: f.read(1024), b''):
        process(chunk)

The first example reads lines until an empty line is encountered. The second
reads binary data in chunks until EOF.

This demonstrates how iter can create memory-efficient iterators
for processing large files without loading everything into memory.

## Error Handling

The iter function raises TypeError when used with
non-iterable objects or invalid combinations of arguments.

errors.py
  

try:
    print(iter(42))
except TypeError as e:
    print(f"Error: {e}")  # 'int' object is not iterable

try:
    print(iter(lambda: 1, 2, 3))  # Too many arguments
except TypeError as e:
    print(f"Error: {e}")  # iter() takes at most 2 arguments (3 given)

These examples demonstrate iter's behavior with invalid inputs.
Numbers aren't iterable, and iter accepts at most two arguments.

To make a class work with iter, implement __iter__
or __getitem__ as shown in earlier examples.

## Best Practices

- **Prefer for loops:** Use direct iteration when possible

- **Implement protocols:** For custom iterables, follow the protocol

- **Use sentinel form:** For function-based iteration patterns

- **Handle StopIteration:** Catch it when manually iterating

- **Document behavior:** Clearly document iteration behavior

## Source References

- [Python iter() Documentation](https://docs.python.org/3/library/functions.html#iter)

- [Python __iter__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__iter__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).