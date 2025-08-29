+++
title = "Kotlin while Keyword"
date = 2025-08-29T20:03:02.023+01:00
draft = false
description = "Kotlin while keyword tutorial shows how to use while loops in Kotlin. Learn about while and do-while loops with practical examples and detailed explanations."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin while Keyword

last modified April 19, 2025

Kotlin's while loops provide powerful control flow for repetitive tasks. The
while keyword executes code blocks repeatedly while a condition
remains true. This tutorial explores while loops in depth with practical examples.

## Basic Definitions

The while keyword in Kotlin creates loops that repeat while a
condition is true. Kotlin has two while loop variants: while and
do-while. The standard while checks the condition first, while
do-while checks after executing the block.

## Basic while Loop

The simplest form of while loop executes a block of code while a condition
remains true. The condition is checked before each iteration, including the
first one.

BasicWhile.kt
  

package com.zetcode

fun main() {

    var counter = 5
    
    while (counter &gt; 0) {
        println("Counter: $counter")
        counter--
    }
}

This example counts down from 5 to 1. The loop continues while counter is greater
than 0. Each iteration prints the current value and decrements the counter. The
loop exits when counter reaches 0.

## do-while Loop

The do-while loop executes its block at least once before checking the condition.
This is useful when you need to guarantee the block runs before condition check.

DoWhile.kt
  

package com.zetcode

fun main() {

    var counter = 0
    
    do {
        println("Counter: $counter")
        counter++
    } while (counter &lt; 5)
}

This do-while loop prints numbers from 0 to 4. Unlike a regular while loop, it
executes the block first, then checks the condition. Even if counter started at 5,
the block would execute once.

## Infinite while Loop

An infinite while loop runs indefinitely until explicitly broken. This is useful
for programs that need continuous execution until an external event occurs.

InfiniteWhile.kt
  

package com.zetcode

fun main() {

    var counter = 0
    
    while (true) {
        println("Processing item $counter")
        counter++
        
        if (counter == 5) {
            println("Breaking loop")
            break
        }
    }
}

This example shows an infinite loop that breaks after 5 iterations. The
break statement exits the loop when counter reaches 5. Without the
break, this loop would run forever.

## while Loop with Collections

While loops can iterate over collections by manually managing an index. This
approach offers more control than for loops but requires careful index handling.

WhileWithCollections.kt
  

package com.zetcode

fun main() {

    val fruits = listOf("Apple", "Banana", "Cherry")
    var index = 0
    
    while (index &lt; fruits.size) {
        println("Fruit ${index + 1}: ${fruits[index]}")
        index++
    }
}

This while loop iterates through a list of fruits. The index starts at 0 and
increments until it reaches the list size. Each iteration prints the current
fruit. The loop stops when index equals the list size.

## Nested while Loops

While loops can be nested within other while loops to handle multi-dimensional
data. Each nested loop requires its own counter variable and condition.

NestedWhile.kt
  

package com.zetcode

fun main() {

    var i = 1
    
    while (i &lt;= 3) {
        var j = 1
        while (j &lt;= 3) {
            print("($i,$j) ")
            j++
        }
        println()
        i++
    }
}

This nested while loop creates a 3x3 grid of coordinates. The outer loop controls
rows, while the inner loop controls columns. Both loops increment their counters
until they reach 3, printing all coordinate combinations.

## while Loop with User Input

While loops are ideal for processing user input until a specific condition is
met. They can repeatedly prompt users until valid input is received.

WhileWithInput.kt
  

package com.zetcode

fun main() {

    var input: String?
    var valid = false
    
    while (!valid) {
        print("Enter 'quit' to exit: ")
        input = readLine()
        
        if (input == "quit") {
            valid = true
            println("Goodbye!")
        } else {
            println("You entered: $input")
        }
    }
}

This loop continues prompting for input until the user enters "quit". The valid
flag controls loop execution. The loop exits when valid becomes true after
receiving the quit command. Otherwise, it echoes the input back to the user.

## while Loop with continue

The continue statement skips the current iteration and proceeds to
the next one. This is useful for skipping specific values while continuing the
loop.

WhileWithContinue.kt
  

package com.zetcode

fun main() {

    var num = 0
    
    while (num &lt; 10) {
        num++
        
        if (num % 2 == 0) {
            continue
        }
        
        println("Odd number: $num")
    }
}

This loop prints only odd numbers between 1 and 10. When num is even, continue
skips the print statement and moves to the next iteration. The loop still
increments num each time but only prints odd values.

## Best Practices for while Loops

**Ensure termination:** Always guarantee your loop condition will
eventually become false to prevent infinite loops.
**Prefer for loops:** Use for loops when iterating over ranges or
collections unless you need while's flexibility.
**Initialize variables:** Properly initialize loop control
variables before the loop starts.
**Update variables:** Remember to update loop variables within
the loop body to avoid infinite loops.
**Keep conditions simple:** Complex conditions make code harder
to understand and maintain.

## Source

[Kotlin While Loops Documentation](https://kotlinlang.org/docs/control-flow.html#while-loops)

This tutorial covered Kotlin's while keyword in depth, showing both
basic and advanced usage patterns. We explored standard while loops, do-while
variants, and practical applications with collections and user input. Proper use
of while loops can make your Kotlin programs more flexible and powerful.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).