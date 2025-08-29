+++
title = "Groovy Variables"
date = 2025-08-29T19:56:33.551+01:00
draft = false
description = "Groovy Variables tutorial shows how to declare and use variables in Groovy. Learn about dynamic typing, variable scope, and best practices."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Variables

last modified February 25, 2025

Variables are fundamental to any programming language. In Groovy, variables are
used to store data that can be manipulated and retrieved throughout a program.
This tutorial covers how to declare and use variables in Groovy, including
dynamic typing, variable scope, and best practices.

## Variable Declaration

In Groovy, variables are declared using the def keyword or by
explicitly specifying the data type. Groovy supports dynamic typing, meaning
the type of a variable is determined at runtime.

VariableDeclaration.groovy
  

// Using 'def' for dynamic typing
def name = "Alice"
def age = 30

println(name)
println(age)

// Explicitly specifying the type
String city = "Wonderland"
int zipCode = 12345

println(city)
println(zipCode)

This example demonstrates how to declare variables using both dynamic typing
(def) and explicit typing.

## Dynamic Typing

Groovy is dynamically typed, meaning you don't need to specify the type of a
variable when declaring it. The type is inferred at runtime based on the assigned
value.

DynamicTyping.groovy
  

def value = 42
println(value.getClass())

value = "Groovy"
println(value.getClass())

This example shows how Groovy dynamically changes the type of a variable based
on the assigned value.

## Variable Scope

Variables in Groovy can have different scopes, such as local, instance, or
class-level. Local variables are declared within a method or block and are only
accessible within that scope.

VariableScope.groovy
  

class Person {
    def name // Instance variable

    def printName() {
        def greeting = "Hello" // Local variable
        println("${greeting}, ${name}!")
    }
}

def person = new Person()
person.name = "Alice"
person.printName()

This example demonstrates the scope of variables in Groovy, including local and
instance variables.

## Constants

Groovy allows you to define constants using the final keyword. Once
assigned, the value of a constant cannot be changed.

Constants.groovy
  

final PI = 3.14159
println(PI)

// PI = 3.14 // This would cause a compilation error

This example shows how to define and use constants in Groovy.

## Variable Naming Conventions

Groovy follows standard naming conventions for variables. Variable names should
be descriptive and use camelCase for multi-word names.

VariableNaming.groovy
  

def firstName = "Alice"
def lastName = "Smith"
def ageInYears = 30

println("${firstName} ${lastName} is ${ageInYears} years old.")

This example demonstrates proper variable naming conventions in Groovy.

## Best Practices for Using Variables

**Use Descriptive Names:** Choose meaningful names for variables
to improve code readability.
**Prefer def for Flexibility:** Use def
for dynamic typing unless a specific type is required.
**Limit Scope:** Declare variables in the smallest scope
necessary to avoid unintended side effects.
**Use Constants for Immutable Values:** Use final
for values that should not change.

## Source

[Groovy Variables Documentation](https://groovy-lang.org/syntax.html)

In this tutorial, we explored how to declare and use variables in Groovy.
Groovy's dynamic typing and flexible syntax make it easy to work with variables
effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).