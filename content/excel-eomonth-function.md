+++
title = "Excel EOMONTH Function"
date = 2025-08-29T19:54:03.749+01:00
draft = false
description = "Complete tutorial on Excel EOMONTH function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel EOMONTH Function

last modified April 4, 2025

The EOMONTH function is a powerful date function in Excel that 
returns the last day of a month. It's particularly useful for financial 
calculations, project planning, and any scenario requiring month-end dates. 
This tutorial provides a comprehensive guide to using EOMONTH with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques.

## EOMONTH Function Basics

The EOMONTH function calculates the last day of a month based on a 
given start date. It can look forward or backward by specified months. The 
function is essential for financial periods and date-based calculations.

  
    Component
    Description
  
  
    Function Name
    EOMONTH
  
  
    Syntax
    =EOMONTH(start_date, months)
  
  
    Arguments
    start_date: Beginning date
months: Months to add/subtract
  
  
    Return Value
    Serial date number for last day of month
  

This table breaks down the essential components of the EOMONTH
function. It shows the function name, basic syntax format, argument details, 
and return value characteristics.

## Basic EOMONTH Example

This example demonstrates the simplest use of EOMONTH to find month-end for a 
specific date.

Basic EOMONTH formula
  

=EOMONTH("2025-04-15", 0)

This formula returns the last day of April 2025 (April 30, 2025) because we 
specified 0 months from the start date. The result appears as a serial date 
number that can be formatted as a date.

## EOMONTH with Positive Months

Adding positive months moves forward in time. This example shows finding the 
month-end several months ahead.

  
    A
    B
  
  
    2025-01-15
    
  
  
    
    =EOMONTH(A1, 3)
  

The table shows a start date in cell A1 and an EOMONTH formula in B2 that looks 
3 months ahead. The result will be April 30, 2025 (end of month 3 months after 
January).

EOMONTH with positive months
  

=EOMONTH(A1, 3)

This formula calculates the month-end date 3 months after the date in A1. For 
January 15, 2025, this returns April 30, 2025. Positive numbers move forward 
in the calendar.

## EOMONTH with Negative Months

Negative month values look backward in time. This example finds a previous 
month-end date.

  
    A
    B
  
  
    2025-06-20
    
  
  
    
    =EOMONTH(A1, -2)
  

The table demonstrates using EOMONTH to look back 2 months from June 20, 2025. 
The result will be April 30, 2025. Negative values are useful for historical 
comparisons.

EOMONTH with negative months
  

=EOMONTH(A1, -2)

This formula returns the month-end date 2 months before the date in A1. For 
June 20, 2025, this gives April 30, 2025. Negative numbers move backward in 
time.

## EOMONTH for Fiscal Year End

EOMONTH can calculate fiscal year-end dates. This example shows a June 30 
fiscal year end calculation.

  
    A
    B
  
  
    2025-03-15
    
  
  
    
    =EOMONTH(A1, 3)
  

The table shows how to calculate the next fiscal year-end (June 30) from a date 
in March. The formula adds 3 months to reach June 30, 2025.

EOMONTH for fiscal year calculation
  

=EOMONTH(A1, 3)

This formula finds the fiscal year-end (June 30) from a March date. For March 
15, 2025, adding 3 months gives June 30, 2025. Adjust months based on your 
fiscal calendar.

## EOMONTH with Dynamic Date

Combine EOMONTH with TODAY() for dynamic month-end calculations. This example 
shows finding the current month's end date.

EOMONTH with TODAY function
  

=EOMONTH(TODAY(), 0)

This formula returns the last day of the current month by using TODAY() as the 
start date and 0 months. It automatically updates daily, always showing the 
current month-end date.

The EOMONTH function is essential for financial reporting, project 
planning, and any date-based calculations requiring month-end dates. Its 
ability to look forward or backward makes it versatile for various scenarios. 
Remember that EOMONTH returns a serial date number that should be formatted as 
a date for proper display.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).