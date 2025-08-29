+++
title = "Kotlin get Keyword"
date = 2025-08-29T20:02:36.152+01:00
draft = false
description = "Kotlin get keyword tutorial shows how to use property getters in Kotlin. Learn about default getters, custom getters, and property access with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin get Keyword

last modified April 19, 2025

Kotlin's property system provides powerful ways to control access to class
members. The get keyword is essential for defining property
getters. This tutorial explores the get keyword in depth with
practical examples.

## Basic Definitions

The get keyword in Kotlin defines a getter for a property. Every
property in Kotlin has a default getter, but you can define custom getters to
control property access. Getters are called when you read a property's value.

## Default Getter

Kotlin automatically provides a default getter for properties. The default
getter simply returns the property value. You don't need to declare it
explicitly.

DefaultGetter.kt
  

package com.zetcode

class Person {
    var name: String = "John Doe"
}

fun main() {
    val person = Person()
    println(person.name) // Output: John Doe
}

Here, the name property has an implicit getter that returns its
value. When we access person.name, the default getter is called
automatically.

## Custom Getter

You can define a custom getter using the get keyword. This allows
you to modify the returned value or add logic when the property is accessed.

CustomGetter.kt
  

package com.zetcode

class Circle(val radius: Double) {
    val area: Double
        get() = Math.PI * radius * radius
}

fun main() {
    val circle = Circle(5.0)
    println(circle.area) // Output: 78.53981633974483
}

Here, area is a computed property with a custom getter. The getter
calculates the area each time the property is accessed, using the current radius
value.

## Getter with Backing Field

Properties can have both a backing field and a custom getter. The backing field
stores the actual value, while the getter controls access to it.

BackingFieldGetter.kt
  

package com.zetcode

class Temperature {
    var celsius: Double = 0.0
        get() {
            println("Getting temperature")
            return field
        }
        set(value) {
            field = value
        }
}

fun main() {
    val temp = Temperature()
    temp.celsius = 25.0
    println(temp.celsius) // Output: Getting temperature\n25.0
}

This example shows a property with both getter and setter. The getter prints a
message before returning the value. The field keyword refers to the
backing field storing the actual value.

## Getter with Validation

Getters can include validation logic to ensure the returned value meets certain
conditions. This is useful for maintaining data integrity.

ValidationGetter.kt
  

package com.zetcode

class User(val birthYear: Int) {
    val age: Int
        get() {
            val currentYear = java.time.Year.now().value
            return currentYear - birthYear
        }
}

fun main() {
    val user = User(1990)
    println(user.age) // Output will vary based on current year
}

The age property's getter calculates the age dynamically based on
the current year. This ensures the age is always up-to-date when accessed.

## Getter with Visibility Modifier

You can modify the visibility of a getter independently from the property. This
allows for fine-grained access control.

VisibilityGetter.kt
  

package com.zetcode

class BankAccount {
    var balance: Double = 0.0
        private set
    
    val formattedBalance: String
        get() = "$${"%.2f".format(balance)}"
}

fun main() {
    val account = BankAccount()
    // account.balance = 100.0 // Error: setter is private
    println(account.formattedBalance) // Output: $0.00
}

Here, the balance setter is private while the getter remains
public. The formattedBalance property provides a formatted string
representation of the balance.

## Getter in Interface

Interfaces can define properties with getters. Implementing classes must provide
the property, either through storage or computation.

InterfaceGetter.kt
  

package com.zetcode

interface Shape {
    val area: Double
        get() = 0.0
}

class Rectangle(val width: Double, val height: Double) : Shape {
    override val area: Double
        get() = width * height
}

fun main() {
    val rect = Rectangle(4.0, 5.0)
    println(rect.area) // Output: 20.0
}

The Shape interface defines a default getter for area.
Rectangle overrides this with its own implementation. The getter
computes the area based on width and height.

## Lazy Initialization with Getter

Getters can be used with by lazy to implement lazy initialization.
This delays computation until the property is first accessed.

LazyGetter.kt
  

package com.zetcode

class DatabaseConfig {
    val connectionString: String by lazy {
        println("Initializing connection")
        "jdbc:mysql://localhost:3306/mydb"
    }
}

fun main() {
    val config = DatabaseConfig()
    println("Config created")
    println(config.connectionString) // Output: Initializing connection\njdbc:...
    println(config.connectionString) // Output: jdbc:... (no reinitialization)
}

The connectionString is initialized only when first accessed.
Subsequent accesses return the cached value. This is useful for expensive
initializations.

## Best Practices for Getters

**Keep getters simple:** Getters should generally be fast and
free of side effects.
**Consider caching:** For expensive computations, consider
caching results in a backing field.
**Maintain consistency:** Ensure getters always return
consistent values based on the object's state.
**Use lazy initialization:** For properties that are expensive
to initialize, consider using by lazy.
**Document behavior:** Clearly document any non-trivial behavior
in custom getters.

## Source

[Kotlin Properties Documentation](https://kotlinlang.org/docs/properties.html)

This tutorial covered Kotlin's get keyword in depth, showing both
default and custom getters. We explored various scenarios including computed
properties, lazy initialization, and interface implementations. Proper use of
getters can make your code more maintainable and efficient.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).