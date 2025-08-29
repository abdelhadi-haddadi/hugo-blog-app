+++
title = "Excel ADDRESS Function"
date = 2025-08-29T19:53:54.825+01:00
draft = false
description = "Complete tutorial on Excel ADDRESS function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel ADDRESS Function

last modified April 4, 2025

The ADDRESS function creates a cell reference as text, given 
specific row and column numbers. This tutorial provides a comprehensive guide 
to using the ADDRESS function with detailed examples. You'll learn 
basic syntax, practical applications, and advanced techniques to master this 
useful Excel function.

## ADDRESS Function Basics

The ADDRESS function returns a cell address as text based on 
specified row and column numbers. It's particularly useful for creating 
dynamic references in formulas. The syntax includes several optional arguments.

  
    Component
    Description
  
  
    Function Name
    ADDRESS
  
  
    Syntax
    =ADDRESS(row_num, column_num, [abs_num], [a1], [sheet_text])
  
  
    Arguments
    row_num, column_num required; others optional
  
  
    Return Value
    Text string of cell reference
  

This table breaks down the essential components of the ADDRESS
function. It shows the function name, complete syntax format, argument 
requirements, and return value characteristics.

## Basic ADDRESS Example

This example demonstrates the simplest use of the ADDRESS function with just 
row and column numbers.

Basic ADDRESS formula
  

=ADDRESS(5, 3)

This formula creates a reference to cell C5 (row 5, column 3). The result will 
be "$C$5" in absolute reference format. This shows ADDRESS's core functionality.

## ADDRESS with Relative References

The third argument controls reference style. This example shows how to create 
relative references instead of absolute ones.

  
    Reference Type
    abs_num Value
    Example Result
  
  
    Absolute
    1 (default)
    $A$1
  
  
    Row absolute
    2
    A$1
  
  
    Column absolute
    3
    $A1
  
  
    Relative
    4
    A1
  

The table explains the four reference styles controlled by the abs_num argument. 
Each style determines which parts of the reference remain fixed when copied.

ADDRESS with relative reference
  

=ADDRESS(10, 2, 4)

This formula creates a relative reference to cell B10 (row 10, column 2). The 
result will be "B10" without dollar signs. This is useful for dynamic formulas.

## ADDRESS with R1C1 Reference Style

The fourth argument controls A1 vs R1C1 reference style. This example shows 
R1C1 format output.

  
    Style
    a1 Value
    Example Input
    Example Output
  
  
    A1
    TRUE (default)
    =ADDRESS(5,3)
    $C$5
  
  
    R1C1
    FALSE
    =ADDRESS(5,3,,FALSE)
    R5C3
  

This table compares the two reference styles available in Excel. The R1C1 style 
directly shows row and column numbers, which some users prefer.

ADDRESS with R1C1 style
  

=ADDRESS(7, 4, 1, FALSE)

This formula creates an absolute reference to cell D7 in R1C1 format. The 
result will be "R7C4". This style can be helpful for certain programming tasks.

## ADDRESS with Sheet Reference

The fifth argument adds a sheet name to the address. This example demonstrates 
creating references to other worksheets.

  
    Sheet Name
    Formula
    Result
  
  
    Data
    =ADDRESS(3,5,1,TRUE,"Data")
    Data!$E$3
  
  
    Quarter1
    =ADDRESS(10,2,4,TRUE,"Quarter1")
    Quarter1!B10
  

The table shows how sheet names are incorporated into the address string. This 
is particularly useful for building dynamic references across multiple sheets.

ADDRESS with sheet name
  

=ADDRESS(2, 3, 1, TRUE, "Sales")

This formula creates an absolute reference to cell C2 on the "Sales" sheet. The 
result will be "Sales!$C$2". Such references are valuable in multi-sheet workbooks.

## ADDRESS in Combination with INDIRECT

ADDRESS is often used with INDIRECT to create dynamic cell references. This 
example shows this powerful combination.

  
    A
    B
    C
  
  
    5
    3
    
  
  
    
    
    =INDIRECT(ADDRESS(A1,B1))
  

The table demonstrates how ADDRESS and INDIRECT work together. The formula in 
C2 will reference whatever cell is specified by the values in A1 (row) and B1 
(column).

ADDRESS with INDIRECT
  

=INDIRECT(ADDRESS(5, 3))

This formula combination first creates the text "$C$5" with ADDRESS, then 
INDIRECT converts it to an actual cell reference. The result is the value from 
cell C5.

## Dynamic Range with ADDRESS

ADDRESS can help create dynamic named ranges. This example shows how to build 
a range reference that adjusts automatically.

Dynamic range with ADDRESS
  

=INDIRECT(ADDRESS(1,1)&amp;":"&amp;ADDRESS(COUNTA(A:A),1))

This formula creates a reference to A1 through the last non-empty cell in 
column A. COUNTA determines the last row, and ADDRESS builds the range string. 
This creates a self-adjusting range.

The ADDRESS function is a powerful tool for creating dynamic cell 
references in Excel. From basic address creation to complex multi-sheet 
references, ADDRESS handles it all. Mastering its various 
applications will significantly improve your ability to build flexible 
spreadsheets. Remember that ADDRESS returns text strings that 
often need INDIRECT to become active references.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).