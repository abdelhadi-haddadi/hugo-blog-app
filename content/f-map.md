+++
title = "F# Map"
date = 2025-08-29T19:54:31.826+01:00
draft = false
description = "Explore maps in F#. This tutorial demonstrates how to use immutable dictionaries in F# programming."
image = ""
imageBig = ""
categories = ["fsharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# F# Map

last modified May 1, 2025

This article explores how to effectively work with the Map
collection in F#.

A map in F# is an immutable collection of key/value pairs, designed
for efficient lookups and data association. Unlike lists or arrays, maps provide
fast access to values using unique keys, making them ideal for structured data
storage. Since maps are immutable, any modifications create a new map instance
rather than altering the existing one, ensuring consistency and functional
purity. 

Maps maintain their keys in sorted order, offering predictable iteration
behavior and optimized retrieval performance. They are commonly used for
associative data structures, such as configuration settings, lookup tables, or
structured collections requiring fast key-based access.

## F# Map simple example

The following is a simple map example.

main.fsx
  

let words = Map [1, "book"; 2, "sky"; 3, "work"; 4, "cloud"]

printfn "%A" words
printfn "%s" words[1]
printfn "%s" words[4]

We have a map of words. The keys are integers and the values are strings.

let words = Map [1, "book"; 2, "sky"; 3, "work"; 4, "cloud"]

The keys are separated from values with a comma character. The pairs are
separated with a semicolon.

printfn "%A" words

With the %A format specifier, we pretty-print the map. 

printfn "%s" words[1]
printfn "%s" words[4]

We print the elements with index 1 and 4.

λ dotnet fsi main.fsx 
map [(1, "book"); (2, "sky"); (3, "work"); (4, "cloud")]
book
cloud

## F# Map size

The Count property returns the number of pairs in the map.

main.fsx
  

let words = Map [1, "book"; 2, "sky"; 3, "work"; 4, "cloud"]

let n = words.Count
printfn $"The map has {n} elements"

The example prints the number of elements int he map.

## F# Map iteration

In the next example, we loop over the elements of a Map.

main.fsx
  

let words = Map [1, "book"; 2, "sky"; 3, "work"; 4, "cloud"]

printfn "%A" words

words |&gt; Map.iter (fun k v -&gt; printfn ($"{k}: {v}"))

for key in words.Keys do
    printfn "%d" key

for value in words.Values do
    printfn "%s" value

for e in words do 
    printfn $"{e.Key}: {e.Value}"

We provide two basic ways of iteration: functional and imperative. The
functional uses the Map.iter function, while the imperative uses
for loops.

words |&gt; Map.iter (fun k v -&gt; printfn ($"{k}: {v}"))

The Map.iter is the functional way of looping over map elements.

for key in words.Keys do
    printfn "%d" key

We loop over the keys of the map.

for value in words.Values do
    printfn "%s" value

We iterate over the values of the map.

for e in words do 
    printfn $"{e.Key}: {e.Value}"

We iterate over the pairs of the map.

λ dotnet fsi main.fsx 
map [(1, "book"); (2, "sky"); (3, "work"); (4, "cloud")]
1: book
2: sky
3: work
4: cloud
1
2
3
4
book
sky
work
cloud
1: book
2: sky
3: work
4: cloud

## F# Map.filter

We can filter map elements with Map.filter.

main.fsx
  

let words =
    Map [ 1, "book"
          2, "sky"
          3, "work"
          4, "cloud"
          5, "water"
          6, "war" ]

words
|&gt; Map.filter (fun _ v -&gt; v.Contains "w")
|&gt; Map.values
|&gt; Seq.iter (printfn "%s")

In the program, we find out all values which start with 'w'.

words
|&gt; Map.filter (fun _ v -&gt; v.Contains "w")
|&gt; Map.values
|&gt; Seq.iter (printfn "%s")

We pass a predicate lambda to the filter method; it checks if the value 
contains 'w'. The result is passed to the Map.values to extract 
all values. Then the values are iterated and printed to the console.

λ dotnet fsi main.fsx 
work
water
war

## F# Map Remove

The Remove method returns a new map from which the specified pair 
is removed.

main.fsx
  

let words =
    Map [ 1, "book"
          2, "sky"
          3, "work"
          4, "cloud"
          5, "water"
          6, "war" ]

let res = words.Remove 1
printfn "%A" res
printfn "%A" words

In the example, we remove the element with key 1. The original map is not
changed.

λ dotnet fsi main.fsx 
map [(2, "sky"); (3, "work"); ... (6, "war")]
map [(1, "book"); (2, "sky"); (3, "work"); ... (6, "war")]

## F# Map Add

With Add, we add a new element to the map.

main.fsx
  

let words =
    Map [ 1, "book"
          2, "sky"
          3, "work"
          4, "cloud"
          5, "water"
          6, "war" ]

let res = Map.add 7 "falcon" words
printfn "%A" res
printfn "%A" words

We add a new pair to the map.

λ dotnet fsi main.fsx 
map [(1, "book"); (2, "sky"); ... (6, "war"); (7, "falcon")]
map [(1, "book"); (2, "sky"); ... (6, "war")]

## F# Map.empty

We can create an empty map with Map.empty and add new elements 
with Add.

main.fsx
  

type User = {
    Name: string
    Occupation: string
}

let users =
   Map.empty.
      Add(1, {Name="John Doe"; Occupation="gardener"}).
      Add(2, {Name="Roger Roe"; Occupation="driver"}).
      Add(3, {Name="Lucy Smith"; Occupation="teacher"}).
      Add(4, {Name="Tom Jones"; Occupation="programmer"})

users |&gt; Map.iter (fun k v -&gt; printfn $"{k}: {v}")

Utilizing Map.empty, we create a map of users.

λ dotnet fsi main.fsx
1: { Name = "John Doe"
  Occupation = "gardener" }
2: { Name = "Roger Roe"
  Occupation = "driver" }
3: { Name = "Lucy Smith"
  Occupation = "teacher" }
4: { Name = "Tom Jones"
  Occupation = "programmer" }

## F# list of maps

In the next example, we define a list of maps. 

main.fsx
  

let fruits1 = Map [ "oranges", 2; "bananas", 3 ]
let fruits2 = Map [ "plums", 4; "kiwis", 5 ]

let all = [ Map[1, fruits1]; Map[2, fruits2] ]

all
|&gt; List.iter (Map.iter (fun k v -&gt; printfn $"{k} {v}"))

printfn "-------------------"

for nested in all do
  for e in nested do
        printfn $"{e.Key} {e.Value}"

We define two maps and insert them into a list. The list is then iterated in 
declarative and imperative way.

all
|&gt; List.iter (Map.iter (fun k v -&gt; printfn $"{k} {v}"))

We iterate of the list of maps declaratively using List.iter and 
Map.iter.

for nested in all do
    for e in nested do
          printfn $"{e.Key} {e.Value}"

Imperatively, we loop over the list using two for loops.

λ dotnet fsi main.fsx
1 map [(bananas, 3); (oranges, 2)]
2 map [(kiwis, 5); (plums, 4)]
-------------------
1 map [(bananas, 3); (oranges, 2)]
2 map [(kiwis, 5); (plums, 4)]

In this article we have worked with maps in F#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.