+++
title = "Tcl try Command"
date = 2025-08-29T20:13:17.052+01:00
draft = false
description = "Tcl try command tutorial shows how to handle exceptions in Tcl. Learn try with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl try Command

last modified April 3, 2025

The Tcl try command provides structured exception handling. It was
introduced in Tcl 8.6 as a more powerful alternative to the catch
command. The try command allows for cleaner error handling code.

## Basic Definition

The try command evaluates a script and handles any exceptions that
occur. It consists of a body script to execute and optional handlers for
different outcomes.

Syntax: try body ?handler...? ?finally script?. The body is the
main code to execute. Handlers catch specific exceptions. The finally clause
always executes.

## Basic try-catch Example

This shows the simplest usage of try with a catch
handler to trap any error.

basic_try.tcl
  

try {
    set result [expr {1 / 0}]
    puts "Result: $result"
} trap {ARITH DIVZERO} {msg opts} {
    puts "Division by zero error: $msg"
}

This attempts a division by zero which raises an ARITH(DIVZERO) error. The
trap handler catches this specific error and prints a message.
Without the handler, the error would terminate the script.

## Multiple Exception Handlers

The try command can have multiple handlers for different exception
types.

multiple_handlers.tcl
  

try {
    set file [open "nonexistent.txt" r]
    set content [read $file]
    close $file
} trap {POSIX ENOENT} {msg opts} {
    puts "File not found error: $msg"
} trap {POSIX EACCES} {msg opts} {
    puts "Permission denied error: $msg"
} on ok {} {
    puts "File read successfully"
}

This attempts to open a non-existent file. The first handler catches the
"file not found" error. The second would catch permission issues. The
on ok handler runs if no exceptions occur.

## Finally Clause

The finally clause executes regardless of whether an exception
occurred. It's useful for cleanup operations.

try_finally.tcl
  

set file [open "test.txt" w]
try {
    puts $file "Some data"
    # Simulate an error
    error "Simulated error"
} trap {} {msg opts} {
    puts "Caught error: $msg"
} finally {
    close $file
    puts "File closed in finally block"
}

This demonstrates resource cleanup in a finally block. Even though
an error occurs, the file is properly closed. The finally block
executes after any handlers.

## Catching All Exceptions

The trap handler with an empty pattern catches all exceptions not
handled by more specific handlers.

catch_all.tcl
  

try {
    set x [expr {[gets stdin] + 10}]
    puts "Result: $x"
} trap {ARITH DOMAIN} {msg opts} {
    puts "Math domain error: $msg"
} trap {} {msg opts} {
    puts "General error caught: $msg"
}

This catches both math domain errors and any other exceptions. If the user
enters non-numeric input, the general handler catches the resulting error.
The empty pattern matches any unhandled exception.

## Nested try Commands

try commands can be nested to handle exceptions at different
levels of a program.

nested_try.tcl
  

proc riskyOperation {x} {
    try {
        return [expr {100 / $x}]
    } trap {ARITH DIVZERO} {msg opts} {
        error "Division by zero in riskyOperation"
    }
}

try {
    set result [riskyOperation 0]
    puts "Result: $result"
} trap {} {msg opts} {
    puts "Caught error from riskyOperation: $msg"
}

This shows nested exception handling. The inner try handles the
division by zero and rethrows a more specific error. The outer try
catches this rethrown error.

## Returning Values from try

The try command can return values from either the body or a
handler.

return_values.tcl
  

proc safeDivide {a b} {
    try {
        return [expr {$a / $b}]
    } trap {ARITH DIVZERO} {msg opts} {
        return "Error: division by zero"
    }
}

puts [safeDivide 10 2]
puts [safeDivide 5 0]

This function returns either the division result or an error message. The
try command's return value comes from whichever block executes
last. This pattern is useful for creating robust functions.

## Best Practices

- **Specificity:** Catch specific exceptions before general ones.

- **Cleanup:** Use finally for resource cleanup.

- **Rethrowing:** Consider rethrowing with more context.

- **Logging:** Log exceptions for debugging purposes.

- **Minimal try:** Keep try blocks focused on risky operations.

 

This tutorial covered the Tcl try command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).