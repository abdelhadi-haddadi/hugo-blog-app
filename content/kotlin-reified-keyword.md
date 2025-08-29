+++
title = "Kotlin reified Keyword"
date = 2025-08-29T20:02:51.786+01:00
draft = false
description = "Kotlin reified keyword tutorial shows how to preserve type information at runtime. Learn about reified type parameters with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin reified Keyword

last modified April 19, 2025

Kotlin's reified keyword solves Java's type erasure limitation in
generic functions. It preserves type information at runtime when used with inline
functions. This tutorial explores reified in depth with practical
examples.

## Basic Definitions

The reified keyword in Kotlin is used with type parameters of inline
functions. It makes the type information available at runtime, bypassing JVM's
type erasure. This enables type checks and casts that would otherwise be
impossible with generics.

## Simple reified Function

This basic example shows how to create a function with a reified type parameter.
The function can check the actual type at runtime.

SimpleReified.kt
  

package com.zetcode

inline fun &lt;reified T&gt; checkType(obj: Any) {
    if (obj is T) {
        println("Object is of type ${T::class.simpleName}")
    } else {
        println("Object is NOT of type ${T::class.simpleName}")
    }
}

fun main() {
    checkType&lt;String&gt;("Kotlin")  // Output: Object is of type String
    checkType&lt;Int&gt;("123")       // Output: Object is NOT of type Int
}

The checkType function uses a reified type parameter T. It can
perform an is check against T and access T's class information.
This wouldn't be possible without reified.

## Generic Type Checking

Reified parameters allow runtime type checking in generic functions. This
example demonstrates type-safe filtering of collections.

TypeCheck.kt
  

package com.zetcode

inline fun &lt;reified T&gt; filterByType(list: List&lt;Any&gt;): List&lt;T&gt; {
    return list.filter { it is T }.map { it as T }
}

fun main() {
    val mixedList = listOf(1, "Two", 3, "Four", 5.0)
    val strings = filterByType&lt;String&gt;(mixedList)
    
    println(strings) // Output: [Two, Four]
}

The filterByType function filters a list, keeping only elements of
type T. The reified parameter enables both the type check and safe cast. This
provides type-safe collection operations.

## Creating Instances of Generic Types

With reified types, you can create new instances of generic types at runtime.
This example shows how to implement a generic factory function.

InstanceCreation.kt
  

package com.zetcode

inline fun &lt;reified T : Any&gt; createInstance(): T {
    return T::class.constructors.first().call()
}

class Person(val name: String = "Unknown")

fun main() {
    val person = createInstance&lt;Person&gt;()
    println(person.name) // Output: Unknown
}

The createInstance function creates a new instance of type T using
reflection. The reified parameter provides access to T's class object. Note that
the class must have a parameterless constructor.

## JSON Parsing with reified

Reified types are particularly useful for JSON parsing. This example shows a
type-safe JSON deserializer.

JsonParser.kt
  

package com.zetcode

import com.google.gson.Gson

inline fun &lt;reified T&gt; fromJson(json: String): T {
    return Gson().fromJson(json, T::class.java)
}

data class User(val name: String, val age: Int)

fun main() {
    val json = """{"name":"Alice","age":30}"""
    val user = fromJson&lt;User&gt;(json)
    
    println(user) // Output: User(name=Alice, age=30)
}

The fromJson function uses Gson to deserialize JSON into a specified
type. The reified parameter provides the Class object needed by Gson. This
creates a type-safe JSON parsing utility.

## Dependency Injection with reified

Reified types simplify dependency injection by eliminating the need to pass Class
objects. This example demonstrates a simple DI container.

DependencyInjection.kt
  

package com.zetcode

class ServiceLocator {
    private val services = mutableMapOf&lt;Class&lt;*&gt;, Any&gt;()
    
    fun &lt;T : Any&gt; register(service: T) {
        services[service::class.java] = service
    }
    
    inline fun &lt;reified T : Any&gt; resolve(): T {
        return services[T::class.java] as T
    }
}

interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) = println(message)
}

fun main() {
    val locator = ServiceLocator()
    locator.register(ConsoleLogger())
    
    val logger = locator.resolve&lt;Logger&gt;()
    logger.log("Hello DI!") // Output: Hello DI!
}

The resolve function uses a reified type parameter to look up
services. This eliminates the need to pass Class objects while maintaining
type safety. The API becomes cleaner and more intuitive.

## Android Intent Extensions

In Android development, reified types simplify intent handling. This example
shows a type-safe way to start activities.

AndroidIntent.kt
  

package com.zetcode

import android.content.Context
import android.content.Intent

inline fun &lt;reified T : Any&gt; Context.startActivity() {
    startActivity(Intent(this, T::class.java))
}

// Example Activity class
class MainActivity : AppCompatActivity()

// Usage in another Activity:
// startActivity&lt;MainActivity&gt;()

The startActivity extension function uses a reified type parameter
to create an Intent. This replaces the verbose Intent(this,
MainActivity::class.java) pattern. The code becomes more concise and
type-safe.

## Type-Safe Adapter Pattern

Reified types enable type-safe adapter implementations. This example shows a
generic adapter for different data types.

AdapterPattern.kt
  

package com.zetcode

interface Adapter&lt;T&gt; {
    fun adapt(data: String): T
}

inline fun &lt;reified T&gt; getAdapter(): Adapter&lt;T&gt; {
    return when (T::class) {
        Int::class -&gt; object : Adapter&lt;Int&gt; {
            override fun adapt(data: String) = data.toInt()
        }
        String::class -&gt; object : Adapter&lt;String&gt; {
            override fun adapt(data: String) = data
        }
        else -&gt; throw IllegalArgumentException("No adapter for ${T::class}")
    }
}

fun main() {
    val intAdapter = getAdapter&lt;Int&gt;()
    println(intAdapter.adapt("123")) // Output: 123
    
    val stringAdapter = getAdapter&lt;String&gt;()
    println(stringAdapter.adapt("Hello")) // Output: Hello
}

The getAdapter function returns an appropriate adapter based on the
reified type parameter. This creates a type-safe factory pattern without
requiring explicit type tokens. The adapters are resolved at compile time.

## Best Practices for reified

**Use with inline functions:** reified only works with inline
functions as the type information is preserved at compile time.
**Limit scope:** Only use reified when you truly need runtime
type information to avoid unnecessary function inlining.
**Combine with generics:** reified shines when working with
generic types that would otherwise suffer from type erasure.
**Consider performance:** Inlining large functions with reified
types may increase code size.
**Use for type-safe APIs:** reified enables cleaner, type-safe
APIs for JSON parsing, DI, and other patterns.

## Source

[Kotlin reified Type Parameters Documentation](https://kotlinlang.org/docs/inline-functions.html#reified-type-parameters)

This tutorial covered Kotlin's reified keyword in depth, showing how
it solves type erasure problems. We explored practical examples including JSON
parsing, dependency injection, and Android development. Proper use of reified
types can make your generic code more type-safe and expressive.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).