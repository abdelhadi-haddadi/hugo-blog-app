+++
title = "Tcl info Command"
date = 2025-08-29T20:13:03.533+01:00
draft = false
description = "Tcl info command tutorial shows how to get information about the Tcl interpreter state. Learn info with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl info Command

last modified April 3, 2025

The Tcl info command provides introspection capabilities about the
Tcl interpreter state. It can query information about variables, procedures,
commands, and the execution environment.

## Basic Definition

The info command is a built-in Tcl command that returns information
about various interpreter components. It has multiple subcommands for different
types of information.

Syntax: info subcommand ?arg ...?. The behavior depends on the
subcommand used. It can query variables, procedures, commands, and more.

## Checking Command Existence

The info commands subcommand lists all available commands or checks
if a specific command exists.

info_commands.tcl
  

# Check if 'puts' command exists
if {[info commands puts] eq "puts"} {
    puts "The puts command is available"
}

# List all commands matching a pattern
set tcl_commands [info commands tcl*]
puts "Tcl commands starting with 'tcl': $tcl_commands"

This example first checks if the puts command exists. Then it lists
all commands starting with 'tcl'. The info commands subcommand is
useful for dynamic command checking.

## Getting Variable Information

The info exists subcommand checks if a variable exists in the
current scope.

info_exists.tcl
  

set name "John"

if {[info exists name]} {
    puts "Variable 'name' exists with value: $name"
} else {
    puts "Variable 'name' doesn't exist"
}

# Check for non-existent variable
if {![info exists age]} {
    puts "Variable 'age' doesn't exist"
}

This demonstrates checking variable existence before using it. The info exists
command returns 1 if the variable exists, 0 otherwise. It's safer than directly
accessing variables.

## Procedure Information

The info procs subcommand lists procedures and info body
returns a procedure's implementation.

info_procs.tcl
  

proc greet {name} {
    return "Hello, $name"
}

# List all procedures
set all_procs [info procs]
puts "All procedures: $all_procs"

# Get procedure body
set greet_body [info body greet]
puts "Greet procedure body: $greet_body"

This shows how to list all procedures and examine a procedure's body. The
info procs command is useful for debugging and dynamic programming.

## Script Information

The info script subcommand returns the name of the currently executing
script file.

info_script.tcl
  

puts "This script is: [info script]"

proc show_script {} {
    puts "Called from script: [info script]"
}

show_script

This demonstrates getting the script filename in both the main script and a
procedure. info script returns an empty string if not executing
from a file.

## Execution Level Information

The info level subcommand returns information about the call stack.

info_level.tcl
  

proc outer {} {
    puts "Outer level: [info level]"
    inner
}

proc inner {} {
    puts "Inner level: [info level]"
    puts "Caller is: [info level -1]"
}

outer

This shows the nesting level of procedure calls. info level returns
the current depth, while info level -1 returns the caller's command.

## Tcl Version Information

The info tclversion subcommand returns the Tcl interpreter version.

info_tclversion.tcl
  

puts "Running Tcl version: [info tclversion]"

if {[package vcompare [info tclversion] 8.6] &gt;= 0} {
    puts "This is Tcl 8.6 or newer"
} else {
    puts "This is older than Tcl 8.6"
}

This checks the Tcl version and performs version comparison. The info tclversion
command is useful for writing version-dependent code.

## Best Practices

- **Error Handling:** Use info exists before variable access.

- **Dynamic Programming:** Use info commands for plugin systems.

- **Debugging:** Use info level for call stack inspection.

- **Portability:** Check tclversion for compatibility.

- **Introspection:** Use info body for metaprogramming.

 

This tutorial covered the Tcl info command with practical
examples showing its various subcommands and uses.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).