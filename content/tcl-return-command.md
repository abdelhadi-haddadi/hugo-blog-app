+++
title = "Tcl return Command"
date = 2025-08-29T20:13:12.539+01:00
draft = false
description = "Tcl return command tutorial shows how to return values from procedures in Tcl. Learn return with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl return Command

last modified April 3, 2025

The Tcl return command is used to return values from procedures.
It terminates procedure execution and optionally returns a result. The command
is fundamental for creating reusable code components.

## Basic Definition

The return command exits from the current procedure and optionally
returns a value to the caller. Without arguments, it returns an empty string.

Syntax: return ?result?. The optional result specifies
the value to return. Without it, the command returns an empty string.

## Simple Return Value

This example shows the basic usage of return to send a value back
from a procedure.

simple_return.tcl
  

proc greet {} {
    return "Hello, Tcl!"
}

set message [greet]
puts $message

The greet procedure returns a string which is then stored in the
message variable. The puts command displays it.

## Returning Multiple Values

Tcl procedures can return multiple values as a list using the return
command.

return_multiple.tcl
  

proc get_coordinates {} {
    return [list 10 20 30]
}

lassign [get_coordinates] x y z
puts "X: $x, Y: $y, Z: $z"

This procedure returns three values as a list. The lassign command
then assigns them to individual variables. This demonstrates structured returns.

## Conditional Return

The return command can be used conditionally to exit a procedure
early based on some condition.

conditional_return.tcl
  

proc is_even num {
    if {$num % 2 == 0} {
        return true
    }
    return false
}

puts [is_even 4]
puts [is_even 5]

This procedure checks if a number is even. It returns immediately when the
condition is met, demonstrating early exit. The final return
handles the false case.

## Returning Error Codes

The return command can specify a return code to indicate success
or failure of a procedure.

return_code.tcl
  

proc divide {a b} {
    if {$b == 0} {
        return -code error "Division by zero"
    }
    return [expr {$a / $b}]
}

catch {divide 10 0} result
puts $result

This shows how to return error conditions from procedures. The -code error
option makes the procedure return an error, which is caught by the catch
command.

## Returning From Nested Procedures

The return command only exits from the current procedure level.
Additional options control its behavior in nested calls.

nested_return.tcl
  

proc outer {} {
    proc inner {} {
        return -level 2 "Returning from outer"
    }
    inner
    return "This won't execute"
}

puts [outer]

This demonstrates using -level to make return exit
from an outer procedure. The -level 2 makes it skip two call levels.

## Returning With Options

The return command supports several options that modify its behavior
for advanced control flow.

return_options.tcl
  

proc test_return {} {
    return -code break -level 0 "Breaking out"
}

catch {
    while true {
        test_return
        puts "This won't execute"
    }
} result
puts $result

This shows using -code break to make return act like
the break command. The -level 0 keeps it affecting
the current call level only.

## Best Practices

- **Clarity:** Use return values that clearly indicate their purpose.

- **Consistency:** Maintain consistent return types across related procedures.

- **Documentation:** Document return values in procedure comments.

- **Error Handling:** Use proper error codes for failure conditions.

- **Early Returns:** Consider early returns for simple conditions.

 

This tutorial covered the Tcl return command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).