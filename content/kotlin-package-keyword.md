+++
title = "Kotlin package Keyword"
date = 2025-08-29T20:02:47.329+01:00
draft = false
description = "Kotlin package keyword tutorial shows how to organize code into packages in Kotlin. Learn about package declarations, imports, and access control with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin package Keyword

last modified April 19, 2025

Kotlin's package system helps organize code into logical groups and prevent
naming conflicts. The package keyword is fundamental to code
organization in Kotlin. This tutorial explores the package keyword
in depth with practical examples.

## Basic Definitions

The package keyword in Kotlin declares a namespace for related code.
Packages help avoid naming collisions and provide access control. All Kotlin files
belong to a package, with the default package being used if none is specified.

## Basic Package Declaration

The simplest package declaration places all code in a specified namespace. The
package statement must be the first non-comment line in a Kotlin file.

Hello.kt
  

package com.zetcode.hello

fun sayHello() {
    println("Hello from the com.zetcode.hello package!")
}

fun main() {
    sayHello()
}

This example declares a package com.zetcode.hello containing a
function. The fully qualified name of the function is
com.zetcode.hello.sayHello. The main function demonstrates calling
the function within the same package.

## Accessing Package Members

To use members from other packages, you need to import them. Kotlin provides
several import statement variations for different use cases.

Main.kt
  

package com.zetcode.main

import com.zetcode.hello.sayHello

fun main() {
    sayHello() // Using imported function
}

Here we import the sayHello function from the
com.zetcode.hello package. The import statement allows us to use the
function with its simple name. Without the import, we'd need the fully qualified
name.

## Package-Level Functions and Properties

Kotlin allows defining functions and properties directly in packages, without
needing a class. These are called top-level declarations and are common in
Kotlin.

MathUtils.kt
  

package com.zetcode.math

const val PI = 3.1415926535

fun circleArea(radius: Double): Double {
    return PI * radius * radius
}

This package contains a top-level constant PI and function
circleArea. These can be imported and used anywhere in your
project. Package-level declarations help organize utility functions and constants.

## Nested Packages

Packages can be nested to create hierarchical namespaces. This helps organize
related functionality into logical groups.

graphics/shapes/Circle.kt
  

package com.zetcode.graphics.shapes

class Circle(val radius: Double) {
    fun area(): Double {
        return Math.PI * radius * radius
    }
}

This example shows a nested package structure for graphics-related code. The
Circle class is in the com.zetcode.graphics.shapes
package. Nested packages help organize large codebases into manageable sections.

## Default Package Visibility

Kotlin's default visibility modifier is public, but within the same
package, you can use internal visibility for module-specific code.

Logger.kt
  

package com.zetcode.logging

internal fun logDebug(message: String) {
    println("[DEBUG] $message")
}

fun logError(message: String) {
    println("[ERROR] $message")
}

Here, logDebug is visible only within the same module, while
logError is public. Package organization works with visibility
modifiers to control access to your code's components.

## Package Naming Conventions

Kotlin follows Java package naming conventions, typically using reverse domain
notation. This helps ensure unique package names across different organizations.

UserService.kt
  

package com.companyname.projectname.services

class UserService {
    fun authenticate(user: String, pass: String): Boolean {
        // Authentication logic
        return true
    }
}

This example shows conventional package naming. The package starts with the
reversed domain (com.companyname), followed by project name and
functional area. Following conventions makes your code more maintainable.

## Wildcard Imports

Kotlin supports wildcard imports to bring in all members of a package. This can
be convenient but may lead to naming conflicts.

App.kt
  

package com.zetcode.app

import com.zetcode.math.*
import com.zetcode.graphics.shapes.Circle

fun main() {
    val area = circleArea(5.0) // From math package
    val circle = Circle(5.0)   // Explicitly imported
    
    println("Circle area: $area")
    println("Circle class area: ${circle.area()}")
}

This example shows both wildcard import (com.zetcode.math.*) and
specific import. Wildcards can make code cleaner but may cause ambiguity if
multiple packages have same-named members.

## Best Practices for Packages

**Follow naming conventions:** Use reverse domain notation for
package names to ensure uniqueness.
**Organize by feature:** Structure packages by feature rather
than by layer for better modularity.
**Avoid default package:** Always specify a package name to
prevent naming conflicts.
**Limit wildcard imports:** Prefer explicit imports for better
code clarity.
**Keep packages cohesive:** Group related functionality together
in the same package.

## Source

[Kotlin Packages Documentation](https://kotlinlang.org/docs/packages.html)

This tutorial covered Kotlin's package keyword in depth, showing how
to organize code into logical namespaces. We explored package declarations,
imports, visibility, and naming conventions. Proper package organization makes
your code more maintainable and scalable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).