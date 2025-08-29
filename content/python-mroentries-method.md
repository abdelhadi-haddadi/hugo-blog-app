+++
title = "Python __mro_entries__ Method"
date = 2025-08-29T20:08:19.497+01:00
draft = false
description = "Complete guide to Python's __mro_entries__ method covering MRO customization, protocol classes, and multiple inheritance patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __mro_entries__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __mro_entries__ method, 
a special method that customizes Method Resolution Order (MRO) computation. 
We'll cover its purpose, protocol classes, multiple inheritance patterns, 
and practical examples.

## Basic Definitions

The __mro_entries__ method allows objects to specify their base 
classes when used in class inheritance. It's called during class creation 
to modify the base class list before MRO computation.

Key characteristics: it must accept the original bases tuple, return a tuple 
of replacement base classes, and enables protocol-style programming. It was 
introduced in Python 3.7 as part of PEP 560.

## Basic __mro_entries__ Implementation

Here's a simple implementation showing how __mro_entries__ can 
replace a base class during inheritance. This demonstrates its basic behavior.

basic_mro_entries.py
  

class ProtocolBase:
    def __mro_entries__(self, bases):
        print(f"Replacing {self} in bases {bases}")
        return (object,)

class MyClass(ProtocolBase()):  # Note the instantiation
    pass

print(MyClass.__mro__)

This example shows how __mro_entries__ can replace a base class. 
The ProtocolBase instance is replaced with object in the actual inheritance. 
The output shows the modified MRO.

The method receives the original bases tuple and returns new base classes. 
This happens before Python computes the Method Resolution Order for the class.

## Implementing Protocol Classes

__mro_entries__ is commonly used to implement protocol classes 
that don't appear in the final inheritance hierarchy but enforce interfaces.

protocol_class.py
  

class Serializable:
    def __mro_entries__(self, bases):
        return ()  # Remove from final bases
    
    def __init_subclass__(cls):
        # Check required methods exist
        if not hasattr(cls, 'serialize'):
            raise TypeError("Missing serialize method")
        if not hasattr(cls, 'deserialize'):
            raise TypeError("Missing deserialize method")

class Data(Serializable()):  # Note parentheses
    def serialize(self):
        return "data"
    
    def deserialize(self, data):
        self.value = data

# This would raise TypeError:
# class BadData(Serializable()): pass

This Serializable protocol checks for required methods during subclassing 
but doesn't appear in the final class hierarchy. The empty tuple return 
removes it from bases.

The __init_subclass__ hook performs interface validation. 
This pattern is used in Python's typing.Protocol implementation.

## Multiple Inheritance Simplification

__mro_entries__ can simplify complex multiple inheritance 
scenarios by replacing proxy objects with actual base classes.

multiple_inheritance.py
  

class JSONMixin:
    def __mro_entries__(self, bases):
        from json import JSONEncoder
        return (JSONEncoder,)

class XMLMixin:
    def __mro_entries__(self, bases):
        from xml.etree.ElementTree import Element
        return (Element,)

class DataProcessor(JSONMixin(), XMLMixin()):
    pass

print(DataProcessor.__mro__)

This example shows how mixin classes can dynamically insert real base classes. 
The DataProcessor ends up inheriting from JSONEncoder and Element directly.

This pattern helps avoid complex import-time dependencies while maintaining 
clear inheritance relationships in the final class.

## Dynamic Base Class Selection

__mro_entries__ can select base classes dynamically based on 
runtime conditions or configuration, enabling flexible class creation.

dynamic_bases.py
  

class BackendSelector:
    def __init__(self, backend_type):
        self.backend_type = backend_type
    
    def __mro_entries__(self, bases):
        if self.backend_type == 'sql':
            from .sql_backend import SQLBackend
            return (SQLBackend,)
        else:
            from .nosql_backend import NoSQLBackend
            return (NoSQLBackend,)

class Database(BackendSelector('sql')()):
    pass

print(Database.__mro__)

This example demonstrates runtime base class selection based on configuration. 
The BackendSelector chooses between SQL and NoSQL backends during class creation.

The parentheses after BackendSelector create an instance that participates in 
the class definition. This pattern is useful for plugin systems.

## Compatibility Shims

__mro_entries__ can provide compatibility shims that adapt old 
class hierarchies to new ones without changing existing code.

compatibility_shim.py
  

class LegacyAdapter:
    def __mro_entries__(self, bases):
        # Replace with modern equivalent
        from modern import NewBase
        return (NewBase,)
    
    # Provide legacy interface
    def old_method(self):
        instance = self.__class__()
        return instance.new_method()

class MyClass(LegacyAdapter()):
    def new_method(self):
        return "Modern implementation"

obj = MyClass()
print(obj.old_method())  # Works via adapter

This compatibility shim replaces a legacy base class with its modern equivalent 
while maintaining the old interface. The adapter translates method calls.

The __mro_entries__ method enables this transformation 
transparently during class creation, helping with library migrations.

## Best Practices

- **Keep it simple:** Complex MRO manipulations can be confusing

- **Document behavior:** Clearly explain any base class replacements

- **Maintain consistency:** Ensure the final MRO makes sense

- **Consider performance:** Base class resolution happens at import time

- **Use for protocols:** Ideal for interface enforcement patterns

## Source References

- [Python Class Creation Docs](https://docs.python.org/3/reference/datamodel.html#customizing-class-creation)

- [PEP 560 - Core Support for typing module](https://www.python.org/dev/peps/pep-0560/)

- [typing.Protocol Documentation](https://docs.python.org/3/library/typing.html#typing.Protocol)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).