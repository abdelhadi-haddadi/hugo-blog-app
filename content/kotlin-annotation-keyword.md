+++
title = "Kotlin Annotation Keyword"
date = 2025-08-29T20:02:23.968+01:00
draft = false
description = "Kotlin annotation keyword tutorial shows how to use annotations in Kotlin. Learn about built-in annotations and creating custom annotations with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Annotation Keyword

last modified April 19, 2025

Annotations in Kotlin provide a way to attach metadata to code elements. The
annotation keyword is used to declare custom annotations. This
tutorial explores annotations in depth with practical examples.

## Basic Definitions

Annotations are special attributes that provide metadata about code elements.
They don't affect program execution directly but can be processed by tools or
frameworks. Kotlin supports both built-in and custom annotations.

## Built-in @Deprecated Annotation

Kotlin provides several built-in annotations. The @Deprecated
annotation marks elements that should no longer be used. It helps with API
evolution by warning users about obsolete code.

DeprecatedExample.kt
  

package com.zetcode

@Deprecated("Use newFunction() instead", ReplaceWith("newFunction()"))
fun oldFunction() {
    println("This is the old function")
}

fun newFunction() {
    println("This is the new function")
}

fun main() {
    oldFunction() // Warning: 'oldFunction()' is deprecated
}

Here we mark oldFunction as deprecated with a message and
replacement suggestion. The IDE will show a warning when this function is used.
The replacement suggestion helps users migrate to the new API.

## Creating Custom Annotations

Custom annotations are declared using the annotation keyword. They
can be applied to classes, functions, properties, and other code elements.
Annotations can have parameters with default values.

CustomAnnotation.kt
  

package com.zetcode

annotation class Author(val name: String, val date: String = "2025")

@Author(name = "Jan Bodnar", date = "2025-04-19")
class Document {
    @Author(name = "Jan Bodnar")
    fun print() {
        println("Document printed")
    }
}

fun main() {
    val doc = Document()
    doc.print()
}

We create an Author annotation with two parameters. The annotation
is applied to both a class and a method. The date parameter has a default value.
Annotations like this can be processed by documentation tools.

## Annotation Target Specification

Kotlin allows specifying where an annotation can be applied using
@Target. This ensures annotations are used correctly and prevents
misapplication to invalid targets.

TargetAnnotation.kt
  

package com.zetcode

@Target(AnnotationTarget.CLASS, AnnotationTarget.FUNCTION)
annotation class ApiEndpoint(val path: String)

@ApiEndpoint("/users")
class UserController {
    @ApiEndpoint("/list")
    fun listUsers() {
        println("Listing users")
    }
}

fun main() {
    val controller = UserController()
    controller.listUsers()
}

The ApiEndpoint annotation is restricted to classes and functions.
Attempting to apply it to a property would cause a compilation error. This helps
maintain consistent API design.

## Annotation Retention Policy

Annotations can specify their retention policy using @Retention.
This determines whether annotations are available at runtime or only during
compilation.

RetentionExample.kt
  

package com.zetcode

@Retention(AnnotationRetention.RUNTIME)
annotation class RuntimeVisible

@Retention(AnnotationRetention.SOURCE)
annotation class SourceOnly

@RuntimeVisible
@SourceOnly
class TestClass

fun main() {
    val annotations = TestClass::class.annotations
    annotations.forEach { println(it) } // Only shows RuntimeVisible
}

Here we define two annotations with different retention policies. Only
RuntimeVisible is accessible at runtime. The SourceOnly
annotation is discarded after compilation and won't appear in reflection.

## Repeatable Annotations

Kotlin supports repeatable annotations when marked with @Repeatable.
This allows applying the same annotation multiple times to a single element.

RepeatableAnnotation.kt
  

package com.zetcode

@Repeatable
annotation class Tag(val name: String)

@Tag("database")
@Tag("performance")
@Tag("security")
class DatabaseService {
    fun connect() {
        println("Connecting to database")
    }
}

fun main() {
    val service = DatabaseService()
    service.connect()
}

The Tag annotation is marked as repeatable, allowing multiple tags
on the DatabaseService class. This pattern is useful for
categorization or adding multiple metadata attributes to an element.

## Annotation Parameters

Annotation parameters can be of primitive types, strings, enums, other
annotations, or arrays of these types. Parameters are defined in the annotation's
primary constructor.

AnnotationParams.kt
  

package com.zetcode

enum class Priority { LOW, MEDIUM, HIGH }

annotation class Scheduled(
    val cron: String,
    val priority: Priority = Priority.MEDIUM,
    val enabled: Boolean = true
)

@Scheduled(cron = "0 * * * *", priority = Priority.HIGH)
class BackgroundTask {
    fun execute() {
        println("Task executed")
    }
}

fun main() {
    val task = BackgroundTask()
    task.execute()
}

The Scheduled annotation demonstrates various parameter types. It
includes a required cron expression and optional priority and enabled parameters.
Default values make some parameters optional when using the annotation.

## Annotation Use-site Targets

In Kotlin, you can specify where an annotation should be applied when annotating
properties. This is done using use-site targets with the @ symbol.

UseSiteTarget.kt
  

package com.zetcode

annotation class Positive

class Account {
    @set:Positive
    var balance: Int = 0
        set(value) {
            require(value &gt;= 0) { "Balance must be positive" }
            field = value
        }
}

fun main() {
    val account = Account()
    account.balance = 100
    println("Balance: ${account.balance}")
}

Here the @Positive annotation is applied to the setter of the
balance property. Use-site targets like @set, @get,
and @field provide precise control over annotation placement.

## Best Practices for Annotations

**Use meaningful names:** Choose clear names that reflect the
annotation's purpose.
**Document annotations:** Provide clear documentation for custom
annotations.
**Limit retention:** Use the minimum required retention level
for your needs.
**Validate parameters:** Consider adding validation logic for
annotation parameters.
**Follow conventions:** Maintain consistent style with built-in
annotations.

## Source

[Kotlin Annotations Documentation](https://kotlinlang.org/docs/annotations.html)

This tutorial covered Kotlin's annotation keyword in depth, showing
both built-in and custom annotations. We explored various annotation features
including targets, retention, and parameters. Proper use of annotations can
enhance code documentation and enable powerful metaprogramming capabilities.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).