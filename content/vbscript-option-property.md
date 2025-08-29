+++
title = "VBScript Option Property"
date = 2025-08-29T20:15:35.486+01:00
draft = false
description = "Learn about VBScript Option Property, including Option Explicit, Option Compare, and more. Understand how to use them effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Option Property

last modified April 9, 2025

The Option property in VBScript controls various script behaviors 
and settings. These options must be declared at the beginning of a script file. 
They affect how the script interpreter processes the code. Common options 
include Option Explicit and Option Compare.

Options help enforce coding standards and control script execution. They can 
prevent common errors and standardize string comparisons. This tutorial covers 
VBScript options with practical examples to demonstrate their usage.

## Option Property Overview

VBScript provides several option statements to control script behavior. These 
must appear before any other code in the script. Options cannot be changed once 
declared. They affect the entire script where they are defined.

The main options are Option Explicit and Option Compare. 
Option Explicit forces variable declaration. Option Compare 
controls string comparison behavior. Understanding these options helps create 
more robust scripts.

## Option Explicit Example

Option Explicit requires all variables to be declared before use. 
This helps catch typos in variable names. The example shows how undeclared 
variables cause errors with this option. It's a best practice for all scripts.

option_explicit.vbs
  

Option Explicit

Dim userName
userName = "John Doe"
WScript.Echo userName

' This would cause an error:
' undeclaredVar = "test"

The script declares userName before using it. Without 
Option Explicit, misspelled variables create new variables 
silently. With it enabled, the interpreter catches undeclared variables. This 
prevents many common scripting errors.

## Option Compare Text Example

Option Compare Text makes string comparisons case-insensitive. 
This is the default behavior in VBScript. The example demonstrates case 
insensitivity in string comparisons. It's useful when case shouldn't matter.

option_compare_text.vbs
  

Option Compare Text

Dim result
result = ("Apple" = "apple") ' Returns True
WScript.Echo result

The comparison returns True because case is ignored. This matches 
VBScript's default behavior. The option makes string comparisons more flexible. 
It's particularly useful for user input comparisons.

## Option Compare Binary Example

Option Compare Binary makes string comparisons case-sensitive. 
This differs from the default behavior. The example shows case-sensitive 
comparisons. It's useful when case matters in comparisons.

option_compare_binary.vbs
  

Option Compare Binary

Dim result
result = ("Apple" = "apple") ' Returns False
WScript.Echo result

The comparison returns False because case matters. This option 
makes comparisons more precise. It's useful for exact string matching. The 
option affects all string comparisons in the script.

## Combining Option Explicit and Option Compare

Options can be combined in a script. This example shows both 
Option Explicit and Option Compare together. 
They work independently to control different aspects of script behavior.

combined_options.vbs
  

Option Explicit
Option Compare Text

Dim userInput
userInput = "YES"

If userInput = "yes" Then
    WScript.Echo "Match found"
End If

The script requires variable declaration and uses case-insensitive comparison. 
The comparison succeeds despite different cases. Combining options helps create 
more maintainable scripts. Each option serves a distinct purpose.

## Option Base Example

Option Base changes the default lower bound of arrays. VBScript 
arrays are normally 0-based. This option can make them 1-based. The example 
shows how it affects array indexing.

option_base.vbs
  

Option Base 1

Dim days(3)
days(1) = "Monday"
days(2) = "Tuesday"
days(3) = "Wednesday"

WScript.Echo days(1) ' Outputs "Monday"

The array starts at index 1 instead of 0. This matches some programmers' 
expectations. Option Base must appear before any array 
declarations. It affects all arrays in the script.

## Source

[VBScript Option Statements Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d7wf51d5(v=vs.84))

In this article, we have explored VBScript Option properties, covering their 
usage and practical applications. From enforcing variable declaration to 
controlling string comparisons, these options help create more reliable 
scripts. With this knowledge, you can write VBScript code with better error 
prevention and consistent behavior.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).