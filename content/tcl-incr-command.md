+++
title = "Tcl incr Command"
date = 2025-08-29T20:13:02.403+01:00
draft = false
description = "Tcl incr command tutorial shows how to increment variables in Tcl. Learn incr with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl incr Command

last modified April 3, 2025

The Tcl incr command is used to increment integer variables. It's a
convenient way to modify numerical values in Tcl scripts. The command can both
increment and return the new value.

## Basic Definition

The incr command increases a variable's value by a specified amount.
If no increment is given, it defaults to 1. The variable must contain an integer.

Syntax: incr varName ?increment?. With one argument, it increments
by 1. With two arguments, it increments by the specified value.

## Basic Increment Operation

This shows the simplest usage of incr to increase a counter by 1.

basic_incr.tcl
  

set counter 0
incr counter
puts "Counter is now $counter"

This creates a variable counter initialized to 0. The incr
command then increments it by 1 (default). The new value is printed.

## Specifying Increment Value

The incr command can increment by any integer value, not just 1.

incr_value.tcl
  

set total 100
incr total 25
puts "Total after increment: $total"

Here we increment the total variable by 25 instead of the default 1.
This demonstrates how to specify a custom increment value.

## Negative Increment

The increment value can be negative, effectively performing a decrement operation.

incr_negative.tcl
  

set balance 500
incr balance -100
puts "Balance after withdrawal: $balance"

This example shows how to decrease a value using a negative increment. The
balance variable is reduced by 100.

## Using incr in Loops

incr is commonly used in loops to manage iteration counters.

incr_loop.tcl
  

set i 0
while {$i &lt; 5} {
    puts "Iteration $i"
    incr i
}

This demonstrates a typical loop pattern where incr updates the
loop counter. The loop runs 5 times, printing the current iteration number.

## Return Value of incr

The incr command returns the new value of the variable.

incr_return.tcl
  

set count 10
set new_count [incr count 5]
puts "New count is $new_count"

Here we capture the return value of incr in new_count.
The command both modifies the variable and returns its new value.

## Multiple Increments

Multiple incr operations can be chained or used sequentially.

incr_multiple.tcl
  

set x 0
incr x; incr x 2; incr x -1
puts "Final value of x: $x"

This shows three different increment operations on the same variable. The
final value demonstrates the cumulative effect of these operations.

## Best Practices

- **Initialization:** Always initialize variables before using incr.

- **Type Safety:** Ensure variables contain integers before incrementing.

- **Readability:** Use meaningful variable names for counters.

- **Performance:** Prefer incr over expr for simple increments.

- **Bounds:** Be aware of integer overflow possibilities.

 

This tutorial covered the Tcl incr command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).