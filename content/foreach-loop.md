+++
title = "foreach loop"
date = 2025-08-29T19:54:29.586+01:00
draft = false
description = "The foreach tutorial shows how to loop over data in different computer languages, including C#, F#, C++, Java, Kotlin, Go, Python, Ruby, Perl, PHP, JavaScript, TypeScript, Dart, Bash, and AWK."
image = ""
imageBig = ""
categories = ["foreach"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# foreach loop

last modified January 9, 2023

The foreach tutorial shows how to loop over data in different computer
languages, including C#, F#, C++, Java, Kotlin, Go, Python, Ruby, Perl, PHP,
JavaScript, TypeScript, Dart, Bash, and AWK.

## C# foreach

C# has the foreach keyword and the ForEach method to
loop over containers.

Program.cs
  

using System;
using System.Collections.Generic;

var chars = new char[] {'a', 'b', 'c', 'x', 'y', 'z'};

foreach (var c in chars)
{
    Console.WriteLine(c);
}

Console.WriteLine("-----------------------");

var vals = new List&lt;int&gt; {1, 2, 3, 4, 5, 6};
foreach (var val in vals)
{
    Console.WriteLine(val);
}

Console.WriteLine("-----------------------");

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

foreach (var pair in domains)
{
    Console.WriteLine($"{pair.Key} - {pair.Value}");
}

Console.WriteLine("-----------------------");

foreach ((var Key, var Value) in domains)
{
    Console.WriteLine($"{Key} - {Value}");
}

In the example, we loop over elements of an array, list, and dictionary with
foreach statement.

$ dotnet run
a
b
c
x
y
z
-----------------------
1
2
3
4
5
6
-----------------------
sk - Slovakia
ru - Russia
de - Germany
no - Norway
-----------------------
sk - Slovakia
ru - Russia
de - Germany
no - Norway

In the next example, we loop over elements with ForEach method.

Program.cs
  

using System;
using System.Linq;
using System.Collections.Generic;

int[] vals = {1, 2, 3, 4, 5};
Array.ForEach(vals, e =&gt; Console.WriteLine(e));

Console.WriteLine("-----------------------");

var words = new List&lt;string&gt; {"tea", "falcon", "book", "sky"};
words.ForEach(e =&gt; Console.WriteLine(e));

Console.WriteLine("-----------------------");

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

domains.ToList().ForEach(pair =&gt; Console.WriteLine($"{pair.Key} - {pair.Value}"));

We loop over elements of an array, list, and dictionary with
ForEach method.

$ dotnet run
1
2
3
4
5
-----------------------
tea
falcon
book
sky
-----------------------
sk - Slovakia
ru - Russia
de - Germany
no - Norway

## F# foreach

F# has for/in, List.iter, Map.iter
forms to loop over elements.

Program.fs
  

let vals = [| 1; 2; 3; 4; 5 |]

for vl in vals do
    printfn "%d" vl

printfn "------------------------"

let nums = [ 1 .. 6 ]
List.iter (fun i -&gt; printfn "%d" i) nums

printfn "------------------------"

let data = seq { for i in 1 .. 10 -&gt; (i, i * i) }

for (x, squared) in data do
    printfn "%d squared is %d" x squared

printfn "------------------------"

let countries =
  Map.empty.
    Add("sk", "Slovakia").
    Add("ru", "Russia").
    Add("de", "Germany").
    Add("no", "Norway")

countries
|&gt; Map.iter (fun key value -&gt; printf "Key = %A, Value = %A\n" key value)

We loop over elements of an array, list, sequence, and map.

$ dotnet run
1
2
3
4
5
------------------------
1
2
3
4
5
6
------------------------
1 squared is 1
2 squared is 4
3 squared is 9
4 squared is 16
5 squared is 25
6 squared is 36
7 squared is 49
8 squared is 64
9 squared is 81
10 squared is 100
------------------------
Key = "de", Value = "Germany"
Key = "no", Value = "Norway"
Key = "ru", Value = "Russia"
Key = "sk", Value = "Slovakia"

## C++ foreach

C++ 11 introduced range-based for loop.

foreach.cpp
  

#include &lt;iostream&gt;
#include &lt;list&gt;
#include &lt;map&gt;
#include &lt;string&gt;

int main() {

    int vals[] {1, 2, 3, 4, 5};

    for (auto val : vals) {

        std::cout &lt;&lt; val &lt;&lt; std::endl;
    }

    std::list&lt;std::string&gt; words = { "falcon", "sky", "cloud", "book" };

    for (auto word: words) {

        std::cout &lt;&lt; word &lt;&lt; std::endl;
    }

    std::map&lt;std::string, int&gt; items {
        {"coins", 3},
        {"pens", 2},
        {"keys", 1},
        {"sheets", 12}
    };

    for (auto item: items) {

        std::cout &lt;&lt; item.first &lt;&lt; ": " &lt;&lt; item.second &lt;&lt; std::endl;
    }
}

We loop over an array, list, and map in C++.

$ ./foreach
1
2
3
4
5
falcon
sky
cloud
book
coins: 3
keys: 1
pens: 2
sheets: 12

## Java foreach

In Java, we can use the enhanced-for loop and the forEach method
to loop over elements of containers.

com/zetcode/ForEachEx.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JavaForeachEx {

    public static void main(String[] args) {

        int[] nums = { 3, 4, 2, 1, 6, 7 };

        for (int e : nums) {
            System.out.println(e);
        }

        System.out.println("-------------------------");

        List&lt;String&gt; items = new ArrayList&lt;&gt;();

        items.add("coins");
        items.add("pens");
        items.add("keys");
        items.add("sheets");

        items.forEach(System.out::println);

        for (var item : items) {
            System.out.println(item);
        }

        System.out.println("-------------------------");

        Map&lt;String, Integer&gt; items2 = new HashMap&lt;&gt;();

        items2.put("coins", 3);
        items2.put("pens", 2);
        items2.put("keys", 1);
        items2.put("sheets", 12);

        items2.forEach((k, v) -&gt; System.out.printf("%s : %d%n", k, v));

        for (Map.Entry&lt;String, Integer&gt; entry : items2.entrySet()) {
            String k = entry.getKey();
            Integer v = entry.getValue();
            System.out.printf("%s : %d%n", k, v);
        }
    }
}

We loop over elements of an array, arraylist and hashmap.

3
4
2
1
6
7
-------------------------
coins
pens
keys
sheets
coins
pens
keys
sheets
-------------------------
sheets : 12
coins : 3
keys : 1
pens : 2
sheets : 12
coins : 3
keys : 1
pens : 2

## Kotlin foreach

Kotlin has foreEach and forEachIndexed methods
and for/in form to loop over elements of containers.

KotlinForeach.kt
  

package com.zetcode

fun main() {

    val nums = arrayOf(1, 2, 3, 4, 5, 6, 7)
    nums.forEach { e -&gt; print("$e ") }

    println()

    nums.forEachIndexed { i, e -&gt; println("nums[$i] = $e") }

    for (e in nums) {
        print("$e ")
    }

    println("\n------------------------")

    val words = listOf("pen", "cup", "dog", "person",
        "cement", "coal", "spectacles")

    words.forEach { e -&gt; print("$e ") }

    println()

    for (word in words) {

        print("$word ")
    }

    println()

    words.forEachIndexed { i, e -&gt; println("words[$i] = $e") }

    println("------------------------")

    val items = mapOf("coins" to 12, "books" to 45, "cups" to 33, "pens" to 2)

    items.forEach { (k, v) -&gt; println("There are $v $k") }

    for ((k, v) in items) {
        println("$k = $v")
    }
}

We loop over elements of an array, list, and map in Kotlin.

1 2 3 4 5 6 7
nums[0] = 1
nums[1] = 2
nums[2] = 3
nums[3] = 4
nums[4] = 5
nums[5] = 6
nums[6] = 7
1 2 3 4 5 6 7
------------------------
pen cup dog person cement coal spectacles
pen cup dog person cement coal spectacles
words[0] = pen
words[1] = cup
words[2] = dog
words[3] = person
words[4] = cement
words[5] = coal
words[6] = spectacles
------------------------
There are 12 coins
There are 45 books
There are 33 cups
There are 2 pens
coins = 12
books = 45
cups = 33
pens = 2

## Go foreach

Go has for/range form to loop over container elements.

foreach.go
  

package main

import "fmt"

func main() {

    vals := [...]int{5, 4, 3, 2, 1}

    for idx, e := range vals {

        fmt.Printf("%d has index %d\n", e, idx)
    }

    fmt.Println("-----------------------")

    data := map[string]string{

        "de": "Germany",
        "it": "Italy",
        "sk": "Slovakia",
    }

    for k, v := range data {

        fmt.Println(k, "=&gt;", v)
    }

    fmt.Println("----------------------")

    for k := range data {

        fmt.Println(k, "=&gt;", data[k])
    }
}

We use for/range form to loop over elements of an array and map.

$ go run foreach.go
5 has index 0
4 has index 1
3 has index 2
2 has index 3
1 has index 4
-----------------------
de =&gt; Germany
it =&gt; Italy
sk =&gt; Slovakia
----------------------
de =&gt; Germany
it =&gt; Italy
sk =&gt; Slovakia

## Python foreach

Python has for/in form to iterate over elements of containers.

foreach.py
  

#!/usr/bin/python

vals = [1, 2, 3, 4, 5]

for val in vals:
    print(val)

data = { "coin": 2, "pen": 4, "cup": 12, "lamp": 3 }

for k, v in data.items():
    print(f"{k}: {v}")

We loop over a list and a map in Python.

$ ./foreach.py
1
2
3
4
5
coin: 2
pen: 4
cup: 12
lamp: 3

## Ruby foreach

Ruby has each and for/in to iterate over arrays
and each and each_pair to iterate over hashes.

foreach.rb
  

#!/usr/bin/ruby

nums = [1, 2, 3, 4, 5]

nums.each do |num|
    puts num
end

puts("--------------------")

for e in nums do
    puts e
end

puts("--------------------")

stones = {
    1 =&gt; "garnet", 2 =&gt; "topaz",
    3 =&gt; "opal", 4 =&gt; "amethyst"
}

stones.each { |k, v| puts "Key: #{k}, Value: #{v}" }

puts("--------------------")

stones.each_pair { |k, v| puts "Key: #{k}, Value: #{v}" }

In the example, we loop over an array and a hash.

$ ./foreach.rb
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
--------------------
Key: 1, Value: garnet
Key: 2, Value: topaz
Key: 3, Value: opal
Key: 4, Value: amethyst
--------------------
Key: 1, Value: garnet
Key: 2, Value: topaz
Key: 3, Value: opal
Key: 4, Value: amethyst

## Perl foreach

Perl has foreach statement to loop over elements of containers.

foreach.pl
  

#!/usr/bin/perl

use v5.30;

my @vals = (1..6);
foreach my $val (@vals) {

    say "$val ";
}

say "---------------------------";

say "$_" foreach @vals;

say "---------------------------";

my %stones = (
    1 =&gt; "garnet", 2 =&gt; "topaz",
    3 =&gt; "opal", 4 =&gt; "amethyst"
);

foreach my $k (keys %stones) {
    say "$k =&gt; $stones{$k}";
}

We loop over an array and has in Perl with foreach.

$ ./foreach.pl
1
2
3
4
5
6
---------------------------
1
2
3
4
5
6
---------------------------
1 =&gt; garnet
2 =&gt; topaz
3 =&gt; opal
4 =&gt; amethyst

## PHP foreach

PHP has foreach keyword to loop over elements of containers.

foreach.php
  

&lt;?php

$planets = [ "Mercury", "Venus", "Earth", "Mars", "Jupiter",
                 "Saturn", "Uranus", "Neptune" ];

foreach ($planets as $item) {

    echo "$item ";
}

echo "\n";

$benelux = [ 'be' =&gt; 'Belgium',
             'lu' =&gt; 'Luxembourgh',
             'nl' =&gt; 'Netherlands' ];

foreach ($benelux as $key =&gt; $value) {

    echo "$key is $value\n";
}

We loop over a PHP array with foreach.

$ php foreach.php
Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune
be is Belgium
lu is Luxembourgh
nl is Netherlands

## JavaScript foreach

JavaScript has forEach method and for/in and
for/of forms to loop over containers.

foreach.js
  

let words = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

words.forEach(e =&gt; console.log(e));

console.log("----------------------");

words.forEach((word, idx) =&gt; {
    console.log(`${word} has index ${idx}`);
});

console.log("----------------------");

for (let idx in words) {

    console.log(`${words[idx]} has index ${idx}`);
}

console.log("----------------------");

for (let word of words) {

    console.log(word);
}

console.log("----------------------");

let stones = new Map([[1, "garnet"], [2, "topaz"],
    [3, "opal"], [4, "amethyst"]]);

stones.forEach((k, v) =&gt; {

    console.log(`${k}: ${v}`);
});

The example loops over elements of an array and a map.

$ node foreach.js
pen
pencil
falcon
rock
sky
earth
----------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5
----------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5
----------------------
pen
pencil
falcon
rock
sky
earth
----------------------
garnet: 1
topaz: 2
opal: 3
amethyst: 4

## TypeScript foreach

TypeScript has forEach method and for/in and
for/of forms to loop over containers.

foreach.ts
  

let words: string[] = ['pen', 'pencil', 'falcon', 'rock', 'sky', 'earth'];

words.forEach(e =&gt; console.log(e));

console.log("----------------------");

words.forEach((word, idx) =&gt; {
    console.log(`${word} has index ${idx}`);
});

console.log("----------------------");

for (let idx in words) {

    console.log(`${words[idx]} has index ${idx}`);
}

console.log("----------------------");

for (let word of words) {

    console.log(word);
}

console.log("----------------------");

let stones = new Map&lt;number, string&gt;([[1, "garnet"], [2, "topaz"],
    [3, "opal"], [4, "amethyst"]]);

stones.forEach((k, v) =&gt; {

    console.log(`${k}: ${v}`);
});

The example loops over elements of a typed array and map.

$ tsc foreach.ts --target esnext &amp;&amp; node foreach.js
pen
pencil
falcon
rock
sky
earth
----------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5
----------------------
pen has index 0
pencil has index 1
falcon has index 2
rock has index 3
sky has index 4
earth has index 5
----------------------
pen
pencil
falcon
rock
sky
earth
----------------------
garnet: 1
topaz: 2
opal: 3
amethyst: 4

## Dart foreach

In Dart, we have the forEach method to loop over containers.

foreach.dart
  

import 'dart:io';

void main() {

  var vals = &lt;int&gt;[1, 2, 3, 4, 5];

  vals.forEach((e) {
    stdout.write("$e ");
  });

  print("");

  var fruit = {1: 'Apple', 2: 'Banana', 3: 'Cherry', 4: 'Orange'};

  fruit.forEach((key, val) {
    print('{ key: $key, value: $val}');
  });

  print('---------------------------');

  fruit.entries.forEach((e) {
    print('{ key: ${e.key}, value: ${e.value} }');
  });

  print('---------------------------');

  for (var key in fruit.keys) print(key);
  for (var value in fruit.values) print(value);
}

We loop over a list and map in Dart with forEach.

$ dart foreach.dart
1 2 3 4 5
{ key: 1, value: Apple}
{ key: 2, value: Banana}
{ key: 3, value: Cherry}
{ key: 4, value: Orange}
---------------------------
{ key: 1, value: Apple }
{ key: 2, value: Banana }
{ key: 3, value: Cherry }
{ key: 4, value: Orange }
---------------------------
1
2
3
4
Apple
Banana
Cherry
Orange

## Bash foreach

In Bash, we have the for/in form to loop over containers.

foreach.sh
  

#!/usr/bin/bash

words=(falcon sky cloud water lord lawn)

for word in "${words[@]}"
do
    echo "$word"
done

echo "--------------------------"

stones=([1]=garnet [2]=topaz [3]=opan [4]=amethyst)

for k in "${!stones[@]}"
do
  echo "$k: ${stones[$k]}"
done

We loop over a plain array and an associative array in Bash with
for/in.

$ ./foreach.sh
falcon
sky
cloud
water
lord
lawn
--------------------------
4: amethyst
3: opan
2: topaz
1: garnet

## AWK foreach

In AWK, we have the for/in form to loop over containers.

foreach.awk
  

sky
smile
nine
nice
cup
cloud
tower

This is the words.txt file.

foreach.awk
  

#!/usr/bin/awk -f

BEGIN {

  i = 0
}

{
   words[i] = $0
   i++
}

END {
  for (i in words) {
      print words[i]
  }
}

We loop over an array of words in AWK with for/in.

$ ./foreach.awk words.txt 
sky
smile
nine
nice
cup
cloud
tower

In this article, we have used foreach loop to go over elements of containers
in different computer languages.