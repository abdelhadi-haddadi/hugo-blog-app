+++
title = "VBScript Basics"
date = 2025-08-29T20:14:38.316+01:00
draft = false
description = "VBScript basics tutorial shows how to write basic VBScript programs with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Basics

last modified February 19, 2025

In this article, we will learn the basics of VBScript programming. VBScript
(Visual Basic Scripting Edition) is a lightweight scripting language developed
by Microsoft. It is often used for automating tasks in Windows environments and
for web development in classic ASP (Active Server Pages). In this tutorial, we
will use WScript.Echo to output text to the console and run the
scripts using cscript.

## Simple example

The first program demonstrates how to output text to the console.

hello.vbs
  

WScript.Echo "Hello there!"

The WScript.Echo function outputs the text "Hello, there!" to the
console.

## Variables in VBScript

Variables in VBScript are used to store data. They are declared using the
Dim keyword.

variables.vbs
  

Dim name
name = "John Doe"

WScript.Echo "Name: " &amp; name

In this example, we declare a variable name and assign it the value
"John Doe". The WScript.Echo function is used to display the value
of the variable.

## Conditional Statements

VBScript supports conditional statements like If...Then...Else for
decision-making.

conditions.vbs
  

Dim age
age = 20

If age &gt;= 18 Then
    WScript.Echo "You are an adult."
Else
    WScript.Echo "You are a minor."
End If

This example checks the value of the age variable and outputs a
message based on the condition.

Run the script with cscript:
cscript conditions.vbs

Output:
You are an adult.

## Loops in VBScript

VBScript supports loops like For...Next and Do...Loop
for repetitive tasks.

loops.vbs
  

Dim i

For i = 1 To 5
    WScript.Echo "Iteration: " &amp; i
Next

This example uses a For...Next loop to output the iteration number
five times.

## Arrays in VBScript

Arrays in VBScript are used to store multiple values in a single variable.

arrays.vbs
  

Dim fruits(2)
fruits(0) = "Apple"
fruits(1) = "Banana"
fruits(2) = "Cherry"

WScript.Echo "First fruit: " &amp; fruits(0)

This example declares an array fruits and assigns values to its
elements. The first element is displayed using WScript.Echo.

Run the script with cscript:
cscript arrays.vbs

Output:
First fruit: Apple

## Functions in VBScript

Functions in VBScript are reusable blocks of code that perform a specific task.

functions.vbs
  

Function Add(a, b)
    Add = a + b
End Function

Dim result
result = Add(5, 3)

WScript.Echo "Result: " &amp; result

This example defines a function Add that takes two parameters and
returns their sum. The result is displayed using WScript.Echo.

Run the script with cscript:
cscript functions.vbs

Output:
Result: 8

## Working with Dates

VBScript provides built-in functions for working with dates and times.

dates.vbs
  

Dim currentDate
currentDate = Date()

WScript.Echo "Today's date is: " &amp; currentDate

This example uses the Date function to get the current date and
outputs it using WScript.Echo.

## Error Handling

VBScript supports error handling using the On Error Resume Next
statement.

error_handling.vbs
  

On Error Resume Next

Dim x
x = 10 / 0 ' Division by zero error

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "An error occurred: " &amp; Err.Description
End If

This example demonstrates how to handle errors in VBScript. The On Error
Resume Next statement allows the script to continue executing even if an
error occurs.

In this article, we have covered the basics of VBScript programming. We have
learned how to write simple programs, use variables, conditional statements,
loops, arrays, functions, work with dates, and handle errors. VBScript is a
versatile scripting language that is widely used for automation and web
development. By using WScript.Echo and running scripts with
cscript, we can easily output results to the console.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).