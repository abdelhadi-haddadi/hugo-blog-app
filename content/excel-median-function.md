+++
title = "Excel MEDIAN Function"
date = 2025-08-29T19:54:13.825+01:00
draft = false
description = "Complete tutorial on Excel MEDIAN function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel MEDIAN Function

last modified April 4, 2025

The MEDIAN function is a statistical function in Excel that finds 
the middle value in a dataset. Unlike average, it's not affected by extremely 
high or low values. This tutorial provides a comprehensive guide to using the 
MEDIAN function with detailed examples. You'll learn basic syntax, 
practical applications, and how it differs from other statistical functions.

## MEDIAN Function Basics

The MEDIAN function returns the middle number in a set of numbers. 
When the count is even, it averages the two middle numbers. The syntax is 
simple and similar to other statistical functions.

  
    Component
    Description
  
  
    Function Name
    MEDIAN
  
  
    Syntax
    =MEDIAN(number1, [number2], ...)
  
  
    Arguments
    1-255 numbers or ranges
  
  
    Return Value
    Middle value of dataset
  

This table breaks down the essential components of the MEDIAN
function. It shows the function name, basic syntax format, argument limits, and
return value characteristics.

## Basic MEDIAN Example

This example demonstrates the simplest use of the MEDIAN function with an odd 
number of values.

Basic MEDIAN formula
  

=MEDIAN(1, 2, 3, 4, 5)

This formula finds the median of five numbers. The result will be 3, as it's 
the middle value in the ordered set (1,2,3,4,5). This shows MEDIAN's basic 
operation.

## MEDIAN with Even Count of Numbers

When the dataset has an even number of values, MEDIAN averages the two middle 
numbers. Here's an example.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    30
    
  
  
    40
    
  
  
    
    =MEDIAN(A1:A4)
  

The table shows four values in column A. The MEDIAN formula in B5 will average 
the two middle numbers (20 and 30) since there's an even count of values.

MEDIAN with even count
  

=MEDIAN(A1:A4)

This formula calculates the median of values in A1:A4. The ordered set is 
(10,20,30,40), so the median is (20+30)/2 = 25. This demonstrates MEDIAN's 
behavior with even counts.

## MEDIAN with Mixed Data Types

MEDIAN automatically ignores text and logical values, similar to other 
statistical functions. This example shows this behavior.

  
    A
    B
  
  
    5
    
  
  
    "Text"
    
  
  
    15
    
  
  
    TRUE
    
  
  
    
    =MEDIAN(A1:A4)
  

This table demonstrates how MEDIAN handles mixed content. It ignores the text 
in A2 and the logical value in A4, only considering the numbers in A1 and A3.

MEDIAN with mixed data
  

=MEDIAN(A1:A4)

The formula calculates the median of A1 (5) and A3 (15), ignoring A2 and A4. 
With two numbers, the median is their average: (5+15)/2 = 10. This shows 
MEDIAN's data filtering capability.

## MEDIAN with Blank Cells

MEDIAN ignores blank cells in calculations, treating them as non-existent. This 
example demonstrates this behavior.

  
    A
    B
  
  
    100
    
  
  
    
    
  
  
    200
    
  
  
    300
    
  
  
    
    =MEDIAN(A1:A4)
  

The table contains numbers and blank cells to show how MEDIAN handles empty 
cells. The blank cell A2 is completely ignored in the calculation.

MEDIAN with blank cells
  

=MEDIAN(A1:A4)

This formula calculates the median of A1 (100), A3 (200), and A4 (300). The 
blank A2 is ignored. The ordered set is (100,200,300), so the median is 200.

## MEDIAN with Non-Adjacent Ranges

MEDIAN can work with multiple ranges or individual cells, similar to other 
functions. This example shows this flexibility.

  
    A
    B
    C
  
  
    10
    30
    
  
  
    20
    40
    
  
  
    
    
    =MEDIAN(A1:A2, B1:B2)
  

The table demonstrates MEDIAN working with two separate ranges (A1:A2 and 
B1:B2). The function combines all values before finding the median.

MEDIAN with multiple ranges
  

=MEDIAN(A1:A2, B1:B2)

This formula combines values from A1:A2 (10,20) and B1:B2 (30,40). The full 
dataset is (10,20,30,40), so the median is (20+30)/2 = 25. This shows MEDIAN's 
ability to work with multiple ranges.

## MEDIAN with Outliers

Unlike AVERAGE, MEDIAN is resistant to outliers. This example compares both 
functions with an extreme value.

  
    A
    B
    C
  
  
    100
    
    
  
  
    110
    
    
  
  
    120
    
    
  
  
    1000
    
    
  
  
    
    =AVERAGE(A1:A4)
    =MEDIAN(A1:A4)
  

The table shows how an extreme value (1000) affects AVERAGE versus MEDIAN. 
While AVERAGE is skewed, MEDIAN remains representative of the typical values.

MEDIAN vs AVERAGE with outlier
  

=MEDIAN(A1:A4)

This formula calculates the median of (100,110,120,1000). The ordered set's 
middle values are 110 and 120, so the median is 115. The AVERAGE would be 332.5, 
demonstrating MEDIAN's resistance to outliers.

## MEDIAN with Named Ranges

MEDIAN works well with named ranges, improving formula readability. This 
example shows MEDIAN with a named range.

  
    A
    B
  
  
    50
    
  
  
    60
    
  
  
    70
    
  
  
    
    =MEDIAN(Temperatures)
  

The table assumes cells A1:A3 are named "Temperatures". The MEDIAN formula 
references this named range instead of cell addresses, making the formula 
more understandable.

MEDIAN with named range
  

=MEDIAN(Temperatures)

This formula calculates the median of the "Temperatures" range (A1:A3). The 
result is 60, the middle value in the ordered set (50,60,70). Named ranges 
make formulas more maintainable.

## MEDIAN with Error Values

If any cell in the MEDIAN range contains an error value, the entire MEDIAN 
formula returns that error. This example shows this behavior.

  
    A
    B
  
  
    10
    
  
  
    #DIV/0!
    
  
  
    30
    
  
  
    
    =MEDIAN(A1:A3)
  

The table demonstrates how MEDIAN reacts when encountering error 
values in the range. The presence of #DIV/0! in A2 causes the entire MEDIAN to 
fail, similar to other statistical functions.

MEDIAN with error values
  

=MEDIAN(A1:A3)

This formula attempts to find the median of A1 (10), A2 (#DIV/0! error), and 
A3 (30). Instead of a numeric result, it returns #DIV/0!. Error handling is 
needed to calculate the median of valid numbers.

The MEDIAN function is essential for statistical analysis in 
Excel. It provides a robust measure of central tendency that isn't affected by 
extreme values. From basic calculations to complex datasets, MEDIAN helps 
identify the middle value efficiently. Remember that MEDIAN automatically 
sorts values and handles even counts by averaging. It's particularly useful 
when your data contains outliers that would skew the average.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).