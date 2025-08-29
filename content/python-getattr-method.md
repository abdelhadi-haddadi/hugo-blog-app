+++
title = "Python __getattr__ Method"
date = 2025-08-29T20:08:10.557+01:00
draft = false
description = "Complete guide to Python's __getattr__ method covering dynamic attribute access, fallback mechanisms, and proxy patterns."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __getattr__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __getattr__ method, the
special method for handling attribute access. We'll cover basic usage, dynamic
attributes, fallback mechanisms, proxy patterns, and practical examples.

## Basic Definitions

The __getattr__ method is called when an attribute lookup fails.
It serves as a fallback mechanism for attribute access. The method takes the
attribute name as argument and should return a value or raise AttributeError.

Key characteristics: it's only called for missing attributes, can dynamically
compute values, and is part of Python's attribute access protocol. It differs
from __getattribute__ which intercepts all attribute access.

## Basic __getattr__ Implementation

Here's a simple implementation showing how __getattr__ works as
a fallback for missing attributes. It demonstrates the basic syntax and behavior.

basic_getattr.py
  

class DynamicAttributes:
    def __getattr__(self, name):
        if name == 'color':
            return 'blue'
        raise AttributeError(f"'DynamicAttributes' has no attribute '{name}'")

obj = DynamicAttributes()
print(obj.color)  # 'blue'
# print(obj.size)  # Raises AttributeError

This example shows __getattr__ handling requests for undefined
attributes. When 'color' is accessed, it returns 'blue'. Other names raise
AttributeError as recommended.

The method receives the attribute name as a string. You can implement any logic
to compute or fetch the value. Always raise AttributeError for invalid names.

## Dynamic Attribute Computation

__getattr__ can compute attributes dynamically based on patterns
or naming conventions. This is useful for APIs with predictable attribute names.

dynamic_computation.py
  

class DynamicCalculator:
    def __getattr__(self, name):
        if name.startswith('calc_'):
            operation = name[5:]
            def calculator(*args):
                return f"Calculated {operation} of {args}"
            return calculator
        raise AttributeError(f"No such attribute: {name}")

calc = DynamicCalculator()
print(calc.calc_sum(1, 2, 3))  # "Calculated sum of (1, 2, 3)"
print(calc.calc_product(4, 5)) # "Calculated product of (4, 5)"

This class dynamically creates calculation methods based on attribute names
starting with 'calc_'. The returned functions use the operation name in their
output.

The example demonstrates how __getattr__ can create and return
functions on demand. This pattern is used in many ORMs and API wrappers.

## Lazy Attribute Loading

__getattr__ can implement lazy loading of expensive resources,
fetching them only when first accessed and caching for future use.

lazy_loading.py
  

class LazyLoader:
    def __init__(self):
        self._cache = {}
    
    def __getattr__(self, name):
        if name not in self._cache:
            print(f"Loading {name}...")
            self._cache[name] = f"Value of {name}"
        return self._cache[name]

loader = LazyLoader()
print(loader.data1)  # "Loading data1..." then "Value of data1"
print(loader.data1)  # "Value of data1" (from cache)

This implementation loads attributes only when first accessed and stores them
in a cache dictionary. Subsequent accesses return the cached value.

The pattern is useful for expensive operations like database connections or
file loading. It optimizes performance by deferring work until needed.

## Proxy Pattern Implementation

__getattr__ can forward attribute access to another object,
implementing the proxy pattern. This is useful for wrappers and decorators.

proxy_pattern.py
  

class Proxy:
    def __init__(self, target):
        self._target = target
    
    def __getattr__(self, name):
        return getattr(self._target, name)

class Target:
    def __init__(self, value):
        self.value = value
    def method(self):
        return f"Target method: {self.value}"

target = Target(42)
proxy = Proxy(target)
print(proxy.value)   # 42
print(proxy.method()) # "Target method: 42"

The Proxy class forwards all attribute access to its target object using
getattr. This creates a transparent wrapper around the target.

Proxies can add behavior before/after forwarding calls. This pattern is used
in mock objects, remoting, and access control systems.

## Dictionary-like Attribute Access

__getattr__ can provide dictionary-like access to data while
maintaining object syntax. This creates a hybrid object-dictionary interface.

dict_access.py
  

class DictLikeObject:
    def __init__(self, data):
        self._data = data
    
    def __getattr__(self, name):
        if name in self._data:
            return self._data[name]
        raise AttributeError(f"No attribute or key '{name}'")

data = {'name': 'Alice', 'age': 30, 'city': 'London'}
obj = DictLikeObject(data)
print(obj.name)  # 'Alice'
print(obj.age)   # 30
# print(obj.job) # Raises AttributeError

This class wraps a dictionary and exposes its keys as attributes. It combines
dictionary storage with object access syntax.

The implementation checks the dictionary before raising AttributeError. This
pattern is used in configuration systems and JSON object wrappers.

## Best Practices

- **Raise AttributeError for missing attributes:** Follow Python's convention

- **Keep it simple:** Complex logic can make code hard to debug

- **Document dynamic attributes:** Help users know what's available

- **Consider performance:** __getattr__ is slower than regular attributes

- **Use __dir__:** Implement __dir__ to help with introspection

## Source References

- [Python __getattr__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__getattr__)

- [Python Attribute Access Docs](https://docs.python.org/3/reference/datamodel.html#customizing-attribute-access)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).