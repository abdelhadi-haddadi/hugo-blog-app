+++
title = "Tcl array Command"
date = 2025-08-29T20:12:50.167+01:00
draft = false
description = "Tcl array command tutorial shows how to work with arrays in Tcl. Learn array operations with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl array Command

last modified April 3, 2025

The Tcl array command provides operations for working with
associative arrays. Arrays in Tcl are collections of key-value pairs.
They are similar to dictionaries in other languages.

## Basic Definition

Tcl arrays are associative arrays where keys can be arbitrary strings.
They are different from traditional indexed arrays in other languages.

Syntax: array option arrayName ?arg ...?. The command takes
an operation name, array name, and optional arguments depending on the
operation.

## Creating and Setting Array Elements

This example shows how to create an array and set its elements.

array_set.tcl
  

array set colors {
    red    #ff0000
    green  #00ff00
    blue   #0000ff
}

puts $colors(red)
puts $colors(green)
puts $colors(blue)

Here we create an array named colors with three elements.
The array set command initializes the array with key-value
pairs. We then access individual elements using the $array(key)
syntax.

## Getting Array Size and Names

The array size and array names commands provide
information about an array.

array_info.tcl
  

array set fruits {
    apple  10
    orange 15
    banana 20
}

puts "Number of fruits: [array size fruits]"
puts "Fruit names: [array names fruits]"

This code creates a fruits array and then displays its size and keys.
array size returns the number of elements, while
array names returns a list of all keys.

## Iterating Over Array Elements

The array get command converts an array to a list, which
can be used for iteration.

array_iterate.tcl
  

array set temperatures {
    monday    72
    tuesday   68
    wednesday 75
}

foreach {day temp} [array get temperatures] {
    puts "$day: $temp°F"
}

This example shows how to iterate through all elements of an array.
The array get command returns a flat list of key-value
pairs, which we process with foreach.

## Checking Array Existence

The array exists command checks if a variable is an array.

array_exists.tcl
  

array set user {
    name    John
    age     30
    city    New York
}

if {[array exists user]} {
    puts "User array exists"
} else {
    puts "User array does not exist"
}

This demonstrates how to verify if a variable is an array before
attempting to use array operations on it. The command returns 1
if the variable is an array, 0 otherwise.

## Searching Array Elements

The array search functionality can be implemented using
array names with pattern matching.

array_search.tcl
  

array set books {
    tcl_programming 25
    python_guide    30
    tcl_cookbook    20
    java_basics     15
}

set tcl_books [array names books *tcl*]
foreach book $tcl_books {
    puts "$book: \$[set books($book)]"
}

This example searches for all books with "tcl" in their names. The
array names command with a glob pattern returns matching
keys. We then display these books with their prices.

## Unsetting Array Elements

The array unset command removes elements or entire arrays.

array_unset.tcl
  

array set config {
    debug   1
    logfile /var/log/app.log
    timeout 30
}

array unset config logfile
puts "Remaining config: [array get config]"

array unset config
puts "Array exists after unset: [array exists config]"

Here we first remove just the logfile element from the
array, then we remove the entire array. The command can target
specific elements or the whole array.

## Best Practices

- **Initialization:** Use array set for bulk initialization.

- **Checking:** Always check if an array exists before using it.

- **Patterns:** Use glob patterns with array names for searching.

- **Memory:** Unset arrays when no longer needed to free memory.

- **Naming:** Choose descriptive array names for better code clarity.

 

This tutorial covered the Tcl array command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).