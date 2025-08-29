+++
title = "Excel HOUR, MINUTE, and SECOND Functions"
date = 2025-08-29T19:54:07.106+01:00
draft = false
description = "Complete tutorial on Excel HOUR, MINUTE, and SECOND functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel HOUR, MINUTE, and SECOND Functions

last modified April 4, 2025

The HOUR, MINUTE, and SECOND functions 
are essential time functions in Excel. They extract specific time components 
from time values. This tutorial provides a comprehensive guide to using these 
functions. You'll learn their syntax, practical applications, and how to 
combine them for powerful time calculations.

## Function Basics

These functions extract the hour, minute, or second component from a time value. 
They work with Excel's serial time format where 1 equals 24 hours. Time values 
are decimal fractions of a 24-hour day.

  
    Function
    Description
    Syntax
    Return Value
  
  
    HOUR
    Extracts hour from time
    =HOUR(serial_number)
    Integer (0-23)
  
  
    MINUTE
    Extracts minute from time
    =MINUTE(serial_number)
    Integer (0-59)
  
  
    SECOND
    Extracts second from time
    =SECOND(serial_number)
    Integer (0-59)
  

This table shows the three time component functions, their purposes, syntax, 
and the range of values they return. All take a time serial number as input.

## Basic HOUR Example

This example demonstrates extracting the hour component from a specific time 
value.

Basic HOUR formula
  

=HOUR("14:30:45")

This formula extracts the hour from the time "14:30:45". The result will be 14, 
as this represents 2:30:45 PM in 24-hour format. The function ignores minutes 
and seconds when returning the hour.

## Basic MINUTE Example

This example shows how to extract the minute component from a time value.

  
    A
    B
  
  
    08:45:22
    =MINUTE(A1)
  

The table contains a time value in cell A1 and a MINUTE formula in B1 that 
extracts the minute component. The formula will return 45 from the time value.

MINUTE function with cell reference
  

=MINUTE(A1)

This formula extracts the minute from the time in cell A1 (08:45:22). The 
result is 45. The function works with both direct time strings and cell 
references containing time values.

## Basic SECOND Example

This example demonstrates extracting the second component from a time value.

SECOND function with time value
  

=SECOND("23:15:07")

The formula extracts the second from the time "23:15:07". The result will be 7. 
Like HOUR and MINUTE, SECOND works with Excel's time serial numbers or properly 
formatted time strings.

## Combining HOUR, MINUTE, and SECOND

These functions can be combined to create custom time formats or perform time 
calculations. This example shows how to reconstruct a time from components.

  
    A
    B
    C
    D
  
  
    16:25:38
    =HOUR(A1)
    =MINUTE(A1)
    =SECOND(A1)
  

The table demonstrates extracting all three time components from cell A1. The 
formulas in B1, C1, and D1 return 16, 25, and 38 respectively from the 
original time.

Combining time components
  

=TIME(HOUR(A1), MINUTE(A1), SECOND(A1))

This formula reconstructs the original time from its components using Excel's 
TIME function. The result matches the original time in A1 (16:25:38). This 
technique is useful for time manipulation.

## Calculating Time Differences

These functions help calculate time differences precisely. This example shows 
how to find the exact time between two timestamps.

  
    A
    B
    C
  
  
    Start
    End
    Difference
  
  
    09:15:30
    11:45:15
    =HOUR(B2-A2) &amp; "h " &amp; MINUTE(B2-A2) &amp; "m " &amp; SECOND(B2-A2) &amp; "s"
  

The table calculates the difference between two times and formats it as hours, 
minutes, and seconds. The result will display "2h 29m 45s" for the given 
times.

Time difference calculation
  

=HOUR(B2-A2) &amp; "h " &amp; MINUTE(B2-A2) &amp; "m " &amp; SECOND(B2-A2) &amp; "s"

This formula calculates the difference between end and start times, then 
extracts each component to create a readable duration string. The HOUR, MINUTE, 
and SECOND functions work with time differences just like regular time values.

## Handling Decimal Time Values

Excel stores times as decimal fractions, and these functions work with these 
underlying values. This example demonstrates this behavior.

Working with decimal time
  

=HOUR(0.75)

The formula returns 18 because 0.75 of a day equals 18 hours (0.75 × 24 = 18). 
This shows how the functions work with Excel's underlying time serial numbers, 
not just formatted time strings.

## Error Handling

These functions return errors when given invalid inputs. This example shows 
error handling with IFERROR.

  
    A
    B
  
  
    Invalid
    =IFERROR(HOUR(A1), "Invalid time")
  

The table demonstrates handling invalid time values gracefully. When A1 contains 
text that can't be interpreted as time, the formula returns "Invalid time" 
instead of an error.

Error handling with time functions
  

=IFERROR(HOUR(A1), "Invalid time")

This formula attempts to extract the hour from A1. If A1 doesn't contain a 
valid time, it returns the custom error message instead of a #VALUE! error. 
This makes spreadsheets more user-friendly.

## Extracting Components from DateTime

These functions can extract time components from full datetime values. This 
example shows how to work with datetime strings.

Extracting from datetime
  

=HOUR("2025-04-04 08:30:15")

The formula extracts just the hour (8) from the full datetime string. The date 
portion is ignored by the HOUR function, which only processes the time 
component of datetime values.

## Calculating Total Seconds

Combining these functions allows calculating total seconds, useful for precise 
time measurements.

  
    A
    B
  
  
    01:05:30
    =HOUR(A1)*3600 + MINUTE(A1)*60 + SECOND(A1)
  

The table converts a time value to total seconds. For 1 hour, 5 minutes, and 30 
seconds, the formula returns 3930 seconds (3600 + 300 + 30).

Converting time to seconds
  

=HOUR(A1)*3600 + MINUTE(A1)*60 + SECOND(A1)

This formula converts a time value to total seconds by multiplying each 
component by the appropriate factor. This technique is useful for scientific 
or precise timing applications where seconds are the required unit.

The HOUR, MINUTE, and SECOND functions 
are powerful tools for working with time data in Excel. They enable precise 
time component extraction, calculations, and formatting. Mastering these 
functions will enhance your ability to work with time-based data in 
spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).