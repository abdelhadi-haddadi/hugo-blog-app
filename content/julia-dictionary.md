+++
title = "Julia dictionary"
date = 2025-08-29T20:02:19.435+01:00
draft = false
description = "Julia dictionary tutorial shows how to work with a dictionaries in Julia."
image = ""
imageBig = ""
categories = ["julia"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Julia dictionary

last modified October 25, 2023

In this article we work with dictionaries in Julia.

A dictionary is a collection of key/value pairs. Dictionaries are created with 
Dict type.

Dictionaries are also called maps or associative arrays.

## Simple example

In the first example, we construct a simple dictionary in Julia.

main.jl
  

d = Dict("sk" =&gt; "Slovakia", "ru" =&gt; "Russia", 
    "de" =&gt; "Germany", "no" =&gt; "Norway")

println(d)

println(d["sk"])
println(d["no"])

A dictionary of a few countries is created. The values are the country names and 
their keys are the countries' abbreviations.

d = Dict("sk" =&gt; "Slovakia", "ru" =&gt; "Russia", 
    "de" =&gt; "Germany", "no" =&gt; "Norway")

A dictionary is created with the Dict type. Each item has a key and 
a value; these are separated with the =&gt; characters. The pairs 
are separated with commas.

println(d)

We print the whole dictionary.

println(d["sk"])
println(d["no"])

We print the names of two countries. The countries are accesse by their keys. 
The keys are specified inside a pair of square brackets.

$ julia main.jl
Dict("ru" =&gt; "Russia", "sk" =&gt; "Slovakia", "no" =&gt; "Norway", "de" =&gt; "Germany")
Slovakia
Norway

## Looping over a dictionary

In the next example, we go over a dictionary with for loop.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", :c =&gt; "pencil", :d =&gt; "green")

for (k, v) in d 
    println("$(k): $(v)")
end

We define a dictionary of words. The keys are symbols and the values are words.
We go over the dictionary with a for loop.

for (k, v) in d 
    println("$(k): $(v)")
end

In each cycle, the key and the value of the current pair is stored in the 
k and v variables. They are then printed to the console.

$ julia main.jl
a: book
b: storm
d: green
c: pencil

## The keys and values functions

We can use the keys and values functions to get all 
the keys and values of a dictionary.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

println(keys(d))
println(values(d))

for e in keys(d)
    println(e)
end

for e in values(d)
    println(e)
end

The program uses the keys and values functions

d = Dict(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

We define a dictionary of words. 

println(keys(d))

We get all the keys of the dictionary. The function returns an array.

$ julia main.jl
[:a, :b, :d, :c]
["e-books", "storm", "green", "pencil"]
a
b
d
c
book
storm
green
pencil

## Types

The next example works with types.

main.jl
  

d = Dict{Symbol, String}(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

println(keytype(d))
println(valtype(d))

We explicitly define the dictionary key/value types and use the
keytype and valtype functions to determine the types 
of keys and values at runtime.

d = Dict{Symbol, String}(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

We can explicitly specify the types for the keys and values within the
{} brackets.

$ julia main.jl
Symbol
String

## Merging dictionaries

The merge function can be used to merge dictionaries.

main.jl
  

d1 = Dict(:a =&gt; "book", :b =&gt; "storm", :c =&gt; "pencil")
d2 = Dict(:d =&gt; "water", :e =&gt; "form", :f =&gt; "lamp")

d = merge(d1, d2)
println(d)

In the example, we merge two dictionaries of words with merge.

$ julia main.jl
Dict(:a =&gt; "book", :b =&gt; "storm", :f =&gt; "lamp", :d =&gt; "water", 
    :e =&gt; "form", :c =&gt; "pencil")

## The haskey function

With the haskey function, we can determine if the dictionary
contains the given key.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

if haskey(d, :c)
    println("the dictionary contains the :c key")
else
    println("the dictionary does not contain the :c key")
end

The program checks if the dictionary contains the :c key.

## The in operator

We can check if a pair is in the dictionary with the in operator.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

p = Pair(:a, "book")

if p in d 
    println("the $(p) is in the dictionary")
else
    println("the item is not in the dictionary")
end

The program determines whether the defined dictionary contains the 
Pair(:a, "book").

We can also use the ∈ and ∉ operators. (Written with
\in and \notin).

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", 
    :c =&gt; "pencil", :d =&gt; "green")

p1 = Pair(:a, "book")

if p1 ∈ d 
    println("the $(p1) is in the dictionary")
else
    println("the item is not in the dictionary")
end

p2 = Pair(:e, "war")

if p2 ∉ d 
    println("the $(p2) is not in the dictionary")
else
    println("the item is in the dictionary")
end

The program uses the ∈ and ∉ operators. 

## The get and get! functions

The get function returns the value stored for the given key, or the
given default value if no mapping for the key is present. The get!
function returns the value stored for the given key, or if no mapping for 
the key is present, it stores the given default pair and returns it.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", :c =&gt; "pencil", 
    :d =&gt; "car", :e =&gt; "book")

println(get(d, :a, "not present"))
println(d)

println(get(d, :f, "not present"))
println(d)

println(get!(d, :f, "cloud"))
println(d)

In the program we use th get and get! functions.

$ julia getfuns.jl
book
Dict(:a =&gt; "book", :b =&gt; "storm", :d =&gt; "car", :e =&gt; "book", :c =&gt; "pencil")
not present
Dict(:a =&gt; "book", :b =&gt; "storm", :d =&gt; "car", :e =&gt; "book", :c =&gt; "pencil")
cloud
Dict(:a =&gt; "book", :b =&gt; "storm", :f =&gt; "cloud", :d =&gt; "car", :e =&gt; "book", :c =&gt; "pencil")

## Adding elements

In the next example, we add new pairs to a dictionary.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", :c =&gt; "pencil", :d =&gt; "green")

println(d)

push!(d, :e =&gt; "cloud")
d[:x] = "sea"

println(d)

In the program, we add two pairs.

push!(d, :e =&gt; "cloud")

In the first case, we use the push! function.

d[:x] = "sea"

Another way is to use the assignment operator.

$ julia main.jl
Dict(:a =&gt; "book", :b =&gt; "storm", :d =&gt; "green", :c =&gt; "pencil")
Dict(:a =&gt; "book", :b =&gt; "storm", :d =&gt; "green", :e =&gt; "cloud", :c =&gt; "pencil", :x =&gt; "sea")

## Deleting elements

We can delete elements with delete! and pop!.

main.jl
  

d = Dict(:a =&gt; "book", :b =&gt; "storm", :c =&gt; "pencil", 
    :d =&gt; "car", :e =&gt; "book")

delete!(d, :a)
println(d)

r = pop!(d)
println(r)
println(d)

In the program, we remove two elements.

delete!(d, :a)

We delete the pair that has key :a.

r = pop!(d)

The pop! removes an item in the dictionary and returns it. If
collection is an ordered container, the last item is returned; for unordered
containers, an arbitrary element is returned.

$ julia main.jl
Dict(:b =&gt; "storm", :d =&gt; "car", :e =&gt; "book", :c =&gt; "pencil")
:b =&gt; "storm"
Dict(:d =&gt; "car", :e =&gt; "book", :c =&gt; "pencil")

## Source

[Julia Collections documentation](https://docs.julialang.org/en/v1/base/collections/)

In this article we have worked with dictionaries in Julia.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Julia tutorials](/all/#julia).