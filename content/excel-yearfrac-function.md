+++
title = "Excel YEARFRAC Function"
date = 2025-08-29T19:54:29.594+01:00
draft = false
description = "Complete tutorial on Excel YEARFRAC function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel YEARFRAC Function

last modified April 4, 2025

The YEARFRAC function calculates the fraction of a year between two
dates. It's essential for financial calculations, interest accruals, and age
computations. This tutorial provides a comprehensive guide to using the
YEARFRAC function with detailed examples. You'll learn basic
syntax, practical applications, and advanced techniques to master this function.

## YEARFRAC Function Basics

The YEARFRAC function returns the fraction of a year represented
by the number of whole days between two dates. It supports different day count
basis methods for financial calculations.

  
    Component
    Description
  
  
    Function Name
    YEARFRAC
  
  
    Syntax
    =YEARFRAC(start_date, end_date, [basis])
  
  
    Arguments
    start_date, end_date, basis (optional)
  
  
    Return Value
    Fraction of year between dates
  

This table breaks down the essential components of the YEARFRAC
function. The basis parameter determines the day count convention used in the
calculation.

## Basic YEARFRAC Example

This example demonstrates the simplest use of YEARFRAC with default settings.

Basic YEARFRAC formula
  

=YEARFRAC("2025-01-01", "2025-07-01")

This formula calculates the fraction of a year between January 1 and July 1,
2025. The result will be approximately 0.5 (half a year) using the default
basis (30/360).

## YEARFRAC with Different Basis Methods

YEARFRAC supports different day count conventions through the basis parameter.
Here's how they affect calculations.

  
    Basis
    Description
    Example
  
  
    0 or omitted
    US (NASD) 30/360
    =YEARFRAC(A1,A2,0)
  
  
    1
    Actual/actual
    =YEARFRAC(A1,A2,1)
  
  
    2
    Actual/360
    =YEARFRAC(A1,A2,2)
  
  
    3
    Actual/365
    =YEARFRAC(A1,A2,3)
  
  
    4
    European 30/360
    =YEARFRAC(A1,A2,4)
  

The table shows all available basis methods for YEARFRAC. Each method calculates
the year fraction differently, affecting financial computations.

YEARFRAC with basis 1 (actual/actual)
  

=YEARFRAC("2025-01-01", "2025-07-01", 1)

This formula uses the actual/actual method (basis 1) for leap year-aware
calculations. The result will be slightly different from the default basis.

## YEARFRAC for Age Calculation

YEARFRAC can calculate precise ages by comparing birth dates to current dates.

  
    A
    B
  
  
    Birth Date
    1990-05-15
  
  
    Current Date
    2025-04-04
  
  
    Age
    =YEARFRAC(B1,B2,1)
  

The table demonstrates using YEARFRAC to calculate exact age in years. Basis 1
(actual/actual) provides the most accurate age calculation.

Age calculation with YEARFRAC
  

=YEARFRAC(B1, TODAY(), 1)

This dynamic formula calculates current age using TODAY() as the end date. The
result shows exact age including fractional years for precise measurements.

## YEARFRAC for Financial Calculations

YEARFRAC is commonly used in finance to calculate accrued interest between
payment periods.

  
    A
    B
  
  
    Last Payment
    2025-01-01
  
  
    Next Payment
    2025-07-01
  
  
    Current Date
    2025-04-04
  
  
    Accrued Days
    =YEARFRAC(B1,B3,3)*365
  

The table shows how to calculate accrued interest days using YEARFRAC. Basis 3
(actual/365) is often used for bond calculations in some markets.

Interest accrual calculation
  

=YEARFRAC(B1,B3,3)*10000*0.05

This formula calculates accrued interest on a $10,000 bond with 5% annual
interest. YEARFRAC determines the fraction of the year for proper proration.

## YEARFRAC for Project Duration

YEARFRAC can measure project duration as a fraction of a year for progress
tracking.

  
    A
    B
  
  
    Start Date
    2025-01-01
  
  
    End Date
    2025-12-31
  
  
    Current Date
    2025-04-04
  
  
    Progress
    =YEARFRAC(B1,B3,1)/YEARFRAC(B1,B2,1)
  

The table demonstrates project progress calculation using YEARFRAC. It compares
elapsed time to total project duration for a percentage complete value.

Project progress calculation
  

=YEARFRAC(B1,B3,1)/YEARFRAC(B1,B2,1)

This formula calculates project completion percentage by dividing elapsed time
by total duration. Basis 1 ensures accurate accounting for leap years.

## YEARFRAC with Cell References

YEARFRAC works with cell references containing dates, making it dynamic and
reusable.

  
    A
    B
  
  
    Hire Date
    2020-06-15
  
  
    Current Date
    =TODAY()
  
  
    Tenure
    =YEARFRAC(B1,B2,1)
  

The table shows employee tenure calculation using cell references. The formula
automatically updates when the worksheet recalculates.

Employee tenure calculation
  

=YEARFRAC(B1, TODAY(), 1)

This dynamic formula calculates current tenure in years. Using TODAY() ensures
the result is always up-to-date without manual date entry.

The YEARFRAC function is powerful for date-based calculations
requiring year fractions. From financial computations to age and tenure
tracking, it provides precise results. Understanding the different basis
methods ensures accurate calculations for specific requirements. Mastering
YEARFRAC enhances your ability to work with date intervals in Excel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).