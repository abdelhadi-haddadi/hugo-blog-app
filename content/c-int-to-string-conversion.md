+++
title = "C# int to string conversion"
date = 2025-08-29T19:50:54.460+01:00
draft = false
description = "C# int to String tutorial shows how to convert integers to strings. There are several ways to perform int to String conversion in C#. We can use string concatenation, string formatting, string building, and use built-in conversion methods."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# int to string conversion

last modified January 22, 2024

 

C# int to String tutorial shows how to convert integers to strings. There are
several ways to perform int to String conversion in C#. We can use string
concatenation, string formatting, string building, and use built-in conversion
methods.

## C# int to string conversion

Integer to string conversion is a type conversion or type casting,
where an entity of integer data type is changed into string one.

In the examples of this article we build string messages that contain an
integer.

## C# int to string with Int32.ToString

The Int32.ToString method converts the numeric value
to its equivalent string representation. The int.ToString is an 
alias for the Int32.ToString.

Program.cs
  

int val = 4;
string msg = "There are " + val.ToString() + " hawks";

Console.WriteLine(msg);

The example uses int.ToString to do int to string conversion.

$ dotnet run
There are 4 hawks

## C# int to string with string concatenation

When we use the + operator on int and string parameters,
the C# compiler internally performs type conversion.

Program.cs
  

int numOfApples = 16;
string msg = "There are " + numOfApples + " apples";

Console.WriteLine(msg);

The example uses string concatenation to do int to string conversion.

## C# int to string with StringBuilder

StringBuilder represents a mutable string of characters. We can
use StringBuilder to construct strings. We can append integers
to the builder as well.

Program.cs
  

using System.Text;

int val = 4;
var builder = new StringBuilder();

builder.Append("There are ");
builder.Append(val).ToString();
builder.Append(" hawks");

Console.WriteLine(builder);

The code example uses StringBuilder to do int to string conversion.

## C# int to string other examples

The following example provides other ways to the int to string
conversion in C#.

Program.cs
  

int val = 4;

string msg = "There are " + Convert.ToString(val) + " hawks";
string msg2 = string.Format("There are {0} hawks", val);
string msg3 = $"There are {val} hawks";

Console.WriteLine(msg);
Console.WriteLine(msg2);
Console.WriteLine(msg3);

We use Convert.ToString, string.Format,
and string interpolation to do int to string conversions.

## Source

[Int32.ToString method](https://learn.microsoft.com/en-us/dotnet/api/system.int32.tostring?view=net-8.0)

In this article we have shown how to perform int to string conversions in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).