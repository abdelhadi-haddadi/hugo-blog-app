+++
title = "Tcl global Command"
date = 2025-08-29T20:13:01.299+01:00
draft = false
description = "Tcl global command tutorial shows how to use global variables in Tcl. Learn global with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl global Command

last modified April 3, 2025

The Tcl global command makes global variables visible inside
procedures. It's essential for accessing variables defined outside a
procedure's scope. Without it, procedures can't modify global state.

## Basic Definition

The global command links one or more global variables to the
current scope. It must be called before using the variables in a procedure.

Syntax: global varName ?varName ...?. It takes one or more variable
names as arguments. These variables must exist in the global namespace.

## Simple Global Variable Access

This example shows basic usage of global to access a variable
inside a procedure.

basic_global.tcl
  

set counter 0

proc increment {} {
    global counter
    incr counter
    puts "Counter is now $counter"
}

increment
increment

Here we declare counter as global inside the increment
procedure. This allows the procedure to modify the global variable. Each call
increments the counter.

## Multiple Global Variables

The global command can declare multiple variables at once.

multi_global.tcl
  

set width 10
set height 5
set unit "cm"

proc show_dimensions {} {
    global width height unit
    puts "Dimensions: ${width}x${height} $unit"
}

show_dimensions

This example demonstrates accessing three global variables in one procedure.
The global command makes all three variables available. The
procedure then displays the formatted dimensions.

## Global vs Local Variables

This example contrasts global and local variables with the same name.

global_local.tcl
  

set x 100

proc test {} {
    set x 50
    puts "Local x: $x"
    global x
    puts "Global x: $x"
}

test
puts "Outside x: $x"

The procedure first creates a local x, then accesses the global
one. Without the global command, the procedure would only see
its local variable. The global x remains unchanged.

## Modifying Global Arrays

Global arrays require special handling with the global command.

global_array.tcl
  

array set user {name John age 30}

proc update_user {new_age} {
    global user
    set user(age) $new_age
}

puts "Before: $user(name), $user(age)"
update_user 35
puts "After: $user(name), $user(age)"

This shows how to modify a global array inside a procedure. The entire array
is made accessible with global user. The procedure then updates
just the age element while preserving other elements.

## Nested Procedures with Global

Global variables remain accessible in nested procedure calls when declared.

nested_global.tcl
  

set total 0

proc outer {} {
    global total
    set total 10
    inner
}

proc inner {} {
    global total
    incr total 5
    puts "Total is $total"
}

outer

Both outer and inner procedures access the same
global variable. The global declaration is needed in each
procedure that uses the variable. Changes in either procedure affect the
same global state.

## Global in Namespaces

The global command works with variables in the global namespace.

namespace_global.tcl
  

namespace eval myns {
    variable secret "hidden"
}

set public "visible"

proc check_access {} {
    global public
    puts "Public: $public"
    # Can't access myns::secret here without qualification
}

check_access

This demonstrates that global only accesses the true global
namespace. Namespace variables require their qualified names. The procedure
can access public but not myns::secret with just
global.

## Best Practices

- **Minimize Use:** Limit global variables to essential cases.

- **Declare Early:** Put global at procedure start.

- **Unique Names:** Avoid shadowing with local variables.

- **Document:** Comment global variable usage clearly.

- **Namespaces:** Consider namespaces for organization.

 

This tutorial covered the Tcl global command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).