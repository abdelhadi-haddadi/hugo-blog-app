+++
title = "Excel BITAND and BITOR Functions"
date = 2025-08-29T19:53:57.048+01:00
draft = false
description = "Complete tutorial on Excel BITAND and BITOR functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel BITAND and BITOR Functions

last modified April 4, 2025

The BITAND and BITOR functions perform bitwise 
operations in Excel. They work with the binary representations of numbers. 
This tutorial provides a comprehensive guide to using these functions. You'll 
learn their syntax, practical applications, and see detailed examples.

## BITAND/BITOR Function Basics

BITAND performs a bitwise AND operation, while BITOR 
performs a bitwise OR operation. These functions compare the binary 
representation of numbers bit by bit.

  
    Function
    Description
    Syntax
  
  
    BITAND
    Returns bitwise AND of two numbers
    =BITAND(number1, number2)
  
  
    BITOR
    Returns bitwise OR of two numbers
    =BITOR(number1, number2)
  

Both functions require two positive integer arguments. They return decimal 
numbers representing the result of the bitwise operation. Negative numbers 
or non-integers will cause errors.

## Basic BITAND Example

This example demonstrates a simple BITAND operation between two numbers.

Basic BITAND formula
  

=BITAND(5, 3)

The formula compares binary 101 (5) and 011 (3). BITAND returns 1 (001) 
because only the least significant bit is 1 in both numbers. This shows 
how BITAND identifies common bits.

## Basic BITOR Example

This example shows a simple BITOR operation between two numbers.

Basic BITOR formula
  

=BITOR(5, 3)

The formula compares binary 101 (5) and 011 (3). BITOR returns 7 (111) 
because all bits are 1 in at least one number. This demonstrates how 
BITOR combines bits from both numbers.

## BITAND with Cell References

A practical use of BITAND involves referencing cells containing values to 
compare. Here's an example with cell references.

  
    A
    B
    C
  
  
    9
    5
    
  
  
    
    
    =BITAND(A1, B1)
  

The table shows values in cells A1 (9) and B1 (5), with a BITAND formula 
in C2 that compares them. The binary representations are 1001 and 0101.

BITAND with cell references
  

=BITAND(A1, B1)

This formula performs BITAND on 9 (1001) and 5 (0101). The result is 1 
(0001) because only the least significant bit matches. This shows how 
BITAND works with cell references.

## BITOR with Multiple Operations

BITOR can be combined with other functions for more complex operations. 
This example shows BITOR with arithmetic.

  
    A
    B
    C
  
  
    6
    3
    
  
  
    
    
    =BITOR(A1+B1, A1-B1)
  

The table demonstrates combining arithmetic with BITOR. It calculates 
(6+3) OR (6-3), which is 9 OR 3 in decimal.

BITOR with arithmetic
  

=BITOR(A1+B1, A1-B1)

This formula first calculates 6+3=9 (1001) and 6-3=3 (0011), then performs 
BITOR. The result is 11 (1011) because all bits are set in either number. 
This shows BITOR's flexibility.

## BITAND for Flag Checking

BITAND is commonly used to check specific bits (flags) in a number. This 
example demonstrates checking if the third bit is set.

  
    A
    B
  
  
    13
    
  
  
    
    =BITAND(A1, 4) = 4
  

The table shows how to check if the third bit (value 4) is set in number 
13 (1101). The formula returns TRUE if the bit is set, FALSE otherwise.

BITAND flag check
  

=BITAND(A1, 4) = 4

This formula checks if the third bit (4) is set in 13. BITAND(13,4) 
returns 4, so the comparison is TRUE. This technique is useful for 
working with bitmask flags.

## BITAND/BITOR with Error Handling

These functions require positive integers. This example shows error 
handling when invalid inputs are provided.

  
    A
    B
    C
  
  
    5
    -3
    
  
  
    
    
    =IFERROR(BITAND(A1,B1), "Invalid input")
  

The table demonstrates handling negative numbers with IFERROR. Since 
BITAND requires positive integers, -3 would normally cause an error.

BITAND with error handling
  

=IFERROR(BITAND(A1,B1), "Invalid input")

This formula attempts BITAND but returns "Invalid input" if an error 
occurs. This is important because BITAND/BITOR only work with positive 
integers less than 2^48.

## Combining BITAND and BITOR

These functions can be combined for complex bit manipulations. This 
example shows setting specific bits while preserving others.

  
    A
    B
    C
  
  
    9
    6
    
  
  
    
    
    =BITOR(BITAND(A1, B1), 4)
  

The table demonstrates first performing BITAND on 9 and 6, then BITOR 
with 4. This technique is useful for precise bit manipulation.

Combined BITAND and BITOR
  

=BITOR(BITAND(A1, B1), 4)

This formula first does BITAND(9,6)=0 (1001 AND 0110=0000), then 
BITOR(0,4)=4. The result forces the third bit to be set while clearing 
other bits based on the AND operation.

The BITAND and BITOR functions are powerful 
tools for bitwise operations in Excel. They're essential for working 
with binary data, flags, and low-level number manipulation. Remember 
they only work with positive integers up to 2^48-1. Mastering these 
functions opens up advanced data processing possibilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).