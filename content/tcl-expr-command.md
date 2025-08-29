+++
title = "Tcl expr Command"
date = 2025-08-29T20:12:57.913+01:00
draft = false
description = "Tcl expr command tutorial shows how to evaluate expressions in Tcl. Learn expr with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl expr Command

last modified April 3, 2025

The Tcl expr command evaluates expressions in Tcl. It handles arithmetic,
logical, and relational operations. The command returns the result of the evaluated
expression.

## Basic Definition

The expr command evaluates its arguments as a mathematical or logical
expression. It supports various operators and functions. The result is returned as
a string.

Syntax: expr arg ?arg ...?. The arguments are concatenated and evaluated
as an expression. Braces {} are recommended for complex expressions.

## Basic Arithmetic Operations

This example demonstrates basic arithmetic operations using the expr command.

basic_arithmetic.tcl
  

set sum [expr {10 + 20}]
set diff [expr {50 - 30}]
set product [expr {5 * 6}]
set quotient [expr {100 / 4}]

puts "Sum: $sum, Difference: $diff"
puts "Product: $product, Quotient: $quotient"

This code performs four basic arithmetic operations. Each expr evaluates
a simple expression. The results are stored in variables and printed.

## Using Variables in Expressions

Variables can be used in expressions with proper substitution syntax.

variable_expressions.tcl
  

set x 15
set y 3

set result1 [expr {$x + $y}]
set result2 [expr {$x * $y}]
set result3 [expr {$x ** $y}] ;# exponentiation

puts "Results: $result1, $result2, $result3"

This shows how to use variables in expressions. The $ symbol performs variable
substitution. The ** operator performs exponentiation (15 to the power of 3).

## Mathematical Functions

Tcl's expr supports various mathematical functions.

math_functions.tcl
  

set angle [expr {3.14159 / 4}] ;# 45 degrees in radians
set sine [expr {sin($angle)}]
set cosine [expr {cos($angle)}]
set sqrt [expr {sqrt(2)}]

puts "Sine: $sine, Cosine: $cosine"
puts "Square root of 2: $sqrt"

This demonstrates trigonometric functions and square root. The angle is converted
to radians first. The results show the sine and cosine of 45 degrees.

## Logical and Relational Operators

The expr command supports logical and relational operations.

logical_ops.tcl
  

set a 10
set b 20

set comparison [expr {$a &lt; $b}]
set logical [expr {($a == 10) &amp;&amp; ($b &gt; 15)}]

puts "Is a less than b? $comparison"
puts "Logical test result: $logical"

This shows relational (&lt;) and logical (&amp;&amp;) operators. The first expression checks
if a is less than b. The second combines two conditions with logical AND.

## Conditional Expressions

The ternary operator allows conditional expressions in expr.

conditional_expr.tcl
  

set score 85
set result [expr {$score &gt;= 60 ? "Pass" : "Fail"}]

puts "The student's result is: $result"

This uses the ternary operator to evaluate a condition. If score is 60 or higher,
it returns "Pass", otherwise "Fail". The result is stored in the result variable.

## Complex Expressions with Braces

Braces help create complex expressions and improve performance.

complex_expr.tcl
  

set a 5
set b 10
set c 2

set res [expr {
    ($a * $b) + ($b / $c) - 
    (($a + $b) * ($b - $c)) / 2.0
}]

puts "Complex expression result: $res"

This demonstrates a complex mathematical expression. Braces group operations and
ensure proper evaluation order. The expression combines multiplication, division,
addition, and subtraction.

## Best Practices

- **Braces:** Always use braces {} around expressions.

- **Variables:** Prefix variables with $ in expressions.

- **Precision:** Use decimal points for floating-point division.

- **Readability:** Break complex expressions into parts.

- **Functions:** Use built-in math functions when available.

 

This tutorial covered the Tcl expr command with practical examples
showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).