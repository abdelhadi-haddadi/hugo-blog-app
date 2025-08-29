+++
title = "Kotlin Property Keyword"
date = 2025-08-29T20:02:49.577+01:00
draft = false
description = "Kotlin property keyword tutorial shows how to work with properties in Kotlin. Learn about property initialization, getters, setters, and delegated properties with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Property Keyword

last modified April 19, 2025

Kotlin's property system provides a concise way to manage class state. The
property concept replaces fields with built-in accessors. This
tutorial explores properties in depth with practical examples.

## Basic Definitions

In Kotlin, a property is a class member that combines a field with accessors.
Properties automatically generate getters and setters. They can be declared with
val (read-only) or var (mutable). Properties provide
encapsulation without boilerplate code.

## Basic Property Declaration

The simplest property declaration consists of a type and optional initializer.
Kotlin automatically provides default accessors. Here's a basic example of
property usage.

BasicProperty.kt
  

package com.zetcode

class Person {
    var name: String = "John Doe"
    val age: Int = 30
}

fun main() {

    val person = Person()
    println(person.name) // Output: John Doe
    person.name = "Jane Smith" // Setter called
    println(person.name) // Output: Jane Smith
}

This example shows a mutable name property and read-only
age property. The name can be changed, while
age cannot. Kotlin generates default getters and setters
automatically.

## Custom Getters and Setters

Properties can have custom accessors defined after the property declaration.
The get and set blocks allow custom logic. The
setter parameter is conventionally named value.

CustomAccessors.kt
  

package com.zetcode

class Rectangle(val width: Int, val height: Int) {
    val area: Int
        get() = width * height
        
    var borderColor: String = "black"
        set(value) {
            if (value in listOf("black", "red", "blue")) {
                field = value
            }
        }
}

fun main() {

    val rect = Rectangle(10, 20)
    println(rect.area) // Output: 200
    
    rect.borderColor = "red"
    println(rect.borderColor) // Output: red
}

Here area is a computed property with a custom getter.
borderColor has a setter with validation. The field
identifier refers to the backing field. Invalid colors are silently ignored.

## Backing Fields

Kotlin automatically provides backing fields when needed, accessed via the
field identifier. Backing fields store property values when custom
accessors reference them. They're only generated if used in accessors.

BackingField.kt
  

package com.zetcode

class Counter {
    var count: Int = 0
        set(value) {
            if (value &gt;= 0) {
                field = value
            }
        }
        
    val isZero: Boolean
        get() = count == 0
}

fun main() {

    val counter = Counter()
    counter.count = 5
    println(counter.count) // Output: 5
    counter.count = -3 // Ignored
    println(counter.count) // Output: 5
    println(counter.isZero) // Output: false
}

The count property uses a backing field to store its value. The
setter validates input, ignoring negative numbers. isZero is a
computed property without backing field as it doesn't store state.

## Late-Initialized Properties

Properties marked with lateinit can be initialized after declaration.
They must be var and non-nullable. Useful when dependency injection
or test setup initializes properties.

LateInitProperty.kt
  

package com.zetcode

class Service {
    lateinit var apiClient: ApiClient
    
    fun initialize(client: ApiClient) {
        apiClient = client
    }
    
    fun callService() {
        if (::apiClient.isInitialized) {
            apiClient.call()
        }
    }
}

class ApiClient {
    fun call() = println("API called")
}

fun main() {

    val service = Service()
    service.initialize(ApiClient())
    service.callService() // Output: API called
}

apiClient is declared without initializer but must be set before use.
The isInitialized check prevents UninitializedPropertyAccessException.
This pattern is common in frameworks like Spring.

## Delegated Properties

Kotlin supports property delegation using the by keyword. Delegates
handle property access logic. Common delegates include lazy,
observable, and vetoable.

DelegatedProperty.kt
  

package com.zetcode

import kotlin.properties.Delegates

class User {
    val lazyValue: String by lazy {
        println("computed!")
        "Hello"
    }
    
    var name: String by Delegates.observable("&lt;no name&gt;") {
        prop, old, new -&gt;
        println("$old -&gt; $new")
    }
}

fun main() {

    val user = User()
    println(user.lazyValue) // Output: computed! then Hello
    println(user.lazyValue) // Output: Hello (cached)
    
    user.name = "John" // Output: &lt;no name&gt; -&gt; John
    user.name = "Jane" // Output: John -&gt; Jane
}

lazyValue is computed only on first access and cached.
name notifies when changed via observable delegate. Delegates
encapsulate common property patterns reducing boilerplate code.

## Property Visibility

Property visibility modifiers control access to properties and their accessors.
Getters inherit property visibility, while setters can have separate modifiers.
This enables flexible encapsulation.

PropertyVisibility.kt
  

package com.zetcode

class BankAccount {
    var balance: Double = 0.0
        private set
    
    fun deposit(amount: Double) {
        if (amount &gt; 0) {
            balance += amount
        }
    }
    
    fun withdraw(amount: Double): Boolean {
        if (amount &lt;= balance) {
            balance -= amount
            return true
        }
        return false
    }
}

fun main() {

    val account = BankAccount()
    account.deposit(100.0)
    println(account.balance) // Output: 100.0
    // account.balance = 200.0 // Compile error
}

The balance property has a public getter but private setter. Changes
must go through controlled methods deposit and withdraw.
This ensures proper validation and business rules.

## Extension Properties

Kotlin allows adding properties to existing classes via extensions. Extension
properties don't have backing fields. They must define explicit getters (and
setters for var).

ExtensionProperty.kt
  

package com.zetcode

val String.hasDigits: Boolean
    get() = this.any { it.isDigit() }

var StringBuilder.lastChar: Char
    get() = this[this.length - 1]
    set(value) {
        this.setCharAt(this.length - 1, value)
    }

fun main() {

    val text = "Hello123"
    println(text.hasDigits) // Output: true
    
    val builder = StringBuilder("Kotlin")
    builder.lastChar = '!'
    println(builder) // Output: Kotli!
}

hasDigits is an extension property checking for digits in Strings.
lastChar extends StringBuilder with mutable last character access.
Extension properties enhance existing types without inheritance.

## Best Practices for Properties

**Prefer properties over Java-style get/set methods:** Kotlin's
properties are more concise and idiomatic.
**Use custom accessors wisely:** Keep complex logic in methods
rather than bloating property accessors.
**Consider immutability:** Use val for properties
that shouldn't change after initialization.
**Validate in setters:** Use property setters for simple
validation logic.
**Leverage delegates:** Use built-in delegates for common
patterns like lazy initialization or observables.

## Source

[Kotlin Properties Documentation](https://kotlinlang.org/docs/properties.html)

This tutorial covered Kotlin properties in depth, showing declaration, accessors,
delegates, and extensions. Properties provide a powerful way to manage class
state with concise syntax. Proper use of properties leads to cleaner, more
maintainable Kotlin code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).