+++
title = "Excel XIRR Function"
date = 2025-08-29T19:54:28.473+01:00
draft = false
description = "Complete tutorial on Excel XIRR function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel XIRR Function

last modified April 4, 2025

The XIRR function calculates the internal rate of return for a 
series of cash flows with irregular intervals. It's essential for financial 
analysis. This tutorial provides a comprehensive guide to using the 
XIRR function with detailed examples. You'll learn basic syntax, 
practical applications, and advanced techniques to master this financial 
function.

## XIRR Function Basics

The XIRR function returns the internal rate of return for cash 
flows that don't occur at regular periods. It considers both amounts and exact 
dates. The syntax requires values and corresponding dates.

  
    Component
    Description
  
  
    Function Name
    XIRR
  
  
    Syntax
    =XIRR(values, dates, [guess])
  
  
    Arguments
    values (required), dates (required), guess (optional)
  
  
    Return Value
    Internal rate of return as decimal
  

This table breaks down the essential components of the XIRR
function. It shows the function name, basic syntax format, argument 
requirements, and return value characteristics.

## Basic XIRR Example

This example demonstrates a simple investment scenario with irregular cash 
flows. We'll calculate the annualized return.

  
    A
    B
  
  
    1/1/2023
    -10000
  
  
    4/15/2023
    2750
  
  
    10/30/2023
    4250
  
  
    2/15/2024
    3250
  
  
    6/1/2024
    2750
  

The table shows an initial investment of $10,000 on 1/1/2023 (negative value) 
followed by four positive returns at irregular intervals. We'll calculate the 
annualized return rate.

Basic XIRR formula
  

=XIRR(B1:B5, A1:A5)

This formula calculates the internal rate of return for the cash flows in column 
B with corresponding dates in column A. The result will be approximately 0.185 
or 18.5% annualized return.

## XIRR with Guess Parameter

The optional guess parameter helps Excel find the solution when cash flows are 
complex. This example shows how to use it.

  
    A
    B
  
  
    3/1/2023
    -5000
  
  
    6/1/2023
    1500
  
  
    9/1/2023
    1500
  
  
    12/1/2023
    1500
  
  
    3/1/2024
    1500
  
  
    6/1/2024
    1500
  

The table shows an investment with multiple periodic returns. We'll use a guess 
value of 0.1 (10%) to help Excel find the solution faster.

XIRR with guess parameter
  

=XIRR(B1:B6, A1:A6, 0.1)

This formula calculates the internal rate of return with an initial guess of 
10%. The result will be approximately 0.131 or 13.1% annualized return. The 
guess parameter can prevent calculation errors in complex scenarios.

## XIRR for Business Investment

This example demonstrates using XIRR to evaluate a business investment with 
irregular cash flows over several years.

  
    A
    B
  
  
    1/15/2022
    -250000
  
  
    7/30/2022
    45000
  
  
    1/15/2023
    55000
  
  
    7/30/2023
    65000
  
  
    1/15/2024
    75000
  
  
    7/30/2024
    85000
  
  
    1/15/2025
    95000
  

The table shows a $250,000 business investment with semi-annual returns that 
increase over time. We'll calculate the annualized return rate.

XIRR for business evaluation
  

=XIRR(B1:B7, A1:A7)

This formula evaluates the business investment's performance. The result will 
be approximately 0.148 or 14.8% annualized return. XIRR is ideal for such 
real-world scenarios with irregular cash flows.

## XIRR for Personal Finance

This example shows how to use XIRR to calculate returns on personal 
investments with irregular contributions and withdrawals.

  
    A
    B
  
  
    1/1/2023
    -10000
  
  
    4/1/2023
    -2000
  
  
    7/1/2023
    -1500
  
  
    10/1/2023
    5000
  
  
    1/1/2024
    12000
  

The table shows initial and additional investments (negative values) followed 
by withdrawals (positive values). This mimics real personal finance situations 
with irregular activity.

XIRR for personal finance
  

=XIRR(B1:B5, A1:A5)

This formula calculates the personal investment's annualized return. The result 
will be approximately 0.324 or 32.4%. XIRR handles mixed contributions and 
withdrawals perfectly.

## XIRR for Real Estate Investment

This advanced example demonstrates using XIRR to evaluate a real estate 
investment with irregular income and final sale.

  
    A
    B
  
  
    5/15/2020
    -350000
  
  
    8/1/2020
    12000
  
  
    11/1/2020
    12000
  
  
    2/1/2021
    12000
  
  
    5/1/2021
    12000
  
  
    8/1/2021
    12000
  
  
    11/1/2021
    12000
  
  
    2/1/2022
    12000
  
  
    5/1/2022
    12000
  
  
    8/1/2022
    12000
  
  
    11/1/2022
    12000
  
  
    2/1/2023
    12000
  
  
    5/1/2023
    450000
  

The table shows a real estate purchase, quarterly rental income, and final 
property sale. This complex cash flow pattern is ideal for XIRR analysis.

XIRR for real estate
  

=XIRR(B1:B13, A1:A13)

This formula evaluates the real estate investment's performance over three 
years. The result will be approximately 0.087 or 8.7% annualized return. XIRR 
perfectly handles such long-term, irregular cash flow scenarios.

The XIRR function is essential for financial analysis in Excel. 
From simple investments to complex business evaluations, XIRR 
handles irregular cash flows perfectly. Mastering its various applications will 
significantly improve your financial analysis skills. Remember that 
XIRR requires at least one negative and one positive value to 
calculate properly.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).