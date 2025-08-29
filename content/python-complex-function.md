+++
title = "Python complex Function"
date = 2025-08-29T20:07:49.923+01:00
draft = false
description = "Complete guide to Python's complex function covering creation, operations, and practical examples of complex numbers."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python complex Function

Last modified April 11, 2025

This comprehensive guide explores Python's complex function, which
creates complex numbers. We'll cover creation methods, operations, conversions,
and practical examples of complex number usage.

## Basic Definitions

The complex function creates a complex number from real and
imaginary parts. Complex numbers have the form a + bj, where a is the real
part and b is the imaginary part.

Key characteristics: accepts integers, floats, strings, or two numbers. Returns
an immutable complex number object. Supports all arithmetic operations and
special methods.

## Creating Complex Numbers

Here's basic usage showing different ways to create complex numbers using the
complex function.

basic_complex.py
  

# From two numbers
c1 = complex(3, 4)  # 3 + 4j
print(c1)

# From a string
c2 = complex("5+6j") # 5 + 6j
print(c2)

# With one argument (imaginary part 0)
c3 = complex(7)      # 7 + 0j
print(c3)

# From another complex number
c4 = complex(c1)     # 3 + 4j
print(c4)

This example shows the four main ways to create complex numbers. The most common
is passing two numbers (real and imaginary parts).

The string format must not contain spaces and use 'j' for the imaginary part.
Single argument creates a complex with imaginary part 0.

## Complex Number Operations

Complex numbers support standard arithmetic operations. This example demonstrates
basic operations with complex numbers.

operations.py
  

a = complex(2, 3)
b = complex(4, 5)

# Addition
print(a + b)  # (6+8j)

# Subtraction
print(a - b)  # (-2-2j)

# Multiplication
print(a * b)  # (-7+22j)

# Division
print(a / b)  # (0.5609756097560976+0.0487804878048781j)

# Conjugate
print(a.conjugate())  # (2-3j)

Complex numbers follow standard mathematical rules for operations. Addition and
subtraction work component-wise. Multiplication uses the distributive property.

Division is more complex, requiring multiplication by the conjugate. The
conjugate method flips the sign of the imaginary part.

## Accessing Parts and Conversion

This example shows how to access real and imaginary parts and convert between
types.

parts_conversion.py
  

c = complex(3.5, 4.2)

# Access parts
print(c.real)   # 3.5
print(c.imag)   # 4.2

# Convert to string
s = str(c)      # '(3.5+4.2j)'
print(s)

# Convert from string
c2 = complex(s)
print(c2)       # (3.5+4.2j)

# Absolute value (magnitude)
print(abs(c))   # 5.4644304369257

The real and  attributes access the components. The str
function converts to string representation, which can be parsed back.

The abs function returns the magnitude (√(real² + imag²)). This is
useful for many mathematical applications.

## Practical Application: Rotation

Complex numbers can represent rotations in 2D space. This example shows rotation
of a point by multiplying by a unit complex number.

rotation.py
  

import math

def rotate_point(point, angle_degrees):
    # Convert angle to radians
    angle = math.radians(angle_degrees)
    # Create rotation complex number
    rotation = complex(math.cos(angle), math.sin(angle))
    # Convert point to complex
    point_complex = complex(*point)
    # Apply rotation
    rotated = point_complex * rotation
    return (rotated.real, rotated.imag)

original = (3, 4)
rotated = rotate_point(original, 90)
print(f"Original: {original}")
print(f"Rotated 90°: {rotated}")

This demonstrates how complex multiplication performs rotation. The rotation
complex number has magnitude 1 (unit circle) and angle θ.

The result shows the point (3,4) rotated 90 degrees counterclockwise, which
should be approximately (-4,3).

## Error Handling

The complex function raises ValueError for invalid
inputs. This example shows proper error handling.

errors.py
  

try:
    c = complex("3 + 4 i")  # Spaces and wrong imaginary symbol
except ValueError as e:
    print(f"Error: {e}")

try:
    c = complex("abc")      # Non-numeric string
except ValueError as e:
    print(f"Error: {e}")

try:
    c = complex(3, "4")    # Non-numeric argument
except TypeError as e:
    print(f"Error: {e}")

These examples demonstrate complex's behavior with invalid inputs.
String parsing is strict about format. Arguments must be numbers.

For robust code, validate inputs before conversion or handle these exceptions
appropriately.

## Best Practices

- **Use for mathematical operations:** Complex numbers simplify many calculations

- **Prefer two-number constructor:** More readable than string parsing

- **Document assumptions:** Clearly document when using complex numbers

- **Handle conversions carefully:** Watch for precision loss with floats

- **Consider cmath module:** For advanced complex number functions

## Source References

- [Python complex() Documentation](https://docs.python.org/3/library/functions.html#complex)

- [Python cmath Module](https://docs.python.org/3/library/cmath.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).