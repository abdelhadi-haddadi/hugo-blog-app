+++
title = "Kotlin final Keyword"
date = 2025-08-29T20:02:35.058+01:00
draft = false
description = "Kotlin final keyword tutorial shows how to control inheritance in Kotlin. Learn about final classes, methods, and properties with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin final Keyword

last modified April 19, 2025

Kotlin's final keyword provides control over inheritance and method
overriding. By default, Kotlin classes and members are final unless explicitly
marked as open. This tutorial explores the final keyword in depth.

## Basic Definitions

The final keyword in Kotlin prevents inheritance or overriding. When
applied to a class, it cannot be inherited. When applied to a member, it cannot
be overridden in subclasses. Kotlin makes everything final by default for safety.

## Final Class

A final class cannot be inherited. In Kotlin, all classes are final by default
unless marked with the open keyword. This is different from Java.

FinalClass.kt
  

package com.zetcode

final class FinalClass {
    fun show() = println("Final class method")
}

// This would cause a compile error
// class SubClass : FinalClass()

Here we declare a final class explicitly (though it's redundant in Kotlin). Any
attempt to inherit from this class will fail. Kotlin's default final behavior
promotes better design by preventing unintended inheritance.

## Final Method

A final method cannot be overridden in subclasses. In Kotlin, all methods are
final by default unless marked with open. This prevents accidental
overriding.

FinalMethod.kt
  

package com.zetcode

open class Parent {
    final fun cannotOverride() = println("This is final")
    open fun canOverride() = println("This can be overridden")
}

class Child : Parent() {
    override fun canOverride() = println("Overridden method")
    // Cannot override cannotOverride()
}

The cannotOverride method is marked as final and cannot be
overridden in the Child class. The canOverride method is open and
can be overridden. This demonstrates Kotlin's explicit design for inheritance.

## Final Property

Final properties work similarly to methods - they cannot be overridden in
subclasses. Kotlin properties are final by default unless marked with
open.

FinalProperty.kt
  

package com.zetcode

open class Vehicle {
    final val wheels = 4
    open val maxSpeed = 100
}

class Car : Vehicle() {
    override val maxSpeed = 200
    // Cannot override wheels
}

The wheels property is final and cannot be overridden, while
maxSpeed is open and can be overridden in the Car subclass. This
shows how to control property inheritance in Kotlin.

## Final Class with Open Members

Even if a class is final (the default), you can still mark its members as open.
However, since the class itself can't be inherited, the open members have no
effect.

FinalClassOpenMembers.kt
  

package com.zetcode

class FinalClassWithOpenMembers {
    open fun canOverride() = println("Open but in final class")
    // This method can't actually be overridden
}

// This would cause a compile error
// class SubClass : FinalClassWithOpenMembers()

Here we see that marking methods as open in a final class is allowed but
meaningless since the class can't be inherited. The compiler will warn about
this redundant usage of open.

## Final Override

You can mark an override as final to prevent further overriding in subclasses.
This is useful when you want to allow overriding but limit it to one level.

FinalOverride.kt
  

package com.zetcode

open class Parent {
    open fun canOverride() = println("Parent method")
}

open class Child : Parent() {
    final override fun canOverride() = println("Child method")
}

class GrandChild : Child() {
    // Cannot override canOverride() here
}

The Child class overrides the method but marks it as final, preventing further
overriding in GrandChild. This technique provides controlled inheritance where
you want to stop the override chain at a specific level.

## Final in Data Classes

Data classes in Kotlin are implicitly final and cannot be inherited. This is
because data classes are meant to be simple value holders, and inheritance could
complicate their behavior.

FinalDataClass.kt
  

package com.zetcode

data class Person(val name: String, val age: Int)

// This would cause a compile error
// class Employee : Person("John", 30)

The Person data class is automatically final, and any attempt to inherit from it
will fail. This design ensures data classes remain simple and predictable in
their behavior.

## Final in Sealed Classes

Sealed classes are implicitly abstract and can only be inherited within the same
file. Their subclasses can be final or open, providing controlled inheritance.

FinalSealedClass.kt
  

package com.zetcode

sealed class Result {
    final class Success(val data: String) : Result()
    open class Error(val message: String) : Result()
}

// Can only extend Result in same file
class NetworkError : Result.Error("Network failure")

Here we see a sealed class with both final and open subclasses. The Success
class is final and cannot be extended further, while Error is open and can be
extended (but only within the same file as the sealed class).

## Best Practices for final Keyword

**Default to final:** Kotlin's default final behavior is good -
only make classes/members open when necessary.
**Document reasons:** When using open, document why inheritance
is needed to help maintainers.
**Prefer composition:** Often composition is better than
inheritance - consider this before making classes open.
**Use final override:** When overriding, consider if further
overrides should be allowed using final override.
**Understand sealed classes:** For controlled inheritance
hierarchies, consider sealed classes instead of open classes.

## Source

[Kotlin Inheritance Documentation](https://kotlinlang.org/docs/inheritance.html)

This tutorial covered Kotlin's final keyword in depth, showing how
it controls inheritance and overriding. We explored final classes, methods,
properties, and special cases with data and sealed classes. Kotlin's default
final behavior promotes safer and more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).