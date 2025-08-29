+++
title = "Excel COMPLEX Function"
date = 2025-08-29T19:53:58.160+01:00
draft = false
description = "Complete tutorial on Excel COMPLEX function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel COMPLEX Function

last modified April 4, 2025

The COMPLEX function converts real and imaginary coefficients into 
a complex number in Excel. Complex numbers are used in engineering, physics, 
and advanced mathematics. This tutorial provides a comprehensive guide to using 
the COMPLEX function with detailed examples. You'll learn basic 
syntax, practical applications, and how to work with complex numbers in Excel.

## COMPLEX Function Basics

The COMPLEX function creates a complex number from real and 
imaginary coefficients. Complex numbers are expressed in the form x + yi or 
x + yj. Excel uses either "i" or "j" as the imaginary unit.

  
    Component
    Description
  
  
    Function Name
    COMPLEX
  
  
    Syntax
    =COMPLEX(real_num, i_num, [suffix])
  
  
    Arguments
    real_num (required), i_num (required), suffix (optional)
  
  
    Return Value
    Text representation of a complex number
  

This table breaks down the essential components of the COMPLEX
function. It shows the function name, syntax format, required and optional
arguments, and the type of value returned.

## Basic COMPLEX Example

This example demonstrates the simplest use of the COMPLEX function with basic 
numeric inputs.

Basic COMPLEX formula
  

=COMPLEX(3, 4)

This formula creates a complex number with 3 as the real part and 4 as the 
imaginary part. The result will be "3+4i". When the suffix is omitted, Excel 
defaults to using "i" as the imaginary unit.

## COMPLEX with Different Suffix

This example shows how to specify a different suffix for the imaginary unit. 
Engineers often use "j" instead of "i".

COMPLEX with "j" suffix
  

=COMPLEX(5, 2, "j")

This formula creates a complex number with 5 as the real part and 2 as the 
imaginary part, using "j" as the suffix. The result will be "5+2j". The suffix 
must be enclosed in quotes and can only be "i" or "j".

## COMPLEX with Negative Imaginary Part

This example demonstrates how COMPLEX handles negative imaginary coefficients. 
The function automatically formats the output correctly.

COMPLEX with negative imaginary
  

=COMPLEX(7, -3)

This formula creates a complex number with 7 as the real part and -3 as the 
imaginary part. The result will be "7-3i". The function automatically uses the 
correct operator (+ or -) based on the sign of the imaginary coefficient.

## COMPLEX with Zero Real Part

This example shows how COMPLEX handles cases where the real part is zero. The 
output format changes to show only the imaginary part.

COMPLEX with zero real part
  

=COMPLEX(0, 5)

This formula creates a complex number with 0 as the real part and 5 as the 
imaginary part. The result will be "5i". When the real part is zero, Excel 
omits it from the display, showing only the imaginary component.

## COMPLEX with Zero Imaginary Part

This example demonstrates how COMPLEX handles cases where the imaginary part is 
zero. The output shows only the real number.

COMPLEX with zero imaginary part
  

=COMPLEX(4, 0)

This formula creates a complex number with 4 as the real part and 0 as the 
imaginary part. The result will be "4". When the imaginary part is zero, Excel 
returns just the real number as a text string.

## COMPLEX with Decimal Values

This example shows how COMPLEX handles decimal numbers for both real and 
imaginary parts. The function maintains the decimal precision in the output.

COMPLEX with decimal values
  

=COMPLEX(2.5, 1.75)

This formula creates a complex number with 2.5 as the real part and 1.75 as the 
imaginary part. The result will be "2.5+1.75i". The function preserves the 
decimal places from both input values in the output string.

## COMPLEX in Array Formulas

This example demonstrates using COMPLEX with array inputs to create multiple 
complex numbers at once. This requires Excel 365 or Excel 2021.

  
    A
    B
    C
  
  
    1
    2
    
  
  
    3
    4
    
  
  
    5
    6
    
  
  
    
    
    =COMPLEX(A1:A3, B1:B3)
  

The table shows real parts in column A and imaginary parts in column B. The 
array formula in C1 creates three complex numbers at once, spilling the results 
down the column.

COMPLEX array formula
  

=COMPLEX(A1:A3, B1:B3)

This array formula creates three complex numbers: "1+2i", "3+4i", and "5+6i". 
The results spill down starting from the cell where the formula is entered. This 
is a powerful feature for batch processing complex numbers.

## COMPLEX with Other Engineering Functions

This example shows COMPLEX being used with other engineering functions like 
IMSUM to perform operations on complex numbers.

COMPLEX with IMSUM
  

=IMSUM(COMPLEX(1,2), COMPLEX(3,4))

This formula first creates two complex numbers (1+2i and 3+4i), then sums them 
using IMSUM. The result is "4+6i". This demonstrates how COMPLEX can be used 
with Excel's other engineering functions for complex number calculations.

## Error Handling in COMPLEX

This example shows what happens when invalid arguments are provided to the 
COMPLEX function. Excel returns specific error messages.

  
    Formula
    Result
    Reason
  
  
    =COMPLEX("a", 1)
    #VALUE!
    Non-numeric real part
  
  
    =COMPLEX(1, "b")
    #VALUE!
    Non-numeric imaginary part
  
  
    =COMPLEX(1, 2, "k")
    #VALUE!
    Invalid suffix (not "i" or "j")
  

The table demonstrates various error scenarios with the COMPLEX function. Excel 
returns #VALUE! when inputs are non-numeric or when an invalid suffix is used. 
Proper error handling is important when working with complex numbers.

The COMPLEX function is essential for working with complex numbers 
in Excel. From basic number creation to advanced engineering calculations, 
COMPLEX provides the foundation for complex number operations. 
Mastering its use enables sophisticated mathematical and engineering 
calculations directly in spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).