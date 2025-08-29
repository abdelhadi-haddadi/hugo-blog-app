+++
title = "Excel VAR/VAR.P/VAR.S Functions"
date = 2025-08-29T19:54:26.229+01:00
draft = false
description = "Complete tutorial on Excel variance functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel VAR/VAR.P/VAR.S Functions

last modified April 4, 2025

The VAR, VAR.P, and VAR.S functions are
essential statistical tools in Excel for calculating variance. Variance measures
how far a set of numbers are spread out from their average value. This tutorial
provides a comprehensive guide to using these functions with detailed examples.
You'll learn when to use each function and how to interpret the results.

## Variance Functions Basics

Variance is a statistical measure of dispersion in a dataset. Excel provides
three variance functions with different calculation methods for different needs.

  
    Function
    Description
    Population/Sample
  
  
    VAR
    Calculates variance based on a sample (older version)
    Sample
  
  
    VAR.S
    Calculates variance based on a sample (newer version)
    Sample
  
  
    VAR.P
    Calculates variance based on the entire population
    Population
  

This table compares the three variance functions in Excel. VAR and VAR.S both
calculate sample variance, while VAR.P calculates population variance. VAR is
the older function kept for compatibility.

## Basic VAR.S Example

This example demonstrates calculating sample variance using the VAR.S function
with a small dataset.

  
    A
    B
  
  
    10
    
  
  
    12
    
  
  
    14
    
  
  
    16
    
  
  
    18
    
  
  
    
    =VAR.S(A1:A5)
  

The table shows a simple dataset in column A and the VAR.S formula in cell B6.
This calculates the sample variance of the numbers 10, 12, 14, 16, and 18.

Basic VAR.S formula
  

=VAR.S(A1:A5)

This formula calculates the sample variance of values in A1 through A5. The
result is approximately 10. The formula uses n-1 in the denominator (sample
variance). This is appropriate when your data represents a sample of a larger
population.

## VAR.P for Population Variance

This example shows how to calculate population variance using VAR.P when you
have data for the entire population.

  
    A
    B
  
  
    5
    
  
  
    7
    
  
  
    9
    
  
  
    11
    
  
  
    
    =VAR.P(A1:A4)
  

The table contains a complete population dataset in column A. The VAR.P formula
in B5 calculates the population variance of these values.

VAR.P formula
  

=VAR.P(A1:A4)

This formula calculates the population variance of values 5, 7, 9, and 11. The
result is 5. VAR.P uses n in the denominator (population variance). Use this
when your data includes all members of the population you're studying.

## Comparing VAR and VAR.S

This example demonstrates that VAR and VAR.S produce identical results, as they
both calculate sample variance.

  
    A
    B
    C
  
  
    15
    
    
  
  
    20
    
    
  
  
    25
    
    
  
  
    30
    
    
  
  
    
    =VAR(A1:A4)
    =VAR.S(A1:A4)
  

The table shows the same dataset being analyzed with both VAR and VAR.S
functions. Cells B5 and C5 contain these formulas respectively.

VAR vs VAR.S comparison
  

=VAR(A1:A4)
=VAR.S(A1:A4)

Both formulas return the same result (approximately 41.6667). VAR is the legacy
function, while VAR.S is the newer recommended version. Microsoft recommends
using VAR.S for clarity in new workbooks.

## Handling Text and Logical Values

Variance functions automatically ignore text and logical values in the dataset.
This example demonstrates this behavior.

  
    A
    B
  
  
    10
    
  
  
    15
    
  
  
    Text
    
  
  
    TRUE
    
  
  
    20
    
  
  
    
    =VAR.S(A1:A5)
  

The table contains a mix of numbers, text, and logical values. The VAR.S
formula in B6 calculates variance using only the numeric values.

VAR.S with mixed data types
  

=VAR.S(A1:A5)

This formula calculates variance using only the numeric values (10, 15, 20).
The text and logical values are ignored. The result is approximately 25. This
behavior makes variance functions robust with real-world datasets.

## Variance with Blank Cells

Variance functions treat blank cells as missing data and exclude them from
calculations. This example shows this behavior.

  
    A
    B
  
  
    8
    
  
  
    
    
  
  
    12
    
  
  
    16
    
  
  
    
    =VAR.S(A1:A4)
  

The table contains numbers and blank cells to demonstrate how VAR.S handles
empty cells. The blank cells are excluded from the variance calculation.

VAR.S with blank cells
  

=VAR.S(A1:A4)

This formula calculates variance using only the non-blank cells (8, 12, 16).
The result is approximately 16. Blank cells don't affect the calculation as
they're treated as missing data rather than zeros.

## Choosing Between VAR.S and VAR.P

The key difference between VAR.S and VAR.P is in their denominators. VAR.S uses
n-1 (sample variance) while VAR.P uses n (population variance).

Use VAR.S when your data is a sample of a larger population. This gives an
unbiased estimate of the population variance. Use VAR.P when your data includes
all members of the population you're studying.

For example, if measuring heights of all students in a class, use VAR.P. If
measuring heights of 30 randomly selected students from a school of 300, use
VAR.S.

The VAR, VAR.P, and VAR.S functions are
powerful tools for statistical analysis in Excel. Understanding when to use
each function is crucial for accurate data analysis. VAR.S is generally
preferred for sample data, while VAR.P should be used for complete population
data. Remember that these functions automatically handle text and blank cells
appropriately.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).