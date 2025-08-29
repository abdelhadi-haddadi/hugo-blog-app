+++
title = "Python isinstance Function"
date = 2025-08-29T20:08:44.230+01:00
draft = false
description = "Complete guide to Python's isinstance function covering type checking, inheritance, and practical examples of runtime type verification."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python isinstance Function

Last modified April 11, 2025

This comprehensive guide explores Python's isinstance function,
which checks if an object is an instance of a class or tuple of classes.
We'll cover basic usage, inheritance, abstract base classes, and practical
examples.

## Basic Definitions

The isinstance function returns True if the object
argument is an instance of the classinfo argument. It also works with
inheritance and abstract base classes.

Key characteristics: checks object type, supports inheritance hierarchy,
accepts type tuples, and works with abstract base classes via registration.
More flexible than type() checks.

## Basic Type Checking

Here's simple usage with built-in types showing how isinstance
verifies object types against single classes and tuples of classes.

basic_isinstance.py
  

num = 42
name = "Alice"
values = [1, 2, 3]

print(isinstance(num, int))      # True
print(isinstance(name, str))     # True
print(isinstance(values, list))  # True

# With tuple of types
print(isinstance(num, (int, float)))  # True
print(isinstance(3.14, (int, float))) # True
print(isinstance("text", (int, float))) # False

This example shows isinstance with different built-in types.
It returns True when the object matches the specified type.

The tuple version checks against multiple types at once, returning True
if any type matches. This is more concise than multiple or conditions.

## Inheritance Checking

isinstance works with inheritance hierarchies, recognizing
subclass instances as valid for parent classes. This example demonstrates
polymorphic behavior.

inheritance.py
  

class Animal:
    pass

class Dog(Animal):
    pass

class Cat(Animal):
    pass

my_dog = Dog()
my_cat = Cat()

print(isinstance(my_dog, Dog))    # True
print(isinstance(my_dog, Animal)) # True (inheritance)
print(isinstance(my_cat, Dog))    # False
print(isinstance(my_cat, Animal)) # True

The example shows how isinstance respects inheritance. A Dog
instance is considered both a Dog and an Animal.

This behavior makes isinstance more useful than type()
for polymorphism, as it works with the entire class hierarchy.

## Abstract Base Classes

isinstance works with abstract base classes (ABCs) from the
collections.abc module, checking for interface compliance.

abc_check.py
  

from collections.abc import Sequence, Iterable

my_list = [1, 2, 3]
my_dict = {'a': 1, 'b': 2}

print(isinstance(my_list, Sequence))  # True
print(isinstance(my_list, Iterable))  # True
print(isinstance(my_dict, Sequence))  # False
print(isinstance(my_dict, Iterable))  # True

This checks if objects implement specific abstract interfaces. list
is both a Sequence and Iterable, while dict
is only Iterable.

ABC checks are useful for verifying objects support required operations
(like indexing for Sequence) without checking concrete types.

## Custom Class Checking

You can use isinstance with custom classes and multiple inheritance.
This example shows complex class relationships.

custom_classes.py
  

class Vehicle:
    pass

class Engine:
    pass

class Car(Vehicle, Engine):
    pass

class Boat(Vehicle):
    pass

my_car = Car()
my_boat = Boat()

print(isinstance(my_car, Vehicle))  # True
print(isinstance(my_car, Engine))   # True
print(isinstance(my_boat, Engine))  # False
print(isinstance(my_boat, (Engine, Vehicle)))  # True

The example demonstrates multiple inheritance checking. Car
inherits from both Vehicle and Engine, so
isinstance returns True for both.

The tuple check shows how to test for multiple possible base classes
in one operation, which is cleaner than separate checks.

## Dynamic Type Checking

This example shows runtime type checking in a function that processes
different input types differently using isinstance.

dynamic_check.py
  

def process_data(data):
    if isinstance(data, str):
        return f"Processed string: {data.upper()}"
    elif isinstance(data, (int, float)):
        return data * 2
    elif isinstance(data, dict):
        return {k.upper(): v for k, v in data.items()}
    else:
        return f"Unsupported type: {type(data).__name__}"

print(process_data("hello"))      # Processed string: HELLO
print(process_data(42))          # 84
print(process_data({'a': 1}))    # {'A': 1}
print(process_data([1, 2, 3]))   # Unsupported type: list

The function uses isinstance to handle different input types
appropriately. This pattern is common in functions that need to accept
multiple types.

Note how it handles numeric types with a tuple check and provides a
fallback for unsupported types. This is more maintainable than separate
functions.

## Best Practices

- **Prefer over type():** isinstance handles inheritance

- **Use ABCs for interfaces:** Check capabilities rather than concrete types

- **Limit type checking:** Use polymorphism when possible

- **Document expected types:** Make type requirements clear

- **Consider type hints:** For static type checking complement

## Source References

- [Python isinstance() Documentation](https://docs.python.org/3/library/functions.html#isinstance)

- [Python abc Module Documentation](https://docs.python.org/3/library/abc.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).