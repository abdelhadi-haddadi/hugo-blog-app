+++
title = "Kotlin Interface Keyword"
date = 2025-08-29T20:02:39.454+01:00
draft = false
description = "Kotlin interface keyword tutorial shows how to define and implement interfaces in Kotlin. Learn about default methods, properties, and multiple inheritance with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Interface Keyword

last modified April 19, 2025

Kotlin interfaces define contracts that classes can implement. They can contain
abstract methods and properties, as well as default implementations. Interfaces
enable polymorphism and multiple inheritance in Kotlin. This tutorial explores
the interface keyword in depth with practical examples.

## Basic Definitions

An interface in Kotlin is a blueprint of a class. It contains abstract method
declarations and method implementations. Interfaces cannot store state but can
have properties. Classes implement interfaces using the : syntax.
Multiple interfaces can be implemented by a single class.

## Basic Interface Declaration

The simplest interface contains abstract method declarations. Classes
implementing the interface must provide concrete implementations for these
methods. This enforces a contract that implementing classes must follow.

BasicInterface.kt
  

package com.zetcode

interface Greeter {
    fun greet(): String
}

class Person : Greeter {
    override fun greet(): String {
        return "Hello!"
    }
}

fun main() {
    val person = Person()
    println(person.greet()) // Output: Hello!
}

Here we define a Greeter interface with one abstract method. The
Person class implements this interface and provides the method
body. The override keyword is required when implementing interface
methods.

## Interface with Default Implementation

Kotlin interfaces can provide default implementations for methods. Classes
implementing the interface can use these defaults or override them. This feature
makes interfaces more flexible than abstract classes in some cases.

DefaultImplementation.kt
  

package com.zetcode

interface Vehicle {
    fun start() {
        println("Vehicle started")
    }
    
    fun stop()
}

class Car : Vehicle {
    override fun stop() {
        println("Car stopped")
    }
}

fun main() {
    val car = Car()
    car.start() // Output: Vehicle started
    car.stop()  // Output: Car stopped
}

The Vehicle interface provides a default implementation for
start but leaves stop abstract. The Car
class only needs to implement stop and inherits the default
start behavior.

## Interface Properties

Interfaces can declare abstract properties that implementing classes must
provide. These properties can be implemented as fields or through getters.
Interface properties cannot have backing fields but can have custom accessors.

InterfaceProperties.kt
  

package com.zetcode

interface User {
    val name: String
    val age: Int
        get() = 0 // Default implementation
}

class RegisteredUser(override val name: String) : User {
    // age uses default implementation
}

fun main() {
    val user = RegisteredUser("John Doe")
    println("${user.name}, ${user.age}") // Output: John Doe, 0
}

The User interface declares two properties. name is
abstract and must be implemented, while age has a default value.
The RegisteredUser class implements name as a property
and uses the default age implementation.

## Multiple Interface Implementation

Kotlin supports multiple interface inheritance. A class can implement several
interfaces, inheriting all their members. If there are method conflicts, the
implementing class must resolve them explicitly.

MultipleInterfaces.kt
  

package com.zetcode

interface Flyable {
    fun fly() {
        println("Flying high")
    }
}

interface Swimmable {
    fun swim() {
        println("Swimming deep")
    }
}

class Duck : Flyable, Swimmable {
    fun describe() {
        fly()
        swim()
    }
}

fun main() {
    val duck = Duck()
    duck.describe()
    // Output:
    // Flying high
    // Swimming deep
}

The Duck class implements both Flyable and
Swimmable interfaces. It can call methods from both interfaces.
This demonstrates Kotlin's support for multiple inheritance of behavior through
interfaces.

## Resolving Method Conflicts

When multiple interfaces declare methods with the same signature, implementing
classes must resolve the conflict. This is done by overriding the method and
specifying which interface's implementation to use.

MethodConflict.kt
  

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
    // Output:
    // A's foo
    // B's foo
    // C's foo
}

The C class implements both A and B which
have conflicting foo methods. The class resolves this by calling
both implementations using super&lt;Interface&gt; syntax and adding
its own behavior.

## Functional Interfaces (SAM Interfaces)

Single Abstract Method (SAM) interfaces can be implemented using lambdas. These
are called functional interfaces in Kotlin. The fun modifier marks
an interface as functional.

FunctionalInterface.kt
  

package com.zetcode

fun interface StringProcessor {
    fun process(input: String): String
}

fun main() {
    val upperCaseProcessor = StringProcessor { it.uppercase() }
    val lowerCaseProcessor = StringProcessor { it.lowercase() }
    
    println(upperCaseProcessor.process("Hello")) // Output: HELLO
    println(lowerCaseProcessor.process("World")) // Output: world
}

The StringProcessor interface is marked with fun making
it a functional interface. We create instances using lambdas instead of full
class implementations. This provides concise syntax for simple interface
implementations.

## Interface Inheritance

Interfaces can inherit from other interfaces, forming interface hierarchies. The
child interface includes all members of its parent interfaces. Implementing
classes must satisfy all requirements from the entire hierarchy.

InterfaceInheritance.kt
  

package com.zetcode

interface Animal {
    fun eat()
}

interface Mammal : Animal {
    fun nurse()
}

class Human : Mammal {
    override fun eat() {
        println("Eating food")
    }
    
    override fun nurse() {
        println("Nursing young")
    }
}

fun main() {
    val human = Human()
    human.eat()   // Output: Eating food
    human.nurse() // Output: Nursing young
}

The Mammal interface extends Animal, inheriting its
eat method. The Human class implements Mammal
and must provide implementations for both eat and nurse.
This shows how interface hierarchies work in Kotlin.

## Best Practices for Interfaces

**Prefer interfaces to abstract classes:** Use interfaces for
defining contracts when possible, as they support multiple inheritance.
**Use default implementations wisely:** Provide default
implementations for methods that have common behavior across implementations.
**Keep interfaces focused:** Follow the Interface Segregation
Principle - interfaces should be small and focused.
**Document interface contracts:** Clearly document what
implementers must provide and what callers can expect.
**Consider functional interfaces:** Use SAM interfaces when a
single abstract method is sufficient for the contract.

## Source

[Kotlin Interfaces Documentation](https://kotlinlang.org/docs/interfaces.html)

This tutorial covered Kotlin's interface keyword in depth, showing
basic declarations, default methods, properties, and multiple inheritance. We
explored various scenarios including method conflicts and functional interfaces.
Proper use of interfaces can make your code more flexible and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).