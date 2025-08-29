+++
title = "Python divmod Function"
date = 2025-08-29T20:07:57.959+01:00
draft = false
description = "Complete guide to Python's divmod function covering basic usage, numeric types, and practical examples of division and modulo operations."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python divmod Function

Last modified April 11, 2025

This comprehensive guide explores Python's divmod function, which
performs division and modulo operations simultaneously. We'll cover numeric
types, practical applications, and performance considerations.

## Basic Definitions

The divmod function takes two numbers and returns a tuple containing
their quotient and remainder. It combines floor division (//) and
modulo (%) operations in one call.

Key characteristics: works with integers, floats, and complex numbers. For
integers, it returns (a // b, a % b). For floats, it returns
(q, a % b) where q is usually math.floor(a / b).

## Basic Integer Division

Here's simple usage with integers showing how divmod returns both
the quotient and remainder from division.

basic_divmod.py
  

# With positive integers
print(divmod(10, 3))   # (3, 1)
print(10 // 3, 10 % 3) # Same as above

# With negative integers
print(divmod(-10, 3))  # (-4, 2)
print(divmod(10, -3))  # (-4, -2)

This example shows divmod with integers. The first value in the
tuple is the quotient, the second is the remainder. Note how negative numbers
affect the results.

The results follow Python's floor division rules where the quotient is rounded
towards negative infinity. The remainder has the same sign as the divisor.

## Time Conversion

divmod is commonly used for time conversions. This example converts
seconds into hours, minutes, and seconds.

time_conversion.py
  

def convert_seconds(total_seconds):
    hours, remaining = divmod(total_seconds, 3600)
    minutes, seconds = divmod(remaining, 60)
    return hours, minutes, seconds

print(convert_seconds(3661))  # (1, 1, 1)
print(convert_seconds(45296)) # (12, 34, 56)

The function first divides total seconds by 3600 to get hours. The remainder
is then divided by 60 to get minutes, with the final remainder being seconds.

This demonstrates how divmod can elegantly handle multi-step
conversions where you need both quotient and remainder at each step.

## Float Division

divmod also works with floating-point numbers. This example shows
its behavior with float inputs.

float_divmod.py
  

# With positive floats
print(divmod(10.5, 3))    # (3.0, 1.5)
print(divmod(10.5, 0.5))  # (21.0, 0.0)

# With negative floats
print(divmod(-10.5, 3))   # (-4.0, 1.5)
print(divmod(10.5, -3))   # (-4.0, -1.5)

With floats, divmod returns the quotient as a float and the
remainder that would make the original equation true: a = b * q + r.

Note how the remainder maintains the same sign as the divisor, similar to the
integer behavior. Floating-point precision can affect exact results.

## Custom Objects with __divmod__

You can make custom objects work with divmod by implementing the
__divmod__ special method. This example creates a Fraction class.

custom_divmod.py
  

class Fraction:
    def __init__(self, numerator, denominator):
        self.n = numerator
        self.d = denominator
    
    def __divmod__(self, other):
        quotient = self.n * other.d // (self.d * other.n)
        remainder = Fraction(self.n * other.d % (self.d * other.n), self.d * other.n)
        return (quotient, remainder)
    
    def __repr__(self):
        return f"Fraction({self.n}/{self.d})"

f1 = Fraction(10, 3)
f2 = Fraction(1, 2)
print(divmod(f1, f2))  # (6, Fraction(2/6))

The Fraction class implements __divmod__ to return a quotient
(integer) and remainder (Fraction). When we call divmod on
Fraction instances, Python uses this method.

This pattern is useful for mathematical classes where division with remainder
makes sense (polynomials, vectors, etc.).

## Error Handling

The divmod function raises errors with unsupported types or
division by zero. This example shows proper error handling.

errors.py
  

try:
    print(divmod("10", 3))
except TypeError as e:
    print(f"Error: {e}")  # unsupported operand type(s) for divmod(): 'str' and 'int'

try:
    print(divmod(10, 0))
except ZeroDivisionError as e:
    print(f"Error: {e}")  # integer division or modulo by zero

These examples demonstrate divmod's behavior with invalid inputs.
Strings and division by zero raise appropriate exceptions.

To make a class work with divmod, implement __divmod__
as shown in the previous example.

## Best Practices

- **Use for paired operations:** When you need both quotient and remainder

- **Prefer for time conversions:** Ideal for breaking down units (hours, minutes)

- **Understand float behavior:** Remainder sign matches divisor

- **Implement __divmod__:** For custom numeric types

- **Handle division by zero:** Always catch ZeroDivisionError

## Source References

- [Python divmod() Documentation](https://docs.python.org/3/library/functions.html#divmod)

- [Python __divmod__ Documentation](https://docs.python.org/3/reference/datamodel.html#object.__divmod__)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).