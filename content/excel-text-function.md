+++
title = "Excel TEXT Function"
date = 2025-08-29T19:54:22.863+01:00
draft = false
description = "Complete tutorial on Excel TEXT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel TEXT Function

last modified April 4, 2025

The TEXT function converts numeric values to text and lets you 
format them with specific formatting codes. This tutorial provides a complete 
guide to using the TEXT function with detailed examples. You'll 
learn basic syntax, formatting options, and practical applications to master 
this essential Excel function.

## TEXT Function Basics

The TEXT function converts numbers to text with specified 
formatting. It's useful for displaying numbers in a specific format while 
keeping them as text values. The syntax requires a value and format code.

  
    Component
    Description
  
  
    Function Name
    TEXT
  
  
    Syntax
    =TEXT(value, format_text)
  
  
    Arguments
    Value to convert and format code
  
  
    Return Value
    Formatted text string
  

This table breaks down the essential components of the TEXT
function. It shows the function name, basic syntax format, arguments, and
return value characteristics.

## Basic TEXT Example

This example demonstrates the simplest use of the TEXT function to format a 
number as currency.

Basic TEXT formula
  

=TEXT(1234.567, "$#,##0.00")

This formula converts the number 1234.567 to text formatted as currency. The 
result will be "$1,234.57". The format code specifies dollar sign, comma 
separators, and two decimal places.

## TEXT with Date Formatting

The TEXT function is commonly used to format dates in specific ways. This 
example shows how to format a date value.

  
    A
    B
  
  
    1/15/2023
    
  
  
    
    =TEXT(A1, "mmmm d, yyyy")
  

The table shows a date in cell A1 and a TEXT formula in B1 that reformats the 
date. The format code specifies the full month name, day, and four-digit year.

TEXT with date format
  

=TEXT(A1, "mmmm d, yyyy")

This formula converts the date in A1 to text formatted as "January 15, 2023". 
Date format codes allow flexible display of dates without changing cell 
formatting.

## TEXT with Custom Number Format

This example shows how to create custom number formats using the TEXT function 
for specialized displays.

  
    A
    B
  
  
    0.85
    
  
  
    
    =TEXT(A1, "0.0%")
  

The table demonstrates converting a decimal to a percentage with one decimal 
place. The TEXT function applies the percentage format while converting to text.

TEXT with percentage format
  

=TEXT(A1, "0.0%")

This formula converts 0.85 to "85.0%". The format code multiplies by 100 and 
adds a percent sign while keeping one decimal place. This is useful for 
consistent percentage displays.

## TEXT with Conditional Formatting

You can use TEXT to apply conditional formatting-like displays without actual 
conditional formatting. This example shows positive/negative number formatting.

TEXT with conditional format
  

=TEXT(A1, "[Green]$#,##0.00;[Red]-$#,##0.00")

This formula displays positive numbers in green with a dollar sign and negative 
numbers in red with a minus sign. The format has three sections separated by 
semicolons: positive;negative;zero.

## TEXT with Time Formatting

The TEXT function can format time values in various ways. This example 
demonstrates custom time formatting.

  
    A
    B
  
  
    0.75
    
  
  
    
    =TEXT(A1, "hh:mm AM/PM")
  

The table shows a decimal time value (0.75 = 6:00 PM) in A1 and a TEXT formula 
in B1 that converts it to 12-hour time format with AM/PM indicator.

TEXT with time format
  

=TEXT(A1, "hh:mm AM/PM")

This formula converts 0.75 to "06:00 PM". Time format codes allow flexible time 
displays. Excel stores times as fractions of a day (0.75 = 18:00 or 6 PM).

The TEXT function is powerful for formatting numbers, dates, and 
times as text strings. It's essential for reports, dashboards, and any 
situation requiring consistent number formatting. Remember that TEXT converts 
values to text, making them unusable for calculations without converting back.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).