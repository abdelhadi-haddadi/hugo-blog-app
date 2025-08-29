+++
title = "Excel SUBSTITUTE and REPLACE Functions"
date = 2025-08-29T19:54:20.604+01:00
draft = false
description = "Complete tutorial on Excel SUBSTITUTE and REPLACE functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SUBSTITUTE and REPLACE Functions

last modified April 4, 2025

The SUBSTITUTE and REPLACE functions are powerful
text manipulation tools in Excel. They allow you to modify text strings by
replacing specific characters or substrings. This tutorial provides a
comprehensive guide to using these functions with detailed examples.

## Function Basics

SUBSTITUTE replaces specific text in a string, while
REPLACE changes text at a specific position. Both are essential
for text processing in Excel.

  
    Function
    Syntax
    Description
  
  
    SUBSTITUTE
    =SUBSTITUTE(text, old_text, new_text, [instance_num])
    Replaces specific text occurrences
  
  
    REPLACE
    =REPLACE(old_text, start_num, num_chars, new_text)
    Replaces text at specific position
  

The key difference is that SUBSTITUTE works with text content,
while REPLACE works with text position. Choose based on your needs.

## Basic SUBSTITUTE Example

This example demonstrates replacing a specific word in a text string.

Basic SUBSTITUTE formula
  

=SUBSTITUTE("Hello World", "World", "Excel")

This formula replaces "World" with "Excel" in the string "Hello World". The
result will be "Hello Excel". This shows the simplest use of SUBSTITUTE.

## SUBSTITUTE with Instance Number

SUBSTITUTE can target specific occurrences of text using the instance_num
parameter. This example replaces only the second space in a string.

SUBSTITUTE with instance number
  

=SUBSTITUTE("A B C D", " ", "-", 2)

This formula replaces only the second space in "A B C D" with a hyphen. The
result will be "A B-C D". The instance_num parameter makes this precise.

## Basic REPLACE Example

This example shows how to replace characters at a specific position in a string.

Basic REPLACE formula
  

=REPLACE("ABCDEFG", 3, 2, "XY")

The formula replaces 2 characters starting at position 3 in "ABCDEFG" with "XY".
The result will be "ABXYEFG". REPLACE works by position, not content.

## REPLACE with Cell Reference

This example demonstrates REPLACE with a cell reference and dynamic positions.

  
    A
    B
  
  
    Product123
    
  
  
    
    =REPLACE(A1, 8, 3, "456")
  

The table shows how to replace part of a product code in cell A1. The formula
in B2 replaces 3 characters starting at position 8 with "456".

REPLACE with cell reference
  

=REPLACE(A1, 8, 3, "456")

If A1 contains "Product123", this formula changes it to "Product456". REPLACE
is ideal for structured data like codes where position matters.

## Nested SUBSTITUTE Example

Multiple SUBSTITUTE functions can be nested to perform several replacements.
This example replaces multiple special characters in a string.

Nested SUBSTITUTE formula
  

=SUBSTITUTE(SUBSTITUTE("A*B#C", "*", "-"), "#", " ")

This formula first replaces "*" with "-", then "#" with a space. The result is
"A-B C". Nesting allows multiple replacements in one formula.

The SUBSTITUTE and REPLACE functions are essential
for text manipulation in Excel. SUBSTITUTE is best when you know the text to
replace, while REPLACE excels when you know the position. Mastering both will
greatly enhance your text processing capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).