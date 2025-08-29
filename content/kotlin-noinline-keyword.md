+++
title = "Kotlin noinline Keyword"
date = 2025-08-29T20:02:42.804+01:00
draft = false
description = "Kotlin noinline keyword tutorial shows how to control lambda inlining in Kotlin. Learn when and why to use noinline with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin noinline Keyword

last modified April 19, 2025

Kotlin's inline functions optimize higher-order functions by inlining lambda
bodies. The noinline modifier gives control over which lambdas
should not be inlined. This tutorial explores noinline in depth.

## Basic Definitions

The noinline keyword in Kotlin marks a lambda parameter that should
not be inlined when the containing function is inlined. It's used with inline
functions to exclude specific lambdas from inlining. This preserves the lambda
as a real object when needed.

## Basic noinline Usage

The simplest use of noinline is to mark one lambda parameter in an
inline function. This prevents that specific lambda from being inlined while
others still are.

BasicNoinline.kt
  

package com.zetcode

inline fun process(
    action: () -&gt; Unit,
    noinline logger: (String) -&gt; Unit
) {
    logger("Starting process")
    action()
    logger("Process completed")
}

fun main() {
    process(
        { println("Performing action") },
        { msg -&gt; println("[LOG] $msg") }
    )
}

Here, logger is marked as noinline while action
is inlined. The logger lambda remains a function object, allowing it to be stored
or passed around if needed. The action lambda is inlined at the call site.

## Why Use noinline

The main reason to use noinline is when you need to treat a lambda
as an object. Inlined lambdas can't be stored in variables or passed as objects.
noinline preserves the lambda's object nature.

StoreLambda.kt
  

package com.zetcode

inline fun execute(
    task: () -&gt; Unit,
    noinline callback: () -&gt; Unit
) {
    val savedCallback = callback // Only possible with noinline
    task()
    savedCallback()
}

fun main() {
    execute(
        { println("Task executed") },
        { println("Callback invoked") }
    )
}

This example shows storing a callback lambda in a variable. Without
noinline, this would be impossible because inlined lambdas don't
exist as objects. The noinline modifier makes this operation valid.

## Mixing Inline and noinline

You can mix inlined and non-inlined parameters in the same function. This gives
fine-grained control over which lambdas should be optimized and which should
remain as objects.

MixedInlining.kt
  

package com.zetcode

inline fun transform(
    data: List&lt;Int&gt;,
    noinline validator: (Int) -&gt; Boolean,
    converter: (Int) -&gt; Int
): List&lt;Int&gt; {
    return data.filter(validator).map(converter)
}

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    val result = transform(numbers,
        { it % 2 == 0 }, // Not inlined
        { it * 2 }       // Inlined
    )
    println(result) // Output: [4, 8]
}

Here, validator is not inlined (can be passed to filter),
while converter is inlined. This demonstrates selective optimization
where only performance-critical lambdas are inlined.

## noinline with Crossinline

noinline can be combined with crossinline to control
lambda behavior further. crossinline prevents non-local returns
while still inlining the lambda.

CrossinlineNoinline.kt
  

package com.zetcode

inline fun runOperations(
    crossinline op: () -&gt; Unit,
    noinline completion: () -&gt; Unit
) {
    try {
        op()
    } finally {
        completion()
    }
}

fun main() {
    runOperations(
        { println("Operation running") },
        { println("Operation completed") }
    )
}

The op lambda is cross-inlined (no non-local returns allowed), while
completion is not inlined at all. This combination is useful for
control flow-sensitive operations with required callbacks.

## noinline in Real-world Scenarios

In real applications, noinline is often used with callback-heavy
APIs. It allows passing callbacks to other functions while still benefiting from
inlining for performance-critical parts.

CallbackExample.kt
  

package com.zetcode

inline fun fetchData(
    noinline onSuccess: (String) -&gt; Unit,
    noinline onError: (Exception) -&gt; Unit
) {
    try {
        // Simulate data fetching
        val data = "Sample data"
        onSuccess(data)
    } catch (e: Exception) {
        onError(e)
    }
}

fun main() {
    fetchData(
        { data -&gt; println("Received: $data") },
        { error -&gt; println("Error: ${error.message}") }
    )
}

Both callbacks are marked noinline because they might be called
asynchronously or passed around. This pattern is common in network request
handlers or database operations where callbacks are essential.

## Performance Considerations

While inlining improves performance by reducing function object allocations,
noinline trades some performance for flexibility. Use it judiciously
where lambda objects are truly needed.

PerformanceTest.kt
  

package com.zetcode

inline fun benchmark(
    noinline setup: () -&gt; Unit,
    action: () -&gt; Unit,
    noinline teardown: () -&gt; Unit
) {
    setup()
    val start = System.nanoTime()
    action()
    val duration = System.nanoTime() - start
    teardown()
    println("Operation took ${duration}ns")
}

fun main() {
    benchmark(
        { println("Setting up") },
        { List(1000) { it }.sum() },
        { println("Cleaning up") }
    )
}

Here, the performance-critical action is inlined while setup/teardown
are not. This optimizes the hot path while keeping infrastructure code flexible.
Measure performance when deciding what to inline.

## Limitations of noinline

noinline parameters have restrictions. They can't be called in
non-inline contexts like nested objects. They also can't be used with certain
inline-only operations like return from enclosing function.

Limitations.kt
  

package com.zetcode

inline fun problematic(
    noinline block: () -&gt; Unit
) {
    val runnable = object : Runnable {
        override fun run() {
            block() // Error: Can't use noinline lambda here
        }
    }
    // ...
}

This code won't compile because noinline lambdas can't be used in
object expressions. The compiler enforces this to maintain consistency in lambda
handling across different contexts.

## Best Practices for noinline

**Use sparingly:** Only apply noinline when you
need lambda objects for storage or passing.
**Profile performance:** Measure the impact before deciding which
lambdas to mark as noinline.
**Combine wisely:** Mix noinline with regular and
crossinline parameters for optimal control.
**Document reasons:** Comment why a parameter is
noinline for future maintainers.
**Consider alternatives:** Sometimes restructuring code can
avoid the need for noinline.

## Source

[Kotlin Inline Functions Documentation](https://kotlinlang.org/docs/inline-functions.html)

This tutorial covered Kotlin's noinline keyword in depth, showing
its purpose and practical applications. We explored various scenarios where
noinline is essential and discussed its performance implications.
Proper use of noinline helps balance flexibility and optimization.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).