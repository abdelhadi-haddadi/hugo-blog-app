+++
title = "Kotlin inner Keyword"
date = 2025-08-29T20:02:39.464+01:00
draft = false
description = "Kotlin inner keyword tutorial shows how to use inner classes in Kotlin. Learn about inner classes vs nested classes with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin inner Keyword

last modified April 19, 2025

Kotlin's class system supports both nested and inner classes. The inner
keyword is used to create inner classes that can access members of their outer
class. This tutorial explores the inner keyword in depth with
practical examples.

## Basic Definitions

In Kotlin, a nested class is by default static, meaning it cannot access members
of the outer class. The inner keyword creates a non-static nested
class that maintains a reference to an outer class instance. This allows access
to outer class members.

## Basic Inner Class Example

This example demonstrates the simplest use of an inner class. The inner class can
access properties and methods of its outer class.

BasicInner.kt
  

package com.zetcode

class Outer {
    private val outerProperty = "Outer property"
    
    inner class Inner {
        fun printOuterProperty() {
            println(outerProperty) // Can access outer class members
        }
    }
}

fun main() {
    val outer = Outer()
    val inner = outer.Inner()
    inner.printOuterProperty() // Output: Outer property
}

Here, the Inner class is marked with the inner keyword, allowing it
to access the private outerProperty of the Outer class. Without
inner, this access would not be possible.

## Inner Class vs Nested Class

This example compares an inner class with a regular nested class to show their
key differences in behavior and access capabilities.

InnerVsNested.kt
  

package com.zetcode

class Outer {
    private val value = 10
    
    class Nested {
        fun getValue(): Int {
            // return value // Would cause compilation error
            return 0
        }
    }
    
    inner class Inner {
        fun getValue(): Int {
            return value // Can access outer class members
        }
    }
}

fun main() {
    val nested = Outer.Nested()
    println(nested.getValue()) // Output: 0
    
    val outer = Outer()
    val inner = outer.Inner()
    println(inner.getValue()) // Output: 10
}

The Nested class cannot access the outer class's value property,
while the Inner class can. This demonstrates the fundamental difference between
regular nested classes and inner classes in Kotlin.

## Accessing Outer Class Instance

Inner classes can reference their outer class instance using the this@Outer
syntax. This is useful when there are naming conflicts between inner and outer
class members.

OuterInstance.kt
  

package com.zetcode

class Outer {
    private val name = "Outer"
    
    inner class Inner {
        private val name = "Inner"
        
        fun printNames() {
            println("Inner name: $name") // Inner's name
            println("Outer name: ${this@Outer.name}") // Outer's name
        }
    }
}

fun main() {
    val outer = Outer()
    val inner = outer.Inner()
    inner.printNames()
    // Output:
    // Inner name: Inner
    // Outer name: Outer
}

This example shows how to explicitly reference the outer class instance from
within an inner class when both classes have members with the same name. The
this@Outer syntax provides this capability.

## Multiple Inner Classes

A single outer class can contain multiple inner classes. Each inner class has
access to the outer class's members.

MultipleInner.kt
  

package com.zetcode

class Computer {
    private val brand = "ACME"
    
    inner class CPU {
        fun getBrand() = "CPU by $brand"
    }
    
    inner class RAM {
        fun getBrand() = "RAM by $brand"
    }
}

fun main() {
    val computer = Computer()
    val cpu = computer.CPU()
    val ram = computer.RAM()
    
    println(cpu.getBrand()) // Output: CPU by ACME
    println(ram.getBrand()) // Output: RAM by ACME
}

The Computer class contains two inner classes: CPU and RAM. Both can access the
outer class's brand property. This demonstrates how inner classes
can share access to common outer class state.

## Inner Class Inheritance

Inner classes can participate in inheritance hierarchies. They can extend other
classes or be extended themselves.

InnerInheritance.kt
  

package com.zetcode

open class Animal {
    open fun sound() = "Generic animal sound"
}

class Zoo {
    private val zooName = "City Zoo"
    
    inner class Lion : Animal() {
        override fun sound() = "Roar from $zooName"
    }
}

fun main() {
    val zoo = Zoo()
    val lion = zoo.Lion()
    println(lion.sound()) // Output: Roar from City Zoo
}

The Lion inner class extends the Animal class while still maintaining access to
the Zoo outer class's zooName property. This shows how inner classes
can participate in inheritance while retaining their connection to the outer class.

## Inner Class with Interface Implementation

Inner classes can implement interfaces while maintaining access to their outer
class's members. This combines interface polymorphism with inner class capabilities.

InnerInterface.kt
  

package com.zetcode

interface Clickable {
    fun click()
}

class Button {
    private val label = "Submit"
    
    inner class SubmitButton : Clickable {
        override fun click() {
            println("$label button clicked")
        }
    }
}

fun main() {
    val button = Button()
    val submit: Clickable = button.SubmitButton()
    submit.click() // Output: Submit button clicked
}

The SubmitButton inner class implements the Clickable interface while accessing
the outer Button class's label property. This demonstrates how inner
classes can fulfill interface contracts while maintaining their connection to the
outer class.

## Limitations of Inner Classes

While inner classes are powerful, they have some limitations and considerations:

**Memory overhead:** Each inner class instance maintains a
reference to its outer class instance.
**Serialization complexity:** Serializing inner classes can be
more complex due to their implicit reference to the outer class.
**Static members:** Inner classes cannot declare static members
or companion objects.
**Initialization order:** Outer class must be initialized before
its inner classes.
**Anonymous inner classes:** Kotlin uses object expressions
instead of anonymous inner classes found in Java.

## Best Practices for Inner Classes

**Use judiciously:** Only use inner classes when you need access
to outer class members.
**Consider alternatives:** For simple cases, prefer regular
nested classes or top-level functions.
**Mind the reference:** Be aware of the implicit outer class
reference to prevent memory leaks.
**Clear naming:** Use clear names to distinguish between inner
and outer class members.
**Document relationships:** Clearly document the relationship
between inner and outer classes.

## Source

[Kotlin Nested and Inner Classes Documentation](https://kotlinlang.org/docs/nested-classes.html)

This tutorial covered Kotlin's inner keyword in depth, showing how
to create and use inner classes that can access their outer class's members. We
explored various scenarios including inheritance, interface implementation, and
multiple inner classes. Proper use of inner classes can help organize related
functionality while maintaining access to shared state.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).