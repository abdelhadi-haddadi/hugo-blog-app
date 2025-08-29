+++
title = "Python __ne__ Method"
date = 2025-08-29T20:08:19.493+01:00
draft = false
description = "Complete guide to Python's __ne__ method covering inequality comparison, operator overloading, and custom implementations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __ne__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __ne__ method, the
special method that implements the "not equal" comparison operation. We'll
cover basic usage, relationship with __eq__, and practical examples.

## Basic Definitions

The __ne__ method is called when using the != operator.
It should return True if objects are not equal, False
otherwise. By default, it delegates to __eq__ and negates the result.

Key characteristics: it must accept two parameters (self and
other), should return a boolean value, and should implement
consistent behavior with __eq__. It's part of Python's rich
comparison methods.

## Basic __ne__ Implementation

Here's a simple class implementing both __eq__ and __ne__
to demonstrate their relationship. The class represents a point in 2D space.

basic_ne.py
  

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y
    
    def __ne__(self, other):
        return not (self == other)

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(p1 != p2)  # False
print(p1 != p3)  # True

This example shows the standard pattern where __ne__ is implemented
by negating __eq__. This ensures consistent behavior between
equality and inequality comparisons.

The NotImplemented return in __eq__ tells Python to
try the comparison the other way around or fall back to default behavior if the
types are incompatible.

## Custom Inequality Logic

Sometimes you might need custom inequality logic that isn't simply the negation
of equality. Here's an example with a versioned document class.

custom_ne.py
  

class Document:
    def __init__(self, content, version):
        self.content = content
        self.version = version
    
    def __eq__(self, other):
        if not isinstance(other, Document):
            return NotImplemented
        return self.content == other.content
    
    def __ne__(self, other):
        if not isinstance(other, Document):
            return NotImplemented
        # Documents are unequal if content differs OR versions differ
        return self.content != other.content or self.version != other.version

doc1 = Document("Hello", 1.0)
doc2 = Document("Hello", 1.1)
doc3 = Document("World", 1.0)

print(doc1 != doc2)  # True (versions differ)
print(doc1 != doc3)  # True (content differs)

In this case, documents are considered equal if their content matches, but
unequal if either content or version differs. This shows how __ne__
can implement more complex logic than just negating __eq__.

This pattern might be useful when you want to track changes but consider some
attributes as metadata that shouldn't affect equality comparisons.

## Inheritance and __ne__ Behavior

When working with inheritance, you need to ensure __ne__ behaves
correctly with parent and child classes. Here's an example demonstrating this.

inheritance_ne.py
  

class Animal:
    def __init__(self, name):
        self.name = name
    
    def __eq__(self, other):
        if not isinstance(other, Animal):
            return NotImplemented
        return self.name == other.name
    
    def __ne__(self, other):
        return not (self == other)

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    
    def __eq__(self, other):
        if not isinstance(other, Dog):
            return NotImplemented
        return super().__eq__(other) and self.breed == other.breed

animal = Animal("Buddy")
dog1 = Dog("Buddy", "Labrador")
dog2 = Dog("Buddy", "Poodle")

print(animal != dog1)  # True (different types)
print(dog1 != dog2)    # True (different breeds)

This example shows how inequality works with inheritance. The Animal
class implements basic equality/inequality by name, while Dog adds
breed comparison. The __ne__ method in the parent works for both.

Note that animal != dog1 returns True because they're
different types, even though they share the same name. This demonstrates type
checking in comparison methods.

## __ne__ with Different Types

The __ne__ method should properly handle comparisons with different
types. Here's an example with a class that can compare with integers.

different_types.py
  

class RomanNumeral:
    def __init__(self, value):
        self.value = value
    
    def __eq__(self, other):
        if isinstance(other, RomanNumeral):
            return self.value == other.value
        if isinstance(other, int):
            return self.value == other
        return NotImplemented
    
    def __ne__(self, other):
        eq_result = self.__eq__(other)
        if eq_result is NotImplemented:
            return NotImplemented
        return not eq_result

num1 = RomanNumeral(5)
num2 = RomanNumeral(5)
num3 = RomanNumeral(7)

print(num1 != num2)  # False
print(num1 != num3)  # True
print(num1 != 5)     # False
print(num1 != 10)    # True
print(num1 != "V")   # True (falls back to default behavior)

This RomanNumeral class can compare both with other instances and
with integers. The __ne__ method properly handles all cases by
delegating to __eq__ and negating its result.

When comparing with incompatible types ("V" string), it returns
NotImplemented, allowing Python to try the reverse operation or
use default behavior.

## Performance Optimization in __ne__

For complex objects, you might optimize __ne__ by checking for
inequality early rather than always computing full equality first.

optimized_ne.py
  

class Vector:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z
    
    def __eq__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        return self.x == other.x and self.y == other.y and self.z == other.z
    
    def __ne__(self, other):
        if not isinstance(other, Vector):
            return NotImplemented
        # Early exit if any component differs
        if self.x != other.x:
            return True
        if self.y != other.y:
            return True
        if self.z != other.z:
            return True
        return False

v1 = Vector(1, 2, 3)
v2 = Vector(1, 2, 3)
v3 = Vector(1, 0, 3)

print(v1 != v2)  # False
print(v1 != v3)  # True

This optimized __ne__ implementation checks components one by one,
returning True as soon as it finds any difference. For large objects
where equality is expensive to compute, this can improve performance.

The optimization is most beneficial when inequality is the common case, as it
allows early exit from the comparison. For equal objects, it performs the same
work as __eq__.

## Best Practices

- **Maintain consistency with __eq__:** Ensure a == b implies not (a != b)

- **Handle different types properly:** Return NotImplemented for unsupported types

- **Consider performance:** Optimize __ne__ if inequality checks are frequent

- **Document behavior:** Clearly document any special comparison logic

- **Test thoroughly:** Test edge cases including different types and inheritance

## Source References

- [Python __ne__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__ne__)

- [Python __eq__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__eq__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).