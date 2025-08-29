+++
title = "Tcl format Command"
date = 2025-08-29T20:13:00.150+01:00
draft = false
description = "Tcl format command tutorial shows how to format strings in Tcl. Learn format with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl format Command

last modified April 3, 2025

The Tcl format command creates formatted strings by substituting
values into a format specifier. It's similar to printf in other languages.
The command provides precise control over string formatting.

## Basic Definition

The format command uses format specifiers to control how values
are converted to strings. Each specifier starts with % followed by optional
modifiers and a conversion character.

Syntax: format formatString ?arg arg ...?. The formatString contains
literal text and format specifiers. Each specifier processes one argument.

## Basic String Formatting

This example demonstrates simple string formatting with the format command.

basic_format.tcl
  

set name "John"
set age 30
set result [format "Name: %s, Age: %d" $name $age]
puts $result

Here %s formats a string and %d formats a decimal integer. The variables
name and age are substituted into the format string.
The result is stored in result and printed.

## Number Formatting

The format command can control number display with width and precision.

number_format.tcl
  

set pi 3.1415926535
set formatted [format "%.2f" $pi]
puts "Pi rounded to 2 decimal places: $formatted"

The %.2f specifier formats the floating-point number to 2 decimal places.
This is useful for displaying monetary values or measurements where precision
matters.

## Width and Alignment

Format specifiers can control field width and alignment of values.

width_format.tcl
  

set items [list "Apple" "Banana" "Cherry"]
foreach item $items {
    puts [format "%-10s : %4.2f" $item [expr {rand()}]] 
}

This example shows left-aligned strings in 10-character fields and right-aligned
floating-point numbers. The - modifier left-aligns, while numbers default to
right alignment.

## Hexadecimal and Octal Formatting

The format command can convert numbers to different bases like hexadecimal.

hex_format.tcl
  

set num 255
puts [format "Decimal: %d, Hex: 0x%x, Octal: %o" $num $num $num]

This demonstrates number formatting in different bases. %x formats as hexadecimal,
%o as octal, and %d as decimal. The 0x prefix is added manually for clarity.

## Positional Specifiers

Format specifiers can reference arguments by position instead of order.

positional_format.tcl
  

set first "John"
set last "Doe"
set phone "555-1234"
puts [format "%2\$s, %1\$s - Phone: %3\$s" $first $last $phone]

The %n$ syntax specifies which argument to use (1-based index). This allows
reordering or reusing arguments without changing their positions in the call.

## Formatting Lists

The format command can process list elements with some additional Tcl commands.

list_format.tcl
  

set numbers {1 2 3 4 5}
set formatted [join [lmap n $numbers {format "%03d" $n}] ", "]
puts "Formatted numbers: $formatted"

This formats each list element to 3 digits with leading zeros, then joins them
with commas. The lmap command applies format to each element, creating a new
list of formatted strings.

## Best Practices

- **Clarity:** Use format for complex string construction.

- **Localization:** Consider format for number localization.

- **Performance:** Format is efficient for multiple values.

- **Readability:** Break complex formats into smaller parts.

- **Validation:** Validate inputs before formatting.

 

This tutorial covered the Tcl format command with practical
examples showing its usage in different string formatting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).