+++
title = "Tcl lreplace Command"
date = 2025-08-29T20:13:06.882+01:00
draft = false
description = "Tcl lreplace command tutorial shows how to replace elements in lists in Tcl. Learn lreplace with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lreplace Command

last modified April 3, 2025

The Tcl lreplace command replaces elements in a list with new elements.
It returns a new list with the specified replacements while leaving the original
list unchanged. This is useful for list manipulation tasks.

## Basic Definition

The lreplace command replaces zero or more elements of a list with
new elements. It takes a list and index arguments specifying what to replace.

Syntax: lreplace list first last ?element element ...?. The command
returns a new list with elements from first to last replaced by the new elements.

## Basic List Replacement

This example demonstrates the simplest usage of lreplace to replace
a single element in a list.

basic_lreplace.tcl
  

set colors {red green blue yellow}
set new_colors [lreplace $colors 1 1 orange]
puts $new_colors

This replaces the element at index 1 ("green") with "orange". The original list
remains unchanged. The new list contains: red orange blue yellow.

## Replacing Multiple Elements

lreplace can replace a range of elements with multiple new elements.

multi_replace.tcl
  

set numbers {1 2 3 4 5 6}
set new_numbers [lreplace $numbers 2 4 7 8 9]
puts $new_numbers

This replaces elements from index 2 to 4 (3,4,5) with three new elements (7,8,9).
The resulting list is: 1 2 7 8 9 6. The replacement count doesn't need to match.

## Removing Elements

By not providing replacement elements, lreplace can remove elements
from a list.

remove_elements.tcl
  

set fruits {apple banana cherry date elderberry}
set trimmed [lreplace $fruits 1 3]
puts $trimmed

This removes elements from index 1 to 3 (banana, cherry, date) without adding
new elements. The result is a shorter list: apple elderberry.

## Inserting Elements

When first and last are the same index, lreplace inserts elements
without replacing any existing ones.

insert_elements.tcl
  

set letters {a b c d}
set extended [lreplace $letters 2 2 x y z]
puts $extended

This inserts elements x, y, z after index 2 without removing any elements.
The result is: a b x y z c d. The original element at index 2 is shifted right.

## Working with Nested Lists

lreplace can handle nested lists, replacing entire sublists when needed.

nested_list.tcl
  

set matrix {{1 2 3} {4 5 6} {7 8 9}}
set new_matrix [lreplace $matrix 1 1 {10 11 12}]
puts $new_matrix

This replaces the second sublist {4 5 6} with {10 11 12}. The result is a new
matrix: {1 2 3} {10 11 12} {7 8 9}. The command works the same with nested lists.

## End of List Operations

lreplace can operate on the end of a list using the special index "end".

end_operations.tcl
  

set items {pen pencil eraser ruler}
set updated [lreplace $items end end marker]
puts $updated

This replaces the last element "ruler" with "marker". The "end" index refers to
the last element. The result is: pen pencil eraser marker.

## Best Practices

- **Immutability:** Remember lreplace returns a new list without modifying the original.

- **Indexing:** Tcl uses 0-based indexing for list operations.

- **Performance:** For large lists, consider efficiency when replacing many elements.

- **Error Handling:** Check indices are valid to avoid errors.

- **Combination:** Combine with other list commands for complex operations.

 

This tutorial covered the Tcl lreplace command with practical
examples showing its usage in different scenarios for list manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).