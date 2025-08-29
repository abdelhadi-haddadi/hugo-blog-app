+++
title = "Excel CONCAT and TEXTJOIN Functions"
date = 2025-08-29T19:53:58.178+01:00
draft = false
description = "Complete tutorial on Excel CONCAT and TEXTJOIN functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel CONCAT and TEXTJOIN Functions

last modified April 4, 2025

The CONCAT and TEXTJOIN functions are powerful text
manipulation tools in Excel. They combine text from multiple cells or strings
with various options. This tutorial provides a comprehensive guide to using
these functions. You'll learn their syntax, differences, and practical
applications to master text concatenation in Excel.

## Function Basics

CONCAT and TEXTJOIN combine text strings but with
different capabilities. CONCAT simply joins items while TEXTJOIN offers more
control. Both are essential for text manipulation tasks in Excel.

  
    Function
    Description
    Syntax
  
  
    CONCAT
    Joins text items without delimiters
    =CONCAT(text1, [text2], ...)
  
  
    TEXTJOIN
    Joins text with specified delimiter
    =TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...)
  

This table compares the two functions. CONCAT is simpler while TEXTJOIN offers
delimiter control and empty cell handling. Both can combine text from ranges or
individual items.

## Basic CONCAT Example

This example demonstrates the simplest use of CONCAT to join text strings.

Basic CONCAT formula
  

=CONCAT("Hello", " ", "World")

This formula combines three text strings: "Hello", a space (" "), and "World".
The result is "Hello World". CONCAT joins them in order without any separators
unless explicitly included.

## CONCAT with Cell References

CONCAT is commonly used to combine text from different cells. Here's an example
with first and last names in separate cells.

  
    A
    B
    C
  
  
    John
    Doe
    
  
  
    
    
    =CONCAT(A1, " ", B1)
  

The table shows first name in A1 and last name in B1. The CONCAT formula in C2
combines them with a space separator to create a full name.

CONCAT with cell references
  

=CONCAT(A1, " ", B1)

This formula joins A1 ("John"), a space (" "), and B1 ("Doe"). The result is
"John Doe". Note the explicit space needed between names when using CONCAT.

## TEXTJOIN with Delimiter

TEXTJOIN simplifies concatenation when you need consistent separators. This
example joins address components with commas.

  
    A
    B
    C
    D
  
  
    123
    Main St
    Springfield
    
  
  
    
    
    
    =TEXTJOIN(", ", TRUE, A1:C1)
  

The table contains address parts in A1:C1. The TEXTJOIN formula combines them
with comma separators, creating a properly formatted address string.

TEXTJOIN with delimiter
  

=TEXTJOIN(", ", TRUE, A1:C1)

This formula joins the range A1:C1 using ", " as delimiter. The TRUE parameter
ignores empty cells. The result is "123, Main St, Springfield". TEXTJOIN
automatically inserts the delimiter between items.

## TEXTJOIN Ignoring Empty Cells

TEXTJOIN's ability to skip empty cells is powerful for dynamic data. This
example demonstrates this feature.

  
    A
    B
    C
    D
  
  
    Red
    
    Blue
    
  
  
    
    
    
    =TEXTJOIN("-", TRUE, A1:C1)
  

The table shows color values with an empty cell in B1. The TEXTJOIN formula
skips the empty cell when creating the joined string with "-" separators.

TEXTJOIN ignoring empty cells
  

=TEXTJOIN("-", TRUE, A1:C1)

This formula joins A1 ("Red") and C1 ("Blue") with "-", skipping empty B1. The
result is "Red-Blue". The TRUE parameter ensures empty cells don't create extra
delimiters.

## TEXTJOIN with Line Breaks

TEXTJOIN can create multi-line text by using CHAR(10) as delimiter. This
example combines text with line breaks.

  
    A
    B
    C
  
  
    First Item
    Second Item
    
  
  
    
    
    =TEXTJOIN(CHAR(10), TRUE, A1:B1)
  

The table contains two items in A1:B1. The TEXTJOIN formula combines them with
line breaks (CHAR(10)) between items. Wrap text must be enabled to display
properly.

TEXTJOIN with line breaks
  

=TEXTJOIN(CHAR(10), TRUE, A1:B1)

This formula joins A1 and B1 with line breaks. The result appears as two lines
in one cell when wrap text is enabled. CHAR(10) creates the line break
character in Windows Excel.

## CONCAT vs TEXTJOIN Comparison

While both functions combine text, they serve different purposes. CONCAT is
simpler while TEXTJOIN offers more control over the joining process.

  
    Feature
    CONCAT
    TEXTJOIN
  
  
    Delimiter control
    No
    Yes
  
  
    Empty cell handling
    Includes empty as ""
    Configurable
  
  
    Range support
    Yes
    Yes
  
  
    Excel version
    2016+
    2019+
  

This comparison table highlights key differences. TEXTJOIN is more flexible but
requires newer Excel versions. CONCAT is available in slightly older versions.

The CONCAT and TEXTJOIN functions are essential for
text manipulation in Excel. CONCAT provides simple joining while TEXTJOIN offers
delimiter control and empty cell handling. Mastering both will significantly
improve your text processing capabilities in spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).