+++
title = "Tcl concat Command"
date = 2025-08-29T20:12:54.605+01:00
draft = false
description = "Tcl concat command tutorial shows how to concatenate strings in Tcl. Learn concat with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl concat Command

last modified April 3, 2025

The Tcl concat command joins multiple strings into one. It's useful
for combining values with proper spacing. The command handles lists and strings
differently.

## Basic Definition

The concat command concatenates its arguments with spaces between
them. It treats lists specially by flattening them first.

Syntax: concat ?arg1 arg2 ... argN?. It returns the concatenation
of all arguments. If no arguments are given, it returns an empty string.

## Basic String Concatenation

This shows the simplest usage of concat to join strings.

basic_concat.tcl
  

set result [concat "Hello" "World"]
puts $result

This concatenates two strings with a space between them. The output will be
"Hello World". Note the automatic space insertion.

## Concatenating Multiple Strings

concat can handle any number of arguments and join them all.

multi_concat.tcl
  

set str1 "Tcl"
set str2 "is"
set str3 "awesome"
set sentence [concat $str1 $str2 $str3]
puts $sentence

This combines three variables into one sentence. Each variable's value is
separated by a space in the output: "Tcl is awesome".

## Concatenating Lists

concat has special behavior with lists - it flattens them first.

list_concat.tcl
  

set list1 {a b c}
set list2 {d e f}
set combined [concat $list1 $list2]
puts $combined

This combines two lists into one flattened list. The output will be "a b c d e f".
The command first flattens the lists, then concatenates them.

## Mixed String and List Concatenation

concat can handle mixed arguments of strings and lists.

mixed_concat.tcl
  

set words {Hello World}
set punctuation "!"
set sentence [concat $words $punctuation]
puts $sentence

This combines a list with a string. The output is "Hello World !". Note the
space before the exclamation mark, which comes from concat's behavior.

## Concatenating Variables with Literals

You can mix variables and literal strings in concat.

var_literal_concat.tcl
  

set name "John"
set greeting [concat "Hello" $name "how are you?"]
puts $greeting

This creates a greeting by combining literals and a variable. The output is
"Hello John how are you?". Each element is separated by a space.

## Empty Argument Handling

concat handles empty arguments gracefully, including no arguments.

empty_concat.tcl
  

set empty1 [concat]
set empty2 [concat "" ""]
puts "First: '$empty1', Second: '$empty2'"

This shows concat with no arguments and with empty strings. Both
cases return an empty string. This demonstrates its graceful edge case handling.

## Best Practices

- **Spacing:** Use when you need spaces between concatenated items.

- **Lists:** Remember it flattens lists before concatenation.

- **Performance:** For large concatenations, consider join.

- **Formatting:** Use format for complex string building.

- **Braces:** Use {} for literal strings to prevent substitution.

 

This tutorial covered the Tcl concat command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).