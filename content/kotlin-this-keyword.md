+++
title = "Kotlin this Keyword"
date = 2025-08-29T20:02:56.483+01:00
draft = false
description = "Kotlin this keyword tutorial shows how to use this keyword to reference current object in Kotlin. Learn about class member access, scope resolution, and extension functions with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin this Keyword

last modified April 19, 2025

Kotlin's this keyword refers to the current object instance. It is
used to access class members and resolve scope ambiguities. This tutorial explores
the this keyword in depth with practical examples.

## Basic Definitions

The this keyword in Kotlin refers to the current receiver object. In
class members, it refers to the current class instance. In extension functions,
it refers to the receiver parameter. this helps distinguish between
class properties and local variables.

## Accessing Class Members

The most common use of this is to access class members when there's
a naming conflict with local variables. It explicitly refers to the current
object's properties and methods.

ClassMembers.kt
  

package com.zetcode

class Person(val name: String) {
    fun printName() {
        println("Name is ${this.name}")
    }
}

fun main() {
    val person = Person("John Doe")
    person.printName() // Output: Name is John Doe
}

Here, this.name refers to the class property name.
While not strictly necessary in this case, using this makes the code
more explicit about accessing class members.

## Resolving Scope Ambiguity

When constructor parameters or function parameters have the same name as class
properties, this is essential to distinguish between them.

ScopeResolution.kt
  

package com.zetcode

class Car(val model: String) {
    var speed: Int = 0
    
    fun accelerate(speed: Int) {
        this.speed = speed // 'this' refers to class property
    }
}

fun main() {
    val car = Car("Tesla Model 3")
    car.accelerate(120)
    println("${car.model} is going ${car.speed} km/h")
}

In the accelerate method, this.speed refers to the
class property, while speed alone refers to the parameter. Without
this, the parameter would shadow the class property.

## Constructor Delegation

In Kotlin, this is used for constructor delegation, allowing one
constructor to call another constructor in the same class.

ConstructorDelegation.kt
  

package com.zetcode

class Rectangle {
    var width: Int
    var height: Int
    
    constructor(size: Int) : this(size, size)
    
    constructor(width: Int, height: Int) {
        this.width = width
        this.height = height
    }
}

fun main() {
    val square = Rectangle(10)
    val rect = Rectangle(10, 20)
    
    println("Square: ${square.width}x${square.height}")
    println("Rectangle: ${rect.width}x${rect.height}")
}

The first constructor delegates to the second using this(size, size).
This pattern is common when you want to provide default values or multiple ways
to initialize an object.

## Extension Functions

In extension functions, this refers to the receiver object - the
object being extended. It provides access to the receiver's members.

ExtensionFunctions.kt
  

package com.zetcode

fun String.addEnthusiasm(level: Int = 1): String {
    return this + "!".repeat(level)
}

fun main() {
    val greeting = "Hello Kotlin"
    println(greeting.addEnthusiasm(3)) // Output: Hello Kotlin!!!
}

Here, this inside the extension function refers to the String
object that the function is called on. The function adds exclamation marks to the
string based on the enthusiasm level.

## Lambda Expressions

In lambda expressions with receivers, this refers to the receiver
object specified in the lambda's context. This is common in DSLs and builder
patterns.

LambdaExpressions.kt
  

package com.zetcode

class Html {
    fun body() = println("Generating body tag")
    fun div() = println("Generating div tag")
}

fun html(init: Html.() -&gt; Unit): Html {
    val html = Html()
    html.init()
    return html
}

fun main() {
    html {
        this.body()
        div() // 'this' is implicit here
    }
}

In the lambda passed to html, this refers to the Html
instance. Inside the lambda, you can call Html methods either with explicit
this or implicitly.

## Qualified this

When working with nested classes, you might need to qualify this to
reference outer class instances. Kotlin provides syntax for this scenario.

QualifiedThis.kt
  

package com.zetcode

class Outer {
    val name = "Outer"
    
    inner class Inner {
        val name = "Inner"
        
        fun printNames() {
            println("Inner name: ${this.name}")
            println("Outer name: ${this@Outer.name}")
        }
    }
}

fun main() {
    val outer = Outer()
    val inner = outer.Inner()
    inner.printNames()
}

Here, this@Outer refers to the outer class instance from within the
inner class. This qualified syntax is necessary when inner and outer classes have
members with the same name.

## Best Practices for Using this

**Use when necessary:** Only use this when needed
to resolve ambiguity or make code clearer.
**Prefer explicit this:** In constructors and setters, using
this can make code more readable.
**Understand scope:** Be aware of what this refers
to in different contexts (classes, extensions, lambdas).
**Use qualified this:** For nested classes, use qualified
this to access outer class members.
**Avoid overuse:** Don't use this unnecessarily as
it can clutter code.

## Source

[Kotlin this Expressions Documentation](https://kotlinlang.org/docs/this-expressions.html)

This tutorial covered Kotlin's this keyword in depth, showing its
various uses including class member access, scope resolution, and extension
functions. Proper use of this can make your code more explicit and
prevent naming conflicts while maintaining clarity.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).