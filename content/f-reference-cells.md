+++
title = "F# reference cells"
date = 2025-08-29T19:54:32.939+01:00
draft = false
description = "Learn about reference cells in F#. This tutorial explains how to create and use reference cells for mutable state in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# reference cells

last modified May 3, 2025

In this article, we explore reference cells in F#. Reference cells provide a way
to handle mutable state while maintaining functional programming principles.

A reference cell is a special container that holds a mutable value.
Unlike regular mutable variables, reference cells are first-class values that
can be passed around and stored in data structures. They are created with the
ref function, accessed with !, and modified with
:=. Reference cells are particularly useful when you need mutable
state in otherwise immutable functional code.

## F# reference cell basic example

This example shows the basic operations with reference cells.

basic.fsx
  

let counter = ref 0
printfn "Initial value: %d" !counter

counter := !counter + 1
printfn "After increment: %d" !counter

counter := !counter + 1
printfn "After second increment: %d" !counter

We create a reference cell, then modify and access its contents.

let counter = ref 0

Creates a reference cell initialized with value 0. The ref function wraps the
value in a mutable container.

!counter

The ! operator dereferences the cell to access its contained value.

counter := !counter + 1

The := operator updates the reference cell's value. We must first dereference
the current value before incrementing it.

λ dotnet fsi basic.fsx
Initial value: 0
After increment: 1
After second increment: 2

## F# reference cell type annotation

Reference cells can have explicit type annotations for their contained values.

typed.fsx
  

let message: string ref = ref "hello"
let count: int ref = ref 0
let active: bool ref = ref true

printfn "Message: %s" !message
printfn "Count: %d" !count
printfn "Active: %b" !active

message := "world"
count := 42
active := false

printfn "After modification:"
printfn "Message: %s" !message
printfn "Count: %d" !count
printfn "Active: %b" !active

We create three typed reference cells, print their initial values, modify them,
and print again.

let message: string ref = ref "hello"

The type annotation string ref specifies this reference cell holds a string.

λ dotnet fsi typed.fsx
Message: hello
Count: 0
Active: true
After modification:
Message: world
Count: 42
Active: false

## F# reference cell in functions

Reference cells can be passed to and returned from functions.

functions.fsx
  

let increment (cell: int ref) =
    cell := !cell + 1

let createCounter initialValue =
    ref initialValue

let counter = createCounter 10
printfn "Initial: %d" !counter

increment counter
printfn "After increment: %d" !counter

increment counter
printfn "After second increment: %d" !counter

We demonstrate using reference cells with functions by creating a counter factory
and an increment function.

let increment (cell: int ref) =
    cell := !cell + 1

A function that takes a reference cell and modifies its contents.

let createCounter initialValue =
    ref initialValue

A function that creates and returns a new reference cell.

λ dotnet fsi functions.fsx
Initial: 10
After increment: 11
After second increment: 12

## F# reference cell vs mutable variable

This example compares reference cells with regular mutable variables.

comparison.fsx
  

let mutable mvar = 0
let rvar = ref 0

printfn "mutable: %d, reference: %d" mvar !rvar

mvar &lt;- mvar + 1
rvar := !rvar + 1

printfn "After increment:"
printfn "mutable: %d, reference: %d" mvar !rvar

let modifyMutable x = x + 1
let modifyReference (x: int ref) = x := !x + 1

mvar &lt;- modifyMutable mvar
modifyReference rvar

printfn "After function calls:"
printfn "mutable: %d, reference: %d" mvar !rvar

We show the key differences between mutable variables and reference cells.

let modifyMutable x = x + 1
let modifyReference (x: int ref) = x := !x + 1

Reference cells can be modified inside functions, while mutable variables
require the mutable value to be returned.

λ dotnet fsi comparison.fsx
mutable: 0, reference: 0
After increment:
mutable: 1, reference: 1
After function calls:
mutable: 2, reference: 2

## F# reference cell in data structures

Reference cells can be stored in lists and other data structures.

structures.fsx
  

let counters = [ref 1; ref 2; ref 3; ref 4; ref 5]

printfn "Initial values:"
counters |&gt; List.iter (fun x -&gt; printf "%d " !x)
printfn ""

counters |&gt; List.iter (fun x -&gt; x := !x * 2)

printfn "After modification:"
counters |&gt; List.iter (fun x -&gt; printf "%d " !x)
printfn ""

We create a list of reference cells, print their initial values, modify them,
and print again.

let counters = [ref 1; ref 2; ref 3; ref 4; ref 5]

Creates a list where each element is a separate reference cell.

counters |&gt; List.iter (fun x -&gt; x := !x * 2)

Doubles the value in each reference cell in the list.

λ dotnet fsi structures.fsx
Initial values:
1 2 3 4 5 
After modification:
2 4 6 8 10 

## F# reference cell with records

Reference cells can be used within record types for mutable fields.

records.fsx
  

type Counter = 
    { Name: string
      Count: int ref }

let createCounter name initialValue =
    { Name = name
      Count = ref initialValue }

let incrementCounter counter =
    counter.Count := !counter.Count + 1
    printfn "%s: %d" counter.Name !counter.Count

let c1 = createCounter "First" 0
let c2 = createCounter "Second" 10

incrementCounter c1
incrementCounter c2
incrementCounter c1
incrementCounter c2

We create a record type with a reference cell field and functions to work with it.

type Counter = 
    { Name: string
      Count: int ref }

The Count field is a reference cell allowing mutation while the record remains
immutable.

λ dotnet fsi records.fsx
First: 1
Second: 11
First: 2
Second: 12

## F# reference cell in closures

Reference cells maintain their state across function calls in closures.

closures.fsx
  

let makeCounter() =
    let count = ref 0
    fun () -&gt; 
        count := !count + 1
        !count

let counter1 = makeCounter()
let counter2 = makeCounter()

printfn "Counter1: %d" (counter1())
printfn "Counter1: %d" (counter1())
printfn "Counter2: %d" (counter2())
printfn "Counter1: %d" (counter1())
printfn "Counter2: %d" (counter2())

We demonstrate stateful closures using reference cells to create counters.

let makeCounter() =
    let count = ref 0
    fun () -&gt; 
        count := !count + 1
        !count

Each call to makeCounter creates a new reference cell captured in the closure.

λ dotnet fsi closures.fsx
Counter1: 1
Counter1: 2
Counter2: 1
Counter1: 3
Counter2: 2

## F# reference cell limitations

This example shows some limitations and considerations when using reference cells.

limitations.fsx
  

let cell = ref "hello"

// This works
cell := "world"
printfn "%s" !cell

// This would cause a compilation error
// cell := 42  // Type mismatch

// Need to dereference to use the value
let length = String.length !cell
printfn "Length: %d" length

// Reference cells can be compared by reference
let cell2 = ref "world"
printfn "Same contents: %b" (!cell = !cell2)
printfn "Same reference: %b" (cell = cell2)

We demonstrate type safety, dereferencing needs, and reference comparison.

// cell := 42  // Type mismatch

Reference cells are type-safe - you can't change the type of the contained value.

printfn "Same reference: %b" (cell = cell2)

Reference cells are compared by reference, not by their contents.

λ dotnet fsi limitations.fsx
world
Length: 5
Same contents: true
Same reference: false

In this article we have explored reference cells in F#. They provide a powerful
way to handle mutable state while maintaining functional programming principles.

  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.