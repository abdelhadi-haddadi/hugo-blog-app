+++
title = "VBScript Conditionals"
date = 2025-08-29T20:14:39.459+01:00
draft = false
description = "VBScript conditionals tutorial shows how to use conditional statements in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Conditionals

last modified February 19, 2025

In this article, we will learn how to use conditional statements in VBScript.
Conditionals allow you to execute different blocks of code based on certain
conditions. We will use WScript.Echo to output results and run the
scripts using cscript.

## If Statement

The If statement is the simplest form of conditional.

if_statement.vbs
  

Dim age
age = 20

If age &gt;= 18 Then
    WScript.Echo "You are an adult."
End If

This example checks if the value of age is greater than or equal to
18 and outputs a message if the condition is true.

## If...Else Statement

The If...Else statement allows you to execute one block of code if
the condition is true and another if it is false.

if_else_statement.vbs
  

Dim temperature
temperature = 25

If temperature &lt; 20 Then
    WScript.Echo "It's cold outside."
Else
    WScript.Echo "It's warm outside."
End If

This example checks the value of temperature and outputs a message
based on the condition.

## If...ElseIf...Else Statement

The If...ElseIf...Else statement allows you to check multiple
conditions.

if_elseif_else_statement.vbs
  

Dim score
score = 85

If score &gt;= 90 Then
    WScript.Echo "Grade: A"
ElseIf score &gt;= 80 Then
    WScript.Echo "Grade: B"
ElseIf score &gt;= 70 Then
    WScript.Echo "Grade: C"
Else
    WScript.Echo "Grade: D"
End If

This example checks the value of score and outputs a grade based on
the condition.

## Select Case Statement

The Select Case statement is used to execute one of several blocks
of code based on the value of an expression.

select_case_statement.vbs
  

Dim day
day = 3

Select Case day
    Case 1
        WScript.Echo "Monday"
    Case 2
        WScript.Echo "Tuesday"
    Case 3
        WScript.Echo "Wednesday"
    Case Else
        WScript.Echo "Invalid day"
End Select

This example checks the value of day and outputs the corresponding
day of the week.

## Nested If Statements

You can nest If statements to check multiple conditions.

nested_if_statements.vbs
  

Dim x, y
x = 10
y = 20

If x &gt; 5 Then
    If y &gt; 15 Then
        WScript.Echo "Both conditions are true."
    End If
End If

This example checks two conditions using nested If statements and
outputs a message if both conditions are true.

## Logical Operators

VBScript supports logical operators like And, Or, and
Not to combine conditions.

logical_operators.vbs
  

Dim a, b
a = 5
b = 10

If a &gt; 0 And b &gt; 0 Then
    WScript.Echo "Both numbers are positive."
End If

This example uses the And operator to check if both numbers are
positive.

In this article, we explored how to use conditional statements in VBScript. We
covered If, If...Else, If...ElseIf...Else,
Select Case, nested If statements, and logical
operators. Conditionals are essential for controlling the flow of your program
based on specific conditions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).