+++
title = "Kotlin inline Keyword"
date = 2025-08-29T20:02:39.460+01:00
draft = false
description = "Kotlin inline keyword tutorial shows how to use inline functions in Kotlin. Learn about performance benefits, reified types, and when to use inline functions with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin inline Keyword

last modified April 19, 2025

Kotlin's inline keyword is used to optimize higher-order functions.
It eliminates the overhead of function calls by inlining the function body. This
tutorial explores the inline keyword in depth with practical examples.

## Basic Definitions

The inline keyword tells the compiler to copy the function's bytecode
where it's called. This avoids the runtime overhead of function objects. It's
most beneficial for higher-order functions that take lambdas as parameters.

## Basic Inline Function

A simple inline function demonstrates how the compiler replaces calls with the
function body. This can improve performance for small, frequently called functions.

BasicInline.kt
  

package com.zetcode

inline fun greet(name: String, action: (String) -&gt; Unit) {
    println("Hello, $name!")
    action(name)
}

fun main() {
    greet("Kotlin") { name -&gt;
        println("$name is awesome!")
    }
}

The greet function is marked as inline. When called, its body is
copied directly into the calling code. The lambda parameter is also inlined,
avoiding the creation of a function object.

## Performance Comparison

This example compares the performance of inline vs non-inline functions. The
difference is most noticeable with small, frequently called functions.

PerformanceTest.kt
  

package com.zetcode

inline fun inlineOperation(a: Int, b: Int, op: (Int, Int) -&gt; Int): Int {
    return op(a, b)
}

fun normalOperation(a: Int, b: Int, op: (Int, Int) -&gt; Int): Int {
    return op(a, b)
}

fun main() {
    val iterations = 1_000_000
    
    val inlineTime = measureTimeMillis {
        repeat(iterations) {
            inlineOperation(5, 3) { x, y -&gt; x + y }
        }
    }
    
    val normalTime = measureTimeMillis {
        repeat(iterations) {
            normalOperation(5, 3) { x, y -&gt; x + y }
        }
    }
    
    println("Inline time: $inlineTime ms")
    println("Normal time: $normalTime ms")
}

The inline version typically shows better performance for many iterations. This is
because it avoids creating function objects for each lambda call. The difference
becomes more significant with frequent calls.

## Reified Type Parameters

Inline functions enable reified type parameters, which preserve type information
at runtime. This allows type checks and casts that aren't possible with regular
generics.

ReifiedExample.kt
  

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
    checkType&lt;Int&gt;("123")      // Output: Object is NOT of type Int
}

The reified keyword allows accessing the actual type parameter at
runtime. This is impossible with regular generics due to type erasure. The
function can perform runtime type checks on the generic type.

## Inline Properties

The inline modifier can also be applied to property accessors. This
works similarly to inline functions, optimizing property access.

InlineProperty.kt
  

package com.zetcode

class User(val name: String) {
    var lastAccess: Long = 0
        inline get() {
            println("Getting last access time")
            return field
        }
        inline set(value) {
            println("Setting last access time")
            field = value
        }
}

fun main() {
    val user = User("Alice")
    user.lastAccess = System.currentTimeMillis()
    println(user.lastAccess)
}

Both getter and setter for lastAccess are marked as inline. The
compiler will inline these accessors at call sites. This is useful for simple
property accessors with logging or validation.

## Crossinline and Noinline

crossinline and noinline modify inline behavior.
crossinline ensures lambdas can't use non-local returns, while
noinline prevents inlining of specific parameters.

CrossInlineExample.kt
  

package com.zetcode

inline fun execute(
    crossinline task: () -&gt; Unit,
    noinline callback: () -&gt; Unit
) {
    task()
    runLater(callback)
}

fun runLater(action: () -&gt; Unit) {
    // Simulate async execution
    Thread.sleep(100)
    action()
}

fun main() {
    execute(
        { println("Task executed") },
        { println("Callback executed") }
    )
}

The task parameter uses crossinline to prevent
non-local returns. The callback uses noinline because
it's passed to another function. These modifiers provide control over inlining.

## Inline Functions in Collections

Kotlin's standard library uses inline functions extensively for collection
operations. This example demonstrates how they work internally.

CollectionOperations.kt
  

package com.zetcode

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    
    val squares = numbers.map { it * it }
    println(squares) // [1, 4, 9, 16, 25]
    
    val evens = numbers.filter { it % 2 == 0 }
    println(evens) // [2, 4]
    
    val sum = numbers.fold(0) { acc, num -&gt; acc + num }
    println(sum) // 15
}

Functions like map, filter, and fold are
inline in Kotlin's standard library. This makes collection operations efficient
despite using lambdas. The compiler inlines both the function and lambda bodies.

## When Not to Use Inline

This example shows cases where inline functions might not be beneficial or could
even harm performance.

InlineDrawbacks.kt
  

package com.zetcode

// Not good for large functions
inline fun largeInlineFunction() {
    // Hundreds of lines of code...
    println("This function is too large to benefit from inlining")
}

// Recursive functions can't be inlined
inline fun recursiveFunction(n: Int) {
    if (n &gt; 0) {
        println(n)
        recursiveFunction(n - 1) // Error: recursive inline function
    }
}

fun main() {
    largeInlineFunction()
}

Inline functions increase code size when the function body is large. Recursive
functions can't be inlined. Also, public API functions might need careful
consideration before inlining due to binary compatibility.

## Best Practices for Inline Functions

**Use for small functions:** Ideal for functions with few lines
that are called frequently.
**Higher-order functions:** Best for functions accepting lambdas
to avoid function object overhead.
**Reified types:** Essential when you need runtime type
information for generic parameters.
**Avoid large functions:** Inlining large functions increases
bytecode size without significant benefits.
**Consider noinline:** Use when some lambdas need to be stored
or passed to non-inline functions.

## Source

[Kotlin Inline Functions Documentation](https://kotlinlang.org/docs/inline-functions.html)

This tutorial covered Kotlin's inline keyword in depth, showing its
benefits for performance and reified types. We explored various scenarios
including collections, properties, and parameter modifiers. Proper use of inline
functions can make your Kotlin code more efficient while maintaining clarity.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).