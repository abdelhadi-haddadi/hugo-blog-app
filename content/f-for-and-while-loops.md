+++
title = "F# for and while loops"
date = 2025-08-29T19:54:30.699+01:00
draft = false
description = "Understand loops in F#. This tutorial covers for and while loops and their applications in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# for and while loops

last modified May 1, 2025

In this article, we show how to work with for and while loops in F#.

Loops are used to repeatedly execute a block of code. There are two kinds of
loops: for and while.

## F# for in loop

With for in loop, we go through a sequnce of values one by one.

main.fsx
  

let vals = seq { 1..5 }

for e in vals do
    printfn "%d" e

printfn "--------------------"

let len = Seq.length (vals) - 1

for idx in 0..len do
    printfn "%d" (Seq.item idx vals)

In the program, we loop over a sequence of integers.

let vals = seq { 1..5 }

With seq, we define a sequence of five integers.

for e in vals do
    printfn "%d" e

We loop over the sequence and print each number.

let len = Seq.length (vals) - 1

for idx in 0..len do
    printfn "%d" (Seq.item idx vals)

In this code, we loop over a range of numbers. The values of the range are used
as indexes to the sequence.

λ dotnet fsi main.fsx
1
2
3
4
5
--------------------
1
2
3
4
5

## F# for to/downto

With to and downto keywords, we can iterate over 
a range of values.

main.fsx
  

for e = 1 to 5 do
    printfn "%d" e

for e = 5 downto 1 do
    printfn "%d" e

The program loops over a range of 1..5 and 5..1 values.

λ dotnet fsi main.fsx
1
2
3
4
5
5
4
3
2
1

## F# execute n times

A common task in programming is to execute something n times. We can do it 
with a for loop and a range.

main.fsx
  

for _ in 0..5 do 
    printfn "%s" "falcon"

In the  program, we print the word "falcon" six times. Since we do not need 
the values of the range, we use the _ operator.

λ dotnet fsi main.fsx
falcon
falcon
falcon
falcon
falcon
falcon

## F# for in loop with range

Range operators can be used in a for loop.

main.fsx
  

for e in 1..2..10 do
    printfn "%d" e

for e in 10..-2..0 do
    printfn "%d" e

We can create ascending and descending ranges of values with different steps.

λ dotnet fsi main.fsx
1
3
5
7
9
10
8
6
4
2
0

## F# nested for loops

For loops can be nested.

main.fsx
  

for i in [1; 2; 3; 4; 5; 6; 7; 6; 5; 4; 3; 2; 1] do
    for _ in 1..i do
        printf "*"
    printf "\n"

With two for loops, we create a rectangle using * characters. For each cycle of 
an outer loop, the inner loop is executed n times.

λ dotnet fsi main.fsx
*
**
***
****
*****
******
*******
******
*****
****
***
**
*

## F# for loop with functions

For loops are in fact expressions. 

main.fsx
  

open System

let rand1 () =
    Random(DateTime.Now.Millisecond).NextInt64(1, 10)

let rand2 () =
    Random(DateTime.Now.Millisecond).NextInt64(10, 20)

for e in rand1 () .. rand2 () do
    printfn "%d" e

printfn "--------------------------------"

for e = int (rand1 ()) to int (rand2 ()) do
    printfn "%d" e

In the example, we use the computed random values in a for range.

let rand1 () =
    Random(DateTime.Now.Millisecond).NextInt64(1, 10)

With random, we generate a random number between 1 and 10.

for e in rand1 () .. rand2 () do
    printfn "%d" e

The returned values of the two functions are used to generate a random range 
of values.

λ dotnet fsi main.fsx
2
3
4
5
6
7
8
9
10
11
--------------------------------
6
7
8
9
10
11
12
13
14
15

## F# while loop

A while loop is a control flow statement that allows code to be executed
repeatedly based on a given boolean condition. 

main.fsx
  

let vals = [ 1; 2; 3; 4; 5 ]

let mutable i = 0

while i &lt; vals.Length do
    printfn "%d" val[i]
    i &lt;- i + 1

In this while loop, we loop over the list elements in a classic imperative way.

## F# funcional iteration

The for and while loops are used to create imperative loops. Functional
languages often prefer to iterate over sequences with functions.

main.fsx
  

let vals = [ 1; 2; 3; 4; 5 ]

List.iter (printfn "%d") vals

For instance, F# has List.iter to go over the elements of a list.

In this article we have worked with for and while loops in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.