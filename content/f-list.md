+++
title = "F# List"
date = 2025-08-29T19:54:30.717+01:00
draft = false
description = "Explore lists in F# and learn how to create, modify, and work with ordered collections using functional programming techniques. This tutorial covers essential list operations and best practices for efficient data handling in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# List

last modified May 1, 2025

This article demonstrates how to work with the List collection in F#.

A list in F# is an ordered, immutable sequence of elements, all of
the same type. Lists are fundamental in functional programming and provide a
convenient way to handle ordered collections without modifying their contents.

A list can be created using a *list literal*, where elements are
separated by semicolons and enclosed in square brackets:

let vals = [ 1; 2; 3; 4; 5 ]

Alternatively, F# allows a more readable syntax where semicolons are omitted,
and each element is placed on a new line inside square brackets:

let vals = [
    1
    2
    3
    4
    5
]

Both syntaxes are valid, but the second format improves readability, especially
for longer lists. Since lists in F# are immutable, any modifications require
creating a new list rather than altering an existing one.

Lists in F# support various operations, including filtering, mapping, and
folding, which allow developers to process data efficiently. Functions like
List.map apply transformations to each element, while
List.filter selects elements based on specific criteria. These
operations embrace functional programming principles by emphasizing the use of
pure functions to modify data.

Additionally, lists can be recursively processed, making them suitable for
algorithms that require iteration without traditional loops. The combination of
immutability, built-in list functions, and pattern matching makes F# lists a
powerful tool for handling ordered collections with ease.

## F# List simple example

The following is a simple list example.

main.fsx
  

let vals = [ 1; 2; 3; 4; 5; 6 ]

printfn "%A" vals
printfn "%d" vals.Head
printfn "%d" vals.Length
printfn "%A" vals.Tail

We have a list of integers. We print the contents of the list, its head, size,
and tail.

let vals = [ 1; 2; 3; 4; 5; 6 ]

We define a list of integers with an array literal.

printfn "%A" vals

With the %A format specifier, we pretty-print the list.

printfn "%d" vals.Head

With the Head property, we print the first element of the list.

printfn "%d" vals.Length

We get the size of a list with Length.

printfn "%A" vals.Tail

With Tail, we get all but first elements of the list.

λ dotnet fsi main.fsx
[1; 2; 3; 4; 5; 6]
1
6
[2; 3; 4; 5; 6]

## F# List iteration

In the next example, we loop over the elements of a list.

main.fsx
  

let vals = [ 1; 2; 3; 4; 5; 6 ]

vals |&gt; List.iter (printfn "%d")

printfn "------------------------"

for e in vals do
    printfn "%d" e

We provide two basic ways of iteration.

vals |&gt; List.iter (printfn "%d")

The List.iter is the functional way of looping over list elements.

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

## F# List indexes

List elements are accessed through their indexes.

main.fsx
  

let words = ["pen"; "cup"; "dog"; "person";
    "cement"; "coal"; "spectacles"; "cup"; "bread"]

let w1 = List.item 1 words
printfn "%s" w1

let w2 = words[0]
printfn "%s" w2

let i1 = List.findIndex(fun e -&gt; e = "cup") words
printfn $"The first index of cup is {i1}"

let i2 = List.findIndexBack(fun e -&gt; e = "cup") words
printfn $"The last index of cup is {i2}"

The program contains List indexing operations.

let w1 = List.item 1 words

We get the second item of the list with List.item.

let w2 = words[0]

We can also use the classic C style syntax.

let i1 = List.findIndex(fun e -&gt; e = "cup") words

Fith List.findIndex, we find the first element that satisfies the
given predicate function.

let i2 = List.findIndexBack(fun e -&gt; e = "cup") words

Fith List.findIndexBack, we find the last element that satisfies
the given predicate function.

λ dotnet fsi main.fsx
cup
pen
The first index of cup is 1
The last index of cup is 7

## F# List.map

The List.map function applies the given function to each of the
elements of the collection.

main.fsx
  

let vals = [1..10]

let res = List.map(fun e -&gt; e * 2) vals
printfn "%A" res

We apply a map function on a list of integers.

let vals = [ 1 .. 10]

We define a list with a range operator.

let res = List.map(fun e -&gt; e * 2) vals

Each of the elements of the list is multiplied by 2. The result is assigned
to the res variable.

λ dotnet fsi main.fsx
[2; 4; 6; 8; 10; 12; 14; 16; 18; 20]

## F# List.filter

We can filter list elements with List.filter.

main.fsx
  

let vals = [-3; -2; 0; 1; -5; 7; 9]
let words = ["sky"; "war"; "rock"; "ocean"; "cloud"; "water"]

let pos = List.filter(fun e -&gt; e &gt; 0) vals
printfn "%A" pos

let res = List.filter(fun (e:string) -&gt; e.StartsWith("w")) words
printfn "%A" res

In the program, we find out all positive numbers from a list of integers and
all strings which start with 'w' in a list of words.

let pos = List.filter(fun e -&gt; e &gt; 0) vals

The List.filter function takes a predicate function. All elements
must satisfy the given predicate.

let res = List.filter(fun (e:string) -&gt; e.StartsWith("w")) words

Sometines, it is necessary to help the compiler with an explicity type
definition.

λ dotnet fsi main.fsx
[1; 7; 9]
["war"; "water"]

## List.zip

The List.zip function combines the two lists into a list of pairs.
The two lists must have equal lengths.

main.fsx
  

let words = ["sky"; "cup"; "rock"; "pen"; "pearl"; "cloud"]
let n = words.Length
let idxs = [1..n]

let data = List.zip idxs words
printfn "%A" data

printfn "-----------------"

let m = data |&gt; Map.ofList
m |&gt; Map.iter (fun k v -&gt; printfn $"{k}: {v}");

We combine a list of strings with a list of integers. Then we convert the list 
into a map.

λ dotnet fsi main.fsx
[(1, "sky"); (2, "cup"); (3, "rock"); (4, "pen"); (5, "pearl"); (6, "cloud")]
-----------------
1: sky
2: cup
3: rock
4: pen
5: pearl
6: cloud

## F# merging lists

With the @ operator, we can merge two lists.

main.fsx
  

let a = [1; 2; 3; 4]
let b = [4; 4; 5; 6]

let merged = a @ b |&gt; List.distinct
printfn "%A" merged

let merged2 = a @ b
printfn "%A" merged2

The program merges two lists.

let merged = a @ b |&gt; List.distinct

We merge two lists and pass the values to List.distinct, which
removes duplicates.

let merged2 = a @ b

We merge two lists; we have all values, including duplicates.

λ dotnet fsi main.fsx
[1; 2; 3; 4; 5; 6]
[1; 2; 3; 4; 4; 4; 5; 6]

## F# sort List of integers

In the next example, we sort integers.

main.fsx
  

let nums = [ -1; 6; -2; 3; 0; -4; 5; 1; 2 ]

nums |&gt; List.sort |&gt; printfn "%A"
nums |&gt; List.sortDescending |&gt; printfn "%A"

nums |&gt; List.sortBy (abs) |&gt; printfn "%A"
nums |&gt; List.sortByDescending (abs) |&gt; printfn "%A"

We have a list of integers. We sort them with List.sort and
List.sortDescending.

nums |&gt; List.sortBy (abs) |&gt; printfn "%A"
nums |&gt; List.sortByDescending (abs) |&gt; printfn "%A"

With the help of the abs, we sort integers regarless of their sign.

λ dotnet fsi main.fsx
[-4; -2; -1; 0; 1; 2; 3; 5; 6]
[6; 5; 3; 2; 1; 0; -1; -2; -4]
[0; -1; 1; -2; 2; 3; -4; 5; 6]
[6; 5; -4; 3; -2; 2; -1; 1; 0]

## F# sort List of records

In the next example, we sort a list of records.

main.fsx
  

type User =
    { Name: string
      Occupation: string
      Salary: int }

let users =
    [ { Name = "John Doe"
        Occupation = "gardener"
        Salary = 1280 }
      { Name = "Roger Roe"
        Occupation = "driver"
        Salary = 860 }
      { Name = "Tom Brown"
        Occupation = "shopkeeper"
        Salary = 990 } ]

users
|&gt; List.sortBy (fun u -&gt; u.Salary)
|&gt; List.iter (fun u -&gt; printfn "%A" u)

printfn "--------------------------------"

users
|&gt; List.sortByDescending (fun u -&gt; u.Occupation)
|&gt; List.iter (fun u -&gt; printfn "%A" u)

The program contains a list of User records. We sort the users
by their salaries and occupation.

users
|&gt; List.sortBy (fun u -&gt; u.Salary)
|&gt; List.iter (fun u -&gt; printfn "%A" u)

The users are sorted by salaries in ascending order with
List.sortBy.

users
|&gt; List.sortByDescending (fun u -&gt; u.Occupation)
|&gt; List.iter (fun u -&gt; printfn "%A" u)

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

## F# List comprehension

List comprehension is a powerful syntax to generate lists. List comprehensions
provide a concise way to create lists.

In F#, we can create list comprehensions with ranges and generators.

main.fsx
  

let vals = [ -1; 0; 2; -2; 1; 3; 4; -6 ]

let pos =
    [ for e in vals do
          if e &gt; 0 then yield e ]

printfn "%A" pos

printfn "---------------------------------"

[ for e in 1 .. 100 -&gt; e * e ] |&gt; printfn "%A"

printfn "---------------------------------"

[ for a in 1 .. 100 do
    if a % 3 = 0 &amp;&amp; a % 5 = 0 then yield a] |&gt; printfn "%A"

printfn "---------------------------------"

let vals3 =
    [ for x in 1 .. 3 do
          for y in 1 .. 10 -&gt; x, y ]

printfn "%A" vals3

In F#, list comprehensions use for loops, if conditions and the yield keyword.

let vals = [ -1; 0; 2; -2; 1; 3; 4; -6 ]

let pos =
    [ for e in vals do
            if e &gt; 0 then yield e ]

We have a list of values. A new list is constructed with a list comprehension.
It contains only positive values.

[ for e in 1 .. 100 -&gt; e * e ] |&gt; printfn "%A"

We can use ranges in list comprehensions.

[ for a in 1 .. 100 do
    if a % 3 = 0 &amp;&amp; a % 5 = 0 then yield a] |&gt; printfn "%A"

Here we use two if conditions.

let vals3 =
    [ for x in 1 .. 3 do
          for y in 1 .. 10 -&gt; x, y ]

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

In this article we have worked with lists in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.