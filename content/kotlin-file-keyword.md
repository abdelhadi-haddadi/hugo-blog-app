+++
title = "Kotlin file Keyword"
date = 2025-08-29T20:02:33.939+01:00
draft = false
description = "Kotlin file keyword tutorial shows how to work with file-level declarations in Kotlin. Learn about visibility, organization, and usage of file-scoped declarations with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin file Keyword

last modified April 19, 2025

Kotlin's file keyword is used to specify visibility modifiers for top-level
declarations. It controls access to declarations within the same file. This
tutorial explores file-level visibility with practical examples.

## Basic Definitions

The file visibility modifier in Kotlin makes declarations visible
only within the same source file. It's more restrictive than internal
but less restrictive than private for top-level declarations.

## Basic File-private Visibility

The file keyword limits visibility to the current file. This is
useful for helper functions or classes that shouldn't be exposed outside.

Utils.kt
  

package com.zetcode.utils

file fun calculateSquare(x: Int): Int {
    return x * x
}

fun publicCalculateCube(x: Int): Int {
    return x * x * x
}

fun main() {
    println(calculateSquare(5)) // Accessible: 25
    println(publicCalculateCube(3)) // Accessible: 27
}

Here calculateSquare is file-private and can only be used within
Utils.kt. publicCalculateCube is accessible from other files. Both
are accessible in the main function within the same file.

## File-private Class

Classes can also be marked as file-private using the file modifier.
This is useful for implementation details that shouldn't leak outside the file.

Database.kt
  

package com.zetcode.db

file class DatabaseConnection(private val url: String) {
    fun connect() = println("Connected to $url")
}

fun createConnection(): DatabaseConnection {
    return DatabaseConnection("jdbc:mysql://localhost/mydb")
}

fun main() {
    val conn = createConnection()
    conn.connect() // Works within same file
}

The DatabaseConnection class is only visible within Database.kt. The
createConnection function can return it because they're in the same
file. External files can't directly create DatabaseConnection instances.

## File-private Properties

Top-level properties can be file-private to share state within a file while
keeping it hidden from other files. This is useful for module-level constants.

Config.kt
  

package com.zetcode.config

file const val MAX_RETRIES = 3
const val TIMEOUT = 5000L

fun shouldRetry(attempt: Int): Boolean {
    return attempt &lt; MAX_RETRIES
}

fun main() {
    println(shouldRetry(2)) // true
    println("Timeout: $TIMEOUT") // 5000
}

MAX_RETRIES is file-private while TIMEOUT is public.
Both are accessible within Config.kt, but only TIMEOUT can be
accessed from other files. This controls what implementation details are exposed.

## File-private Extension Functions

Extension functions can be file-private to limit their scope. This prevents
polluting the global namespace with extensions only needed locally.

StringUtils.kt
  

package com.zetcode.utils

file fun String.encrypt(): String {
    return this.reversed()
}

fun String.publicEncrypt(): String {
    return encrypt() // Can call file-private function
}

fun main() {
    val secret = "password".encrypt() // Works
    println(secret) // Output: drowssap
}

The encrypt extension is only available in StringUtils.kt.
publicEncrypt can use it internally. This pattern keeps helper
extensions from being visible to other files while still being reusable within.

## File-private Interfaces

Interfaces can be file-private to restrict their implementation to the current
file. This is useful for internal contracts between components.

Logger.kt
  

package com.zetcode.logging

file interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("[LOG] $message")
    }
}

fun createLogger(): Logger {
    return ConsoleLogger()
}

fun main() {
    val logger = createLogger()
    logger.log("Test message") // [LOG] Test message
}

The Logger interface is only visible within Logger.kt. External
files can use createLogger but can't implement Logger
directly. This enforces a controlled way of creating loggers.

## File-private Companion Objects

Companion object members can be file-private to share implementation details
between class methods while keeping them hidden from other files.

IdGenerator.kt
  

package com.zetcode.utils

class IdGenerator {
    companion object {
        file var counter = 0
        file fun nextId() = ++counter
    }
    
    fun generate(): Int {
        return nextId() // Can access file-private members
    }
}

fun main() {
    val gen = IdGenerator()
    println(gen.generate()) // 1
    println(gen.generate()) // 2
}

The counter and nextId are file-private but accessible
to all IdGenerator methods. This maintains state while preventing
external modification. Each call to generate increments the counter.

## File-private and Internal Visibility

When comparing file with internal visibility,
file is more restrictive. internal makes declarations
visible to the whole module.

Visibility.kt
  

package com.zetcode.visibility

file val filePrivate = "File private"
internal val moduleVisible = "Module visible"

fun printValues() {
    println(filePrivate) // Accessible
    println(moduleVisible) // Accessible
}

fun main() {
    printValues()
}

filePrivate is only visible in Visibility.kt while
moduleVisible can be accessed from any file in the same module.
Both are accessible within the file they're declared in.

## Best Practices for File-private Declarations

**Hide implementation details:** Use file-private for helpers
that shouldn't be exposed outside the file.
**Reduce namespace pollution:** Keep file-specific extensions
and utilities file-private.
**Share state carefully:** Use file-private properties for
file-level state that shouldn't be modified externally.
**Document file-private APIs:** Even though they're not
public, document them for maintainers.
**Consider alternatives:** For truly private declarations,
use private within classes or objects.

## Source

[Kotlin Visibility Modifiers Documentation](https://kotlinlang.org/docs/visibility-modifiers.html)

This tutorial covered Kotlin's file visibility modifier in depth.
We explored various use cases including functions, classes, properties, and
interfaces. Proper use of file-private visibility helps create clean, modular
code with well-controlled access to implementation details.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).