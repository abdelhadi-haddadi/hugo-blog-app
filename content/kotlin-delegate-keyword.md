+++
title = "Kotlin delegate Keyword"
date = 2025-08-29T20:02:30.603+01:00
draft = false
description = "Kotlin delegate keyword tutorial shows how to use delegation in Kotlin. Learn about property delegation and class delegation with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin delegate Keyword

last modified April 19, 2025

Kotlin's delegation pattern allows object composition to achieve code reuse. The
by keyword enables delegation without boilerplate code. This
tutorial explores property and class delegation with practical examples.

## Basic Definitions

The by keyword in Kotlin implements the delegation pattern. It comes
in two forms: class delegation and property delegation. Delegation helps avoid
inheritance when sharing behavior between classes.

## Class Delegation

Class delegation allows implementing an interface by delegating to another
object. This is useful when you want to extend functionality without inheritance.

ClassDelegation.kt
  

package com.zetcode

interface SoundMaker {
    fun makeSound()
}

class Dog : SoundMaker {
    override fun makeSound() = println("Woof!")
}

class Robot(private val soundMaker: SoundMaker) : SoundMaker by soundMaker {
    fun move() = println("Moving...")
}

fun main() {
    val dog = Dog()
    val robot = Robot(dog)
    
    robot.makeSound() // Output: Woof!
    robot.move()      // Output: Moving...
}

Here Robot implements SoundMaker by delegating to a Dog instance. The Robot class
can focus on its own behavior while reusing Dog's sound implementation.

## Lazy Property Delegation

The lazy delegate initializes a property only when first accessed.
This is useful for expensive operations that might not always be needed.

LazyDelegate.kt
  

package com.zetcode

val heavyConfiguration: String by lazy {
    println("Computing heavy configuration")
    "Config loaded"
}

fun main() {
    println("Before access")
    println(heavyConfiguration) // Output: Computing heavy configuration
    println(heavyConfiguration) // Output: Config loaded (cached)
}

The heavyConfiguration is computed only on first access. Subsequent accesses
return the cached value. The initialization thread-safe by default.

## Observable Property Delegation

The Delegates.observable delegate allows observing property changes.
It receives the old and new values when the property changes.

ObservableDelegate.kt
  

package com.zetcode

import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("&lt;no name&gt;") {
        prop, old, new -&gt; println("$old → $new")
    }
}

fun main() {
    val user = User()
    user.name = "John"  // Output: &lt;no name&gt; → John
    user.name = "Alice" // Output: John → Alice
}

Each time the name property changes, the handler prints the change. This is
useful for implementing change listeners without boilerplate code.

## Vetoable Property Delegation

The Delegates.vetoable delegate allows rejecting property changes.
The handler returns true to accept the change or false to reject it.

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
    
    num.value = -1     // Rejected
    println(num.value) // Output: 42
}

The vetoable delegate ensures the value stays non-negative. The change to -1 is
rejected, keeping the previous value of 42.

## Custom Property Delegate

You can create custom delegates by implementing the getValue and setValue
operator functions. This allows complete control over property access.

CustomDelegate.kt
  

package com.zetcode

import kotlin.reflect.KProperty

class TrimDelegate {
    private var trimmedValue: String = ""

    operator fun getValue(thisRef: Any?, property: KProperty&lt;*&gt;): String {
        return trimmedValue
    }

    operator fun setValue(thisRef: Any?, property: KProperty&lt;*&gt;, value: String) {
        trimmedValue = value.trim()
    }
}

class Form {
    var input: String by TrimDelegate()
}

fun main() {
    val form = Form()
    form.input = "  Hello Kotlin  "
    println("'${form.input}'") // Output: 'Hello Kotlin'
}

The TrimDelegate automatically trims whitespace from string values. The custom
delegate handles both getting and setting the property value.

## Map Property Delegation

Properties can be delegated to a map, with property names as keys. This is useful
for dynamic property handling like JSON parsing.

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
    
    println(user.name) // Output: John Doe
    println(user.age)  // Output: 30
}

The User class delegates its properties to a map. The property names must match
the map keys. This pattern is often used with JSON deserialization.

## Multiple Interface Delegation

A class can delegate multiple interfaces to different objects. This allows
combining behaviors from multiple sources.

MultipleDelegation.kt
  

package com.zetcode

interface Flyer {
    fun fly() = println("Flying")
}

interface Swimmer {
    fun swim() = println("Swimming")
}

class Bird : Flyer
class Fish : Swimmer

class Duck(private val flyer: Flyer, private val swimmer: Swimmer) :
    Flyer by flyer, Swimmer by swimmer {
    fun quack() = println("Quack!")
}

fun main() {
    val duck = Duck(Bird(), Fish())
    duck.fly()   // Output: Flying
    duck.swim()  // Output: Swimming
    duck.quack() // Output: Quack!
}

Duck combines flying and swimming by delegating to Bird and Fish instances. It
can also implement its own behavior (quacking). This avoids multiple inheritance.

## Best Practices for Delegation

**Prefer composition:** Use delegation over inheritance when
sharing behavior between classes.
**Use standard delegates:** Leverage lazy, observable, and
vetoable delegates for common patterns.
**Consider readability:** Custom delegates can be powerful but
may reduce code clarity if overused.
**Document behavior:** Clearly document any non-trivial
delegation behavior in your code.
**Watch performance:** Some delegates (like lazy) add small
runtime overhead that might matter in hot paths.

## Source

[Kotlin Delegation Documentation](https://kotlinlang.org/docs/delegation.html)

This tutorial covered Kotlin's by keyword in depth, showing both
class and property delegation patterns. We explored standard delegates and
creating custom ones. Proper use of delegation can make your code more flexible
and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).