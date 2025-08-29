+++
title = "Kotlin lateinit Keyword"
date = 2025-08-29T20:02:41.700+01:00
draft = false
description = "Kotlin lateinit keyword tutorial shows how to use delayed initialization in Kotlin. Learn about lateinit properties, constraints, and usage patterns with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin lateinit Keyword

last modified April 19, 2025

Kotlin's null safety system requires properties to be initialized. The
lateinit keyword allows delaying initialization while keeping
non-null types. This tutorial explores lateinit in depth with
practical examples.

## Basic Definitions

The lateinit modifier marks a property for delayed initialization.
It must be declared as var (not val) and cannot be
nullable or primitive. The property must be initialized before first access.

## Basic lateinit Usage

The simplest use case for lateinit is when initialization happens
after object creation but before usage. This is common in dependency injection
or test setups.

BasicLateinit.kt
  

package com.zetcode

class UserService {
    lateinit var username: String
    
    fun initialize(name: String) {
        username = name
    }
    
    fun greet() {
        println("Hello, $username")
    }
}

fun main() {
    val service = UserService()
    service.initialize("JohnDoe")
    service.greet() // Output: Hello, JohnDoe
}

Here username is marked with lateinit and initialized
later via initialize. The property remains non-null while allowing
flexible initialization timing. Access before initialization would throw an
exception.

## lateinit in Dependency Injection

lateinit is commonly used with dependency injection frameworks
where properties are set after construction. This avoids nullable types while
maintaining DI benefits.

DILateinit.kt
  

package com.zetcode

class OrderProcessor {
    lateinit var paymentGateway: PaymentGateway
    
    fun processOrder(amount: Double) {
        paymentGateway.charge(amount)
    }
}

interface PaymentGateway {
    fun charge(amount: Double)
}

class MockPaymentGateway : PaymentGateway {
    override fun charge(amount: Double) {
        println("Charged $$amount (mock)")
    }
}

fun main() {
    val processor = OrderProcessor()
    processor.paymentGateway = MockPaymentGateway()
    processor.processOrder(99.99) // Output: Charged $99.99 (mock)
}

The paymentGateway is initialized after construction but before use.
This pattern is common in Spring or other DI frameworks where wiring happens
after object creation.

## lateinit in Android Activities

Android development frequently uses lateinit for views bound in
onCreate. This avoids null checks while ensuring views exist when
used.

AndroidLateinit.kt
  

package com.zetcode

// Simulating Android Activity
class MainActivity {
    lateinit var submitButton: Button
    
    fun onCreate() {
        submitButton = Button("Submit") // Typically from findViewById()
    }
    
    fun setupButton() {
        submitButton.setOnClickListener {
            println("Button clicked!")
        }
    }
}

class Button(val text: String) {
    fun setOnClickListener(action: () -&gt; Unit) {
        // Implementation would attach click handler
    }
}

fun main() {
    val activity = MainActivity()
    activity.onCreate()
    activity.setupButton()
}

This simulates Android's view binding pattern. The button is initialized in
onCreate and safely used later. Without lateinit,
we'd need nullable types or extra null checks.

## lateinit vs Lazy Initialization

lateinit differs from lazy initialization. While both
delay initialization, lateinit is mutable and manual, whereas
lazy is immutable and automatic.

LateinitVsLazy.kt
  

package com.zetcode

class Configuration {
    lateinit var apiKey: String
    val dbUrl by lazy { "jdbc:mysql://localhost/mydb" }
    
    fun initialize(key: String) {
        apiKey = key
    }
}

fun main() {
    val config = Configuration()
    config.initialize("secret123")
    
    println(config.apiKey) // Output: secret123
    println(config.dbUrl)  // Output: jdbc:mysql://localhost/mydb
}

apiKey must be manually initialized before use, while dbUrl
initializes automatically on first access. Choose lateinit for
mutable properties you'll initialize yourself.

## Checking lateinit Initialization

Kotlin provides ::property.isInitialized to check if a
lateinit property was initialized. This is useful for validation.

CheckInitialization.kt
  

package com.zetcode

class DataProcessor {
    lateinit var dataSource: String
    
    fun process() {
        if (::dataSource.isInitialized) {
            println("Processing data from $dataSource")
        } else {
            println("DataSource not initialized")
        }
    }
}

fun main() {
    val processor = DataProcessor()
    processor.process() // Output: DataSource not initialized
    
    processor.dataSource = "database"
    processor.process() // Output: Processing data from database
}

The isInitialized check prevents UninitializedPropertyAccessException.
This is safer than assuming initialization, especially in complex flows where
initialization might be conditional.

## lateinit Constraints and Limitations

lateinit has several constraints. It only works with var,
can't be nullable, and can't be used with primitive types. Understanding these
limits prevents misuse.

LateinitConstraints.kt
  

package com.zetcode

class Example {
    lateinit var name: String    // Valid
    // lateinit val constant: String  // Error: must be var
    // lateinit var age: Int     // Error: primitive type
    // lateinit var maybe: String? // Error: nullable type
}

fun main() {
    val example = Example()
    example.name = "Valid"
    println(example.name)
}

The commented lines show invalid lateinit declarations. These
constraints exist because lateinit relies on runtime checks rather
than compile-time null safety. Primitive types can't be null so can't use
lateinit.

## lateinit in Unit Testing

Unit tests often use lateinit for test subjects and mocks that are
initialized in setup methods. This keeps test code clean and focused.

TestLateinit.kt
  

package com.zetcode

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.verify

interface Logger {
    fun log(message: String)
}

class Service(private val logger: Logger) {
    fun doWork() {
        logger.log("Working...")
    }
}

class ServiceTest {
    lateinit var service: Service
    lateinit var mockLogger: Logger
    
    @BeforeEach
    fun setUp() {
        mockLogger = mock(Logger::class.java)
        service = Service(mockLogger)
    }
    
    @Test
    fun `doWork logs message`() {
        service.doWork()
        verify(mockLogger).log("Working...")
    }
}

This test class uses lateinit for the service and mock logger,
initializing them in setUp. This pattern is common in JUnit tests,
keeping test methods clean while avoiding nullable types.

## Best Practices for lateinit

**Document initialization:** Clearly document where and when
lateinit properties should be initialized.
**Prefer constructor injection:** When possible, use constructor
parameters instead of lateinit for required dependencies.
**Check initialization:** Use isInitialized when
uncertain about initialization state.
**Limit scope:** Avoid lateinit in public APIs
where initialization control is unclear.
**Consider alternatives:** Evaluate if lazy or
nullable types might be better solutions for your use case.

## Source

[Kotlin lateinit Documentation](https://kotlinlang.org/docs/properties.html#late-initialized-properties-and-variables)

This tutorial covered Kotlin's lateinit keyword in depth, showing
its usage patterns and constraints. We explored practical examples in dependency
injection, Android development, testing, and more. Proper use of
lateinit can improve code readability while maintaining Kotlin's
null safety guarantees.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).