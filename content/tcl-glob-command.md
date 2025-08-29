+++
title = "Tcl glob Command"
date = 2025-08-29T20:13:01.285+01:00
draft = false
description = "Tcl glob command tutorial shows how to match file patterns in Tcl. Learn glob with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl glob Command

last modified April 3, 2025

The Tcl glob command is used to match file names against patterns. 
It returns a list of files that match specified patterns. This is useful for 
file operations and directory listings.

## Basic Definition

The glob command expands wildcard patterns to match file names. 
It supports various pattern matching characters similar to Unix shell globbing.

Syntax: glob ?switches? ?--? ?pattern ...?. The command returns 
a list of files matching the pattern(s). Switches modify its behavior.

## Basic File Matching

This example shows the simplest usage of glob to list all .tcl 
files in the current directory.

basic_glob.tcl
  

set tcl_files [glob *.tcl]
puts "Tcl files: $tcl_files"

The pattern *.tcl matches all files ending with .tcl. The result 
is stored in tcl_files and printed. This is case-sensitive.

## Multiple Patterns

glob can accept multiple patterns separated by spaces.

multi_pattern.tcl
  

set files [glob *.tcl *.txt]
puts "Matching files: $files"

This matches both .tcl and .txt files. The result is a combined list of 
all files matching either pattern. Order in the result isn't guaranteed.

## Hidden Files

By default, glob doesn't match hidden files (starting with dot). 
The -nocomplain switch prevents errors when no matches are found.

hidden_files.tcl
  

set hidden_files [glob -nocomplain .*]
puts "Hidden files: $hidden_files"

The .* pattern matches hidden files. -nocomplain 
returns an empty list if no matches exist instead of raising an error.

## Directory Recursion

The -directory and -recursive switches enable 
searching in specific directories and subdirectories.

recursive_glob.tcl
  

set all_tcl [glob -directory /path/to/tcl -recursive *.tcl]
puts "All Tcl files: $all_tcl"

This finds all .tcl files in /path/to/tcl and its subdirectories. The 
-recursive switch enables deep directory traversal.

## Type Filtering

The -type switch filters matches by file type (file, directory, etc).

type_filter.tcl
  

set directories [glob -type d *]
puts "Directories: $directories"

This lists only directories in the current folder. -type d 
matches directories, while -type f would match only files.

## Case Insensitive Matching

The -nocase switch enables case-insensitive pattern matching.

nocase_glob.tcl
  

set image_files [glob -nocase *.JPG *.png]
puts "Image files: $image_files"

This matches .jpg/.JPG and .png files regardless of case. Useful when 
dealing with files from different operating systems.

## Best Practices

- **Error Handling:** Use -nocomplain when matches might not exist.

- **Quoting:** Protect patterns with braces {} to prevent substitution.

- **Performance:** Be cautious with recursive globs on large directories.

- **Platform:** Remember glob patterns differ across platforms.

- **Sorting:** Sort results if order matters in your application.

 

This tutorial covered the Tcl glob command with practical
examples showing its usage in different file matching scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).