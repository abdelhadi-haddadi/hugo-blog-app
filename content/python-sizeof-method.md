+++
title = "Python __sizeof__ Method"
date = 2025-08-29T20:08:25.145+01:00
draft = false
description = "Complete guide to Python's __sizeof__ method covering memory usage measurement, custom objects, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __sizeof__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __sizeof__ method, the
special method that returns the memory consumption of an object. We'll cover
basic usage, built-in types, custom objects, and practical examples.

## Basic Definitions

The __sizeof__ method returns the size of an object in bytes, as
allocated by the interpreter. It provides insight into memory usage and helps
with optimization.

Key characteristics: it's automatically called by sys.getsizeof(),
returns an integer, and can be overridden in custom classes. The size includes
the object's overhead but not referenced objects.

## Basic __sizeof__ Usage

Here's how to use __sizeof__ with built-in types to measure their
memory consumption. This demonstrates the method's basic behavior.

basic_sizeof.py
  

import sys

lst = [1, 2, 3, 4, 5]
print(lst.__sizeof__())      # Direct method call
print(sys.getsizeof(lst))    # Recommended way using sys

empty_list = []
print(empty_list.__sizeof__())

s = "hello"
print(s.__sizeof__())

This example shows memory usage for a list and string. The empty list still has
overhead from Python's list structure. sys.getsizeof() is preferred
as it handles edge cases.

Note that sizes may vary between Python versions and implementations (CPython,
PyPy). The values represent memory at the Python level, not necessarily the
system level.

## Custom Class with __sizeof__

Implementing __sizeof__ in custom classes allows measuring their
memory footprint. This example shows a simple implementation.

custom_sizeof.py
  

import sys

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __sizeof__(self):
        return object.__sizeof__(self) + \
               self.x.__sizeof__() + \
               self.y.__sizeof__()

p = Point(3, 4)
print(sys.getsizeof(p))

This Point

The implementation sums the sizes of all components. For complex objects, you'd
need to recursively calculate sizes of all referenced objects if needed.

## Container Class with __sizeof__

For container objects, __sizeof__ should account for both the
container and its elements. This example demonstrates this pattern.

container_sizeof.py
  

import sys

class CustomList:
    def __init__(self, *args):
        self.data = list(args)
    
    def __sizeof__(self):
        size = object.__sizeof__(self)
        size += self.data.__sizeof__()
        for item in self.data:
            size += sys.getsizeof(item)
        return size

cl = CustomList(1, "two", 3.0)
print(sys.getsizeof(cl))

This CustomList calculates its total size by summing the container
overhead, the internal list size, and each element's size. This provides a
complete memory picture.

For accurate measurements, we use sys.getsizeof() on each element.
This accounts for Python's object overhead on each contained item.

## __sizeof__ with Slots

Classes using __slots__ have different memory characteristics.
This example shows how to implement __sizeof__ for such classes.

slots_sizeof.py
  

import sys

class SlotPoint:
    __slots__ = ['x', 'y']
    
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __sizeof__(self):
        return object.__sizeof__(self) + \
               sys.getsizeof(self.x) + \
               sys.getsizeof(self.y)

sp = SlotPoint(3, 4)
print(sys.getsizeof(sp))

The SlotPoint class uses __slots__ for memory
efficiency. Its __sizeof__ implementation is similar to regular
classes but with different base overhead.

Slots-based classes typically consume less memory than regular classes as they
don't have a __dict__ for dynamic attributes. This affects the
size calculation.

## Recursive __sizeof__ Implementation

For complex nested structures, a recursive __sizeof__ implementation
can calculate total memory usage including referenced objects.

recursive_sizeof.py
  

import sys

class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right
    
    def __sizeof__(self):
        size = object.__sizeof__(self)
        size += sys.getsizeof(self.value)
        if self.left:
            size += sys.getsizeof(self.left)
        if self.right:
            size += sys.getsizeof(self.right)
        return size

left = TreeNode(1)
right = TreeNode(3)
root = TreeNode(2, left, right)
print(sys.getsizeof(root))

This TreeNode class represents a binary tree. Its __sizeof__
method recursively includes the sizes of child nodes in its calculation.

For very deep structures, this approach might be inefficient. In such cases,
consider iterative approaches or memoization to optimize the calculation.

## Best Practices

- **Use sys.getsizeof():** Prefer it over direct __sizeof__ calls

- **Include all attributes:** Account for all object components

- **Handle recursion carefully:** Avoid infinite loops with circular references

- **Document assumptions:** Clarify what's included in the size

- **Compare with alternatives:** Use for optimization decisions

## Source References

- [Python __sizeof__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__sizeof__)

- [sys.getsizeof() Documentation](https://docs.python.org/3/library/sys.html#sys.getsizeof)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).