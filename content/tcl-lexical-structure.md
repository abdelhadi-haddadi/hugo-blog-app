+++
title = "Tcl lexical structure"
date = 2025-08-29T20:03:15.999+01:00
draft = false
description = "This chapter of the Tcl tutorial covers lexical structure of the Tcl language. The covered topics include white space, Tcl commands, comments, variables, various types of brackets, and substitution."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tcl/)
[Next](../basiccommands/)

# Tcl lexical structure

last modified October 18, 2023

Computer languages, like human languages, have a lexical structure.
A lexis of a Tcl language consists of basic elements and rules
that apply to them. Words are basic elements in Tcl. Words can 
be either commands or command arguments. Substitution is one of the
basic rules of the Tcl grammar.

## Commands

Tcl is a string-based, interpreted command language. 
A Tcl script consists of commands, which are separated by newlines
or semicolons. Commands are the basic execution elements. 
A command is followed by one or more words which are its arguments.
Each argument is separated by white space. 

A Tcl command has the following form : command arg1 arg2 arg3 ...
The Tcl interpreter takes each word of the sentence and evaluates it.
The first word is considered to be the command. Most Tcl commands are variadic. This means
that they can process variable number of arguments. 

When a Tcl script is parsed the commands are evaluated. Each command
interprets words in its own context. 

puts "Tcl language"

In the above code excerpt, we have the puts command. This command
prints a message to the console. The "Tcl language" is a string which
is being printed. Unlike in other languages, strings must not be enclosed in double
quotes; unless there is a white space.

#!/usr/bin/tclsh

puts zetcode.com; puts androida.co

puts zetcode
puts androida

In the first case the commands are separated by the semicolon 
; character. In the second case they are separated by 
the newline character. 

## Substitution

There are three kinds of substitutions in Tcl.

  - Command substitution

  - Variable substitution

  - Backslash substitution

Square brackets are used for command substitution. 

% puts [expr 1+2]
3

The expr command is used to perform arithmetic calculations. First,
the command between the square brackets is evaluated and the result is
returned to the puts command. The puts command then 
evaluates the result and prints it to the console. 

If a word contains a dollar sign $, then Tcl performs variable 
substitution. The dollar-sign and the following characters are replaced in 
the word by the value of a variable.

#!/usr/bin/tclsh

set name Jane

puts name
puts $name

We create a variable called name and set a value to it. 

puts name

In this case, we print a string "name" to the console.

puts $name

In the second case, the argument is preceded by the $ character.
The value of the name variable is printed to the console. 

$ ./name.tcl 
name
Jane

With the backslash substitution, we escape the original meaning of the character. 
For example, the \n stands for a new line and the \t is 
the tab character. 

% puts "This is \t Sparta"
This is          Sparta

Here the \t sequence is replaced with a tab. 

#!/usr/bin/tclsh

puts "This was a \"great\" experience"
puts "The \\ character is the backslash character"

puts "20000\b\b miles"

We use the backslash substitution if we want to have
quotes inside quote characters. Also if we want to print
the \ character, we must precede it with additional backslash.
The \b is substituted with a backspace.

$ ./backslash.tcl 
This was a "great" experience
The \ character is the backslash character
200 miles

Running the example.

## Comments

Comments are used by humans to clarify source code. 
In Tcl comments start with the # character. 

# example of a puts command
puts "Tcl language"

All characters after the # character are ignored by tclsh. 

puts "Tcl language" ; # example of a puts command

Inline comments are possible only if we use a semicolon.

## White space

White space is used to separate words in Tcl source. It is also used to 
improve readability of the source code.

set name Jane

The set command takes two parameters, which are 
separated by white space. 

set age        32
set name       Robert
set occupation programmer

We might use more spaces if we want to improve the clarity 
of the source code.

set vals { 1 2 3 4 5 6 7 }
puts $vals

White space is used to separate items in Tcl lists. In C based 
languages, we would use the comma character. 

## Variables

A *variable* is an identifier which holds a value. In programming 
we say that we assign or set a value to a variable. Technically speaking, 
a variable is a reference to a computer memory where the value is stored. 
Variable names are case sensitive. This means that Name, name, 
and NAME refer to three different variables. 

Variables in Tcl are created with the set command. To obtain the 
value of a variable, its name is preceded with the $ character. 

#!/usr/bin/tclsh

set name Jane
set Name Julia
set NAME Erika

puts $name
puts $Name
puts $NAME

In the above script we set three variables. The variable names are the same,
they only differ in case. This practice is however not recommended.

$ ./case.tcl 
Jane
Julia
Erika

## Braces

Braces, {}, have special meaning in Tcl. 
Substitution of words is disabled inside braces. 

#!/usr/bin/tclsh

set name {Julia Novak}
puts $name

puts "Her name is $name"
puts {Her name is $name}

This is a small script showing a usage of the braces in Tcl.

set name {Julia Novak}

Braces can be used instead of double quotes to set strings 
separated by a white space.

puts "Her name is $name"

Here the variable is substituted.

puts {Her name is $name}

When using braces, the variable is not substituted. Everything
is printed literally. 

$ ./braces.tcl 
Julia Novak
Her name is Julia Novak
Her name is $name

```
#!/usr/bin/tclsh

set numbers { 1 2 3 4 5 6 7 }
puts $numbers

puts "Braces {} are reserved characters in Tcl"
puts {Braces {} are reserved characters in Tcl}

```

Braces are used to create lists. A list is a basic data type
in Tcl.

set numbers { 1 2 3 4 5 6 7 }

Here a list of numbers is created.

puts "Braces {} are reserved characters in Tcl"
puts {Braces {} are reserved characters in Tcl}

Braces inside double quotes or inside other braces are
taken as regular characters without special meaning. 

$ ./braces2.tcl 
 1 2 3 4 5 6 7 
Braces {} are reserved characters in Tcl
Braces {} are reserved characters in Tcl

## Square brackets

Square brackets, [], are used to create nested commands. 
These nested commands are executed before the main command on the Tcl 
source line. They are used to pass the result of one command as an 
argument to another command.

#!/usr/bin/tclsh

set cwd [pwd]
puts $cwd

puts [clock format [clock seconds] -format "%Y-%m-%d %T"]

In the above code example, we show some nested commands. 

set cwd [pwd]

The pwd command returns the current working directory
of the script. It is put between the square brackets, which makes
it a nested command. First the pwd command is executed
and then the result of the command is set to the cwd variable.

puts [clock format [clock seconds] -format "%Y-%m-%d %T"]

Nested commands can be nested inside other nested commands. First, the 
clock seconds is executed. It returns the current local time
in seconds. The result is passed to the clock format command, which
formats the time in a readable form. Finally, the formatted time is returned to
the puts command, which prints it to the console. 

$ ./nested.tcl 
/home/janbodnar/prog/tcl/lexis
2015-01-16 16:45:04

## Quotes

Double quotes group words as a single argument to commands. Dollar signs,
square brackets, and the backslash are interpreted inside quotes.

#!/usr/bin/tclsh

set distro Ubuntu
puts "The Linux distribution name is $distro"

puts "The current working directory: [pwd]"
puts "2000000\b\b\b miles"

This is a practical example of using quotes in Tcl.

puts "The Linux distribution name is $distro"

The variable distro is evaluated inside the quote characters.
The $distro is replaced with "Ubuntu". 

puts "The current working directory: [pwd]"

Commands inside square brackets are interpreted too. Here
we get the current working directory with the pwd command.

puts "2000000\b\b\b miles"

The \b escape sequence deletes a preceding character. In our 
case three zeros are deleted. 

$ ./quotes.tcl 
The Linux distribution name is Ubuntu
The current working directory: /home/janbodnar/prog/tcl/lexis
2000 miles

## Backslash

The backslash character can be used in three different ways in Tcl. 
It introduces some special characters, called escape sequences. These
can be newlines, tabs, backspaces among others. It escapes the meaning
of special Tcl characters ($, {}, "", \, ). Finally, it can serve as
a line continuation character.

#!/usr/bin/tclsh

puts "0\t1"

set name Jane
puts \$name
puts \\$name

puts "He said: \"There are plenty of them\""
puts "There are currently many Linux\
distributions in the world"

The above script shows how the backslash character can be used
in Tcl.

puts "0\t1"

The \t character has a special meaning in Tcl. It stands for
a tab white space character. When we execute the script, 8
spaces are put inside 0 and 1. 

puts \$name

With the backslash, we escape the meaning of the dollar sign. 
In our case $name characters are printed to the console.

puts \\$name

The backslash can be escaped too. Here the backslash character
and the value of the name variable are printed to the
console. 

puts "He said: \"There are plenty of them\""

We can form direct speech by escaping the meaning of the inner
double quotes. 

puts "There are currently many Linux\
distributions in the world"

If the source line is too wide, we can continue on the next
line using the backslash character, escaping the newline character.

$ ./backslash.tcl 
0       1
$name
\Jane
He said: "There are plenty of them"
There are currently many Linux distributions in the world

Running the example.

## Round brackets

Round brackets are used to indicate an array subscript or to 
change the precedence of operators for the expr
command.

#!/usr/bin/tclsh

set names(1) Jane
set names(2) Robert

puts $names(1)
puts $names(2)

puts [expr (1+3)*5]

This is a simple example with round brackets in Tcl.

puts $names(1)

We use the round brackets to access the value by a key
which is specified inside round brackets. 

puts [expr (1+3)*5]

Here we change the precedence for operators. First 1 and 3 are added and
then the result is multiplied by 5. 

$ ./roundb.tcl 
Jane
Robert
20

In this chapter we have described the lexis of the Tcl language. 

[Contents](..) 
[Previous](../tcl/)
[Next](../basiccommands/)