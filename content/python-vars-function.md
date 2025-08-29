+++
title = "Python vars Function"
date = 2025-08-29T20:11:10.562+01:00
draft = false
description = "Complete guide to Python's vars function covering object attributes, module namespaces, and practical examples of introspection."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python vars Function

Last modified April 11, 2025

This comprehensive guide explores Python's vars function, which
returns the __dict__ attribute of an object. We'll cover objects,
modules, namespaces, and practical examples of attribute introspection.

## Basic Definitions

The vars function returns the __dict__ attribute of
an object when called with an argument. Without arguments, it behaves like
locals().

Key characteristics: works with objects having __dict__ attribute,
modules, and classes. Returns a dictionary of namespace symbols when called
without arguments.

## Basic Object Usage

Here's simple usage with different objects showing how vars
accesses their attributes through the __dict__ attribute.

basic_vars.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("John", 30)
print(vars(p))  # {'name': 'John', 'age': 30}

# Adding a new attribute
p.job = "Developer"
print(vars(p))  # {'name': 'John', 'age': 30, 'job': 'Developer'}

This example shows vars with a custom object. It returns a
dictionary of instance attributes. When we add a new attribute, it appears
in subsequent vars calls.

The output matches the object's __dict__ attribute, which stores
the instance's writable attributes.

## Module Namespace Inspection

vars can inspect module namespaces, showing all defined symbols.
This example demonstrates module introspection.

module_vars.py
  

import math

# Get module attributes
math_vars = vars(math)
print("PI:", math_vars['pi'])  # PI: 3.141592653589793
print("Square root function:", math_vars['sqrt'])  # &lt;built-in function sqrt&gt;

# Filter constants only
constants = {k:v for k,v in math_vars.items() if not callable(v)}
print("Math constants:", constants.keys())

This shows how vars can access a module's namespace. We can
retrieve specific values or filter attributes by type.

Module namespaces contain both functions and constants, which we can separate
using dictionary comprehension.

## Class Attributes

vars can inspect class attributes, showing both class-level and
instance-level attributes when used properly.

class_vars.py
  

class Vehicle:
    wheels = 4  # Class attribute
    
    def __init__(self, color):
        self.color = color  # Instance attribute

print("Class vars:", vars(Vehicle))  # Includes wheels
car = Vehicle("red")
print("Instance vars:", vars(car))   # Only color

The example demonstrates the difference between class and instance attributes.
Class attributes appear in vars(Vehicle), while instance attributes
appear in vars(car).

This distinction is important when working with class hierarchies and attribute
lookup chains.

## No Arguments Behavior

When called without arguments, vars returns the local namespace,
similar to locals(). This example shows the behavior.

no_args_vars.py
  

def test_function():
    x = 10
    y = 20
    print("Local vars:", vars())

test_function()  # Shows x and y in local namespace

# At module level
a = 100
b = 200
print("Module vars:", vars())  # Shows a, b, and other module-level names

This demonstrates vars() returning the current local namespace.
In functions, it shows local variables. At module level, it shows global
variables.

The behavior is identical to locals() but less commonly used in
this form.

## Error Cases

vars raises TypeError when used with objects that
don't have __dict__. This example shows proper error handling.

errors.py
  

# Built-in types typically don't have __dict__
try:
    print(vars(10))
except TypeError as e:
    print(f"Error: {e}")  # vars() argument must have __dict__ attribute

class NoDict:
    __slots__ = ['x']  # Uses slots instead of __dict__

try:
    nd = NoDict()
    print(vars(nd))
except TypeError as e:
    print(f"Error: {e}")  # vars() argument must have __dict__ attribute

These examples demonstrate vars's behavior with unsupported types.
Built-in types and classes with __slots__ typically don't support
vars.

To check if an object supports vars, you can use
hasattr(obj, '__dict__').

## Best Practices

- **Prefer direct attribute access:** Use dot notation when you know attribute names

- **Use for debugging:** vars is great for inspecting objects during development

- **Combine with dir():** dir() shows all attributes while vars shows the __dict__

- **Handle errors:** Catch TypeError when object type is uncertain

- **Document usage:** Clearly document when your code relies on vars

## Source References

- [Python vars() Documentation](https://docs.python.org/3/library/functions.html#vars)

- [Python __dict__ Documentation](https://docs.python.org/3/library/stdtypes.html#object.__dict__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).