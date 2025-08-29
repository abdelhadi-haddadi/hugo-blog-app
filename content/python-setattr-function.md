+++
title = "Python setattr Function"
date = 2025-08-29T20:10:22.011+01:00
draft = false
description = "Complete guide to Python's setattr function covering dynamic attribute assignment, object manipulation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python setattr Function

Last modified April 11, 2025

This comprehensive guide explores Python's setattr function, which
dynamically sets attributes on objects. We'll cover basic usage, dynamic object
manipulation, and practical examples of attribute assignment.

## Basic Definitions

The setattr function assigns a value to an object's attribute. It
takes three parameters: the object, attribute name (string), and value to assign.

Key characteristics: works with any Python object, enables dynamic attribute
assignment, and is equivalent to obj.attr = value but more flexible.

## Basic Attribute Assignment

Here's simple usage showing how setattr assigns attributes to an
object, equivalent to direct assignment but with dynamic attribute names.

basic_setattr.py
  

class Person:
    pass

p = Person()

# Equivalent to p.name = 'John'
setattr(p, 'name', 'John')

# Equivalent to p.age = 30
setattr(p, 'age', 30)

print(p.name)  # John
print(p.age)   # 30

This example demonstrates basic setattr usage. We create a simple
Person class and dynamically add attributes. The function call is equivalent to
direct attribute assignment.

The key difference is that setattr allows the attribute name to be
determined at runtime, while direct assignment requires knowing the name at
write time.

## Dynamic Attribute Creation

setattr shines when attribute names are dynamic or come from
external sources. This example shows dynamic attribute creation from a dict.

dynamic_attrs.py
  

class Settings:
    pass

config = {
    'theme': 'dark',
    'font_size': 14,
    'auto_save': True
}

settings = Settings()

for key, value in config.items():
    setattr(settings, key, value)

print(settings.theme)      # dark
print(settings.font_size)  # 14
print(settings.auto_save) # True

This example dynamically creates attributes on a Settings object from a
configuration dictionary. The attribute names and values come from the dict.

This pattern is useful when loading configurations or converting data structures
to objects with attribute access. It's more flexible than hardcoding attributes.

## Working with Built-in Types

setattr can also modify built-in type instances, though some
built-ins are immutable. This example shows working with mutable objects.

builtin_types.py
  

# Works with custom classes
class Box:
    pass

b = Box()
setattr(b, 'contents', 'books')
print(b.contents)  # books

# Works with some built-in types
d = {}
setattr(d, 'description', 'storage dict')
print(d.description)  # storage dict

# Won't work with immutable types like int
try:
    x = 5
    setattr(x, 'description', 'number')
except AttributeError as e:
    print(f"Error: {e}")  # can't set attributes of built-in/extension type 'int'

This example shows setattr working with custom classes and some
built-in mutable types. However, immutable types like integers don't support
dynamic attribute assignment.

The error demonstrates that Python prevents modifying built-in types that
weren't designed for dynamic attribute assignment.

## Dynamic Object Initialization

This example demonstrates using setattr in __init__
to dynamically initialize object attributes based on input parameters.

dynamic_init.py
  

class DynamicObject:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            setattr(self, key, value)
            
    def __repr__(self):
        attrs = ', '.join(f"{k}={v}" for k, v in self.__dict__.items())
        return f"DynamicObject({attrs})"

obj = DynamicObject(name='Alice', age=25, city='London')
print(obj)       # DynamicObject(name=Alice, age=25, city=London)
print(obj.name)  # Alice
print(obj.age)   # 25

The DynamicObject class accepts arbitrary keyword arguments and converts them
to attributes using setattr. This creates a flexible object that
can have any attributes specified at creation time.

This pattern is useful for creating data containers or when the exact attributes
aren't known when writing the class. It's similar to how JavaScript objects work.

## Property and Descriptor Interaction

This advanced example shows how setattr interacts with properties
and descriptors, respecting Python's attribute access protocol.

properties.py
  

class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value &lt; -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

temp = Temperature(25)

# Uses the property setter
setattr(temp, 'celsius', 30)
print(temp.celsius)  # 30

# Can't set read-only property
try:
    setattr(temp, 'fahrenheit', 100)
except AttributeError as e:
    print(f"Error: {e}")  # can't set attribute

# Respects property validation
try:
    setattr(temp, 'celsius', -300)
except ValueError as e:
    print(f"Error: {e}")  # Temperature below absolute zero

This example demonstrates that setattr properly interacts with
Python's property system. It calls property setters when available and respects
read-only properties.

The validation in the celsius setter is triggered by setattr,
showing it follows the same attribute access rules as direct assignment.

## Best Practices

- **Use for dynamic cases:** Prefer direct assignment when attribute names are known

- **Validate attribute names:** Ensure dynamic names are valid Python identifiers

- **Consider __dict__:** For bulk updates, direct __dict__ access may be faster

- **Respect encapsulation:** Avoid bypassing intended interfaces with setattr

- **Document dynamic behavior:** Clearly document classes designed for dynamic attributes

## Source References

- [Python setattr() Documentation](https://docs.python.org/3/library/functions.html#setattr)

- [Python Attribute Access Documentation](https://docs.python.org/3/reference/datamodel.html#customizing-attribute-access)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).