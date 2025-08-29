+++
title = "C# Bubble Sort"
date = 2025-08-27T23:22:47.017+01:00
draft = false
description = "C# Bubble Sort tutorial explains the Bubble
Sort algorithm with examples for sorting numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Bubble Sort

last modified March 8, 2025

 

This tutorial explores the Bubble Sort algorithm in C#. We
demonstrate sorting numeric and textual data in ascending
and descending order, and benchmark it against Quick Sort.

An algorithm is a well-defined sequence of steps
designed to solve a problem or complete a task efficiently.
In programming, algorithms are the backbone of computational
logic.

Sorting refers to organizing a collection of data
into a specific sequence, such as ascending (smallest to
largest) or descending (largest to smallest). It's a key
operation in many applications, from databases to user
interfaces.

## Common Sorting Algorithms

Here are some widely recognized sorting algorithms:

- Bubble Sort

- Quick Sort

- Merge Sort

- Insertion Sort

- Selection Sort

## Bubble Sort Algorithm

Bubble Sort is a straightforward sorting method that iterates
through a list, comparing adjacent items and swapping them if
they're out of order. It's named for how larger elements
"bubble up" to the end.

The process repeats until no more swaps are needed, indicating
the list is sorted. While simple, it's not the fastest for
large datasets due to its quadratic time complexity.

## Bubble Sort Example

Below is a C# implementation of Bubble Sort for numbers using
top-level statements and implicit usings.

BubbleSort.cs
  

// BubbleSort.cs
void BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i &lt; n; i++)
    {
        for (int j = 0; j &lt; n - i - 1; j++)
        {
            if (arr[j] &gt; arr[j + 1])
            {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
            }
        }
    }
}

int[] nums = [64, 34, 25, 12, 22, 11, 90];
BubbleSort(nums);
Console.WriteLine("Sorted array: " + string.Join(" ", nums));

This code defines a BubbleSort method that sorts an
integer array in ascending order. The outer loop runs
n times, where n is the array length.

The inner loop compares adjacent elements, swapping them if
the left is greater than the right. After execution, the array
is sorted from smallest to largest.

## Sorting Textual Data

Bubble Sort can also handle strings. Here's an example sorting
text in both ascending and descending order.

BubbleSortText.cs
  

// BubbleSortText.cs
void BubbleSort(string[] arr, bool reverse)
{
    int n = arr.Length;
    for (int i = 0; i &lt; n; i++)
    {
        for (int j = 0; j &lt; n - i - 1; j++)
        {
            int cmp = string.Compare(arr[j], arr[j + 1]);
            if ((!reverse &amp;&amp; cmp &gt; 0) || (reverse &amp;&amp; cmp &lt; 0))
            {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
            }
        }
    }
}

string[] words = ["banana", "apple", "cherry", "date"];
BubbleSort(words, false);
Console.WriteLine("Ascending order: " + string.Join(" ", words));

BubbleSort(words, true);
Console.WriteLine("Descending order: " + string.Join(" ", words));

The BubbleSort method now takes a
reverse boolean to toggle sorting direction. For
ascending, it swaps if the left string is alphabetically
greater.

For descending, it swaps if the left is less than the right.
This flexibility makes it useful for sorting names, tags, or
other textual data in C# programs.

## Comparing Bubble Sort with Quick Sort

Bubble Sort's simplicity comes at a cost—it's slow for large
datasets, with a time complexity of O(n²). Quick Sort, with an
average complexity of O(n log n), is much faster.

The example below benchmarks both algorithms using a large
random dataset to highlight their performance differences in
C#.

SortBenchmark.cs
  

using System.Diagnostics;

// SortBenchmark.cs
void BubbleSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i &lt; n; i++)
    {
        for (int j = 0; j &lt; n - i - 1; j++)
        {
            if (arr[j] &gt; arr[j + 1])
            {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
            }
        }
    }
}

int[] QuickSort(int[] arr)
{
    if (arr.Length &lt;= 1) return arr;
    int pivot = arr[arr.Length / 2];
    var left = new List&lt;int&gt;();
    var middle = new List&lt;int&gt;();
    var right = new List&lt;int&gt;();
    foreach (int x in arr)
    {
        if (x &lt; pivot) left.Add(x);
        else if (x == pivot) middle.Add(x);
        else right.Add(x);
    }
    return [.. QuickSort(left.ToArray()), .. middle, .. QuickSort(right.ToArray())];
}

Random rand = new(Random.Shared.Next());
int[] data = new int[5000];
for (int i = 0; i &lt; data.Length; i++)
{
    data[i] = rand.Next(1000);
}

int[] bubbleData = (int[])data.Clone();
Stopwatch sw = Stopwatch.StartNew();
BubbleSort(bubbleData);
double bubbleTime = sw.Elapsed.TotalSeconds;

int[] quickData = (int[])data.Clone();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Bubble Sort time: {bubbleTime:F6} seconds");
Console.WriteLine($"Quick Sort time: {quickTime:F6} seconds");

This code generates 1000 random integers and times both
sorting methods. The BubbleSort method modifies
the array in place, while QuickSort returns a new
sorted array using recursion.

Quick Sort partitions the data around a pivot, recursively
sorting sublists, making it more efficient. The benchmark
typically shows Bubble Sort taking significantly longer—often
by a factor of 10 or more.

Understanding these differences helps developers choose the
right algorithm for their needs, balancing simplicity against
performance in real-world C# applications.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial covered Bubble Sort in C#, with examples for
numbers and text, plus a performance comparison to Quick
Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).