+++
title = "C# Stopwatch"
date = 2025-08-29T19:51:27.712+01:00
draft = false
description = "Learn how to accurately measure execution time in C# using the Stopwatch class. This tutorial explores Stopwatch functionality, performance analysis, and its role within the System.Diagnostics namespace."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Stopwatch

last modified May 16, 2025

 

This C# Stopwatch tutorial demonstrates how to measure execution time in C#
using the Stopwatch class for precise performance tracking.

The Stopwatch class offers a range of methods and properties that
enable accurate time measurement. It is part of the
System.Diagnostics namespace, making it a powerful tool for
performance analysis.

Using Stopwatch is simple and effective: Start the timer with
Start, execute the code segment to be measured, and stop it with
Stop. The elapsed time can then be accessed using properties like
Elapsed, ElapsedMilliseconds, or
ElapsedTicks, offering various levels of precision.

## C# Stopwatch - string concatenation

We measure string concatenation methods.

Program.cs
  

using System.Diagnostics;

var text = string.Empty;

var sw = new Stopwatch();
sw.Start();

for (int i=0; i &lt; 100_000; i++)
{
    text += "abc";
}

var n = text.Length;
Console.WriteLine($"# of chars: {n}");

sw.Stop();
var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"Concat elapsed: {elapsed} ms");

We concatenate a string 100,000 times. We measure efficiency of the
+ operator; the elapsed time is in milliseconds.

$ dotnet run
of chars: 300000
Concat elapsed: 6611 ms

In the second example, we use string interpolation.

Program.cs
  

using System.Diagnostics;
using System.Text;

var text = string.Empty;

var sw = new Stopwatch();
sw.Start();

for (int i=0; i &lt; 100_000; i++)
{
    text = $"{text}abc";
}

var n = text.Length;
Console.WriteLine($"# of chars: {n}");

sw.Stop();
var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"Interpolate elapsed: {elapsed} ms");

The $ special character identifies a string literal as an
interpolated string.

$ dotnet run
of chars: 300000
Interpolate elapsed: 6576 ms

## C# Stopwatch - sorting algorithm

There are several algorithms for sorting items. We are going to compare
selection sort with bubble sort.

Program.cs
  

using System.Diagnostics;

var sw = new Stopwatch();
sw.Start();

DoSelectionSort(GetArray());

sw.Stop();

var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"Selection sort: {elapsed} ms");

int[] GetArray()
{
    var rnd = new Random();

    var vals = new int[30_000];
    for (int i = 0; i &lt; 30_000; i++)
    {

        vals[i] = rnd.Next(1, 100);
    }

    return vals;
}

void DoSelectionSort(int[] a)
{
    int len = a.Length;

    for (int i = 0; i &lt; len - 1; i++)
    {

        int min_idx = i;

        for (int j = i + 1; j &lt; len; j++)
        {
            if (a[j] &lt; a[min_idx])
            {
                min_idx = j;
            }
        }

        int temp = a[min_idx];
        a[min_idx] = a[i];
        a[i] = temp;
    }
}

We create a array having 30,000 random values. The elements are sorted with the
selection sort.

$ dotnet run
Selection sort: 1871 ms

In the second example, we measure the bubble sort.

Program.cs
  

using System.Diagnostics;

var sw = new Stopwatch();
sw.Start();

DoBubbleSort(GetArray());

sw.Stop();

var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"Bubble sort: {elapsed} ms");

int[] GetArray()
{
    var rnd = new Random();

    var vals = new int[30_000];
    for (int i = 0; i &lt; 30_000; i++)
    {

        vals[i] = rnd.Next(1, 100);
    }

    return vals;
}

void DoBubbleSort(int[] a)
{
    int len = a.Length;

    for (int i = 0; i &lt; len - 1; i++)
    {
        for (int j = 0; j &lt; len - i - 1; j++)
        {
            if (a[j] &gt; a[j + 1])
            {
                int temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
}

The bubble sort is a less efficient algorithm, so the it should take longer
to sort the array with bubble sort.

$ dotnet run
Bubble sort: 4368 ms

## C# Stopwatch - measuring LINQ query performance

Stopwatch can also be used to measure the execution time of LINQ queries over
large collections.

Program.cs
  

using System.Diagnostics;

var numbers = Enumerable.Range(1, 10_000_000).ToArray();

var sw = new Stopwatch();
sw.Start();

var result = numbers.Where(n =&gt; n % 2 == 0).Select(n =&gt; n * n).ToArray();

sw.Stop();
var elapsed = sw.ElapsedMilliseconds;

Console.WriteLine($"Processed {result.Length} numbers in {elapsed} ms");

This example measures how long it takes to filter and transform 10 million
numbers using LINQ.

## Source

[Stopwatch class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.stopwatch?view=net-8.0)

In this article we have measured execution time of C# programs with
Stopwatch.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).