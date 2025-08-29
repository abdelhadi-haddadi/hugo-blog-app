+++
title = "Python set Function"
date = 2025-08-29T20:10:22.026+01:00
draft = false
description = "Complete guide to Python's set function covering creation, operations, and practical examples of working with unique elements."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python set Function

Last modified April 11, 2025

This comprehensive guide explores Python's set function, which
creates an unordered collection of unique elements. We'll cover creation,
operations, and practical examples of working with sets.

## Basic Definitions

The set function creates a mutable set object containing unique,
hashable elements. Sets are unordered collections that don't allow duplicates.

Key characteristics: elements must be hashable, sets are mutable but elements
must be immutable, supports mathematical set operations like union and
intersection.

## Creating Basic Sets

Here's simple usage showing how to create sets from different iterable types
using the set constructor.

basic_set.py
  

# From a list
numbers = set([1, 2, 3, 2, 1])
print(numbers)  # {1, 2, 3}

# From a string
chars = set("hello")
print(chars)    # {'h', 'e', 'l', 'o'}

# From a tuple
items = set(('apple', 'banana', 'apple'))
print(items)    # {'apple', 'banana'}

# Empty set
empty = set()
print(empty)    # set()

This example shows set creation from different iterables. Duplicates are
automatically removed. Note the empty set syntax differs from dictionaries.

The string example shows how sets break sequences into individual elements.
Notice the single 'l' in output due to uniqueness.

## Set Operations

Sets support powerful mathematical operations. This example demonstrates
common set operations like union, intersection, and difference.

operations.py
  

a = set([1, 2, 3, 4])
b = set([3, 4, 5, 6])

# Union
print(a | b)        # {1, 2, 3, 4, 5, 6}
print(a.union(b))   # same as above

# Intersection
print(a &amp; b)        # {3, 4}
print(a.intersection(b))

# Difference
print(a - b)        # {1, 2}
print(a.difference(b))

# Symmetric difference
print(a ^ b)        # {1, 2, 5, 6}
print(a.symmetric_difference(b))

This demonstrates four fundamental set operations. Each operation has both
operator and method versions. The symmetric difference shows elements in
either set but not both.

These operations are highly optimized and much faster than manual
implementations with lists.

## Set Comprehensions

Similar to list comprehensions, Python supports set comprehensions for
creating sets concisely. This example shows various set comprehensions.

comprehensions.py
  

# Basic comprehension
squares = {x**2 for x in range(10)}
print(squares)  # {0, 1, 4, 9, 16, 25, 36, 49, 64, 81}

# With condition
odds = {x for x in range(20) if x % 2 != 0}
print(odds)     # {1, 3, 5, 7, 9, 11, 13, 15, 17, 19}

# From another iterable
words = ["hello", "world", "python"]
lengths = {len(word) for word in words}
print(lengths)  # {5, 6}

Set comprehensions follow the same syntax as list comprehensions but use
curly braces. They automatically handle uniqueness like regular sets.

The second example filters odd numbers. The third shows transformation,
demonstrating sets' automatic deduplication of the lengths.

## Membership Testing

Sets provide extremely fast membership testing due to their hash table
implementation. This example compares set and list performance.

membership.py
  

import timeit

# Large collections
big_set = set(range(1000000))
big_list = list(range(1000000))

# Membership test functions
def test_set():
    return 999999 in big_set

def test_list():
    return 999999 in big_list

# Timing
print("Set membership:", timeit.timeit(test_set, number=10000))
print("List membership:", timeit.timeit(test_list, number=10000))

This benchmark shows the dramatic performance difference for membership
tests. Sets use O(1) lookup while lists use O(n) linear search.

For large collections, sets can be thousands of times faster than lists
for membership testing.

## Frozen Sets

Python provides immutable sets through frozenset. This example
shows their creation and usage as dictionary keys.

frozen.py
  

# Create frozenset
fs = frozenset([1, 2, 3, 4])
print(fs)  # frozenset({1, 2, 3, 4})

# Use as dictionary key
d = {
    frozenset([1, 2]): "set with 1 and 2",
    frozenset([3, 4]): "set with 3 and 4"
}

print(d[frozenset([1, 2])])  # "set with 1 and 2"

Frozen sets are hashable and immutable, making them suitable as dictionary
keys. Regular sets can't be used this way because they're mutable.

All set operations work with frozen sets except those that modify the set.
They're useful when you need set properties in hashable form.

## Best Practices

- **Use for uniqueness:** Convert to set to remove duplicates

- **Leverage fast lookups:** Use sets for membership testing

- **Choose proper syntax:** Use set() for empty sets, {} creates dict

- **Consider frozen sets:** When immutability is needed

- **Document assumptions:** Note when order doesn't matter

## Source References

- [Python set Documentation](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)

- [Python frozenset Documentation](https://docs.python.org/3/library/stdtypes.html#frozenset)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).