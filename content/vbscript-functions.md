+++
title = "VBScript Functions"
date = 2025-08-29T20:15:17.666+01:00
draft = false
description = "VBScript functions tutorial shows how to create and use functions in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Functions

last modified February 19, 2025

In this article, we will learn how to create and use functions in VBScript.
Functions are reusable blocks of code that perform specific tasks. They help
organize code and make it easier to maintain. We will use WScript.Echo
to output results and run the scripts using cscript.

## Simple Function

The first example demonstrates how to create a simple function.

simple_function.vbs
  

Function Greet(name)
    Greet = "Hello, " &amp; name &amp; "!"
End Function

WScript.Echo Greet("John")

This example defines a function Greet that takes a parameter
name and returns a greeting message.

## Function with Multiple Parameters

Functions can accept multiple parameters.

multi_param_function.vbs
  

Function Add(a, b)
    Add = a + b
End Function

WScript.Echo "Sum: " &amp; Add(5, 3)

This example defines a function Add that takes two parameters and
returns their sum.

## Function with Optional Parameters

VBScript does not support true optional parameters. The following are
workarounds to achieve similar functionality.

optional_param_function.vbs
  

Function Multiply(a, b)
    If IsEmpty(b) Then
        Multiply = a * 2
    Else
        Multiply = a * b
    End If
End Function

' Calling the function with one argument
WScript.Echo "Result: " &amp; Multiply(5, Empty)

' Calling the function with two arguments
WScript.Echo "Result: " &amp; Multiply(5, 3)

This example defines a function Multiply with an optional parameter
b. If b is missing, it multiplies a by 2.

## Recursive Function

Functions can call themselves, which is known as recursion.

recursive_function.vbs
  

Function Factorial(n)
    If n &lt;= 1 Then
        Factorial = 1
    Else
        Factorial = n * Factorial(n - 1)
    End If
End Function

WScript.Echo "Factorial of 5: " &amp; Factorial(5)

This example calculates the factorial of a number using recursion.

## Function Returning an Array

Functions can return arrays.

array_function.vbs
  

Function GetNumbers()
    Dim nums(2)
    nums(0) = 10
    nums(1) = 20
    nums(2) = 30
    GetNumbers = nums
End Function

Dim result
result = GetNumbers()

WScript.Echo "Second number: " &amp; result(1)

This example defines a function GetNumbers that returns an array.

## Function with ByRef Parameter

VBScript allows passing parameters by reference using ByRef.

byref_function.vbs
  

Function Square(ByRef num)
    num = num * num
End Function

Dim x
x = 5
Square x

WScript.Echo "Square: " &amp; x

This example defines a function Square that modifies the value of
the parameter passed by reference.

Function Square(ByRef num)
    num = num * num
End Function

We use the ByRef keyword for the parameter.

Square x

Also, we must call he function without parentheses.

In this article, we explored how to create and use functions in VBScript. We
covered simple functions, functions with multiple parameters, optional
parameters, recursive functions, functions returning arrays, and functions with
ByRef parameters. Functions are essential for writing modular and
reusable code in VBScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).