+++
title = "Python __getitem__ Method"
date = 2025-08-29T20:08:10.564+01:00
draft = false
description = "Complete guide to Python's __getitem__ method covering sequence indexing, slicing, and custom container behavior."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __getitem__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __getitem__ method, the
special method that enables object indexing and slicing. We'll cover basic usage,
sequence emulation, custom containers, and practical examples.

## Basic Definitions

The __getitem__ method allows objects to implement the subscript
operator []. It's called when an instance is accessed with square
bracket notation, like obj[key].

Key characteristics: it accepts the instance as first argument (self), the key
as second argument, and should return the corresponding value or raise
IndexError/KeyError for invalid keys.

## Basic __getitem__ Implementation

Here's a simple implementation showing how __getitem__ enables
indexing behavior for custom objects. This example creates a sequence-like class.

basic_getitem.py
  

class MySequence:
    def __init__(self, data):
        self.data = data
    
    def __getitem__(self, index):
        return self.data[index]

seq = MySequence([10, 20, 30, 40, 50])
print(seq[1])    # 20
print(seq[-1])   # 50
print(seq[1:4])  # [20, 30, 40]

This example demonstrates basic indexing and slicing. The __getitem__
method delegates to the underlying list's indexing functionality.

Python automatically handles negative indices and slices, passing them directly
to __getitem__. The method doesn't need special slice handling.

## Implementing a Custom Dictionary

__getitem__ is essential for creating dictionary-like objects.
This example shows a case-insensitive dictionary implementation.

custom_dict.py
  

class CaseInsensitiveDict:
    def __init__(self):
        self._data = {}
    
    def __getitem__(self, key):
        return self._data[key.lower()]
    
    def __setitem__(self, key, value):
        self._data[key.lower()] = value
    
    def __contains__(self, key):
        return key.lower() in self._data

d = CaseInsensitiveDict()
d['Name'] = 'John'
print(d['NAME'])  # John
print('name' in d)  # True

This dictionary treats keys case-insensitively by converting them to lowercase
before storage and lookup. __getitem__ handles the lookup part.

The class also implements __setitem__ and __contains__
for complete dictionary behavior. This pattern is common for custom mappings.

## Handling Slices Explicitly

While Python handles basic slicing automatically, you can process slices
differently by checking the key type in __getitem__.

slice_handling.py
  

class SliceProcessor:
    def __getitem__(self, key):
        if isinstance(key, slice):
            start = key.start if key.start is not None else 0
            stop = key.stop if key.stop is not None else 10
            step = key.step if key.step is not None else 1
            return list(range(start, stop, step))
        elif isinstance(key, int):
            return key * 10
        else:
            raise TypeError("Invalid key type")

sp = SliceProcessor()
print(sp[5])      # 50 (integer handling)
print(sp[1:5])    # [1, 2, 3, 4] (slice handling)
print(sp[1:10:2]) # [1, 3, 5, 7, 9]

This example processes integers and slices differently. For slices, it generates
a range, while integers are multiplied by 10.

The isinstance(key, slice) check is crucial for distinguishing
between index and slice operations. This allows custom slice behavior.

## Implementing a Virtual Sequence

__getitem__ can generate values dynamically rather than storing
them. This example creates an infinite sequence of squares.

virtual_sequence.py
  

class Squares:
    def __getitem__(self, key):
        if isinstance(key, slice):
            start = key.start if key.start is not None else 0
            stop = key.stop if key.stop is not None else float('inf')
            step = key.step if key.step is not None else 1
            return [i**2 for i in range(start, stop, step)]
        elif isinstance(key, int):
            return key**2
        else:
            raise TypeError("Invalid key type")

sq = Squares()
print(sq[5])      # 25
print(sq[1:6])    # [1, 4, 9, 16, 25]
print(sq[1:10:2]) # [1, 9, 25, 49, 81]

This sequence generates square numbers on demand without storing them. Both
individual indices and slices work, demonstrating __getitem__'s
flexibility.

The slice handling includes default values for start, stop,
and step to make the sequence work like built-in sequences.

## Multi-dimensional Indexing

__getitem__ can handle complex keys like tuples for multi-dimensional
indexing. This example implements a simple matrix class.

matrix.py
  

class Matrix:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.data = [[0]*cols for _ in range(rows)]
    
    def __getitem__(self, key):
        if isinstance(key, tuple) and len(key) == 2:
            row, col = key
            return self.data[row][col]
        elif isinstance(key, int):
            return self.data[key]
        else:
            raise TypeError("Invalid key type")

m = Matrix(3, 3)
m.data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(m[1, 2])   # 6 (row 1, column 2)
print(m[2])      # [7, 8, 9] (entire row 2)

This matrix supports both single-index (entire row) and double-index (specific
cell) access patterns. The tuple unpacking in __getitem__ enables
the multi-dimensional syntax.

The example shows how __getitem__ can support multiple access
patterns in a single implementation by examining the key type.

## Best Practices

- **Handle expected key types:** Check for valid key types and raise TypeError for invalid ones

- **Implement error handling:** Raise IndexError/KeyError for out-of-bounds keys

- **Consider performance:** __getitem__ is called frequently, so optimize its implementation

- **Support slicing:** Handle slice objects for sequence-like behavior

- **Document behavior:** Clearly document supported key types and return values

## Source References

- [Python __getitem__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__getitem__)

- [Python Container Emulation Docs](https://docs.python.org/3/reference/datamodel.html#emulating-container-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).