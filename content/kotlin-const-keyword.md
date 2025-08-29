+++
title = "Kotlin const Keyword"
date = 2025-08-29T20:02:27.288+01:00
draft = false
description = "Kotlin const keyword tutorial shows how to declare compile-time constants in Kotlin. Learn about const val, top-level constants, and companion object constants with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin const Keyword

last modified April 19, 2025

Kotlin's const keyword is used to declare compile-time constants.
These constants must be known at compile time and can't be changed at runtime.
This tutorial explores the const keyword in depth with examples.

## Basic Definitions

The const modifier in Kotlin marks a property as a compile-time
constant. It can only be applied to immutable properties of primitive types or
String. Constants must be declared at the top level or in an object declaration.

## Top-Level Constants

The most common place to declare constants is at the top level of a file. These
are accessible throughout the file and can be imported into other files.

TopLevelConstants.kt
  

package com.zetcode

const val PI = 3.1415926535
const val APP_NAME = "My Kotlin App"

fun main() {

    println("The value of PI is $PI")
    println("Welcome to $APP_NAME")
}

Here we declare two constants at the top level of the file. They can be used
anywhere in the file without needing an instance of a class. The values are
known at compile time and can't be changed.

## Constants in Companion Objects

Constants can also be declared inside companion objects of classes. This groups
related constants with their associated class while maintaining compile-time
constant properties.

CompanionConstants.kt
  

package com.zetcode

class MathUtils {

    companion object {
        const val E = 2.7182818284
        const val GOLDEN_RATIO = 1.6180339887
    }
}

fun main() {

    println("Euler's number: ${MathUtils.E}")
    println("Golden ratio: ${MathUtils.GOLDEN_RATIO}")
}

The constants are accessed through the companion object of the MathUtils class.
This provides better organization than top-level constants when the values are
closely related to the class. The values are still compile-time constants.

## Constants vs Regular val

The key difference between const val and regular val
is when the value is assigned. const val must be known at compile
time, while val can be assigned at runtime.

ConstVsVal.kt
  

package com.zetcode

const val COMPILE_TIME_CONST = "Hello"
val runtimeVal = "World".uppercase()

fun main() {

    println("$COMPILE_TIME_CONST $runtimeVal")
}

COMPILE_TIME_CONST is known at compile time, while runtimeVal is computed at
runtime. The uppercase call prevents runtimeVal from being a
compile-time constant. Both are immutable but initialized at different times.

## Constants in Annotations

Constants are often used in annotations where only compile-time constant values
are allowed. This ensures the annotation parameters are known when the code is
compiled.

AnnotationConstants.kt
  

package com.zetcode

const val VERSION = "1.0.0"

@Deprecated("Use version $VERSION instead")
class OldClass

fun main() {

    val obj = OldClass()
}

The VERSION constant is used in the Deprecated annotation message. Only
compile-time constants can be used in annotations. This ensures the annotation
values are available during compilation.

## Constants in When Expressions

Constants work well with when expressions since the values are known at compile
time. The compiler can optimize the when expression when using constants.

WhenConstants.kt
  

package com.zetcode

const val RED = 0xFF0000
const val GREEN = 0x00FF00
const val BLUE = 0x0000FF

fun getColorName(color: Int): String {
    return when (color) {
        RED -&gt; "Red"
        GREEN -&gt; "Green"
        BLUE -&gt; "Blue"
        else -&gt; "Unknown"
    }
}

fun main() {

    println(getColorName(RED)) // Output: Red
}

The color constants are used in the when expression. Since they're compile-time
constants, the compiler can optimize the when expression. This makes the code
more efficient and readable.

## Constants in Arrays

While you can't create const arrays in Kotlin, you can use constants as array
sizes or indices. This helps make array operations more readable and maintainable.

ArrayConstants.kt
  

package com.zetcode

const val MAX_SIZE = 10

fun main() {

    val numbers = IntArray(MAX_SIZE) { it * 2 }
    
    for (i in 0 until MAX_SIZE) {
        println(numbers[i])
    }
}

The MAX_SIZE constant is used to define the array size and control the loop.
Using constants for such values makes the code more maintainable. Changes only
need to be made in one place.

## Constants in Interfaces

Interfaces can contain constants, which are then available to all implementing
classes. These constants must be declared in the interface's companion object.

InterfaceConstants.kt
  

package com.zetcode

interface Vehicle {
    companion object {
        const val WHEELS = 4
        const val MAX_SPEED = 120
    }
}

class Car : Vehicle {
    fun printSpecs() {
        println("Wheels: $WHEELS, Max speed: $MAX_SPEED")
    }
}

fun main() {

    Car().printSpecs()
}

The Vehicle interface defines constants that all vehicles might share. The Car
class can access these constants directly. This provides a way to share common
constants among related classes.

## Best Practices for Constants

**Use meaningful names:** Constant names should be descriptive
and in UPPER_SNAKE_CASE by convention.
**Group related constants:** Use companion objects or objects to
group related constants together.
**Prefer const when possible:** Use const val for
values known at compile time for better performance.
**Limit scope:** Declare constants at the most appropriate scope
level (file, class, or interface).
**Document constants:** Add comments explaining the purpose and
usage of important constants.

## Source

[Kotlin Compile-Time Constants Documentation](https://kotlinlang.org/docs/properties.html#compile-time-constants)

This tutorial covered Kotlin's const keyword in depth, showing how
to declare and use compile-time constants. We explored various scenarios
including top-level declarations, companion objects, and interface constants.
Proper use of constants can make your code more maintainable and efficient.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).