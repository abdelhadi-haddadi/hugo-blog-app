+++
title = "C# Merge Sort"
date = 2025-08-29T19:51:04.731+01:00
draft = false
description = "C# Merge Sort tutorial explains the Merge Sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Merge Sort

last modified March 8, 2025

 

This article explores the Merge Sort algorithm in C#, demonstrating its use for
sorting numeric and textual data in ascending and descending order, with a
benchmark against Quick Sort.

An algorithm is a structured sequence of steps
crafted to solve a problem or perform a task efficiently.
It's a cornerstone of programming, driving computational
solutions.

Sorting means organizing data into a specific
sequence, such as ascending or descending. It's vital for
enhancing data retrieval and analysis in various
applications.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Merge Sort Algorithm

Merge Sort is a divide-and-conquer algorithm that splits an
array into two halves, recursively sorts each half, and
then merges them back together in sorted order.

With a consistent time complexity of O(n log n), Merge Sort
is stable and efficient, though it requires extra space for
merging. It excels with linked lists and large datasets.

## Merge Sort Example

Below is a C# implementation of Merge Sort for numbers and
strings using top-level statements.

MergeSort.cs
  

// MergeSort.cs
int[] MergeSort(int[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    int mid = arr.Length / 2;
    int[] left = MergeSort(arr[..mid]);
    int[] right = MergeSort(arr[mid..]);
    return Merge(left, right);
}

int[] Merge(int[] left, int[] right)
{
    var result = new List&lt;int&gt;(left.Length + right.Length);
    int i = 0, j = 0;

    for (; i &lt; left.Length &amp;&amp; j &lt; right.Length;)
    {
        if (left[i] &lt; right[j])
        {
            result.Add(left[i]);
            i++;
        }
        else
        {
            result.Add(right[j]);
            j++;
        }
    }
    
    result.AddRange(left[i..]);
    result.AddRange(right[j..]);
    return result.ToArray();
}

string[] MergeSortStrings(string[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }

    int mid = arr.Length / 2;
    string[] left = MergeSortStrings(arr[..mid]);
    string[] right = MergeSortStrings(arr[mid..]);
    return MergeStrings(left, right);
}

string[] MergeStrings(string[] left, string[] right)
{
    var result = new List&lt;string&gt;(left.Length + right.Length);
    int i = 0, j = 0;

    for (; i &lt; left.Length &amp;&amp; j &lt; right.Length;)
    {
        if (string.Compare(left[i], right[j]) &lt; 0)
        {
            result.Add(left[i]);
            i++;
        }
        else
        {
            result.Add(right[j]);
            j++;
        }
    }
    result.AddRange(left[i..]);
    result.AddRange(right[j..]);
    return result.ToArray();
}

int[] SortDescending(int[] arr)
{
    int[] sorted = MergeSort(arr);

    for (int i = 0, j = sorted.Length - 1; i &lt; j; i++, j--)
    {
        (sorted[i], sorted[j]) = (sorted[j], sorted[i]);
    }

    return sorted;
}

string[] SortStringsDescending(string[] arr)
{
    string[] sorted = MergeSortStrings(arr);

    for (int i = 0, j = sorted.Length - 1; i &lt; j; i++, j--)
    {
        (sorted[i], sorted[j]) = (sorted[j], sorted[i]);
    }

    return sorted;
}

int[] numbers = [38, 27, 43, 3, 9, 82, 10];
string[] words = ["apple", "banana", "cherry", "date", "elderberry"];
Console.WriteLine("Sorted numbers (ascending): " + string.Join(" ", MergeSort(numbers)));
Console.WriteLine("Sorted numbers (descending): " + string.Join(" ", SortDescending(numbers)));
Console.WriteLine("Sorted words (ascending): " + string.Join(" ", MergeSortStrings(words)));
Console.WriteLine("Sorted words (descending): " + string.Join(" ", SortStringsDescending(words)));

The MergeSort method recursively splits and
merges integer arrays, while MergeSortStrings
does the same for strings. The Merge helper
combines sorted halves.

For descending order, SortDescending and
SortStringsDescending reverse the ascending
result. This approach leverages C#'s array operations for
clarity and efficiency.

## Comparing Merge Sort with Quick Sort

Merge Sort guarantees O(n log n) time complexity and
stability, making it reliable. Quick Sort averages O(n log n)
but can degrade to O(n²) in worst-case scenarios, like
sorted data.

This benchmark compares their performance on a large
dataset in C#.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

int[] MergeSort(int[] arr)
{
    if (arr.Length &lt;= 1)
    {
        return arr;
    }
    int mid = arr.Length / 2;
    int[] left = MergeSort(arr[..mid]);
    int[] right = MergeSort(arr[mid..]);
    return Merge(left, right);
}

int[] Merge(int[] left, int[] right)
{
    var result = new List&lt;int&gt;(left.Length + right.Length);
    int i = 0, j = 0;
    for (; i &lt; left.Length &amp;&amp; j &lt; right.Length;)
    {
        if (left[i] &lt; right[j])
        {
            result.Add(left[i]);
            i++;
        }
        else
        {
            result.Add(right[j]);
            j++;
        }
    }

    result.AddRange(left[i..]);
    result.AddRange(right[j..]);
    return result.ToArray();
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
int[] numbers = new int[10000];
for (int i = 0; i &lt; numbers.Length; i++)
{
    numbers[i] = rand.Next(10000);
}

int[] mergeData = numbers.ToArray();
Stopwatch sw = Stopwatch.StartNew();
MergeSort(mergeData);
double mergeTime = sw.Elapsed.TotalSeconds;

int[] quickData = numbers.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Merge Sort Time: {mergeTime:F6} seconds");
Console.WriteLine($"Quick Sort Time: {quickTime:F6} seconds");

This benchmark tests Merge Sort and Quick Sort on 10,000
random integers. Merge Sort creates new arrays during
merging, while Quick Sort partitions in a similar recursive
manner.

Merge Sort's predictable performance contrasts with Quick
Sort's potential speed advantage due to better cache
locality. Actual results vary, but Merge Sort ensures
consistency.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial explained Merge Sort in C#, with examples for
numbers and text, and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).