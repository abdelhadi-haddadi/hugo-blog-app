+++
title = "Python __invert__ Method"
date = 2025-08-29T20:08:15.011+01:00
draft = false
description = "Complete guide to Python's __invert__ method covering bitwise operations, operator overloading, and custom implementations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __invert__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __invert__ method, the
special method that implements the bitwise NOT operation. We'll cover basic
usage, custom implementations, practical examples, and common use cases.

## Basic Definitions

The __invert__ method is a special method in Python that implements
the bitwise NOT operation (~). It is called when the unary ~ operator is used
on an object.

Key characteristics: it takes only self as parameter, returns the
inverted value, and can be overridden to customize behavior for custom classes.
It's one of Python's operator overloading methods.

## Basic __invert__ Implementation

Here's a simple implementation showing how __invert__ works with
integers and custom classes. It demonstrates the basic syntax and behavior.

basic_invert.py
  

class BitwiseNumber:
    def __init__(self, value):
        self.value = value
    
    def __invert__(self):
        return BitwiseNumber(~self.value)
    
    def __repr__(self):
        return f"BitwiseNumber({self.value})"

num = BitwiseNumber(5)
inverted = ~num
print(inverted)  # BitwiseNumber(-6)

This example shows a custom class that implements __invert__. When
we use the ~ operator, Python calls this method. For integers, ~x equals -(x+1).

The method returns a new instance rather than modifying the existing one. This
follows Python's convention of returning new objects for operations.

## Custom Bitmask Implementation

__invert__ is useful for working with bitmasks and flags. Here we
create a custom Flags class that uses inversion for flag manipulation.

flags.py
  

class Flags:
    def __init__(self, value=0):
        self.value = value
    
    def __invert__(self):
        return Flags(~self.value)
    
    def __or__(self, other):
        return Flags(self.value | other.value)
    
    def __and__(self, other):
        return Flags(self.value &amp; other.value)
    
    def __repr__(self):
        return f"Flags({bin(self.value)})"

READ = Flags(0b001)
WRITE = Flags(0b010)
EXECUTE = Flags(0b100)

permissions = READ | WRITE
print(~permissions)  # Inverts all bits

This Flags class implements several bitwise operations. The __invert__
method flips all bits in the value. Combined with other operators, it creates a
powerful bitmask system.

The inversion operation is particularly useful for creating mask complements or
toggling flag states in bitmask operations.

## Matrix Inversion Implementation

We can repurpose __invert__ for non-bitwise operations. Here we use
it for matrix inversion in a linear algebra context.

matrix.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __invert__(self):
        # Simple 2x2 matrix inversion
        a, b = self.data[0]
        c, d = self.data[1]
        det = a * d - b * c
        return Matrix([
            [d/det, -b/det],
            [-c/det, a/det]
        ])
    
    def __repr__(self):
        return f"Matrix({self.data})"

m = Matrix([[4, 7], [2, 6]])
inverse = ~m
print(inverse)  # Inverted matrix

This example shows an unconventional but valid use of __invert__ for
matrix inversion. While ~ typically means bitwise NOT, Python allows creative
operator overloading.

Note that this usage might confuse users expecting bitwise operations. Clear
documentation is essential when repurposing operators this way.

## Binary Complement for Custom Number System

Here we implement a custom binary number system where __invert__
returns the 1's complement (bitwise negation) of our custom number.

binary.py
  

class Binary:
    def __init__(self, value, bits=8):
        self.value = value
        self.bits = bits
    
    def __invert__(self):
        mask = (1 &lt;&lt; self.bits) - 1
        return Binary((~self.value) &amp; mask, self.bits)
    
    def __repr__(self):
        return f"Binary({bin(self.value)}, bits={self.bits})"

num = Binary(0b1010, bits=4)
print(~num)  # Binary(0b0101, bits=4)

This Binary class maintains a fixed bit width. The __invert__
implementation ensures the result stays within the specified bit range using
a mask.

The mask operation prevents Python's infinite-precision integers from producing
unexpectedly large negative numbers when inverted.

## Security Role Inversion

In this security-focused example, we use __invert__ to return a
role with inverted permissions for testing purposes.

security.py
  

class Role:
    def __init__(self, read=False, write=False, execute=False):
        self.read = read
        self.write = write
        self.execute = execute
    
    def __invert__(self):
        return Role(
            not self.read,
            not self.write,
            not self.execute
        )
    
    def __repr__(self):
        return f"Role(r={self.read}, w={self.write}, x={self.execute})"

admin = Role(True, True, True)
no_access = ~admin
print(no_access)  # Role with all False

This Role class uses __invert__ to create a role with opposite
permissions. This is useful for security testing to verify denied access.

While unconventional, this demonstrates how __invert__ can represent
logical inversion beyond just bitwise operations when appropriately documented.

## Best Practices

- **Follow expected behavior:** ~ should perform bitwise NOT unless documented otherwise

- **Return appropriate type:** Typically return same class instance

- **Document deviations:** Clearly document if using for non-bitwise operations

- **Consider immutability:** Return new instance rather than modifying self

- **Maintain consistency:** Ensure behavior aligns with other related magic methods

## Source References

- [Python __invert__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__invert__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).