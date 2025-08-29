+++
title = "Python __hash__ Method"
date = 2025-08-29T20:08:11.661+01:00
draft = false
description = "Complete guide to Python's __hash__ method covering hashable objects, immutability, dictionary keys, and custom hashing."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __hash__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __hash__ method, the
special method that enables objects to be hashable. We'll cover basic usage,
immutability requirements, dictionary keys, custom hashing, and practical examples.

## Basic Definitions

The __hash__ method returns an integer hash value for an object.
This hash is used in dictionary keys and sets for quick lookup operations.

Key characteristics: must return same hash for equal objects, should be fast,
and should distribute values uniformly. Objects with __hash__ are
called hashable and can be dictionary keys.

## Basic __hash__ Implementation

Here's a simple implementation showing how __hash__ works with
immutable objects. The hash is based on the object's attributes.

basic_hash.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __hash__(self):
        return hash((self.x, self.y))
    
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

p1 = Point(1, 2)
p2 = Point(1, 2)
print(hash(p1) == hash(p2))  # True

This example shows a hashable Point class. The hash is based on a tuple of
coordinates. Equal points produce the same hash value.

Note we also implemented __eq__. This is required to maintain the
hash invariant: equal objects must have equal hashes.

## Making Objects Hashable

To make objects hashable, they must be immutable. This example demonstrates
how to create an immutable hashable class.

immutable_hash.py
  

class ImmutablePerson:
    __slots__ = ('_name', '_age')
    
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    @property
    def name(self):
        return self._name
    
    @property
    def age(self):
        return self._age
    
    def __hash__(self):
        return hash((self._name, self._age))
    
    def __eq__(self, other):
        return (self._name, self._age) == (other._name, other._age)

person = ImmutablePerson("Alice", 30)
d = {person: "value"}
print(d[person])  # "value"

This immutable person class uses properties and __slots__ to
prevent attribute modification after creation. The hash is based on name and age.

The class can be used as a dictionary key because it properly implements both
__hash__ and __eq__ methods.

## Custom Hashing Logic

Sometimes you need custom hashing logic. This example shows how to implement
a case-insensitive string hash.

custom_hash.py
  

class CaseInsensitiveString:
    def __init__(self, s):
        self._s = s.lower()
    
    def __hash__(self):
        return hash(self._s)
    
    def __eq__(self, other):
        return self._s == other._s
    
    def __repr__(self):
        return f"CaseInsensitiveString('{self._s}')"

s1 = CaseInsensitiveString("Hello")
s2 = CaseInsensitiveString("HELLO")
print(hash(s1) == hash(s2))  # True
d = {s1: "value"}
print(d[s2])  # "value"

This class normalizes strings to lowercase before hashing, making the hash
case-insensitive. Equal strings (case-insensitively) produce the same hash.

The __eq__ method also compares the normalized strings to maintain
the hash invariant.

## Hashable Containers

This example demonstrates how to make a custom container hashable by hashing
its immutable contents.

hashable_container.py
  

class HashableList:
    def __init__(self, items):
        self._items = tuple(items)
    
    def __hash__(self):
        return hash(self._items)
    
    def __eq__(self, other):
        return self._items == other._items
    
    def __getitem__(self, index):
        return self._items[index]
    
    def __len__(self):
        return len(self._items)
    
    def __repr__(self):
        return f"HashableList({list(self._items)})"

hl1 = HashableList([1, 2, 3])
hl2 = HashableList([1, 2, 3])
d = {hl1: "value"}
print(d[hl2])  # "value"

The HashableList stores items in a tuple internally to ensure immutability.
The hash is based on this tuple, making the container hashable.

This pattern is useful when you need to use lists (or other mutable containers)
as dictionary keys while maintaining immutability.

## When Not to Implement __hash__

This example shows a mutable class that shouldn't implement __hash__
because its state can change.

mutable_unhashable.py
  

class MutablePoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def move(self, dx, dy):
        self.x += dx
        self.y += dy
    
    # No __hash__ implementation
    
    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

p = MutablePoint(1, 2)
# hash(p) would raise TypeError

This mutable point class doesn't implement __hash__ because its
coordinates can change. Python will make it unhashable by default.

If we tried to implement __hash__ here, it would violate the hash
invariant when the point moves, potentially causing dictionary lookup issues.

## Best Practices

- **Maintain hash invariant:** Equal objects must have equal hashes

- **Use immutable attributes:** Hashable objects should be immutable

- **Combine hashes of components:** Use tuples for multi-attribute hashing

- **Don't hash mutable state:** Avoid hashing objects that can change

- **Implement __eq__:** Always implement __eq__ when implementing __hash__

## Source References

- [Python __hash__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__hash__)

- [Python Hashable Definition](https://docs.python.org/3/glossary.html#term-hashable)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).