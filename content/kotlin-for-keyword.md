+++
title = "Kotlin for Keyword"
date = 2025-08-29T20:02:35.072+01:00
draft = false
description = "Kotlin for keyword tutorial shows how to perform looping in Kotlin. Learn about ranges, arrays, lists, and custom iterators with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin for Keyword

last modified April 19, 2025

Kotlin's for loop provides a concise way to iterate over ranges, arrays,
collections, and other iterable objects. The for keyword is central
to looping operations. This tutorial explores the for keyword in
depth with practical examples.

## Basic Definitions

The for keyword in Kotlin is used for iteration. It works with any
object that provides an iterator. Unlike some languages, Kotlin's for loop is
always used in the context of iteration over a range or collection.

## Iterating Over a Range

The simplest use of for is to iterate over a range of numbers. Kotlin
provides the .. operator to create ranges that can be used in for
loops.

RangeIteration.kt
  

package com.zetcode

fun main() {

    for (i in 1..5) {
        println(i)
    }
}

This example prints numbers from 1 to 5. The 1..5 creates an
inclusive range. The loop variable i takes each value in the range
sequentially. This is the most basic form of for loop in Kotlin.

## Iterating Over a Range with Step

Kotlin allows specifying a step value when iterating over ranges. This controls
the increment between consecutive values in the iteration.

RangeStep.kt
  

package com.zetcode

fun main() {

    for (i in 1..10 step 2) {
        println(i)
    }
}

Here we print odd numbers between 1 and 10. The step 2 modifier
makes the loop increment by 2 instead of 1. This is useful when you need to skip
elements during iteration.

## Iterating Over an Array

The for loop can iterate over arrays and other collections. The
syntax remains the same as with ranges, making it consistent across different
iterable types.

ArrayIteration.kt
  

package com.zetcode

fun main() {

    val fruits = arrayOf("Apple", "Banana", "Cherry")
    
    for (fruit in fruits) {
        println(fruit)
    }
}

This example iterates over an array of strings. The loop variable fruit
takes each array element in sequence. The same syntax works for lists, sets, and
other collection types.

## Iterating With Index

Sometimes you need both the element and its index during iteration. Kotlin
provides the withIndex function for this purpose.

IndexedIteration.kt
  

package com.zetcode

fun main() {

    val colors = listOf("Red", "Green", "Blue")
    
    for ((index, color) in colors.withIndex()) {
        println("$index: $color")
    }
}

Here we use destructuring to get both index and value in each iteration. The
withIndex function returns an iterable of index-value pairs. This
is cleaner than manually managing a counter variable.

## Iterating Over a Map

Maps can be iterated using the for loop, with destructuring to
access keys and values. Kotlin provides several ways to iterate over map entries.

MapIteration.kt
  

package com.zetcode

fun main() {

    val map = mapOf(1 to "One", 2 to "Two", 3 to "Three")
    
    for ((key, value) in map) {
        println("$key = $value")
    }
}

This example demonstrates map iteration using destructuring. Each map entry is
decomposed into key and value components. The same
syntax works for both mutable and immutable maps.

## Iterating Over a String

Strings are iterable in Kotlin, allowing you to process each character in a
string using a for loop. This is useful for character-by-character
processing.

StringIteration.kt
  

package com.zetcode

fun main() {

    val text = "Kotlin"
    
    for (ch in text) {
        println(ch)
    }
}

Here we iterate over each character in the string "Kotlin". The loop variable
ch takes each character in sequence. This approach is cleaner than
using traditional indexed access.

## Custom Iterators

You can make any class iterable by implementing the Iterator
interface. This allows your custom types to work with for loops.

CustomIterator.kt
  

package com.zetcode

class Countdown(val start: Int) : Iterable&lt;Int&gt; {
    override fun iterator(): Iterator&lt;Int&gt; {
        return object : Iterator&lt;Int&gt; {
            var current = start
            override fun hasNext() = current &gt; 0
            override fun next() = current--
        }
    }
}

fun main() {

    for (i in Countdown(5)) {
        println(i)
    }
}

This example creates a custom countdown iterator. The Countdown class
implements Iterable, allowing it to be used in a for loop. The loop
prints numbers from 5 down to 1.

## Best Practices for For Loops

**Prefer for over while:** Use for when the number of iterations
is known or derived from a collection.
**Use meaningful names:** Choose descriptive names for loop
variables to improve readability.
**Leverage destructuring:** Use destructuring when you need both
index and value or key and value.
**Consider functional alternatives:** For simple transformations,
consider using forEach or other collection functions.
**Optimize ranges:** Use until for exclusive ranges
and downTo for descending iteration when appropriate.

## Source

[Kotlin For Loops Documentation](https://kotlinlang.org/docs/control-flow.html#for-loops)

This tutorial covered Kotlin's for keyword in depth, showing various
iteration scenarios including ranges, collections, and custom iterators. The for
loop is a fundamental construct that makes iteration concise and readable in
Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).