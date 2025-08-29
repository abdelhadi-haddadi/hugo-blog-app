+++
title = "Excel FV Function"
date = 2025-08-29T19:54:05.978+01:00
draft = false
description = "Complete tutorial on Excel FV function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel FV Function

last modified April 4, 2025

The FV function calculates the future value of an investment based 
on periodic, constant payments and a constant interest rate. This tutorial 
provides a comprehensive guide to using the FV function with 
detailed examples. You'll learn basic syntax, practical applications, and 
advanced techniques to master this financial function.

## FV Function Basics

The FV function calculates the future value of an investment. It 
considers regular payments, interest rate, and time period. The syntax includes 
required and optional arguments for flexibility.

  
    Component
    Description
  
  
    Function Name
    FV
  
  
    Syntax
    =FV(rate, nper, pmt, [pv], [type])
  
  
    Arguments
    rate, nper, pmt, [pv], [type]
  
  
    Return Value
    Future value of investment
  

This table breaks down the essential components of the FV
function. It shows the function name, syntax format, arguments, and return 
value characteristics. All arguments except pv and type are required.

## Basic FV Example

This example demonstrates the simplest use of the FV function with regular 
payments and interest rate.

Basic FV formula
  

=FV(5%/12, 10*12, -100)

This formula calculates the future value of $100 monthly payments for 10 years 
at 5% annual interest. The result will be $15,528.23. The negative payment 
indicates cash outflow.

## FV with Lump Sum Investment

This example shows how to calculate future value with an initial lump sum 
investment plus regular contributions.

  
    A
    B
  
  
    Annual Rate
    6%
  
  
    Years
    5
  
  
    Monthly Payment
    -200
  
  
    Initial Investment
    -5000
  
  
    Future Value
    =FV(B1/12, B2*12, B3, B4)
  

The table shows parameters for calculating future value with both initial 
investment and regular contributions. The formula divides the annual rate by 12 
for monthly compounding.

FV with initial investment
  

=FV(B1/12, B2*12, B3, B4)

This formula calculates the future value of $5,000 initial investment plus $200 
monthly payments for 5 years at 6% annual interest. The result is $19,560.81. 
Both payment and pv are negative representing cash outflows.

## FV with Payments at Beginning of Period

This example demonstrates using the type argument to specify payments at the 
beginning of each period.

  
    A
    B
  
  
    Quarterly Rate
    2%
  
  
    Periods
    20
  
  
    Payment
    -500
  
  
    Type
    1
  
  
    Future Value
    =FV(B1, B2, B3, 0, B4)
  

The table shows parameters for calculating future value with payments at period 
start. Type=1 changes payment timing, increasing the future value compared to 
end-of-period payments.

FV with beginning period payments
  

=FV(B1, B2, B3, 0, B4)

This formula calculates future value of $500 quarterly payments for 20 periods 
at 2% per quarter, with payments at period start. The result is $12,148.68. 
Setting type to 1 yields higher FV than default end-of-period payments.

## FV for Retirement Savings

This practical example shows how to project retirement savings using the FV 
function with realistic parameters.

  
    A
    B
  
  
    Annual Return
    7%
  
  
    Years to Retirement
    30
  
  
    Monthly Contribution
    -1000
  
  
    Current Savings
    -50000
  
  
    Retirement Value
    =FV(B1/12, B2*12, B3, B4)
  

The table demonstrates retirement planning with current savings and regular 
contributions. The formula converts annual parameters to monthly equivalents 
for accurate compounding.

Retirement savings calculation
  

=FV(B1/12, B2*12, B3, B4)

This formula projects $1,000 monthly contributions plus $50,000 initial 
investment over 30 years at 7% annual return. The future value is $1,522,764.47. 
Negative values represent cash outflows (investments).

## FV for Loan Balance

This example shows how to use FV to calculate remaining loan balance after 
making payments for a certain period.

  
    A
    B
  
  
    Annual Rate
    4.5%
  
  
    Loan Term (years)
    30
  
  
    Loan Amount
    250000
  
  
    Years Paid
    10
  
  
    Remaining Balance
    =FV(B1/12, B4*12, PMT(B1/12,B2*12,B3), -B3)
  

The table shows loan parameters and calculates remaining balance after 10 years. 
It uses PMT to calculate the monthly payment first, then FV to find the 
remaining balance.

Loan balance calculation
  

=FV(B1/12, B4*12, PMT(B1/12,B2*12,B3), -B3)

This formula calculates remaining balance on a $250,000 loan at 4.5% after 10 
years of 30-year term. The result is $202,907.93. The PMT function calculates 
the monthly payment used in FV calculation.

## FV with Variable Rates

This advanced example shows how to approximate FV with variable interest rates 
using multiple FV calculations.

  
    A
    B
  
  
    Initial Investment
    -10000
  
  
    Year 1 Rate
    5%
  
  
    Year 2 Rate
    4.5%
  
  
    Year 3 Rate
    6%
  
  
    Future Value
    =FV(B2,1,0,B1)*FV(B3,1,0,1)*FV(B4,1,0,1)
  

The table demonstrates calculating future value with changing annual rates. Each 
FV calculation compounds the result for one year at that year's specific rate.

FV with variable rates
  

=FV(B2,1,0,B1)*FV(B3,1,0,1)*FV(B4,1,0,1)

This formula calculates future value of $10,000 investment with rates changing 
annually. The result is $11,623.70. Each FV segment handles one year's growth, 
chaining results together.

The FV function is essential for financial planning in Excel. From 
simple savings to complex loans, FV helps project investment 
growth. Mastering its arguments and applications will improve your financial 
analysis. Remember that payment and present value typically use negative 
numbers to represent cash outflows.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).