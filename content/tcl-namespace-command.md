+++
title = "Tcl namespace Command"
date = 2025-08-29T20:13:07.974+01:00
draft = false
description = "Tcl namespace command tutorial shows how to use namespaces in Tcl. Learn namespaces with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl namespace Command

last modified April 3, 2025

The Tcl namespace command provides encapsulation and organization
for variables and procedures. It helps prevent naming conflicts in large
applications. Namespaces create separate scopes for related code.

## Basic Definition

A namespace is a container for commands and variables that creates a separate
naming context. It helps organize code and avoid name collisions between
different components.

Syntax: namespace eval name ?arg...? script. This evaluates the
script in the specified namespace context. Names can be hierarchical using ::.

## Creating a Simple Namespace

This example demonstrates creating a basic namespace and adding a variable.

basic_namespace.tcl
  

namespace eval math {
    variable PI 3.14159
}

puts $math::PI

We create a math namespace containing a PI variable.
The variable is accessed using the namespace qualifier ::.

## Namespace with Procedures

Namespaces can contain procedures that are only visible within that namespace.

namespace_proc.tcl
  

namespace eval geometry {
    proc area {radius} {
        variable PI 3.14159
        return [expr {$PI * $radius * $radius}]
    }
}

puts [geometry::area 5]

This creates a geometry namespace with an area
procedure. The procedure uses a namespace variable to calculate circle area.

## Nested Namespaces

Namespaces can be nested to create hierarchical organization structures.

nested_namespace.tcl
  

namespace eval company {
    namespace eval department {
        variable employees 25
    }
}

puts $company::department::employees

This creates a nested namespace structure. The employees variable
is accessed through the full namespace path using :: separators.

## Exporting Commands

Namespace commands can be exported to make them available without qualifiers.

namespace_export.tcl
  

namespace eval utils {
    namespace export greet
    proc greet {name} {
        return "Hello, $name!"
    }
}

namespace import utils::greet
puts [greet "John"]

The greet procedure is exported from the utils
namespace and then imported into the global namespace. This allows calling
it without the namespace qualifier.

## Namespace Variables

Variables in namespaces have different scoping rules than global variables.

namespace_vars.tcl
  

namespace eval counter {
    variable count 0
    
    proc increment {} {
        variable count
        incr count
    }
    
    proc get {} {
        variable count
        return $count
    }
}

counter::increment
counter::increment
puts [counter::get]

This implements a simple counter using namespace variables. The count
variable is only accessible within the counter namespace.

## Namespace Current

The namespace current command returns the fully-qualified name of
the current namespace.

namespace_current.tcl
  

namespace eval outer {
    namespace eval inner {
        puts [namespace current]
    }
}

This demonstrates how namespace current returns the full path of
the current namespace context. The output will be ::outer::inner.

## Best Practices

- **Organization:** Use namespaces to group related functionality.

- **Naming:** Choose clear, descriptive namespace names.

- **Exporting:** Only export commands that need global access.

- **Variables:** Declare namespace variables with variable.

- **Hierarchy:** Use nested namespaces for complex systems.

 

This tutorial covered the Tcl namespace command with practical
examples showing its usage for code organization and encapsulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).