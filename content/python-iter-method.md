+++
title = "Python __iter__ Method"
date = 2025-08-29T20:08:16.109+01:00
draft = false
description = "Complete guide to Python's __iter__ method covering iteration protocols, custom iterators, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __iter__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __iter__ method, the
special method that makes objects iterable. We'll cover iteration protocols,
custom iterators, generator functions, and practical examples.

## Basic Definitions

The __iter__ method returns an iterator object that implements the
iteration protocol. It is called when an object needs to be iterated over, such
as in a for loop.

Key characteristics: it must return an iterator object (which implements
__next__), enables iteration over container objects, and works
with Python's built-in iter() function.

## Basic __iter__ Implementation

Here's a simple implementation showing how __iter__ makes a class
iterable. The example demonstrates the minimal requirements for iteration.

basic_iter.py
  

class MyIterable:
    def __init__(self, data):
        self.data = data
    
    def __iter__(self):
        return iter(self.data)

items = MyIterable([1, 2, 3])
for item in items:
    print(item)

This example delegates iteration to the built-in list iterator. The
__iter__ method returns an iterator for the internal data list.

The iter() function calls __iter__ under the hood.
This is the standard way to make an object work with for loops.

## Custom Iterator Class

We can create a custom iterator by implementing both __iter__ and
__next__ methods. This gives full control over iteration behavior.

custom_iterator.py
  

class CountDown:
    def __init__(self, start):
        self.current = start
        self.start = start
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.current &lt; 0:
            raise StopIteration
        else:
            result = self.current
            self.current -= 1
            return result

for num in CountDown(5):
    print(num)

This countdown iterator returns numbers from start down to 0. The
__iter__ returns self since the class is its own iterator.

The __next__ method controls the iteration logic and raises
StopIteration when done. This is required by the iterator protocol.

## Generator Function as __iter__

Instead of a separate iterator class, we can use a generator function in
__iter__. This is often more concise and readable.

generator_iter.py
  

class Squares:
    def __init__(self, limit):
        self.limit = limit
    
    def __iter__(self):
        for i in range(1, self.limit + 1):
            yield i * i

for square in Squares(5):
    print(square)

This example generates squares of numbers up to a limit. The __iter__
method uses yield to create a generator iterator automatically.

Generator functions simplify iterator implementation by handling the
__next__ and state management automatically. They're memory
efficient too.

## Iterating Over Custom Data Structure

__iter__ is particularly useful for custom data structures where
you want to control how elements are accessed during iteration.

custom_structure.py
  

class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right
    
    def __iter__(self):
        if self.left:
            yield from self.left
        yield self.value
        if self.right:
            yield from self.right

tree = TreeNode(4,
    TreeNode(2, TreeNode(1), TreeNode(3)),
    TreeNode(6, TreeNode(5), TreeNode(7))
)

for value in tree:
    print(value)  # Prints 1-7 in order

This binary tree implements in-order traversal through __iter__.
The yield from delegates to child nodes' iterators recursively.

This pattern works for any tree-like structure where you want to hide the
complexity of traversal behind a simple iteration interface.

## Lazy Evaluation with __iter__

__iter__ can implement lazy evaluation, where values are computed
only when needed during iteration, saving memory and CPU cycles.

lazy_eval.py
  

class Fibonacci:
    def __iter__(self):
        a, b = 0, 1
        while True:
            yield a
            a, b = b, a + b

import itertools
for fib in itertools.islice(Fibonacci(), 10):
    print(fib)

This Fibonacci sequence generator computes numbers on demand. The infinite
sequence is safely used with itertools.islice for demonstration.

Lazy evaluation is powerful for large or infinite sequences where precomputing
all values would be impractical or impossible.

## Best Practices

- **Return a new iterator:** Each __iter__ call should return a fresh iterator

- **Implement both protocols:** For custom iterators, implement both __iter__ and __next__

- **Consider generators:** Generator functions often simplify iterator implementation

- **Handle state properly:** Ensure iterator state is reset for each new iteration

- **Use StopIteration:** Signal iteration completion properly with StopIteration

## Source References

- [Python __iter__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__iter__)

- [Python Iterator Protocol](https://docs.python.org/3/glossary.html#term-iterator)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).