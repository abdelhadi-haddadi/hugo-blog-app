+++
title = "Kotlin !is Keyword"
date = 2025-08-29T20:02:43.923+01:00
draft = false
description = "Kotlin !is keyword tutorial shows how to perform type checking in Kotlin. Learn about negative type checks and smart casts with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin !is Keyword

last modified April 19, 2025

Kotlin's type checking system provides powerful operators to verify types at
runtime. The !is keyword is used for negative type checks. This
tutorial explores the !is keyword in depth with practical examples.

## Basic Definitions

The !is keyword in Kotlin is the negation of the is
operator. It checks if an object is NOT an instance of a specific type. Like
is, it enables smart casts in the corresponding code block.

## Basic !is Check

The simplest use of !is is to verify that an object is not of a
certain type. This is useful when you want to handle different types differently.

BasicNotIs.kt
  

package com.zetcode

fun main() {

    val obj: Any = 42
    
    if (obj !is String) {
        println("Object is not a String")
    }
}

Here we check if obj is not a String. Since it's an Int, the
condition is true and the message is printed. This is the most basic use of
!is.

## !is with Smart Cast

After a !is check, Kotlin smart casts the object to the negated
type in the corresponding block. This allows you to safely use methods of other
types.

SmartCastNotIs.kt
  

package com.zetcode

fun printIfNotString(obj: Any) {
    if (obj !is String) {
        println("Value is ${obj} and type is ${obj.javaClass.simpleName}")
    }
}

fun main() {

    printIfNotString(123) // Output: Value is 123 and type is Integer
    printIfNotString(true) // Output: Value is true and type is Boolean
}

In this example, after the !is String check, Kotlin knows obj isn't
a String. We can then safely access properties of the actual type, like
javaClass.

## !is in When Expressions

The !is operator works well in when expressions to
handle multiple type cases. It helps create exhaustive type checking logic.

WhenNotIs.kt
  

package com.zetcode

fun describeType(obj: Any): String {
    return when (obj) {
        is String -&gt; "String of length ${obj.length}"
        !is Number -&gt; "Not a number"
        else -&gt; "Number with value ${obj.toDouble()}"
    }
}

fun main() {

    println(describeType("Hello")) // String of length 5
    println(describeType(true)) // Not a number
    println(describeType(42)) // Number with value 42.0
}

This example shows how !is can be used in a when
expression. The !is Number branch catches all non-number types
after the String check.

## !is with Null Checks

The !is operator can be combined with null checks to create more
complex conditions. This is particularly useful when dealing with nullable types.

NullCheckNotIs.kt
  

package com.zetcode

fun processValue(value: Any?) {
    if (value !is String? || value == null) {
        println("Not a string or null")
    } else {
        println("String length is ${value.length}")
    }
}

fun main() {

    processValue(null) // Not a string or null
    processValue(123) // Not a string or null
    processValue("Kotlin") // String length is 6
}

Here we combine !is with a null check to handle both non-string
types and null values. The smart cast ensures we can safely access String
properties in the else branch.

## !is in Generic Functions

The !is operator can be used in generic functions to perform type
checks on generic parameters. This requires reified type parameters.

GenericNotIs.kt
  

package com.zetcode

inline fun &lt;reified T&gt; isNotType(obj: Any): Boolean {
    return obj !is T
}

fun main() {

    println(isNotType&lt;String&gt;("Hello")) // false
    println(isNotType&lt;Int&gt;("World")) // true
    println(isNotType&lt;List&lt;*&gt;&gt;(emptyList&lt;String&gt;())) // false
}

This generic function uses !is with a reified type parameter to
check if an object is not of type T. The reified parameter preserves the type
information at runtime.

## !is with Collections

The !is operator can be used to check collection types or to filter
collections based on type. This is useful when working with heterogeneous
collections.

CollectionNotIs.kt
  

package com.zetcode

fun main() {

    val mixedList: List&lt;Any&gt; = listOf(1, "two", 3.0, "four", 5)
    
    val nonStrings = mixedList.filter { it !is String }
    println("Non-string elements: $nonStrings")
    
    if (mixedList !is List&lt;String&gt;) {
        println("List contains non-string elements")
    }
}

Here we use !is to filter out String elements from a mixed list. We
also check that the entire list isn't a List&lt;String&gt;. Both uses demonstrate
!is with collections.

## !is in Class Hierarchies

The !is operator is particularly useful when working with class
hierarchies. It helps determine when an object is not of a specific subclass.

HierarchyNotIs.kt
  

package com.zetcode

open class Animal
class Dog : Animal() {
    fun bark() = "Woof!"
}
class Cat : Animal() {
    fun meow() = "Meow!"
}

fun makeSound(animal: Animal) {
    if (animal !is Dog) {
        println("Not a dog")
        if (animal is Cat) {
            println(animal.meow())
        }
    } else {
        println(animal.bark())
    }
}

fun main() {

    makeSound(Dog()) // Woof!
    makeSound(Cat()) // Not a dog \n Meow!
}

This example shows !is in a class hierarchy. We first check if the
animal is not a Dog, then handle other cases. The smart cast allows calling
Cat-specific methods in the appropriate block.

## Best Practices for !is Operator

**Combine with smart casts:** Leverage Kotlin's smart casting
after !is checks for cleaner code.
**Use in when expressions:** !is works well in
when expressions for exhaustive type checking.
**Consider nullability:** Remember to handle null cases when
using !is with nullable types.
**Prefer positive checks:** Sometimes is with an
else branch is clearer than !is.
**Use with reified generics:** For generic functions, use
reified type parameters with !is.

## Source

[Kotlin Type Checks and Casts Documentation](https://kotlinlang.org/docs/typecasts.html)

This tutorial covered Kotlin's !is keyword in depth, showing its
use in various scenarios including smart casts, when expressions, and generics.
The !is operator is a powerful tool for type-safe Kotlin code when
used appropriately.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).