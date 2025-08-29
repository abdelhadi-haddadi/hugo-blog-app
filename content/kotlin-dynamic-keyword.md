+++
title = "Kotlin dynamic Keyword"
date = 2025-08-29T20:02:31.717+01:00
draft = false
description = "Kotlin dynamic keyword tutorial shows how to use dynamic typing in Kotlin. Learn about interoperability with JavaScript and dynamic method calls with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin dynamic Keyword

last modified April 19, 2025

Kotlin's dynamic keyword enables dynamic typing in a primarily
statically-typed language. It's mainly used for JavaScript interoperability.
This tutorial explores the dynamic keyword with practical examples.

## Basic Definitions

The dynamic keyword in Kotlin disables type checking at compile
time. It's primarily used when working with JavaScript from Kotlin. With dynamic,
method calls and property access are resolved at runtime rather than compile time.

## Basic dynamic Usage

The simplest use of dynamic is to declare a variable that can hold
any type. The compiler won't check types or method calls on this variable.

BasicDynamic.kt
  

package com.zetcode

fun main() {

    val dyn: dynamic = "Hello"
    println(dyn.length) // Output: 5
    
    dyn = 42
    println(dyn.toFixed(2)) // Output: 42.00
}

Here we declare a dynamic variable that first holds a string, then
a number. We can call string methods and number methods without compile-time
checks. The calls are resolved at runtime.

## JavaScript Interoperability

The primary use case for dynamic is calling JavaScript code from
Kotlin. It allows seamless interaction with JavaScript's dynamic nature.

JsInterop.kt
  

package com.zetcode

import kotlin.js.json

fun main() {

    val jsObject: dynamic = json(
        "name" to "John",
        "age" to 30,
        "address" to json(
            "street" to "Main St",
            "city" to "New York"
        )
    )
    
    println(jsObject.name) // Output: John
    println(jsObject.address.city) // Output: New York
}

This example shows how to work with JavaScript objects in Kotlin. We create a
nested JavaScript object using json and access its properties
dynamically. The compiler doesn't verify these property accesses.

## Dynamic Function Calls

With dynamic, you can call functions that don't exist at compile
time. The function resolution happens at runtime, similar to JavaScript.

DynamicFunction.kt
  

package com.zetcode

fun main() {

    val calculator: dynamic = object {
        fun add(a: Int, b: Int) = a + b
    }
    
    println(calculator.add(5, 3)) // Output: 8
    println(calculator.multiply(5, 3)) // Runtime error
}

We create an object with an add function and call it successfully.
The multiply call fails at runtime since the function doesn't exist.
This demonstrates dynamic resolution's risks and flexibility.

## Dynamic Property Access

Dynamic variables allow accessing properties that aren't declared in the class.
This is useful when working with external JavaScript libraries.

DynamicProperty.kt
  

package com.zetcode

class Person(val name: String)

fun main() {

    val person: dynamic = Person("Alice")
    println(person.name) // Output: Alice
    println(person.age) // Output: undefined (no error)
    
    person.age = 30 // Dynamically add property
    println(person.age) // Output: 30
}

Here we access both declared (name) and undeclared (age)
properties. With dynamic, we can even add new properties at runtime, just like in
JavaScript. The compiler won't catch these dynamic property accesses.

## Dynamic Arrays

Dynamic typing works with arrays, allowing flexible array operations that would
normally be type-checked in Kotlin.

DynamicArray.kt
  

package com.zetcode

fun main() {

    val arr: dynamic = arrayOf(1, 2, 3)
    println(arr.joinToString()) // Output: 1, 2, 3
    
    arr.push(4) // JavaScript-style array operation
    println(arr.joinToString()) // Output: 1, 2, 3, 4
    
    arr[0] = "one" // Change type of element
    println(arr.joinToString()) // Output: one, 2, 3, 4
}

This example shows JavaScript-style array operations in Kotlin. We use
push and change an element's type dynamically. These operations
wouldn't be allowed with regular Kotlin arrays.

## Dynamic with External JavaScript

When calling external JavaScript functions, dynamic is essential for
handling the untyped nature of JavaScript APIs.

ExternalJs.kt
  

package com.zetcode

// Assume this is an external JavaScript function
external fun getJsData(): dynamic

fun main() {

    val data: dynamic = getJsData()
    println(data.message)
    data.showAlert("Hello from Kotlin")
}

This example demonstrates calling an external JavaScript function that returns a
dynamic object. We can access properties and call methods without knowing their
structure at compile time. The exact behavior depends on the JavaScript code.

## Type Checking with Dynamic

Even with dynamic, you can perform runtime type checks using
Kotlin's type checking operators.

DynamicTypeCheck.kt
  

package com.zetcode

fun main() {

    val value: dynamic = "Kotlin"
    
    if (value is String) {
        println(value.length) // Smart cast to String
    }
    
    when (value) {
        is String -&gt; println("It's a string")
        is Number -&gt; println("It's a number")
        else -&gt; println("Unknown type")
    }
}

Here we use is checks to determine the runtime type of a dynamic
variable. Kotlin's smart casts work even with dynamic variables when you perform
explicit type checks. This provides some safety when working with dynamic code.

## Best Practices for Dynamic Typing

**Use sparingly:** Only use dynamic when necessary,
typically for JavaScript interop.
**Add type checks:** Use runtime type checks to add safety to
dynamic code.
**Document assumptions:** Clearly document expected types and
behaviors when using dynamic.
**Consider alternatives:** For Kotlin/JVM, prefer proper type
definitions over dynamic.
**Handle errors:** Be prepared to handle runtime errors from
invalid dynamic operations.

## Source

[Kotlin Dynamic Type Documentation](https://kotlinlang.org/docs/dynamic-type.html)

This tutorial covered Kotlin's dynamic keyword in depth, showing its
primary use in JavaScript interoperability. We explored dynamic properties,
methods, arrays, and type checking. While powerful, dynamic typing should be
used judiciously in Kotlin applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).