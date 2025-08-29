+++
title = "Kotlin private Keyword"
date = 2025-08-29T20:02:48.472+01:00
draft = false
description = "Kotlin private keyword tutorial shows how to use private access modifier in Kotlin. Learn about class members, properties, and functions visibility with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin private Keyword

last modified April 19, 2025

Kotlin's access modifiers control the visibility of classes, objects, and
members. The private keyword is the most restrictive modifier.
This tutorial explores the private keyword in depth with practical
examples.

## Basic Definitions

The private keyword in Kotlin restricts visibility to the declaring
scope. A private member is only accessible within the same class or file. This
promotes encapsulation by hiding implementation details.

## Private Properties

Private properties can only be accessed within their declaring class. This
prevents external code from directly modifying internal state.

PrivateProperty.kt
  

package com.zetcode

class BankAccount {
    private var balance: Double = 0.0
    
    fun deposit(amount: Double) {
        if (amount &gt; 0) {
            balance += amount
        }
    }
    
    fun getBalance(): Double = balance
}

fun main() {
    val account = BankAccount()
    account.deposit(100.0)
    println(account.getBalance()) // Output: 100.0
    
    // account.balance = 500.0 // Error: Cannot access 'balance'
}

Here, balance is private and can only be modified through the
deposit method. Direct access from outside the class is prevented,
ensuring controlled modifications to the balance.

## Private Functions

Private functions are helper methods only accessible within their declaring
class. They help break down complex operations into smaller steps.

PrivateFunction.kt
  

package com.zetcode

class Calculator {
    fun add(a: Int, b: Int): Int {
        validateInput(a, b)
        return a + b
    }
    
    private fun validateInput(a: Int, b: Int) {
        require(a &gt;= 0 &amp;&amp; b &gt;= 0) { 
            "Inputs must be non-negative" 
        }
    }
}

fun main() {
    val calc = Calculator()
    println(calc.add(5, 3)) // Output: 8
    
    // calc.validateInput(2, 2) // Error: Cannot access 'validateInput'
}

The validateInput function is private and used internally by the
add method. External code cannot call this validation function
directly, keeping the validation logic encapsulated.

## Private Constructors

A private constructor prevents direct instantiation of a class. This is useful
for singleton patterns or factory methods.

PrivateConstructor.kt
  

package com.zetcode

class Database private constructor() {
    companion object {
        private var instance: Database? = null
        
        fun getInstance(): Database {
            if (instance == null) {
                instance = Database()
            }
            return instance!!
        }
    }
    
    fun query(sql: String) = println("Executing: $sql")
}

fun main() {
    val db = Database.getInstance()
    db.query("SELECT * FROM users")
    
    // val db2 = Database() // Error: Cannot access ''
}

The private constructor forces clients to use getInstance to get
a Database object. This ensures only one instance exists (singleton pattern).
The instance variable is also private to prevent external modification.

## Private in Top-Level Declarations

When used in top-level declarations (outside any class), private restricts
visibility to the current file. This is useful for file-specific utilities.

TopLevelPrivate.kt
  

package com.zetcode

private const val MAX_RETRIES = 3

private fun logError(message: String) {
    println("ERROR: $message")
}

class NetworkClient {
    fun fetchData() {
        var attempts = 0
        while (attempts &lt; MAX_RETRIES) {
            try {
                // Network operation
                return
            } catch (e: Exception) {
                logError(e.message ?: "Unknown error")
                attempts++
            }
        }
    }
}

// In another file:
// fun test() {
//     println(MAX_RETRIES) // Error: Cannot access 'MAX_RETRIES'
//     logError("Test") // Error: Cannot access 'logError'
// }

Both MAX_RETRIES constant and logError function are
private to this file. They can be used within the file but are inaccessible from
other files, even in the same package.

## Private Setters

Properties can have private setters while keeping the getter public. This allows
read-only access to external code while permitting internal modifications.

PrivateSetter.kt
  

package com.zetcode

class User(name: String) {
    var name: String = name
        private set
    
    fun changeName(newName: String) {
        if (newName.isNotBlank()) {
            name = newName
        }
    }
}

fun main() {
    val user = User("Alice")
    println(user.name) // Output: Alice
    
    user.changeName("Bob")
    println(user.name) // Output: Bob
    
    // user.name = "Charlie" // Error: Cannot assign to 'name'
}

The name property has a public getter but private setter. External
code can read the name but only modify it through the changeName
method, which can enforce validation rules.

## Private in Nested Classes

Private members in nested classes behave similarly to regular classes, with
visibility limited to the nested class scope.

NestedClassPrivate.kt
  

package com.zetcode

class Outer {
    private val outerSecret = "Outer secret"
    
    inner class Inner {
        private val innerSecret = "Inner secret"
        
        fun revealSecrets() {
            println(outerSecret) // Can access outer's private members
            println(innerSecret)
        }
    }
    
    fun testInner() {
        val inner = Inner()
        inner.revealSecrets()
        // println(inner.innerSecret) // Error: Cannot access 'innerSecret'
    }
}

fun main() {
    val outer = Outer()
    outer.testInner()
    
    // println(outer.outerSecret) // Error: Cannot access 'outerSecret'
}

The inner class can access its outer class's private members, but private
members of the inner class are not accessible to the outer class. Both classes'
private members are inaccessible from outside the Outer class.

## Private in Interfaces

Kotlin interfaces can have private functions starting from Kotlin 1.4. These
functions are only accessible within the interface and its implementations.

InterfacePrivate.kt
  

package com.zetcode

interface Logger {
    fun log(message: String)
    
    private fun formatMessage(message: String): String {
        return "[${System.currentTimeMillis()}] $message"
    }
    
    fun logWithTimestamp(message: String) {
        log(formatMessage(message))
    }
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println(message)
    }
}

fun main() {
    val logger = ConsoleLogger()
    logger.logWithTimestamp("Hello, Kotlin!")
    
    // logger.formatMessage("Test") // Error: Cannot access 'formatMessage'
}

The formatMessage function is private to the Logger interface. It
can be used by other interface members like logWithTimestamp but
isn't accessible to implementing classes or external code.

## Best Practices for private Keyword

**Default to private:** Make members private by default and only
expose what's necessary.
**Encapsulate state:** Use private properties with controlled
access methods to maintain object integrity.
**Hide implementation:** Keep helper methods private to simplify
your public API.
**Consider visibility:** Choose the most restrictive visibility
that still allows necessary access.
**Document public API:** Focus documentation on public members
since private ones are implementation details.

## Source

[Kotlin Visibility Modifiers Documentation](https://kotlinlang.org/docs/visibility-modifiers.html)

This tutorial covered Kotlin's private keyword in depth, showing
various applications including properties, functions, constructors, and nested
classes. Proper use of private visibility promotes encapsulation and creates more
maintainable code by hiding implementation details.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).