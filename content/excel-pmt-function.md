+++
title = "Excel PMT Function"
date = 2025-08-29T19:54:16.035+01:00
draft = false
description = "Complete tutorial on Excel PMT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel PMT Function

last modified April 4, 2025

The PMT function calculates loan payments based on constant 
payments and interest rate. It's essential for financial planning and loan 
analysis. This tutorial provides a comprehensive guide to using the 
PMT function with detailed examples. You'll learn basic syntax, 
practical applications, and advanced techniques to master this financial 
function.

## PMT Function Basics

The PMT function calculates the periodic payment for a loan. It 
considers interest rate, number of periods, and loan amount. The result 
includes both principal and interest components.

  
    Component
    Description
  
  
    Function Name
    PMT
  
  
    Syntax
    =PMT(rate, nper, pv, [fv], [type])
  
  
    Required Arguments
    rate, nper, pv
  
  
    Optional Arguments
    fv, type
  
  
    Return Value
    Periodic payment amount
  

This table breaks down the essential components of the PMT
function. It shows the function name, syntax format, required and optional 
arguments, and return value characteristics.

## Basic PMT Example

This example demonstrates the simplest use of the PMT function with a basic 
loan scenario.

Basic PMT formula
  

=PMT(5%/12, 60, 20000)

This formula calculates monthly payments for a $20,000 loan at 5% annual 
interest over 5 years (60 months). The result will be -$377.42. The negative 
sign indicates an outgoing payment.

## PMT with Annual Payments

This example shows how to calculate annual payments for a loan using the PMT 
function.

  
    A
    B
  
  
    Rate
    6%
  
  
    Term
    10
  
  
    Amount
    100000
  
  
    Payment
    =PMT(B1, B2, B3)
  

The table shows a loan of $100,000 at 6% annual interest for 10 years. The PMT 
formula in B4 calculates the annual payment amount.

PMT with annual payments
  

=PMT(B1, B2, B3)

This formula calculates annual payments for the loan parameters in B1-B3. The 
result will be -$13,586.80 per year. Note we use the annual rate directly 
since payments are annual.

## PMT with Future Value

This example demonstrates using the optional future value (fv) parameter to 
calculate payments needed to reach a savings goal.

  
    A
    B
  
  
    Rate
    4%
  
  
    Term
    20
  
  
    Current
    0
  
  
    Goal
    100000
  
  
    Payment
    =PMT(B1/12, B2*12, B3, B4)
  

The table shows a savings goal of $100,000 in 20 years with 4% annual interest. 
We calculate the monthly deposit needed starting from $0.

PMT with future value
  

=PMT(B1/12, B2*12, B3, B4)

This formula calculates monthly deposits needed to reach $100,000 in 20 years 
at 4% interest. The result is -$272.43. The negative value indicates an 
outgoing payment (deposit).

## PMT with Payment Timing

This example shows how the type parameter affects calculations when payments 
are due at the beginning of the period.

  
    A
    B
  
  
    Rate
    3.5%
  
  
    Term
    30
  
  
    Amount
    250000
  
  
    Payment
    =PMT(B1/12, B2*12, B3, 0, 1)
  

The table shows a $250,000 mortgage at 3.5% for 30 years with payments due at 
the beginning of each month. The type parameter (1) changes the calculation.

PMT with payment timing
  

=PMT(B1/12, B2*12, B3, 0, 1)

This formula calculates monthly mortgage payments due at period start. The 
result is -$1,117.62 compared to -$1,122.61 for end-of-period payments. The 
difference reflects the earlier payment timing.

## PMT with Balloon Payment

This example demonstrates using PMT with a balloon payment (remaining balance) 
at loan term end.

  
    A
    B
  
  
    Rate
    5.25%
  
  
    Term
    5
  
  
    Amount
    50000
  
  
    Balloon
    10000
  
  
    Payment
    =PMT(B1/12, B2*12, B3, -B4)
  

The table shows a $50,000 car loan at 5.25% for 5 years with $10,000 balloon 
payment. The PMT formula calculates monthly payments for this structure.

PMT with balloon payment
  

=PMT(B1/12, B2*12, B3, -B4)

This formula calculates monthly payments for a loan with $10,000 remaining 
balance. The result is -$746.18, lower than a standard loan's -$948.95 due to 
the balloon payment reducing the amortized amount.

## PMT with Different Compounding Periods

This example shows how to adjust PMT calculations when interest compounds 
differently than payment frequency.

PMT with quarterly compounding
  

=PMT((1+6%/4)^(4/12)-1, 36, 15000)

This formula calculates monthly payments for a $15,000 loan at 6% annual 
interest compounded quarterly for 3 years. We first convert the quarterly rate 
to an effective monthly rate. The result is -$456.33 per month.

The PMT function is essential for financial calculations in Excel. 
From simple loans to complex financial structures, PMT provides accurate 
payment calculations. Mastering its parameters enables precise financial 
planning. Remember to match rate and period units and consider payment timing 
for accurate results.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).