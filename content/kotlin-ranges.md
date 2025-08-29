+++
title = "Kotlin Ranges"
date = 2025-08-29T20:02:50.685+01:00
draft = false
description = "Kotlin Ranges tutorial shows how to work with ranges in Kotlin. A range is a succession of values between defined lower and upper limits."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Ranges

last modified January 29, 2024

This article shows how to work with ranges in Kotlin.

A range is a succession of values between defined lower and upper 
limits. 

A Kotlin range is created with the .. operator or with 
the rangeTo and downTo functions.
Kotlin ranges are inclusive by default; that is, 1..3 creates a range
of 1, 2, 3 values. The distance between two values is defined by the
step; the default step is 1.

## Kotlin range creation

The following example shows how to create simple ranges in Kotlin.

KotlinRangeCreate.kt
  

package com.zetcode

fun main() {

    for (i in 1..30)
        print("$i ")

    println()

    for (i in 30 downTo 1)
        print("$i ")

    println()

    for (i in 1.rangeTo(30))
        print("$i ")

    println()

    for (i in 30.downTo(1))
        print("$i ")

    println()
}

The example creates four ranges of values.

for (i in 1..30)
    print("$i ")

The 1..30 creates a succession of values from 1 to 30, 
including the bounds. We use the for loop to go through
the range.

for (i in 30 downTo 1)
    print("$i ")

With the downTo keyword, we create a succession of values
descending from 30 to 1.

for (i in 1.rangeTo(30))
    print("$i ")

The rangeTo function creates a range of values between
the defined bounds; it is an equivalent of the .. operator.

1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 
30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 
30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1 

## Kotlin range of characters

We can create a range of characters in Kotlin.

KotlinRangeChars.kt
  

package com.zetcode

fun main() {

    for (c in 'a'..'k')
        print("$c ")

    println()

    for (c in 'k' downTo 'a')
        print("$c ")
}

The example creates two ranges of letters in ascending and descending
orders.

for (c in 'a'..'k')
    print("$c ")

We create and print 'a' to 'k' characters.

for (c in 'k' downTo 'a')
    print("$c ")

We create and print 'k' to 'a' characters.

a b c d e f g h i j k 
k j i h g f e d c b a

## Kotlin range forEach

We can use the forEach function to traverse the range
of values.

KotlinRangeForEach.kt
  

package com.zetcode

fun main() {

    (1..5).forEach(::println)

    (1..5).reversed().forEach { e -&gt; print("$e ") }
}

The example uses the forEach function to traverse 
the ranges.

(1..5).forEach(::println)

With the forEach function, we print all the values from
range 1..5.

(1..5).reversed().forEach { e -&gt; print("$e ") }

In this line, we reverse the range with reversed and
loop over the range with forEach.

1
2
3
4
5
5 4 3 2 1 

## Kotlin range iterator

We can use the classic iterator to loop over a range in Kotlin.

KotlinRangeIterator.kt
  

package com.zetcode

fun main() {

    val chars = ('a'..'f')
    val it = chars.iterator()

    while (it.hasNext()) {

        val e = it.next()
        println(e)
    }
}

The example uses an iterator to loop over a range of characters.

val chars = ('a'..'f')
val it = chars.iterator()

We create a range of characters and an iterator from this range.

while (it.hasNext()) {

    val e = it.next()
    println(e)
}

In a while loop, we go over the elements of the range. The 
hasNext method checks if there is a next 
element in the range and the next method returns the
next element in the range.

a
b
c
d
e
f

## Kotlin range step

With the step keyword, we can define a step between
the values of a range.

KotlinRangeStep.kt
  

package com.zetcode

fun main() {
    
    for (e in 1..20 step 2) {
        print("$e ")
    }

    println()

    for (e in 1..20 step 5) {
        print("$e ")
    }

    println()

    println((1..10 step 2).last)
    println((1..10 step 3).first)
    println((1..10 step 4).step)

    println()
}

The example shows how to use step in Kotlin ranges.

for (e in 1..20 step 2) {
    print("$e ")
}

The for loop goes through the values of a range. The range has step 2. 

println((1..10 step 2).last)
println((1..10 step 3).first)
println((1..10 step 4).step)

A Kotlin range contains last, first, and 
step attributes, which return the last, first values and the step.

1 3 5 7 9 11 13 15 17 19 
1 6 11 16 
9
1
4

## Kotlin range filter, reduce, map

Kotlin ranges contain filter, reduce, and map operations.

KotlinRangeFilterReduceMap.kt
  

package com.zetcode

fun main() {

    val rnums = (1..15)

    println(rnums)

    val r = rnums.filter { e -&gt; e % 2 == 0 }
    println(r)

    val r2 = rnums.reduce { total, next -&gt; next * 2 - 1 }
    println(r2)

    var r3 = rnums.map { e -&gt; e * 5 }
    println(r3)
}

The example applies filtering, reduction, and mapping on a range.

val r = rnums.filter { e -&gt; e % 2 == 0 }

With the filter function we filter out even numbers. Even numbers
can be divided by two without a remainder. The operation returns a list of
values.

val r2 = rnums.reduce { total, next -&gt; next * 2 - 1 }

The reduction operation applies the given expression on each of the range
elements to produce a single value.

var r3 = rnums.map { e -&gt; e * 5 }

The mapping operation applies the given operation on each of the elements. The
mapping returns a list of modified values.

1..15
[2, 4, 6, 8, 10, 12, 14]
29
[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]

## Kotlin range min, max, sum, average

Kotlin ranges contain predefined reduction operations, including
min, max, sum, and average

KotlinRangeMinMaxSumAvg.kt
  

package com.zetcode

fun main() {

    val r = (1..10)

    println(r.min())
    println(r.max())
    println(r.sum())    
    println(r.average())
}

The example prints the minimum, maximum, summation, and average of a range of
1..10 values.

1
10
55
5.5

## Source

[Kotlin ranges and progressions](https://kotlinlang.org/docs/ranges.html)

In this article we have covered Kotlin ranges.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).