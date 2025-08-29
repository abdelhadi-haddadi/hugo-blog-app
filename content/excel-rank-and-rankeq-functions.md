+++
title = "Excel RANK and RANK.EQ Functions"
date = 2025-08-29T19:54:17.196+01:00
draft = false
description = "Complete tutorial on Excel RANK and RANK.EQ functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel RANK and RANK.EQ Functions

last modified April 4, 2025

The RANK and RANK.EQ functions are essential for 
determining the position of a value within a dataset. These functions help 
analyze data by showing relative standing. This tutorial provides a 
comprehensive guide to using both functions with detailed examples.

## RANK/RANK.EQ Function Basics

The RANK and RANK.EQ functions return the rank of a 
number in a list of numbers. The rank is its size relative to other values in 
the list.

  
    Component
    Description
  
  
    Function Names
    RANK (legacy), RANK.EQ (current)
  
  
    Syntax
    =RANK.EQ(number, ref, [order])
  
  
    Arguments
    number, ref, order (optional)
  
  
    Return Value
    Rank position as integer
  

This table breaks down the essential components of the ranking functions. 
RANK.EQ is the modern equivalent of the legacy RANK 
function. Both work identically.

## Basic RANK.EQ Example

This example demonstrates the simplest use of RANK.EQ with a small dataset of 
test scores.

  
    A
    B
  
  
    Student
    Score
  
  
    Alice
    85
  
  
    Bob
    92
  
  
    Carol
    78
  
  
    Dave
    =RANK.EQ(B2, B2:B5)
  

The table shows student test scores with a RANK.EQ formula in cell B5 that 
ranks Dave's score relative to others. Higher scores get better (lower) ranks 
by default.

Basic RANK.EQ formula
  

=RANK.EQ(B2, B2:B5)

This formula ranks the value in B2 (85) against all values in B2:B5. The 
result will be 2, as 85 is the second highest score in the list. Ties receive 
the same rank.

## RANK.EQ with Descending Order

By default, RANK.EQ assigns rank 1 to the largest value. You can reverse this 
by setting the optional order argument to 1.

  
    A
    B
    C
  
  
    Product
    Price
    Rank
  
  
    Widget
    19.99
    =RANK.EQ(B2, B2:B5, 1)
  
  
    Gadget
    24.99
    
  
  
    Thingy
    14.99
    
  

This table demonstrates ranking prices in ascending order (lowest price gets 
rank 1). The order argument (1) changes the ranking direction from default.

RANK.EQ with ascending order
  

=RANK.EQ(B2, B2:B5, 1)

This formula ranks the price in B2 (19.99) in ascending order against B2:B5. 
The result will be 2, as it's the middle price. Setting order to 1 makes lower 
values rank higher.

## RANK.EQ with Ties

When values tie, RANK.EQ assigns them the same rank and skips subsequent ranks. 
This example shows how ties are handled.

  
    A
    B
    C
  
  
    Runner
    Time
    Rank
  
  
    Alice
    10.2
    =RANK.EQ(B2, B2:B5)
  
  
    Bob
    10.5
    
  
  
    Carol
    10.2
    
  
  
    Dave
    10.7
    
  

The table shows race times with two runners tying for first place. Both receive 
rank 1, and the next runner receives rank 3 (rank 2 is skipped).

RANK.EQ with tied values
  

=RANK.EQ(B2, B2:B5)

This formula ranks Alice's time (10.2) against all runners. Since Carol also 
has 10.2, both share rank 1. Bob's 10.5 gets rank 3, demonstrating how ties 
affect subsequent rankings.

## RANK.EQ with Non-Adjacent Ranges

RANK.EQ can work with non-adjacent cell ranges by using named ranges or union 
references. This example uses a named range.

  
    A
    B
    C
  
  
    Q1
    Q2
    Annual Rank
  
  
    1500
    1800
    =RANK.EQ(A2, AnnualSales)
  
  
    2200
    1900
    
  

The table assumes cells A2:B3 are named "AnnualSales". The RANK.EQ formula 
references this named range to rank Q1 sales against all quarterly sales data.

RANK.EQ with named range
  

=RANK.EQ(A2, AnnualSales)

This formula ranks the Q1 value (1500) against all values in the AnnualSales 
range (A2:B3). The result shows its position among all quarterly figures. 
Named ranges make formulas more readable.

## RANK.EQ with Filtered Data

RANK.EQ considers all values in the reference range, even if filtered out. 
This example demonstrates this behavior.

  
    A
    B
    C
  
  
    Region
    Sales
    Rank
  
  
    North
    5000
    =RANK.EQ(B2, B2:B5)
  
  
    South
    7500
    
  
  
    East
    6000
    
  
  
    West
    5000
    
  

Even if rows are filtered out, RANK.EQ still includes those values in ranking 
calculations. Here, North and West tie at 5000 sales, both receiving rank 3.

RANK.EQ with filtered data
  

=RANK.EQ(B2, B2:B5)

This formula ranks North's sales (5000) against all regions. The result is 3 
(shared with West), showing filtered data is still included in ranking 
calculations.

## RANK vs RANK.EQ vs RANK.AVG

Excel offers three ranking functions with subtle differences in handling ties. 
This comparison clarifies when to use each.

  
    Function
    Description
    Tie Handling
  
  
    RANK
    Legacy function
    Same as RANK.EQ
  
  
    RANK.EQ
    Current standard
    Gives same rank, skips next
  
  
    RANK.AVG
    Alternative
    Gives average rank for ties
  

This table compares Excel's ranking functions. RANK.EQ is the 
modern replacement for RANK, while RANK.AVG offers 
different tie-breaking behavior.

The RANK and RANK.EQ functions are powerful tools 
for data analysis in Excel. They help understand relative standing in datasets 
of any size. Remember that RANK.EQ is the current standard, while RANK is 
maintained for compatibility. For alternative tie handling, consider 
RANK.AVG.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).