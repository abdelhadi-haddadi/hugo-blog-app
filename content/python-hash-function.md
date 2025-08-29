+++
title = "Python hash Function"
date = 2025-08-29T20:08:38.491+01:00
draft = false
description = "Complete guide to Python's hash function covering basic usage, hashable types, custom objects, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python hash Function

Last modified April 11, 2025

This comprehensive guide explores Python's hash function, which
returns the hash value of an object. We'll cover basic usage, hashable types,
custom objects, and practical examples of hashing in Python.

## Basic Definitions

The hash function returns an integer representing an object's
hash value. Hash values are used to quickly compare dictionary keys and set
members.

Key characteristics: works with immutable objects, returns same value for
object's lifetime (per Python session), raises TypeError for unhashable types.
Hash values are not guaranteed to be unique.

## Basic Usage with Built-in Types

Here's simple usage with different built-in types showing how hash
works with numbers, strings, and tuples.

basic_hash.py
  

# With integers
print(hash(42))         # 42
print(hash(-100))       # -100

# With floats
print(hash(3.14))       # 322818021289917443

# With strings
print(hash("hello"))    # -1267296259

# With tuples (immutable)
print(hash((1, 2, 3)))  # 529344067295497451

This example shows hash with different immutable types. Integers
typically hash to themselves, while other types produce more complex values.

Note that hash values may differ between Python runs and versions due to
randomized hash seeds for security.

## Unhashable Types

Mutable types like lists and dictionaries are unhashable. This example shows
what happens when trying to hash them.

unhashable.py
  

try:
    print(hash([1, 2, 3]))
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'list'

try:
    print(hash({"a": 1}))
except TypeError as e:
    print(f"Error: {e}")  # unhashable type: 'dict'

These examples demonstrate hash's behavior with mutable types.
Lists and dictionaries raise TypeError because they can change.

To make a mutable object hashable, you would need to make it immutable (e.g.,
convert list to tuple) or implement custom hashing logic.

## Custom Objects with __hash__

You can make custom objects hashable by implementing the __hash__
method. This example creates a Point class.

custom_hash.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __hash__(self):
        return hash((self.x, self.y))
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(1, 2)
print(hash(p1))  # Same as hash((1, 2))
print(hash(p2))  # Same as hash(p1)

The Point class implements __hash__ using its coordinates' hash.
When we call hash on Point instances, Python uses this method.

Note that objects that compare equal should have the same hash value, hence
the __eq__ implementation is also important.

## Hash Consistency Within a Session

Hash values remain consistent within a Python session but may change between
runs. This example demonstrates this behavior.

consistency.py
  

s = "Python"
h1 = hash(s)
h2 = hash(s)

print(h1 == h2)  # True within same session

# Restart Python and hash may be different
print("Hash value in this run:", h1)

This shows that hash values remain constant during a single Python session.
However, they may differ between runs due to hash randomization.

Hash randomization is a security feature to protect against certain types of
denial-of-service attacks.

## Practical Usage in Data Structures

Hashing is fundamental to Python's dictionaries and sets. This example shows
how hash values enable efficient lookups.

data_structures.py
  

# Dictionary relies on hash values
d = {"apple": 1, "banana": 2}
print("apple" in d)  # Fast lookup using hash

# Set uses hashing for membership tests
s = {1, 2, 3, 4, 5}
print(3 in s)        # Fast lookup using hash

# Custom objects in sets
points = {Point(1, 2), Point(3, 4)}
print(Point(1, 2) in points)  # True

This demonstrates how hash values enable efficient membership testing in
dictionaries and sets. The same principle applies to custom objects.

For custom objects to work correctly in sets/dicts, both __hash__
and __eq__ must be properly implemented.

## Best Practices

- **Use immutable objects:** Only hash immutable objects

- **Implement both __hash__ and __eq__:** For custom hashable types

- **Don't rely on specific hash values:** They change between runs

- **Consider performance:** Simple hash functions are faster

- **Maintain hash consistency:** Equal objects must have same hash

## Source References

- [Python hash() Documentation](https://docs.python.org/3/library/functions.html#hash)

- [Python __hash__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__hash__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).