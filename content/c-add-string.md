+++
title = "C# add string"
date = 2025-08-27T23:22:42.492+01:00
draft = false
description = "C# add strings shows how to concatenate
strings in C#. There are several ways to add strings in C#, including + 
operator, string.Format, string.Join, or string interpolation."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# add string

last modified July 5, 2023

 

C# add string tutorial shows how to add strings in C# language.

In C#, a string is a sequence of Unicode characters.

There are several ways how to add strings in C#:

  - + operator

  - string.Concat method

  - string.Join method

  - StringBuilder Append method

  - string interpolation

  - string.Format

## C# add strings with + operator

The easiest way of concatenating strings is to use the + or the
+= operator. The + operator is used both for adding numbers and
strings; in programming we say that the operator is overloaded. 

Program.cs
  

var a = "an old";
var b = " falcon";

var c = a + b;
Console.WriteLine(a + b);

The example adds two strings using the + operator.

$ dotnet run
an old falcon

In the second example, we use the compound addition operator. 

Program.cs
  

var msg = "There are ";

msg += "three falcons ";
msg += "in the sky";

Console.WriteLine(msg);

The example builds a message with the += operator. 

$ dotnet run
There are three falcons in the sky

## C# add strings with string.Concat

The string.Concat method concatenates one or more instances of 
string.

Program.cs
  

var a = "and old";
var b = " eagle";

var c = string.Concat(a, b);

Console.WriteLine(c);

The example concatenates two strings with the string.Concat method.

## C# add strings with string.Join

The string.Join method concatenates the elements of a specified
array or the members of a collection, using the specified separator between each
element or member.

Program.cs
  

var words = new List&lt;string&gt;{"There", "are", "two", "owls", "on", "the", "tree"};
var msg = string.Join(" ", words);

Console.WriteLine(msg);

In the example, we concatenate strings of a list. 

$ dotnet run
There are two owls on the tree

## C# add strings with StringBuilder

StringBuilder is a mutable sequence of characters. Its
Append method appends the specified string to the string instance.

Program.cs
  

using System.Text;

var builder = new StringBuilder("There");

builder.Append(" are");
builder.Append(" two");
builder.Append(" falcons");
builder.Append(" in");
builder.Append(" the");
builder.Append(" sky");

Console.WriteLine(builder);

In the example, we form a new string with StringBuilder.

$ dotnet run 
There are two falcons in the sky

## C# add strings with string interpolation

We can build C# strings with string interpolation. Interpolated strings 
start with the $ character.

Program.cs
  

var w1 = "three";
var w2 = "owls";

var msg = $"There are {w1} {w2} on the tree";

Console.WriteLine(msg);

Inside interpolated strings, the variables inside the curly brackets
{} are expanded.

$ dotnet run
There are three owls on the tree

## C# add strings with string.Format

The string.Format converts the value of objects to strings based on
the formats specified and inserts them into newly formed string.

Program.cs
  

var w1 = "three";
var w2 = "owls";

var msg = string.Format("There are {0} {1} on the tree", w1, w2);

Console.WriteLine(msg);

We build a new string with string.Format.

## Source

[Strings and string literals](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/strings/)

In this article we have showed several ways how to add strings in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).