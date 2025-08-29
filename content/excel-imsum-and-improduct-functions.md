+++
title = "Excel IMSUM and IMPRODUCT Functions"
date = 2025-08-29T19:54:09.354+01:00
draft = false
description = "Complete tutorial on Excel IMSUM and IMPRODUCT functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel IMSUM and IMPRODUCT Functions

last modified April 4, 2025

The IMSUM and IMPRODUCT functions are specialized
Excel functions for working with complex numbers. They perform addition and
multiplication operations on complex numbers in the form x+yi or x+yj.
This tutorial provides a comprehensive guide to using these functions with
detailed examples. You'll learn basic syntax, practical applications, and
advanced techniques.

## IMSUM/IMPRODUCT Function Basics

The IMSUM function adds complex numbers, while IMPRODUCT
multiplies them. Both functions handle complex numbers in text format.

  
    Function
    Description
    Syntax
  
  
    IMSUM
    Returns the sum of complex numbers
    =IMSUM(inumber1, [inumber2], ...)
  
  
    IMPRODUCT
    Returns the product of complex numbers
    =IMPRODUCT(inumber1, [inumber2], ...)
  

This table shows the essential components of both functions. They accept 1-255
complex numbers as arguments and return a complex number as text.

## Basic IMSUM Example

This example demonstrates the simplest use of the IMSUM function with two
complex numbers.

Basic IMSUM formula
  

=IMSUM("3+4i", "1+2i")

This formula adds two complex numbers: 3+4i and 1+2i. The result will be
"4+6i". The function adds the real parts (3+1) and imaginary parts (4+2)
separately.

## Basic IMPRODUCT Example

This example shows the basic multiplication of two complex numbers using
IMPRODUCT.

Basic IMPRODUCT formula
  

=IMPRODUCT("2+3i", "1+4i")

This formula multiplies 2+3i by 1+4i. The result is "-10+11i" because:
(2*1 - 3*4) + (2*4 + 3*1)i = (2-12) + (8+3)i = -10 + 11i.

## IMSUM with Cell References

A more practical use involves adding complex numbers stored in cells. Here's
an example with cell references.

  
    A
    B
  
  
    5+2i
    
  
  
    3+7i
    
  
  
    
    =IMSUM(A1, A2)
  

The table shows complex numbers in column A and an IMSUM formula in cell B3
that adds them. The result will be "8+9i" (5+3 real parts, 2+7 imaginary).

IMSUM with cell references
  

=IMSUM(A1, A2)

This formula sums complex numbers in cells A1 and A2. Using cell references
makes the function more flexible for working with spreadsheet data.

## IMPRODUCT with Multiple Numbers

IMPRODUCT can multiply several complex numbers at once. This example shows
multiplication of three complex numbers.

IMPRODUCT with three numbers
  

=IMPRODUCT("1+i", "2+3i", "1-i")

This formula multiplies three complex numbers step by step. First 1+i and 2+3i
give -1+5i, then multiplied by 1-i gives 4+6i. The final result is "4+6i".

## IMSUM with Real Numbers

IMSUM can handle regular numbers by treating them as complex numbers with
zero imaginary part. This example demonstrates this behavior.

IMSUM with real numbers
  

=IMSUM("5", "3+2i")

The formula adds 5 (treated as 5+0i) and 3+2i. The result is "8+2i". This
shows how IMSUM seamlessly handles mixing real and complex numbers.

## IMPRODUCT with Polar Form

Excel can convert between rectangular and polar forms. This example shows
IMPRODUCT with complex numbers in polar form.

IMPRODUCT with polar form
  

=IMPRODUCT(COMPLEX(3,4), COMPLEX(1,2))

This formula uses the COMPLEX function to create numbers from components,
then multiplies them. The result is identical to direct text input:
"-5+10i" for these values.

## IMSUM with Array of Numbers

IMSUM can work with arrays of complex numbers. This example demonstrates
summing multiple complex values.

IMSUM with array
  

=IMSUM({"1+2i","3+4i","5+6i"})

This formula sums three complex numbers in an array. The result is "9+12i"
(1+3+5 real parts, 2+4+6 imaginary). Array input makes bulk operations
convenient.

## Error Handling

Both functions return errors for invalid complex number formats. This example
shows error handling.

Error handling example
  

=IMSUM("3+4i", "invalid")

This formula returns #NUM! error because the second argument isn't a valid
complex number. Proper formatting like "x+yi" or "x+yj" is required for
both functions to work correctly.

The IMSUM and IMPRODUCT functions are essential for
engineering and scientific calculations involving complex numbers. They handle
both rectangular and polar forms, and work seamlessly with real numbers.
Mastering these functions expands Excel's capabilities for advanced
mathematical operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).