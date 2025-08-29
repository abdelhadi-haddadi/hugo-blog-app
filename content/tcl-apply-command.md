+++
title = "Tcl apply Command"
date = 2025-08-29T20:12:50.163+01:00
draft = false
description = "Tcl apply command tutorial shows how to use anonymous functions in Tcl. Learn apply with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl apply Command

last modified April 3, 2025

The Tcl apply command creates and evaluates anonymous functions.
These are functions without names that can be created and used on the fly.

## Basic Definition

The apply command takes a list containing arguments and body of
a function, plus optional arguments to pass to the function. It then executes
the function immediately.

Syntax: apply {argList body ?namespace?} ?arg1 arg2 ...?. The
argList specifies parameters, body contains the function code, and namespace
is optional.

## Simple Anonymous Function

This example shows the most basic usage of apply to create and
execute a simple anonymous function.

basic_apply.tcl
  

set result [apply {{x y} {
    expr {$x + $y}
}} 5 3]

puts "The sum is $result"

Here we create an anonymous function that takes two arguments and returns
their sum. The function is immediately called with arguments 5 and 3.

## Using apply with map

The apply command is often used with higher-order functions
like lmap to transform lists.

apply_map.tcl
  

set numbers {1 2 3 4 5}
set squares [lmap x $numbers {
    apply {{n} {expr {$n * $n}}} $x
}]

puts "Squares: $squares"

This example squares each number in a list using lmap and an
anonymous function created with apply. The function takes one
argument and returns its square.

## Closures with apply

Anonymous functions can capture variables from their surrounding scope,
creating closures.

apply_closure.tcl
  

set multiplier 3
set times [apply {{x} {
    expr {$x * $::multiplier}
}}]

puts "5 times 3 is [$times 5]"

This creates a closure that captures the multiplier variable
from the surrounding scope. The anonymous function remembers this value
when called later.

## apply with Optional Arguments

Anonymous functions can handle optional arguments with default values.

apply_optional.tcl
  

set greet [apply {{name {greeting "Hello"}} {
    return "$greeting, $name!"
}}]

puts [$ greet "John"]
puts [$ greet "Jane" "Hi"]

This shows an anonymous function with an optional greeting
parameter. When not provided, it defaults to "Hello". The function is
called both with and without the optional argument.

## Recursive Anonymous Functions

Anonymous functions can be recursive by using the apply command
within their own body.

apply_recursive.tcl
  

set factorial [apply {{n} {
    if {$n &lt;= 1} {
        return 1
    } else {
        expr {$n * [apply $::factorial [expr {$n - 1}]]}
    }
}}]

puts "5! = [$factorial 5]"

This implements a recursive factorial function using apply. The
function calls itself by referencing the variable it's assigned to. Note the
use of :: to access the global namespace.

## apply with Namespace

The optional namespace argument allows control over where the anonymous
function executes.

apply_namespace.tcl
  

namespace eval myns {
    variable secret 42
}

set get_secret [apply {{} {
    variable secret
    return $secret
} ::myns]

puts "The secret is [$get_secret]"

This example creates an anonymous function that executes in a specific
namespace (::myns). The function can access variables from
that namespace, demonstrating how to control the execution context.

## Best Practices

- **Readability:** Keep anonymous functions short for clarity.

- **Scope:** Be mindful of variable scoping in closures.

- **Performance:** Avoid recreating functions in loops.

- **Documentation:** Comment complex anonymous functions.

- **Testing:** Test anonymous functions like regular ones.

 

This tutorial covered the Tcl apply command with practical
examples showing its usage for anonymous functions and closures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).