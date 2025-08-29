+++
title = "C# Counting Sort Algorithm"
date = 2025-08-29T19:50:36.318+01:00
draft = false
description = "C# tutorial on the counting sort algorithm with examples for numeric and textual data, and a comparison with Quick Sort."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Counting Sort Algorithm

last modified March 9, 2025

 

This tutorial explains the counting sort algorithm in C#. We'll
define it, show examples for sorting numbers and text, and
compare it with Quick Sort.

An algorithm is a clear, step-by-step method to solve
a problem or do a task. It's the foundation of how programs
process and manage data.

Sorting arranges data in a specific order, like
ascending or descending. It's essential in computing for
organizing and retrieving data.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Counting Sort

## Counting Sort Algorithm

Counting sort is a non-comparison-based sorting method. It
counts how many times each element appears in the input, then
uses this count to place elements in their correct sorted
positions.

It's fast for small ranges of integers but requires extra
memory for the count array. Unlike comparison sorts, it doesn't
compare elements directly.

### Counting Sort Example

Here's a C# implementation of counting sort for integers using
top-level statements.

CountingSort.cs
  

// CountingSort.cs
int[] CountingSort(int[] arr)
{
    if (arr.Length == 0)
    {
        return arr;
    }
    int maxVal = arr.Max();
    int[] count = new int[maxVal + 1];

    foreach (int num in arr)
    {
        count[num]++;
    }

    List&lt;int&gt; sorted = [];
    for (int i = 0; i &lt; count.Length; i++)
    {
        while (count[i] &gt; 0)
        {
            sorted.Add(i);
            count[i]--;
        }
    }

    return sorted.ToArray();
}

int[] arr = [4, 2, 2, 8, 3, 3, 1];
int[] sorted = CountingSort(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", sorted));

This code sorts an integer array in ascending order using
counting sort.

### Sorting Textual Data

Counting sort can also sort text, like a string's characters.
Here's an example:

CountingSortText.cs
  

// CountingSortText.cs
string CountingSortText(string text)
{
    if (string.IsNullOrEmpty(text))
    {
        return text;
    }
    int maxVal = text.Max();
    int[] count = new int[maxVal + 1];

    foreach (char c in text)
    {
        count[c]++;
    }

    char[] sorted = new char[text.Length];
    int index = 0;
    for (int i = 0; i &lt; count.Length; i++)
    {
        while (count[i] &gt; 0)
        {
            sorted[index] = (char)i;
            index++;
            count[i]--;
        }
    }

    return new string(sorted);
}

string text = "counting";
string sorted = CountingSortText(text);
Console.WriteLine("Sorted text: " + sorted);

This sorts a string's characters in ascending order using
counting sort.

### Sorting in Descending Order

To sort in descending order, we reverse the output loop in
counting sort.

CountingSortDesc.cs
  

// CountingSortDesc.cs
int[] CountingSortDesc(int[] arr)
{
    if (arr.Length == 0)
    {
        return arr;
    }
    int maxVal = arr.Max();
    int[] count = new int[maxVal + 1];

    foreach (int num in arr)
    {
        count[num]++;
    }

    List&lt;int&gt; sorted = [];
    for (int i = count.Length - 1; i &gt;= 0; i--)
    {
        while (count[i] &gt; 0)
        {
            sorted.Add(i);
            count[i]--;
        }
    }

    return sorted.ToArray();
}

int[] arr = [4, 2, 2, 8, 3, 3, 1];
int[] sorted = CountingSortDesc(arr);
Console.WriteLine("Sorted array (descending): " + string.Join(" ", sorted));

This sorts an integer array in descending order.

## Comparison with Quick Sort

Counting sort excels with small integer ranges, running in
O(n + k) time, where k is the range of values. Quick Sort, a
comparison-based method, averages O(n log n) and handles
larger datasets better.

### Benchmark Example

This example compares counting sort and Quick Sort performance.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

int[] CountingSort(int[] arr)
{
    if (arr.Length == 0)
    {
        return arr;
    }
    int maxVal = arr.Max();
    int[] count = new int[maxVal + 1];

    foreach (int num in arr)
    {
        count[num]++;
    }

    List&lt;int&gt; sorted = [];
    for (int i = 0; i &lt; count.Length; i++)
    {
        while (count[i] &gt; 0)
        {
            sorted.Add(i);
            count[i]--;
        }
    }

    return sorted.ToArray();
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
int[] data = new int[10000];
for (int i = 0; i &lt; data.Length; i++)
{
    data[i] = rand.Next(1000);
}

int[] countingData = data.ToArray();
Stopwatch sw = Stopwatch.StartNew();
CountingSort(countingData);
double countingTime = sw.Elapsed.TotalSeconds;

int[] quickData = data.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Counting sort time: {countingTime:F6} seconds");
Console.WriteLine($"Quick sort time: {quickTime:F6} seconds");

This benchmarks both algorithms on 10,000 random integers.
Counting sort may win with small ranges, but Quick Sort scales
better.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

We've explored counting sort in C# and compared it with Quick
Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).