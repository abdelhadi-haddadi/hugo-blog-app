+++
title = "Tcl scan Command"
date = 2025-08-29T20:13:12.563+01:00
draft = false
description = "Tcl scan command tutorial shows how to parse strings in Tcl. Learn scan with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl scan Command

last modified April 3, 2025

The Tcl scan command parses string data according to a format
specifier. It's similar to C's sscanf function. The command
extracts values from strings and assigns them to variables.

## Basic Definition

The scan command interprets string data based on a format string.
It returns the number of successful conversions performed.

Syntax: scan string format ?varName varName ...?. The format
specifier uses conversion characters similar to printf.

## Basic String Parsing

This example shows how to extract simple values from a string using scan.

basic_scan.tcl
  

set data "John 25"
scan $data "%s %d" name age
puts "Name: $name, Age: $age"

Here we parse a string containing a name and age. The %s format
extracts a string, while %d extracts a decimal integer.

## Hexadecimal Conversion

scan can convert hexadecimal numbers to decimal values.

scan_hex.tcl
  

set hex "FF"
scan $hex "%x" decimal
puts "Hex $hex is $decimal in decimal"

This converts the hexadecimal value "FF" to its decimal equivalent 255.
The %x format specifier handles hexadecimal conversion.

## Floating Point Numbers

The command can extract floating point numbers from strings.

scan_float.tcl
  

set measurement "12.5cm"
scan $measurement "%f" value
puts "Measurement: $value"

This extracts the floating point number 12.5 from the string "12.5cm".
The %f format specifier handles floating point conversion.

## Multiple Value Extraction

scan can extract multiple values from a single string.

scan_multiple.tcl
  

set coordinates "(3.14, 2.71)"
scan $coordinates "(%f, %f)" x y
puts "X: $x, Y: $y"

This parses two floating point numbers from a coordinate string.
The format string matches the parentheses and comma in the input.

## Character Extraction

Individual characters can be extracted using the %c format.

scan_char.tcl
  

set word "hello"
scan $word "%c" first_char
puts "First character: [format %c $first_char]"

This extracts the ASCII value of the first character 'h'. The format
command converts it back to a character for display.

## Ignoring Characters

Characters can be skipped in the input string using %*.

scan_ignore.tcl
  

set data "Name: John, Age: 25"
scan $data "Name: %s, Age: %d" name age
puts "Name: $name, Age: $age"

This example skips the literal strings "Name: " and ", Age: " while
extracting the variable values. The format string matches the input exactly.

## Best Practices

- **Format Matching:** Ensure format string matches input structure.

- **Error Handling:** Check return value for successful conversions.

- **Type Safety:** Use correct format specifiers for data types.

- **Whitespace:** Be aware of whitespace handling in format strings.

- **Performance:** For complex parsing, consider regular expressions.

 

This tutorial covered the Tcl scan command with practical
examples showing its usage for string parsing and conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).