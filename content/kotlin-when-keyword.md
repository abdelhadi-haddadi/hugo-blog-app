+++
title = "Kotlin when Keyword"
date = 2025-08-29T20:03:00.889+01:00
draft = false
description = "Kotlin when keyword tutorial shows how to use powerful conditional expressions in Kotlin. Learn about when as statement and expression with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin when Keyword

last modified April 19, 2025

Kotlin's when keyword is a powerful conditional expression that
replaces Java's switch statement. It offers more flexibility and functionality
than traditional switch statements. This tutorial explores the when
keyword in depth with practical examples.

## Basic Definitions

The when keyword in Kotlin serves as both a statement and an
expression. It can check multiple conditions in a concise way and supports
various matching patterns. Unlike Java's switch, it works with any data type.

## Basic when Expression

The simplest form of when matches a value against several constants.
It's similar to a switch statement but more powerful. Each branch is checked in
order until a match is found.

BasicWhen.kt
  

package com.zetcode

fun main() {

    val x = 2
    
    when (x) {
        1 -&gt; println("x is 1")
        2 -&gt; println("x is 2")
        3 -&gt; println("x is 3")
        else -&gt; println("x is neither 1, 2, nor 3")
    }
}

This example shows a basic when expression matching an integer
value. The output will be "x is 2" since that's the matching case. The else
branch handles all other possibilities.

## when as Expression

when can be used as an expression that returns a value. In this
form, the else branch is required unless the compiler can prove all cases are
covered. Each branch returns a value.

WhenExpression.kt
  

package com.zetcode

fun main() {

    val x = 3
    
    val result = when (x) {
        1 -&gt; "One"
        2 -&gt; "Two"
        3 -&gt; "Three"
        else -&gt; "Unknown"
    }
    
    println(result) // Output: Three
}

Here, when is used as an expression that returns a string. The
value is assigned to result and then printed. This is more concise
than using if-else chains for the same purpose.

## Multiple Conditions in One Branch

when allows combining multiple conditions in a single branch using
commas. This makes the code more concise when several values should execute the
same code block. It's cleaner than repeating the same code.

MultipleConditions.kt
  

package com.zetcode

fun main() {

    val x = 5
    
    when (x) {
        1, 3, 5 -&gt; println("x is odd and between 1-5")
        2, 4, 6 -&gt; println("x is even and between 2-6")
        else -&gt; println("x is outside 1-6 range")
    }
}

This example groups odd and even numbers together in separate branches. The
output will indicate that 5 is an odd number between 1-5. This approach reduces
code duplication.

## Range Checks in when

when can check if a value is within a range using the in
operator. This is more powerful than traditional switch statements that only
work with constant values. Ranges make the code more expressive.

RangeChecks.kt
  

package com.zetcode

fun main() {

    val score = 85
    
    val grade = when (score) {
        in 90..100 -&gt; "A"
        in 80..89 -&gt; "B"
        in 70..79 -&gt; "C"
        in 60..69 -&gt; "D"
        else -&gt; "F"
    }
    
    println("Grade: $grade") // Output: Grade: B
}

This example assigns a letter grade based on score ranges. The in
operator checks if the score falls within each range. The output shows a B grade
for a score of 85.

## Type Checks with when

when can check the type of an object using the is
operator. This is combined with smart casting to access type-specific
properties. It's a powerful alternative to instanceof checks in Java.

TypeChecks.kt
  

package com.zetcode

fun describe(obj: Any): String = when (obj) {
    is String -&gt; "String with length ${obj.length}"
    is Int -&gt; "Integer with value $obj"
    is Double -&gt; "Double with value $obj"
    else -&gt; "Unknown type"
}

fun main() {

    println(describe("Hello")) // String with length 5
    println(describe(42))      // Integer with value 42
    println(describe(3.14))    // Double with value 3.14
    println(describe(true))    // Unknown type
}

The describe function uses when to check the type of
its parameter. Smart casting allows accessing type-specific properties like
String's length. Each type gets a different description string.

## when Without Argument

when can be used without an argument, acting like a series of
if-else conditions. Each branch condition must evaluate to a boolean. This form
is useful for complex conditions that don't fit the standard pattern.

WhenWithoutArgument.kt
  

package com.zetcode

fun main() {

    val x = 15
    val y = 10
    
    when {
        x &gt; y -&gt; println("x is greater than y")
        x &lt; y -&gt; println("x is less than y")
        else -&gt; println("x and y are equal")
    }
}

This example compares two variables without using when's argument.
Each branch contains a boolean expression. The output shows that x is greater
than y in this case.

## Sealed Classes with when

when works particularly well with sealed classes, ensuring all
subclasses are handled. The compiler can verify exhaustiveness when all possible
subtypes are covered. This is useful for state management.

SealedClassWhen.kt
  

package com.zetcode

sealed class Result
class Success(val data: String) : Result()
class Error(val message: String) : Result()

fun handleResult(result: Result) = when (result) {
    is Success -&gt; println("Success: ${result.data}")
    is Error -&gt; println("Error: ${result.message}")
}

fun main() {

    handleResult(Success("Data loaded"))
    handleResult(Error("Connection failed"))
}

This example shows how when handles sealed class hierarchies. The
compiler knows all possible Result subtypes, so no else branch is needed. Each
subclass is processed differently.

## Best Practices for when

**Prefer when over if-else chains:** Use when for
multiple conditions as it's more readable.
**Leverage expression form:** Use when as an
expression when returning values for cleaner code.
**Use ranges and type checks:** Take advantage of Kotlin's
powerful matching capabilities.
**Consider sealed classes:** Combine with sealed classes for
exhaustive type checking.
**Keep branches simple:** Move complex logic to separate
functions if branches get too long.

## Source

[Kotlin when Documentation](https://kotlinlang.org/docs/control-flow.html#when-expression)

This tutorial covered Kotlin's when keyword in depth, showing its
versatility as both statement and expression. We explored various matching
patterns including constants, ranges, types, and sealed classes. Proper use of
when can make conditional logic more concise and readable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).