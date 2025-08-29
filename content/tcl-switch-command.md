+++
title = "Tcl switch Command"
date = 2025-08-29T20:13:14.769+01:00
draft = false
description = "Tcl switch command tutorial shows how to use conditional branching in Tcl. Learn switch with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl switch Command

last modified April 3, 2025

The Tcl switch command provides multi-way branching based on
pattern matching. It's more efficient than multiple if-else
statements when testing a single value against multiple possibilities.

## Basic Definition

The switch command evaluates an expression and matches it against
patterns to execute corresponding scripts. It supports exact, glob-style, and
regexp pattern matching.

Syntax: switch ?options? string pattern body ?pattern body ...?.
The command compares string against each pattern and
executes the first matching body.

## Basic Exact Matching

This example demonstrates simple exact matching with the switch
command.

basic_switch.tcl
  

set day "Tuesday"

switch $day {
    "Monday"    { puts "Start of work week" }
    "Tuesday"   { puts "Second day" }
    "Wednesday" { puts "Midweek" }
    "Thursday"  { puts "Almost Friday" }
    "Friday"    { puts "Weekend coming" }
    default     { puts "Weekend day" }
}

The script matches the exact value of day against the patterns.
When it finds "Tuesday", it executes the corresponding body. The default
case handles any unmatched values.

## Glob-Style Pattern Matching

This example shows how to use glob-style patterns with the -glob
option.

switch_glob.tcl
  

set filename "report2023.pdf"

switch -glob $filename {
    "*.txt"   { puts "Text file" }
    "*.pdf"   { puts "PDF document" }
    "*.jpg"   { puts "JPEG image" }
    "report*" { puts "Report file" }
    default   { puts "Unknown file type" }
}

The -glob option enables glob-style pattern matching. The script
matches both the ".pdf" extension and the "report" prefix patterns. Only the
first matching pattern's body is executed.

## Regular Expression Matching

This example demonstrates regex pattern matching using the -regexp
option.

switch_regex.tcl
  

set input "user123"

switch -regexp $input {
    "^[a-z]+$"       { puts "All letters" }
    "^[0-9]+$"       { puts "All digits" }
    "^[a-z]+[0-9]+$" { puts "Letters followed by digits" }
    "^[0-9]+[a-z]+$" { puts "Digits followed by letters" }
    default          { puts "No match" }
}

The -regexp option enables regular expression matching. The script
matches the pattern "letters followed by digits" and executes the corresponding
body. Regex patterns provide powerful matching capabilities.

## Fall-Through Behavior

This example shows how to use the - marker for fall-through behavior.

switch_fallthrough.tcl
  

set number 3

switch $number {
    1       { puts "One" }
    2       -
    3       { puts "Two or Three" }
    4       { puts "Four" }
    default { puts "Other number" }
}

The - marker allows multiple patterns to execute the same body. Here
both 2 and 3 execute the "Two or Three" body. This is useful for grouping similar
cases together.

## Using Braces for Patterns

This example demonstrates using braces for patterns to prevent substitution.

switch_braces.tcl
  

set value "red"

switch $value {
    red     { set color_code "#FF0000" }
    green   { set color_code "#00FF00" }
    blue    { set color_code "#0000FF" }
    default { set color_code "#000000" }
}

puts "Color code for $value is $color_code"

The patterns are enclosed in braces to prevent any substitution or interpretation.
This is the most common way to write switch commands in Tcl. The
braces ensure the patterns are treated literally.

## Nested Switch Commands

This example shows how to nest switch commands for complex logic.

switch_nested.tcl
  

set category "fruit"
set item "apple"

switch $category {
    "fruit" {
        switch $item {
            "apple"  { puts "It's an apple" }
            "banana" { puts "It's a banana" }
            default  { puts "Unknown fruit" }
        }
    }
    "vegetable" {
        switch $item {
            "carrot" { puts "It's a carrot" }
            "potato" { puts "It's a potato" }
            default  { puts "Unknown vegetable" }
        }
    }
    default { puts "Unknown category" }
}

Nested switch commands allow for hierarchical decision making. The
outer switch handles the category, while inner switches handle specific items
within each category. This structure keeps complex logic organized.

## Best Practices

- **Default case:** Always include a default case for unmatched values.

- **Pattern order:** Place more specific patterns before general ones.

- **Braces:** Use braces for patterns to prevent substitution.

- **Comments:** Add comments for complex patterns or logic.

- **Performance:** For many cases, switch is faster than if-else.

 

This tutorial covered the Tcl switch command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).