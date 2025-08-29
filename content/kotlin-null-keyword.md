+++
title = "Kotlin null Keyword"
date = 2025-08-29T20:02:43.937+01:00
draft = false
description = "Kotlin null keyword tutorial shows how to handle null values in Kotlin. Learn about null safety, safe calls, and elvis operator with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin null Keyword

last modified April 19, 2025

Kotlin's null safety system helps eliminate null reference exceptions. The
null keyword represents the absence of a value. This tutorial
explores null handling in Kotlin with practical examples.

## Basic Definitions

In Kotlin, types are non-nullable by default. To allow null values, you must
explicitly declare a type as nullable using ?. The null
keyword represents a null reference. Kotlin provides several operators to work
with null values safely.

## Nullable Types Declaration

To declare a variable that can hold null, append ? to its type. This
makes the type nullable. Without ?, the variable cannot hold null.

NullableTypes.kt
  

package com.zetcode

fun main() {

    var name: String = "Kotlin"
    // name = null // Compilation error
    
    var nullableName: String? = "Kotlin"
    nullableName = null // Valid
    
    println(nullableName) // Output: null
}

Here name cannot be null, while nullableName can. The
commented line would cause a compilation error. This demonstrates Kotlin's null
safety at compile time.

## Safe Calls Operator (?.)

The safe call operator ?. allows you to safely access properties or
methods of nullable objects. If the object is null, the expression returns null
instead of throwing an exception.

SafeCalls.kt
  

package com.zetcode

fun main() {

    val str: String? = null
    val length = str?.length
    
    println(length) // Output: null
    
    val str2: String? = "Hello"
    println(str2?.length) // Output: 5
}

The first safe call returns null because str is null. The second
call returns the length because str2 contains a string. This
prevents NullPointerException.

## Elvis Operator (?:)

The Elvis operator ?: provides a default value when a nullable
expression is null. It's similar to the ternary operator in other languages but
specifically for null checks.

ElvisOperator.kt
  

package com.zetcode

fun main() {

    val name: String? = null
    val length = name?.length ?: 0
    
    println(length) // Output: 0
    
    val name2: String? = "Kotlin"
    println(name2?.length ?: 0) // Output: 6
}

When name is null, the Elvis operator returns 0. When name2
has a value, it returns the string length. This provides a safe fallback for null
values.

## Not-null Assertion (!!)

The not-null assertion operator !! converts any value to a non-null
type. If the value is null, it throws a NullPointerException. Use this only when
you're certain the value isn't null.

NotNullAssertion.kt
  

package com.zetcode

fun main() {

    val str: String? = "Kotlin"
    println(str!!.length) // Output: 6
    
    val str2: String? = null
    // println(str2!!.length) // Throws NullPointerException
}

The first assertion succeeds because str isn't null. The commented
line would throw an exception because str2 is null. This operator
should be used sparingly.

## Safe Casts with as?

The safe cast operator as? attempts a cast and returns null if it
fails. This combines null safety with type casting, preventing
ClassCastException.

SafeCasts.kt
  

package com.zetcode

fun main() {

    val obj: Any = "Kotlin"
    val str: String? = obj as? String
    val num: Int? = obj as? Int
    
    println(str) // Output: Kotlin
    println(num) // Output: null
}

The first cast succeeds because obj is a String. The second fails
but returns null instead of throwing an exception. This is safer than regular
casting.

## let Function with Nullable

The let function executes a block only if the object isn't null. It's
useful for performing operations on nullable objects safely.

LetFunction.kt
  

package com.zetcode

fun main() {

    val name: String? = "Kotlin"
    
    name?.let {
        println("Name length is ${it.length}") // Output: Name length is 6
    }
    
    val nullName: String? = null
    nullName?.let {
        println("This won't be printed")
    }
}

The first let block executes because name isn't null.
The second block doesn't execute because nullName is null. This
pattern is common in Kotlin for null-safe operations.

## Late-initialized Properties

The lateinit modifier allows non-null properties to be initialized
later. This is useful when dependency injection or test setup provides the value.

LateInit.kt
  

package com.zetcode

class User {
    lateinit var name: String
    
    fun initialize() {
        name = "Kotlin"
    }
    
    fun printName() {
        if (::name.isInitialized) {
            println(name)
        }
    }
}

fun main() {

    val user = User()
    // println(user.name) // Throws UninitializedPropertyAccessException
    
    user.initialize()
    user.printName() // Output: Kotlin
}

The name property is declared without null but initialized later.
Accessing it before initialization throws an exception. The isInitialized
check verifies initialization status.

## Best Practices for Null Safety

**Prefer non-null types:** Design with non-null types when
possible to avoid null checks.
**Use safe calls:** Favor ?. over !!
for safer code.
**Provide defaults:** Use the Elvis operator to provide sensible
defaults for null values.
**Consider lateinit:** For properties initialized later, use
lateinit instead of nullable types.
**Leverage let:** Use let for null-safe scope
functions.

## Source

[Kotlin Null Safety Documentation](https://kotlinlang.org/docs/null-safety.html)

This tutorial covered Kotlin's null keyword and null safety features
in depth. We explored nullable types, safe calls, Elvis operator, and more. Proper
null handling makes Kotlin code more robust and less prone to runtime exceptions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).