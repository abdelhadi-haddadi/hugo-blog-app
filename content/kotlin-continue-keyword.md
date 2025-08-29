+++
title = "Kotlin continue Keyword"
date = 2025-08-29T20:02:28.387+01:00
draft = false
description = "Kotlin continue keyword tutorial shows how to control loop execution in Kotlin. Learn how to skip iterations with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin continue Keyword

last modified April 19, 2025

Kotlin's continue keyword provides control over loop execution. It
skips the current iteration and moves to the next one. This tutorial explores
the continue keyword in depth with practical examples.

## Basic Definitions

The continue keyword in Kotlin is used to skip the current iteration
of a loop. When encountered, it immediately jumps to the next iteration. It works
with for, while, and do-while loops.

## Basic continue in for Loop

The simplest use of continue skips specific iterations in a loop.
Here we skip even numbers in a range from 1 to 10.

BasicContinue.kt
  

package com.zetcode

fun main() {

    for (i in 1..10) {
        if (i % 2 == 0) {
            continue
        }
        println(i)
    }
}

This code prints only odd numbers between 1 and 10. When i is even,
the continue statement skips the rest of the iteration. The output
would be 1, 3, 5, 7, 9.

## continue in while Loop

The continue keyword works similarly in while loops.
Here we skip iterations when a condition is met.

WhileContinue.kt
  

package com.zetcode

fun main() {

    var i = 0
    while (i &lt; 10) {
        i++
        if (i in 3..5) {
            continue
        }
        println(i)
    }
}

This while loop skips numbers 3, 4, and 5. The continue statement
jumps back to the loop condition check. The output would be 1, 2, 6, 7, 8, 9, 10.

## continue in Nested Loops

In nested loops, continue affects only the innermost loop containing
it. Here we demonstrate its behavior in nested structures.

NestedContinue.kt
  

package com.zetcode

fun main() {

    for (i in 1..3) {
        for (j in 1..3) {
            if (j == 2) {
                continue
            }
            println("i: $i, j: $j")
        }
    }
}

The inner loop skips iteration when j equals 2. The outer loop
continues normally. Output shows pairs where j is never 2.

## continue with Label

Kotlin allows labeling loops to control which loop continue affects.
Labels enable skipping iterations in outer loops from inner loops.

LabeledContinue.kt
  

package com.zetcode

fun main() {

    outer@ for (i in 1..3) {
        for (j in 1..3) {
            if (i == 2 &amp;&amp; j == 2) {
                continue@outer
            }
            println("i: $i, j: $j")
        }
    }
}

When i and j both equal 2, the labeled continue skips
the current iteration of the outer loop. This demonstrates precise control over
nested loop behavior.

## continue in do-while Loop

The do-while loop also supports continue. It skips the
current iteration but still checks the condition afterward.

DoWhileContinue.kt
  

package com.zetcode

fun main() {

    var i = 0
    do {
        i++
        if (i == 4) {
            continue
        }
        println(i)
    } while (i &lt; 6)
}

This loop prints numbers 1 through 6, skipping 4. The continue
statement jumps to the condition check while maintaining the loop's execution.

## continue with when Expression

The continue statement can be used within when
expressions inside loops. This provides a clean way to handle multiple skip
conditions.

WhenContinue.kt
  

package com.zetcode

fun main() {

    for (i in 1..10) {
        when {
            i % 3 == 0 -&gt; continue
            i % 5 == 0 -&gt; continue
            else -&gt; println(i)
        }
    }
}

This code skips numbers divisible by 3 or 5. The when expression
makes the skip conditions clear and readable. Output shows numbers not divisible
by 3 or 5.

## continue in forEach Loop

Kotlin's forEach loop doesn't support continue directly.
Instead, we use return@forEach to achieve similar behavior.

ForEachContinue.kt
  

package com.zetcode

fun main() {

    (1..10).forEach {
        if (it % 2 == 0) {
            return@forEach
        }
        println(it)
    }
}

This example demonstrates how to skip even numbers in a forEach loop.
The return@forEach acts like continue in traditional
loops. Output shows odd numbers between 1 and 10.

## Best Practices for continue

**Use sparingly:** Overusing continue can make code
harder to follow.
**Clear conditions:** Ensure the skip condition is obvious and
well-documented.
**Consider alternatives:** Sometimes restructuring the loop might
be clearer than using continue.
**Label carefully:** Use labels only when necessary for nested
loop control.
**Test edge cases:** Verify behavior at loop boundaries and
special cases.

## Source

[Kotlin Returns and Jumps Documentation](https://kotlinlang.org/docs/returns.html)

This tutorial covered Kotlin's continue keyword in depth, showing its
use in various loop structures. We explored basic usage, nested loops, labels,
and alternatives in functional constructs. Proper use of continue can
make loops more efficient and expressive.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).