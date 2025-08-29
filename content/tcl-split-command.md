+++
title = "Tcl split Command"
date = 2025-08-29T20:13:14.796+01:00
draft = false
description = "Tcl split command tutorial shows how to split strings in Tcl. Learn split with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl split Command

last modified April 3, 2025

The Tcl split command divides strings into lists using specified
delimiters. It's essential for parsing and processing textual data in Tcl.

## Basic Definition

The split command breaks a string into list elements based on
delimiter characters. If no delimiter is specified, it splits on whitespace.

Syntax: split string ?splitChars?. The optional splitChars
parameter defines the delimiter(s). The command returns a Tcl list.

## Splitting on Whitespace

This example demonstrates the default behavior of splitting on whitespace.

basic_split.tcl
  

set text "apple banana cherry"
set fruits [split $text]
puts $fruits

The string is split at each space character, creating a three-element list.
The puts command outputs the resulting list: apple banana cherry.

## Splitting on Specific Characters

Here we split a string using a comma as the delimiter.

split_comma.tcl
  

set csv "red,green,blue,yellow"
set colors [split $csv ","]
puts $colors

The comma-separated string is split into individual color names. Each comma
becomes a list element separator. The output is a four-element list.

## Splitting on Multiple Delimiters

The split command can use multiple delimiter characters simultaneously.

split_multiple.tcl
  

set data "apple:banana;cherry,date"
set items [split $data ":;,"]
puts $items

This splits the string at any colon, semicolon, or comma. The result is a
four-element list containing the fruit names without the delimiters.

## Splitting Lines from a File

A common use case is splitting file content into lines using newline characters.

split_lines.tcl
  

set file_content "First line\nSecond line\nThird line"
set lines [split $file_content "\n"]
foreach line $lines {
    puts "Line: $line"
}

The newline character (\n) serves as the delimiter, splitting the content
into separate lines. The foreach loop then processes each line individually.

## Splitting with Empty Elements

Consecutive delimiters create empty list elements, which can be useful.

split_empty.tcl
  

set data "one,,three,four,,six"
set items [split $data ","]
puts "Number of elements: [llength $items]"
puts $items

The double commas create empty elements in the resulting list. The llength
command shows there are six elements, including the empty ones.

## Splitting Path Components

File paths can be split into components using the directory separator.

split_path.tcl
  

set path "/usr/local/bin/tclsh"
set components [split $path "/"]
puts "Components:"
foreach comp $components {
    if {$comp ne ""} {
        puts $comp
    }
}

This splits a Unix path into its components. The empty first element (from the
leading slash) is skipped in the output. Each directory level becomes a list item.

## Best Practices

- **Trim Whitespace:** Use string trim before splitting if needed.

- **Empty Elements:** Be aware that consecutive delimiters create empty elements.

- **Performance:** For large strings, consider alternative approaches.

- **Join Command:** Remember join is the inverse operation.

- **Special Characters:** Escape special characters properly in delimiters.

 

This tutorial covered the Tcl split command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).