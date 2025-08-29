+++
title = "Kotlin break Keyword"
date = 2025-08-29T20:02:25.085+01:00
draft = false
description = "Kotlin break keyword tutorial shows how to use break to control loop execution in Kotlin. Learn about labeled breaks and loop termination with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin break Keyword

last modified April 19, 2025

The break keyword in Kotlin is used to terminate loop execution
prematurely. It provides control over loop flow, allowing early exit when
certain conditions are met. This tutorial explores break in depth.

## Basic Definitions

The break statement immediately terminates the nearest enclosing
loop. Kotlin also supports labeled breaks that can terminate specific outer
loops. Break is commonly used with conditional statements inside loops.

## Basic break in while Loop

This example shows the simplest use of break to exit a while loop
when a condition is met. The loop terminates immediately when break is executed.

BasicBreak.kt
  

package com.zetcode

fun main() {

    var i = 0
    
    while (true) {
        println(i)
        i++
        
        if (i &gt; 5) {
            break
        }
    }
}

The loop would run indefinitely without the break. When i exceeds 5, break
terminates the loop. This pattern is common when reading input until a sentinel
value is encountered.

## break in for Loop

The break statement works similarly in for loops. This example
searches for a value in a range and breaks when found.

ForBreak.kt
  

package com.zetcode

fun main() {

    val searchFor = 7
    
    for (i in 1..10) {
        println("Checking $i")
        
        if (i == searchFor) {
            println("Found $searchFor")
            break
        }
    }
}

The loop checks numbers 1 through 10. When it finds the target number (7), it
prints a message and exits immediately with break. This prevents unnecessary
iterations after finding the result.

## break in Nested Loops

In nested loops, break only terminates the innermost loop. This
example demonstrates how break affects nested loop structures.

NestedBreak.kt
  

package com.zetcode

fun main() {

    for (i in 1..3) {
        println("Outer loop: $i")
        
        for (j in 1..5) {
            println("  Inner loop: $j")
            
            if (j == 3) {
                break
            }
        }
    }
}

The inner loop breaks when j reaches 3, but the outer loop continues normally.
Each outer iteration creates a new inner loop that breaks independently. This
shows break's scope limitation.

## Labeled break

Kotlin's labeled breaks allow terminating specific outer loops. Labels are
created with an identifier followed by @. This is useful for nested loops.

LabeledBreak.kt
  

package com.zetcode

fun main() {

    outerLoop@ for (i in 1..3) {
        println("Outer loop: $i")
        
        for (j in 1..5) {
            println("  Inner loop: $j")
            
            if (j == 3) {
                break@outerLoop
            }
        }
    }
}

Here, the labeled break terminates the outer loop when j reaches 3. Without the
label, only the inner loop would break. Labels provide precise control over
which loop to exit in nested structures.

## break in do-while Loop

The break statement works consistently across all loop types in
Kotlin. This example shows its use in a do-while loop structure.

DoWhileBreak.kt
  

package com.zetcode

fun main() {

    var sum = 0
    var num: Int
    
    do {
        print("Enter a number (0 to stop): ")
        num = readLine()!!.toInt()
        
        if (num == 0) {
            break
        }
        
        sum += num
    } while (true)
    
    println("Total sum: $sum")
}

This interactive example sums numbers until the user enters 0. The break
statement exits the loop immediately when 0 is detected. The while(true)
condition would otherwise create an infinite loop.

## break with when Expression

The break statement can be used within when expressions
inside loops. This provides clean control flow for multiple conditions.

WhenBreak.kt
  

package com.zetcode

fun main() {

    for (i in 1..10) {
        when {
            i % 2 == 0 -&gt; println("$i is even")
            i % 3 == 0 -&gt; println("$i is divisible by 3")
            i &gt; 7 -&gt; break
            else -&gt; println("$i is not special")
        }
    }
}

The loop processes numbers with different conditions. When i exceeds 7, break
terminates the loop. The when expression cleanly handles multiple cases while
break provides the exit condition.

## break in Functional Constructs

While functional constructs like forEach don't support break directly, we can
simulate it using run blocks with labels. This example demonstrates the pattern.

FunctionalBreak.kt
  

package com.zetcode

fun main() {

    run loop@ {
        (1..10).forEach {
            println(it)
            
            if (it == 5) {
                return@loop
            }
        }
    }
}

The run block with a label creates a scope we can return from. When it reaches 5,
it exits the entire construct, simulating break behavior. This is a workaround
for break's limitation in functional constructs.

## Best Practices for Using break

**Use sparingly:** Overuse of break can make code harder to
follow. Consider restructuring loops when possible.
**Clear conditions:** Ensure the break condition is obvious and
well-documented.
**Prefer labeled breaks:** In nested loops, labeled breaks make
intent clearer than complex conditions.
**Consider alternatives:** Sometimes a while loop with proper
conditions is cleaner than a for loop with break.
**Avoid in functional code:** In functional constructs, prefer
filter or takeWhile over break simulations.

## Source

[Kotlin Returns and Jumps Documentation](https://kotlinlang.org/docs/returns.html)

This tutorial covered Kotlin's break keyword in depth, showing its
use in various loop structures. We explored basic breaks, labeled breaks, and
workarounds for functional constructs. Proper use of break can make loops more
efficient and readable when applied judiciously.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).