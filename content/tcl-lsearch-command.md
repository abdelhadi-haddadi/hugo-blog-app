+++
title = "Tcl lsearch Command"
date = 2025-08-29T20:13:06.877+01:00
draft = false
description = "Tcl lsearch command tutorial shows how to search lists in Tcl. Learn lsearch with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl lsearch Command

last modified April 3, 2025

The Tcl lsearch command searches for elements in a list. It returns
the index of the first matching element or -1 if not found. The command supports
various search options for flexible list searching.

## Basic Definition

The lsearch command searches a list for elements matching a pattern.
It returns the index of the first match or -1 if no match is found.

Syntax: lsearch ?options? list pattern. Options modify the search
behavior. The list is the target of the search, and pattern is what to find.

## Basic List Search

This example demonstrates the simplest usage of lsearch to find an
element in a list.

basic_search.tcl
  

set colors {red green blue yellow orange}
set index [lsearch $colors "blue"]
puts "Blue found at index: $index"

This searches the colors list for "blue" and returns its index (2). The result
is stored in the index variable and printed. If not found, it would return -1.

## Search with Exact Matching

The -exact option forces exact matching rather than pattern matching.

exact_search.tcl
  

set fruits {apple banana cherry date elderberry}
set idx [lsearch -exact $fruits "cherry"]
puts "Cherry found at: $idx"

This finds "cherry" in the fruits list using exact matching. Without -exact,
"cherry" would match patterns like "ch*" or "*erry". The exact option prevents
this.

## Case-Insensitive Search

The -nocase option makes the search case-insensitive.

nocase_search.tcl
  

set items {Book Pen Pencil Notebook Eraser}
set pos [lsearch -nocase $items "notebook"]
puts "Notebook found at: $pos"

This searches for "notebook" regardless of case. It would match "Notebook",
"NOTEBOOK", or any other case variation. The search returns the first match's
index.

## Finding All Matches

The -all option returns all matching indices, not just the first.

all_search.tcl
  

set numbers {1 5 2 5 3 5 4 5}
set matches [lsearch -all $numbers 5]
puts "Number 5 found at positions: $matches"

This finds all occurrences of 5 in the numbers list. The result is a list of
indices where 5 appears. Without -all, only the first match's index would be
returned.

## Search with Regular Expressions

The -regexp option enables regular expression pattern matching.

regexp_search.tcl
  

set words {cat dog bird fish mouse}
set idx [lsearch -regexp $words {^[df]}]
puts "Word starting with d or f at: $idx"

This searches for words starting with 'd' or 'f' using a regular expression.
The pattern ^[df] matches any element starting with d or f. The first match
(dog) is returned.

## Inverted Search

The -not option inverts the search, finding non-matching elements.

not_search.tcl
  

set data {10 20 30 40 50 60}
set idx [lsearch -not -integer $data 30]
puts "First element not equal to 30: $idx"

This finds the first element that isn't 30. The -integer option specifies
numeric comparison. The result is 0 (the first element, 10) because it's the
first non-30 value.

## Best Practices

- **Options:** Combine options carefully (-exact -nocase etc.)

- **Performance:** For large lists, consider sorting first.

- **Patterns:** Be mindful of glob vs regexp patterns.

- **Error Handling:** Check for -1 when element not found.

- **Lists:** Ensure your data is properly formatted as a list.

 

This tutorial covered the Tcl lsearch command with practical
examples showing its usage in different search scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).