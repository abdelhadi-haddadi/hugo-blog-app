+++
title = "Tcl puts Command"
date = 2025-08-29T20:13:10.341+01:00
draft = false
description = "Tcl puts command tutorial shows how to output data in Tcl. Learn puts with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl puts Command

last modified April 3, 2025

The Tcl puts command is used to output text to the console or files.
It's the primary command for displaying information in Tcl scripts. The command
is simple yet versatile.

## Basic Definition

The puts command writes strings to the standard output by default.
It can also write to files when a file channel is specified. The command
automatically adds a newline unless instructed otherwise.

Syntax: puts ?-nonewline? ?channelId? string. The optional
-nonewline suppresses the newline. channelId specifies
an output channel.

## Basic Output

This example demonstrates the simplest usage of puts to display text.

basic_puts.tcl
  

puts "Hello, Tcl World!"

This command outputs the string "Hello, Tcl World!" followed by a newline.
The quotes around the string are required for multi-word strings.

## Output Without Newline

The -nonewline option prevents puts from adding a newline.

puts_nonewline.tcl
  

puts -nonewline "Enter your name: "
gets stdin name
puts "Hello, $name"

This creates a prompt that waits for user input on the same line. The gets
command reads input, and the final puts displays a greeting.

## Output to a File

puts can write to files by specifying a file channel.

puts_file.tcl
  

set file [open "output.txt" w]
puts $file "This goes to a file"
close $file

This opens a file for writing, writes a string to it, then closes the file.
The w mode truncates existing files or creates new ones.

## Output Variables

puts can display variable values using substitution.

puts_variable.tcl
  

set language "Tcl"
set version 8.6
puts "Using $language version $version"

This shows how to output variable values within a string. The dollar sign
triggers variable substitution in the string.

## Formatted Output

puts can display formatted output using the format command.

puts_format.tcl
  

set pi 3.14159265359
puts [format "Pi rounded to 2 decimals: %.2f" $pi]

This demonstrates formatting a floating-point number to 2 decimal places.
The format command provides C-style formatting capabilities.

## Multi-line Output

puts can output multiple lines using newline characters.

puts_multiline.tcl
  

puts "Line 1\nLine 2\nLine 3"

This shows how to create multi-line output with a single puts command.
The \n escape sequence represents a newline character.

## Best Practices

- **Newlines:** Use -nonewline only when needed.

- **Files:** Always close files after writing.

- **Buffering:** Use flush for immediate output.

- **Errors:** Check file operations for success.

- **Formatting:** Use format for complex output.

 

This tutorial covered the Tcl puts command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).