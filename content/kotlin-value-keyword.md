+++
title = "Kotlin value Keyword"
date = 2025-08-29T20:02:58.676+01:00
draft = false
description = "Kotlin value keyword tutorial shows how to declare immutable variables in Kotlin. Learn about value vs var, compile-time constants, and immutable properties with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin value Keyword

last modified April 19, 2025

Kotlin's `value` keyword (used with `val`) declares immutable variables that
cannot be reassigned. Immutable variables are a key feature of Kotlin's approach
to safer, more predictable code. This tutorial explores the `val` keyword in
depth with practical examples.

## Basic Definitions

The `val` keyword in Kotlin declares read-only (immutable) variables. Once
assigned, a `val` cannot be reassigned. This differs from `var` which declares
mutable variables. Immutable variables help prevent accidental modifications.

## Basic val Declaration

The simplest use of `val` is to declare an immutable variable with a fixed value.
The value can be assigned once and cannot be changed afterward.

BasicVal.kt
  

package com.zetcode

fun main() {

    val message = "Hello, Kotlin"
    // message = "Changed" // Compilation error
    
    println(message) // Output: Hello, Kotlin
}

Here we declare a `val` named `message` and assign it a string value. Attempting
to reassign it would cause a compilation error. The value remains constant
throughout its scope.

## val with Explicit Type

You can explicitly specify the type of a `val` when declaring it. This is useful
when you want to be clear about the variable's type or when the type can't be
inferred.

TypedVal.kt
  

package com.zetcode

fun main() {

    val count: Int = 42
    val pi: Double = 3.14159
    
    println(count) // Output: 42
    println(pi) // Output: 3.14159
}

Both `count` and `pi` are declared with explicit types. The values cannot be
changed after initialization. Explicit typing helps make the code more readable
and maintainable.

## val with Computed Value

A `val` can be initialized with a computed value. The computation happens only
once, at initialization time, and the result becomes immutable.

ComputedVal.kt
  

package com.zetcode

fun main() {

    val radius = 5.0
    val area = Math.PI * radius * radius
    
    println("Area: $area") // Output: Area: 78.53981633974483
}

The `area` val is computed from `radius` and `Math.PI`. Once computed, the area
cannot be changed. This pattern is common for derived values that shouldn't
change after calculation.

## val in Class Properties

Class properties can be declared as `val` to make them immutable. These properties
must be initialized either at declaration or in the constructor.

ClassVal.kt
  

package com.zetcode

class Person(val name: String, val age: Int)

fun main() {

    val person = Person("Alice", 30)
    // person.name = "Bob" // Compilation error
    
    println("${person.name} is ${person.age}") // Output: Alice is 30
}

The `Person` class has two immutable properties. Once a `Person` is created, its
name and age cannot be changed. This ensures the object's state remains
consistent.

## val with Custom Getter

A `val` can have a custom getter that computes its value each time it's accessed.
Despite being a `val`, the returned value can change based on other state.

CustomGetter.kt
  

package com.zetcode

class Circle(val radius: Double) {
    val area: Double
        get() = Math.PI * radius * radius
}

fun main() {

    val circle = Circle(5.0)
    println(circle.area) // Output: 78.53981633974483
    
    // circle.area = 100.0 // Compilation error
}

The `area` property is computed each time it's accessed, but it cannot be
directly set. The value changes if `radius` changes, but the property remains
read-only.

## val in Function Parameters

Function parameters in Kotlin are always immutable, similar to being declared
with `val`. You cannot reassign them within the function body.

FunctionVal.kt
  

package com.zetcode

fun greet(name: String) {
    // name = "Bob" // Compilation error
    println("Hello, $name!")
}

fun main() {

    greet("Alice") // Output: Hello, Alice!
}

The `name` parameter is immutable within the `greet` function. This prevents
accidental reassignment of parameters, which can lead to bugs in complex
functions.

## val with Lazy Initialization

The `by lazy` delegate can be used with `val` to implement lazy initialization.
The value is computed only when first accessed and then cached.

LazyVal.kt
  

package com.zetcode

fun main() {

    val lazyValue: String by lazy {
        println("Computed!")
        "Hello"
    }
    
    println(lazyValue) // Output: Computed! then Hello
    println(lazyValue) // Output: Hello (no recomputation)
}

The `lazyValue` is computed only when first accessed. Subsequent accesses return
the cached value. This is useful for expensive operations that might not be
needed.

## Best Practices for val

**Prefer val over var:** Use immutable variables by default to
make code more predictable.
**Use for constants:** Values that shouldn't change should be
declared with `val`.
**Consider lazy initialization:** For expensive computations,
use `by lazy` with `val`.
**Use in class properties:** Make properties immutable unless
they need to change.
**Combine with custom getters:** For derived values that should
be read-only.

## Source

[Kotlin Properties Documentation](https://kotlinlang.org/docs/properties.html)

This tutorial covered Kotlin's `val` keyword in depth, showing various ways to
declare and use immutable variables. We explored basic declarations, class
properties, custom getters, and lazy initialization. Proper use of immutability
can make your code safer and easier to reason about.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).