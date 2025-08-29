+++
title = "Tcl lindex Command"
date = 2025-08-29T20:13:04.652+01:00
draft = false
description = "Tcl lindex command tutorial shows how to access list elements in Tcl. Learn lindex with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lindex Command

last modified April 3, 2025

The Tcl lindex command retrieves an element from a list by its index.
It's a fundamental command for working with lists in Tcl. The command supports
both simple and nested list indexing.

## Basic Definition

The lindex command returns the element at the specified index from
a list. Tcl lists are zero-indexed, meaning the first element is at index 0.

Syntax: lindex list ?index...?. With one index, it returns that
element. Multiple indices can be used for nested lists.

## Basic List Indexing

This example shows the simplest usage of lindex to access list
elements.

basic_lindex.tcl
  

set colors {red green blue yellow}
set first [lindex $colors 0]
puts "The first color is $first"

This creates a list of colors and retrieves the first element (index 0) using
lindex. The result is stored in first and printed.

## Negative Indexing

lindex supports negative indices which count from the end of the
list.

negative_index.tcl
  

set fruits {apple banana cherry date}
set last [lindex $fruits -1]
puts "The last fruit is $last"

Here we use index -1 to get the last element of the list. Negative indices are
convenient for accessing elements from the end without knowing the list length.

## Nested List Indexing

For nested lists, lindex can take multiple indices to drill down
into sublists.

nested_lindex.tcl
  

set matrix {{1 2 3} {4 5 6} {7 8 9}}
set element [lindex $matrix 1 2]
puts "The element at [1,2] is $element"

This demonstrates accessing an element in a nested list (matrix). The indices
1 and 2 specify row 1 (second row) and column 2 (third element) respectively.

## Out-of-Bounds Indexing

When an index is out of bounds, lindex returns an empty string
without raising an error.

out_of_bounds.tcl
  

set nums {10 20 30 40}
set value [lindex $nums 10]
if {$value eq ""} {
    puts "Index out of bounds"
}

This shows how lindex handles invalid indices. The code checks for
an empty string result when the index exceeds the list bounds.

## Multiple Indices with Variables

Indices can be specified using variables, allowing dynamic list access.

variable_indices.tcl
  

set data {{a b c} {d e f} {g h i}}
set row 1
set col 0
set item [lindex $data $row $col]
puts "Item at row $row, col $col is $item"

This example uses variables for indices, making the access pattern dynamic. The
variables row and col determine which element to
retrieve.

## End-relative Indexing

Tcl supports end-relative indexing with the end keyword, which
can be combined with offsets.

end_relative.tcl
  

set letters {a b c d e f g}
set third_last [lindex $letters end-2]
puts "The third last letter is $third_last"

This retrieves the third last element using end-2 syntax. The
end keyword represents the last element's index, and subtraction
works backward from there.

## Best Practices

- **Bounds Checking:** Always validate indices when uncertain.

- **Negative Indices:** Use them for convenient end access.

- **Nested Lists:** Document list structure for clarity.

- **Error Handling:** Check for empty string returns.

- **Performance:** Avoid repeated lindex in loops; use foreach.

 

This tutorial covered the Tcl lindex command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).