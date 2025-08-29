+++
title = "Excel SLN Function"
date = 2025-08-29T19:54:19.469+01:00
draft = false
description = "Complete tutorial on Excel SLN function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SLN Function

last modified April 4, 2025

The SLN function calculates straight-line depreciation for an asset
over one period. It's essential for financial analysis and accounting. This
tutorial provides a comprehensive guide to using the SLN function.
You'll learn its syntax, practical applications, and see detailed examples to
master this financial function.

## SLN Function Basics

The SLN function returns the straight-line depreciation of an asset
for one period. It uses three parameters: cost, salvage value, and life. The
formula divides the depreciable amount equally over the asset's useful life.

  
    Component
    Description
  
  
    Function Name
    SLN
  
  
    Syntax
    =SLN(cost, salvage, life)
  
  
    Arguments
    cost, salvage, life
  
  
    Return Value
    Depreciation per period
  

This table outlines the key components of the SLN function. The
function requires three arguments and returns the depreciation amount per period.
All arguments must be positive numbers for accurate results.

## Basic SLN Example

This example demonstrates the simplest use of the SLN function with hard-coded
values. We'll calculate annual depreciation for an asset worth $10,000.

Basic SLN formula
  

=SLN(10000, 1000, 5)

This formula calculates annual depreciation for a $10,000 asset with $1,000
salvage value over 5 years. The result is $1,800 per year. The calculation is
(cost - salvage) / life = (10000-1000)/5.

## SLN with Cell References

A more practical use of SLN involves referencing cells containing
the asset parameters. Here's an example with cell references.

  
    A
    B
  
  
    Cost:
    15000
  
  
    Salvage:
    3000
  
  
    Life (years):
    6
  
  
    Depreciation:
    =SLN(B1,B2,B3)
  

The table shows a spreadsheet with asset parameters in column B and the SLN
formula in cell B4 that references these cells. This approach makes the
worksheet more flexible and easier to update.

SLN with cell references
  

=SLN(B1,B2,B3)

This formula calculates annual depreciation for a $15,000 asset with $3,000
salvage value over 6 years. The result is $2,000 per year. Using cell
references allows easy parameter changes without modifying the formula.

## SLN with Monthly Depreciation

The SLN function can calculate depreciation for any time period by
adjusting the life parameter. This example shows monthly depreciation.

  
    A
    B
  
  
    Cost:
    8000
  
  
    Salvage:
    500
  
  
    Life (months):
    36
  
  
    Monthly Depr.:
    =SLN(B1,B2,B3)
  

This table demonstrates using SLN for monthly depreciation by expressing the
asset life in months. The formula remains the same, but the interpretation of
the result changes to monthly amounts.

SLN for monthly depreciation
  

=SLN(B1,B2,B3)

This formula calculates monthly depreciation for a $8,000 asset with $500
salvage value over 36 months. The result is $208.33 per month. The same
function works for any time unit by adjusting the life parameter accordingly.

## SLN with Zero Salvage Value

Many assets depreciate to zero value. This example shows SLN calculation when
the salvage value is zero.

  
    A
    B
  
  
    Cost:
    5000
  
  
    Salvage:
    0
  
  
    Life (years):
    4
  
  
    Annual Depr.:
    =SLN(B1,B2,B3)
  

The table shows an asset that fully depreciates to zero value. The SLN formula
simplifies to cost divided by life when salvage is zero. This is common for
assets with no residual value.

SLN with zero salvage
  

=SLN(B1,B2,B3)

This formula calculates annual depreciation for a $5,000 asset with no salvage
value over 4 years. The result is $1,250 per year. The calculation is simply
5000/4 since the salvage value is zero.

## SLN for Partial Year Depreciation

The SLN function can calculate depreciation for partial years by
adjusting the life parameter. This example shows quarterly depreciation.

  
    A
    B
  
  
    Cost:
    12000
  
  
    Salvage:
    2000
  
  
    Life (quarters):
    16
  
  
    Quarterly Depr.:
    =SLN(B1,B2,B3)
  

This table demonstrates using SLN for quarterly depreciation by expressing the
asset life in quarters (4 years = 16 quarters). The formula calculates equal
depreciation for each quarter.

SLN for quarterly depreciation
  

=SLN(B1,B2,B3)

This formula calculates quarterly depreciation for a $12,000 asset with $2,000
salvage value over 16 quarters. The result is $625 per quarter. The SLN
function adapts to any depreciation period by adjusting the life parameter.

## SLN Compared to Other Depreciation Methods

The SLN function provides constant depreciation amounts each
period. This differs from accelerated methods like DDB or SYD. This example
compares SLN to other approaches.

  
    Year
    SLN
    DDB
    SYD
  
  
    1
    2000
    4000
    3333
  
  
    2
    2000
    2400
    2667
  
  
    3
    2000
    1440
    2000
  
  
    4
    2000
    160
    1333
  
  
    5
    2000
    0
    667
  

This table compares depreciation methods for a $10,000 asset with $0 salvage
over 5 years. SLN provides equal amounts each year, while DDB and SYD front-load
depreciation. Each method has different financial reporting implications.

The SLN function is essential for financial analysis and
accounting. It provides the simplest depreciation calculation with equal
periodic amounts. While other methods might match asset usage patterns better,
SLN offers predictability and simplicity. Understanding when to use SLN versus
other methods is key for accurate financial reporting.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).