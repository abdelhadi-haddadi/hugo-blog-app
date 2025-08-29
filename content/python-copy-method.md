+++
title = "Python __copy__ Method"
date = 2025-08-29T20:08:03.827+01:00
draft = false
description = "Complete guide to Python's __copy__ method covering object copying, shallow vs deep copies, and custom copy behavior."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __copy__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __copy__ method, the
special method that controls shallow copying behavior. We'll cover basic usage,
custom implementations, and practical examples.

## Basic Definitions

The __copy__ method defines how an object should be copied when
the copy.copy() function is called. It returns a shallow copy of
the object.

Key characteristics: it takes no parameters (except self), should return a new
object, and is called by copy.copy(). For deep copies, implement
__deepcopy__ instead.

## Basic __copy__ Implementation

Here's a simple implementation showing how __copy__ works with
basic objects. It demonstrates the default behavior and customization.

basic_copy.py
  

import copy

class Box:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def __copy__(self):
        print("__copy__ called")
        return Box(self.width, self.height)
    
    def __repr__(self):
        return f"Box({self.width}, {self.height})"

original = Box(10, 20)
copy_obj = copy.copy(original)
print(copy_obj)

This example shows a basic __copy__ implementation. When
copy.copy() is called, it invokes __copy__ which
creates a new Box with the same dimensions.

The output would show "__copy__ called" and print the copied Box. Both objects
are separate instances with identical attribute values.

## Shallow Copy vs Deep Copy

This example demonstrates the difference between shallow and deep copies when
dealing with nested objects and the role of __copy__.

shallow_deep.py
  

import copy

class Container:
    def __init__(self, items):
        self.items = items
    
    def __copy__(self):
        print("Shallow copy")
        return Container(self.items)
    
    def __deepcopy__(self, memo):
        print("Deep copy")
        return Container(copy.deepcopy(self.items, memo))

original = Container([[1, 2], [3, 4]])
shallow = copy.copy(original)
deep = copy.deepcopy(original)

original.items[0][0] = 99
print("Shallow:", shallow.items)  # Affected by change
print("Deep:", deep.items)       # Unaffected

This example shows how shallow copies share references to nested objects while
deep copies create completely independent copies. The __copy__
method handles the shallow copy case.

After modifying the original's nested list, the shallow copy reflects the change
while the deep copy remains unchanged. This demonstrates reference sharing.

## Custom Copy Behavior

__copy__ can be customized to control exactly what gets copied and
how. This example shows selective attribute copying.

custom_copy.py
  

import copy

class Account:
    def __init__(self, balance, transactions):
        self.balance = balance
        self.transactions = transactions
        self.last_access = None
    
    def __copy__(self):
        print("Creating account copy")
        new_account = Account(self.balance, self.transactions.copy())
        new_account.last_access = "Copied from original"
        return new_account

original = Account(1000, ["deposit 500", "withdraw 200"])
copy_acc = copy.copy(original)

original.balance = 1500
original.transactions.append("withdraw 300")
print("Original:", original.balance, original.transactions)
print("Copy:", copy_acc.balance, copy_acc.transactions)
print("Copy access:", copy_acc.last_access)

This Account class implements custom copy behavior. The balance is copied as-is,
transactions get a shallow copy, and last_access gets a special value.

Changes to the original's balance don't affect the copy (primitive type), but
transaction list changes would affect the copy if not for the explicit
copy() call in __copy__.

## Copying Immutable Objects

For immutable objects, __copy__ can often just return self since
the object can't be modified. This example demonstrates this optimization.

immutable_copy.py
  

import copy

class ImmutablePoint:
    def __init__(self, x, y):
        self._x = x
        self._y = y
    
    @property
    def x(self):
        return self._x
    
    @property
    def y(self):
        return self._y
    
    def __copy__(self):
        print("Immutable copy")
        return self  # Safe because object is immutable
    
    def __repr__(self):
        return f"Point({self.x}, {self.y})"

point = ImmutablePoint(3, 4)
point_copy = copy.copy(point)
print(point is point_copy)  # True, same object

This immutable point class returns itself from __copy__ since its
state can't change. This is safe and efficient for immutable objects.

The is check confirms both variables reference the same object.
This optimization prevents unnecessary object creation for immutable types.

## Combining __copy__ with __deepcopy__

This example shows a class implementing both copy methods to handle different
copying scenarios appropriately.

combined_copy.py
  

import copy

class Node:
    def __init__(self, value, children=None):
        self.value = value
        self.children = children if children is not None else []
    
    def __copy__(self):
        print("Shallow copying Node")
        return Node(self.value, self.children)
    
    def __deepcopy__(self, memo):
        print("Deep copying Node")
        return Node(copy.deepcopy(self.value, memo),
                   [copy.deepcopy(child, memo) for child in self.children])

root = Node(1, [Node(2), Node(3)])
shallow_root = copy.copy(root)
deep_root = copy.deepcopy(root)

root.children.append(Node(4))
print("Original children count:", len(root.children))
print("Shallow copy children count:", len(shallow_root.children))
print("Deep copy children count:", len(deep_root.children))

This Node class implements both copy methods. The shallow copy shares child
references while the deep copy creates a complete independent tree structure.

After adding a child to the original, the shallow copy reflects this change
(shared reference) while the deep copy maintains its original structure.

## Best Practices

- **Implement both methods:** Provide __copy__ and __deepcopy__ when needed

- **Document behavior:** Clearly document your copy semantics

- **Handle all attributes:** Ensure all relevant attributes are copied

- **Consider immutability:** Return self for truly immutable objects

- **Use copy module:** Leverage copy and deepcopy in implementations

## Source References

- [Python copy module documentation](https://docs.python.org/3/library/copy.html)

- [Python __copy__ documentation](https://docs.python.org/3/reference/datamodel.html#object.__copy__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).