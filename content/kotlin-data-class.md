+++
title = "Kotlin data class"
date = 2025-08-29T20:02:29.470+01:00
draft = false
description = "Kotlin data class tutorial shows how to worki with data classes in Kotlin."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin data class

last modified January 29, 2024

In this article we introduce Kotlin data class.

A Kotlin *data class* is designed to hold data. For this purpose, much
of the advanced functionality of standard classes is not needed. Groovy, F#, C# 
languages have records which are equivalent to Kotlin's data classes.

With data classes, we can considerably reduce the boilerplate code. Compiler
automatically creates the equals, hashCode,
toString, and copy functions.

A data class in Kotlin is created with the data class keywords.

The data classes must follow a couple of rules. The primary constructor needs to
have at least one parameter. All primary constructor parameters must be marked
as val or var. The data classes cannot be abstract, open, sealed or inner.

## Kotlin data class simple example

The following is a simple example that uses a Kotlin data class. 

Simple.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val occupation: String)

fun main() {

    val u = User("John", "Doe", "gardener")

    println(u.lname)
    println(u.fname)
    println(u.occupation)
    println(u)
}

We define a User data class with three fields. 

data class User(val fname: String, val lname: String, val occupation: String)

Only one line of code is needed to define a data class. 

println(u.lname)
println(u.fname)
println(u.occupation)

Kotlin creates three properties.

println(u)

Also, we have a convenience toString method defined, which is
called  when we print the object to the console. 

Doe
John
gardener
User(fname=John, lname=Doe, occupation=gardener)

## Parameterless constructor

If the generated class needs to have a parameterless constructor, default values
for the properties have to be specified.

Parameterless.kt
  

package com.zetcode

data class Student(var name: String = "", var favCol: String = "")

fun main() {

    val s1 = Student()
    s1.name = "Paul"
    s1.favCol = "blue"
    println(s1)
}

Providing default values for our Student constructor, we can create 
an object with empty, parameterless constructor.

## Kotlin data class copy

The copy function to copies an object, allowing us to alter some of
its properties while keeping the rest unchanged.

CopyFun.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val occupation: String)

fun main() {

    val u1 = User("John", "Doe", "gardener")
    val u2 = u1.copy(fname = "Jane", occupation = "teacher")

    println(u1)
    println(u2)

    println(u2.fname)
    println(u2.lname)
    println(u2.occupation)
}

With copy, we quickly create a new user that shares the
lname property.

User(fname=John, lname=Doe, occupation=gardener)
User(fname=Jane, lname=Doe, occupation=teacher)
Jane
Doe
teacher

## Kotlin data class destructuring

Kotlin data classes support the destructuring operation. It allows us to pull 
object properties into variables. 

Destructuring.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val occupation: String)

fun main() {

    val u = User("John", "Doe", "gardener")

    val (fname, lname, occupation) = u
    println("$fname $lname is a $occupation")
}

In the example, we destructure the three properties of the user object into 
three separate variables.

John Doe is a gardener

## Kotlin data class filter

Data classes are well suited for data analysis.

Filter.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val salary: Int)

fun main() {

    val users = arrayOf(
        User("John", "Doe", 1230),
        User("Lucy", "Novak", 670),
        User("Ben", "Walter", 2050),
        User("Robin", "Brown", 2300),
        User("Amy", "Doe", 1250),
        User("Joe", "Draker", 1190),
        User("Janet", "Doe", 980),
        User("Albert", "Novak", 1930)
    )

    users.filter { it.salary &lt; 1000 }.forEach { e -&gt; println(e) }
}

In the example, we have a list of users. With filter, we find out 
all users whose salaries are lower than 1000.

User(fname=Lucy, lname=Novak, salary=670)
User(fname=Janet, lname=Doe, salary=980)

## Kotlin Pair &amp; Triple

Kotlin provides two standard data classes: Pair and
Triple. 

Standard.kt
  

package com.zetcode

fun main() {

    val p1 = Pair(1, 2)
    val p2 = Pair(3, 4)
    val p3 = Pair(p1.first + p2.first, p2.second + p2.second)

    println(p1)
    println(p2)
    println(p3)

    val t1 = Triple(1, 2, 3)
    val t2 = Triple(3, 4, 5)
    val t3 = Triple(t1.first + t2.first, t1.second + t2.second,
        t1.third + t2.third)

    println(t1)
    println(t2)
    println(t3)
}

We can use the first, second, and third
properties to get to their values. 

(1, 2)
(3, 4)
(4, 8)
(1, 2, 3)
(3, 4, 5)
(4, 6, 8)

## Source

[Kotlin data classes - language reference](https://kotlinlang.org/docs/data-classes.html)

In this article we have covered data classes in Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).