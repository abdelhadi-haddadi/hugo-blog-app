+++
title = "Python __gt__ Method"
date = 2025-08-29T20:08:11.664+01:00
draft = false
description = "Complete guide to Python's __gt__ method covering comparison operations, operator overloading, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __gt__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __gt__ method, the
special method that implements the greater-than operator. We'll cover basic
usage, comparison operations, operator overloading, and practical examples.

## Basic Definitions

The __gt__ method is a special method that implements the "greater
than" operator (&gt;) in Python. It allows objects to define their
own comparison behavior when used with the &gt; operator.

Key characteristics: it takes two parameters (self and other),
returns a boolean value, and should return NotImplemented for
unsupported comparisons. It's part of Python's rich comparison methods.

## Basic __gt__ Implementation

Here's a simple implementation showing how __gt__ works with a
custom class. This example compares objects based on an attribute value.

basic_gt.py
  

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __gt__(self, other):
        if not isinstance(other, Product):
            return NotImplemented
        return self.price &gt; other.price

p1 = Product("Laptop", 999)
p2 = Product("Phone", 699)
print(p1 &gt; p2)  # True

This example compares Product instances based on their price attribute. The
__gt__ method returns True if the current instance's
price is greater than the other's price.

The NotImplemented return value indicates when comparison with
unsupported types is attempted, allowing Python to try the reverse operation.

## Comparing Different Types

__gt__ can handle comparisons between different types, though it's
good practice to return NotImplemented for unsupported types.

different_types.py
  

class Distance:
    def __init__(self, meters):
        self.meters = meters
    
    def __gt__(self, other):
        if isinstance(other, Distance):
            return self.meters &gt; other.meters
        elif isinstance(other, (int, float)):
            return self.meters &gt; other
        return NotImplemented

d1 = Distance(100)
print(d1 &gt; Distance(50))  # True
print(d1 &gt; 75)            # True
print(d1 &gt; "100")         # TypeError

This Distance class can compare with other Distance objects or numbers. When
compared with an unsupported type like string, it returns NotImplemented,
leading to a TypeError.

The method first checks the type of other before performing the
comparison, making it more flexible while maintaining type safety.

## Reverse Comparison with __lt__

When __gt__ returns NotImplemented, Python tries the
reverse operation using the other object's __lt__ method.

reverse_comparison.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __gt__(self, other):
        if isinstance(other, Temperature):
            return self.celsius &gt; other.celsius
        return NotImplemented
    
    def __lt__(self, other):
        if isinstance(other, (int, float)):
            return self.celsius &lt; other
        return NotImplemented

t = Temperature(25)
print(t &gt; Temperature(20))  # True (uses __gt__)
print(30 &gt; t)               # True (uses __lt__)

This example shows how Python falls back to __lt__ when
__gt__ isn't implemented for a particular comparison. The
30 &gt; t expression uses t.__lt__(30).

Implementing both methods provides more flexible comparison behavior while
maintaining consistency between operations.

## Inheritance and __gt__

When using inheritance, __gt__ can be overridden to modify
comparison behavior in subclasses while maintaining the parent's functionality.

inheritance.py
  

class Animal:
    def __init__(self, weight):
        self.weight = weight
    
    def __gt__(self, other):
        if not isinstance(other, Animal):
            return NotImplemented
        return self.weight &gt; other.weight

class Dog(Animal):
    def __gt__(self, other):
        if isinstance(other, Dog):
            return self.weight * 2 &gt; other.weight * 2
        return super().__gt__(other)

a1 = Animal(10)
a2 = Animal(15)
d1 = Dog(5)
d2 = Dog(8)

print(a1 &gt; a2)  # False
print(d1 &gt; d2)  # False (but compares 10 vs 16)
print(d1 &gt; a1)  # False (uses Animal.__gt__)

The Dog class modifies comparison behavior when comparing two Dog instances but
falls back to the parent class's __gt__ for other comparisons.

This pattern allows specialized comparison logic while maintaining consistent
behavior with the parent class and other types.

## Total Ordering with functools

The functools.total_ordering decorator can generate missing
comparison methods if at least one comparison method (like __gt__)
and __eq__ are defined.

total_ordering.py
  

from functools import total_ordering

@total_ordering
class Score:
    def __init__(self, points):
        self.points = points
    
    def __gt__(self, other):
        if not isinstance(other, Score):
            return NotImplemented
        return self.points &gt; other.points
    
    def __eq__(self, other):
        if not isinstance(other, Score):
            return NotImplemented
        return self.points == other.points

s1 = Score(85)
s2 = Score(90)
print(s1 &gt; s2)   # False
print(s1 &lt;= s2)  # True (generated by total_ordering)

With just __gt__ and __eq__ defined, the decorator
provides all other comparison methods (__lt__, __le__,
etc.). This reduces boilerplate code.

The generated methods maintain consistent behavior with the defined comparisons,
ensuring all operations work as expected based on the two implemented methods.

## Best Practices

- **Return NotImplemented for unsupported types:** Allows Python to try reverse operations

- **Maintain consistency:** Ensure __gt__ and __lt__ are consistent

- **Implement __eq__:** For complete comparison functionality

- **Consider total_ordering:** When implementing multiple comparisons

- **Document behavior:** Clearly document comparison logic and supported types

## Source References

- [Python __gt__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__gt__)

- [functools.total_ordering Docs](https://docs.python.org/3/library/functools.html#functools.total_ordering)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).