+++
title = "Tcl source Command"
date = 2025-08-29T20:13:13.676+01:00
draft = false
description = "Tcl source command tutorial shows how to load external scripts in Tcl. Learn source with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl source Command

last modified April 3, 2025

The Tcl source command reads and executes a script from a file. It
is used to load external Tcl scripts into the current interpreter. This allows
for modular programming and code reuse.

## Basic Definition

The source command evaluates the contents of a file as a Tcl script.
It takes a single argument - the path to the file to be sourced.

Syntax: source fileName. The command returns the result of the last
command executed from the sourced file. File paths can be absolute or relative.

## Basic File Sourcing

This example shows the simplest usage of source to load a script.

basic_source.tcl
  

# Contents of greetings.tcl:
# puts "Hello from external script!"
# set greeting "Welcome"

source greetings.tcl
puts $greeting

This sources a file called greetings.tcl that contains Tcl commands. After
sourcing, the variable greeting is available in the main script.

## Relative Path Sourcing

The source command can load files using relative paths from the
current directory.

relative_source.tcl
  

# File structure:
# main.tcl
# lib/utils.tcl

source lib/utils.tcl
puts "Utility functions loaded"

This demonstrates sourcing a file from a subdirectory. The path is relative to
the location of the script containing the source command.

## Absolute Path Sourcing

For more control, absolute paths can be used with the source command.

absolute_source.tcl
  

source /home/user/tclscripts/config.tcl
puts "Configuration loaded from absolute path"

This example shows sourcing a file using its full absolute path. This method is
useful when the script location is fixed and known in advance.

## Sourcing with Variables

The file path for source can be constructed using variables and command
substitution.

variable_source.tcl
  

set script_dir "lib"
set script_name "helpers.tcl"
source [file join $script_dir $script_name]
puts "Helpers sourced successfully"

This demonstrates building the source path dynamically using variables and the
file join command for proper path construction across platforms.

## Error Handling

When sourcing files, it's important to handle potential errors gracefully.

error_handling.tcl
  

if {[file exists "important.tcl"]} {
    source important.tcl
} else {
    puts "Warning: important.tcl not found"
}

This shows how to check for a file's existence before attempting to source it.
The file exists command helps prevent runtime errors.

## Return Value

The source command returns the result of the last command executed from the
sourced file.

return_value.tcl
  

# Contents of calc.tcl:
# expr {5 * 5}

set result [source calc.tcl]
puts "The calculation result is $result"

This example demonstrates capturing the return value from a sourced file. The
calculation in calc.tcl is executed and its result is stored in a variable.

## Best Practices

- **Organization:** Keep sourced files logically organized.

- **Paths:** Use relative paths for portability when possible.

- **Error Checking:** Verify file existence before sourcing.

- **Scope:** Be aware of variable scope in sourced files.

- **Dependencies:** Document file dependencies clearly.

 

This tutorial covered the Tcl source command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).