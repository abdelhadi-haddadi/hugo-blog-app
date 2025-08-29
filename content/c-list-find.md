+++
title = "C# List Find"
date = 2025-08-27T23:23:19.065+01:00
draft = false
description = "This C# List Find tutorial demonstrates how to
locate elements in a C# List using the Find, FindLast, FindAll, FindIndex, and
FindLastIndex methods."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List Find

Last modified April 11, 2025

 

This tutorial illustrates how to locate elements in a C# List using the
Find, FindLast, FindAll,
FindIndex, and FindLastIndex methods.

In C#, a List is a dynamic collection that holds elements of the
same type, accessible by their index positions.

## C# List Find

The Find method retrieves the first element in a List
that satisfies a specified condition, known as a predicate.

A *predicate* is a function that takes a single argument and returns a
boolean value, indicating whether the element meets the condition.

public T? Find(Predicate match);

The Find method accepts a Predicate&lt;T&gt; delegate,
which defines the condition to match.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" };

var vals = new List&lt;int&gt; { -2, -1, 3, 0, 1, 2, 1, 4, -2, 2, 1 };

string? e = words.Find(e =&gt; e.StartsWith("w"));
Console.WriteLine(e);

int n = vals.Find(e =&gt; e &gt; 0);
Console.WriteLine(n);

This example demonstrates finding the first word starting with 'w' in a list of
strings and the first positive integer in a list of numbers.

string? e = words.Find(e =&gt; e.StartsWith("w"));

Here, the predicate is a lambda expression that checks if a word begins with 'w'.

$ dotnet run
war
3

## C# List FindLast

The FindLast method returns the last element in a List
that matches the given predicate.

public T? FindLast(Predicate match);

This defines the method's signature.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" };

var vals = new List&lt;int&gt; { -2, -1, 3, 0, 1, 2, 1, 4, -2, 2, 1 };

string? e = words.FindLast(e =&gt; e.StartsWith("w"));
Console.WriteLine(e);

int n = vals.FindLast(e =&gt; e &gt; 0);
Console.WriteLine(n);

This program identifies the last word starting with 'w' in a list of strings and
the last positive integer in a list of numbers.

$ dotnet run
water
1

## C# List FindAll

The FindAll method retrieves all elements in a List
that satisfy the specified predicate, returning them as a new List.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" };

var vals = new List&lt;int&gt; { -2, -1, 3, 0, 1, 2, 1, 4, -2, 2, 1 };

List&lt;string&gt; res = words.FindAll(e =&gt; e.StartsWith("w"));
Console.WriteLine(string.Join(',', res));

List&lt;int&gt; res2 = vals.FindAll(e =&gt; e &gt; 0);
Console.WriteLine(string.Join(',', res2));

This example collects all words starting with 'w' from a list of strings and all
positive integers from a list of numbers, then displays them as comma-separated
strings.

$ dotnet run
war,wrong,water
3,1,2,1,4,2,1

## C# List FindIndex

The FindIndex method returns the zero-based index of the first
element that matches the predicate. If no element is found, it returns -1.

public int FindIndex(Predicate match);
public int FindIndex(int startIndex, Predicate match);
public int FindIndex(int startIndex, int count, Predicate match);

These overloaded methods allow specifying a starting index and, optionally, the
number of elements to search.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" };

int n = words.FindIndex(e =&gt; e.StartsWith("w"));
Console.WriteLine($"The index of the first word starting with 'w' is {n}");

int n2 = words.FindIndex(5, e =&gt; e.StartsWith("w"));
Console.WriteLine($"The index of the first word starting with 'w' after index 5 is {n2}");

This program finds the index of the first word starting with 'w' from the
beginning of the list and from index 5 onward.

$ dotnet run
The index of the first word starting with 'w' is 3
The index of the first word starting with 'w' after index 5 is 7

## C# List FindLastIndex

The FindLastIndex method returns the zero-based index of the last
element that matches the predicate. If no match is found, it returns -1.

public int FindLastIndex(Predicate&lt;T&gt; match);
public int FindLastIndex(int startIndex, Predicate&lt;T&gt; match);
public int FindLastIndex(int startIndex, int count, Predicate&lt;T&gt; match);

These are the method signatures, allowing control over the search range.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" };

int n = words.FindLastIndex(e =&gt; e.StartsWith("w"));
Console.WriteLine($"The index of the last word starting with 'w' is {n}");

int n2 = words.FindLastIndex(5, e =&gt; e.StartsWith("w"));
Console.WriteLine($"The index of the last word starting with 'w' up to index 5 is {n2}");

This example locates the index of the last word starting with 'w' in the entire
list and the last one up to index 5.

$ dotnet run
The index of the last word starting with 'w' is 7
The index of the last word starting with 'w' up to index 5 is 4

## Source

[List Find method](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.find?view=net-8.0)

This tutorial has demonstrated how to locate elements in a C# List
using various finding methods.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with extensive
experience. Since 2007, I have been creating programming tutorials, authoring
over 1,400 articles and 8 e-books. With more than a decade of teaching
programming, I am committed to sharing my knowledge.

Explore [all C# tutorials](/csharp/).