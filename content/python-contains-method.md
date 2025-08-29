+++
title = "Python __contains__ Method"
date = 2025-08-29T20:08:03.816+01:00
draft = false
description = "Complete guide to Python's __contains__ method covering membership testing, custom containers, and operator overloading."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __contains__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __contains__ method, the
special method that implements membership test operations. We'll cover basic
usage, custom containers, performance considerations, and practical examples.

## Basic Definitions

The __contains__ method implements the membership test operators
(in and not in). It should return True if
the item is in the container, False otherwise.

Key characteristics: it takes one argument (the item to test), can be defined in
any class, and is automatically invoked when using the in operator.
It enables custom containment logic for user-defined objects.

## Basic __contains__ Implementation

Here's a simple implementation showing how __contains__ works with
the in operator. This example checks for membership in a list.

basic_contains.py
  

class MyContainer:
    def __init__(self, items):
        self.items = items
    
    def __contains__(self, item):
        return item in self.items

container = MyContainer([1, 2, 3, 4, 5])
print(3 in container)  # True
print(6 in container)  # False

This example demonstrates the basic pattern. The __contains__ method
delegates to the underlying list's containment check. The in operator
automatically calls this method.

The method returns a boolean value indicating whether the item exists in the
container. This simple implementation mirrors Python's built-in list behavior.

## Custom Membership Logic

__contains__ allows implementing custom membership test logic that
goes beyond simple value checking. Here we check for even numbers.

custom_logic.py
  

class EvenNumbers:
    def __contains__(self, num):
        return isinstance(num, int) and num % 2 == 0

evens = EvenNumbers()
print(4 in evens)    # True
print(5 in evens)    # False
print("a" in evens)  # False

This implementation doesn't store numbers but defines what constitutes membership
mathematically. It checks if the input is an integer and even.

The example shows how __contains__ can implement abstract
containment rules without actual storage. This pattern is useful for virtual
containers.

## Case-Insensitive String Container

This example demonstrates a string container that performs case-insensitive
membership tests, useful for case normalization scenarios.

case_insensitive.py
  

class CaseInsensitiveContainer:
    def __init__(self, items):
        self.items = [item.lower() for item in items]
    
    def __contains__(self, item):
        return item.lower() in self.items

fruits = CaseInsensitiveContainer(['Apple', 'Banana', 'Orange'])
print('apple' in fruits)    # True
print('BANANA' in fruits)   # True
print('pear' in fruits)     # False

The container stores lowercase versions of all items and converts the search term
to lowercase before checking. This ensures case doesn't affect membership tests.

This pattern is useful when you need case-insensitive lookups but want to
preserve the original casing of stored items for display purposes.

## Range-Based Containment

This example implements a container that checks if a number falls within any of
its stored ranges, demonstrating complex containment logic.

range_container.py
  

class RangeContainer:
    def __init__(self, ranges):
        self.ranges = ranges
    
    def __contains__(self, num):
        return any(start &lt;= num &lt;= end for start, end in self.ranges)

ranges = RangeContainer([(1, 5), (10, 15), (20, 25)])
print(3 in ranges)   # True
print(8 in ranges)   # False
print(22 in ranges)  # True

The container stores tuples representing ranges. The __contains__
method checks if the number falls within any of these ranges using a generator
expression with any().

This implementation efficiently handles multiple discontinuous ranges without
storing every possible value, making it memory-efficient for large ranges.

## Performance Optimization with __contains__

This example shows how __contains__ can optimize membership tests
by using a set for O(1) lookups instead of O(n) list searches.

optimized_contains.py
  

class OptimizedContainer:
    def __init__(self, items):
        self.items = list(items)
        self.items_set = set(items)
    
    def __contains__(self, item):
        return item in self.items_set

large_data = OptimizedContainer(range(1000000))
print(999999 in large_data)  # Fast lookup
print(-1 in large_data)      # Fast negative result

The class maintains both a list (for ordered access) and a set (for fast
membership tests). The __contains__ method uses the set for
constant-time lookups.

This pattern is valuable when you need both ordered iteration and frequent
membership tests. The memory overhead is justified by the performance gain.

## Best Practices

- **Return boolean values:** Should return True or False, not other types

- **Consider performance:** Optimize for expected usage patterns

- **Maintain consistency:** Behavior should match other container methods

- **Handle edge cases:** Decide how to handle None, NaN, or other special values

- **Document behavior:** Clearly specify what constitutes membership

## Source References

- [Python __contains__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__contains__)

- [Python Container Types](https://docs.python.org/3/library/stdtypes.html#container.__contains__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).