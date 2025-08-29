+++
title = "SymPy"
date = 2025-08-29T20:10:53.496+01:00
draft = false
description = "SymPy tutorial shows how to do symbolic computation in Python with sympy module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# SymPy

last modified January 29, 2024

SymPy tutorial shows how to do symbolic computation in Python with sympy
module. This is a brief introduction to the SymPy.

Computer algebra system (CAS) is a mathematical software with the
ability to manipulate mathematical expressions in a way similar to the
traditional manual computations of mathematicians and scientists.

*Symbolic computation* deals with the computation of mathematical objects
symbolically. The mathematical objects are represented exactly, not
approximately, and mathematical expressions with unevaluated variables are left
in symbolic form.

## SymPy

SymPy is a Python library for symbolic mathematics. It aims to become a
full-featured computer algebra system. SymPy includes features ranging from
basic symbolic arithmetic to calculus, algebra, discrete mathematics and quantum
physics. It is capable of showing results in LaTeX.

$ pip install sympy

SymPy is installed with pip install sympy command.

## Rational values

SymPy has Rational for working with rational numbers. A rational
number is any number that can be expressed as the quotient or fraction p/q of
two integers, a numerator p and a non-zero denominator q.

rational_values.py
  

#!/usr/bin/python

from sympy import Rational

r1 = Rational(1/10)
r2 = Rational(1/10)
r3 = Rational(1/10)

val = (r1 + r2 + r3) * 3
print(val.evalf())

val2 = (1/10 + 1/10 + 1/10) * 3
print(val2)

The example works with rational numbers.

val = (r1 + r2 + r3) * 3
print(val.evalf())

The expression is in the symbolic form; we evaluate it with 
evalf method.

$ rational_values.py
0.900000000000000
0.9000000000000001

Notice that there is a small error in the output when not using rational 
numbers.

## SymPy pprint

The pprint is used for pretty printing the output on the console.
The best results are achieved with LaTeX e.g. in Jupyter notebook.

prettify.py
  

#!/usr/bin/python

from sympy import pprint, Symbol, exp, sqrt
from sympy import init_printing

init_printing(use_unicode=True)

x = Symbol('x')

a = sqrt(2)
pprint(a)
print(a)

print("------------------------")

c = (exp(x) ** 2)/2
pprint(c)
print(c)

The program prettifies the output.

init_printing(use_unicode=True)

For some characters we need to enable unicode support.

$ prettify.py
√2
sqrt(2)
------------------------
    2⋅x
ℯ
────
    2
exp(2*x)/2

This is the output. Note that using Jupyter notebook gives 
much nicer output.

## Square root

Square root is a number which produces a specified quantity when multiplied by itself.    

square_root.py
  

#!/usr/bin/python

from sympy import sqrt, pprint, Mul

x = sqrt(2)
y = sqrt(2)

pprint(Mul(x,  y, evaluate=False)) 
print('equals to ')
print(x * y)

The program outputs an expression containing square roots.

pprint(Mul(x,  y, evaluate=False))

We postpone the evaluation of the multiplication expression 
with evaluate attribute.

$ square_root.py
√2⋅√2
equals to
2

## SymPy symbols

Symbolic computation works with symbols, which may be later evaluated. 
Symbols must be defined in SymPy before using them.

def_sym.py
  

#!/usr/bin/python

# ways to define symbols

from sympy import Symbol, symbols
from sympy.abc import x, y

expr = 2*x + 5*y
print(expr)

a = Symbol('a')
b = Symbol('b')

expr2 = a*b + a - b
print(expr2)

i, j = symbols('i j')
expr3 = 2*i*j + i*j
print(expr3) 

The programs shows three ways to define symbols in SymPy.

from sympy.abc import x, y

Symbols can be imported from the sympy.abc module.
It exports all latin and greek letters as Symbols, so we can
conveniently use them.

a = Symbol('a')
b = Symbol('b')

They can be defined with Symbol

i, j = symbols('i j')

Multiple symbols can be defined with symbols method.

## SymPy canonical form of expression

An expression is automatically transformed into a canonical form 
by SymPy. SymPy does only inexpensive operations; thus the expression 
may not be evaluated into its simplest form.

canonical_form.py
  

#!/usr/bin/python

from sympy.abc import a, b

expr = b*a + -4*a + b + a*b + 4*a + (a + b)*3

print(expr)

We have an expression with symbols a and b.
The expression can be easily simplified.

$ canonical_form.py
2*a*b + 3*a + 4*b

## SymPy expanding algebraic expressions

With expand, we can expand algebraic expressions; 
i.e. the method tries to denest powers and multiplications.

expand.py
  

#!/usr/bin/python

from sympy import expand, pprint
from sympy.abc import x

expr = (x + 1) ** 2

pprint(expr)

print('-----------------------')
print('-----------------------')

expr = expand(expr)
pprint(expr)

The program expands a simple expression.

$ expand.py
       2
(x + 1)
-----------------------
-----------------------
 2
x  + 2⋅x + 1

## SymPy simplify an expression

An expression can be changed with simplify to a 
simpler form.

simplify.py
  

#!/usr/bin/python

from sympy import sin, cos, simplify, pprint
from sympy.abc import x

expr = sin(x) / cos(x)

pprint(expr)

print('-----------------------')

expr = simplify(expr)
pprint(expr)

The exaple simflifies a sin(x)/sin(y) expression to tan(x).

$ simplify.py
sin(x)
──────
cos(x)
-----------------------
tan(x)

## SymPy comparig expression

SymPy expressions are compared with equals and 
not with == operator.

expr_equality.py
  

#!/usr/bin/python

from sympy import pprint, Symbol, sin, cos

x = Symbol('x')

a = cos(x)**2 - sin(x)**2
b = cos(2*x)

print(a.equals(b))

# we cannot use == operator
print(a == b)

The program compares two expressions.

print(a.equals(b))

We compare two expressions with equals. Before applying 
the method, SymPy tries to simplify the expressions.

$ expr_equality.py
True
False

## SymPy evaluating expression

Expressions can be evaluated by substitution of symbols.

evaluating.py
  

#!/usr/bin/python

from sympy import pi

print(pi.evalf(30))

The example evaluates a pi value to thirty places.

$ evaluating.py
3.14159265358979323846264338328

evaluating2.py
  

```
#!/usr/bin/python

from sympy.abc import a, b
from sympy import pprint

expr = b*a + -4*a + b + a*b + 4*a + (a + b)*3

print(expr.subs([(a, 3), (b, 2)]))

```

The example evaluates an expression by substituting a and b
symbols with numbers.

$ evaluating.py
3.14159265358979323846264338328

## SymPy solving equations

Equations are solved with solve or solveset.

solving.py
  

#!/usr/bin/python

from sympy import Symbol, solve

x = Symbol('x')

sol = solve(x**2 - x, x)

print(sol)

The example solves a simple equation with solve.

sol = solve(x**2 - x, x)

The first parameter of the solve is the equation. 
The equation is written in a specific form, suitable for SymPy; i.e. 
x**2 - x instead of x**2 = x. The second 
paramter is the symbol for which we need solution.

$ solving.py
[0, 1]

The equation has two solutions: 0 and 1.

Alternatively, we can use the Eq for equation.

solving2.py
  

#!/usr/bin/python

from sympy import pprint, Symbol, Eq, solve

x = Symbol('x')

eq1 = Eq(x + 1, 4)
pprint(eq1)

sol = solve(eq1, x)
print(sol)

The example solves a simple x + 1 = 4 equation.

$ solving2.py
x + 1 = 4
[3]

solving3.py
  

```
#!/usr/bin/python

from sympy.solvers import solveset
from sympy import Symbol, Interval, pprint

x = Symbol('x')

sol = solveset(x**2 - 1, x, Interval(0, 100))
print(sol)

```

With solveset, we find a solution for the 
given interval.

$ solving3.py
{1}

## SymPy sequence

Sequence is an enumerated collection of objects in which
repetitions are allowed. A sequence can be finite or infinite. The 
number of elements is called the length of the sequence. Unlike a set, 
the same elements can appear multiple times at different positions 
in a sequence. The order of elements matters.    

sequence.py
  

#!/usr/bin/python

from sympy import summation, sequence, pprint
from sympy.abc import x

s = sequence(x, (x, 1, 10))
print(s)
pprint(s)
print(list(s))

print(s.length)

print(summation(s.formula, (x, s.start, s.stop)))
# print(sum(list(s)))

The example creates a sequence of numbers 1, 2,...,10.
We compute the sum of these numbers.

$ sequence.py
SeqFormula(x, (x, 1, 10))
[1, 2, 3, 4, …]
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
10
55

## SymPy limit

A limit is the value that a function (or sequence) "approaches" as the input
(or index) "approaches" some value.

limit.py
  

#!/usr/bin/python

from sympy import sin, limit, oo
from sympy.abc import x

l1 = limit(1/x, x, oo)
print(l1)

l2 = limit(1/x, x, 0)
print(l2)

In the example, we have the 1/x function. It has a left-sided and 
right-sided limit.

from sympy import sin, limit, sqrt, oo

The oo denotes infinity.

l1 = limit(1/x, x, oo)
print(l1)

We calculate the limit of 1/x where x approaches positive infinity.

$ limit.py
0
oo

## SymPy matrixes

In SymPy, we can work with matrixes.  A matrix is a rectangular array of numbers
or other mathematical objects for which operations such as addition and
multiplication are defined.

Matrixes are used in computing, engineering, or image processing.    

matrix.py
  

#!/usr/bin/python

from sympy import Matrix, pprint

M = Matrix([[1, 2], [3, 4], [0, 3]])
print(M)
pprint(M)

N = Matrix([2, 2])

print("---------------------------")
print("M * N")
print("---------------------------")

pprint(M*N)

The example defines two matrixes and multiplies them.

$ matrix.py
Matrix([[1, 2], [3, 4], [0, 3]])
⎡1  2⎤
⎢    ⎥
⎢3  4⎥
⎢    ⎥
⎣0  3⎦
---------------------------
M * N
---------------------------
⎡6 ⎤
⎢  ⎥
⎢14⎥
⎢  ⎥
⎣6 ⎦

## SymPy plotting

SymPy contains module for plotting. It is built on Matplotlib.    

simple_plot.py
  

#!/usr/bin/python

# uses matplotlib

import sympy
from sympy.abc import x
from sympy.plotting import plot

plot(1/x)

The example plots a 2d graph of a 1/x function.

## Source

[Python SymPy documentation](https://docs.sympy.org/latest/index.html)

This was SymPy tutorial.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).