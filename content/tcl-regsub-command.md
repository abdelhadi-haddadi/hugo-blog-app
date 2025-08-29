+++
title = "Tcl regsub Command"
date = 2025-08-29T20:13:11.436+01:00
draft = false
description = "Tcl regsub command tutorial shows how to perform regex substitutions in Tcl. Learn regsub with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl regsub Command

last modified April 3, 2025

The Tcl regsub command performs regular expression substitutions
on strings. It searches for patterns and replaces them with specified strings.
This powerful command is essential for text processing in Tcl.

## Basic Definition

The regsub command matches a regular expression against a string
and performs substitutions. It can modify the original string or store the
result in a new variable.

Syntax: regsub ?switches? exp string subSpec varName. The command
returns 1 if a match occurred, 0 otherwise. The modified string is stored in
varName.

## Simple Substitution

This example demonstrates a basic substitution where we replace all occurrences
of "cat" with "dog" in a string.

basic_regsub.tcl
  

set text "I have a cat. My cat is black."
regsub -all "cat" $text "dog" new_text
puts $new_text

The -all switch ensures all occurrences are replaced, not just the
first one. The original string remains unchanged, and the result is stored in
new_text.

## Using Capture Groups

Capture groups (parentheses in the pattern) allow us to reference matched
portions in the substitution string.

regsub_groups.tcl
  

set date "2025-04-03"
regsub {(\d{4})-(\d{2})-(\d{2})} $date {\3/\2/\1} new_date
puts $new_date

This reformats a date from YYYY-MM-DD to DD/MM/YYYY. The backreferences
\1, \2, and \3 correspond to the
captured groups in order.

## Case-Insensitive Matching

The -nocase switch makes the pattern matching case-insensitive.

regsub_nocase.tcl
  

set text "Apple orange apple ORANGE"
regsub -all -nocase "apple" $text "pear" new_text
puts $new_text

All variations of "apple" (regardless of case) are replaced with "pear".
The -nocase switch ensures the pattern matches any capitalization.

## Line Anchors

Anchors like ^ (start of string) and $ (end of string) help match specific
positions in the text.

regsub_anchors.tcl
  

set lines "start\nmiddle\nend"
regsub -all {^} $lines "&gt; " new_lines
regsub -all {$} $new_lines " &lt;" new_lines
puts $new_lines

This adds "&gt; " at the start of each line and " &lt;" at the end. The anchors
match the beginning and end of each line in multiline mode.

## Advanced Substitution with Backreferences

Complex substitutions can use backreferences to transform matched text.

regsub_backref.tcl
  

set names "John Smith, Jane Doe"
regsub -all {(\w+) (\w+)} $names {\2, \1} new_names
puts $new_names

This swaps first and last names, converting "John Smith" to "Smith, John".
The pattern captures two word groups, and the substitution reorders them.

## Conditional Substitution

The return value of regsub can be used to conditionally execute
code based on whether a substitution occurred.

regsub_conditional.tcl
  

set text "Sample text with numbers 123"
if {[regsub {\d+} $text "NUMBERS" new_text]} {
    puts "Substitution made: $new_text"
} else {
    puts "No numbers found"
}

This checks if any numbers exist in the text and performs a substitution if
they do. The if statement uses regsub's return value as a
condition.

## Best Practices

- **Braces:** Use {} for patterns to avoid backslash hell.

- **Anchors:** Be specific with ^ and $ for precise matching.

- **Performance:** Compile complex patterns with regexp first.

- **Testing:** Test patterns thoroughly with various inputs.

- **Escaping:** Escape special regex characters properly.

 

This tutorial covered the Tcl regsub command with practical
examples showing its usage in different text processing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).