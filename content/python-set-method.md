+++
title = "Python __set__ Method"
date = 2025-08-29T20:08:24.049+01:00
draft = false
description = "Complete guide to Python's __set__ method covering descriptors, attribute management, and property customization."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __set__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __set__ method, the
special method used in descriptors to customize attribute assignment. We'll
cover basic usage, property-like descriptors, validation, and practical examples.

## Basic Definitions

The __set__ method is part of Python's descriptor protocol. It's
called when an attribute is assigned a value on an instance. Descriptors allow
customizing attribute access.

Key characteristics: it takes three parameters (self, instance, value), doesn't
return anything, and is invoked during assignment. It's used with
__get__ and optionally __delete__ for full descriptor
implementation.

## Basic Descriptor with __set__

Here's a simple descriptor implementation showing how __set__
intercepts attribute assignments. This demonstrates the basic descriptor pattern.

basic_set.py
  

class LoggedAttribute:
    def __set__(self, instance, value):
        print(f"Setting value {value} on {instance}")
        instance.__dict__[self.name] = value
    
    def __set_name__(self, owner, name):
        self.name = name

class Person:
    name = LoggedAttribute()
    age = LoggedAttribute()

p = Person()
p.name = "Alice"  # Prints "Setting value Alice on &lt;__main__.Person object...&gt;"
p.age = 30       # Prints "Setting value 30 on &lt;__main__.Person object...&gt;"

This LoggedAttribute descriptor logs all assignments to attributes
that use it. The __set_name__ method captures the attribute name for
storage in the instance's __dict__.

The __set__ method receives the descriptor instance, the owner
instance, and the value being assigned. It stores the value in the instance's
namespace.

## Validated Attribute with __set__

__set__ is perfect for implementing validated attributes that
enforce constraints on assigned values. Here's an age validator example.

validation.py
  

class ValidatedAge:
    def __set__(self, instance, value):
        if not isinstance(value, int):
            raise TypeError("Age must be an integer")
        if not 0 &lt;= value &lt;= 120:
            raise ValueError("Age must be between 0 and 120")
        instance.__dict__['age'] = value

class Person:
    age = ValidatedAge()

p = Person()
p.age = 25    # Works
# p.age = 150  # Raises ValueError
# p.age = "25" # Raises TypeError

This descriptor validates that age assignments are integers within a reasonable
range. Invalid assignments raise exceptions with helpful messages.

The validation happens transparently during attribute assignment. The descriptor
pattern keeps validation logic separate from the class while maintaining clean
attribute access syntax.

## Property-like Descriptor

Descriptors with __set__ can create property-like attributes with
custom get/set behavior. Here's a temperature converter example.

property_like.py
  

class Celsius:
    def __get__(self, instance, owner):
        return instance._celsius
    
    def __set__(self, instance, value):
        instance._celsius = value
        instance._fahrenheit = value * 9/5 + 32

class Temperature:
    celsius = Celsius()
    
    def __init__(self, celsius=0):
        self.celsius = celsius
    
    @property
    def fahrenheit(self):
        return self._fahrenheit

temp = Temperature(100)
print(temp.fahrenheit)  # 212.0
temp.celsius = 0
print(temp.fahrenheit)  # 32.0

This descriptor automatically updates the Fahrenheit equivalent whenever Celsius
is set. The __set__ method handles the conversion and storage.

The Temperature class exposes both temperature scales while only
storing Celsius internally. The descriptor maintains consistency between the
two representations.

## Read-Only Descriptor

A descriptor can make attributes read-only by implementing __set__
to prevent modifications. This example shows a constant-like attribute.

readonly.py
  

class ReadOnly:
    def __init__(self, value):
        self.value = value
    
    def __get__(self, instance, owner):
        return self.value
    
    def __set__(self, instance, value):
        raise AttributeError("Cannot modify read-only attribute")

class Configuration:
    VERSION = ReadOnly("1.0.0")

config = Configuration()
print(config.VERSION)  # "1.0.0"
# config.VERSION = "2.0.0"  # Raises AttributeError

This descriptor stores the value during initialization and allows reading but
not writing. Attempts to modify the attribute raise an AttributeError.

The __set__ method completely blocks assignment attempts. This
pattern is useful for constants or configuration values that shouldn't change
after initialization.

## Lazy Initialization with __set__

Descriptors can implement lazy initialization, deferring computation until first
access. Here's a lazy-loaded attribute example.

lazy.py
  

class LazyProperty:
    def __init__(self, factory):
        self.factory = factory
        self.name = None
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        value = self.factory(instance)
        instance.__dict__[self.name] = value
        return value
    
    def __set__(self, instance, value):
        instance.__dict__[self.name] = value

class DataProcessor:
    def __init__(self, data):
        self.data = data
    
    @LazyProperty
    def processed_data(self):
        print("Processing data...")
        return [x * 2 for x in self.data]

processor = DataProcessor([1, 2, 3])
print(processor.processed_data)  # Processes and prints [2, 4, 6]
print(processor.processed_data)  # Uses cached value

This descriptor computes the value only on first access, then caches it. The
__set__ allows explicit setting to bypass the lazy computation.

The factory function is called only when the attribute is first accessed. This
is useful for expensive computations that might not always be needed.

## Best Practices

- **Store in instance __dict__:** Avoid infinite recursion by not using direct attribute access

- **Implement __set_name__:** For Python 3.6+ to automatically get attribute names

- **Consider thread safety:** Add locks if descriptors are used in multi-threaded code

- **Document behavior:** Clearly document any special assignment logic

- **Use properties for simple cases:** Prefer @property for single-class use

## Source References

- [Python __set__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__set__)

- [Python Descriptor HowTo Guide](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).