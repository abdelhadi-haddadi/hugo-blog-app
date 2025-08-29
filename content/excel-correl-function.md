+++
title = "Excel CORREL Function"
date = 2025-08-29T19:53:59.281+01:00
draft = false
description = "Complete tutorial on Excel CORREL function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel CORREL Function

last modified April 4, 2025

The CORREL function calculates the correlation coefficient between 
two data sets. It measures how closely two variables move in relation to each 
other. This tutorial provides a comprehensive guide to using the 
CORREL function with detailed examples. You'll learn basic syntax, 
practical applications, and interpretation of results.

## CORREL Function Basics

The CORREL function returns the Pearson correlation coefficient. 
It ranges from -1 to 1, indicating negative to positive correlation. A value of 
0 means no correlation exists between the variables.

  
    Component
    Description
  
  
    Function Name
    CORREL
  
  
    Syntax
    =CORREL(array1, array2)
  
  
    Arguments
    Two required ranges of equal size
  
  
    Return Value
    Correlation coefficient (-1 to 1)
  

This table breaks down the essential components of the CORREL
function. It shows the function name, basic syntax format, argument 
requirements, and return value characteristics.

## Basic CORREL Example

This example demonstrates the simplest use of CORREL with two small data sets. 
We'll examine the relationship between study hours and test scores.

  
    A
    B
    C
  
  
    Study Hours
    Test Scores
    
  
  
    2
    65
    
  
  
    4
    80
    
  
  
    6
    95
    
  
  
    
    
    =CORREL(A2:A4,B2:B4)
  

Basic CORREL formula
  

=CORREL(A2:A4,B2:B4)

This formula calculates the correlation between study hours (A2:A4) and test 
scores (B2:B4). The result will be 1, indicating a perfect positive 
correlation. As study hours increase, test scores increase proportionally.

## CORREL with Real-World Data

This example uses CORREL with larger data sets to analyze the relationship 
between temperature and ice cream sales over 12 months.

  
    A
    B
    C
  
  
    Month
    Temperature (°F)
    Ice Cream Sales
  
  
    Jan
    32
    150
  
  
    Feb
    35
    180
  
  
    Mar
    45
    220
  
  
    ...
    ...
    ...
  
  
    Dec
    28
    120
  
  
    
    
    =CORREL(B2:B13,C2:C13)
  

CORREL with monthly data
  

=CORREL(B2:B13,C2:C13)

This formula calculates the correlation between temperature (B2:B13) and ice 
cream sales (C2:C13). The result might be around 0.9, showing a strong 
positive correlation. Higher temperatures generally lead to increased ice cream 
sales.

## CORREL with Negative Correlation

This example demonstrates negative correlation by examining the relationship 
between outdoor temperature and heating costs.

  
    A
    B
    C
  
  
    Month
    Temperature (°F)
    Heating Cost ($)
  
  
    Jan
    25
    180
  
  
    Feb
    30
    150
  
  
    Mar
    40
    120
  
  
    ...
    ...
    ...
  
  
    Dec
    28
    160
  
  
    
    
    =CORREL(B2:B13,C2:C13)
  

CORREL showing negative relationship
  

=CORREL(B2:B13,C2:C13)

This formula calculates the correlation between temperature (B2:B13) and 
heating costs (C2:C13). The result might be around -0.85, indicating a strong 
negative correlation. As temperatures rise, heating costs typically decrease.

## CORREL with No Correlation

This example shows data sets with no apparent relationship, demonstrating how 
CORREL identifies lack of correlation.

  
    A
    B
    C
  
  
    Day
    Number of Cats Seen
    Stock Market Index
  
  
    1
    3
    10500
  
  
    2
    5
    10480
  
  
    3
    2
    10520
  
  
    4
    4
    10510
  
  
    5
    3
    10490
  
  
    
    
    =CORREL(B2:B6,C2:C6)
  

CORREL with unrelated data
  

=CORREL(B2:B6,C2:C6)

This formula calculates correlation between cats seen (B2:B6) and stock market 
index (C2:C6). The result will be close to 0, indicating no meaningful 
relationship. CORREL helps identify when variables are statistically 
independent.

## CORREL with Different Sized Ranges

This example demonstrates what happens when the input ranges have different 
sizes, which causes an error in Excel.

  
    A
    B
    C
  
  
    X Values
    Y Values
    
  
  
    10
    20
    
  
  
    15
    25
    
  
  
    20
    
    
  
  
    
    
    =CORREL(A2:A4,B2:B3)
  

CORREL with mismatched ranges
  

=CORREL(A2:A4,B2:B3)

This formula attempts to correlate range A2:A4 (3 values) with B2:B3 (2 
values). Excel returns a #N/A error because the ranges must be the same size. 
Always verify range sizes when using CORREL.

## CORREL with Text and Empty Cells

This example shows how CORREL handles ranges containing text values or empty 
cells.

  
    A
    B
    C
  
  
    X Values
    Y Values
    
  
  
    5
    10
    
  
  
    Text
    15
    
  
  
    
    20
    
  
  
    10
    25
    
  
  
    
    
    =CORREL(A2:A5,B2:B5)
  

CORREL with mixed data types
  

=CORREL(A2:A5,B2:B5)

This formula correlates ranges containing a text value (A3) and an empty cell 
(A4). CORREL ignores these non-numeric entries and calculates based on valid 
number pairs. The result uses only (5,10) and (10,25) from the complete ranges.

## Interpreting CORREL Results

Understanding the correlation coefficient value is crucial for proper analysis. 
Here's a guide to interpreting CORREL results.

  
    Correlation Value
    Interpretation
  
  
    1.0
    Perfect positive correlation
  
  
    0.7 to 0.9
    Strong positive correlation
  
  
    0.4 to 0.6
    Moderate correlation
  
  
    0.1 to 0.3
    Weak correlation
  
  
    0
    No correlation
  
  
    -0.1 to -0.3
    Weak negative correlation
  
  
    -0.4 to -0.6
    Moderate negative correlation
  
  
    -0.7 to -0.9
    Strong negative correlation
  
  
    -1.0
    Perfect negative correlation
  

This table provides guidelines for interpreting CORREL results. Remember that 
correlation doesn't imply causation. Always consider context when analyzing 
relationships between variables.

The CORREL function is a powerful tool for statistical analysis in 
Excel. It helps identify relationships between variables, whether positive, 
negative, or nonexistent. Proper interpretation of results is essential for 
making data-driven decisions. CORREL works best with clean, numeric data sets 
of equal size.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).