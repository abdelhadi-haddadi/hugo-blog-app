+++
title = "Kotlin fun Keyword"
date = 2025-08-29T20:02:35.038+01:00
draft = false
description = "Kotlin fun keyword tutorial shows how to define and use functions in Kotlin. Learn about function syntax, parameters, return types, and advanced function concepts with examples."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin fun Keyword

last modified April 19, 2025

The fun keyword is fundamental in Kotlin for defining functions.
Functions are reusable blocks of code that perform specific tasks. This tutorial
explores the fun keyword in depth with practical examples.

## Basic Definitions

In Kotlin, the fun keyword declares a function. Functions can have
parameters and return values. They encapsulate behavior and promote code reuse.
Kotlin functions support many advanced features like default parameters.

## Basic Function Declaration

The simplest function declaration uses the fun keyword followed by
the function name, parentheses, and a body. Functions can return values or
perform actions without returning anything.

BasicFunction.kt
  

package com.zetcode

fun greet() {
    println("Hello, Kotlin!")
}

fun main() {
    greet() // Output: Hello, Kotlin!
}

Here we define a simple greet function that prints a message. The
main function calls it. Note the fun keyword precedes
both function declarations. This is the most basic function form in Kotlin.

## Function with Parameters

Functions can accept parameters to make them more flexible. Parameters are
declared inside parentheses after the function name. Each parameter has a name
and type separated by a colon.

FunctionWithParams.kt
  

package com.zetcode

fun greetPerson(name: String) {
    println("Hello, $name!")
}

fun main() {
    greetPerson("Alice") // Output: Hello, Alice!
    greetPerson("Bob")   // Output: Hello, Bob!
}

The greetPerson function takes a String parameter
called name. We can call this function with different names. The
function uses string templates to include the parameter in the output.

## Function with Return Value

Functions can return values using the return type declaration. The return type is
specified after the parameter list, separated by a colon. Use the
return keyword to send back a value.

FunctionWithReturn.kt
  

package com.zetcode

fun add(a: Int, b: Int): Int {
    return a + b
}

fun main() {
    val result = add(5, 3)
    println(result) // Output: 8
}

This add function takes two Int parameters and returns their sum.
The return type Int is declared after the parameters. The
main function calls add and stores the result.

## Single-Expression Functions

For simple functions that consist of a single expression, Kotlin offers a
concise syntax. The return type can be inferred, and curly braces are replaced
with an equals sign.

SingleExpression.kt
  

package com.zetcode

fun multiply(a: Int, b: Int) = a * b

fun main() {
    println(multiply(4, 5)) // Output: 20
}

The multiply function demonstrates single-expression syntax. The
return type is inferred as Int. This concise form is ideal for simple functions.
The function body follows the = sign without braces.

## Default Parameters

Kotlin functions can have default parameter values. These values are used when
the caller doesn't provide an argument. Default parameters make functions more
flexible while maintaining backward compatibility.

DefaultParams.kt
  

package com.zetcode

fun greet(name: String = "Guest") {
    println("Hello, $name!")
}

fun main() {
    greet()          // Output: Hello, Guest!
    greet("Alice")   // Output: Hello, Alice!
}

The greet function has a default value for its name
parameter. When called without arguments, it uses "Guest". When provided with a
name, it uses that instead. Default parameters reduce overloaded functions.

## Extension Functions

Kotlin allows adding functions to existing classes without inheritance. These
are called extension functions. They're declared by prefixing the class name to
the function name with a dot.

ExtensionFunction.kt
  

package com.zetcode

fun String.addExclamation() = "$this!"

fun main() {
    val message = "Hello"
    println(message.addExclamation()) // Output: Hello!
}

Here we add an addExclamation function to the String
class. The function can be called on any String instance. Inside the function,
this refers to the receiver object. Extension functions are powerful
for enhancing existing classes.

## Higher-Order Functions

Kotlin functions can accept other functions as parameters or return functions.
These are called higher-order functions. They enable functional programming
patterns and behavior parameterization.

HigherOrderFunction.kt
  

package com.zetcode

fun operateOnNumbers(a: Int, b: Int, operation: (Int, Int) -&gt; Int): Int {
    return operation(a, b)
}

fun main() {
    val sum = operateOnNumbers(5, 3) { x, y -&gt; x + y }
    val product = operateOnNumbers(5, 3) { x, y -&gt; x * y }
    
    println(sum)    // Output: 8
    println(product) // Output: 15
}

The operateOnNumbers function takes two Ints and an operation
function. It applies the operation to the numbers. In main, we pass
different lambda expressions to perform addition and multiplication.
Higher-order functions enable flexible behavior composition.

## Best Practices for Functions

**Keep functions small:** Each function should do one thing and
do it well. Aim for functions that fit on one screen.
**Use descriptive names:** Function names should clearly
indicate their purpose. Prefer verbs for actions and nouns for queries.
**Limit parameters:** Functions with many parameters become
hard to use. Consider using data classes for complex parameter groups.
**Prefer pure functions:** Functions without side effects are
easier to test and reason about. Isolate side effects when necessary.
**Use extension functions judiciously:** They're powerful but
can make code less obvious if overused or poorly named.

## Source

[Kotlin Functions Documentation](https://kotlinlang.org/docs/functions.html)

This tutorial covered Kotlin's fun keyword in depth, showing various
function types and features. We explored basic functions, parameters, return
values, and advanced concepts like extension functions. Mastering functions is
essential for writing clean, maintainable Kotlin code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).