+++
title = "Kotlin !in Keyword"
date = 2025-08-29T20:02:43.934+01:00
draft = false
description = "Kotlin !in keyword tutorial shows how to check for absence of elements in collections and ranges. Learn about negation of in operator with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin !in Keyword

last modified April 19, 2025

Kotlin's `!in` operator checks for the absence of an element in a collection
or range. It is the negation of the `in` operator. This tutorial explores the
`!in` keyword in depth with practical examples.

## Basic Definitions

The `!in` keyword in Kotlin is a negation operator that checks if an element
is not present in a collection or range. It returns true when the element is
absent and false when present. It works with all types that support the `in`
operator.

## Checking Absence in Lists

The most common use of `!in` is to check if an element is not in a list. This
is more readable than writing `!(element in list)`. The example shows basic
usage with a list of strings.

ListCheck.kt
  

package com.zetcode

fun main() {

    val colors = listOf("red", "green", "blue")
    val color = "yellow"
    
    if (color !in colors) {
        println("$color is not in the list")
    }
}

Here we check if "yellow" is not in the colors list. Since it's absent, the
condition evaluates to true and the message is printed. This is clearer than
negating the `in` check.

## Checking Absence in Ranges

The `!in` operator works with ranges to check if a value is outside the range.
This is useful for validating input values or checking boundary conditions.
The example demonstrates numeric range checking.

RangeCheck.kt
  

package com.zetcode

fun main() {

    val validRange = 1..100
    val value = 105
    
    if (value !in validRange) {
        println("$value is out of valid range")
    }
}

We check if 105 is outside the 1..100 range. Since it is, the condition is true
and the message prints. This is more concise than writing `!(value in validRange)`.

## Checking Absence in Maps

With maps, `!in` checks for the absence of a key. This is useful when you want
to avoid overwriting existing entries. The example shows key absence checking.

MapCheck.kt
  

package com.zetcode

fun main() {

    val capitals = mapOf(
        "France" to "Paris",
        "Germany" to "Berlin"
    )
    
    val country = "Spain"
    
    if (country !in capitals) {
        println("$country is not in the map")
    }
}

We check if "Spain" is not a key in the capitals map. Since it's absent, the
message prints. Note that `!in` checks keys, not values, in map collections.

## Checking Absence in Strings

The `!in` operator can check if a character is not present in a string. This
is useful for input validation or text processing. The example demonstrates
character checking.

StringCheck.kt
  

package com.zetcode

fun main() {

    val vowels = "aeiou"
    val letter = 'z'
    
    if (letter !in vowels) {
        println("$letter is not a vowel")
    }
}

We check if 'z' is not in the vowels string. Since it's absent, the message
prints. This is a clean way to check for excluded characters in input validation.

## Custom Classes with !in

For custom classes to work with `!in`, they must implement the `contains()`
function. The example shows a custom range class that supports `!in` checks.

CustomClass.kt
  

package com.zetcode

class TemperatureRange(val min: Int, val max: Int) {
    operator fun contains(temp: Int) = temp in min..max
}

fun main() {

    val validTemps = TemperatureRange(10, 30)
    val currentTemp = 35
    
    if (currentTemp !in validTemps) {
        println("$currentTemp°C is dangerous")
    }
}

The TemperatureRange class implements `contains()` to support `in` and `!in`.
We check if 35°C is outside the valid range. Since it is, the warning message
prints. This shows how to extend `!in` to custom types.

## !in with when Expressions

The `!in` operator works well with Kotlin's `when` expressions for concise
conditional logic. The example demonstrates using `!in` in a when expression.

WhenExpression.kt
  

package com.zetcode

fun main() {

    val forbidden = setOf("admin", "root", "system")
    val username = "guest"
    
    when (username) {
        !in forbidden -&gt; println("Access granted")
        else -&gt; println("Access denied")
    }
}

We check if "guest" is not in the forbidden usernames set. Since it's absent,
the "Access granted" message prints. This shows how `!in` can simplify when
expressions for exclusion checks.

## !in with Smart Casts

Combining `!in` with smart casts allows for powerful type-safe checks. The
example shows how to exclude certain types from processing using `!in`.

SmartCast.kt
  

package com.zetcode

fun process(value: Any) {
    if (value !in listOf(1, 2, 3)) {
        println("Processing $value")
    }
}

fun main() {

    process(4) // Output: Processing 4
    process(2) // No output
}

The function processes values that aren't 1, 2, or 3. The `!in` check combined
with smart casting makes this exclusion clear and concise. This pattern is useful
for filtering inputs.

## Best Practices for !in Operator

**Prefer !in over negation:** Use `!in` instead of `!(x in y)`
for better readability.
**Use with meaningful names:** Name collections/ranges clearly
to make `!in` checks self-documenting.
**Combine with when:** `!in` works well in when expressions
for exclusion patterns.
**Consider performance:** For large collections, be aware that
`!in` performs a linear search in lists.
**Extend carefully:** Only implement `contains()` for custom
classes when `in`/`!in` semantics make sense.

## Source

[Kotlin Operator Overloading Documentation](https://kotlinlang.org/docs/operator-overloading.html#in-operator)

This tutorial covered Kotlin's `!in` keyword in depth, showing how to check for
absence in collections, ranges, and custom types. We explored various scenarios
including strings, maps, and smart casts. Proper use of `!in` can make your
exclusion checks more readable and expressive.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).