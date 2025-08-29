+++
title = "Kotlin super Keyword"
date = 2025-08-29T20:02:55.244+01:00
draft = false
description = "Kotlin super keyword tutorial shows how to use the super keyword in inheritance. Learn about accessing parent class members, constructors, and method overriding with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin super Keyword

last modified April 19, 2025

Kotlin's inheritance system allows classes to extend functionality from parent
classes. The super keyword is essential for accessing parent class
members. This tutorial explores the super keyword in depth with
practical examples.

## Basic Definitions

The super keyword in Kotlin refers to the parent class of the
current class. It's used to access parent class properties, methods, and
constructors. super is particularly important when overriding
methods or dealing with inheritance hierarchies.

## Accessing Parent Class Properties

The super keyword can access properties from the parent class when
a child class has properties with the same name. This helps avoid naming
conflicts in inheritance scenarios.

ParentProperty.kt
  

package com.zetcode

open class Vehicle {
    open val speed = 100
}

class Car : Vehicle() {
    override val speed = 120
    
    fun showSpeed() {
        println("Car speed: $speed")
        println("Parent speed: ${super.speed}")
    }
}

fun main() {
    val car = Car()
    car.showSpeed()
}

Here we define a Vehicle class with a speed property. The Car class overrides
this property. Using super.speed, we access the parent's speed
value. The output shows both the child and parent property values.

## Calling Parent Class Methods

When overriding methods, you can call the parent class implementation using
super. This allows extending parent functionality while maintaining
the original behavior.

ParentMethod.kt
  

package com.zetcode

open class Animal {
    open fun makeSound() {
        println("Animal makes a sound")
    }
}

class Dog : Animal() {
    override fun makeSound() {
        super.makeSound()
        println("Dog barks: Woof!")
    }
}

fun main() {
    val dog = Dog()
    dog.makeSound()
}

The Dog class overrides the makeSound method but first calls the parent's
implementation using super.makeSound. This demonstrates how to
extend rather than replace parent class functionality.

## Parent Constructor Initialization

The super keyword is used to call parent class constructors from
child class constructors. This ensures proper initialization of the inheritance
hierarchy.

ParentConstructor.kt
  

package com.zetcode

open class Person(val name: String) {
    init {
        println("Person initialized: $name")
    }
}

class Employee(name: String, val position: String) : Person(name) {
    init {
        println("Employee initialized: $name, $position")
    }
}

fun main() {
    val emp = Employee("John Doe", "Developer")
}

Here the Employee class calls the Person constructor using : Person(name).
This syntax implicitly uses super to initialize the parent class.
The output shows the initialization order from parent to child.

## Multiple Inheritance with Interfaces

When implementing multiple interfaces with conflicting method names, super
with angle brackets specifies which parent interface to call. This resolves
ambiguity in multiple inheritance.

MultipleInheritance.kt
  

package com.zetcode

interface A {
    fun foo() {
        println("A's foo")
    }
}

interface B {
    fun foo() {
        println("B's foo")
    }
}

class C : A, B {
    override fun foo() {
        super&lt;A&gt;.foo()
        super&lt;B&gt;.foo()
        println("C's foo")
    }
}

fun main() {
    val c = C()
    c.foo()
}

Class C implements both interfaces A and B, which have conflicting foo methods.
Using super&lt;A&gt;.foo and super&lt;B&gt;.foo,
we explicitly call each interface's implementation. The output shows all three
method calls.

## Accessing Parent Class in Nested Classes

In nested class scenarios, super can access the parent class of the
outer class using the qualified this syntax. This is useful for complex class
hierarchies.

NestedClass.kt
  

package com.zetcode

open class Outer {
    open val value = 10
    
    inner class Inner {
        fun showValues() {
            println("Inner value: ${this@Outer.value}")
            println("Parent value: ${super@Outer.value}")
        }
    }
}

class Subclass : Outer() {
    override val value = 20
}

fun main() {
    val outer = Subclass()
    val inner = outer.Inner()
    inner.showValues()
}

The Inner class can access both the overridden value in Subclass and the original
value in Outer using qualified super. The output demonstrates how
to navigate complex inheritance chains.

## Constructor Delegation with super

In secondary constructors, super can delegate to specific parent
class constructors. This provides flexibility in object initialization.

ConstructorDelegation.kt
  

package com.zetcode

open class Parent {
    constructor(message: String) {
        println("Parent primary: $message")
    }
    
    constructor(num: Int) {
        println("Parent secondary: $num")
    }
}

class Child : Parent {
    constructor(message: String) : super(message) {
        println("Child primary: $message")
    }
    
    constructor(num: Int) : super(num) {
        println("Child secondary: $num")
    }
}

fun main() {
    val c1 = Child("Hello")
    val c2 = Child(42)
}

The Child class has two constructors that delegate to different Parent
constructors using super. Each initialization path produces
different output, showing constructor delegation in action.

## Overriding Properties with super

When overriding properties with custom getters, super can access the
original property value. This allows modifying parent behavior while preserving
access to the original.

PropertyOverride.kt
  

package com.zetcode

open class Shape {
    open val area: Double = 0.0
}

class Circle(val radius: Double) : Shape() {
    override val area: Double
        get() = super.area + (Math.PI * radius * radius)
}

fun main() {
    val circle = Circle(5.0)
    println("Circle area: ${circle.area}")
}

The Circle class overrides the area property but references the parent's value
using super.area in its calculation. This demonstrates how to build
upon parent class properties rather than replace them completely.

## Best Practices for Using super

**Use judiciously:** Only use super when you
need to explicitly reference parent class members.
**Constructor chains:** Ensure proper constructor initialization
by calling the appropriate parent constructor.
**Interface conflicts:** Use super&lt;Type&gt;
syntax to resolve method conflicts in multiple inheritance.
**Document overrides:** Clearly document when and why you're
calling parent implementations.
**Avoid deep hierarchies:** Deep inheritance chains with
frequent super calls can make code harder to maintain.

## Source

[Kotlin Inheritance Documentation](https://kotlinlang.org/docs/inheritance.html)

This tutorial covered Kotlin's super keyword in depth, showing its
various uses in inheritance scenarios. We explored property access, method
overriding, constructor initialization, and multiple inheritance resolution.
Proper use of super helps create maintainable class hierarchies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).