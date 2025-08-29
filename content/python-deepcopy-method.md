+++
title = "Python __deepcopy__ Method"
date = 2025-08-29T20:08:04.953+01:00
draft = false
description = "Complete guide to Python's __deepcopy__ method covering deep copying, custom copy behavior, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __deepcopy__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __deepcopy__ method, the
special method that enables custom deep copying behavior for objects. We'll cover
basic usage, implementation patterns, and practical examples.

## Basic Definitions

The __deepcopy__ method is called by copy.deepcopy()
to implement deep copy operations. It must define how to create a deep copy of
an object, including all nested objects.

Key characteristics: it accepts a memo dictionary to handle circular references,
returns a new independent copy of the object, and should recursively deep copy
all mutable attributes. It gives full control over the deep copying process.

## Basic __deepcopy__ Implementation

Here's a simple implementation showing how __deepcopy__ works with
the copy module. It demonstrates the basic structure and memo usage.

basic_deepcopy.py
  

import copy

class Box:
    def __init__(self, items):
        self.items = items
    
    def __deepcopy__(self, memo):
        print("Performing deep copy of Box")
        new_items = copy.deepcopy(self.items, memo)
        new_box = Box(new_items)
        memo[id(self)] = new_box
        return new_box

original = Box([[1, 2], [3, 4]])
copied = copy.deepcopy(original)
print(copied.items)

This example shows a Box class with a nested list. The __deepcopy__
method creates a new Box with a deep copy of its items. The memo dictionary
helps prevent infinite recursion with circular references.

The method first creates a deep copy of the items, then creates a new Box
instance with these copied items. The original and copied objects are completely
independent.

## Handling Circular References

The memo dictionary in __deepcopy__ helps handle circular
references by tracking already copied objects. This prevents infinite recursion.

circular_reference.py
  

import copy

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
    
    def __deepcopy__(self, memo):
        if id(self) in memo:
            return memo[id(self)]
            
        print(f"Copying node {self.value}")
        new_node = Node(copy.deepcopy(self.value, memo))
        memo[id(self)] = new_node
        new_node.next = copy.deepcopy(self.next, memo)
        return new_node

# Create circular reference
node1 = Node(1)
node2 = Node(2)
node1.next = node2
node2.next = node1

copied = copy.deepcopy(node1)
print(copied.next.next.value)  # 1

This Node class forms a circular reference. The __deepcopy__ method
checks the memo dictionary before copying to handle the circular reference
properly. Without this check, it would recurse infinitely.

The memo stores already copied objects by their id. When encountering a node
that's already been copied, it returns the stored copy instead of recursing.

## Custom Deep Copy Behavior

__deepcopy__ allows customizing how specific attributes are copied,
which is useful when some attributes shouldn't be deeply copied.

custom_behavior.py
  

import copy

class Config:
    def __init__(self, params, logger):
        self.params = params
        self.logger = logger  # Should not be deep copied
    
    def __deepcopy__(self, memo):
        print("Creating custom deep copy of Config")
        new_params = copy.deepcopy(self.params, memo)
        new_config = Config(new_params, self.logger)
        memo[id(self)] = new_config
        return new_config

logger = object()
original = Config({"timeout": 30, "retries": 3}, logger)
copied = copy.deepcopy(original)
print(copied.params)
print(copied.logger is original.logger)  # True

This Config class demonstrates selective deep copying. The params dictionary is
deep copied, but the logger reference is shared between original and copy.

This pattern is useful when some attributes represent shared resources or
singletons that shouldn't be duplicated during copying operations.

## Deep Copy with Inheritance

When implementing __deepcopy__ in an inheritance hierarchy, you
need to properly handle parent class attributes and the memo dictionary.

inheritance.py
  

import copy

class Base:
    def __init__(self, base_value):
        self.base_value = base_value
    
    def __deepcopy__(self, memo):
        print("Deep copying Base")
        new_base = self.__class__(copy.deepcopy(self.base_value, memo))
        memo[id(self)] = new_base
        return new_base

class Derived(Base):
    def __init__(self, base_value, derived_value):
        super().__init__(base_value)
        self.derived_value = derived_value
    
    def __deepcopy__(self, memo):
        print("Deep copying Derived")
        new_obj = super().__deepcopy__(memo)
        new_obj.derived_value = copy.deepcopy(self.derived_value, memo)
        return new_obj

original = Derived([1, 2], {"a": 1})
copied = copy.deepcopy(original)
print(copied.base_value, copied.derived_value)

This example shows proper __deepcopy__ implementation with
inheritance. The Derived class first delegates to the parent class's
__deepcopy__, then handles its own attributes.

The memo dictionary is passed through the entire copying process to maintain
consistency across the inheritance hierarchy and handle potential circular
references.

## Performance Optimization

__deepcopy__ can be optimized by avoiding unnecessary copies of
immutable objects or implementing custom copying logic for complex structures.

optimization.py
  

import copy

class LargeData:
    def __init__(self, data, metadata):
        self.data = data  # Large, complex structure
        self.metadata = metadata  # Small, simple structure
    
    def __deepcopy__(self, memo):
        print("Optimized deep copy of LargeData")
        # Skip deep copying metadata as it's small and contains only immutables
        new_metadata = self.metadata
        # Custom optimized copy for large data
        new_data = [copy.deepcopy(item, memo) for item in self.data]
        new_obj = self.__class__(new_data, new_metadata)
        memo[id(self)] = new_obj
        return new_obj

original = LargeData([[1, 2, 3]] * 1000, {"created": "2025-01-01"})
copied = copy.deepcopy(original)
print(len(copied.data), copied.metadata)

This optimized implementation avoids deep copying the metadata dictionary since
it contains only immutable values. It also uses a list comprehension for the
large data structure to make the copying process more efficient.

Such optimizations are valuable when dealing with large objects where standard
deep copying would be too slow or memory-intensive.

## Best Practices

- **Always use the memo dictionary:** Essential for handling circular references

- **Copy all mutable attributes:** Ensure complete independence of copies

- **Preserve object identity:** Add new objects to memo before recursive copies

- **Consider immutables:** Skip copying immutable objects for performance

- **Document behavior:** Clearly document any custom copy behavior

## Source References

- [Python copy module documentation](https://docs.python.org/3/library/copy.html)

- [Python __deepcopy__ documentation](https://docs.python.org/3/reference/datamodel.html#object.__deepcopy__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).