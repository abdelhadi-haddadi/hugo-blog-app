+++
title = "C# List Count"
date = 2025-08-27T23:23:19.051+01:00
draft = false
description = "C# List Count tutorial shows how to count list elements in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List Count

last modified May 4, 2025

This article provides a guide on counting elements in a C# list, explaining
different methods to achieve this efficiently.

In C#, a List is a dynamic collection that stores elements of the
same type. Each element is indexed, allowing direct access through its position
within the list. Unlike arrays, lists offer flexibility in size, making them
useful for various data management scenarios.

To determine the number of elements in a list, we can use two approaches:

**Count Property:** This property returns the
total number of elements in the list and is ideal for quick access.
**Enumerable.Count Method:** This LINQ extension
method can be used with additional filtering criteria to count elements that
satisfy specific conditions.

  

Both methods provide efficient ways to retrieve the list size, depending on the
use case and whether filtering is required.

## C# List Count Simple Example

In this example, we demonstrate two approaches for counting elements in a C#
list—the Count property and the Count() LINQ extension
method.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water" ];

Console.WriteLine($"There are {words.Count} elements in the list");
Console.WriteLine($"There are {words.Count()} elements in the list");

Both lines output the total number of elements in the list. The
Count property provides direct access to the element count, while
Count() from LINQ is useful when applying filtering conditions.

$ dotnet run
There are 8 elements in the list
There are 8 elements in the list

## C# List Count with predicate

A predicate is a function which returns a boolean value. In the next example, we
count the number of elements that satisfy the given predicate.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water" ];

var n = words.Where(e =&gt; e.StartsWith('w')).Count();
Console.WriteLine($"{n} words start with w");

var n2 = words.Count(e =&gt; e.StartsWith('c'));
Console.WriteLine($"{n2} words start with c");

The program counts the number of words starting with 'w' and 'c'.

var n = words.Where(e =&gt; e.StartsWith('w')).Count();

In the first case, we use the Where method to filter the list and
then we call Count on the result.

var n2 = words.Count(e =&gt; e.StartsWith(;c;));

Alternatively, we can pass a lambda expression as a parameter to
Count.

$ dotnet run
3 words start with w
2 words start with c

## C# List Count with query expression

In the next program, we count elements with LINQ's query expression.

Program.cs
  

List&lt;Car&gt; cars =
[
    new ("Audi", 52642),
    new ("Mercedes", 57127),
    new ("Skoda", 9000),
    new ("Volvo", 29000),
    new ("Bentley", 350000),
    new ("Citroen", 21000),
    new ("Hummer", 41400),
    new ("Volkswagen", 21600)
];

var n = (from car in cars
          where car.Price &gt; 30000 &amp;&amp; car.Price &lt; 100000
          select car).Count();

Console.WriteLine(n);

record Car(string Name, int Price);

In the program, we find out all cars with price between 30000 and 100000 and
count them.

$ dotnet run
3

## C# List Count Groups

In this example, we use LINQ to group elements in a C# list based on a common
attribute and count the number of items in each group.

The program defines a list of cars, each represented by a name, color, and
price. The cars are grouped by their color, and the total number of cars in each
group is determined using the Count method.

Program.cs
  

List&lt;Car&gt; cars =
[
    new ("Audi", "red", 52642),
    new ("Mercedes", "blue", 57127),
    new ("Skoda", "black", 9000),
    new ("Volvo", "red", 29000),
    new ("Bentley", "yellow", 350000),
    new ("Citroen", "white", 21000),
    new ("Hummer", "black", 41400),
    new ("Volkswagen", "white", 21600),
];

var groups = from car in cars
             group car by car.Colour into g
             select new { g.Key, Count = g.Count() };

foreach (var group in groups)
{
    Console.WriteLine($"{group.Key}: {group.Count}");
}

record Car(string Name, string Colour, int Price);

Each unique color serves as a grouping key, and the Count method
retrieves the number of cars within each category. This technique is
particularly useful for summarizing categorized data and performing aggregation
tasks efficiently.

$ dotnet run
red: 2
blue: 1
black: 2
yellow: 1
white: 2

## Source

[List Count property](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.count?view=net-8.0)

In this article we have showed how to count list elements in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).