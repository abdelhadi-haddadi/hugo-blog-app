+++
title = "Excel MATCH Function"
date = 2025-08-29T19:54:12.709+01:00
draft = false
description = "Complete tutorial on Excel MATCH function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel MATCH Function

last modified April 4, 2025

The MATCH function searches for a specified item in a range of
cells and returns its relative position. This powerful lookup function is often
combined with INDEX for advanced lookups. This tutorial covers
MATCH syntax, match types, practical examples, and common uses.

## MATCH Function Basics

MATCH locates the position of a lookup value within a range. Unlike
VLOOKUP, it returns the position rather than the value itself. This makes it
more flexible for dynamic lookups.

  
    Component
    Description
  
  
    Function Name
    MATCH
  
  
    Syntax
    =MATCH(lookup_value, lookup_array, [match_type])
  
  
    Arguments
    lookup_value (required), lookup_array (required), match_type (optional)
  
  
    Return Value
    Position of match within lookup_array
  

This table outlines the MATCH function components. The match_type
argument controls whether MATCH finds exact or approximate matches.

## Exact Match (0)

Setting match_type to 0 forces an exact match. This is the most common use of 
MATCH and works similarly to VLOOKUP's exact match.

  
    A
    B
  
  
    Apple
    
  
  
    Banana
    
  
  
    Cherry
    
  
  
    Date
    
  
  
    
    =MATCH("Banana",A1:A4,0)
  

The table demonstrates an exact match search for "Banana" in the fruit list. 
The result will be 2, as Banana is the second item in the range.

Exact match examples
  

=MATCH("Cherry",A1:A4,0)  // Returns 3
=MATCH("Grape",A1:A4,0)   // Returns #N/A (not found)
=MATCH("banana",A1:A4,0)   // Returns #N/A (case-sensitive)

Exact matches require identical values (including case for text). Use
IFERROR to handle #N/A results when values might not exist in the
lookup array.

## Approximate Match (1)

Match_type 1 finds the largest value less than or equal to the lookup value. 
The lookup array must be sorted in ascending order.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    30
    
  
  
    40
    
  
  
    
    =MATCH(25,A1:A4,1)
  

The table shows an approximate match for 25 in a sorted list. The result is 2 
because 20 is the largest value ≤ 25.

Approximate match examples
  

=MATCH(35,A1:A4,1)  // Returns 3 (30 ≤ 35)
=MATCH(5,A1:A4,1)   // Returns #N/A (below first value)
=MATCH(100,A1:A4,1) // Returns 4 (40 ≤ 100)

Approximate matches are useful for grading scales, tax brackets, and other 
range-based lookups. Always ensure data is sorted ascending for correct results.

## Reverse Approximate Match (-1)

Match_type -1 finds the smallest value greater than or equal to the lookup 
value. The lookup array must be sorted in descending order.

  
    A
    B
  
  
    40
    
  
  
    30
    
  
  
    20
    
  
  
    10
    
  
  
    
    =MATCH(25,A1:A4,-1)
  

This table shows a reverse approximate match for 25 in a descending list. The 
result is 3 because 20 is the smallest value ≥ 25.

Reverse approximate match examples
  

=MATCH(35,A1:A4,-1)  // Returns 2 (30 ≥ 35)
=MATCH(5,A1:A4,-1)   // Returns 4 (10 ≥ 5)
=MATCH(100,A1:A4,-1) // Returns #N/A (above first value)

Reverse matches are less common but useful for certain financial calculations 
and reverse-sorted data sets. Remember the different sort requirement vs. 
match_type 1.

## MATCH with Wildcards

MATCH supports wildcards (*, ?, ~) for partial text matching when using exact 
match (0). This enables flexible text searches.

  
    A
    B
  
  
    Apple
    
  
  
    Banana
    
  
  
    Cherry
    
  
  
    Date
    
  
  
    
    =MATCH("B*",A1:A4,0)
  

The table demonstrates a wildcard search for text starting with "B". The 
result is 2 (Banana). Wildcards only work with text values.

Wildcard match examples
  

=MATCH("*rry",A1:A4,0)  // Returns 3 (Cherry)
=MATCH("?ate",A1:A4,0)  // Returns 4 (Date)
=MATCH("~*",A1:A4,0)    // Searches for literal *

The asterisk (*) matches any sequence of characters, while the question mark 
(?) matches any single character. Use tilde (~) to escape wildcards.

## INDEX-MATCH Combination

MATCH is often paired with INDEX to create more
flexible lookups than VLOOKUP. This combination can look left and
handle dynamic column references.

  
    A
    B
    C
  
  
    Apple
    Red
    
  
  
    Banana
    Yellow
    
  
  
    Cherry
    Red
    
  
  
    
    
    =INDEX(B1:B3,MATCH("Banana",A1:A3,0))
  

The table shows INDEX-MATCH finding the color of "Banana". MATCH locates the 
row (2), and INDEX returns the corresponding color from column B ("Yellow").

INDEX-MATCH examples
  

=INDEX(B1:B10,MATCH(D1,A1:A10,0))  // Basic lookup
=INDEX(A1:Z100,MATCH(D1,A1:A100,0),MATCH(E1,A1:Z1,0)) // 2-way lookup
=INDEX(B1:B10,MATCH(1,(A1:A10=D1)*(C1:C10=D2),0)) // Multi-criteria

INDEX-MATCH is more flexible than VLOOKUP because it
can look left, right, or anywhere in the sheet. The last example shows array
formula syntax for multiple criteria (entered with Ctrl+Shift+Enter in older
Excel).

## MATCH with Dynamic Ranges

MATCH works well with dynamic named ranges and tables. This example uses 
MATCH to find the last non-empty cell in a column.

  
    A
    B
  
  
    Data1
    
  
  
    Data2
    
  
  
    Data3
    
  
  
    
    
  
  
    
    =MATCH(REPT("z",255),A:A)
  

The table demonstrates finding the last text entry in column A. The formula
returns 3, the position of "Data3". REPT creates a text value
guaranteed to be "larger" than any real data.

Dynamic range examples
  

=MATCH(9.9E+307,A:A)  // Last number in column
=MATCH(2,1/(A1:A100&lt;&gt;"")) // Last non-empty (array formula)
=MATCH(TRUE,INDEX(ISBLANK(A:A),0),0)-1 // Last non-blank

These techniques help create dynamic ranges that automatically adjust as data 
changes. The second example is an array formula that finds the last non-empty 
cell regardless of data type.

## Common Errors and Solutions

MATCH can return errors for various reasons. This table explains
common issues and their solutions.

  
    Error
    Cause
    Solution
  
  
    #N/A
    Value not found
    Use IFERROR or check data
  
  
    #VALUE!
    Invalid match_type
    Use 0, 1, or -1
  
  
    Incorrect result
    Unsorted data
    Sort for approximate matches
  
  
    #N/A with wildcards
    Numbers in lookup_array
    Convert numbers to text
  

This troubleshooting table helps diagnose MATCH function problems. Most issues 
stem from unsorted data, incorrect match types, or type mismatches between 
lookup values and the lookup array.

## MATCH vs. Other Lookup Functions

MATCH has unique advantages compared to other lookup functions. This table 
compares their features.

  
    Function
    Returns
    Flexibility
    Best For
  
  
    MATCH
    Position
    High (works with INDEX)
    Dynamic column references
  
  
    VLOOKUP
    Value
    Medium
    Simple vertical lookups
  
  
    HLOOKUP
    Value
    Medium
    Horizontal lookups
  
  
    XLOOKUP
    Value
    High
    Modern Excel versions
  

This comparison shows MATCH's unique position as a position-finding function. 
While newer functions like XLOOKUP offer similar flexibility, MATCH remains 
essential for complex scenarios and compatibility with older Excel versions.

The MATCH function is a versatile tool for finding data positions in Excel. 
Whether used alone or with INDEX, it enables powerful, dynamic lookups. 
Mastering MATCH opens up advanced data analysis possibilities beyond basic 
lookup functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel tutorials](/all/#excel).