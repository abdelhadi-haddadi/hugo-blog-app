+++
title = "Python __pos__ Method"
date = 2025-08-29T20:08:21.720+01:00
draft = false
description = "Complete guide to Python's __pos__ method covering unary plus operator overloading with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __pos__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __pos__ method, the
special method that implements the unary plus operator (+). We'll cover basic
usage, numeric types, custom classes, and practical examples.

## Basic Definitions

The __pos__ method is called to implement the unary plus (+)
operation. It should return the result of the operation, typically the object
itself or a modified version.

Key characteristics: it takes only self as parameter, should return
a value, and is invoked when the unary + operator is used on an instance. It's
part of Python's operator overloading mechanism.

## Basic __pos__ Implementation

Here's a simple implementation showing how __pos__ works with a
custom class. The method returns the object itself by default.

basic_pos.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __pos__(self):
        print("__pos__ called")
        return self
    
    def __repr__(self):
        return f"Number({self.value})"

num = Number(5)
+num  # Calls __pos__

This example shows the basic structure. The __pos__ method is
called when the unary + operator is used on the instance. Here it just returns
the object itself.

The output would show "__pos__ called" when the + operator is used. This is the
most basic implementation possible.

## Modifying Value with __pos__

We can make __pos__ actually modify the value before returning it.
This demonstrates how to implement meaningful behavior.

modifying_pos.py
  

class PositiveNumber:
    def __init__(self, value):
        self.value = value
    
    def __pos__(self):
        return PositiveNumber(abs(self.value))
    
    def __repr__(self):
        return f"PositiveNumber({self.value})"

num = PositiveNumber(-5)
result = +num
print(result)  # PositiveNumber(5)

This implementation ensures the number is always positive when the unary +
operator is applied. It creates and returns a new instance with the absolute
value.

The original instance remains unchanged. This is a common pattern when working
with immutable numeric types where operations return new objects.

## __pos__ with Mathematical Operations

The __pos__ method can be combined with other mathematical
operations to create more complex behaviors.

math_operations.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __pos__(self):
        return Vector(+self.x, +self.y)
    
    def __neg__(self):
        return Vector(-self.x, -self.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(2, -3)
print(+v)  # Vector(2, -3)
print(-v)  # Vector(-2, 3)

This Vector class implements both __pos__ and __neg__.
The positive version returns a new vector with components unchanged, while the
negative version inverts them.

This shows how unary operators can work together to provide complete mathematical
operations for custom classes.

## __pos__ with Inheritance

When inheriting from built-in types, __pos__ can be overridden to
modify the default behavior of the unary + operator.

inheritance_pos.py
  

class MyInt(int):
    def __pos__(self):
        print("Custom __pos__ called")
        return MyInt(super().__pos__() + 1)

num = MyInt(5)
result = +num
print(result)  # 6

This custom integer class increments the value by 1 when the unary + operator is
applied. It demonstrates how to extend built-in type behavior.

The method calls the parent class's __pos__ using super(),
then adds 1 to the result. This pattern is useful for modifying existing numeric
behaviors.

## Practical Use Case: Currency Class

Here's a practical example using __pos__ in a financial application
to ensure positive currency values.

currency.py
  

class Currency:
    def __init__(self, amount):
        self.amount = amount
    
    def __pos__(self):
        return Currency(abs(self.amount))
    
    def __repr__(self):
        return f"${self.amount:.2f}"

debt = Currency(-100.50)
positive_debt = +debt
print(positive_debt)  # $100.50

This Currency class uses __pos__ to convert negative amounts to
positive values. This could represent converting debt to a positive display
value.

Financial applications often need such transformations when displaying values
while preserving the original data for calculations.

## Best Practices

- **Maintain consistency:** +x should generally not change x's value

- **Return new objects:** For immutable types, return a new instance

- **Preserve type:** Return the same type as the operand

- **Document behavior:** Clearly document any special behavior

- **Combine with __neg__:** Often implemented together

## Source References

- [Python __pos__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__pos__)

- [Python Operator Module Docs](https://docs.python.org/3/library/operator.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).