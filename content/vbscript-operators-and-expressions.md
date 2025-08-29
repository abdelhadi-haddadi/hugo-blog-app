+++
title = "VBScript Operators and Expressions"
date = 2025-08-29T20:15:23.262+01:00
draft = false
description = "VBScript operators and expressions tutorial shows how to use operators and expressions in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Operators and Expressions

last modified February 19, 2025

In this article, we will learn how to use operators and expressions in VBScript.
Operators are symbols that perform operations on variables and values, while
expressions are combinations of values, variables, and operators that evaluate
to a single value. We will use WScript.Echo to output results and
run the scripts using cscript.

## Arithmetic Operators

Arithmetic operators are used to perform mathematical operations.

arithmetic_operators.vbs
  

Dim a, b
a = 10
b = 3

WScript.Echo "Addition: " &amp; (a + b)
WScript.Echo "Subtraction: " &amp; (a - b)
WScript.Echo "Multiplication: " &amp; (a * b)
WScript.Echo "Division: " &amp; (a / b)
WScript.Echo "Integer Division: " &amp; (a \ b)
WScript.Echo "Exponentiation: " &amp; (a ^ b)
WScript.Echo "Modulus: " &amp; (a Mod b)

This example demonstrates the use of arithmetic operators in VBScript.

## Comparison Operators

Comparison operators are used to compare two values.

comparison_operators.vbs
  

Dim x, y
x = 5
y = 10

WScript.Echo "Equal: " &amp; (x = y)
WScript.Echo "Not Equal: " &amp; (x &lt;&gt; y)
WScript.Echo "Greater Than: " &amp; (x &gt; y)
WScript.Echo "Less Than: " &amp; (x &lt; y)
WScript.Echo "Greater Than or Equal: " &amp; (x &gt;= y)
WScript.Echo "Less Than or Equal: " &amp; (x &lt;= y)

This example demonstrates the use of comparison operators in VBScript.

## Logical Operators

Logical operators are used to combine multiple conditions.

logical_operators.vbs
  

Dim p, q
p = True
q = False

WScript.Echo "AND: " &amp; (p And q)
WScript.Echo "OR: " &amp; (p Or q)
WScript.Echo "NOT: " &amp; (Not p)
WScript.Echo "XOR: " &amp; (p Xor q)

This example demonstrates the use of logical operators in VBScript.

## Concatenation Operator

The concatenation operator &amp; is used to combine strings.

concatenation_operator.vbs
  

Dim firstName, lastName
firstName = "John"
lastName = "Doe"

WScript.Echo "Full Name: " &amp; firstName &amp; " " &amp; lastName

This example demonstrates the use of the concatenation operator in VBScript.

## Assignment Operators

Assignment operators are used to assign values to variables.

assignment_operators.vbs
  

Dim num
num = 5

num = num + 2
WScript.Echo "After Addition: " &amp; num

num = num - 1
WScript.Echo "After Subtraction: " &amp; num

num = num * 3
WScript.Echo "After Multiplication: " &amp; num

num = num / 2
WScript.Echo "After Division: " &amp; num

This example demonstrates the use of assignment operators in VBScript.

## String Operators

String operators are used to manipulate strings.

string_operators.vbs
  

Dim str1, str2
str1 = "Hello"
str2 = "World"

WScript.Echo "Concatenation: " &amp; str1 &amp; " " &amp; str2
WScript.Echo "Length of str1: " &amp; Len(str1)
WScript.Echo "Substring: " &amp; Mid(str1, 2, 3)

This example demonstrates the use of string operators in VBScript.

## Ternary Operator

VBScript does not have a built-in ternary operator, but you can simulate it using
the IIf function.

ternary_operator.vbs
  

Dim age, status
age = 20

status = IIf(age &gt;= 18, "Adult", "Minor")
WScript.Echo "Status: " &amp; status

This example demonstrates how to simulate a ternary operator in VBScript.

## Bitwise Operators

Bitwise operators are used to perform operations on binary representations of
numbers.

bitwise_operators.vbs
  

Dim a, b
a = 5 ' Binary: 0101
b = 3 ' Binary: 0011

WScript.Echo "AND: " &amp; (a And b) ' Binary: 0001
WScript.Echo "OR: " &amp; (a Or b)  ' Binary: 0111
WScript.Echo "XOR: " &amp; (a Xor b) ' Binary: 0110
WScript.Echo "NOT: " &amp; (Not a)  ' Binary: 1010 (in 4 bits)

This example demonstrates the use of bitwise operators in VBScript.

## Operator Precedence

Operator precedence determines the order in which operations are performed.

operator_precedence.vbs
  

Dim result
result = 5 + 3 * 2 ' Multiplication has higher precedence

WScript.Echo "Result: " &amp; result

This example demonstrates operator precedence in VBScript.

## Complex Expressions

Complex expressions combine multiple operators and values.

complex_expressions.vbs
  

Dim x, y, z
x = 10
y = 5
z = 2

Dim result
result = (x + y) * z - (y / z)

WScript.Echo "Result: " &amp; result

This example demonstrates a complex expression in VBScript.

In this article, we explored how to use operators and expressions in VBScript.
We covered arithmetic, comparison, logical, concatenation, assignment, string,
ternary, bitwise operators, operator precedence, and complex expressions.
Operators and expressions are fundamental to performing calculations and making
decisions in VBScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).