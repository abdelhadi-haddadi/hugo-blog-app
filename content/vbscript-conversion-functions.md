+++
title = "VBScript Conversion Functions"
date = 2025-08-29T20:14:39.464+01:00
draft = false
description = "Learn about VBScript conversion functions, including CInt, CStr, CBool, and more. Understand how to convert between data types effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Conversion Functions

last modified April 4, 2025

VBScript provides several built-in functions to convert between different data
types. These functions are essential when you need to ensure data is in the
correct format. Conversion functions help prevent errors and ensure consistent
behavior in your scripts. This tutorial covers all major VBScript conversion
functions with practical examples.

## VBScript Conversion Functions Overview

VBScript conversion functions transform data from one type to another. Common
functions include CInt, CLng, CSng,
CDbl, CBool, CStr, CDate,
and CByte. Each function handles specific type conversions.

These functions are particularly useful when working with user input or data from
external sources. They help ensure values are in the expected format before
processing. Understanding these functions is crucial for robust script
development.

## Converting to Integer with CInt

The CInt function converts an expression to an Integer subtype. It
rounds fractional values to the nearest integer. If the value is outside the
Integer range (-32,768 to 32,767), an error occurs. This is useful for whole
number calculations.

cint_example.vbs
  

Dim num1, num2, num3
num1 = CInt("123")       ' String to Integer
num2 = CInt(45.67)       ' Double to Integer (rounds to 46)
num3 = CInt(True)        ' Boolean to Integer (True = -1)

WScript.Echo "num1: " &amp; num1
WScript.Echo "num2: " &amp; num2
WScript.Echo "num3: " &amp; num3

This example shows different conversions to Integer. Notice how the Boolean
value True converts to -1. The function handles string representations of
numbers and performs rounding for floating-point values.

## Converting to String with CStr

The CStr function converts any expression to a String subtype. This
is useful for displaying values or concatenating with other strings. It handles
all VBScript data types including numbers, dates, and Booleans.

cstr_example.vbs
  

Dim str1, str2, str3, str4
str1 = CStr(123)         ' Integer to String
str2 = CStr(45.67)       ' Double to String
str3 = CStr(#4/15/2025#) ' Date to String
str4 = CStr(False)       ' Boolean to String

WScript.Echo "str1: " &amp; str1
WScript.Echo "str2: " &amp; str2
WScript.Echo "str3: " &amp; str3
WScript.Echo "str4: " &amp; str4

This example demonstrates converting various data types to strings. The output
shows how different values are represented as strings. Date conversion uses the
short date format based on system settings.

## Converting to Boolean with CBool

The CBool function converts an expression to a Boolean subtype. It
returns True for non-zero numbers and non-empty strings. Empty strings, zero,
and Null convert to False. This is useful for conditional evaluations.

cbool_example.vbs
  

Dim bool1, bool2, bool3, bool4
bool1 = CBool(1)         ' Non-zero to True
bool2 = CBool(0)         ' Zero to False
bool3 = CBool("Hello")   ' Non-empty string to True
bool4 = CBool("")        ' Empty string to False

WScript.Echo "bool1: " &amp; bool1
WScript.Echo "bool2: " &amp; bool2
WScript.Echo "bool3: " &amp; bool3
WScript.Echo "bool4: " &amp; bool4

This example shows how different values convert to Boolean. Notice how any
non-zero number becomes True. String conversion depends on whether the string
contains characters or is empty.

## Converting to Date with CDate

The CDate function converts a valid date string or number to a Date
subtype. It recognizes various date formats based on system locale settings.
Invalid date strings cause runtime errors. This is essential for date processing.

cdate_example.vbs
  

Dim date1, date2, date3
date1 = CDate("April 15, 2025")
date2 = CDate("15/4/2025")
date3 = CDate("2:30:45 PM")

WScript.Echo "date1: " &amp; date1
WScript.Echo "date2: " &amp; date2
WScript.Echo "date3: " &amp; date3

This example demonstrates converting different date and time strings. The
function is flexible with input formats but requires valid dates. Time values can
be converted separately or combined with dates.

## Type Checking Functions

VBScript provides functions to check variable types before conversion. These
include IsNumeric, IsDate, IsArray, and
IsObject. They return True if the variable can be converted to the
specified type. This prevents conversion errors.

type_checking.vbs
  

Dim check1, check2, check3
check1 = IsNumeric("123")     ' True
check2 = IsDate("April 15")   ' True
check3 = IsNumeric("ABC")     ' False

WScript.Echo "IsNumeric('123'): " &amp; check1
WScript.Echo "IsDate('April 15'): " &amp; check2
WScript.Echo "IsNumeric('ABC'): " &amp; check3

This example shows how to safely check types before conversion. These functions
are valuable for validating user input or external data. They help write more
robust scripts by preventing conversion errors.

## Source

[VBScript Conversion Functions Documentation](https://learn.microsoft.com/en-us/previous-versions//x4b6ttd3(v=vs.85))

In this article, we have explored VBScript conversion functions in depth. From
basic type conversions to advanced type checking, these functions are essential
for reliable scripting. The examples demonstrate practical usage scenarios that
you can adapt to your own projects. With this knowledge, you can handle data
type conversions confidently in your VBScript programs.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).