+++
title = "Python __floordiv__ Method"
date = 2025-08-29T20:08:08.332+01:00
draft = false
description = "Complete guide to Python's __floordiv__ method covering floor division, operator overloading, and custom numeric types."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __floordiv__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __floordiv__ method, the
special method that implements floor division (// operator). We'll cover basic
usage, operator overloading, custom numeric types, and practical examples.

## Basic Definitions

The __floordiv__ method is a special method that implements the
floor division operation (//) in Python. It is called when the // operator is
used between two objects.

Key characteristics: it must return the floor division result, can be defined
for any class, and should handle type conversion if needed. The corresponding
reflected operation is __rfloordiv__.

## Basic __floordiv__ Implementation

Here's a simple implementation showing how __floordiv__ works with
a custom class. This demonstrates the basic operator overloading pattern.

basic_floordiv.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __floordiv__(self, other):
        if isinstance(other, Number):
            return Number(self.value // other.value)
        elif isinstance(other, (int, float)):
            return Number(self.value // other)
        else:
            return NotImplemented

a = Number(10)
b = Number(3)
result = a // b
print(result.value)  # Output: 3

This example shows a basic Number class implementing floor division. The method
handles division by another Number or by a regular number, returning a new
Number instance with the result.

The NotImplemented return value tells Python to try other methods
like __rfloordiv__ if the operation isn't supported with the given
types.

## Handling Different Numeric Types

A robust __floordiv__ implementation should handle various numeric
types and provide meaningful error messages for unsupported operations.

numeric_types.py
  

class Distance:
    def __init__(self, meters):
        self.meters = meters
    
    def __floordiv__(self, other):
        if isinstance(other, Distance):
            return self.meters // other.meters
        elif isinstance(other, (int, float)):
            return Distance(self.meters // other)
        else:
            raise TypeError(f"Unsupported type for //: {type(other)}")

d1 = Distance(100)
d2 = Distance(30)
print(d1 // d2)  # Output: 3
print(d1 // 4)   # Creates new Distance(25)

This Distance class handles floor division with other Distance objects (returning
a scalar) and with numbers (returning a new Distance). It raises TypeError for
unsupported types.

The implementation shows how to return different types based on the right-hand
operand, which is a common pattern in numeric operations.

## Implementing __rfloordiv__

The __rfloordiv__ method handles cases when the left operand doesn't
support the operation, enabling operations like 5 // obj.

reflected_floordiv.py
  

class Fraction:
    def __init__(self, numerator, denominator):
        self.n = numerator
        self.d = denominator
    
    def __floordiv__(self, other):
        if isinstance(other, Fraction):
            return (self.n * other.d) // (self.d * other.n)
        elif isinstance(other, (int, float)):
            return (self.n // (self.d * other))
        else:
            return NotImplemented
    
    def __rfloordiv__(self, other):
        if isinstance(other, (int, float)):
            return (other * self.d) // self.n
        else:
            return NotImplemented

half = Fraction(1, 2)
print(10 // half)  # Output: 20 (uses __rfloordiv__)
print(half // 0.1) # Output: 5 (uses __floordiv__)

This Fraction class implements both regular and reflected floor division. The
__rfloordiv__ method enables operations where the Fraction is on
the right side of the // operator.

The example demonstrates how to properly implement both methods to support
commutative-like operations with different operand orders.

## Custom Floor Division Behavior

__floordiv__ can implement domain-specific floor division behavior
that differs from standard numeric division.

custom_behavior.py
  

class TimeSlot:
    def __init__(self, minutes):
        self.minutes = minutes
    
    def __floordiv__(self, other):
        if isinstance(other, TimeSlot):
            return self.minutes // other.minutes
        elif isinstance(other, (int, float)):
            # Return list of equal time slots
            slot_size = self.minutes // other
            return [TimeSlot(slot_size) for _ in range(other)]
        else:
            return NotImplemented

meeting = TimeSlot(90)
print(meeting // 3)  # Output: [TimeSlot(30), TimeSlot(30), TimeSlot(30)]

This TimeSlot class implements custom floor division behavior. When divided by
a number, it returns a list of equal time slots rather than a single value.

This demonstrates how __floordiv__ can be used for domain-specific
operations that go beyond simple arithmetic, returning complex results when
appropriate.

## Floor Division with Negative Numbers

Floor division with negative numbers has specific behavior that should be
considered when implementing __floordiv__.

negative_numbers.py
  

class SignedNumber:
    def __init__(self, value):
        self.value = value
    
    def __floordiv__(self, other):
        if isinstance(other, SignedNumber):
            return SignedNumber(self.value // other.value)
        elif isinstance(other, (int, float)):
            return SignedNumber(self.value // other)
        else:
            return NotImplemented

a = SignedNumber(-7)
b = SignedNumber(3)
print(a // b)  # Output: -3 (not -2)
print(a // -3) # Output: 2 (not 3)

This example shows how floor division rounds towards negative infinity, which
is different from regular division. -7 // 3 equals -3, not -2.

The implementation preserves Python's standard floor division behavior, which
is important for maintaining consistency with built-in numeric types.

## Best Practices

- **Handle type checking:** Validate operand types and return NotImplemented for unsupported types

- **Implement __rfloordiv__:** Support operations when your class is on the right side

- **Maintain consistency:** Follow Python's floor division rules for negative numbers

- **Document behavior:** Clearly document any special division behavior

- **Consider edge cases:** Handle division by zero and other edge cases appropriately

## Source References

- [Python __floordiv__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__floordiv__)

- [Python Numeric Type Emulation Docs](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).