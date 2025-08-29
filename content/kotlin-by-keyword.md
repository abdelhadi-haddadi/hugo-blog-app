+++
title = "Kotlin by Keyword"
date = 2025-08-29T20:02:26.186+01:00
draft = false
description = "Kotlin by keyword tutorial shows how to use delegation in Kotlin. Learn about class delegation and property delegation with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin by Keyword

last modified April 19, 2025

Kotlin's delegation pattern is implemented using the by keyword. It
allows composition over inheritance and property delegation. This tutorial
explores the by keyword in depth with practical examples.

## Basic Definitions

The by keyword in Kotlin enables delegation. It has two main uses:
class delegation and property delegation. Class delegation lets you implement
interfaces by delegating to another object. Property delegation delegates
property access to another object.

## Class Delegation

Class delegation allows implementing an interface by delegating to another
object. This is useful for the decorator pattern without boilerplate code.

ClassDelegation.kt
  

package com.zetcode

interface SoundMaker {
    fun makeSound()
}

class Dog : SoundMaker {
    override fun makeSound() = println("Woof!")
}

class LoudAnimal(private val animal: SoundMaker) : SoundMaker by animal {
    fun makeLoudSound() {
        println("!!!")
        makeSound()
        println("!!!")
    }
}

fun main() {
    val loudDog = LoudAnimal(Dog())
    loudDog.makeLoudSound()
}

Here LoudAnimal implements SoundMaker by delegating to
the provided animal. The by keyword handles all interface method
calls. We add new functionality without modifying the original class.

## Property Delegation Basics

Property delegation delegates getter/setter calls to another object. The
delegate must implement getValue and optionally setValue.

PropertyDelegation.kt
  

package com.zetcode

import kotlin.reflect.KProperty

class SimpleDelegate {
    operator fun getValue(thisRef: Any?, property: KProperty&lt;*&gt;): String {
        return "Delegate for '${property.name}'"
    }
}

class Example {
    val message by SimpleDelegate()
}

fun main() {
    val example = Example()
    println(example.message) // Output: Delegate for 'message'
}

The SimpleDelegate provides the value for message. The
by keyword connects the property to its delegate. The delegate's
getValue is called when accessing the property.

## Lazy Initialization

The lazy delegate initializes properties only when first accessed.
This is useful for expensive initialization that might not be needed.

LazyDelegate.kt
  

package com.zetcode

class HeavyObject {
    init {
        println("Heavy object created")
    }
}

class Container {
    val heavy by lazy { HeavyObject() }
}

fun main() {
    val container = Container()
    println("Container created")
    container.heavy // Initialization happens here
}

The heavy property is initialized only when first accessed. The
output shows "Container created" before "Heavy object created". This demonstrates
lazy initialization.

## Observable Properties

The Delegates.observable delegate allows observing property changes.
It calls a handler whenever the property value changes.

ObservableDelegate.kt
  

package com.zetcode

import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("&lt;no name&gt;") {
        prop, old, new -&gt;
        println("$old -&gt; $new")
    }
}

fun main() {
    val user = User()
    user.name = "John" // Output: &lt;no name&gt; -&gt; John
    user.name = "Jane" // Output: John -&gt; Jane
}

Each time name changes, the handler prints the old and new values.
The by keyword connects the property to the observable delegate.
This is useful for change tracking.

## Vetoable Properties

The Delegates.vetoable delegate allows rejecting property changes.
The handler can return false to veto the change.

VetoableDelegate.kt
  

package com.zetcode

import kotlin.properties.Delegates

class PositiveNumber {
    var value: Int by Delegates.vetoable(0) { _, old, new -&gt;
        new &gt;= 0
    }
}

fun main() {
    val num = PositiveNumber()
    num.value = 42
    println(num.value) // Output: 42
    
    num.value = -1
    println(num.value) // Output: 42 (change rejected)
}

The delegate only accepts non-negative numbers. The attempt to set -1 is
rejected, keeping the previous value. The by keyword enables this
validation behavior.

## Custom Property Delegate

You can create custom delegates by implementing the property operator functions.
This allows complete control over property access.

CustomDelegate.kt
  

package com.zetcode

import kotlin.reflect.KProperty

class RangeDelegate(
    private val min: Int,
    private val max: Int,
    private var value: Int
) {
    operator fun getValue(thisRef: Any?, property: KProperty&lt;*&gt;): Int {
        return value
    }
    
    operator fun setValue(thisRef: Any?, property: KProperty&lt;*&gt;, newValue: Int) {
        if (newValue in min..max) {
            value = newValue
        }
    }
}

class Config {
    var setting by RangeDelegate(0, 100, 50)
}

fun main() {
    val config = Config()
    println(config.setting) // Output: 50
    
    config.setting = 75
    println(config.setting) // Output: 75
    
    config.setting = 150
    println(config.setting) // Output: 75 (unchanged)
}

The RangeDelegate restricts values to a specified range. The
by keyword connects the property to our custom delegate. Invalid
values are silently ignored, keeping the previous valid value.

## Map Delegation

Properties can be delegated to a map, with property names as keys. This is useful
for dynamic property access and JSON-like structures.

MapDelegate.kt
  

package com.zetcode

class User(val map: Map&lt;String, Any?&gt;) {
    val name: String by map
    val age: Int by map
}

fun main() {
    val user = User(mapOf(
        "name" to "John Doe",
        "age" to 30
    ))
    
    println("${user.name}, ${user.age}") // Output: John Doe, 30
}

The User class delegates properties to values in the provided map.
The by keyword connects each property to its corresponding map
entry. This pattern is often used with JSON deserialization.

## Best Practices for Delegation

**Prefer delegation over inheritance:** Use class delegation to
avoid fragile base class problems.
**Use standard delegates:** Leverage lazy,
observable, and vetoable for common patterns.
**Create custom delegates:** Implement your own delegates for
domain-specific behavior.
**Consider performance:** Delegation adds indirection; ensure
it doesn't impact critical paths.
**Document behavior:** Clearly document custom delegates'
behavior as it's not immediately visible.

## Source

[Kotlin Delegation Documentation](https://kotlinlang.org/docs/delegation.html)

This tutorial covered Kotlin's by keyword in depth, showing both
class and property delegation patterns. We explored standard delegates and
created custom ones. Delegation is a powerful tool for code reuse and separation
of concerns in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).