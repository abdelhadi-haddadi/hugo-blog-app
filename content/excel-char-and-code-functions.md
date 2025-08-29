+++
title = "Excel CHAR and CODE Functions"
date = 2025-08-29T19:53:57.040+01:00
draft = false
description = "Complete tutorial on Excel CHAR and CODE functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel CHAR and CODE Functions

last modified April 4, 2025

The CHAR and CODE functions are essential text 
functions in Excel that work with character encoding. CHAR 
returns the character for a given ASCII code, while CODE does 
the reverse. This tutorial provides a comprehensive guide to using these 
functions with detailed examples. You'll learn their syntax, practical 
applications, and advanced techniques.

## CHAR and CODE Function Basics

The CHAR function returns the character specified by a number 
in the ASCII character set. The CODE function returns the 
numeric ASCII code for the first character of a text string.

  
    Function
    Description
    Syntax
  
  
    CHAR
    Returns character for ASCII code
    =CHAR(number)
  
  
    CODE
    Returns ASCII code for character
    =CODE(text)
  

This table shows the basic characteristics of both functions. CHAR 
takes a number (1-255) and returns the corresponding character. CODE 
takes a text string and returns the code of its first character.

## Basic CHAR Example

This example demonstrates the simplest use of the CHAR function to return 
common characters.

Basic CHAR formula
  

=CHAR(65)

This formula returns the uppercase letter "A", which has ASCII code 65. 
The CHAR function is useful for generating specific characters when you 
know their ASCII codes.

## Basic CODE Example

This example shows how to use the CODE function to find ASCII codes for 
characters.

Basic CODE formula
  

=CODE("A")

This formula returns 65, the ASCII code for uppercase "A". CODE only looks 
at the first character of the input string, making it useful for analyzing 
single characters.

## Generating Special Characters

CHAR is often used to insert special characters that aren't readily available 
on keyboards. This example shows how to create line breaks in cells.

  
    A
    B
  
  
    First line
    
  
  
    Second line
    
  
  
    
    =A1 &amp; CHAR(10) &amp; A2
  

The table demonstrates combining text with CHAR(10) to create a line break. 
Note that you must enable "Wrap Text" for the cell to display properly.

Creating line breaks with CHAR
  

="Line 1" &amp; CHAR(10) &amp; "Line 2"

This formula combines two text strings with a line break character (ASCII 10) 
between them. The result will display as two lines in one cell when wrap text 
is enabled.

## Analyzing Character Codes

CODE can help analyze and compare characters. This example shows how to check 
if a character is uppercase.

  
    A
    B
  
  
    M
    
  
  
    m
    
  
  
    
    =CODE(A1) &amp; " vs " &amp; CODE(A2)
  

The table compares ASCII codes for uppercase and lowercase "M". This 
demonstrates how CODE can reveal case differences in characters.

Comparing character codes
  

=IF(AND(CODE(A1)&gt;=65, CODE(A1)&lt;=90), "Uppercase", "Not uppercase")

This formula checks if the character in A1 is uppercase by verifying its 
ASCII code falls between 65 (A) and 90 (Z). It returns "Uppercase" if true.

## Creating Custom Formats

CHAR can help create custom text formats by inserting special characters. 
This example shows how to add bullet points.

  
    A
    B
  
  
    Item 1
    
  
  
    Item 2
    
  
  
    
    =CHAR(149) &amp; " " &amp; A1 &amp; CHAR(10) &amp; CHAR(149) &amp; " " &amp; A2
  

The table demonstrates creating a bulleted list using CHAR(149) for bullet 
points and CHAR(10) for line breaks between items.

Creating bullet points with CHAR
  

=CHAR(149) &amp; " First item" &amp; CHAR(10) &amp; CHAR(149) &amp; " Second item"

This formula creates a two-item bulleted list in one cell. CHAR(149) produces 
a bullet point, and CHAR(10) adds line breaks between items. Wrap text must 
be enabled.

## Generating Alphabet Sequences

CHAR can generate alphabet sequences using the codes for A-Z (65-90) and a-z 
(97-122). This example creates an uppercase alphabet sequence.

  
    A
    B
  
  
    1
    
  
  
    2
    
  
  
    3
    
  
  
    
    =CHAR(64+A1) &amp; "-" &amp; CHAR(64+A2) &amp; "-" &amp; CHAR(64+A3)
  

The table shows how to convert numbers to corresponding letters by adding 64 
(ASCII offset for A-Z) and using CHAR. This creates a letter sequence from 
numbers.

Generating letters from numbers
  

=CHAR(64+ROW())

This formula generates letters corresponding to row numbers (A in row 1, B in 
row 2, etc.). It's useful for creating dynamic column headers or labels.

## Cleaning Non-Printable Characters

CODE can help identify and clean non-printable characters in imported data. 
This example shows how to detect them.

  
    A
    B
  
  
    Data�
    
  
  
    
    =CODE(RIGHT(A1,1))
  

The table demonstrates using CODE to identify a non-printable character at 
the end of a string. The formula returns the ASCII code of the last character.

Identifying non-printable characters
  

=IF(CODE(RIGHT(A1,1))&lt;32, "Contains control character", "Clean")

This formula checks if the last character in A1 has an ASCII code below 32 
(non-printable). It returns a message if control characters are detected.

## Creating Password Complexity Checks

CODE can help enforce password complexity by checking for mixed character 
types. This example verifies uppercase letters.

  
    A
    B
  
  
    PassWord1
    
  
  
    
    =SUMPRODUCT(--(CODE(MID(A1,ROW(INDIRECT("1:"&amp;LEN(A1))),1))&gt;=65, 
        --(CODE(MID(A1,ROW(INDIRECT("1:"&amp;LEN(A1))),1))&lt;=90))&gt;0
  

The table shows a complex formula that checks if a password contains at least 
one uppercase letter by examining each character's ASCII code.

Checking for uppercase letters
  

=SUMPRODUCT(--(CODE(MID(A1,ROW(INDIRECT("1:"&amp;LEN(A1))),1))&gt;=65),
 --(CODE(MID(A1,ROW(INDIRECT("1:"&amp;LEN(A1))),1))&lt;=90))&gt;0

This array formula returns TRUE if the text in A1 contains at least one 
uppercase letter (ASCII 65-90). It demonstrates advanced use of CODE for 
text analysis.

The CHAR and CODE functions are powerful tools for 
working with character data in Excel. From generating special characters to 
analyzing text composition, they enable precise character-level manipulation. 
Mastering these functions will enhance your ability to clean, format, and 
analyze text data efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).