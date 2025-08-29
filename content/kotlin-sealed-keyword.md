+++
title = "Kotlin Sealed Keyword"
date = 2025-08-29T20:02:52.957+01:00
draft = false
description = "Kotlin sealed keyword tutorial shows how to create restricted class hierarchies. Learn about sealed classes and interfaces with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin Sealed Keyword

last modified April 19, 2025

Kotlin's sealed keyword creates restricted class hierarchies where all subclasses
must be declared in the same file. This enables exhaustive when expressions and
better control over inheritance. This tutorial explores sealed classes and
interfaces with practical examples.

## Basic Definitions

A sealed class is abstract by default and cannot be instantiated directly. All
subclasses must be declared in the same file. Sealed interfaces work similarly
but allow implementation in different files. The compiler knows all possible
subtypes.

## Basic Sealed Class

The simplest sealed class defines a restricted hierarchy where all subclasses are
known at compile time. This is useful for representing fixed sets of related
types.

BasicSealed.kt
  

package com.zetcode

sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -&gt; println("Success: ${result.data}")
        is Result.Error -&gt; println("Error: ${result.message}")
        Result.Loading -&gt; println("Loading...")
    }
}

fun main() {
    val success = Result.Success("Data loaded")
    handleResult(success) // Output: Success: Data loaded
}

Here we define a sealed class Result with three possible states. The when
expression is exhaustive because all possible subclasses are known. This ensures
we handle all cases without needing an else branch.

## Sealed Class with Properties

Sealed classes can have properties that are inherited by all subclasses. This
allows sharing common data while maintaining type safety through the hierarchy.

SealedWithProperties.kt
  

package com.zetcode

sealed class Vehicle(val wheels: Int) {
    class Car : Vehicle(4)
    class Bike : Vehicle(2)
    class Truck : Vehicle(18)
}

fun describeVehicle(vehicle: Vehicle) {
    println("This vehicle has ${vehicle.wheels} wheels")
}

fun main() {
    val car = Vehicle.Car()
    describeVehicle(car) // Output: This vehicle has 4 wheels
}

The Vehicle sealed class defines a common wheels property. All subclasses
inherit this property. The describeVehicle function can access wheels safely
knowing all Vehicle types have this property.

## Sealed Interface

Kotlin 1.5 introduced sealed interfaces which work similarly to sealed classes
but allow implementation in different files. This provides more flexibility.

SealedInterface.kt
  

package com.zetcode

sealed interface PaymentMethod {
    val accountId: String
}

data class CreditCard(override val accountId: String, val cardNumber: String) : PaymentMethod
data class BankTransfer(override val accountId: String, val bankCode: String) : PaymentMethod

fun processPayment(method: PaymentMethod) {
    println("Processing payment for account ${method.accountId}")
    when (method) {
        is CreditCard -&gt; println("Using card ${method.cardNumber}")
        is BankTransfer -&gt; println("Using bank code ${method.bankCode}")
    }
}

fun main() {
    val payment = CreditCard("acc123", "4111111111111111")
    processPayment(payment)
}

The PaymentMethod sealed interface defines a common property. Implementations can
be in different files. The when expression remains exhaustive as the compiler
knows all implementations. This combines flexibility with type safety.

## Nested Sealed Classes

Sealed classes can be nested within other classes or interfaces. This helps
organize complex hierarchies while maintaining the sealed class benefits.

NestedSealed.kt
  

package com.zetcode

class ApiClient {
    sealed class Response {
        data class Success(val data: String) : Response()
        data class Error(val code: Int) : Response()
    }

    fun getResponse(): Response {
        return Response.Success("API data")
    }
}

fun main() {
    val client = ApiClient()
    val response = client.getResponse()
    
    when (response) {
        is ApiClient.Response.Success -&gt; println(response.data)
        is ApiClient.Response.Error -&gt; println("Error ${response.code}")
    }
}

The Response sealed class is nested inside ApiClient. This keeps related types
together while maintaining the sealed class benefits. The when expression can
still be exhaustive as all subclasses are known.

## Sealed Class with Functions

Sealed classes can define functions that subclasses can override. This allows
polymorphic behavior while maintaining the restricted hierarchy.

SealedWithFunctions.kt
  

package com.zetcode

sealed class Shape {
    abstract fun area(): Double
    
    class Circle(val radius: Double) : Shape() {
        override fun area() = Math.PI * radius * radius
    }
    
    class Square(val side: Double) : Shape() {
        override fun area() = side * side
    }
}

fun printArea(shape: Shape) {
    println("Area: ${shape.area()}")
}

fun main() {
    val circle = Shape.Circle(5.0)
    printArea(circle) // Output: Area: 78.53981633974483
}

The Shape sealed class defines an abstract area function. Each subclass provides
its own implementation. The printArea function can call area() on any Shape
knowing all subclasses implement it. This combines polymorphism with type safety.

## Exhaustive When Expressions

One major benefit of sealed classes is enabling exhaustive when expressions. The
compiler ensures all cases are handled without needing an else branch.

ExhaustiveWhen.kt
  

package com.zetcode

sealed class NetworkState {
    object Connected : NetworkState()
    object Disconnected : NetworkState()
    data class Error(val message: String) : NetworkState()
}

fun handleNetwork(state: NetworkState) {
    when (state) {
        NetworkState.Connected -&gt; println("Connected")
        NetworkState.Disconnected -&gt; println("Disconnected")
        is NetworkState.Error -&gt; println("Error: ${state.message}")
    }
}

fun main() {
    val state = NetworkState.Connected
    handleNetwork(state) // Output: Connected
}

The when expression doesn't need an else branch because all possible NetworkState
subclasses are handled. If we add a new subclass later, the compiler will flag
unhandled cases. This makes code more maintainable and safer.

## Sealed Class with Companion Object

Sealed classes can have companion objects with factory methods. This provides a
clean way to create instances while maintaining the sealed hierarchy.

SealedCompanion.kt
  

package com.zetcode

sealed class UserResult {
    data class Success(val user: String) : UserResult()
    data class Failure(val reason: String) : UserResult()
    
    companion object {
        fun success(user: String) = Success(user)
        fun failure(reason: String) = Failure(reason)
    }
}

fun main() {
    val result = UserResult.success("john_doe")
    
    when (result) {
        is UserResult.Success -&gt; println("User: ${result.user}")
        is UserResult.Failure -&gt; println("Failed: ${result.reason}")
    }
}

The UserResult sealed class provides factory methods in its companion object.
This encapsulates the creation of subclasses while maintaining the sealed
hierarchy benefits. The when expression remains exhaustive as all subclasses are
known.

## Best Practices for Sealed Classes

**Use for restricted hierarchies:** When you need a fixed set of
related types that won't change often.
**Leverage exhaustive when:** Take advantage of compiler checks
for handling all cases.
**Keep subclasses in same file:** For sealed classes (not
required for sealed interfaces).
**Prefer data classes/objects:** For leaf nodes in the hierarchy
to get useful implementations.
**Combine with polymorphism:** Use abstract functions in sealed
classes for polymorphic behavior.

## Source

[Kotlin Sealed Classes Documentation](https://kotlinlang.org/docs/sealed-classes.html)

This tutorial covered Kotlin's sealed keyword in depth, showing how to create
restricted class hierarchies. We explored sealed classes, sealed interfaces, and
their benefits like exhaustive when expressions. Proper use of sealed types can
make your code more type-safe and maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).