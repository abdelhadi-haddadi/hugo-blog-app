+++
title = "Python dir Function"
date = 2025-08-29T20:07:57.954+01:00
draft = false
description = "Complete guide to Python's dir function covering object introspection, attribute listing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python dir Function

Last modified April 11, 2025

This comprehensive guide explores Python's dir function, which
returns a list of valid attributes for an object. We'll cover basic usage,
custom objects, and practical examples of object introspection.

## Basic Definitions

The dir function returns a sorted list of names in the current
local scope or attributes of an object. Without arguments, it lists names in
the current scope.

Key characteristics: returns strings, works with any object, includes special
methods (dunder methods), and can be customized via __dir__.

## Basic Usage Without Arguments

When called without arguments, dir lists names in the current
local scope. This example shows its behavior in different contexts.

basic_dir.py
  

# In global scope
print(dir())  # Lists global names (like '__name__', '__doc__', etc.)

def test_function():
    x = 10
    y = 20
    print(dir())  # Lists local names ('x', 'y')

test_function()

The first dir() call shows global names, while the one inside
the function shows local variables. This helps debug scope issues.

Note that built-in names aren't included by default. Use dir(__builtins__)
to see them.

## Inspecting Module Contents

dir is commonly used to explore module contents. This example
shows how to inspect the math module's attributes.

module_inspection.py
  

import math

# Get all attributes of math module
math_attrs = dir(math)
print(math_attrs[:10])  # First 10 attributes

# Filter out dunder methods
public_attrs = [attr for attr in math_attrs if not attr.startswith('__')]
print(public_attrs[:5])  # ['acos', 'acosh', 'asin', 'asinh', 'atan']

This lists all attributes in the math module, then filters to
show only public ones. It's useful for discovering module functionality.

The example demonstrates how to process dir output to focus on
relevant attributes.

## Custom Objects with __dir__

You can customize dir's output by implementing __dir__
in your class. This example creates a custom class.

custom_dir.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __dir__(self):
        return ['name', 'age', 'greet']
    
    def greet(self):
        return f"Hello, I'm {self.name}"

p = Person("Alice", 30)
print(dir(p))  # ['age', 'greet', 'name']

The Person__dir__ to control which
attributes are listed. This provides a cleaner interface for users.

Note that __dir__ should return a list of strings, and Python
will sort the output automatically.

## Exploring Object Hierarchy

dir reveals inheritance structure by showing attributes from all
parent classes. This example demonstrates inheritance introspection.

inheritance.py
  

class Animal:
    def __init__(self, species):
        self.species = species
    
    def eat(self):
        print("Eating...")

class Dog(Animal):
    def __init__(self, name):
        super().__init__("Canine")
        self.name = name
    
    def bark(self):
        print("Woof!")

d = Dog("Rex")
print(dir(d))  # Includes Animal and Dog attributes

The output shows attributes from both Dog and its parent
Animal. This helps understand complex class hierarchies.

Special methods (like __init__) from all ancestors are also
included in the list.

## Filtering dir Output

This example shows how to filter and analyze dir output to find
specific types of attributes.

filter_dir.py
  

class Example:
    def __init__(self):
        self.public = 1
        self._protected = 2
        self.__private = 3
    
    def method(self):
        pass
    
    @property
    def prop(self):
        return self.public

e = Example()

# Get all attributes
attrs = dir(e)

# Filter by type
methods = [a for a in attrs if callable(getattr(e, a))]
properties = [a for a in attrs if isinstance(getattr(type(e), a, None), property)]
private = [a for a in attrs if a.startswith('_Example__')]

print("Methods:", methods)
print("Properties:", properties)
print("Name-mangled private:", private)

This demonstrates advanced dir usage to categorize attributes.
We filter for methods, properties, and name-mangled private attributes.

Such analysis is useful for metaprogramming, documentation generation, and
debugging complex objects.

## Best Practices

- **Use for exploration:** Great for interactive debugging and learning

- **Combine with help():** Use dir to find attributes then help to learn about them

- **Implement __dir__:** For cleaner interfaces in custom classes

- **Filter output:** Process results to focus on relevant attributes

- **Document behavior:** Clearly document any __dir__ customizations

## Source References

- [Python dir() Documentation](https://docs.python.org/3/library/functions.html#dir)

- [Python __dir__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__dir__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).