+++
title = "Kotlin as? Keyword"
date = 2025-08-29T20:02:25.094+01:00
draft = false
description = "Kotlin as? keyword tutorial shows how to perform safe type casting in Kotlin. Learn about safe casts with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin as? Keyword

last modified April 19, 2025

Kotlin's safe cast operator as? provides a null-safe way to perform
type conversions. Unlike the unsafe as operator, as?
returns null when the cast fails instead of throwing an exception. This tutorial
explores the as? keyword in depth with practical examples.

## Basic Definitions

The as? keyword in Kotlin is the safe cast operator. It attempts to
cast a value to a specified type, returning null if the cast isn't possible. This
is particularly useful when working with unknown or dynamic types.

Safe casting fits perfectly with Kotlin's null safety system. It prevents
ClassCastException by returning null for failed casts. The result
type is always nullable when using as?.

## Basic Safe Cast Example

This example demonstrates the fundamental usage of as? to safely
cast between types. The cast returns null when types are incompatible.

BasicSafeCast.kt
  

package com.zetcode

fun main() {

    val obj: Any = "Hello Kotlin"
    val str: String? = obj as? String
    val num: Int? = obj as? Int
    
    println(str) // Output: Hello Kotlin
    println(num) // Output: null
}

Here we first successfully cast to String since obj contains a string. The second
cast to Int fails and returns null. Both results are nullable types.

## Safe Cast with When Expression

The as? operator works well with Kotlin's when expression for type
handling. This pattern is useful for processing different types in a safe way.

WhenSafeCast.kt
  

package com.zetcode

fun processValue(value: Any) {
    when (val str = value as? String) {
        null -&gt; println("Not a string")
        else -&gt; println("String length: ${str.length}")
    }
}

fun main() {

    processValue("Kotlin") // Output: String length: 6
    processValue(42)       // Output: Not a string
}

The when expression checks if the safe cast to String succeeded. The null branch
handles failed casts, while the else branch works with the successfully cast
string. This is cleaner than manual null checks.

## Safe Cast in Class Hierarchy

as? can safely cast objects within a class hierarchy. This is
useful when working with polymorphic collections or APIs that return base types.

HierarchySafeCast.kt
  

package com.zetcode

open class Animal
class Dog : Animal() {
    fun bark() = "Woof!"
}
class Cat : Animal() {
    fun meow() = "Meow!"
}

fun main() {

    val animals: List&lt;Animal&gt; = listOf(Dog(), Cat(), Dog())
    
    animals.forEach { animal -&gt;
        (animal as? Dog)?.let {
            println(it.bark())
        }
    }
    // Output: Woof! Woof!
}

We safely cast each Animal to Dog using as?, then use ?.let
to only process Dogs. Cats are ignored since their cast to Dog returns null.
This safely handles mixed collections.

## Safe Cast with Collections

When working with collections of mixed types, as? helps safely
filter and process elements of specific types without risking exceptions.

CollectionSafeCast.kt
  

package com.zetcode

fun main() {

    val mixedList: List&lt;Any&gt; = listOf(1, "Two", 3.0, "Four", 5)
    
    val strings = mixedList.mapNotNull { it as? String }
    println(strings) // Output: [Two, Four]
    
    val numbers = mixedList.mapNotNull { it as? Int }
    println(numbers) // Output: [1, 5]
}

Using mapNotNull with as?, we safely extract elements
of specific types. Failed casts become null and are filtered out by mapNotNull.
This creates new collections containing only the successfully cast elements.

## Safe Cast with Generic Functions

Generic functions can leverage as? to safely attempt conversions to
type parameters. This is useful for creating flexible type-safe utilities.

GenericSafeCast.kt
  

package com.zetcode

fun &lt;T&gt; safeCastOrDefault(value: Any, defaultValue: T): T {
    return value as? T ?: defaultValue
}

fun main() {

    val str: String = safeCastOrDefault(123, "Default")
    println(str) // Output: Default
    
    val num: Int = safeCastOrDefault("456", 0)
    println(num) // Output: 0
    
    val success: String = safeCastOrDefault("Hello", "Default")
    println(success) // Output: Hello
}

This generic function attempts to cast the input to type T using as?.
If the cast fails, it returns the provided default value. The function works with
any type while maintaining type safety.

## Safe Cast with Sealed Classes

Sealed classes work particularly well with as? for exhaustive type
checking. This pattern is common in Kotlin for representing restricted class
hierarchies.

SealedSafeCast.kt
  

package com.zetcode

sealed class Result
class Success(val data: String) : Result()
class Error(val message: String) : Result()

fun handleResult(result: Result) {
    when {
        (result as? Success) != null -&gt; println("Success: ${result.data}")
        (result as? Error) != null -&gt; println("Error: ${result.message}")
    }
}

fun main() {

    handleResult(Success("Data loaded")) // Output: Success: Data loaded
    handleResult(Error("Network error")) // Output: Error: Network error
}

We use as? to safely check each sealed class subtype. The when
expression handles all possible cases without needing an else branch. This
approach is both safe and exhaustive for sealed hierarchies.

## Safe Cast with Interfaces

as? can check for interface implementation safely. This is useful
when working with objects that may optionally implement certain interfaces.

InterfaceSafeCast.kt
  

package com.zetcode

interface Loggable {
    fun log(): String
}

class User(val name: String) : Loggable {
    override fun log() = "User: $name"
}

class Product(val id: Int)

fun logIfPossible(obj: Any) {
    (obj as? Loggable)?.let {
        println(it.log())
    }
}

fun main() {

    logIfPossible(User("Alice")) // Output: User: Alice
    logIfPossible(Product(123))  // No output
}

The function safely checks if an object implements Loggable using as?.
Only Loggable objects are processed, others are safely ignored. This pattern is
cleaner than explicit interface checks.

## Best Practices for Safe Casting

**Prefer as? over as:** Use safe casts unless you're certain
about the type to avoid exceptions.
**Combine with null checks:** Use safe cast with Elvis operator
or let for null-safe processing.
**Consider alternatives:** For sealed classes, prefer when
expressions with type checks over casting.
**Document nullable results:** Clearly indicate when functions
may return null due to safe casting.
**Use with generics carefully:** Be mindful of type erasure
when using safe casts with generic types.

## Source

[Kotlin Type Casts Documentation](https://kotlinlang.org/docs/typecasts.html)

This tutorial covered Kotlin's as? keyword in depth, showing its
usage in various scenarios. Safe casting helps write robust code that gracefully
handles type mismatches. Combined with Kotlin's null safety, it prevents many
common runtime errors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).