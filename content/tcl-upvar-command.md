+++
title = "Tcl upvar Command"
date = 2025-08-29T20:13:18.132+01:00
draft = false
description = "Tcl upvar command tutorial shows how to create variable references in Tcl. Learn upvar with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl upvar Command

last modified April 3, 2025

The Tcl upvar command creates a link to a variable in a different
scope. It allows procedures to modify variables in their caller's scope.
This is essential for implementing pass-by-reference semantics in Tcl.

## Basic Definition

The upvar command creates a reference to a variable from a higher
stack frame. It enables procedures to modify variables in their caller's scope.

Syntax: upvar ?level? otherVar myVar ?otherVar myVar ...?. The level
specifies how many frames up to look for the variable. Default is 1 (caller).

## Simple Variable Reference

This example shows basic usage of upvar to modify a variable in the
caller's scope.

basic_upvar.tcl
  

proc increment {varName} {
    upvar $varName var
    incr var
}

set counter 0
increment counter
puts "Counter is now $counter"

The increment procedure uses upvar to create a local
reference to the caller's variable. The incr command modifies it.

## Modifying Array Elements

upvar can also be used to modify array elements in the caller's scope.

upvar_array.tcl
  

proc updateArray {arrName key} {
    upvar $arrName arr
    set arr($key) [expr {$arr($key) * 2}]
}

set numbers(one) 1
set numbers(two) 2
updateArray numbers one
puts "Array element: $numbers(one)"

This demonstrates how upvar can reference an entire array. The
procedure doubles the value of the specified array element.

## Multiple Level References

The level parameter allows accessing variables from higher stack frames.

upvar_level.tcl
  

proc outer {} {
    set x 10
    inner
    puts "Outer x: $x"
}

proc inner {} {
    upvar 2 x y
    set y 20
}

outer

Here, inner modifies a variable two frames up the call stack.
The upvar 2 command creates a reference to x in
outer's scope.

## Passing Variables by Reference

upvar enables pass-by-reference semantics in Tcl procedures.

upvar_reference.tcl
  

proc swap {a b} {
    upvar $a x $b y
    set tmp $x
    set x $y
    set y $tmp
}

set first "apple"
set second "orange"
swap first second
puts "First: $first, Second: $second"

This implements a classic swap operation using upvar. The procedure
swaps the values of two variables in the caller's scope.

## Default Level Behavior

When no level is specified, upvar defaults to level 1 (caller's scope).

upvar_default.tcl
  

proc modifyVar {varName} {
    upvar $varName localVar
    set localVar "modified"
}

set original "initial"
modifyVar original
puts "Variable is now: $original"

This shows the default behavior where upvar references the immediate
caller's scope. The procedure modifies the variable in its direct caller.

## Global Variables with upvar

upvar can access global variables by specifying level #0.

upvar_global.tcl
  

proc accessGlobal {} {
    upvar #0 ::globalVar localVar
    set localVar "global value"
}

set globalVar "initial"
accessGlobal
puts "Global variable: $globalVar"

This demonstrates accessing a global variable using upvar #0.
The procedure modifies the global variable through a local reference.

## Best Practices

- **Explicit Levels:** Specify levels clearly for readability.

- **Variable Names:** Use descriptive names for references.

- **Scope Awareness:** Be mindful of which scope you're modifying.

- **Global Variables:** Prefer parameters over global access.

- **Documentation:** Document reference parameters clearly.

 

This tutorial covered the Tcl upvar command with practical
examples showing its usage for variable references across scopes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).