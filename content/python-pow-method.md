+++
title = "Python __pow__ Method"
date = 2025-08-29T20:08:21.715+01:00
draft = false
description = "Complete guide to Python's __pow__ method covering power operations, operator overloading, and mathematical customization."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __pow__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __pow__ method, the
special method that implements power/exponentiation operations. We'll cover
basic usage, three-argument form, mathematical customization, and examples.

## Basic Definitions

The __pow__ method is called to implement the power/exponentiation
operation (** operator). It allows objects to define their own
behavior for the power operation.

Key characteristics: it takes at least two arguments (self and exponent), can
accept an optional third argument for modulus, and should return the result of
the power operation. It's part of Python's operator overloading system.

## Basic __pow__ Implementation

Here's a simple implementation showing how __pow__ works with the
** operator. This example creates a number wrapper class.

basic_pow.py
  

class PowerNumber:
    def __init__(self, value):
        self.value = value
    
    def __pow__(self, exponent):
        print("__pow__ called")
        return self.value ** exponent

num = PowerNumber(3)
result = num ** 4  # Calls __pow__
print(result)  # Output: 81

This example shows the basic power operation. When ** is used with
a PowerNumber instance, Python calls __pow__ with the exponent.

The method returns the result of raising the stored value to the given power.
This allows custom power behavior for user-defined objects.

## Three-Argument Power Operation

__pow__ can also implement the three-argument form of pow()
which includes a modulus parameter for modular exponentiation.

three_arg_pow.py
  

class ModularNumber:
    def __init__(self, value):
        self.value = value
    
    def __pow__(self, exponent, modulus=None):
        print("__pow__ called with modulus" if modulus else "__pow__ called")
        if modulus is not None:
            return pow(self.value, exponent, modulus)
        return self.value ** exponent

num = ModularNumber(5)
print(num ** 3)  # 125
print(pow(num, 3, 7))  # 6 (125 % 7)

This implementation handles both two-argument and three-argument power
operations. The modulus parameter is optional and defaults to None.

When using the built-in pow() with three arguments, Python calls
__pow__ with the modulus parameter. This enables efficient modular
exponentiation.

## Reverse Power Operation with __rpow__

When the left operand doesn't support power operation, Python checks for
__rpow__ on the right operand. This is called "reflected power".

reverse_pow.py
  

class ReversePower:
    def __rpow__(self, base):
        print("__rpow__ called")
        return base ** 2  # Always squares the base

rp = ReversePower()
result = 5 ** rp  # Calls __rpow__
print(result)  # 25

This example shows how __rpow__ is called when the left operand
(5 in this case) doesn't know how to handle power operations with our class.

The method receives the base as its first argument and returns the result of
the operation. This enables power operations with built-in types on the left.

## Matrix Exponentiation

__pow__ can implement matrix exponentiation, where a matrix is
raised to an integer power through repeated multiplication.

matrix_pow.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __mul__(self, other):
        # Simple matrix multiplication (for illustration)
        return Matrix([[sum(a*b for a,b in zip(row, col)) 
                       for col in zip(*other.data)] 
                       for row in self.data])
    
    def __pow__(self, exponent):
        if not isinstance(exponent, int) or exponent &lt; 0:
            raise ValueError("Exponent must be non-negative integer")
        result = Matrix([[1 if i == j else 0 for j in range(len(self.data))]
                        for i in range(len(self.data))])  # Identity matrix
        for _ in range(exponent):
            result = result * self
        return result
    
    def __repr__(self):
        return str(self.data)

m = Matrix([[1, 2], [3, 4]])
print(m ** 2)  # [[7, 10], [15, 22]]

This matrix class implements exponentiation through repeated multiplication.
The __pow__ method checks for valid exponents and uses the
identity matrix as the starting point.

Matrix exponentiation is useful in many mathematical and scientific computing
applications, particularly for linear transformations.

## Custom Mathematical Operations

__pow__ can define non-standard power operations, like element-wise
exponentiation for container classes or other mathematical operations.

custom_pow.py
  

class Vector:
    def __init__(self, values):
        self.values = values
    
    def __pow__(self, exponent):
        if isinstance(exponent, (int, float)):
            return Vector([x ** exponent for x in self.values])
        elif isinstance(exponent, Vector):
            return Vector([x ** y for x, y in zip(self.values, exponent.values)])
        else:
            raise TypeError("Unsupported exponent type")
    
    def __repr__(self):
        return f"Vector({self.values})"

v1 = Vector([2, 3, 4])
print(v1 ** 2)  # Vector([4, 9, 16])
print(v1 ** Vector([1, 2, 3]))  # Vector([2, 9, 64])

This Vector class implements element-wise exponentiation. It handles both
scalar exponents (applied to each element) and vector exponents (element-wise).

The method includes type checking to ensure the exponent is either a number
or another Vector, raising TypeError for unsupported types.

## Best Practices

- **Handle different exponent types:** Check exponent types for safety

- **Implement __rpow__ when needed:** For operations with built-ins on left

- **Consider three-argument form:** Support modular exponentiation if relevant

- **Document behavior:** Clearly document any special power rules

- **Raise appropriate exceptions:** For invalid exponents or operations

## Source References

- [Python __pow__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__pow__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).