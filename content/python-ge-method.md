+++
title = "Python __ge__ Method"
date = 2025-08-29T20:08:09.435+01:00
draft = false
description = "Complete guide to Python's __ge__ method covering greater than or equal comparison operator overloading."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __ge__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __ge__ method, the
special method that implements the greater than or equal comparison operator.
We'll cover basic usage, common patterns, and practical examples.

## Basic Definitions

The __ge__ method is one of Python's rich comparison methods. It
implements the &gt;= operator for class instances. The method
should return True or False, though it can return any
value.

Key characteristics: it takes two parameters (self and other),
is called when using the &gt;= operator, and should implement
consistent comparison logic. It's part of Python's operator overloading system.

## Basic __ge__ Implementation

Here's a simple implementation showing how __ge__ works with a
class representing distances. The method compares the distance values.

basic_ge.py
  

class Distance:
    def __init__(self, meters):
        self.meters = meters
    
    def __ge__(self, other):
        if not isinstance(other, Distance):
            return NotImplemented
        return self.meters &gt;= other.meters

d1 = Distance(100)
d2 = Distance(50)
print(d1 &gt;= d2)  # True
print(d2 &gt;= d1)  # False

This example shows the basic structure of __ge__. It checks if the
other object is a Distance instance and compares their meter values.
The NotImplemented return allows Python to try reverse comparison.

The method returns True when the current instance's meters are
greater than or equal to the other instance's meters. This enables natural
comparison syntax with &gt;=.

## Comparing Different Types

__ge__ can handle comparisons with different types by returning
NotImplemented when types are incompatible. This allows Python to
try the reverse operation.

different_types.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __ge__(self, other):
        if isinstance(other, Temperature):
            return self.celsius &gt;= other.celsius
        elif isinstance(other, (int, float)):
            return self.celsius &gt;= other
        return NotImplemented

t = Temperature(25)
print(t &gt;= Temperature(20))  # True
print(t &gt;= 30)               # False
print(15 &gt;= t)               # False (uses __le__ of Temperature)

This temperature class compares with both other Temperature instances and
numbers. When comparing with incompatible types, it returns
NotImplemented to allow Python to try the reverse operation.

The example demonstrates how to handle multiple comparison scenarios while
maintaining type safety. The method first checks the type of other
before proceeding with comparison.

## Total Ordering with functools

When implementing __ge__, it's often useful to implement other
comparison methods too. The functools.total_ordering decorator can
help minimize boilerplate code.

total_ordering.py
  

from functools import total_ordering

@total_ordering
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor
    
    def __eq__(self, other):
        if not isinstance(other, Version):
            return False
        return (self.major, self.minor) == (other.major, other.minor)
    
    def __ge__(self, other):
        if not isinstance(other, Version):
            return NotImplemented
        return (self.major, self.minor) &gt;= (other.major, other.minor)

v1 = Version(1, 2)
v2 = Version(1, 3)
print(v1 &gt;= v2)  # False
print(v1 &lt;= v2)  # True (provided by total_ordering)

This version class implements __eq__ and __ge__, and
gets all other comparison methods from total_ordering. The decorator
fills in the missing comparison methods based on these two.

The implementation compares both major and minor version numbers in order. The
tuple comparison ensures correct lexicographical ordering of version components.

## Reverse Comparison Handling

When the left operand doesn't implement __ge__, Python tries the
right operand's __le__. This example shows how to handle such cases.

reverse_comparison.py
  

class Weight:
    def __init__(self, kg):
        self.kg = kg
    
    def __ge__(self, other):
        if isinstance(other, Weight):
            return self.kg &gt;= other.kg
        elif isinstance(other, (int, float)):
            return self.kg &gt;= other
        return NotImplemented
    
    def __le__(self, other):
        if isinstance(other, Weight):
            return self.kg &lt;= other.kg
        elif isinstance(other, (int, float)):
            return self.kg &lt;= other
        return NotImplemented

w = Weight(50)
print(w &gt;= 40)        # True (uses __ge__)
print(60 &gt;= w)        # True (uses __le__)
print("50" &gt;= w)      # TypeError

This weight class implements both __ge__ and __le__ to
handle comparisons from both sides. It maintains consistency between operations.

When comparing with incompatible types (like strings), Python raises a
TypeError after both __ge__ and __le__
return NotImplemented.

## Inheritance and Comparison

When dealing with inheritance, __ge__ should handle comparisons
between parent and child classes carefully to maintain the Liskov substitution
principle.

inheritance.py
  

class Animal:
    def __init__(self, weight):
        self.weight = weight
    
    def __ge__(self, other):
        if not isinstance(other, Animal):
            return NotImplemented
        return self.weight &gt;= other.weight

class Dog(Animal):
    def __init__(self, weight, breed):
        super().__init__(weight)
        self.breed = breed

a = Animal(10)
d = Dog(15, "Labrador")
print(d &gt;= a)  # True
print(a &gt;= d)  # True (works because Dog is an Animal)

This example shows proper comparison between parent and child classes. The
__ge__ method in the parent class accepts any Animal
instance, including its subclasses.

The implementation compares only the weight attribute, ignoring subclass-specific
attributes. This maintains consistency in the comparison operation across the
inheritance hierarchy.

## Best Practices

- **Return NotImplemented for incompatible types:** Allows Python to try reverse comparison

- **Maintain consistency:** Ensure __ge__ agrees with other comparison methods

- **Consider total_ordering:** Reduces boilerplate when implementing multiple comparisons

- **Handle inheritance properly:** Parent classes should accept child instances

- **Document comparison semantics:** Clearly define what comparison means for your class

## Source References

- [Python __ge__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__ge__)

- [functools.total_ordering Docs](https://docs.python.org/3/library/functools.html#functools.total_ordering)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).