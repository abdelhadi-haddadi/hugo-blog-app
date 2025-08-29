+++
title = "Scala control flow"
date = 2025-08-29T20:11:42.493+01:00
draft = false
description = "Scala control flow tutorial shows how to manage program flow in Scala. The control flow structures can be used to executed code conditionally or multiple times."
image = ""
imageBig = ""
categories = ["scala"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Scala control flow

last modified January 10, 2023

In this article we show how to control program flow in Scala.

When a Scala program is run, the code is executed from top to bottom. The flow
of the program can be altered with various keywords, including
if/else, for, while, and
match.

The control flow structures can be used to executed code conditionally or
multiple times.

## Scala if condition

The if/then keywords are used to create simple conditional tests.
It can be used in conjuction with the else if and else
keyword.

main.scala
  

import scala.util.Random

@main def main() =

    val r = Random.between(-10, 10)

    if r &gt; 0 then
        println(s"positive value ($r)")
    else if r == 0 then
        println("zero value")
    else
        println(s"negative value ($r)")

We randomly select a value. Based on the resulting value, we print a message.
There are three possible branches that can be executed.

if r &gt; 0 then
    println(s"positive value ($r)")

If the expression following the if keyword is true, the next
statement is executed. Other branches are not executed.

Optionally, we can terminate the if condition with the end if
keywords.

main.scala
  

@main def main() =

    val r = Random.between(-10, 10)

    if r &gt; 0 then
        println(s"positive value ($r)")
    else if r == 0 then
        println("zero value")
    else
        println(s"negative value ($r)")
    end if

In the program we end the if condition with end if.

The if/then conditions are expressions; they can return values.

main.scala
  

import scala.util.Random

@main def main() =

    val r = Random.between(-10, 10)

    val res = if r &gt; 0 then
        s"positive value ($r)"
    else if r == 0 then
        "zero value"
    else
        s"negative value ($r)"

    println(res)

In this example, the if/then expression returns a result which is
later printed.

## Scala while loop

The while/do keywords are used to create a loop. It runs until the
given condition is met.

main.scala
  

@main def main() =

    val vals = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    val n = vals.length

    var i = 0
    var msum = 0

    while i &lt; n do
        msum = msum + vals(i)
        i = i + 1

    println(msum)

We have a list of integers. We calculate the sum of the integers with while
loop.

val vals = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

val n = vals.length

We get the length of the list.

var i = 0
var msum = 0

The i variable is the counter and the msum is the
variable to calculate the sum.

while i &lt; n do
    msum = msum + vals(i)
    i = i + 1

The while loop runs until the counter is smaller than the length of the list.
Inside the block, we add the current value to the msum and increase
the counter.

$ scala main.scala
55

## Scala for loop

With the for/do keywords, we iterate over a collection of values.

main.scala
  

@main def main() =

    val vals = List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

    var msum = 0

    for e &lt;- vals do
        msum = msum + e

    println(msum)

The example calculates the sum of integers in the list. We get a more compact
code in comparison to using the while loop.

for e &lt;- vals do
    msum = msum + e

In the for loop, we go over the elements of the list one by one.

## Scala for loop with map

For loops are used also to traverse maps.

main.scala
  

@main def main() =

    val cts = Map("sk" -&gt; "Slovakia", "ru" -&gt; "Russia",
        "de" -&gt; "Germany", "no" -&gt; "Norway")

    for (k, v) &lt;- cts do println(s"${k} ${v}")

We have a simple map. We go through the map and print its elements.

$ scala main.scala
sk Slovakia
ru Russia
de Germany
no Norway

## Scala for loop with range

The for loop can be use with a range of values.

main.scala
  

@main def main() =

    for n &lt;- 1 to 10 do
        println(n)

A range of integers is created with the to keyword.

for n &lt;- 1 to 10 do
    println(n)

We print numbers 1 to 10 to the console using the for loop.

$ scala main.scala
1
2
3
4
5
6
7
8
9
10

## Multiple generators

For loops can have multiple generators.

main.scala
  

@main def main() =

    val vals1 = List('A', 'B', 'C', 'D', 'E')
    val vals2 = List(1, 2, 3, 4, 5)

    val res = for
        e1 &lt;- vals1
        e2 &lt;- vals2
    yield
        s"$e1$e2"

    println(res)

Using two for generators, we combine elements of two lists.

$ scala main.scala
List(A1, A2, A3, A4, A5, B1, B2, B3, B4, B5, C1, C2, C3, C4, C5, ...

## Scala for expressions

A for expressions return values. A for expression is created with
for/yield keywords. For expressions are also called for
comprehensions.

For expressions build new collections of data.

main.scala
  

@main def main() =

    val nums =
        for i &lt;- -5 to 5
        yield i * 2

    println(nums)

The example creates a vector of integers using a for expression.

$ scala main.scala
Vector(-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10)

In the following example, we create a new list using a for comprehension.

main.scala
  

case class User(name: String, age: Int)

val users = List(
  User("John", 18),
  User("Brian", 31),
  User("Veronika", 23),
  User("Lucia", 48),
  User("Peter", 21))

val res =

  for user &lt;- users if user.age &gt;= 20 &amp;&amp; user.age &lt; 30
  yield user

@main def main() =

    println(res)
    res.foreach(println)

We have a list of users. With a for expression, we create a new list that only
includes users aged 20 to 30.

$ scala main.scala
List(User(Veronika,23), User(Peter,21))
User(Veronika,23)
User(Peter,21)

## Scala for guards

The guards are if expressions inside for expressions that can include values
conditionally.

main.scala
  

@main def main() =

    val words = List("sky", "war", "water", "rain",
        "some", "cup", "train", "wrinkle", "worry")

    val res = for
        word &lt;- words
        if word.startsWith("w")
    yield
        word

    println(res)

We have a list of strings. We go throught the list using a for expressions.
However, because of the if guard, only the words starting with 'w' are included
in the final output.

$ scala main.scala
List(war, water, wrinkle, worry)

It is possible to include multiple guards.

main.scala
  

@main def main() =

    val words = List("sky", "war", "water", "rain",
        "some", "cup", "train", "wrinkle", "worry")

    val res = for
        word &lt;- words
        if word.startsWith("w")
        if word.endsWith("r")
    yield
        word

    println(res)

Using two guards, we include only words that start with "w" and end with "r".

$ scala main.scala
List(war, water)

## Scala match expressions

Pattern matching is a powerful control flow construct that allows us to compare
a value against a series of patterns and then execute code based on which
pattern matches.

In match expressions, each option that is executed is called an arm.

main.scala
  

@main def main() =

    val grades = List("A", "B", "C", "D", "E", "F", "FX")

    for grade &lt;- grades do
        grade match
            case "A" | "B" | "C" | "D" | "E" | "F" =&gt; println("passed")
            case "FX" =&gt; println("failed")

We have a list of grades. We go through the list and print "passed" or "failed"
for each value. This example uses a multiple option arm, which saves a lot of
space. It is much shorter than using several if/else keywords.

$ scala main.scala
passed
passed
passed
passed
passed
passed
failed

In this article we have worked with control flow structures in Scala.