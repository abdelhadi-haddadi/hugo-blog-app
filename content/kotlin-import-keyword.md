+++
title = "Kotlin import Keyword"
date = 2025-08-29T20:02:37.228+01:00
draft = false
description = "Kotlin import keyword tutorial shows how to import packages and declarations in Kotlin. Learn about various import techniques with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin import Keyword

last modified April 19, 2025

Kotlin's import system allows you to access declarations from other packages.
The import keyword is essential for organizing and reusing code.
This tutorial explores the import keyword in depth with examples.

## Basic Definitions

The import keyword in Kotlin is used to bring declarations into
scope. It can import packages, classes, functions, properties, and type aliases.
Imports help avoid fully qualified names and make code more readable.

## Basic Package Import

The simplest form of import brings all declarations from a package into scope.
This is useful when you need multiple items from the same package.

BasicImport.kt
  

package com.zetcode

import kotlin.math.*

fun main() {

    val sqrt = sqrt(16.0) // 4.0
    val abs = abs(-5) // 5
    
    println("Square root: $sqrt")
    println("Absolute value: $abs")
}

Here we import all declarations from kotlin.math package using the
wildcard *. This allows us to use sqrt and abs
functions without package qualification. The wildcard imports all public members.

## Single Declaration Import

You can import specific declarations rather than entire packages. This is
recommended when you only need a few items from a package.

SingleImport.kt
  

package com.zetcode

import kotlin.math.PI
import kotlin.math.cos

fun main() {

    val cosine = cos(PI) // -1.0
    println("Cosine of PI: $cosine")
}

This example imports only PI and cos from the math
package. Explicit imports make dependencies clear and avoid namespace pollution.
They also help with code navigation in IDEs.

## Import with Aliasing

Kotlin allows renaming imports using the as keyword. This is useful
when dealing with name conflicts or long class names.

AliasImport.kt
  

package com.zetcode

import java.util.Date as UtilDate
import kotlin.js.Date as JsDate

fun main() {

    val utilDate = UtilDate()
    val jsDate = JsDate()
    
    println("Java Date: $utilDate")
    println("JS Date: $jsDate")
}

Here we import two different Date classes from different packages.
We use aliases to distinguish them. Aliasing helps avoid naming conflicts and
makes code more readable when using similar classes.

## Importing Extension Functions

Kotlin allows importing extension functions specifically. This is useful when you
only need certain extensions from a package.

ExtensionImport.kt
  

package com.zetcode

import kotlin.text.isNullOrEmpty

fun main() {

    val s: String? = null
    println("Is null or empty: ${s.isNullOrEmpty()}") // true
}

This example imports the isNullOrEmpty extension function for
nullable strings. Extension function imports work like regular function imports.
They allow you to use the extension without qualifying its package.

## Importing Companion Object Members

Kotlin allows importing members of companion objects directly. This provides
convenient access to constants and factory methods.

CompanionImport.kt
  

package com.zetcode

import kotlin.math.PI
import kotlin.math.E
import kotlin.math.cos

fun main() {

    println("PI: $PI") // 3.141592653589793
    println("E: $E") // 2.718281828459045
    println("cos(PI): ${cos(PI)}") // -1.0
}

Here we import constants PI and E from kotlin.math.
These are effectively companion object members. Importing them allows direct usage
without class qualification, similar to static imports in Java.

## Importing from Same Package

Declarations from the same package don't need explicit imports. Kotlin
automatically makes them available in all files of the same package.

SamePackage.kt
  

package com.zetcode.utils

fun greet() = println("Hello from utils!")

// In another file in same package:
package com.zetcode.utils

fun main() {
    greet() // No import needed
}

The greet function is available without import because both files
are in the same package. Kotlin's package system works similarly to Java's,
where same-package members are automatically visible.

## Importing Local Functions

Kotlin doesn't support importing local functions directly. However, you can
organize related functions in objects or top-level declarations for import.

FunctionImport.kt
  

package com.zetcode.utils

object StringUtils {
    fun capitalize(s: String) = s.replaceFirstChar { it.uppercase() }
}

// In another file:
package com.zetcode

import com.zetcode.utils.StringUtils.capitalize

fun main() {
    println(capitalize("kotlin")) // Kotlin
}

Here we organize the capitalize function in an object, then import
it specifically. This pattern is common for utility functions that need to be
shared across multiple files.

## Best Practices for Importing

**Prefer specific imports:** Avoid wildcard imports to make
dependencies clear.
**Organize imports:** Group imports by source (stdlib, third-party,
your project).
**Use aliases wisely:** Rename imports only when necessary to
resolve conflicts.
**Limit import scope:** Import only what you need to keep
namespaces clean.
**Follow conventions:** Alphabetize imports within groups for
consistency.

## Source

[Kotlin Packages Documentation](https://kotlinlang.org/docs/packages.html)

This tutorial covered Kotlin's import keyword in depth, showing
various import techniques. We explored package imports, single declarations,
aliasing, and special cases like extensions. Proper use of imports makes code
more organized and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).