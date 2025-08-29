+++
title = "Python __ifloordiv__ Method"
date = 2025-08-29T20:08:12.776+01:00
draft = false
description = "Complete guide to Python's __ifloordiv__ method covering in-place floor division operator overloading with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __ifloordiv__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __ifloordiv__ method, the
special method for in-place floor division. We'll cover basic usage, operator
overloading, practical examples, and common use cases.

## Basic Definitions

The __ifloordiv__ method implements the in-place floor division
operation (//=). It modifies the left operand in place rather than
creating a new object.

Key characteristics: it must return the modified object, performs floor division,
and is called when using the //= operator. It's the in-place
version of __floordiv__.

## Basic __ifloordiv__ Implementation

Here's a simple implementation showing how __ifloordiv__ works with
a custom class. It demonstrates basic in-place floor division behavior.

basic_ifloordiv.py
  

class Number:
    def __init__(self, value):
        self.value = value
    
    def __ifloordiv__(self, other):
        self.value //= other
        return self
    
    def __repr__(self):
        return f"Number({self.value})"

num = Number(10)
num //= 3
print(num)  # Output: Number(3)

This example shows a Number class that implements in-place floor
division. The //= operator modifies the instance's value directly.

The method modifies self.value and returns self, which
is required for in-place operations to work correctly in all contexts.

## Handling Different Right Operand Types

__ifloordiv__ can handle various right operand types. This example
shows how to implement type checking and conversion.

type_handling.py
  

class Container:
    def __init__(self, items):
        self.items = items
    
    def __ifloordiv__(self, other):
        if isinstance(other, int):
            self.items = self.items[::other]
        elif isinstance(other, Container):
            self.items = [x//y for x, y in zip(self.items, other.items)]
        else:
            raise TypeError("Unsupported operand type")
        return self
    
    def __repr__(self):
        return f"Container({self.items})"

c1 = Container([10, 20, 30, 40, 50])
c1 //= 2  # Take every 2nd item
print(c1)  # Container([10, 30, 50])

c2 = Container([5, 10, 15])
c1 //= c2  # Element-wise floor division
print(c1)  # Container([2, 3, 3])

This Container class implements two different behaviors for
//=: slicing when the right operand is an integer, and element-wise
division when it's another Container.

The example demonstrates how __ifloordiv__ can provide different
functionality based on the operand type, making it very flexible.

## Inheritance and __ifloordiv__

When inheriting from built-in types, you might need to implement
__ifloordiv__ to maintain expected behavior. Here's an example with
a custom list.

inheritance.py
  

class DivisibleList(list):
    def __ifloordiv__(self, divisor):
        for i in range(len(self)):
            self[i] //= divisor
        return self
    
    def __floordiv__(self, divisor):
        return DivisibleList([x // divisor for x in self])

nums = DivisibleList([10, 20, 30, 40, 50])
nums //= 3
print(nums)  # [3, 6, 10, 13, 16]

result = nums // 2
print(result)  # [1, 3, 5, 6, 8]
print(type(result))  # &lt;class '__main__.DivisibleList'&gt;

This DivisibleList class inherits from list and adds
both in-place and regular floor division operations. The //= operator
modifies the list in place.

Note we also implement __floordiv__ for the regular floor division
operation (//), which returns a new instance rather than modifying
the existing one.

## Matrix Floor Division

For mathematical applications, __ifloordiv__ can implement matrix
floor division. This example shows a simple matrix implementation.

matrix.py
  

class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __ifloordiv__(self, other):
        if isinstance(other, (int, float)):
            for row in self.data:
                for i in range(len(row)):
                    row[i] //= other
        elif isinstance(other, Matrix):
            for i in range(len(self.data)):
                for j in range(len(self.data[i])):
                    self.data[i][j] //= other.data[i][j]
        return self
    
    def __repr__(self):
        return '\n'.join(' '.join(map(str, row)) for row in self.data)

m = Matrix([[10, 20], [30, 40]])
m //= 3
print(m)
# Output:
# 3 6
# 10 13

This Matrix class implements in-place floor division for both scalar
values and other matrices. The operation modifies the matrix elements directly.

The implementation checks the operand type and performs either element-wise
division with a scalar or with another matrix of the same dimensions.

## Fraction Class with __ifloordiv__

For a more complex example, here's a Fraction class that implements
in-place floor division while maintaining reduced form.

fraction.py
  

from math import gcd

class Fraction:
    def __init__(self, numerator, denominator=1):
        common = gcd(numerator, denominator)
        self.n = numerator // common
        self.d = denominator // common
    
    def __ifloordiv__(self, other):
        if isinstance(other, int):
            self.n //= other
        elif isinstance(other, Fraction):
            self.n = (self.n * other.d) // (self.d * other.n)
            self.d = 1
        else:
            raise TypeError("Unsupported operand type")
        common = gcd(self.n, self.d)
        self.n //= common
        self.d //= common
        return self
    
    def __repr__(self):
        return f"Fraction({self.n}, {self.d})"

f = Fraction(10, 3)
f //= 2
print(f)  # Fraction(1, 1)

This Fraction class maintains fractions in reduced form and
implements in-place floor division with both integers and other fractions.

When dividing by another fraction, it converts the operation to multiplication
by the reciprocal before performing floor division, then simplifies the result.

## Best Practices

- **Always return self:** In-place operations should return the modified object

- **Implement __floordiv__ too:** Provide both in-place and regular versions

- **Handle type checking:** Validate operand types and raise TypeError if needed

- **Maintain immutability carefully:** In-place ops modify objects, which might affect other references

- **Document behavior:** Clearly document any special division logic

## Source References

- [Python __ifloordiv__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__ifloordiv__)

- [Python Numeric Type Emulation](https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).