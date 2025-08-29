+++
title = "Scala function"
date = 2025-08-29T20:11:42.737+01:00
draft = false
description = "Scala function tutorial shows how to work with functions in Scala. A function is a mapping of zero or more input values to zero or more output values."
image = ""
imageBig = ""
categories = ["scala"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Scala function

last modified January 10, 2023

In this article we cover functions in Scala.

## A function

A function is a mapping of zero or more input values to zero or more
output values.

With functions, we can reduce code duplicity and increase its clarity. More
complex tasks can be divided into simpler units using functions.

Functions can be assigned to variables, passed as arguments to functions or
returned from other functions.

In Scala, there are two types of functions: val functions and def functions.
There are some technical differences between these two types of functions. When
needed, a def function is transformed into a val function with the underscore
operator. The transformation is done often automatically so the distinction is
somewhat blurred.

## Scala main function

A main function is the entry point in a Scala application. It is decorated with
the @main annotation.

main.scala
  

@main def main() =

    println("main function is an entry point")

The name and the parameters of a main function are terminated with the
= operator. The operator is followed with a block of body code. In
Scala 3, white space is a part of the syntax. It is used to delimit the body of
a function.

println("main function is an entry point")

The println is a built-in function, which prints the text to the
terminal and adds a newline character.

$ scala main.scala
main function is an entry point

A main function can take arguments.

main.scala
  

@main def main(args: String*) =

    args.foreach(println)

In the program, the main function can take arbitrary number of string arguments.

$ scala main.scala an old falcon
an
old
falcon

## Returning values

Traditionally, the return keywords is used to return a value from
a function. In Scala, the return keyword is optional.

main.scala
  

def square(x: Int): Int =

    // return x * x
    x * x

@main def main() =

    println(square(5))

We define a square function.

def square(x: Int): Int =

The def keyword is followed by a name of the function. In square
brackets, we provide the function parameters. The brackets are followed by the
colon character and the data type of the returned value. After the
= character, we provide the body of the function.

// return x * x
x * x

In Scala, the return keywords is optional. The value of the last
expression is automatically returned to the caller.

println(square(5))

We call the square function with a 5 number as its parameter.
The computed value is printed to the console.

$ scala main.scala
25

## Variable number of arguments

An asterisk is used to define variable number of arguments.

main.scala
  

def mysum(vals: Int*): Int =

    var total = 0

    for n &lt;- vals do
        total += n

    total

@main def main() =

    val s1 = mysum(1, 2, 3)
    val s2 = mysum(1, 2, 3, 4)
    val s3 = mysum(1, 2, 3, 4, 5)

    println(s1)
    println(s2)
    println(s3)

The program contains a definition of a sum function. The function can take any
number of arguments. The arguments are available in the function body as a
sequence of values.

def mysum(vals: Int*): Int =

    var total = 0

    for n &lt;- vals do
        total += n

    total

This is the definition of a custom mysum function. The
vals is a sequence of integer values. With a for loop, we compute
the final sum.

val s1 = mysum(1, 2, 3)
val s2 = mysum(1, 2, 3, 4)
val s3 = mysum(1, 2, 3, 4, 5)

We pass three, four, and five values to the function.

$ scala main.scala
6
10
15

## Scala default function arguments

Scala function arguments may have default values; they are used if no value is
provided for the argument.

main.scala
  

def power(x: Int, n: Int = 2): Int =

    if n == 2 then
        x * x

    var res = 1
    var i = 0

    while i &lt; n do
        res *= x
        i += 1

    res

@main def main() =

    val r1 = power(3)
    println(r1)

    val r2 = power(3, 3)
    println(r2)

We have a power function. The function has one argument with an
implicit value. We can call the function with one or two arguments.

def power(x: Int, n: Int = 2): Int =

The second parameter of the power function is implicit. If it is
not provided, its value is 2.

$ scala main.scala
9
27

## Scala anonymous function

Anonymous functions do not have a name. In many cases, defining a named function
is redundant.

main.scala
  

@main def main() =

    val nums = List(1, 2, -3, -4, 5)

    val pos = nums.filter(e =&gt; e &gt; 0).map(e =&gt; e * 2)
    println(pos)

    val neg = nums.filter(_ &lt; 0)
    println(neg)

    nums.foreach(e =&gt; print(s"$e "))
    println

We have a list of integers. We call some filter, map,
and foreach functions on the list.

val pos = nums.filter(e =&gt; e &gt; 0).map(e =&gt; e * 2)

The filter and map are functions that work on the
elements of the list. They take a predicate function (a function returning a
boolean value) as a parameter. In our case, the predicates are anonymous
functions.

val neg = nums.filter(_ &lt; 0)

This is a shortened syntax.

$ scala main.scala
List(2, 4, 10)
List(-3, -4)
1 2 -3 -4 5

## Scala val function

With val keyword, we define function types.

main.scala
  

val square = (x: Int) =&gt; x * x
val triple: (x: Int) =&gt; Int = (x) =&gt; x * x * x

@main def main() =

    val nums = List(1, 2, 3, 4, 5)

    val res = square(3)
    println(res)

    val res2 = triple(5)
    println(res2)

    val res3 = nums.map(square)
    println(res3)

    val square2 = square
    println(square2(5))

The program defines two val functions.

val square = (x: Int) =&gt; x * x

A function type is bound to the square identifier. The parameters
of the functions are separated from its body with the fat arrow
=&gt; operator. The type declaration for the square
identifier is omitted, since Scala is able to infer it.

val triple: (x: Int) =&gt; Int = (x) =&gt; x * x * x

Here we omit the type for the function argument, but provide the type for the
tripe identifier. (It is not possibe to omit both declaration.)

val res = square(3)
println(res

val res2 = triple(5)
println(res2)

val res3 = nums.map(square)
println(res3)

The val functions are called exactly like def functions.

$ scala main.scala
9
125
List(1, 4, 9, 16, 25)
25

One difference between the val and def functions is that the def functions are 
always evaluated. 

main.scala
  

val getNano = System.nanoTime
def getNano2 = System.nanoTime

@main def main() = 

    println(getNano)
    Thread.sleep(300)
    println(getNano)

    println("-----------------")

    println(getNano2)
    Thread.sleep(300)
    println(getNano2)

The getNano and getNano2 functions return the 
current time in nanoseconds.

val getNano = System.nanoTime

The getNano function is evaluated once and subsequent calls return 
the same value.

def getNano2 = System.nanoTime  

The getNano2 function is always evaluated. 

$ scala main.scala
32724329770177
32724329770177
-----------------
32724630310958
32724930546360

## Scala nested function

A nested function, also called an inner function, is a function defined inside
another function. 

main.scala
  

def minmax(x: Int, y: Int) = 

    val min = (x: Int, y: Int) =&gt; if x &lt; y then x else y
    val max = (x: Int, y: Int) =&gt; if x &gt; y then x else y

    var mn = min(x, y)
    var mx = max(x, y)
    
    (mn, mx)

@main def main() = 

    val res = minmax(100, 13)
    println(s"min: ${res._1} max: ${res._2}")

    val res2 = minmax(0, -13)
    println(s"min: ${res2._1} max: ${res2._2}")

In the program, we have the minmax function, which contains two 
nested functions: min and max.

$ scala main.scala 
min: 13 max: 100
min: -13 max: 0

## Scala high-order function

High-order functions operate on other functions, either by taking them as
arguments or by returning them.

main.scala
  

def process(data: List[Int], f: (e: Int) =&gt; Int): List[Int] =

    data.map(f)

@main def main() =

    val nums = List(1, 2, 3, 4, 5, 6)

    val res1 = process(nums, e =&gt; e * e)
    println(res1)

    val res2 = process(nums, e =&gt; e + 1)
    println(res2)

The process is a high-order function.

def process(data: List[Int], f: (e: Int) =&gt; Int): List[Int] =

    data.map(f)

The process high-order function applies the function on the list.

val res1 = process(nums, e =&gt; e * e)
...
val res2 = process(nums, e =&gt; e + 1)

We pass two different anonymous functions to the process function.

$ scala main.scala
List(1, 4, 9, 16, 25, 36)
List(2, 3, 4, 5, 6, 7)

## Scala closure

A closure is an anonymous nested function which retains bindings to variables
defined outside the body of the closure.

Closures can hold a unique state of their own. The state becomes isolated as we
create new instances of the function.

main.scala
  

def intSeq(): () =&gt; Int =

    var i = 0

    return () =&gt; { i += 1; i }

@main def main() =

    val nextInt = intSeq()

    println(nextInt())
    println(nextInt())
    println(nextInt())
    println(nextInt())

    println("-------------------")

    val nextInt2 = intSeq()
    println(nextInt2())
    println(nextInt2())

We have the intSeq function, which generates a sequence of integers. It returns
a closure which increments the i variable.

def intSeq(): () =&gt; Int =

    var i = 0

    return () =&gt; { i += 1; i }

Variables defined in functions have a local function scope. However, in this
case, the closure is bound to the i variable even after the
intSeq function returns.

val nextInt = intSeq()

The intSeq function is called. It returns a function which
increments a counter. The returned function closes over the variable
i to form a closure. The closure is bound to the
nextInt value. 

println(nextInt())
println(nextInt())
println(nextInt())
println(nextInt())

We call the closure four times. 

val nextInt2 = intSeq()
println(nextInt2())
println(nextInt2())

The next call of the intSeq function returns a new closure. This
new closure has its own distinct state. 

$ scala main.scala 
1
2
3
4
-------------------
1
2

## Scala extension function

Extension functions add functionality to an existing type. An extension
function is created with the extension keyword.

main.scala
  

extension (value: Int)

    def isOdd = value % 2 == 0
    def isEven = value % 2 != 0

    def times(f: Any =&gt; Unit, v: Any): Unit =

        var i = 0
        while i &lt; value do
            f(v)
            i += 1

@main def main() =

    val n = 4

    println(n.isOdd)
    println(n.isEven)

    n.times(println, "falcon")

In the program, we add three extension function to the Int type.

extension (value: Int)

    def isOdd = value % 2 == 0
    def isEven = value % 2 != 0

    def times(f: Any =&gt; Unit, v: Any): Unit =

        var i = 0
        while i &lt; value do
            f(v)
            i += 1

The isOdd and isEven functions check if the integer
is even or odd. The times function executes the given function
n times.

$ scala main.scala
true
false
falcon
falcon
falcon
falcon

## Scala member function

Member functions are functions defined within a Scala class.

main.scala
  

class Cat:

    def talk() =
        println("meow")

@main def main() =

    val missy = Cat()
    missy.talk()

The talk function is defined in the Cat class.

val missy = Cat()
missy.talk()

We create the Cat object and call the member function using the dot
operator.

$ scala main.scala
meow

In this article we have worked with Scala functions.