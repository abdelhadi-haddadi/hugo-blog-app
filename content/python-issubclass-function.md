+++
title = "Python issubclass Function"
date = 2025-08-29T20:08:45.374+01:00
draft = false
description = "Complete guide to Python's issubclass function covering class inheritance, abstract base classes, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python issubclass Function

Last modified April 11, 2025

This comprehensive guide explores Python's issubclass function,
which checks class inheritance relationships. We'll cover basic usage, abstract
base classes, multiple inheritance, and practical examples.

## Basic Definitions

The issubclass function checks if a class is a subclass of another
class. It returns True if the first argument is a subclass of the
second argument (directly or indirectly).

Key characteristics: works with class objects, handles multiple inheritance,
supports abstract base classes, and raises TypeError for non-class
arguments. The function signature is issubclass(cls, classinfo).

## Basic Inheritance Check

Here's simple usage showing how issubclass verifies direct and
indirect inheritance relationships between classes.

basic_inheritance.py
  

class Animal:
    pass

class Dog(Animal):
    pass

class Bulldog(Dog):
    pass

print(issubclass(Dog, Animal))       # True (direct)
print(issubclass(Bulldog, Animal))   # True (indirect)
print(issubclass(Bulldog, Dog))      # True (direct)
print(issubclass(Animal, Dog))       # False

This example demonstrates direct and indirect inheritance checks. Dog
directly inherits from Animal, while Bulldog inherits
from Dog (and indirectly from Animal).

The last check returns False because the parent-child relationship
is not symmetric - a parent is not a subclass of its child.

## Multiple Inheritance

issubclass correctly handles multiple inheritance scenarios. This
example shows checks with classes that inherit from multiple parents.

multiple_inheritance.py
  

class A:
    pass

class B:
    pass

class C(A, B):
    pass

print(issubclass(C, A))  # True
print(issubclass(C, B))  # True
print(issubclass(A, B))  # False

Class C inherits from both A and B, so
issubclass returns True for both parent checks.

The function correctly identifies all inheritance relationships in complex
multiple inheritance hierarchies, following Python's method resolution order.

## Abstract Base Classes

issubclass works with abstract base classes (ABCs) from the
collections.abc module. This example checks collection types.

abc_check.py
  

from collections.abc import Sequence, MutableSequence

print(issubclass(list, Sequence))          # True
print(issubclass(list, MutableSequence))   # True
print(issubclass(tuple, MutableSequence))  # False
print(issubclass(str, Sequence))           # True

This shows how built-in types like list and tuple
relate to abstract base classes. list is mutable, so it's a
subclass of MutableSequence.

tuple is immutable, so it's only a Sequence. Strings
also implement the Sequence interface in Python.

## Checking Against Multiple Classes

The second argument can be a tuple of classes. This checks if the first class
is a subclass of any class in the tuple.

multiple_checks.py
  

class A:
    pass

class B:
    pass

class C(A):
    pass

class D(B):
    pass

print(issubclass(C, (A, B)))  # True (matches A)
print(issubclass(D, (A, B)))  # True (matches B)
print(issubclass(C, (B, D)))  # False

This demonstrates checking against multiple possible parent classes. The
function returns True if any class in the tuple matches.

This is useful for type checking when multiple base classes might be acceptable,
such as in plugin systems or interface validation.

## Error Handling

issubclass raises TypeError when used incorrectly.
This example shows common error cases and proper usage.

errors.py
  

class MyClass:
    pass

try:
    print(issubclass(MyClass(), MyClass))  # TypeError
except TypeError as e:
    print(f"Error: {e}")  # arg 1 must be a class

try:
    print(issubclass(MyClass, "not a class"))
except TypeError as e:
    print(f"Error: {e}")  # arg 2 must be a class or tuple

The first error occurs when passing an instance instead of a class object.
The second error happens when the second argument isn't a class or tuple.

Always pass class objects (not instances) as arguments, and ensure the second
argument is either a class or a tuple of classes.

## Best Practices

- **Use for type checking:** Prefer issubclass over type() for inheritance checks

- **Check ABCs:** Use with abstract base classes for interface validation

- **Handle errors:** Catch TypeError when arguments might not be classes

- **Consider isinstance:** For instance checks, use isinstance() instead

- **Document relationships:** Clearly document class hierarchies

## Source References

- [Python issubclass() Documentation](https://docs.python.org/3/library/functions.html#issubclass)

- [Python abc Module Documentation](https://docs.python.org/3/library/abc.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).