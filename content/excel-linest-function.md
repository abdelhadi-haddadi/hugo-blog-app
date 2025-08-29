+++
title = "Excel LINEST Function"
date = 2025-08-29T19:54:12.725+01:00
draft = false
description = "Complete tutorial on Excel LINEST function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel LINEST Function

last modified April 4, 2025

The LINEST function is Excel's powerful tool for linear regression 
analysis. It calculates statistics for a straight line that best fits your data. 
This tutorial provides a comprehensive guide to using LINEST with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master this statistical function.

## LINEST Function Basics

The LINEST function performs linear regression to find the best-fit 
line for your data. It returns an array of values describing the line's equation 
and statistics. The syntax is more complex than basic Excel functions.

  
    Component
    Description
  
  
    Function Name
    LINEST
  
  
    Syntax
    =LINEST(known_y's, [known_x's], [const], [stats])
  
  
    Arguments
    Required: known_y's
Optional: known_x's, const, stats
  
  
    Return Value
    Array of regression statistics
  

This table breaks down the essential components of the LINEST
function. It shows the function name, syntax format, argument requirements, and
return value characteristics.

## Simple Linear Regression

This example demonstrates basic linear regression with one independent variable. 
We'll find the best-fit line for a simple dataset.

  
    A
    B
  
  
    1
    3
  
  
    2
    5
  
  
    3
    7
  
  
    4
    9
  

The table shows a perfect linear relationship where y = 2x + 1. We'll use 
LINEST to calculate the slope and intercept.

Basic LINEST formula
  

=LINEST(B1:B4, A1:A4)

Select two adjacent cells, enter this formula, and press Ctrl+Shift+Enter (array 
formula). The first cell shows the slope (2), the second shows the intercept (1). 
This matches our perfect linear relationship.

## Multiple Regression

LINEST can handle multiple independent variables. This example shows 
regression with two predictors (x1 and x2).

  
    A
    B
    C
  
  
    1
    2
    7
  
  
    2
    3
    10
  
  
    3
    4
    13
  
  
    4
    5
    16
  

The table shows data where y = 1*x1 + 2*x2 + 1. We'll use LINEST 
to find these coefficients.

Multiple regression with LINEST
  

=LINEST(C1:C4, A1:B4)

Select a 1x3 range, enter this formula, and press Ctrl+Shift+Enter. The output 
will be [1, 2, 1] representing the coefficients for x1, x2, and the intercept. 
This demonstrates LINEST's ability to handle multiple predictors.

## LINEST with Statistics

The LINEST function can return additional regression statistics 
when the stats parameter is set to TRUE.

  
    A
    B
  
  
    1
    3.1
  
  
    2
    4.9
  
  
    3
    7.2
  
  
    4
    8.8
  

This table shows data with a roughly linear relationship but some noise. We'll 
use LINEST to get comprehensive statistics about the fit.

LINEST with statistics
  

=LINEST(B1:B4, A1:A4, TRUE, TRUE)

Select a 5x2 range, enter this formula, and press Ctrl+Shift+Enter. The output 
includes slope, intercept, standard errors, R-squared, F-statistic, and more. 
This comprehensive output helps evaluate the regression quality.

## Forcing Zero Intercept

Sometimes you may want to force the regression line through the origin (0,0). 
This example shows how to use the const parameter to achieve this.

  
    A
    B
  
  
    1
    2
  
  
    2
    4
  
  
    3
    6
  
  
    4
    8
  

The table shows data where y = 2x with no intercept. We'll force LINEST 
to calculate a regression line through the origin.

LINEST with zero intercept
  

=LINEST(B1:B4, A1:A4, FALSE)

Select one cell, enter this formula, and press Enter. The result will be 2, 
representing the slope of the line y = 2x. The FALSE parameter forces the 
intercept to be zero.

## Polynomial Regression

LINEST can perform polynomial regression by including powers of x 
as additional variables. This example fits a quadratic (second-degree) curve.

  
    A
    B
    C
  
  
    1
    1
    6
  
  
    2
    4
    15
  
  
    3
    9
    28
  
  
    4
    16
    45
  

The table shows data where y = x² + 2x + 3. Column B contains x² values. We'll 
use LINEST to find these coefficients.

Polynomial regression with LINEST
  

=LINEST(C1:C4, A1:B4)

Select a 1x3 range, enter this formula, and press Ctrl+Shift+Enter. The output 
will be [1, 2, 3] representing the coefficients for x², x, and the intercept. 
This demonstrates LINEST's flexibility for nonlinear relationships.

## LINEST with Dynamic Arrays

In modern Excel versions, LINEST can work with dynamic arrays 
without requiring Ctrl+Shift+Enter. This example shows the simplified syntax.

  
    A
    B
  
  
    1
    3
  
  
    2
    5
  
  
    3
    7
  

LINEST with dynamic arrays
  

=LINEST(B1:B3, A1:A3)

In Excel 365 or 2021, simply enter this formula in a single cell. The results 
will spill into adjacent cells automatically. This makes LINEST 
easier to use in modern Excel versions.

The LINEST function is Excel's most powerful tool for regression 
analysis. From simple linear fits to complex polynomial models, it provides 
comprehensive statistical output. Mastering LINEST enables advanced 
data analysis directly in Excel without additional software. Remember to use 
Ctrl+Shift+Enter for array formulas in older Excel versions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).