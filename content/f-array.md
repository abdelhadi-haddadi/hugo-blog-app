+++
title = "F# array"
date = 2025-08-29T19:54:29.602+01:00
draft = false
description = "Explore arrays in F#. This tutorial demonstrates how to use fixed-size collections in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# array

last modified May 1, 2025

In this article, we show how to work with arrays in F#.

An array is a fixed-size, zero-based, mutable collection of
consecutive elements. The elements are of the same data type.

let vals = [| 1; 2; 3; 4; 5 |]

An array can be created using an *array literal*. An array literal
consists of elements separated with semicolons between [| and
|].

let vals = [|
    1
    2
    3
    4
    5
|]

In an alternative syntax, the semicolons are optional.

## F# array simple example

The following is a simple array example.

main.fsx
  

let vals = [| 1; 2; 3; 4; 5; 6 |]

printfn "%A" vals
printfn "%d" vals.Length

We have an array of integers. We print the contents of the array and then the
size of the array.

let vals = [| 1; 2; 3; 4; 5; 6 |]

We define a new array of integers with an array literal.

printfn "%A" vals

With the %A format specifier, we pretty-print the array.

printfn "%d" vals.Length

We get the size of an array with Length.

λ dotnet fsi main.fsx
[|1; 2; 3; 4; 5; 6|]
6

## F# array head &amp; tail

In the next example, we get the head and tail of an array.

main.fsx
  

let vals = [| 1; 2; 3; 4; 5; 6 |]

printfn "%d" (Array.head vals)
printfn "%A" (Array.tail vals)

We print the head and tail of the array of integers.

printfn "%d" (Array.head vals)

The Array.head prints the first element of the array.

printfn "%A" (Array.tail vals)

With Array.tail function, we get all but first elements (the tail)
of the given array.

λ dotnet fsi main.fsx
[|2; 3; 4; 5; 6|]
1
[|2; 3; 4; 5; 6|]

## F# array iteration

In the next example, we loop over the elements of an array.

main.fsx
  

let vals = [| 1; 2; 3; 4; 5; 6 |]

vals |&gt; Array.iter (printfn "%d")

printfn "------------------------"

for e in vals do
    printfn "%d" e

There are two basic ways of array iteration.

vals |&gt; Array.iter (printfn "%d")

The Array.iter is the functional way of looping over array
elements.

for e in vals do
    printfn "%d" e

The classic, imperative way is via a for loop.

λ dotnet fsi main.fsx
1
2
3
4
5
6
------------------------
1
2
3
4
5
6

## F# array indexes

Array elements are accessed through their indexes.

main.fsx
  

let words = [| "pen"; "cup"; "dog"; "person";
    "cement"; "coal"; "spectacles"; "cup"; "bread" |]

let w1 = Array.item 1 words
printfn "%s" w1

let w2 = words[0]
printfn "%s" w2

let i1 = Array.findIndex(fun e -&gt; e = "cup") words
printfn $"The first index of cup is {i1}"

let i2 = Array.findIndexBack(fun e -&gt; e = "cup") words
printfn $"The last index of cup is {i2}"

The program contains array indexing operations.

let w1 = Array.item 1 words

We get the second item of the array with Array.item.

let w2 = words[0]

We can also use the classic C style syntax.

let i1 = Array.findIndex(fun e -&gt; e = "cup") words

Fith Array.findIndex, we find the first element that satisfies the
given predicate function.

let i2 = Array.findIndexBack(fun e -&gt; e = "cup") words

Fith Array.findIndexBack, we find the last element that satisfies
the given predicate function.

λ dotnet fsi main.fsx
cup
pen
The first index of cup is 1
The last index of cup is 7

## F# array modify elements

We can modify array elements with &lt;- or Array.set.

main.fsx
  

let words = [| "pen"; "cup"; "dog"; "person";
    "cement"; "coal"; "spectacles"; "cup"; "bread" |]

printfn "%A" words

words[0] &lt;- "pencil"
Array.set words 6 "specs"

printfn "%A" words

We have an array of strings. We modify the first and the sixth element.

λ dotnet fsi main.fsx
[|"pen"; "cup"; ... "coal"; "spectacles"; "cup"; "bread"|]
[|"pencil"; "cup"; ... "coal"; "specs"; "cup"; "bread"|]

## F# two-dimensional arrays

Two-dimensional arrays can be created with array2D operator.

main.fsx
  

let vals = array2D [ [ 1; 2; 3]; [4; 5; 6]; [7; 8; 9] ]

printfn "%A" vals
printfn "%d" vals[0, 0]
printfn "%A" vals[0, 0..2]
printfn "%A" vals[0..2, 0]

We create a two-dimensional array of integers.

printfn "%d" vals[0, 0]

We get the first element of the first row.

printfn "%d" vals[1, 2]

We get the third element of the second row.

printfn "%A" vals[0, 0..2]

We get the first row.

printfn "%A" vals[0..2, 0]

We get the first column.

λ dotnet fsi main.fsx
[[1; 2; 3]
 [4; 5; 6]
 [7; 8; 9]]
1
6
[|1; 2; 3|]
[|1; 4; 7|]

## F# Array.map

The Array.map function applies the given function to each of the
elements of the collection.

main.fsx
  

let vals = [| 1..10 |]

let res = Array.map(fun e -&gt; e * 2) vals
printfn "%A" res

We apply a map function on an array of integers.

let vals = [| 1..10 |]

We define an array with a range operator.

let res = Array.map(fun e -&gt; e * 2) vals

Each of the elements of the array is multiplied by 2. The result is assigned
to the res variable.

λ dotnet fsi main.fsx
[|2; 4; 6; 8; 10; 12; 14; 16; 18; 20|]

## F# Array.filter

We can filter array elements with Array.filter.

main.fsx
  

let vals = [| -3; -2; 0; 1; -5; 7; 9 |]
let words = [| "sky"; "war"; "rock"; "ocean"; "cloud"; "water" |]

let pos = Array.filter(fun e -&gt; e &gt; 0) vals
printfn "%A" pos

let res = Array.filter(fun (e:string) -&gt; e.StartsWith("w")) words
printfn "%A" res

In the program, we find out all positive numbers from an array of integers and
all strings which start with 'w' in an array of words.

let pos = Array.filter(fun e -&gt; e &gt; 0) vals

The Array.filter function takes a predicate function. All elements
must satisfy the given predicate.

let res = Array.filter(fun (e:string) -&gt; e.StartsWith("w")) words

Sometimes, it is necessary to help the compiler with an explicitly type
definition.

λ dotnet fsi main.fsx
[1; 7; 9]
["war"; "water"]

## F# merging arrays

Arrays can be merged with Array.concat or with an array
comprehension. Array.unique returns an array that contains no
duplicate entries.

main.fsx
  

let a = [| 1; 2; 3; 4 |]
let b = [| 4; 4; 5; 6 |]

let d = Array.concat [a; b] 
let c = Array.distinct d

let e = [| yield! a; yield! b |]
let f = Array.distinct e

printfn "%A" c
printfn "%A" d
printfn "%A" e
printfn "%A" f

The program merges two arrays.

let d = Array.concat [a; b]

We merge two arrays with Array.concat.

let c = Array.distinct d

The duplicates are removed with Array.distinct.

let e = [| yield! a; yield! b |]

The yield! inserts all the items of another sequence into this
sequence being built.

λ dotnet fsi main.fsx
[|1; 2; 3; 4; 5; 6|]
[|1; 2; 3; 4; 4; 4; 5; 6|]
[|1; 2; 3; 4; 4; 4; 5; 6|]
[|1; 2; 3; 4; 5; 6|]

## F# sort array of integers

In the next example, we sort integers.

main.fsx
  

let nums = [| -1; 6; -2; 3; 0; -4; 5; 1; 2 |]

nums |&gt; Array.sort |&gt; printfn "%A"
nums |&gt; Array.sortDescending |&gt; printfn "%A"

nums |&gt; Array.sortBy (abs) |&gt; printfn "%A"
nums |&gt; Array.sortByDescending (abs) |&gt; printfn "%A"

We have an array of integers. We sort them with Array.sort and
Array.sortDescending.

nums |&gt; Array.sortBy (abs) |&gt; printfn "%A"
nums |&gt; Array.sortByDescending (abs) |&gt; printfn "%A"

With the help of the abs, we sort integers regarless of their sign.

λ dotnet fsi main.fsx
[|-4; -2; -1; 0; 1; 2; 3; 5; 6|]
[|6; 5; 3; 2; 1; 0; -1; -2; -4|]
[|0; -1; 1; -2; 2; 3; -4; 5; 6|]
[|6; 5; -4; 3; -2; 2; -1; 1; 0|]

## F# sort Array of records

In the next example, we sort an array of records.

main.fsx
  

type User =
    { Name: string
      Occupation: string
      Salary: int }

let users =
    [| { Name = "John Doe"
         Occupation = "gardener"
         Salary = 1280 }
       { Name = "Roger Roe"
         Occupation = "driver"
         Salary = 860 }
       { Name = "Tom Brown"
         Occupation = "shopkeeper"
         Salary = 990 } |]

users
|&gt; Array.sortBy (fun u -&gt; u.Salary)
|&gt; Array.iter (fun u -&gt; printfn "%A" u)

printfn "--------------------------------"

users
|&gt; Array.sortByDescending (fun u -&gt; u.Occupation)
|&gt; Array.iter (fun u -&gt; printfn "%A" u)

The program contains an array of User records. We sort the users
by their salaries and occupation.

users
|&gt; Array.sortBy (fun u -&gt; u.Salary)
|&gt; Array.iter (fun u -&gt; printfn "%A" u)

The users are sorted by salaries in ascending order with
Array.sortBy.

users
|&gt; Array.sortByDescending (fun u -&gt; u.Occupation)
|&gt; Array.iter (fun u -&gt; printfn "%A" u)

Here, the users are sorted by their occupation in descending order with
sortByDescending.

λ dotnet fsi main.fsx
{ Name = "Roger Roe"
  Occupation = "driver"
  Salary = 860 }
{ Name = "Tom Brown"
  Occupation = "shopkeeper"
  Salary = 990 }
{ Name = "John Doe"
  Occupation = "gardener"
  Salary = 1280 }
--------------------------------
{ Name = "Tom Brown"
  Occupation = "shopkeeper"
  Salary = 990 }
{ Name = "John Doe"
  Occupation = "gardener"
  Salary = 1280 }
{ Name = "Roger Roe"
  Occupation = "driver"
  Salary = 860 }

## F# array comprehension

Array comprehension is a powerful syntax to generate arrays. Array
comprehensions provide a concise way to create arrays.

In F#, we can create array comprehensions with ranges and generators.

main.fsx
  

let vals = [| -1; 0; 2; -2; 1; 3; 4; -6 |]

let pos =
    [| for e in vals do
          if e &gt; 0 then yield e |]

printfn "%A" pos

printfn "---------------------------------"

[| for e in 1 .. 100 -&gt; e * e |] |&gt; printfn "%A"

printfn "---------------------------------"

[| for a in 1 .. 100 do
    if a % 3 = 0 &amp;&amp; a % 5 = 0 then yield a|] |&gt; printfn "%A"

printfn "---------------------------------"

let vals3 =
    [| for x in 1 .. 3 do
          for y in 1 .. 10 -&gt; x, y |]

printfn "%A" vals3

In F#, array comprehensions use for loops, if conditions and the yield keyword.

let vals = [| -1; 0; 2; -2; 1; 3; 4; -6 |]

let pos =
    [| for e in vals do
          if e &gt; 0 then yield e |]

We have aan array of values. A new array is constructed with an array
comprehension. It contains only positive values.

[| for e in 1 .. 100 -&gt; e * e |] |&gt; printfn "%A"

We can use ranges in array comprehensions.

[| for a in 1 .. 100 do
    if a % 3 = 0 &amp;&amp; a % 5 = 0 then yield a|] |&gt; printfn "%A"

Here we use two if conditions.

let vals3 =
    [| for x in 1 .. 3 do
          for y in 1 .. 10 -&gt; x, y |]

Also, it is possible to use two for loops.

λ dotnet fsi main.fsx
[2; 1; 3; 4]
---------------------------------
[1; 4; 9; 16; 25; 36; 49; 64; 81; 100; 121; 144; 169; 196; 225; 256; 289; 324;
 361; 400; 441; 484; 529; 576; 625; 676; 729; 784; 841; 900; 961; 1024; 1089;
 1156; 1225; 1296; 1369; 1444; 1521; 1600; 1681; 1764; 1849; 1936; 2025; 2116;
 2209; 2304; 2401; 2500; 2601; 2704; 2809; 2916; 3025; 3136; 3249; 3364; 3481;
 3600; 3721; 3844; 3969; 4096; 4225; 4356; 4489; 4624; 4761; 4900; 5041; 5184;
 5329; 5476; 5625; 5776; 5929; 6084; 6241; 6400; 6561; 6724; 6889; 7056; 7225;
 7396; 7569; 7744; 7921; 8100; 8281; 8464; 8649; 8836; 9025; 9216; 9409; 9604;
 9801; 10000]
---------------------------------
[15; 30; 45; 60; 75; 90]
---------------------------------
[(1, 1); (1, 2); (1, 3); (1, 4); (1, 5); (1, 6); (1, 7); (1, 8); (1, 9); (1, 10);
 (2, 1); (2, 2); (2, 3); (2, 4); (2, 5); (2, 6); (2, 7); (2, 8); (2, 9); (2, 10);
 (3, 1); (3, 2); (3, 3); (3, 4); (3, 5); (3, 6); (3, 7); (3, 8); (3, 9); (3, 10)]

In this article we have worked with arrays in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.