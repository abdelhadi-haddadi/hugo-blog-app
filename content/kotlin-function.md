+++
title = "Kotlin function"
date = 2025-08-29T20:02:36.160+01:00
draft = false
description = "Kotlin function tutorial shows how to work with functions in Kotlin language."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin function

last modified January 29, 2024

In this article we show how to use functions in Kotlin language.

A function is a mapping of zero or more input values to zero or more output
values. With functions, we can reduce code duplicity and increase its clarity.
More complex tasks can be divided into simpler units using functions. Functions
can be assigned to variables, passed as arguments to functions or returned from
other functions.

A *function signature* is a unique identification of a function for the
Kotlin compiler. The signature consists of a function name, its parameters,
and the return type.

Functions in Kotlin are declared with the fun keyword. The body of
a function is called a block and is enclosed within { } curly
brackets. Functions may return values with the return keyword.

## Naming functions

Any legal character can be used in the name of a function. By convention,
function names begin with an lowercase letter. The function names are verbs or
verbs followed by adjectives or nouns. Each subsequent word starts with an
uppercase character. The following are typical names of functions in Kotlin:

  - execute

  - findId

  - setName

  - getName

  - checkIfValid

  - testValidity

Kotlin uses lowerCamelCase convention for function names. Other
programming languages might use CamelCase or snake_case.

## Kotlin main function

The main function is the entry point to the Kotlin program.

Main.kt
  

package com.zetcode

fun main() {

    println("main function is an entry point")
}

The program prints a simple message to the terminal.

fun main() {

    println("main function is an entry point")
}

This is the entry point of the Kotlin program. The main function
does not take any parameters.

Main.kt
  

package com.zetcode

fun main() {

    val sumVal = args.map { it.toInt() }.sum()
    println("The sum of values is $sumVal")
}

In this example, the program takes parameters; we assume string integers.
We transform these strings into integers and compute their sum. Note that
sum and println are also functions; they are
Kotlin built-in functions.

## Kotlin built-in functions

Kotlin standard library comes with many built-in functions.

Main.kt
  

package com.zetcode

import kotlin.random.Random

fun main() {

    println("There is a majestic hawk in the sky")

    val r = Random.nextInt(0, 100)
    println(r)

    val word = "ocean"
    val letters = word.toCharArray()

    letters.forEach(::println)
}

The example presents four Kotlin built-in functions.

println("There is a majestic hawk in the sky")

The println function outputs data on the terminal.

val r = Random.nextInt(0, 100)

The Random.nextInt function returns a random value from the
specified range.

val letters = word.toCharArray()

The toCharArray function returns all chars from the string
in an array.

letters.forEach(::println)

The forEach function iterates over the values of the array.

There is a majestic hawk in the sky
29
o
c
e
a
n

## Kotlin function return values

Functions may return values. To return values, we use the return
keyword.

Main.kt
  

package com.zetcode

fun square(x: Int): Int {

    return x * x
}

fun square2(x: Int): Int = x * x

fun main() {

    println(square(5))
    println(square2(6))
}

In the example, we have two square functions.

fun square(x: Int): Int {

    return x * x
}

When a funcion has a body enclosed by curly brackets, it returns a value using
the return keyword.

fun square2(x: Int): Int = x * x

The return keyword is not used for functions with expression
bodies.

## Kotlin function parameters

Functions in Kotlin may take parameters. The parameters are specified between
 brackets and are separated by comma. Function parameters are
defined using Pascal notation, i.e. *name: type*. Each parameter must be
explicitly typed.

Main.kt
  

package com.zetcode

fun sum(a: Int, b: Int): Int {
    return a + b
}

fun main() {

    val r = sum(4, 3)
    println(r)
}

In the example, we have a custom sum function.

fun sum(a: Int, b: Int): Int {
    return a + b
}

The sum function returns the sum of its two parameters. The
parameters and the return values are integers.

val r = sum(4, 3)

The sum function is called and the return value is assigned to
the r variable.

## Kotlin function default argument values

Kotlin function arguments may have default values; they are used if no value is
provided for the argument.

Main.kt
  

package com.zetcode

fun power(a: Int, b: Int = 2): Int {

    if (b == 2) {

        return a * a
    }

    var value = 1

    repeat(b) {
        value *= a
    }

    return value;
}

fun main() {

    val r1 = power(3)
    println(r1)

    val r2 = power(3, 3)
    println(r2)
}

We have created a power function. The function has one argument with an
implicit value. We can call the function with one or two arguments.

9
27

## The Unit return type

Kotlin functions must specify their return types; the exception is when they do
not return any value. The return type for a void is Unit; this type
may be omitted.

Main.kt
  

package com.zetcode

fun showGreeting(name: String): Unit {

    println("Hello $name")
}

fun main() {

    showGreeting("Arnold")
    showGreeting("Lucia")
}

The example shows greetings.

fun showGreeting(name: String): Unit {

    println("Hello $name")
}

The showGreeting function prints a message to the terminal; it
does not return anything. Therefore, the return type is specified as Unit.

Hello Arnold
Hello Lucia

## Kotlin single-expression function

When the body of a function contains a single expression, the curly braces can
be omitted and the body is specified after the = symbol.

Main.kt
  

package com.zetcode

fun double(num: Int): Int = num * 2
fun triple(num: Int) = num * 3

fun main() {

    val r1 = double(3)
    val r2 = triple(3)

    println(r1)
    println(r2)
}

The example contains two single-expression functions.

fun double(num: Int): Int = num * 2

The function returns the parameter multiplied by 2. The curly brackets and
the return keyword are omitted.

fun triple(num: Int) = num * 3

The return type can be omitted; it is inferred by Kotlin.

## Variable number of arguments

A function can take variable number of arguments. For this we use the
vararg keyword.

Main.kt
  

package com.zetcode

fun mysum(vararg vals: Int): Int {

    return vals.sum()
}

fun main() {

    val s1 = mysum(1, 2, 3)
    val s2 = mysum(1, 2, 3, 4)
    val s3 = mysum(1, 2, 3, 4, 5)

    println(s1)
    println(s2)
    println(s3)
}

We create a mysum function which can take variable number of
arguments. The function calculates the sum of values passed to the function.

fun mysum(vararg vals: Int): Int {

    return vals.sum()
}

By using the vararg keyword, the mysum function can
take variable number of parameters. The vals variable is a Kotlin
array.

val s1 = mysum(1, 2, 3)
val s2 = mysum(1, 2, 3, 4)
val s3 = mysum(1, 2, 3, 4, 5)

We call the mysum function three times. Each time the number of
parameters is different.

6
10
15

## Kotlin function recursion

Recursion, in mathematics and computer science, is a way of defining functions
in which the function being defined is applied within its own definition. In
other words, a recursive function calls itself to do its job. Recursion is a
widely used approach to solve many programming tasks.

A typical example is the calculation of a factorial.

Main.kt
  

package com.zetcode

fun fact(num: Int): Int {

    return if (num == 1) {
        num
    } else {
        num * fact(num - 1)
    }
}

fun main() {

    val f1 = fact(5)
    val f2 = fact(8)
    val f3 = fact(12)

    println(f1)
    println(f2)
    println(f3)
}

In this code example, we calculate the factorial of three numbers.

num * fact(num - 1)

Inside the body of the fact function, we invoke the
fact function with a modified argument. The function calls itself.

120
40320
479001600

These are the results.

## Kotlin anonymous function

Anonymous functions are functions that do not have a name. Anonymous functions
reduce the coding overhead by eliminating the need to create a separate funcion.

Main.kt
  

package com.zetcode

fun main() {

    val vals = intArrayOf(-2, -1, 0, 1, 2, 3, 4)

    val filtered = vals.filter(fun(el) = el &gt; 0)
    println(filtered)
}

We have an array of integers. The array is filtered with the filter
function. It takes an anonymous function as a parameter.

val filtered = vals.filter(fun(el) = el &gt; 0)

The anonymous function is used to filter the array.

[1, 2, 3, 4]

We have filtered out negative values.

## Kotlin closure

Closures are functions that can access and modify properties defined outside the
scope of the function.

Main.kt
  

package com.zetcode

fun makeAverager(): (n: Int) -&gt; Double {

    val nums = arrayListOf&lt;Int&gt;()

    return fun(num: Int): Double {

        nums.add(num)
        val total = nums.sum()

        return total.toDouble() / nums.size
    }
}

fun main() {

    val avg = makeAverager()

    println(avg(1))
    println(avg(2))
    println(avg(3))
    println(avg(4))
    println(avg(5))
}

The example creates a function that calculates the average of the added values.
It uses an anonymous function, which calculates the average from the list of
values. The anonymous function has access to the nums
list, which stores the values and is defined outside of the function body
of the anonymous function.

1.0
1.5
2.0
2.5
3.0

## Kotlin local function

Local functions are defined inside other functions.

Main.kt
  

package com.zetcode

fun main() {

    fun buildMessage(name: String?): String {

        return "Hello $name"
    }

    print("Enter your name: ")
    val name = readLine()

    val message = buildMessage(name)
    println(message)
}

In the example, we have a local function buildMessage, which is
defined and called inside the main function.

## Kotlin extension function

An extension function is function that can be added to an existing type
without needing to derive a class from it. Extension functions are called like
normal member functions. Extension functions allow us to add functionality
to classes that were not created by us and when inheritance is not possible or
makes no sense.

Main.kt
  

package com.zetcode

fun String.second(): Char = this[1]

fun main() {

    val word = "falcon"
    println(word.second())
}

The example adds a new function to the String type. The function
returns the second char of the string.

## Kotlin member functions

Member functions are functions defined within a Kotlin class.

Main.kt
  

package com.zetcode

class Cat {

    fun talk() {
        println("meow")
    }
}

fun main() {

    val missy = Cat()
    missy.talk()
}

The talk function is defined in the Cat class.

val missy = Cat()
missy.talk()

We create the Cat object and call the member function using
the dot operator.

## Kotlin high-order function

A higher-order function is a function that takes functions as parameters, or
returns a function.

Main.kt
  

package com.zetcode

fun process(data: IntArray, f: (IntArray) -&gt; Any): Any {

    return f(data)
}

fun main() {

    val values = intArrayOf(1, 2, 3, 4, 5, 6)

    val res1 = process(values, IntArray::sum)
    println(res1)

    val res2 = process(values, IntArray::average)
    println(res2)
}

In the example, we have the process high-order function, which
takes two parameters: an integer array and a function. The function is applied
on the elements of the array.

fun process(data: IntArray, f: (IntArray) -&gt; Any): Any {

    return f(data)
}

The process high-order function applies the function on the
data array.

val res1 = process(values, IntArray::sum)
println(res1)

We pass the IntArray's sum function to the
process function.

## Kotlin infix function

Functions can be called using so called *infix notation*. Infix notation
is a syntactic sugar for visually improving the code. The notation omits the dot
and the parentheses. There are several built-in functions that can be called
with infix notation, e.g. to, and,
or matches.

Infix functions are created with the infix keyword. They must be
member functions or extension functions, they must have a single parameter, and
the parameter must not accept variable number of arguments and must have no
default value.

Main.kt
  

package com.zetcode

fun main() {

    val a = true
    val b = false

    var res: Boolean

    res = a and b // a.and(b)
    println("a and b = $res")

    res = a or b // a.or(b)
    println("a or b = $res")
}

In the example, we use the and and or functions in
infix notation.

a or b = true
a and b = false

Main.kt
  

```
package com.zetcode

fun main() {

    val regex = Regex("[tT]rue|[yY]es")
    val values = arrayOf("yes", "no", "YES", "True", "null", "")

    values.forEach { value -&gt;
        if (value matches regex) println("$value matches")
        else println("$value does not match")
    }
}

```

In the example, we use the matches function in infix notation.

The following example creates a custom infix function.

Main.kt
  

package com.zetcode

class Builder {

    infix fun square(n: Int) {

        for (i in 1.. n) {

            println("0".repeat(n))
        }
    }
}

fun main() {

    val builder = Builder()
    builder square 4
    println()

    builder square 6
}

The example creates an infix square function, which outputs
a rectangle on the terminal.

builder square 4

We use the infix notation to call the square function. It outputs
a rectangle having width and height of four units.

## Source

[Kotlin functions - documentation](https://kotlinlang.org/docs/functions.html)

In this article we have covered Kotlin functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).