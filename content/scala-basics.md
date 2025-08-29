+++
title = "Scala basics"
date = 2025-08-29T20:11:41.365+01:00
draft = false
description = "The Scala basics tutorial covers the basics of Scala language. We work with variables, constants and basic data types. We read and write to the console; we mention variable interpolation."
image = ""
imageBig = ""
categories = ["scala"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Scala basics

last modified January 10, 2023

In this article we cover the basic programming concepts of Scala language.

## Scala

Scala is a powerful, high-level object-oriented and functional programming
language for the JVM. It has an advanced type system. Scala integrates
seamlessly with Java API. Scala first appeared in 2004.

In 2021, Scala 3 was released. It is a major rework of the language.

## Scala simple example

The following is a simple example in Scala 3.

main.scala
  

@main def main() =

    println("Scala language")

The program prints a message to the console. Scala programs have the
.scala extension. The main function is the entry point to the program.
It is decorated with the @main annotation.

Scala 3 uses indentation to delimit the body of the function.

println("Scala language")

The println function displays a message in console. It is not
necessary to terminate a statement with semicolon.

$ scala main.scala
Scala language

We execute the program with the scala code runner.

## Scala comments

Comments are used by humans to clarify source code. There are three types of
comments in Dart: single line comments (//), multi-line comments (/* */), and
documentation comments (/** */).

Documentation comments are used to produce documentation. They are used also by
IDEs.

main.scala
  

/*
  main.scala
  Author: Jan Bodnar
  ZetCode 2022
*/

// Program starts here
@main def main() =
    print("This is a Scala program")

In the example, we have a multi-line and a single line comment. The comments are
ignored by the compiler or the code runner.

## Scala values

Scala values are immutable names/identifiers given to values. They are created
with the val keyword.

main.scala
  

@main def main() =

    val name: String = "John Doe"
    val age: Int = 34
    val height: Double = 172.5

    println(s"$name is $age years old; his height is $height cm")

In the example, we define three values.

val name: String = "John Doe"

A string value is bound to the name identifier. A string is a data
type enclosed between two double quotes. The identifier is followed by a colon
character and the data type of the value.

val age: Int = 34

Here we define an integer value.

val height: Double = 172.5

Here we define a double precision floating-point value.

println(s"$name is $age years old; his height is $height cm")

The three identifiers are passed to the interpolated string to form a message.
In interpolated strings, the dollar prefixed identifiers are replaced with their
content when the string is built. Interpolated strings are prefixed with s
character.

$ scala values.scala
John Doe is 34 years old; his height is 172.5 cm

## Scala type inference

Scala can infer the types of values; therefore, we can omit the explicit type
declaration in many cases.

main.scala
  

@main def main() =

    val name = "John Doe"
    val age = 34
    val height = 172.5

    println(s"$name is $age years old; his height is $height cm")

    println(name.getClass)
    println(age.getClass)
    println(height.getClass)

The Scala compiler/runner can infer the data type from the right side of the
assignment.

println(name.getClass)
println(age.getClass)
println(height.getClass)

We can get the data type of an identifier with getClass.

$ scala main.scala
John Doe is 34 years old; his height is 172.5 cm
class java.lang.String
int
double

## Scala variables

Scala variables are mutable identifiers. They are created with the
var keyword.

main.scala
  

@main def main() =

    var name = "John Doe"
    var age = 34
    var height = 172.5

    println(s"$name is $age years old; his height is $height cm")

    name = "Roger Roe"
    age = 57
    height = 167.7

    println(s"$name is $age years old; his height is $height cm")

We define three variables. Later, we assign new values to the variables.

$ scala main.scala
John Doe is 34 years old; his height is 172.5 cm
Roger Roe is 57 years old; his height is 167.7 cm

## Scala read input

The Scala io.SdtIn package provides standard input/output routines.

main.scala
  

@main def main() =

    print("Enter your name: ")

    val name = io.StdIn.readLine

    printf("Hello %s!\n", name)

The readLine reads a full line from the terminal.

val name = io.StdIn.readLine

The full path of the readLine method is
io.StdIn.readLine. The method returns the read input from the user
and assigns it to the name identifier.

$ scala main.scala
Enter your name: Peter
Hello Peter!

## Scala conditionals

Conditionals are control flow structures. They are created with the
if then, else if, else keywords.

main.scala
  

import scala.util.Random

@main def main() =

    val r = Random.between(-5, 6)

    if r &gt; 0 then
        println("positive value")
    else if r == 0 then
        println("zero")
    else
        println("negative value")
    end if

In the example, we generate a random number. Depending on the received value, we
print a message to the console.

import scala.util.Random

From the standard library, we import the Random class. Now we can
refer to the class without the full path.

val r = Random.between(-5, 6)

We get a random integer between the specified values. The lower bound is
inclusive, the upper is exclusive.

if r &gt; 0 then
    println("positive value")
else if r == 0 then
    println("zero")
else
    println("negative value")
end if

Depending on the generated random value, three branches can be executed.
Only one branch is executed; others are skipped. The end if
keywords are optional; they can be omitted.

## Scala function

A function is a mapping of zero or more input parameters to zero or more output
parameters. Functions reduce the duplication of code.

Functions can be assigned to variables, passed as arguments to functions or
returned from functions.

main.scala
  

val square = (x: Int) =&gt; x * x
val triple = (x: Int) =&gt; x * x * x

@main def main() =

    val res = square(3)
    println(res)

    val res2 = triple(5)
    println(res2)

In the program, we define two functions: square and
triple.

val square = (x: Int) =&gt; x * x

The name of the function is followed by the = character and a 
pair of round brackets, which specify the parameters of the function. In our 
case we expect one integer parameter. The body of the function follows the 
=&gt; operator. The computed value of the expression is returned
to the caller.

Note that we have to explicitly type at least the input arguments; otherwise, 
Scala is not able to figure out the types used.

val res = square(3)
println(res)

We call the square function and pass it a number. The returned 
value is assigned to the res identifier and later printed with 
println.

$ scala main.scala 
9
125

## Scala while loop

The while loop is a control flow statement that allows code to be executed
repeatedly based on a given boolean condition. The while keyword
executes the statements inside the block following the do keyword.
The statements are executed each time the expression is evaluated to true.

main.scala
  

@main def main() =

    var i = 0
    var msum = 0

    while i &lt;= 10 do

        msum += i
        i += 1

    println(msum)

We calculate the sum of values from a range of numbers.

The while loop has three parts. Initialization, testing and updating. Each
execution of the statement is called a cycle.

var i = 0
var msum = 0

First, we initialize the i counter and the final result
msum to zero.

while i &lt;= 10 do

    msum += i
    i += 1

The expression inside while block following the do
keyword is the second phase, the testing. The statements in the body are
executed until the expression is evaluated to false. The += is
a compound operator and is equal to i = i + 1.

println(msum)

After the loop has terminated, we print the calculated value.

$ scala main.scala
55

## Scala for loop

A for loop is a basic control flow structure. It can be used to traverse a
sequence of values.

main.scala
  

@main def main() =

    val nums = List[Int](1, 2, 3, 4, 5, 6)

    for e &lt;- nums do
        println(e)

    println("-----------------")

    for e &lt;- 1 to 5 do println(e)

In the example, we go through the list of integers and a range of integers.

val nums = List[Int](1, 2, 3, 4, 5, 6)

A List is a basic collection of data. In our case, we store integer
values in the list. The type of the list is specified in the []
brackets.

for e &lt;- nums do
    println(e)

We go over the list elements with the for loop. The block of statements that are
executed in each cycle follows the do keyword. In each cycle, the 
e identifier contains the current list value.

for e &lt;- 1 to 5 do println(e)

We can use the for loop to go through the range of values. A range is created 
with the to keyword.

$ scala main.scala 
1
2
3
4
5
6
-----------------
1
2
3
4
5

## Scala command line arguments

Scala programs can receive command line arguments. They follow the name of the
program when we run it.

main.scala
  

@main def main(vals: Int*) =

    val sum = vals.sum
    println(sum)

We receive the arguments in the vals sequence. We compute the sum of the
integers with the sum method.

@main def main(vals: Int*) =

The Int* is used for a variable number of arguments.

$ scala main.scala 1 2 3 4 5
15

In this article we have introduced the basics of Scala language.