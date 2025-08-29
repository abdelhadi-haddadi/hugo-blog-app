+++
title = "Python __slots__ Method"
date = 2025-08-29T20:08:25.140+01:00
draft = false
description = "Complete guide to Python's __slots__ method covering memory optimization, attribute restriction, and performance benefits."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __slots__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __slots__ attribute, a
special class variable that optimizes memory usage and restricts attribute
creation. We'll cover basic usage, memory benefits, inheritance, and practical
examples.

## Basic Definitions

The __slots__ class variable is used to explicitly declare instance
attributes. It serves two main purposes: memory optimization and attribute
restriction. When defined, it prevents the creation of __dict__.

Key characteristics: it must be a sequence (usually tuple) of strings, saves
memory by avoiding per-instance dictionaries, and restricts dynamic attribute
creation. It's particularly useful for classes with many instances.

## Basic __slots__ Implementation

Here's the simplest implementation showing how __slots__ restricts
attribute creation and optimizes memory usage. It demonstrates the core behavior.

basic_slots.py
  

class Point:
    __slots__ = ('x', 'y')
    
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)  # Works fine
# p.z = 5  # Raises AttributeError

This example shows a Point class with fixed attributes x and y. Attempting to
create a new attribute z would raise an AttributeError. The class doesn't have
a __dict__ attribute.

The memory savings come from not having a per-instance dictionary to store
attributes. Instead, attributes are stored in a more compact internal structure.

## Memory Optimization with __slots__

__slots__ significantly reduces memory usage for classes with many
instances. This example demonstrates the memory difference with and without it.

memory_optimization.py
  

import sys

class RegularPoint:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class SlotPoint:
    __slots__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

regular = RegularPoint(3, 4)
slot = SlotPoint(3, 4)

print(sys.getsizeof(regular) + sys.getsizeof(regular.__dict__))
print(sys.getsizeof(slot))  # Typically much smaller

The SlotPoint class uses significantly less memory than RegularPoint. The
difference becomes more noticeable when creating thousands or millions of
instances.

Memory savings come from two sources: no __dict__ allocation and
more efficient attribute storage. The exact savings depend on Python version.

## Inheritance with __slots__

When using inheritance with __slots__, special care must be taken.
Child classes must declare their own __slots__ to add new attributes.

inheritance.py
  

class Base:
    __slots__ = ('a',)
    
class Child(Base):
    __slots__ = ('b',)  # Only contains 'b', 'a' is from parent
    
    def __init__(self, a, b):
        self.a = a
        self.b = b

obj = Child(1, 2)
print(obj.a, obj.b)
# obj.c = 3  # Raises AttributeError

The Child class inherits from Base but adds its own attribute b. The combined
slots are a and b. Without declaring __slots__ in Child, instances
would get __dict__.

If a child class doesn't define __slots__, it will behave like a
regular class with __dict__, losing the memory optimization.

## Using __slots__ with Weak References

If you need weak references with __slots__, you must explicitly
include '__weakref__' in the slots declaration. This example shows
how.

weakref_slots.py
  

import weakref

class WeakRefable:
    __slots__ = ('__weakref__', 'data')
    
    def __init__(self, data):
        self.data = data

obj = WeakRefable(42)
r = weakref.ref(obj)
print(r().data)  # 42

By including '__weakref__' in __slots__, we enable
weak reference support while still maintaining memory optimization. Without it,
weakref.ref() would raise TypeError.

This is necessary because __slots__ replaces the default mechanism
that normally provides weak reference support. The slot must be explicitly added.

## Combining __slots__ with Properties

__slots__ works well with properties, allowing controlled attribute
access while still benefiting from memory optimization. Here's an example.

slots_properties.py
  

class Temperature:
    __slots__ = ('_celsius',)
    
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.fahrenheit)  # 77.0
# temp._celsius = 30  # Works (but underscore indicates "private")

This Temperature class uses __slots__ for memory efficiency while
providing property-based access to temperature values. The internal _celsius
attribute is stored in the slots structure.

Properties don't need to be listed in __slots__ as they're class
attributes, not instance attributes. Only data attributes need slots entries.

## Best Practices

- **Use for memory-critical applications:** When creating many instances

- **Document slot attributes:** Clearly document all allowed attributes

- **Consider inheritance carefully:** Child classes need their own __slots__

- **Add __weakref__ if needed:** For weak reference support

- **Don't use prematurely:** Only optimize after profiling shows need

## Source References

- [Python __slots__ Documentation](https://docs.python.org/3/reference/datamodel.html#slots)

- [Python Descriptor HowTo](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).