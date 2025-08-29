+++
title = "Tcl llength Command"
date = 2025-08-29T20:13:05.766+01:00
draft = false
description = "Tcl llength command tutorial shows how to get list lengths in Tcl. Learn llength with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl llength Command

last modified April 3, 2025

The Tcl llength command returns the number of elements in a list.
It's a fundamental list operation in Tcl. The command takes a single list
argument and returns its length.

## Basic Definition

The llength command counts the top-level elements in a Tcl list.
It doesn't count nested elements recursively. The command is efficient and
works in constant time.

Syntax: llength list. The command returns a decimal string
representing the number of elements. Empty lists return 0.

## Simple List Length

This example shows basic usage of llength with a simple list.

basic_llength.tcl
  

set colors {red green blue}
set len [llength $colors]
puts "The list has $len elements"

We create a list of colors and use llength to get its size.
The result is stored in len and printed. The output will be 3.

## Empty List

llength correctly handles empty lists by returning 0.

empty_list.tcl
  

set empty_list {}
set len [llength $empty_list]
puts "Empty list length: $len"

This demonstrates llength behavior with empty lists. The command
returns 0, which is the expected result for an empty list.

## Nested Lists

llength only counts top-level elements, not nested ones.

nested_list.tcl
  

set nested {{a b c} {d e} {f g h i}}
set len [llength $nested]
puts "Nested list length: $len"

The list contains 3 elements (each being a sublist), so llength
returns 3. It doesn't count the individual letters in the sublists.

## List With Different Data Types

llength works with lists containing mixed data types.

mixed_list.tcl
  

set mixed {1 "two" 3.0 {four five} six}
set len [llength $mixed]
puts "Mixed list length: $len"

This list contains numbers, strings, and sublists. llength counts
each element regardless of type. The result is 5 in this case.

## Dynamic List Creation

llength can be used with dynamically created lists.

dynamic_list.tcl
  

set items [list apple orange [list grape strawberry] banana]
set len [llength $items]
puts "Dynamic list length: $len"

The list is created using the list command. llength
counts 4 elements (the sublist counts as one element). This shows how
llength works with programmatically created lists.

## Using llength in Conditionals

llength is often used in conditional statements to check list size.

conditional_llength.tcl
  

set data {10 20 30 40 50}

if {[llength $data] &gt; 3} {
    puts "List has more than 3 elements"
} else {
    puts "List has 3 or fewer elements"
}

This example shows how to use llength in a conditional statement.
We check if the list contains more than 3 elements and print an appropriate
message.

## Best Practices

- **Validation:** Use llength to validate list size before processing.

- **Performance:** llength is O(1) operation - fast for any list size.

- **Nested Lists:** Remember it only counts top-level elements.

- **Empty Check:** Combine with empty for comprehensive checks.

- **Type Safety:** Ensure argument is a valid list to avoid errors.

 

This tutorial covered the Tcl llength command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).