+++
title = "Kotlin Set Keyword"
date = 2025-08-29T20:02:52.924+01:00
draft = false
description = "Kotlin set keyword tutorial shows how to work with sets in Kotlin. Learn about immutable and mutable sets, set operations, and set-specific functions with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Set Keyword

last modified April 19, 2025

Kotlin's collection framework provides powerful tools for working with unique
elements. The set keyword and related types help manage unordered
collections of distinct items. This tutorial explores sets in depth with
practical examples.

## Basic Definitions

A set in Kotlin is an unordered collection of unique elements. The main set types
are Set (read-only) and MutableSet (modifiable). Sets
don't allow duplicate elements and don't maintain insertion order by default.

## Creating a Basic Set

The simplest way to create a set is using the setOf function. This
creates an immutable set that cannot be modified after creation.

BasicSet.kt
  

package com.zetcode

fun main() {

    val colors = setOf("Red", "Green", "Blue")
    println(colors) // Output: [Red, Green, Blue]
    
    val numbers = setOf(1, 2, 3, 2, 1)
    println(numbers) // Output: [1, 2, 3]
}

This example shows two immutable sets. The second set demonstrates that duplicates
are automatically removed. The output shows only unique elements in each set.

## Creating a Mutable Set

For modifiable sets, use mutableSetOf. This creates a
MutableSet that allows adding and removing elements.

MutableSet.kt
  

package com.zetcode

fun main() {

    val fruits = mutableSetOf("Apple", "Banana")
    fruits.add("Orange")
    fruits.remove("Apple")
    
    println(fruits) // Output: [Banana, Orange]
    println("Size: ${fruits.size}") // Output: Size: 2
}

Here we create a mutable set and modify it by adding and removing elements. The
size property shows the current number of elements in the set.

## HashSet Implementation

Kotlin provides hashSetOf to create a HashSet. This
implementation offers better performance for certain operations but doesn't
maintain order.

HashSetExample.kt
  

package com.zetcode

fun main() {

    val ids = hashSetOf(101, 102, 103, 104)
    println(ids) // Output order may vary
    
    ids.add(105)
    println(ids.contains(103)) // Output: true
    println(ids.first()) // Output: random element
}

This HashSet example shows unordered storage. The contains method
checks for element presence efficiently. The first method returns
an arbitrary element.

## Set Operations

Kotlin sets support mathematical set operations like union, intersection, and
difference. These operations return new sets without modifying the originals.

SetOperations.kt
  

package com.zetcode

fun main() {

    val setA = setOf(1, 2, 3, 4)
    val setB = setOf(3, 4, 5, 6)
    
    println(setA union setB) // Output: [1, 2, 3, 4, 5, 6]
    println(setA intersect setB) // Output: [3, 4]
    println(setA subtract setB) // Output: [1, 2]
}

This demonstrates three fundamental set operations. Union combines elements from
both sets. Intersection shows common elements. Subtract shows elements in the
first set but not the second.

## Checking Set Membership

Sets provide efficient ways to check for element presence using the
in operator or contains method.

SetMembership.kt
  

package com.zetcode

fun main() {

    val vowels = setOf('a', 'e', 'i', 'o', 'u')
    
    println('a' in vowels) // Output: true
    println('x' in vowels) // Output: false
    println(vowels.contains('e')) // Output: true
    
    val testChars = setOf('a', 'b', 'c')
    println(vowels.containsAll(testChars)) // Output: false
}

The example checks for single character membership and tests if all elements of
another set are present. Sets are optimized for these membership tests.

## Filtering and Transforming Sets

Sets support functional operations like filter and
map similar to other collections. These operations return new sets.

SetTransforms.kt
  

package com.zetcode

fun main() {

    val numbers = setOf(1, 2, 3, 4, 5, 6, 7, 8, 9)
    
    val evens = numbers.filter { it % 2 == 0 }
    println(evens) // Output: [2, 4, 6, 8]
    
    val squares = numbers.map { it * it }
    println(squares) // Output: [1, 4, 9, 16, 25, 36, 49, 64, 81]
    
    val smallSquares = numbers.map { it * it }
                            .filter { it &lt; 20 }
    println(smallSquares) // Output: [1, 4, 9, 16]
}

This shows filtering even numbers, mapping numbers to their squares, and chaining
operations. Note that the results are still sets with unique elements.

## Sorted Sets

For ordered sets, Kotlin provides sortedSetOf which maintains
elements in their natural order. This uses a TreeSet implementation internally.

SortedSetExample.kt
  

package com.zetcode

fun main() {

    val randomNumbers = sortedSetOf(5, 2, 8, 1, 7)
    println(randomNumbers) // Output: [1, 2, 5, 7, 8]
    
    val names = sortedSetOf("Zoe", "Alice", "Bob")
    println(names) // Output: [Alice, Bob, Zoe]
    
    val descending = sortedSetOf(compareByDescending { it.length }, "a", "bb", "ccc")
    println(descending) // Output: [ccc, bb, a]
}

The first two examples show natural ordering of numbers and strings. The third
demonstrates custom sorting by string length in descending order.

## Best Practices for Using Sets

**Choose the right type:** Use immutable sets by default and
mutable only when needed.
**Consider performance:** Use HashSet for general cases and
TreeSet when ordering matters.
**Leverage set operations:** Use built-in operations like union
and intersect for cleaner code.
**Check membership efficiently:** Use in or
contains for fast lookups.
**Watch for ordering:** Remember most sets don't maintain
insertion order unless using LinkedHashSet.

## Source

[Kotlin Collections Documentation](https://kotlinlang.org/docs/collections-overview.html)

This tutorial covered Kotlin's set functionality in depth, showing
both immutable and mutable sets. We explored various implementations and
operations. Sets are powerful tools for working with unique elements in your
Kotlin applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).