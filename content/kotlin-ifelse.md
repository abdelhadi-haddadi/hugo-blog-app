+++
title = "Kotlin if/else"
date = 2025-08-29T20:02:37.251+01:00
draft = false
description = "Kotlin if/else keyword tutorial shows how to use conditional statements in Kotlin. Learn about if expressions, else clauses, and conditional logic with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin if/else

last modified April 19, 2025

Kotlin's conditional statements allow programs to make decisions based on boolean
expressions. The if/else keywords are fundamental for controlling
program flow. This tutorial explores if/else in depth with practical
examples.

## Basic Definitions

In Kotlin, if is an expression that returns a value. It can be used
with or without else. The condition must evaluate to a boolean. When
used as an expression, the else branch is mandatory.

## Simple if Statement

The most basic form of if executes a block of code when a condition
is true. The condition must be a boolean expression. If false, the block is
skipped.

SimpleIf.kt
  

package com.zetcode

fun main() {

    val age = 20
    
    if (age &gt;= 18) {
        println("You are an adult")
    }
}

This example checks if age is 18 or more. If true, it prints "You are an adult".
The code block executes only when the condition is satisfied. No action occurs
for ages under 18.

## if/else Statement

The else clause provides an alternative path when the condition is
false. This creates a binary decision point in your code. Exactly one block will
execute.

IfElse.kt
  

package com.zetcode

fun main() {

    val num = 7
    
    if (num % 2 == 0) {
        println("$num is even")
    } else {
        println("$num is odd")
    }
}

This checks if a number is even or odd. The first block runs for even numbers,
while the else block runs for odd numbers. The output will be "7 is odd" in this
case.

## if as Expression

In Kotlin, if can return a value, making it an expression. This
replaces ternary operators from other languages. The returned value comes from
the last expression in the block.

IfExpression.kt
  

package com.zetcode

fun main() {

    val a = 10
    val b = 20
    
    val max = if (a &gt; b) {
        println("a is larger")
        a
    } else {
        println("b is larger or equal")
        b
    }
    
    println("Max is $max")
}

Here, if determines the larger value between a and b. The result is
assigned to max. Both branches print a message and return a value. The output
shows "b is larger or equal" and "Max is 20".

## Multiple Conditions with else if

For more complex decisions, use else if to chain conditions. Each
condition is checked in order until one matches. Only the first matching block
executes.

ElseIf.kt
  

package com.zetcode

fun main() {

    val score = 85
    
    if (score &gt;= 90) {
        println("Grade A")
    } else if (score &gt;= 80) {
        println("Grade B")
    } else if (score &gt;= 70) {
        println("Grade C")
    } else {
        println("Grade F")
    }
}

This example assigns letter grades based on score ranges. The conditions are
checked top to bottom. With score 85, it prints "Grade B" and skips remaining
checks. The else handles all other cases.

## Nested if Statements

You can nest if statements inside other if blocks for
complex logic. Each nested if has its own condition. Proper indentation is
crucial for readability.

NestedIf.kt
  

package com.zetcode

fun main() {

    val age = 25
    val hasLicense = true
    
    if (age &gt;= 18) {
        if (hasLicense) {
            println("You can drive")
        } else {
            println("You need a license")
        }
    } else {
        println("Too young to drive")
    }
}

This checks both age and license status. The outer if verifies age, while the
inner if checks the license. Only adults with licenses can drive. The output is
"You can drive" in this case.

## When to Replace if with when

For multiple conditions, Kotlin's when is often cleaner than nested
ifs. when is more readable for matching against multiple values. It
also works well with enums and ranges.

WhenInsteadOfIf.kt
  

package com.zetcode

fun main() {

    val day = 3
    val dayType = when (day) {
        1, 2, 3, 4, 5 -&gt; "Weekday"
        6, 7 -&gt; "Weekend"
        else -&gt; "Invalid day"
    }
    
    println(dayType) // Output: Weekday
}

This when expression replaces what would be multiple if-else checks.
It matches day against weekday or weekend values. The output is "Weekday" for day
3. The else handles invalid inputs.

## One-Line if Expression

For simple conditions, Kotlin allows one-line if expressions without braces. This
is concise but should be used sparingly. Complex logic should use full blocks for
readability.

OneLineIf.kt
  

package com.zetcode

fun main() {

    val isRaining = true
    val activity = if (isRaining) "Stay inside" else "Go outside"
    
    println(activity) // Output: Stay inside
}

This one-line if determines activity based on weather. The condition is simple
enough for this compact form. The output is "Stay inside" when isRaining is true.
Each branch returns a string directly.

## Best Practices for if/else

**Prefer expressions:** Use if as an expression when returning
values for cleaner code.
**Avoid deep nesting:** Consider when or refactoring
for complex nested conditions.
**Keep conditions simple:** Extract complex conditions into
well-named boolean variables or functions.
**Include else:** Always handle the else case when using if as
an expression.
**Use early returns:** In functions, consider returning early
instead of deep nesting.

## Source

[Kotlin Control Flow Documentation](https://kotlinlang.org/docs/control-flow.html)

This tutorial covered Kotlin's if/else statements in depth, showing
various forms from basic to advanced usage. We explored expressions, nesting,
alternatives like when, and best practices. Proper use of conditionals makes
programs more flexible and powerful.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).