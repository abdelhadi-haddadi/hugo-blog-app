+++
title = "Kotlin predicate"
date = 2025-08-29T20:02:48.461+01:00
draft = false
description = "Kotlin predicate tutorial shows how to work with predicates. A predicate is a single argument function which returns a boolean value."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin predicate

last modified January 29, 2024

This article shows how to use predicates in Kotlin.

## Predicate

Predicate in general meaning is a statement about something that is either true
or false. In programming, predicates represent single argument functions that
return a boolean value.

## Kotlin predicate example

The following example creates a simple Kotlin predicate.

main.kt
  

fun main() {

    val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

    val r = vals.find { e -&gt; isNegative(e) }
    println(r)
}

fun isNegative(e: Int): Boolean {

    return e &lt; 0
}

In the example, the predicate is used to filter out positive values.

val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

We have a list of integer values.

val r = vals.find { e -&gt; isNegative(e) }

The find function returns the first element matching the given
predicate, or null if no such element was found. We pass the
isNegative function.

fun isNegative(e: Int): Boolean {

    return e &lt; 0
}

The isNegative function returns true for each value that is greater
than zero.

The following is a small modification of the previous example.

main.kt
  

fun main() {

    val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

    val r = vals.find { isNegative(it) }
    println(r)
}

fun isNegative(e: Int): Boolean {
    return e &lt; 0
}

In this example, we use the it: the implicit name for a single
argument parameter.

## Kotlin anonymous predicate

In the next example, we use an anonymous predicate function.

main.kt
  

fun main() {

    val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

    val r = vals.find { e -&gt; e &lt; 0 }
    println(r)

}

In this example, the predicate is defined as a anonymous lambda expression.

Finally, we have a lambda expression with it.

main.kt
  

fun main() {

    val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

    val r = vals.find { it &lt; 0 }
    println(r)
}

This is the shortest syntax.

## Kotlin filter predicate example

The filter function returns a list containing only elements
matching the given predicate.

main.kt
  

fun main() {

    val vals = listOf(1, 2, 0, 5, -4, 5, -6, 7, 8, 3)

    val r1 = vals.filter { it &lt; 0 }
    println(r1)

    val r2 = vals.filter { it &gt; 0 }
    println(r2)
}

In the example, we filter out negative and positive values.

## Kotlin predicate multiple conditions

The next example uses a predicate with two conditions.

main.kt
  

data class Country(val name: String, val population: Int)

fun main() {

    val countries = listOf(
        Country("Iran", 80840713),
        Country("Hungary", 9845000),
        Country("Poland", 38485000),
        Country("India", 1342512000),
        Country("Latvia", 1978000),
        Country("Vietnam", 95261000),
        Country("Sweden", 9967000),
        Country("Iceland", 337600),
        Country("Israel", 8622000)
    )

    val r = countries.filter {
        it.name.startsWith("I")
                &amp;&amp; it.population &gt; 100_000
    }

    r.forEach { println(it) }
}

We create a list of countries. We find all countries that start with 'I' and
have population over one million. 

val r = countries.filter {
    it.name.startsWith("I")
            &amp;&amp; it.population &gt; 100_000
}

We combine two expression with the and operator.

## Kotlin negating predicates

We have functions that negate the given predicates.

main.kt
  

fun main() {

    val words = listOf(
        "falcon", "cup", "wood", "tree", "top", "car",
        "rock", "cloud", "new", "rain", "forest"
    );

    val r = words.filterNot { it.length == 3 }
    println(r)
}

With filterNot, we find all elements that do not match the given 
predicate. We find all strings whose length is not three latin characters.

## Source

[Kotlin reference documentation](https://kotlinlang.org/docs/home.html)

In this article we have covered predicates in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).