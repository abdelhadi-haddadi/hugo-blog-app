+++
title = "Kotlin operator Keyword"
date = 2025-08-29T20:02:46.123+01:00
draft = false
description = "Kotlin operator keyword tutorial shows how to perform operator overloading in Kotlin. Learn how to define custom operators for your classes with practical examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin operator Keyword

last modified April 19, 2025

Kotlin's operator overloading allows you to define custom behavior for standard
operators. The operator keyword marks functions that overload
operators. This tutorial explores operator overloading in depth with examples.

## Basic Definitions

The operator keyword in Kotlin is used to declare functions that
overload operators. Each operator has a predefined function name that must be
used. Operator overloading makes code more readable and intuitive for domain-
specific operations.

## Overloading the Plus Operator

The plus operator function overloads the + operator.
You can define custom addition behavior for your classes. The function must be
marked with the operator keyword.

PlusOperator.kt
  

package com.zetcode

data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point {
        return Point(x + other.x, y + other.y)
    }
}

fun main() {

    val p1 = Point(1, 2)
    val p2 = Point(3, 4)
    val p3 = p1 + p2
    
    println(p3) // Output: Point(x=4, y=6)
}

Here we define a plus operator for the Point class. It adds the x
and y coordinates of two points. The + operator now works with Point
objects, making the code more intuitive.

## Overloading the Comparison Operators

Comparison operators like &lt; and &gt; can be
overloaded using the compareTo function. This function should return
a negative, zero, or positive integer.

ComparisonOperator.kt
  

package com.zetcode

data class Person(val name: String, val age: Int) {
    operator fun compareTo(other: Person): Int {
        return age.compareTo(other.age)
    }
}

fun main() {

    val alice = Person("Alice", 30)
    val bob = Person("Bob", 25)
    
    println(alice &gt; bob) // Output: true
    println(alice &lt; bob) // Output: false
}

The compareTo operator compares Person objects by age. This enables
using standard comparison operators with custom objects. The function returns the
result of comparing the ages.

## Overloading the Index Access Operator

The get and set operators overload the index access
operators []. This allows your class to behave like an array or
collection.

IndexOperator.kt
  

package com.zetcode

class StringCollection(private val strings: List) {
    operator fun get(index: Int): String {
        return strings[index]
    }
    
    operator fun set(index: Int, value: String) {
        // Strings are immutable in List, so this is just for demo
        println("Setting index $index to $value")
    }
}

fun main() {

    val collection = StringCollection(listOf("a", "b", "c"))
    println(collection[1]) // Output: b
    collection[1] = "x"   // Output: Setting index 1 to x
}

Here we define index access for a StringCollection class. The get
operator retrieves values, while set allows modification. Note that
the underlying List is immutable in this example.

## Overloading the Invoke Operator

The invoke operator allows an object to be called like a function.
This can make DSLs or builder patterns more concise and readable.

InvokeOperator.kt
  

package com.zetcode

class Greeter(private val greeting: String) {
    operator fun invoke(name: String) {
        println("$greeting, $name!")
    }
}

fun main() {

    val hello = Greeter("Hello")
    hello("John") // Output: Hello, John!
    
    val hi = Greeter("Hi")
    hi("Sarah")   // Output: Hi, Sarah!
}

The Greeter class defines an invoke operator that takes a name and
prints a greeting. This allows Greeter instances to be called like functions,
making the syntax more natural for this use case.

## Overloading Unary Operators

Unary operators like +, -, and ! can be
overloaded using specific function names. These operators work on a single
operand.

UnaryOperator.kt
  

package com.zetcode

data class Counter(var value: Int) {
    operator fun inc(): Counter {
        return Counter(value + 1)
    }
    
    operator fun dec(): Counter {
        return Counter(value - 1)
    }
    
    operator fun unaryMinus(): Counter {
        return Counter(-value)
    }
}

fun main() {

    var counter = Counter(5)
    println(++counter)  // Output: Counter(value=6)
    println(--counter)  // Output: Counter(value=5)
    println(-counter)   // Output: Counter(value=-5)
}

The Counter class overloads increment (inc), decrement
(dec), and unary minus (unaryMinus) operators. These
enable using ++, --, and - with Counter
objects.

## Overloading Compound Assignment Operators

Compound assignment operators like += can be overloaded using the
plusAssign function. These operators modify the left operand.

CompoundOperator.kt
  

package com.zetcode

class ShoppingCart {
    private val items = mutableListOf()
    
    operator fun plusAssign(item: String) {
        items.add(item)
    }
    
    fun showItems() {
        println("Cart contains: $items")
    }
}

fun main() {

    val cart = ShoppingCart()
    cart += "Apple"
    cart += "Banana"
    cart.showItems() // Output: Cart contains: [Apple, Banana]
}

The ShoppingCart class overloads the += operator using
plusAssign. This allows adding items to the cart with a concise
syntax. The operator modifies the cart's internal state.

## Overloading the Range Operator

The rangeTo operator overloads the .. operator to
create ranges. This is useful for creating domain-specific range expressions.

RangeOperator.kt
  

package com.zetcode

data class Date(val year: Int, val month: Int, val day: Int) {
    operator fun rangeTo(other: Date): List {
        val dates = mutableListOf()
        var current = this
        
        while (current &lt;= other) {
            dates.add(current)
            current = current.nextDay()
        }
        
        return dates
    }
    
    private fun nextDay(): Date {
        // Simplified implementation
        return if (day &lt; 28) copy(day = day + 1)
        else if (month &lt; 12) copy(month = month + 1, day = 1)
        else copy(year = year + 1, month = 1, day = 1)
    }
    
    operator fun compareTo(other: Date): Int {
        return when {
            year != other.year -&gt; year - other.year
            month != other.month -&gt; month - other.month
            else -&gt; day - other.day
        }
    }
}

fun main() {

    val start = Date(2023, 1, 1)
    val end = Date(2023, 1, 3)
    val range = start..end
    
    println(range) // Output: [Date(year=2023, month=1, day=1), ...]
}

This example shows how to create a date range using the .. operator.
The rangeTo operator generates all dates between two dates. The
compareTo operator is also needed for range comparisons.

## Best Practices for Operator Overloading

**Maintain intuitive behavior:** Operators should behave in ways
that users would expect from similar built-in types.
**Don't overload excessively:** Only overload operators when it
makes the code more readable and the operation is fundamental to the type.
**Follow mathematical conventions:** For mathematical
operations, follow standard mathematical rules and properties.
**Document overloaded operators:** Clearly document the
behavior of overloaded operators in your class documentation.
**Consider performance:** Operator functions might be called
frequently, so ensure they're efficient.

## Source

[Kotlin Operator Overloading Documentation](https://kotlinlang.org/docs/operator-overloading.html)

This tutorial covered Kotlin's operator keyword in depth, showing
how to overload various operators for custom types. We explored arithmetic,
comparison, indexing, and other operator types. Proper use of operator
overloading can make domain-specific code more expressive and readable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).