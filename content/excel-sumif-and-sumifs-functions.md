+++
title = "Excel SUMIF and SUMIFS Functions"
date = 2025-08-29T19:54:21.727+01:00
draft = false
description = "Complete tutorial on Excel SUMIF and SUMIFS functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SUMIF and SUMIFS Functions

last modified April 4, 2025

The SUMIF and SUMIFS functions are powerful Excel 
tools for conditional summing. SUMIF adds cells that meet a single 
criterion, while SUMIFS can handle multiple conditions. This 
tutorial provides a comprehensive guide with detailed examples to master these 
essential functions.

## SUMIF/SUMIFS Function Basics

SUMIF sums values based on one condition, while SUMIFS 
can evaluate multiple criteria. These functions are essential for data analysis 
when you need to sum specific subsets of data.

  
    Function
    Description
    Syntax
  
  
    SUMIF
    Sums cells that meet one condition
    =SUMIF(range, criteria, [sum_range])
  
  
    SUMIFS
    Sums cells that meet multiple conditions
    =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
  

This table compares the two functions. Note that SUMIFS has a 
different argument order, with the sum range coming first. Both functions 
support various criteria types including numbers, text, and wildcards.

## Basic SUMIF Example

This example demonstrates summing sales amounts for a specific salesperson 
using SUMIF.

  
    A (Salesperson)
    B (Amount)
    C
  
  
    John
    100
    
  
  
    Mary
    150
    
  
  
    John
    200
    
  
  
    
    
    =SUMIF(A1:A3, "John", B1:B3)
  

The table shows sales data with names in column A and amounts in column B. The 
formula sums only amounts where the salesperson is "John".

Basic SUMIF formula
  

=SUMIF(A1:A3, "John", B1:B3)

This formula checks A1:A3 for "John" and sums corresponding B1:B3 values. The 
result is 300 (100+200). The sum_range is optional - if omitted, it sums the 
criteria range itself.

## SUMIF with Number Criteria

SUMIF can use numeric conditions with comparison operators. This 
example sums values greater than a threshold.

  
    A (Values)
    B
  
  
    50
    
  
  
    75
    
  
  
    100
    
  
  
    
    =SUMIF(A1:A3, "&gt;80")
  

The table demonstrates summing values greater than 80. Only the 100 meets this 
condition, so that's the expected result.

SUMIF with number comparison
  

=SUMIF(A1:A3, "&gt;80")

This formula sums values in A1:A3 that are greater than 80. The result is 100. 
Note we omitted sum_range, so it sums the criteria range. Comparison operators 
include &gt;, &lt;, &gt;=, &lt;=, and &lt;&gt;.

## SUMIF with Wildcards

SUMIF supports wildcards for partial text matching. This example 
sums products starting with "Pro".

  
    A (Product)
    B (Sales)
    C
  
  
    Product A
    200
    
  
  
    Service B
    150
    
  
  
    Product C
    300
    
  
  
    
    
    =SUMIF(A1:A3, "Pro*", B1:B3)
  

The table shows how wildcards can match partial text. The asterisk (*) 
represents any number of characters, while question mark (?) matches a single 
character.

SUMIF with wildcard
  

=SUMIF(A1:A3, "Pro*", B1:B3)

This formula sums sales for products starting with "Pro". It matches "Product A" 
and "Product C", summing 200+300=500. Wildcards make text criteria more 
flexible.

## Basic SUMIFS Example

SUMIFS extends SUMIF by supporting multiple 
conditions. This example sums sales for a specific region and product.

  
    A (Region)
    B (Product)
    C (Sales)
    D
  
  
    East
    Widget
    100
    
  
  
    West
    Gadget
    150
    
  
  
    East
    Gadget
    200
    
  
  
    
    
    
    =SUMIFS(C1:C3, A1:A3, "East", B1:B3, "Gadget")
  

The table demonstrates multiple conditions in SUMIFS. The formula 
sums only East region Gadget sales, which is just the 200 value.

Basic SUMIFS formula
  

=SUMIFS(C1:C3, A1:A3, "East", B1:B3, "Gadget")

This formula sums C1:C3 where A1:A3 is "East" AND B1:B3 is "Gadget". The result 
is 200. Note sum_range comes first in SUMIFS, unlike 
SUMIF.

## SUMIFS with Date Criteria

SUMIFS works well with date ranges. This example sums sales 
between two dates.

  
    A (Date)
    B (Sales)
    C
  
  
    1/1/2025
    500
    
  
  
    1/15/2025
    600
    
  
  
    2/1/2025
    700
    
  
  
    
    
    =SUMIFS(B1:B3, A1:A3, "&gt;=1/1/2025", A1:A3, "&lt;=1/31/2025")
  

The table shows how to use date ranges with SUMIFS. The formula 
sums January sales only, excluding the February transaction.

SUMIFS with date range
  

=SUMIFS(B1:B3, A1:A3, "&gt;=1/1/2025", A1:A3, "&lt;=1/31/2025")

This formula sums B1:B3 where dates in A1:A3 are in January 2025. The result 
is 1100 (500+600). Dates can use comparison operators or the DATE function for 
more precision.

## SUMIFS with OR Logic

While SUMIFS uses AND logic by default, you can simulate OR logic 
by adding multiple SUMIFS functions. This example sums sales for 
either product.

  
    A (Product)
    B (Sales)
    C
  
  
    Widget
    100
    
  
  
    Gadget
    150
    
  
  
    Widget
    200
    
  
  
    
    
    =SUMIFS(B1:B3, A1:A3, "Widget") + SUMIFS(B1:B3, A1:A3, "Gadget")
  

The table demonstrates OR logic by combining two SUMIFS formulas. 
This sums all Widget and Gadget sales, effectively including all records.

SUMIFS with OR logic
  

=SUMIFS(B1:B3, A1:A3, "Widget") + SUMIFS(B1:B3, A1:A3, "Gadget")

This formula sums Widget sales (100+200=300) plus Gadget sales (150), totaling 
450. For true OR conditions across different columns, consider SUMPRODUCT or 
array formulas instead.

The SUMIF and SUMIFS functions are indispensable for 
conditional summing in Excel. SUMIF handles single conditions 
efficiently, while SUMIFS provides powerful multi-criteria 
analysis. Mastering these functions will significantly enhance your data 
analysis capabilities in Excel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).