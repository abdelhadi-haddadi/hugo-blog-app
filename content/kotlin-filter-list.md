+++
title = "Kotlin filter list"
date = 2025-08-29T20:02:33.935+01:00
draft = false
description = "Kotlin filter list tutorial shows how to filter list values in Kotlin language."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin filter list

last modified January 29, 2024

This article shows how to filter list values in Kotlin language.

Kotlin has powerful methods for filtering list data.

The filter method returns a list containing only elements matching
the given predicate. A predicate is a single-argument method that returns a 
boolean value.

## Kotlin filter list example

In the first example, we use the filter function.

simple.kt
  

package com.zetcode

fun main() {

    val vals = listOf(2, -1, 0, 5, 4, 9, -5, 11, 7)

    val res = vals.filter { e -&gt; e &gt; 0 }
    println(res)

    val res2 = vals.filter { e -&gt; e &lt; 0 }
    println(res2)
}

The example filters out positive and negative values from a list of integers.

## Kotlin filterNot

The filterNot method returns values that do not match the given 
predicate.

filternot.kt
  

package com.zetcode

fun main() {

    val vals = listOf(2, -1, 0, 5, 4, 9, -5, 11, 7)

    val res = vals.filterNot { it &gt; 0 }
    println(res)

    val res2 = vals.filterNot { it in listOf(0, 5, 4) }
    println(res2)
}

In the example, we filter out values that are not greater than zero and that 
do not belong to the given list of values.

## Filtering strings

The next example filters strings.

filter_words.kt
  

package com.zetcode

fun main() {

    val words = listOf("war", "cup", "cool", "cloud", "water", 
        "ten", "pen")

    val res = words.filter { e -&gt; e.length == 3 }
    println(res)

    val res2 = words.filter { e -&gt; e.startsWith("w") }
    println(res2)
}

We have a list of words. We filter out all words whose size is equal to three
and that begin with 'w' letter.

## Multiple filter conditions

We can combine the filtering conditions with &amp;&amp; and
|| operators.

multiple.kt
  

package com.zetcode

fun main() {

    val words = listOf("war", "cup", "cool", "cloud", 
        "water", "ten", "pen")

    val res = words.filter { e -&gt; e.startsWith("w") || e.startsWith("c") }
    println(res)

    val res2 = words.filter { e -&gt; e.startsWith("c") &amp;&amp; e.contains("o") }
    println(res2)
}

The example filters out words that begin either with 'w' or 'c' and words that 
begin with 'c' and contain 'o'.

## Kotlin filter objects

The following example fiters car objects.

filter_objects.kt
  

package com.zetcode

data class Car(val name: String, val price: Int)

fun main() {

    val vals = listOf(
        Car("Audi", 52642), Car("Mercedes", 57127),
        Car("Skoda", 9000), Car("Volvo", 29000),
        Car("Bentley", 350000), Car("Citroen", 21000),
        Car("Hummer", 41400), Car("Volkswagen", 21601)
    )

    val res = vals.filter { e -&gt; e.name.startsWith("Vo") }
    println(res)

    val res2 = vals.filter { e -&gt; e.price in 9001..49999 }
    println(res2)
}

We filter out cars whose names begin with "Vo" and cars whose price are in 
the given range. 

## Source

[Kotlin filtering collections - documentation](https://kotlinlang.org/docs/collection-filtering.html)

In this article we have showed how to filter lists in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).