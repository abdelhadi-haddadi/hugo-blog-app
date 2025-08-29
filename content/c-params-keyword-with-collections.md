+++
title = "C# params Keyword with Collections"
date = 2025-08-29T19:51:13.062+01:00
draft = false
description = "This C# params tutorial demonstrates how to use the params keyword with various collection types in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# params Keyword with Collections

Last modified April 19, 2025

 

This tutorial explores how to use the params keyword in C# with
various collection types like List&lt;T&gt;,
Span&lt;T&gt;, and IEnumerable&lt;T&gt;.

In C# 13, the params keyword has been extended to support
additional collection types beyond arrays, enabling more flexible and efficient
method parameter handling.

## Understanding the params Keyword in C#

The params keyword allows a method to accept a variable number of
arguments, which are treated as a collection inside the method. With C# 13,
params now supports types like List&lt;T&gt;,
Span&lt;T&gt;, IEnumerable&lt;T&gt;, and others, in addition
to arrays.

Key characteristics of params:

    - It must be the last parameter in the method signature.

    - Only one params parameter is allowed per method.

    - It supports specific collection types like List&lt;T&gt; or Span&lt;T&gt;.

    - It allows zero or more arguments to be passed.

## Using params with Array

This example demonstrates params with an array to calculate the
average.

Program.cs
  

double Average(params int[] numbers)
{
    return numbers.Length &gt; 0 ? numbers.Average() : 0;
}

int[] values = { 4, 8, 12 };
Console.WriteLine(Average(1, 2, 3));
Console.WriteLine(Average(values));

The Average method computes the average of a variable number of
integers or an array passed directly.

$ dotnet run
2
8

## Using params with List&lt;T&gt;

This example uses params with a List&lt;int&gt; to sum
numbers.

Program.cs
  

int SumNumbers(params List&lt;int&gt; numbers)
{
    return numbers.Sum();
}

Console.WriteLine(SumNumbers(1, 2, 3));
Console.WriteLine(SumNumbers(10, 20, 30, 40));
Console.WriteLine(SumNumbers());

The SumNumbers method accepts a variable number of integers as a
List&lt;int&gt; and returns their sum.

$ dotnet run
6
100
0

## Using params with Span&lt;T&gt;

This example uses params with a Span&lt;string&gt; to
concatenate strings.

Program.cs
  

string ConcatStrings(params Span&lt;string&gt; words)
{
    return string.Join(" ", words.ToArray());
}

Console.WriteLine(ConcatStrings("Hello"));
Console.WriteLine(ConcatStrings("C#", "is", "awesome"));
Console.WriteLine(ConcatStrings());

The ConcatStrings method joins strings from a
Span&lt;string&gt;, handling any number of inputs.

$ dotnet run
Hello
C# is awesome

## Using params with IEnumerable&lt;T&gt;

This example combines a fixed parameter with a params
IEnumerable&lt;string&gt; parameter.

Program.cs
  

void PrintItems(string category, params IEnumerable&lt;string&gt; items)
{
    Console.WriteLine($"Category: {category}");
    foreach (var item in items)
    {
        Console.WriteLine($"  - {item}");
    }
}

PrintItems("Fruits", new[] { "Apple", "Banana", "Orange" });
PrintItems("Tools", "Hammer", "Screwdriver");

The PrintItems method takes a category and a variable number of
items as an IEnumerable&lt;string&gt;, printing them in a list.

$ dotnet run
Category: Fruits
  - Apple
  - Banana
  - Orange
Category: Tools
  - Hammer
  - Screwdriver

## Using params with ReadOnlySpan&lt;T&gt;

This example demonstrates params with a
ReadOnlySpan&lt;object&gt;.

Program.cs
  

void DisplayValues(params ReadOnlySpan&lt;object&gt; values)
{
    foreach (var value in values)
    {
        Console.WriteLine($"Value: {value}");
    }
}

DisplayValues(42, "Hello", 3.14, true);
DisplayValues("Test", 100);

The DisplayValues method accepts a variable number of objects as a
ReadOnlySpan&lt;object&gt;, displaying each one.

$ dotnet run
Value: 42
Value: Hello
Value: 3.14
Value: True
Value: Test
Value: 100

## Passing a Collection to params

This example shows passing a List&lt;int&gt; to a
params List&lt;int&gt; parameter.

Program.cs
  

int MaxValue(params List&lt;int&gt; numbers)
{
    return numbers.Any() ? numbers.Max() : 0;
}

List values = [5, 2, 8, 1, 9];
Console.WriteLine(MaxValue(1, 2, 3));
Console.WriteLine(MaxValue(values));

The MaxValue method finds the maximum value from a variable number
of integers or a List&lt;int&gt; passed directly.

$ dotnet run
3
9

## Best Practices

When using params with collections in C#:

    - Choose the appropriate collection type (e.g., Span&lt;T&gt; for performance).

    - Handle empty collections gracefully in method logic.

    - Avoid overloading with params to prevent ambiguity.

    - Use specific types over object for type safety.

## Source

[params keyword - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/params)

This tutorial has demonstrated how to use the params keyword in C#
with various collection types for flexible method parameters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007. To
date, I have authored over 1,400 articles and 8 e-books. I possess more than ten
years of experience in teaching programming.

List [all C# tutorials](/csharp/).