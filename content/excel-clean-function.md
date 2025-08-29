+++
title = "Excel CLEAN Function"
date = 2025-08-29T19:53:58.186+01:00
draft = false
description = "Complete tutorial on Excel CLEAN function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel CLEAN Function

last modified April 4, 2025

The CLEAN function is a text function in Excel that removes 
non-printable characters from text. These characters often come from other 
applications or systems. This tutorial provides a comprehensive guide to using 
the CLEAN function with detailed examples. You'll learn its 
syntax, practical applications, and how to combine it with other functions.

## CLEAN Function Basics

The CLEAN function removes non-printable characters (ASCII codes 
0-31) from text. These characters can cause display issues or problems in data 
processing. The function is especially useful when importing data.

  
    Component
    Description
  
  
    Function Name
    CLEAN
  
  
    Syntax
    =CLEAN(text)
  
  
    Arguments
    text - The text to clean
  
  
    Return Value
    Text without non-printable characters
  

This table breaks down the essential components of the CLEAN
function. It shows the function name, basic syntax format, argument 
requirements, and return value characteristics.

## Basic CLEAN Example

This example demonstrates the simplest use of the CLEAN function with text 
containing non-printable characters.

Basic CLEAN formula
  

=CLEAN("Hello" &amp; CHAR(7) &amp; "World")

This formula combines "Hello" and "World" with ASCII character 7 (bell) between 
them. The CLEAN function removes this non-printable character. The result will 
be "HelloWorld".

## CLEAN with Imported Data

When importing data from external systems, non-printable characters often 
appear. Here's how to clean such data.

  
    A
    B
  
  
    Product ID
    
  
  
    P123■45
    =CLEAN(A2)
  
  
    X789▲12
    =CLEAN(A3)
  

The table shows imported product IDs containing non-printable characters 
(represented by ■ and ▲). The CLEAN function in column B removes these 
characters.

CLEAN with imported data
  

=CLEAN(A2)

This formula cleans the text in cell A2, removing any non-printable characters. 
For "P123■45", it returns "P12345". This is essential for data normalization.

## CLEAN with TRIM Combination

CLEAN can be combined with TRIM to remove both non-printable characters and 
extra spaces. This example shows this powerful combination.

  
    A
    B
  
  
      Data  with  issues  
    
  
  
    
    =TRIM(CLEAN(A1))
  

This table demonstrates cleaning text with both non-printable characters and 
extra spaces. The combined formula in B2 handles both issues simultaneously.

CLEAN with TRIM
  

=TRIM(CLEAN(A1))

This formula first removes non-printable characters with CLEAN, then eliminates 
extra spaces with TRIM. For "  Data  with  issues  ", it returns "Data with 
issues". This is ideal for data cleaning workflows.

## CLEAN with SUBSTITUTE for Advanced Cleaning

For comprehensive text cleaning, CLEAN can be combined with SUBSTITUTE to 
handle additional problematic characters.

  
    A
    B
  
  
    Text•with•special•chars
    
  
  
    
    =SUBSTITUTE(CLEAN(A1),"•"," ")
  

The table shows text with special bullet characters (•) that aren't removed by 
CLEAN. The formula combines CLEAN with SUBSTITUTE for complete cleaning.

CLEAN with SUBSTITUTE
  

=SUBSTITUTE(CLEAN(A1),"•"," ")

This formula first removes non-printable characters, then replaces bullets with 
spaces. For "Text•with•special•chars", it returns "Text with special chars". 
This technique handles characters beyond ASCII 0-31.

## CLEAN with Other Text Functions

CLEAN can be part of complex text manipulation formulas combined with functions 
like LEFT, RIGHT, and MID.

  
    A
    B
  
  
    123▲XYZ▲456
    
  
  
    
    =LEFT(CLEAN(A1),3)
  

The table demonstrates extracting clean text portions. The formula gets the 
first 3 characters after cleaning non-printable characters from the source.

CLEAN with LEFT
  

=LEFT(CLEAN(A1),3)

This formula cleans "123▲XYZ▲456" to "123XYZ456", then extracts the first 3 
characters ("123"). This approach is useful when working with fixed-format 
data containing control characters.

## CLEAN Limitations

While CLEAN is powerful, it has limitations. It only removes ASCII characters 
0-31. Unicode non-printing characters (like 127, 129, 141, etc.) remain.

  
    A
    B
  
  
    Text with Unicode char
    
  
  
    
    =CLEAN(A1)
  

The table shows that CLEAN won't remove certain Unicode characters. Additional 
cleaning steps would be needed for complete sanitization.

CLEAN limitation example
  

=CLEAN(A1)

If A1 contains Unicode control characters beyond ASCII 31, CLEAN won't remove 
them. For complete cleaning, you'd need additional functions or VBA macros to 
handle these characters.

The CLEAN function is essential for preparing text data in Excel. 
It efficiently removes troublesome non-printable characters that can disrupt 
data processing. While it has limitations with Unicode characters, combining it 
with other functions like TRIM and SUBSTITUTE creates powerful data cleaning 
solutions. Mastering CLEAN will significantly improve your data import and 
text processing workflows.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).