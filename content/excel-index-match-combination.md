+++
title = "Excel INDEX-MATCH Combination"
date = 2025-08-29T19:54:10.476+01:00
draft = false
description = "Complete tutorial on Excel INDEX-MATCH with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel INDEX-MATCH Combination

last modified April 4, 2025

The INDEX-MATCH combination is a powerful lookup technique in Excel.
It overcomes limitations of VLOOKUP and provides more flexibility. This tutorial
covers basic definitions, syntax, and five practical examples. You'll learn how
to use this combination for vertical, horizontal, and two-way lookups.

## INDEX-MATCH Basics

INDEX returns a value from a specific position in a range.
MATCH finds the position of a lookup value in a range. Together,
they create a dynamic lookup formula.

  
    Function
    Description
    Syntax
  
  
    INDEX
    Returns value at intersection of row/column
    =INDEX(array, row_num, [column_num])
  
  
    MATCH
    Returns position of lookup value
    =MATCH(lookup_value, lookup_array, [match_type])
  

This table shows the basic components of INDEX-MATCH. INDEX needs position
numbers which MATCH can provide dynamically. Together they create flexible
lookup formulas.

## Basic Vertical Lookup

This example demonstrates a simple vertical lookup using INDEX-MATCH as a
VLOOKUP alternative.

  
    A
    B
    C
  
  
    ID
    Name
    
  
  
    101
    John
    
  
  
    102
    Sarah
    
  
  
    103
    Mike
    
  
  
    
    
    =INDEX(B2:B4, MATCH(102, A2:A4, 0))
  

The table shows employee data with ID and Name columns. The formula looks up
the name for ID 102 using INDEX-MATCH combination.

Basic INDEX-MATCH formula
  

=INDEX(B2:B4, MATCH(102, A2:A4, 0))

This formula first finds the position of 102 in A2:A4 (position 2), then
returns the corresponding value from B2:B4. The result will be "Sarah".

## Horizontal Lookup

INDEX-MATCH can perform horizontal lookups, which HLOOKUP does but with more
flexibility. This example shows how.

  
    A
    B
    C
    D
  
  
    Month
    Jan
    Feb
    Mar
  
  
    Sales
    1500
    1800
    2100
  
  
    
    
    
    =INDEX(B2:D2, MATCH("Feb", B1:D1, 0))
  

The table contains monthly sales data arranged horizontally. The formula looks
up February sales using INDEX-MATCH combination.

Horizontal INDEX-MATCH
  

=INDEX(B2:D2, MATCH("Feb", B1:D1, 0))

MATCH finds "Feb" in B1:D1 (position 2), then INDEX returns the corresponding
value from B2:D2. The result will be 1800. This shows horizontal lookup
capability.

## Two-Way Lookup

INDEX-MATCH can perform two-way lookups by combining row and column searches.
This example demonstrates this powerful feature.

  
    A
    B
    C
    D
  
  
    
    Math
    Science
    History
  
  
    John
    85
    90
    78
  
  
    Sarah
    92
    88
    95
  
  
    Mike
    78
    85
    82
  
  
    
    
    
    =INDEX(B2:D4, MATCH("Sarah", A2:A4, 0), MATCH("Science", B1:D1, 0))
  

The table shows student grades across subjects. The formula finds Sarah's
Science grade using two MATCH functions for row and column positions.

Two-way INDEX-MATCH
  

=INDEX(B2:D4, MATCH("Sarah", A2:A4, 0), MATCH("Science", B1:D1, 0))

The first MATCH finds Sarah's row (2), the second finds Science column (2).
INDEX returns the value at intersection (B3). Result is 88. This demonstrates
matrix-style lookups.

## Left Lookup

Unlike VLOOKUP, INDEX-MATCH can look left. This example shows how to retrieve
values from columns to the left of the lookup column.

  
    A
    B
    C
  
  
    Name
    ID
    
  
  
    John
    101
    
  
  
    Sarah
    102
    
  
  
    Mike
    103
    
  
  
    
    
    =INDEX(A2:A4, MATCH(102, B2:B4, 0))
  

The table has Name and ID columns with ID as the lookup column. The formula
finds the name for ID 102, looking left from the ID column.

Left lookup with INDEX-MATCH
  

=INDEX(A2:A4, MATCH(102, B2:B4, 0))

MATCH finds 102 in B2:B4 (position 2), INDEX returns corresponding name from
A2:A4. Result is "Sarah". This solves VLOOKUP's left lookup limitation.

## Approximate Match

INDEX-MATCH can perform approximate matches like VLOOKUP. This example shows
how to find a value in a range using approximate matching.

  
    A
    B
    C
  
  
    Score
    Grade
    
  
  
    0
    F
    
  
  
    60
    D
    
  
  
    70
    C
    
  
  
    80
    B
    
  
  
    90
    A
    
  
  
    
    
    =INDEX(B2:B6, MATCH(85, A2:A6, 1))
  

The table shows grade thresholds. The formula finds the grade for score 85
using approximate match (1 as third argument in MATCH).

Approximate match with INDEX-MATCH
  

=INDEX(B2:B6, MATCH(85, A2:A6, 1))

MATCH finds the largest value less than or equal to 85 (80 at position 4).
INDEX returns corresponding grade "B". This works like VLOOKUP approximate
match but more flexible.

The INDEX-MATCH combination is superior to VLOOKUP in many cases.
It offers left lookups, dynamic column references, and better performance. The
examples show vertical, horizontal, two-way, left, and approximate lookups.
Mastering INDEX-MATCH will significantly improve your Excel lookup skills.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).