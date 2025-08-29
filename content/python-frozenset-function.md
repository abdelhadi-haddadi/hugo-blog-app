+++
title = "Python frozenset Function"
date = 2025-08-29T20:08:32.865+01:00
draft = false
description = "Complete guide to Python's frozenset function covering creation, operations, and practical examples of immutable sets."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python frozenset Function

Last modified April 11, 2025

This comprehensive guide explores Python's frozenset function, which
creates immutable set objects. We'll cover creation, operations, use cases,
and practical examples of working with immutable sets.

## Basic Definitions

The frozenset function returns an immutable set object. Unlike
regular sets, frozensets cannot be modified after creation. They are hashable
and can be used as dictionary keys.

Key characteristics: immutable, unordered, unique elements, supports set
operations (union, intersection, etc.), and hashable. Elements must be
hashable.

## Creating a Frozenset

Here's basic usage showing how to create frozensets from different iterables.
The examples demonstrate creation from lists, strings, and other sets.

basic_frozenset.py
  

# From a list
numbers = frozenset([1, 2, 3, 2, 1])
print(numbers)  # frozenset({1, 2, 3})

# From a string
letters = frozenset("hello")
print(letters)  # frozenset({'h', 'e', 'l', 'o'})

# From another set
regular_set = {4, 5, 6}
frozen = frozenset(regular_set)
print(frozen)   # frozenset({4, 5, 6})

This example shows three ways to create frozensets. Duplicates are
automatically removed, just like with regular sets. The order of elements
is not preserved.

Note that while the frozenset itself is immutable, its elements must also
be immutable (hashable) types.

## Using Frozenset as Dictionary Keys

This example demonstrates using frozensets as dictionary keys, which isn't
possible with regular mutable sets.

frozenset_keys.py
  

# Create a dictionary with frozenset keys
config = {
    frozenset(['admin', 'user']): "Full access",
    frozenset(['user']): "Read-only access",
    frozenset(['guest']): "No access"
}

# Access values using frozenset keys
print(config[frozenset(['user'])])        # Read-only access
print(config[frozenset(['admin', 'user'])]) # Full access

# Trying with regular set would raise TypeError
try:
    {set(['a']): "value"}
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'set'

This shows how frozensets enable set-like keys in dictionaries. The example
maps permission sets to access levels. Regular sets can't be used as keys.

The error demonstrates why frozensets are needed for this use case - regular
sets are mutable and therefore unhashable.

## Set Operations with Frozensets

Frozensets support all standard set operations. This example demonstrates
union, intersection, difference, and symmetric difference operations.

set_operations.py
  

fs1 = frozenset([1, 2, 3, 4])
fs2 = frozenset([3, 4, 5, 6])

# Union
print(fs1 | fs2)   # frozenset({1, 2, 3, 4, 5, 6})

# Intersection
print(fs1 &amp; fs2)   # frozenset({3, 4})

# Difference
print(fs1 - fs2)   # frozenset({1, 2})

# Symmetric difference
print(fs1 ^ fs2)   # frozenset({1, 2, 5, 6})

# These operations return new frozensets
result = fs1 | fs2
print(type(result))  # &lt;class 'frozenset'&gt;

All standard set operations work with frozensets and return new frozensets.
The operations don't modify the original frozensets since they're immutable.

Note that you can mix frozensets with regular sets in these operations, but
the result type depends on the left operand.

## Membership Testing and Methods

This example shows membership testing and available frozenset methods. While
frozensets are immutable, they support all non-mutating set methods.

methods.py
  

colors = frozenset(['red', 'green', 'blue'])

# Membership testing
print('red' in colors)    # True
print('yellow' in colors) # False

# Non-mutating methods
print(colors.isdisjoint(frozenset(['yellow'])))  # True
print(colors.issubset({'red', 'green', 'blue', 'yellow'}))  # True
print(colors.issuperset({'red', 'green'}))      # True

# len(), copy() work as expected
print(len(colors))        # 3
colors_copy = colors.copy()
print(colors_copy)        # frozenset({'red', 'green', 'blue'})

Frozensets support all set operations that don't modify the set. Membership
testing is efficient (O(1)) just like with regular sets.

Methods like isdisjoint, issubset, and
issuperset are particularly useful for set comparisons.

## Frozenset in Data Structures

This advanced example demonstrates using frozensets in more complex data
structures, taking advantage of their hashability and immutability.

data_structures.py
  

from collections import defaultdict

# Using frozenset in a defaultdict
graph = defaultdict(set)

# Add edges (undirected graph)
edges = [
    frozenset({'A', 'B'}),
    frozenset({'B', 'C'}),
    frozenset({'C', 'A'}),
    frozenset({'C', 'D'})
]

for edge in edges:
    for node in edge:
        graph[node].update(edge - {node})

print(graph)
# defaultdict(&lt;class 'set'&gt;, {
#   'A': {'B', 'C'}, 
#   'B': {'A', 'C'}, 
#   'C': {'A', 'B', 'D'}, 
#   'D': {'C'}
# })

# Using frozenset in a set of sets
unique_combinations = {
    frozenset({'a', 'b'}),
    frozenset({'b', 'c'}),
    frozenset({'a', 'c'})
}

print(frozenset({'b', 'a'}) in unique_combinations)  # True

This shows two advanced use cases: graph edges storage and unique combinations.
Frozensets ensure edge representation is order-independent and hashable.

The graph example efficiently stores neighbors for each node. The combinations
example demonstrates how frozensets can represent unordered pairs.

## Best Practices

- **Use for immutability:** When you need a set that shouldn't change

- **Dictionary keys:** Ideal for set-like dictionary keys

- **Performance:** Same O(1) lookups as regular sets

- **Memory:** More memory-efficient than tuples for large sets

- **Safety:** Prevents accidental modifications in shared code

## Source References

- [Python frozenset Documentation](https://docs.python.org/3/library/stdtypes.html#frozenset)

- [Python Set Types Documentation](https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).