+++
title = "Kotlin it Keyword"
date = 2025-08-29T20:02:40.590+01:00
draft = false
description = "Kotlin it keyword tutorial shows how to use the implicit single parameter in Kotlin lambdas. Learn about lambda expressions and shorthand syntax with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin it Keyword

last modified April 19, 2025

Kotlin's lambda expressions provide a concise way to write anonymous functions.
The it keyword is a special implicit name for single parameter
lambdas. This tutorial explores the it keyword in depth with
practical examples.

## Basic Definitions

The it keyword in Kotlin is an implicit name for a single parameter
in lambda expressions. When a lambda has one parameter, you can omit the
parameter declaration and use it instead. This makes code more
concise.

## Basic it Usage

The simplest use of it is in single-parameter lambdas. Instead of
declaring a parameter, you can reference it directly with it.

BasicIt.kt
  

package com.zetcode

fun main() {

    val numbers = listOf(1, 2, 3, 4, 5)
    
    // Without it
    val squares1 = numbers.map { num -&gt; num * num }
    
    // With it
    val squares2 = numbers.map { it * it }
    
    println(squares1) // Output: [1, 4, 9, 16, 25]
    println(squares2) // Output: [1, 4, 9, 16, 25]
}

Here we transform a list of numbers using map. The first version
explicitly names the parameter, while the second uses it. Both
produce identical results, but the it version is more concise.

## it with Filter Operations

The it keyword is commonly used with filtering operations like
filter, filterNot, and first.

FilterIt.kt
  

package com.zetcode

fun main() {

    val names = listOf("Alice", "Bob", "Charlie", "David")
    
    val longNames = names.filter { it.length &gt; 4 }
    val startsWithC = names.first { it.startsWith("C") }
    
    println(longNames)  // Output: [Alice, Charlie, David]
    println(startsWithC) // Output: Charlie
}

This example filters names based on length and starting letter. The it
keyword refers to each name in the list. The code is more readable without
explicit parameter declarations.

## it with Collections

When working with collections, it often represents collection
elements. It's particularly useful with operations like forEach.

CollectionIt.kt
  

package com.zetcode

fun main() {

    val fruits = listOf("apple", "banana", "cherry")
    
    fruits.forEach { 
        println("I like $it") 
    }
    
    // Output:
    // I like apple
    // I like banana
    // I like cherry
}

Here it represents each fruit in the list during iteration. The
forEach operation prints a message for each element. The
it keyword makes the lambda more compact.

## it with Scope Functions

Kotlin's scope functions like let, run, and
also often use it as the context object.

ScopeIt.kt
  

package com.zetcode

fun main() {

    val message: String? = "Hello Kotlin"
    
    message?.let {
        println(it.uppercase()) // Output: HELLO KOTLIN
    }
    
    val numbers = mutableListOf(1, 2, 3).also {
        it.add(4)
        it.remove(2)
    }
    
    println(numbers) // Output: [1, 3, 4]
}

The let function uses it to refer to the nullable
message. The also function uses it to modify the list.
In both cases, it provides access to the context object.

## it with Custom Functions

You can use it with any function that takes a single-parameter
lambda. This includes your own custom higher-order functions.

CustomIt.kt
  

package com.zetcode

fun processNumber(number: Int, operation: (Int) -&gt; Int): Int {
    return operation(number)
}

fun main() {

    val result1 = processNumber(5) { it * 2 }
    val result2 = processNumber(10) { it + 3 }
    
    println(result1) // Output: 10
    println(result2) // Output: 13
}

Here we define a function that processes a number with a given operation. The
lambda passed to processNumber uses it to refer to
the number parameter. This makes the function calls more concise.

## it Limitations

While it is convenient, it has limitations. Nested lambdas with
it can become confusing, and it's not suitable for multi-parameter
lambdas.

Limitations.kt
  

package com.zetcode

fun main() {

    val pairs = listOf(1 to "one", 2 to "two")
    
    // Works but confusing
    pairs.forEach { 
        println("${it.first} is ${it.second}") 
    }
    
    // Clearer with named parameters
    pairs.forEach { (num, name) -&gt;
        println("$num is $name")
    }
}

When working with pairs or complex data, named parameters are often clearer than
it. The first version uses it to access pair
properties, while the second uses destructuring for better readability.

## it with Extension Functions

Extension functions that take lambdas can also benefit from it when
the lambda has a single parameter.

ExtensionIt.kt
  

package com.zetcode

fun String.transform(operation: (Char) -&gt; Char): String {
    return this.map(operation).joinToString("")
}

fun main() {

    val result = "hello".transform { 
        if (it == 'l') 'x' else it 
    }
    
    println(result) // Output: hexxo
}

This extension function transforms each character in a string. The lambda uses
it to refer to each character. The function replaces all 'l'
characters with 'x' while keeping others unchanged.

## Best Practices for it Keyword

**Use for simple lambdas:** it is ideal for short,
single-parameter lambdas where the meaning is clear.
**Avoid in nested lambdas:** When nesting lambdas, prefer named
parameters to avoid confusion.
**Consider readability:** If it makes code harder
to understand, use explicit parameter names.
**Not for multi-parameters:** it only works with
single-parameter lambdas.
**Combine with scope functions:** it works well
with Kotlin's standard scope functions.

## Source

[Kotlin Lambdas Documentation](https://kotlinlang.org/docs/lambdas.html#it-implicit-name-of-a-single-parameter)

This tutorial covered Kotlin's it keyword in depth, showing its use
in various contexts including collections, scope functions, and custom operations.
The it keyword makes code more concise but should be used judiciously
for maximum readability.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).