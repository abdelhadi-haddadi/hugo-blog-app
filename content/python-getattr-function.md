+++
title = "Python getattr Function"
date = 2025-08-29T20:08:35.136+01:00
draft = false
description = "Complete guide to Python's getattr function covering attribute access, dynamic attribute lookup, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python getattr Function

Last modified April 11, 2025

This comprehensive guide explores Python's getattr function, which
provides dynamic attribute access. We'll cover basic usage, default values,
method calling, and practical examples of dynamic attribute lookup.

## Basic Definitions

The getattr function returns the value of a named attribute of an
object. If the attribute doesn't exist, it returns the default value or raises
an AttributeError.

Key characteristics: takes an object, attribute name string, and optional
default value. It's Python's built-in way to access attributes dynamically
at runtime.

## Basic Attribute Access

Here's simple usage showing how getattr can access object
attributes just like dot notation but with dynamic attribute names.

basic_getattr.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)

# Standard attribute access
print(p.name)  # Alice

# Using getattr
print(getattr(p, 'name'))  # Alice
print(getattr(p, 'age'))   # 30

This example shows equivalent ways to access attributes. The getattr
version allows the attribute name to be determined at runtime as a string.

While dot notation is preferred for known attributes, getattr
enables dynamic attribute lookup which is powerful for flexible code.

## Handling Missing Attributes

getattr can provide a default value when an attribute doesn't
exist, preventing AttributeError exceptions. This example demonstrates safe
attribute access.

default_value.py
  

class Config:
    def __init__(self):
        self.theme = "dark"
        self.font_size = 12

config = Config()

# Safe access with default
print(getattr(config, 'theme', 'light'))      # dark (exists)
print(getattr(config, 'language', 'en'))      # en (default)
print(getattr(config, 'font_size', 14))       # 12 (exists)

When the attribute exists, getattr returns its value. When it
doesn't exist, it returns the default value instead of raising an error.

This pattern is useful for configuration systems where missing settings should
fall back to defaults without crashing the program.

## Dynamic Method Calling

getattr can retrieve methods dynamically, enabling runtime
determination of which method to call. This example shows polymorphic behavior.

method_calling.py
  

class Calculator:
    def add(self, a, b):
        return a + b
    
    def subtract(self, a, b):
        return a - b
    
    def execute(self, operation, a, b):
        method = getattr(self, operation)
        return method(a, b)

calc = Calculator()
print(calc.execute('add', 5, 3))        # 8
print(calc.execute('subtract', 5, 3))   # 2

The execute method uses getattr to dynamically select
which operation method to call based on the operation name string.

This technique is common in command pattern implementations and plugin systems
where behavior is determined at runtime.

## Accessing Nested Attributes

getattr can be combined with other Python features to access nested
attributes dynamically. This example shows deep attribute access.

nested_attributes.py
  

class Address:
    def __init__(self, city):
        self.city = city

class User:
    def __init__(self, name, address):
        self.name = name
        self.address = address

addr = Address("New York")
user = User("Bob", addr)

# Dynamically access nested attribute
attr_path = 'address.city'
parts = attr_path.split('.')
result = user
for part in parts:
    result = getattr(result, part)

print(result)  # New York

This code splits a dotted attribute path and uses getattr in a
loop to traverse nested objects. It's similar to how Django's ORM works.

For production code, you'd want to add error handling for missing attributes
at any level in the path.

## Implementing Fallback Mechanisms

getattr can be used to implement sophisticated fallback mechanisms
when combined with __getattr__. This example shows a proxy pattern.

fallback.py
  

class DataProxy:
    def __init__(self, data):
        self._data = data
    
    def __getattr__(self, name):
        # Try to get from _data first, then use default
        try:
            return getattr(self._data, name)
        except AttributeError:
            return f"Default {name}"

class Data:
    def __init__(self, value):
        self.value = value

data = Data(42)
proxy = DataProxy(data)

print(proxy.value)      # 42 (from _data)
print(proxy.unknown)    # Default unknown

The proxy first tries to get attributes from the wrapped object, then falls
back to a default value. This demonstrates getattr's role in
Python's attribute lookup chain.

This pattern is useful for decorators, adapters, and other proxy objects that
need to forward most attribute access.

## Best Practices

- **Prefer direct access:** Use dot notation when attribute names are known

- **Use for dynamism:** Use getattr when attribute names are determined at runtime

- **Provide defaults:** Always consider using the default parameter for safety

- **Combine with hasattr:** Check existence first if default isn't appropriate

- **Document behavior:** Clearly document dynamic attribute access patterns

## Source References

- [Python getattr() Documentation](https://docs.python.org/3/library/functions.html#getattr)

- [Python __getattr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__getattr__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).