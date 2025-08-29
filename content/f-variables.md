+++
title = "F# variables"
date = 2025-08-29T19:54:35.160+01:00
draft = false
description = "Learn about variables in F#. This tutorial explains how to create and use variables in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# variables

last modified May 3, 2025

In this article, we explore how to effectively work with variables in F#.
Variables are fundamental building blocks in any programming language.

A variable is a named storage location that holds a value. In F#,
variables are *immutable* by default, meaning their values cannot be
changed after initialization. However, mutable variables can be created using
the mutable keyword. F# uses type inference to determine variable
types, but explicit typing is also supported.

## F# immutable variable

Immutable variables are the default in F#. Once assigned, their value cannot
change.

immutable.fsx
  

let x = 5
let name = "John Doe"
let active = true

printfn "%d" x
printfn "%s" name
printfn "%b" active

The program defines three immutable variables of different types: integer,
string, and boolean. We then print their values.

let x = 5

This creates an immutable integer variable x with value 5. The let keyword is
used for variable declaration.

λ dotnet fsi immutable.fsx
5
John Doe
true

## F# mutable variable

Mutable variables can have their values changed after initialization.

mutable.fsx
  

let mutable counter = 0
printfn "Initial value: %d" counter

counter &lt;- counter + 1
printfn "After increment: %d" counter

counter &lt;- counter + 1
printfn "After second increment: %d" counter

We create a mutable counter variable, increment it twice, and print its value
at each step.

let mutable counter = 0

The mutable keyword makes the variable changeable. Without it, this would be
a compilation error.

counter &lt;- counter + 1

The &lt;- operator is used to assign new values to mutable variables.

λ dotnet fsi mutable.fsx
Initial value: 0
After increment: 1
After second increment: 2

## F# variable type annotation

F# supports explicit type annotations for variables.

typed.fsx
  

let age: int = 34
let name: string = "Roger Roe"
let height: float = 172.5

printfn "%s is %d years old and %.1f cm tall" name age height

We declare three variables with explicit type annotations and print them.

let age: int = 34

The colon followed by the type specifies the variable's type explicitly.

λ dotnet fsi typed.fsx
Roger Roe is 34 years old and 172.5 cm tall

## F# variable scope

Variables in F# have block scope, visible only within their defining block.

scope.fsx
  

let outer = "I'm outside"

if true then
    let inner = "I'm inside"
    printfn "%s" inner
    printfn "%s" outer

// printfn "%s" inner // This would cause an error
printfn "%s" outer

The example demonstrates variable scoping in F#. The inner variable is only
accessible within the if block.

let inner = "I'm inside"

This variable is only visible within the if block where it's defined.

λ dotnet fsi scope.fsx
I'm inside
I'm outside
I'm outside

## F# variable shadowing

F# allows shadowing - declaring a new variable with same name in narrower scope.

shadowing.fsx
  

let x = 10
printfn "Outer x: %d" x

let innerFunction () =
    let x = 20
    printfn "Inner x: %d" x

innerFunction()
printfn "Outer x again: %d" x

We demonstrate variable shadowing by creating a new x inside a function.

let x = 20

This creates a new x that shadows the outer x within the function's scope.

λ dotnet fsi shadowing.fsx
Outer x: 10
Inner x: 20
Outer x again: 10

## F# tuple variables

Tuples allow grouping multiple values into a single variable.

tuples.fsx
  

let person = ("John Doe", 34, "gardener")
printfn "Full tuple: %A" person

let name, age, occupation = person
printfn "Name: %s, Age: %d, Occupation: %s" name age occupation

let first, _, _ = person
printfn "Just the name: %s" first

We create a tuple variable and demonstrate different ways to access its values.

let person = ("John Doe", 34, "gardener")

This creates a tuple containing three values of different types.

let name, age, occupation = person

This destructures the tuple into individual variables.

λ dotnet fsi tuples.fsx
Full tuple: ("John Doe", 34, "gardener")
Name: John Doe, Age: 34, Occupation: gardener
Just the name: John Doe

## F# reference cells

Reference cells provide an alternative way to handle mutable state.

refcells.fsx
  

let counter = ref 0
printfn "Initial value: %d" !counter

counter := !counter + 1
printfn "After increment: %d" !counter

counter := !counter + 1
printfn "After second increment: %d" !counter

We create a reference cell, then modify and access its contents.

let counter = ref 0

Creates a reference cell initialized with value 0.

!counter

The ! operator dereferences the cell to access its value.

counter := !counter + 1

The := operator updates the reference cell's value.

λ dotnet fsi refcells.fsx
Initial value: 0
After increment: 1
After second increment: 2

## F# variable naming conventions

F# follows certain naming conventions for variables.

naming.fsx
  

let camelCaseVariable = "camelCase"
let PascalCaseVariable = "PascalCase"
let snake_case_variable = "snake_case"
let ``variable with spaces`` = "works with backticks"

printfn "%s" camelCaseVariable
printfn "%s" PascalCaseVariable
printfn "%s" snake_case_variable
printfn "%s" ``variable with spaces``

The example shows different naming styles supported in F#.

let ``variable with spaces`` = "works with backticks"

Backticks allow using spaces and other special characters in variable names.

λ dotnet fsi naming.fsx
camelCase
PascalCase
snake_case
works with backticks

In this article we have worked with variables in F#.

  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.