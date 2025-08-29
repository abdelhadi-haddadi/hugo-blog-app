+++
title = "Python __class_getitem__ Method"
date = 2025-08-29T20:08:02.714+01:00
draft = false
description = "Complete guide to Python's __class_getitem__ method covering type hints, generics, and custom container types."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __class_getitem__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __class_getitem__ method,
introduced in PEP 560 for type hinting and generic class support. We'll cover
basic usage, type hints, generics, and practical examples.

## Basic Definitions

The __class_getitem__ method allows classes to support subscription
notation (square brackets) for type hinting purposes. It's called when using
Class[item] syntax.

Key characteristics: it's a class method (though not decorated as such), receives
the class as first argument, and returns a specialized version of the class.
It enables generic type annotations without runtime type checking.

## Basic __class_getitem__ Implementation

Here's a simple implementation showing how __class_getitem__ works.
This demonstrates the basic syntax and behavior of the method.

basic_class_getitem.py
  

class GenericBox:
    def __class_getitem__(cls, item):
        print(f"Creating GenericBox specialized for {item}")
        return f"GenericBox[{item.__name__}]"

print(GenericBox[int])  # GenericBox[int]
print(GenericBox[str])  # GenericBox[str]

This example shows how __class_getitem__ intercepts the square
bracket notation. When GenericBox[int] is called, it invokes
__class_getitem__ with int as the item.

The method returns a string here for demonstration, but in real usage it would
typically return a specialized version of the class or a typing._GenericAlias.

## Type Hinting with __class_getitem__

__class_getitem__ is primarily used to support type hints in Python.
Here's how to implement it for custom container types.

type_hinting.py
  

from typing import Any, TypeVar, Generic

T = TypeVar('T')

class Box(Generic[T]):
    def __init__(self, content: T):
        self.content = content

    @classmethod
    def __class_getitem__(cls, item):
        return super().__class_getitem__(item)

    def __repr__(self):
        return f"Box({self.content!r})"

# Type hints work with the custom container
def process_box(box: Box[int]) -&gt; int:
    return box.content * 2

box = Box(42)
print(process_box(box))

This example shows a generic Box class that can be parameterized with types.
The __class_getitem__ implementation delegates to the parent
Generic class to handle type parameterization correctly.

The type checker will understand Box[int] as a box containing
integers, while at runtime it returns a typing._GenericAlias instance.

## Custom Generic Class

You can create your own generic classes without inheriting from
typing.Generic by implementing __class_getitem__.

custom_generic.py
  

class Pair:
    def __init__(self, first, second):
        self.first = first
        self.second = second

    def __class_getitem__(cls, items):
        if not isinstance(items, tuple):
            items = (items,)
        if len(items) != 2:
            raise TypeError("Pair requires exactly two type arguments")
        
        first_type, second_type = items
        return type(f"Pair[{first_type.__name__}, {second_type.__name__}]",
                   (cls,),
                   {'__annotations__': {'first': first_type, 'second': second_type}})

    def __repr__(self):
        return f"Pair({self.first!r}, {self.second!r})"

IntStrPair = Pair[int, str]
pair = IntStrPair(42, "answer")
print(pair)  # Pair(42, 'answer')

This custom Pair class implements its own generic type support. The
__class_getitem__ method creates a new subclass with type
annotations based on the provided type arguments.

At runtime, Pair[int, str] creates a new class with appropriate
type annotations, which type checkers can use for static type checking.

## Runtime Type Checking

While __class_getitem__ is mainly for type hints, you can combine
it with runtime type checking for more robust code.

runtime_checking.py
  

class CheckedList:
    def __init__(self, items):
        self.items = list(items)
    
    def __class_getitem__(cls, item_type):
        class CheckedListSubclass(cls):
            def append(self, item):
                if not isinstance(item, item_type):
                    raise TypeError(f"Expected {item_type.__name__}, got {type(item).__name__}")
                super().append(item)
        return CheckedListSubclass
    
    def append(self, item):
        self.items.append(item)

IntList = CheckedList[int]
numbers = IntList([1, 2, 3])
numbers.append(4)
# numbers.append("four")  # Raises TypeError

This example creates a type-checked list that verifies items match the specified
type at runtime. The __class_getitem__ method creates a subclass
with runtime type checking.

When CheckedList[int] is called, it returns a subclass that
validates all appended items are integers. This combines static type hints with
runtime validation.

## Forward References and String Literals

__class_getitem__ can handle forward references using string
literals, which is useful for type hints that reference not-yet-defined types.

forward_refs.py
  

class Node:
    def __class_getitem__(cls, item):
        if isinstance(item, str):
            # Handle forward references
            return f"Node['{item}']"
        return f"Node[{item.__name__}]"

class Tree:
    pass

# Using forward reference
print(Node["Tree"])  # Node['Tree']
# Using actual type
print(Node[Tree])    # Node[Tree]

This example demonstrates how __class_getitem__ can handle both
actual types and string literals. String literals are used for forward
references in type hints.

Type checkers will recognize this pattern and properly handle forward references
in type annotations, while at runtime it just returns a formatted string.

## Best Practices

- **Type hints first:** Main purpose is type hinting, not runtime behavior

- **Consistent returns:** Return typing._GenericAlias for compatibility

- **Forward references:** Support string literals for forward references

- **Document behavior:** Clearly document any special type handling

- **Performance:** Cache created generic types if performance is critical

## Source References

- [Python __class_getitem__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__class_getitem__)

- [PEP 560 - Core Support for typing module and generic types](https://www.python.org/dev/peps/pep-0560/)

- [Python typing module documentation](https://docs.python.org/3/library/typing.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).