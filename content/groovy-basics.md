+++
title = "Groovy basics"
date = 2025-08-29T19:56:26.684+01:00
draft = false
description = "Groovy basics tutorial covers variables, constants, data types, string formatting, and console I/O in Groovy."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy basics

last modified March 20, 2025

This article explores basic programming concepts in Groovy. We start with
simple programs, then cover variables, constants, and data types. We also
look at console I/O and string formatting in Groovy.

## Groovy simple example

Here's a basic Groovy example. Save it as Simple.groovy. Unlike
Java, Groovy doesn't require a class name to match the file name.

Simple.groovy
  

println "This is Groovy"

Groovy is simpler than Java. It doesn't need a class or main method for
basic scripts. The code above prints "This is Groovy" to the console.

Groovy scripts can run directly without boilerplate. Save the file and run
it with the groovy command.

$ groovy Simple.groovy
This is Groovy

## Groovy console reading values

This example shows how to read input from the console in Groovy.

ReadLine.groovy
  

print "Enter your name: "
def name = System.console().readLine()
println "Hello, $name!"

The script prompts for a name, reads it, and greets the user. Groovy's
System.console provides console access.

def name = System.console().readLine()

def defines a variable without specifying a type. Groovy
infers it as a String here. readLine gets user input.

println "Hello, $name!"

Groovy supports string interpolation with $. It embeds the
name value directly in the string.

$ groovy ReadLine.groovy
Enter your name: Jane
Hello, Jane!

## Groovy command line arguments

Groovy scripts can accept command line arguments easily.

CommandLineArgs.groovy
  

args.each { arg -&gt;
    println arg
}

The args variable is implicitly available in Groovy scripts.
It's an array of command line arguments.

args.each { arg -&gt; println arg }

The each method loops over the args array. For
each item, it prints the value. Groovy's closures simplify this.

$ groovy CommandLineArgs.groovy 1 2 3
1
2
3

## Groovy variables

Variables in Groovy store data and can change values. They're defined with
def or a specific type like String.

Variables.groovy
  

def city = "Paris"
String name = "Marie"
int age = 28

println city
println name
println age

city = "Berlin"
println city

We use def for flexible typing and explicit types like
String and int when needed.

city = "Berlin"

Variables can be reassigned. Here, city changes from "Paris"
to "Berlin".

$ groovy Variables.groovy
Paris
Marie
28
Berlin

## Groovy constants

Constants in Groovy use final to prevent changes after
initialization.

Constants.groovy
  

final int MAX_USERS = 100
def count = 50

count = 75
// MAX_USERS = 200 // This would fail
println "Count: $count, Max: $MAX_USERS"

final int MAX_USERS = 100 sets a constant. Attempting to
reassign it causes an error.

$ groovy Constants.groovy
Count: 75, Max: 100

## Groovy string formatting

Groovy simplifies string building with interpolation using $
or ${}.

StringFormatting.groovy
  

def name = "Alex"
def age = 25

println "$name is $age years old"
println "Next year, ${name} will be ${age + 1}"

$name embeds the variable directly. ${} allows
expressions like age + 1.

$ groovy StringFormatting.groovy
Alex is 25 years old
Next year, Alex will be 26

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial introduced Groovy basics with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).