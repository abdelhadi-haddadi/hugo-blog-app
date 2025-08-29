+++
title = "Excel EXACT Function"
date = 2025-08-29T19:54:03.743+01:00
draft = false
description = "Complete tutorial on Excel EXACT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel EXACT Function

last modified April 4, 2025

The EXACT function is a text comparison function in Excel that 
checks if two text strings are identical, including case sensitivity. This 
tutorial provides a comprehensive guide to using the EXACT 
function with detailed examples. You'll learn basic syntax, practical 
applications, and advanced techniques to master this essential Excel function.

## EXACT Function Basics

The EXACT function compares two text strings and returns TRUE if 
they are exactly the same, and FALSE if they are not. It is case-sensitive and 
considers spaces and formatting differences.

  
    Component
    Description
  
  
    Function Name
    EXACT
  
  
    Syntax
    =EXACT(text1, text2)
  
  
    Arguments
    Two text strings to compare
  
  
    Return Value
    TRUE if identical, FALSE if different
  

This table breaks down the essential components of the EXACT
function. It shows the function name, basic syntax format, argument 
requirements, and return value characteristics.

## Basic EXACT Example

This example demonstrates the simplest use of the EXACT function with direct 
text comparisons.

Basic EXACT formula
  

=EXACT("Excel", "Excel")

This formula compares two identical text strings "Excel" and returns TRUE. 
This shows how EXACT works with hard-coded values without cell references.

## EXACT with Case Sensitivity

EXACT is case-sensitive, distinguishing between uppercase and lowercase 
letters. This example demonstrates this behavior.

  
    A
    B
    C
  
  
    Excel
    excel
    =EXACT(A1,B1)
  

The table shows how EXACT handles case differences. Despite 
containing the same letters, "Excel" and "excel" are considered different 
because of their case.

EXACT with case sensitivity
  

=EXACT(A1,B1)

This formula compares "Excel" (A1) with "excel" (B1) and returns FALSE because 
of the case difference. This demonstrates EXACT's case-sensitive nature.

## EXACT with Numbers

EXACT can compare numbers formatted as text, but treats numbers and text 
representations differently. This example shows this behavior.

  
    A
    B
    C
  
  
    100
    "100"
    =EXACT(A1,B1)
  

The table demonstrates how EXACT handles numeric values versus 
text representations of numbers. Cell A1 contains the number 100, while B1 
contains the text "100".

EXACT with numbers vs. text
  

=EXACT(A1,B1)

This formula compares the number 100 (A1) with the text "100" (B1) and returns 
FALSE. EXACT considers different data types as non-identical, even if they 
look the same.

## EXACT with Leading/Trailing Spaces

EXACT detects differences in whitespace, including leading and trailing spaces. 
This example illustrates this behavior.

  
    A
    B
    C
  
  
    Data
    Data 
    =EXACT(A1,B1)
  

The table shows how EXACT handles whitespace differences. Cell A1 
contains "Data" while B1 contains "Data " with a trailing space.

EXACT with whitespace differences
  

=EXACT(A1,B1)

This formula compares "Data" (A1) with "Data " (B1) and returns FALSE because 
of the trailing space in B1. EXACT is sensitive to all character differences.

## EXACT in Conditional Formatting

EXACT can be used in conditional formatting rules to highlight cells matching 
specific criteria. This example demonstrates this application.

  
    A
    B
  
  
    Approved
    APPROVED
  
  
    Rejected
    rejected
  

Conditional formatting with EXACT
  

=EXACT(A1,"Approved")

This formula would be used in a conditional formatting rule to highlight cells 
in column A that exactly match "Approved" (case-sensitive). Only the first row 
would be highlighted in this example.

## EXACT with Data Validation

EXACT can be used in data validation to ensure case-sensitive input matches. 
This example shows how to implement this.

Data validation with EXACT
  

=EXACT(B1,"YES")

This formula would be used in data validation to require that cell B1 contains 
exactly "YES" in uppercase. Any variation (like "yes" or "Yes") would be 
rejected.

The EXACT function is essential for precise text comparisons in 
Excel. Its case-sensitive nature makes it valuable for quality control, data 
validation, and conditional formatting. While simple in concept, EXACT provides 
critical functionality that distinguishes it from regular equality operators.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).