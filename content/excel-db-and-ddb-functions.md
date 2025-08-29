+++
title = "Excel DB and DDB Functions"
date = 2025-08-29T19:54:01.486+01:00
draft = false
description = "Complete tutorial on Excel DB and DDB functions with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel DB and DDB Functions

last modified April 4, 2025

The DB and DDB functions are Excel's depreciation 
functions used in financial calculations. DB calculates fixed-
declining balance depreciation, while DDB calculates double-
declining balance depreciation. This tutorial provides a comprehensive guide 
to using these functions with detailed examples.

## DB/DDB Function Basics

Depreciation functions calculate the decrease in value of an asset over time. 
DB uses a fixed rate, while DDB uses an accelerated 
method. Both are essential for financial modeling and accounting.

  
    Function
    Description
    Syntax
  
  
    DB
    Fixed-declining balance depreciation
    =DB(cost, salvage, life, period, [month])
  
  
    DDB
    Double-declining balance depreciation
    =DDB(cost, salvage, life, period, [factor])
  

This table compares the two depreciation functions. Both require cost, salvage 
value, useful life, and period arguments. DB has an optional month parameter, 
while DDB has an optional factor.

## Basic DB Function Example

This example demonstrates the simplest use of the DB function to calculate 
depreciation for an asset with a 5-year life.

Basic DB formula
  

=DB(10000, 1000, 5, 1)

This formula calculates first year depreciation for a $10,000 asset with $1,000 
salvage value over 5 years. The result is $3,690.00. DB automatically 
calculates the fixed rate based on the inputs.

## DB Function with Partial First Year

The DB function's optional month parameter handles assets purchased mid-year. 
This example shows depreciation for an asset bought in month 4.

  
    A
    B
  
  
    Cost
    15000
  
  
    Salvage
    2000
  
  
    Life
    6
  
  
    Period
    1
  
  
    Month
    4
  
  
    Depreciation
    =DB(B1, B2, B3, B4, B5)
  

The table shows inputs for an asset purchased in April (month 4). The DB 
function adjusts first year depreciation to account for the partial year.

DB with partial first year
  

=DB(15000, 2000, 6, 1, 4)

This formula calculates first year depreciation for 9 months (April-December). 
The result is $2,835.00. Subsequent years will use full 12-month periods.

## Basic DDB Function Example

This example demonstrates the DDB function's accelerated depreciation method. 
It uses double the straight-line rate by default.

Basic DDB formula
  

=DDB(8000, 500, 5, 3)

This formula calculates third year depreciation for an $8,000 asset with $500 
salvage value over 5 years. The result is $1,152.00. DDB front-loads 
depreciation compared to DB.

## DDB with Custom Factor

The DDB function's optional factor parameter lets you specify the depreciation 
rate. This example uses 1.5 instead of the default 2.

  
    A
    B
  
  
    Cost
    12000
  
  
    Salvage
    1500
  
  
    Life
    4
  
  
    Period
    2
  
  
    Factor
    1.5
  
  
    Depreciation
    =DDB(B1, B2, B3, B4, B5)
  

The table shows inputs for a 1.5x declining balance method. This produces less 
accelerated depreciation than the standard 2x DDB method.

DDB with custom factor
  

=DDB(12000, 1500, 4, 2, 1.5)

This formula calculates second year depreciation using a 1.5 factor instead of 
2. The result is $3,375.00. Custom factors provide flexibility in depreciation 
schedules.

## Comparing DB and DDB Methods

This example compares depreciation amounts between DB and DDB methods for the 
same asset across its useful life.

  
    Year
    DB
    DDB
  
  
    1
    =DB(20000,2000,5,1)
    =DDB(20000,2000,5,1)
  
  
    2
    =DB(20000,2000,5,2)
    =DDB(20000,2000,5,2)
  
  
    3
    =DB(20000,2000,5,3)
    =DDB(20000,2000,5,3)
  
  
    4
    =DB(20000,2000,5,4)
    =DDB(20000,2000,5,4)
  
  
    5
    =DB(20000,2000,5,5)
    =DDB(20000,2000,5,5)
  

The table shows side-by-side depreciation calculations for both methods. DB 
produces a smoother curve while DDB shows higher early-year depreciation.

The DB and DDB functions provide powerful tools for 
financial analysis. DB offers consistent depreciation, while DDB accelerates 
expenses. Choose based on your accounting needs and tax strategy. Remember 
that both methods will depreciate down to (but not below) the salvage value.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel Formulas](/all/#excel).