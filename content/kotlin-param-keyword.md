+++
title = "Kotlin param Keyword"
date = 2025-08-29T20:02:48.476+01:00
draft = false
description = "Kotlin param keyword tutorial shows how to work with function parameters in Kotlin. Learn about named parameters, default parameters, and parameter conventions with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin param Keyword

last modified April 19, 2025

Kotlin's function parameters provide flexible ways to define and call functions.
The param keyword in KDoc documents function parameters. This tutorial
explores parameter usage in Kotlin with practical examples.

## Basic Definitions

In Kotlin, function parameters are defined in parentheses after the function
name. The param keyword is used in KDoc comments to document
parameters. Kotlin supports named parameters, default values, and varargs.

## Basic Function Parameters

Function parameters in Kotlin are defined with name first, then type. Parameters
are separated by commas. Here's a simple function with two parameters.

BasicParams.kt
  

package com.zetcode

/**
 * Calculates the sum of two numbers
 * @param a the first number
 * @param b the second number
 * @return the sum of a and b
 */
fun sum(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    val result = sum(5, 7)
    println(result) // Output: 12
}

This example shows a basic function with two Int parameters. The KDoc comment
uses @param to document each parameter. The function returns the
sum of the two numbers.

## Named Parameters

Kotlin allows calling functions with named parameters. This makes code more
readable and allows changing parameter order. Named parameters are specified
as name = value.

NamedParams.kt
  

package com.zetcode

/**
 * Creates a greeting message
 * @param name the person's name
 * @param greeting the greeting phrase
 * @return the complete greeting
 */
fun createGreeting(name: String, greeting: String): String {
    return "$greeting, $name!"
}

fun main() {
    val msg = createGreeting(
        name = "Alice", 
        greeting = "Hello"
    )
    println(msg) // Output: Hello, Alice!
}

Here we call the function with named parameters. The order doesn't matter when
using names. This is especially useful for functions with many parameters.

## Default Parameters

Kotlin supports default parameter values. If a parameter is omitted, its default
value is used. Default values are specified with = value after the
type.

DefaultParams.kt
  

package com.zetcode

/**
 * Formats a product description
 * @param name the product name
 * @param price the product price
 * @param currency the currency symbol (default "$")
 * @return formatted description
 */
fun formatProduct(
    name: String, 
    price: Double, 
    currency: String = "$"
): String {
    return "$name: $currency$price"
}

fun main() {
    val desc1 = formatProduct("Laptop", 999.99)
    val desc2 = formatProduct("Phone", 699.99, "€")
    
    println(desc1) // Output: Laptop: $999.99
    println(desc2) // Output: Phone: €699.99
}

The currency parameter has a default value of "$". We can omit it
or provide a different value. Default parameters reduce the need for overloaded
functions.

## Vararg Parameters

Kotlin supports variable number of arguments (varargs) with the vararg
keyword. Inside the function, varargs are treated as an array of the specified
type.

VarargParams.kt
  

package com.zetcode

/**
 * Calculates the average of numbers
 * @param numbers the numbers to average (vararg)
 * @return the average as Double
 */
fun average(vararg numbers: Int): Double {
    return numbers.average()
}

fun main() {
    val avg1 = average(1, 2, 3, 4, 5)
    val avg2 = average(10, 20, 30)
    
    println(avg1) // Output: 3.0
    println(avg2) // Output: 20.0
}

The numbers parameter is marked as vararg, allowing
any number of Int arguments. The function calculates and returns the average.
Varargs must be the last parameter in the list.

## Parameter Documentation with @param

KDoc uses the @param tag to document function parameters. Each
parameter should have a description explaining its purpose and requirements.

ParamDoc.kt
  

package com.zetcode

/**
 * Validates user credentials
 * @param username the user's username (must be 4-20 chars)
 * @param password the user's password (must be 8+ chars)
 * @param allowSpecialChars if special chars are allowed in password
 * @return true if credentials are valid, false otherwise
 */
fun validateCredentials(
    username: String,
    password: String,
    allowSpecialChars: Boolean = true
): Boolean {
    // Validation logic here
    return username.length in 4..20 &amp;&amp; 
           password.length &gt;= 8 &amp;&amp;
           (allowSpecialChars || password.all { it.isLetterOrDigit() })
}

fun main() {
    val isValid = validateCredentials(
        username = "user123",
        password = "securePass123"
    )
    println(isValid) // Output: true
}

This example shows thorough parameter documentation with @param. Each
parameter's constraints are clearly specified. Good documentation helps other
developers use your functions correctly.

## Destructuring in Parameters

Kotlin allows destructuring declarations in parameters. This lets you unpack
data classes directly in the parameter list.

DestructParams.kt
  

package com.zetcode

data class User(val name: String, val age: Int, val email: String)

/**
 * Sends a welcome email to a user
 * @param user the user data to welcome
 * @param name the user's name (destructured)
 * @param email the user's email (destructured)
 */
fun sendWelcomeEmail(user: User, (name, _, email): User) {
    println("Sending welcome email to $name at $email")
}

fun main() {
    val user = User("Bob", 30, "bob@example.com")
    sendWelcomeEmail(user) // Output: Sending welcome email to Bob at bob@example.com
}

Here we destructure the User object in the parameter list. The underscore skips
the age field. Destructuring makes it easy to work with specific properties of
complex parameters.

## Function Type Parameters

Kotlin functions can accept other functions as parameters. These higher-order
functions are powerful for creating flexible APIs.

FunctionParams.kt
  

package com.zetcode

/**
 * Applies a transformation to a string
 * @param input the string to transform
 * @param transform the transformation function
 * @return the transformed string
 */
fun transformString(
    input: String,
    transform: (String) -&gt; String
): String {
    return transform(input)
}

fun main() {
    val result = transformString("hello") { it.uppercase() }
    println(result) // Output: HELLO
    
    val reversed = transformString("world") { it.reversed() }
    println(reversed) // Output: dlrow
}

The transform parameter is a function that takes a String and
returns a String. We pass different lambda expressions to modify the input
string in various ways.

## Best Practices for Parameters

**Use descriptive names:** Choose clear, meaningful parameter
names that indicate purpose.
**Document thoroughly:** Use @param in KDoc to
explain each parameter's role and constraints.
**Limit parameter count:** Functions with many parameters can
be hard to use - consider refactoring.
**Use default values:** Default parameters reduce the need for
overloaded functions.
**Consider named parameters:** Named arguments make function
calls more readable, especially with many parameters.

## Source

[Kotlin Functions Documentation](https://kotlinlang.org/docs/functions.html)

This tutorial covered Kotlin function parameters in depth, including basic usage,
named parameters, default values, and varargs. We also explored parameter
documentation with @param and advanced features like destructuring.
Effective use of parameters makes your Kotlin code more flexible and readable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).