+++
title = "Python object Function"
date = 2025-08-29T20:09:00.091+01:00
draft = false
description = "Complete guide to Python's object function covering base class usage, inheritance, and practical examples of object creation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python object Function

Last modified April 11, 2025

This comprehensive guide explores Python's object function, which
is the base class for all classes in Python. We'll cover its role in inheritance,
instantiation, and practical examples of object creation.

## Basic Definitions

The object function returns a new featureless object that is the
base for all classes. It provides default implementations for special methods.

Key characteristics: it's the root of Python's class hierarchy, provides default
__str__, __repr__, and other methods, and is used
when creating new-style classes (Python 3+).

## Creating a Basic Object

Here's how to create a simple object instance and examine its properties.
This demonstrates the most basic usage of the object function.

basic_object.py
  

# Create a basic object
obj = object()

# Examine its type and methods
print(type(obj))         # &lt;class 'object'&gt;
print(dir(obj)[:5])      # First 5 methods: ['__class__', '__delattr__', ...]
print(isinstance(obj, object))  # True

This example creates a bare object instance and examines its
type and available methods. All Python objects inherit from this base class.

The dir() function shows the default methods provided by the
object base class, which all other classes inherit.

## Using object as Base Class

This example demonstrates explicit inheritance from object, which
is automatic in Python 3 but shown here for clarity.

inheritance.py
  

class MyClass(object):  # Explicit inheritance (optional in Python 3)
    pass

obj = MyClass()
print(isinstance(obj, object))  # True
print(issubclass(MyClass, object))  # True

# Compare with direct object instance
base_obj = object()
print(dir(obj)[:5] == dir(base_obj)[:5])  # True (same basic methods)

This shows that even when we create our own class, it implicitly inherits from
object. The basic methods available are the same as the base object.

Explicit inheritance from object was required in Python 2 for
new-style classes but is optional in Python 3 where all classes are new-style.

## Object Identity Comparison

This example explores object identity and comparison operations using the
object base class's default implementations.

comparison.py
  

obj1 = object()
obj2 = object()
obj3 = obj1

print(obj1 is obj2)  # False (different identities)
print(obj1 is obj3)  # True (same identity)
print(obj1 == obj2)  # False (default __eq__ compares identity)
print(hash(obj1))    # Unique hash value based on identity

The example demonstrates that by default, object instances compare equal only
if they are the same object (identity comparison). This is the base behavior.

The hash function returns a value based on the object's identity,
which is consistent with the equality comparison implementation.

## Adding Attributes to Object

This example shows what happens when trying to add attributes to a plain
object instance, which isn't allowed by default.

attributes.py
  

obj = object()

try:
    obj.attribute = "value"
except AttributeError as e:
    print(f"Error: {e}")  # can't set attributes of type 'object'

class CustomObject(object):
    pass

custom_obj = CustomObject()
custom_obj.attribute = "value"  # Works fine
print(custom_obj.attribute)     # "value"

Plain object instances don't allow attribute assignment, while
custom classes that inherit from object do. This demonstrates
the base behavior.

The restriction exists because object instances lack a
__dict__ attribute by default, which is where attributes are stored.

## Object as Sentinel Value

The object function can be used to create unique sentinel values,
as each call creates a distinct object with a unique identity.

sentinel.py
  

MISSING = object()
DEFAULT = object()

def process_value(value=MISSING):
    if value is MISSING:
        print("No value provided")
    elif value is DEFAULT:
        print("Default value used")
    else:
        print(f"Processing: {value}")

process_value()           # No value provided
process_value(DEFAULT)    # Default value used
process_value("data")     # Processing: data

This pattern is useful when you need to distinguish between None, missing, and
default values. Each object() call creates a unique sentinel.

The identity comparison (is) is safe here because each
object() call creates a new unique instance that won't be equal
to any other object.

## Best Practices

- **Explicit inheritance:** Use class MyClass(object): for Python 2 compatibility

- **Sentinel values:** Use object() for unique markers

- **Attribute handling:** Remember plain objects don't support attributes

- **Default methods:** Override __str__, __eq__ as needed

- **Identity operations:** Understand default identity-based comparisons

## Source References

- [Python object() Documentation](https://docs.python.org/3/library/functions.html#object)

- [Python Data Model](https://docs.python.org/3/reference/datamodel.html#objects-values-and-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).