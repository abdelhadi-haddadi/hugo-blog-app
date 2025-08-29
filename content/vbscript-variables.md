+++
title = "VBScript Variables"
date = 2025-08-29T20:15:33.242+01:00
draft = false
description = "Learn about VBScript variables, including declaration, assignment, and usage. Understand how to work with variables effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Variables

last modified April 4, 2025

Variables in VBScript are fundamental elements that store data values. Unlike
strongly typed languages, VBScript uses variant variables that can hold any
data type. Variables are declared using the Dim statement and can be assigned
values using the equals (=) operator. This tutorial covers VBScript variables
with practical examples.

## VBScript Variables Overview

Variables in VBScript are containers for storing data values. They are created
using the Dim statement and can hold different types of data. Variable names
must begin with a letter and cannot contain spaces or special characters.
VBScript is case-insensitive, so myVar and MYVAR refer to the same variable.

Variables in VBScript have a global scope by default unless declared within
procedures. The lifetime of a variable depends on its scope. Understanding
variable declaration and scope is essential for writing effective scripts.
We'll explore these concepts with practical examples in the following sections.

## Basic Variable Declaration and Assignment

The simplest way to use variables in VBScript is to declare them with Dim and
assign values. Variables can hold numbers, strings, dates, or other data types.
VBScript automatically determines the appropriate data type based on the value.

basic_variables.vbs
  

Dim name, age, isStudent
name = "John Doe"
age = 25
isStudent = True

WScript.Echo "Name: " &amp; name
WScript.Echo "Age: " &amp; age
WScript.Echo "Is student: " &amp; isStudent

This example demonstrates basic variable declaration and assignment. Three
variables of different types are declared and initialized. The WScript.Echo
method displays their values. Notice how VBScript handles different data types
without explicit type declarations.

## Variable Concatenation

VBScript allows concatenating variables and strings using the ampersand (&amp;)
operator. This is particularly useful for building output messages or combining
string values. Numeric values are automatically converted to strings during
concatenation.

concatenation.vbs
  

Dim firstName, lastName, fullName, age, message
firstName = "Alice"
lastName = "Smith"
age = 30

fullName = firstName &amp; " " &amp; lastName
message = fullName &amp; " is " &amp; age &amp; " years old."

WScript.Echo message

This example shows string concatenation with variables. The fullName variable
combines firstName and lastName with a space. The message variable builds a
complete sentence by combining strings and numeric values. The output displays
the concatenated result.

## Variable Scope

Variables in VBScript can have different scopes depending on where they are
declared. Variables declared outside procedures have script-level scope.
Variables declared inside procedures have procedure-level scope and are only
accessible within that procedure.

variable_scope.vbs
  

Dim globalVar  ' Script-level variable
globalVar = "I'm global"

Sub TestScope
    Dim localVar  ' Procedure-level variable
    localVar = "I'm local"
    WScript.Echo "Inside procedure: " &amp; globalVar &amp; ", " &amp; localVar
End Sub

TestScope
WScript.Echo "Outside procedure: " &amp; globalVar
' WScript.Echo localVar  ' This would cause an error

This example demonstrates variable scope differences. The globalVar is
accessible throughout the script, while localVar is only available inside the
TestScope procedure. Attempting to access localVar outside the procedure would
result in an error.

## Changing Variable Values

Variables in VBScript can have their values changed at any point in the script.
The new value can be of a different data type, as VBScript variables are
variant. This flexibility can be powerful but requires careful management.

changing_values.vbs
  

Dim dynamicVar
dynamicVar = 10
WScript.Echo "Initial value: " &amp; dynamicVar &amp; " (" &amp; TypeName(dynamicVar) &amp; ")"

dynamicVar = "Now I'm a string"
WScript.Echo "New value: " &amp; dynamicVar &amp; " (" &amp; TypeName(dynamicVar) &amp; ")"

dynamicVar = #4/15/2025#
WScript.Echo "Final value: " &amp; dynamicVar &amp; " (" &amp; TypeName(dynamicVar) &amp; ")"

This example shows how a variable's value and type can change during execution.
The TypeName function reveals the current subtype of the variable. The same
variable transitions from Integer to String to Date, demonstrating VBScript's
flexibility with variable types.

## Constants vs Variables

VBScript supports constants alongside variables. Constants are declared with
the Const keyword and cannot be changed after declaration. They are useful for
values that should remain fixed throughout the script's execution.

constants.vbs
  

Const PI = 3.14159
Const COMPANY_NAME = "ACME Corp"
Dim radius, area

radius = 5
area = PI * radius * radius

WScript.Echo COMPANY_NAME &amp; " presents:"
WScript.Echo "Area of circle with radius " &amp; radius &amp; " is " &amp; area

This example contrasts constants and variables. PI and COMPANY_NAME are
constants that don't change, while radius and area are variables. Constants
improve code readability and prevent accidental modification of important
values. The script calculates the area of a circle using these elements.

## Source

[VBScript Variables Documentation](https://learn.microsoft.com/en-us/previous-versions//d1wf56tt(v=vs.85))

In this article, we have explored the fundamentals of VBScript variables,
delving into their declaration, assignment, and usage. From understanding basic
variable operations to seeing how they are used in practical examples, we have
covered essential concepts to help you work effectively with VBScript. With this
knowledge, you are now equipped to handle variables confidently in your
scripting projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).