+++
title = "Tcl rename Command"
date = 2025-08-29T20:13:12.548+01:00
draft = false
description = "Tcl rename command tutorial shows how to rename commands in Tcl. Learn rename with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl rename Command

last modified April 3, 2025

The Tcl rename command is used to change the name of existing
commands. It's a powerful feature for command aliasing and modification.
The command can also be used to delete commands when renaming to an empty string.

## Basic Definition

The rename command changes the name under which a command is
invoked. It can create command aliases or completely remove commands.

Syntax: rename oldName newName. If newName is an empty string,
the command deletes oldName. Both names must be valid Tcl command names.

## Basic Command Renaming

This shows the simplest usage of rename to create a command alias.

basic_rename.tcl
  

proc hello {} {
    puts "Hello, World!"
}

rename hello greet
greet

This renames the hello command to greet. After
renaming, calling hello would raise an error, while greet
works as the original command.

## Deleting Commands

The rename command can delete commands by specifying an empty
string as the new name.

rename_delete.tcl
  

proc temp {} {
    puts "This is a temporary command"
}

temp
rename temp ""
# temp ; # This would now raise an error

Here we create a temporary command and then delete it using rename.
After deletion, attempting to call the command would result in an error.

## Command Aliasing

rename is often used to create alternative names for commands.

rename_alias.tcl
  

proc calculate {x y} {
    return [expr {$x + $y}]
}

rename calculate add
puts [add 5 7]

This creates an alias add for the calculate command.
Both names would refer to the same implementation until one is renamed again.

## Command Wrapping

rename is essential for command wrapping patterns where you want
to modify command behavior.

rename_wrap.tcl
  

proc original {x} {
    return [expr {$x * 2}]
}

rename original original_impl
proc original {x} {
    puts "Calling original with $x"
    set result [original_impl $x]
    puts "Result is $result"
    return $result
}

original 10

This demonstrates command wrapping. We first rename the original command,
then create a new command with the original name that adds logging
functionality while delegating to the original implementation.

## Namespace Management

rename can be used to move commands between namespaces.

rename_namespace.tcl
  

namespace eval ns1 {
    proc func {} {
        puts "Function in ns1"
    }
}

rename ns1::func ns2::func
ns2::func
# ns1::func ; # This would now raise an error

This moves a command from one namespace to another. The command is no longer
available in the original namespace after the rename operation.

## Command Hiding

rename can be used to temporarily hide built-in commands.

rename_hide.tcl
  

rename puts original_puts
proc puts {args} {
    if {[llength $args] == 1} {
        original_puts "Modified: [lindex $args 0]"
    } else {
        eval original_puts $args
    }
}

puts "Hello"
rename puts ""
rename original_puts puts
puts "Back to normal"

This example temporarily replaces the built-in puts command with
a modified version, then restores the original. This pattern is useful for
debugging or adding functionality to built-in commands.

## Best Practices

- **Documentation:** Always document when renaming commands.

- **Restoration:** Plan how to restore original commands.

- **Namespaces:** Use namespaces to avoid naming conflicts.

- **Testing:** Thoroughly test after renaming commands.

- **Safety:** Be cautious when renaming built-in commands.

 

This tutorial covered the Tcl rename command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).