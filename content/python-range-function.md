+++
title = "Python range Function"
date = 2025-08-29T20:10:05.061+01:00
draft = false
description = "Complete guide to Python's range function covering basic usage, step parameters, negative ranges, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python range Function

Last modified April 11, 2025

This comprehensive guide explores Python's range function, which
generates sequences of numbers. We'll cover basic usage, step parameters,
negative ranges, and practical examples of iteration and sequence generation.

## Basic Definitions

The range function generates an immutable sequence of numbers.
It's commonly used for looping a specific number of times in for
loops.

Key characteristics: returns a range object (not a list), memory efficient,
supports start, stop, and step parameters, and works with positive/negative
steps.

## Basic Range Usage

Here's simple usage showing how range generates number sequences
with different parameter combinations.

basic_range.py
  

# Single parameter (stop)
print(list(range(5)))      # [0, 1, 2, 3, 4]

# Two parameters (start, stop)
print(list(range(2, 6)))    # [2, 3, 4, 5]

# Three parameters (start, stop, step)
print(list(range(1, 10, 2))) # [1, 3, 5, 7, 9]

# Negative step
print(list(range(10, 0, -1))) # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

This example shows range with different parameter combinations.
With one parameter, it starts at 0. With two, it starts at the first number.

The step parameter controls the increment between numbers. Negative steps
create descending sequences. Note we convert to list for display purposes.

## Looping with Range

The most common use of range is in for loops to
repeat an action a specific number of times.

looping.py
  

# Simple countdown
for i in range(5, 0, -1):
    print(f"T-minus {i} seconds")
print("Blastoff!")

# Multiplication table
for i in range(1, 6):
    for j in range(1, 6):
        print(f"{i*j:4}", end="")
    print()

The first loop counts down from 5 to 1. The second generates a 5x5
multiplication table by nesting two ranges.

This demonstrates how range provides precise control over loop
iterations without needing to manually manage counters.

## Creating Number Sequences

range can generate various number sequences for mathematical
operations or data processing.

sequences.py
  

# Even numbers under 20
evens = list(range(0, 20, 2))
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Powers of 2
powers = [2**x for x in range(0, 11)]
print(powers) # [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

# Floating-point range simulation
frange = [x/10 for x in range(0, 10)]
print(frange) # [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

These examples show how to generate specific number sequences. The list
comprehension with range creates more complex sequences.

For floating-point ranges, we simulate them by dividing integer ranges,
since range only works with integers.

## Negative Ranges and Steps

range handles negative numbers and steps gracefully, allowing
flexible sequence generation in both directions.

negative_ranges.py
  

# Negative start
print(list(range(-5, 0)))      # [-5, -4, -3, -2, -1]

# Negative start and stop
print(list(range(-10, -15, -1))) # [-10, -11, -12, -13, -14]

# Mixed signs
print(list(range(-2, 3)))       # [-2, -1, 0, 1, 2]

# Large step
print(list(range(0, -10, -2)))  # [0, -2, -4, -6, -8]

These examples demonstrate range's behavior with negative
parameters. The step direction must match the start/stop relationship.

Negative steps create descending sequences. The step sign must be consistent
with the progression from start to stop.

## Memory Efficiency

This example compares range with list alternatives to demonstrate
its memory efficiency for large sequences.

memory.py
  

import sys

# Range object
r = range(1000000)
print(sys.getsizeof(r))  # Typically 48 bytes

# Equivalent list
l = list(range(1000000))
print(sys.getsizeof(l))  # Typically 8448728 bytes

# Iteration works the same
for i in range(1000000):
    if i == 10: break
    print(i, end=" ")

This shows range's constant memory usage regardless of sequence
length, while lists grow with the sequence size.

Despite generating numbers on demand, range supports full sequence
operations and maintains consistent performance.

## Best Practices

- **Prefer range for counting loops:** More readable than while loops

- **Use step parameter:** For non-unit increments/decrements

- **Consider memory:** Range objects are more efficient than lists

- **Combine with enumerate:** For index-value pairs in sequences

- **Document ranges:** Clearly indicate if endpoints are inclusive

## Source References

- [Python range() Documentation](https://docs.python.org/3/library/stdtypes.html#range)

- [Python range Tutorial](https://docs.python.org/3/tutorial/controlflow.html#the-range-function)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).