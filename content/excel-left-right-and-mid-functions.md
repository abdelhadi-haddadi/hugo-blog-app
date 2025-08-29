+++
title = "Excel LEFT, RIGHT, and MID Functions"
date = 2025-08-29T19:54:11.597+01:00
draft = false
description = "Complete tutorial on Excel LEFT, RIGHT, and MID functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel LEFT, RIGHT, and MID Functions

last modified April 4, 2025

The LEFT, RIGHT, and MID functions are 
essential text manipulation tools in Excel. They extract specific portions of 
text strings based on position. This tutorial provides a comprehensive guide to 
using these functions with detailed examples. You'll learn basic syntax, 
practical applications, and advanced techniques to master these text functions.

## Function Basics

These functions extract substrings from text values. LEFT gets 
characters from the start, RIGHT from the end, and MID 
from any position. They're invaluable for parsing structured text data.

  
    Function
    Description
    Syntax
  
  
    LEFT
    Extracts characters from the start
    =LEFT(text, [num_chars])
  
  
    RIGHT
    Extracts characters from the end
    =RIGHT(text, [num_chars])
  
  
    MID
    Extracts characters from middle
    =MID(text, start_num, num_chars)
  

This table summarizes the three text extraction functions. All require at least 
one text argument and return a substring based on position parameters. Optional 
arguments are shown in brackets.

## Basic LEFT Function Example

This example demonstrates extracting the first 3 characters from a text string 
using the LEFT function.

Basic LEFT formula
  

=LEFT("Excel Functions", 3)

This formula extracts the first 3 characters from "Excel Functions". The result 
is "Exc". When num_chars is omitted, LEFT returns just the first character.

## Extracting File Extensions with RIGHT

The RIGHT function is perfect for getting file extensions from filenames. This 
example shows how to extract the last 3 characters (assuming .txt extension).

  
    A
    B
  
  
    document.txt
    =RIGHT(A1, 3)
  
  
    report.pdf
    =RIGHT(A2, 3)
  

The table shows filenames in column A and RIGHT formulas in column B extracting 
the last 3 characters. This works well for consistent extensions like .txt.

RIGHT for file extensions
  

=RIGHT(A1, 3)

This formula returns "txt" when A1 contains "document.txt". For variable-length 
extensions, you'd need to combine with FIND to locate the dot position.

## Extracting Middle Names with MID

The MID function extracts text from any position. This example gets middle names 
from full names assuming a fixed format.

  
    A
    B
  
  
    John Michael Doe
    =MID(A1, 6, 7)
  
  
    Jane Ann Smith
    =MID(A2, 6, 3)
  

The table demonstrates MID extracting middle names by position. This approach 
works when names follow a consistent first-middle-last structure with spaces.

MID for middle names
  

=MID(A1, 6, 7)

This formula extracts 7 characters starting at position 6 from "John Michael 
Doe", returning "Michael". For real-world data, you'd need more flexible 
position finding.

## Combining LEFT and FIND to Extract First Names

This advanced example combines LEFT with FIND to dynamically extract first 
names regardless of length by locating the first space.

LEFT with FIND
  

=LEFT(A1, FIND(" ", A1)-1)

The formula finds the first space position, then extracts all characters before 
it. For "Sarah Johnson" in A1, FIND returns 6, so LEFT gets 5 characters.

## Extracting Area Codes with MID and FIND

This example uses MID with FIND to extract area codes from phone numbers, 
demonstrating flexible text parsing.

  
    A
    B
  
  
    (555) 123-4567
    =MID(A1, 2, 3)
  
  
    (800) 555-1212
    =MID(A2, 2, 3)
  

The table shows phone numbers in column A and MID formulas extracting the 3-digit 
area codes. This works for consistently formatted numbers with parentheses.

MID for area codes
  

=MID(A1, 2, 3)

This formula starts at position 2 (after opening parenthesis) and extracts 3 
characters. For "(555) 123-4567", it returns "555". The approach assumes 
standard phone number formatting.

## Handling Variable-Length Text with RIGHT

This example shows how to use RIGHT with LEN to extract the last word from 
sentences of varying lengths.

RIGHT with LEN and FIND
  

=RIGHT(A1, LEN(A1)-FIND("*", SUBSTITUTE(A1, " ", "*", LEN(A1)-LEN(SUBSTITUTE(A1, " ", "")))))

This complex formula finds the last space position using SUBSTITUTE, then uses 
RIGHT to get all text after it. For "The quick brown fox", it returns "fox".

The LEFT, RIGHT, and MID functions are 
powerful tools for text manipulation in Excel. From simple extractions to 
complex parsing tasks, they form the foundation of text processing. Mastering 
their combinations with other functions like FIND and LEN will significantly 
enhance your data cleaning and preparation capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).