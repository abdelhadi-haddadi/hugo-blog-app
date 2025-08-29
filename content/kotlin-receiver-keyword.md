+++
title = "Kotlin Receiver Keyword"
date = 2025-08-29T20:02:50.681+01:00
draft = false
description = "Kotlin receiver keyword tutorial shows how to use function literals with receiver in Kotlin. Learn about extension functions, DSL building, and scope functions with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Receiver Keyword

last modified April 19, 2025

Kotlin's receiver concept enables powerful DSL creation and extension functions.
The receiver keyword allows functions to be called in the context of an object.
This tutorial explores receivers in depth with practical examples.

## Basic Definitions

A receiver in Kotlin is the object on which a function or property is called.
The this keyword refers to the receiver in its scope. Function
literals with receiver enable calling methods on an implicit object.

## Extension Functions

Extension functions are the simplest form of receivers. They add functionality
to existing classes without inheritance. The receiver is the object being
extended.

ExtensionFunction.kt
  

package com.zetcode

fun String.addExclamation(): String {
    return "$this!"
}

fun main() {
    val greeting = "Hello"
    println(greeting.addExclamation()) // Output: Hello!
}

Here, String is the receiver type. Inside the function,
this refers to the string instance. We can call it like a
regular method on any String.

## Function Literals with Receiver

Lambda expressions can have receivers, enabling DSL-like syntax. The receiver
becomes available as this inside the lambda.

ReceiverLambda.kt
  

package com.zetcode

class Html {
    fun body() = println("Creating body")
    fun div() = println("Adding div")
}

fun html(init: Html.() -&gt; Unit): Html {
    val html = Html()
    html.init()
    return html
}

fun main() {
    html {
        body()
        div()
    }
}

The html function takes a lambda with Html receiver. Inside the
lambda, we can call Html methods directly. This pattern is common in DSL
construction.

## Scope Functions

Kotlin's standard scope functions (let, run, etc.)
use receivers extensively. They provide different ways to access the receiver
object.

ScopeFunctions.kt
  

package com.zetcode

data class Person(var name: String, var age: Int)

fun main() {
    val person = Person("Alice", 25)
    
    person.run {
        println("Name: $name, Age: $age") // this is implicit
    }
    
    person.let {
        println("Name: ${it.name}, Age: ${it.age}") // explicit it
    }
}

run uses the receiver as this, while let
uses it. Both provide access to the object in different styles.
Choose based on readability needs.

## DSL Building

Receivers enable clean DSL syntax by nesting contexts. Each nested block gets
its own receiver, allowing hierarchical structure.

HtmlDsl.kt
  

package com.zetcode

class Table {
    fun tr(init: Tr.() -&gt; Unit) {
        Tr().init()
    }
}

class Tr {
    fun td(content: String) {
        println("&lt;td&gt;$content&lt;/td&gt;")
    }
}

fun table(init: Table.() -&gt; Unit): Table {
    val table = Table()
    table.init()
    return table
}

fun main() {
    table {
        tr {
            td("Data 1")
            td("Data 2")
        }
    }
}

This HTML DSL example shows nested receivers. The table receiver
enables tr calls, and tr receiver enables td.
Each block operates in its specific context.

## Receiver in Higher-Order Functions

Higher-order functions can accept functions with receivers as parameters. This
allows flexible behavior injection while maintaining context.

HigherOrderReceiver.kt
  

package com.zetcode

class Calculator {
    var result = 0
    
    fun add(value: Int) { result += value }
    fun subtract(value: Int) { result -= value }
}

fun calculate(operations: Calculator.() -&gt; Unit): Int {
    val calculator = Calculator()
    calculator.operations()
    return calculator.result
}

fun main() {
    val result = calculate {
        add(5)
        subtract(3)
        add(10)
    }
    println(result) // Output: 12
}

The calculate function takes a lambda with Calculator receiver.
Inside the lambda, we can call Calculator methods directly. The function
returns the final result after all operations.

## Multiple Receivers

Kotlin allows specifying multiple receivers using nested function types. This
enables complex DSLs with multiple contexts.

MultipleReceivers.kt
  

package com.zetcode

class Database {
    fun query(sql: String) = println("Executing: $sql")
}

class Logger {
    fun log(message: String) = println("LOG: $message")
}

fun withDatabaseAndLogger(action: Database.(Logger) -&gt; Unit) {
    val db = Database()
    val logger = Logger()
    db.action(logger)
}

fun main() {
    withDatabaseAndLogger { logger -&gt;
        logger.log("Starting query")
        query("SELECT * FROM users")
        logger.log("Query completed")
    }
}

This example shows a function with two receivers: Database as primary and Logger
as parameter. The lambda can access both contexts, enabling coordinated
operations between components.

## Receiver in Generic Functions

Generic functions can use receivers to enable type-safe operations on various
types while maintaining context.

GenericReceiver.kt
  

package com.zetcode

fun &lt;T&gt; T.applyIf(condition: Boolean, block: T.() -&gt; T): T {
    return if (condition) block() else this
}

fun main() {
    val number = 10
    val result = number.applyIf(number &gt; 5) {
        this * 2
    }
    println(result) // Output: 20
    
    val text = "Hello"
    val modified = text.applyIf(text.length &gt; 3) {
        uppercase()
    }
    println(modified) // Output: HELLO
}

The generic applyIf function works with any type T. The receiver
block can perform type-specific operations. The condition determines whether
the block is applied.

## Best Practices for Receivers

**Clear context:** Ensure the receiver's purpose is obvious
from the function name or DSL structure.
**Limit scope:** Keep receiver functions focused on operations
relevant to the receiver type.
**Documentation:** Clearly document expected behavior when using
complex receiver hierarchies.
**Type safety:** Leverage generics with receivers to maintain
type safety in flexible APIs.
**Readability:** Prefer explicit receivers (this)
when nesting might cause confusion.

## Source

[Kotlin Function Literals with Receiver](https://kotlinlang.org/docs/lambdas.html#function-literals-with-receiver)

This tutorial covered Kotlin's receiver concept in depth, showing various
applications from extension functions to DSL construction. Receivers enable
powerful, context-aware code while maintaining readability and type safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).