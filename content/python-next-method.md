+++
title = "Python __next__ Method"
date = 2025-08-29T20:08:20.612+01:00
draft = false
description = "Complete guide to Python's __next__ method covering iterators, iteration protocol, generators, and custom iteration."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __next__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __next__ method, the
special method that powers iteration in Python. We'll cover the iteration
protocol, custom iterators, generators, and practical examples.

## Basic Definitions

The __next__ method is part of Python's iterator protocol. It
returns the next item from an iterator. When no more items are available,
it raises StopIteration.

Key characteristics: it takes no arguments (except self), returns the next
value in sequence, and maintains internal state between calls. It works
with __iter__ to implement the full iteration protocol.

## Basic Iterator Implementation

Here's a simple iterator class implementing both __iter__ and
__next__ methods. This demonstrates the fundamental iterator pattern.

basic_iterator.py
  

class CountUpTo:
    def __init__(self, max):
        self.max = max
        self.current = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current &gt;= self.max:
            raise StopIteration
        self.current += 1
        return self.current - 1

counter = CountUpTo(5)
for num in counter:
    print(num)  # Prints 0 1 2 3 4

This iterator counts from 0 up to (but not including) the specified maximum.
The __next__ method increments the counter and returns values
until reaching the limit.

The __iter__ method returns self, making the object both an
iterator and iterable. This is common for simple iterators.

## Infinite Iterator

Iterators don't have to be finite. This example shows an infinite iterator
that generates Fibonacci numbers indefinitely.

infinite_iterator.py
  

class Fibonacci:
    def __init__(self):
        self.a, self.b = 0, 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        return result

fib = Fibonacci()
for i, num in enumerate(fib):
    print(num)
    if i &gt;= 9:  # Print first 10 numbers
        break

This Fibonacci iterator never raises StopIteration, making it
infinite. We control iteration externally with a break condition.

The state (current Fibonacci numbers) is maintained in instance variables
between __next__ calls. This demonstrates stateful iteration.

## File Line Iterator

This practical example creates an iterator that reads lines from a file
lazily, which is memory-efficient for large files.

file_iterator.py
  

class FileLineIterator:
    def __init__(self, filename):
        self.file = open(filename)
    
    def __iter__(self):
        return self
    
    def __next__(self):
        line = self.file.readline()
        if not line:
            self.file.close()
            raise StopIteration
        return line.strip()
    
    def __del__(self):
        if hasattr(self, 'file') and self.file:
            self.file.close()

lines = FileLineIterator('data.txt')
for line in lines:
    print(line)

This iterator reads one line at a time from the file, only loading what's
needed into memory. It properly closes the file when iteration completes.

The __del__ method ensures the file is closed if the iterator
is garbage collected before completion. This is important for resource cleanup.

## Chaining Iterators

This example demonstrates how to chain multiple iterators together using
__next__, creating a single continuous sequence.

chain_iterators.py
  

class ChainIterators:
    def __init__(self, *iterables):
        self.iterables = iter(iterables)
        self.current = iter(next(self.iterables))
    
    def __iter__(self):
        return self
    
    def __next__(self):
        try:
            return next(self.current)
        except StopIteration:
            self.current = iter(next(self.iterables))
            return next(self.current)

chained = ChainIterators([1, 2, 3], 'abc', (4.5, 6.7))
for item in chained:
    print(item)  # Prints 1, 2, 3, 'a', 'b', 'c', 4.5, 6.7

This iterator chains multiple sequences together, seamlessly transitioning
from one to the next when each is exhausted. It handles any iterable input.

The implementation uses nested iterators, catching StopIteration
from the current iterator to move to the next one in sequence.

## Stateful Iterator with Reset

This advanced example shows an iterator that can be reset to its initial
state, demonstrating more complex __next__ behavior.

resettable_iterator.py
  

class ResettableRange:
    def __init__(self, start, stop):
        self.start = start
        self.stop = stop
        self.reset()
    
    def reset(self):
        self.current = self.start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current &gt;= self.stop:
            raise StopIteration
        result = self.current
        self.current += 1
        return result

ranger = ResettableRange(2, 5)
print(list(ranger))  # [2, 3, 4]
ranger.reset()
print(list(ranger))  # [2, 3, 4] again

This iterator mimics range behavior but adds a reset
method to restart iteration from the beginning. The state is maintained but
can be reset on demand.

The reset method demonstrates how to manage iterator state
externally, providing more control over iteration behavior.

## Best Practices

- **Always raise StopIteration:** When no more items are available

- **Maintain state carefully:** Ensure consistent behavior between calls

- **Implement __iter__:** Make your iterator properly iterable

- **Consider memory usage:** Iterators should be memory-efficient

- **Document behavior:** Clearly document iteration behavior and limits

## Source References

- [Python Iterator Types Documentation](https://docs.python.org/3/library/stdtypes.html#iterator-types)

- [Python Iterator Glossary](https://docs.python.org/3/glossary.html#term-iterator)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).