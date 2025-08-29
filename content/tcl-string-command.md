+++
title = "Tcl string Command"
date = 2025-08-29T20:13:14.773+01:00
draft = false
description = "Tcl string command tutorial shows how to manipulate strings in Tcl. Learn string operations with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl string Command

last modified April 3, 2025

The Tcl string command provides powerful string manipulation capabilities. It includes operations for comparison, searching, modification, and more. The command has multiple subcommands for specific operations.

## Basic Definition

The string command performs operations on strings. Its syntax is string operation arg ?arg ...?. The first argument specifies the operation to perform. Common operations include comparison, searching, and modification.

Strings in Tcl are binary-safe and can contain any character including null bytes. The string command handles both ASCII and Unicode strings properly. All string indices start at 0 in Tcl.

## String Comparison

The string compare operation compares two strings lexicographically. It returns -1, 0, or 1 if the first string is less than, equal to, or greater than the second.

string_compare.tcl
  

set result [string compare "apple" "banana"]
puts "Comparison result: $result"

set result [string compare "orange" "orange"]
puts "Comparison result: $result"

The first comparison returns -1 because "apple" comes before "banana". The second returns 0 as the strings are identical. This is useful for sorting and conditional logic.

## String Length

The string length operation returns the number of characters in a string. This counts all characters including spaces and special characters.

string_length.tcl
  

set text "Hello, Tcl world!"
set len [string length $text]
puts "The string '$text' has $len characters"

This example calculates the length of the string "Hello, Tcl world!". The result is 17 characters including spaces and punctuation. The length operation is often used in loops.

## String Indexing

The string index operation retrieves a character at a specific position. String indices start at 0. Negative indices count from the end.

string_index.tcl
  

set str "Tcl Programming"
set char [string index $str 4]
puts "Character at index 4: '$char'"

set last [string index $str end]
puts "Last character: '$last'"

This retrieves the character at position 4 (space) and the last character ('g'). The 'end' keyword is a convenient way to access the last character without knowing the length.

## String Range

The string range operation extracts a substring from a string. It takes start and end indices (inclusive). Both indices can use the 'end' keyword.

string_range.tcl
  

set text "Tcl is powerful"
set sub [string range $text 4 7]
puts "Substring from 4 to 7: '$sub'"

set last3 [string range $text end-2 end]
puts "Last three characters: '$last3'"

The first example extracts "is p" from the original string. The second gets the last three characters "ful". This is useful for parsing fixed-format data.

## String Replace

The string replace operation replaces part of a string with another string. It can delete characters by replacing with an empty string.

string_replace.tcl
  

set original "I like Java"
set modified [string replace $original 7 10 "Tcl"]
puts "Modified string: $modified"

set no_spaces [string replace $original 1 1 ""]
puts "Without first space: $no_spaces"

The first replacement changes "Java" to "Tcl". The second removes the first space character. Replace operations don't modify the original string but return a new string.

## String Matching

The string match operation tests if a string matches a pattern. It uses glob-style patterns with *, ?, and [] as wildcards.

string_match.tcl
  

set result [string match "*.tcl" "script.tcl"]
puts "Does 'script.tcl' match '*.tcl'? $result"

set result [string match "[A-Z]*" "Tcl"]
puts "Does 'Tcl' start with uppercase? $result"

The first test checks if the string ends with ".tcl". The second verifies if it starts with an uppercase letter. Pattern matching is useful for filename processing.

## Best Practices

- **Unicode:** Use string is for Unicode character checks.

- **Performance:** Avoid repeated string operations in loops.

- **Patterns:** Prefer string match over regex for simple patterns.

- **Case:** Use string tolower/toupper for case-insensitive comparison.

- **Trimming:** Use string trim to clean user input.

 

This tutorial covered the Tcl string command with practical examples showing its most common operations. The string command is essential for text processing in Tcl.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).