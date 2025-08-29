+++
title = "Excel TODAY and NOW Functions"
date = 2025-08-29T19:54:23.997+01:00
draft = false
description = "Complete tutorial on Excel TODAY and NOW functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel TODAY and NOW Functions

last modified April 4, 2025

The TODAY and NOW functions are essential date and 
time functions in Excel. TODAY returns the current date, while 
NOW returns both current date and time. This tutorial provides a 
comprehensive guide to using these functions with detailed examples. You'll 
learn their syntax, practical applications, and advanced techniques.

## TODAY/NOW Function Basics

The TODAY function returns the current date as a serial number 
that Excel recognizes as a date. NOW returns both the current date 
and time. Both functions update when the worksheet recalculates.

  
    Function
    Description
    Syntax
    Arguments
  
  
    TODAY
    Returns current date
    =TODAY()
    None
  
  
    NOW
    Returns current date and time
    =NOW()
    None
  

This table compares the two functions. Both are volatile functions that update 
automatically when the worksheet recalculates. Neither function requires any 
arguments.

## Basic TODAY Example

This example demonstrates the simplest use of the TODAY function to display the 
current date.

Basic TODAY formula
  

=TODAY()

This formula returns the current date in Excel's date format. The cell will 
display something like "4/4/2025" depending on your regional settings. The 
value updates each time the worksheet recalculates.

## Basic NOW Example

This example shows the simplest use of the NOW function to display current date 
and time.

Basic NOW formula
  

=NOW()

This formula returns the current date and time, displaying something like 
"4/4/2025 14:30". The time portion updates every time the worksheet 
recalculates to reflect the current moment.

## Calculating Days Until Deadline

You can use TODAY to calculate days remaining until a deadline or event. This 
example shows how to create a countdown.

  
    A
    B
  
  
    Project Deadline
    4/15/2025
  
  
    Days Remaining
    =B1-TODAY()
  

The table shows a project deadline date in B1 and calculates days remaining in 
B2 by subtracting TODAY() from the deadline. The result updates daily.

Days remaining calculation
  

=B1-TODAY()

This formula subtracts today's date from a future date to calculate days 
remaining. Format the result as a number to see the countdown value. Negative 
results indicate past due dates.

## Calculating Age from Birthdate

TODAY is commonly used to calculate age from a birthdate. This example shows 
how to compute age in years.

  
    A
    B
  
  
    Birthdate
    5/12/1980
  
  
    Current Age
    =INT((TODAY()-B1)/365)
  

The table contains a birthdate in B1 and calculates age in B2 by finding the 
difference between today and birthdate, then converting to years.

Age calculation formula
  

=INT((TODAY()-B1)/365)

This formula subtracts birthdate from today, divides by 365 days, and uses INT 
to get whole years. For more precision, use =DATEDIF(B1,TODAY(),"Y") instead.

## Timestamp Creation with NOW

NOW is useful for creating timestamps when combined with worksheet events. This 
example shows a static timestamp technique.

  
    A
    B
  
  
    Last Updated
    =IF(A1="","",NOW())
  

This table demonstrates a conditional timestamp that only updates when cell A1 
changes (requires VBA for automatic updates). The timestamp remains static 
otherwise.

Conditional timestamp formula
  

=IF(A1="","",NOW())

This formula shows current time only if A1 contains data. To make it static, 
you'll need VBA to convert the formula to a value when A1 changes. This 
creates audit trails.

## Calculating Time Elapsed

NOW can calculate time elapsed between events when used with manual timestamps. 
This example shows a simple duration calculation.

  
    A
    B
  
  
    Start Time
    4/4/2025 9:00 AM
  
  
    End Time
    4/4/2025 5:30 PM
  
  
    Hours Worked
    =(B2-B1)*24
  

The table shows start and end times with a duration calculation. Multiplying by 
24 converts Excel's time fraction to hours. Format as number for decimal hours.

Time duration calculation
  

=(B2-B1)*24

This formula subtracts start time from end time and multiplies by 24 to get 
hours. For "8:30" format, skip *24 and format cell as time. NOW() can replace 
B2 for real-time tracking.

## Creating Dynamic Headers

TODAY and NOW are useful in report headers to show when data was current. This 
example demonstrates a dynamic header.