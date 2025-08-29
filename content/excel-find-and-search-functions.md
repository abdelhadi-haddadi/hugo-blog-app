+++
title = "Excel FIND and SEARCH Functions"
date = 2025-08-29T19:54:04.871+01:00
draft = false
description = "Complete tutorial on Excel FIND and SEARCH functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel FIND and SEARCH Functions

last modified April 4, 2025

The FIND and SEARCH functions are essential text 
functions in Excel that locate substrings within text. While similar, they 
differ in case sensitivity and wildcard handling. This tutorial provides a 
comprehensive guide to using both functions with detailed examples. You'll 
learn their syntax, differences, and practical applications for text 
processing in Excel.

## FIND/SEARCH Function Basics

The FIND and SEARCH functions locate the position 
of a substring within text. FIND is case-sensitive while 
SEARCH is not. Both return the starting position of the found 
text.

  
    Function
    Case-Sensitive
    Wildcards
    Syntax
  
  
    FIND
    Yes
    No
    =FIND(find_text, within_text, [start_num])
  
  
    SEARCH
    No
    Yes
    =SEARCH(find_text, within_text, [start_num])
  

This table compares the key differences between FIND and 
SEARCH. Both functions take similar arguments but behave 
differently with case sensitivity and wildcard support.

## Basic FIND Example

This example demonstrates the simplest use of the FIND function to locate a 
substring within text.

Basic FIND formula
  

=FIND("n", "Excel")

This formula searches for "n" in "Excel". It returns 4 because "n" is the 
4th character. FIND is case-sensitive, so searching for "N" would return an 
error.

## Basic SEARCH Example

This example shows the SEARCH function locating a substring while ignoring 
case differences.

  
    A
    B
  
  
    Excel Functions
    
  
  
    
    =SEARCH("fun", A1)
  

The table shows how SEARCH finds "fun" in "Excel Functions" regardless of 
case. Unlike FIND, SEARCH would also find "FUN" or "Fun" in the same text.

SEARCH formula
  

=SEARCH("fun", A1)

This formula returns 7 because "fun" starts at the 7th character (counting 
the space). SEARCH ignores case, making it more flexible for many text 
search scenarios.

## FIND with Start Position

Both functions allow specifying a starting position for the search. This 
example shows FIND with a start position parameter.

  
    A
    B
  
  
    banana
    
  
  
    
    =FIND("a", A1, 4)
  

The table demonstrates using FIND's third argument to start searching from 
the 4th character. This skips the first "a" at position 2 and finds the 
next one.

FIND with start position
  

=FIND("a", A1, 4)

This formula returns 6 because it finds "a" at position 6 when starting the 
search from position 4. The start position is useful for finding subsequent 
matches.

## SEARCH with Wildcards

SEARCH supports wildcards: ? for single characters and * for any sequence. 
This example demonstrates wildcard usage.

  
    A
    B
  
  
    Excel 2023
    
  
  
    Excel 365
    
  
  
    
    =SEARCH("Excel ?", A1)
  

The table shows SEARCH using the ? wildcard to match any single character 
after "Excel ". This finds the space and following digit in version numbers.

SEARCH with wildcard
  

=SEARCH("Excel ?", A1)

This formula returns 1 because the pattern matches starting at the first 
character. The ? wildcard matches any single character (like the space 
before the year).

## Error Handling with FIND/SEARCH

Both functions return #VALUE! if the text isn't found. This example shows 
how to handle errors gracefully.

Error handling with IFERROR
  

=IFERROR(FIND("z", "Excel"), "Not found")

This formula returns "Not found" instead of an error when "z" isn't in 
"Excel". Wrapping FIND/SEARCH in IFERROR makes your formulas more robust 
against missing text.

## Extracting Text After a Character

Combining FIND/SEARCH with MID or RIGHT lets you extract text after a 
specific character. This example demonstrates this technique.

  
    A
    B
  
  
    name@example.com
    
  
  
    
    =MID(A1, FIND("@", A1)+1, 100)
  

The table shows how to extract the domain from an email address by finding 
the @ position and taking everything after it. The 100 is an arbitrary 
large number to capture all remaining text.

Extracting domain from email
  

=MID(A1, FIND("@", A1)+1, 100)

This formula finds the @ position, then extracts text starting one character 
after it. The result would be "example.com". This pattern is useful for 
parsing structured text.

## Finding Second Occurrence

To find subsequent occurrences, use FIND/SEARCH with the previous position. 
This example locates the second space in text.

Finding second occurrence
  

=FIND(" ", A1, FIND(" ", A1)+1)

This formula first finds the first space, then searches again starting after 
that position to find the second space. The technique can be extended to 
find any nth occurrence.

## Case-Sensitive Search with FIND

When case matters, FIND is essential. This example shows case-sensitive 
searching for proper nouns.

  
    A
    B
  
  
    MacDonald
    
  
  
    macdonald
    
  
  
    
    =FIND("Mac", A1)
  

The table demonstrates FIND's case sensitivity. It will find "Mac" in 
"MacDonald" but not in "macdonald", while SEARCH would find both.

Case-sensitive search
  

=FIND("Mac", A1)

This formula returns 1 for "MacDonald" but #VALUE! for "macdonald". Use 
FIND when case matters, like distinguishing "Mac" from "mac" in names.

## Combining FIND with LEFT/RIGHT/MID

FIND/SEARCH are often combined with text extraction functions. This example 
extracts text between parentheses.

Extracting text between parentheses
  

=MID(A1, FIND("(", A1)+1, FIND(")", A1)-FIND("(", A1)-1)

This formula finds both parentheses positions and extracts text between them. 
For "(example)", it returns "example". This pattern is useful for parsing 
structured text.

## Finding Multiple Possible Values

Use SEARCH with an array constant to check for multiple possible substrings. 
This example checks for common file extensions.

Searching for multiple values
  

=IF(SUM(--ISNUMBER(SEARCH({".doc",".xls",".ppt"}, A1))&gt;0, "Office", "Other")

This formula checks if A1 contains any Office file extension. SEARCH returns 
an array of results, and ISNUMBER converts them to TRUE/FALSE for counting.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).