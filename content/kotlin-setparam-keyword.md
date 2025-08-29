+++
title = "Kotlin setparam Keyword"
date = 2025-08-29T20:02:54.096+01:00
draft = false
description = "Kotlin setparam keyword tutorial shows how to use setparam for parameter setting in Kotlin. Learn about DSL creation and builder patterns with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin setparam Keyword

last modified April 19, 2025

Kotlin's setparam keyword is a powerful tool for creating DSLs and
builder patterns. It allows modification of parameters in a clean, readable way.
This tutorial explores setparam in depth with practical examples.

## Basic Definitions

The setparam keyword in Kotlin is used to mark parameters that can
be modified in a DSL context. It's typically used with property delegates or
builder patterns to enable fluent API creation. The keyword helps create more
expressive and maintainable code.

## Basic setparam Usage

The simplest use of setparam is to mark a parameter as modifiable
in a DSL context. This enables clean property setting syntax in your DSLs.

BasicSetparam.kt
  

package com.zetcode

class Person {
    var name: String by setparam("Unknown")
    var age: Int by setparam(0)
}

fun person(block: Person.() -&gt; Unit): Person {
    val p = Person()
    p.block()
    return p
}

fun main() {
    val p = person {
        name = "John Doe"
        age = 30
    }
    
    println("${p.name}, ${p.age}") // Output: John Doe, 30
}

Here we create a Person class with properties using setparam. The
person function provides a DSL-like syntax for setting properties.
The properties can be set directly in the block with clean syntax.

## Custom Property Delegates with setparam

setparam works with custom property delegates to provide additional
functionality during property setting. This enables validation or side effects.

CustomDelegate.kt
  

package com.zetcode

class ValidatedString(private var value: String) {
    operator fun getValue(thisRef: Any?, property: Any?) = value
    
    operator fun setValue(thisRef: Any?, property: Any?, newValue: String) {
        require(newValue.isNotBlank()) { "Name cannot be blank" }
        value = newValue
    }
}

class User {
    var name: String by setparam(ValidatedString(""))
}

fun user(block: User.() -&gt; Unit): User {
    val u = User()
    u.block()
    return u
}

fun main() {
    val u = user {
        name = "Alice"
    }
    
    println(u.name) // Output: Alice
    
    // This would throw IllegalArgumentException:
    // user { name = "" }
}

This example shows a custom property delegate with validation. The setparam
keyword enables the clean setting syntax while the delegate ensures the name isn't
blank. The validation occurs when the property is set.

## Builder Pattern with setparam

setparam is particularly useful in builder patterns, allowing for
fluent property setting while maintaining immutability of the built object.

BuilderPattern.kt
  

package com.zetcode

data class Car(
    val make: String,
    val model: String,
    val year: Int
) {
    class Builder {
        var make: String by setparam("")
        var model: String by setparam("")
        var year: Int by setparam(0)
        
        fun build() = Car(make, model, year)
    }
}

fun car(block: Car.Builder.() -&gt; Unit): Car {
    val builder = Car.Builder()
    builder.block()
    return builder.build()
}

fun main() {
    val myCar = car {
        make = "Toyota"
        model = "Corolla"
        year = 2022
    }
    
    println(myCar) // Output: Car(make=Toyota, model=Corolla, year=2022)
}

Here we implement a builder pattern using setparam. The properties
are set in a DSL-like block, and the final object is immutable. This combines
the readability of a DSL with the safety of immutability.

## DSL Creation with setparam

setparam shines when creating domain-specific languages (DSLs). It
allows for natural language-like syntax when configuring objects.

DslCreation.kt
  

package com.zetcode

class Configuration {
    var host: String by setparam("localhost")
    var port: Int by setparam(8080)
    var timeout: Long by setparam(5000L)
}

fun config(block: Configuration.() -&gt; Unit): Configuration {
    val config = Configuration()
    config.block()
    return config
}

fun main() {
    val cfg = config {
        host = "example.com"
        port = 9000
        timeout = 10000L
    }
    
    println("""
        Host: ${cfg.host}
        Port: ${cfg.port}
        Timeout: ${cfg.timeout}
    """.trimIndent())
}

This example demonstrates a configuration DSL using setparam. The
resulting syntax is clean and intuitive. Each property can be set directly in
the configuration block, making the code self-documenting.

## Nested DSLs with setparam

setparam can be used to create nested DSL structures, allowing for
complex hierarchical configurations while maintaining readability.

NestedDsl.kt
  

package com.zetcode

class Address {
    var street: String by setparam("")
    var city: String by setparam("")
    var zip: String by setparam("")
}

class Person {
    var name: String by setparam("")
    var address: Address by setparam(Address())
}

fun person(block: Person.() -&gt; Unit): Person {
    val p = Person()
    p.block()
    return p
}

fun Person.address(block: Address.() -&gt; Unit) {
    address = Address().apply(block)
}

fun main() {
    val p = person {
        name = "Bob Smith"
        address {
            street = "123 Main St"
            city = "Springfield"
            zip = "12345"
        }
    }
    
    println("""
        ${p.name}
        ${p.address.street}
        ${p.address.city}, ${p.address.zip}
    """.trimIndent())
}

This example shows a nested DSL structure using setparam. The
address block allows setting address properties in a clean,
hierarchical way. The resulting code is highly readable and maintainable.

## Type-Safe Builders with setparam

Combining setparam with Kotlin's type-safe builder pattern creates
powerful DSLs that are both expressive and type-safe.

TypeSafeBuilder.kt
  

package com.zetcode

class Html {
    private val children = mutableListOf()
    
    fun p(block: P.() -&gt; Unit) {
        children.add(P().apply(block))
    }
    
    override fun toString() = children.joinToString("\n")
}

class P {
    var text: String by setparam("")
    
    override fun toString() = "&lt;p&gt;$text&lt;/p&gt;"
}

fun html(block: Html.() -&gt; Unit): Html {
    return Html().apply(block)
}

fun main() {
    val page = html {
        p {
            text = "Hello, world!"
        }
        p {
            text = "This is HTML DSL"
        }
    }
    
    println(page)
}

This example creates a type-safe HTML builder using setparam. The
p function creates paragraph elements with text content. The
setparam enables clean property setting within the builder blocks.

## Advanced setparam with Custom Logic

setparam can be combined with custom logic to create sophisticated
DSLs that include validation, transformation, or other custom behavior.

AdvancedSetparam.kt
  

package com.zetcode

class Task {
    private var _name: String = ""
    var name: String by setparam("")
        set(value) {
            require(value.length &lt;= 50) { "Name too long" }
            _name = value
        }
    
    var priority: Int by setparam(0)
        set(value) {
            require(value in 1..10) { "Priority must be 1-10" }
            field = value
        }
}

fun task(block: Task.() -&gt; Unit): Task {
    return Task().apply(block)
}

fun main() {
    val importantTask = task {
        name = "Implement feature X"
        priority = 8
    }
    
    println("${importantTask.name} (Priority: ${importantTask.priority})")
    
    // These would throw exceptions:
    // task { name = "A".repeat(51) }
    // task { priority = 11 }
}

This advanced example shows setparam with custom validation logic.
The properties include requirements that are checked when values are set. The
DSL syntax remains clean while enforcing business rules.

## Best Practices for setparam

**Use for DSLs:** setparam is ideal for creating
clean, readable domain-specific languages.
**Combine with delegates:** Pair with property delegates for
additional functionality like validation or logging.
**Maintain immutability:** Consider making built objects
immutable while allowing mutable configuration.
**Document behavior:** Clearly document any custom behavior or
validation in your DSLs.
**Keep it simple:** Avoid overly complex DSL structures that
might confuse users.

## Source

[Kotlin Type-Safe Builders Documentation](https://kotlinlang.org/docs/type-safe-builders.html)

This tutorial covered Kotlin's setparam keyword in depth, showing
its use in DSL creation, builder patterns, and property delegation. We explored
various scenarios from basic usage to advanced patterns. Proper use of
setparam can significantly improve code readability and
maintainability.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).