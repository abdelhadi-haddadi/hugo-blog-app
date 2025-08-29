+++
title = "Kotlin typeof Keyword"
date = 2025-08-29T20:02:58.699+01:00
draft = false
description = "Kotlin typeof keyword tutorial shows how to perform type checking in Kotlin. Learn about runtime type checking and reflection with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin typeof Keyword

last modified April 19, 2025

Kotlin's type checking system provides powerful tools for runtime type
inspection. The typeof functionality is key for reflection and
type-related operations. This tutorial explores type checking in depth with
practical examples.

## Basic Definitions

Kotlin doesn't have a direct typeof keyword like some languages.
Instead, it uses ::class for type references and is
for type checks. These provide similar functionality to typeof in other
languages.

## Getting Type with ::class

The ::class syntax gets the KClass object representing a type. This
is Kotlin's equivalent to typeof operations in other languages.

GetType.kt
  

package com.zetcode

fun main() {

    val str = "Hello Kotlin"
    val type = str::class
    
    println("Type: ${type.simpleName}") // Output: Type: String
    println("Qualified name: ${type.qualifiedName}") // Output: kotlin.String
}

Here we get the KClass object for a String using ::class. We then
print the simple and qualified names of the type. This shows basic type
introspection.

## Checking Type with is

The is operator checks if an object is of a specific type. It's
Kotlin's primary way to perform runtime type checking.

TypeCheck.kt
  

package com.zetcode

fun checkType(obj: Any) {
    when (obj) {
        is String -&gt; println("It's a String: ${obj.length} chars")
        is Int -&gt; println("It's an Int: ${obj + 10}")
        else -&gt; println("Unknown type")
    }
}

fun main() {

    checkType("Kotlin") // Output: It's a String: 6 chars
    checkType(42) // Output: It's an Int: 52
    checkType(3.14) // Output: Unknown type
}

This example demonstrates type checking with is in a when expression.
Each branch handles a different type, showing Kotlin's smart cast capability.

## Java Class vs Kotlin KClass

Kotlin distinguishes between Java's Class and Kotlin's KClass. You can convert
between them using .java and .kotlin properties.

JavaKotlinClass.kt
  

package com.zetcode

fun main() {

    val kClass = String::class
    val jClass = kClass.java
    
    println("Kotlin class: $kClass")
    println("Java class: $jClass")
    
    val backToKClass = jClass.kotlin
    println("Back to KClass: $backToKClass")
}

This shows the relationship between Kotlin's KClass and Java's Class. We convert
between them while maintaining the same type information. This is useful for
interoperability.

## Type Checking in Generics

With generics, type checking becomes more complex due to type erasure. Reified
type parameters can help maintain type information at runtime.

GenericTypeCheck.kt
  

package com.zetcode

inline fun &lt;reified T&gt; checkType(obj: Any) {
    if (obj is T) {
        println("Object is of type ${T::class.simpleName}")
    } else {
        println("Object is NOT of type ${T::class.simpleName}")
    }
}

fun main() {

    checkType&lt;String&gt;("Kotlin") // Output: Object is of type String
    checkType&lt;Int&gt;("Kotlin") // Output: Object is NOT of type Int
}

This example uses a reified generic function to perform type checking. The
reified type parameter preserves the type information at runtime, enabling proper
type checks.

## Reflection with KClass

KClass provides reflection capabilities similar to typeof in other languages. You
can inspect properties, functions, and other type information.

ReflectionExample.kt
  

package com.zetcode

class Person(val name: String, val age: Int)

fun main() {

    val personClass = Person::class
    
    println("Properties:")
    personClass.memberProperties.forEach {
        println("- ${it.name}: ${it.returnType}")
    }
    
    println("\nConstructors:")
    personClass.constructors.forEach {
        println("- $it")
    }
}

This demonstrates reflection using KClass. We inspect a class's properties and
constructors. This shows the power of Kotlin's type introspection capabilities.

## Checking Nullable Types

Type checking works with nullable types in Kotlin. The is operator
handles null checks automatically.

NullableTypeCheck.kt
  

package com.zetcode

fun checkNullableType(obj: Any?) {
    when (obj) {
        is String -&gt; println("String: $obj")
        is Int -&gt; println("Int: $obj")
        null -&gt; println("Object is null")
        else -&gt; println("Unknown type")
    }
}

fun main() {

    checkNullableType("Kotlin") // Output: String: Kotlin
    checkNullableType(42) // Output: Int: 42
    checkNullableType(null) // Output: Object is null
}

This example shows type checking with nullable types. The is checks
work normally, and we have a separate case for null values. This is idiomatic
Kotlin.

## Comparing Types

You can compare KClass objects to check if two objects are of the same type. This
is useful for advanced type checking scenarios.

TypeComparison.kt
  

package com.zetcode

open class Animal
class Dog : Animal()

fun main() {

    val dog = Dog()
    val animal: Animal = dog
    
    println(dog::class == animal::class) // Output: true
    println(dog::class == Animal::class) // Output: false
    println(animal::class == Dog::class) // Output: true
}

This shows type comparison using KClass objects. Note that the runtime type is
preserved even when assigned to a superclass variable. This is important for
accurate type checking.

## Best Practices for Type Checking

**Prefer is over as:** Use type checks before unsafe casts to
avoid exceptions.
**Leverage smart casts:** Kotlin automatically casts after
type checks in many cases.
**Use reified generics:** For generic functions, consider using
reified type parameters.
**Consider nullability:** Always account for nullable types in
your type checks.
**Use reflection sparingly:** Reflection is powerful but can
impact performance and type safety.

## Source

[Kotlin Reflection Documentation](https://kotlinlang.org/docs/reflection.html)

This tutorial covered Kotlin's type checking capabilities in depth, showing
various ways to inspect and work with types at runtime. While Kotlin doesn't
have a typeof keyword, its ::class and is
operators provide similar functionality with additional benefits.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).