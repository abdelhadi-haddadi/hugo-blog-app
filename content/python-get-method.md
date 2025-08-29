+++
title = "Python __get__ Method"
date = 2025-08-29T20:08:09.443+01:00
draft = false
description = "Complete guide to Python's __get__ method covering descriptors, attribute access, and property implementation."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __get__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __get__ method, the
special method at the heart of descriptors. We'll cover basic usage,
property implementation, method binding, and practical examples.

## Basic Definitions

The __get__ method is part of Python's descriptor protocol. It is
called when accessing an attribute that is a descriptor. Descriptors enable
custom attribute access.

Key characteristics: it takes three parameters (self, instance,
and owner), returns the attribute value, and is used to implement
properties, methods, and other attribute access patterns.

## Basic Descriptor Implementation

Here's a simple descriptor showing __get__ in action. It logs
attribute access while maintaining normal behavior.

basic_get.py
  

class LoggedAccess:
    def __init__(self, value):
        self.value = value
    
    def __get__(self, instance, owner):
        print(f"Accessing {self.value} from {instance}")
        return self.value

class MyClass:
    attr = LoggedAccess(42)

obj = MyClass()
print(obj.attr)  # Prints access message and returns 42

This example demonstrates the basic descriptor pattern. When obj.attr
is accessed, Python calls LoggedAccess.__get__ with the instance
and owner class.

The instance parameter is None when accessed through the class
rather than an instance. The owner parameter is the class where
the descriptor is defined.

## Implementing a Property

The property built-in is implemented using descriptors. Here's how
to create a property-like descriptor with __get__.

property_descriptor.py
  

class MyProperty:
    def __init__(self, getter):
        self.getter = getter
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return self.getter(instance)

class Circle:
    def __init__(self, radius):
        self.radius = radius
    
    @MyProperty
    def diameter(self):
        return self.radius * 2

circle = Circle(5)
print(circle.diameter)  # 10

This custom property descriptor stores the getter function and calls it when the
attribute is accessed. The instance is None check handles class
access.

The @MyProperty decorator works similarly to @property,
showing how Python's property system is built on descriptors.

## Method Binding with __get__

Python uses __get__ to implement method binding. Here's how to
simulate method binding behavior.

method_binding.py
  

class Method:
    def __init__(self, func):
        self.func = func
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        from functools import partial
        return partial(self.func, instance)

class MyClass:
    def __init__(self, value):
        self.value = value
    
    @Method
    def show(self):
        print(f"Value: {self.value}")

obj = MyClass(10)
obj.show()  # Value: 10

This example shows how Python binds methods to instances. When a method is
accessed, __get__ returns a partial function with the instance
bound as first argument.

The partial function from functools creates a new
function with the instance pre-bound, simulating Python's method binding.

## Cached Property Descriptor

Here's a practical descriptor that caches computed properties after first access,
optimizing performance for expensive calculations.

cached_property.py
  

class CachedProperty:
    def __init__(self, func):
        self.func = func
        self.cache_name = f"_cache_{func.__name__}"
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        if not hasattr(instance, self.cache_name):
            setattr(instance, self.cache_name, self.func(instance))
        return getattr(instance, self.cache_name)

class Data:
    def __init__(self, data):
        self.data = data
    
    @CachedProperty
    def processed_data(self):
        print("Processing data...")
        return [x * 2 for x in self.data]

d = Data([1, 2, 3])
print(d.processed_data)  # Processes and prints
print(d.processed_data)  # Returns cached value

This descriptor stores computed values in the instance's namespace. Subsequent
accesses return the cached value instead of recalculating.

The cache name is generated dynamically to avoid collisions. This pattern is
useful for expensive computations that don't change after first access.

## Type Checking Descriptor

Descriptors can enforce type checking on attribute access. This example ensures
an attribute always has a specific type.

type_checking.py
  

class Typed:
    def __init__(self, name, expected_type):
        self.name = name
        self.expected_type = expected_type
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__[self.name]
    
    def __set__(self, instance, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"Expected {self.expected_type}")
        instance.__dict__[self.name] = value

class Person:
    name = Typed("name", str)
    age = Typed("age", int)
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)
# p.age = "thirty"  # Raises TypeError

This descriptor stores values in the instance's __dict__ while
enforcing type constraints. The __get__ method retrieves the
stored value.

The descriptor maintains the actual data in the instance's dictionary while
controlling access through the descriptor protocol.

## Best Practices

- **Handle instance=None:** Always check for class-level access

- **Store instance data properly:** Use instance.__dict__ to avoid infinite recursion

- **Document descriptor behavior:** Clearly explain expected behavior

- **Consider performance:** Descriptors add overhead to attribute access

- **Use existing tools when possible:** Prefer @property for simple cases

## Source References

- [Python Descriptor Documentation](https://docs.python.org/3/reference/datamodel.html#descriptor-invocation)

- [Python Descriptor HowTo Guide](https://docs.python.org/3/howto/descriptor.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).