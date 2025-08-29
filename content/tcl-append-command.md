+++
title = "Tcl append Command"
date = 2025-08-29T20:12:50.161+01:00
draft = false
description = "Tcl append command tutorial shows how to concatenate strings in Tcl. Learn append with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl append Command

last modified April 3, 2025

The Tcl append command concatenates strings to a variable. It's more
efficient than using set for string concatenation. The command
modifies the variable in place.

## Basic Definition

The append command appends one or more values to a variable. If the
variable doesn't exist, it creates it. The command returns the new value.

Syntax: append varName ?value value ...?. The first argument is the
variable name. Subsequent arguments are values to append.

## Basic String Concatenation

This shows the simplest usage of append to concatenate strings.

basic_append.tcl
  

set str "Hello"
append str " " "World"
puts $str

This creates a variable str with value "Hello", then appends a space
and "World". The result is "Hello World" printed to standard output.

## Appending Multiple Values

The append command can append multiple values in a single call.

append_multiple.tcl
  

set sentence "Tcl"
append sentence " is" " a" " powerful" " language"
puts $sentence

Here we build a sentence by appending multiple words in one command. This is
more efficient than multiple separate append operations.

## Appending to Non-existent Variables

append creates the variable if it doesn't exist, unlike some other
commands.

append_new_var.tcl
  

# No prior definition of 'text'
append text "Creating" " new" " variable"
puts $text

This demonstrates that append will create the text
variable automatically. The variable is initialized with the concatenated values.

## Appending Numbers

append works with numbers by converting them to strings.

append_numbers.tcl
  

set result "The answer is: "
append result 4 2
puts $result

Numbers 4 and 2 are converted to strings and appended. The result is "The answer
is: 42". Note this is string concatenation, not arithmetic addition.

## Appending in Loops

append is often used in loops to build strings incrementally.

append_loop.tcl
  

set output ""
foreach word {Tcl is great for scripting} {
    append output $word " "
}
puts [string trim $output]

This loop builds a sentence by appending each word with a space. The final
string trim removes the trailing space. This pattern is common for
building output strings.

## Appending to List Elements

append can modify individual list elements when used with lindex.

append_list.tcl
  

set colors {red green blue}
append [lindex colors 1] "ish"
puts $colors

This appends "ish" to the second list element (index 1), changing "green" to
"greenish". The list structure is preserved while modifying one element.

## Best Practices

- **Performance:** Use append instead of set for concatenation.

- **Clarity:** Prefer multiple appends over very long argument lists.

- **Whitespace:** Remember to include spaces between words.

- **Lists:** For complex data, consider using lists instead.

- **Initialization:** Initialize variables for clarity when needed.

 

This tutorial covered the Tcl append command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).