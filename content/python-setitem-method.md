+++
title = "Python __setitem__ Method"
date = 2025-08-29T20:08:24.024+01:00
draft = false
description = "Complete guide to Python's __setitem__ method covering sequence protocols, mapping protocols, and custom container behavior."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __setitem__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __setitem__ method, the
special method that enables object subscription with square brackets. We'll cover
basic usage, sequence protocols, mapping protocols, and practical examples.

## Basic Definitions

The __setitem__ method is called to implement assignment to
subscripted objects using the syntax obj[key] = value. It allows
objects to emulate container types.

Key characteristics: it must accept at least two arguments (self and key), can
accept a third value argument, and is invoked for slice operations. It enables
mutable sequence and mapping behavior in custom classes.

## Basic __setitem__ Implementation

Here's the simplest implementation showing how __setitem__ enables
subscript assignment. This demonstrates the basic syntax and behavior.

basic_setitem.py
  

class SimpleDict:
    def __init__(self):
        self._data = {}
    
    def __setitem__(self, key, value):
        print(f"Setting {key} to {value}")
        self._data[key] = value
    
    def __getitem__(self, key):
        return self._data[key]

d = SimpleDict()
d['name'] = 'Alice'  # Calls __setitem__
print(d['name'])     # Calls __getitem__

This example creates a simple dictionary-like class. The __setitem__
method intercepts square bracket assignments and stores them in an internal dict.

The output shows the method being called when we assign to d['name'].
This pattern is fundamental to creating custom container types in Python.

## Implementing a Sequence Type

__setitem__ is essential when creating mutable sequence types that
support index assignment. This example shows a custom list implementation.

sequence.py
  

class MyList:
    def __init__(self, items=None):
        self._items = list(items) if items else []
    
    def __setitem__(self, index, value):
        if isinstance(index, slice):
            self._items[index] = value
        else:
            self._items[index] = value
    
    def __getitem__(self, index):
        return self._items[index]
    
    def __repr__(self):
        return repr(self._items)

lst = MyList([1, 2, 3])
lst[1] = 99       # Single index assignment
lst[0:2] = [7, 8] # Slice assignment
print(lst)        # [7, 8, 3]

This custom list handles both single index and slice assignments through
__setitem__. The method checks the index type to handle both cases.

The slice handling is automatic when using a list internally, but demonstrates
how Python translates slice syntax to __setitem__ calls.

## Creating a Restricted Dictionary

__setitem__ can enforce constraints on what values can be assigned.
This example creates a dictionary that only accepts numeric values.

restricted_dict.py
  

class NumericDict:
    def __init__(self):
        self._data = {}
    
    def __setitem__(self, key, value):
        if not isinstance(value, (int, float)):
            raise ValueError("Only numeric values allowed")
        self._data[key] = value
    
    def __getitem__(self, key):
        return self._data[key]

nd = NumericDict()
nd['age'] = 25    # Works
# nd['name'] = 'Bob'  # Raises ValueError
print(nd['age'])

This dictionary subclass validates values before allowing assignment. The
__setitem__ method checks the value type before storing it.

This pattern is useful for creating constrained containers where you need to
enforce specific data types or validation rules on stored values.

## Matrix Class with 2D Indexing

__setitem__ can handle multi-dimensional indexing by accepting
tuples as keys. This example implements a simple matrix class.

matrix.py
  

class Matrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self._data = [[0] * cols for _ in range(rows)]
    
    def __setitem__(self, key, value):
        row, col = key
        if 0 &lt;= row &lt; self.rows and 0 &lt;= col &lt; self.cols:
            self._data[row][col] = value
        else:
            raise IndexError("Matrix indices out of range")
    
    def __getitem__(self, key):
        row, col = key
        return self._data[row][col]
    
    def __repr__(self):
        return '\n'.join(' '.join(map(str, row)) for row in self._data)

m = Matrix(3, 3)
m[1, 1] = 5  # Center cell
m[0, 2] = 3  # Top-right cell
print(m)

This matrix class accepts two-dimensional indexing using tuple notation.
__setitem__ unpacks the tuple into row and column indices.

The method includes bounds checking to ensure indices are valid before
assignment. This demonstrates how to implement complex container behavior.

## Proxy Pattern with __setitem__

__setitem__ can be used to implement the proxy pattern, where
access to another object is controlled or modified. This example shows a logging
proxy.

proxy.py
  

class LoggingListProxy:
    def __init__(self, original):
        self._original = original
    
    def __setitem__(self, index, value):
        print(f"Setting index {index} to {value}")
        self._original[index] = value
    
    def __getitem__(self, index):
        return self._original[index]
    
    def __repr__(self):
        return repr(self._original)

original = [1, 2, 3]
proxy = LoggingListProxy(original)
proxy[1] = 99
print(original)  # [1, 99, 3]

This proxy wraps a list and logs all assignment operations. The actual storage
still happens in the original list, but we intercept and log the operations.

Proxy patterns are useful for adding behavior like logging, validation, or
access control without modifying the original object's class.

## Best Practices

- **Maintain consistency:** Ensure __setitem__ works with __getitem__ and __delitem__

- **Handle slices:** Consider implementing slice support for sequence types

- **Validate inputs:** Check key and value types when appropriate

- **Document behavior:** Clearly document any special assignment rules

- **Consider performance:** __setitem__ is called frequently in loops

## Source References

- [Python __setitem__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__setitem__)

- [Python Container Emulation Docs](https://docs.python.org/3/reference/datamodel.html#emulating-container-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).