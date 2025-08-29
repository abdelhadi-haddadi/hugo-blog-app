+++
title = "Kotlin when expression"
date = 2025-08-29T20:03:00.885+01:00
draft = false
description = "Kotlin when expression tutorial shows how to use when expressions in Kotlin. When expression is a replacement of a switch statement known from C family of languages."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin when expression

last modified January 29, 2024

This article shows how to use when expressions in Kotlin. A when expression is a
replacement of a switch statement known from C family of languages.

Kotlin is a statically-typed programming language that runs on the
Java virtual machine.

Kotlin when matches its argument against all branches sequentially until some
branch condition is satisfied. It can be used either as an expression or
as a statement. If it is used as an expression, the value of the satisfied
branch becomes the value of the overall expression.

## Kotlin when simple example

The following is a simple example which uses when expression
with days of week.

day_of_week.kt
  

package com.zetcode

fun main() {

    val dayOfWeek = 3

    when (dayOfWeek) {
        1 -&gt; println("monday")
        2 -&gt; println("tuesday")
        3 -&gt; println("wednesday")
        4 -&gt; println("thursday")
        5 -&gt; println("friday")
        6 -&gt; println("saturday")
        7 -&gt; println("sunday")
        else -&gt; println("invalid day")
    }
}

In the example, we print the day of week based on an integer value.
Seven different brances are tested sequentially. If one of them is satisfied,
the rest are skipped. If none of them is satisfied, the else branch is
executed.

## Kotlin when grouping values

It is possible to group values in branches with the comma operator.

day_of_week2.kt
  

package com.zetcode

fun main() {

    val dayOfWeek = 5

    when (dayOfWeek){
        1,2,3,4,5 -&gt; println("weekday")
        6,7 -&gt; println("weekend")
        else -&gt; println("wrong value")
    }
}

In the example, we group values to form two branches: for weekdays and for weekend.

## Kotlin when expression example

Kotlin when can be used as an expression. The value of the satisfied branch
is returned.

when_expression.kt
  

package com.zetcode

import java.time.DayOfWeek
import java.time.LocalDate

fun main() {

    val dayOfWeek: DayOfWeek = LocalDate.now().dayOfWeek

    val msg:String = when (dayOfWeek) {
        DayOfWeek.MONDAY -&gt; "It is monday"
        DayOfWeek.TUESDAY -&gt; "It is tuesday"
        DayOfWeek.WEDNESDAY -&gt; "It is tuesday"
        DayOfWeek.THURSDAY -&gt; "It is tuesday"
        DayOfWeek.FRIDAY -&gt; "It is tuesday"
        DayOfWeek.SATURDAY -&gt; "It is tuesday"
        DayOfWeek.SUNDAY -&gt; "It is tuesday"
        else -&gt; "Invalid day of week"
    }

    println(msg)
}

We determine the current weekday. The string from the matched branch is assigned
to the msg variable, which is later printed to the console.

## Kotlin when ranges

We can test ranges of values in when branches. (This can be done also
with collections.)

age_groups.kt
  

package com.zetcode

fun main() {

    val age = 40

    when (age) {
        in 0..14 -&gt; println("children")
        in 15..24 -&gt; println("youth")
        in 25..64 -&gt; println("adults")
        in 65..120 -&gt; println("seniors")
        in 120..130 -&gt; println("unlikely age")
        else -&gt; println("wrong age value")
    }
}

We have an age variable. We assign the value to an age group using
Kotlin ranges.

## Kotlin when enums

Kotlin when expression can be used with enums.

when_enums.kt
  

package com.zetcode

enum class Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

fun main() {

    val season = Season.SUMMER

    when (season) {

        Season.SPRING -&gt; println("It is spring")
        Season.SUMMER -&gt; println("It is summer")
        Season.AUTUMN -&gt; println("It is autumn")
        Season.WINTER -&gt; println("It is winter")
    }
}

We have a Season enum. We pass the enum as the
argument of the when expression.

## Kotlin when without argument

Kotlin when expression can be used without an argument.

random_val.kt
  

package com.zetcode

import java.util.Random

fun main() {

    val r:Int = Random().nextInt(10) - 5

    when {
        r &lt; 0 -&gt; println("negative value")
        r == 0 -&gt; println("zero")
        r &gt; 0 -&gt; println("positive value")
    }
}

In the example, we generate a random value. We test the value
with the when expression without passing it as an argument in
round brackets.

## Kotlin when types

We can check for types with the is operator.

when_types.kt
  

package com.zetcode 

fun main() {

    val data = listOf&lt;Any&gt;("sparrow", 12, true, intArrayOf(1, 2, 3), 12.1)

    data.forEach { e -&gt;

        when (e) {
            is String -&gt; println("$e is a string")
            is Int -&gt; println("$e is an integer")
            is Boolean -&gt; println("$e is a boolean")
            is IntArray-&gt; println("[${e.joinToString()}] is an array of integers")
            is Double -&gt; println("$e is a double")
            else -&gt; println("$e is unknown")
        }
    }
}

In the example, we check for a type of a variable in a when
expression.

## Source

[Kotlin conditions and loops](https://kotlinlang.org/docs/control-flow.html)

In this article we have covered when expression in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).