+++
title = "Kotlin init Keyword"
date = 2025-08-29T20:02:38.327+01:00
draft = false
description = "Kotlin init keyword tutorial shows how to use initialization blocks in Kotlin classes. Learn about primary and secondary constructors with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin init Keyword

last modified April 19, 2025

Kotlin's initialization system provides powerful ways to set up class instances.
The init keyword creates initialization blocks that run when objects
are created. This tutorial explores the init keyword in depth with
practical examples.

## Basic Definitions

The init keyword in Kotlin defines initialization blocks. These
blocks execute when a class instance is created, after primary constructor
execution but before secondary constructors. They help set up initial state and
validate properties.

## Basic init Block

The simplest form of initialization block runs code when an object is created.
This example shows a basic init block that prints a message during
initialization.

BasicInit.kt
  

package com.zetcode

class Person {
    init {
        println("Person instance created")
    }
}

fun main() {
    val person = Person() // Output: Person instance created
}

Here we define a Person class with an init block. When we create a
Person instance, the initialization block executes automatically. This is useful
for setup tasks that should run on every object creation.

## init with Primary Constructor

Initialization blocks can access properties defined in the primary constructor.
They execute after the primary constructor parameters are processed but before
any secondary constructors.

PrimaryConstructorInit.kt
  

package com.zetcode

class Person(val name: String) {
    init {
        println("Person $name created")
    }
}

fun main() {
    val person = Person("John") // Output: Person John created
}

This example shows an init block accessing the name property from
the primary constructor. The initialization block runs after the name property is
assigned but before the constructor completes.

## Multiple init Blocks

A class can have multiple init blocks. They execute in the order
they appear in the class definition, from top to bottom. This allows organizing
initialization logic into logical sections.

MultipleInitBlocks.kt
  

package com.zetcode

class Person(val name: String) {
    init {
        println("First init block: $name")
    }
    
    init {
        println("Second init block: ${name.uppercase()}")
    }
}

fun main() {
    val person = Person("Alice")
    // Output:
    // First init block: Alice
    // Second init block: ALICE
}

Here we define two initialization blocks that execute sequentially. The first
prints the name, while the second prints the uppercase version. Multiple blocks
help organize complex initialization logic.

## Property Initialization in init

Initialization blocks can be used to set up properties that require complex
logic. This is especially useful when properties depend on constructor
parameters or need validation.

PropertyInit.kt
  

package com.zetcode

class Circle(radius: Double) {
    val area: Double
    
    init {
        require(radius &gt; 0) { "Radius must be positive" }
        area = Math.PI * radius * radius
    }
}

fun main() {
    val circle = Circle(5.0)
    println("Area: ${circle.area}") // Output: Area: 78.53981633974483
    
    // val invalid = Circle(-1.0) // Throws IllegalArgumentException
}

This example shows an init block validating the radius and
calculating the area. The require function ensures the radius is
positive. The area property is initialized in the block.

## init with Secondary Constructor

Initialization blocks execute before secondary constructor bodies. This ensures
common initialization happens first, while secondary constructors can provide
additional setup.

SecondaryConstructorInit.kt
  

package com.zetcode

class Person(val name: String) {
    var age: Int = 0
    
    init {
        println("Primary initialization: $name")
    }
    
    constructor(name: String, age: Int) : this(name) {
        this.age = age
        println("Secondary constructor: $name, $age")
    }
}

fun main() {
    val person1 = Person("Bob")
    // Output: Primary initialization: Bob
    
    val person2 = Person("Alice", 30)
    // Output:
    // Primary initialization: Alice
    // Secondary constructor: Alice, 30
}

Here the init block runs before the secondary constructor body. The
primary constructor is called first via this(name), then the init
block executes, and finally the secondary constructor body runs.

## init in Inheritance

In inheritance hierarchies, initialization blocks execute in parent-to-child
order. Parent class init blocks run before child class init blocks, ensuring
proper initialization sequence.

InheritanceInit.kt
  

package com.zetcode

open class Animal {
    init {
        println("Animal initialized")
    }
}

class Dog : Animal() {
    init {
        println("Dog initialized")
    }
}

fun main() {
    val dog = Dog()
    // Output:
    // Animal initialized
    // Dog initialized
}

When creating a Dog instance, the Animal's initialization block runs first,
followed by Dog's. This ensures parent class setup completes before child class
initialization begins.

## Complex Initialization

Initialization blocks can contain complex logic, including control flow and
function calls. This example demonstrates validating and transforming input
during initialization.

ComplexInit.kt
  

package com.zetcode

class User(email: String) {
    val username: String
    val domain: String
    
    init {
        require(email.contains("@")) { "Invalid email format" }
        
        val parts = email.split("@")
        username = parts[0]
        domain = parts[1].lowercase()
        
        println("User created: $username@$domain")
    }
}

fun main() {
    val user = User("Admin@Example.COM")
    // Output: User created: Admin@example.com
    
    println(user.username) // Output: Admin
    println(user.domain)  // Output: example.com
    
    // val invalid = User("no-at-sign") // Throws IllegalArgumentException
}

This init block validates the email format, splits it into parts, and
normalizes the domain. The complex initialization ensures the User object starts
in a valid state with properly formatted properties.

## Best Practices for init Blocks

**Keep them focused:** Each init block should handle a specific
aspect of initialization.
**Validate early:** Use init blocks to validate constructor
arguments immediately.
**Avoid complex logic:** Move complex initialization to separate
methods if it becomes too involved.
**Consider order:** Remember init blocks execute before secondary
constructors and in parent-to-child order.
**Document assumptions:** Clearly document any important
preconditions in your init blocks.

## Source

[Kotlin Constructors Documentation](https://kotlinlang.org/docs/classes.html#constructors)

This tutorial covered Kotlin's init keyword in depth, showing how
initialization blocks work with primary and secondary constructors. We explored
various scenarios including property initialization, inheritance, and complex
setup. Proper use of init blocks helps ensure objects start in a valid state.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).