+++
title = "Excel AGGREGATE Function"
date = 2025-08-29T19:53:54.812+01:00
draft = false
description = "Complete tutorial on Excel AGGREGATE function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel AGGREGATE Function

last modified April 4, 2025

The AGGREGATE function is a powerful and versatile function in Excel 
that can perform various calculations while ignoring errors, hidden rows, or 
other specific values. This tutorial provides a comprehensive guide to using the 
AGGREGATE function with detailed examples. You'll learn the syntax, 
function numbers, options, and practical applications to master this advanced 
Excel function.

## AGGREGATE Function Basics

The AGGREGATE function can perform 19 different operations like SUM, 
AVERAGE, MAX, etc., while providing options to ignore errors, hidden rows, or 
other subtotals. It has two forms: array and reference.

  
    Component
    Description
  
  
    Function Name
    AGGREGATE
  
  
    Syntax (Reference Form)
    =AGGREGATE(function_num, options, ref1, [ref2], ...)
  
  
    Syntax (Array Form)
    =AGGREGATE(function_num, options, array, [k])
  
  
    Arguments
    3-253 items depending on form
  
  
    Return Value
    Result of specified aggregation
  

This table breaks down the essential components of the AGGREGATE
function. It shows both syntax forms, argument limits, and return value 
characteristics.

## Function Numbers and Options

The AGGREGATE function uses numeric codes to specify which operation to perform 
and which values to ignore. Here are the available function numbers and options.

  
    Function Number
    Operation
  
  
    1
    AVERAGE
  
  
    2
    COUNT
  
  
    3
    COUNTA
  
  
    4
    MAX
  
  
    5
    MIN
  
  
    6
    PRODUCT
  
  
    7
    STDEV.S
  
  
    8
    STDEV.P
  
  
    9
    SUM
  
  
    10
    VAR.S
  
  
    11
    VAR.P
  
  
    12
    MEDIAN
  
  
    13
    MODE.SNGL
  
  
    14
    LARGE
  
  
    15
    SMALL
  
  
    16
    PERCENTILE.INC
  
  
    17
    QUARTILE.INC
  
  
    18
    PERCENTILE.EXC
  
  
    19
    QUARTILE.EXC
  

  
    Option Number
    Behavior
  
  
    0 or omitted
    Ignore nested SUBTOTAL and AGGREGATE functions
  
  
    1
    Ignore hidden rows, nested SUBTOTAL and AGGREGATE functions
  
  
    2
    Ignore error values, nested SUBTOTAL and AGGREGATE functions
  
  
    3
    Ignore hidden rows, error values, nested SUBTOTAL and AGGREGATE
  
  
    4
    Ignore nothing
  
  
    5
    Ignore hidden rows
  
  
    6
    Ignore error values
  
  
    7
    Ignore hidden rows and error values
  

These tables show all available operations and options for the AGGREGATE 
function. The function numbers determine the calculation, while options control 
what to ignore during calculation.

## Basic AGGREGATE Example (SUM)

This example demonstrates the simplest use of AGGREGATE to sum a range while 
ignoring errors.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    #N/A
    
  
  
    30
    
  
  
    
    =AGGREGATE(9, 6, A1:A4)
  

The table shows a range with numbers and an error value. The AGGREGATE function 
in B5 sums the range while ignoring the error (#N/A).

AGGREGATE to sum ignoring errors
  

=AGGREGATE(9, 6, A1:A4)

This formula uses function number 9 (SUM) with option 6 (ignore errors). It sums 
A1 (10), A2 (20), and A4 (30), ignoring A3 (#N/A). The result is 60. This 
demonstrates AGGREGATE's ability to handle errors gracefully.

## AGGREGATE with Hidden Rows

This example shows how AGGREGATE can ignore hidden rows in calculations.

  
    A
    B
  
  
    100
    
  
  
    200
    
  
  
    300
    
  
  
    400
    
  
  
    
    =AGGREGATE(9, 5, A1:A4)
  

Assuming row 2 is hidden, this table demonstrates AGGREGATE's ability to exclude 
hidden rows from calculations. The function will sum only visible cells.

AGGREGATE ignoring hidden rows
  

=AGGREGATE(9, 5, A1:A4)

This formula uses function number 9 (SUM) with option 5 (ignore hidden rows). If 
row 2 (A2=200) is hidden, it sums A1 (100), A3 (300), and A4 (400), giving 800. 
This is useful for filtered data or when rows are manually hidden.

## AGGREGATE with LARGE Function

This example demonstrates using AGGREGATE to find the second largest value while 
ignoring errors and hidden rows.

  
    A
    B
  
  
    500
    
  
  
    #N/A
    
  
  
    700
    
  
  
    600
    
  
  
    
    =AGGREGATE(14, 7, A1:A4, 2)
  

The table contains numbers and an error value. The AGGREGATE function finds the 
second largest value while ignoring the error and any hidden rows (option 7).

AGGREGATE with LARGE function
  

=AGGREGATE(14, 7, A1:A4, 2)

This uses function number 14 (LARGE) with option 7 (ignore hidden rows and 
errors). The "2" specifies the second largest value. It ignores A2 (#N/A) and 
returns 600 (second largest after 700). This shows AGGREGATE's advanced 
filtering capabilities.

## AGGREGATE with Multiple Conditions

This example shows AGGREGATE performing a conditional average while ignoring 
errors and hidden rows.

  
    A
    B
    C
  
  
    North
    100
    
  
  
    South
    #N/A
    
  
  
    North
    200
    
  
  
    East
    300
    
  
  
    North
    400
    
  
  
    
    
    =AGGREGATE(1, 7, (A1:A5="North")*B1:B5)
  

This table demonstrates a complex conditional average calculation. The formula 
averages values in column B where column A is "North", ignoring errors and 
hidden rows.

Conditional AGGREGATE with array formula
  

=AGGREGATE(1, 7, (A1:A5="North")*B1:B5)

This array formula uses function number 1 (AVERAGE) with option 7. It multiplies 
the condition (A1:A5="North") by the values (B1:B5). The result averages B1 
(100), B3 (200), and B5 (400), ignoring B2 (#N/A). The average is 233.33.

## AGGREGATE with PERCENTILE

This example demonstrates using AGGREGATE to calculate the 90th percentile 
while ignoring errors.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    #N/A
    
  
  
    30
    
  
  
    40
    
  
  
    50
    
  
  
    
    =AGGREGATE(16, 6, A1:A6, 0.9)
  

The table shows a dataset with an error value. The AGGREGATE function calculates 
the 90th percentile while ignoring the error (#N/A) in A3.

AGGREGATE with PERCENTILE.INC
  

=AGGREGATE(16, 6, A1:A6, 0.9)

This uses function number 16 (PERCENTILE.INC) with option 6 (ignore errors). The 
0.9 specifies the 90th percentile. It calculates from values 10,20,30,40,50, 
ignoring #N/A. The result is 46 (90th percentile of the remaining values).

The AGGREGATE function is an advanced tool that combines multiple 
Excel functions with powerful filtering options. Its ability to ignore errors, 
hidden rows, and other specific values makes it invaluable for working with 
real-world data. Mastering AGGREGATE will significantly enhance your data 
analysis capabilities in Excel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).