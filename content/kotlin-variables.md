+++
title = "Kotlin variables"
date = 2025-08-29T20:02:59.804+01:00
draft = false
description = "Kotlin variables tutorial shows how to use variables in Kotlin. A variable is a place to store data. It has a name and a data type."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin variables

last modified January 29, 2024

This article shows how to use variables in Kotlin.

Kotlin is a statically-typed programming language that runs 
on the Java virtual machine. The type of every expression is known at 
compile time. 

A variable is a place to store data. A variable has a name and a data 
type. A data type determines what values can be assigned to the variable.
Kotlin has the following basic types: Double, Float, 
Long, Int, Short, and Byte.

## Kotlin variables

There are two types of variables in Kotlin: read-only and mutable.
Read-only variables (or constants) are declared with val
and mutable with var.

## Kotlin data type inference

Kotlin can infer the data type of a variable from the right side
of the assignment. The data type is only mandatory when the assignment
is deferred.

val word = "cloud"
val word: String = "cloud"

The data type follows the indentifier and a colon in Kotlin. 

## Kotlin variables example

The following example creates two variables.

KotlinVariables.kt
  

package com.zetcode

fun main() {

    val word = "influence"
    println(word)

    var word2 = "sunshine"
    println(word2)
    
    word2 = "rain"
    println(word2)
}

There is one read-only and one mutable variable.

val word = "influence"

With the val keyword, we define a read-only variable.
Its value cannot be altered later in the program. The data type is String, 
which is inferred from the string literal on the right side of the assignment.

var word2 = "sunshine"
println(word2)

word2 = "rain"
println(word2)

With the var keyword, we define a mutable variable.
The value of the variable is modified later in the program.

influence
sunshine
rain

## Kotlin variable deferred assignment

In the following example, we defer the assignment of a variable after
its declaration.

KotlinVariableDeffered.kt
  

package com.zetcode

fun main() {

    val input: String?

    print("Enter something: ")
    input = readLine()

    println(input)
}

The example reads an input from a user.

val input: String?

We declare a variable of String data type. The trailing
question mark tells Kotlin that the variable may be null. This time
the data type has to be provided explicitly.

print("Enter something: ")

We print a prompt to the user.

input = readLine()

An input is read from the user with readLine. At this 
moment, we have assigned a value to the input variable.

## Kotlin properties

Variables created in a class are properties. The read-only variables
have default accessors and mutable variables accessors and mutators.

KotlinProperties.kt
  

package com.zetcode

class Person {

    var name:String = ""
    var age:Int = 0

    override fun toString(): String {
        return "Person(name='$name', age=$age)"
    }
}

fun main() {

    val p1 = Person()
    p1.name = "Peter"
    p1.age = 23

    println(p1)
}

In the example we have a Person class with two properties:
name and age.

var name:String = ""
var age:Int = 0

We have two mutable properties.

override fun toString(): String {
    return "Person(name='$name', age=$age)"
}

We override the toString method to get a string representation
of a Person object.

val p1 = Person()
p1.name = "Peter"
p1.age = 23

A Person object is created. We set the two properties.

Person(name='Peter', age=23)

## Source

[Kotlin basic syntax](https://kotlinlang.org/docs/basic-syntax.html)

In this article we have worked with variables in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).