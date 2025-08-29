+++
title = "Python id Function"
date = 2025-08-29T20:08:40.901+01:00
draft = false
description = "Complete guide to Python's id function covering object identity, memory addresses, and practical examples of object identification."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python id Function

Last modified April 11, 2025

This comprehensive guide explores Python's id function, which
returns the identity of an object. We'll cover object identity, memory
addresses, and practical examples of object identification in Python.

## Basic Definitions

The id function returns the identity of an object. This is a
unique integer constant for the object's lifetime. In CPython, it represents
the object's memory address.

Key characteristics: returns an integer, unique for object's lifetime, same
value for same object, different for different objects. The value is
implementation-dependent but consistent in CPython.

## Basic Usage with Simple Objects

Here's simple usage with different Python objects showing how id
returns unique identifiers for each object.

basic_id.py
  

x = 42
y = "hello"
z = [1, 2, 3]

print(id(x))  # Unique identifier for integer 42
print(id(y))  # Unique identifier for string "hello"
print(id(z))  # Unique identifier for list [1, 2, 3]

This example shows id with different object types. Each object
gets a unique identifier that remains constant during its lifetime.

The actual numbers will vary between runs but will be consistent within a
single program execution for the same objects.

## Identity Comparison with is Operator

The id function is closely related to Python's is
operator. This example demonstrates their relationship.

identity_comparison.py
  

a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)          # True (same object)
print(id(a) == id(b))  # True (same id)
print(a is c)          # False (different objects)
print(id(a) == id(c))  # False (different ids)

The example shows that is checks for object identity, which is
equivalent to comparing id values. a is b is True
because they reference the same object.

Even though a and c contain the same values, they
are different objects with different identities.

## Small Integer Caching

Python caches small integers for optimization. This affects their identity
behavior as shown in this example.

int_caching.py
  

x = 256
y = 256
print(x is y)      # True (cached)
print(id(x) == id(y))  # True

a = 257
b = 257
print(a is b)      # False (not cached)
print(id(a) == id(b))  # False

Python caches integers from -5 to 256. For these values, multiple references
will point to the same object, resulting in identical id values.

For larger integers (like 257), each assignment creates a new object with a
different identity, unless explicitly aliased.

## Mutable vs Immutable Objects

The behavior of id differs between mutable and immutable objects.
This example demonstrates these differences.

mutable_immutable.py
  

# Immutable string
s1 = "hello"
s2 = "hello"
print(id(s1) == id(s2))  # True (may be interned)

# Mutable list
lst1 = [1, 2, 3]
lst2 = [1, 2, 3]
print(id(lst1) == id(lst2))  # False (always different)

# Modified mutable object
print(id(lst1))  # Before modification
lst1.append(4)
print(id(lst1))  # After modification (same id)

Immutable objects like strings may share the same identity if they have the
same value (due to interning). Mutable objects always have distinct identities.

Modifying a mutable object doesn't change its identity, as the object itself
remains the same, just its contents change.

## Custom Objects and Identity

Custom class instances have unique identities, similar to built-in objects.
This example shows identity behavior with custom objects.

custom_objects.py
  

class Person:
    def __init__(self, name):
        self.name = name

p1 = Person("Alice")
p2 = Person("Alice")
p3 = p1

print(id(p1))  # Unique identifier for p1
print(id(p2))  # Different identifier for p2
print(id(p3))  # Same as p1 (alias)

print(p1 is p3)  # True
print(p1 is p2)  # False

Each new instance of a custom class gets a unique identity. Aliasing an object
(p3 = p1) creates a reference to the same object with the same identity.

Even with identical attribute values, p1 and p2 are distinct objects with
different identities.

## Best Practices

- **Use for debugging:** Helpful for tracking object identity in complex programs

- **Prefer is for identity:** Use is operator rather than comparing ids directly

- **Understand caching:** Be aware of small integer and string interning behaviors

- **Don't rely on values:** Id values are implementation-specific and may vary

- **Use for hashing:** Can be useful as a quick hash function for objects

## Source References

- [Python id() Documentation](https://docs.python.org/3/library/functions.html#id)

- [Python Data Model](https://docs.python.org/3/reference/datamodel.html#objects-values-and-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).