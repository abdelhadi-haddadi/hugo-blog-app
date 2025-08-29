+++
title = "Excel RAND and RANDBETWEEN Functions"
date = 2025-08-29T19:54:17.210+01:00
draft = false
description = "Complete tutorial on Excel RAND and RANDBETWEEN functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel RAND and RANDBETWEEN Functions

last modified April 4, 2025

The RAND and RANDBETWEEN functions are essential for
generating random numbers in Excel. RAND creates random decimals
between 0 and 1, while RANDBETWEEN generates random integers within
a specified range. This tutorial provides a comprehensive guide to using these
functions with detailed examples. You'll learn basic syntax, practical
applications, and advanced techniques to master these powerful Excel functions.

## RAND and RANDBETWEEN Function Basics

The RAND function generates a random decimal number between 0 and 1.
RANDBETWEEN generates random integers between specified bottom and
top values. Both functions recalculate with each worksheet change.

  
    Function
    Description
    Syntax
  
  
    RAND
    Random decimal ≥0 and &lt;1
    =RAND()
  
  
    RANDBETWEEN
    Random integer between two values
    =RANDBETWEEN(bottom, top)
  

This table compares the two random number functions in Excel. RAND
requires no arguments, while RANDBETWEEN needs minimum and maximum
values. Both are volatile functions that recalculate frequently.

## Basic RAND Example

This example demonstrates the simplest use of the RAND function to generate a
random decimal number between 0 and 1.

Basic RAND formula
  

=RAND()

This formula generates a random decimal number like 0.623481. Each time the
worksheet recalculates, a new random number appears. The value will always be
≥0 and &lt;1.

## Basic RANDBETWEEN Example

This example shows how to use RANDBETWEEN to generate random integers between
specified minimum and maximum values.

Basic RANDBETWEEN formula
  

=RANDBETWEEN(1, 100)

This formula generates a random integer between 1 and 100, such as 42. The
result will always be an integer within the specified range, inclusive of both
endpoints.

## Generating Random Decimals in a Range

Combine RAND with arithmetic to create random decimals in any range. This
example generates numbers between 5.0 and 10.0.

Random decimal in custom range
  

=RAND()*(10-5)+5

This formula multiplies RAND's result by the range width (5) then adds the
minimum value (5). For RAND()=0.5, the result is 7.5. The formula creates
uniformly distributed decimals in the specified range.

## Creating Random Dates

Use RANDBETWEEN with Excel's date system to generate random dates. This example
creates dates in 2025.

Random date formula
  

=RANDBETWEEN(DATE(2025,1,1), DATE(2025,12,31))

This formula generates random dates throughout 2025. Excel stores dates as
numbers, so RANDBETWEEN works perfectly. Format the cell as a date to display
properly.

## Random Sampling Without Duplicates

Create a unique random sample by combining RAND with ranking functions. This
example selects 5 unique random numbers from 1 to 50.

  
    A
    B
  
  
    =RAND()
    =RANK(A1,$A$1:$A$50)
  
  
    =RAND()
    =RANK(A2,$A$1:$A$50)
  
  
    ...
    ...
  
  
    =RAND()
    =RANK(A50,$A$1:$A$50)
  

Unique random sample formula
  

=RANK(A1,$A$1:$A$50)

Column A generates random numbers, column B ranks them. The top 5 ranks
represent a unique random sample. This method ensures no duplicates in your
random selection.

## Random Yes/No Values

Combine RANDBETWEEN with CHOOSE to create random categorical data like Yes/No
responses.

Random Yes/No formula
  

=CHOOSE(RANDBETWEEN(1,2), "Yes", "No")

This formula randomly returns "Yes" or "No" with equal probability. Adjust the
RANDBETWEEN range and CHOOSE options for more categories or different
probabilities.

## Random Team Assignment

Use RAND with conditional formatting to randomly assign items to teams. This
example divides 20 items into 4 teams.

  
    A
    B
  
  
    Item1
    =RANDBETWEEN(1,4)
  
  
    Item2
    =RANDBETWEEN(1,4)
  
  
    ...
    ...
  
  
    Item20
    =RANDBETWEEN(1,4)
  

Random team assignment formula
  

=RANDBETWEEN(1,4)

Column B assigns each item to team 1-4 randomly. Use conditional formatting to
color-code teams. Press F9 to reshuffle assignments until balanced.

## Static Random Numbers

Convert volatile random numbers to static values using Paste Special. This
example shows how to freeze random values.

Steps to make random numbers static
  

1. Generate random numbers with RAND/RANDBETWEEN
2. Select the cells and copy (Ctrl+C)
3. Right-click and choose Paste Special &gt; Values
4. Click OK to replace formulas with static values

This process converts formulas to their current values, preventing further
recalculation. Use this when you need fixed random numbers for reproducibility.

The RAND and RANDBETWEEN functions are powerful tools
for simulation, sampling, and randomization in Excel. From basic random numbers
to complex sampling techniques, these functions handle diverse needs. Remember
they're volatile and recalculate frequently—use Paste Special &gt; Values when you
need static numbers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).