+++
title = "Excel FILTER Function"
date = 2025-08-29T19:54:04.883+01:00
draft = false
description = "Complete tutorial on Excel FILTER function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel FILTER Function

last modified April 4, 2025

The FILTER function is a powerful dynamic array function in Excel. 
It filters a range of data based on specified criteria. This tutorial provides 
a comprehensive guide to using the FILTER function with detailed 
examples. You'll learn basic syntax, practical applications, and advanced 
techniques to master this essential Excel function.

## FILTER Function Basics

The FILTER function extracts data that meets specific criteria. 
It returns matching values in a spill range. The function automatically 
adjusts to the number of matching results.

  
    Component
    Description
  
  
    Function Name
    FILTER
  
  
    Syntax
    =FILTER(array, include, [if_empty])
  
  
    Arguments
    array: Data to filter

         include: Boolean array

         if_empty: Value when no results
  
  
    Return Value
    Filtered array of values
  

This table breaks down the essential components of the FILTER
function. It shows the function name, basic syntax format, argument details, 
and return value characteristics.

## Basic FILTER Example

This example demonstrates the simplest use of the FILTER function with a basic 
condition to filter data.

  
    A
    B
  
  
    Apple
    Fruit
  
  
    Carrot
    Vegetable
  
  
    Banana
    Fruit
  
  
    
    =FILTER(A1:A3, B1:B3="Fruit")
  

The table shows a simple dataset with items and categories. The FILTER formula 
extracts only items marked as "Fruit" in column B.

Basic FILTER formula
  

=FILTER(A1:A3, B1:B3="Fruit")

This formula filters range A1:A3, returning only values where corresponding 
cells in B1:B3 equal "Fruit". The result spills vertically with "Apple" and 
"Banana". This demonstrates FILTER's basic functionality.

## FILTER with Multiple Conditions

FILTER can handle multiple conditions using logical operators. This example 
shows how to combine criteria with AND logic.

  
    A
    B
    C
  
  
    John
    Sales
    5000
  
  
    Sarah
    Marketing
    6000
  
  
    Mike
    Sales
    7000
  
  
    
    
    =FILTER(A1:A3, (B1:B3="Sales")*(C1:C3&gt;5500))
  

This table demonstrates filtering with two conditions: department is "Sales" 
AND sales amount exceeds 5500. The multiplication acts as an AND operator.

FILTER with multiple conditions
  

=FILTER(A1:A3, (B1:B3="Sales")*(C1:C3&gt;5500))

The formula returns names from A1:A3 where department is "Sales" (B column) 
AND sales (C column) exceed 5500. Only "Mike" meets both criteria. The 
asterisk (*) combines conditions with AND logic.

## FILTER with OR Logic

FILTER can implement OR logic by adding conditions together. This example shows 
how to filter for items meeting either of two criteria.

  
    A
    B
    C
  
  
    Red
    Circle
    Small
  
  
    Blue
    Square
    Large
  
  
    Green
    Triangle
    Medium
  
  
    
    
    =FILTER(A1:A3, (B1:B3="Circle")+(C1:C3="Large"))
  

The table shows shapes with color and size attributes. The FILTER formula 
returns colors of shapes that are either circles OR large.

FILTER with OR logic
  

=FILTER(A1:A3, (B1:B3="Circle")+(C1:C3="Large"))

This formula filters A1:A3 for items where shape is "Circle" (B column) OR 
size is "Large" (C column). The plus sign (+) combines conditions with OR 
logic. Results include "Red" and "Blue".

## FILTER with if_empty Parameter

The optional if_empty parameter specifies what to return when no items match 
the criteria. This prevents errors in empty results.

  
    A
    B
  
  
    North
    100
  
  
    South
    200
  
  
    East
    150
  
  
    
    =FILTER(A1:A3, B1:B3&gt;250, "No matches")
  

The table demonstrates the if_empty parameter in action. Since no values in 
B1:B3 exceed 250, the formula returns the specified message instead of an 
error.

FILTER with if_empty
  

=FILTER(A1:A3, B1:B3&gt;250, "No matches")

This formula attempts to filter regions (A1:A3) where values (B1:B3) exceed 
250. Since no matches exist, it returns "No matches" instead of a #CALC! 
error. This makes worksheets more user-friendly.

## FILTER with Multiple Columns

FILTER can return multiple columns from the source data. This example shows 
how to filter and display several related columns at once.

  
    A
    B
    C
  
  
    Product1
    Electronics
    50
  
  
    Product2
    Furniture
    120
  
  
    Product3
    Electronics
    75
  
  
    
    
    =FILTER(A1:C3, B1:B3="Electronics")
  

The table contains product data with name, category, and price. The FILTER 
formula returns all columns for electronics products, creating a multi-column 
result.

FILTER multiple columns
  

=FILTER(A1:C3, B1:B3="Electronics")

This formula filters the entire table (A1:C3) for rows where category 
(B1:B3) is "Electronics". The result spills both vertically and horizontally, 
showing product names, categories, and prices for matching items.

## FILTER with Dates

FILTER works well with date criteria. This example demonstrates filtering 
records based on date ranges.

  
    A
    B
  
  
    Task1
    1/15/2023
  
  
    Task2
    2/20/2023
  
  
    Task3
    3/10/2023
  
  
    
    =FILTER(A1:A3, (B1:B3&gt;=DATE(2023,2,1))*(B1:B3&lt;=DATE(2023,2,28)))
  

The table shows tasks with dates. The FILTER formula extracts tasks falling 
within February 2023, demonstrating date-based filtering.

FILTER with date range
  

=FILTER(A1:A3, (B1:B3&gt;=DATE(2023,2,1))*(B1:B3&lt;=DATE(2023,2,28)))

This formula filters tasks (A1:A3) for dates (B1:B3) in February 2023. The 
DATE function creates the range boundaries. Only "Task2" falls within this 
period. This technique is useful for time-based data analysis.

The FILTER function revolutionizes data extraction in Excel. From 
simple single-column filters to complex multi-condition queries across multiple 
columns, FILTER handles it all dynamically. Mastering FILTER will significantly 
enhance your data analysis capabilities. Remember that FILTER automatically 
spills results and works seamlessly with other dynamic array functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).