+++
title = "Kotlin protected Keyword"
date = 2025-08-29T20:02:49.573+01:00
draft = false
description = "Kotlin protected keyword tutorial shows how to use the protected visibility modifier in Kotlin. Learn about class member visibility and inheritance with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin protected Keyword

last modified April 19, 2025

Kotlin's visibility modifiers control access to class members. The protected
keyword restricts visibility to the class and its subclasses. This tutorial explores
the protected modifier in depth with practical examples.

## Basic Definitions

The protected modifier in Kotlin makes a member visible within its
class and subclasses. Unlike Java, Kotlin's protected members aren't visible in
the same package. Protected applies to class members, not top-level declarations.

## Basic protected Property

A protected property can only be accessed within its declaring class and any
subclasses. This provides encapsulation while allowing inheritance.

ProtectedProperty.kt
  

package com.zetcode

open class Vehicle {
    protected val maxSpeed = 100
    
    fun showMaxSpeed() {
        println("Max speed: $maxSpeed") // Accessible here
    }
}

class Car : Vehicle() {
    fun displaySpeed() {
        println("Car max speed: $maxSpeed") // Accessible in subclass
    }
}

fun main() {
    val car = Car()
    car.showMaxSpeed() // Output: Max speed: 100
    car.displaySpeed() // Output: Car max speed: 100
    
    // println(car.maxSpeed) // Error: Cannot access 'maxSpeed'
}

Here maxSpeed is protected, so it's accessible in Vehicle and Car
but not from main(). The commented line would cause a compilation error if
uncommented.

## protected Method

Methods can also be marked protected, restricting their use to the class hierarchy.
This is useful for internal implementation details that subclasses might need.

ProtectedMethod.kt
  

package com.zetcode

open class Animal {
    protected fun makeSound() {
        println("Animal sound")
    }
    
    fun publicSound() {
        makeSound() // Accessible here
    }
}

class Dog : Animal() {
    fun bark() {
        makeSound() // Accessible in subclass
        println("Woof!")
    }
}

fun main() {
    val dog = Dog()
    dog.publicSound() // Output: Animal sound
    dog.bark() // Output: Animal sound\nWoof!
    
    // dog.makeSound() // Error: Cannot access 'makeSound'
}

The protected makeSound method is accessible within Animal and Dog
but not from main(). Public methods can expose protected functionality when needed.

## protected Constructor

A protected constructor can only be called by the class itself or its subclasses.
This is useful for factory patterns or limiting instantiation.

ProtectedConstructor.kt
  

package com.zetcode

open class Parent protected constructor(val name: String) {
    companion object {
        fun create(name: String): Parent {
            return Parent(name) // Accessible in companion
        }
    }
}

class Child(name: String) : Parent(name) {
    // Can call protected constructor
}

fun main() {
    val parent = Parent.create("John") // Using factory method
    val child = Child("Alice")
    
    println(parent.name) // Output: John
    println(child.name) // Output: Alice
    
    // val direct = Parent("Bob") // Error: Cannot access ''
}

The Parent class can only be instantiated through its factory method or by
subclasses. This controls how instances are created while allowing inheritance.

## protected and Internal Conflict

When a member is both protected and internal, it's visible to subclasses and
module members. This shows how modifiers can combine in Kotlin.

ProtectedInternal.kt
  

package com.zetcode

open class Base {
    protected internal val secret = "Confidential"
}

class Derived : Base() {
    fun reveal() {
        println(secret) // Accessible in subclass
    }
}

fun main() {
    val derived = Derived()
    derived.reveal() // Output: Confidential
    
    val base = Base()
    println(base.secret) // Also accessible in same module
}

The secret property is accessible both in subclasses and within the
same module. The internal modifier extends the protected visibility within the
module.

## protected in Interfaces

Kotlin interfaces can't have protected members by default. All interface members
are public. This example shows a workaround using abstract classes.

ProtectedInterface.kt
  

package com.zetcode

interface Vehicle {
    fun start() // Implicitly public
}

abstract class ProtectedVehicle : Vehicle {
    protected abstract val maxSpeed: Int
    
    protected open fun internalStart() {
        println("Starting vehicle")
    }
    
    override fun start() {
        internalStart()
    }
}

class Car : ProtectedVehicle() {
    override val maxSpeed = 120
    
    override fun internalStart() {
        println("Starting car at max speed $maxSpeed")
    }
}

fun main() {
    val car = Car()
    car.start() // Output: Starting car at max speed 120
    
    // car.internalStart() // Error: Cannot access 'internalStart'
    // println(car.maxSpeed) // Error: Cannot access 'maxSpeed'
}

By using an abstract class implementing the interface, we can add protected
members. The Car class inherits both the interface and protected members while
keeping them hidden from external code.

## protected in Sealed Classes

Sealed classes often use protected constructors to control inheritance. This
restricts subclassing to files where the sealed class is declared.

ProtectedSealed.kt
  

package com.zetcode

sealed class Result {
    protected constructor()
    
    class Success(val data: String) : Result()
    class Error(val message: String) : Result()
}

fun process(result: Result) {
    when (result) {
        is Result.Success -&gt; println(result.data)
        is Result.Error -&gt; println(result.message)
    }
}

fun main() {
    val success = Result.Success("Data loaded")
    val error = Result.Error("Failed to load")
    
    process(success) // Output: Data loaded
    process(error) // Output: Failed to load
    
    // val custom = Result() // Error: Cannot access ''
}

The sealed class's protected constructor prevents direct instantiation while
allowing predefined subclasses. This is a common pattern for restricted
hierarchies.

## protected in Companion Objects

Companion object members can be protected, making them visible only to the class
and its subclasses. This is useful for shared implementation details.

ProtectedCompanion.kt
  

package com.zetcode

open class Logger {
    protected companion object {
        const val PREFIX = "LOG: "
        
        fun formatMessage(message: String): String {
            return PREFIX + message
        }
    }
    
    fun log(message: String) {
        println(formatMessage(message))
    }
}

class FileLogger : Logger() {
    fun logToFile(message: String) {
        println("Writing: ${formatMessage(message)}")
    }
}

fun main() {
    val logger = Logger()
    logger.log("Test message") // Output: LOG: Test message
    
    val fileLogger = FileLogger()
    fileLogger.logToFile("File message") // Output: Writing: LOG: File message
    
    // println(Logger.PREFIX) // Error: Cannot access 'PREFIX'
    // Logger.formatMessage("Direct") // Error: Cannot access 'formatMessage'
}

The protected companion members are accessible within Logger and FileLogger but
not externally. This shares implementation while keeping it hidden from users.

## Best Practices for protected

**Use judiciously:** Only make members protected when subclasses
need direct access to them.
**Document protected members:** Clearly document protected APIs
as they're part of your class's contract.
**Consider alternatives:** Sometimes composition is better than
exposing protected members.
**Watch for overuse:** Too many protected members can make
subclassing complex.
**Combine with other modifiers:** protected internal can be
useful for framework code.

## Source

[Kotlin Visibility Modifiers Documentation](https://kotlinlang.org/docs/visibility-modifiers.html)

This tutorial covered Kotlin's protected keyword in depth, showing
its use with properties, methods, constructors, and special class types. Proper
use of protected visibility helps create maintainable class hierarchies while
preserving encapsulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).