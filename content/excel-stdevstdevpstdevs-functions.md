+++
title = "Excel STDEV/STDEV.P/STDEV.S Functions"
date = 2025-08-29T19:54:20.611+01:00
draft = false
description = "Complete tutorial on Excel STDEV functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel STDEV/STDEV.P/STDEV.S Functions

last modified April 4, 2025

The STDEV functions are essential statistical tools in Excel for 
measuring data dispersion. This tutorial covers STDEV, 
STDEV.P, and STDEV.S with detailed examples. You'll 
learn when to use each function, their differences, and practical applications. 
Master these functions to analyze data variability effectively in your 
spreadsheets.

## STDEV Functions Basics

Standard deviation measures how spread out numbers are from their average. Excel 
provides three variants: STDEV (legacy), STDEV.P 
(population), and STDEV.S (sample). Each serves different 
statistical purposes.

  
    Function
    Description
    When to Use
  
  
    STDEV
    Legacy sample standard deviation
    Backward compatibility
  
  
    STDEV.P
    Population standard deviation
    Entire dataset available
  
  
    STDEV.S
    Sample standard deviation
    Working with sample data
  

This table compares the three standard deviation functions in Excel. 
STDEV.P uses n denominator, while STDEV.S uses n-1 
for sample correction. STDEV is kept for compatibility.

## Basic STDEV.P Example

This example demonstrates STDEV.P calculating population standard 
deviation for a complete dataset of test scores.

  
    A
    B
  
  
    85
    
  
  
    90
    
  
  
    78
    
  
  
    92
    
  
  
    88
    
  
  
    
    =STDEV.P(A1:A5)
  

The table shows test scores for an entire class (population). 
STDEV.P calculates how much these scores vary from the mean.

STDEV.P formula
  

=STDEV.P(A1:A5)

This formula returns approximately 4.82, indicating moderate variation in test 
scores. Since we have all student scores, we use STDEV.P for the 
population standard deviation.

## STDEV.S with Sample Data

When working with a sample of a larger population, use STDEV.S. 
This example calculates standard deviation for product weights from a sample.

  
    A
    B
  
  
    502
    
  
  
    498
    
  
  
    505
    
  
  
    495
    
  
  
    
    =STDEV.S(A1:A4)
  

The table shows weights (in grams) of four randomly selected products from a 
production line. STDEV.S estimates the standard deviation for the 
entire production.

STDEV.S formula
  

=STDEV.S(A1:A4)

The result is approximately 4.55 grams. This sample standard deviation helps 
quality control assess production consistency. The n-1 denominator provides an 
unbiased estimate.

## STDEV with Mixed Data

The legacy STDEV function handles mixed data types similarly to 
STDEV.S. This example shows its behavior with numbers and text.

  
    A
    B
  
  
    10
    
  
  
    15
    
  
  
    Text
    
  
  
    20
    
  
  
    
    =STDEV(A1:A4)
  

The table demonstrates how STDEV ignores non-numeric values when 
calculating standard deviation. Only the numbers 10, 15, and 20 are considered.

STDEV formula
  

=STDEV(A1:A4)

The formula returns approximately 5.0 as the standard deviation. While 
STDEV still works, Microsoft recommends using STDEV.S 
for new worksheets as it's more clearly named.

## Comparing STDEV.P and STDEV.S

This example demonstrates the difference between population and sample standard 
deviation calculations using the same dataset.

  
    A
    B
    C
  
  
    22
    
    
  
  
    25
    
    
  
  
    28
    
    
  
  
    31
    
    
  
  
    
    =STDEV.P(A1:A4)
    =STDEV.S(A1:A4)
  

The table shows the same temperature readings analyzed as both a population 
(B2) and sample (C2). This highlights the mathematical difference between the 
two functions.

Comparing STDEV functions
  

=STDEV.P(A1:A4)  // Returns ~3.54
=STDEV.S(A1:A4)  // Returns ~4.08

STDEV.P returns 3.54 (using n denominator), while 
STDEV.S returns 4.08 (using n-1). The sample version produces a 
larger value to account for estimation uncertainty.

## STDEV.P with Named Range

Standard deviation functions work well with named ranges, improving formula 
readability. This example uses STDEV.P with a named range.

  
    A
    B
  
  
    8.2
    
  
  
    8.5
    
  
  
    8.3
    
  
  
    8.6
    
    
  
    
    =STDEV.P(Diameters)
  

Assuming A1:A4 is named "Diameters", this calculates population standard 
deviation of machined part diameters. Named ranges make formulas more 
understandable.

STDEV.P with named range
  

=STDEV.P(Diameters)

The formula returns approximately 0.17, indicating tight diameter control. 
Named ranges are especially helpful in complex worksheets with many 
calculations.

## STDEV Functions with Blank Cells

Standard deviation functions ignore blank cells in calculations. This example 
shows STDEV.S behavior with incomplete data.

  
    A
    B
  
  
    120
    
  
  
    
    
  
  
    125
    
  
  
    118
    
  
  
    
    =STDEV.S(A1:A4)
  

The table contains three blood pressure readings with one blank cell. 
STDEV.S automatically excludes the blank from its calculation.

STDEV.S with blank cells
  

=STDEV.S(A1:A4)

The formula returns approximately 3.51 for the three valid values. Blank cells 
don't affect the result, making these functions robust for real-world datasets 
with missing values.

Excel's standard deviation functions are powerful tools for statistical 
analysis. STDEV.P is for complete populations, while 
STDEV.S is for samples. The legacy STDEV works like 
STDEV.S but use the newer functions for clarity. Understanding 
these differences ensures accurate data variability measurements in your 
workbooks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).