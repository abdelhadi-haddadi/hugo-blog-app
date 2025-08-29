+++
title = "Tcl lrange Command"
date = 2025-08-29T20:13:05.757+01:00
draft = false
description = "Tcl lrange command tutorial shows how to extract list ranges in Tcl. Learn lrange with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lrange Command

last modified April 3, 2025

The Tcl lrange command extracts a range of elements from a list.
It's essential for working with list data structures in Tcl. The command
returns a new list containing the specified elements.

## Basic Definition

The lrange command returns one or more adjacent elements from a
list. It takes a list and two indices specifying the range to extract.

Syntax: lrange list first last. The indices are zero-based. The
command includes both the first and last elements in the result.

## Extracting a Simple Range

This example shows the basic usage of lrange to extract elements
from a list.

basic_lrange.tcl
  

set colors {red green blue yellow orange}
set subset [lrange $colors 1 3]
puts $subset

This extracts elements at positions 1 through 3 from the colors list. The
result is green blue yellow. Remember that list indices start
at 0 in Tcl.

## Using Negative Indices

Tcl allows negative indices to count from the end of the list. -1 refers to
the last element.

negative_indices.tcl
  

set fruits {apple banana cherry date elderberry}
set last_three [lrange $fruits end-2 end]
puts $last_three

This extracts the last three elements from the fruits list. The end
keyword refers to the last element, and end-2 refers to the third
from last element.

## Extracting a Single Element

When first and last indices are the same, lrange returns a single
element as a list.

single_element.tcl
  

set numbers {1 2 3 4 5 6 7 8 9}
set middle [lrange $numbers 4 4]
puts "The middle number is $middle"

This extracts just the element at index 4 (the fifth element). The result is
5 as a single-element list. Note this differs from lindex
which returns the raw value.

## Extracting All Elements

Using 0 as first and end as last indices extracts the entire list.

entire_list.tcl
  

set letters {a b c d e f g}
set all_letters [lrange $letters 0 end]
puts $all_letters

This demonstrates how to get a copy of the entire list using lrange.
While not the most efficient way to copy a list, it shows the command's range
capabilities.

## Out-of-Bound Indices

lrange handles out-of-bound indices gracefully by clamping them to
valid list indices.

out_of_bounds.tcl
  

set short_list {alpha beta gamma}
set result [lrange $short_list -5 10]
puts "Result: $result"

This shows how lrange deals with indices beyond list boundaries.
The result will be the entire list, as negative indices are clamped to 0 and
large indices to the last element.

## Combining with Other List Commands

lrange can be combined with other list commands for more complex
operations.

combined_commands.tcl
  

set data {10 20 30 40 50 60 70 80 90}
set middle [lrange $data 3 6]
set reversed [lreverse $middle]
puts "Middle reversed: $reversed"

This extracts elements 3 through 6, then reverses them using lreverse.
The result is 70 60 50 40, demonstrating how lrange
can be part of more complex list processing pipelines.

## Best Practices

- **Indexing:** Remember Tcl uses zero-based indexing.

- **Performance:** For single elements, consider lindex.

- **Bounds:** No error is thrown for out-of-bound indices.

- **Copying:** Use lrange $list 0 end to copy lists.

- **Readability:** Use end for clarity with dynamic lists.

 

This tutorial covered the Tcl lrange command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).