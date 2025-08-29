+++
title = "Kotlin val Keyword"
date = 2025-08-29T20:02:58.693+01:00
draft = false
description = "Kotlin val keyword tutorial shows how to declare immutable variables in Kotlin. Learn about read-only variables and their usage with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin val Keyword

last modified April 19, 2025

Kotlin's val keyword is used to declare immutable variables. These
variables can be assigned only once and cannot be reassigned. This tutorial
explores the val keyword in depth with practical examples.

## Basic Definitions

The val keyword in Kotlin declares read-only variables. Once
initialized, a val cannot be reassigned. It's similar to final
variables in Java. val provides immutability at the reference
level.

## Basic val Declaration

The simplest use of val is to declare an immutable variable with
an initial value. The type can be explicitly declared or inferred by Kotlin.

BasicVal.kt
  

package com.zetcode

fun main() {

    val name = "John Doe" // Type inferred as String
    val age: Int = 30     // Explicit type declaration
    
    println(name) // Output: John Doe
    println(age)  // Output: 30
}

Here we declare two val variables. The first has inferred type,
while the second has explicit type. Both variables cannot be reassigned after
initialization. This ensures their values remain constant.

## val vs var

Kotlin has both val (immutable) and var (mutable)
keywords. val provides safety by preventing accidental reassignment.

ValVsVar.kt
  

package com.zetcode

fun main() {

    val immutable = "I cannot change"
    var mutable = "I can change"
    
    // immutable = "New value" // Compilation error
    mutable = "New value"     // Allowed
    
    println(immutable) // Output: I cannot change
    println(mutable)   // Output: New value
}

This example shows the key difference between val and var.
Attempting to reassign a val results in a compilation error. Always
prefer val when the value shouldn't change.

## val with Custom Types

val can be used with any Kotlin type, including custom classes.
The reference is immutable, but the object's properties might still be mutable.

CustomTypeVal.kt
  

package com.zetcode

class Person(var name: String, var age: Int)

fun main() {

    val person = Person("Alice", 25)
    // person = Person("Bob", 30) // Error: val cannot be reassigned
    
    person.name = "Alice Smith"    // Allowed: object is mutable
    person.age = 26
    
    println("${person.name}, ${person.age}") // Output: Alice Smith, 26
}

Here we declare a val holding a Person object. While we can't
reassign the person variable, we can modify its properties because
the Person class uses var properties. This shows val
only protects the reference.

## val in Function Parameters

Function parameters in Kotlin are always immutable, similar to being declared
with val. You cannot reassign them within the function body.

FunctionParamVal.kt
  

package com.zetcode

fun printMessage(message: String) {
    // message = "New message" // Error: parameters are vals
    println(message)
}

fun main() {

    val msg = "Hello, Kotlin!"
    printMessage(msg) // Output: Hello, Kotlin!
}

The message parameter behaves like a val inside the
function. Attempting to reassign it causes a compilation error. This enforces
immutability of function parameters.

## val with Lazy Initialization

val can be initialized later using lateinit (for var)
or by using a custom getter. This is useful when initialization is deferred.

LazyVal.kt
  

package com.zetcode

class Configuration {
    val apiKey: String by lazy {
        // Complex initialization
        System.getenv("API_KEY") ?: "default-key"
    }
}

fun main() {

    val config = Configuration()
    println(config.apiKey) // Initialized on first access
}

Here apiKey is a val that's initialized lazily. The
value is computed only when first accessed. This pattern is useful for expensive
initializations. The value remains constant after initialization.

## val in Companion Objects

val in companion objects creates class-level constants. These are
initialized when the class is loaded and remain constant throughout execution.

CompanionVal.kt
  

package com.zetcode

class MathConstants {
    companion object {
        val PI = 3.14159
        val E = 2.71828
    }
}

fun main() {

    println(MathConstants.PI) // Output: 3.14159
    println(MathConstants.E)  // Output: 2.71828
}

The PI and E values are class-level constants. They're
accessed via the class name and cannot be modified. This is a common pattern for
mathematical constants and configuration values.

## val with Collections

When using val with collections, the reference is immutable but the
collection content might still be mutable. Use immutable collections for complete
immutability.

CollectionVal.kt
  

package com.zetcode

fun main() {

    val mutableList = mutableListOf(1, 2, 3)
    val immutableList = listOf(1, 2, 3)
    
    mutableList.add(4)       // Allowed
    // immutableList.add(4)  // Error: immutable collection
    
    println(mutableList)    // Output: [1, 2, 3, 4]
    println(immutableList)  // Output: [1, 2, 3]
}

This shows that val only makes the reference immutable. The
collection's mutability depends on its type. For complete immutability, use
listOf, setOf, or mapOf.

## Best Practices for val Usage

**Prefer val over var:** Use val by default and
only use var when mutation is necessary.
**Use for constants:** val is ideal for values that
shouldn't change during execution.
**Combine with immutable collections:** Pair val
with immutable collections for complete immutability.
**Consider visibility:** Use private val for
implementation details and public val for exposed constants.
**Document complex vals:** Add comments when val
initialization is non-trivial or has side effects.

## Source

[Kotlin Variables Documentation](https://kotlinlang.org/docs/basic-syntax.html#variables)

This tutorial covered Kotlin's val keyword in depth, showing its
usage for immutable variables. We explored various scenarios including custom
types, function parameters, and collections. Proper use of val can
make your code safer and more predictable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).