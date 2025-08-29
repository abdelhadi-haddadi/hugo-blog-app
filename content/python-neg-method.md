+++
title = "Python __neg__ Method"
date = 2025-08-29T20:08:20.623+01:00
draft = false
description = "Complete guide to Python's __neg__ method covering unary operator overloading, mathematical operations, and custom classes."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __neg__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __neg__ method, the
special method that implements the unary negation operator (-). We'll cover
basic usage, mathematical operations, custom classes, and practical examples.

## Basic Definitions

The __neg__ method is a special method in Python that implements
the unary negation operator (-). When you use the - operator on an object,
Python calls this method to determine the result.

Key characteristics: it takes only self as parameter, returns the
negated value, and should return a new object rather than modifying the
original. It enables operator overloading for custom classes.

## Basic __neg__ Implementation

Here's a simple implementation showing how __neg__ works with a
custom number class. It demonstrates the basic syntax and behavior.

basic_neg.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __neg__(self):
        return Number(-self.value)
    
    def __repr__(self):
        return f"Number({self.value})"

num = Number(5)
neg_num = -num
print(neg_num)  # Output: Number(-5)

This example shows that applying the - operator to a Number instance calls
__neg__, which returns a new Number with the negated value.
The original object remains unchanged.

The __repr__ method is included for better string representation
but isn't required for __neg__ functionality.

## Mathematical Vector Negation

The __neg__ method is particularly useful for mathematical
classes where negation has a specific meaning, like vectors.

vector_negation.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __neg__(self):
        return Vector(-self.x, -self.y)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(3, -4)
neg_v = -v
print(neg_v)  # Output: Vector(-3, 4)

In this vector example, negation returns a new vector with both components
negated. This follows standard mathematical vector negation rules.

The method preserves the original vector while creating a new one with the
negated values, which is the expected behavior for immutable objects.

## Temperature Class with Negation

Here's a practical example using __neg__ with a temperature
class that handles both Celsius and Fahrenheit scales.

temperature_negation.py
  

class Temperature:
    def __init__(self, value, scale='C'):
        self.value = value
        self.scale = scale
    
    def __neg__(self):
        return Temperature(-self.value, self.scale)
    
    def convert(self):
        if self.scale == 'C':
            return Temperature(self.value * 9/5 + 32, 'F')
        else:
            return Temperature((self.value - 32) * 5/9, 'C')
    
    def __repr__(self):
        return f"{self.value}°{self.scale}"

temp = Temperature(25)
print(-temp)  # Output: -25°C
print((-temp).convert())  # Output: -13.0°F

This temperature class demonstrates that __neg__ only negates the
value while preserving the scale. The conversion method shows how negation
interacts with other operations.

Note that the negation doesn't automatically convert between scales - it
simply negates the numerical value in the current scale.

## Custom Money Class with Negation

This example shows a Money class where negation represents debt or negative
balance, a common financial concept.

money_negation.py
  

class Money:
    def __init__(self, amount, currency='USD'):
        self.amount = amount
        self.currency = currency
    
    def __neg__(self):
        return Money(-self.amount, self.currency)
    
    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("Currencies must match")
        return Money(self.amount + other.amount, self.currency)
    
    def __repr__(self):
        return f"{self.amount:.2f} {self.currency}"

balance = Money(100.50)
debt = -balance
print(debt)  # Output: -100.50 USD
print(balance + debt)  # Output: 0.00 USD

In this financial context, negation represents a debt or negative balance.
The example also shows how negation interacts with addition to zero out
a balance.

The currency check in __add__ demonstrates that __neg__
preserves all attributes (like currency) while only negating the amount.

## Matrix Negation

For more complex mathematical objects like matrices, __neg__
can implement element-wise negation following linear algebra rules.

matrix_negation.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __neg__(self):
        neg_data = [[-elem for elem in row] for row in self.data]
        return Matrix(neg_data)
    
    def __repr__(self):
        return '\n'.join(' '.join(f"{elem:3}" for elem in row) 
                        for row in self.data)

m = Matrix([[1, 2], [3, 4]])
print("Original:")
print(m)
print("\nNegated:")
print(-m)

This matrix implementation shows how __neg__ can handle nested
data structures by applying the negation operation to each element.

The list comprehension creates a new matrix with all elements negated,
following mathematical matrix negation rules while preserving the structure.

## Best Practices

- **Return a new object:** Negation should not modify the original

- **Preserve other attributes:** Only negate what's mathematically appropriate

- **Maintain immutability:** Original object should remain unchanged

- **Type consistency:** Return the same type as the original

- **Document behavior:** Clearly explain what negation means for your class

## Source References

- [Python __neg__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__neg__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).