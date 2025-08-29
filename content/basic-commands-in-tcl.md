+++
title = "Basic commands in Tcl"
date = 2025-08-29T20:03:14.805+01:00
draft = false
description = "This chapter of the Tcl tutorial describes the basic Tcl commands, including puts, open, gets, flush, incr, info, set, and unset command."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../lexis/)
[Next](../expressions/)

# Basic commands in Tcl

last modified October 18, 2023

In this part of the Tcl tutorial, we cover some basic Tcl commands.

The covered Tcl commands include the puts, open, gets, 
flush, incr, info, set, and unset
commands.

## The puts command

In the first example, we mention the puts command. 
The puts command is used to print messages to the console or to other
channels like a file. The command has the following syntax:

puts ?-nonewline? ?channelId? string

The puts is the command name. Optional parameters are 
specified between question marks. 
 The -nonewline switch
suppresses the newline character. By default, the command puts a newline
to each message. The channelId must be an identifier for an open channel 
such as the Tcl standard input channel stdin, the return 
value from an invocation of open or socket. It defaults 
to standard output channel stdout if not specified. 
Finally, the string is the message to be printed. 

#!/usr/bin/tclsh

puts "This is Tcl tutorial"
puts stdout "This is Tcl tutorial"

The puts command prints a message to the console. 
Both command invocations do the same thing.

## The open command

The open command opens a file, a serial port, or a command pipeline 
and returns a channel identifier. In the following example, we use the 
command to open a file.

#!/usr/bin/tclsh

puts [open messages w] "This is Tcl tutorial"

The puts command is used to write to a file, opened
for writing with the open command. 

$ cat messages 
This is Tcl tutorial

We show the contents of the messages file created by the above
Tcl script. 

## The gets and flush commands

The gets command reads a line from a channel, and the 
flush command flushes buffered output of a channel.
In the following example we create a script that greets the user.

#!/usr/bin/tclsh

puts -nonewline "What is your name? "
flush stdout
gets stdin name
puts "Hello $name"

In this example, we request an input from the user and 
print the input in a custom greeting.

puts -nonewline "What is your name? "

The -nonewline option suppresses the newline. The prompt
remains on the same line. 

flush stdout

The output is buffered. To see the output immediately after the command
runs, we can use the flush command. The stdout
is the standard output. In our case it is a terminal; it is called a channel id
in Tcl.

gets stdin name

The gets command reads a line from the standard input. The
result is stored in the name variable. 

puts "Hello $name"

Finally, we greet the user. 

$ ./name.tcl 
What is your name? Jan
Hello Jan

Running the example.

## The incr command

The incr increments the value of a variable. 
It has the following syntax:

incr varName ?increment?

If a parameter is passed to the command, then its value is added to the value 
of the variable; otherwise the value is incremented by 1.

#!/usr/bin/tclsh

# incr_cmd.tcl

set x 5

incr x  
puts $x

incr x 4
puts $x

The code example set a variable and increments it twice.

set x 5

Value 5 is set to the x variable.

incr x  
puts $x

The x variable is incremented by 1. Number 6 is printed to 
the console.

incr x 4
puts $x

Number 4 is added to the x variable. The puts command
prints 10 to the console.

$ ./incr_cmd.tcl 
6
10

## The info command

The info command returns information about the state
of the Tcl interpreter. 

#!/usr/bin/tclsh

puts [info tclversion]
puts [info host]
puts [info exists var]

The info command has several options. We show three of them.

puts [info tclversion]

Here we print the version of the Tcl interpreter.

puts [info host]

This line prints the host name. 

puts [info exists var]

Finally we check if the variable var is set.

## The set and unset commands

The set command is used to create and read variables.
The unset command destroys a variable.

#!/usr/bin/tclsh

set x 23
puts $x
puts [set x]

unset x
puts [info exists x]

An example showing the set and unset commands. 

set x 23

We create an x variable and assign a value 23 to it. 

puts $x

We print the value of the x variable. 

puts [set x]

This line also prints the value of the x variable. 
The set command with one parameter reads the value
of the variable. The value is passed to the puts
command and is printed to the terminal.

unset x

The variable x is destroyed. 

puts [info exists x]

We verify the existence of the variable using the info exists
command.

## Command line arguments

Tcl scripts like any other scripts can take command line arguments. 
Tcl has three predefined variables. 

  - $argc - the number of arguments passed to the script

  - $argv - the list of arguments

  - $argv0 - the name of the script

#!/usr/bin/tclsh

puts "The script has $argc arguments"
puts "The list of arguments: $argv"
puts "The name of the script is $argv0"

We use all the predefined variables in this script.

$ ./args.tcl 1 2 3 
The script has 3 arguments
The list of arguments: 1 2 3
The name of the script is ./args.tcl

Running the example.

This chapter covered some basics of the Tcl language.

[Contents](..)  
[Previous](../lexis/)
[Next](../expressions/)