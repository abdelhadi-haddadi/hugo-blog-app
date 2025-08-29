+++
title = "Python delattr Function"
date = 2025-08-29T20:07:55.736+01:00
draft = false
description = "Complete guide to Python's delattr function covering object attribute deletion, dynamic attribute handling, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python delattr Function

Last modified April 11, 2025

This comprehensive guide explores Python's delattr function, which
dynamically deletes attributes from objects. We'll cover basic usage, error
handling, and practical examples of attribute management.

## Basic Definitions

The delattr function removes a named attribute from an object. It
takes two arguments: the object and the attribute name as a string.

Key characteristics: works with any object that allows attribute deletion.
Equivalent to del object.attribute but with dynamic attribute
name specification.

## Basic Attribute Deletion

Here's simple usage showing how delattr removes attributes from
objects compared to the del statement.

basic_delattr.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)

# Using del statement
del p.age
print(hasattr(p, 'age'))  # False

# Using delattr
delattr(p, 'name')
print(hasattr(p, 'name'))  # False

This example shows two ways to delete attributes. The del statement
uses direct attribute access while delattr takes the attribute
name as a string.

Both methods achieve the same result but delattr is useful when
the attribute name is dynamic or comes from user input.

## Dynamic Attribute Management

delattr shines when working with dynamic attribute names. This
example demonstrates removing attributes based on runtime conditions.

dynamic_delattr.py
  

class Config:
    def __init__(self):
        self.debug = True
        self.log_level = "INFO"
        self.max_connections = 100

config = Config()

# Remove all attributes starting with 'max_'
for attr in list(vars(config)):
    if attr.startswith('max_'):
        delattr(config, attr)

print(hasattr(config, 'max_connections'))  # False

This code dynamically removes attributes matching a pattern. We use
vars() to get all attributes and delattr to delete
them.

This approach is useful for configuration management or when cleaning up
objects based on naming conventions.

## Error Handling

delattr raises AttributeError when trying to delete
non-existent attributes. This example shows proper error handling.

error_handling.py
  

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

p = Product("Laptop", 999.99)

try:
    delattr(p, 'discount')
except AttributeError as e:
    print(f"Error: {e}")  # discount

# Safe deletion with hasattr check
if hasattr(p, 'warranty'):
    delattr(p, 'warranty')
else:
    print("warranty attribute doesn't exist")

The first attempt raises an error because 'discount' doesn't exist. The second
approach safely checks before deletion.

Always consider whether to handle missing attributes gracefully or let the
exception propagate.

## Working with Properties

This example shows how delattr interacts with Python properties
and the __delattr__ special method.

properties.py
  

class Account:
    def __init__(self, balance):
        self._balance = balance
    
    @property
    def balance(self):
        return self._balance
    
    @balance.setter
    def balance(self, value):
        self._balance = value
    
    @balance.deleter
    def balance(self):
        print("Balance deletion requested")
        del self._balance
    
    def __delattr__(self, name):
        print(f"Deleting {name}")
        super().__delattr__(name)

acc = Account(1000)
delattr(acc, 'balance')  # Triggers property deleter and __delattr__

When deleting a property, Python first calls the property's deleter method.
Then it calls __delattr__ if defined.

The output shows both the property deleter message and the __delattr__
message, demonstrating the call sequence.

## Slots and Immutable Objects

This example explores delattr behavior with __slots__
and immutable types like tuples.

slots.py
  

class Point:
    __slots__ = ['x', 'y']
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
delattr(p, 'x')  # Works
print(hasattr(p, 'x'))  # False

try:
    delattr(p, 'z')
except AttributeError as e:
    print(f"Error: {e}")  # z

# With immutable types
t = (1, 2, 3)
try:
    delattr(t, 'index')
except AttributeError as e:
    print(f"Error: {e}")  # 'tuple' object has no attribute 'index'

__slots__ allows attribute deletion but prevents adding new
attributes. Built-in immutable types don't support attribute deletion at all.

This demonstrates how object mutability and __slots__ affect
delattr behavior.

## Best Practices

- **Prefer del for known attributes:** Use direct del when attribute names are fixed

- **Use delattr for dynamic cases:** When attribute names come from variables or input

- **Check before deletion:** Use hasattr when unsure about attribute existence

- **Implement __delattr__ carefully:** For custom attribute deletion behavior

- **Document deletion effects:** Especially when using properties or custom deleters

## Source References

- [Python delattr() Documentation](https://docs.python.org/3/library/functions.html#delattr)

- [Python __delattr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__delattr__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).