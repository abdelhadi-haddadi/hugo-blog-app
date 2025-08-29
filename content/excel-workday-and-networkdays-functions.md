+++
title = "Excel WORKDAY and NETWORKDAYS Functions"
date = 2025-08-29T19:54:27.327+01:00
draft = false
description = "Complete tutorial on Excel WORKDAY and NETWORKDAYS functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel WORKDAY and NETWORKDAYS Functions

last modified April 4, 2025

The WORKDAY and NETWORKDAYS functions are essential
for date calculations in Excel. They help calculate working days while excluding
weekends and holidays. This tutorial provides a comprehensive guide to using
these functions with detailed examples. You'll learn basic syntax, practical
applications, and advanced techniques.

## Function Basics

WORKDAY calculates a date after adding workdays to a start date.
NETWORKDAYS counts workdays between two dates. Both exclude
weekends and can optionally exclude holidays.

  
    Function
    Description
    Syntax
  
  
    WORKDAY
    Returns date after specified workdays
    =WORKDAY(start_date, days, [holidays])
  
  
    NETWORKDAYS
    Counts workdays between dates
    =NETWORKDAYS(start_date, end_date, [holidays])
  

This table shows the core differences between the two functions. WORKDAY moves
forward/backward in time, while NETWORKDAYS calculates the difference between
dates.

## Basic WORKDAY Example

This example shows how to calculate a due date 10 workdays from today.

Basic WORKDAY formula
  

=WORKDAY(TODAY(), 10)

This formula returns the date 10 workdays from today, excluding weekends. If
today is Monday April 1, 2025, it returns Monday April 15 (skipping 2
weekends).

## WORKDAY with Holidays

This example demonstrates WORKDAY with a custom holiday list to exclude specific
dates from the calculation.

  
    A
    B
  
  
    Start Date
    2025-04-01
  
  
    Holiday 1
    2025-04-07
  
  
    Holiday 2
    2025-04-14
  
  
    Result
    =WORKDAY(B1, 10, B2:B3)
  

The table shows a start date and two holidays. The WORKDAY formula calculates
10 workdays from start date, excluding both weekends and the listed holidays.

WORKDAY with holidays
  

=WORKDAY(B1, 10, B2:B3)

This formula returns April 16, 2025 (original result was April 15, but April 14
is a holiday). The calculation skips weekends and the two specified holidays.

## Basic NETWORKDAYS Example

This example counts workdays between two dates, useful for calculating project
duration.

  
    A
    B
  
  
    Start Date
    2025-04-01
  
  
    End Date
    2025-04-30
  
  
    Workdays
    =NETWORKDAYS(B1, B2)
  

The table shows a date range in April 2025. The NETWORKDAYS formula calculates
how many workdays exist between these dates, automatically excluding weekends.

Basic NETWORKDAYS formula
  

=NETWORKDAYS(B1, B2)

This formula returns 22 workdays in April 2025 (30 total days minus 8 weekend
days). NETWORKDAYS includes both start and end dates in the count if they are
workdays.

## NETWORKDAYS with Holidays

This enhanced example shows NETWORKDAYS excluding both weekends and holidays.

  
    A
    B
  
  
    Start Date
    2025-04-01
  
  
    End Date
    2025-04-30
  
  
    Holiday 1
    2025-04-07
  
  
    Holiday 2
    2025-04-14
  
  
    Workdays
    =NETWORKDAYS(B1, B2, B3:B4)
  

The table extends the previous example with a holiday list. The NETWORKDAYS
formula now excludes these dates from the workday count along with weekends.

NETWORKDAYS with holidays
  

=NETWORKDAYS(B1, B2, B3:B4)

This formula returns 20 workdays (original 22 minus 2 holidays). The holidays
fell on weekdays (Monday April 7 and Monday April 14) and were excluded.

## WORKDAY.INTL and NETWORKDAYS.INTL

These advanced versions let you customize which days are considered weekends.
This example shows WORKDAY.INTL with a Tuesday-Wednesday weekend.

WORKDAY.INTL with custom weekend
  

=WORKDAY.INTL("2025-04-01", 10, "0001100")

This formula calculates 10 workdays from April 1, 2025, treating only
Tuesdays and Wednesdays as weekends. The "0001100" string defines the weekend
pattern (1=weekend, 0=workday).

The WORKDAY and NETWORKDAYS functions are powerful
tools for business date calculations. They handle weekends automatically and
can incorporate holiday schedules. The INTL versions provide flexibility for
non-standard work weeks. Mastering these functions will improve your date-based
calculations in Excel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).