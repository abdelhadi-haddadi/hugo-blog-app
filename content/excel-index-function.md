+++
title = "Excel INDEX Function"
date = 2025-08-29T19:54:09.350+01:00
draft = false
description = "Complete tutorial on Excel INDEX function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel INDEX Function

last modified April 4, 2025

The INDEX function is a powerful lookup function in Excel that 
returns a value from a specific position in a range or array. This tutorial 
provides a comprehensive guide to using the INDEX function. You'll 
learn its syntax, variations, and practical applications through detailed 
examples.

## INDEX Function Basics

The INDEX function has two forms: array form and reference form. 
The array form returns a value from a single range, while the reference form 
can return a reference to a cell. This tutorial focuses on the array form.

  
    Component
    Description
  
  
    Function Name
    INDEX
  
  
    Syntax (Array Form)
    =INDEX(array, row_num, [column_num])
  
  
    Arguments
    array, row_num, column_num (optional)
  
  
    Return Value
    Value at specified position
  

This table outlines the key components of the INDEX function's 
array form. The function requires an array and row number, with column number 
being optional for single-column ranges.

## Basic INDEX Example

This example demonstrates the simplest use of INDEX to retrieve a value from a 
single-column range.

  
    A
    B
  
  
    Apple
    
  
  
    Banana
    
  
  
    Cherry
    
  
  
    
    =INDEX(A1:A3, 2)
  

The table shows a simple list of fruits in column A. The INDEX formula in B4 
retrieves the second item from the range A1:A3.

Basic INDEX formula
  

=INDEX(A1:A3, 2)

This formula returns "Banana" as it's the second item in the range A1:A3. 
Note that we didn't need to specify a column number since we're working with 
a single column.

## INDEX with Two-Dimensional Range

INDEX can retrieve values from two-dimensional ranges by specifying both row 
and column numbers. This example shows how to use it with a table.

  
    A
    B
    C
  
  
    Name
    Age
    Department
  
  
    John
    32
    Sales
  
  
    Sarah
    28
    Marketing
  
  
    
    
    =INDEX(A1:C3, 3, 2)
  

This employee data table demonstrates INDEX working with both rows and columns. 
The formula retrieves a specific value by its position in the table.

2D INDEX formula
  

=INDEX(A1:C3, 3, 2)

The formula returns 28, which is Sarah's age. It looks at row 3 (Sarah's row) 
and column 2 (Age column) in the range A1:C3. This shows INDEX's ability to 
work with tables.

## INDEX with MATCH for Lookups

Combining INDEX with MATCH creates a powerful lookup alternative to VLOOKUP. 
This example demonstrates this common pattern.

  
    A
    B
    C
    D
  
  
    ID
    Product
    Price
    
  
  
    101
    Laptop
    999
    
  
  
    102
    Phone
    699
    
  
  
    103
    Tablet
    399
    
  
  
    
    
    
    =INDEX(B1:B4, MATCH(102, A1:A4, 0))
  

This product table shows how to find a product name by its ID using INDEX and 
MATCH together. The MATCH function finds the row number where ID 102 appears.

INDEX with MATCH
  

=INDEX(B1:B4, MATCH(102, A1:A4, 0))

This formula returns "Phone". MATCH finds ID 102 in row 3, then INDEX returns 
the product name from column B, row 3. This combination is more flexible than 
VLOOKUP.

## INDEX for Multiple Column Returns

INDEX can return an entire row or column when used with 0 as the column or row 
argument. This example shows how to retrieve a whole row.

  
    A
    B
    C
    D
  
  
    Region
    Q1
    Q2
    Q3
  
  
    North
    120
    150
    180
  
  
    South
    90
    110
    130
  
  
    
    
    
    =INDEX(A1:D3, 2, 0)
  

This sales data table demonstrates how INDEX can return an entire row when the 
column argument is 0. The formula retrieves all data for the North region.

INDEX returning entire row
  

=INDEX(A1:D3, 2, 0)

This formula returns the entire second row (North region data) as an array. In 
Excel 365, this would spill the values across multiple cells automatically.

## INDEX with Dynamic Arrays

In modern Excel, INDEX can work with dynamic arrays to create powerful formulas. 
This example shows INDEX filtering data.

  
    A
    B
    C
  
  
    Product
    Sales
    
  
  
    A
    100
    
  
  
    B
    200
    
  
  
    A
    150
    
  
  
    
    
    =INDEX(FILTER(A1:B4, A1:A4="A"), , 2)
  

This sales data shows how INDEX can extract specific columns from filtered 
results. The FILTER function first finds all rows where Product equals "A".

INDEX with FILTER
  

=INDEX(FILTER(A1:B4, A1:A4="A"), , 2)

This formula returns only the sales numbers (column 2) for product "A". The 
empty argument before the comma means "all rows" from the filtered results.

## INDEX Reference Form

The reference form of INDEX can return a cell reference rather than a value. 
This example demonstrates this advanced usage.

INDEX reference form
  

=SUM(INDEX(A1:C3, 2, 0):INDEX(A1:C3, 3, 3))

This formula sums all cells from the start of row 2 to the end of row 3 in 
range A1:C3. The reference form creates a range reference that SUM then 
processes.

The INDEX function is one of Excel's most versatile tools for 
data retrieval. From simple lookups to complex dynamic array operations, 
INDEX handles numerous scenarios efficiently. Mastering INDEX, especially 
when combined with MATCH, will significantly enhance your Excel skills.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).