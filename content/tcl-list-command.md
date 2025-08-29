+++
title = "Tcl list Command"
date = 2025-08-29T20:13:05.777+01:00
draft = false
description = "Tcl list command tutorial shows how to work with lists in Tcl. Learn list operations with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl list Command

last modified April 3, 2025

The Tcl list command creates and manipulates lists, which are
fundamental data structures in Tcl. Lists are ordered collections of elements
that can contain any Tcl values.

## Basic Definition

The list command creates a properly formatted list from its
arguments. It handles quoting and escaping automatically, making it safer
than manual list creation.

Syntax: list ?arg1 arg2 ... argN?. With no arguments, it returns
an empty list. With arguments, it creates a list containing those elements.

## Creating a Simple List

This example demonstrates basic list creation with the list command.

basic_list.tcl
  

set colors [list red green blue]
puts $colors

This creates a list containing three color names. The puts command
prints the entire list. The list elements are properly quoted and separated.

## Creating Nested Lists

The list command can create nested lists (lists within lists).

nested_list.tcl
  

set matrix [list [list 1 2 3] [list 4 5 6] [list 7 8 9]]
puts $matrix

This creates a 3x3 matrix as a nested list structure. Each inner list represents
a row of the matrix. The outer list contains these row lists as elements.

## List Concatenation

Lists can be concatenated using the list command with multiple lists.

concat_list.tcl
  

set fruits [list apple orange]
set veggies [list carrot potato]
set combined [list {*}$fruits {*}$veggies]
puts $combined

This combines two separate lists into one. The {*} operator expands
each list's elements. The result is a single list with all elements.

## Creating Lists with Special Characters

The list command properly handles elements containing spaces or
special characters.

special_list.tcl
  

set files [list "my document.txt" "important file.doc" "data.csv"]
puts $files

This creates a list of filenames containing spaces. The list command
automatically handles the quoting needed for elements with spaces.

## Empty List Creation

An empty list can be created by calling list with no arguments.

empty_list.tcl
  

set empty [list]
puts "Empty list has [llength $empty] elements"

This demonstrates creating an empty list, which is often used as an initial value.
The llength command confirms the list contains zero elements.

## List with Variable References

Lists can contain variable references that are evaluated when the list is used.

var_list.tcl
  

set name "Alice"
set age 30
set person [list $name $age]
puts $person

This creates a list containing the values of variables name and
age. The variables are evaluated when the list is created.

## Best Practices

- **Use list for creation:** Always use list to create lists safely.

- **Proper quoting:** Let list handle quoting automatically.

- **Nested lists:** Use nested lists for complex data structures.

- **List commands:** Use Tcl's list commands (lindex, lappend, etc.) for manipulation.

- **Variable expansion:** Use {*} for safe list expansion.

 

This tutorial covered the Tcl list command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).