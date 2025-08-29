+++
title = "Kotlin public Keyword"
date = 2025-08-29T20:02:49.579+01:00
draft = false
description = "Kotlin public keyword tutorial shows how to use the public visibility modifier in Kotlin. Learn about class, function, and property visibility with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin public Keyword

last modified April 19, 2025

Kotlin's visibility modifiers control access to classes, objects, and members.
The public keyword is the most permissive visibility modifier. This
tutorial explores the public keyword in depth with practical examples.

## Basic Definitions

The public keyword in Kotlin makes declarations accessible from
anywhere. It's the default visibility modifier if none is specified. Public
members can be accessed from any other code in the same module or other modules.

## Default Public Visibility

In Kotlin, declarations are public by default if no visibility modifier is
specified. This applies to classes, functions, and properties. Explicit use of
public is optional in these cases.

DefaultPublic.kt
  

package com.zetcode

class Person { // Implicitly public
    fun greet() = println("Hello!") // Implicitly public
}

fun main() {
    val person = Person()
    person.greet() // Output: Hello!
}

Here both the Person class and its greet() function are public by default. They
can be accessed from anywhere in the same module or other modules that depend on
this module.

## Explicit Public Modifier

While public is the default, you can explicitly use the public modifier for
clarity. This makes the visibility intention clear to other developers reading
the code.

ExplicitPublic.kt
  

package com.zetcode

public class Calculator {
    public fun add(a: Int, b: Int): Int = a + b
}

fun main() {
    val calc = Calculator()
    println(calc.add(5, 3)) // Output: 8
}

This example shows explicit use of the public modifier on both the class and its
method. The behavior is identical to the default case, but the visibility is
explicitly declared.

## Public Top-Level Functions

Top-level functions (functions not inside a class) are public by default. They
can be accessed from anywhere in the module and from other modules that import
them.

TopLevelFunction.kt
  

package com.zetcode

// Implicitly public
fun sayHello(name: String) = println("Hello, $name!")

fun main() {
    sayHello("Alice") // Output: Hello, Alice!
}

The sayHello function is public by default and can be called from anywhere. If
this file is part of a library, other projects can import and use this function.

## Public Properties

Properties in Kotlin can be declared public, which means their getters (and
setters if var) are accessible from anywhere. This is the default visibility for
properties.

PublicProperty.kt
  

package com.zetcode

class Circle {
    public val pi: Double = 3.14159 // Explicit public
    var radius: Double = 0.0 // Implicitly public
    
    fun area(): Double = pi * radius * radius
}

fun main() {
    val circle = Circle()
    circle.radius = 5.0
    println("Area: ${circle.area()}") // Output: Area: 78.53975
    println("PI: ${circle.pi}") // Output: PI: 3.14159
}

Both pi and radius properties are public (one explicitly, one by default). The
radius can be modified from outside the class because it's a var, while pi is
read-only as a val.

## Public in Different Packages

Public declarations are accessible across different packages within the same
module. They can also be accessed from other modules if properly imported.

DifferentPackages.kt
  

// File 1: com/zetcode/utils/Logger.kt
package com.zetcode.utils

public class Logger {
    public fun log(message: String) = println("LOG: $message")
}

// File 2: com/zetcode/Main.kt
package com.zetcode

import com.zetcode.utils.Logger

fun main() {
    val logger = Logger()
    logger.log("Application started") // Output: LOG: Application started
}

The Logger class and its log method are public and can be accessed from a
different package. The Main.kt file imports the Logger class to use it.

## Public in Inheritance

When inheriting from a class, public members of the parent class remain public
in the child class unless overridden with a different visibility modifier.

InheritancePublic.kt
  

package com.zetcode

open class Vehicle {
    public open fun start() = println("Vehicle started")
}

class Car : Vehicle() {
    override fun start() = println("Car started")
}

fun main() {
    val car = Car()
    car.start() // Output: Car started
    
    val vehicle: Vehicle = car
    vehicle.start() // Output: Car started
}

The start() method is public in Vehicle and remains public in Car. The override
doesn't change the visibility. Both the Car instance and Vehicle reference can
call the method.

## Public Interfaces

Interface members are public by default in Kotlin. You cannot declare them as
private or protected. The public modifier is redundant for interface members.

PublicInterface.kt
  

package com.zetcode

interface Drawable {
    fun draw() // Implicitly public and abstract
    
    public fun resize() { // Explicit public (redundant)
        println("Resizing")
    }
}

class Circle : Drawable {
    override fun draw() = println("Drawing circle")
}

fun main() {
    val circle = Circle()
    circle.draw() // Output: Drawing circle
    circle.resize() // Output: Resizing
}

Both draw() and resize() in the Drawable interface are public. The explicit
public modifier on resize() is redundant since interface members are public by
default.

## Best Practices for Public Visibility

**Use judiciously:** Only make declarations public when they
need to be accessed from outside their defining scope.
**Prefer explicit:** Consider using explicit public modifier
for important APIs to make visibility clear.
**Document public APIs:** Thoroughly document all public
declarations as they form your code's contract.
**Limit exposure:** Minimize public surface area to reduce
coupling and maintain encapsulation.
**Consider alternatives:** For internal use, consider internal
or private visibility instead of public.

## Source

[Kotlin Visibility Modifiers Documentation](https://kotlinlang.org/docs/visibility-modifiers.html)

This tutorial covered Kotlin's public keyword in depth, showing its
usage with classes, functions, properties, and interfaces. We explored various
scenarios including default visibility, explicit declaration, and inheritance.
Proper use of visibility modifiers helps create well-encapsulated and maintainable
code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).