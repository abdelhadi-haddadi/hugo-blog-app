+++
title = "Python property Function"
date = 2025-08-29T20:09:57.127+01:00
draft = false
description = "Complete guide to Python's property function covering getters, setters, deleters, and practical examples of property usage."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python property Function

Last modified April 11, 2025

This comprehensive guide explores Python's property function, which
creates managed attributes with getter, setter, and deleter methods. We'll cover
basic usage, decorator syntax, and practical examples.

## Basic Definitions

The property function returns a property attribute. It provides a
way to encapsulate instance attribute access with methods. This enables data
validation, computed attributes, and read-only properties.

Key characteristics: takes optional getter, setter, deleter, and docstring
parameters. Returns a property object that uses these methods when accessed.
It's a built-in descriptor type in Python.

## Basic Property Usage

Here's simple usage showing how to create a property with validation for a
temperature class. The property ensures temperature stays above absolute zero.

basic_property.py
  

class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    def get_celsius(self):
        return self._celsius
    
    def set_celsius(self, value):
        if value &lt; -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value
    
    celsius = property(get_celsius, set_celsius)

temp = Temperature(25)
print(temp.celsius)  # 25
temp.celsius = 30
print(temp.celsius)  # 30
try:
    temp.celsius = -300  # Raises ValueError
except ValueError as e:
    print(e)

This example shows property creation with separate getter and setter methods.
The property ensures temperature values are physically valid while maintaining
a clean interface.

The _celsius naming convention indicates it's a protected attribute.
Users interact with the celsius property instead of the attribute.

## Property Decorator Syntax

Python's decorator syntax provides a cleaner way to define properties. This
example demonstrates the same temperature class using decorators.

decorator_property.py
  

class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        if value &lt; -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value

temp = Temperature(25)
print(temp.celsius)  # 25
temp.celsius = -100
print(temp.celsius)  # -100

The decorator syntax is more readable and groups related methods together. The
@property decorator creates the getter, while @celsius.setter
creates the setter.

This approach is preferred in modern Python code as it clearly shows which
methods belong to the property.

## Read-Only Property

Properties can create read-only attributes by omitting the setter. This example
shows a circle class with a computed read-only area property.

readonly_property.py
  

import math

class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    @property
    def area(self):
        return math.pi * self.radius ** 2

circle = Circle(5)
print(circle.area)  # 78.53981633974483
try:
    circle.area = 100  # Raises AttributeError
except AttributeError as e:
    print("Can't set area:", e)

The area property is computed from the radius and cannot be set
directly. Attempting to set it raises an AttributeError.

This pattern is useful for derived attributes that should only change when their
source attributes change.

## Property with Deleter

Properties can also define deleters for cleanup operations. This example shows
a file handler class with property-based resource management.

deleter_property.py
  

class FileHandler:
    def __init__(self, filename):
        self._filename = filename
        self._file = open(filename, 'r')
    
    @property
    def file(self):
        return self._file
    
    @file.deleter
    def file(self):
        if self._file:
            self._file.close()
            self._file = None

handler = FileHandler('example.txt')
print(handler.file.read(10))
del handler.file  # Closes the file

The deleter ensures proper resource cleanup when the property is deleted. This
is more explicit than relying on __del__ or context managers.

The property provides controlled access to the file object while maintaining
the ability to properly close it when needed.

## Dynamic Property

Properties can compute values dynamically from other attributes. This example
shows a rectangle class with dynamic width/height properties.

dynamic_property.py
  

class Rectangle:
    def __init__(self, x1, y1, x2, y2):
        self.x1, self.y1 = x1, y1
        self.x2, self.y2 = x2, y2
    
    @property
    def width(self):
        return abs(self.x2 - self.x1)
    
    @width.setter
    def width(self, value):
        if value &lt;= 0:
            raise ValueError("Width must be positive")
        self.x2 = self.x1 + value
    
    @property
    def height(self):
        return abs(self.y2 - self.y1)
    
    @height.setter
    def height(self, value):
        if value &lt;= 0:
            raise ValueError("Height must be positive")
        self.y2 = self.y1 + value

rect = Rectangle(0, 0, 10, 20)
print(rect.width, rect.height)  # 10 20
rect.width = 15
print(rect.width)  # 15

The width and height properties are computed from the coordinates but can also
be set, which updates the coordinates. This maintains data consistency.

This approach is useful when you want to present different views of the same
underlying data while keeping everything synchronized.

## Best Practices

- **Use for encapsulation:** Hide implementation details behind properties

- **Prefer decorator syntax:** For cleaner, more readable code

- **Document properties:** Include docstrings explaining behavior

- **Validate in setters:** Ensure data remains consistent

- **Consider performance:** Computed properties may impact performance

## Source References

- [Python property() Documentation](https://docs.python.org/3/library/functions.html#property)

- [Python Descriptor HowTo Guide](https://docs.python.org/3/howto/descriptor.html#properties)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).