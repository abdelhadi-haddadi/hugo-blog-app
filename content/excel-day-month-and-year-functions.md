+++
title = "Excel DAY, MONTH, and YEAR Functions"
date = 2025-08-29T19:54:01.504+01:00
draft = false
description = "Complete tutorial on Excel DAY, MONTH, and YEAR functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel DAY, MONTH, and YEAR Functions

last modified April 4, 2025

The DAY, MONTH, and YEAR functions are 
essential date functions in Excel. They extract specific components from dates. 
This tutorial provides a comprehensive guide to using these functions. You'll 
learn their syntax, practical applications, and how to combine them effectively.

## Function Basics

These functions extract parts from Excel date values. DAY returns 
the day number, MONTH the month number, and YEAR the 
year. They all take a single date argument.

  
    Function
    Description
    Syntax
  
  
    DAY
    Extracts day from date (1-31)
    =DAY(serial_number)
  
  
    MONTH
    Extracts month from date (1-12)
    =MONTH(serial_number)
  
  
    YEAR
    Extracts year from date (1900-9999)
    =YEAR(serial_number)
  

This table summarizes the three date component functions. All require a valid 
Excel date serial number as input. They return numeric values representing 
date parts.

## Basic DAY Example

This example demonstrates extracting the day number from a specific date.

Basic DAY formula
  

=DAY("2025-04-15")

This formula returns 15, extracting the day from April 15, 2025. The date can 
be entered as text (with quotes) or as a cell reference containing a date.

## Basic MONTH Example

This example shows how to extract the month number from a date value.

  
    A
    B
  
  
    2025-07-22
    =MONTH(A1)
  

The table shows a date in cell A1 and the MONTH formula in B1 that extracts 
the month number. The result will be 7 for July.

MONTH with cell reference
  

=MONTH(A1)

This formula returns the month number from the date in cell A1. When A1 
contains July 22, 2025, it returns 7. This demonstrates using cell references.

## Basic YEAR Example

This example extracts the year from a date stored in a cell.

  
    A
    B
  
  
    1999-12-31
    =YEAR(A1)
  

The table contains New Year's Eve 1999 in cell A1. The YEAR formula in B1 
extracts just the year portion, returning 1999.

YEAR function example
  

=YEAR(A1)

This formula returns the year from the date in A1. For December 31, 1999, it 
returns 1999. YEAR is useful for grouping or analyzing data by year.

## Combining DAY, MONTH, YEAR

These functions are often combined to create custom date formats or 
calculations. This example shows a common combination.

  
    A
    B
  
  
    2025-03-08
    =DAY(A1)&amp;"/"&amp;MONTH(A1)&amp;"/"&amp;YEAR(A1)
  

The table demonstrates combining all three functions to create a day/month/year 
format. The ampersand (&amp;) concatenates the components with slashes.

Combined date formula
  

=DAY(A1)&amp;"/"&amp;MONTH(A1)&amp;"/"&amp;YEAR(A1)

This formula creates a date string in d/m/y format from the date in A1. For 
March 8, 2025, it returns "8/3/2025". This technique is useful for custom 
date formatting.

## Calculating Age

A practical application is calculating age from birthdate. This example uses 
YEAR and TODAY functions.

  
    A
    B
  
  
    1990-05-15
    =YEAR(TODAY())-YEAR(A1)
  

The table shows a birthdate in A1 and an age calculation in B1. This simple 
formula subtracts birth year from current year to estimate age.

Age calculation formula
  

=YEAR(TODAY())-YEAR(A1)

This formula calculates age by subtracting birth year from current year. Note 
it doesn't account for whether the birthday has occurred yet this year. For 
more precision, combine with MONTH and DAY.

## Precise Age Calculation

This improved age calculation accounts for month and day of birth.

Precise age formula
  

=YEAR(TODAY())-YEAR(A1)-IF(DATE(YEAR(TODAY()),MONTH(A1),DAY(A1))&gt;TODAY(),1,0)

This complex formula first checks if the birthday hasn't occurred yet this 
year. If true, it subtracts 1 from the simple year difference. This provides 
exact age accounting for birth month/day.

## Extracting Quarter from Date

Combine MONTH with simple math to calculate fiscal quarters.

  
    A
    B
  
  
    2025-11-20
    =CEILING(MONTH(A1)/3,1)
  

The table demonstrates calculating quarter from a date. The formula divides 
month by 3 and rounds up to nearest integer to determine quarter (1-4).

Quarter calculation
  

=CEILING(MONTH(A1)/3,1)

This formula returns the quarter (1-4) for the date in A1. For November (month
11), it returns 4. CEILING rounds up the division result to nearest
integer.

## Date Validation

These functions help validate dates by checking component ranges.

Date validation formula
  

=AND(YEAR(A1)&gt;=1900,YEAR(A1)&lt;=2100,MONTH(A1)&gt;=1,MONTH(A1)&lt;=12,DAY(A1)&gt;=1,DAY(A1)&lt;=31)

This formula checks if date in A1 has valid components: year between 1900-2100, 
month 1-12, and day 1-31. AND returns TRUE only if all conditions are met.

## Creating Date from Components

Combine these functions with DATE to reconstruct dates from parts.

  
    A
    B
  
  
    2025-08-15
    =DATE(YEAR(A1),MONTH(A1)+3,DAY(A1))
  

The table shows adding 3 months to a date by extracting components, modifying 
month, and rebuilding date. This handles month overflow automatically.

Date manipulation
  

=DATE(YEAR(A1),MONTH(A1)+3,DAY(A1))

This formula adds 3 months to the date in A1. DATE automatically adjusts year 
if month exceeds 12. For August 15 + 3 months, returns November 15 same year.

## Days Until Birthday

Calculate days remaining until next birthday using these functions.

Days until birthday
  

=DATE(YEAR(TODAY())+(DATE(YEAR(TODAY()),MONTH(A1),DAY(A1))&lt;TODAY(),MONTH(A1),DAY(A1))-TODAY())

This complex formula calculates days until next birthday. It checks if birthday 
already occurred this year, if so uses next year's date. Then subtracts today.

## Month Name from Date

Combine MONTH with TEXT to get month names instead of numbers.

  
    A
    B
  
  
    2025-12-25
    =TEXT(DATE(1,MONTH(A1),1),"mmmm")
  

The table demonstrates converting month number to full month name. The formula 
creates a dummy date with the month from A1 and formats it to show name.

Month name formula
  

=TEXT(DATE(1,MONTH(A1),1),"mmmm")

This formula returns the full month name ("December") from the date in A1. The 
"mmmm" format code specifies full month name in TEXT function.

The DAY, MONTH, and YEAR functions are 
powerful tools for date manipulation in Excel. They enable extracting specific 
date components for analysis, formatting, and calculations. Mastering these 
functions is essential for effective date handling in spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).