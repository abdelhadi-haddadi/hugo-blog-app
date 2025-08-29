+++
title = "F# lambda"
date = 2025-08-29T19:54:30.702+01:00
draft = false
description = "Explore lambda expressions in F# and learn how to define and use anonymous functions effectively. This tutorial covers higher-order functions, closures, and functional programming techniques in F#."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# lambda

last modified May 17, 2025

This article explores how to work with lambda expressions in F# and their role
in functional programming.

A lambda expression is an anonymous function that does not require an
explicit name. Lambda expressions are defined using the fun keyword
and allow developers to create lightweight, inline functions that are often used
for short-lived operations. They enhance code readability and maintainability by
eliminating unnecessary function declarations.

Lambda expressions are particularly useful when passing functions as arguments,
defining concise logic within higher-order functions, or streamlining simple
computations. Since they are unnamed and typically defined within a specific
context, they do not need to be reused across multiple locations in a program.

## F# simple lambda

In the following example, we define a simple lambda.

main.fsx
  

let inc x = x + 1 

let v = inc 90
printfn "%d" v

let r = (fun x -&gt; x + 1) 100
printfn "%d" r

The program contains a simple function and a lambda.

let inc x = x + 1 

This is a definition of a function called inc, which increments its 
parameter.

let v = inc 90
printfn "%d" v

The inc function is called and the result is printed.

let r = (fun x -&gt; x + 1) 100

A lambda function is defined and immediately called. The function is anonymous 
and cannot be reused.

λ dotnet fsi main.fsx
91
101

## F# lambda with high-order functions

Lambdas are often passed to high-order functions to define predicates.

main.fsx
  

let vals = [ 2; 1; -5; 8; 9; -2; 0; 5; 4 ]

let res = List.map(fun e -&gt; e * 2) vals
printfn "%A" res

let res2 = List.filter(fun e -&gt; e &lt; 0) vals
printfn "%A" res2

In the example, we use two lambdas to create predicates for
List.map and List.filter functions.

λ dotnet fsi main.fsx
[4; 2; -10; 16; 18; -4; 0; 10; 8]
[-5; -2]

## F# lambda argument types

The argument types are provided within round brackets, separately for each 
argument.

main.fsx
  

let msg = (fun (name: string)(age: int) -&gt; $"{name} is {age} years old") "John Doe" 34
printfn "%s" msg

We have a lambda expression with two parameters: one string and one integer.
The arguments and their types are defined in () brackets.

λ dotnet fsi main.fsx
John Doe is 34 years old

## F# lambda with let binding

We can use a let binding in a lambda.

main.fsx
  

let names =
    [ "John Doe"
      "Lucy Smith"
      "Benjamin Young"
      "Robert Brown"
      "Thomas Moore"
      "Linda Black"
      "Adam Smith"
      "Jane Smith" ]

names
|&gt; List.sortBy (fun e -&gt; let a = e.Split(" ") in Array.get a 1)
|&gt; printfn "%A"

In the program, we sort a list of names by surnames.

|&gt; List.sortBy (fun e -&gt; let a = e.Split(" ") in Array.get a 1)

We split each name by a space and then retrieve the second element of the split.

λ dotnet fsi main.fsx
["Linda Black"; "Robert Brown"; "John Doe"; "Thomas Moore"; "Lucy Smith";
 "Adam Smith"; "Jane Smith"; "Benjamin Young"]

## F# lambda closure example

Lambdas can capture variables from their surrounding scope, creating
*closures*. This allows the lambda to remember and update state between
calls.

closure.fsx
  

let makeCounter () =
    let mutable count = 0
    fun () -&gt;
        count &lt;- count + 1
        count

let counter = makeCounter ()
printfn "%d" (counter ()) // 1
printfn "%d" (counter ()) // 2
printfn "%d" (counter ()) // 3

In this example, makeCounter returns a lambda that increments and
returns a private counter. Each call to counter increases the
value, demonstrating how lambdas can form closures over local variables.

λ dotnet fsi closure.fsx
1
2
3

In this article, we explored the fundamentals of lambda expressions in F# and
their practical applications in functional programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.