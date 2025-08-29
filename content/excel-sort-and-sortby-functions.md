+++
title = "Excel SORT and SORTBY Functions"
date = 2025-08-29T19:54:19.460+01:00
draft = false
description = "Complete tutorial on Excel SORT and SORTBY functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel SORT and SORTBY Functions

last modified April 4, 2025

The SORT and SORTBY functions are powerful tools for 
organizing data in Excel. They allow dynamic sorting of ranges and arrays. 
This tutorial provides a comprehensive guide to using these functions with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master these essential Excel functions.

## SORT/SORTBY Function Basics

The SORT function rearranges the contents of a range or array in 
ascending or descending order. SORTBY sorts a range based on the 
values in another range or array. Both functions return dynamic arrays.

  
    Function
    Description
    Syntax
  
  
    SORT
    Sorts a range or array
    =SORT(array,[sort_index],[sort_order],[by_col])
  
  
    SORTBY
    Sorts by another range/array
    =SORTBY(array,by_array1,[sort_order1],...)
  

This table compares the two sorting functions. SORT sorts the 
array directly, while SORTBY sorts based on other arrays. Both 
support multiple sort orders and directions.

## Basic SORT Example

This example demonstrates the simplest use of the SORT function with a single 
column of data.

  
    A
    B
  
  
    Apple
    
  
  
    Orange
    
  
  
    Banana
    
  
  
    
    =SORT(A1:A3)
  

The table shows a simple list of fruits in column A and a SORT 
formula in cell B4 that sorts the list alphabetically in ascending order.

Basic SORT formula
  

=SORT(A1:A3)

This formula sorts the values in cells A1 through A3 alphabetically. The result 
will be {"Apple";"Banana";"Orange"}. This shows the simplest use of SORT with 
default parameters.

## SORT with Multiple Columns

SORT can handle multi-column ranges, sorting by a specified 
column. This example shows sorting a table by the second column.

  
    A
    B
    C
  
  
    John
    35
    
  
  
    Mary
    28
    
  
  
    Bob
    42
    
  
  
    
    
    =SORT(A1:B3,2,-1)
  

This table demonstrates sorting a two-column range by the second column (ages) 
in descending order. The sort_index is 2, and sort_order is -1 for descending.

SORT with multiple columns
  

=SORT(A1:B3,2,-1)

This formula sorts the range A1:B3 by the second column in descending order. 
The result will be {"Bob",42;"John",35;"Mary",28}. The sort_index parameter 
determines which column to sort by.

## SORTBY with Single Criteria

SORTBY sorts a range based on values in another range. This 
example shows basic usage with one sort criterion.

  
    A
    B
    C
  
  
    Red
    3
    
  
  
    Blue
    1
    
  
  
    Green
    2
    
  
  
    
    
    =SORTBY(A1:A3,B1:B3)
  

The table shows colors in column A and numbers in column B. The SORTBY 
formula sorts column A based on the values in column B in ascending order.

Basic SORTBY formula
  

=SORTBY(A1:A3,B1:B3)

This formula sorts the range A1:A3 based on values in B1:B3. The result will 
be {"Blue";"Green";"Red"}. SORTBY is useful when your sort key is separate 
from the data you want to sort.

## SORTBY with Multiple Criteria

SORTBY can sort using multiple criteria with different sort 
orders. This example demonstrates two-level sorting.

  
    A
    B
    C
    D
  
  
    Apple
    Fruit
    10
    
  
  
    Carrot
    Vegetable
    15
    
  
  
    Banana
    Fruit
    8
    
  
  
    
    
    
    =SORTBY(A1:C3,B1:B3,1,C1:C3,-1)
  

This table shows a three-column dataset. The SORTBY formula first 
sorts by category (ascending), then by price (descending) within each category.

SORTBY with multiple criteria
  

=SORTBY(A1:C3,B1:B3,1,C1:C3,-1)

This formula sorts the range A1:C3 first by column B (ascending), then by 
column C (descending). The result will show Fruits first (Apple then Banana), 
then Vegetables (Carrot), with Banana appearing before Apple due to price.

## SORT with Horizontal Data

SORT can sort horizontal ranges by setting the by_col parameter. 
This example shows sorting a row of data.

  
    A
    B
    C
    D
  
  
    
    March
    January
    February
  
  
    
    
    
    =SORT(B1:D1,,,TRUE)
  

The table demonstrates sorting months horizontally. The by_col parameter is set 
to TRUE to sort columns instead of rows.

SORT horizontal data
  

=SORT(B1:D1,,,TRUE)

This formula sorts the horizontal range B1:D1 alphabetically. The result will 
be {"February","January","March"}. The fourth parameter (TRUE) enables column-
wise sorting instead of the default row-wise sorting.

## SORTBY with Custom Order

SORTBY can implement custom sort orders using helper columns. 
This example shows sorting by priority levels.

  
    A
    B
    C
    D
  
  
    Task 1
    High
    2
    
  
  
    Task 2
    Medium
    1
    
  
  
    Task 3
    Low
    3
    
  
  
    
    
    
    =SORTBY(A1:B3,C1:C3)
  

The table shows tasks with priority labels and numeric values. The 
SORTBY formula uses the numeric values to establish a custom 
sort order that doesn't follow alphabetical sequence.

SORTBY with custom order
  

=SORTBY(A1:B3,C1:C3)

This formula sorts the range A1:B3 based on values in C1:C3. The result will 
show tasks in Medium (1), High (2), Low (3) order. This technique is useful 
for implementing non-alphabetical sort sequences.

## SORT with Dynamic Arrays

SORT can be combined with other dynamic array functions. This 
example shows sorting filtered results.

SORT with FILTER
  

=SORT(FILTER(A1:B10,B1:B10&gt;100),2,-1)

This formula first filters rows where column B values exceed 100, then sorts 
the results by column 2 in descending order. The combination of SORT and FILTER 
creates powerful data processing workflows.

## SORTBY with Multiple Sort Directions

SORTBY allows specifying different sort directions for each 
criterion. This example shows mixed ascending and descending sorts.

  
    A
    B
    C
    D
  
  
    North
    200
    Q1
    
  
  
    South
    150
    Q2
    
  
  
    East
    200
    Q1
    
  
  
    
    
    
    =SORTBY(A1:C3,B1:B3,-1,C1:C3,1)
  

The table demonstrates sorting first by sales (descending), then by quarter 
(ascending) for records with equal sales values. This creates a multi-level 
sort with different directions.

SORTBY with mixed directions
  

=SORTBY(A1:C3,B1:B3,-1,C1:C3,1)

This formula sorts the range A1:C3 first by column B (descending), then by 
column C (ascending). Records with equal sales (200) will be ordered by 
quarter. The result shows North before East due to Q1 coming before Q2.

## SORT with Error Handling

SORT can be combined with IFERROR to handle potential errors in 
the source data. This example shows a robust sorting approach.

SORT with error handling
  

=SORT(IFERROR(A1:B10,""),1,1)

This formula sorts range A1:B10 after converting any errors to empty strings. 
The IFERROR wrapper prevents sort failures due to error values in the source 
data. The empty strings will sort to the bottom of ascending sorts.

The SORT and SORTBY functions are essential for 
dynamic data organization in modern Excel. From simple lists to complex multi-
criteria sorts, they offer powerful solutions. Mastering these functions will 
significantly enhance your data analysis capabilities. Remember that both 
functions return dynamic arrays that spill results automatically.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).