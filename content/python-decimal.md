+++
title = "Python Decimal"
date = 2025-08-29T20:07:55.717+01:00
draft = false
description = "Python Decimal tutorial shows how to perform high-precision calculations in Python with Decimal. The Python decimal module provides support for fast correctly-rounded decimal floating point arithmetic."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Decimal

last modified January 29, 2024

In this article we show how to perform high-precision calculations in Python
with Decimal.

## Python decimal

The Python decimal module provides support for fast correctly-rounded decimal
floating point arithmetic.

By default, Python interprets any number that includes a decimal point as a
double precision floating point number. The Decimal is a floating
decimal point type which has more precision and a smaller range than the float.
It is appropriate for financial and monetary calculations. It is also closer to
the way how humans work with numbers.

Unlike hardware based binary floating point, the decimal module has a user
alterable precision which can be as large as needed for a given problem. The
default precision is 28 places.

Some values cannot be exactly represented in a float data type. For instance,
storing the 0.1 value in float (which is a binary floating point value) variable
we get only an approximation of the value. Similarly, the 1/3 value cannot be
represented exactly in decimal floating point type.

Neither of the types is perfect; generally, decimal types are better suited for
financial and monetary calculations, while the double/float types for scientific
calculations.

## Python Decimal default precision

The Decimal has a default precision of 28 places, while the
float has 18 places.

defprec.py
  

#!/usr/bin/python

from decimal import Decimal

x = 1 / 3
print(type(x))
print(x)

print("-----------------------")

y = Decimal(1) / Decimal(3)
print(type(y))
print(y)

The example compares the precision of two floating point types in Python.

$ ./defprec.py
&lt;class 'float'&gt;
0.3333333333333333
-----------------------
&lt;class 'decimal.Decimal'&gt;
0.3333333333333333333333333333

## Python compare floating point values

Caution should be exercised when comparing floating point values. While in many
real world problems a small error is negligible, financial and monetary
calculations must be exact.

comparing.py
  

#!/usr/bin/python

from decimal import Decimal

x = 0.1 + 0.1 + 0.1

print(x == 0.3)
print(x)

print("----------------------")

x = Decimal('0.1') + Decimal('0.1') + Decimal('0.1')

print(x == Decimal('0.3'))
print(float(x) == 0.3)
print(x)

The example performs a comparison of floating point values with the built-in
float and the Decimal types.

$ ./comparing.py
False
0.30000000000000004
----------------------
True
True
0.3

Due to a small error in the float type, the
0.1 + 0.1 + 0.1 == 0.3 yields False. With the Decimal
type, we get the expected output.

## Python Decimal altering precision

It is possible to change the default precision of the Decimal type.
In the following example, we also use the mpmath module, which is
a library for arbitrary-precision floating-point arithmetic.

$ pip install mpmath

We need to install mpmath first.

alter_precision.py
  

#!/usr/bin/python

from decimal import Decimal, getcontext
import math

import mpmath

getcontext().prec = 50
mpmath.mp.dps = 50
num = Decimal(1) / Decimal(7)

num2 = mpmath.mpf(1) / mpmath.mpf(7)

print("   math.sqrt: {0}".format(Decimal(math.sqrt(num))))
print("decimal.sqrt: {0}".format(num.sqrt()))
print(" mpmath.sqrt: {0}".format(mpmath.sqrt(num2)))
print('actual value: 0.3779644730092272272145165362341800608157513118689214')

In the example, we change the precision to 50 places. We compare the accuracy
of the math.sqrt, Decimal's sqrt, and
mpmath.sqrt functions.

$ alter_precision.py
    math.sqrt: 0.37796447300922719758631274089566431939601898193359375
 decimal.sqrt: 0.37796447300922722721451653623418006081575131186892
  mpmath.sqrt: 0.37796447300922722721451653623418006081575131186892
 actual value: 0.3779644730092272272145165362341800608157513118689214

## Python Decimal rounding

The Decimal type provides several rounding options:

    - ROUND_CEILING - always round upwards towards infinity

    - ROUND_DOWN - always round toward zero

    - ROUND_FLOOR - always round down towards negative infinity

    ROUND_HALF_DOWN - rounds away from zero if the last significant digit is
        greater than or equal to 5, otherwise toward zero
    ROUND_HALF_EVEN - like ROUND_HALF_DOWN except that if the value is 5
    then the preceding digit is examined; even values cause the result to be
    rounded down and odd digits cause the result to be rounded up.
    ROUND_HALF_UP - like ROUND_HALF_DOWN except if the last significant
    digit is 5 the value is rounded away from zero
    - ROUND_UP - round away from zero

    ROUND_05UP - round away from zero if the last digit is 0 or 5, otherwise
    towards zero

rounding.py
  

#!/usr/bin/python

import decimal

context = decimal.getcontext()

rounding_modes = [
    'ROUND_CEILING',
    'ROUND_DOWN',
    'ROUND_FLOOR',
    'ROUND_HALF_DOWN',
    'ROUND_HALF_EVEN',
    'ROUND_HALF_UP',
    'ROUND_UP',
    'ROUND_05UP',
    ]

col_lines = '-' * 10

print(f"{' ':20} {'1/7 (1)':^10} {'1/7 (2)':^10} {'1/7 (3)':^10} {'1/7 (4)':^10}")
print(f"{' ':20} {col_lines:^10} {col_lines:^10} {col_lines:^10} {col_lines:^10}")

for mode in rounding_modes:

    print(f'{mode:20}', end=' ')

    for precision in [1, 2, 3, 4]:

        context.prec = precision
        context.rounding = getattr(decimal, mode)
        value = decimal.Decimal(1) / decimal.Decimal(7)
        print(f'{value:&lt;10}', end=' ')
    print()

print('********************************************************************')

print(f"{' ':20} {'-1/7 (1)':^10} {'-1/7 (2)':^10} {'-1/7 (3)':^10} {'-1/7 (4)':^10}")
print(f"{' ':20} {col_lines:^10} {col_lines:^10} {col_lines:^10} {col_lines:^10}")

for mode in rounding_modes:

    print(f'{mode:20}', end=' ')

    for precision in [1, 2, 3, 4]:

        context.prec = precision
        context.rounding = getattr(decimal, mode)
        value = decimal.Decimal(-1) / decimal.Decimal(7)
        print(f'{value:&lt;10}', end=' ')

    print()

The example presents the available rounding options for the 1/7
and -1/7 expressions.

$ ./rounding.py
                     1/7 (1)    1/7 (2)    1/7 (3)    1/7 (4)
                     ---------- ---------- ---------- ----------
ROUND_CEILING        0.2        0.15       0.143      0.1429
ROUND_DOWN           0.1        0.14       0.142      0.1428
ROUND_FLOOR          0.1        0.14       0.142      0.1428
ROUND_HALF_DOWN      0.1        0.14       0.143      0.1429
ROUND_HALF_EVEN      0.1        0.14       0.143      0.1429
ROUND_HALF_UP        0.1        0.14       0.143      0.1429
ROUND_UP             0.2        0.15       0.143      0.1429
ROUND_05UP           0.1        0.14       0.142      0.1428
********************************************************************
                     -1/7 (1)   -1/7 (2)   -1/7 (3)   -1/7 (4)
                     ---------- ---------- ---------- ----------
ROUND_CEILING        -0.1       -0.14      -0.142     -0.1428
ROUND_DOWN           -0.1       -0.14      -0.142     -0.1428
ROUND_FLOOR          -0.2       -0.15      -0.143     -0.1429
ROUND_HALF_DOWN      -0.1       -0.14      -0.143     -0.1429
ROUND_HALF_EVEN      -0.1       -0.14      -0.143     -0.1429
ROUND_HALF_UP        -0.1       -0.14      -0.143     -0.1429
ROUND_UP             -0.2       -0.15      -0.143     -0.1429
ROUND_05UP           -0.1       -0.14      -0.142     -0.1428

## Python Fraction

We can work with rational numbers using the Fraction.

fract.py
  

#!/usr/bin/python

from decimal import Decimal
from fractions import Fraction

x = Decimal(1) / Decimal(3)
y = x * Decimal(3)

print(y == Decimal(1))
print(x)
print(y)

print("-----------------------")

u = Fraction(1) / Fraction(3)
v = u * Fraction(3)

print(v == 1)
print(u)
print(v)

The Decimal cannot represent the 1/3 expression
precisely. In some cases, we can use the Fraction type to get an
accurate result.

$ ./fract.py
False
0.3333333333333333333333333333
0.9999999999999999999999999999
-----------------------
True
1/3
1

## Python SymPy Rational

It is also possible to use the SymPy's Rational type to work with
rationals.

$ pip install sympy

We install the sympy module.

symbolic.py
  

#!/usr/bin/python

from sympy import Rational

r1 = Rational(1/10)
r2 = Rational(1/10)
r3 = Rational(1/10)

val = (r1 + r2 + r3) * 3
print(val.evalf())

val2 = (1/10 + 1/10 + 1/10) * 3
print(val2)

In the example, we compare the precision of the Rational and the
built-in float for the (1/10 + 1/10 + 1/10)*3
expression.

$ ./symbolic.py
0.900000000000000
0.9000000000000001

There is a small error for the float type.

## Source

[Decimal fixed point and floating point arithmetic](https://docs.python.org/3/library/decimal.html)

In this tutorial we have worked with the Python Decimal type.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).