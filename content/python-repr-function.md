+++
title = "Python repr Function"
date = 2025-08-29T20:10:16.237+01:00
draft = false
description = "Complete guide to Python's repr function covering basic usage, custom objects, and practical examples of string representations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python repr Function

Last modified April 11, 2025

This comprehensive guide explores Python's repr function, which
returns a string representation of an object. We'll cover basic usage, custom
objects, and practical examples of creating unambiguous object representations.

## Basic Definitions

The repr function returns a string containing a printable
representation of an object. It aims to be unambiguous and often looks like
valid Python code to recreate the object.

Key characteristics: meant for debugging, often returns valid Python code,
used by Python when printing objects in containers, and calls the object's
__repr__ method.

## Basic Usage with Built-in Types

Here's simple usage with different built-in types showing how repr
creates string representations of common Python objects.

basic_repr.py
  

# With numbers
print(repr(42))       # '42'
print(repr(3.14))      # '3.14'

# With strings
print(repr('hello'))   # "'hello'"
print(repr("world"))   # '"world"'

# With containers
print(repr([1, 2, 3])) # '[1, 2, 3]'
print(repr({'a': 1}))  # "{'a': 1}"

This example shows repr with different built-in types. For
numbers, it returns the number as a string. For strings, it adds quotes.

The string representation includes the quotes themselves, making it clear
it's a string. For containers, it shows the complete syntax to recreate them.

## Difference Between repr and str

This example demonstrates the key differences between repr and
str representations of objects.

repr_vs_str.py
  

import datetime

now = datetime.datetime.now()

print(str(now))   # '2025-04-11 14:30:15.123456'
print(repr(now))  # 'datetime.datetime(2025, 4, 11, 14, 30, 15, 123456)'

class Example:
    def __str__(self):
        return "User-friendly string"
    
    def __repr__(self):
        return "Example()"

e = Example()
print(str(e))   # 'User-friendly string'
print(repr(e))  # 'Example()'

The datetime example shows str provides a readable format while
repr shows how to recreate the object. The custom class shows
the same distinction.

repr is meant for developers while str is for end
users. When printing containers, Python uses repr for elements.

## Custom Objects with __repr__

You can make custom objects work properly with repr by
implementing the __repr__ special method.

custom_repr.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    
    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(repr(p))  # 'Point(3, 4)'
print(str(p))   # '(3, 4)'
print([p])      # [Point(3, 4)]

The Point class implements both __repr__ and __str__.
repr shows how to recreate the object while str
shows a simplified version.

When the point is in a list, Python uses repr for its
representation, demonstrating why __repr__ is important.

## Debugging with repr

This example shows how repr can be useful for debugging by
providing more detailed object information.

debugging.py
  

data = {
    'name': 'Alice',
    'age': 30,
    'scores': [95, 88, 92],
    'active': True
}

print("Debug output:")
print(repr(data))

# Output shows the complete structure with types:
# {'name': 'Alice', 'age': 30, 'scores': [95, 88, 92], 'active': True}

user_input = "Hello\nWorld"
print("User input representation:")
print(repr(user_input))  # Shows the newline character: 'Hello\nWorld'

The dictionary example shows how repr displays the complete
structure with all types visible. This is invaluable for debugging.

The string example demonstrates how repr makes special characters
visible, unlike regular printing which would show an actual newline.

## Error Handling

While repr generally works with all objects, this example shows
edge cases and how to handle them.

errors.py
  

class BadRepr:
    def __repr__(self):
        raise Exception("Broken repr")

try:
    print(repr(BadRepr()))
except Exception as e:
    print(f"Error in repr: {e}")

# Default repr behavior
class NoRepr:
    pass

print(repr(NoRepr()))  # Shows default object representation

The first example shows what happens when __repr__ raises an
exception. The second shows the default representation when no __repr__
is defined.

The default representation includes the class name and memory address, which
is better than nothing but not as useful as a custom implementation.

## Best Practices

- **Implement __repr__:** For all classes you create

- **Make it unambiguous:** Representation should clearly show object state

- **Aim for recreatable:** Ideal repr is valid Python code to recreate object

- **Include all state:** Don't omit important attributes

- **Differentiate from str:** repr for developers, str for users

## Source References

- [Python repr() Documentation](https://docs.python.org/3/library/functions.html#repr)

- [Python __repr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__repr__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).