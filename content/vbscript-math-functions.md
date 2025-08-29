+++
title = "VBScript Math Functions"
date = 2025-08-29T20:15:18.783+01:00
draft = false
description = "Learn about VBScript math functions, including Abs, Round, Sqr, and more. Understand how to use them effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Math Functions

last modified April 4, 2025

VBScript provides a set of built-in math functions for performing mathematical
operations. These functions help with calculations, rounding, trigonometry, and
more. This tutorial covers VBScript math functions with practical examples to
demonstrate their usage in real-world scenarios.

## VBScript Math Functions Overview

VBScript includes essential math functions through the VBScript runtime
library. These functions operate on numeric values and return results based on
the operation. Common functions include Abs, Round,
Sqr, Int, Fix, and trigonometric
functions.

Math functions are crucial for financial calculations, data analysis, and
scientific computations. They help perform operations that would otherwise
require complex custom code. Understanding these functions is essential for
effective VBScript programming.

## Abs Function

The Abs function returns the absolute value of a number, which is
its value without any sign. It converts negative numbers to positive while
leaving positive numbers unchanged. This is useful for distance calculations.

abs_function.vbs
  

Dim num1, num2, result1, result2
num1 = -15.75
num2 = 20.5
result1 = Abs(num1)
result2 = Abs(num2)

WScript.Echo "Absolute value of " &amp; num1 &amp; " is " &amp; result1
WScript.Echo "Absolute value of " &amp; num2 &amp; " is " &amp; result2

This example demonstrates the Abs function with both negative and positive
numbers. The first variable shows conversion from negative to positive, while
the second remains unchanged. The results are displayed using WScript.Echo.

## Round Function

The Round function returns a number rounded to a specified number
of decimal places. It follows standard rounding rules (up if 5 or higher). This
is essential for financial calculations where precision matters.

round_function.vbs
  

Dim value1, value2, rounded1, rounded2
value1 = 3.14159
value2 = 2.71828
rounded1 = Round(value1, 2)
rounded2 = Round(value2, 3)

WScript.Echo "Rounded to 2 decimals: " &amp; rounded1
WScript.Echo "Rounded to 3 decimals: " &amp; rounded2

This example shows rounding pi and e to different decimal places. The first
rounds to 2 decimals (3.14), the second to 3 decimals (2.718). Notice how the
function handles the digits beyond the specified precision.

## Sqr Function

The Sqr function calculates the square root of a number. It only
works with non-negative numbers. Attempting to use it with negative values will
result in a runtime error. This is useful for geometric calculations.

sqr_function.vbs
  

Dim number1, number2, root1, root2
number1 = 25
number2 = 2
root1 = Sqr(number1)
root2 = Sqr(number2)

WScript.Echo "Square root of " &amp; number1 &amp; " is " &amp; root1
WScript.Echo "Square root of " &amp; number2 &amp; " is " &amp; root2

This example calculates square roots of perfect and imperfect squares. The first
returns an integer (5), while the second returns an irrational number
(1.4142135623731). The function handles both cases appropriately.

## Int and Fix Functions

Int and Fix both return the integer portion of a
number. The difference is how they handle negative numbers: Int returns the
first negative integer less than or equal, while Fix returns the first integer
greater than or equal (truncates toward zero).

int_fix_function.vbs
  

Dim posNum, negNum, intPos, fixPos, intNeg, fixNeg
posNum = 9.99
negNum = -9.99
intPos = Int(posNum)
fixPos = Fix(posNum)
intNeg = Int(negNum)
fixNeg = Fix(negNum)

WScript.Echo "Int of positive: " &amp; intPos
WScript.Echo "Fix of positive: " &amp; fixPos
WScript.Echo "Int of negative: " &amp; intNeg
WScript.Echo "Fix of negative: " &amp; fixNeg

This example highlights the difference between Int and Fix functions. For
positive numbers, both return the same result (9). For negative numbers, Int
returns -10 while Fix returns -9. This distinction is important for certain
calculations.

## Rnd and Randomize Functions

The Rnd function generates a random number between 0 and 1.
Randomize initializes the random number generator with a seed based
on the system timer. Together they're useful for simulations and games.

rnd_function.vbs
  

Dim i, randomNum
Randomize

For i = 1 To 5
    randomNum = Int((100 * Rnd) + 1)  ' 1-100
    WScript.Echo "Random number " &amp; i &amp; ": " &amp; randomNum
Next

This example generates five random numbers between 1 and 100. Randomize ensures
different sequences on each run. The formula scales Rnd's output (0-1) to the
desired range (1-100). Int ensures whole numbers.

## Source

[VBScript Math Functions Documentation](https://learn.microsoft.com/en-us/previous-versions//3ca8tfek(v=vs.85))

In this article, we have explored the essential VBScript math functions,
covering their syntax and practical applications. From basic operations like
absolute values and rounding to more advanced concepts like random number
generation, these functions form the foundation for mathematical operations in
VBScript. With these examples, you can now implement robust mathematical
calculations in your scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).