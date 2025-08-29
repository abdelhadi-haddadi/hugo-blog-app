+++
title = "Excel COUNTIF and COUNTIFS Functions"
date = 2025-08-29T19:54:00.396+01:00
draft = false
description = "Complete tutorial on Excel COUNTIF and COUNTIFS functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel COUNTIF and COUNTIFS Functions

last modified April 4, 2025

The COUNTIF and COUNTIFS functions are powerful tools
for counting cells that meet specific criteria. COUNTIF handles
single conditions, while COUNTIFS supports multiple criteria.
This tutorial provides a comprehensive guide to using these functions with
detailed examples. You'll learn basic syntax, practical applications, and
advanced techniques.

## COUNTIF/COUNTIFS Function Basics

COUNTIF counts cells in a range that meet a single condition.
COUNTIFS extends this functionality to multiple criteria ranges.
Both are essential for data analysis in Excel.

  
    Function
    Description
    Syntax
  
  
    COUNTIF
    Counts cells meeting one condition
    =COUNTIF(range, criteria)
  
  
    COUNTIFS
    Counts cells meeting multiple conditions
    =COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
  

This table compares the two functions. COUNTIF uses one range and
criteria, while COUNTIFS can handle multiple range/criteria pairs.
Both functions support various comparison operators and wildcards.

## Basic COUNTIF Example

This example demonstrates counting cells that contain a specific value.

  
    A
    B
  
  
    Apple
    
  
  
    Orange
    
  
  
    Apple
    
  
  
    Banana
    
  
  
    
    =COUNTIF(A1:A4, "Apple")
  

Basic COUNTIF formula
  

=COUNTIF(A1:A4, "Apple")

This formula counts how many times "Apple" appears in cells A1 through A4.
The result will be 2. The criteria can be a value, cell reference, or
expression. Text criteria must be enclosed in quotes.

## COUNTIF with Comparison Operators

COUNTIF supports comparison operators like &gt;, &lt;, &gt;=,
&lt;=, and &lt;&gt;. This example counts numbers greater than a threshold.

  
    A
    B
  
  
    15
    
  
  
    25
    
  
  
    10
    
  
  
    30
    
  
  
    
    =COUNTIF(A1:A4, "&gt;20")
  

COUNTIF with comparison operator
  

=COUNTIF(A1:A4, "&gt;20")

This formula counts how many numbers in A1:A4 are greater than 20. The result
is 2 (25 and 30). Note the operator is enclosed in quotes with the number.
You can also reference a cell for the threshold value.

## COUNTIF with Wildcards

COUNTIF supports wildcards for partial text matching. The asterisk
(*) matches any sequence of characters, while the question mark (?) matches any
single character.

  
    A
    B
  
  
    Apple
    
  
  
    Application
    
  
  
    Banana
    
  
  
    App
    
  
  
    
    =COUNTIF(A1:A4, "App*")
  

COUNTIF with wildcard
  

=COUNTIF(A1:A4, "App*")

This formula counts cells starting with "App". The result is 3 (Apple,
Application, App). Wildcards are powerful for text pattern matching. To match
an actual asterisk or question mark, precede it with a tilde (~).

## COUNTIF with Dates

COUNTIF can count cells based on date criteria. Dates in Excel are
stored as numbers, allowing date comparisons.

  
    A
    B
  
  
    1/15/2023
    
  
  
    2/20/2023
    
  
  
    1/10/2023
    
  
  
    3/5/2023
    
  
  
    
    =COUNTIF(A1:A4, "&gt;1/31/2023")
  

COUNTIF with date criteria
  

=COUNTIF(A1:A4, "&gt;1/31/2023")

This formula counts dates after January 31, 2023. The result is 2 (2/20/2023
and 3/5/2023). For better flexibility, reference a cell containing the date
rather than hardcoding it.

## Basic COUNTIFS Example

COUNTIFS extends COUNTIF by supporting multiple
criteria. This example counts rows meeting two conditions.

  
    A
    B
    C
  
  
    Apple
    Red
    
  
  
    Apple
    Green
    
  
  
    Banana
    Yellow
    
  
  
    Apple
    Red
    
  
  
    
    
    =COUNTIFS(A1:A4, "Apple", B1:B4, "Red")
  

Basic COUNTIFS formula
  

=COUNTIFS(A1:A4, "Apple", B1:B4, "Red")

This formula counts rows where column A is "Apple" AND column B is "Red". The
result is 2. COUNTIFS requires all criteria to be met simultaneously. Each
additional criteria pair follows the same range/criteria pattern.

## COUNTIFS with Multiple Criteria Types

COUNTIFS can combine different types of criteria in one formula. This example
uses text, number, and date criteria together.

  
    A
    B
    C
    D
  
  
    North
    500
    1/5/2023
    
  
  
    South
    750
    2/10/2023
    
  
  
    North
    300
    1/20/2023
    
  
  
    East
    900
    3/15/2023
    
  
  
    
    
    
    =COUNTIFS(A1:A4, "North", B1:B4, "&gt;400", C1:C4, "&gt;=1/1/2023")
  

COUNTIFS with mixed criteria
  

=COUNTIFS(A1:A4, "North", B1:B4, "&gt;400", C1:C4, "&gt;=1/1/2023")

This formula counts rows where region is "North", sales &gt; 400, and date is on
or after 1/1/2023. The result is 1 (first row). COUNTIFS is
powerful for complex multi-condition counting scenarios.

## COUNTIFS with OR Logic

While COUNTIFS uses AND logic by default, you can
simulate OR logic by adding multiple COUNTIFS results.
This example counts rows meeting either of two conditions.

  
    A
    B
    C
  
  
    Apple
    Red
    
  
  
    Banana
    Yellow
    
  
  
    Grape
    Purple
    
  
  
    Apple
    Green
    
  
  
    
    
    =COUNTIFS(A1:A4, "Apple") + COUNTIFS(A1:A4, "Banana")
  

OR logic with COUNTIFS
  

=COUNTIFS(A1:A4, "Apple") + COUNTIFS(A1:A4, "Banana")

This formula counts fruits that are either Apples OR Bananas. The result is 3.
For more complex OR conditions, consider using SUMPRODUCT with multiple
conditions instead.

## COUNTIF with Cell Reference Criteria

Instead of hardcoding criteria, you can reference other cells. This makes
formulas dynamic and easier to modify.

  
    A
    B
    C
  
  
    Apple
    Apple
    
  
  
    Orange
    
    
  
  
    Apple
    
    
  
  
    Banana
    
    
  
  
    
    
    =COUNTIF(A1:A4, B1)
  

COUNTIF with cell reference
  

=COUNTIF(A1:A4, B1)

This formula counts occurrences of the value in B1 ("Apple") within A1:A4. The
result is 2. Using cell references makes formulas adaptable to changing
requirements without editing the formula itself.

## COUNTIF/COUNTIFS with Blank or Non-Blank Cells

These functions can count blank or non-blank cells using specific criteria
syntax.

  
    A
    B
  
  
    Apple
    
  
  
    
    
  
  
    Orange
    
  
  
    
    
  
  
    
    =COUNTIF(A1:A4, "")
  

COUNTIF for blank cells
  

=COUNTIF(A1:A4, "")

This formula counts blank cells in A1:A4. The result is 2. For non-blank cells,
use "&lt;&gt;" (not equal to empty string) as criteria. These techniques are useful
for data completeness analysis.

## COUNTIF/COUNTIFS Performance Tips

When working with large datasets, these tips can improve performance:

- Use specific ranges instead of entire columns (e.g., A1:A100 vs A:A).

- Avoid volatile functions like TODAY() in criteria if possible.

- Combine with Excel Tables for structured references and efficiency.

- Use helper columns to simplify complex criteria when practical.

## Common Use Cases

COUNTIF/COUNTIFS are versatile for many scenarios:

- Counting sales above a target in specific regions.

- Tracking inventory items by category and status.

- Analyzing survey responses with multiple conditions.

- Monitoring project tasks by completion dates.

## Limitations

Be aware of these limitations when using COUNTIF/COUNTIFS:

- COUNTIFS requires all ranges to be the same size.

- Case-insensitive; can't distinguish "apple" vs "Apple".

- Limited to 255 characters for criteria strings.

- No built-in OR logic within a single COUNTIFS formula.

COUNTIF and COUNTIFS are essential for counting data
based on conditions in Excel. From simple tallies to complex multi-criteria
analysis, they offer powerful functionality. This tutorial covered their
syntax, usage with examples, and practical tips. Mastering these functions
enhances your data analysis capabilities significantly.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).