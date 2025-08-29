+++
title = "C# Insertion Sort"
date = 2025-08-27T23:23:11.062+01:00
draft = false
description = "C# Insertion Sort tutorial explains the Insertion Sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Insertion Sort

last modified March 8, 2025

 

This tutorial explains the Insertion Sort algorithm in C#,
showing its use for numeric and textual data in ascending and
descending order, with a benchmark against Quick Sort.

An algorithm is a precise set of steps designed to
solve a problem or complete a task efficiently. It's a core
concept in programming, enabling data processing and
automation.

Sorting involves arranging data into a defined
order, like ascending or descending. It's crucial for
optimizing data retrieval and supporting analysis tasks.

## Common Sorting Algorithms

Here are some notable sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Insertion Sort

Insertion Sort is a straightforward algorithm that
builds a sorted array incrementally, one element at a time.
It's highly efficient for small or nearly sorted datasets.

With a time complexity of O(n²), it becomes inefficient for
large datasets, but its simplicity and in-place operation
make it valuable for specific use cases like online sorting.

### Insertion Sort Example

Here's a C# implementation of Insertion Sort for numbers and
strings using top-level statements.

InsertionSort.cs
  

// InsertionSort.cs
void InsertionSort(int[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        int key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; arr[j] &gt; key; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

void InsertionSortStrings(string[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        string key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; string.Compare(arr[j], key) &gt; 0; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

void InsertionSortDesc(int[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        int key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; arr[j] &lt; key; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

void InsertionSortStringsDesc(string[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        string key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; string.Compare(arr[j], key) &lt; 0; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

int[] numbers = [12, 11, 13, 5, 6];
string[] words = ["apple", "banana", "cherry", "date"];

InsertionSort(numbers);
Console.WriteLine("Sorted numbers (ascending): " + string.Join(" ", numbers));

InsertionSortStrings(words);
Console.WriteLine("Sorted words (ascending): " + string.Join(" ", words));

InsertionSortDesc(numbers);
Console.WriteLine("Sorted numbers (descending): " + string.Join(" ", numbers));

InsertionSort-stringsDesc(words);
Console.WriteLine("Sorted words (descending): " + string.Join(" ", words));

The InsertionSort and
InsertionSortStrings methods sort integers and
strings in ascending order, while
InsertionSortDesc and
InsertionSortStringsDesc sort in descending
order.

Each method works in place, shifting elements to insert the
current key into its correct position. This showcases C#'s
type-specific approach, handling both numeric and textual
data efficiently.

### Explanation

Insertion Sort iterates through the array, treating the
first element as sorted. For each subsequent element, it
shifts larger (or smaller, for descending) elements
rightward.

// InsertionSort method
void InsertionSort(int[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        int key = arr[i];
        int j = i - 1;
    
        for (; j &gt;= 0 &amp;&amp; arr[j] &gt; key; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

The InsertionSort method sorts in ascending
order by comparing each key with prior elements, shifting as
needed until the key fits.

// InsertionSortDesc method
void InsertionSortDesc(int[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        int key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; arr[j] &lt; key; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
}

The InsertionSortDesc method reverses the
comparison to sort in descending order, shifting smaller
elements to make room for the key.

## Comparing Insertion Sort with Quick Sort

Insertion Sort's O(n²) complexity suits small or partially
sorted data, while Quick Sort's average O(n log n)
efficiency excels with larger datasets. This benchmark
highlights their differences in C#.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

void InsertionSort(int[] arr)
{
    for (int i = 1; i &lt; arr.Length; i++)
    {
        int key = arr[i];
        int j = i - 1;
        for (; j &gt;= 0 &amp;&amp; arr[j] &gt; key; j--)
        {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
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

int[] insertData = data.ToArray();
Stopwatch sw = Stopwatch.StartNew();
InsertionSort(insertData);
double insertTime = sw.Elapsed.TotalSeconds;

int[] quickData = data.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Insertion Sort Time: {insertTime:F6} seconds");
Console.WriteLine($"Quick Sort Time: {quickTime:F6} seconds");

This benchmark tests both algorithms on 1,000 random
integers. Insertion Sort modifies the array in place, while
Quick Sort creates new arrays via recursion and
partitioning.

Quick Sort typically outperforms Insertion Sort
significantly on larger datasets due to its logarithmic
scaling. Insertion Sort's advantage lies in its simplicity
and performance on small or nearly sorted data.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial explained Insertion Sort in C#, with examples
for numbers and text, and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).