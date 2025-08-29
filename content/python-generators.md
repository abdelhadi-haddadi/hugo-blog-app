+++
title = "Python Generators"
date = 2025-08-29T20:08:35.140+01:00
draft = false
description = "Python tutorial on generators, covering their syntax, use cases, and advantages over regular functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Generators

last modified February 24, 2025

Generators in Python are a special type of function that allow you to iterate
over a sequence of values without storing them all in memory at once. They are
defined using the yield keyword and are particularly useful for
working with large datasets or infinite sequences. This article covers the
basics of Python generators, their syntax, and practical examples.

Generators are functions that return an iterator. Unlike regular functions,
which compute all values at once and return them in a list, generators produce
values one at a time using the yield keyword. This makes them
memory-efficient and ideal for handling large or infinite sequences.

## Simple Generator

This example demonstrates a simple generator that yields numbers from 0 to 4.

simple_generator.py
  

def simple_generator():
    yield 0
    yield 1
    yield 2
    yield 3
    yield 4

# Using the generator
for value in simple_generator():
    print(value)

The generator function simple_generator yields values one at a
time. When iterated over, it produces the sequence 0, 1, 2, 3, 4.

## Infinite Sequence

This example demonstrates a generator that produces an infinite sequence of numbers.

infinite_sequence.py
  

def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

# Using the generator
gen = infinite_sequence()
for _ in range(5):
    print(next(gen))

The generator infinite_sequence produces an infinite sequence of
numbers starting from 0. The next function is used to retrieve
values from the generator.

## Fibonacci Sequence

This example demonstrates a generator for the Fibonacci sequence.

fibonacci_generator.py
  

def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Using the generator
gen = fibonacci_generator()
for _ in range(10):
    print(next(gen))

The generator fibonacci_generator produces the Fibonacci sequence.
It yields values on-the-fly, making it memory-efficient for large sequences.

## Filtering with Generators

This example demonstrates how to use a generator to filter even numbers from a
sequence.

filter_generator.py
  

def filter_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            yield num

# Using the generator
numbers = range(10)
even_numbers = filter_even(numbers)
for num in even_numbers:
    print(num)

The generator filter_even filters even numbers from a sequence. It
processes elements one at a time, making it memory-efficient.

## Reading Large Files

This example demonstrates how to use a generator to read a large file
line-by-line.

read_file_generator.py
  

def read_large_file(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Using the generator
for line in read_large_file('large_file.txt'):
    print(line)

The generator read_large_file reads a file line-by-line, making it
suitable for processing large files without loading them entirely into memory.

## Chaining Generators

This example demonstrates how to chain multiple generators together.

chain_generators.py
  

def generator1():
    yield 'A'
    yield 'B'

def generator2():
    yield 'C'
    yield 'D'

def chain_generators(*generators):
    for gen in generators:
        yield from gen

# Using the generator
combined = chain_generators(generator1(), generator2())
for value in combined:
    print(value)

The generator chain_generators combines multiple generators into a
single sequence using the yield from syntax.

## Advantages of Generators

**Memory Efficiency:** Generators produce values on-the-fly,
avoiding the need to store large datasets in memory.
**Lazy Evaluation:** Values are computed only when needed,
improving performance for large or infinite sequences.
**Readability:** Generators provide a clean and concise way to
work with sequences.

## Source

[Python Generators Documentation](https://docs.python.org/3/tutorial/classes.html#generators)

In this article, we have explored Python generators and demonstrated their use
cases through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).