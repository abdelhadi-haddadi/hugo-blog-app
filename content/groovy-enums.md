+++
title = "Groovy Enums"
date = 2025-08-29T19:56:29.026+01:00
draft = false
description = "Groovy Enums tutorial covers basics, custom methods, and switch expressions with practical examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Enums

last modified March 20, 2025

Enums in Groovy define a fixed set of constants, enhancing code readability
and type safety. Built on Java's enum foundation, they support additional
features like custom methods and Groovy-specific syntax. This tutorial
explores enum basics and advanced uses with examples.

## Simple Enum

Enums are created with the enum keyword, listing constants in
a concise, type-safe way, ideal for predefined categories.

SimpleEnum.groovy
  

enum Color {
    RED, GREEN, BLUE
}

println Color.RED

Color defines three constants. Color.RED accesses
one directly, printing "RED". Enums are implicitly static and final,
ensuring these values remain constant throughout the program.

## Enum with Variables

Enums can hold instance variables, initialized via a constructor, adding
data to each constant beyond just a name.

EnumWithVars.groovy
  

enum Direction {
    NORTH(0), EAST(90), SOUTH(180), WEST(270)

    int degrees
    Direction(int deg) { degrees = deg }
}

println Direction.NORTH.degrees
println Direction.WEST.degrees

Direction pairs each constant with an angle.
degrees is set via the constructor, so
Direction.NORTH.degrees is 0 and WEST.degrees is
270. This shows how enums can encapsulate related data.

## Ordinal and Values

Enums provide built-in methods like ordinal for position and
values for all constants, useful for iteration and indexing.

EnumOrdinalValues.groovy
  

enum Size {
    SMALL, MEDIUM, LARGE
}

println Size.SMALL

Size.each { println it }
Size.each { println "${it} ${it.ordinal()}" }

println Size.values()

Size.SMALL prints "SMALL", the first constant.
each iterates over all sizes, first listing them, then with
ordinal showing their zero-based positions (SMALL: 0,
MEDIUM: 1, LARGE: 2). values returns an array of all
constants, handy for bulk access or conversion to other collections.

## String Coercion

Groovy allows converting strings to enum values implicitly or explicitly,
leveraging its flexible type system for easier enum handling.

EnumStringCoercion.groovy
  

enum State {
    up,
    down
}

println State.up == 'up' as State
println State.down == 'down' as State

State s1 = 'up'
State s2 = 'down'

println State.up == s1
println State.down == s2

'up' as State explicitly coerces "up" to State.up,
and both comparisons return true. Assigning 'up' to
s1 implicitly converts it, matching State.up.
This feature simplifies parsing strings into enums, though case must match
the enum name exactly.

## Custom Method

Enums can define custom methods, static or instance, extending their
functionality beyond simple constants to include logic.

EnumCustomMethod.groovy
  

import java.util.Random

def season = Season.randomSeason()

String msg = switch (season) {
    case Season.SPRING -&gt; "Spring"
    case Season.SUMMER -&gt; "Summer"
    case Season.AUTUMN -&gt; "Autumn"
    case Season.WINTER -&gt; "Winter"
}

println(msg)

enum Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER;

    static Season randomSeason() {
        def random = new Random()
        int ridx = random.nextInt(Season.values().length)
        Season.values()[ridx]
    }
}

randomSeason is a static method returning a random
Season constant using values and a random index.
The switch expression maps the result to a friendly string.
Output varies (e.g., "Autumn"), showing how enums can encapsulate behavior,
here simulating a random season picker.

## Switch Expression Ranges

Enums work seamlessly with Groovy's switch expressions, including ranges
and multiple cases, making them powerful for control flow.

EnumSwitchRanges.groovy
  

enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

def isWeekend(Day d) {
    switch (d) {
        case Day.Monday..Day.Friday -&gt; false 
        case Day.Saturday, Day.Sunday -&gt; true
    }
}

def days = [ Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday, 
    Day.Friday, Day.Saturday, Day.Sunday ]

for (e in days) {
    if (isWeekend(e)) {
        println('weekend')
    } else {
        println('weekday')
    }
}

Day lists weekdays. isWeekend uses a switch with a
range (Monday..Friday) for weekdays (false) and a comma list
(Saturday, Sunday) for weekends (true). The loop tests all
days, printing "weekday" five times then "weekend" twice. This showcases
Groovy's expressive range syntax in enums.

## Planets

Enums can model complex objects with properties and methods, like planets
with mass and radius, demonstrating their object-oriented potential.

EnumPlanets.groovy
  

double earthWeight = 63
double mass = earthWeight / Planet.EARTH.surfaceGravity()

for (Planet p : Planet.values()) {
    println("Your weight on ${p} is ${p.surfaceWeight(mass)}")
}

enum Planet {
    MERCURY (3.303e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6),
    MARS    (6.421e+23, 3.3972e6),
    JUPITER (1.9e+27,   7.1492e7),
    SATURN  (5.688e+26, 6.0268e7),
    URANUS  (8.686e+25, 2.5559e7),
    NEPTUNE (1.024e+26, 2.4746e7);

    private final double mass   // in kilograms
    private final double radius // in meters

    Planet(double mass, double radius) {
        this.mass = mass
        this.radius = radius
    }

    private double mass() { return mass }
    private double radius() { return radius }

    // universal gravitational constant (m3 kg-1 s-2)
    final double G = 6.67300E-11

    double surfaceGravity() {
        return G * mass / (radius * radius)
    }

    double surfaceWeight(double otherMass) {        
        return otherMass * surfaceGravity()
    }

    String toString() {
        name().toLowerCase().capitalize()
    }
}

Planet defines eight planets with mass and radius, set via a
constructor. surfaceGravity computes gravity using the
gravitational constant, and surfaceWeight calculates weight.
toString formats names (e.g., "Earth"). The loop computes a
63kg Earth weight across planets, showing enums as full-fledged objects
with practical applications.

## Enum in a Collection

Enums can be used in collections like lists, leveraging their constant
nature for iteration or data storage.

EnumInCollection.groovy
  

enum Fruit {
    APPLE, BANANA, ORANGE
}

def fruits = [Fruit.APPLE, Fruit.BANANA, Fruit.ORANGE]
fruits.each { println it }

Fruit defines three constants. Stored in a list,
fruits.each iterates over them, printing each name. This
illustrates how enums integrate with Groovy's collection features,
maintaining type safety while being iterable.

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy enums with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).