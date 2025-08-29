+++
title = "Ruby basics"
date = 2025-08-29T20:03:07.727+01:00
draft = false
description = "In this part of the Ruby tutorial, we cover the basics of Ruby. We work with variables, constants and basic data types. We read and write to the console; we mention variable interpolation."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../lexis/)
[Next](../variables/)

# Ruby basics

last modified October 18, 2023

In this part of the Ruby tutorial, we cover basic programming concepts of the
Ruby language. We introduce the very basic programs. We work with variables,
constants and basic data types. We read and write to the console; we mention
variable interpolation.

We start with a very simple code example. 

first.rb
  

#!/usr/bin/ruby

puts "This is Ruby"

This is simple Ruby script. It will print "This is Ruby" message to
the console. 

#!/usr/bin/ruby

This is a path to the Ruby interpreter, which will execute the 
script. 

puts "This is Ruby"

The puts is a Ruby keyword, which prints its argument to
the terminal. In our case the argument is a string message, delimeted
by double quotes. 

$ ./first.rb 
This is Ruby

Executing the script gives the above output.

We can read values from the terminal. 
(Terminal and console are synonyms)

name.rb
  

#!/usr/bin/ruby

print "What is your name? "
name = gets

puts "Hello #{name}"

The second program will read a value from a console
and print it. 

print "What is your name? "

The print keyword prints a message to the console. 
The difference between the print and puts keywords is that the print
keyword does not start a new line. The puts keyword
automatically starts a new line. 

name = gets

Here we read an input from the user and store it in the name variable.
The gets is a method, which in our case reads a line
from the terminal. It is one of the methods that we have at our
disposal by default. 

puts "Hello #{name}"

In this code line, we perform variable interpolation. *Variable interpolation*
is replacing variables with their values inside string literals. 
Another names for variable interpolation are: variable substitution
and variable expansion.

$ ./name.rb 
What is your name? Jan
Hello Jan

Ruby code can be run from the command line. This is inspired by Perl one-liners,
where small fragments of code are run to do some small tasks. 

$ ruby -e "puts RUBY_VERSION"
2.7.1

The -e option tells Ruby to execute Ruby code specified on the line and 
not to search for a Ruby file name. Our example prints the version of the
Ruby interpreter to the terminal.

Ruby interpreter has a -c option which checks the syntax of the code.
If this option is used, the code is not executed. If there is no syntax error,
Ruby will print "Syntax OK" to the standard output.  

syntax_check.rb
  

#!/usr/bin/ruby

class Being end
    
m = Test.new
p m

In the above example, there is a syntax error. If we put class and
end keywords on one line, we must also use the semicolon ; character.

$ ruby -c syntax_check.rb 
Syntax OK

The syntax of the code snippet is OK.

## Ruby command line arguments

Ruby programs can receive command line arguments. They
follow the name of the program, when we run it. 

args.rb
  

#!/usr/bin/ruby

puts ARGV

Command line arguments specified after the file name are available to a Ruby
program in the global array named ARGV.

puts ARGV

Here we print all the command line arguments to the terminal. 

$ ./args.rb 1 2 3
1
2
3

We provide three numbers as command line arguments and these are printed to the
console. 

In the following example, we print all arguments and also the script name. 

args2.rb
  

#!/usr/bin/ruby

puts $0
puts $*

The $0 global variable contains the name of the script 
being executed. Global variables in Ruby begin with the $ 
character. The $* is another global variable. It is a 
synonym for the ARGV variable. It contains command line 
arguments given for the current script. 

$ ./args2.rb Ruby Python Perl
./args2.rb
Ruby
Python
Perl

The args2.rb script receives three strings. The name of
the script and the three arguments are printed to the terminal.

## Ruby variables and constants

A *variable* is a place to store data. A variable has a name and a data
type. Data types are different types of values. Integers, strings and floating
point numbers are examples of data types. Ruby is a dynamic language. This means
that we do not have to (and cannot) declare a variable to be of a certain data
type. Instead, the Ruby interpreter determines the data type at the moment of
the assignment. 

Moreover, a variable can contain different values and also different types of
values over time. This differs from languages that are strongly types, like
Java, C or Pascal. Unlike variables, *constants* (should) retain their
values. Once initialized, they cannot be modified. In Ruby however, it is
possible to change the value of a constant. In such a case a warning is issued. 

variables.rb
  

#!/usr/bin/ruby

city = "New York"
name = "Paul"; age = 35
nationality = "American"

puts city
puts name
puts age
puts nationality

city = "London"

puts city

In the above example, we work with four variables. 

city = "New York"

We assign a string value to the city variable. The variable
is dynamically created. 

name = "Paul"; age = 35

We create two more variables. We can put two statements into one line. 
For readability, however, each statement should be on a separate line. 

puts city
puts name
puts age
puts nationality

We print the values of the variables to the terminal.

city = "London"

We assign a new value to the city variable. 

$ ./variables.rb 
New York
Paul
35
American
London

As we already said, constants store one value over the time. Unlike in other
languages, this rule is however not enforced in Ruby. 

constants.rb
  

#!/usr/bin/ruby

WIDTH = 100
HEIGHT = 150

var = 40
puts var

var = 50
puts var

puts WIDTH
WIDTH = 110
puts WIDTH

In this example, we declare two constants and one variable.

WIDTH = 100
HEIGHT = 150

Constants in Ruby begin with capital letter. It is a common practice
to write all characters of a constant in uppercase letters. 

var = 40
puts var

var = 50

We declare and initialize a variable. Later, we assign a new value
to the variable. It is legal. 

WIDTH = 110

We assign a new value to a constant. Constants should not be modified,
once they are created. Otherwise it has no meaning to create a constant.
The Ruby interpreter will issue a warning.

$ ./constants.rb 
40
50
100
./constants.rb:13: warning: already initialized constant WIDTH
./constants.rb:3: warning: previous definition of WIDTH was here
110

## Ruby variable interpolation

*Variable interpolation* is replacing variables with their values inside 
string literals. Other names for variable interpolation are variable substitution 
and variable expansion.

interpolation.rb
  

#!/usr/bin/ruby

age = 34
name = "William"

puts "#{name} is #{age} years old" 

In Ruby, strings are immutable. We cannot modify an existing string. Variable
interpolation happens during string creation. 

age = 34
name = "William"

Here we declare two variables. 

puts "#{name} is #{age} years old" 

The string message has double quotes as its boundaries. When we put 
a variable name between the #{ and } characters, 
the variable is interpolated: that is, replaced with its value.

$ ./interpolation.rb 
William is 34 years old

This chapter covered some basics of the Ruby language.

[Contents](..)  
[Previous](../lexis/)
[Next](../variables/)