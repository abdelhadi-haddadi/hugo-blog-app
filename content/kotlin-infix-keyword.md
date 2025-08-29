+++
title = "Kotlin infix Keyword"
date = 2025-08-29T20:02:38.361+01:00
draft = false
description = "Kotlin infix keyword tutorial shows how to create and use infix functions in Kotlin. Learn about infix notation with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin infix Keyword

last modified April 19, 2025

Kotlin's infix notation allows calling functions without the dot and parentheses.
The infix keyword enables this cleaner syntax for certain functions.
This tutorial explores the infix keyword in depth with examples.

## Basic Definitions

The infix keyword in Kotlin marks a function as being callable in
infix notation. An infix function must be a member function or extension function.
It must have exactly one parameter and cannot have default values.

## Basic Infix Function

This example demonstrates creating and using a simple infix function. The infix
notation makes the code more readable in certain cases.

BasicInfix.kt
  

package com.zetcode

class Person(val name: String) {
    infix fun says(message: String) {
        println("$name says: $message")
    }
}

fun main() {
    val p = Person("John")
    
    // Regular call
    p.says("Hello")
    
    // Infix call
    p says "Hi"
}

Here we define an infix function says in the Person class. We can
call it both ways: traditionally with dot notation or using infix notation. The
infix version reads more naturally in English.

## Infix Extension Function

Infix functions can also be extension functions. This allows adding infix
operations to existing classes without modifying them.

ExtensionInfix.kt
  

package com.zetcode

infix fun Int.add(x: Int): Int = this + x

fun main() {
    val sum1 = 5.add(3) // Regular call
    val sum2 = 5 add 3  // Infix call
    
    println(sum1) // Output: 8
    println(sum2) // Output: 8
}

This example adds an infix extension function to Int. The function performs
addition but demonstrates how to create infix operations. Both call styles
produce the same result.

## Infix for Custom DSLs

Infix notation is particularly useful for creating Domain-Specific Languages
(DSLs). It helps make the code read more like natural language.

DslInfix.kt
  

package com.zetcode

class Recipe {
    infix fun add(ingredient: String) {
        println("Adding $ingredient")
    }
}

fun main() {
    val recipe = Recipe()
    
    recipe add "flour"
    recipe add "sugar"
    recipe add "eggs"
}

This simple DSL for recipes uses infix notation to make the code read like
cooking instructions. Each line clearly states what ingredient is being added to
the recipe.

## Infix with Operator Overloading

Infix functions can be combined with operator overloading to create expressive
APIs. This example shows a custom vector addition operation.

OperatorInfix.kt
  

package com.zetcode

data class Vector(val x: Int, val y: Int) {
    infix fun plus(other: Vector): Vector {
        return Vector(x + other.x, y + other.y)
    }
}

fun main() {
    val v1 = Vector(1, 2)
    val v2 = Vector(3, 4)
    
    val v3 = v1 plus v2
    
    println(v3) // Output: Vector(x=4, y=6)
}

Here we define an infix plus function for Vector addition. The infix
notation makes the vector addition operation read naturally. The result is a new
Vector with summed components.

## Infix for Range Creation

Kotlin's standard library uses infix functions for range creation. The to
function is a well-known example of infix notation.

RangeInfix.kt
  

package com.zetcode

fun main() {
    // Regular call
    val range1 = 1.rangeTo(5)
    
    // Infix call
    val range2 = 1..5
    val range3 = 1 to 5
    
    println(range1.toList()) // Output: [1, 2, 3, 4, 5]
    println(range2.toList()) // Output: [1, 2, 3, 4, 5]
    println(range3)         // Output: (1, 5)
}

This shows different ways to create ranges in Kotlin. The to infix
function creates a Pair, while .. creates a range. Both use infix
notation for cleaner syntax.

## Infix for Boolean Operations

Infix functions work well for boolean operations, making conditions more readable.
This example creates custom logical operations.

BooleanInfix.kt
  

package com.zetcode

infix fun Boolean.and(other: Boolean): Boolean = this &amp;&amp; other
infix fun Boolean.or(other: Boolean): Boolean = this || other

fun main() {
    val a = true
    val b = false
    
    val result1 = a and b
    val result2 = a or b
    
    println(result1) // Output: false
    println(result2) // Output: true
}

We define custom and and or infix functions for Boolean.
While Kotlin already has these operators, this demonstrates how to create similar
operations. The infix notation makes the logic clear.

## Infix for Mathematical Operations

Infix notation can make mathematical operations more readable, especially for
custom number types or complex calculations.

MathInfix.kt
  

package com.zetcode

data class Complex(val real: Double, val imag: Double) {
    infix fun plus(other: Complex): Complex {
        return Complex(real + other.real, imag + other.imag)
    }
}

fun main() {
    val c1 = Complex(1.0, 2.0)
    val c2 = Complex(3.0, 4.0)
    
    val sum = c1 plus c2
    
    println(sum) // Output: Complex(real=4.0, imag=6.0)
}

This example shows complex number addition using infix notation. The plus
function adds the real and imaginary components separately. The infix call makes
the operation visually clear.

## Best Practices for Infix Functions

**Use for readability:** Only use infix notation when it improves
code readability in the specific context.
**Follow naming conventions:** Name infix functions to read
naturally in the infix form (like mathematical operations).
**Limit usage:** Don't overuse infix functions as they can make
code less clear in some cases.
**Consider precedence:** Remember infix functions have higher
precedence than boolean operators but lower than arithmetic operators.
**Document behavior:** Clearly document any non-obvious behavior
of custom infix operations.

## Source

[Kotlin Infix Functions Documentation](https://kotlinlang.org/docs/functions.html#infix-notation)

This tutorial covered Kotlin's infix keyword in depth, showing how
to create and use infix functions. We explored various scenarios including DSLs,
mathematical operations, and boolean logic. Proper use of infix notation can make
your code more expressive and readable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).