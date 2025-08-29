+++
title = "Kotlin Companion Object"
date = 2025-08-29T20:02:27.294+01:00
draft = false
description = "Kotlin companion object tutorial shows how to use the companion keyword to create class-level properties and methods. Learn about companion objects with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Companion Object

last modified April 19, 2025

Kotlin's companion object provides a way to define class-level properties and
methods similar to Java's static members. The companion keyword
declares these members that belong to the class rather than instances. This
tutorial explores companion objects in depth with practical examples.

## Basic Definitions

A companion object is declared inside a class using the companion
keyword. It can contain properties and methods that can be called without
creating class instances. Companion objects are initialized when the containing
class is loaded.

## Basic Companion Object

The simplest form of companion object provides class-level functionality. Members
are accessed using the class name directly, similar to static members in Java.

BasicCompanion.kt
  

package com.zetcode

class MyClass {
    companion object {
        fun create(): MyClass = MyClass()
        val PI = 3.1415
    }
}

fun main() {

    val instance = MyClass.create()
    println(MyClass.PI) // Output: 3.1415
}

Here we define a companion object with a factory method create and
a constant PI. Both are accessed through the class name without
creating an instance. This demonstrates basic companion object usage.

## Companion Object with Name

Companion objects can have names, which becomes useful when implementing
interfaces or extending classes. The name appears after the companion
keyword.

NamedCompanion.kt
  

package com.zetcode

interface Factory&lt;T&gt; {
    fun create(): T
}

class MyClass {
    companion object Named : Factory&lt;MyClass&gt; {
        override fun create(): MyClass = MyClass()
        fun hello() = println("Hello from companion")
    }
}

fun main() {

    val instance = MyClass.create()
    MyClass.hello() // Output: Hello from companion
}

This example shows a named companion object implementing the Factory
interface. The name Named allows us to reference the companion
object type explicitly when needed, while still providing class-level access.

## Companion Object Properties

Companion objects can hold properties that maintain state at the class level.
These properties are initialized when the class is loaded and shared among all
instances.

CompanionProperties.kt
  

package com.zetcode

class Counter {
    companion object {
        private var count = 0
        fun increment() = ++count
        fun currentCount() = count
    }
}

fun main() {

    Counter.increment()
    Counter.increment()
    println(Counter.currentCount()) // Output: 2
}

The Counter class uses a companion object to maintain a count across
all instances. The count property is private to the companion,
showing how companion objects can encapsulate class-level state.

## Companion Object as Factory

Companion objects are often used to implement factory patterns, providing
alternative ways to create instances while hiding constructor details.

FactoryCompanion.kt
  

package com.zetcode

class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name.trim())
        }
        
        fun createAdmin(): User {
            return User("Admin")
        }
    }
}

fun main() {

    val user = User.create(" John ")
    val admin = User.createAdmin()
    
    println(user.name) // Output: John
    println(admin.name) // Output: Admin
}

Here the User constructor is private, forcing creation through the
companion object's factory methods. This allows preprocessing (like trimming) and
provides named constructors (createAdmin) for better readability.

## Companion Object Extensions

Extension functions can be added to companion objects, providing additional
functionality that can be called on the class name.

CompanionExtensions.kt
  

package com.zetcode

class MyClass {
    companion object
}

fun MyClass.Companion.hello() = println("Hello from extension")

fun main() {

    MyClass.hello() // Output: Hello from extension
}

This example adds an extension function to the companion object of MyClass.
The function is called directly on the class name. Note the Companion
default name when the companion object is unnamed.

## Companion Object with Constants

Companion objects are ideal for defining constants related to a class, providing
better organization than top-level constants.

CompanionConstants.kt
  

package com.zetcode

class Color {
    companion object {
        const val RED = "#FF0000"
        const val GREEN = "#00FF00"
        const val BLUE = "#0000FF"
        
        fun allColors() = listOf(RED, GREEN, BLUE)
    }
}

fun main() {

    println(Color.RED) // Output: #FF0000
    println(Color.allColors()) // Output: [#FF0000, #00FF00, #0000FF]
}

The Color class groups related color constants in its companion
object. The const val makes these compile-time constants. The
companion also provides utility methods like allColors.

## Companion Object for Interface Implementation

Companion objects can implement interfaces, allowing the class to provide
interface functionality at the class level without instance creation.

InterfaceCompanion.kt
  

package com.zetcode

interface Logger {
    fun log(message: String)
}

class MyClass {
    companion object : Logger {
        override fun log(message: String) {
            println("LOG: $message")
        }
    }
}

fun main() {

    MyClass.log("Test message") // Output: LOG: Test message
}

Here the companion object implements the Logger interface, allowing
logging functionality to be called directly on the class name. This pattern is
useful for utility functionality that doesn't require instance state.

## Best Practices for Companion Objects

**Use for class-level members:** Place properties and methods
that belong to the class rather than instances in companion objects.
**Consider naming:** Name companion objects when implementing
interfaces or when explicit typing is needed.
**Factory patterns:** Use companion objects to implement factory
methods and control object creation.
**Constants organization:** Group related constants in companion
objects for better code organization.
**Extension functions:** Add extension functions to companion
objects to enhance class functionality.

## Source

[Kotlin Companion Objects Documentation](https://kotlinlang.org/docs/object-declarations.html#companion-objects)

This tutorial covered Kotlin's companion keyword in depth, showing
how to create and use companion objects for various purposes. We explored factory
patterns, constants, interface implementation, and extensions. Companion objects
provide a powerful way to organize class-level functionality in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).