+++
title = "Excel INDIRECT Function"
date = 2025-08-29T19:54:10.463+01:00
draft = false
description = "Complete tutorial on Excel INDIRECT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel INDIRECT Function

last modified April 4, 2025

The INDIRECT function is a powerful lookup function in Excel that 
returns a reference specified by a text string. This tutorial provides a 
comprehensive guide to using the INDIRECT function with detailed 
examples. You'll learn basic syntax, practical applications, and advanced 
techniques to master this flexible Excel function.

## INDIRECT Function Basics

The INDIRECT function converts a text string into a cell reference. 
It allows you to create dynamic references that can change based on other cell 
values. The function has two arguments.

  
    Component
    Description
  
  
    Function Name
    INDIRECT
  
  
    Syntax
    =INDIRECT(ref_text, [a1])
  
  
    Arguments
    ref_text: Required. Text reference

    a1: Optional. Reference style (TRUE for A1, FALSE for R1C1)
  
  
    Return Value
    Cell reference specified by text string
  

This table breaks down the essential components of the INDIRECT
function. It shows the function name, syntax format, argument details, and 
return value characteristics.

## Basic INDIRECT Example

This example demonstrates the simplest use of INDIRECT to reference a cell 
specified by text.

  
    A
    B
  
  
    100
    A1
  
  
    
    =INDIRECT(B1)
  

The table shows cell A1 containing the value 100, and cell B1 containing the 
text "A1". The INDIRECT function in B2 converts the text "A1" into an actual 
reference to cell A1.

Basic INDIRECT formula
  

=INDIRECT(B1)

This formula takes the text "A1" from cell B1 and converts it to a reference 
to cell A1. The result will be 100, the value in A1. This shows the basic 
conversion of text to reference.

## INDIRECT with Dynamic Sheet References

INDIRECT can create references to different sheets dynamically. This example 
shows how to reference a cell from a sheet named in another cell.

  
    A
    B
  
  
    Sheet2
    
  
  
    
    =INDIRECT(A1&amp;"!B5")
  

Assume Sheet2 exists and cell B5 on Sheet2 contains 250. The formula in B2 
combines the sheet name from A1 with a cell reference to create a dynamic 
cross-sheet reference.

INDIRECT with sheet reference
  

=INDIRECT(A1&amp;"!B5")

This formula concatenates the sheet name from A1 ("Sheet2") with "!B5" to 
create the reference "Sheet2!B5". INDIRECT then evaluates this as a proper 
cell reference. The result is the value from Sheet2!B5 (250).

## INDIRECT with Data Validation Lists

INDIRECT is commonly used with data validation to create dependent dropdown 
lists. This example shows a simple two-level dependent dropdown.

  
    A
    B
  
  
    Fruits
    Apple
  
  
    Vegetables
    Carrot
  

First create named ranges: "Fruits" for B1:B3 (Apple, Banana, Orange) and 
"Vegetables" for B4:B6 (Carrot, Potato, Onion). Then set data validation in 
A1:A2 for the categories, and use INDIRECT for the items in B1:B2.

INDIRECT for dependent dropdown
  

=INDIRECT(A1)

When used in data validation, this formula makes the dropdown in column B 
dependent on the selection in column A. If A1 is "Fruits", B1 shows fruits; 
if A2 is "Vegetables", B2 shows vegetables.

## INDIRECT with R1C1 Reference Style

INDIRECT can use either A1 or R1C1 reference styles. This example demonstrates 
the R1C1 style by creating a relative reference.

  
    A
    B
  
  
    10
    
  
  
    20
    
  
  
    30
    
  
  
    
    =INDIRECT("R"&amp;ROW()&amp;"C1", FALSE)
  

The formula in B4 uses R1C1 notation to reference column 1 of the current row. 
ROW() returns 4, so it builds "R4C1" which points to A4 (empty, returns 0).

INDIRECT with R1C1 style
  

=INDIRECT("R"&amp;ROW()&amp;"C1", FALSE)

This formula constructs an R1C1 reference dynamically. The FALSE parameter 
tells INDIRECT to use R1C1 style. It's useful for creating relative references 
that adjust based on position.

## INDIRECT for Summing Variable Ranges

INDIRECT can help create SUM formulas with dynamic ranges specified in other 
cells. This example sums a range defined by start and end points in cells.

  
    A
    B
    C
  
  
    Start
    A2
    
  
  
    End
    A5
    
  
  
    10
    
    
  
  
    20
    
    
  
  
    30
    
    
  
  
    
    
    =SUM(INDIRECT(B1&amp;":"&amp;B2))
  

The formula in C6 sums the range from A2 to A5 (10+20+30 = 60) by combining 
the references from B1 ("A2") and B2 ("A5") into "A2:A5".

INDIRECT with SUM for dynamic range
  

=SUM(INDIRECT(B1&amp;":"&amp;B2))

This formula concatenates the start (B1) and end (B2) references with a colon 
to create a range string ("A2:A5"). INDIRECT converts this to a real range 
that SUM can evaluate. The result is 60.

## INDIRECT with Table References

INDIRECT can reference Excel Table columns dynamically. This example shows how 
to reference different columns in a table based on cell values.

  
    A
    B
    C
  
  
    Column
    Price
    
  
  
    
    
    =SUM(INDIRECT("Table1["&amp;B1&amp;"]"))
  

Assuming we have a table named "Table1" with columns "Price", "Quantity", etc. 
The formula in C2 sums the "Price" column because B1 contains "Price".

INDIRECT with Table column reference
  

=SUM(INDIRECT("Table1["&amp;B1&amp;"]"))

This formula builds a structured reference to a table column. It concatenates 
"Table1[" with the column name from B1 and "]" to form "Table1[Price]". 
INDIRECT converts this to a reference SUM can use to total the column.

## INDIRECT Volatile Nature

INDIRECT is a volatile function, meaning it recalculates whenever any change 
occurs in the workbook. This example demonstrates this behavior.

  
    A
    B
  
  
    Reference
    A10
  
  
    
    =INDIRECT(B1)
  

If you change B1 from "A10" to "A20", the INDIRECT formula immediately 
recalculates to show the value from A20. This happens even if no cells in the 
direct calculation chain were modified.

Volatile INDIRECT formula
  

=INDIRECT(B1)

This formula will recalculate whenever any cell in the workbook changes, not 
just when B1 or the referenced cell changes. This can impact performance in 
large workbooks with many INDIRECT functions.

## INDIRECT with External References

INDIRECT cannot directly reference closed workbooks. This example shows a 
workaround using helper cells.

INDIRECT with external reference workaround
  

=INDIRECT("'"&amp;A1&amp;"["&amp;B1&amp;"]"&amp;C1&amp;"'!"&amp;D1)

Where A1=workbook name, B1=sheet name, C1=file extension, D1=cell reference. 
This only works when the external workbook is open. For closed workbooks, 
consider VBA or Power Query instead.

## INDIRECT vs. INDEX for Dynamic References

While INDIRECT is flexible, INDEX is often better for performance. This example 
compares both approaches.

  
    A
    B
    C
  
  
    Data
    Row
    Column
  
  
    10
    2
    1
  
  
    20
    
    
  
  
    30
    
    
  
  
    
    
    =INDEX(A1:A3, B2, C2)
  

The INDEX formula in C4 returns 20 (row 2, column 1 of A1:A3). Unlike INDIRECT, 
INDEX is non-volatile and often preferred for dynamic references when possible.

INDEX as INDIRECT alternative
  

=INDEX(A1:A3, B2, C2)

This formula provides similar dynamic reference capability as INDIRECT but with 
better performance. It returns the value at row B2 (2) and column C2 (1) from 
range A1:A3. Consider INDEX when you don't need text-based references.

The INDIRECT function is a powerful tool for creating dynamic 
references in Excel. From basic cell references to complex cross-sheet 
formulas, INDIRECT handles many advanced scenarios. Remember that 
it's volatile and can't reference closed workbooks. Use it judiciously and 
consider alternatives like INDEX when appropriate.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).