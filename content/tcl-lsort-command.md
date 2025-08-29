+++
title = "Tcl lsort Command"
date = 2025-08-29T20:13:06.874+01:00
draft = false
description = "Tcl lsort command tutorial shows how to sort lists in Tcl. Learn lsort with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lsort Command

last modified April 3, 2025

The Tcl lsort command sorts the elements of a list. It provides
various options to control the sorting behavior. The command returns a new
sorted list without modifying the original.

## Basic Definition

The lsort command sorts list elements according to specified
options. By default, it sorts in ASCII order. The original list remains
unchanged.

Syntax: lsort ?options? list. Options control sorting order,
comparison method, and other behaviors. Multiple options can be combined.

## Basic List Sorting

This example demonstrates the simplest usage of lsort to sort a list.

basic_lsort.tcl
  

set colors {red green blue yellow orange}
set sorted [lsort $colors]
puts $sorted

This sorts the list of colors alphabetically. The original list remains
unchanged. The sorted result is stored in the sorted variable.

## Numerical Sorting

The -integer option sorts elements as integers rather than strings.

lsort_numeric.tcl
  

set numbers {5 12 3 25 1 8}
set sorted [lsort -integer $numbers]
puts $sorted

Without -integer, numbers would sort as strings (1, 12, 25, 3...).
The option ensures proper numerical ordering. The result is 1, 3, 5, 8, 12, 25.

## Reverse Order Sorting

The -decreasing option sorts elements in descending order.

lsort_reverse.tcl
  

set fruits {apple banana cherry date elderberry}
set sorted [lsort -decreasing $fruits]
puts $sorted

This sorts the fruits list in reverse alphabetical order. The result starts
with the highest value (elderberry) to lowest (apple). Combine with other
options for more control.

## Case-Insensitive Sorting

The -nocase option performs case-insensitive sorting of strings.

lsort_nocase.tcl
  

set mixed {Apple banana Cherry Date elderberry}
set sorted [lsort -nocase $mixed]
puts $sorted

Without -nocase, uppercase letters sort before lowercase. The
option makes sorting ignore case differences. Result is Apple, banana, Cherry,
Date, elderberry.

## Unique Elements Sorting

The -unique option removes duplicate elements from the sorted list.

lsort_unique.tcl
  

set duplicates {a b c a d b e c f}
set sorted [lsort -unique $duplicates]
puts $sorted

This sorts the list and removes duplicate values. The result contains each
element only once. Useful for creating distinct value sets from input data.

## Custom Comparison Sorting

The -command option allows specifying a custom comparison script.

lsort_custom.tcl
  

proc compare_length {a b} {
    return [expr {[string length $a] - [string length $b}]
}

set words {programming language Tcl is fun to learn}
set sorted [lsort -command compare_length $words]
puts $sorted

This sorts words by their length using a custom comparison procedure. The proc
returns negative, zero, or positive to indicate ordering. Result is shortest
to longest words.

## Best Practices

- **Options:** Combine options like -integer -decreasing.

- **Performance:** For large lists, consider most efficient options.

- **Stability:** Tcl's sort is stable (equal elements keep order).

- **Indexing:** Use -index for sorting lists of lists.

- **Memory:** lsort creates new lists; watch memory usage.

 

This tutorial covered the Tcl lsort command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).