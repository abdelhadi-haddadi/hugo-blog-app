+++
title = "Excel HLOOKUP Function"
date = 2025-08-29T19:54:07.097+01:00
draft = false
description = "Complete tutorial on Excel HLOOKUP function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel HLOOKUP Function

last modified April 4, 2025

The HLOOKUP function is a powerful lookup tool in Excel that searches
for a value in the top row of a table and returns a value from a specified row.
This tutorial provides a comprehensive guide to using the HLOOKUP
function with detailed examples. You'll learn basic syntax, practical
applications, and advanced techniques to master this essential Excel function.

## HLOOKUP Function Basics

The HLOOKUP function performs a horizontal lookup by searching for
a value in the top row of a table and returning a value from a specified row.
It's ideal for data arranged horizontally.

  
    Component
    Description
  
  
    Function Name
    HLOOKUP
  
  
    Syntax
    =HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])
  
  
    Arguments
    4 parameters (last optional)
  
  
    Return Value
    Matched value from specified row
  

This table breaks down the essential components of the HLOOKUP
function. It shows the function name, syntax format, argument details, and
return value characteristics.

## Basic HLOOKUP Example

This example demonstrates the simplest use of HLOOKUP to find a product price
in a horizontal table.

  
    A
    B
    C
    D
  
  
    Product
    Apple
    Banana
    Orange
  
  
    Price
    1.25
    0.75
    1.10
  
  
    
    
    
    =HLOOKUP("Banana",A1:D2,2,FALSE)
  

The table shows product names in the first row and prices in the second row.
The HLOOKUP formula searches for "Banana" and returns its price from row 2.

Basic HLOOKUP formula
  

=HLOOKUP("Banana",A1:D2,2,FALSE)

This formula searches for "Banana" in the top row of A1:D2 and returns the
value from row 2 in the same column. The FALSE parameter ensures exact match.
The result will be 0.75.

## HLOOKUP with Cell Reference

A more practical use of HLOOKUP involves using cell references for the lookup
value. This makes the formula dynamic and reusable.

  
    A
    B
    C
    D
  
  
    Month
    Jan
    Feb
    Mar
  
  
    Sales
    1200
    1500
    1800
  
  
    
    
    
    =HLOOKUP("Feb",A1:D2,2,FALSE)
  

This table shows monthly sales data arranged horizontally. The HLOOKUP formula
uses a cell reference to find sales for a specific month.

HLOOKUP with cell reference
  

=HLOOKUP("Feb",A1:D2,2,FALSE)

The formula searches for "Feb" in the top row and returns the sales figure from
row 2. The result is 1500. Using cell references makes the formula adaptable.

## HLOOKUP with Approximate Match

HLOOKUP can perform approximate matches when the last argument is TRUE or
omitted. This is useful for finding ranges or graded data.

  
    A
    B
    C
    D
  
  
    Score
    60
    70
    80
  
  
    Grade
    D
    C
    B
  
  
    
    
    
    =HLOOKUP(65,A1:D2,2,TRUE)
  

This table shows score ranges and corresponding grades. The HLOOKUP formula
finds the appropriate grade for a score of 65 using approximate matching.

HLOOKUP with approximate match
  

=HLOOKUP(65,A1:D2,2,TRUE)

The formula searches for 65 in the top row and returns the grade from row 2.
Since 65 falls between 60-70, it returns "D". The table must be sorted in
ascending order for approximate matches to work correctly.

## HLOOKUP with Wildcards

HLOOKUP supports wildcards (* and ?) for partial matches when using exact match
mode (FALSE). This example demonstrates this feature.

  
    A
    B
    C
    D
  
  
    Code
    APP123
    BAN456
    ORA789
  
  
    Category
    Fruit
    Fruit
    Fruit
  
  
    
    
    
    =HLOOKUP("BAN*",A1:D2,2,FALSE)
  

This table shows product codes and categories. The HLOOKUP formula uses a
wildcard to find a partial match in the code.

HLOOKUP with wildcard
  

=HLOOKUP("BAN*",A1:D2,2,FALSE)

The formula searches for any code starting with "BAN" and returns the category
from row 2. The asterisk (*) represents any sequence of characters. The result
is "Fruit".

## HLOOKUP with Multiple Rows

HLOOKUP can retrieve data from any row in the table array, not just the second
row. This example shows how to access data from the third row.

  
    A
    B
    C
    D
  
  
    Employee
    John
    Sarah
    Mike
  
  
    Department
    Sales
    HR
    IT
  
  
    Salary
    5000
    4500
    5200
  
  
    
    
    
    =HLOOKUP("Sarah",A1:D3,3,FALSE)
  

This table contains employee data with multiple rows of information. The
HLOOKUP formula retrieves salary information from the third row.

HLOOKUP with multiple rows
  

=HLOOKUP("Sarah",A1:D3,3,FALSE)

The formula searches for "Sarah" in the top row and returns the salary from
row 3. The result is 4500. The row_index_num parameter determines which row's
data to return.

## HLOOKUP Error Handling

HLOOKUP returns #N/A if the lookup value isn't found. This example shows how
to handle such errors gracefully using IFERROR.

  
    A
    B
    C
    D
  
  
    Product
    Widget
    Gadget
    Thingy
  
  
    Price
    10.99
    15.50
    8.75
  
  
    
    
    
    =IFERROR(HLOOKUP("Doodad",A1:D2,2,FALSE),"Not Found")
  

This table demonstrates error handling when a lookup value doesn't exist in
the table. The IFERROR function provides a user-friendly message instead of #N/A.

HLOOKUP with error handling
  

=IFERROR(HLOOKUP("Doodad",A1:D2,2,FALSE),"Not Found")

The formula attempts to find "Doodad" in the table. When not found, instead of
#N/A, it displays "Not Found". This makes spreadsheets more user-friendly when
dealing with potential missing data.

The HLOOKUP function is essential for working with horizontally
structured data in Excel. From basic lookups to advanced techniques with
wildcards and error handling, HLOOKUP offers powerful data retrieval
capabilities. Mastering its various applications will significantly improve
your ability to work with horizontal data arrangements in spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).