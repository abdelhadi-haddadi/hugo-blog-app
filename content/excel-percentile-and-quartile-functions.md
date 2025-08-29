+++
title = "Excel PERCENTILE and QUARTILE Functions"
date = 2025-08-29T19:54:16.051+01:00
draft = false
description = "Complete tutorial on Excel PERCENTILE and QUARTILE functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel PERCENTILE and QUARTILE Functions

last modified April 4, 2025

The PERCENTILE and QUARTILE functions are powerful
statistical tools in Excel. They help analyze data distribution by finding
values at specific percentiles or quartiles. This tutorial provides a
comprehensive guide to using these functions. You'll learn their syntax,
differences, and practical applications with detailed examples.

## PERCENTILE/QUARTILE Basics

PERCENTILE returns the value at a specific percentile in a dataset.
QUARTILE is a special case that returns values at the 0%, 25%,
50%, 75%, and 100% points. Both help understand data distribution.

  
    Function
    Description
  
  
    PERCENTILE
    Returns value at given percentile (0-1)
  
  
    PERCENTILE.INC
    Inclusive version (Excel 2010+)
  
  
    PERCENTILE.EXC
    Exclusive version (Excel 2010+)
  
  
    QUARTILE
    Returns value at quartile (0-4)
  
  
    QUARTILE.INC
    Inclusive version (Excel 2010+)
  
  
    QUARTILE.EXC
    Exclusive version (Excel 2010+)
  

This table shows the different variations of these functions. The .INC versions
include 0 and 1 percentiles, while .EXC versions exclude them. QUARTILE is
essentially PERCENTILE for specific points (0%, 25%, 50%, 75%, 100%).

## Basic PERCENTILE Example

This example demonstrates finding the 90th percentile in a dataset of test
scores. The percentile shows the score below which 90% of scores fall.

  
    A
    B
  
  
    78
    
  
  
    85
    
  
  
    92
    
  
  
    88
    
  
  
    95
    
  
  
    
    =PERCENTILE.INC(A1:A5, 0.9)
  

Basic PERCENTILE formula
  

=PERCENTILE.INC(A1:A5, 0.9)

This formula calculates the 90th percentile of test scores in A1:A5. The result
will be approximately 93.8, meaning 90% of scores are below this value. The
.INC version includes the 0th and 100th percentiles in calculations.

## QUARTILE Example with Sales Data

This example uses QUARTILE to analyze quarterly sales data distribution. It
shows how to find all five quartile points (minimum, Q1, median, Q3, maximum).

  
    A
    B
  
  
    12500
    
  
  
    18700
    
  
  
    14300
    
  
  
    21000
    
  
  
    16500
    
  
  
    
    =QUARTILE.INC(A1:A5, 0)
  
  
    
    =QUARTILE.INC(A1:A5, 1)
  
  
    
    =QUARTILE.INC(A1:A5, 2)
  
  
    
    =QUARTILE.INC(A1:A5, 3)
  
  
    
    =QUARTILE.INC(A1:A5, 4)
  

QUARTILE formulas
  

=QUARTILE.INC(A1:A5, 0)  // Minimum
=QUARTILE.INC(A1:A5, 1)  // First quartile (25%)
=QUARTILE.INC(A1:A5, 2)  // Median (50%)
=QUARTILE.INC(A1:A5, 3)  // Third quartile (75%)
=QUARTILE.INC(A1:A5, 4)  // Maximum

These formulas calculate all five quartile points for the sales data. Quartile 0
is the minimum (12500), Q1 is ~14400, median is 16500, Q3 is ~19600, and Q4 is
the maximum (21000). This gives a complete picture of data distribution.

## PERCENTILE.EXC vs PERCENTILE.INC

This example demonstrates the difference between the inclusive and exclusive
versions of PERCENTILE. The .EXC version excludes 0% and 100% percentiles.

  
    A
    B
    C
  
  
    15
    =PERCENTILE.INC(A1:A5, 0)
    =PERCENTILE.EXC(A1:A5, 0)
  
  
    22
    =PERCENTILE.INC(A1:A5, 0.5)
    =PERCENTILE.EXC(A1:A5, 0.5)
  
  
    30
    =PERCENTILE.INC(A1:A5, 1)
    =PERCENTILE.EXC(A1:A5, 1)
  
  
    18
    
    
  
  
    25
    
    
  

PERCENTILE comparison
  

=PERCENTILE.INC(A1:A5, 0)  // Returns 15 (minimum)
=PERCENTILE.EXC(A1:A5, 0)  // Returns #NUM! error
=PERCENTILE.INC(A1:A5, 1)  // Returns 30 (maximum)
=PERCENTILE.EXC(A1:A5, 1)  // Returns #NUM! error

The .INC version works with 0 and 1 percentiles, returning min/max values. The
.EXC version returns errors for these cases as it excludes extremes. For 0.5
(median), both return similar values (~23.5 in this case).

## Using QUARTILE for Outlier Detection

This example shows how to use QUARTILE to identify potential outliers using the
interquartile range (IQR) method. IQR is Q3-Q1, and outliers are typically
values below Q1-1.5*IQR or above Q3+1.5*IQR.

  
    A
    B
  
  
    12
    =QUARTILE.INC(A1:A10,1)
  
  
    15
    =QUARTILE.INC(A1:A10,3)
  
  
    18
    =B1-1.5*(B2-B1)
  
  
    20
    =B2+1.5*(B2-B1)
  
  
    22
    
  
  
    25
    
  
  
    28
    
  
  
    32
    
  
  
    35
    
  
  
    120
    
  

Outlier detection formulas
  

=QUARTILE.INC(A1:A10,1)  // Q1 (18)
=QUARTILE.INC(A1:A10,3)  // Q3 (32)
=B1-1.5*(B2-B1)  // Lower bound (-3)
=B2+1.5*(B2-B1)  // Upper bound (53)

This calculates Q1 (18) and Q3 (32), then determines outlier thresholds. The
value 120 exceeds the upper bound (53), identifying it as a potential outlier.
This method is commonly used in statistical analysis.

## PERCENTILE with Conditional Data

This advanced example combines PERCENTILE with FILTER to calculate percentiles
for specific subsets of data. Here we find the 75th percentile for sales in the
East region only.

  
    A (Region)
    B (Sales)
    C
  
  
    East
    12000
    
  
  
    West
    15000
    
  
  
    East
    18000
    
  
  
    North
    9000
    
  
  
    East
    21000
    
  
  
    
    
    =PERCENTILE.INC(FILTER(B1:B5,A1:A5="East"),0.75)
  

Conditional PERCENTILE
  

=PERCENTILE.INC(FILTER(B1:B5,A1:A5="East"),0.75)

This formula first filters to only East region sales (12000, 18000, 21000),
then calculates the 75th percentile (~19500). This technique is powerful for
analyzing specific segments within larger datasets.

The PERCENTILE and QUARTILE functions are essential
for statistical analysis in Excel. They help understand data distribution,
identify outliers, and compare subsets. Remember that .INC includes min/max
while .EXC excludes them. Mastering these functions provides valuable insights
into your data's characteristics.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).