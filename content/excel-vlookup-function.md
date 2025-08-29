+++
title = "Excel VLOOKUP Function"
date = 2025-08-29T19:54:27.340+01:00
draft = false
description = "Complete tutorial on Excel VLOOKUP function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel VLOOKUP Function

last modified April 4, 2025

The VLOOKUP function is one of Excel's most powerful lookup and 
reference functions. It searches vertically down the first column of a range 
for a key and returns a value from a specified column. This tutorial provides 
a comprehensive guide to using VLOOKUP with detailed examples. 
You'll learn basic syntax, practical applications, and advanced techniques.

## VLOOKUP Function Basics

The VLOOKUP function searches for a value in the first column of 
a table array and returns a value in the same row from another column. It's 
essential for data retrieval tasks in Excel.

  
    Component
    Description
  
  
    Function Name
    VLOOKUP
  
  
    Syntax
    =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
  
  
    Arguments
    4 parameters (last optional)
  
  
    Return Value
    Matched value from table array
  

This table breaks down the essential components of the VLOOKUP
function. It shows the function name, syntax format, argument details, and 
return value characteristics.

## Basic VLOOKUP Example

This example demonstrates the simplest use of VLOOKUP to find product prices 
from a product ID.

  
    A
    B
    C
  
  
    Product ID
    Product Name
    Price
  
  
    P100
    Laptop
    999
  
  
    P101
    Mouse
    25
  
  
    P102
    Keyboard
    45
  
  
    
    
    =VLOOKUP("P101", A2:C4, 3, FALSE)
  

The table shows a product list with IDs, names, and prices. The VLOOKUP formula 
searches for product ID "P101" and returns its price from column 3.

Basic VLOOKUP formula
  

=VLOOKUP("P101", A2:C4, 3, FALSE)

This formula searches for "P101" in the first column of A2:C4. When found, it 
returns the value from the 3rd column of the same row. The FALSE parameter 
ensures exact match. Result will be 25.

## VLOOKUP with Cell Reference

A more practical use involves referencing a cell for the lookup value instead 
of hardcoding it. This makes the formula dynamic.

  
    A
    B
    C
    D
  
  
    Product ID
    Product Name
    Price
    Search ID
  
  
    P100
    Laptop
    999
    P102
  
  
    P101
    Mouse
    25
    
  
  
    P102
    Keyboard
    45
    =VLOOKUP(D2, A2:C4, 3, FALSE)
  

This table demonstrates using a cell reference (D2) for the lookup value. The 
formula in D4 will return the price for whatever product ID is entered in D2.

VLOOKUP with cell reference
  

=VLOOKUP(D2, A2:C4, 3, FALSE)

This formula looks up the value in D2 ("P102") within A2:C4 and returns the 
price from column 3. The result will be 45. Changing D2 updates the result 
automatically.

## VLOOKUP with Approximate Match

VLOOKUP can perform approximate matches when the last parameter is TRUE or 
omitted. This is useful for finding category ranges like tax brackets.

  
    A
    B
    C
  
  
    Income
    Tax Rate
    Income
  
  
    0
    10%
    42000
  
  
    20000
    15%
    
  
  
    40000
    22%
    =VLOOKUP(C2, A2:B4, 2, TRUE)
  

The table shows tax brackets with income thresholds and corresponding rates. 
The VLOOKUP finds the appropriate tax rate for the income in C2 (42000).

VLOOKUP with approximate match
  

=VLOOKUP(C2, A2:B4, 2, TRUE)

This formula finds the largest value in column A that is less than or equal to 
42000 (40000) and returns the corresponding tax rate (22%). The table must be 
sorted in ascending order for this to work correctly.

## VLOOKUP with Wildcards

VLOOKUP supports wildcards (* and ?) for partial matches when doing exact 
lookups (FALSE as last parameter). This helps find values when you know only 
part of the lookup value.

  
    A
    B
    C
  
  
    Product Name
    Price
    Search Term
  
  
    Wireless Mouse
    25
    *Mouse
  
  
    Bluetooth Keyboard
    45
    
  
  
    USB Cable
    10
    =VLOOKUP(C2, A2:B4, 2, FALSE)
  

The table demonstrates using wildcards in VLOOKUP. The formula searches for any 
product ending with "Mouse" and returns its price.

VLOOKUP with wildcard
  

=VLOOKUP(C2, A2:B4, 2, FALSE)

This formula searches for any value in column A that ends with "Mouse" (as 
specified by "*Mouse" in C2) and returns the corresponding price. The asterisk 
matches any sequence of characters. Result will be 25.

## VLOOKUP with Multiple Criteria

While VLOOKUP normally handles single criteria, you can combine it with helper 
columns to handle multiple criteria lookups.

  
    A
    B
    C
    D
    E
  
  
    Region
    Product
    Combined
    Sales
    Search
  
  
    East
    Widget
    EastWidget
    1500
    WestGadget
  
  
    West
    Gadget
    WestGadget
    2200
    
  
  
    North
    Tool
    NorthTool
    1800
    =VLOOKUP(E2, C2:D4, 2, FALSE)
  

The table shows sales data by region and product. Column C combines region and 
product to create a unique lookup key. The formula finds sales for West Gadget.

VLOOKUP with multiple criteria
  

=VLOOKUP(E2, C2:D4, 2, FALSE)

This formula searches for "WestGadget" in the combined key column (C) and 
returns the corresponding sales from column D. The result will be 2200. Helper 
columns enable multi-criteria lookups with VLOOKUP.

## VLOOKUP Common Errors

VLOOKUP can return several error values when things go wrong. Understanding 
these helps troubleshoot formulas.

  
    Error
    Cause
    Solution
  
  
    #N/A
    Lookup value not found
    Check spelling or use IFERROR
  
  
    #REF!
    Column index out of range
    Adjust col_index_num
  
  
    #VALUE!
    Invalid arguments
    Check parameter types
  

This table lists common VLOOKUP errors, their causes, and potential solutions. 
#N/A is the most frequent, occurring when the lookup value isn't found.

## VLOOKUP Limitations

While powerful, VLOOKUP has some important limitations to be aware of when 
designing your spreadsheets.

  
    Limitation
    Description
  
  
    Left lookup
    Cannot look to the left of key column
  
  
    Single criteria
    Natively handles only one lookup value
  
  
    First match
    Returns only the first matching value
  
  
    Static column
    Column index doesn't adjust automatically
  

The table outlines key VLOOKUP limitations. These constraints sometimes make 
INDEX/MATCH a better alternative for complex lookup scenarios.

The VLOOKUP function is indispensable for Excel users who need to 
retrieve data from tables. From simple exact matches to approximate range 
lookups and wildcard searches, VLOOKUP handles many common data tasks. 
Understanding its parameters and limitations will help you use it effectively. 
For more complex scenarios, consider learning INDEX/MATCH as an alternative.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).