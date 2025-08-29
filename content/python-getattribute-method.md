+++
title = "Python __getattribute__ Method"
date = 2025-08-29T20:08:10.560+01:00
draft = false
description = "Complete guide to Python's __getattribute__ method covering attribute access, descriptors, properties, and customization."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __getattribute__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __getattribute__ method,
the special method that controls attribute access. We'll cover basic usage,
inheritance, descriptors, properties, and practical examples.

## Basic Definitions

The __getattribute__ method is called unconditionally for every
attribute access attempt on an object. It intercepts all attribute lookups,
including method calls and instance variable access.

Key characteristics: it must accept self and the attribute name as
arguments, returns the attribute value, and raises AttributeError
for missing attributes. It has higher priority than __getattr__.

## Basic __getattribute__ Implementation

Here's a simple implementation showing how __getattribute__
intercepts all attribute access. It demonstrates the basic structure and
required behavior.

basic_getattribute.py
  

class Logger:
    def __init__(self, name):
        self.name = name
    
    def __getattribute__(self, attr):
        print(f"Accessing attribute '{attr}'")
        return super().__getattribute__(attr)

obj = Logger("test")
print(obj.name)  # Logs access and prints "test"
# obj.missing     # Logs access and raises AttributeError

This example logs every attribute access. The super().__getattribute__
call is crucial - it performs the actual attribute lookup using the parent
class's method.

Without calling the parent's implementation, you'd create an infinite recursion
because every attribute access (including to super) would trigger
__getattribute__ again.

## Attribute Access Control

__getattribute__ can implement attribute access control by
validating requests before allowing access to sensitive attributes.

access_control.py
  

class SecureData:
    def __init__(self):
        self.public = "Open data"
        self._secret = "Confidential"
    
    def __getattribute__(self, attr):
        if attr.startswith('_'):
            raise AttributeError(f"Access to '{attr}' is restricted")
        return super().__getattribute__(attr)

data = SecureData()
print(data.public)  # Works
# print(data._secret)  # Raises AttributeError

This class prevents access to any attribute starting with underscore by raising
AttributeError. This pattern is useful for enforcing access
restrictions on private attributes.

Note that this doesn't make attributes truly private - they can still be accessed
via object.__getattribute__(instance, '_secret') or through the
instance's __dict__.

## Virtual Attributes with __getattribute__

__getattribute__ can create virtual attributes that don't exist as
instance variables but are computed on demand.

virtual_attributes.py
  

class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    def __getattribute__(self, attr):
        if attr == 'area':
            import math
            r = super().__getattribute__('radius')
            return math.pi * r ** 2
        return super().__getattribute__(attr)

c = Circle(5)
print(c.area)  # Computes and returns 78.53981633974483
print(c.radius)  # Returns stored value 5

This circle class computes the area dynamically when accessed, without storing
it as an instance variable. The radius is still stored and accessed normally.

For simple computed properties, Python's @property decorator is
often cleaner. __getattribute__ is better for more complex cases
or when you need to handle many virtual attributes dynamically.

## Debugging Attribute Access

__getattribute__ can be used to debug attribute access patterns,
helping identify performance bottlenecks or unexpected attribute usage.

debugging.py
  

class DebugAttributes:
    def __init__(self):
        self.x = 10
        self.y = 20
    
    def __getattribute__(self, attr):
        import inspect
        caller = inspect.currentframe().f_back
        print(f"Attribute '{attr}' accessed from {caller.f_code.co_filename}:{caller.f_lineno}")
        return super().__getattribute__(attr)

dbg = DebugAttributes()
dbg.x + dbg.y  # Logs both accesses with locations

This class logs not only which attributes are accessed but also where in the
code the access originated. The inspect module provides caller
information.

This technique is valuable for debugging complex systems where attribute access
patterns are unclear or when tracking down performance issues from excessive
attribute lookups.

## Combining with __setattr__

__getattribute__ often works with __setattr__ to
create fully controlled attribute access, implementing read-only attributes or
validation.

combined.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __getattribute__(self, attr):
        if attr == 'fahrenheit':
            c = super().__getattribute__('celsius')
            return c * 9/5 + 32
        return super().__getattribute__(attr)
    
    def __setattr__(self, attr, value):
        if attr == 'fahrenheit':
            self.celsius = (value - 32) * 5/9
        else:
            super().__setattr__(attr, value)

temp = Temperature(0)
print(temp.fahrenheit)  # 32.0
temp.fahrenheit = 212
print(temp.celsius)     # 100.0

This temperature class maintains temperature in Celsius but provides virtual
fahrenheit properties that convert on access and update the Celsius value when
set. Both get and set operations are intercepted.

The pattern demonstrates how to maintain data consistency across multiple
representations of the same underlying data while providing a clean interface.

## Best Practices

- **Always call super().__getattribute__:** Prevents infinite recursion

- **Handle AttributeError carefully:** Missing attributes should raise it

- **Consider performance:** Called for every attribute access

- **Document behavior:** Clearly document any special access logic

- **Prefer properties for simple cases:** Use __getattribute__ for complex needs

## Source References

- [Python __getattribute__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__getattribute__)

- [Python Descriptor HowTo](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).