+++
title = "Kotlin crossinline Keyword"
date = 2025-08-29T20:02:28.373+01:00
draft = false
description = "Kotlin crossinline keyword tutorial shows how to use crossinline with inline functions in Kotlin. Learn about non-local returns and lambda control flow with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin crossinline Keyword

last modified April 19, 2025

Kotlin's inline functions optimize higher-order functions by inlining lambda
expressions. The crossinline modifier restricts non-local returns
from lambdas passed to inline functions. This tutorial explores crossinline in
depth with practical examples.

## Basic Definitions

The crossinline keyword marks lambda parameters in inline functions.
It prevents non-local returns from these lambdas while still allowing inlining.
This ensures proper control flow in contexts like local objects or nested
functions.

## Basic crossinline Usage

This example shows the simplest use of crossinline. We define an inline function
with a crossinline lambda parameter to prevent non-local returns.

BasicCrossinline.kt
  

package com.zetcode

inline fun executeCrossinline(crossinline action: () -&gt; Unit) {
    action()
}

fun main() {
    executeCrossinline {
        println("Action executed")
        // return // This would cause a compilation error
    }
}

The executeCrossinline function takes a crossinline lambda. The
commented return statement would cause an error because crossinline prevents
non-local returns. The function still gets inlined for performance.

## crossinline vs Regular Inline

This example contrasts regular inline functions with crossinline variants. It
shows how crossinline affects control flow in lambdas.

InlineComparison.kt
  

package com.zetcode

inline fun regularInline(action: () -&gt; Unit) {
    action()
}

inline fun withCrossinline(crossinline action: () -&gt; Unit) {
    action()
}

fun main() {
    regularInline {
        println("Regular inline")
        return // Allowed: non-local return
    }
    
    withCrossinline {
        println("Crossinline")
        // return // Compilation error: non-local return not allowed
    }
}

The regularInline function allows non-local returns from its lambda.
The withCrossinline function prohibits them due to the crossinline
modifier. This distinction is crucial for control flow management.

## crossinline in Local Objects

crossinline is essential when passing lambdas to local objects or nested
functions. This example demonstrates its use in a local object context.

LocalObjectExample.kt
  

package com.zetcode

inline fun runInObject(crossinline action: () -&gt; Unit) {
    val obj = object {
        fun execute() {
            action()
        }
    }
    obj.execute()
}

fun main() {
    runInObject {
        println("Executing in local object")
        // return // Would cause compilation error
    }
}

Here, the lambda is passed to a local object's method. Without crossinline, a
non-local return would be problematic. The crossinline modifier ensures proper
control flow within the local object context.

## crossinline with Control Structures

This example shows crossinline used with control structures. It demonstrates how
crossinline affects returns within loops and conditionals.

ControlStructures.kt
  

package com.zetcode

inline fun processItems(
    items: List&lt;Int&gt;,
    crossinline processor: (Int) -&gt; Unit
) {
    for (item in items) {
        if (item &lt; 0) {
            processor(item)
            // return // Not allowed here with crossinline
        }
    }
}

fun main() {
    val numbers = listOf(1, -2, 3, -4)
    processItems(numbers) {
        println("Processing negative: $it")
    }
}

The processItems function uses crossinline for its processor lambda.
While local returns are allowed, non-local returns are prohibited. This maintains
predictable control flow in the loop structure.

## crossinline in Library Functions

Many Kotlin standard library functions use crossinline. This example mimics such
usage to show practical applications.

LibraryStyle.kt
  

package com.zetcode

inline fun &lt;T&gt; T.applyCrossinline(
    crossinline block: T.() -&gt; Unit
): T {
    val receiver = this
    receiver.block()
    return receiver
}

fun main() {
    val message = StringBuilder().applyCrossinline {
        append("Hello")
        append(", ")
        append("Kotlin")
        // return // Would cause compilation error
    }
    println(message.toString())
}

This applyCrossinline function mimics Kotlin's standard apply
function but with crossinline. It ensures the lambda doesn't contain non-local
returns while still being inlined for performance.

## crossinline with Multiple Lambdas

Functions can have both regular and crossinline lambda parameters. This example
shows how they interact in the same function.

MultipleLambdas.kt
  

package com.zetcode

inline fun handleEvents(
    regularAction: () -&gt; Unit,
    crossinline safeAction: () -&gt; Unit
) {
    regularAction()
    
    val handler = object {
        fun handle() {
            safeAction()
        }
    }
    handler.handle()
}

fun main() {
    handleEvents(
        { println("Regular action"); return },
        { println("Safe action") /* return not allowed */ }
    )
}

The function has one regular inline lambda and one crossinline lambda. The
regular lambda allows non-local returns, while the crossinline one doesn't. This
combination provides flexibility in different usage scenarios.

## crossinline in Real-World Scenarios

This example demonstrates a practical use case for crossinline in a resource
management scenario, similar to Kotlin's use in the standard library.

ResourceManagement.kt
  

package com.zetcode

inline fun &lt;T : AutoCloseable, R&gt; T.useCrossinline(
    crossinline block: (T) -&gt; R
): R {
    try {
        return block(this)
    } finally {
        close()
    }
}

fun main() {
    val result = System.`in`.bufferedReader().useCrossinline {
        it.readLine()
        // return // Would cause compilation error
    }
    println("Read: $result")
}

This useCrossinline function mimics Kotlin's use function but with
crossinline. It ensures proper resource cleanup by preventing non-local returns
that could skip the finally block. The lambda still gets inlined for performance.

## Best Practices for crossinline

**Use when needed:** Apply crossinline only when non-local
returns would cause issues in local objects or nested functions.
**Document behavior:** Clearly document when functions use
crossinline to set proper expectations for lambda authors.
**Combine judiciously:** Mix regular and crossinline parameters
carefully to maintain clear control flow.
**Consider alternatives:** For complex scenarios, consider
non-inline functions or different architecture.
**Follow library patterns:** Study standard library uses of
crossinline for guidance on effective patterns.

## Source

[Kotlin Inline Functions Documentation](https://kotlinlang.org/docs/inline-functions.html)

This tutorial covered Kotlin's crossinline keyword in depth,
showing its role in inline functions. We explored various scenarios including
local objects, control structures, and resource management. Proper use of
crossinline helps maintain predictable control flow while preserving inlining
benefits.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).