+++
title = "PowerShell Double Type"
date = 2025-08-29T20:06:49.607+01:00
draft = false
description = "Learn to use PowerShell's double type for precise floating-point calculations and numeric operations."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Double Type

last modified February 15, 2025

This tutorial explains PowerShell's double type, a 64-bit floating-point numeric
data type used for decimal calculations. Doubles provide precision for
scientific and financial operations while handling large value ranges.

The double type (System.Double) stores numbers with decimal points in IEEE 754
format. PowerShell automatically interprets numbers with decimals as doubles,
but explicit typing ensures data consistency in scripts.

## Declaring Double Variables

PowerShell infers numeric types based on values. Assign decimals to create
doubles automatically:

basic_double.ps1
  

$pi = 3.1415926535
[double]$gravity = 9.80665

Write-Output "Pi: $pi"
Write-Output "Gravity: $gravity"

This script demonstrates implicit and explicit double declarations. Both
variables store 64-bit floating-point values.

$pi = 3.1415926535

PowerShell automatically assigns the double type when using decimal values.

[double]$gravity = 9.80665

Explicit typing ensures the variable remains a double even if assigned
whole numbers later.

## Arithmetic Operations

Doubles support standard arithmetic operations. Be mindful of precision
limitations in complex calculations:

operations.ps1
  

$radius = 5.5
$area = [math]::PI * ($radius * $radius)
Write-Output "Circle area: $area"

This calculates a circle's area using the Math.PI constant. Note the
result's precision extends to 15 decimal places.

## Precision Considerations

Double precision can lead to rounding errors in sensitive calculations:

precision.ps1
  

$sum = 0.1 + 0.2
$comparison = $sum -eq 0.3
Write-Output "0.1 + 0.2 equals 0.3? $comparison"

Due to binary representation, this comparison returns False. Use decimal
type for exact precision in financial calculations.

## Type Conversion

Convert between numeric types using casting or parsing:

conversion.ps1
  

$stringValue = "123.45"
$doubleFromString = [double]::Parse($stringValue)
$intToDouble = [double]42

Write-Output "Parsed: $doubleFromString"
Write-Output "Integer to double: $intToDouble"

This demonstrates safe conversion from string and integer types to double.

## Formatting Double Output

Control decimal display using format strings:

formatting.ps1
  

$temperature = 23.56789
Write-Output ("Formatted: {0:N2}°C" -f $temperature)
Write-Output ("Scientific: {0:E3}" -f $temperature)

The format operator (-f) specifies decimal places and scientific notation.

## Source

[Microsoft Double Type Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.double)

This tutorial covered essential double type operations in PowerShell. For
precision-critical applications, consider the decimal type. Always test
floating-point logic thoroughly.

## Author

Jan Bodnar is a software developer and technical writer with extensive
experience in system programming and scripting languages. Author of multiple
programming books and maintainer of the ZetCode tutorial platform.

List [all PowerShell tutorials](/powershell/).