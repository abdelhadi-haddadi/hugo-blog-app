+++
title = "Excel SEQUENCE Function"
date = 2025-08-29T19:54:19.497+01:00
draft = false
description = "Complete tutorial on Excel SEQUENCE function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SEQUENCE Function

last modified April 4, 2025

The SEQUENCE function is a powerful dynamic array function in Excel 
that generates a sequence of numbers. It automatically spills the results into 
adjacent cells. This tutorial provides a comprehensive guide to using the 
SEQUENCE function with detailed examples. You'll learn basic 
syntax, practical applications, and advanced techniques to master this modern 
Excel function.

## SEQUENCE Function Basics

The SEQUENCE function generates a list of sequential numbers in an 
array. It can create one-dimensional or two-dimensional sequences with control 
over start value and step size. The syntax is flexible for various use cases.

  
    Component
    Description
  
  
    Function Name
    SEQUENCE
  
  
    Syntax
    =SEQUENCE(rows,[columns],[start],[step])
  
  
    Arguments
    rows (required), columns, start, step
  
  
    Return Value
    Array of sequential numbers
  

This table breaks down the essential components of the SEQUENCE 
function. It shows the function name, basic syntax format, argument parameters, 
and return value characteristics.

## Basic SEQUENCE Example

This example demonstrates the simplest use of the SEQUENCE function to generate 
a vertical list of numbers.

Basic SEQUENCE formula
  

=SEQUENCE(5)

This formula creates a sequence of 5 numbers starting from 1 in a single column. 
The result will be numbers 1 through 5 vertically. This shows the minimal 
required argument for SEQUENCE.

  
    A
  
  
    1
  
  
    2
  
  
    3
  
  
    4
  
  
    5
  

## Two-Dimensional Sequence

SEQUENCE can generate a grid of numbers by specifying both rows and columns. 
This example creates a 3x3 matrix.

2D SEQUENCE formula
  

=SEQUENCE(3,3)

This formula generates a 3-row by 3-column array starting from 1. The numbers 
fill left to right, then top to bottom. The result is a perfect square number 
grid.

  
    A
    B
    C
  
  
    1
    2
    3
  
  
    4
    5
    6
  
  
    7
    8
    9
  

## Sequence with Custom Start and Step

You can control the starting value and increment of the sequence. This example 
shows a sequence starting at 10 with steps of 5.

Custom SEQUENCE formula
  

=SEQUENCE(4,1,10,5)

This formula creates a 4-row, 1-column sequence starting at 10 with each 
subsequent number increasing by 5. The result demonstrates precise control over 
sequence parameters.

  
    A
  
  
    10
  
  
    15
  
  
    20
  
  
    25
  

## Descending Sequence

SEQUENCE can generate decreasing sequences by using a negative step value. This 
example counts down from 100.

Descending SEQUENCE formula
  

=SEQUENCE(5,1,100,-20)

This formula creates a 5-number sequence starting at 100 and decreasing by 20 
each step. The negative step parameter enables reverse counting functionality.

  
    A
  
  
    100
  
  
    80
  
  
    60
  
  
    40
  
  
    20
  

## Date Sequence

SEQUENCE works with dates since Excel stores them as numbers. This example 
generates a week's dates starting from a specific day.

Date SEQUENCE formula
  

=SEQUENCE(7,1,DATE(2025,1,1),1)

This formula creates a 7-day sequence starting from January 1, 2025. The step 
of 1 represents daily increments. Format the cells as dates to display properly.

  
    A
  
  
    1/1/2025
  
  
    1/2/2025
  
  
    1/3/2025
  
  
    1/4/2025
  
  
    1/5/2025
  
  
    1/6/2025
  
  
    1/7/2025
  

## Combining SEQUENCE with Other Functions

SEQUENCE becomes even more powerful when combined with other functions. This 
example creates a multiplication table.

Multiplication table formula
  

=SEQUENCE(10)*SEQUENCE(1,10)

This formula multiplies a vertical sequence (1-10) by a horizontal sequence 
(1-10). The result is a 10x10 multiplication table demonstrating array 
operations.

  
    A
    B
    C
    ...
    J
  
  
    1
    2
    3
    ...
    10
  
  
    2
    4
    6
    ...
    20
  
  
    3
    6
    9
    ...
    30
  
  
    ...
    ...
    ...
    ...
    ...
  
  
    10
    20
    30
    ...
    100
  

The SEQUENCE function revolutionizes how we generate number series 
in Excel. From simple lists to complex dynamic arrays, it offers precise 
control over sequence generation. Mastering SEQUENCE will significantly enhance 
your ability to work with structured data in modern Excel versions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).