+++
title = "Kotlin true Keyword"
date = 2025-08-29T20:02:57.603+01:00
draft = false
description = "Kotlin true keyword tutorial shows how to use boolean values in Kotlin. Learn about boolean logic, comparisons, and control flow with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin true Keyword

last modified April 19, 2025

Kotlin's boolean system provides fundamental true/false values for logical
operations. The true keyword represents the positive boolean value.
This tutorial explores the true keyword in depth with examples.

## Basic Definitions

The true keyword in Kotlin is one of two boolean literals (along
with false). It represents a true condition in boolean logic. These
values are used in control flow statements and logical operations.

## Simple Boolean Assignment

The most basic use of true is assigning it to a boolean variable.
This creates a variable that always evaluates to true unless changed.

SimpleBoolean.kt
  

package com.zetcode

fun main() {

    val isKotlinFun: Boolean = true
    
    if (isKotlinFun) {
        println("Kotlin is fun!") // Output: Kotlin is fun!
    }
}

Here we declare a boolean variable isKotlinFun and assign it the
value true. The if statement then checks this value and executes
the print statement since the condition is true.

## Boolean in Conditional Statements

The true value is fundamental in control flow statements like if,
while, and when. These statements evaluate boolean expressions to determine
execution paths.

Conditional.kt
  

package com.zetcode

fun main() {

    val shouldContinue = true
    
    while (shouldContinue) {
        println("Looping...")
        break // Prevent infinite loop
    }
}

This example shows a while loop that continues as long as shouldContinue
is true. We include a break statement to prevent an infinite loop in this
demonstration.

## Boolean Return Values

Functions often return boolean values to indicate success/failure or other binary
conditions. The true keyword is used to return a positive result.

ReturnBoolean.kt
  

package com.zetcode

fun isEven(number: Int): Boolean {
    return number % 2 == 0
}

fun main() {

    println(isEven(4)) // Output: true
    println(isEven(5)) // Output: false
}

The isEven function returns true when the input number
is even. This demonstrates how boolean return values can indicate specific
conditions in your program's logic.

## Boolean in Logical Operations

The true value participates in logical operations like AND, OR, and
NOT. These operations combine or invert boolean values to form complex conditions.

LogicalOps.kt
  

package com.zetcode

fun main() {

    val a = true
    val b = false
    
    println(a &amp;&amp; b) // Output: false (AND)
    println(a || b) // Output: true (OR)
    println(!a)     // Output: false (NOT)
}

This example demonstrates basic logical operations between true and
false values. The results follow standard boolean logic rules where
AND requires both operands to be true, OR requires either, and NOT inverts.

## Boolean in When Expressions

Kotlin's when expression can use boolean values directly as conditions. This
provides a clean way to handle multiple boolean-based cases.

WhenExpression.kt
  

package com.zetcode

fun describeBoolean(value: Boolean): String {
    return when (value) {
        true -&gt; "It's true!"
        false -&gt; "It's false!"
    }
}

fun main() {

    println(describeBoolean(true))  // Output: It's true!
    println(describeBoolean(false)) // Output: It's false!
}

The describeBoolean function uses a when expression to return
different strings based on the input boolean value. This pattern is common when
handling boolean flags in your code.

## Boolean Properties

In Kotlin, properties can be boolean values, often following an "is" naming
convention. These are commonly used to represent object states or features.

BooleanProperty.kt
  

package com.zetcode

class User(val name: String, val isAdmin: Boolean)

fun main() {

    val user1 = User("Alice", true)
    val user2 = User("Bob", false)
    
    if (user1.isAdmin) {
        println("${user1.name} is an admin") // Output: Alice is an admin
    }
}

The User class has a boolean property isAdmin that indicates admin
status. We can check this property in control flow statements to implement
role-based logic in applications.

## Boolean Default Values

In Kotlin, boolean properties and variables without explicit initialization
default to false. However, you can explicitly set them to
true when needed.

DefaultBoolean.kt
  

package com.zetcode

class FeatureToggle {
    var isEnabled = true // Default to enabled
}

fun main() {

    val toggle = FeatureToggle()
    println("Feature is enabled: ${toggle.isEnabled}") // Output: true
    
    toggle.isEnabled = false
    println("Feature is enabled: ${toggle.isEnabled}") // Output: false
}

This example shows a feature toggle that defaults to enabled (true).
We can then modify this value as needed during program execution. This pattern
is common in configuration systems.

## Best Practices for Boolean Logic

**Clear naming:** Use descriptive names like isActive
or hasPermission for boolean variables.
**Avoid negation:** Prefer positive names to avoid confusing
double negatives in logic.
**Use constants:** For frequently used boolean values, consider
using const val for better maintainability.
**Leverage expressions:** Many Kotlin constructs like if and
when are expressions that can return boolean values.
**Consider nullability:** Use Boolean? when a value
might be absent, but prefer non-null booleans when possible.

## Source

[Kotlin Booleans Documentation](https://kotlinlang.org/docs/basic-types.html#booleans)

This tutorial covered Kotlin's true keyword in depth, showing its
use in variables, control flow, functions, and logical operations. Understanding
boolean logic is fundamental to writing clear and effective Kotlin code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).