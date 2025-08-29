+++
title = "Tcl interp Command"
date = 2025-08-29T20:13:03.527+01:00
draft = false
description = "Tcl interp command tutorial shows how to manage interpreters in Tcl. Learn interp with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl interp Command

last modified April 3, 2025

The Tcl interp command creates and manages multiple Tcl interpreters.
It allows safe execution of scripts in isolated environments. This is useful for
sandboxing untrusted code.

## Basic Definition

The interp command creates slave interpreters that run independently
from the master. Slaves can have restricted access to commands and variables.

Syntax: interp subcommand ?arg ...?. Common subcommands include
create, eval, alias, and delete.

## Creating a Slave Interpreter

This example demonstrates how to create a basic slave interpreter.

basic_interp.tcl
  

set slave [interp create]
interp eval $slave {set x 10}
puts [interp eval $slave {set x}]
interp delete $slave

We create a slave interpreter, evaluate a script in it to set a variable,
retrieve the variable's value, then delete the interpreter. Each interpreter
maintains its own variable namespace.

## Safe Interpreter

This creates a safe interpreter with restricted command access.

safe_interp.tcl
  

set safe_slave [interp create -safe]
interp eval $safe_slave {puts "Hello from safe interpreter"}
catch {interp eval $safe_slave {exec rm important_file}} msg
puts "Attempt to exec in safe interpreter: $msg"
interp delete $safe_slave

The -safe flag creates an interpreter with dangerous commands
removed. The exec command fails as expected in the safe interpreter.

## Alias Command

This shows how to create an alias between interpreters.

interp_alias.tcl
  

set slave [interp create]
interp alias $slave puts {} puts -nonewline
interp eval $slave {puts "Hello "}
interp eval $slave {puts "World"}
puts "" ;# newline
interp delete $slave

We create an alias in the slave that modifies the puts command
behavior. The slave's puts now uses -nonewline by
default. This demonstrates command customization.

## Transferring Variables

This example shows how to transfer variables between interpreters.

interp_transfer.tcl
  

set slave [interp create]
set master_var "Data from master"
interp eval $slave [list set slave_var $master_var]
puts [interp eval $slave {set slave_var}]
interp delete $slave

We use list to properly format the variable transfer command.
This ensures proper handling of special characters in the variable value.
The slave receives an exact copy of the master's variable.

## Hidden Commands

This demonstrates creating hidden commands in a slave interpreter.

interp_hidden.tcl
  

set slave [interp create]
interp hide $slave puts
interp eval $slave {puts "This will fail"}
interp expose $slave puts
interp eval $slave {puts "Now it works"}
interp delete $slave

We hide the puts command in the slave, making it temporarily
unavailable. After exposing it again, the command works normally. This shows
fine-grained command control.

## Multiple Slaves

This example creates and manages multiple slave interpreters.

interp_multi.tcl
  

set slaves {}
foreach name {alpha beta gamma} {
    set slave [interp create $name]
    interp eval $slave "set interpreter_name $name"
    lappend slaves $slave
}

foreach slave $slaves {
    puts "$slave: [interp eval $slave {set interpreter_name}]"
    interp delete $slave
}

We create three named interpreters, each with its own variable space.
The interpreters are stored in a list and processed in sequence. This
demonstrates managing multiple independent execution environments.

## Best Practices

- **Isolation:** Use separate interpreters for untrusted code.

- **Cleanup:** Always delete interpreters when done.

- **Safety:** Use -safe flag for maximum security.

- **Aliases:** Create controlled interfaces with aliases.

- **Resources:** Monitor memory usage with many interpreters.

 

This tutorial covered the Tcl interp command with practical
examples showing interpreter creation, management, and security features.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).