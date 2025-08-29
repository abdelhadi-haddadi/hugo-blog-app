+++
title = "Excel AVERAGEIF/AVERAGEIFS Functions"
date = 2025-08-29T19:53:55.915+01:00
draft = false
description = "Complete tutorial on Excel AVERAGEIF and AVERAGEIFS functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel AVERAGEIF/AVERAGEIFS Functions

last modified April 4, 2025

The AVERAGEIF and AVERAGEIFS functions are powerful 
Excel tools for calculating conditional averages. They allow you to average 
values based on one or multiple criteria. This tutorial provides a complete 
guide to using these functions with detailed examples. You'll learn syntax, 
practical applications, and advanced techniques.

## AVERAGEIF/AVERAGEIFS Function Basics

AVERAGEIF calculates the average of cells that meet a single 
criterion, while AVERAGEIFS handles multiple criteria. They are 
essential for data analysis when you need conditional averages.

  
    Function
    Description
    Syntax
  
  
    AVERAGEIF
    Averages cells that meet one condition
    =AVERAGEIF(range, criteria, [average_range])
  
  
    AVERAGEIFS
    Averages cells that meet multiple conditions
    =AVERAGEIFS(average_range, criteria_range1, criteria1, ...)
  

This table compares both functions. Note the different argument order between 
them. AVERAGEIFS requires the average range first, while 
AVERAGEIF has it as an optional third argument.

## Basic AVERAGEIF Example

This example demonstrates the simplest use of AVERAGEIF to average 
sales for a specific region.

  
    A (Region)
    B (Sales)
    C
  
  
    East
    100
    
  
  
    West
    200
    
  
  
    East
    150
    
  
  
    
    
    =AVERAGEIF(A1:A3, "East", B1:B3)
  

Basic AVERAGEIF formula
  

=AVERAGEIF(A1:A3, "East", B1:B3)

This formula averages sales values in B1:B3 where the corresponding region in 
A1:A3 is "East". The result is 125 ((100+150)/2). The third argument specifies 
which values to average when the condition is met.

## AVERAGEIF with Comparison Operator

AVERAGEIF supports comparison operators like &gt;, &lt;, &gt;=, &lt;=. This 
example averages sales above a certain threshold.

  
    A (Sales)
    B
  
  
    500
    
  
  
    300
    
  
  
    700
    
  
  
    
    =AVERAGEIF(A1:A3, "&gt;400")
  

AVERAGEIF with operator
  

=AVERAGEIF(A1:A3, "&gt;400")

This formula averages values in A1:A3 that are greater than 400. The result is 
600 ((500+700)/2). Note we omitted the third argument since we're averaging the 
same range we're checking for criteria.

## AVERAGEIF with Wildcards

AVERAGEIF supports wildcards (* for multiple characters, ? for 
single character) when working with text criteria. This example averages sales 
for product names starting with "Pro".

  
    A (Product)
    B (Sales)
    C
  
  
    Pro100
    50
    
  
  
    Basic200
    30
    
  
  
    Pro200
    70
    
  
  
    
    
    =AVERAGEIF(A1:A3, "Pro*", B1:B3)
  

AVERAGEIF with wildcard
  

=AVERAGEIF(A1:A3, "Pro*", B1:B3)

This formula averages sales in B1:B3 where the product name in A1:A3 starts 
with "Pro". The result is 60 ((50+70)/2). The asterisk matches any characters 
after "Pro".

## Basic AVERAGEIFS Example

AVERAGEIFS extends AVERAGEIF by supporting multiple 
criteria. This example averages sales for a specific region and product.

  
    A (Region)
    B (Product)
    C (Sales)
    D
  
  
    East
    Widget
    100
    
  
  
    West
    Gadget
    200
    
  
  
    East
    Widget
    150
    
  
  
    
    
    
    =AVERAGEIFS(C1:C3, A1:A3, "East", B1:B3, "Widget")
  

Basic AVERAGEIFS formula
  

=AVERAGEIFS(C1:C3, A1:A3, "East", B1:B3, "Widget")

This formula averages sales in C1:C3 where region is "East" AND product is 
"Widget". The result is 125 ((100+150)/2). Note the different argument order 
compared to AVERAGEIF.

## AVERAGEIFS with Multiple Criteria Types

This advanced example combines different criteria types (text, number, date) in 
AVERAGEIFS to calculate average sales meeting complex conditions.

  
    A (Region)
    B (Sales)
    C (Date)
    D
  
  
    East
    500
    1/1/2023
    
  
  
    West
    300
    2/1/2023
    
  
  
    East
    700
    3/1/2023
    
  
  
    
    
    
    =AVERAGEIFS(B1:B3, A1:A3, "East", B1:B3, "&gt;400", C1:C3, "&gt;"&amp;DATE(2023,1,15))
  

Complex AVERAGEIFS formula
  

=AVERAGEIFS(B1:B3, A1:A3, "East", B1:B3, "&gt;400", C1:C3, "&gt;"&amp;DATE(2023,1,15))

This formula averages sales where: region is "East", sales &gt; 400, and date is 
after Jan 15, 2023. The result is 700 (only the third row meets all criteria). 
Note the DATE function and concatenation with &amp; for the date comparison.

The AVERAGEIF and AVERAGEIFS functions are 
indispensable for conditional averaging in Excel. They offer flexibility with 
text, numbers, dates, and wildcards. Mastering these functions will 
significantly enhance your data analysis capabilities. Remember their different 
argument structures and when to use each.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).