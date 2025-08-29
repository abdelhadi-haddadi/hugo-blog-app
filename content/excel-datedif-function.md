+++
title = "Excel DATEDIF Function"
date = 2025-08-29T19:54:01.514+01:00
draft = false
description = "Complete tutorial on Excel DATEDIF function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel DATEDIF Function

last modified April 4, 2025

The DATEDIF function calculates the difference between two dates in 
various units. It's a hidden function in Excel but extremely useful for date 
calculations. This tutorial provides a comprehensive guide to using 
DATEDIF with detailed examples. You'll learn basic syntax, 
practical applications, and advanced techniques to master this function.

## DATEDIF Function Basics

The DATEDIF function calculates the difference between two dates. 
It can return results in years, months, or days. The function is not documented 
in Excel's help but has been available since Lotus 1-2-3 days.

  
    Component
    Description
  
  
    Function Name
    DATEDIF (Date Difference)
  
  
    Syntax
    =DATEDIF(start_date, end_date, unit)
  
  
    Arguments
    start_date, end_date, unit code
  
  
    Return Value
    Difference between dates in specified unit
  

This table breaks down the essential components of the DATEDIF
function. It shows the function name, basic syntax format, arguments, and
return value characteristics.

## Basic DATEDIF Example (Days)

This example demonstrates calculating the number of days between two dates using 
DATEDIF.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Result
  
  
    1/1/2023
    1/31/2023
    =DATEDIF(A2,B2,"d")
  

The table shows a simple spreadsheet with start and end dates in columns A and B. 
The formula in C2 calculates the days difference between these dates.

DATEDIF days difference
  

=DATEDIF(A2,B2,"d")

This formula calculates the number of days between January 1, 2023 and January 
31, 2023. The result will be 30. The "d" unit code specifies days as the return 
unit.

## DATEDIF for Months Difference

This example shows how to calculate complete months between two dates using the 
"m" unit code.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Result
  
  
    3/15/2023
    7/20/2023
    =DATEDIF(A2,B2,"m")
  

The table demonstrates calculating complete months between March 15, 2023 and 
July 20, 2023. The formula ignores days and only counts full months between 
dates.

DATEDIF months difference
  

=DATEDIF(A2,B2,"m")

This formula returns 4, representing the complete months between the dates. 
March to July is 4 months, regardless of the specific days. The "m" unit code 
specifies months as the return unit.

## DATEDIF for Years Difference

This example demonstrates calculating complete years between two dates using the 
"y" unit code.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Result
  
  
    5/10/2018
    5/9/2023
    =DATEDIF(A2,B2,"y")
  

The table shows how to calculate years between May 10, 2018 and May 9, 2023. 
The formula counts complete years, so the day before the anniversary date 
returns one less year.

DATEDIF years difference
  

=DATEDIF(A2,B2,"y")

This formula returns 4 because May 9, 2023 is one day before the 5-year 
anniversary. The "y" unit code specifies years as the return unit. Complete 
years are counted, not rounded.

## DATEDIF for Months and Days

This example shows how to calculate remaining months after complete years using 
the "ym" unit code.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Result
  
  
    8/25/2020
    3/15/2023
    =DATEDIF(A2,B2,"ym")
  

The table demonstrates calculating months remaining after complete years between 
August 25, 2020 and March 15, 2023. The "ym" unit ignores years and days.

DATEDIF months remaining
  

=DATEDIF(A2,B2,"ym")

This formula returns 6, representing months from August to March (excluding the 
year change). The "ym" unit code calculates months remaining after complete 
years.

## DATEDIF for Days Excluding Years and Months

This example demonstrates calculating remaining days after complete years and 
months using the "md" unit code.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Result
  
  
    6/10/2022
    8/25/2023
    =DATEDIF(A2,B2,"md")
  

The table shows how to calculate days remaining after complete years and months 
between June 10, 2022 and August 25, 2023. The "md" unit ignores years and 
months.

DATEDIF days remaining
  

=DATEDIF(A2,B2,"md")

This formula returns 15, representing days from the 10th to the 25th (excluding 
month and year differences). The "md" unit code calculates days remaining after 
complete months.

## DATEDIF Unit Codes

DATEDIF supports several unit codes that determine how the date difference is 
calculated. Understanding these codes is essential for proper function usage.

  
    Unit Code
    Description
  
  
    "d"
    Days between dates
  
  
    "m"
    Complete months between dates
  
  
    "y"
    Complete years between dates
  
  
    "ym"
    Months remaining after complete years
  
  
    "yd"
    Days remaining after complete years
  
  
    "md"
    Days remaining after complete months
  

This comprehensive table explains all available unit codes for the
DATEDIF function. Each code produces different results by focusing
on specific date components.

## DATEDIF for Age Calculation

DATEDIF is commonly used to calculate age in years, months, and
days. This example shows a complete age calculation formula.

  
    A
    B
    C
  
  
    Birth Date
    Current Date
    Age
  
  
    4/12/1985
    4/4/2023
    =DATEDIF(A2,B2,"y") &amp; " years, " &amp; DATEDIF(A2,B2,"ym") &amp; " months, " &amp; DATEDIF(A2,B2,"md") &amp; " days"
  

The table demonstrates calculating a person's exact age from their birth date to 
a current date. The formula combines multiple DATEDIF functions for a complete 
result.

DATEDIF age calculation
  

=DATEDIF(A2,B2,"y") &amp; " years, " &amp; DATEDIF(A2,B2,"ym") &amp; " months, " &amp; DATEDIF(A2,B2,"md") &amp; " days"

This formula returns "37 years, 11 months, 23 days" for the given dates. It 
combines three DATEDIF calls with text concatenation to create a readable age 
string.

## DATEDIF for Project Duration

DATEDIF can calculate project durations in months and days, useful for project 
management tracking.

  
    A
    B
    C
  
  
    Start Date
    End Date
    Duration
  
  
    10/15/2022
    3/28/2023
    =DATEDIF(A2,B2,"m") &amp; " months, " &amp; DATEDIF(A2,B2,"md") &amp; " days"
  

The table shows how to calculate the duration of a project that started on 
October 15, 2022 and ended on March 28, 2023. The formula provides months and 
days.

DATEDIF project duration
  

=DATEDIF(A2,B2,"m") &amp; " months, " &amp; DATEDIF(A2,B2,"md") &amp; " days"

This formula returns "5 months, 13 days" for the given date range. It's useful 
for tracking project timelines and milestones in a readable format.

## DATEDIF Common Errors

DATEDIF can return errors if used incorrectly. Understanding these errors helps 
troubleshoot formula problems.

  
    Error
    Cause
    Solution
  
  
    #NUM!
    Start date &gt; End date
    Swap dates or validate inputs
  
  
    #VALUE!
    Invalid date format
    Ensure proper date values
  
  
    #NAME?
    Misspelled function
    Check "DATEDIF" spelling
  
  
    Incorrect result
    Wrong unit code
    Verify unit code is in quotes
  

This table lists common DATEDIF errors, their causes, and solutions. Proper date 
validation and unit code usage prevent most issues.

The DATEDIF function is a powerful but often overlooked tool for 
date calculations in Excel. From simple day counts to complex age 
calculations, DATEDIF handles various date difference scenarios. 
Mastering its unit codes and error handling will significantly improve your 
date-related calculations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).