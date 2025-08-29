+++
title = "Tcl regexp Command"
date = 2025-08-29T20:13:11.442+01:00
draft = false
description = "Tcl regexp command tutorial shows how to use regular expressions in Tcl. Learn regexp with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl regexp Command

last modified April 3, 2025

The Tcl regexp command matches regular expressions against strings.
It's a powerful tool for pattern matching and text extraction. The command
returns 1 if the pattern matches, 0 otherwise.

## Basic Definition

Regular expressions are patterns used to match character combinations in strings.
The regexp command follows this syntax: regexp ?switches?
exp string ?matchVar? ?subMatchVar ...?.

The exp is the regular expression pattern. The string
is the input text to match against. Optional match variables store matched
subpatterns.

## Simple Pattern Matching

This example demonstrates basic pattern matching with regexp.
We check if a string contains digits.

simple_match.tcl
  

set text "Order 12345 was placed on 2023-05-15"
if {[regexp {\d+} $text]} {
    puts "Digits found in text"
} else {
    puts "No digits found"
}

The pattern \d+ matches one or more digits. The command returns 1
if any digits are found. The match result is used in a conditional statement.

## Extracting Matches

This example shows how to extract matched substrings using match variables.

extract_match.tcl
  

set email "john.doe@example.com"
regexp {([^@]+)@(.+)} $email full user domain
puts "Full: $full"
puts "User: $user"
puts "Domain: $domain"

The pattern captures the username and domain parts of an email address.
The first capture group ([^@]+) matches everything before @.
The second (.+) matches everything after. The variables store
the matches.

## Case-Insensitive Matching

The -nocase switch enables case-insensitive pattern matching.

nocase_match.tcl
  

set text "The Quick Brown Fox"
if {[regexp -nocase {quick} $text]} {
    puts "Found 'quick' (case insensitive)"
}

Without -nocase, the pattern would only match lowercase 'quick'.
The switch makes the match case-insensitive, so it matches 'Quick' in the text.

## Anchored Matching

Anchors ensure the pattern matches at specific positions in the string.

anchored_match.tcl
  

set names [list "John Smith" "Alice Johnson" "Smith Brown"]
foreach name $names {
    if {[regexp {^Smith} $name]} {
        puts "$name starts with Smith"
    } elseif {[regexp {Smith$} $name]} {
        puts "$name ends with Smith"
    }
}

^ anchors the match to the start of the string, while $
anchors to the end. The script checks if 'Smith' appears at the start or end
of each name.

## Advanced Subpattern Extraction

This example demonstrates extracting multiple subpatterns from a complex string.

subpatterns.tcl
  

set log "ERROR 2023-05-15 14:30:45 [MainThread] Connection timeout"
regexp {(\w+)\s+(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+\[(\w+)\]\s+(.*)} \
    $log level date time thread message
puts "Level: $level"
puts "Date: $date"
puts "Time: $time"
puts "Thread: $thread"
puts "Message: $message"

The pattern extracts five components from a log entry: error level, date, time,
thread name, and message. Each component is captured in parentheses and stored
in a separate variable.

## Using Switches

This example combines multiple switches for more powerful matching.

switches.tcl
  

set text "First line\nSecond line\nThird line"
set matches [regexp -all -inline -lineanchor {\w+ line} $text]
puts "Matches: $matches"

The -all switch finds all matches, -inline returns
them as a list, and -lineanchor makes ^ and $ match line
boundaries. The command returns all lines ending with 'line'.

## Best Practices

- **Readability:** Use comments for complex patterns.

- **Efficiency:** Avoid greedy quantifiers when possible.

- **Testing:** Test patterns with various inputs.

- **Escaping:** Properly escape special characters.

- **Performance:** Compile patterns with regexp for repeated use.

 

This tutorial covered the Tcl regexp command with practical
examples showing pattern matching and text extraction techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).