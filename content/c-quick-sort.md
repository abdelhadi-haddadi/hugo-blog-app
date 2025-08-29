+++
title = "C# Quick Sort"
date = 2025-08-29T19:51:16.522+01:00
draft = false
description = "C# Quick Sort tutorial explains the Quick Sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Quick Sort

last modified March 8, 2025

 

This tutorial explores the Quick Sort algorithm in C#, showing
how to sort numeric and textual data in ascending and
descending order.

An algorithm is a structured sequence of steps
designed to address a problem or perform a task efficiently.
It's a cornerstone of programming, guiding computational
logic.

Sorting means organizing data into a specific
sequence, such as ascending (small to large) or descending
(large to small). It's vital for tasks like data retrieval
and presentation.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Quick Sort

- Merge Sort

- Bubble Sort

- Insertion Sort

- Selection Sort

## Quick Sort Algorithm

Quick Sort is a divide-and-conquer algorithm that selects a
pivot element and partitions the array around it. Elements
smaller than the pivot go left, larger ones go right.

The sub-arrays are recursively sorted, leading to a fully
sorted array. With an average time complexity of O(n log n),
it's efficient for most datasets, though worst-case is O(n²).

## Quick Sort Example

Below is a C# implementation of Quick Sort for numbers and
strings using top-level statements.

QuickSort.cs
  

// QuickSort.cs
int[] QuickSort(int[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    int pivot = arr[arr.Length / 2];
    var left = new List&lt;int&gt;();
    var middle = new List&lt;int&gt;();
    var right = new List&lt;int&gt;();

    foreach (int x in arr)
    {
        if (x &lt; pivot)
        {
            left.Add(x);
        }
        else if (x == pivot)
        {
            middle.Add(x);
        }
        else
        {
            right.Add(x);
        }
    }

    return [.. QuickSort(left.ToArray()), .. middle, .. QuickSort(right.ToArray())];
}

string[] QuickSortStrings(string[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    string pivot = arr[arr.Length / 2];
    var left = new List&lt;string&gt;();
    var middle = new List&lt;string&gt;();
    var right = new List&lt;string&gt;();

    foreach (string x in arr)
    {
        if (string.Compare(x, pivot) &lt; 0)
        {
            left.Add(x);
        }
        else if (string.Compare(x, pivot) == 0)
        {
            middle.Add(x);
        }
        else
        {
            right.Add(x);
        }
    }

    return [.. QuickSortStrings(left.ToArray()), .. middle, .. QuickSortStrings(right.ToArray())];
}

int[] numbers = [3, 6, 8, 10, 1, 2, 1];
int[] sortedNumbers = QuickSort(numbers);
Console.WriteLine("Sorted numbers: " + string.Join(" ", sortedNumbers));

string[] words = ["banana", "apple", "cherry", "date"];
string[] sortedWords = QuickSortStrings(words);
Console.WriteLine("Sorted words: " + string.Join(" ", sortedWords));

The QuickSort method sorts integers, while
QuickSortStrings handles strings. Both use a
middle pivot and partition the data recursively.

The result is a new sorted array in ascending order. This
approach leverages C#'s type system, ensuring flexibility for
different data types in a concise way.

## Sorting in Descending Order

Here's how to adapt Quick Sort for descending order in C#.

QuickSortDesc.cs
  

// QuickSortDesc.cs
int[] QuickSortDesc(int[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    int pivot = arr[arr.Length / 2];
    var left = new List&lt;int&gt;();
    var middle = new List&lt;int&gt;();
    var right = new List&lt;int&gt;();

    foreach (int x in arr)
    {
        if (x &gt; pivot)
        {
            left.Add(x);
        }
        else if (x == pivot)
        {
            middle.Add(x);
        }
        else
        {
            right.Add(x);
        }
    }

    return [.. QuickSortDesc(left.ToArray()), .. middle, .. QuickSortDesc(right.ToArray())];
}

string[] QuickSortStringsDesc(string[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    string pivot = arr[arr.Length / 2];
    var left = new List&lt;string&gt;();
    var middle = new List&lt;string&gt;();
    var right = new List&lt;string&gt;();

    foreach (string x in arr)
    {
        if (string.Compare(x, pivot) &gt; 0)
        {
            left.Add(x);
        }
        else if (string.Compare(x, pivot) == 0)
        {
            middle.Add(x);
        }
        else
        {
            right.Add(x);
        }
    }

    return [.. QuickSortStringsDesc(left.ToArray()), .. middle, .. QuickSortStringsDesc(right.ToArray())];
}

int[] numbers = [3, 6, 8, 10, 1, 2, 1];
int[] sortedNumbersDesc = QuickSortDesc(numbers);
Console.WriteLine("Sorted numbers (descending): " + string.Join(" ", sortedNumbersDesc));

string[] words = ["banana", "apple", "cherry", "date"];
string[] sortedWordsDesc = QuickSortStringsDesc(words);
Console.WriteLine("Sorted words (descending): " + string.Join(" ", sortedWordsDesc));

The QuickSortDesc and
QuickSortStringsDesc methods reverse the
partitioning logic—larger elements go left, smaller go
right—yielding descending order.

This adaptation is useful for scenarios like ranking items
from highest to lowest, such as scores or alphabetically
reversed lists in C# applications.

## Comparing Quick Sort with Insertion Sort

Quick Sort's average O(n log n) performance outshines
Insertion Sort's O(n²), especially for large datasets. This
benchmark in C# illustrates the difference.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

int[] QuickSort(int[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    int pivot = arr[arr.Length / 2];
    var left = new List&lt;int&gt;();
    var middle = new List&lt;int&gt;();
    var right = new List&lt;int&gt;();

    foreach (int x in arr)
    {
        if (x &lt; pivot)
        {
            left.Add(x);
        }
        else if (x == pivot)
        {
            middle.Add(x);
        }
        else
        {
            right.Add(x);
        }
    }

    return [.. QuickSort(left.ToArray()), .. middle, .. QuickSort(right.ToArray())];
}

int[] InsertionSort(int[] arr)
{
    int[] result = arr.ToArray();

    for (int i = 1; i &lt; result.Length; i++)
    {
        int key = result[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; key &lt; result[j]; j--)
        {
            result[j + 1] = result[j];
        }
        result[j + 1] = key;
    }

    return result;
}

Random rand = new(Random.Shared.Next());
int[] data = new int[10000];
for (int i = 0; i &lt; data.Length; i++)
{
    data[i] = rand.Next(1000);
}

int[] quickData = data.ToArray();
Stopwatch sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

int[] insertData = data.ToArray();
sw = Stopwatch.StartNew();
InsertionSort(insertData);
double insertTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Quick Sort time: {quickTime:F6} seconds");
Console.WriteLine($"Insertion Sort time: {insertTime:F6} seconds");

This code generates 10000 random integers and times both
algorithms. Quick Sort uses recursion and partitioning, while
Insertion Sort shifts elements one by one.

Quick Sort typically finishes much faster—often by an order
of magnitude—due to its logarithmic scaling. Insertion Sort,
while simpler, struggles with large data, making it less
practical here.

Such comparisons help developers choose algorithms based on
dataset size and performance needs in C# projects.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial explained Quick Sort in C#, with examples for
ascending and descending sorts, plus a benchmark against
Insertion Sort.

## Author

My name is Jan Bodnar and I am a passionate programmer with
many years of programming experience. I have been writing
programming articles since 2007.

So far, I have written over 1400 articles and 8 e-books. I
have over eight years of experience in teaching programming.

List [all C# tutorials](/csharp/).