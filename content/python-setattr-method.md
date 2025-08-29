+++
title = "Python __setattr__ Method"
date = 2025-08-29T20:08:24.045+01:00
draft = false
description = "Complete guide to Python's __setattr__ method covering attribute assignment control, validation, and dynamic attributes."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __setattr__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __setattr__ method, the
special method that controls attribute assignment. We'll cover basic usage,
attribute validation, dynamic attributes, and practical examples.

## Basic Definitions

The __setattr__ method is called when an attribute assignment is
attempted on an object. It intercepts all attribute assignments, including
those in __init__.

Key characteristics: it receives the attribute name and value as arguments,
must handle attribute storage manually, and can prevent or transform attribute
assignments. It's called for all attribute assignments.

## Basic __setattr__ Implementation

Here's a simple implementation showing how __setattr__ intercepts
attribute assignments. It demonstrates the basic structure and requirements.

basic_setattr.py
  

class Person:
    def __setattr__(self, name, value):
        print(f"Setting attribute {name} to {value}")
        super().__setattr__(name, value)

p = Person()
p.name = "Alice"
p.age = 30
print(p.name, p.age)

This example shows the basic pattern: print a message, then delegate to the
parent class's __setattr__ using super(). Without
this delegation, attributes wouldn't be stored.

The output shows the interception of both attribute assignments before they're
stored. This is the foundation for more advanced attribute control.

## Attribute Validation with __setattr__

__setattr__ can validate attribute values before allowing them to
be set, enforcing business rules or type constraints.

validation.py
  

class Temperature:
    def __setattr__(self, name, value):
        if name == "celsius":
            if not isinstance(value, (int, float)):
                raise TypeError("Temperature must be numeric")
            if value &lt; -273.15:
                raise ValueError("Temperature below absolute zero")
        super().__setattr__(name, value)

temp = Temperature()
temp.celsius = 25  # Valid
# temp.celsius = -300  # Raises ValueError
# temp.celsius = "hot"  # Raises TypeError

This temperature class validates that celsius values are numeric and above
absolute zero. Invalid assignments raise exceptions before storage occurs.

The validation happens before calling the parent's __setattr__,
preventing invalid states. This pattern is useful for domain models.

## Read-Only Attributes

__setattr__ can make certain attributes read-only by preventing
their modification after initial assignment.

readonly.py
  

class Constants:
    def __init__(self):
        super().__setattr__("_values", {})
        self._values["PI"] = 3.14159
    
    def __setattr__(self, name, value):
        if name in self._values:
            raise AttributeError(f"Cannot modify {name}")
        super().__setattr__(name, value)

const = Constants()
print(const._values["PI"])  # 3.14159
# const.PI = 3.14  # Raises AttributeError
const.E = 2.71828  # Allowed

This constants class stores protected values in a dictionary and prevents their
modification. New attributes can still be added normally.

The trick is using super().__setattr__ in __init__ to
bypass the custom __setattr__ for initial setup.

## Dynamic Attribute Creation

__setattr__ can dynamically transform attribute values or create
derived attributes when assignments occur.

dynamic.py
  

class CaseInsensitiveDict:
    def __setattr__(self, name, value):
        lower_name = name.lower()
        if lower_name == "data":
            super().__setattr__("data", {})
        else:
            self.data[lower_name] = value
    
    def __getattr__(self, name):
        return self.data.get(name.lower())

d = CaseInsensitiveDict()
d.Color = "blue"
d.COLOR = "red"
print(d.color)  # "red" (last assignment wins)

This dictionary-like object stores attributes case-insensitively. All assignments
go into a data dictionary using lowercase keys.

Note the special handling for the 'data' attribute itself, which needs to be
stored normally to avoid infinite recursion.

## Preventing Attribute Creation

__setattr__ can completely prevent new attribute creation, making
objects strictly follow a predefined schema.

prevent.py
  

class StrictPerson:
    __slots__ = ("name", "age")
    
    def __setattr__(self, name, value):
        if name not in self.__slots__:
            raise AttributeError(f"Cannot add attribute {name}")
        super().__setattr__(name, value)

p = StrictPerson()
p.name = "Bob"  # Allowed
p.age = 40      # Allowed
# p.email = "bob@example.com"  # Raises AttributeError

This class combines __slots__ with __setattr__ to
create a strictly controlled object. Only predefined attributes can be set.

The __slots__ declaration provides memory efficiency while
__setattr__ enforces the schema at runtime.

## Best Practices

- **Always call super().__setattr__:** Unless intentionally blocking storage

- **Avoid infinite recursion:** Use super() or direct __dict__ access carefully

- **Document behavior:** Clearly document any special assignment logic

- **Consider performance:** __setattr__ adds overhead to all assignments

- **Use @property when possible:** For simple cases, properties may be cleaner

## Source References

- [Python __setattr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__setattr__)

- [Python Descriptor HowTo](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).