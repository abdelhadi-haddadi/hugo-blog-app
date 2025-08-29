+++
title = "Excel FREQUENCY Function"
date = 2025-08-29T19:54:05.994+01:00
draft = false
description = "Complete tutorial on Excel FREQUENCY function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel FREQUENCY Function

last modified April 4, 2025

The FREQUENCY function is a statistical function in Excel that 
calculates how often values occur within specified ranges (bins). This tutorial 
provides a comprehensive guide to using the FREQUENCY function. 
You'll learn its syntax, practical applications, and advanced techniques to 
master this powerful data analysis tool.

## FREQUENCY Function Basics

The FREQUENCY function counts how many values fall within specified 
ranges (bins) in a dataset. It returns a vertical array of counts and must be 
entered as an array formula (Ctrl+Shift+Enter in older Excel versions).

  
    Component
    Description
  
  
    Function Name
    FREQUENCY
  
  
    Syntax
    =FREQUENCY(data_array, bins_array)
  
  
    Arguments
    data_array: Values to analyze
bins_array: Upper limits of ranges
  
  
    Return Value
    Vertical array of counts
  

This table breaks down the essential components of the FREQUENCY
function. It shows the function name, syntax format, argument requirements, and
return value characteristics.

## Basic FREQUENCY Example

This example demonstrates the simplest use of FREQUENCY with test
scores and grade boundaries.

  
    A (Scores)
    B (Grade Boundaries)
    C (Frequency)
  
  
    78
    60
    
  
  
    85
    70
    
  
  
    92
    80
    
  
  
    65
    90
    
  
  
    72
    
    
  

Select cells C1:C4, enter the formula, and press Ctrl+Shift+Enter (for array 
formula in older Excel versions). The function will count scores in each grade 
range.

Basic FREQUENCY formula
  

=FREQUENCY(A1:A5, B1:B4)

This formula counts how many scores fall into each grade range: ≤60, 61-70, 
71-80, 81-90, and &gt;90. The result will be a vertical array with counts for 
each bin.

## FREQUENCY with Equal Width Bins

This example shows how to create equal-width bins for analyzing age 
distribution data.

  
    A (Ages)
    B (Bin Upper Limits)
    C (Frequency)
  
  
    23
    20
    
  
  
    35
    30
    
  
  
    42
    40
    
  
  
    28
    50
    
  
  
    19
    
    
  

FREQUENCY with equal bins
  

=FREQUENCY(A1:A5, B1:B4)

This formula creates age groups: ≤20, 21-30, 31-40, 41-50, and &gt;50. The
result shows counts for each age range. Equal-width bins are useful for
consistent data analysis.

## FREQUENCY with Unequal Bins

This example demonstrates using custom, unequal bin sizes for salary data 
analysis.

  
    A (Salaries)
    B (Salary Brackets)
    C (Frequency)
  
  
    45000
    30000
    
  
  
    62000
    50000
    
  
  
    38000
    70000
    
  
  
    55000
    100000
    
  
  
    82000
    
    
  

FREQUENCY with custom bins
  

=FREQUENCY(A1:A5, B1:B4)

This formula creates salary brackets: ≤30k, 30k-50k, 50k-70k, 70k-100k, and
&gt;100k. Unequal bins allow for meaningful categorization based on business
needs.

## FREQUENCY with Dynamic Arrays

In modern Excel, FREQUENCY automatically spills results with
dynamic arrays. This example analyzes product prices.

  
    A (Prices)
    B (Price Ranges)
    C (Frequency)
  
  
    15.99
    10
    
  
  
    8.50
    20
    
  
  
    25.00
    30
    
  
  
    12.75
    
    
  

FREQUENCY with dynamic arrays
  

=FREQUENCY(A1:A4, B1:B3)

This formula counts products in price ranges: ≤$10, $10-$20, $20-$30, and 
&gt;$30. In Excel 365/2019, results automatically spill to adjacent cells.

## FREQUENCY with Empty Cells

This example shows how FREQUENCY handles empty cells in the data
array.

  
    A (Values)
    B (Bins)
    C (Frequency)
  
  
    5
    5
    
  
  
    
    10
    
  
  
    12
    
    
  
  
    8
    
    
  

FREQUENCY with empty cells
  

=FREQUENCY(A1:A4, B1:B2)

Empty cells in the data array are ignored. The formula counts values ≤5, 6-10, 
and &gt;10. The empty cell A2 doesn't affect the counts.

## FREQUENCY with Text Values

This example demonstrates FREQUENCY's behavior when the data array contains 
text values.

  
    A (Mixed Data)
    B (Bins)
    C (Frequency)
  
  
    15
    10
    
  
  
    "Text"
    20
    
  
  
    25
    
    
  

FREQUENCY with text values
  

=FREQUENCY(A1:A3, B1:B2)

Text values in the data array are treated as zero. The formula counts values 
≤10, 11-20, and &gt;20. "Text" in A2 is counted in the ≤10 bin as zero.

The FREQUENCY function is a powerful tool for statistical analysis
in Excel. It provides valuable insights into data distribution patterns.
Remember that FREQUENCY returns an array and requires proper range
selection. With practice, you can use it to analyze test scores, salaries, ages,
and other numerical datasets effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).