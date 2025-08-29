+++
title = "Kotlin out Keyword"
date = 2025-08-29T20:02:47.338+01:00
draft = false
description = "Kotlin out keyword tutorial shows how to use declaration-site variance in Kotlin. Learn about covariance with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin out Keyword

last modified April 19, 2025

Kotlin's variance system provides powerful tools for working with generics. The
out keyword enables covariance in type parameters. This tutorial
explores the out keyword in depth with practical examples.

## Basic Definitions

The out keyword in Kotlin marks a type parameter as covariant. It
means the generic class is a producer of the type parameter. Covariant types can
be used in less specific contexts than originally declared.

## Simple Covariant Class

A basic covariant class uses the out modifier on its type parameter.
This allows assigning instances with more specific type arguments to references
with less specific types.

SimpleCovariance.kt
  

package com.zetcode

class Box&lt;out T&gt;(val value: T)

fun main() {
    val stringBox = Box("Hello")
    val anyBox: Box&lt;Any&gt; = stringBox
    
    println(anyBox.value) // Output: Hello
}

Here we declare a covariant Box class with out T. We can assign a
Box&lt;String&gt; to a Box&lt;Any&gt; reference because String is a subtype of
Any. The out keyword makes this assignment possible.

## Covariant List Interface

Kotlin's List interface is covariant by design. It only produces elements (via
get operations) and never consumes them (no add operations). This makes it safe
for covariance.

ListCovariance.kt
  

package com.zetcode

fun printList(list: List&lt;Any&gt;) {
    list.forEach { println(it) }
}

fun main() {
    val strings = listOf("A", "B", "C")
    printList(strings) // Works because List is covariant
}

The printList function accepts List&lt;Any&gt; but we pass List&lt;String&gt;.
This works because List in Kotlin is declared as interface List&lt;out E&gt;.
The out modifier enables this safe upcasting.

## Covariant Custom Interface

You can create your own covariant interfaces. The out modifier
ensures the type parameter is only used in output positions (return types).

CustomInterface.kt
  

package com.zetcode

interface Producer&lt;out T&gt; {
    fun produce(): T
}

class StringProducer : Producer&lt;String&gt; {
    override fun produce() = "Hello"
}

fun main() {
    val producer: Producer&lt;Any&gt; = StringProducer()
    println(producer.produce()) // Output: Hello
}

The Producer interface is covariant in T. We can assign a StringProducer to a
Producer&lt;Any&gt; reference. The out modifier ensures T is only
used as a return type, making the assignment type-safe.

## Covariant Class with Multiple Type Parameters

A class can have multiple type parameters with different variance annotations.
Only some parameters might be covariant while others remain invariant.

MultipleParams.kt
  

package com.zetcode

class Response&lt;out T, E&gt;(val data: T, val error: E?)

fun main() {
    val stringResponse = Response("Success", null)
    val anyResponse: Response&lt;Any, Nothing&gt; = stringResponse
    
    println(anyResponse.data) // Output: Success
}

The Response class has one covariant parameter (T) and one invariant parameter
(E). We can assign Response&lt;String, Nothing&gt; to Response&lt;Any, Nothing&gt;
because of the out modifier on T. The E parameter remains invariant.

## Covariant Function Parameters

Function parameters can also use covariant types. This allows more flexibility
when passing arguments to functions.

FunctionParams.kt
  

package com.zetcode

fun processItems(items: List&lt;out Number&gt;) {
    items.forEach { println(it.toDouble()) }
}

fun main() {
    val ints = listOf(1, 2, 3)
    val doubles = listOf(1.1, 2.2, 3.3)
    
    processItems(ints)
    processItems(doubles)
}

The processItems function accepts List&lt;out Number&gt;, meaning it can take
lists of any Number subtype. We pass both List&lt;Int&gt; and List&lt;Double&gt;.
The out projection makes this possible.

## Covariant Arrays

Arrays in Kotlin are invariant by default, but we can use array projections with
out to achieve covariance when needed.

ArrayCovariance.kt
  

package com.zetcode

fun printArray(array: Array&lt;out Any&gt;) {
    array.forEach { println(it) }
}

fun main() {
    val strings = arrayOf("A", "B", "C")
    printArray(strings) // Works due to out projection
}

Although Array&lt;T&gt; is invariant, we can use out projection to
treat it covariantly in the printArray function. This allows passing Array&lt;String&gt;
where Array&lt;out Any&gt; is expected.

## Covariant Return Types

The out modifier can be used to enable covariant return types in
class hierarchies. This allows more specific return types in subclasses.

ReturnTypes.kt
  

package com.zetcode

open class Animal
class Dog : Animal()

interface AnimalShelter&lt;out T : Animal&gt; {
    fun adopt(): T
}

class DogShelter : AnimalShelter&lt;Dog&gt; {
    override fun adopt() = Dog()
}

fun main() {
    val shelter: AnimalShelter&lt;Animal&gt; = DogShelter()
    val animal = shelter.adopt()
    println(animal::class.simpleName) // Output: Dog
}

The AnimalShelter interface is covariant in T. This allows DogShelter to be used
as AnimalShelter&lt;Animal&gt;. The out modifier ensures type safety
by restricting T to output positions only.

## Best Practices for Using out

**Use for producers:** Apply out when the type
parameter is only produced (returned) by the class.
**Avoid input positions:** Don't use covariant types as
parameter types in methods.
**Prefer immutable:** Covariance works best with immutable
collections and data structures.
**Consider interfaces:** Often better to make interfaces
covariant rather than concrete classes.
**Document usage:** Clearly document when and why covariance
is used in your APIs.

## Source

[Kotlin Generics Documentation](https://kotlinlang.org/docs/generics.html#variance)

This tutorial covered Kotlin's out keyword in depth, showing how it
enables covariance in generic types. We explored various scenarios including
interfaces, classes, function parameters, and arrays. Proper use of variance
annotations can make your APIs more flexible while maintaining type safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).