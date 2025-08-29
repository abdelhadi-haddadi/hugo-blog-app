+++
title = "Kotlin enum Keyword"
date = 2025-08-29T20:02:31.714+01:00
draft = false
description = "Kotlin enum keyword tutorial shows how to work with enumerations in Kotlin. Learn about enum classes, properties, methods, and advanced enum usage with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin enum Keyword

last modified April 19, 2025

Kotlin's enum classes provide a powerful way to define a set of related constants.
The enum keyword creates type-safe enumerations with properties and
methods. This tutorial explores enum classes in depth with practical examples.

## Basic Definitions

The enum keyword in Kotlin declares an enumeration class. Enum
classes restrict variables to have only predefined values. They can have
properties, methods, and implement interfaces while remaining type-safe.

## Basic Enum Declaration

The simplest enum class contains just a list of constants. Each constant is an
instance of the enum class. Enums provide type safety over using plain constants.

BasicEnum.kt
  

package com.zetcode

enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

fun main() {

    val dir = Direction.NORTH
    
    when (dir) {
        Direction.NORTH -&gt; println("Going North")
        Direction.SOUTH -&gt; println("Going South")
        Direction.EAST -&gt; println("Going East")
        Direction.WEST -&gt; println("Going West")
    }
}

Here we define a simple Direction enum with four constants. In main(), we assign
NORTH to a variable and use when expression to handle each case. The compiler
ensures we handle all possible enum values.

## Enum with Properties

Enum constants can have properties. Each constant must provide values for these
properties when declared. Properties make enums more expressive and useful.

EnumWithProperties.kt
  

package com.zetcode

enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

fun main() {

    val color = Color.RED
    println("RGB value of ${color.name}: ${color.rgb}")
}

This enum class Color has a property rgb that stores the hexadecimal color value.
Each constant provides its specific rgb value. We access both the enum name and
its property in the main function.

## Enum with Methods

Enum classes can define methods that all constants inherit. Each constant can also
override these methods to provide specific behavior. This makes enums powerful.

EnumWithMethods.kt
  

package com.zetcode

enum class Operation {
    ADD {
        override fun apply(x: Int, y: Int) = x + y
    },
    SUBTRACT {
        override fun apply(x: Int, y: Int) = x - y
    },
    MULTIPLY {
        override fun apply(x: Int, y: Int) = x * y
    };
    
    abstract fun apply(x: Int, y: Int): Int
}

fun main() {

    val op = Operation.ADD
    println("5 + 3 = ${op.apply(5, 3)}")
}

Here we define an Operation enum with an abstract method apply(). Each constant
implements this method differently. The main function demonstrates using the ADD
operation to perform addition.

## Enum Implementing Interfaces

Enum classes can implement interfaces. Each constant can then provide its own
implementation of interface methods. This allows polymorphic behavior with enums.

EnumImplementingInterface.kt
  

package com.zetcode

interface Printer {
    fun print()
}

enum class MessageType : Printer {
    INFO {
        override fun print() {
            println("Information message")
        }
    },
    WARNING {
        override fun print() {
            println("Warning message")
        }
    };
}

fun main() {

    val msg = MessageType.WARNING
    msg.print()
}

The MessageType enum implements the Printer interface. Each constant provides its
own implementation of the print() method. In main(), we call print() on the
WARNING constant, demonstrating polymorphic behavior.

## Enum with Custom Constructors

Enum classes can have constructors to initialize constants with specific values.
Each constant must pass arguments to the constructor when declared. This enables
rich enum definitions.

EnumWithConstructor.kt
  

package com.zetcode

enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);
    
    val surfaceGravity: Double
        get() = 6.67300E-11 * mass / (radius * radius)
}

fun main() {

    val earth = Planet.EARTH
    println("Earth surface gravity: ${earth.surfaceGravity}")
}

The Planet enum has a constructor that takes mass and radius parameters. Each
constant provides these values. The enum also has a computed property
surfaceGravity that uses these values to calculate gravity.

## Iterating Over Enum Values

Kotlin provides the values function to get all constants of an
enum class. This allows iteration over all possible values of an enumeration.

IterateEnum.kt
  

package com.zetcode

enum class Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

fun main() {

    for (season in Season.values()) {
        println(season)
    }
}

This example demonstrates how to iterate over all values of the Season enum using
the values() function. The for loop prints each season constant to the console.

## Using Enum with When Expression

Enums work particularly well with Kotlin's when expression. The compiler can
verify if all enum cases are covered, making when expressions with enums
exhaustive.

EnumWithWhen.kt
  

package com.zetcode

enum class TrafficLight {
    RED, YELLOW, GREEN
}

fun getMessage(light: TrafficLight): String {
    return when (light) {
        TrafficLight.RED -&gt; "Stop"
        TrafficLight.YELLOW -&gt; "Caution"
        TrafficLight.GREEN -&gt; "Go"
    }
}

fun main() {

    println(getMessage(TrafficLight.RED))
}

The getMessage function uses a when expression to return different messages based
on the TrafficLight enum value. The compiler ensures all enum cases are handled.
The main function demonstrates calling this function with RED light.

## Best Practices for Enum Usage

**Use for fixed sets:** Enums are ideal for representing fixed
sets of related constants.
**Leverage properties:** Add properties to enums to make them
more expressive and useful.
**Consider methods:** Define methods in enums when constants
need behavior.
**Implement interfaces:** Use interfaces to add capabilities to
enums polymorphically.
**Prefer when expressions:** Use when with enums for exhaustive
pattern matching.

## Source

[Kotlin Enum Classes Documentation](https://kotlinlang.org/docs/enum-classes.html)

This tutorial covered Kotlin's enum keyword in depth, showing basic
declarations through advanced usage. We explored properties, methods, interfaces,
and practical examples. Enums provide type safety and organization for fixed sets
of related constants.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).