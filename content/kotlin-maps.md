+++
title = "Kotlin maps"
date = 2025-08-29T20:02:42.816+01:00
draft = false
description = "Kotlin map tutorial shows how to work with maps in Kotlin. A list is a generic ordered collection of elements."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin maps

last modified January 29, 2024

In this article we show how to work with maps in Kotlin. A map is a collection
of pairs of objects.

Kotlin distinguishes between read-only and mutable maps. Read-only maps are
created with mapOf and mutable maps with
mutableMapOf.

A map is a collection that holds pairs of objects. Each pair consists
of a key and a value. Map keys are unique; the map holds only one value for each
key. 

## Kotlin mapOf

The mapOf method creates a read-only map with the specified
contents, given as a list of pairs where the first value is the key and the
second is the value.

MapOf.kt
  

package com.zetcode

fun main() {

    val chars = mapOf(97 to "a", 98 to "b", 120 to "x")
    println(chars)

    val user = mapOf("name" to "Luke", "age" to "23")
    println(user)
}

The example creates two maps. 

{97=a, 98=b, 120=x}
{name=Luke, age=23}

## Kotlin HashMap

A map can be created from Java's HashMap.

HashMap.kt
  

package com.zetcode

fun main() {

    val items = HashMap&lt;String, Int&gt;()

    items["A"] = 90
    items["B"] = 80
    items["C"] = 70

    for ((k, v) in items) {
        println("$k = $v")
    }
}

The example creates a map using Java's HashMap
and prints the values and pairs to the console.

## Kotlin map size

The size of a map (the number of pairs) can be determined 
with the size property and the count
method.

MapSize.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

    println("Map has ${items.size} items")
    println("Map has ${items.count()} items")

    val n = items.count { it.value &gt; 10 }
    println("# of values greater that 10: $n")
}

The example counts the number of map pairs. 

val n = items.count { it.value &gt; 10 }

With the count method we count the number 
of values that are greater than ten.

Map has 4 items
Map has 4 items
# of values greater that 10: 3

## Kotlin entries, keys, values

A Kotlin map has properties to get all entries, keys, and values.    

EntriesKeysValues.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33)

    println("Entries: " + items.entries)
    println("Keys:" + items.keys)
    println("Values:" + items.values)
}

The example uses the entries, keys, and 
values properties.

Entries: [coins=12, books=45, cups=33]
Keys:[coins, books, cups]
Values:[12, 45, 33]

## Kotlin mutableMapOf

A mutable map is created with mutableMapOf.

MutableMap.kt
  

package com.zetcode

fun main() {

    val user = mutableMapOf("name" to "John Doe", "occupation" to "programmer")
    println(user)

//    user.put("location", "USA")
    user["location"] = "USA"
    println(user)

    user.remove("occupation")
    println(user)

    user.clear()
    println(user)

    if (user.isEmpty()) {
        println("empty")
    } else {
        println("not empty")
    }
}

The example creates a mutable map and presents of its methods.

//    user.put("location", "USA")
user["location"] = "USA"
println(user)

A new pair is added to the map. IntelliJ IDEA recommends the assignment operation.

user.remove("occupation")

A pair is deleted with remove.

user.clear()

All pairs are removed with clear.

if (user.isEmpty()) {
    println("empty")
} else {
    println("not empty")
}

The isEmpty method checks if the map is empty.

{name=John Doe, occupation=programmer}
{name=John Doe, occupation=programmer, location=USA}
{name=John Doe, location=USA}
{}
empty

## Kotlin get values

There are several methods to retrieve values from a Kotlin map.    

MapGet.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

//    println(items.get("coins"))
    println(items["coins"])

    println(items.getValue("coins"))

    println(items.getOrDefault("pens", 0))
    println(items.getOrDefault("pencils", 0))

    val nOfPencils = items.getOrElse("pencils", {
        0
    })

    println(nOfPencils)
}

The example gets values from a map.

//    println(items.get("coins"))
println(items["coins"])

IntelliJ IDEA recommends to use the indexing operation instead of get. 

println(items.getOrDefault("pens", 0))

The getOrDefault returns the value corresponding to the key or the
specified default value if the key is not present.

val nOfPencils = items.getOrElse("pencils", {
    0
})

The getOrElse  returns the value for the given key, or the result
of the specified function if there was no entry for the given key.

## Kotlin contains key/value

The containsKey checks if the map contains a key. The
containsValue checks if the map contains a value.

MapContains.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

    if (items.containsKey("cups")) {

        println("contains cups")
    } else {

        println("does not contain cups")
    }

    val value = 25

    if (items.containsValue(value)) {

        println("contains value $value")
    } else {

        println("does not contain value $value")
    }
}

The example checks if the map contains key "cups" and 
value 25.

## Kotlin map forEach

With forEach, we can traverse the map.

MapForEach.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

    items.forEach { (k, v) -&gt; println("There are $v $k") }
}

The example goes through the map with forEach.

There are 12 coins
There are 45 books
There are 33 cups
There are 2 pens

## Kotlin filter map

We can filter maps with filterKeys, filterValues, 
and filter.

MapFilter.kt
  

package com.zetcode

fun main() {

    val items = mapOf("A" to 90, "B" to 80, "C" to 70, "D" to 60, "E" to 50)

    val filtered = items.filterKeys { it == "A" || it == "C" }
    println(filtered)

    val filtered2 = items.filterValues { it &gt;= 70 }
    println(filtered2)

    val filtered3 = items.filter { it.key == "A" || it.value == 50 }
    println(filtered3)
}

The example filters a map.

val filtered = items.filterKeys { it == "A" || it == "C" }

We filter out all pairs that match the specified keys.

val filtered2 = items.filterValues { it &gt;= 70 }

We filter out all pairs that match the specified values.

val filtered3 = items.filter { it.key == "A" || it.value == 50 }

Here we filter out all pairs that match the given key or value.

{A=90, C=70}
{A=90, B=80, C=70}
{A=90, E=50}

## Kotlin map maxOf &amp; minOf

The maxOf returns the largest value among all values produced by
selector function applied to each element in the array. The minOf
returns the smallest value among all values produced by selector function
applied to each element in the array.

MinMax.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val salary: Int)

fun main() {

    val users = mapOf(
        1 to User("John", "Doe", 1230),
        2 to User("Lucy", "Novak", 670),
        3 to User("Ben", "Walter", 2050),
        4 to User("Robin", "Brown", 2300),
        5 to User("Amy", "Doe", 1250),
        6 to User("Joe", "Draker", 1190),
        7 to User("Janet", "Doe", 980),
        8 to User("Albert", "Novak", 1930)
    )

    val maxSalary = users.maxOf { it.value.salary }
    println(maxSalary)

    val minSalary = users.minOf { it.value.salary }
    println(minSalary)
}

In the example, we find out the smallest and largest salary. 

## Kotlin sorted map

A sorted map is created with sortedMapOf.

SortedMap.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)
    println(items)

    val sortedItems = sortedMapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)
    println(sortedItems)
}

The example prints an unsorted and sorted map.

{coins=12, books=45, cups=33, pens=2}
{books=45, coins=12, cups=33, pens=2}

The pairs are sorted by keys.

## Kotlin map any

The any method returns true if at least one 
entry matches the given predicate.

MapAny.kt
  

package com.zetcode

fun main() {

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

    val value = 12

    val hasValue = items.any { it.value == value }

    if (hasValue) {
        println("The map has value $value")
    } else {
        println("The map does not have value $value")
    }

    val isEven: (Int) -&gt; Boolean = { it % 2 == 0 }

    val hasEvenValue = items.any { isEven(it.value) }

    if (hasEvenValue) {
        println("The map has even value(s)")
    } else {
        println("The map does not have even value(s)")
    }
}

In the example, we check if the map contains at least one value 12 and 
if there is at least one even value.

The map has value 12
The map has even value(s)

## Source

[Kotlin Map - language reference](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.collections/-map/)

In this article we have covered Kotlin maps.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).