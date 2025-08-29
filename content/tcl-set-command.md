+++
title = "Tcl set Command"
date = 2025-08-29T20:13:13.673+01:00
draft = false
description = "Tcl set command tutorial shows how to assign variables in Tcl. Learn set with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl set Command

last modified April 3, 2025

The Tcl set command is used to assign values to variables. It's one
of the most fundamental commands in Tcl. The command can both set and retrieve
variable values.

## Basic Definition

The set command creates a variable if it doesn't exist and assigns
a value to it. It can also return the value of an existing variable.

Syntax: set varName ?value?. With one argument, it returns the
variable's value. With two arguments, it sets the variable's value.

## Basic Variable Assignment

This shows the simplest usage of set to assign a value to a variable.

basic_set.tcl
  

set name "John Doe"
puts $name

This creates a variable name with the value "John Doe". The
puts command then prints the variable's value to standard output.

## Retrieving Variable Values

The set command can retrieve a variable's value when given only one
argument.

set_retrieve.tcl
  

set age 25
set retrieved_age [set age]
puts "Age is $retrieved_age"

Here we first set the age variable, then retrieve its value using
set with one argument. This demonstrates the dual nature of the
set command.

## Variable Substitution

Tcl performs variable substitution when a variable name is prefixed with $.

set_substitution.tcl
  

set x 10
set y 20
set sum [expr {$x + $y}]
puts "The sum is $sum"

This example shows how variable substitution works in expressions. The expr
command evaluates the mathematical expression using the substituted values.

## Setting Multiple Variables

Multiple variables can be set in sequence using separate set commands.

set_multiple.tcl
  

set width 10
set height 5
set area [expr {$width * $height}]
puts "Rectangle area: $area"

This calculates the area of a rectangle by first setting width and height
variables. The area is then computed and stored in another variable.

## Nested Set Commands

set commands can be nested to create more complex assignments.

set_nested.tcl
  

set a [set b [set c 100]]
puts "a = $a, b = $b, c = $c"

This demonstrates nested set commands where multiple variables
receive the same value. The innermost set is evaluated first.

## Dynamic Variable Creation

The set command can create variables dynamically at runtime.

set_dynamic.tcl
  

for {set i 1} {$i &lt;= 3} {incr i} {
    set "var$i" "Value $i"
}
puts "$var1 $var2 $var3"

This example creates three variables dynamically in a loop. Each variable
name is constructed using the loop counter, showing runtime variable creation.

## Best Practices

- **Naming:** Use descriptive variable names for clarity.

- **Scope:** Be aware of variable scope (global vs local).

- **Braces:** Use braces {} for expressions to prevent substitution.

- **Unset:** Use unset to remove variables when done.

- **Arrays:** Consider arrays for related data sets.

 

This tutorial covered the Tcl set command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).