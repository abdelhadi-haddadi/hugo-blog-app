+++
title = "Python Lazy Evaluation"
date = 2025-08-29T20:08:47.621+01:00
draft = false
description = "Python tutorial on lazy evaluation with practical examples and profiling comparisons between lazy and non-lazy approaches."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Lazy Evaluation

last modified February 24, 2025

Lazy evaluation is a programming technique where the evaluation of an expression
is delayed until its value is actually needed. This can lead to significant
performance improvements, especially when working with large datasets or
computationally expensive operations. In this tutorial, we will explore lazy
evaluation in Python using generators and compare it with non-lazy approaches
using profiling.

## Generating Fibonacci Sequence

This example demonstrates the difference between lazy and non-lazy approaches
for generating a Fibonacci sequence.

fibonacci.py
  

import time
import itertools
from memory_profiler import memory_usage

# Non-lazy approach
def fibonacci_non_lazy(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

# Lazy approach
def fibonacci_lazy(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Profiling
def profile_non_lazy():
    start_time = time.time()
    result = fibonacci_non_lazy(100_000)
    
    # Print the first 20 elements
    for e in result[:20]:
        print(e, end=' ')
    print()
    
    duration = time.time() - start_time
    return duration

def profile_lazy():
    start_time = time.time()
    slice = itertools.islice(fibonacci_lazy(100_000), 20)
    
    # Print the first 20 elements
    for e in slice:
        print(e, end=' ')
    print()
    
    duration = time.time() - start_time
    return duration

def profile_non_lazy_memory():
    result = fibonacci_non_lazy(100_000)
    
    # Monitor memory usage in the loop
    for e in memory_usage((print, [result[:100]])):
        pass

def profile_lazy_memory():
    slice = itertools.islice(fibonacci_lazy(100_000), 100)
    
    # Monitor memory usage in the loop
    for e in memory_usage((print, [list(slice)])):
        pass

if __name__ == "__main__":
    # Profile non-lazy and lazy approaches with print
    non_lazy_me = memory_usage((profile_non_lazy_memory, ))
    print('-------------------------------------')
    lazy_mem = memory_usage((profile_lazy_memory, ))

    # Profile without print statements
    non_lazy_delta = profile_non_lazy()
    lazy_delta = profile_lazy()

    print(f"Non-lazy approach: {non_lazy_me[0]} MiB used in {non_lazy_delta:.2f} seconds")
    print('-------------------------------------')
    print(f"Lazy approach: {lazy_mem[0]} MiB used in {lazy_delta:.2f} seconds")

In this example, the non-lazy approach generates the entire Fibonacci sequence
and stores it in a list, while the lazy approach uses a generator to yield
values on-the-fly. The lazy approach is more memory-efficient and faster for
large sequences.

**Note:** be careful with large fibonacci sequences; this could
overwhelm your OS.

## The range function

The built-in range function is evaluated lazily. 

range_fun.py
  

import time
from memory_profiler import memory_usage

# Non-lazy custom range function
def custom_non_lazy_range(start, end):
    result = []
    current = start
    while current &lt; end:
        result.append(current)
        current += 1
    return result

# Profiling functions
def profile_builtin_range():
    start_time = time.time()
    result = range(1_500_000)
    
    # Print the first 3000 elements
    for e in result[:3000]:
        print(e, end=' ')
    print()
    
    duration = time.time() - start_time
    return duration

def profile_custom_non_lazy_range():
    start_time = time.time()
    result = custom_non_lazy_range(0, 1_500_000)
    
    # Print the first 3000 elements
    for e in result[:3000]:
        print(e, end=' ')
    print()
    
    duration = time.time() - start_time
    return duration

if __name__ == "__main__":
    # Profile built-in range and custom non-lazy range
    builtin_range_memory = memory_usage((profile_builtin_range, ))
    print('-------------------------------------')
    custom_non_lazy_range_memory = memory_usage((profile_custom_non_lazy_range, ))

    # Print memory usage and durations
    builtin_range_duration = profile_builtin_range()
    custom_non_lazy_range_duration = profile_custom_non_lazy_range()

    print(f"Built-in range: {builtin_range_memory[0]} MiB used in {builtin_range_duration:.2f} seconds")
    print('-------------------------------------')
    print(f"Custom non-lazy range: {custom_non_lazy_range_memory[0]} MiB used in {custom_non_lazy_range_duration:.2f} seconds")

In the example, we compare the built-in function with a custom one, which is
non-lazy. We create a sequence of 1.5 mil values lazily and non-lazily. Then we
pick up the first 3000. In the end, we compare the time and memory usage of both
approaches.

## Reading Large Files

This example compares lazy and non-lazy approaches for reading large files.

read_file.py
  

import time

# Non-lazy approach
def read_file_non_lazy(filename):
    with open(filename, 'r') as file:
        return file.readlines()

# Lazy approach
def read_file_lazy(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line

# Profiling
start_time = time.time()
read_file_non_lazy('large_file.txt')
print(f"Non-lazy approach: {time.time() - start_time} seconds")

start_time = time.time()
list(read_file_lazy('large_file.txt'))
print(f"Lazy approach: {time.time() - start_time} seconds")

The non-lazy approach reads the entire file into memory, which can be
inefficient for large files. The lazy approach reads the file line-by-line,
reducing memory usage and improving performance.

## Filtering Data

This example demonstrates lazy evaluation for filtering data.

filter_data.py
  

import time
import itertools

# Non-lazy approach
def filter_non_lazy(data):
    return [x for x in data if x % 2 == 0]

# Lazy approach
def filter_lazy(data):
    for x in data:
        if x % 2 == 0:
            yield x

# Profiling
data = range(10_000_000)

start_time = time.time()
res = filter_non_lazy(data)

for e in res[:10]:
    print(e)

print(f"Non-lazy approach: {time.time() - start_time} seconds")

start_time = time.time()
res = filter_lazy(data)
for e in itertools.islice(res, 10):
    print(e)

print(f"Lazy approach: {time.time() - start_time} seconds")

The non-lazy approach filters the entire dataset at once, while the lazy
approach filters elements on-the-fly. The lazy approach is more memory-efficient
and faster for large datasets.

## Infinite Sequences

This example demonstrates lazy evaluation for generating infinite sequences.

infinite_sequence.py
  

import time

# Non-lazy approach (not feasible for infinite sequences)
# Lazy approach
def infinite_sequence():
    num = 0
    while True:
        yield num
        num += 1

# Profiling
start_time = time.time()
sequence = infinite_sequence()
for _ in range(1000000):
    next(sequence)
print(f"Lazy approach: {time.time() - start_time} seconds")

The lazy approach allows us to generate an infinite sequence without consuming
infinite memory. This is not feasible with a non-lazy approach.

## Chaining Iterators

This example demonstrates lazy evaluation for chaining iterators.

chain_iterators.py
  

import time
from itertools import chain

# Non-lazy approach
def chain_non_lazy(iter1, iter2):
    return list(iter1) + list(iter2)

# Lazy approach
def chain_lazy(iter1, iter2):
    return chain(iter1, iter2)

# Profiling
iter1 = range(1000000)
iter2 = range(1000000)

start_time = time.time()
chain_non_lazy(iter1, iter2)
print(f"Non-lazy approach: {time.time() - start_time} seconds")

start_time = time.time()
list(chain_lazy(iter1, iter2))
print(f"Lazy approach: {time.time() - start_time} seconds")

The non-lazy approach combines two iterators into a single list, while the lazy approach chains them without creating an intermediate list. The lazy approach is more memory-efficient.

## Processing Large Datasets

This example demonstrates lazy evaluation for processing large datasets.

process_data.py
  

import time

# Non-lazy approach
def process_non_lazy(data):
    return [x * 2 for x in data]

# Lazy approach
def process_lazy(data):
    for x in data:
        yield x * 2

# Profiling
data = range(1000000)

start_time = time.time()
process_non_lazy(data)
print(f"Non-lazy approach: {time.time() - start_time} seconds")

start_time = time.time()
list(process_lazy(data))
print(f"Lazy approach: {time.time() - start_time} seconds")

The non-lazy approach processes the entire dataset at once, while the lazy approach processes elements on-the-fly. The lazy approach is more memory-efficient and faster for large datasets.

## Source

[Python itertools Documentation](https://docs.python.org/3/library/itertools.html)

In this article, we have explored lazy evaluation in Python and demonstrated its effectiveness through practical examples and profiling comparisons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).