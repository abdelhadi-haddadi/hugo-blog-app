+++
title = "Tcl variable Command"
date = 2025-08-29T20:13:18.127+01:00
draft = false
description = "Tcl variable command tutorial shows how to declare variables in Tcl. Learn variable with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl variable Command

last modified April 3, 2025

The Tcl variable command declares variables in namespaces and
procedures. It ensures variables exist in the current scope before use.
This prevents potential issues with variable resolution.

## Basic Definition

The variable command creates one or more variables in the current
namespace. It's particularly important for procedures that need to access
global or namespace variables.

Syntax: variable ?name value?.... It can declare multiple variables
at once. Without a value, it just declares the variable's existence.

## Basic Variable Declaration

This shows the simplest usage of variable to declare a variable.

basic_variable.tcl
  

variable name "John Doe"
puts $name

This declares a variable name with the value "John Doe". The
puts command then prints the variable's value. This is similar
to set but with namespace awareness.

## Global Variable Access

The variable command is essential for accessing global variables
inside procedures.

variable_global.tcl
  

set ::counter 0

proc increment {} {
    variable ::counter
    incr ::counter
}

increment
puts $::counter

Here we declare a global variable ::counter and access it inside
the increment procedure using variable. This ensures
proper variable resolution.

## Namespace Variables

variable is crucial for working with namespace variables.

variable_namespace.tcl
  

namespace eval math {
    variable PI 3.14159
    
    proc area {radius} {
        variable PI
        expr {$PI * $radius * $radius}
    }
}

puts [math::area 5]

This creates a namespace math with a constant PI.
The area procedure accesses PI using variable.
This maintains proper namespace encapsulation.

## Multiple Variable Declaration

variable can declare multiple variables in one command.

variable_multiple.tcl
  

namespace eval config {
    variable width 800 height 600 title "App"
    
    proc show {} {
        variable width height title
        puts "Config: $width x $height, $title"
    }
}

config::show

This declares three variables in the config namespace at once.
The show procedure accesses them using a single variable
command. This is more efficient than separate declarations.

## Variable Without Initialization

variable can declare a variable without assigning a value.

variable_declare.tcl
  

proc process {} {
    variable result
    set result "Operation completed"
    return $result
}

puts [process]

Here we declare result without initialization inside a procedure.
The variable is later assigned a value with set. This pattern is
useful for procedure-local variables.

## Combining with upvar

variable can be combined with upvar for advanced
variable handling.

variable_upvar.tcl
  

namespace eval outer {
    variable data "Important information"
    
    proc access {} {
        variable data
        upvar 1 data localdata
        puts "Accessed: $localdata"
    }
}

outer::access

This demonstrates combining variable with upvar to
create an alias to a namespace variable. The access procedure
can work with the variable through a local name.

## Best Practices

- **Namespace use:** Always use variable for namespace variables.

- **Global access:** Prefer variable over global for globals.

- **Early declaration:** Declare variables at procedure start.

- **Explicit names:** Use fully qualified names when needed.

- **Documentation:** Comment namespace variables for clarity.

 

This tutorial covered the Tcl variable command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).