+++
title = "Tcl"
date = 2025-08-29T20:03:17.100+01:00
draft = false
description = "This chapter of the Tcl tutorial is a description of the Tcl language."
image = "images/logo.png"
imageBig = "images/logo.png"
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../lexis/)

# Tcl

last modified October 18, 2023

In this part of the Tcl tutorial, we introduce the 
Tcl programming language. 

## Goal

The goal of this tutorial is to get you started with the Tcl
programming language. The tutorial covers the core of the Tcl language, namely
variables, lists, arrays, control structures, and other core features. 
It is not a complete coverage of the language. It is a quick, introductory
material. The tutorial was created on Ubuntu Linux. 

## Tcl

 
![logo.png](images/logo.png)

 
*Tcl* is a string based scripting language. The source code is compiled into bytecode, which
is later interpreted by the Tcl interpreter. It was created by *John Osterhout* 
in 1988. The purpose was to create a language which is easily embeddable into 
applications. But it is often used outside its original area. The language  is commonly 
used for rapid prototyping, scripted applications, GUIs, and testing. 
The Tcl stands for tool command language, where the source code of a Tcl script consists of commands. 

 

 
Tcl is a procedural language. It has some functional features. OOP was added in Tcl verstion 8.6.

 
 
 
The official web site for both Tcl and its Tk GUI toolkit is [tcl.tk](http://tcl.tk/) 

 

## Popularity

There are hundreds of programming languages in use today. Tcl does
not belong to the most popular ones. It has its own niche where it
used. For instance, rapid prototyping, testing, and database interaction.                                                 

## Interactive interpreter

We can run Tcl commands in a script or in an interactive interpreter. 
In this tutorial, we use the interactive Tcl session to demonstrate 
some smaller code fragments. Larger code examples are to be put in
Tcl scripts. 

The *tclsh* is a shell-like application that reads Tcl commands from its
standard input or from a file and evaluates them. If invoked with  no
arguments then it runs interactively, reading Tcl commands from 
standard input and printing command results and error messages 
to standard output.

$ tclsh
% puts $tcl_version
8.6
% puts $tcl_interactive
1

This is an example of a Tcl interactive session.

$ tclsh

We start the interactive session with the tclsh command.

% puts $tcl_version
8.6

The prompt changes to the % character. We print the value of 
a special tcl_version variable to the console. It is set to the 
version of the current Tcl in use. 

% puts $tcl_interactive
1

The tcl_interactive variable tells us whether we are in an interactive
mode. 

% exit
$

We use the exit command to terminate the interactive session. 
It is possible to use the Ctrl+C key combination too.

## Tcl scripts

We have our first simple example of a Tcl script. It is a common practice for
Tcl programs to have the .tcl extension.

#!/usr/bin/tclsh

# first.tcl

puts "This is Tcl tutorial"

In this script, we print a message to the console. 

#!/usr/bin/tclsh

Every script in the UNIX starts with a *shebang*. The shebang is the first two 
characters in the script: #!. The shebang is followed by the path 
to the interpreter, which will execute our script. The /usr/bin/ is the
most common location for the Tcl shell. It could also be located in
/usr/local/bin/ or elsewhere. 

# first.tcl

Comments in Tcl are preceded by a # character. 

puts "This is Tcl tutorial"

The puts command prints a string to the console. 

$ which tclsh
/usr/bin/tclsh

The path to the Tcl interpreter can be found using the which command.

$ chmod +x first.tcl 
$ ./first.tcl 
This is Tcl tutorial

We make script executable with the chmod command and execute it.

## Sources

The following sources were used to create this tutorial:

  - [tcl.tk](http://www.tcl.tk/)

  - [en.wikipedia.org/wiki/Tcl](http://en.wikipedia.org/wiki/Tcl)

In this part of the Tcl tutorial, we have introduced the Tcl language. 

[Contents](..)  
[Next](../lexis/)