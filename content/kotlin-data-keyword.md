+++
title = "Kotlin data Keyword"
date = 2025-08-29T20:02:29.462+01:00
draft = false
description = "Kotlin data keyword tutorial shows how to create data classes in Kotlin. Learn about automatic methods generation, destructuring declarations, and copying with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin data Keyword

last modified April 19, 2025

Kotlin's data keyword simplifies creating classes that primarily
hold data. It automatically generates useful methods like toString,
equals, and hashCode. This tutorial explores the
data keyword in depth with practical examples.

## Basic Definitions

The data keyword in Kotlin marks a class as a data class. Data
classes are designed to hold data and automatically provide implementations for
standard methods. They're ideal for creating POJOs (Plain Old Java Objects) with
minimal boilerplate code.

## Basic Data Class

A simple data class requires the data keyword before the class
declaration. The primary constructor must have at least one parameter. All
parameters are automatically properties.

BasicDataClass.kt
  

package com.zetcode

data class Person(val name: String, val age: Int)

fun main() {

    val person = Person("John Doe", 30)
    println(person) // Output: Person(name=John Doe, age=30)
}

Here we define a Person data class with two properties. Kotlin
automatically generates a readable toString method. The output
shows both property names and their values in a standardized format.

## Equals and HashCode

Data classes automatically implement equals and hashCode
methods based on all properties declared in the primary constructor. This ensures
proper equality comparison.

EqualsHashCode.kt
  

package com.zetcode

data class Product(val id: Int, val name: String, val price: Double)

fun main() {

    val p1 = Product(1, "Laptop", 999.99)
    val p2 = Product(1, "Laptop", 999.99)
    
    println(p1 == p2) // Output: true
    println(p1.hashCode() == p2.hashCode()) // Output: true
}

Two Product instances with identical property values are considered
equal. The hashCode values also match, making them suitable for
use in hash-based collections like HashSet or HashMap.

## Copy Function

Data classes provide a copy function that creates a new instance
with some properties changed. This is useful for immutable data structures where
you want to create modified copies.

CopyFunction.kt
  

package com.zetcode

data class Book(val title: String, val author: String, val year: Int)

fun main() {

    val book1 = Book("Kotlin in Action", "Dmitry Jemerov", 2017)
    val book2 = book1.copy(title = "Kotlin Cookbook", year = 2022)
    
    println(book1) // Output: Book(title=Kotlin in Action, ...)
    println(book2) // Output: Book(title=Kotlin Cookbook, ...)
}

The copy function creates a new Book instance with
the same author but different title and year. Original properties not specified
in copy are preserved in the new instance.

## Destructuring Declarations

Data classes enable destructuring declarations, allowing you to unpack an object
into multiple variables. This works because data classes automatically provide
componentN functions.

Destructuring.kt
  

package com.zetcode

data class Point(val x: Int, val y: Int)

fun main() {

    val point = Point(10, 20)
    val (xCoord, yCoord) = point
    
    println("X: $xCoord, Y: $yCoord") // Output: X: 10, Y: 20
}

The Point instance is destructured into xCoord and
yCoord variables. The order of variables matches the order of
properties in the primary constructor declaration.

## Default and Named Arguments

Data classes support default values and named arguments in their constructors.
This provides flexibility when creating instances while maintaining clean code.

DefaultArgs.kt
  

package com.zetcode

data class User(
    val username: String,
    val email: String = "",
    val active: Boolean = true
)

fun main() {

    val user1 = User("johndoe")
    val user2 = User("janedoe", "jane@example.com", false)
    val user3 = User(username = "admin", active = true)
    
    println(user1) // Output: User(username=johndoe, email=, active=true)
    println(user2) // Output: User(username=janedoe, email=jane@example.com, active=false)
    println(user3) // Output: User(username=admin, email=, active=true)
}

The User data class demonstrates default values for email
and active properties. We can create instances with different
combinations of arguments, using either positional or named parameters.

## Data Class Limitations

Data classes have some limitations. They cannot be abstract, open, sealed, or
inner. They must have a primary constructor with at least one parameter, and all
parameters must be marked as val or var.

Limitations.kt
  

package com.zetcode

// This won't compile - data class can't be abstract
// abstract data class Shape(val sides: Int)

// This won't compile - data class needs at least one parameter
// data class Empty()

fun main() {

    data class Temp(val value: Int) // Local data classes are allowed
    
    val temp = Temp(42)
    println(temp) // Output: Temp(value=42)
}

The commented examples show invalid data class declarations. However, data classes
can be declared locally within functions, as demonstrated with the Temp
class. This is useful for temporary data structures.

## Data Classes with Additional Members

While data classes primarily handle data, they can contain additional members
like methods or secondary constructors. However, only primary constructor
properties are used for generated methods.

AdditionalMembers.kt
  

package com.zetcode

data class Employee(
    val id: Int,
    val name: String
) {
    var department: String = "Unassigned"
    
    fun promote() {
        department = "Management"
    }
}

fun main() {

    val emp = Employee(101, "Alice")
    emp.department = "Engineering"
    emp.promote()
    
    println(emp) // Output: Employee(id=101, name=Alice)
    println("Department: ${emp.department}") // Output: Department: Management
}

The Employee data class includes an additional property and method.
Note that the toString output only includes primary constructor
properties. Additional members must be accessed separately.

## Best Practices for Data Classes

**Use for data holders:** Data classes are ideal for classes
whose main purpose is holding data.
**Keep immutable:** Prefer val properties to make
data classes immutable when possible.
**Leverage copy:** Use the copy method for
creating modified instances of immutable data classes.
**Consider destructuring:** Use destructuring declarations when
you need to access multiple properties at once.
**Avoid complex logic:** Keep data classes focused on data
storage rather than complex business logic.

## Source

[Kotlin Data Classes Documentation](https://kotlinlang.org/docs/data-classes.html)

This tutorial covered Kotlin's data keyword in depth, showing how
to create and use data classes effectively. We explored automatic method
generation, copying, destructuring, and limitations. Data classes reduce
boilerplate code while providing robust functionality for data-centric classes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).