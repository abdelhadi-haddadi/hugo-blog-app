+++
title = "Excel SUBTOTAL Function"
date = 2025-08-29T19:54:20.597+01:00
draft = false
description = "Complete tutorial on Excel SUBTOTAL function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SUBTOTAL Function

last modified April 4, 2025

The SUBTOTAL function is a versatile Excel function that performs
various calculations while ignoring hidden rows. It can calculate sums, averages,
counts and more. This tutorial provides a comprehensive guide to using the
SUBTOTAL function with detailed examples. You'll learn basic syntax,
practical applications, and advanced techniques to master this essential Excel
function.

## SUBTOTAL Function Basics

The SUBTOTAL function performs calculations on a range of data while
optionally ignoring hidden rows. It offers 11 different operations through its
function_num argument. The syntax is flexible and powerful.

  
    Component
    Description
  
  
    Function Name
    SUBTOTAL
  
  
    Syntax
    =SUBTOTAL(function_num, ref1, [ref2], ...)
  
  
    Arguments
    function_num (1-11 or 101-111), ref1 (required), ref2 (optional)
  
  
    Return Value
    Result of specified calculation on the range
  

This table breaks down the essential components of the SUBTOTAL
function. It shows the function name, basic syntax format, argument details,
and return value characteristics.

## Basic SUBTOTAL Example (Sum)

This example demonstrates the simplest use of SUBTOTAL to sum a range of values.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    30
    
  
  
    
    =SUBTOTAL(9, A1:A3)
  

The table shows a simple spreadsheet with values in column A and a
SUBTOTAL formula in cell B4 that sums the values from A1 to A3.

Basic SUBTOTAL sum formula
  

=SUBTOTAL(9, A1:A3)

This formula sums values in cells A1 through A3 using function_num 9 (SUM). The
result will be 60 (10+20+30). This shows the basic summing capability of
SUBTOTAL.

## SUBTOTAL with Hidden Rows

SUBTOTAL can ignore values in hidden rows when using function numbers 101-111.
This example shows this behavior.

  
    A
    B
  
  
    10
    
  
  
    20
    (hidden row)
  
  
    30
    
  
  
    
    =SUBTOTAL(109, A1:A3)
  

This table demonstrates SUBTOTAL's ability to ignore hidden rows in calculations.
Row 2 is hidden, and the formula uses 109 (SUM ignoring hidden rows).

SUBTOTAL ignoring hidden rows
  

=SUBTOTAL(109, A1:A3)

This formula sums A1 (10) and A3 (30), ignoring the hidden A2 (20). The result
is 40. This demonstrates SUBTOTAL's unique ability to handle filtered data.

## SUBTOTAL for Average Calculation

SUBTOTAL can calculate averages using function_num 1 or 101. This example shows
average calculation while ignoring hidden rows.

  
    A
    B
  
  
    10
    
  
  
    20
    (hidden row)
  
  
    30
    
  
  
    
    =SUBTOTAL(101, A1:A3)
  

The table shows how SUBTOTAL calculates averages while excluding hidden rows.
Row 2 is hidden, and the formula uses 101 (AVERAGE ignoring hidden rows).

SUBTOTAL average calculation
  

=SUBTOTAL(101, A1:A3)

This formula averages A1 (10) and A3 (30), ignoring hidden A2 (20). The result
is 20. This shows SUBTOTAL's ability to perform different calculations.

## SUBTOTAL for Count Operations

SUBTOTAL can count cells with numbers (function_num 2 or 102) or non-empty cells
(function_num 3 or 103). This example demonstrates counting.

  
    A
    B
  
  
    10
    
  
  
    Text
    (hidden row)
  
  
    30
    
  
  
    
    =SUBTOTAL(102, A1:A3)
  
  
    
    =SUBTOTAL(103, A1:A3)
  

This table shows two counting operations: counting numbers and counting non-empty
cells, both ignoring hidden rows. Row 2 is hidden and contains text.

SUBTOTAL count examples
  

=SUBTOTAL(102, A1:A3)  // Count numbers, ignoring hidden
=SUBTOTAL(103, A1:A3)  // Count non-empty, ignoring hidden

The first formula counts numeric cells (A1 and A3), ignoring hidden A2. Result
is 2. The second counts all non-empty cells (A1-A3), but still ignoring hidden
A2. Result is 2 (A1 and A3).

## SUBTOTAL with Multiple Ranges

SUBTOTAL can handle multiple ranges just like other Excel functions. This
example shows summing across non-contiguous ranges.

  
    A
    B
    C
  
  
    5
    10
    
  
  
    15
    20
    
  
  
    
    
    =SUBTOTAL(9, A1:A2, B1:B2)
  

This table demonstrates SUBTOTAL's ability to combine different ranges in one
calculation. The formula sums values from both column A and column B ranges.

SUBTOTAL with multiple ranges
  

=SUBTOTAL(9, A1:A2, B1:B2)

This formula sums all values in ranges A1:A2 (5+15) and B1:B2 (10+20). The
result is 50. This shows SUBTOTAL's flexibility with multiple input ranges.

## SUBTOTAL with Filtered Data

SUBTOTAL is particularly useful with filtered data as it automatically ignores
hidden (filtered-out) rows when using 101-111 function numbers.

  
    A
    B
    C
  
  
    100
    North
    
  
  
    200
    South
    (filtered out)
  
  
    300
    North
    
  
  
    
    
    =SUBTOTAL(109, A1:A3)
  

The table shows data filtered to show only "North" region sales. The SUBTOTAL
formula with 109 sums only visible (unfiltered) rows.

SUBTOTAL with filtered data
  

=SUBTOTAL(109, A1:A3)

This formula sums only visible cells in A1:A3 (100 and 300), ignoring filtered
A2 (200). The result is 400. This automatic handling makes SUBTOTAL ideal for
filtered reports.

## SUBTOTAL Nested in Other Calculations

SUBTOTAL results can be used in other calculations. This example shows
calculating a percentage of subtotal.

  
    A
    B
    C
  
  
    100
    North
    
  
  
    200
    South
    (filtered out)
  
  
    300
    North
    
  
  
    
    
    =A1/SUBTOTAL(109, A1:A3)
  

The table demonstrates using SUBTOTAL within a larger calculation. The formula
calculates what percentage the first row is of the filtered total.

SUBTOTAL in percentage calculation
  

=A1/SUBTOTAL(109, A1:A3)

This formula divides A1 (100) by the filtered sum of A1:A3 (400). The result is
0.25 or 25%. This shows how SUBTOTAL can be part of more complex formulas.

## SUBTOTAL Function Numbers Reference

The SUBTOTAL function offers 22 different operations through its function_num
argument. This table lists all available options.

  
    Function_num
    Operation
    Includes Hidden
    Excludes Hidden
  
  
    1
    AVERAGE
    101
    AVERAGE (ignores hidden)
  
  
    2
    COUNT
    102
    COUNT (ignores hidden)
  
  
    3
    COUNTA
    103
    COUNTA (ignores hidden)
  
  
    4
    MAX
    104
    MAX (ignores hidden)
  
  
    5
    MIN
    105
    MIN (ignores hidden)
  
  
    6
    PRODUCT
    106
    PRODUCT (ignores hidden)
  
  
    7
    STDEV
    107
    STDEV (ignores hidden)
  
  
    8
    STDEVP
    108
    STDEVP (ignores hidden)
  
  
    9
    SUM
    109
    SUM (ignores hidden)
  
  
    10
    VAR
    110
    VAR (ignores hidden)
  
  
    11
    VARP
    111
    VARP (ignores hidden)
  

This reference table shows all 22 function_num options for SUBTOTAL. Numbers
1-11 include hidden values, while 101-111 exclude them in calculations.

## Common SUBTOTAL Use Cases

Here are some practical scenarios where SUBTOTAL shines:

  - **Dynamic Reports:** Create summary calculations that automatically adjust when filtering data

  - **Data Analysis:** Analyze visible data while ignoring filtered-out values

  - **Dashboard Summaries:** Build flexible dashboard metrics that respond to filters

  - **Sub-Reports:** Calculate totals within filtered sections of larger datasets

## Tips and Best Practices

To get the most out of SUBTOTAL, consider these tips:

  - Use 101-111 function numbers when working with filters or hidden rows

  - Avoid nesting SUBTOTAL within another SUBTOTAL (it can cause errors)

  - Combine with AutoFilter for interactive reports

  - Use with tables for structured references

  - Test formulas with both hidden and visible data to verify results

## Limitations

While powerful, SUBTOTAL has some limitations to be aware of:

  - Ignores manually hidden rows only with 101-111 function numbers

  - Doesn't work with 3D references across multiple sheets

  - Can't directly handle array constants

  - May return errors if ranges include other SUBTOTAL formulas

The SUBTOTAL function is an essential tool for dynamic reports and
filtered data analysis in Excel. Its ability to ignore hidden rows makes it
superior to regular functions like SUM or AVERAGE for many tasks. By mastering
SUBTOTAL, you can create flexible, robust spreadsheets that automatically update
calculations when data is filtered or rows are hidden. Whether you're building
dashboards, analyzing datasets, or creating interactive reports, SUBTOTAL
provides the versatility needed for professional Excel work.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).