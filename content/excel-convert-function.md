+++
title = "Excel CONVERT Function"
date = 2025-08-29T19:53:59.295+01:00
draft = false
description = "Complete tutorial on Excel CONVERT function with detailed examples and explanations."
image = ""
imageBig = ""
categories = ["excel"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Excel CONVERT Function

last modified April 4, 2025

The CONVERT function is a powerful measurement conversion tool in 
Excel. It converts a number from one measurement system to another. This 
tutorial provides a comprehensive guide to using the CONVERT 
function with detailed examples. You'll learn basic syntax, supported units, 
and practical applications.

## CONVERT Function Basics

The CONVERT function changes measurements between different unit 
systems. It supports distance, weight, time, pressure, force, energy, power, 
magnetism, temperature, and volume. The syntax requires three arguments.

  
    Component
    Description
  
  
    Function Name
    CONVERT
  
  
    Syntax
    =CONVERT(number, from_unit, to_unit)
  
  
    Arguments
    Number to convert, original unit, target unit
  
  
    Return Value
    Converted measurement in new units
  

This table breaks down the essential components of the CONVERT 
function. The function requires a numeric value and two unit codes as text 
strings. Excel supports over 100 different unit conversions.

## Basic CONVERT Example

This example demonstrates converting inches to centimeters using the CONVERT 
function.

  
    A
    B
  
  
    10
    
  
  
    
    =CONVERT(A1, "in", "cm")
  

The table shows a length in inches in cell A1 and the conversion formula in B2 
that converts it to centimeters. The result will be 25.4 cm.

Basic CONVERT formula
  

=CONVERT(10, "in", "cm")

This formula converts 10 inches to centimeters. The result will be 25.4 cm. 
Note that unit codes must be enclosed in quotation marks and are case-sensitive.

## Temperature Conversion

Temperature conversion requires special handling as it involves different 
measurement scales. This example converts Celsius to Fahrenheit.

  
    A
    B
  
  
    100
    
  
  
    
    =CONVERT(A1, "C", "F")
  

The table shows a temperature value in Celsius in cell A1 and the conversion 
formula in B2 that converts it to Fahrenheit. The result will be 212°F.

Temperature conversion
  

=CONVERT(A1, "C", "F")

This formula converts the Celsius value in A1 to Fahrenheit. Temperature 
conversions use "C" for Celsius, "F" for Fahrenheit, and "K" for Kelvin. 
Unlike other units, temperature scales have different zero points.

## Weight Conversion

This example demonstrates converting pounds to kilograms, a common weight 
conversion needed in many applications.

  
    A
    B
  
  
    150
    
  
  
    
    =CONVERT(A1, "lbm", "kg")
  

The table shows a weight in pounds (lbm stands for pound-mass) in cell A1 and 
the conversion to kilograms in B2. The result will be approximately 68.0389 kg.

Weight conversion
  

=CONVERT(A1, "lbm", "kg")

This formula converts pounds (lbm) to kilograms (kg). Other weight units 
include "g" for gram, "ozm" for ounce, and "stone" for stone. Always verify 
you're using the correct unit code.

## Volume Conversion

Volume conversion is useful in cooking, chemistry, and other fields. This 
example converts gallons to liters.

  
    A
    B
  
  
    5
    
  
  
    
    =CONVERT(A1, "gal", "l")
  

The table demonstrates converting 5 gallons to liters. The result will be 
approximately 18.9271 liters. Volume conversions are particularly useful in 
international recipes or scientific work.

Volume conversion
  

=CONVERT(A1, "gal", "l")

This formula converts gallons (gal) to liters (l). Other volume units include 
"pt" for pint, "qt" for quart, "cup" for cup, and "tsp" for teaspoon. Note 
that "l" stands for liter, not to be confused with "L" which isn't a valid code.

## Energy Conversion

Energy conversion is important in physics and engineering. This example 
converts joules to calories.

  
    A
    B
  
  
    1000
    
  
  
    
    =CONVERT(A1, "J", "cal")
  

The table shows 1000 joules being converted to calories. The result will be 
approximately 239.006 calories. Energy conversions are essential in nutrition 
labeling and mechanical engineering.

Energy conversion
  

=CONVERT(A1, "J", "cal")

This formula converts joules (J) to calories (cal). Other energy units include 
"eV" for electron volt, "Wh" for watt-hour, and "BTU" for British thermal 
unit. Always check you're using the correct unit code for your specific needs.

## Common Errors

The CONVERT function returns errors when unit codes are incorrect or 
incompatible. This example shows common mistakes and their solutions.

  
    Formula
    Error
    Solution
  
  
    =CONVERT(10, "inch", "cm")
    #N/A
    Use "in" not "inch"
  
  
    =CONVERT(10, "kg", "m")
    #N/A
    Incompatible units
  
  
    =CONVERT("ten", "lb", "kg")
    #VALUE!
    First argument must be numeric
  

This table lists common CONVERT function errors and their causes. The most 
frequent issues involve incorrect unit codes or trying to convert between 
incompatible measurement types.

## Supported Unit Categories

The CONVERT function supports conversions in these major categories. Each has 
specific unit codes that must be used exactly as defined.

  
    Category
    Example Units
  
  
    Weight and Mass
    "g", "kg", "lbm", "ozm"
  
  
    Distance
    "m", "mi", "in", "ft", "yd"
  
  
    Time
    "yr", "day", "hr", "mn", "sec"
  
  
    Pressure
    "Pa", "atm", "mmHg"
  
  
    Force
    "N", "dyn", "lbf"
  
  
    Energy
    "J", "eV", "cal", "BTU"
  
  
    Power
    "W", "hp", "PS"
  
  
    Magnetism
    "T", "ga"
  
  
    Temperature
    "C", "F", "K"
  
  
    Volume
    "tsp", "cup", "gal", "l", "m3"
  

This comprehensive table shows the measurement categories supported by CONVERT 
with example unit codes. For a complete list, consult Excel's official 
documentation or use Excel's formula autocomplete feature.

The CONVERT function is an essential tool for anyone working with 
multiple measurement systems in Excel. From simple distance conversions to 
complex engineering calculations, it provides accurate results quickly. 
Remember to verify unit codes and test conversions with known values to ensure 
accuracy in your spreadsheets.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Excel tutorials](/all/#excel).