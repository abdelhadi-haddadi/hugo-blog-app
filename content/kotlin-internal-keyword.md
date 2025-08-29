+++
title = "Kotlin internal Keyword"
date = 2025-08-29T20:02:40.585+01:00
draft = false
description = "Kotlin internal keyword tutorial shows how to use the internal visibility modifier in Kotlin. Learn about module-level visibility with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin internal Keyword

last modified April 19, 2025

Kotlin's visibility modifiers control the scope of declarations. The internal
keyword provides module-level visibility. This tutorial explores the internal
modifier in depth with practical examples.

## Basic Definitions

The internal keyword in Kotlin makes a declaration visible within
the same module. A module is a set of Kotlin files compiled together. This
provides encapsulation between different parts of a large project.

## Internal Class

An internal class is accessible anywhere within the same module but not outside.
This is useful for implementation details that shouldn't be exposed publicly.

InternalClass.kt
  

package com.zetcode

internal class DatabaseHelper {
    fun connect() = println("Connecting to database")
}

fun main() {

    val db = DatabaseHelper()
    db.connect() // Works within same module
}

Here we define an internal DatabaseHelper class. It can be used
within the same module but would be inaccessible if imported into another module.

## Internal Function

Functions can be marked as internal to limit their visibility to the current
module. This helps hide implementation details while keeping them available
throughout the module.

InternalFunction.kt
  

package com.zetcode

internal fun calculateDiscount(price: Double): Double {
    return price * 0.9 // 10% discount
}

fun main() {

    val total = calculateDiscount(100.0)
    println("Discounted price: $total") // Output: 90.0
}

The calculateDiscount function is internal, so it can be called
anywhere in the module but not from other modules. This protects business logic.

## Internal Property

Properties can also be marked as internal. This controls access to class fields
while keeping them available module-wide for internal use.

InternalProperty.kt
  

package com.zetcode

class ShoppingCart {
    internal var discountApplied = false
    
    fun applyDiscount() {
        discountApplied = true
    }
}

fun main() {

    val cart = ShoppingCart()
    cart.applyDiscount()
    println("Discount applied: ${cart.discountApplied}") // Output: true
}

The discountApplied property is internal, so it can be accessed
within the module but not from outside. This maintains encapsulation.

## Internal Interface

Interfaces can be marked as internal to restrict their use to the current module.
This is useful for contracts that shouldn't be implemented outside the module.

InternalInterface.kt
  

package com.zetcode

internal interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("LOG: $message")
    }
}

fun main() {

    val logger: Logger = ConsoleLogger()
    logger.log("Test message") // Output: LOG: Test message
}

The Logger interface is internal, so it can only be implemented
within the same module. This controls how the logging system can be extended.

## Internal in Different Packages

Internal visibility works across different packages within the same module. This
allows organization while maintaining access to internal declarations.

InternalAcrossPackages.kt
  

// File 1: com/zetcode/auth/Authenticator.kt
package com.zetcode.auth

internal class Authenticator {
    fun authenticate() = println("Authenticating...")
}

// File 2: com/zetcode/main.kt
package com.zetcode

import com.zetcode.auth.Authenticator

fun main() {

    val auth = Authenticator() // Accessible in same module
    auth.authenticate()
}

The Authenticator class is internal but accessible from another
package in the same module. This demonstrates module-wide visibility.

## Internal Constructor

Constructors can be marked as internal to control how classes are instantiated
across module boundaries while allowing construction within the module.

InternalConstructor.kt
  

package com.zetcode

class ApiClient internal constructor(val apiKey: String) {
    fun makeRequest() = println("Making request with key: $apiKey")
}

fun createClient(key: String): ApiClient {
    return ApiClient(key) // Can call internal constructor
}

fun main() {

    val client = createClient("secret123")
    client.makeRequest() // Output: Making request with key: secret123
}

The ApiClient has an internal constructor, so it can only be
created within the module. The createClient function provides
controlled instantiation.

## Internal and Inheritance

Internal visibility affects inheritance. An internal class or member can be
overridden by subclasses within the same module but not from outside.

InternalInheritance.kt
  

package com.zetcode

open internal class BaseService {
    internal open fun start() = println("Base service starting")
}

class CustomService : BaseService() {
    override fun start() {
        println("Custom service starting")
        super.start()
    }
}

fun main() {

    val service = CustomService()
    service.start() 
    // Output: 
    // Custom service starting
    // Base service starting
}

The internal BaseService can be extended within the same module.
The start method can be overridden by internal or more visible
members in subclasses.

## Best Practices for Internal Visibility

**Use for module APIs:** Mark implementation details as internal
while exposing public APIs.
**Organize large projects:** Use internal to share code within
a module while hiding it from other modules.
**Combine with other modifiers:** Internal can be used with
protected or private for more precise control.
**Document internal APIs:** Clearly document intended usage of
internal declarations for module maintainers.
**Consider alternative visibility:** For truly private code,
use private instead of internal.

## Source

[Kotlin Visibility Modifiers Documentation](https://kotlinlang.org/docs/visibility-modifiers.html)

This tutorial covered Kotlin's internal keyword in depth, showing
how it provides module-level visibility control. We explored various scenarios
including classes, functions, properties, and inheritance. Proper use of internal
visibility helps create well-encapsulated, maintainable modules.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).