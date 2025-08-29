+++
title = "Kotlin Class Keyword"
date = 2025-08-29T20:02:26.181+01:00
draft = false
description = "Kotlin class keyword tutorial shows how to create and use classes in Kotlin. Learn about constructors, properties, methods, inheritance and more with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Class Keyword

last modified April 19, 2025

Kotlin's class keyword is fundamental to object-oriented programming
in Kotlin. Classes are blueprints for creating objects that encapsulate data and
behavior. This tutorial explores the class keyword in depth with
practical examples.

## Basic Definitions

The class keyword in Kotlin declares a class, which is a template
for creating objects. A class can contain properties (data) and functions
(behavior). Kotlin classes support inheritance, interfaces, and other OOP
features.

## Simple Class Declaration

The most basic class in Kotlin is declared with the class keyword
followed by the class name. Even empty classes are useful as markers or in
generic programming.

SimpleClass.kt
  

package com.zetcode

class Person

fun main() {

    val person = Person()
    println(person) // Output: com.zetcode.Person@&lt;hashcode&gt;
}

Here we declare a minimal Person class with no properties or methods.
We create an instance using the default constructor. The output shows the class
name and object reference.

## Class with Properties

Kotlin classes can have properties declared in the primary constructor. These
properties can be mutable (var) or read-only (val).

ClassWithProperties.kt
  

package com.zetcode

class Person(val name: String, var age: Int)

fun main() {

    val person = Person("John Doe", 30)
    println("${person.name} is ${person.age} years old")
    person.age = 31 // Can modify var property
    // person.name = "Jane" // Error: val cannot be reassigned
}

This Person class has two properties declared in its primary
constructor. name is read-only while age is mutable.
We demonstrate accessing and modifying these properties.

## Class with Methods

Classes can contain member functions (methods) that define their behavior. These
functions have access to the class properties and can modify the object's state.

ClassWithMethods.kt
  

package com.zetcode

class Counter {
    var count = 0
    
    fun increment() {
        count++
    }
    
    fun reset() {
        count = 0
    }
}

fun main() {

    val counter = Counter()
    counter.increment()
    counter.increment()
    println(counter.count) // Output: 2
    counter.reset()
    println(counter.count) // Output: 0
}

The Counter class maintains state with a count property
and provides methods to modify it. increment increases the count
while reset sets it back to zero.

## Inheritance with Open Classes

Kotlin classes are final by default. To allow inheritance, mark the class with
the open keyword. The child class uses : followed by
the parent constructor call.

Inheritance.kt
  

package com.zetcode

open class Animal(val name: String) {
    open fun makeSound() {
        println("$name makes a sound")
    }
}

class Dog(name: String) : Animal(name) {
    override fun makeSound() {
        println("$name barks")
    }
}

fun main() {

    val animal = Animal("Generic Animal")
    animal.makeSound() // Output: Generic Animal makes a sound
    
    val dog = Dog("Rex")
    dog.makeSound() // Output: Rex barks
}

Here Animal is marked as open to allow inheritance.
Dog extends Animal and overrides its makeSound
method. The override keyword is required for method overriding.

## Data Classes

Data classes are a concise way to create classes that hold data. The
data modifier automatically generates useful methods like
toString, equals, and copy.

DataClass.kt
  

package com.zetcode

data class User(val id: Int, val name: String, val email: String)

fun main() {

    val user1 = User(1, "Alice", "alice@example.com")
    val user2 = User(1, "Alice", "alice@example.com")
    
    println(user1) // Output: User(id=1, name=Alice, email=alice@example.com)
    println(user1 == user2) // Output: true
    
    val user3 = user1.copy(id = 2)
    println(user3) // Output: User(id=2, name=Alice, email=alice@example.com)
}

The User data class gets automatic implementations of useful methods.
We demonstrate equality comparison and copying with modification. Data classes
are ideal for modeling simple data structures.

## Companion Objects

Kotlin classes can have companion objects that act similar to static members in
other languages. They're declared with the companion object keywords
inside the class.

CompanionObject.kt
  

package com.zetcode

class MathUtils {
    companion object {
        fun square(number: Int) = number * number
        const val PI = 3.14159
    }
}

fun main() {

    println(MathUtils.square(5)) // Output: 25
    println(MathUtils.PI) // Output: 3.14159
}

The MathUtils class contains a companion object with a function and
a constant. These members can be accessed directly on the class without needing
an instance. Companion objects can implement interfaces and be named.

## Sealed Classes

Sealed classes are used to represent restricted class hierarchies. All subclasses
must be declared in the same file as the sealed class. They're useful for state
representations.

SealedClass.kt
  

package com.zetcode

sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -&gt; println("Success: ${result.data}")
        is Result.Error -&gt; println("Error: ${result.message}")
        Result.Loading -&gt; println("Loading...")
    }
}

fun main() {

    handleResult(Result.Success("Data loaded"))
    handleResult(Result.Error("Network failure"))
    handleResult(Result.Loading)
}

The Result sealed class has three possible states. The when
expression can exhaustively check all cases without needing an else branch. Sealed
classes provide type-safe way to handle different states.

## Best Practices for Kotlin Classes

**Prefer immutability:** Use val properties unless
mutation is necessary.
**Use data classes:** For simple data holders, data classes
reduce boilerplate code.
**Keep classes focused:** Follow single responsibility principle
for maintainable code.
**Consider sealed classes:** For restricted hierarchies, sealed
classes provide type safety.
**Use companion objects:** For factory methods or constants,
companion objects are idiomatic.

## Source

[Kotlin Classes Documentation](https://kotlinlang.org/docs/classes.html)

This tutorial covered Kotlin's class keyword in depth, showing
various class types and features. We explored simple classes, inheritance, data
classes, companion objects, and sealed classes. Proper use of classes is
fundamental to writing clean, maintainable Kotlin code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).