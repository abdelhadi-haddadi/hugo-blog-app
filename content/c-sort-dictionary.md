+++
title = "C# sort Dictionary"
date = 2025-08-29T19:51:24.371+01:00
draft = false
description = "C# sort List tutorial shows how to sort list elements in C# language. The tutorial provides numerous examples to demonstrate sorting in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# sort Dictionary

last modified July 5, 2023

 

C# sort Dictionary tutorial shows how to sort Dictionary elements in C# language.

## Sorting

In programming, sorting means arranging elements in an ordered sequence. Over
the years, several algorithms were developed to perform sorting on data,
including merge sort, quick sort, selection sort, or bubble sort. 

The opposite of sorting, rearranging a sequence of elements in a random or
meaningless order, is called shuffling. We can sort data alphabetically or
numerically. The sort key specifies the criteria used to perform the sort.

C# has built-in methods for efficient sorting of data.

## C# Sort Dictionary by value

The following example, we sort a small dictionary.

Program.cs
  

var users = new Dictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

var sorted = users.OrderBy(user =&gt; user.Value);

foreach (var user in sorted)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

Console.WriteLine("----------------------------");

var sorted2 = users.OrderByDescending(user =&gt; user.Value);

foreach (var user in sorted2)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

With OrderBy and OrderByDescending methods, we sort
the dictionary by its values in ascending and descending order.

$ dotnet run
Paul is 24 years old
Lucy is 29 years old
Jane is 38 years old
John is 41 years old
----------------------------
John is 41 years old
Jane is 38 years old
Lucy is 29 years old
Paul is 24 years old

In the next example, we use the query expression syntax.

Program.cs
  

var users = new Dictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

var sorted = from pair in users
    orderby pair.Value
    select pair;

foreach (var user in sorted)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

Console.WriteLine("------------------------");

var sorted2 = from pair in users
    orderby pair.Value descending
    select pair;

foreach (var user in sorted2)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

The example sorts elements of a dictionary by its values in ascending and
descending order using LINQ query expression syntax.

## C# Sort Dictionary by keys

Next, we sort a dictionary by keys.

Program.cs
  

var users = new Dictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

var sorted = users.OrderBy(user =&gt; user.Key);

foreach (var user in sorted)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

Console.WriteLine("----------------------------");

var sorted2 = users.OrderByDescending(user =&gt; user.Key);

foreach (var user in sorted2)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

The example sorts dictionary elements by its keys in ascending and descending
order using OrderBy and OrderByDescending methods.

$ dotnet run
Jane is 38 years old
John is 41 years old
Lucy is 29 years old
Paul is 24 years old
----------------------------
Paul is 24 years old
Lucy is 29 years old
John is 41 years old
Jane is 38 years old

## C# SortedDictionary

SortedDictionary represents a collection of key/value pairs
that are sorted on the key.

Program.cs
  

var sortedUsers = new SortedDictionary&lt;string, int&gt;()
{
    { "John", 41 },
    { "Jane", 38 },
    { "Lucy", 29 },
    { "Paul", 24 }
};

foreach (var user in sortedUsers)
{
    Console.WriteLine($"{user.Key} is {user.Value} years old");
}

The example demonstrates the usage of the SortedDictionary.

## Source

[SortedDictionary class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.sorteddictionary-2?view=net-8.0)

In this article we sorted Dictionary elements in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).