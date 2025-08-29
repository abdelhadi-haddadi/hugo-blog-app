+++
title = "Kotlin typealias Keyword"
date = 2025-08-29T20:02:57.587+01:00
draft = false
description = "Kotlin typealias tutorial shows how to create type aliases in Kotlin. Learn to simplify complex types and improve code readability with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin typealias Keyword

last modified April 19, 2025

Kotlin's typealias keyword allows creating alternative names for
existing types. This feature improves code readability and simplifies complex
type declarations. This tutorial explores typealias in depth with
practical examples.

## Basic Definitions

A typealias provides an alternative name for an existing type. It
doesn't create a new type but makes code more readable. Type aliases are
particularly useful for complex generic types or function types.

## Basic Type Alias

The simplest use of typealias is to create a shorter name for an
existing type. This can make code more readable without changing its behavior.

BasicAlias.kt
  

package com.zetcode

typealias Name = String

fun main() {

    val firstName: Name = "John"
    val lastName: String = "Doe"
    
    println("$firstName $lastName") // Output: John Doe
}

Here we create a Name alias for String. Both
Name and String can be used interchangeably. The alias
makes the code more expressive about its intent.

## Function Type Alias

typealias is particularly useful for simplifying function type
declarations. Complex function signatures can be given more meaningful names.

FunctionAlias.kt
  

package com.zetcode

typealias StringMapper = (String) -&gt; String

fun processString(input: String, mapper: StringMapper): String {
    return mapper(input)
}

fun main() {

    val upperCaseMapper: StringMapper = { it.toUpperCase() }
    val result = processString("hello", upperCaseMapper)
    
    println(result) // Output: HELLO
}

We define StringMapper as an alias for a function type. This makes
the processString function signature cleaner. The alias clearly
indicates the purpose of the function parameter.

## Generic Type Alias

Type aliases can be used with generic types to simplify complex declarations.
This is especially helpful when working with collections or nested generics.

GenericAlias.kt
  

package com.zetcode

typealias UserMap = Map&lt;String, List&lt;Pair&lt;Int, String&gt;&gt;&gt;

fun processUsers(users: UserMap) {
    users.forEach { (name, details) -&gt;
        println("$name: $details")
    }
}

fun main() {

    val users: UserMap = mapOf(
        "John" to listOf(1 to "Admin", 2 to "Editor"),
        "Jane" to listOf(3 to "Viewer")
    )
    
    processUsers(users)
}

The UserMap alias simplifies a complex nested generic type. The
processUsers function becomes more readable. The alias hides the
complexity while maintaining type safety.

## Class and Interface Aliases

Type aliases can be used to provide alternative names for classes and interfaces.
This can be helpful when working with similar types from different libraries.

ClassAlias.kt
  

package com.zetcode

class OriginalClassName(val value: Int) {
    fun display() = println("Value: $value")
}

typealias AliasName = OriginalClassName

fun main() {

    val obj1 = OriginalClassName(10)
    val obj2: AliasName = AliasName(20)
    
    obj1.display() // Output: Value: 10
    obj2.display() // Output: Value: 20
}

Here AliasName becomes an alternative name for
OriginalClassName. Both can be used interchangeably. This is useful
when you want to provide more context-specific names.

## Nullable Type Alias

Type aliases can include nullability. This allows you to create meaningful names
for nullable types throughout your codebase.

NullableAlias.kt
  

package com.zetcode

typealias OptionalString = String?

fun printOptional(value: OptionalString) {
    println(value ?: "No value provided")
}

fun main() {

    val name: OptionalString = "Kotlin"
    val empty: OptionalString = null
    
    printOptional(name) // Output: Kotlin
    printOptional(empty) // Output: No value provided
}

The OptionalString alias clearly indicates a nullable String. The
printOptional function handles both cases. This makes the code's
intent clearer than using String? directly.

## Type Alias for Complex Types

Type aliases can simplify complex type combinations, making them easier to work
with and understand. This is particularly useful for nested types.

ComplexAlias.kt
  

package com.zetcode

typealias Matrix = Array&lt;Array&lt;Int&gt;&gt;
typealias MatrixOperation = (Matrix, Matrix) -&gt; Matrix

fun addMatrices(a: Matrix, b: Matrix): Matrix {
    return Array(a.size) { i -&gt;
        Array(a[i].size) { j -&gt;
            a[i][j] + b[i][j]
        }
    }
}

fun main() {

    val matrix1: Matrix = arrayOf(
        arrayOf(1, 2),
        arrayOf(3, 4)
    )
    
    val matrix2: Matrix = arrayOf(
        arrayOf(5, 6),
        arrayOf(7, 8)
    )
    
    val operation: MatrixOperation = ::addMatrices
    val result = operation(matrix1, matrix2)
    
    println(result.contentDeepToString()) // Output: [[6, 8], [10, 12]]
}

Here we create aliases for a matrix type and matrix operations. The
addMatrices function becomes more readable. The aliases make the
code's mathematical intent clearer.

## Type Alias with Generics and Constraints

Type aliases can include generic parameters and constraints. This allows creating
flexible yet type-safe abstractions for complex type relationships.

ConstrainedAlias.kt
  

package com.zetcode

interface Identifiable {
    val id: Int
}

typealias IdMap&lt;T&gt; = Map&lt;Int, T&gt; where T : Identifiable

fun &lt;T : Identifiable&gt; printIds(items: IdMap&lt;T&gt;) {
    items.forEach { (key, value) -&gt;
        println("Key: $key, Value ID: ${value.id}")
    }
}

data class User(override val id: Int, val name: String) : Identifiable

fun main() {

    val users: IdMap&lt;User&gt; = mapOf(
        1 to User(101, "Alice"),
        2 to User(102, "Bob")
    )
    
    printIds(users)
}

The IdMap alias defines a map where values must implement
Identifiable. The printIds function works with any
IdMap. This combines generic flexibility with type safety.

## Best Practices for Type Aliases

**Improve readability:** Use aliases to make complex types more
understandable.
**Be consistent:** Use the same alias throughout your codebase
for the same type.
**Don't overuse:** Only create aliases when they provide clear
benefits.
**Document purpose:** Add comments explaining why an alias
exists if it's not obvious.
**Consider scope:** Define aliases at the appropriate level
(package, file, or local).

## Source

[Kotlin Type Aliases Documentation](https://kotlinlang.org/docs/type-aliases.html)

This tutorial covered Kotlin's typealias keyword in depth. We
explored various use cases from simple type renaming to complex generic
scenarios. Proper use of type aliases can significantly improve code readability
and maintainability.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).