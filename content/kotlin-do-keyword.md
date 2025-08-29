+++
title = "Kotlin do Keyword"
date = 2025-08-29T20:02:30.599+01:00
draft = false
description = "Kotlin do keyword tutorial shows how to use do-while loops in Kotlin. Learn about loop control flow with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin do Keyword

last modified April 19, 2025

Kotlin's control flow includes the do-while loop construct where
do plays a crucial role. This loop ensures code executes at least
once before checking the condition. This tutorial explores the do
keyword in depth with practical examples.

## Basic Definitions

The do keyword in Kotlin is used to create do-while
loops. Unlike regular while loops, do-while executes
the block first, then checks the condition. This guarantees at least one
iteration.

## Basic do-while Loop

The simplest form of do-while loop executes a block of code once
before checking the condition. If the condition is true, it repeats the block.

BasicDoWhile.kt
  

package com.zetcode

fun main() {

    var i = 0
    
    do {
        println(i)
        i++
    } while (i &lt; 5)
}

This example prints numbers 0 through 4. The loop body executes first, then the
condition is checked. Even if i started at 5, the loop would still run once.

## do-while with False Condition

A key feature of do-while is executing at least once, even when the
condition is initially false. This differs from while which may not
run at all.

FalseCondition.kt
  

package com.zetcode

fun main() {

    var flag = false
    
    do {
        println("This runs once")
    } while (flag)
}

Despite flag being false, the message prints once. This demonstrates
the guaranteed execution of the do block before condition checking.

## Input Validation with do-while

do-while is ideal for input validation where you need to prompt at
least once. The loop continues until valid input is received.

InputValidation.kt
  

package com.zetcode

fun main() {

    var input: Int?
    
    do {
        print("Enter a positive number: ")
        input = readLine()?.toIntOrNull()
    } while (input == null || input &lt;= 0)
    
    println("You entered: $input")
}

This loop repeatedly prompts for input until a positive number is provided. The
do block ensures the prompt appears at least once before checking.

## Nested do-while Loops

do-while loops can be nested within each other to handle complex
iteration scenarios. Each loop maintains its own condition and iteration logic.

NestedDoWhile.kt
  

package com.zetcode

fun main() {

    var i = 1
    
    do {
        var j = 1
        do {
            print("${i * j}\t")
            j++
        } while (j &lt;= 10)
        
        println()
        i++
    } while (i &lt;= 5)
}

This example prints a multiplication table from 1 to 5. The outer loop controls
rows, while the inner loop handles columns. Both loops use do-while
structure.

## do-while with break

The break statement can exit a do-while loop
prematurely. This is useful when you need to stop iteration based on complex
conditions.

BreakInDoWhile.kt
  

package com.zetcode

fun main() {

    var num = 0
    
    do {
        num++
        println(num)
        
        if (num == 3) {
            break
        }
    } while (num &lt; 5)
}

This loop would normally print 1 through 5, but break exits at 3.
The output shows 1, 2, 3. The condition num &lt; 5 becomes irrelevant
after the break.

## do-while with continue

The continue statement skips the rest of the current iteration in a
do-while loop. It jumps to the condition check while preserving the
loop state.

ContinueInDoWhile.kt
  

package com.zetcode

fun main() {

    var i = 0
    
    do {
        i++
        
        if (i % 2 == 0) {
            continue
        }
        
        println(i)
    } while (i &lt; 10)
}

This example prints odd numbers between 1 and 10. When i is even,
continue skips the print statement. The loop still increments
i each iteration.

## Infinite do-while Loop

An infinite do-while loop runs forever unless stopped externally.
This pattern is useful for programs that need continuous operation.

InfiniteDoWhile.kt
  

package com.zetcode

fun main() {

    var count = 0
    
    do {
        println("Running... ${++count}")
        Thread.sleep(1000)
    } while (true)
}

This loop prints a message every second indefinitely. In practice, you'd add a
break condition or use Ctrl+C to stop it. The true condition ensures
perpetual execution.

## Best Practices for do-while

**Use when guaranteed execution is needed:** Choose
do-while when the block must run at least once.
**Avoid complex conditions:** Keep loop conditions simple for
better readability and maintenance.
**Ensure termination:** Always have a clear exit condition to
prevent infinite loops.
**Consider alternatives:** For collections, prefer
for loops which are more idiomatic in Kotlin.
**Limit nesting:** Deeply nested do-while loops can
become hard to understand and maintain.

## Source

[Kotlin Control Flow Documentation](https://kotlinlang.org/docs/control-flow.html)

This tutorial covered Kotlin's do keyword in depth, showing various
do-while loop scenarios. We explored basic usage, input validation,
nesting, and control statements. Proper use of do-while can make
your code more robust when you need guaranteed first iteration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).