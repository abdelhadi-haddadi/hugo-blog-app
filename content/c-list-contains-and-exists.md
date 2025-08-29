+++
title = "C# List Contains & Exists"
date = 2025-08-27T23:23:17.932+01:00
draft = false
description = "C# List Contains & Exists tutorial shows how to check if an element or specific elements are in a list in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List Contains &amp; Exists

last modified July 5, 2023

 

In this article we show how to check if an element or specific elements are in a
list in C#.

C# list is a collection of elements of the same type. The elements can be
accessed by index.

The basic two methods that check the existence of an element or elements in a
list are: Contains and Exists. 

Alternatively, it is also possible to use Count,
IndexOf, Find, or Any methods.

## C# List Contains

The Contains method checks if an element is present in the list.

public bool Contains (T item);

The method returns a boolean value.

Program.cs
  

var words = new List&lt;string&gt; { "falcon", "water", "war", "pen", "ocean" };

var w1 = "war";
var w2 = "cup";

if (words.Contains(w1))
{
    Console.WriteLine($"{w1} is in the list");
}
else
{
    Console.WriteLine($"{w1} is not in the list");
}

if (words.Contains(w2))
{
    Console.WriteLine($"{w2} is in the list");
}
else
{
    Console.WriteLine($"{w2} is not in the list");
}

In the example, we check if two words are present in the list of defined words.

$ dotnet run
war is in the list
cup is not in the list

## C# List Exists

The Exists method determines whether a list contains elements that
match the specified predicate.

Program.cs
  

var words = new List&lt;string&gt; { "falcon", "water", "war", "pen", "ocean" };

bool res = words.Exists(e =&gt; e.StartsWith("w"));

if (res)
{
    Console.WriteLine("There are words starting in w");
} else
{
    Console.WriteLine("There are no words starting in w");
}

bool res2 = words.Exists(e =&gt; e.EndsWith("c"));

if (res2)
{
    Console.WriteLine("There are words ending in c");
} else
{
    Console.WriteLine("There are no words ending in c");
}

In the program we check if there are some words starting in 'w' and ending in
'c';

bool res = words.Exists(e =&gt; e.StartsWith("w"));

The Exists method takes a predicate function as a parameter. The 
predicate is in the form of lambda expression.

if (res)
{
    Console.WriteLine("There are words starting in w");
} else
{
    Console.WriteLine("There are no words starting in w");
}

A message is printed based on the received value.

$ dotnet run
There are words starting in w
There are no words ending in c

## C# Enumerable.Count

We can check the existence of an element or elements in a list with LINQ's 
Count. The Count method returns the number of elements
in a sequence.

There are two overloaded Count methods. One counts all the
elements, the other one counts all the elements that match a condition.

Program.cs
  

var vals = new List&lt;int&gt; { -2, 0, -1, 4, 3, 5, 3, 8 };

int n = vals.Count(e =&gt; e &lt; 0);

if (n == 0)
{
    Console.WriteLine("There are no negative values");
} else 
{
    Console.WriteLine($"There are {n} negative values");
}

In the program we check if there are negative values in a list with
Count.

int n = vals.Count(e =&gt; e &lt; 0);

We use the method that takes a predicate as a parameter.

$ dotnet run
There are 2 negative values

## C# Enumerable.Any

The Any method determines whether any element of a sequence exists
or satisfies a condition. It returns a boolean true or false.

Program.cs
  

var vals = new List&lt;int&gt; { -2, 0, -1, 4, 3, 5, 3, 8 };

bool r = vals.Any(e =&gt; e &lt; 0);

if (r)
{
    Console.WriteLine("There are negative values");
} else 
{
    Console.WriteLine($"There are no negative values");
}

In the program we check if there are some negative values with Any.

$ dotnet run
There are negative values

## Source

[List class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-8.0)

In this article we have showed how to check if an element in present in a list
in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).