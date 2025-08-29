+++
title = "Python round Function"
date = 2025-08-29T20:10:18.672+01:00
draft = false
description = "Complete guide to Python's round function covering basic usage, precision control, and practical examples of number rounding."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python round Function

Last modified April 11, 2025

This comprehensive guide explores Python's round function, which
returns a floating point number rounded to specified digits. We'll cover basic
usage, precision control, and practical examples of number rounding.

## Basic Definitions

The round function returns a floating point number rounded to
specified digits after the decimal point. If no precision is given, it rounds
to the nearest integer.

Key characteristics: works with numbers, follows "round half to even" rule
(bankers rounding), and returns a float when precision is specified.

## Basic Rounding Usage

Here's simple usage with different numbers showing how round
handles various cases with and without precision specification.

basic_round.py
  

# Rounding to nearest integer
print(round(3.14))    # 3
print(round(3.5))     # 4 (note: bankers rounding)
print(round(3.6))     # 4
print(round(-3.14))   # -3
print(round(-3.5))    # -4

# Rounding with precision
print(round(3.14159, 2))  # 3.14
print(round(3.14159, 3))  # 3.142

This example shows round with different numbers. Without precision,
it rounds to nearest integer. Note the bankers rounding for 0.5 cases.

With precision argument, it rounds to specified decimal places. The function
returns a float even when rounding to whole numbers with precision specified.

## Bankers Rounding Explained

Python uses "round half to even" (bankers rounding) which minimizes bias in
statistical operations. This example demonstrates the behavior.

bankers_rounding.py
  

print(round(2.5))    # 2 (rounds to even)
print(round(3.5))    # 4 (rounds to even)
print(round(4.5))    # 4 (rounds to even)
print(round(5.5))    # 6 (rounds to even)

print(round(-2.5))   # -2
print(round(-3.5))   # -4

Bankers rounding rounds 0.5 cases to the nearest even number. This differs
from traditional "round half up" but provides better statistical properties.

The same rule applies to negative numbers. Note how -2.5 rounds to -2 (nearest
even number) rather than -3.

## Precision Control

The precision argument controls how many digits are kept after the decimal
point. This example shows various precision levels.

precision.py
  

pi = 3.141592653589793

print(round(pi, 0))   # 3.0
print(round(pi, 1))   # 3.1
print(round(pi, 2))   # 3.14
print(round(pi, 3))   # 3.142
print(round(pi, 4))   # 3.1416

# Negative precision rounds to left of decimal
print(round(12345, -1))  # 12340
print(round(12345, -2))  # 12300
print(round(12345, -3))  # 12000

Positive precision values round after the decimal point, while negative values
round to the left of the decimal (tens, hundreds, etc.).

Note that precision=0 returns a float (3.0) rather than an integer, unlike when
no precision is specified (which returns an integer).

## Floating Point Considerations

Due to floating point representation, some results may be surprising. This
example demonstrates cases where rounding might not behave as expected.

floating_point.py
  

print(round(2.675, 2))  # 2.67 (not 2.68)
print(round(0.1 + 0.2, 1))  # 0.3 (as expected)

# Explanation
from decimal import Decimal
print(Decimal(2.675))  # Shows actual stored value

The first example shows 2.675 rounding down to 2.67 instead of up to 2.68.
This happens because 2.675 cannot be represented exactly in binary floating
point.

For precise decimal arithmetic, consider using the decimal module
which provides exact decimal representation and rounding.

## Practical Application: Financial Calculations

This example demonstrates using round in financial calculations
where precise rounding is often required.

financial.py
  

def calculate_interest(principal, rate, years):
    return round(principal * (1 + rate/100)**years, 2)

def calculate_monthly_payment(principal, rate, months):
    monthly_rate = rate / 100 / 12
    payment = principal * monthly_rate / (1 - (1 + monthly_rate)**-months)
    return round(payment, 2)

print(calculate_interest(1000, 5, 10))  # 1628.89
print(calculate_monthly_payment(10000, 7.5, 60))  # 200.38

Financial calculations often require rounding to 2 decimal places for currency.
The round function is perfect for this when exact precision isn't
critical.

For banking applications where exact decimal representation is crucial, the
decimal module with its context-based rounding is recommended.

## Best Practices

- **Understand bankers rounding:** Be aware of round-half-to-even behavior

- **Specify precision:** Always specify precision for clarity

- **Consider decimal module:** For exact decimal operations

- **Document rounding behavior:** Especially in financial code

- **Test edge cases:** Verify behavior with 0.5 cases

## Source References

- [Python round() Documentation](https://docs.python.org/3/library/functions.html#round)

- [Floating Point Arithmetic](https://docs.python.org/3/tutorial/floatingpoint.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).