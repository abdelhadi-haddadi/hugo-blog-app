+++
title = "Tcl catch Command"
date = 2025-08-29T20:12:52.393+01:00
draft = false
description = "Tcl catch command tutorial shows how to handle errors in Tcl. Learn catch with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl catch Command

last modified April 3, 2025

The Tcl catch command is used for error handling. It evaluates a
script and catches any exceptions that occur. This prevents errors from
terminating the program execution.

## Basic Definition

The catch command evaluates its argument as a Tcl script. It
returns 0 if the script executes successfully, or 1 if an error occurs.

Syntax: catch script ?resultVarName? ?optionsVarName?. The optional
arguments capture the error result and options dictionary.

## Basic Error Handling

This example shows the simplest usage of catch to handle errors.

basic_catch.tcl
  

set result [catch {expr {1 / 0}} error]
puts "Result: $result, Error: $error"

This attempts to divide by zero, which would normally cause an error. The
catch command prevents termination and stores the error message.

## Catching Specific Errors

We can examine the error code to handle specific types of errors differently.

catch_specific.tcl
  

set script {
    set x "hello"
    expr {$x + 10}
}
set code [catch $script result options]

if {$code == 1} {
    puts "Error occurred: $result"
    puts "Error code: [dict get $options -code]"
}

This catches a type error when trying to add a string to a number. The options
dictionary provides additional error information for more precise handling.

## Nested Catch Commands

catch commands can be nested to handle errors at different levels.

catch_nested.tcl
  

proc riskyOperation {x} {
    if {$x == 0} {
        error "Division by zero attempted"
    }
    return [expr {100 / $x}]
}

set result [catch {
    catch {riskyOperation 0} innerResult
} outerResult]

puts "Outer result: $outerResult"
puts "Inner result: $innerResult"

This shows nested error handling where an inner catch handles a
function's error, and an outer catch provides additional safety.

## Using Finally-like Behavior

Tcl doesn't have a finally clause, but we can simulate it with
catch.

catch_finally.tcl
  

set file [open "nonexistent.txt" r]
set code [catch {
    set content [read $file]
} result]

close $file
if {$code} {
    puts "Error reading file: $result"
} else {
    puts "File content: $content"
}

This demonstrates ensuring a file is closed whether an error occurs or not. The
cleanup code executes after the catch block regardless of outcome.

## Error Codes and Messages

The catch command can distinguish between different error types.

catch_codes.tcl
  

set code [catch {error "Custom error" "" 42} result options]

puts "Error code: $code"
puts "Error message: $result"
puts "Custom error code: [dict get $options -errorcode]"
puts "Error info: [dict get $options -errorinfo]"

This shows how to create and catch custom errors with specific codes. The
options dictionary contains detailed error information for debugging.

## Advanced Error Handling

Combine catch with other commands for robust error handling.

catch_advanced.tcl
  

proc safeDivide {a b} {
    if {![string is integer $a] || ![string is integer $b]} {
        error "Non-integer arguments" "" 1
    }
    if {$b == 0} {
        error "Division by zero" "" 2
    }
    return [expr {$a / $b}]
}

set code [catch {safeDivide 10 0} result options]

switch [dict get $options -errorcode] {
    1 { puts "Type error: $result" }
    2 { puts "Math error: $result" }
    default { puts "Unknown error: $result" }
}

This demonstrates a comprehensive error handling strategy with custom error
codes. Different error types are handled differently based on the error code.

## Best Practices

- **Specificity:** Catch only what you can handle meaningfully.

- **Logging:** Always log unexpected errors for debugging.

- **Recovery:** Provide recovery paths where possible.

- **Cleanup:** Ensure resources are released after errors.

- **Testing:** Test error cases as thoroughly as success cases.

 

This tutorial covered the Tcl catch command with practical
examples showing its usage in different error handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).