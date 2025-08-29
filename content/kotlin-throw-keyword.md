+++
title = "Kotlin throw Keyword"
date = 2025-08-29T20:02:56.473+01:00
draft = false
description = "Kotlin throw keyword tutorial shows how to handle exceptions in Kotlin. Learn about throwing exceptions, custom exceptions, and exception handling with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin throw Keyword

last modified April 19, 2025

Kotlin's exception handling system allows explicit throwing of exceptions using
the throw keyword. This tutorial explores the throw
keyword in depth with practical examples.

## Basic Definitions

The throw keyword in Kotlin is used to explicitly throw exceptions.
When an exception is thrown, the normal flow of the program is interrupted. The
exception propagates up the call stack until it's caught by a try-catch block.

## Throwing Built-in Exceptions

The simplest use of throw is to throw standard Kotlin exceptions.
This example demonstrates throwing an IllegalArgumentException.

ThrowBuiltIn.kt
  

package com.zetcode

fun checkAge(age: Int) {
    if (age &lt; 0) {
        throw IllegalArgumentException("Age cannot be negative")
    }
    println("Age is valid: $age")
}

fun main() {
    try {
        checkAge(-5)
    } catch (e: IllegalArgumentException) {
        println(e.message) // Output: Age cannot be negative
    }
}

Here we throw an IllegalArgumentException when the age parameter is
negative. The exception is caught in the main function and its message is
printed. This shows basic exception throwing and handling.

## Creating Custom Exceptions

Kotlin allows creating custom exception classes by extending the Exception class.
This example shows how to define and throw a custom exception.

CustomException.kt
  

package com.zetcode

class InvalidEmailException(message: String) : Exception(message)

fun validateEmail(email: String) {
    if (!email.contains("@")) {
        throw InvalidEmailException("Invalid email format")
    }
    println("Email is valid: $email")
}

fun main() {
    try {
        validateEmail("user.example.com")
    } catch (e: InvalidEmailException) {
        println(e.message) // Output: Invalid email format
    }
}

We define a custom InvalidEmailException class that extends
Exception. The validateEmail function throws this exception when the
email doesn't contain '@'. Custom exceptions make error handling more specific.

## Throwing Exceptions in Expressions

Kotlin allows using throw as an expression. This enables throwing
exceptions in places where an expression is expected, like in Elvis operators.

ThrowExpression.kt
  

package com.zetcode

fun getLength(str: String?): Int {
    return str?.length ?: throw IllegalArgumentException("String cannot be null")
}

fun main() {
    try {
        println(getLength(null))
    } catch (e: IllegalArgumentException) {
        println(e.message) // Output: String cannot be null
    }
}

Here throw is used as part of an Elvis operator expression. If the
string is null, the exception is thrown. This pattern is common for null checks
in Kotlin.

## Rethrowing Exceptions

Sometimes you need to catch an exception, perform some action, and then rethrow
it. This example shows how to rethrow exceptions in Kotlin.

RethrowException.kt
  

package com.zetcode

fun processNumber(str: String) {
    try {
        val num = str.toInt()
        println("Processed number: $num")
    } catch (e: NumberFormatException) {
        println("Logging error: ${e.message}")
        throw e // Rethrow the exception
    }
}

fun main() {
    try {
        processNumber("abc")
    } catch (e: NumberFormatException) {
        println("Caught rethrown exception") // Output: Caught rethrown exception
    }
}

The processNumber function catches a NumberFormatException,
logs it, and then rethrows it. The main function catches the rethrown exception.
This pattern is useful for logging before propagating exceptions.

## Throwing Exceptions from Lambdas

Lambdas in Kotlin can throw exceptions just like regular functions. This example
shows exception throwing within a lambda expression.

LambdaException.kt
  

package com.zetcode

fun calculate(operation: (Int, Int) -&gt; Int, a: Int, b: Int): Int {
    return try {
        operation(a, b)
    } catch (e: ArithmeticException) {
        println("Calculation error: ${e.message}")
        -1
    }
}

fun main() {
    val result = calculate({ x, y -&gt;
        if (y == 0) throw ArithmeticException("Division by zero")
        x / y
    }, 10, 0)
    
    println(result) // Output: -1
}

The lambda passed to calculate throws an ArithmeticException
when division by zero is attempted. The exception is caught in the calculate
function. This shows how exceptions propagate from lambdas.

## Using throw with Nothing Type

In Kotlin, throw has the special type Nothing. This
means it can be used in places where any type is expected. The compiler knows
execution won't continue after a throw.

NothingType.kt
  

package com.zetcode

fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

fun getUser(id: Int): String {
    return if (id &gt; 0) {
        "User$id"
    } else {
        fail("Invalid user ID")
    }
}

fun main() {
    try {
        println(getUser(1)) // Output: User1
        println(getUser(-1)) // Throws exception
    } catch (e: IllegalArgumentException) {
        println(e.message) // Output: Invalid user ID
    }
}

The fail function returns Nothing, allowing it to be
used where a String is expected in getUser. The compiler knows the
else branch will throw an exception and won't return normally.

## Best Practices for Exception Handling

**Use exceptions for exceptional cases:** Don't use exceptions
for normal flow control.
**Prefer specific exceptions:** Throw the most specific
exception that fits the error condition.
**Provide meaningful messages:** Include helpful information in
exception messages.
**Document thrown exceptions:** Use Kotlin's documentation to
note which exceptions a function might throw.
**Consider alternatives:** For recoverable errors, consider
using sealed classes or result types instead of exceptions.

## Source

[Kotlin Exceptions Documentation](https://kotlinlang.org/docs/exceptions.html)

This tutorial covered Kotlin's throw keyword in depth, showing how
to throw built-in and custom exceptions. We explored various scenarios including
expression throws, rethrowing, and the Nothing type. Proper exception handling
makes your code more robust and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).