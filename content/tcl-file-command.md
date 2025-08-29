+++
title = "Tcl file Command"
date = 2025-08-29T20:12:57.889+01:00
draft = false
description = "Tcl file command tutorial shows how to perform file operations in Tcl. Learn file with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl file Command

last modified April 3, 2025

The Tcl file command provides operations for file manipulation.
It allows checking file attributes, manipulating paths, and file operations.
The command is essential for file system interaction in Tcl scripts.

## Basic Definition

The file command is a collection of subcommands for file operations.
It handles file system paths, attributes, and basic file manipulations.

Syntax: file subcommand ?arg ...?. The first argument specifies
the operation type. Additional arguments depend on the subcommand used.

## Checking File Existence

The exists subcommand checks if a file or directory exists.
It returns 1 if the file exists and 0 otherwise.

file_exists.tcl
  

if {[file exists "test.txt"]} {
    puts "File exists"
} else {
    puts "File does not exist"
}

This example checks for the existence of "test.txt". The file exists
command returns a boolean value used in the conditional statement.

## Getting File Size

The size subcommand returns the size of a file in bytes.
The file must exist and be accessible for this operation to succeed.

file_size.tcl
  

set filename "data.txt"
if {[file exists $filename]} {
    set filesize [file size $filename]
    puts "File size: $filesize bytes"
} else {
    puts "File not found"
}

This script first checks if the file exists, then retrieves its size.
The size is stored in a variable and displayed with a descriptive message.

## Getting File Modification Time

The mtime subcommand returns a file's last modification time.
The time is returned as seconds since the Unix epoch (January 1, 1970).

file_mtime.tcl
  

set filename "report.doc"
set modtime [file mtime $filename]
set formatted [clock format $modtime -format "%Y-%m-%d %H:%M:%S"]
puts "Last modified: $formatted"

This example gets the modification time and formats it for human readability.
The clock format command converts the Unix timestamp to a string.

## Checking File Type

The type subcommand identifies whether a path is a file,
directory, or other special file type. It returns a string describing the type.

file_type.tcl
  

set path "/usr/local/bin"
set ftype [file type $path]
puts "Path type: $ftype"

set path "notes.txt"
set ftype [file type $path]
puts "Path type: $ftype"

This script checks two different paths - a directory and a regular file.
The output shows the different types returned by the file type command.

## Joining File Paths

The join subcommand combines path components into a valid path.
It handles platform-specific path separators automatically.

file_join.tcl
  

set dir "/home/user"
set filename "documents"
set subdir "projects"

set fullpath [file join $dir $filename $subdir]
puts "Full path: $fullpath"

This example demonstrates building a complete path from components.
The file join command ensures proper path separator usage.

## Getting File Extension

The extension subcommand extracts the extension from a filename.
It returns everything from the last dot to the end of the filename.

file_extension.tcl
  

set filename "report.pdf"
set ext [file extension $filename]
puts "File extension: $ext"

set filename "archive.tar.gz"
set ext [file extension $filename]
puts "File extension: $ext"

These examples show how to extract file extensions. Note that for
compound extensions like ".tar.gz", the entire suffix is returned.

## Best Practices

- **Error Handling:** Always check file existence before operations.

- **Platform Independence:** Use file join for paths.

- **Permissions:** Check file readable before reading.

- **Cleanup:** Close file handles properly after use.

- **Encoding:** Specify encoding when opening text files.

 

This tutorial covered the Tcl file command with practical
examples showing its usage for various file operations and attributes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).