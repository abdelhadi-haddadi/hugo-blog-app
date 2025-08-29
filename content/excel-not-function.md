+++
title = "Excel NOT Function"
date = 2025-08-29T19:54:14.948+01:00
draft = false
description = "Complete tutorial on Excel NOT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel NOT Function

last modified April 4, 2025

The NOT function is a logical function in Excel that reverses the 
value of its argument. It returns TRUE when given FALSE and FALSE when given 
TRUE. This tutorial provides a comprehensive guide to using the NOT 
function with detailed examples. You'll learn basic syntax, practical 
applications, and how to combine it with other functions.

## NOT Function Basics

The NOT function is one of Excel's logical functions that performs 
a simple but essential operation: it reverses the logical value of its argument. 
It's particularly useful in conditional tests and logical expressions.

  
    Component
    Description
  
  
    Function Name
    NOT
  
  
    Syntax
    =NOT(logical)
  
  
    Arguments
    1 logical expression or value
  
  
    Return Value
    Reversed logical value (TRUE/FALSE)
  

This table breaks down the essential components of the NOT 
function. It shows the function name, basic syntax format, argument 
requirements, and return value characteristics.

## Basic NOT Example

This example demonstrates the simplest use of the NOT function with a direct 
logical value.

Basic NOT formula
  

=NOT(TRUE)

This formula takes the logical value TRUE and returns its opposite, FALSE. 
This shows the fundamental operation of the NOT function - reversing logical 
values.

## NOT with Cell References

A more practical use of NOT involves referencing cells containing 
logical values. Here's an example with cell references.

  
    A
    B
  
  
    TRUE
    
  
  
    
    =NOT(A1)
  

The table shows a simple spreadsheet with a logical value in cell A1 and a 
NOT formula in cell B2 that reverses the value from A1.

NOT with cell reference
  

=NOT(A1)

This formula reverses the logical value in cell A1. Since A1 contains TRUE, 
the result will be FALSE. Using cell references makes NOT more flexible in 
real-world spreadsheets.

## NOT with Comparison Operators

NOT is often used with comparison operators to reverse their results. This 
example shows NOT combined with a greater-than comparison.

  
    A
    B
  
  
    15
    
  
  
    10
    
  
  
    
    =NOT(A1&gt;A2)
  

This table demonstrates how NOT can be combined with comparison operators. 
The expression A1&gt;A2 would normally return TRUE, but NOT reverses this to FALSE.

NOT with comparison
  

=NOT(A1&gt;A2)

This formula checks if A1 (15) is greater than A2 (10), which is TRUE, then 
NOT reverses this to FALSE. This technique is useful for creating "is not" 
type conditions.

## NOT with IF Function

NOT is frequently combined with the IF function to create reverse conditions. 
This example shows this powerful combination.

  
    A
    B
  
  
    FALSE
    
  
  
    
    =IF(NOT(A1), "Approved", "Denied")
  

The table illustrates how NOT can be used within an IF function to reverse the 
logic of the condition. Since A1 is FALSE, NOT makes it TRUE for the IF test.

NOT with IF function
  

=IF(NOT(A1), "Approved", "Denied")

This formula checks the reversed value of A1 (FALSE becomes TRUE) and returns 
"Approved" because the condition is met. This pattern is common in 
decision-making formulas.

## NOT with AND/OR Functions

NOT can be combined with AND or OR functions to create more complex logical 
tests. This example demonstrates NOT with AND.

  
    A
    B
    C
  
  
    TRUE
    FALSE
    
  
  
    
    
    =NOT(AND(A1,B1))
  

This table shows how NOT can invert the result of an AND function. The AND of 
TRUE and FALSE is FALSE, which NOT then converts to TRUE.

NOT with AND function
  

=NOT(AND(A1,B1))

This formula checks if both A1 and B1 are TRUE (they're not), then NOT 
reverses the FALSE result to TRUE. This creates a "not both" condition, 
useful in many scenarios.

## NOT with Numeric Values

NOT treats numeric values as logical values where 0 is FALSE and any other 
number is TRUE. This example demonstrates this behavior.

  
    A
    B
  
  
    0
    
  
  
    1
    
  
  
    
    =NOT(A1)
  
  
    
    =NOT(A2)
  

The table shows how NOT interprets numeric values. A1 (0) is treated as FALSE, 
so NOT returns TRUE. A2 (1) is treated as TRUE, so NOT returns FALSE.

NOT with numeric values
  

=NOT(A1)
=NOT(A2)

These formulas demonstrate NOT's handling of numbers. The first returns TRUE 
because 0 is FALSE. The second returns FALSE because 1 is TRUE. This automatic 
conversion is helpful in numeric contexts.

## NOT with Text Values

NOT treats text values in a specific way - most text is considered TRUE, while 
empty strings ("") are FALSE. This example shows this behavior.

  
    A
    B
  
  
    "Hello"
    
  
  
    ""
    
  
  
    
    =NOT(A1)
  
  
    
    =NOT(A2)
  

The table demonstrates NOT's handling of text values. A1 ("Hello") is treated 
as TRUE, so NOT returns FALSE. A2 (empty string) is treated as FALSE, so NOT 
returns TRUE.

NOT with text values
  

=NOT(A1)
=NOT(A2)

These formulas show NOT's text handling. The first returns FALSE because 
non-empty text is TRUE. The second returns TRUE because an empty string is 
FALSE. This is useful for text-based conditions.

## NOT with Error Values

If the argument to NOT is an error value, NOT will return the same error. This 
example demonstrates this behavior.

  
    A
    B
  
  
    #N/A
    
  
  
    
    =NOT(A1)
  

The table shows how NOT reacts when given an error value. The #N/A error in A1 
causes the NOT function to also return #N/A, propagating the error.

NOT with error values
  

=NOT(A1)

This formula attempts to reverse the logical value of A1, but since A1 contains 
an error, the formula returns the same error. Error handling would be needed to 
prevent this.

## NOT in Conditional Formatting

NOT can be used in conditional formatting rules to apply formatting when a 
condition is not met. This example shows a practical application.

Conditional formatting with NOT
  

=NOT(A1&gt;100)

This formula would be used in a conditional formatting rule to format cells 
where the value is NOT greater than 100. When A1 contains 50, the condition 
would be TRUE and formatting applied.

The NOT function is a versatile tool in Excel's logical function 
arsenal. From simple value reversal to complex conditional tests combined with 
other functions, NOT provides essential logical inversion capabilities. 
Mastering NOT will enhance your ability to create sophisticated logical tests 
and decision-making formulas in Excel.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).