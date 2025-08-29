+++
title = "Python __divmod__ Method"
date = 2025-08-29T20:08:07.189+01:00
draft = false
description = "Complete guide to Python's __divmod__ method covering division and modulo operations, numeric types, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python __divmod__ Method

Last modified April 8, 2025

This comprehensive guide explores Python's __divmod__ method, the
special method that implements the built-in divmod() function.
We'll cover basic usage, numeric operations, custom implementations, and
practical examples.

## Basic Definitions

The __divmod__ method is a special method that implements the
divmod() built-in function. It returns a tuple containing the
quotient and remainder when dividing two numbers.

Key characteristics: it takes two arguments (self and other), returns a tuple
of two values (quotient, remainder), and is called by the divmod()
function. It must be implemented for numeric types to support this operation.

## Basic __divmod__ Implementation

Here's a simple implementation showing how __divmod__ works with
built-in numeric types. It demonstrates the basic behavior of the method.

basic_divmod.py
  

x = 10
y = 3
result = divmod(x, y)
print(result)  # Output: (3, 1)

# Equivalent to:
print((x // y, x % y))

This example shows the standard behavior with integers. The divmod()
function returns a tuple with the quotient (3) and remainder (1) of 10 divided by 3.

The __divmod__ method is called behind the scenes when using
divmod() on objects that implement it. For built-in types, this
is already provided.

## Custom Class with __divmod__

We can implement __divmod__ in custom classes to support the
divmod() operation. Here's an example with a custom number class.

custom_divmod.py
  

class MyNumber:
    def __init__(self, value):
        self.value = value
    
    def __divmod__(self, other):
        quotient = self.value // other.value
        remainder = self.value % other.value
        return (quotient, remainder)

a = MyNumber(17)
b = MyNumber(5)
print(divmod(a, b))  # Output: (3, 2)

This custom number class implements __divmod__ to support the
divmod() operation. It performs integer division and modulo on
the stored values.

The implementation returns a tuple with the quotient and remainder, matching
the behavior of built-in numeric types. This makes the class work seamlessly
with Python's numeric operations.

## Floating Point Division with __divmod__

The __divmod__ method also works with floating-point numbers,
though the results may be less intuitive due to floating-point precision.

float_divmod.py
  

x = 10.5
y = 3.2
result = divmod(x, y)
print(result)  # Output: (3.0, 0.8999999999999995)

# Explanation:
# 3.2 * 3 = 9.6
# 10.5 - 9.6 = 0.9 (with floating point precision error)

This example demonstrates divmod() with floating-point numbers.
The quotient is 3.0, and the remainder is approximately 0.9 (with floating-point
precision error).

Note that floating-point arithmetic can introduce small precision errors, as
shown in the remainder calculation. This is inherent to floating-point
representation in computers.

## Negative Numbers with __divmod__

The behavior of __divmod__ with negative numbers follows Python's
division rules, which might differ from mathematical expectations.

negative_divmod.py
  

# Positive dividend, negative divisor
print(divmod(10, -3))  # Output: (-4, -2)

# Negative dividend, positive divisor
print(divmod(-10, 3))  # Output: (-4, 2)

# Negative dividend and divisor
print(divmod(-10, -3))  # Output: (3, -1)

These examples show how divmod() handles negative numbers. The
results maintain the invariant: divmod(a, b)[1] has the same sign
as b.

The quotient is always rounded towards negative infinity, and the remainder
has the same sign as the divisor. This is Python's standard behavior for
division and modulo operations.

## Custom __divmod__ with Different Return Types

The __divmod__ method can return any type, not just tuples of
numbers. Here's an example returning a custom result object.

custom_result.py
  

class DivModResult:
    def __init__(self, quotient, remainder):
        self.quotient = quotient
        self.remainder = remainder
    
    def __repr__(self):
        return f"Result(q={self.quotient}, r={self.remainder})"

class MyNumber:
    def __init__(self, value):
        self.value = value
    
    def __divmod__(self, other):
        q = self.value // other.value
        r = self.value % other.value
        return DivModResult(q, r)

a = MyNumber(17)
b = MyNumber(5)
result = divmod(a, b)
print(result)  # Output: Result(q=3, r=2)

This example shows a custom __divmod__ implementation that returns
a specialized result object instead of a tuple. The DivModResult
class stores the quotient and remainder as attributes.

While this is possible, it's generally recommended to follow Python's convention
of returning a tuple for consistency with built-in types and user expectations.

## Best Practices

- **Maintain consistency:** Follow the same behavior as built-in numeric types

- **Handle edge cases:** Consider zero division and type mismatches

- **Return a tuple:** For consistency with Python's standard library

- **Document behavior:** Clearly document any special handling

- **Implement related methods:** Consider implementing __floordiv__ and __mod__

## Source References

- [Python __divmod__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__divmod__)

- [Python divmod() Function Docs](https://docs.python.org/3/library/functions.html#divmod)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).