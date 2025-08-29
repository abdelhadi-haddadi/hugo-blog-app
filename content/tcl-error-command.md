+++
title = "Tcl error Command"
date = 2025-08-29T20:12:56.807+01:00
draft = false
description = "Tcl error command tutorial shows how to handle errors in Tcl. Learn error with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl error Command

last modified April 3, 2025

The Tcl error command is used to generate errors and exceptions. 
It allows scripts to signal error conditions with custom messages. Proper
error handling makes scripts more robust and maintainable.

## Basic Definition

The error command raises an error with a specified message. It
terminates script execution unless caught by a catch command.

Syntax: error message ?info? ?code?. The message is required while
info and code are optional. The info provides stack trace details.

## Basic Error Generation

This example shows the simplest usage of error to raise an error.

basic_error.tcl
  

error "This is a basic error message"

When executed, this script will terminate and display the error message. No
further commands will execute after the error is raised.

## Catching Errors

The catch command can trap errors raised by error.

catch_error.tcl
  

if {[catch {error "Division by zero"} msg]} {
    puts "Caught error: $msg"
}

Here we use catch to prevent script termination. The error message
is stored in msg and printed instead of terminating execution.

## Error with Stack Trace

The optional info parameter can provide stack trace information for debugging.

error_stack.tcl
  

proc divide {a b} {
    if {$b == 0} {
        error "Division by zero" "Attempted division of $a by $b"
    }
    return [expr {$a / $b}]
}

catch {divide 10 0} msg opts
puts $msg
puts [dict get $opts -errorinfo]

This shows a division function that raises an error with stack info. The
catch captures both the message and full error information.

## Custom Error Codes

Error codes help categorize errors programmatically for better handling.

error_code.tcl
  

proc validate_age {age} {
    if {$age &lt; 0} {
        error "Invalid age" "" NEGATIVE_AGE
    } elseif {$age &gt; 120} {
        error "Invalid age" "" TOO_OLD
    }
    return $age
}

catch {validate_age -5} msg opts
puts "Error code: [dict get $opts -errorcode]"

This validation function uses custom error codes. The calling code can check
the error code to determine the specific validation failure.

## Nested Error Handling

Errors can be caught and re-raised with additional context when needed.

nested_error.tcl
  

proc process_data {data} {
    if {$data eq ""} {
        error "Empty data received"
    }
    # Process data here
}

proc main {} {
    set input ""
    if {[catch {process_data $input} msg]} {
        error "Processing failed: $msg" $::errorInfo
    }
}

catch {main} msg
puts $msg

This shows nested error handling where a low-level error is caught and
re-raised with additional context. The original error info is preserved.

## Error in Procedures

Procedures can use error to validate inputs and report problems.

proc_error.tcl
  

proc calculate_area {width height} {
    if {$width &lt;= 0 || $height &lt;= 0} {
        error "Dimensions must be positive"
    }
    return [expr {$width * $height}]
}

if {[catch {calculate_area 0 10} msg]} {
    puts "Calculation error: $msg"
} else {
    puts "Area: $msg"
}

This procedure validates its inputs before calculation. Invalid dimensions
trigger an error that can be caught by the calling code.

## Best Practices

- **Messages:** Provide clear, descriptive error messages.

- **Catch:** Always catch errors at appropriate levels.

- **Codes:** Use error codes for programmatic handling.

- **Info:** Include stack info for debugging complex errors.

- **Validation:** Validate inputs early and fail fast.

 

This tutorial covered the Tcl error command with practical
examples showing its usage in different error handling scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).