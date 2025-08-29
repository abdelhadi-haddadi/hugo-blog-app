+++
title = "Tcl mathfunc Command"
date = 2025-08-29T20:13:07.989+01:00
draft = false
description = "Tcl mathfunc command tutorial shows how to use mathematical functions in Tcl. Learn mathfunc with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl mathfunc Command

last modified April 3, 2025

The Tcl mathfunc namespace provides mathematical functions for use
in expressions. These functions can be used with the expr command.
They cover basic and advanced mathematical operations.

## Basic Definition

The mathfunc functions are part of Tcl's built-in mathematical
capabilities. They include trigonometric, logarithmic, and other common
functions.

Syntax: expr {funcName(arg)}. Functions are called within
expr expressions. They take arguments and return computed values.

## Basic Trigonometric Functions

This example demonstrates basic trigonometric functions: sin, cos, and tan.

trigonometric.tcl
  

set angle [expr {3.14159/4}]  ;# 45 degrees in radians
set sine [expr {sin($angle)}]
set cosine [expr {cos($angle)}]
set tangent [expr {tan($angle)}]
puts "Sine: $sine, Cosine: $cosine, Tangent: $tangent"

This calculates trigonometric values for 45 degrees (π/4 radians). The results
show the sine, cosine, and tangent of the angle. Note the use of radians.

## Exponential and Logarithmic Functions

This example shows how to use exponential and logarithmic functions in Tcl.

exp_log.tcl
  

set x 2.0
set exp_val [expr {exp($x)}]
set log_val [expr {log($exp_val)}]
puts "exp($x) = $exp_val, log($exp_val) = $log_val"

The exp function calculates e^x, while log computes
the natural logarithm. The example verifies that log(exp(x)) returns the
original x value.

## Square Root and Power Functions

This demonstrates the square root and power functions available in mathfunc.

sqrt_pow.tcl
  

set num 16.0
set root [expr {sqrt($num)}]
set cube [expr {pow($num, 3)}]
puts "Square root of $num is $root"
puts "$num cubed is $cube"

The sqrt function calculates the square root, while pow
raises a number to a specified power. These are fundamental mathematical
operations.

## Rounding Functions

Tcl provides several functions for rounding numbers: floor, ceil, and round.

rounding.tcl
  

set value 3.7
set floored [expr {floor($value)}]
set ceiling [expr {ceil($value)}]
set rounded [expr {round($value)}]
puts "Original: $value, Floor: $floored, Ceiling: $ceiling, Rounded: $rounded"

floor rounds down, ceil rounds up, and round
rounds to the nearest integer. These functions are useful for number formatting.

## Absolute Value and Random Numbers

This example shows how to get absolute values and generate random numbers.

abs_rand.tcl
  

set negative -5.5
set absolute [expr {abs($negative)}]
set random [expr {rand()}]
puts "Absolute value of $negative is $absolute"
puts "Random number between 0 and 1: $random"

The abs function returns the absolute value of a number.
rand generates a random float between 0 and 1. For integers,
combine with int and multiplication.

## Hyperbolic Functions

Tcl includes hyperbolic functions: sinh, cosh, and tanh for advanced math.

hyperbolic.tcl
  

set x 1.0
set sinh_val [expr {sinh($x)}]
set cosh_val [expr {cosh($x)}]
set tanh_val [expr {tanh($x)}]
puts "sinh($x) = $sinh_val, cosh($x) = $cosh_val, tanh($x) = $tanh_val"

Hyperbolic functions are analogs of trigonometric functions but for hyperbolas.
They appear in various areas of mathematics and physics calculations.

## Best Practices

- **Radians:** Remember trigonometric functions use radians.

- **Precision:** Be aware of floating-point precision limits.

- **Error Handling:** Check for domain errors in functions.

- **Random Seeds:** Seed the random number generator if needed.

- **Performance:** Cache results of expensive calculations.

 

This tutorial covered the Tcl mathfunc command with practical
examples showing various mathematical functions available in Tcl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).