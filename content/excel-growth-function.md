+++
title = "Excel GROWTH Function"
date = 2025-08-29T19:54:07.113+01:00
draft = false
description = "Complete tutorial on Excel GROWTH function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel GROWTH Function

last modified April 4, 2025

The GROWTH function calculates predicted exponential growth based 
on existing data. It returns values along an exponential trend line. This 
tutorial provides a comprehensive guide to using the GROWTH 
function with detailed examples. You'll learn basic syntax, practical 
applications, and advanced techniques to master this statistical function.

## GROWTH Function Basics

The GROWTH function predicts exponential growth by fitting an 
exponential curve to existing data points. It uses the least squares method to 
find the best fit. The function returns y-values for specified x-values.

  
    Component
    Description
  
  
    Function Name
    GROWTH
  
  
    Syntax
    =GROWTH(known_y's, [known_x's], [new_x's], [const])
  
  
    Arguments
    known_y's (required), known_x's (optional), new_x's (optional), const (optional)
  
  
    Return Value
    Array of predicted y-values
  

This table breaks down the essential components of the GROWTH
function. It shows the function name, syntax format, arguments, and return
value characteristics.

## Basic GROWTH Example

This example demonstrates the simplest use of the GROWTH function with basic 
data points.

  
    A
    B
  
  
    1
    2
  
  
    2
    4
  
  
    3
    8
  
  
    4
    =GROWTH(B1:B3, A1:A3, A4)
  

The table shows x-values in column A and corresponding y-values in column B. 
The GROWTH formula in B4 predicts the next y-value for x=4 based on the 
existing data.

Basic GROWTH formula
  

=GROWTH(B1:B3, A1:A3, A4)

This formula predicts the y-value for x=4 based on the exponential trend of 
the existing data points. The result will be approximately 16, following the 
pattern of doubling (2,4,8,16...).

## GROWTH with Multiple Predictions

GROWTH can return multiple predictions at once when given multiple new x-values. 
This example shows this capability.

  
    A
    B
    C
  
  
    1
    100
    
  
  
    2
    150
    
  
  
    3
    225
    
  
  
    4
    
    
  
  
    5
    
    
  
  
    
    
    =GROWTH(B1:B3, A1:A3, A4:A5)
  

This table demonstrates predicting multiple future values at once. The formula 
in C6 returns predictions for both x=4 and x=5 based on the growth trend.

GROWTH with multiple predictions
  

=GROWTH(B1:B3, A1:A3, A4:A5)

This array formula predicts y-values for x=4 and x=5. Based on the 50% growth 
rate in the data (100,150,225), the results will be approximately 337.5 and 
506.25. Remember to enter as an array formula (Ctrl+Shift+Enter in older Excel).

## GROWTH with Const Argument

The const argument controls whether to force the curve through the origin (0,0). 
This example shows the difference when const is FALSE.

  
    A
    B
    C
  
  
    1
    10
    
  
  
    2
    30
    
  
  
    3
    90
    
  
  
    4
    
    =GROWTH(B1:B3, A1:A3, A4, FALSE)
  

The table shows how setting const=FALSE affects the prediction. The formula 
forces the exponential curve to pass through the origin (0,0), changing the 
growth rate calculation.

GROWTH with const=FALSE
  

=GROWTH(B1:B3, A1:A3, A4, FALSE)

This formula predicts the y-value for x=4 while forcing the curve through (0,0). 
The result will be different from the default const=TRUE case. This is useful 
when you know the relationship must pass through the origin.

## GROWTH for Revenue Projections

This practical example uses GROWTH to project future revenue based on quarterly 
growth data.

  
    A
    B
    C
  
  
    Q1
    50000
    
  
  
    Q2
    65000
    
  
  
    Q3
    84500
    
  
  
    Q4
    
    =GROWTH(B1:B3, , C1:C3)
  

The table shows quarterly revenue data with GROWTH used to predict Q4 revenue. 
Note we're omitting known_x's to use default sequence (1,2,3).

GROWTH for revenue projection
  

=GROWTH(B1:B3, , C1:C3)

This formula predicts Q4 revenue based on the exponential growth trend from 
previous quarters. With 30% quarterly growth (approximately), the result will 
be around 109,850. This demonstrates GROWTH's business forecasting application.

## GROWTH with Non-Numeric X Values

GROWTH can work with non-numeric x-values by converting them to numeric 
equivalents. This example uses months as x-values.

  
    A
    B
    C
  
  
    Jan
    200
    
  
  
    Feb
    240
    
  
  
    Mar
    288
    
  
  
    Apr
    
    =GROWTH(B1:B3, ROW(A1:A3), ROW(A4))
  

The table shows how to handle text x-values by converting them to row numbers. 
The ROW function provides numeric equivalents for the month names.

GROWTH with text x-values
  

=GROWTH(B1:B3, ROW(A1:A3), ROW(A4))

This formula predicts April's value by treating months as positions 1,2,3. The 
result will be approximately 346, continuing the 20% monthly growth trend. 
This technique works for any ordered categorical data.

The GROWTH function is powerful for analyzing and predicting
exponential trends in data. From business forecasting to population modeling, 
it provides valuable insights. Remember to use it when growth is multiplicative 
rather than additive. Combine with data validation for robust spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel tutorials](/all/#excel).