+++
title = "Excel TEXTSPLIT Function"
date = 2025-08-29T19:54:22.869+01:00
draft = false
description = "Complete tutorial on Excel TEXTSPLIT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel TEXTSPLIT Function

last modified April 4, 2025

The TEXTSPLIT function is a powerful text manipulation tool in 
Excel that splits text strings into multiple cells based on specified delimiters. 
This tutorial provides a comprehensive guide to using TEXTSPLIT 
with detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master this essential Excel function.

## TEXTSPLIT Function Basics

The TEXTSPLIT function divides text into separate cells using 
delimiters you specify. It can split by columns, rows, or both. The function 
is particularly useful for parsing structured text data.

  
    Component
    Description
  
  
    Function Name
    TEXTSPLIT
  
  
    Syntax
    =TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])
  
  
    Required Arguments
    text, col_delimiter
  
  
    Optional Arguments
    row_delimiter, ignore_empty, match_mode, pad_with
  
  
    Return Value
    Array of split text values
  

This table breaks down the essential components of the TEXTSPLIT
function. It shows the function name, complete syntax format, argument 
requirements, and return value characteristics.

## Basic TEXTSPLIT Example

This example demonstrates the simplest use of TEXTSPLIT with a single delimiter 
to split text into columns.

Basic TEXTSPLIT formula
  

=TEXTSPLIT("Apple,Orange,Banana", ",")

This formula splits the text "Apple,Orange,Banana" at each comma. The result 
will be three cells: "Apple", "Orange", and "Banana". This shows the basic 
column-splitting capability.

## TEXTSPLIT with Multiple Delimiters

TEXTSPLIT can handle multiple delimiter characters simultaneously. Here's an 
example using both commas and semicolons.

  
    A
    B
    C
  
  
    Name:John;Age:30,City:NY
    
    
  
  
    
    =TEXTSPLIT(A1, {",",";"})
    
  

The table shows how TEXTSPLIT can split text using multiple delimiters. The 
formula in B2 splits the text at both commas and semicolons.

TEXTSPLIT with multiple delimiters
  

=TEXTSPLIT(A1, {",",";"})

This formula splits the text in A1 at both commas and semicolons. The result 
will be three cells: "Name:John", "Age:30", and "City:NY". The curly braces 
define an array of delimiters.

## TEXTSPLIT with Row and Column Delimiters

TEXTSPLIT can split text into both rows and columns when both delimiters are 
provided. This example demonstrates this powerful feature.

  
    A
    B
  
  
    Apple,Orange|Banana,Grape
    
  
  
    
    =TEXTSPLIT(A1, ",", "|")
  

This table demonstrates TEXTSPLIT's ability to create a 2D array from text. 
The comma splits columns while the pipe character splits rows.

TEXTSPLIT with row and column delimiters
  

=TEXTSPLIT(A1, ",", "|")

The formula splits A1 into a 2x2 array. First row: "Apple", "Orange". Second 
row: "Banana", "Grape". This is useful for parsing structured text data with 
both horizontal and vertical divisions.

## TEXTSPLIT with Ignore Empty

The ignore_empty parameter controls whether empty values between delimiters are 
included. This example shows both behaviors.

  
    A
    B
    C
  
  
    Red,,Green,,Blue
    
    
  
  
    
    =TEXTSPLIT(A1, ",", , FALSE)
    =TEXTSPLIT(A1, ",", , TRUE)
  

The table compares TEXTSPLIT with ignore_empty set to FALSE (B2) and TRUE (C2). 
This demonstrates how to handle consecutive delimiters differently.

TEXTSPLIT with ignore_empty parameter
  

=TEXTSPLIT(A1, ",", , FALSE)  // Includes empty values
=TEXTSPLIT(A1, ",", , TRUE)   // Skips empty values

The first formula returns 5 cells including two empty ones. The second formula 
returns only the three non-empty values. This parameter helps clean up messy 
data with extra delimiters.

## TEXTSPLIT with Match Mode

The match_mode parameter controls whether delimiters are case-sensitive. This 
example demonstrates both options.

  
    A
    B
    C
  
  
    Apple-orange-BANANA-grape
    
    
  
  
    
    =TEXTSPLIT(A1, "-", , , 0)
    =TEXTSPLIT(A1, "BANANA", , , 1)
  

The table shows TEXTSPLIT with different match_mode settings. B2 uses exact 
matching while C2 demonstrates case-insensitive matching with a text delimiter.

TEXTSPLIT with match_mode parameter
  

=TEXTSPLIT(A1, "-", , , 0)      // Exact match (default)
=TEXTSPLIT(A1, "BANANA", , , 1) // Case-insensitive match

The first formula splits at each hyphen. The second splits at "BANANA" 
regardless of case. Match_mode 1 enables case-insensitive delimiter matching 
which can be useful with text delimiters.

## TEXTSPLIT with Padding

When row splits create uneven columns, the pad_with parameter fills missing 
values. This example shows padding in action.

  
    A
    B
  
  
    Apple,Orange|Banana|Grape,Peach,Mango
    
  
  
    
    =TEXTSPLIT(A1, ",", "|", , , "N/A")
  

The table demonstrates how TEXTSPLIT handles uneven splits. The formula pads 
missing values with "N/A" to create a rectangular array output.

TEXTSPLIT with pad_with parameter
  

=TEXTSPLIT(A1, ",", "|", , , "N/A")

This creates a 3-row, 3-column array. First row: "Apple", "Orange", "N/A". 
Second row: "Banana", "N/A", "N/A". Third row: "Grape", "Peach", "Mango". 
Padding ensures consistent array dimensions.

## TEXTSPLIT with Dynamic Arrays

TEXTSPLIT works seamlessly with Excel's dynamic arrays. This example combines 
it with other functions for powerful text processing.

TEXTSPLIT with dynamic arrays
  

=LET(
    text, "First:John;Last:Smith;Age:30",
    pairs, TEXTSPLIT(text, ";"),
    keys, TEXTSPLIT(pairs, ":", , , 1),
    keys
)

This formula first splits the text by semicolons, then splits each resulting 
pair by colons (case-insensitive). The LET function makes the steps clear. 
Final output is a 3x2 array of key-value pairs.

## TEXTSPLIT vs. Traditional Methods

Before TEXTSPLIT, Excel users relied on combinations of LEFT, RIGHT, MID, and 
FIND functions to split text. This example compares both approaches.

  
    Method
    Formula
    Advantages
  
  
    TEXTSPLIT
    =TEXTSPLIT(A1, ",")
    Simple, handles multiple splits, dynamic array
  
  
    Traditional
    =LEFT(A1, FIND(",",A1)-1)
    Works in older Excel versions
  

The table highlights TEXTSPLIT's advantages over traditional text splitting 
methods. While older methods work, TEXTSPLIT is more powerful and readable.

## TEXTSPLIT Practical Application

This example shows a real-world application of TEXTSPLIT for parsing log files 
or CSV data imported as text.

Parsing log entries with TEXTSPLIT
  

=LET(
    log, "2023-05-15 14:30:22 [ERROR] ModuleA: Connection timeout",
    date_part, TEXTSPLIT(log, " "),
    level_msg, TEXTSPLIT(INDEX(date_part, 3), "] "),
    HSTACK(
        INDEX(date_part, 1),
        INDEX(date_part, 2),
        INDEX(level_msg, 1),
        INDEX(level_msg, 2)
    )
)

This formula processes a log entry into separate columns for date, time, error 
level, and message. It demonstrates TEXTSPLIT's power for data extraction and 
transformation tasks.

The TEXTSPLIT function revolutionizes text manipulation in Excel. 
From simple delimited text to complex parsing tasks, it handles text splitting 
with unprecedented flexibility. Mastering its parameters and combining it with 
other functions will significantly enhance your data processing capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).