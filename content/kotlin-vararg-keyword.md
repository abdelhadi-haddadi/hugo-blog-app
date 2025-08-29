+++
title = "Kotlin vararg Keyword"
date = 2025-08-29T20:02:59.799+01:00
draft = false
description = "Kotlin vararg keyword tutorial shows how to work with variable number of arguments in Kotlin. Learn about vararg parameters, spread operator, and array conversion with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin vararg Keyword

last modified April 19, 2025

Kotlin's vararg keyword allows functions to accept a variable number
of arguments of the same type. This tutorial explores the vararg
keyword in depth with practical examples.

## Basic Definitions

The vararg keyword in Kotlin stands for "variable arguments". It
enables a function to accept any number of arguments of a specified type. These
arguments are treated as an array within the function body.

## Basic vararg Function

The simplest use of vararg is to create a function that can accept
multiple arguments of the same type. Inside the function, these are available as
an array.

BasicVararg.kt
  

package com.zetcode

fun printNumbers(vararg numbers: Int) {
    for (number in numbers) {
        println(number)
    }
}

fun main() {
    printNumbers(1, 2, 3, 4, 5)
}

This example shows a function that accepts any number of Int arguments. The
vararg parameter numbers is treated as an Int array
inside the function. We can pass any number of integers when calling it.

## vararg with Other Parameters

A function can have regular parameters along with a vararg parameter.
The vararg parameter is typically the last one, unless followed by
lambda parameters.

MixedParameters.kt
  

package com.zetcode

fun greet(prefix: String, vararg names: String) {
    for (name in names) {
        println("$prefix $name")
    }
}

fun main() {
    greet("Hello", "John", "Jane", "Bob")
}

Here we have a function with a regular String parameter and a vararg
String parameter. The function prints each name with the prefix. Note how the
vararg parameter comes after the regular parameter.

## Spread Operator with vararg

When you have an array and want to pass its elements as individual arguments to a
vararg function, use the spread operator (*).

SpreadOperator.kt
  

package com.zetcode

fun sumNumbers(vararg numbers: Int): Int {
    return numbers.sum()
}

fun main() {
    val nums = intArrayOf(1, 2, 3, 4, 5)
    val total = sumNumbers(*nums)
    println(total) // Output: 15
}

This example demonstrates how to pass an array to a vararg function
using the spread operator. The *nums syntax unpacks the array into
individual elements that the function can process.

## Multiple vararg Parameters

A function can have only one vararg parameter. Attempting to declare
multiple vararg parameters will result in a compilation error.

MultipleVarargs.kt
  

package com.zetcode

// This won't compile - only one vararg parameter allowed
// fun invalid(vararg first: Int, vararg second: Int) {}

fun valid(vararg numbers: Int, message: String) {
    println("$message: ${numbers.joinToString()}")
}

fun main() {
    valid(1, 2, 3, message = "Numbers")
}

The commented function shows an invalid attempt to declare multiple
vararg parameters. The working example shows a valid function with
one vararg parameter and a regular named parameter.

## vararg with Different Types

While vararg parameters must be of the same type, you can use
Any to accept different types, though this is not type-safe.

AnyVararg.kt
  

package com.zetcode

fun printAll(vararg items: Any) {
    for (item in items) {
        println(item)
    }
}

fun main() {
    printAll("Hello", 42, 3.14, true)
}

This function accepts arguments of any type by using Any as the
vararg type. While flexible, this approach loses type safety and
should be used judiciously.

## vararg in Constructors

The vararg keyword can also be used in class constructors, allowing
objects to be created with variable arguments.

ConstructorVararg.kt
  

package com.zetcode

class ShoppingCart(vararg items: String) {
    private val cartItems = items.toList()
    
    fun showItems() {
        println("Cart contains: ${cartItems.joinToString()}")
    }
}

fun main() {
    val cart = ShoppingCart("Apple", "Banana", "Orange")
    cart.showItems()
}

This example demonstrates a class with a vararg constructor
parameter. The constructor accepts any number of String arguments, which are then
stored as a list in the class.

## vararg with Default Arguments

Kotlin allows combining vararg with default arguments, providing
flexibility in function calls.

DefaultVararg.kt
  

package com.zetcode

fun createGreeting(
    vararg names: String,
    greeting: String = "Hello"
) {
    for (name in names) {
        println("$greeting, $name!")
    }
}

fun main() {
    createGreeting("John", "Jane") // Uses default greeting
    createGreeting("Bob", greeting = "Hi") // Custom greeting
}

This function combines a vararg parameter with a default argument.
The first call uses the default greeting, while the second specifies a custom
greeting. Note the named parameter syntax for the greeting argument.

## Best Practices for vararg

**Position carefully:** Place vararg parameters
last or before lambda parameters.
**Use meaningful names:** Name your vararg
parameters clearly to indicate their purpose.
**Consider array conversion:** Remember vararg
parameters are arrays inside the function.
**Use spread operator:** Pass arrays to vararg
functions using the spread operator (*).
**Avoid overuse:** Don't use vararg when a fixed
number of parameters would be clearer.

## Source

[Kotlin vararg Documentation](https://kotlinlang.org/docs/functions.html#variable-number-of-arguments-varargs)

This tutorial covered Kotlin's vararg keyword in depth, showing how
to create flexible functions that accept variable numbers of arguments. We
explored various scenarios including mixing parameters, using the spread
operator, and applying vararg in constructors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).