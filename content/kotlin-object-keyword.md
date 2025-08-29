+++
title = "Kotlin Object Keyword"
date = 2025-08-29T20:02:45.024+01:00
draft = false
description = "Kotlin object keyword tutorial shows how to create singletons, companion objects, and object expressions in Kotlin with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Object Keyword

last modified April 19, 2025

Kotlin's object keyword is a powerful feature that enables several
patterns. It can create singletons, companion objects, and anonymous objects.
This tutorial explores the object keyword in depth with examples.

## Basic Definitions

The object keyword in Kotlin has three main uses. It can declare
singleton objects, create companion objects, and form object expressions. Each
serves different purposes in Kotlin programming.

## Singleton Object

The simplest use of object creates a singleton. A singleton is a
class with exactly one instance. Kotlin makes singletons easy to implement.

Singleton.kt
  

package com.zetcode

object DatabaseManager {
    private val connections = mutableListOf&lt;String&gt;()
    
    fun addConnection(conn: String) {
        connections.add(conn)
    }
    
    fun listConnections() {
        connections.forEach { println(it) }
    }
}

fun main() {
    DatabaseManager.addConnection("Connection 1")
    DatabaseManager.addConnection("Connection 2")
    DatabaseManager.listConnections()
}

Here we create a DatabaseManager singleton using the object
keyword. It maintains a list of connections. We access its methods directly
without instantiating it. The object is created lazily when first accessed.

## Companion Object

Companion objects are declared inside a class using the companion
modifier. They can access private members of the containing class and serve as
factory methods.

CompanionObject.kt
  

package com.zetcode

class User private constructor(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name)
        }
        
        const val MAX_AGE = 120
    }
}

fun main() {
    val user = User.create("John Doe")
    println(user.name) // Output: John Doe
    println(User.MAX_AGE) // Output: 120
}

This example shows a User class with a private constructor. The
companion object provides a factory method create and a constant.
We access companion members using the class name as a qualifier.

## Object Expression

Object expressions create anonymous objects similar to Java's anonymous classes.
They're useful for one-time implementations of interfaces or abstract classes.

ObjectExpression.kt
  

package com.zetcode

interface ClickListener {
    fun onClick()
}

fun main() {
    val button = object : ClickListener {
        override fun onClick() {
            println("Button clicked!")
        }
    }
    
    button.onClick() // Output: Button clicked!
}

Here we create an anonymous object implementing the ClickListener
interface. The object expression syntax allows us to define and instantiate a
class at the same time. This is useful for event handlers and callbacks.

## Companion Object with Name

Companion objects can have names, which allows them to implement interfaces or
extend classes. Named companion objects are more flexible than unnamed ones.

NamedCompanion.kt
  

package com.zetcode

interface Factory&lt;T&gt; {
    fun create(): T
}

class Product {
    companion object ProductFactory : Factory&lt;Product&gt; {
        override fun create(): Product {
            return Product()
        }
    }
}

fun main() {
    val product = Product.create()
    println(product::class.simpleName) // Output: Product
}

This example shows a named companion object ProductFactory that
implements the Factory interface. The companion object provides a
type-safe factory method. Named companions can be referenced in code.

## Object Declaration with Properties

Objects can have properties, methods, initializers, and can implement interfaces.
They're full-fledged classes with a single instance guaranteed by Kotlin.

ObjectProperties.kt
  

package com.zetcode

object Configuration {
    private const val FILE = "config.json"
    
    var timeout: Int = 1000
    val isDebug: Boolean
        get() = System.getProperty("debug") == "true"
    
    init {
        println("Configuration loaded from $FILE")
    }
    
    fun logSettings() {
        println("Timeout: $timeout, Debug: $isDebug")
    }
}

fun main() {
    Configuration.timeout = 2000
    Configuration.logSettings()
}

The Configuration object demonstrates various features. It has
properties, custom getters, an initializer block, and methods. The object is
initialized when first accessed, and the init block runs only once.

## Object Expression with Supertype

Object expressions can extend a class and implement interfaces simultaneously.
This provides great flexibility for creating ad-hoc implementations.

ObjectSupertype.kt
  

package com.zetcode

open class Person(val name: String) {
    open fun greet() = println("Hello, I'm $name")
}

interface Worker {
    fun work()
}

fun main() {
    val employee = object : Person("Alice"), Worker {
        override fun greet() {
            println("Hi, I'm employee $name")
        }
        
        override fun work() {
            println("$name is working hard")
        }
    }
    
    employee.greet() // Output: Hi, I'm employee Alice
    employee.work()  // Output: Alice is working hard
}

This object expression creates an anonymous class extending Person
and implementing Worker. It overrides methods from both. The syntax
allows creating complex one-off implementations concisely.

## Companion Object Extension

Companion objects can be extended with additional functions, similar to regular
class extensions. This is useful for adding utility functions to classes.

CompanionExtension.kt
  

package com.zetcode

class MathUtils {
    companion object {
        fun square(n: Int) = n * n
    }
}

fun MathUtils.Companion.cube(n: Int) = n * n * n

fun main() {
    println(MathUtils.square(3)) // Output: 9
    println(MathUtils.cube(3))   // Output: 27
}

Here we extend the companion object of MathUtils with a cube
function. The extension function becomes available on the companion object. This
pattern keeps related functions together while separating their definitions.

## Best Practices for Object Keyword

**Use singletons wisely:** Prefer objects for true singletons
where single instance is required.
**Leverage companion objects:** Use them for factory methods
and class-level constants.
**Consider object expressions:** For one-off implementations,
object expressions are cleaner than anonymous classes.
**Name companion objects:** Named companions are more flexible
and can implement interfaces.
**Use companion extensions:** Extend companion objects to add
utility functions while keeping code organized.

## Source

[Kotlin Object Declarations Documentation](https://kotlinlang.org/docs/object-declarations.html)

This tutorial covered Kotlin's object keyword in depth, showing
singletons, companion objects, and object expressions. We explored various
scenarios including named companions, extensions, and interface implementations.
The object keyword is versatile and essential in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).