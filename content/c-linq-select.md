+++
title = "C# LINQ Select"
date = 2025-08-29T19:51:00.092+01:00
draft = false
description = "C# LINQ Select tutorial shows how to map elements to an expression in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ Select

last modified January 19, 2024

 

In this article we show how to map elements to an expression with LINQ's 
Select method and select clause.

Language-Integrated Query (LINQ) is a domain-specific language for querying data
from various data sources, including arrays, lists, XML files, or databases.

The select clause or the Select method projects each
element of a sequence into a new form. It selects, projects and transforms
elements in a collection. The Select is usually called Map in other languages. 

The Enumerable.Select method takes a selector function as a
parameter. The selector is a transform function which is applied to each source
element.

## C# LINQ Select simple example

The first example is a simple program which uses LINQ Select.

Program.cs
  

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6];

var res = vals.Select(e =&gt; e * 2);
Console.WriteLine(string.Join(',', res));

The program defines a list of integers. All elements are multiplied by two.

var res = vals.Select(e =&gt; e * 2);

The Select method applies the given lambda expression on each of 
the elements. It returns a sequence of values modified by the selector function.

$ dotnet run 
2,4,6,8,10,12

## C# LINQ Func selector

Func is a built-in generic delegate type. It can be used with a
method, an anonymous method or a lambda expression.  

Program.cs
  

List&lt;int&gt; vals = [1, 2, 3, 4, 5, 6];

Func&lt;int, int&gt; byfive = e =&gt; e * 5; 

var res = vals.Select(byfive);
Console.WriteLine(string.Join(',', res));

The program applies the Func delegate on the elements of the list.

$ dotnet run
5,10,15,20,25,30

## C# LINQ select clause

Query expressions are an alternative LINQ syntax. In a query expression, we use 
the select clause. 

Program.cs
  

List&lt;string&gt; words = ["sky", "cup", "loud", "war", "water"];

var res = from word in words
          select word.Length;

Console.WriteLine(string.Join(',', res));

In the program, we transform a list of words into a sequence of word lengths. 

$ dotnet run
3,3,4,3,5

## C# LINQ selector with index

We can pass the index of the element to the selector function.

Program.cs
  

List&lt;string&gt; words = ["sky", "cup", "loud", "war", "water"];

var res = words.Select((e, idx) =&gt; new { idx, len = e.Length });

foreach (var e in res)
{
    Console.WriteLine($"{e}");
}

In the program, the resulting object includes also the index of the element.

$ dotnet run
{ idx = 0, len = 3 }
{ idx = 1, len = 3 }
{ idx = 2, len = 4 }
{ idx = 3, len = 3 }
{ idx = 4, len = 5 }

## C# LINQ select projection

The select clause also performs projections. A projection is a
selection of specific fields from the returned objects. 

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

var res = from user in users
          orderby user.Salary
          select user.Salary;

Console.WriteLine(string.Join('\n', res));

record User(string FirstName, string LastName, int Salary);

We have list of users having three fields: first name, last name, and salary. 
We sort the users by salary and pick only the salary field in the resulting 
sequence.

$ dotnet run
670
980
1190
1230
1250
1930
2050
2300

## Source

[Enumerable.Select method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select?view=net-8.0)

In this article we have presented the LINQ Select operation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).