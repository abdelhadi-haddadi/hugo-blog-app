+++
title = "Kotlin var Keyword"
date = 2025-08-29T20:02:59.802+01:00
draft = false
description = "Kotlin var keyword tutorial shows how to declare and use mutable variables in Kotlin. Learn about variable initialization, type inference, and mutability with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin var Keyword

last modified April 19, 2025

Kotlin provides two keywords for variable declaration: val and
var. The var keyword declares mutable variables that
can be reassigned. This tutorial explores the var keyword in depth
with practical examples.

## Basic Definitions

The var keyword in Kotlin declares a mutable variable. Unlike
val, variables declared with var can be reassigned
after initialization. Kotlin supports type inference for var
declarations.

## Basic var Declaration

The simplest form of var declaration includes the keyword, variable
name, optional type, and initial value. The type can be inferred from the
initializer.

BasicVar.kt
  

package com.zetcode

fun main() {

    var count = 10
    println(count) // Output: 10
    
    count = 20
    println(count) // Output: 20
}

Here we declare a mutable variable count initialized to 10. Kotlin
infers the type as Int. We then reassign it to 20, demonstrating mutability. The
type remains fixed after declaration.

## Explicit Type Declaration

While Kotlin can infer types, you can explicitly declare the variable type. This
is useful when you want to be specific about the type or when initializing later.

ExplicitType.kt
  

package com.zetcode

fun main() {

    var message: String
    message = "Hello, Kotlin"
    
    println(message) // Output: Hello, Kotlin
    
    message = "New message"
    println(message) // Output: New message
}

We declare message with explicit String type and initialize it
later. The variable can be reassigned as long as the new value is a String. This
shows the separation of declaration and initialization.

## Late Initialization with lateinit

For non-null properties that can't be initialized in the constructor, Kotlin
provides lateinit. This modifier allows delayed initialization of
var properties.

LateInit.kt
  

package com.zetcode

class User {
    lateinit var name: String
    
    fun initializeName() {
        name = "John Doe"
    }
}

fun main() {

    val user = User()
    user.initializeName()
    
    println(user.name) // Output: John Doe
}

The name property is declared with lateinit and
initialized later. Attempting to access it before initialization would throw an
exception. This is useful for dependency injection scenarios.

## Variable Scope

Variables declared with var follow standard scoping rules. They are
visible within their declaration block and can shadow variables in outer scopes.

VariableScope.kt
  

package com.zetcode

fun main() {

    var x = 10
    println("Outer x: $x") // Output: Outer x: 10
    
    if (true) {
        var x = 20
        println("Inner x: $x") // Output: Inner x: 20
    }
    
    println("Outer x: $x") // Output: Outer x: 10
}

This example demonstrates variable shadowing. The inner x shadows
the outer one within the if block. Changes to the inner variable don't affect
the outer one. Each variable exists in its own scope.

## Type Change Restrictions

While var allows value reassignment, the variable's type is fixed
at declaration. You cannot assign a value of a different type after declaration.

TypeRestriction.kt
  

package com.zetcode

fun main() {

    var value: Number = 10
    println(value) // Output: 10
    
    value = 20.5
    println(value) // Output: 20.5
    
    // value = "Hello" // Compile error
}

The value variable is declared as Number, so it can hold any
numeric type. However, assigning a String would cause a compile error. The type
system ensures type safety even with mutable variables.

## Properties in Classes

In classes, var declares mutable properties. These can have custom
getters and setters while maintaining the mutable nature of the property.

ClassProperties.kt
  

package com.zetcode

class Person {
    var name: String = ""
        set(value) {
            field = value.trim()
        }
    
    var age: Int = 0
        set(value) {
            field = if (value &gt;= 0) value else 0
        }
}

fun main() {

    val person = Person()
    person.name = "  John  "
    person.age = -5
    
    println(person.name) // Output: John
    println(person.age) // Output: 0
}

The Person class has two mutable properties with custom setters.
The name setter trims whitespace, while the age setter ensures non-negative
values. This shows how var properties can encapsulate logic.

## Top-Level Variables

var can be used to declare mutable top-level variables. These are
accessible throughout the file and can be imported into other files.

TopLevelVar.kt
  

package com.zetcode

var counter = 0

fun incrementCounter() {
    counter++
}

fun main() {

    println(counter) // Output: 0
    incrementCounter()
    println(counter) // Output: 1
}

The counter variable is declared at the top level and can be
modified by any function in the file. This demonstrates global mutable state,
which should be used judiciously to avoid maintainability issues.

## Best Practices for var Usage

**Prefer val over var:** Use val by default and
only use var when mutability is required.
**Limit scope:** Keep mutable variables in the smallest possible
scope to reduce side effects.
**Consider thread safety:** Mutable variables in concurrent code
need proper synchronization.
**Use meaningful names:** Clearly name mutable variables to
indicate their purpose and mutability.
**Document mutations:** Comment complex mutations to explain
their purpose and invariants.

## Source

[Kotlin Variables Documentation](https://kotlinlang.org/docs/basic-syntax.html#variables)

This tutorial covered Kotlin's var keyword in depth, showing how to
declare and use mutable variables. We explored various scenarios including
properties, scoping, and type safety. Proper use of mutable variables helps
balance flexibility and maintainability in Kotlin code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).