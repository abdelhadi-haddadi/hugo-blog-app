+++
title = "Python __imatmul__ Method"
date = 2025-08-29T20:08:12.764+01:00
draft = false
description = "Complete guide to Python's __imatmul__ method covering in-place matrix multiplication and operator overloading."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __imatmul__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __imatmul__ method, the
special method for in-place matrix multiplication. We'll cover basic usage,
operator overloading, NumPy integration, and practical examples.

## Basic Definitions

The __imatmul__ method implements in-place matrix multiplication
using the @= operator. It modifies the left operand in-place
rather than creating a new object.

Key characteristics: it must return the modified object, typically performs
matrix multiplication, and is used when the @= operator is
applied. It's the in-place version of __matmul__.

## Basic __imatmul__ Implementation

Here's a simple implementation showing how __imatmul__ works with
a custom matrix class. It demonstrates basic in-place matrix multiplication.

basic_imatmul.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __imatmul__(self, other):
        if len(self.data[0]) != len(other.data):
            raise ValueError("Incompatible matrix dimensions")
        
        result = [
            [sum(a*b for a,b in zip(row, col)) 
             for col in zip(*other.data)]
            for row in self.data
        ]
        self.data = result
        return self

m1 = Matrix([[1, 2], [3, 4]])
m2 = Matrix([[5, 6], [7, 8]])
m1 @= m2
print(m1.data)  # [[19, 22], [43, 50]]

This example shows matrix multiplication performed in-place. The @=
operator calls __imatmul__, which modifies the left operand's data.

The method checks for compatible dimensions, computes the product, updates
self.data, and returns self to maintain the in-place
nature of the operation.

## Falling Back to __matmul__

If __imatmul__ is not implemented, Python falls back to
__matmul__ followed by assignment. This example demonstrates
the behavior.

fallback.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __matmul__(self, other):
        print("__matmul__ called")
        result = [
            [sum(a*b for a,b in zip(row, col)) 
             for col in zip(*other.data)]
            for row in self.data
        ]
        return Matrix(result)

m1 = Matrix([[1, 2], [3, 4]])
m2 = Matrix([[5, 6], [7, 8]])
m1 @= m2  # Falls back to __matmul__ + assignment
print(m1.data)  # [[19, 22], [43, 50]]

When __imatmul__ is missing, Python calls __matmul__
and assigns the result to the left operand. This creates a new object rather
than modifying in-place.

The output shows __matmul__ called, proving the fallback behavior.
This is less efficient than true in-place operation for large matrices.

## NumPy Array Integration

NumPy arrays implement __imatmul__ for efficient in-place matrix
operations. This example shows its usage with NumPy.

numpy_imatmul.py
  

import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print("Before @=:", id(a))
a @= b
print("After @=:", id(a))  # Same ID
print(a)
# Output:
# [[19 22]
# [43 50]]

NumPy's implementation modifies the array in-place without creating a new
object. The memory address (id) remains the same after the
operation.

This is particularly important for large matrices where creating new objects
would be memory-intensive. NumPy optimizes these operations for performance.

## Custom Class with Both Methods

This example shows a class implementing both __matmul__ and
__imatmul__ to demonstrate their different behaviors.

both_methods.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __matmul__(self, other):
        print("__matmul__ called")
        result = [
            [sum(a*b for a,b in zip(row, col)) 
             for col in zip(*other.data)]
            for row in self.data
        ]
        return Matrix(result)
    
    def __imatmul__(self, other):
        print("__imatmul__ called")
        if len(self.data[0]) != len(other.data):
            raise ValueError("Incompatible dimensions")
        
        self.data = [
            [sum(a*b for a,b in zip(row, col)) 
             for col in zip(*other.data)]
            for row in self.data
        ]
        return self

m1 = Matrix([[1, 2], [3, 4]])
m2 = Matrix([[5, 6], [7, 8]])

m3 = m1 @ m2  # Calls __matmul__
print("m3 is new object:", m3 is not m1)

m1 @= m2  # Calls __imatmul__
print("m1 modified in place:", m1.data)

The output shows which method gets called for each operation. @
creates a new object while @= modifies in-place.

This demonstrates how Python chooses the appropriate method based on whether
the operation is in-place or not. Both methods can coexist in the same class.

## Immutable Objects and __imatmul__

Immutable objects cannot implement true in-place operations. This example shows
how they might handle @= by returning a new object.

immutable.py
  

class ImmutableMatrix:
    def __init__(self, data):
        self._data = tuple(tuple(row) for row in data)
    
    @property
    def data(self):
        return self._data
    
    def __imatmul__(self, other):
        print("Cannot modify immutable object, returning new instance")
        result = [
            [sum(a*b for a,b in zip(row, col)) 
             for col in zip(*other.data)]
            for row in self.data
        ]
        return ImmutableMatrix(result)

m1 = ImmutableMatrix([[1, 2], [3, 4]])
m2 = ImmutableMatrix([[5, 6], [7, 8]])

m1 @= m2  # Actually creates new object
print(m1.data)  # Shows new matrix data

Despite using @=, this operation creates a new object because
the original cannot be modified. The method warns about this behavior.

This pattern is useful when you want to maintain immutability but still
support the in-place operator syntax. The implementation effectively makes
@= behave like @.

## Best Practices

- **Return self:** Always return the modified object from __imatmul__

- **Type consistency:** Maintain the same type after operation

- **Error handling:** Validate inputs and dimensions

- **Performance:** Optimize for in-place modification

- **Document behavior:** Clearly document any non-standard behavior

## Source References

- [Python __imatmul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__imatmul__)

- [NumPy __imatmul__ Docs](https://numpy.org/doc/stable/reference/generated/numpy.ndarray.__imatmul__.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).