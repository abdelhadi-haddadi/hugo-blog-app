+++
title = "Kotlin override Keyword"
date = 2025-08-29T20:02:47.335+01:00
draft = false
description = "Kotlin override keyword tutorial shows how to override methods and properties in Kotlin. Learn about polymorphism and inheritance with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin override Keyword

last modified April 19, 2025

Kotlin's override keyword enables polymorphism through method and
property overriding. It's essential for inheritance-based designs. This tutorial
explores the override keyword in depth with practical examples.

## Basic Definitions

The override keyword in Kotlin marks members that override
superclass implementations. It's mandatory when overriding methods or properties.
Kotlin requires explicit overriding to prevent accidental overrides. The base
class members must be marked with open to allow overriding.

## Basic Method Overriding

The simplest use of override is to provide a new implementation for
an inherited method. The base method must be marked as open.

BasicOverride.kt
  

package com.zetcode

open class Animal {
    open fun makeSound() {
        println("Some generic animal sound")
    }
}

class Cat : Animal() {
    override fun makeSound() {
        println("Meow")
    }
}

fun main() {
    val animal: Animal = Cat()
    animal.makeSound() // Output: Meow
}

Here we override the makeSound method in the Cat class. The base
class method is marked open, allowing overriding. When we call
makeSound() on a Cat instance, the overridden version executes.

## Property Overriding

Properties can also be overridden in Kotlin using the override
keyword. Like methods, base properties must be marked open.

PropertyOverride.kt
  

package com.zetcode

open class Vehicle {
    open val wheels: Int = 4
}

class Bicycle : Vehicle() {
    override val wheels: Int = 2
}

fun main() {
    val vehicle: Vehicle = Bicycle()
    println(vehicle.wheels) // Output: 2
}

This example shows property overriding. The Bicycle class overrides the wheels
property from Vehicle. The override changes the value from 4 to 2. Property
overriding follows similar rules to method overriding.

## Calling Superclass Implementation

The super keyword allows accessing the superclass implementation
from an override. This is useful when you want to extend rather than replace
behavior.

SuperCall.kt
  

package com.zetcode

open class Logger {
    open fun log(message: String) {
        println("Log: $message")
    }
}

class TimestampLogger : Logger() {
    override fun log(message: String) {
        super.log("${java.time.LocalTime.now()} $message")
    }
}

fun main() {
    val logger: Logger = TimestampLogger()
    logger.log("System started") // Output: Log: [current time] System started
}

Here we override the log method but use super to call the original
implementation. We enhance it by adding a timestamp prefix. This pattern is
common when extending functionality rather than replacing it completely.

## Overriding Abstract Members

Abstract members must be overridden in concrete subclasses. The override
keyword is still required but the base member doesn't need open.

AbstractOverride.kt
  

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
    val shape: Shape = Circle(5.0)
    println(shape.area()) // Output: 78.53981633974483
}

The Circle class must override the abstract area() method from Shape. Unlike
regular overrides, abstract members don't need open as they're
implicitly open for implementation. The override provides the concrete
implementation.

## Multiple Interface Implementation

When implementing multiple interfaces with conflicting members, you must override
them explicitly. The override keyword resolves the ambiguity.

MultipleInterfaces.kt
  

package com.zetcode

interface A {
    fun foo() { println("A") }
}

interface B {
    fun foo() { println("B") }
}

class C : A, B {
    override fun foo() {
        super&lt;A&gt;.foo()
        super&lt;B&gt;.foo()
        println("C")
    }
}

fun main() {
    val c = C()
    c.foo() // Output: A B C
}

Class C implements both interfaces A and B which have conflicting foo() methods.
We override foo() and use super with angle brackets to specify which interface's
implementation to call. This resolves the ambiguity while allowing us to combine
behavior.

## Overriding Rules with Inheritance

Kotlin has specific rules for overriding in inheritance hierarchies. Derived
classes can override open members and may themselves be open for further
overriding.

InheritanceRules.kt
  

package com.zetcode

open class Base {
    open fun foo() { println("Base") }
}

open class Derived : Base() {
    final override fun foo() { println("Derived") }
}

class FinalDerived : Derived() {
    // Cannot override foo() here because it's final in Derived
}

fun main() {
    val obj: Base = Derived()
    obj.foo() // Output: Derived
}

The Derived class overrides foo() from Base and marks it as final to
prevent further overriding. FinalDerived cannot override foo(). This shows how to
control the override chain in class hierarchies.

## Overriding Properties with Different Types

Overridden properties can have more specific types than their superclass
counterparts. This is known as covariant return types in method overriding.

CovariantOverride.kt
  

package com.zetcode

open class Animal {
    open val food: Any = "Generic food"
}

class Cat : Animal() {
    override val food: String = "Fish"
}

fun main() {
    val animal: Animal = Cat()
    println(animal.food) // Output: Fish
}

Here we override the food property with a more specific type (String instead of
Any). This is allowed because String is a subtype of Any. The override provides
more specific type information while maintaining type safety.

## Best Practices for Overriding

**Use open judiciously:** Only mark members as open when
intentional overriding is expected.
**Document overrides:** Clearly document the contract that
overriding implementations must follow.
**Consider final:** Mark overrides as final when further
overriding isn't desired.
**Maintain LSP:** Follow Liskov Substitution Principle in
overrides.
**Use super wisely:** Call super implementations appropriately
when extending behavior.

## Source

[Kotlin Inheritance Documentation](https://kotlinlang.org/docs/inheritance.html)

This tutorial covered Kotlin's override keyword in depth, showing
method and property overriding in various scenarios. We explored inheritance,
interfaces, abstract members, and covariant types. Proper use of overriding
enables polymorphism while maintaining type safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).