+++
title = "Python Yield Keyword"
date = 2025-08-29T20:11:15.535+01:00
draft = false
description = "A detailed Python tutorial on the yield keyword, exploring generators, iteration, and efficient data handling."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Yield Keyword

Last modified February 25, 2025

The yield keyword in Python transforms functions into
generators that pause and resume execution. Unlike return,
which ends a function, yield delivers values incrementally.
This enables memory-efficient handling of large datasets. This guide
explores generator creation, iteration, and advanced techniques.

Generators retain their state between yields. Calling a generator function
returns an iterator, and each next call resumes execution
at the last yield. This lazy evaluation minimizes memory use,
making it ideal for iterative tasks.

## Basic Generator Function

This example illustrates a basic generator yielding a few values.

simple_gen.py
  

def number_generator():
    yield 10
    yield 20
    yield 30

gen = number_generator()
print(next(gen))  # Output: 10
print(next(gen))  # Output: 20
print(next(gen))  # Output: 30

The generator yields values on demand. Each next call picks
up where the previous yield left off, delivering the next
value. After the last yield, it raises StopIteration.

## Generating Fibonacci Sequence

This generator produces Fibonacci numbers up to a given limit.

fib_gen.py
  

def fibonacci(limit):
    a, b = 0, 1
    while a &lt; limit:
        yield a
        a, b = b, a + b

for num in fibonacci(50):
    print(num, end=' ')  # Output: 0 1 1 2 3 5 8 13 21 34

Values are computed only when requested, avoiding the need to store the
full sequence in memory. This efficiency suits large or unbounded ranges.

## Memory Efficiency Comparison

This compares memory use between a list and a generator.

memory_compare.py
  

import sys

def list_squares(n):
    return [x**2 for x in range(n)]

def gen_squares(n):
    for x in range(n):
        yield x**2

print(sys.getsizeof(list_squares(500)))  # ~2300 bytes
print(sys.getsizeof(gen_squares(500)))   # ~112 bytes

The generator's minimal memory footprint stems from generating values
on-the-fly, unlike the list, which stores everything upfront.

## Sending Values to Generators

Generators can accept values via send for interactive use.

send_gen.py
  

def accumulator():
    total = 0
    while True:
        value = yield
        total += value
        yield total

gen = accumulator()
next(gen)  # Prime the generator
gen.send(4)
print(next(gen))  # Output: 4
gen.send(6)
print(next(gen))  # Output: 10

Using send, values are fed into the generator, updating its state.
This two-way communication supports dynamic computations.

## Yield Expressions

This uses yield as an expression with send.

yield_expr.py
  

def counter():

    count = 0
    while True:
        increment = yield count
        count += increment

gen = counter()
next(gen)  # Start it
print(gen.send(2))  # Output: 2
print(gen.send(3))  # Output: 5

The generator receives increments via send and yields the
running total, showcasing interactive state management.

## Handling Exceptions

Generators handle exceptions with throw and close.

gen_exception.py
  

def safe_gen():
    try:
        while True:
            yield "Active"
    except ValueError:
        yield "Recovered"

gen = safe_gen()
print(next(gen))           # Output: Active
print(gen.throw(ValueError))  # Output: Recovered
gen.close()                # Stops the generator

The throw method triggers exceptions inside the generator,
which can be caught and handled. close terminates it cleanly.

## Infinite Sequence with Yield

This generates an infinite sequence of even numbers.

infinite_gen.py
  

def even_numbers():
    n = 0
    while True:
        yield n
        n += 2

evens = even_numbers()
for _ in range(5):
    print(next(evens), end=' ')  # Output: 0 2 4 6 8

The generator produces even numbers endlessly, yielding each value on
demand. A loop or limiter controls how many are consumed.

## Yield From with Subgenerators

yield from delegates yielding to another generator.

yield_from.py
  

def sub_gen():
    yield 1
    yield 2
    yield 3

def main_gen():
    yield from sub_gen()
    yield 4

gen = main_gen()
print(list(gen))  # Output: [1, 2, 3, 4]

The yield from syntax simplifies delegating to sub_gen,
yielding its values directly, followed by an additional yield.

The next script demonstrates the use of yield from for delegating
tasks between generators. The subgenerator, process_file_lines,
reads lines from a file and handles errors gracefully by yielding an error
message if the file is missing.

yield_from2.py
  

def process_file_lines(filename):
    """Subgenerator that yields lines from a specific file."""

    try:
        with open(filename, 'r') as file:
            for line in file:
                yield line.strip()
    except FileNotFoundError:
        yield f"Error: File '{filename}' not found"

def process_multiple_files(file_list):
    """Main generator that delegates to process_file_lines for each file."""

    for filename in file_list:
        print(f"Processing {filename}:")
        yield from process_file_lines(filename)
        yield "---"  # Separator between files

def main():

    files_to_process = ["users.txt", "orders.txt", "missing.txt"]    
    file_processor = process_multiple_files(files_to_process)
    
    # Process and display results
    for result in file_processor:
        print(result)

if __name__ == "__main__":
    main()

The main generator, process_multiple_files, processes a list of
files, delegating to process_file_lines for line reading via
yield from. It adds separators between files for better readability
and keeps the logic modular and clear.

In main, the program uses a sample file list to showcase successful
processing and error handling. This approach highlights how yield from 
simplifies code and enhances maintainability, especially for workflows involving
nested tasks.

## File Reading with Yield

This reads a file line-by-line using a generator.

file_gen.py
  

def read_file(filename):
    with open(filename, 'r') as f:
        yield from f

for line in read_file('example.txt'):
    print(line.strip())

Using yield from, the generator streams file lines without
loading the entire file into memory, enhancing efficiency.

## Flattening Nested Lists

This flattens a nested list recursively with yield from.

flatten_gen.py
  

def flatten(items):
    for item in items:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, 3], [4, [5]]]
print(list(flatten(nested)))  # Output: [1, 2, 3, 4, 5]

The recursive use of yield from unwraps nested lists, yielding
each element individually in a flat sequence.

## Random Data Generator

This generates random integers infinitely.

random_gen.py
  

import random

def random_nums(min_val, max_val):
    while True:
        yield random.randint(min_val, max_val)

rands = random_nums(1, 10)
for _ in range(3):
    print(next(rands))  # e.g., Output: 7 3 9

The generator yields random numbers endlessly, useful for testing or
simulations, with values produced only as needed.

## Best Practices for Using Yield

- **Use for Large Data:** Prefer generators when processing large datasets to reduce memory footprint.

- **Avoid State When Possible:** Keep generators stateless for simplicity unless required.

- **Use Generator Expressions:** For simple cases, use (x for x in iterable) syntax.

- **Close Properly:** Call close on generators when done to free resources.

## Source

[Python Yield Expression Documentation](https://docs.python.org/3/reference/expressions.html#yield-expressions)

This guide covered the yield keyword's role in crafting
efficient generators, including advanced features like yield from
for delegation and iteration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).