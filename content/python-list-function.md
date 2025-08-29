+++
title = "Python list Function"
date = 2025-08-29T20:08:48.733+01:00
draft = false
description = "Complete guide to Python's list function covering creation, conversion, and practical examples of list operations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python list Function

Last modified April 11, 2025

This comprehensive guide explores Python's list function, which
creates mutable sequence objects. We'll cover creation, conversion, and
practical examples of list operations.

## Basic Definitions

The list function constructs a new list object. It can create
empty lists or convert other iterables to lists. Lists are ordered, mutable
collections that allow duplicate elements.

Key characteristics: square bracket syntax, zero-based indexing, variable
length, heterogeneous elements, and many built-in methods for manipulation.

## Creating Empty Lists

The simplest use of list creates an empty list. This example
shows different ways to initialize empty and pre-populated lists.

empty_lists.py
  

# Empty list creation
empty1 = list()
empty2 = []

print(empty1)  # []
print(empty2)  # []
print(type(empty1))  # &lt;class 'list'&gt;

# Pre-populated list
numbers = list([1, 2, 3])
print(numbers)  # [1, 2, 3]

This example demonstrates two ways to create empty lists. The list()
constructor and square brackets [] are equivalent for empty lists.

The type check confirms we're working with list objects. The last example shows
creating a list with initial values.

## Converting Other Iterables

list can convert various iterable types to lists. This example
shows conversion from tuples, strings, ranges, and dictionaries.

conversions.py
  

# From tuple
tup = (1, 2, 3)
lst1 = list(tup)
print(lst1)  # [1, 2, 3]

# From string
s = "hello"
lst2 = list(s)
print(lst2)  # ['h', 'e', 'l', 'l', 'o']

# From range
r = range(5)
lst3 = list(r)
print(lst3)  # [0, 1, 2, 3, 4]

# From dictionary (keys)
d = {'a': 1, 'b': 2}
lst4 = list(d)
print(lst4)  # ['a', 'b']

The list constructor accepts any iterable. With dictionaries, it
uses keys by default. Strings are split into individual characters.

This is useful when you need mutable versions of other sequences or want to
preserve iteration results.

## List Comprehension with list

Combining list with generator expressions creates powerful
one-liners. This example demonstrates filtering and transforming data.

comprehension.py
  

numbers = range(10)

# Even numbers squared
evens_squared = list(x**2 for x in numbers if x % 2 == 0)
print(evens_squared)  # [0, 4, 16, 36, 64]

# Convert temperatures
fahrenheit = [32, 68, 104]
celsius = list((f - 32) * 5/9 for f in fahrenheit)
print(celsius)  # [0.0, 20.0, 40.0]

The first example filters even numbers and squares them. The second converts
Fahrenheit to Celsius. Both use generator expressions inside list().

This pattern is memory efficient as it processes items one at a time without
creating intermediate lists.

## Nested Lists and Matrices

Lists can contain other lists, enabling matrix structures. This example shows
creation and access of nested lists.

matrices.py
  

# 3x3 matrix
matrix = list([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])

print(matrix[1][2])  # 6 (second row, third column)

# Flatten matrix
flat = list(num for row in matrix for num in row)
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Transpose matrix
transposed = list(list(row) for row in zip(*matrix))
print(transposed)  # [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

The matrix example shows nested list creation. We access elements with double
indexing. The flattening example uses a nested generator expression.

The transposition uses zip with unpacking to swap rows and
columns, demonstrating advanced list operations.

## Copying Lists

This example explores different ways to copy lists and their implications.
Understanding these differences prevents unexpected behavior.

copying.py
  

original = [1, [2, 3], 4]

# Shallow copy
shallow = list(original)
shallow[1][0] = 'changed'

# Deep copy
import copy
deep = copy.deepcopy(original)
deep[1][0] = 'unchanged'

print(original)  # [1, ['changed', 3], 4]
print(shallow)   # [1, ['changed', 3], 4]
print(deep)      # [1, ['unchanged', 3], 4]

The list constructor creates shallow copies. Nested objects are
shared between original and copy. The deep copy creates completely independent
copies.

This demonstrates when to use each approach. Shallow copies are faster but
deep copies are safer for nested structures.

## Best Practices

- **Prefer [] for empty lists:** More readable than list()

- **Use list() for conversions:** When converting other iterables

- **Consider comprehensions:** For readable transformations

- **Be mindful of copies:** Understand shallow vs deep copying

- **Document complex structures:** Especially for nested lists

## Source References

- [Python list Documentation](https://docs.python.org/3/library/stdtypes.html#list)

- [Python Sequence Types Documentation](https://docs.python.org/3/library/stdtypes.html#typesseq)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).