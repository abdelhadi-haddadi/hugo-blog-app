+++
title = "VBScript Data Types"
date = 2025-08-29T20:14:39.468+01:00
draft = false
description = "Learn about VBScript data types, including Integer, String, Boolean, and more. Understand how to declare and use them effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Data Types

last modified April 4, 2025

VBScript is a loosely typed language with a variety of data types. Unlike
strongly typed languages, VBScript has only one fundamental data type called
Variant. The Variant type can contain different kinds
of data depending on context. This tutorial covers VBScript data types with
practical examples.

## VBScript Data Types Overview

VBScript uses Variant as its primary data type, which can hold
various subtypes. These subtypes are automatically determined based on the
context of usage. The main subtypes include Empty,
Null, Boolean, Byte,
Integer, Long, Single, Double,
Currency, Date, String, and
Object.

The Variant type is flexible but requires careful handling to avoid
unexpected type conversions. Understanding these subtypes helps write more
reliable scripts. We'll explore each with practical examples in the following
sections.

## Numeric Data Types

VBScript supports several numeric subtypes: Integer, Long, Single, Double, and
Currency. Integer and Long store whole numbers, while Single and Double store
floating-point numbers. Currency is for financial calculations.

numeric_types.vbs
  

Dim age, population, temperature, price
age = 25                          ' Integer
population = 7896541230           ' Long
temperature = 98.6                ' Single
price = 19.99                     ' Currency

WScript.Echo "Age: " &amp; age
WScript.Echo "Population: " &amp; population
WScript.Echo "Temperature: " &amp; temperature
WScript.Echo "Price: " &amp; price

This example demonstrates different numeric subtypes. The values are assigned
without explicit type declaration. VBScript automatically determines the
appropriate subtype based on the value's range and precision requirements.

## String Data Type

The String subtype contains sequences of characters. Strings are enclosed in
double quotes. VBScript strings can include letters, numbers, and special
characters. String manipulation is common in scripting tasks.

string_type.vbs
  

Dim name, greeting, address
name = "John Smith"
greeting = "Hello, World!"
address = "123 Main St, Anytown"

WScript.Echo name
WScript.Echo greeting
WScript.Echo "Address: " &amp; address

This example shows string variable declarations and concatenation. The ampersand
(&amp;) operator joins strings. Notice how strings can be used alone or combined
with other strings in the output.

## Boolean Data Type

The Boolean subtype holds logical values: True or
False. Booleans are used in conditional statements and logical
operations. In VBScript, True equals -1 and False
equals 0 when converted to numbers.

boolean_type.vbs
  

Dim isActive, hasPermission, isValid
isActive = True
hasPermission = False
isValid = (10 &gt; 5)  ' Expression evaluates to True

WScript.Echo "isActive: " &amp; isActive
WScript.Echo "hasPermission: " &amp; hasPermission
WScript.Echo "isValid: " &amp; isValid

This example demonstrates Boolean variables and expressions. The third variable
shows how comparison operations return Boolean values. These are fundamental for
control flow in scripts.

## Date Data Type

The Date subtype stores date and time information. VBScript
provides functions like Date, Time, and
Now to work with dates. Dates are enclosed in hash symbols (#) when
assigned directly.

date_type.vbs
  

Dim today, currentTime, birthday, appointment
today = Date()
currentTime = Time()
birthday = #12-15-1990#
appointment = #3/22/2025 2:30:00 PM#

WScript.Echo "Today: " &amp; today
WScript.Echo "Current time: " &amp; currentTime
WScript.Echo "Birthday: " &amp; birthday
WScript.Echo "Appointment: " &amp; appointment

This example shows different ways to work with dates. Notice the various date
formats that VBScript accepts. Date handling is crucial for many automation
tasks like file operations and scheduling.

## Special Data Types - Empty and Null

Empty indicates an uninitialized variable, while Null
represents no valid data. Empty variables convert to 0 or ""
depending on context. Null is used to indicate missing or unknown
data in database operations.

special_types.vbs
  

Dim uninitialized, missingData
missingData = Null

WScript.Echo "TypeName(uninitialized): " &amp; TypeName(uninitialized)
WScript.Echo "TypeName(missingData): " &amp; TypeName(missingData)
WScript.Echo "IsEmpty(uninitialized): " &amp; IsEmpty(uninitialized)
WScript.Echo "IsNull(missingData): " &amp; IsNull(missingData)

This example demonstrates Empty and Null values. The TypeName function reveals
the subtype, while IsEmpty and IsNull functions test for these special values.
Understanding these is important for robust script error handling.

## Source

[VBScript Data Types Documentation](https://learn.microsoft.com/en-us/previous-versions//d1wf56tt(v=vs.85))

In this article, we have explored the fundamentals of VBScript data types,
delving into their significance and practical applications. From understanding
basic types like Integer, String, and Boolean to seeing how they are used in
real-world examples, we have covered essential concepts to help you work
effectively with VBScript. With this knowledge, you are now equipped to handle
variables and data types confidently in your scripting projects

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).