+++
title = "F# Random"
date = 2025-08-29T19:54:32.955+01:00
draft = false
description = "Discover how to generate random values in F#. This tutorial covers random number generation and its applications in F#."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# Random

last modified May 1, 2025

In this article we show how to generate random values in F#. In .NET, the
built-in Random class is used to generate random values.

Random represents a pseudo-random number generator, which is an
algorithm that produces a sequence of numbers that meet certain requirements for
randomness.

## Random number generator

Random number generator (RNG) produces a set of values that do not
display any distinguishable patterns in their appearance.

We have two categories of random number generators: hardware random-number
generators and pseudo-random number generators. Hardware random-number
generators are believed to produce genuine random numbers. Pseudo-random number
generators generate values based on software algorithms; they produce values
that look random. But these values are deterministic and can be reproduced, if
the algorithm is known.

Random generators are used in cryptography, gambling, gaming &amp; simulations.

**Note: **
For optimal security, cryptographically secure pseudo-random number generators
must be used.

To improve the pseudo random-number generators, operating systems use
environmental noise collected from device drivers, user input latency, or jitter
from one or more hardware components. This is the core of the cryptographically
secure pseudo-random number generators.

## The seed

The seed is a value which initializes the random number generator. Random number
generators produce values by performing some operation on a previously generated
value. When the algorithm starts, the seed is the initial value on which the
generator operates. The crutial part of the generators is to provide a seed that
is close to a truly random number.

let rnd = Random()

The constructor creates a random number generator with a default seed.

**Note: ** Since 2016, in .NET Core the default seed has been
changed from Environment.TickCount to Guid.NewGuid().GetHashCode(). It is safe
to create several random instances in a loop.

## F# Random Next

The Next function returns a random integer. We can specify the
lower and upper limits for the random numbers. 

main.fsx
  

open System

let rnd = new Random()

for _ in 1..20 do
    let r = rnd.Next(1, 100)
    printf "%d " r

printfn ""

In the program, we produce 20 random integers.

open System

The Random class resides in the System namespace.

let r = rnd.Next(1, 100)

The lower bound is inclusive, the upper bound is exclusive.

λ dotnet fsi main.fsx
29 41 92 36 10 4 41 18 17 62 9 60 58 69 11 4 44 12 31 98 

## F# pick random element

In the following example, we pick a random element from a list. 

main.fsx
  

open System

let words = ["sky"; "cup"; "tall"; "falcon"; "cloud"]

let rnd = Random()
let re = words |&gt; List.item (rnd.Next(words.Length))

printfn "%s" re

In the program, we pick a random string from a list of words.

let re = words |&gt; List.item (rnd.Next(words.Length))

We pass a random index to the List.item function. The upper bound 
of the Next function is the list size.

λ dotnet fsi main.fsx
cloud

The next example selects a few random values.

main.fsx
  

open System

let rnd = new Random()

let vals = [ 1..100 ]
let idx = [ for _ in 1..7 -&gt; rnd.Next(0, 100) ]

let res = idx |&gt; List.map (fun e -&gt; (List.item e vals))
printfn "%A" res

We select seven values randomly from a list of integers.

let vals = [ 1..100 ]

Using the range operator, we create a list of integers from 1 to 100.

let idx = [ for _ in 1..7 -&gt; rnd.Next(0, 100) ]

In the second step, we generate seven random indexes.

let res = idx |&gt; List.map (fun e -&gt; (List.item e vals))

With List.map and List.item, we select the seven 
values from the vals list using the generated random indexes.

λ dotnet fsi main.fsx
[84; 11; 68; 29; 87; 34; 61]

## F# generate a list of random values

In the next example, we create a new list of random values.

main.fsx
  

open System

let rnd = Random()

let rndVals =
    [ for i in 0..100 do
          rnd.Next(1, 101) ]

printfn "%A" rndVals

A list of one hundred random integers from 1 to 100 is created.

let rndVals =
    [ for i in 0..100 do
          rnd.Next(1, 101) ]

The list is created with a F# list comprehension.

λ dotnet fsi main.fsx
[79; 7; 33; 66; 85; 44; 31; 97; 3; 43; 93; 53; 45; 68; 83; 46; 59; 58; 17; 63;
 80; 94; 98; 11; 65; 82; 41; 49; 100; 58; 54; 88; 53; 88; 50; 8; 55; 11; 21; 42;
 20; 17; 41; 51; 98; 90; 32; 51; 60; 15; 65; 94; 78; 32; 49; 5; 28; 38; 39; 12;
 43; 45; 5; 34; 67; 34; 96; 53; 86; 83; 75; 81; 88; 55; 25; 87; 47; 74; 54; 11;
 93; 31; 97; 49; 32; 31; 29; 95; 87; 78; 44; 31; 33; 66; 38; 74; 50; 1; 9; 51;
 ...]

In the next example, we create a list of random choices.

main.fsx
  

open System

type Choice =
    | A
    | B
    | C

let getVal () =
    match Random().Next(1, 4) with
    | 1 -&gt; A
    | 2 -&gt; B
    | _ -&gt; C

let chx = [ for _ in 1..7 -&gt; getVal () ]
printfn "%A" chx

The program generates a list of randomly selected custom types.

type Choice =
| A
| B
| C

With a discriminated union, we define a custom Choice type. We want
a random list of these types.

let getVal () =
    match Random().Next(1, 4) with
    | 1 -&gt; A
    | 2 -&gt; B
    | _ -&gt; C

We define a function that uses a match expresssion and the Next
function to get a new random Choice value.

let chx = [ for _ in 1..7 -&gt; getVal () ]

The getVal functio is called in the list comprehension to build a 
new random list of choicese

λ dotnet fsi main.fsx
[B; C; C; C; C; C; A]

## F# random endless sequence

The following example picks some random values from an endless random sequence.

main.fsx
  

open System

let rnd = Random()

let randomVals =
    seq {
        while true do
            yield rnd.Next(100)
    }

let firstTenRandom =
    randomVals
    |&gt; Seq.truncate 10
    |&gt; Seq.sort
    |&gt; Seq.toList

printfn "%A" firstTenRandom

We define an endless sequence of random integers between 1 and 100. From 
this sequence, we pick ten values.

let randomVals =
    seq {
        while true do
            yield rnd.Next(100)
    }

The while loop is used to create an endless sequence. The
yield returns a new item for each cycle.

let firstTenRandom =
    randomVals
    |&gt; Seq.truncate 10
    |&gt; Seq.sort
    |&gt; Seq.toList

With Seq.truncate, we get ten values from the sequence. We sort the
values with Seq.sort and transform into list with
Seq.toList.

λ dotnet fsi main.fsx
[15; 51; 52; 61; 77; 77; 78; 81; 87; 90]

In this article we have generated random values in F# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.