+++
title = "Kotlin lambda expression"
date = 2025-08-29T20:02:41.713+01:00
draft = false
description = "Kotlin lambda expression tutorial shows how to use lambda expressions in Kotlin. A lambda expression is an anonymous function which is treated as a value."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin lambda expression

last modified January 29, 2024

In this article we show how to use lambda expressions in Kotlin. 

A lambda expression is an anonymous function which is treated as a
value. It can be bound to a variable, passed to a function as a parameter, or
returned from a function.

val square: (Int) -&gt; Int = { e: Int -&gt; e * e }

In Kotlin, a lambda expression is always delimited by curly braces.

## Kotlin anonymous function

Anonymous functions are functions that do not have a name.

Main.kt
  

package com.zetcode

fun main() {

    val vals = intArrayOf(-2, -1, 0, 1, 2, 3, 4)

    val filtered = vals.filter(fun(e) = e &gt; 0)
    println(filtered)
}

We define an array of integers. The array is filtered with the
filter function. The filter function takes an
anonymous function as a parameter.

val filtered = vals.filter(fun(e) = e &gt; 0)

The anonymous function is used to filter the array.

The next example is a rewrite of the previous one using a lambda expression.

Main.kt
  

package com.zetcode

fun main() {

    val vals = intArrayOf(-2, -1, 0, 1, 2, 3, 4)

    val filtered = vals.filter { e -&gt; e &gt; 0 }
    println(filtered)
}

Here we use curly braces and the -&gt; operator.

## Type declaration

In a lambda expression type declaration, we have a list of parameters in square
brackets followed by the arrow -&gt; operator followed by the
return type.

Main.kt
  

package com.zetcode

fun main() {

    val square: (Int) -&gt; Int = { e: Int -&gt; e * e }

    val r1 = square(5)
    val r2 = square(3)

    println(r1)
    println(r2)
}

In the program, we bind a lambda expression to a value; full type declarations 
are provided. 

val square: (Int) -&gt; Int = { e: Int -&gt; e * e }

The square value is bound to a lambda expression, which accepts one 
integer and returns an integer. 

## Type inference

Kotlin can infer the data types of values and therefore, we can omit some
declarations.

Main.kt
  

package com.zetcode

fun main() {

    val square1: (Int) -&gt; Int = { e: Int -&gt; e * e }
    val square2 = { e: Int -&gt; e * e }
    val square3: (Int) -&gt; Int = { e -&gt; e * e }
//    val square4 = { e -&gt; e * e }

    val r1 = square1(5)
    val r2 = square2(3)
    val r3 = square3(6)

    println(r1)
    println(r2)
    println(r3)
}

In the example, we define the square function multiple times. 

val square1: (Int) -&gt; Int = { e: Int -&gt; e * e }

This is the full type declaration.

val square2 = { e: Int -&gt; e * e }

Here we omit the lambda declaration for the square2 name. 

val square3: (Int) -&gt; Int = { e -&gt; e * e }

In this case, we omit the declaration of the element inside the lambda
expression.

//    val square4 = { e -&gt; e * e }

However, we cannot omit both declarations. This code does not compile.

The Unit type is used for an expression that does not return a
value.

Main.kt
  

package com.zetcode

fun main() {

    val l1 = { println("Hello there!") }
    val l2: (String) -&gt; Unit = { name: String -&gt;
        println("Hello $name!")
    }

    l1()
    l2("Lucia")
}

If we print something to the console, we do not return anything. For such cases, 
we specify Unit.

## Kotlin lambda expression it

The it is a special keyword that represents a single parameter
passed to the lambda expression.

Main.kt
  

package com.zetcode

fun main() {

    val nums = listOf(1, 2, 3, 4, 5, 6)
    nums.forEach { println(it * 2) }
}

We have a list of integers. With forEach, we go through the list 
of elements and multiply them by two.

nums.forEach { println(it * 2) }

The it represents the currently processed item.

## Passing lambdas as function arguments

In the following example, we pass lambda expressions as function arguments.

Main.kt
  

package com.zetcode

val inc = { e: Int -&gt; e + 1 }
val dec = { e: Int -&gt; e - 1 }
val square = { e: Int -&gt; e * e }
val triple = { e: Int -&gt; e * e * e }

fun doProcess(vals: List&lt;Int&gt;, f: (Int) -&gt; Int) {

    val processed = vals.map { e -&gt; f(e) }
    println(processed)
}

fun main() {

    val vals = listOf(1, 2, 3, 4, 5, 6)

    doProcess(vals, inc)
    doProcess(vals, dec)
    doProcess(vals, square)
    doProcess(vals, triple)
}

We define four lambdas: inc, dec, square,
triple. We pass the lambdas to the doProcess function.

fun doProcess(vals: List&lt;Int&gt;, f: (Int) -&gt; Int) {

    val processed = vals.map { e -&gt; f(e) }
    println(processed)
}

We provide the type declaration for the second parameter: 
(Int) -&gt; Int. Each lambda takes an integer and returns an
integer.

val processed = vals.map { e -&gt; f(e) }

With map, we apply the lambda expression on each element of the
list.

## Returning from lambda

The last expression in the lambda is returned. 

Main.kt
  

package com.zetcode

val check = { u:Pair&lt;String, Int&gt; -&gt;

    when (u.second) {
        in 0..75 -&gt; "failed"
        else -&gt; "passed"
    }
}

fun main() {

    val students =  listOf(

        Pair("Maria", 98),
        Pair("Pablo", 81),
        Pair("Lucia", 45),
        Pair("Peter", 98),
        Pair("Simon", 73),
    )

    students.forEach {

        val res = check(it)
        println("${it.first} has $res")
    }
}

In the example, we have a list of students. We check which students have passed 
the exam.

val check = { u:Pair&lt;String, Int&gt; -&gt;

    when (u.second) {
        in 0..75 -&gt; "failed"
        else -&gt; "passed"
    }
}

The lambda contains a when expression. The matched arm's value is returned from 
the lambda.

val res = check(it)
println("${it.first} has $res")

The returned value is used to display a message.

## Trailing lambdas

If the last parameter of a function is a function, then a lambda expression can
be placed outside the parentheses. If the lambda is the only argument, the
parentheses can be omitted entirely.

Main.kt
  

package com.zetcode

data class User(val fname: String, val lname: String, val salary: Int)

fun main() {

    val users = listOf(
        User("John", "Doe", 1230),
        User("Lucy", "Novak", 670),
        User("Ben", "Walter", 2050),
        User("Robin", "Brown", 2300),
        User("Amy", "Doe", 1250),
        User("Joe", "Draker", 1190),
        User("Janet", "Doe", 980),
        User("Albert", "Novak", 1930)
    )

    val r1 = users.maxBy({ u: User -&gt; u.salary })
    println(r1)

    val r2 = users.maxBy() { u: User -&gt; u.salary }
    println(r2)

    val r3 = users.maxBy { u: User -&gt; u.salary }
    println(r3)
}

In the example, we find the maximum salary of all users.

val r1 = users.maxBy({ u: User -&gt; u.salary })
println(r1)

In the first case, we pass the lambda expression to the maxBy
function as a parameter. 

val r2 = users.maxBy() { u: User -&gt; u.salary }
println(r2)

Since the lambda is the last parameter, we can take it out of the parentheses.

val r3 = users.maxBy { u: User -&gt; u.salary }
println(r3)

Since the lambda is the only parameter, we can omit the parentheses.

## Kotlin chaining functions with lambdas

We can chain funtion calls with lambda expressions, creating succinct code.

Main.kt
  

package com.zetcode

fun main() {

    val words = listOf("sky", "cup", "water", "den", 
        "knife", "earth", "falcon")

    val res = words.filter { it.length == 5 }.sortedBy { it }
        .map { it.replaceFirstChar(Char::titlecase) }
    println(res)
}

We filter a list of words, sort it, and capitalize its elements. All is done 
in a chain of three function calls. The functions have trailing lambdas.

## Destructuring in lambdas

Parameters can be destructured in lambda expressions. For unused variables, we 
can use the underscore _ character.

Main.kt
  

package com.zetcode

fun main() {

    val words = mapOf(
        1 to "sky", 2 to "cup", 3 to "water", 4 to "den",
        5 to "knife", 6 to "earth", 7 to "falcon"
    )

    words.forEach { (_, v) -&gt; println(v) }
}

We have a map of words. We go through the map with forEach. 
Each elemetn of the map is destructured into a key/value pair. Since we do not 
use the key, we use the underscore character.

## Source

[Higher-order functions and lambdas](https://kotlinlang.org/docs/lambdas.html)

In this article we have covered Kotlin lambda expressions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).