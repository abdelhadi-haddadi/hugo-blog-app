+++
title = "Excel AVERAGE Function"
date = 2025-08-29T19:53:55.928+01:00
draft = false
description = "Complete tutorial on Excel AVERAGE function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel AVERAGE Function

last modified April 4, 2025

The AVERAGE function calculates the arithmetic mean of numbers in 
Excel. It sums all numbers and divides by the count of numeric values. This 
tutorial provides a comprehensive guide to using AVERAGE with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master this essential Excel function.

## AVERAGE Function Basics

The AVERAGE function calculates the mean of given numbers. It 
handles individual numbers, cell references, ranges, or a mix of all three. 
The syntax is simple and flexible.

  
    Component
    Description
  
  
    Function Name
    AVERAGE
  
  
    Syntax
    =AVERAGE(number1, [number2], ...)
  
  
    Arguments
    1-255 items to average
  
  
    Return Value
    Arithmetic mean of arguments
  

This table breaks down the essential components of the AVERAGE
function. It shows the function name, basic syntax format, argument limits, and
return value characteristics.

## Basic AVERAGE Example

This example demonstrates the simplest use of AVERAGE with individual numbers.

Basic AVERAGE formula
  

=AVERAGE(5, 10, 15)

This formula calculates the mean of three numbers: 5, 10, and 15. The result 
will be 10 ((5+10+15)/3). This shows how AVERAGE works with hard-coded values.

## AVERAGE with Cell References

A more practical use of AVERAGE involves calculating the mean of 
values from specific cells. Here's an example with cell references.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    30
    
  
  
    
    =AVERAGE(A1:A3)
  

The table shows a simple spreadsheet with values in column A and an
AVERAGE formula in cell B4 that calculates the mean of A1 to A3.

AVERAGE with cell range
  

=AVERAGE(A1:A3)

This formula calculates the average of values in cells A1 through A3. The result 
will be 20 ((10+20+30)/3). Using ranges makes AVERAGE powerful for datasets.

## AVERAGE with Multiple Ranges

AVERAGE can handle multiple ranges or combinations of ranges and individual 
cells. This example shows this flexibility.

  
    A
    B
    C
  
  
    5
    10
    
  
  
    15
    20
    
  
  
    
    
    =AVERAGE(A1:B2, 25)
  

This table demonstrates AVERAGE's ability to combine different types of 
arguments. It shows values in cells A1 through B2 plus an additional number 25.

AVERAGE with multiple ranges
  

=AVERAGE(A1:B2, 25)

This formula averages all values in range A1:B2 (5,10,15,20) plus 25. The 
result is 15 ((5+10+15+20+25)/5). This demonstrates AVERAGE's argument 
flexibility.

## AVERAGE with Non-Adjacent Cells

You can average non-adjacent cells by listing them individually or using the 
Ctrl key to select multiple cells while creating the formula.

  
    A
    B
    C
  
  
    10
    20
    
  
  
    30
    40
    
  
  
    
    
    =AVERAGE(A1, B2, A3)
  

The table illustrates how to average specific, non-adjacent cells (A1, B2, and 
A3) while ignoring other values. Cell A3 is empty in this example.

AVERAGE with non-adjacent cells
  

=AVERAGE(A1, B2, A3)

This formula averages only specific cells: A1 (10), B2 (40), and A3 (empty, 
ignored). The result is 25 ((10+40)/2). This technique is useful for selective 
averaging.

## AVERAGE with Text and Numbers

AVERAGE automatically ignores text values in referenced cells. This example 
shows how it handles mixed content.

  
    A
    B
  
  
    10
    
  
  
    Text
    
  
  
    20
    
  
  
    
    =AVERAGE(A1:A3)
  

This table shows how AVERAGE behaves when a range contains both 
numbers and text. The text value in A2 is ignored in the calculation.

AVERAGE with text values
  

=AVERAGE(A1:A3)

The formula averages A1 (10) and A3 (20), ignoring A2 ("Text"). The result is 
15. This behavior makes AVERAGE robust with mixed content.

## AVERAGE with Blank Cells

AVERAGE treats blank cells differently from zero values. Blank cells are 
ignored, while zeros are included in the calculation.

  
    A
    B
  
  
    15
    
  
  
    
    
  
  
    25
    
  
  
    
    =AVERAGE(A1:A3)
  

The table contains numbers and blank cells to demonstrate how AVERAGE
handles empty cells. The blank cell A2 is excluded from the calculation.

AVERAGE with blank cells
  

=AVERAGE(A1:A3)

The formula averages A1 (15) and A3 (25), ignoring blank A2. The result is 20. 
This differs from treating blanks as zero, which would give 13.33.

## AVERAGE Across Worksheets

AVERAGE can reference cells across multiple worksheets. This example shows how 
to average the same cell from different sheets.

3D AVERAGE formula
  

=AVERAGE(Sheet1:Sheet3!A1)

This formula averages cell A1 from Sheet1, Sheet2, and Sheet3. If A1 contains 
10, 20, and 30 respectively, the result is 20. This consolidates data across 
sheets.

## AVERAGE with Logical Values

AVERAGE treats TRUE as 1 and FALSE as 0 when logical values are included. This 
example demonstrates this behavior.

  
    A
    B
  
  
    10
    
  
  
    TRUE
    
  
  
    FALSE
    
  
  
    
    =AVERAGE(A1:A3)
  

The table shows how AVERAGE handles logical values (TRUE/FALSE) 
mixed with numbers. TRUE becomes 1 and FALSE becomes 0 in the calculation.

AVERAGE with logical values
  

=AVERAGE(A1:A3)

This formula averages A1 (10), A2 (TRUE as 1), and A3 (FALSE as 0). The result 
is 3.666... ((10+1+0)/3). This conversion is automatic but may need adjustment.

## AVERAGE with Error Values

If any cell in the AVERAGE range contains an error value, the entire formula 
returns that error. This example shows this behavior.

  
    A
    B
  
  
    10
    
  
  
    #N/A
    
  
  
    20
    
  
  
    
    =AVERAGE(A1:A3)
  

The table demonstrates how AVERAGE reacts when encountering error 
values in the range. The presence of #N/A in A2 causes the entire AVERAGE to 
fail.

AVERAGE with error values
  

=AVERAGE(A1:A3)

This formula attempts to average A1 (10), A2 (#N/A error), and A3 (20). Instead 
of a numeric result, it returns #N/A. Error handling is needed for valid 
calculations.

## AVERAGE with Named Ranges

AVERAGE works seamlessly with named ranges, making formulas more readable. This 
example shows AVERAGE with a named range.

  
    A
    B
  
  
    100
    
  
  
    200
    
  
  
    300
    
  
  
    
    =AVERAGE(Quarter1)
  

The table assumes cells A1:A3 are named "Quarter1". The AVERAGE formula 
references this named range instead of cell addresses, improving clarity.

AVERAGE with named range
  

=AVERAGE(Quarter1)

This formula averages all values in the named range "Quarter1" (A1:A3). The 
result is 200. Named ranges make formulas more understandable and maintainable.

## AVERAGE with Dynamic Arrays

In modern Excel versions, AVERAGE can work with dynamic array formulas. This 
example demonstrates averaging a filtered range.

AVERAGE with FILTER function
  

=AVERAGE(FILTER(A1:A10, B1:B10="Yes"))

This formula averages only values in A1:A10 where corresponding cells in B1:B10 
contain "Yes". The FILTER function creates a dynamic array that AVERAGE then 
processes. This enables conditional averaging without AVERAGEIF.

The AVERAGE function is essential for statistical analysis in 
Excel. From basic calculations to complex data analysis, AVERAGE 
handles it efficiently. Mastering its various applications will significantly 
improve your spreadsheet skills. Remember that AVERAGE ignores 
text and blank cells, making it robust for real-world data analysis.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).