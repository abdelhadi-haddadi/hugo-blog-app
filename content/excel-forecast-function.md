+++
title = "Excel FORECAST Function"
date = 2025-08-29T19:54:04.876+01:00
draft = false
description = "Complete tutorial on Excel FORECAST function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel FORECAST Function

last modified April 4, 2025

The FORECAST function predicts future values based on existing 
values using linear regression. It's essential for trend analysis and business 
forecasting. This tutorial provides a comprehensive guide to using the 
FORECAST function with detailed examples. You'll learn basic 
syntax, practical applications, and important considerations for accurate 
predictions.

## FORECAST Function Basics

The FORECAST function calculates a future value along a linear 
trend line fitted to known x-y value pairs. It assumes a linear relationship 
between variables. The function is useful for sales forecasting, inventory 
planning, and trend analysis.

  
    Component
    Description
  
  
    Function Name
    FORECAST
  
  
    Syntax
    =FORECAST(x, known_y's, known_x's)
  
  
    Arguments
    x (target x), known_y's (dependent), known_x's (independent)
  
  
    Return Value
    Predicted y-value for the given x
  

This table breaks down the essential components of the FORECAST
function. It shows the function name, syntax format, required arguments, and 
what value it returns. The function uses linear regression to make predictions.

## Basic FORECAST Example

This example demonstrates the simplest use of the FORECAST function with a small 
dataset. We'll predict the next value in a linear sequence.

  
    A (Month)
    B (Sales)
    C
  
  
    1
    100
    
  
  
    2
    150
    
  
  
    3
    200
    
  
  
    4
    
    =FORECAST(A4,B1:B3,A1:A3)
  

The table shows monthly sales data for 3 months. We'll forecast sales for month 
4 based on the linear trend of months 1-3. The FORECAST formula appears in C4.

Basic FORECAST formula
  

=FORECAST(A4,B1:B3,A1:A3)

This formula predicts the sales value for month 4 (x=4) based on known months 
1-3 (A1:A3) and their sales (B1:B3). The result will be 250, continuing the 
+50 per month trend. This shows basic linear forecasting.

## FORECAST with Larger Dataset

This example uses a larger dataset to demonstrate how FORECAST works with more 
data points. We'll predict quarterly revenue based on 12 months of history.

  
    A (Month)
    B (Revenue)
    C
  
  
    1
    12000
    
  
  
    2
    12500
    
  
  
    ...
    ...
    
  
  
    12
    18000
    
  
  
    13
    
    =FORECAST(A13,B1:B12,A1:A12)
  

The table represents 12 months of revenue data (simplified here). We're 
forecasting revenue for month 13 (next quarter) based on the full year's trend.

FORECAST with larger dataset
  

=FORECAST(A13,B1:B12,A1:A12)

This formula predicts revenue for month 13 based on the linear trend of months 
1-12. With consistent growth, it might return ~18,500. More data points 
generally improve forecast accuracy by better defining the trend line.

## FORECAST with Non-Sequential X Values

FORECAST can work with non-sequential x-values. This example shows temperature 
predictions at irregular time intervals.

  
    A (Hour)
    B (Temp °F)
    C
  
  
    6
    68
    
  
  
    9
    72
    
  
  
    12
    78
    
  
  
    15
    
    =FORECAST(15,B1:B3,A1:A3)
  

The table shows temperature readings at 6AM, 9AM, and noon. We'll predict the 
temperature at 3PM (hour 15) using these irregular measurements.

FORECAST with irregular intervals
  

=FORECAST(15,B1:B3,A1:A3)

This formula predicts temperature at hour 15 based on measurements at hours 6, 
9, and 12. The result might be ~82°F, assuming a consistent warming trend. 
FORECAST works with any numeric x-values, not just regular sequences.

## FORECAST with Named Ranges

Using named ranges makes FORECAST formulas more readable. This example 
demonstrates forecasting with named ranges for better spreadsheet organization.

  
    A (Week)
    B (Units Sold)
    C
  
  
    1
    150
    
  
  
    2
    170
    
  
  
    3
    190
    
  
  
    4
    
    =FORECAST(A4,Sales,Weeks)
  

The table assumes cells B1:B3 are named "Sales" and A1:A3 are named "Weeks". 
We're forecasting sales for week 4 using these named ranges in the formula.

FORECAST with named ranges
  

=FORECAST(A4,Sales,Weeks)

This formula predicts units sold in week 4 based on weeks 1-3 data. With named 
ranges, the formula becomes more readable and maintainable. The result would be 
210, continuing the +20 units/week trend.

## FORECAST vs. TREND Function

This example compares FORECAST with the similar TREND function to highlight their 
differences in usage and results.

  
    A (Year)
    B (Revenue)
    C (FORECAST)
    D (TREND)
  
  
    2018
    50000
    
    
  
  
    2019
    55000
    
    
  
  
    2020
    60000
    
    
  
  
    2021
    
    =FORECAST(A4,B1:B3,A1:A3)
    =TREND(B1:B3,A1:A3,A4)
  

The table shows annual revenue data with both FORECAST and TREND formulas 
predicting 2021 revenue. Both use linear regression but have different syntax.

FORECAST vs. TREND comparison
  

=FORECAST(A4,B1:B3,A1:A3)
=TREND(B1:B3,A1:A3,A4)

Both formulas will return 65,000 for 2021 in this case. FORECAST is simpler for 
single predictions, while TREND can return multiple predictions and has more 
options. They use the same calculation method for single predictions.

## Limitations of FORECAST

The FORECAST function has several important limitations to 
consider. It assumes a linear relationship between variables, which may not 
always be accurate. The function is sensitive to outliers that can skew 
results. It also requires that known_x's and known_y's ranges are the same 
size.

For non-linear trends, consider using GROWTH or other regression 
tools. Always validate forecasts with actual data when possible. Remember that 
forecasts become less reliable the further they extend beyond the known data 
range.

The FORECAST function is a powerful tool for linear trend 
prediction in Excel. From simple sales projections to complex business 
forecasting, it provides valuable insights. Remember to verify the linearity 
assumption and be cautious with long-range forecasts. Combine FORECAST with 
other analysis tools for best results.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).