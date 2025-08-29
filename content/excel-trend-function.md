+++
title = "Excel TREND Function"
date = 2025-08-29T19:54:25.117+01:00
draft = false
description = "Complete tutorial on Excel TREND function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel TREND Function

last modified April 4, 2025

The TREND function is a powerful statistical tool in Excel that 
calculates predicted values based on linear regression. It fits a straight line 
to known data points and returns values along that line. This tutorial provides 
a comprehensive guide to using the TREND function with detailed 
examples. You'll learn basic syntax, practical applications, and advanced 
techniques to master this forecasting function.

## TREND Function Basics

The TREND function performs linear regression analysis to predict 
future values based on existing data. It uses the least squares method to find 
the best-fit line through known data points. The syntax allows for both simple 
and complex forecasting scenarios.

  
    Component
    Description
  
  
    Function Name
    TREND
  
  
    Syntax
    =TREND(known_y's, [known_x's], [new_x's], [const])
  
  
    Arguments
    known_y's (required), others optional
  
  
    Return Value
    Array of predicted y-values
  

This table breaks down the essential components of the TREND
function. It shows the function name, syntax format, argument requirements, and
return value characteristics.

## Basic TREND Example

This example demonstrates the simplest use of the TREND function with a basic 
linear dataset. We'll predict future values based on known x and y values.

  
    A (known_x)
    B (known_y)
    C (new_x)
    D (predicted_y)
  
  
    1
    3
    6
    =TREND(B1:B5, A1:A5, C1)
  
  
    2
    5
    7
    =TREND(B1:B5, A1:A5, C2)
  
  
    3
    7
    8
    =TREND(B1:B5, A1:A5, C3)
  
  
    4
    9
    
    
  
  
    5
    11
    
    
  

Basic TREND formula
  

=TREND(B1:B5, A1:A5, C1)

This formula predicts the y-value for x=6 based on the linear relationship in 
the known data. The known y-values (B1:B5) increase by 2 for each x-value 
(A1:A5). The predicted y-value for x=6 will be 13.

## TREND with Multiple Predictions

TREND can return multiple predictions at once when given multiple new x-values. 
This example shows how to predict several future values simultaneously.

  
    A (known_x)
    B (known_y)
    C (new_x)
    D (predicted_y)
  
  
    1
    100
    6
    {=TREND(B1:B5, A1:A5, C1:C3)}
  
  
    2
    150
    7
    
  
  
    3
    200
    8
    
  
  
    4
    250
    
    
  
  
    5
    300
    
    
  

Array TREND formula
  

=TREND(B1:B5, A1:A5, C1:C3)

This array formula (entered with Ctrl+Shift+Enter in older Excel versions) 
predicts y-values for x=6,7,8. The known data shows y increasing by 50 for each 
x. Predictions will be 350, 400, and 450 respectively.

## TREND with Force Zero Intercept

The TREND function's optional [const] argument lets you force the regression 
line through zero. This example demonstrates setting the intercept to zero.

  
    A (known_x)
    B (known_y)
    C (new_x)
    D (predicted_y)
  
  
    1
    2
    5
    =TREND(B1:B5, A1:A5, C1, FALSE)
  
  
    2
    4
    6
    =TREND(B1:B5, A1:A5, C2, FALSE)
  
  
    3
    6
    
    
  
  
    4
    8
    
    
  
  
    5
    10
    
    
  

TREND with zero intercept
  

=TREND(B1:B5, A1:A5, C1, FALSE)

This formula forces the regression line through the origin (0,0). For x=5, the 
prediction will be exactly 10 (2*5) rather than slightly adjusted as it would 
be with a calculated intercept. This is useful when zero input must produce 
zero output.

## TREND with Time Series Data

TREND works well with time series data where x-values represent time periods. 
This example shows sales forecasting based on monthly data.

  
    A (Month)
    B (Sales)
    C (Future Month)
    D (Forecast)
  
  
    1
    12000
    13
    =TREND(B1:B12, A1:A12, C1)
  
  
    2
    12500
    14
    =TREND(B1:B12, A1:A12, C2)
  
  
    3
    13000
    15
    =TREND(B1:B12, A1:A12, C3)
  
  
    ...
    ...
    
    
  
  
    12
    17000
    
    
  

TREND with time series
  

=TREND(B1:B12, A1:A12, C1)

This formula predicts sales for month 13 based on the linear trend in months 
1-12. With increasing sales, the forecast will continue this upward trend. 
Similar predictions can be made for months 14 and 15.

## TREND with Multiple Regression

TREND can perform multiple regression when given multiple x-variables. This 
advanced example predicts based on two independent variables.

  
    A (x1)
    B (x2)
    C (y)
    D (new_x1)
    E (new_x2)
    F (prediction)
  
  
    10
    5
    100
    15
    8
    =TREND(C1:C5, A1:B5, D1:E1)
  
  
    12
    6
    120
    18
    9
    =TREND(C1:C5, A1:B5, D2:E2)
  
  
    14
    7
    140
    
    
    
  
  
    16
    8
    160
    
    
    
  
  
    18
    9
    180
    
    
    
  

Multiple regression with TREND
  

=TREND(C1:C5, A1:B5, D1:E1)

This advanced formula predicts y based on two x-variables (columns A and B). For 
new values x1=15 and x2=8, it calculates the predicted y considering both 
variables' relationships to y in the known data.

The TREND function is essential for linear forecasting in Excel. 
From simple predictions to complex multiple regression, TREND provides powerful 
analysis capabilities. Mastering its various applications will significantly 
enhance your data analysis skills. Remember that TREND assumes a linear 
relationship - verify this assumption before relying on its predictions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).