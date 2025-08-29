+++
title = "F# print functions"
date = 2025-08-29T19:54:31.802+01:00
draft = false
description = "Learn about printing functions in F#. This tutorial covers printf, printfn, and other printing techniques in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# print functions

last modified May 1, 2025

In this article we cover the print functions in F# language.

In F#, we can use the built-in Console.WriteLine function to print
to the terminal or the special F# helper printf and
printfn functions.

## Console.WriteLine

The Console.WriteLine is the core .NET function to print to the
standard output.

main.fsx
  

open System

let name = "John Doe"
let occupation = "gardener"

Console.WriteLine($"{name} is a {occupation}")

In the example, we print a message with Console.WriteLine. The
function is available in the System namespace.

Console.WriteLine($"{name} is a {occupation}")

We use string interpolation to build the message.

$ dotnet fsi main.fsx
John Doe is a gardener

## The printf function

The printf function prints to standard output using the given
format.

main.fsx
  

let name = "John Doe"
let occupation = "gardener"

printf "%s is a %s\n" name occupation

The example prints a message to the console with printf.

printf "%s is a %s\n" name occupation

The function takes a format string as its first parameter. In the format string,
we define placeholders that are replaced with values of the following
parameters. The %s special placeholder is replaced with the string
value.

## The printfn function

The printfn function prints to standard output using the given
format and adds a newline.

main.fsx
  

printfn "The bool is %b" (5 &gt; 0)
printfn "Binary is %B" 123
printfn "The char is %c" 'F'
printfn "The string is %s" "falcon or \"falcon\" "
printfn "The int is %i" -3
printfn "The int is %d" 42
printfn "The float is %f" 42.0
printfn "The HEX is %X" 42
printfn "The float is %e" 0.0000042

We print values to the terminal with printfn. We present various
format specifiers.

$ dotnet fsi main.fsx
The bool is true
Binary is 1111011
The char is F
The string is falcon or "falcon"
The int is -3
The int is 42
The float is 42.000000
The HEX is 2A
The float is 4.200000e-006

## The sprintf function

The sprintf function does not print to the console. It builds a 
message ('prints' to a variable).

main.fsx
  

let name = "John Doe"
let occupation = "gardener"

let msg = sprintf "%s is a %s" name occupation
printfn "%s" msg

The example formats a message with sprintf and prints it to the 
console with printfn.

$ dotnet fsi main.fsx
John Doe is a gardener

In this article we have worked with print functions in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.