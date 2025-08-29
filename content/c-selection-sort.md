+++
title = "C# Selection Sort"
date = 2025-08-29T19:51:22.162+01:00
draft = false
description = "C# selection sort tutorial explains the selection sort algorithm with examples for numeric and textual data, and compares it with quick sort."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Selection Sort

last modified March 9, 2025

 

This article explores the selection sort algorithm in C#. We'll define it, show
examples for sorting numbers and strings, and compare it with quick sort.

An algorithm is a clear, step-by-step process to solve a problem or
complete a task. It's a core concept in programming, guiding how code works.

Sorting organizes data into a specific order, like ascending or
descending. It's a key skill in computer science for managing and accessing
data.

## Common Sorting Algorithms

Here are some widely used sorting algorithms:

- Selection Sort

- Bubble Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Selection Sort Algorithm

The selection sort algorithm repeatedly scans
the unsorted part of a list to find the smallest (or
largest) element. It then swaps this element with the first
unsorted position.

This repeats until the list is fully sorted. It's simple to
understand and implement, but not the fastest for large
datasets.

## Selection Sort Example

Below is a C# implementation of selection sort. It works
with arrays and can sort in ascending or descending order.

SelectionSort.cs
  

// SelectionSort.cs
T[] SelectionSort&lt;T&gt;(T[] arr, bool ascending)
{
    int n = arr.Length;
    for (int i = 0; i &lt; n; i++)
    {
        int idx = i;
        for (int j = i + 1; j &lt; n; j++)
        {
            int comparison = Comparer&lt;T&gt;.Default.Compare(arr[j], arr[idx]);
            if ((ascending &amp;&amp; comparison &lt; 0) || (!ascending &amp;&amp; comparison &gt; 0))
            {
                idx = j;
            }
        }
        if (idx != i)
        {
            (arr[i], arr[idx]) = (arr[idx], arr[i]);
        }
    }
    return arr;
}

int[] numbers = [64, 25, 12, 22, 11];
string[] words = ["apple", "banana", "kiwi", "cherry"];

Console.WriteLine("Ascending: " + string.Join(" ", SelectionSort(numbers, true)));
Console.WriteLine("Descending: " + string.Join(" ", SelectionSort(numbers, false)));
Console.WriteLine("Ascending: " + string.Join(" ", SelectionSort(words, true)));
Console.WriteLine("Descending: " + string.Join(" ", SelectionSort(words, false)));

The SelectionSort method takes an array of type T and
a boolean for sort direction. It uses Comparer.Default to handle
different data types like integers and strings.

## Comparing Selection Sort with Quick Sort

Selection sort is easy to code but slow for big lists, with
a time complexity of O(n²). Quick sort, using a
divide-and-conquer strategy, is faster at O(n log n) on
average. Let's benchmark them.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

int[] SelectionSort(int[] arr)
{
    int n = arr.Length;
    for (int i = 0; i &lt; n; i++)
    {
        int idx = i;
        for (int j = i + 1; j &lt; n; j++)
        {
            if (arr[j] &lt; arr[idx])
            {
                idx = j;
            }
        }
        if (idx != i)
        {
            (arr[i], arr[idx]) = (arr[idx], arr[i]);
        }
    }
    return arr;
}

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

Random rand = new(Random.Shared.Next());
int[] data = new int[1000];
for (int i = 0; i &lt; data.Length; i++)
{
    data[i] = rand.Next(1000);
}

// Benchmark selection sort
int[] selectionData = data.ToArray();
Stopwatch sw = Stopwatch.StartNew();
SelectionSort(selectionData);
Console.WriteLine($"Selection Sort Time: {sw.Elapsed.TotalSeconds:F6} seconds");

// Benchmark quick sort
int[] quickData = data.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
Console.WriteLine($"Quick Sort Time: {sw.Elapsed.TotalSeconds:F6} seconds");

This benchmarks selection sort and quick sort on 1000 random integers. Quick
sort typically finishes much faster due to its efficient design.

## Source

[C# Official Documentation](https://docs.microsoft.com/en-us/dotnet/csharp/)

This tutorial covered selection sort in C# and compared it
with quick sort.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. o
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all C# tutorials](/csharp/).