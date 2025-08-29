+++
title = "Kotlin Try/Catch/Finally"
date = 2025-08-29T20:02:57.599+01:00
draft = false
description = "Kotlin try/catch/finally tutorial shows how to handle exceptions in Kotlin. Learn about basic exception handling, multiple catch blocks, and finally with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Try/Catch/Finally

last modified April 19, 2025

Kotlin's exception handling mechanism provides robust ways to deal with errors.
The try/catch/finally keywords form the core of exception handling.
This tutorial explores these keywords in depth with practical examples.

## Basic Definitions

The try block contains code that might throw exceptions. The
catch block handles specific exceptions. The finally
block executes regardless of whether an exception occurred. Together they
provide comprehensive error handling.

## Basic Try/Catch

The simplest form uses try with a single catch block. This catches exceptions
of a specific type. The example demonstrates handling a NumberFormatException.

BasicTryCatch.kt
  

package com.zetcode

fun main() {

    try {
        val num = "abc".toInt()
    } catch (e: NumberFormatException) {
        println("Cannot convert to number: ${e.message}")
    }
}

Here we attempt to convert a non-numeric string to an integer. This throws a
NumberFormatException which we catch and handle. The catch block prints an
error message with details from the exception.

## Handling Multiple Exceptions in Kotlin

In Kotlin, multiple catch blocks allow you to handle specific types of
exceptions effectively. This is especially useful in applications where
different operations might throw diverse exceptions. Consider an example where a
program reads data from a file and processes it. During this workflow, there
could be scenarios such as file not found errors or arithmetic errors during
data calculations. Using multiple catch blocks ensures that each error is
handled appropriately.

MultipleCatchExample.kt
  

package com.example.multiplecatch

import java.io.File

fun main() {

    try {
        // Attempting to read a file that might not exist
        val fileContent = File("data.txt").readText()
        println("File content: $fileContent")

        // Performing a calculation that might lead to division by zero
        val numbers = fileContent.split(",").map { it.toInt() }
        val result = numbers[0] / numbers[1]
        println("Calculation result: $result")
    } catch (e: java.io.FileNotFoundException) {
        println("Error: The specified file could not be found.")
    } catch (e: ArithmeticException) {
        println("Error: Division by zero is not permitted.")
    } catch (e: Exception) {
        println("Error: An unexpected exception occurred.")
    }
}

In the code above, we demonstrate two distinct exception-handling scenarios:

First, a java.io.FileNotFoundException might occur when attempting
to read a file that does not exist. This catch block ensures that the program
can gracefully inform the user without crashing. Second, an
ArithmeticException might be triggered during division operations
if the divisor is zero. Catching this exception allows the program to address
mathematical errors and continue running. 

Lastly, a general catch block ensures that any other unforeseen exceptions are
managed effectively. By using specific catch blocks, developers can provide
clear and meaningful feedback for individual error types, while the general
catch block acts as a safety net for unexpected issues.

## Finally Block

The finally block executes whether an exception occurs or not. It's typically
used for cleanup operations. This example shows finally with file operations.

FinallyBlock.kt
  

package com.zetcode

import java.io.File

fun main() {

    val file = File("nonexistent.txt")
    try {
        val contents = file.readText()
        println(contents)
    } catch (e: Exception) {
        println("Error reading file: ${e.message}")
    } finally {
        println("Cleanup operations complete")
    }
}

The code attempts to read a non-existent file, causing an exception. The catch
block handles the error. The finally block executes regardless, performing
cleanup. This ensures resources are properly released.

## Try as an Expression

In Kotlin, try can be used as an expression that returns a value. The last
expression in either try or catch becomes the return value. This example
demonstrates this feature.

TryExpression.kt
  

package com.zetcode

fun parseNumber(str: String): Int? {
    return try {
        str.toInt()
    } catch (e: NumberFormatException) {
        null
    }
}

fun main() {

    val num1 = parseNumber("123")
    val num2 = parseNumber("abc")
    
    println(num1) // Output: 123
    println(num2) // Output: null
}

The parseNumber function uses try as an expression. On success it returns the
parsed integer. On failure it returns null. This pattern is common for safe
parsing operations in Kotlin.

## Nested Try/Catch

Try blocks can be nested to handle exceptions at different levels. Inner catch
blocks handle specific exceptions first. Outer blocks handle more general cases.

NestedTry.kt
  

package com.zetcode

fun main() {

    try {
        try {
            val num = "abc".toInt()
        } catch (e: NumberFormatException) {
            println("Inner catch: Number format error")
            throw e // Re-throw the exception
        }
    } catch (e: Exception) {
        println("Outer catch: General error")
    }
}

The inner try attempts a string conversion that fails. The inner catch handles
the NumberFormatException and re-throws it. The outer catch then handles the
re-thrown exception. This shows exception propagation.

## Custom Exceptions

You can define and throw custom exceptions in Kotlin. Custom exceptions should
extend the Exception class. This example shows a custom validation exception.

CustomException.kt
  

package com.zetcode

class ValidationException(message: String) : Exception(message)

fun validateAge(age: Int) {
    if (age &lt; 0) {
        throw ValidationException("Age cannot be negative")
    }
}

fun main() {

    try {
        validateAge(-5)
    } catch (e: ValidationException) {
        println("Validation failed: ${e.message}")
    }
}

We define a ValidationException class extending
Exception. The validateAge function throws this exception for
negative ages. The main function catches and handles the custom exception
appropriately.

## Try With Resources

Kotlin doesn't have try-with-resources like Java, but the use
function provides similar functionality. It automatically closes resources after
execution. This example demonstrates file handling with use.

TryWithResources.kt
  

package com.zetcode

import java.io.File

fun main() {

    try {
        File("example.txt").bufferedReader().use { reader -&gt;
            println(reader.readText())
        }
    } catch (e: Exception) {
        println("Error reading file: ${e.message}")
    }
}

The use function ensures the BufferedReader is closed
automatically. The file contents are read within the lambda. Any exceptions are
caught in the outer try block. This is Kotlin's idiomatic resource management
approach.

## Best Practices for Exception Handling

**Be specific:** Catch specific exceptions rather than general
Exception class when possible.
**Don't ignore exceptions:** At least log exceptions even if
you can't handle them.
**Use finally for cleanup:** Ensure resources are released in
finally blocks.
**Consider alternatives:** For expected conditions, consider
using null or sealed classes instead of exceptions.
**Document exceptions:** Document which exceptions your
functions can throw using @Throws annotation.

## Source

[Kotlin Exceptions Documentation](https://kotlinlang.org/docs/exceptions.html)

This tutorial covered Kotlin's try/catch/finally keywords in depth.
We explored basic usage, multiple catch blocks, finally, and custom exceptions.
Proper exception handling makes your code more robust and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).