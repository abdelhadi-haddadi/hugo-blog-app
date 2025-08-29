+++
title = "Excel WEEKDAY and WEEKNUM Functions"
date = 2025-08-29T19:54:27.331+01:00
draft = false
description = "Complete tutorial on Excel WEEKDAY and WEEKNUM functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel WEEKDAY and WEEKNUM Functions

last modified April 4, 2025

The WEEKDAY and WEEKNUM functions are essential date
functions in Excel. WEEKDAY returns the day of the week for a
given date, while WEEKNUM returns the week number of the year.
This tutorial provides a comprehensive guide to using these functions with
detailed examples. You'll learn their syntax, practical applications, and
advanced techniques.

## Function Basics

WEEKDAY identifies the day of the week (1-7) for a given date.
WEEKNUM calculates the week number (1-53) for a given date. Both
functions support different numbering systems.

  
    Function
    Description
    Syntax
  
  
    WEEKDAY
    Returns day of week (1-7)
    =WEEKDAY(date, [return_type])
  
  
    WEEKNUM
    Returns week number (1-53)
    =WEEKNUM(date, [return_type])
  

This table shows the basic structure of both functions. They take a date as the
first argument and an optional return_type to specify the numbering system.

## Basic WEEKDAY Example

This example demonstrates the simplest use of WEEKDAY to find the day of week.

Basic WEEKDAY formula
  

=WEEKDAY("2025-04-04")

This formula returns 6, indicating Friday (default system: 1=Sunday to 7=Saturday).
The date can be entered as text (as shown) or as a cell reference containing a date.

## WEEKDAY with Different Return Types

WEEKDAY supports different numbering systems through its optional second argument.
This example shows various return types.

  
    Formula
    Result
    Description
  
  
    =WEEKDAY("2025-04-04", 1)
    6
    1 (Sun) to 7 (Sat)
  
  
    =WEEKDAY("2025-04-04", 2)
    5
    1 (Mon) to 7 (Sun)
  
  
    =WEEKDAY("2025-04-04", 3)
    4
    0 (Mon) to 6 (Sun)
  

The table demonstrates how different return_type values affect WEEKDAY's output.
System 1 is default, system 2 is common in Europe, and system 3 is zero-based.

## Basic WEEKNUM Example

This example shows the simplest use of WEEKNUM to find the week number.

Basic WEEKNUM formula
  

=WEEKNUM("2025-04-04")

This formula returns 14, indicating the 14th week of 2025 (default system: week
1 contains January 1). Like WEEKDAY, the date can be text or a cell reference.

## WEEKNUM with Different Return Types

WEEKNUM supports different week numbering systems through its optional second
argument. This example shows various systems.

  
    Formula
    Result
    Description
  
  
    =WEEKNUM("2025-04-04", 1)
    14
    Week starts Sunday (default)
  
  
    =WEEKNUM("2025-04-04", 2)
    14
    Week starts Monday
  
  
    =WEEKNUM("2025-04-04", 21)
    14
    ISO week number (European)
  

The table shows how return_type affects WEEKNUM. Type 1 is common in the US,
type 2 in Europe, and type 21 follows ISO 8601 standard (week starts Monday).

## Practical Example: Workday Identification

This example uses WEEKDAY to identify workdays (Monday-Friday) in a date list.

  
    A (Date)
    B (Day Type)
  
  
    2025-04-04
    =IF(WEEKDAY(A1,2)&lt;6,"Workday","Weekend")
  
  
    2025-04-05
    =IF(WEEKDAY(A2,2)&lt;6,"Workday","Weekend")
  

Workday identification formula
  

=IF(WEEKDAY(A1,2)&lt;6,"Workday","Weekend")

This formula checks if the weekday number is less than 6 (Monday-Friday in
system 2). It returns "Workday" for weekdays and "Weekend" for Saturday/Sunday.

## Practical Example: Fiscal Week Calculation

This example calculates fiscal weeks starting from a specific date, useful for
financial reporting periods.

Fiscal week calculation
  

=WEEKNUM(A1,2)-WEEKNUM(DATE(YEAR(A1),4,1),2)+1

This formula calculates the fiscal week number assuming the fiscal year starts
April 1. It subtracts the week number of April 1 from the date's week number
and adds 1 to start counting from 1.

## Practical Example: Weekday Name Lookup

This example combines WEEKDAY with CHOOSE to display weekday names instead of numbers.

Weekday name formula
  

=CHOOSE(WEEKDAY(A1),"Sun","Mon","Tue","Wed","Thu","Fri","Sat")

The formula uses WEEKDAY to get a number 1-7, then CHOOSE returns the
corresponding day name. This creates more readable output than just numbers.

## Practical Example: ISO Week Number

For strict ISO 8601 compliance, this example shows the proper way to get ISO week numbers.

ISO week number formula
  

=WEEKNUM(A1,21)

Using return_type 21 gives true ISO week numbers where week 1 contains the first
Thursday of the year, and weeks start on Monday. This is important for
international standards.

## Practical Example: Days Until Next Monday

This example calculates how many days remain until the next Monday from a given date.

Days until next Monday
  

=MOD(8-WEEKDAY(A1,2),7)

The formula calculates the difference between 8 and the weekday number (system 2:
1=Mon), then uses MOD 7 to wrap around correctly. Returns 0 if the date is Monday.

The WEEKDAY and WEEKNUM functions are powerful tools
for date analysis in Excel. They help with scheduling, reporting, and any task
involving weekly cycles. Mastering their different numbering systems and
combinations with other functions will greatly enhance your date-related
calculations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).