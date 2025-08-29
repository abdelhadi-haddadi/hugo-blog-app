+++
title = "Python __matmul__ Method"
date = 2025-08-29T20:08:18.375+01:00
draft = false
description = "Complete guide to Python's __matmul__ method covering matrix multiplication, operator overloading, and numpy integration."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __matmul__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __matmul__ method, the
special method that implements matrix multiplication. We'll cover basic usage,
NumPy integration, custom implementations, and practical examples.

## Basic Definitions

The __matmul__ method implements the matrix multiplication
operation (@) in Python. Introduced in Python 3.5, it provides
a dedicated operator for matrix operations distinct from element-wise
multiplication.

Key characteristics: it must accept two operands (self and other), should return
the result of matrix multiplication, and is invoked when using the @
operator. It's commonly used in numerical computing libraries like NumPy.

## Basic __matmul__ Implementation

Here's a simple implementation showing how to use __matmul__ in a
custom class. This example creates a basic 2x2 matrix class with matrix
multiplication support.

basic_matmul.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
        
    def __matmul__(self, other):
        if len(self.data[0]) != len(other.data):
            raise ValueError("Incompatible matrix dimensions")
            
        result = [[0 for _ in range(len(other.data[0]))] 
                 for _ in range(len(self.data))]
        
        for i in range(len(self.data)):
            for j in range(len(other.data[0])):
                for k in range(len(other.data)):
                    result[i][j] += self.data[i][k] * other.data[k][j]
        return Matrix(result)
    
    def __repr__(self):
        return str(self.data)

A = Matrix([[1, 2], [3, 4]])
B = Matrix([[5, 6], [7, 8]])
print(A @ B)  # [[19, 22], [43, 50]]

This example shows the standard matrix multiplication algorithm. The
__matmul__ method checks dimension compatibility, performs the
calculation, and returns a new Matrix instance with the result.

The implementation uses nested loops to compute the dot product of rows and
columns. The @ operator provides cleaner syntax than calling a
method like multiply().

## NumPy Matrix Multiplication

NumPy's ndarray uses __matmul__ for matrix
multiplication. This example demonstrates NumPy's implementation which is
optimized for performance.

numpy_matmul.py
  

import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Using @ operator (calls __matmul__)
result = A @ B
print(result)

# Equivalent using matmul function
result = np.matmul(A, B)
print(result)

# Note: * does element-wise multiplication
print(A * B)  # Different from @

NumPy's implementation is highly optimized using C and Fortran libraries. The
@ operator provides a clean syntax for matrix operations while
clearly distinguishing from element-wise multiplication (*).

For large matrices, NumPy's implementation is orders of magnitude faster than
pure Python. It also handles broadcasting and higher-dimensional arrays.

## Vector Multiplication

The __matmul__ method can also implement vector dot products.
This example shows a Vector class with dot product support via @.

vector_dot.py
  

class Vector:
    def __init__(self, components):
        self.components = components
        
    def __matmul__(self, other):
        if len(self.components) != len(other.components):
            raise ValueError("Vectors must have same length")
        return sum(a * b for a, b in zip(self.components, other.components))
    
    def __repr__(self):
        return f"Vector({self.components})"

v1 = Vector([1, 2, 3])
v2 = Vector([4, 5, 6])
print(v1 @ v2)  # 32 (1*4 + 2*5 + 3*6)

This implementation calculates the dot product of two vectors. The
__matmul__ method checks vector lengths match, then computes the
sum of component-wise products.

Using @ for dot products provides mathematical clarity, though
some libraries use it exclusively for matrix-matrix multiplication.

## Chained Matrix Operations

The @ operator can be chained like other arithmetic operators.
This example demonstrates multiple matrix multiplications in one expression.

chained_matmul.py
  

import numpy as np

A = np.random.rand(3, 3)
B = np.random.rand(3, 3)
C = np.random.rand(3, 3)

# Chained matrix multiplication
result = A @ B @ C

# Equivalent to:
temp = A @ B
result = temp @ C

print(result.shape)  # (3, 3)

Matrix multiplication is associative, so chaining operations with @
works as expected. The operations are performed left-to-right, with each
@ calling __matmul__ on its left operand.

NumPy optimizes such chains internally when possible, reducing temporary
allocations. The syntax remains clean regardless of operation count.

## Custom Linear Transformation

This example shows how __matmul__ can implement linear
transformations, applying a transformation matrix to a vector.

linear_transform.py
  

class Transform:
    def __init__(self, matrix):
        self.matrix = matrix
        
    def __matmul__(self, vector):
        if len(self.matrix[0]) != len(vector):
            raise ValueError("Incompatible dimensions")
        return [sum(m * v for m, v in zip(row, vector))
                for row in self.matrix]

    def __repr__(self):
        return f"Transform({self.matrix})"

# Rotation matrix (45 degrees)
theta = 45 * (3.14159 / 180)
rot = Transform([
    [np.cos(theta), -np.sin(theta)],
    [np.sin(theta), np.cos(theta)]
])

point = [1, 0]  # Point on x-axis
transformed = rot @ point
print(transformed)  # [0.7071, 0.7071] (45° rotated)

This implementation applies a transformation matrix to a vector using the
@ operator. The __matmul__ method performs the
matrix-vector multiplication.

The example shows a rotation transformation, but any linear transformation
can be represented this way. The clean syntax makes mathematical code more
readable.

## Best Practices

- **Follow mathematical conventions:** Implement proper matrix multiplication rules

- **Check dimensions:** Validate input shapes match multiplication requirements

- **Return appropriate type:** Maintain consistent return types with inputs

- **Document behavior:** Clearly specify supported operations and dimensions

- **Consider performance:** For complex operations, optimize or use libraries

## Source References

- [Python __matmul__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__matmul__)

- [NumPy matmul Documentation](https://numpy.org/doc/stable/reference/generated/numpy.matmul.html)

- [PEP 465 - @ operator introduction](https://www.python.org/dev/peps/pep-0465/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).