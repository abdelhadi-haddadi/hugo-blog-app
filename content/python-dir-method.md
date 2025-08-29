+++
title = "Python __dir__ Method"
date = 2025-08-29T20:08:06.074+01:00
draft = false
description = "Complete guide to Python's __dir__ method covering attribute listing, customization, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __dir__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __dir__ method, the
special method that customizes attribute listing. We'll cover basic usage,
custom implementations, inheritance behavior, and practical examples.

## Basic Definitions

The __dir__ method returns a list of valid attributes for an
object. It is called by the built-in dir() function to get the
object's attribute names.

Key characteristics: it should return a list of strings, helps with
introspection, and can be overridden to customize attribute visibility. When
not defined, Python provides a default implementation.

## Basic __dir__ Implementation

Here's a simple class implementing __dir__ to demonstrate its
basic behavior. This shows how it interacts with the dir()
function.

basic_dir.py
  

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def __dir__(self):
        return ['name', 'age', 'greet']
    
    def greet(self):
        return f"Hello, I'm {self.name}"

p = Person("Alice", 30)
print(dir(p))  # Shows ['age', 'greet', 'name']

This example shows a custom __dir__ implementation that explicitly
lists available attributes. The output matches the returned list, regardless of
other attributes that might exist.

Note that the default implementation would include more attributes like
__class__ and __dict__. Our custom version limits
visibility to just the specified names.

## Combining With Default Attributes

Often you'll want to include both custom attributes and Python's default
attributes. This example shows how to combine them.

combined_dir.py
  

class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    
    def __dir__(self):
        # Get default attributes
        default = super().__dir__()
        # Add our custom attributes
        custom = ['make', 'model', 'info']
        return sorted(set(default + custom))
    
    def info(self):
        return f"{self.make} {self.model}"

v = Vehicle("Toyota", "Corolla")
print(dir(v))  # Includes both default and custom attributes

This implementation first gets the default attributes using super().__dir__(),
then combines them with custom attributes. The set() ensures no
duplicates, and sorted() provides consistent ordering.

This pattern is useful when you want to maintain standard Python behavior while
adding specific attributes to the listing.

## Dynamic Attribute Listing

__dir__ can generate attribute names dynamically based on object
state or other conditions. This example shows dynamic attribute generation.

dynamic_dir.py
  

class Config:
    def __init__(self):
        self._settings = {
            'debug': False,
            'log_level': 'INFO',
            'timeout': 30
        }
    
    def __dir__(self):
        base = super().__dir__()
        settings = [f"get_{k}" for k in self._settings]
        settings += [f"set_{k}" for k in self._settings]
        return sorted(set(base + settings))
    
    def __getattr__(self, name):
        if name.startswith('get_'):
            key = name[4:]
            return lambda: self._settings.get(key)
        elif name.startswith('set_'):
            key = name[4:]
            return lambda v: self._settings.update({key: v})
        raise AttributeError(name)

c = Config()
print(dir(c))  # Shows get_* and set_* methods for each setting

This Config__dir__ lists these dynamic methods to make
them discoverable through dir() and IDE autocompletion.

The __getattr__ method handles the actual attribute access, while
__dir__ ensures these dynamic attributes appear in listings.

## Filtering Attributes

__dir__ can also filter attributes to hide implementation details
or sensitive data from the attribute listing.

filtered_dir.py
  

class SecureData:
    def __init__(self, public, secret):
        self.public_data = public
        self._secret_data = secret
    
    def __dir__(self):
        return [attr for attr in super().__dir__() 
                if not attr.startswith('_') or attr == '__dir__']

sd = SecureData("Open info", "Top secret")
print(dir(sd))  # Doesn't show _secret_data

This implementation filters out most names starting with underscores (considered
private in Python), except for special methods like __dir__ itself.

This pattern is useful for creating cleaner public interfaces while keeping
internal implementation details hidden from casual inspection.

## Inheritance Behavior

This example demonstrates how __dir__ behaves with inheritance and
how to properly extend it in subclasses.

inheritance_dir.py
  

class Base:
    def __dir__(self):
        return ['base_attr', 'common_method']

class Derived(Base):
    def __init__(self):
        self.derived_attr = "value"
    
    def __dir__(self):
        base_attrs = super().__dir__()
        derived_attrs = ['derived_attr', 'new_method']
        return sorted(set(base_attrs + derived_attrs))
    
    def new_method(self):
        pass

d = Derived()
print(dir(d))  # Shows attributes from both classes

The Derived class combines its own attributes with those from the
Base class. Using super().__dir__() ensures proper
inheritance behavior.

This pattern is important when creating class hierarchies where each class adds
its own attributes to those provided by parent classes.

## Best Practices

- **Maintain consistency:** Ensure __dir__ matches actual accessible attributes

- **Include special methods:** Consider including important dunder methods

- **Preserve defaults:** Combine with super().__dir__() when appropriate

- **Keep it current:** Reflect dynamic attribute changes in __dir__

- **Document behavior:** Note any special filtering or additions

## Source References

- [Python __dir__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__dir__)

- [Python dir() Function Docs](https://docs.python.org/3/library/functions.html#dir)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).