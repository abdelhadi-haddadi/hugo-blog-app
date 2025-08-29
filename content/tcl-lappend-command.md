+++
title = "Tcl lappend Command"
date = 2025-08-29T20:13:04.633+01:00
draft = false
description = "Tcl lappend command tutorial shows how to append elements to lists in Tcl. Learn lappend with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lappend Command

last modified April 3, 2025

The Tcl lappend command appends elements to a list variable. It
modifies the variable in place by adding elements to the end of the list.

## Basic Definition

The lappend command takes a variable name and one or more values to
append. If the variable doesn't exist, it creates a new list containing the
given elements.

Syntax: lappend varName ?value value ...?. The command returns the
new value of the list variable after appending.

## Basic List Append

This example demonstrates the simplest usage of lappend to add
elements to a list.

basic_lappend.tcl
  

set colors [list red green blue]
lappend colors yellow
puts $colors

We first create a list of colors, then append "yellow" to it. The puts
command displays the modified list containing all four colors.

## Appending Multiple Elements

lappend can append multiple elements to a list in a single command.

lappend_multiple.tcl
  

set numbers {1 2 3}
lappend numbers 4 5 6
puts $numbers

This starts with a list of three numbers. The lappend command adds
three more numbers at once. The result is a list containing numbers 1 through 6.

## Creating New Lists

When used with a non-existent variable, lappend creates a new list.

lappend_new.tcl
  

# fruits variable doesn't exist yet
lappend fruits apple orange banana
puts $fruits

Since fruits doesn't exist initially, lappend creates
it as a new list containing the three specified fruits. This is a convenient
way to initialize lists.

## Appending Nested Lists

lappend can append complex elements including other lists.

lappend_nested.tcl
  

set data {}
lappend data {1 2 3}
lappend data {a b c}
puts $data

We start with an empty list and append two sublists. The result is a list of
lists. Each appended element becomes a single item in the main list.

## Building Lists in Loops

lappend is commonly used to build lists incrementally in loops.

lappend_loop.tcl
  

set squares {}
for {set i 1} {$i &lt;= 5} {incr i} {
    lappend squares [expr {$i * $i}]
}
puts $squares

This example builds a list of square numbers from 1 to 5. Each iteration
calculates a square and appends it to the list. The result is [1 4 9 16 25].

## Combining with Other List Commands

lappend can be combined with other list commands for more complex
operations.

lappend_combine.tcl
  

set items {apple banana}
set more_items {cherry date}
lappend items {*}$more_items
puts $items

Here we merge two lists using the {*} expansion operator. This
appends each element of more_items individually to items.
The result is a single combined list.

## Best Practices

- **Initialization:** Initialize lists before appending when needed.

- **Performance:** Use lappend for building lists, it's efficient.

- **Expansion:** Use {*} to append all elements of another list.

- **Readability:** Consider line breaks for multiple appends.

- **Variables:** Ensure variable exists or handle errors.

 

This tutorial covered the Tcl lappend command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).