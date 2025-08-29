+++
title = "Python __add__ Method"
date = 2025-08-29T20:07:59.074+01:00
draft = false
description = "Complete guide to Python's __add__ method covering operator overloading, custom addition behavior, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __add__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __add__ method, the
special method that implements the addition operator (+). We'll cover basic
usage, operator overloading, type handling, and practical examples.

## Basic Definitions

The __add__ method is called when the + operator is used on an
object. It defines how instances of a class should behave when added to other
objects. This is part of Python's operator overloading mechanism.

Key characteristics: it takes self and one other operand as
parameters, should return the result of the addition, and can raise
NotImplemented for unsupported operations. It enables custom
addition behavior.

## Basic __add__ Implementation

Here's a simple implementation showing how __add__ works with a
custom class. This example demonstrates basic addition between two objects.

basic_add.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        return NotImplemented

v1 = Vector(2, 4)
v2 = Vector(5, 1)
v3 = v1 + v2
print(f"Result: ({v3.x}, {v3.y})")  # Output: (7, 5)

This Vector class implements vector addition through __add__. When
two Vector instances are added, it returns a new Vector with summed components.

The NotImplemented return indicates unsupported operations. Python
will then try the other operand's __radd__ method if available.

## Handling Different Types

__add__ can handle operations with different types by checking the
other parameter type and implementing appropriate behavior.

mixed_types.py
  

class Currency:
    def __init__(self, amount, currency_code):
        self.amount = amount
        self.code = currency_code
    
    def __add__(self, other):
        if isinstance(other, Currency):
            if self.code == other.code:
                return Currency(self.amount + other.amount, self.code)
            raise ValueError("Cannot add different currencies")
        elif isinstance(other, (int, float)):
            return Currency(self.amount + other, self.code)
        return NotImplemented

usd1 = Currency(50, "USD")
usd2 = Currency(75, "USD")
print((usd1 + usd2).amount)  # 125

try:
    eur = Currency(100, "EUR")
    usd1 + eur  # Raises ValueError
except ValueError as e:
    print(e)

This Currency class allows addition with other Currency objects (same currency
only) and with numbers. It demonstrates type checking and different behaviors.

The example shows how to implement business rules (same currency requirement)
and support multiple operand types while maintaining type safety.

## Implementing __radd__ for Right Addition

When the left operand doesn't support addition, Python calls __radd__
on the right operand. Implementing both makes operations commutative.

right_add.py
  

class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius
    
    def __add__(self, other):
        if isinstance(other, (int, float)):
            return Temperature(self.celsius + other)
        return NotImplemented
    
    def __radd__(self, other):
        return self.__add__(other)

t1 = Temperature(20)
t2 = 5 + t1  # Uses __radd__
t3 = t1 + 10  # Uses __add__
print(t2.celsius)  # 25
print(t3.celsius)  # 30

This Temperature class supports addition with numbers from either side. The
__radd__ method delegates to __add__ for consistent
behavior.

Without __radd__, 5 + t1 would fail because integers
don't know how to add Temperature objects. This makes the operation commutative.

## In-Place Addition with __iadd__

The __iadd__ method implements the += operator for in-place
addition. It should modify and return self when possible for efficiency.

inplace_add.py
  

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def __add__(self, other):
        new_cart = ShoppingCart()
        new_cart.items = self.items.copy()
        if isinstance(other, ShoppingCart):
            new_cart.items.extend(other.items)
        elif isinstance(other, list):
            new_cart.items.extend(other)
        else:
            return NotImplemented
        return new_cart
    
    def __iadd__(self, other):
        if isinstance(other, ShoppingCart):
            self.items.extend(other.items)
        elif isinstance(other, list):
            self.items.extend(other)
        else:
            return NotImplemented
        return self

cart = ShoppingCart()
cart += ["apple", "banana"]  # Uses __iadd__
cart = cart + ["orange"]  # Uses __add__
print(cart.items)  # ['apple', 'banana', 'orange']

This ShoppingCart shows the difference between __add__ (creates new
object) and __iadd__ (modifies existing object). += uses
__iadd__ when available.

__iadd__ should return self to match Python's in-place operation
semantics. This allows chaining operations and maintains expected behavior.

## Adding Custom Objects to Built-in Types

__add__ can enable adding custom objects to Python built-in types
by implementing appropriate type handling in the method.

custom_builtin.py
  

class Measurement:
    def __init__(self, value, unit):
        self.value = value
        self.unit = unit
    
    def __add__(self, other):
        if isinstance(other, Measurement):
            if self.unit == other.unit:
                return Measurement(self.value + other.value, self.unit)
            raise ValueError("Units must match")
        elif isinstance(other, (int, float)):
            return Measurement(self.value + other, self.unit)
        return NotImplemented
    
    def __radd__(self, other):
        return self.__add__(other)
    
    def __str__(self):
        return f"{self.value} {self.unit}"

m1 = Measurement(5, "kg")
m2 = Measurement(3, "kg")
print(m1 + m2)  # 8 kg
print(m1 + 2.5)  # 7.5 kg
print(10 + m2)  # 13 kg

This Measurement class supports addition with other Measurements (same units) and
with numbers. The __radd__ enables number + Measurement syntax.

The example shows how to maintain unit consistency while providing flexible
addition capabilities with both custom and built-in types.

## Best Practices

- **Type checking:** Always verify operand types in __add__

- **Implement __radd__:** Make operations commutative when possible

- **Return NotImplemented:** For unsupported operations

- **Consider __iadd__:** For efficient in-place operations

- **Maintain consistency:** Ensure + and += behave logically

## Source References

- [Python __add__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__add__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).