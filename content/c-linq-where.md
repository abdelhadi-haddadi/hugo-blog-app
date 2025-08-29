+++
title = "C# LINQ Where"
date = 2025-08-27T23:23:16.824+01:00
draft = false
description = "C# LINQ Where tutorial shows how to filter
sequences in C# using LINQ's Where method and where clause."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ Where

last modified February 1, 2024

 

In this article we show how to filter sequences in C# using LINQ's Where method
and where clause.

Language-Integrated Query (LINQ) is a domain-specific language for querying
data from various data sources, including arrays, lists, XML files, or databases.

The where clause or the Where method filters a
sequence of values based on a predicate. A *predicate* is a
single-argument function which returns a boolean value.

This method is lazily evaluated. The query is not executed until the
object is enumerated.

## C# LINQ Where simple example

The first example is a simple program which uses LINQ Select.

Program.cs
  

List&lt;int&gt; vals = [-3, -1, 0, 3, 2, 1, -6, 5, 9];
var res = vals.Where(e =&gt; e &gt; 0);

Console.WriteLine(string.Join(',', res));

The program defines a list of integers. We filter out all positive values.

var res = vals.Where(e =&gt; e &gt; 0);

The Where method applies the given predicate function on each of
the elements. It returns a sequence of values that satisfy the given condition.
In our case the condition is that the value is greater than zero.

$ dotnet run
3,2,1,5,9

## C# LINQ Where with Func predicate

Func is a built-in generic delegate type. It can be used with a
method, an anonymous method or a lambda expression.

Program.cs
  

Func&lt;int, bool&gt; isNeg = e =&gt; e &lt; 0;

List&lt;int&gt; vals = [-3, -1, 0, 3, 2, 1, -6, 5, 9];
var res = vals.Where(isNeg);

Console.WriteLine(string.Join(',', res));

The program applies the Func delegate on the elements of the list.
We filter all negative values.

$ dotnet run
-3,-1,-6

## C# LINQ where clause

Query expressions are an alternative LINQ syntax. In a query expression, we use
the where clause to filter data.

Program.cs
  

List&lt;string&gt; words = [ "sky", "forest", "war", "buy",
    "crypto", "cup", "water", "cloud" ];

var res = from word in words
            where word.StartsWith('c')
            select word;

Console.WriteLine(string.Join(',', res));

In the program, we filter all words that begin with letter 'c'.

$ dotnet run
crypto,cup,cloud

## C# LINQ Where with multiple conditions

We can combine multiple conditions with and/or operators.

Program.cs
  

List&lt;User&gt; users =
[
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
];

var res = users.Where(u =&gt; (u.LastName.StartsWith('D') ||
    u.LastName.StartsWith('W')) &amp;&amp; u.Salary &gt; 1000);

foreach (var e in res)
{
    Console.WriteLine(e);
}

record User(string FirstName, string LastName, int Salary);

In the example, we apply three conditions to our filtering. We choose only those
users whose names begin with either 'D' or 'W' and whose salaries are higher
than 1000. 

$ dotnet run
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }

## Source

[Enumerable.Where method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where?view=net-8.0)

In this article we have presented the LINQ Where operation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).