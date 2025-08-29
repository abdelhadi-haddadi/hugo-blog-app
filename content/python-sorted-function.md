+++
title = "Python sorted Function"
date = 2025-08-29T20:10:25.383+01:00
draft = false
description = "Complete guide to Python's sorted function covering basic usage, custom sorting, and practical examples of sorting sequences."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sorted Function

Last modified April 11, 2025

This comprehensive guide explores Python's sorted function, which
returns a new sorted list from items in an iterable. We'll cover basic usage,
custom sorting, and practical examples of sorting various data structures.

## Basic Definitions

The sorted function returns a new sorted list from items in an
iterable. Unlike list.sort(), it works with any iterable and
returns a new list rather than modifying in-place.

Key characteristics: accepts any iterable, returns a new list, supports custom
sorting via key and reverse parameters. It's stable
(maintains relative order of equal elements).

## Basic Sorting

Here's simple usage showing how sorted works with different
iterable types and the effect of the reverse parameter.

basic_sorted.py
  

# Sorting a list
numbers = [3, 1, 4, 1, 5, 9, 2]
print(sorted(numbers))  # [1, 1, 2, 3, 4, 5, 9]

# Sorting a tuple
letters = ('b', 'a', 'd', 'c')
print(sorted(letters))  # ['a', 'b', 'c', 'd']

# Reverse sorting
print(sorted(numbers, reverse=True))  # [9, 5, 4, 3, 2, 1, 1]

This example shows sorted with different iterable types. It always
returns a list, regardless of input type. The reverse parameter
controls sort order.

Note that strings are sorted lexicographically (ASCII/Unicode order). The
original iterables remain unchanged as sorted creates new lists.

## Custom Sorting with Key Function

The key parameter allows custom sorting logic. This example shows
sorting by string length, case-insensitive sorting, and using lambda functions.

key_sorted.py
  

words = ["apple", "Banana", "cherry", "date"]
print(sorted(words))  # ['Banana', 'apple', 'cherry', 'date'] (case-sensitive)
print(sorted(words, key=lambda x: x.lower()))  # ['apple', 'Banana', 'cherry', 'date']

# Sort by length
print(sorted(words, key=len))  # ['date', 'apple', 'Banana', 'cherry']

# Sort list of tuples by second element
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
print(sorted(pairs, key=lambda x: x[1]))  # [(1, 'one'), (3, 'three'), (2, 'two')]

The key function transforms each element before comparison. Here
we use str.lower for case-insensitive sorting and len
for length-based sorting.

Lambda functions are commonly used with sorted for simple custom
sorting logic. The transformation doesn't affect the actual values in the result.

## Sorting Complex Objects

This example demonstrates sorting complex objects like dictionaries or custom
classes using attribute-based sorting with the key parameter.

object_sorted.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __repr__(self):
        return f"Person({self.name}, {self.age})"

people = [
    Person("Alice", 32),
    Person("Bob", 25),
    Person("Charlie", 40)
]

# Sort by age
print(sorted(people, key=lambda p: p.age))
# [Person(Bob, 25), Person(Alice, 32), Person(Charlie, 40)]

# Sort by name length
print(sorted(people, key=lambda p: len(p.name)))
# [Person(Bob, 25), Person(Alice, 32), Person(Charlie, 40)]

For custom objects, we typically use lambda functions to extract sorting keys.
Here we sort Person instances by age and by name length.

The same approach works with dictionaries or any objects where you can define
a key extraction function. The original objects remain unchanged.

## Stable Sorting Property

Python's sorted is stable, meaning items with equal keys maintain
their original relative order. This example demonstrates multi-level sorting.

stable_sorted.py
  

# List of tuples (grade, name)
students = [
    ('B', 'Alice'),
    ('A', 'Bob'),
    ('C', 'Charlie'),
    ('A', 'David')
]

# Sort by grade (primary) and name (secondary)
sorted_students = sorted(students, key=lambda x: x[1])  # Sort by name first
sorted_students = sorted(sorted_students, key=lambda x: x[0])  # Then by grade

print(sorted_students)
# [('A', 'Bob'), ('A', 'David'), ('B', 'Alice'), ('C', 'Charlie')]

To sort by multiple criteria, we perform sorts in reverse order of importance.
Here we first sort by name, then by grade, maintaining name order within grades.

The stability guarantee means equal elements won't be rearranged unnecessarily.
This property is crucial for predictable multi-level sorting.

## Performance Considerations

This example compares sorted performance with list.sort()
and demonstrates sorting large datasets with different key functions.

performance_sorted.py
  

import timeit
import random

# Generate large dataset
data = [random.randint(0, 1000) for _ in range(10000)]

def test_sorted():
    return sorted(data)

def test_sort_method():
    lst = list(data)
    lst.sort()
    return lst

def test_complex_key():
    return sorted(data, key=lambda x: (x % 10, x // 10))

print("sorted():", timeit.timeit(test_sorted, number=100))
print("list.sort():", timeit.timeit(test_sort_method, number=100))
print("Complex key:", timeit.timeit(test_complex_key, number=100))

sorted is slightly slower than list.sort() because
it must create a new list. Complex key functions add overhead proportional to
their complexity.

For large datasets, consider whether you need a new list or can modify in-place.
Optimize key functions for performance-critical sorting operations.

## Best Practices

- **Prefer sorted for immutability:** When you need a new sorted list

- **Use list.sort() for in-place:** When modifying the original is acceptable

- **Keep key functions simple:** Complex keys impact performance

- **Leverage stability:** For multi-criteria sorting

- **Consider operator module:** For common key functions (itemgetter, attrgetter)

## Source References

- [Python sorted() Documentation](https://docs.python.org/3/library/functions.html#sorted)

- [Python Sorting HOW TO](https://docs.python.org/3/howto/sorting.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).