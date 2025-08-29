+++
title = "Excel UNIQUE Function"
date = 2025-08-29T19:54:25.100+01:00
draft = false
description = "Complete tutorial on Excel UNIQUE function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel UNIQUE Function

last modified April 4, 2025

The UNIQUE function is a powerful dynamic array function in Excel. 
It extracts unique values from a range or array, removing duplicates. This 
tutorial provides a comprehensive guide to using UNIQUE with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master this essential Excel function.

## UNIQUE Function Basics

The UNIQUE function returns a list of unique values from a range. 
It can work with both vertical and horizontal arrays. The syntax is flexible 
with optional arguments for advanced use.

  
    Component
    Description
  
  
    Function Name
    UNIQUE
  
  
    Syntax
    =UNIQUE(array, [by_col], [exactly_once])
  
  
    Arguments
    array (required), by_col (optional), exactly_once (optional)
  
  
    Return Value
    Array of unique values
  

This table breaks down the essential components of the UNIQUE
function. It shows the function name, syntax format, arguments, and return 
value characteristics.

## Basic UNIQUE Example

This example demonstrates the simplest use of the UNIQUE function with a 
vertical range of values containing duplicates.

  
    A
    B
  
  
    Apple
    
  
  
    Orange
    
  
  
    Apple
    
  
  
    Banana
    
  
  
    Orange
    
  
  
    
    =UNIQUE(A1:A5)
  

The table shows a simple spreadsheet with duplicate values in column A and a 
UNIQUE formula in cell B6 that extracts unique values.

Basic UNIQUE formula
  

=UNIQUE(A1:A5)

This formula returns a vertical array of unique values from A1:A5. The result 
will be "Apple", "Orange", "Banana". The function automatically removes 
duplicate entries.

## UNIQUE with Horizontal Range

UNIQUE can work with horizontal ranges by using the by_col parameter. This 
example shows how to extract unique values from a row.

  
    A
    B
    C
    D
    E
  
  
    Red
    Blue
    Red
    Green
    Blue
  
  
    
    
    
    
    =UNIQUE(A1:E1, TRUE)
  

This table demonstrates UNIQUE's ability to work with horizontal data. The 
formula in E2 extracts unique values from the color names in row 1.

UNIQUE with horizontal range
  

=UNIQUE(A1:E1, TRUE)

This formula returns a horizontal array of unique values from A1:E1. The second 
argument TRUE tells Excel to compare columns rather than rows. The result will 
be "Red", "Blue", "Green".

## UNIQUE with Exactly Once Option

The exactly_once parameter lets you find values that appear only once in the 
source data. This example demonstrates this advanced feature.

  
    A
    B
  
  
    London
    
  
  
    Paris
    
  
  
    London
    
  
  
    Berlin
    
  
  
    Madrid
    
  
  
    Paris
    
  
  
    
    =UNIQUE(A1:A6, FALSE, TRUE)
  

The table shows city names with some appearing multiple times. The formula in 
B7 uses the exactly_once parameter to find cities listed only once.

UNIQUE with exactly_once
  

=UNIQUE(A1:A6, FALSE, TRUE)

This formula returns only values that appear exactly once in A1:A6. The result 
will be "Berlin" and "Madrid". London and Paris are excluded as they appear 
twice.

## UNIQUE with Multiple Columns

UNIQUE can extract unique combinations from multiple columns. This example shows 
how to get unique row combinations.

  
    A
    B
    C
  
  
    John
    Sales
    
  
  
    Mary
    IT
    
  
  
    John
    Sales
    
  
  
    Peter
    IT
    
  
  
    
    
    =UNIQUE(A1:B4)
  

The table contains employee names and departments with some duplicate 
combinations. The formula in C5 extracts unique name-department pairs.

UNIQUE with multiple columns
  

=UNIQUE(A1:B4)

This formula returns unique combinations from columns A and B. The result will 
be three rows: John-Sales, Mary-IT, and Peter-IT. The duplicate John-Sales row 
is removed.

## UNIQUE with SORT Combination

UNIQUE is often combined with SORT to return sorted unique values. This example 
shows this powerful combination.

  
    A
    B
  
  
    Zebra
    
  
  
    Apple
    
  
  
    Banana
    
  
  
    Apple
    
  
  
    Cat
    
  
  
    
    =SORT(UNIQUE(A1:A5))
  

The table contains unsorted values with duplicates. The formula in B6 first 
extracts unique values then sorts them alphabetically.

UNIQUE with SORT
  

=SORT(UNIQUE(A1:A5))

This nested formula first gets unique values from A1:A5, then sorts them. The 
result will be "Apple", "Banana", "Cat", "Zebra". This combination is useful 
for creating sorted unique lists.

## UNIQUE with FILTER Combination

UNIQUE can be combined with FILTER to extract unique values meeting specific 
criteria. This example demonstrates this advanced technique.

  
    A
    B
    C
  
  
    New York
    USA
    
  
  
    London
    UK
    
  
  
    Paris
    France
    
  
  
    Chicago
    USA
    
  
  
    Madrid
    Spain
    
  
  
    
    
    =UNIQUE(FILTER(A1:A5, B1:B5="USA"))
  

The table contains cities and countries. The formula in C6 extracts unique 
cities only from the USA by combining FILTER and UNIQUE.

UNIQUE with FILTER
  

=UNIQUE(FILTER(A1:A5, B1:B5="USA"))

This formula first filters column A for rows where column B equals "USA", then 
returns unique values from the filtered results. The output will be "New York" 
and "Chicago". This shows UNIQUE's power in data analysis scenarios.

The UNIQUE function is essential for data cleaning and analysis in 
Excel. From basic duplicate removal to advanced combinations with other 
functions, UNIQUE handles it all efficiently. Mastering its various applications 
will significantly improve your data processing skills. Remember that UNIQUE 
works dynamically, automatically updating when source data changes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).