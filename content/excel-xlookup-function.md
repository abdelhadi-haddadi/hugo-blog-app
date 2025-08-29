+++
title = "Excel XLOOKUP Function"
date = 2025-08-29T19:54:28.456+01:00
draft = false
description = "Complete tutorial on Excel XLOOKUP function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel XLOOKUP Function

last modified April 4, 2025

The XLOOKUP function is Excel's modern replacement for VLOOKUP and 
HLOOKUP. It provides more flexibility and simpler syntax for looking up values. 
This tutorial covers XLOOKUP comprehensively with detailed examples. You'll learn 
basic syntax, practical applications, and advanced techniques to master this 
powerful Excel function.

## XLOOKUP Function Basics

The XLOOKUP function searches a range or array for a match and 
returns corresponding items. It can search vertically or horizontally, making it 
versatile for various lookup scenarios.

  
    Component
    Description
  
  
    Function Name
    XLOOKUP
  
  
    Syntax
    =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
  
  
    Arguments
    3 required, 3 optional
  
  
    Return Value
    Matched value from return_array
  

This table breaks down the essential components of the XLOOKUP
function. It shows the function name, complete syntax format, argument 
requirements, and return value characteristics.

## Basic XLOOKUP Example

This example demonstrates the simplest use of XLOOKUP to find a product price.

  
    A
    B
    C
  
  
    Product
    Price
    
  
  
    Apple
    1.99
    
  
  
    Banana
    0.99
    
  
  
    Orange
    2.49
    
  
  
    
    
    =XLOOKUP("Banana", A2:A4, B2:B4)
  

The table shows a product list with prices. The XLOOKUP formula searches for 
"Banana" in column A and returns the corresponding price from column B.

Basic XLOOKUP formula
  

=XLOOKUP("Banana", A2:A4, B2:B4)

This formula looks for "Banana" in range A2:A4 and returns the matching value 
from B2:B4. The result will be 0.99. This demonstrates XLOOKUP's basic lookup 
functionality.

## XLOOKUP with If Not Found

XLOOKUP allows specifying a custom message when no match is found. This example 
shows this error handling feature.

  
    A
    B
    C
  
  
    Product
    Price
    
  
  
    Apple
    1.99
    
  
  
    Banana
    0.99
    
  
  
    
    
    =XLOOKUP("Pear", A2:A3, B2:B3, "Not found")
  

The table demonstrates XLOOKUP's ability to return a custom message when the 
lookup value doesn't exist in the lookup array.

XLOOKUP with if_not_found
  

=XLOOKUP("Pear", A2:A3, B2:B3, "Not found")

This formula searches for "Pear" in A2:A3. Since it's not found, it returns 
"Not found" instead of an error. This makes spreadsheets more user-friendly 
when dealing with missing data.

## XLOOKUP with Approximate Match

XLOOKUP can perform approximate matches, useful for finding closest values. This 
example demonstrates grade lookup based on score ranges.

  
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
    
  
  
    
    
    =XLOOKUP(85, A2:A6, B2:B6, , -1)
  

The table shows score ranges and corresponding grades. The XLOOKUP formula finds 
the closest match below 85 (match_mode -1) and returns the appropriate grade.

XLOOKUP with approximate match
  

=XLOOKUP(85, A2:A6, B2:B6, , -1)

This formula looks for 85 in A2:A6 and returns the grade from B2:B6. With 
match_mode -1, it finds the closest value less than or equal to 85 (80). The 
result is "B". This is useful for tiered calculations.

## XLOOKUP with Reverse Search

XLOOKUP can search from last to first, useful for finding the most recent 
entry. This example shows finding the latest price for a product.

  
    A
    B
    C
  
  
    Date
    Price
    
  
  
    1/1/2023
    1.99
    
  
  
    2/1/2023
    2.19
    
  
  
    3/1/2023
    1.99
    
  
  
    
    
    =XLOOKUP(1.99, B2:B4, A2:A4, , 0, -1)
  

The table contains dated price entries. The XLOOKUP formula searches from bottom 
to top (search_mode -1) to find the most recent occurrence of 1.99.

XLOOKUP with reverse search
  

=XLOOKUP(1.99, B2:B4, A2:A4, , 0, -1)

This formula searches for 1.99 in B2:B4 from bottom to top. It returns the date 
from A2:A4 for the last occurrence (3/1/2023). This is valuable for time-series 
data analysis.

## XLOOKUP with Wildcards

XLOOKUP supports wildcard characters (* and ?) for partial matches. This 
example demonstrates finding products with partial name matches.

  
    A
    B
    C
  
  
    Product
    Code
    
  
  
    Apple iPhone
    APL-001
    
  
  
    Samsung Galaxy
    SAM-002
    
  
  
    Google Pixel
    GGL-003
    
  
  
    
    
    =XLOOKUP("*Pixel*", A2:A4, B2:B4)
  

The table shows product names and codes. The XLOOKUP formula uses wildcards to 
find any product containing "Pixel" and return its code.

XLOOKUP with wildcards
  

=XLOOKUP("*Pixel*", A2:A4, B2:B4)

This formula searches for any product in A2:A4 containing "Pixel" (match_mode 2 
for wildcards) and returns the corresponding code from B2:B4. The result is 
"GGL-003". This enables flexible text searching.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).