+++
title = "Tcl foreach Command"
date = 2025-08-29T20:13:00.153+01:00
draft = false
description = "Tcl foreach command tutorial shows how to iterate over lists in Tcl. Learn foreach with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl foreach Command

last modified April 3, 2025

The Tcl foreach command is used to iterate over lists and arrays.
It's a powerful looping construct that processes each element in a sequence.
The command can handle multiple lists simultaneously.

## Basic Definition

The foreach command executes a script for each element in one or
more lists. It assigns each element to a variable and runs the script body.

Syntax: foreach varList list ?varList list ...? script. It takes
variable names, lists to iterate over, and a script to execute for each element.

## Basic List Iteration

This example shows the simplest usage of foreach to iterate over
a single list.

basic_foreach.tcl
  

set colors {red green blue yellow}
foreach color $colors {
    puts "Color: $color"
}

This creates a list of colors and iterates over each element. The current
color is assigned to the color variable in each iteration.

## Multiple List Variables

foreach can iterate over multiple lists simultaneously by using
multiple variable names.

foreach_multiple.tcl
  

set names {Alice Bob Charlie}
set ages {25 30 35}
foreach name $names age $ages {
    puts "$name is $age years old"
}

This pairs elements from two lists together. The command takes elements from
both lists in parallel during each iteration.

## Nested Lists

foreach can handle nested lists by using multiple loop variables.

foreach_nested.tcl
  

set points {{1 2} {3 4} {5 6}}
foreach point $points {
    lassign $point x y
    puts "Point at ($x, $y)"
}

This demonstrates processing nested lists. Each point is a sublist that gets
split into x and y coordinates using lassign.

## Multiple Variables per List

You can specify multiple variables to consume multiple elements from a list
in each iteration.

foreach_multivars.tcl
  

set numbers {1 2 3 4 5 6 7 8}
foreach {a b} $numbers {
    puts "Pair: $a and $b"
}

This processes the list two elements at a time. The loop takes two elements
per iteration until the list is exhausted.

## Iterating Over Arrays

To iterate over arrays, we first need to get the array keys using array names.

foreach_array.tcl
  

array set user {
    name "John Doe"
    age 30
    city "New York"
}
foreach key [array names user] {
    puts "$key: $user($key)"
}

This shows how to iterate over an array's keys and values. We first get all
keys then access each value using array syntax.

## Break and Continue

foreach supports break and continue
commands for loop control.

foreach_control.tcl
  

set nums {1 2 3 4 5 6 7 8 9 10}
foreach num $nums {
    if {$num == 5} {continue}
    if {$num == 8} {break}
    puts "Number: $num"
}

This demonstrates loop control. It skips number 5 with continue
and exits the loop at number 8 with break.

## Best Practices

- **Variable names:** Use meaningful names for iteration variables.

- **Large lists:** Consider performance with very large lists.

- **List modification:** Avoid modifying the list during iteration.

- **Error handling:** Check list validity before iteration.

- **Scope:** Be aware of variable scope in the loop body.

 

This tutorial covered the Tcl foreach command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).