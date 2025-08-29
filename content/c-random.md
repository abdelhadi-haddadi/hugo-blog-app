+++
title = "C# Random"
date = 2025-08-29T19:51:16.518+01:00
draft = false
description = "This C# Random tutorial demonstrates how to generate random values using the Random class in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Random

Last modified April 18, 2025

 

This tutorial explores how to generate random values in C# using the built-in
Random class.

The Random class serves as a pseudo-random number generator,
employing an algorithm to produce a sequence of numbers that satisfies specific
statistical randomness criteria.

## Random Number Generator

A Random Number Generator (RNG) produces a sequence of values that
exhibit no discernible patterns. RNGs are divided into two types: hardware
random-number generators and pseudo-random number generators. Hardware
generators are considered to produce truly random numbers, while pseudo-random
generators rely on software algorithms to create values that appear random.
These pseudo-random values are deterministic and reproducible if the algorithm
and initial conditions are known.

Random number generators are essential in applications such as gambling, gaming,
simulations, and cryptography.

**Note: **For security-sensitive applications, cryptographically
secure pseudo-random number generators are required.

To enhance the quality of pseudo-random number generators, operating systems
collect environmental noise from sources like device drivers, user input
latency, or hardware component jitter. This data forms the basis for
cryptographically secure pseudo-random number generators.

## The Seed

The seed is an initial value that initializes a random number generator. Random
number generators operate by transforming a previous value through a specific
algorithm. At the start, the seed provides the initial value for these
operations. The most challenging aspect of random number generation is selecting
a seed that closely approximates true randomness.

var rnd = new Random();

This constructor initializes a random number generator with a default seed.

**Note: **Since 2016, in .NET Core, the default seed has shifted
from Environment.TickCount to
Guid.NewGuid().GetHashCode(). This change ensures it is safe to
create multiple random instances within a loop.

## C# Random Numbers

In the following example, we demonstrate the generation of various random numbers.

Program.cs
  

var rand = new Random();

Console.WriteLine(rand.NextDouble());
Console.WriteLine(rand.NextInt64());

var buf = new byte[8];
rand.NextBytes(buf);

Console.WriteLine(string.Join(" ", buf));

This example generates and displays random doubles, integers, and bytes.

var rand = new Random();

A new instance of the Random class is instantiated.

Console.WriteLine(rand.NextDouble());

The NextDouble method produces a random floating-point number between 0.0 (inclusive) and 1.0 (exclusive).

Console.WriteLine(rand.NextInt64());

The NextInt64 method generates a non-negative random 64-bit integer.

var buf = new byte[8];
rand.NextBytes(buf);

The NextBytes method populates a specified byte array with random values.

$ dotnet run
0.0746532268944834
7374871010421669053
149 132 170 234 101 204 104 37

## C# Random Next

The Next method generates a random integer, with options to define
lower and upper bounds for the generated numbers.

There are three overloaded methods:

    - Next - Returns a non-negative random integer.

    - Next(Int32) - Returns a non-negative random integer less than the specified maximum.

    - Next(Int32, Int32) - Returns a random integer within a specified range.

Program.cs
  

var rand = new Random();

Console.WriteLine(rand.Next());
Console.WriteLine(rand.Next(5));
Console.WriteLine(rand.Next(10, 20));

This example outputs three random integers using different Next method overloads.

$ dotnet run
741804443
3
11

## C# Pick Random Element

The next example illustrates how to select a random element from a collection.

Program.cs
  

var rand = new Random();

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6, 7, 8];

var r1 = vals[rand.Next(vals.Count)];
var r2 = vals[rand.Next(vals.Count)];

Console.WriteLine(r1);
Console.WriteLine(r2);

This code randomly selects and prints two elements from a list of integers. The
upper bound of Next is exclusive, preventing out-of-range
exceptions.

$ dotnet run
5
2

## C# Shuffle List

The following example demonstrates how to shuffle the elements of a list.

Program.cs
  

var rng = new Random();

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6];
List&lt;string&gt; words = ["sky", "blue", "war", "toy", "tick"];

Shuffle(vals);
Shuffle(words);

foreach (var e in vals)
{
    Console.Write($"{e} ");
}

Console.WriteLine("\n-----------------------");

foreach (var e in words)
{
    Console.Write($"{e} ");
}

Console.WriteLine();

void Shuffle&lt;T&gt;(IList&lt;T&gt; vals)
{
    int n = vals.Count;

    while (n &gt; 1)
    {
        n--;
        int k = rng.Next(n + 1);

        (vals[n], vals[k]) = (vals[k], vals[n]);
    }
}

This example defines a generic Shuffle method that randomly
reorders the elements of a list using the Fisher-Yates shuffle algorithm.

$ dotnet run
2 1 3 4 6 5 
-----------------------
blue war sky tick toy 

## C# Random String

The following example demonstrates how to generate a random string of characters.

Program.cs
  

var rand = new Random();
string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
int length = 8;

char[] randomString = new char[length];
for (int i = 0; i &lt; length; i++)
{
    randomString[i] = chars[rand.Next(chars.Length)];
}

Console.WriteLine(new string(randomString));

This code creates a random string of 8 characters by selecting random characters
from a predefined set of alphanumeric characters.

$ dotnet run
K7mP9xT2

## C# Random Boolean

The next example shows how to generate a random boolean value.

Program.cs
  

var rand = new Random();

bool randomBool = rand.Next(2) == 0;

Console.WriteLine(randomBool);

This code generates a random boolean by producing a random integer (0 or 1) and
converting it to a boolean value.

$ dotnet run
True

## C# Random Enum Value

The following example illustrates how to select a random value from an enumeration.

Program.cs
  

var rand = new Random();

enum Colors { Red, Green, Blue, Yellow }
var values = Enum.GetValues(typeof(Colors));
var randomColor = (Colors)values.GetValue(rand.Next(values.Length));

Console.WriteLine(randomColor);

This code randomly selects a value from the Colors enumeration by
retrieving all enum values and picking one at random.

$ dotnet run
Blue

## Source

[Random class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.random?view=net-8.0)

This tutorial has demonstrated various techniques for generating random values
in C# using the Random class.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007. To
date, I have authored over 1,400 articles and 8 e-books. I possess more than ten
years of experience in teaching programming.

List [all C# tutorials](/csharp/).