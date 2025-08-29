+++
title = "C# Span"
date = 2025-08-29T19:51:25.519+01:00
draft = false
description = "C# Span tutorial shows how to use the Span type for memory-efficient operations in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Span

last modified February 15, 2025

 

In this article, we show how to use the Span type in C#. The
Span type is a memory-efficient way to work with contiguous memory
regions, such as arrays, strings, and stack-allocated memory. It avoids
unnecessary memory allocations and improves performance.

The Span type is particularly useful for scenarios where you need
to manipulate slices of arrays or strings without creating additional copies.

The Span type is a ref struct that provides a type-safe and
memory-safe representation of a contiguous region of memory. It can point to
memory on the stack, heap, or even unmanaged memory. Unlike arrays,
Span does not allocate memory; it simply provides a view into
existing memory.

## Creating a Span

The following example demonstrates how to create a Span from an array.

Program.cs
  

int[] numbers = { 1, 2, 3, 4, 5 };

// Create a Span from an array
Span&lt;int&gt; span = numbers.AsSpan();

// Modify the Span
span[0] = 10;

// Print the original array
Console.WriteLine(string.Join(", ", numbers));

In this program, a Span is created from an array using the
AsSpan method. Modifying the Span also modifies the
original array because Span provides a view into the array's
memory.

$ dotnet run
10, 2, 3, 4, 5

## Slicing a Span

The following example demonstrates how to slice a Span to work with
a subset of its elements.

Program.cs
  

int[] numbers = { 1, 2, 3, 4, 5 };

// Create a Span from an array
Span&lt;int&gt; span = numbers.AsSpan();

// Slice the Span to get a subset
Span&lt;int&gt; slice = span.Slice(1, 3);

// Modify the slice
slice[0] = 20;

// Print the original array
Console.WriteLine(string.Join(", ", numbers));

In this program, the Slice method is used to create a
Span that represents a subset of the original array. Modifying the
slice also modifies the original array.

$ dotnet run
1, 20, 3, 4, 5

## Span with Strings

The following example demonstrates how to use Span with strings to
avoid unnecessary allocations.

Program.cs
  

string text = "an old falcon";

// Create a Span from a string
ReadOnlySpan&lt;char&gt; span = text.AsSpan();

// Slice the Span to get a substring
ReadOnlySpan&lt;char&gt; slice = span.Slice(7, 6);

// Print the slice
Console.WriteLine(slice.ToString());

In this program, a ReadOnlySpan is created from a string using the
AsSpan method. The Slice method is used to extract a
substring without allocating additional memory.

$ dotnet run
falcon

## Stack Allocation with Span

The following example demonstrates how to use Span with
stack-allocated memory.

Program.cs
  

// Allocate memory on the stack
Span&lt;int&gt; span = stackalloc int[5] { 1, 2, 3, 4, 5 };

// Modify the Span
span[0] = 10;

Console.WriteLine(string.Join(", ", span.ToArray()));

In this program, the stackalloc keyword is used to allocate memory
on the stack, and a Span is created to work with this memory. This
avoids heap allocations and improves performance.

$ dotnet run
10, 2, 3, 4, 5

## Comparing Efficiency of Span vs Array

The following example demonstrates the efficiency of Span compared
to a traditional array. We measure the time taken to sum elements in a large
array using both approaches.

Program.cs
  

using System.Diagnostics;

int dataSize = 100_000_000;
int[] dataArray = new int[dataSize];
Random random = new();
for (int i = 0; i &lt; dataSize; i++)
{
    dataArray[i] = random.Next(1, 100);
}

List&lt;int&gt; dataList = [.. dataArray];

void MeasureListSum()
{
    Stopwatch stopwatch = Stopwatch.StartNew();
    long sum = 0;

    for (int i = 0; i &lt; dataList.Count; i++)
    {
        sum += dataList[i];
    }

    stopwatch.Stop();
    Console.WriteLine($"List Sum: {sum}, Time: {stopwatch.ElapsedMilliseconds} ms");
}

void MeasureSpanSum()
{
    Stopwatch stopwatch = Stopwatch.StartNew();
    long sum = 0;
    Span&lt;int&gt; dataSpan = dataArray;

    for (int i = 0; i &lt; dataSpan.Length; i++)
    {
        sum += dataSpan[i];
    }

    stopwatch.Stop();
    Console.WriteLine($"Span Sum: {sum}, Time: {stopwatch.ElapsedMilliseconds} ms");
}

MeasureListSum();
MeasureSpanSum();

In this program, we create a large array of 100 million integers and measure the
time taken to sum its elements using both a List and a
Span. 

int dataSize = 100_000_000;
int[] dataArray = new int[dataSize];
Random random = new();
for (int i = 0; i &lt; dataSize; i++)
{
    dataArray[i] = random.Next(1, 100);
}

List&lt;int&gt; dataList = [.. dataArray];

An array of size 100_000_000 is created and filled with random integers. The
array is then used to initialize a List&lt;int&gt; .

Span&lt;int&gt; dataSpan = dataArray;

for (int i = 0; i &lt; dataSpan.Length; i++)
{
    sum += dataSpan[i];
}

Span&lt;int&gt; can offer performance benefits over
List&lt;int&gt; due to its lower overhead and ability to work
directly with slices of arrays without additional memory allocations.

$ dotnet run
List Sum: 5000008283, Time: 524 ms
Span Sum: 5000008283, Time: 412 ms

The results show that using Span is slightly faster than using a
traditional array, as it avoids unnecessary overhead and provides a more
efficient way to work with contiguous memory.

## Source

[C# Span - Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.span-1)

In this article, we have shown how to use the Span type in C# for
memory-efficient operations. The Span type is a powerful tool for
working with contiguous memory regions without unnecessary allocations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).