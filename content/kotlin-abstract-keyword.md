+++
title = "Kotlin Abstract Keyword"
date = 2025-08-29T20:02:22.845+01:00
draft = false
description = "Kotlin abstract keyword tutorial shows how to use abstract classes and members in Kotlin. Learn about abstract properties and methods with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Abstract Keyword

last modified April 19, 2025

Kotlin's abstract keyword is used to create abstract classes and members that
cannot be instantiated directly. Abstract members must be implemented by
concrete subclasses. This tutorial explores abstract classes and members in
depth with practical examples.

## Basic Definitions

The abstract keyword in Kotlin declares abstract classes or
members. Abstract classes cannot be instantiated directly. They serve as base
classes for concrete implementations. Abstract members have no implementation
and must be overridden in subclasses.

## Basic Abstract Class

An abstract class is declared with the abstract keyword. It can contain both
abstract and concrete members. Abstract classes cannot be instantiated
directly.

BasicAbstract.kt
  

package com.zetcode

abstract class Shape {
    abstract fun area(): Double
}

class Circle(val radius: Double) : Shape() {
    override fun area(): Double {
        return Math.PI * radius * radius
    }
}

fun main() {
    val circle = Circle(5.0)
    println("Area: ${circle.area()}") // Output: Area: 78.53981633974483
}

Here we define an abstract Shape class with an abstract area() function. The
Circle class inherits from Shape and provides a concrete implementation of
area(). We then create a Circle instance and calculate its area.

## Abstract Properties

Abstract classes can have abstract properties in addition to methods. These
properties must be implemented by concrete subclasses. They can be either
val or var properties.

AbstractProperty.kt
  

package com.zetcode

abstract class Animal {
    abstract val sound: String
    abstract var age: Int
}

class Dog : Animal() {
    override val sound = "Woof"
    override var age = 0
}

fun main() {
    val dog = Dog()
    println("Sound: ${dog.sound}, Age: ${dog.age}") // Output: Sound: Woof, Age: 0
    dog.age = 3
    println("New age: ${dog.age}") // Output: New age: 3
}

The Animal class declares abstract sound (val) and age (var) properties. The Dog
class provides concrete implementations. We can read both properties and modify
the mutable age property.

## Abstract Class with Concrete Members

Abstract classes can contain both abstract and concrete members. Concrete members
provide default implementations that subclasses can use or override.

MixedAbstract.kt
  

package com.zetcode

abstract class Vehicle {
    abstract val maxSpeed: Double
    
    fun start() {
        println("Vehicle started")
    }
    
    abstract fun stop()
}

class Car : Vehicle() {
    override val maxSpeed = 200.0
    
    override fun stop() {
        println("Car stopped")
    }
}

fun main() {
    val car = Car()
    car.start() // Output: Vehicle started
    println("Max speed: ${car.maxSpeed}") // Output: Max speed: 200.0
    car.stop() // Output: Car stopped
}

The Vehicle class has both abstract (maxSpeed, stop()) and concrete (start())
members. The Car class inherits from Vehicle and implements the abstract
members while using the concrete start() method as-is.

## Multiple Abstract Members

An abstract class can have multiple abstract members. Subclasses must implement
all of them. This enforces a consistent interface across all implementations.

MultipleAbstract.kt
  

package com.zetcode

abstract class Employee {
    abstract val name: String
    abstract val salary: Double
    abstract fun work()
    abstract fun takeBreak()
}

class Developer : Employee() {
    override val name = "John Doe"
    override val salary = 75000.0
    
    override fun work() {
        println("Writing code...")
    }
    
    override fun takeBreak() {
        println("Taking coffee break")
    }
}

fun main() {
    val dev = Developer()
    println("${dev.name} earns ${dev.salary}") // Output: John Doe earns 75000.0
    dev.work() // Output: Writing code...
    dev.takeBreak() // Output: Taking coffee break
}

The Employee abstract class defines four abstract members. The Developer class
provides implementations for all of them. This ensures all Employee subclasses
have consistent behavior while allowing implementation details to vary.

## Abstract Class Inheritance

Abstract classes can inherit from other abstract classes. The child abstract
class doesn't need to implement all parent abstract members. It can add new
abstract members.

AbstractInheritance.kt
  

package com.zetcode

abstract class Person {
    abstract val name: String
    abstract fun greet()
}

abstract class Student : Person() {
    abstract val studentId: Int
    abstract fun study()
}

class CollegeStudent : Student() {
    override val name = "Alice"
    override val studentId = 12345
    
    override fun greet() {
        println("Hi, I'm $name")
    }
    
    override fun study() {
        println("Studying hard...")
    }
}

fun main() {
    val student = CollegeStudent()
    student.greet() // Output: Hi, I'm Alice
    println("ID: ${student.studentId}") // Output: ID: 12345
    student.study() // Output: Study hard...
}

Person is an abstract class with abstract members. Student inherits from Person
and adds new abstract members. CollegeStudent implements all abstract members
from both classes. This shows how abstract classes can build on each other.

## Abstract Class with Interface

Abstract classes can implement interfaces. They can provide implementations for
some interface members while leaving others abstract. This offers flexibility in
design.

AbstractWithInterface.kt
  

package com.zetcode

interface Drawable {
    fun draw()
    fun resize(scale: Double)
}

abstract class Shape : Drawable {
    abstract val color: String
    
    override fun resize(scale: Double) {
        println("Resizing by scale $scale")
    }
}

class Circle : Shape() {
    override val color = "Red"
    
    override fun draw() {
        println("Drawing a $color circle")
    }
}

fun main() {
    val circle = Circle()
    circle.draw() // Output: Drawing a Red circle
    circle.resize(1.5) // Output: Resizing by scale 1.5
}

Shape is an abstract class implementing Drawable interface. It provides
concrete implementation for resize() but leaves draw() abstract. Circle
implements the remaining abstract members. This shows partial implementation
of interfaces.

## Abstract Class as Parameter Type

Abstract classes can be used as parameter types in functions. This allows
polymorphic behavior where any concrete subclass can be passed as an argument.

AbstractAsParameter.kt
  

package com.zetcode

abstract class Logger {
    abstract fun log(message: String)
}

class ConsoleLogger : Logger() {
    override fun log(message: String) {
        println("CONSOLE: $message")
    }
}

class FileLogger : Logger() {
    override fun log(message: String) {
        println("FILE: $message (writing to file)")
    }
}

fun process(logger: Logger, message: String) {
    logger.log(message)
}

fun main() {
    val consoleLogger = ConsoleLogger()
    val fileLogger = FileLogger()
    
    process(consoleLogger, "Test message") // Output: CONSOLE: Test message
    process(fileLogger, "Important data") // Output: FILE: Important data (writing to file)
}

The process function accepts any Logger subclass. We pass different
logger implementations (ConsoleLogger and FileLogger) that each handle logging
differently. This demonstrates polymorphism with abstract classes.

## Best Practices for Abstract Classes

**Use for common behavior:** Abstract classes are ideal when
multiple classes share common behavior that can be implemented once.
**Favor interfaces for simple contracts:** For simple method
contracts without shared implementation, prefer interfaces.
**Document abstract members:** Clearly document the purpose and
expected behavior of abstract members.
**Keep abstract classes focused:** Abstract classes should have
a single, well-defined responsibility.
**Consider sealed classes:** For restricted class hierarchies,
consider sealed classes instead of abstract classes.

## Source

[Kotlin Abstract Classes Documentation](https://kotlinlang.org/docs/abstract-classes.html)

This tutorial covered Kotlin's abstract keyword in depth, showing
how to create abstract classes and members. We explored various scenarios
including properties, inheritance, and interface implementation. Proper use of
abstract classes can create flexible and maintainable class hierarchies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).