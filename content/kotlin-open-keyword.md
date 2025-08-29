+++
title = "Kotlin open Keyword"
date = 2025-08-29T20:02:45.010+01:00
draft = false
description = "Kotlin open keyword tutorial shows how to use inheritance in Kotlin. Learn about open classes, methods, and properties with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin open Keyword

last modified April 19, 2025

Kotlin's inheritance model is designed with explicitness in mind. The
open keyword is fundamental for enabling inheritance and method
overriding. This tutorial explores the open keyword in depth with
practical examples.

## Basic Definitions

The open keyword in Kotlin marks classes, methods, or properties as
inheritable or overridable. By default, Kotlin classes and members are final.
The open modifier removes this restriction, allowing inheritance.

## Basic Class Inheritance

To inherit from a class in Kotlin, the parent class must be marked with the
open keyword. This example shows the simplest form of inheritance.

BasicInheritance.kt
  

package com.zetcode

open class Animal {
    fun eat() = println("Eating...")
}

class Dog : Animal() {
    fun bark() = println("Woof!")
}

fun main() {
    val dog = Dog()
    dog.eat()  // Output: Eating...
    dog.bark() // Output: Woof!
}

Here we define an open Animal class that Dog inherits from. The Dog
class can access Animal's methods while adding its own. Without open,
Animal couldn't be inherited from.

## Overriding Methods

To override a method in Kotlin, both the parent method and child method need
modifiers. The parent method must be open, and the child method
must use override.

MethodOverride.kt
  

package com.zetcode

open class Animal {
    open fun makeSound() = println("Animal sound")
}

class Cat : Animal() {
    override fun makeSound() = println("Meow!")
}

fun main() {
    val cat = Cat()
    cat.makeSound() // Output: Meow!
}

The Animal class declares an open makeSound method that Cat
overrides. The override changes the behavior for Cat instances. Without
open on the parent method, overriding would be impossible.

## Overriding Properties

Similar to methods, properties can be overridden in child classes when marked
open in the parent. The child property must use the
override modifier.

PropertyOverride.kt
  

package com.zetcode

open class Vehicle {
    open val wheels: Int = 4
}

class Bicycle : Vehicle() {
    override val wheels: Int = 2
}

fun main() {
    val bike = Bicycle()
    println(bike.wheels) // Output: 2
}

The Vehicle class defines an open wheels property with default value
4. The Bicycle class overrides this property with value 2. The override changes
the property value for Bicycle instances.

## Preventing Further Overrides

You can mark an override as final to prevent subclasses from
overriding it further. This is useful when you want to lock down specific
behavior.

FinalOverride.kt
  

package com.zetcode

open class Shape {
    open fun draw() = println("Drawing shape")
}

open class Circle : Shape() {
    final override fun draw() = println("Drawing circle")
}

class SpecialCircle : Circle() {
    // Cannot override draw() here
}

fun main() {
    val circle = Circle()
    circle.draw() // Output: Drawing circle
}

The Circle class makes its draw method final, preventing
SpecialCircle from overriding it. This technique helps maintain critical
behavior in class hierarchies.

## Abstract Classes and open

Abstract classes are implicitly open, so their members don't need the
open modifier to be overridable. However, concrete implementations
in open classes still need it.

AbstractClass.kt
  

package com.zetcode

abstract class Animal {
    abstract fun makeSound()
    open fun eat() = println("Eating food")
}

class Dog : Animal() {
    override fun makeSound() = println("Woof!")
    override fun eat() = println("Eating dog food")
}

fun main() {
    val dog = Dog()
    dog.makeSound() // Output: Woof!
    dog.eat()      // Output: Eating dog food
}

The abstract makeSound method doesn't need open, but the concrete
eat method does. Dog overrides both methods, providing implementations for each.

## Open Properties with Custom Getters/Setters

When overriding properties with custom accessors, the open modifier
allows for flexible implementations in subclasses.

OpenProperty.kt
  

package com.zetcode

open class Person {
    open val name: String
        get() = "Unknown"
}

class Student : Person() {
    override val name: String
        get() = "Student Name"
}

fun main() {
    val person: Person = Student()
    println(person.name) // Output: Student Name
}

The Person class defines an open name property with a custom getter.
Student overrides this property with its own implementation. The actual runtime
type determines which getter is called.

## Open Classes with Secondary Constructors

Open classes can have secondary constructors, and subclasses can call them using
the super keyword. The open modifier affects the whole
class.

SecondaryConstructor.kt
  

package com.zetcode

open class Vehicle(val wheels: Int) {
    constructor() : this(4)
}

class Motorcycle : Vehicle {
    constructor() : super(2)
}

fun main() {
    val bike = Motorcycle()
    println(bike.wheels) // Output: 2
}

Vehicle is marked open and has both primary and secondary
constructors. Motorcycle inherits from Vehicle and calls the primary constructor
via its own secondary constructor.

## Best Practices for open Keyword

**Be intentional:** Only mark classes and members as
open when you specifically want them inherited or overridden.
**Document behavior:** Clearly document how open members should
be overridden to maintain expected behavior.
**Consider final:** Use final on overrides when you
want to prevent further overriding in subclasses.
**Prefer composition:** Sometimes composition is better than
inheritance, even when classes are open.
**Test thoroughly:** Overridable behavior should be well-tested
to ensure subclasses don't break contracts.

## Source

[Kotlin Inheritance Documentation](https://kotlinlang.org/docs/inheritance.html)

This tutorial covered Kotlin's open keyword in depth, showing how it
enables inheritance and overriding. We explored class inheritance, method and
property overriding, and various related concepts. Proper use of open
makes your Kotlin code more flexible while maintaining control over extensibility.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).