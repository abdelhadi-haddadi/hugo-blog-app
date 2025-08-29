+++
title = "Python __sub__ Method"
date = 2025-08-29T20:08:26.238+01:00
draft = false
description = "Complete guide to Python's __sub__ method covering operator overloading, vector math, and custom subtraction behavior."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __sub__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __sub__ method, the
special method that implements subtraction operation (-). We'll cover basic
usage, vector math, custom behavior, and practical examples.

## Basic Definitions

The __sub__ method is called to implement the subtraction operator
(-). When you write x - y, Python attempts to call
x.__sub__(y).

Key characteristics: it must accept two parameters (self and other), returns
the result of subtraction, and can be overridden to customize behavior. It
works with both built-in and custom types.

## Basic __sub__ Implementation

Here's a simple class implementing __sub__ to demonstrate basic
subtraction behavior between objects of the same type.

basic_sub.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __sub__(self, other):
        if isinstance(other, Number):
            return Number(self.value - other.value)
        return NotImplemented

a = Number(10)
b = Number(3)
result = a - b
print(result.value)  # Output: 7

This example shows how to implement basic subtraction between Number objects.
The __sub__ method checks if the other operand is also a Number.

Returning NotImplemented tells Python to try the reverse operation
(__rsub__) if available. This maintains operator flexibility.

## Vector Subtraction

The __sub__ method is commonly used for mathematical operations
like vector subtraction, where we subtract corresponding components.

vector_sub.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __sub__(self, other):
        if isinstance(other, Vector):
            return Vector(self.x - other.x, self.y - other.y)
        return NotImplemented
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(5, 7)
v2 = Vector(3, 2)
result = v1 - v2
print(result)  # Output: Vector(2, 5)

This Vector class implements component-wise subtraction. The __sub__
method creates and returns a new Vector with subtracted components.

The __repr__ method provides a readable string representation of
the vector, making debugging and output clearer.

## Subtracting Different Types

__sub__ can handle operations between different types by checking
the type of the other operand and implementing appropriate behavior.

mixed_sub.py
  

class Currency:
    def __init__(self, amount, currency_code):
        self.amount = amount
        self.currency_code = currency_code
    
    def __sub__(self, other):
        if isinstance(other, Currency):
            if self.currency_code != other.currency_code:
                raise ValueError("Cannot subtract different currencies")
            return Currency(self.amount - other.amount, self.currency_code)
        elif isinstance(other, (int, float)):
            return Currency(self.amount - other, self.currency_code)
        return NotImplemented
    
    def __repr__(self):
        return f"{self.amount} {self.currency_code}"

usd1 = Currency(100, "USD")
usd2 = Currency(30, "USD")
print(usd1 - usd2)  # 70 USD
print(usd1 - 15)    # 85 USD

This Currency class allows subtraction between Currency objects of the same type
and also supports subtracting numbers directly from the amount.

The method includes type checking and currency validation to ensure only
meaningful operations are performed. This makes the class more robust.

## Reverse Subtraction with __rsub__

When the left operand doesn't support subtraction with the right operand,
Python tries the reverse operation using __rsub__.

reverse_sub.py
  

class Temperature:
    def __init__(self, value):
        self.value = value
    
    def __sub__(self, other):
        if isinstance(other, Temperature):
            return Temperature(self.value - other.value)
        return NotImplemented
    
    def __rsub__(self, other):
        if isinstance(other, (int, float)):
            return Temperature(other - self.value)
        return NotImplemented
    
    def __repr__(self):
        return f"{self.value}°C"

temp = Temperature(10)
result1 = temp - Temperature(3)  # Uses __sub__
result2 = 20 - temp              # Uses __rsub__
print(result1)  # 7°C
print(result2)  # 10°C

This example shows both normal and reverse subtraction. When Python encounters
20 - temp, it first tries int.__sub__ which fails.

Then it tries temp.__rsub__(20) which succeeds. This makes the
class more flexible when used with built-in types.

## In-Place Subtraction with __isub__

The __isub__ method implements in-place subtraction (-=) which
modifies the object instead of creating a new one.

inplace_sub.py
  

class Account:
    def __init__(self, balance):
        self.balance = balance
    
    def __sub__(self, other):
        if isinstance(other, (int, float)):
            return Account(self.balance - other)
        return NotImplemented
    
    def __isub__(self, other):
        if isinstance(other, (int, float)):
            self.balance -= other
            return self
        return NotImplemented
    
    def __repr__(self):
        return f"Account(balance={self.balance})"

acc = Account(100)
acc -= 30  # Uses __isub__
print(acc)  # Account(balance=70)

The __isub__ method modifies the object's state directly and
returns self. This is more efficient than __sub__ when you don't
need a new object.

For mutable objects, implementing __isub__ can provide better
performance by avoiding unnecessary object creation.

## Best Practices

- **Type checking:** Always validate operand types in __sub__

- **Return NotImplemented:** For unsupported operations

- **Implement __rsub__:** For reverse operation support

- **Consider __isub__:** For efficient in-place operations

- **Maintain consistency:** Ensure subtraction follows mathematical rules

## Source References

- [Python __sub__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__sub__)

- [Python __rsub__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__rsub__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).