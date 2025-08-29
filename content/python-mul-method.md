+++
title = "Python __mul__ Method"
date = 2025-08-29T20:08:19.480+01:00
draft = false
description = "Complete guide to Python's __mul__ method covering multiplication operator overloading with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __mul__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __mul__ method, the
special method that implements multiplication operation overloading. We'll cover
basic usage, commutative operations, matrix multiplication, and practical examples.

## Basic Definitions

The __mul__ method is called to implement the multiplication
operator (*). When you write x * y, Python attempts
to call x.__mul__(y).

Key characteristics: it must return the result of multiplication, can be
defined in any class, and should handle type checking. For commutative
operations, __rmul__ should also be implemented.

## Basic __mul__ Implementation

Here's a simple implementation showing how to overload the multiplication
operator for a custom class. This example creates a Vector class.

basic_mul.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __mul__(self, scalar):
        if isinstance(scalar, (int, float)):
            return Vector(self.x * scalar, self.y * scalar)
        return NotImplemented
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(2, 3)
print(v * 3)  # Vector(6, 9)

This example shows vector-scalar multiplication. The __mul__ method
checks if the right operand is a number before performing multiplication.

Returning NotImplemented tells Python to try other methods like
__rmul__ on the right operand if available.

## Implementing Commutative Multiplication

To handle cases where the left operand doesn't support multiplication but the
right one does, we implement __rmul__.

commutative.py
  

class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __mul__(self, scalar):
        if isinstance(scalar, (int, float)):
            return Vector(self.x * scalar, self.y * scalar)
        return NotImplemented
    
    def __rmul__(self, scalar):
        return self.__mul__(scalar)
    
    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(2, 3)
print(v * 3)   # Vector(6, 9)
print(3 * v)   # Vector(6, 9)

With __rmul__ implemented, both v * 3 and
3 * v work correctly. __rmul__ is called when the
left operand doesn't know how to multiply with the right operand.

The implementation simply delegates to __mul__ since scalar
multiplication is commutative.

## Matrix Multiplication with __matmul__

Python 3.5+ introduced the @ operator for matrix multiplication,
implemented via __matmul__.

matrix_mul.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __matmul__(self, other):
        if len(self.data[0]) != len(other.data):
            raise ValueError("Incompatible matrix dimensions")
        
        result = [[0] * len(other.data[0]) for _ in range(len(self.data))]
        for i in range(len(self.data)):
            for j in range(len(other.data[0])):
                for k in range(len(other.data)):
                    result[i][j] += self.data[i][k] * other.data[k][j]
        return Matrix(result)
    
    def __repr__(self):
        return '\n'.join([' '.join(map(str, row)) for row in self.data))

A = Matrix([[1, 2], [3, 4]])
B = Matrix([[5, 6], [7, 8]])
print(A @ B)

This example implements proper matrix multiplication using the @
operator. The __matmul__ method performs the dot product of rows
and columns.

The implementation checks for compatible dimensions and creates a new matrix
with the result. This is distinct from element-wise multiplication which would
use __mul__.

## Element-wise Multiplication

For classes representing collections, you might want element-wise multiplication
rather than matrix multiplication.

elementwise.py
  

class Vector:
    def __init__(self, *components):
        self.components = components
    
    def __mul__(self, other):
        if isinstance(other, Vector):
            if len(self.components) != len(other.components):
                raise ValueError("Vectors must be same length")
            return Vector(*[a * b for a, b in zip(self.components, other.components)])
        return NotImplemented
    
    def __repr__(self):
        return f"Vector{self.components}"

v1 = Vector(1, 2, 3)
v2 = Vector(4, 5, 6)
print(v1 * v2)  # Vector(4, 10, 18)

This implementation performs element-wise multiplication when both operands are
vectors. It checks that the vectors are the same length before multiplying.

The result is a new vector where each component is the product of corresponding
components in the input vectors.

## Combining Different Types

The __mul__ method can handle operations between different types
when appropriate. Here's an example with units.

units.py
  

class Meter:
    def __init__(self, value):
        self.value = value
    
    def __mul__(self, other):
        if isinstance(other, (int, float)):
            return Meter(self.value * other)
        if isinstance(other, Meter):
            return self.value * other.value  # returns area in square meters
        return NotImplemented
    
    def __rmul__(self, other):
        return self.__mul__(other)
    
    def __repr__(self):
        return f"{self.value}m"

distance = Meter(5)
print(distance * 2)    # 10m
print(3 * distance)    # 15m
area = distance * Meter(4)
print(area)           # 20

This example shows different behaviors based on the right operand's type.
Multiplying by a number scales the distance, while multiplying two Meter
instances returns an area.

The implementation demonstrates how a single operator can have different
meanings depending on context while maintaining type safety.

## Best Practices

- **Type checking:** Always verify operand types before operations

- **Return NotImplemented:** For unsupported types to enable fallback

- **Implement __rmul__:** For commutative operations

- **Document behavior:** Clearly specify supported operations

- **Consider performance:** Optimize for large data structures

## Source References

- [Python __mul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__mul__)

- [Python __rmul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__rmul__)

- [Python __matmul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__matmul__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).