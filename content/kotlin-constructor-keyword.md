+++
title = "Kotlin Constructor Keyword"
date = 2025-08-29T20:02:27.284+01:00
draft = false
description = "Kotlin constructor keyword tutorial shows how to initialize classes in Kotlin. Learn about primary and secondary constructors with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Constructor Keyword

last modified April 19, 2025

Kotlin provides flexible ways to initialize classes through constructors. The
constructor keyword is used to define both primary and secondary
constructors. This tutorial explores constructors in depth with practical
examples.

## Basic Definitions

In Kotlin, a constructor is a special member function that initializes class
instances. There are two types: primary (defined in the class header) and
secondary (defined in the class body). The constructor keyword is
optional for primary constructors without annotations or visibility modifiers.

## Primary Constructor

The primary constructor is declared in the class header. It can include
parameters that become class properties. The constructor keyword is optional
here if no annotations or modifiers are present.

PrimaryConstructor.kt
  

package com.zetcode

class Person constructor(val name: String, val age: Int)

fun main() {

    val person = Person("John Doe", 30)
    println("${person.name} is ${person.age} years old")
    // Output: John Doe is 30 years old
}

This example shows a primary constructor with two parameters. The val
keyword makes them immutable properties. We create a Person instance and access
its properties directly.

## Primary Constructor Without Keyword

When the primary constructor has no annotations or visibility modifiers, the
constructor keyword can be omitted for more concise syntax.

SimplePrimaryConstructor.kt
  

package com.zetcode

class Person(val name: String, val age: Int)

fun main() {

    val person = Person("Jane Smith", 25)
    println("${person.name} is ${person.age} years old")
    // Output: Jane Smith is 25 years old
}

This is the most common way to declare primary constructors. The parameters
automatically become class properties. The syntax is clean and concise while
providing the same functionality.

## Primary Constructor With Initialization Block

The init block allows executing code during object creation. It runs
after the primary constructor parameters are evaluated but before any secondary
constructors.

InitBlock.kt
  

package com.zetcode

class Person(name: String, val age: Int) {
    val name: String
    
    init {
        this.name = name.capitalize()
        println("Person initialized: $name")
    }
}

fun main() {

    val person = Person("alice", 28)
    println("${person.name} is ${person.age}")
    // Output: Person initialized: alice
    //         Alice is 28
}

Here we process the name parameter in the init block before assigning it to the
property. The init block can contain any initialization logic needed for the
class. Multiple init blocks execute in order of appearance.

## Secondary Constructor

Secondary constructors are defined in the class body using the constructor
keyword. They must delegate to the primary constructor if one exists.

SecondaryConstructor.kt
  

package com.zetcode

class Person(val name: String, val age: Int) {
    constructor(name: String) : this(name, 0) {
        println("Secondary constructor used")
    }
}

fun main() {

    val person1 = Person("Bob", 40)
    val person2 = Person("Charlie")
    
    println("${person2.name} is ${person2.age}")
    // Output: Secondary constructor used
    //         Charlie is 0
}

The secondary constructor provides a default age of 0. It must call the primary
constructor using this. Secondary constructors are useful for
multiple initialization paths while maintaining a single primary initialization.

## Constructor With Visibility Modifier

The constructor keyword is required when specifying visibility
modifiers. This controls how the constructor can be accessed from other code.

PrivateConstructor.kt
  

package com.zetcode

class Person private constructor(val name: String) {
    companion object {
        fun create(name: String): Person {
            return Person(name)
        }
    }
}

fun main() {

    val person = Person.create("Admin")
    println(person.name) // Output: Admin
}

Here the primary constructor is private, so instances must be created through the
factory method in the companion object. This is a common pattern for controlling
object creation, such as in singleton implementations.

## Multiple Secondary Constructors

A class can have multiple secondary constructors, each providing different ways
to initialize an object. All must ultimately delegate to the primary constructor.

MultipleConstructors.kt
  

package com.zetcode

class Person(val name: String, val age: Int) {
    constructor(name: String) : this(name, 0)
    constructor(age: Int) : this("Anonymous", age)
}

fun main() {

    val person1 = Person("Dave")
    val person2 = Person(35)
    
    println("${person1.name} is ${person1.age}")
    println("${person2.name} is ${person2.age}")
    // Output: Dave is 0
    //         Anonymous is 35
}

This class provides three ways to create instances: with both name and age, with
just name (default age), or with just age (default name). Each secondary
constructor provides different default values while maintaining consistency.

## Constructor With Default Values

Kotlin allows specifying default values for constructor parameters, often
eliminating the need for secondary constructors. This provides flexible
initialization options.

DefaultValues.kt
  

package com.zetcode

class Person(
    val name: String = "Guest",
    val age: Int = 0
)

fun main() {

    val person1 = Person()
    val person2 = Person("Eve")
    val person3 = Person(age = 30)
    
    println("${person1.name} is ${person1.age}")
    println("${person2.name} is ${person2.age}")
    println("${person3.name} is ${person3.age}")
    // Output: Guest is 0
    //         Eve is 0
    //         Guest is 30
}

Default parameters allow creating objects with any combination of parameters.
Named arguments make the code more readable when skipping parameters. This
approach is often preferred over multiple constructors for simpler cases.

## Best Practices for Constructors

**Prefer primary constructors:** Use primary constructors with
default values when possible for cleaner code.
**Use init blocks wisely:** Keep initialization logic in init
blocks simple and focused on setup.
**Limit secondary constructors:** Only add secondary
constructors when truly needed for multiple initialization paths.
**Consider factory functions:** For complex initialization,
consider companion object factory functions instead of many constructors.
**Use meaningful defaults:** Choose default values that make
sense for the domain and provide good defaults.

## Source

[Kotlin Constructors Documentation](https://kotlinlang.org/docs/classes.html#constructors)

This tutorial covered Kotlin's constructor keyword in depth,
showing both primary and secondary constructor usage. We explored various
initialization patterns including default values, init blocks, and visibility
modifiers. Proper use of constructors leads to more maintainable and flexible
class designs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).