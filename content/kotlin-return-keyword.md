+++
title = "Kotlin return Keyword"
date = 2025-08-29T20:02:51.800+01:00
draft = false
description = "Kotlin return keyword tutorial shows how to use return in functions and lambdas. Learn about labeled returns, implicit returns, and control flow with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin return Keyword

last modified April 19, 2025

The return keyword in Kotlin is fundamental for controlling program
flow. It exits functions and lambda expressions, optionally returning a value.
This tutorial explores return in depth with practical examples.

## Basic Definitions

The return keyword terminates function execution and returns control
to the caller. In functions, it can return a value matching the declared return
type. In lambdas, it has special behavior with local and non-local returns.

## Basic Function Return

The simplest use of return exits a function and returns a value.
The returned value must match the function's declared return type.

BasicReturn.kt
  

package com.zetcode

fun add(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    val result = add(5, 7)
    println(result) // Output: 12
}

This example shows a basic function with an explicit return. The add
function takes two integers and returns their sum. The return
statement exits the function with the computed value.

## Implicit Return in Single-Expression Functions

Kotlin allows omitting the return keyword in single-expression
functions. The expression's result is automatically returned.

ImplicitReturn.kt
  

package com.zetcode

fun multiply(a: Int, b: Int): Int = a * b

fun main() {
    val product = multiply(4, 5)
    println(product) // Output: 20
}

Here, the multiply function uses single-expression syntax. The
result of a * b is automatically returned without needing an
explicit return statement. This makes code more concise.

## Early Return with Condition

The return statement can exit a function early based on a condition.
This is useful for validation checks or edge cases.

EarlyReturn.kt
  

package com.zetcode

fun divide(a: Int, b: Int): Int? {
    if (b == 0) return null
    return a / b
}

fun main() {
    println(divide(10, 2)) // Output: 5
    println(divide(10, 0)) // Output: null
}

This function checks for division by zero and returns early if detected. The
return type is nullable Int (Int?) to accommodate the null return
for invalid input. This pattern prevents further execution when conditions fail.

## Return from Lambda Expressions

In lambda expressions, return exits the enclosing function by
default (non-local return). To return just from the lambda, use a label.

LambdaReturn.kt
  

package com.zetcode

fun processNumbers(numbers: List&lt;Int&gt;, action: (Int) -&gt; Unit) {
    numbers.forEach(action)
}

fun main() {
    processNumbers(listOf(1, 2, 3, 4)) {
        if (it == 3) return@processNumbers // local return
        println(it)
    }
    // Output: 1 2 4
}

This demonstrates labeled return in a lambda. The return@processNumbers
exits only the lambda, not the entire function. Without the label, it would exit
main. Labels control return scope in nested contexts.

## Return with Nothing Type

Functions that never return normally (always throw exceptions) can declare
Nothing as their return type. This informs callers about the
behavior.

NothingReturn.kt
  

package com.zetcode

fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

fun main() {
    val input = readLine()
    val number = input?.toIntOrNull() ?: fail("Invalid input")
    println("Number is $number")
}

The fail function always throws an exception. Its Nothing
return type tells the compiler execution won't continue normally. This helps with
type inference and makes code intentions clearer.

## Return in Anonymous Functions

Anonymous functions behave like regular functions regarding return.
Returns exit the anonymous function itself, unlike in lambdas where they exit
the enclosing function.

AnonymousReturn.kt
  

package com.zetcode

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    
    numbers.forEach(fun(number) {
        if (number == 3) return // local to anonymous function
        println(number)
    })
    // Output: 1 2 4 5
}

Here, return exits only the anonymous function, not main.
This differs from lambda behavior. Anonymous functions provide more intuitive
return semantics in some cases compared to labeled returns in lambdas.

## Return with Value in Lambdas

Lambda expressions implicitly return their last expression's value. Explicit
return with value requires qualified syntax.

LambdaValueReturn.kt
  

package com.zetcode

fun transform(numbers: List&lt;Int&gt;, transform: (Int) -&gt; Int): List&lt;Int&gt; {
    return numbers.map(transform)
}

fun main() {
    val result = transform(listOf(1, 2, 3)) {
        if (it == 2) return@transform 20 // explicit return with value
        it * 10 // implicit return
    }
    println(result) // Output: [10, 20, 30]
}

This shows both implicit and explicit returns in a lambda. The value 20 is
returned explicitly when the condition matches. Otherwise, the lambda implicitly
returns it * 10. The labeled return provides the value to the
transformation.

## Best Practices for Using return

**Prefer implicit returns:** Use single-expression functions
when possible for cleaner code.
**Use early returns:** Validate inputs and edge cases first for
better code structure.
**Understand lambda returns:** Remember lambdas use non-local
returns by default; use labels when needed.
**Consider Nothing:** Mark functions that never return normally
with Nothing return type.
**Choose anonymous functions:** When lambda return behavior is
confusing, consider anonymous functions for more intuitive returns.

## Source

[Kotlin Returns and Jumps Documentation](https://kotlinlang.org/docs/returns.html)

This tutorial covered Kotlin's return keyword in depth, showing its
use in functions and lambdas. We explored various scenarios including early
returns, labeled returns, and special cases like Nothing. Proper
use of return makes control flow clear and code more maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).