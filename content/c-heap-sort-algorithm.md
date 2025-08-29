+++
title = "C# Heap Sort Algorithm"
date = 2025-08-27T23:23:07.718+01:00
draft = false
description = "C# Heap Sort tutorial explains the Heap Sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Heap Sort Algorithm

last modified March 8, 2025

 

This tutorial explains the Heap Sort algorithm in C#, covering
sorting of numeric and textual data in ascending and
descending order, with a benchmark against Quick Sort.

An algorithm is a precise sequence of steps
designed to solve a problem or complete a task efficiently.
It's a fundamental building block of programming logic.

Sorting involves arranging data into a specific
order, like ascending or descending. It's essential for
optimizing data access and processing in applications.

## Common Sorting Algorithms

Here are some widely recognized sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Heap Sort Algorithm

Heap Sort is a comparison-based algorithm that leverages a
binary heap data structure. It first builds a max-heap (for
ascending order), then repeatedly extracts the largest
element.

With a consistent time complexity of O(n log n), Heap Sort is
efficient and stable for large datasets. It's particularly
useful when memory usage must be minimized, as it sorts in
place.

## Heap Sort Example

Below is a C# implementation of Heap Sort for numeric data
using top-level statements.

HeapSort.cs
  

// HeapSort.cs
void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left &lt; n &amp;&amp; arr[i] &lt; arr[left])
    {
        largest = left;
    }

    if (right &lt; n &amp;&amp; arr[largest] &lt; arr[right])
    {
        largest = right;
    }

    if (largest != i)
    {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}

void HeapSort(int[] arr)
{
    int n = arr.Length;

    for (int i = n / 2 - 1; i &gt;= 0; i--)
    {
        Heapify(arr, n, i);
    }

    for (int i = n - 1; i &gt; 0; i--)
    {
        (arr[i], arr[0]) = (arr[0], arr[i]);
        Heapify(arr, i, 0);
    }
}

int[] arr = [12, 11, 13, 5, 6, 7];
HeapSort(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", arr));

The Heapify method ensures the max-heap property
by comparing a node with its children and swapping if needed.
It's called recursively to maintain the heap structure.

The HeapSort method first builds a max-heap from
the array, then iteratively moves the largest element (root)
to the end, reducing the heap size and re-heapifying.

## Heap Sort for Textual Data

Heap Sort can sort strings too. Here's an example for
ascending order in C#.

HeapSortText.cs
  

// HeapSortText.cs
void Heapify(string[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left &lt; n &amp;&amp; string.Compare(arr[i], arr[left]) &lt; 0)
    {
        largest = left;
    }

    if (right &lt; n &amp;&amp; string.Compare(arr[largest], arr[right]) &lt; 0)
    {
        largest = right;
    }

    if (largest != i)
    {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}

void HeapSort(string[] arr)
{
    int n = arr.Length;

    for (int i = n / 2 - 1; i &gt;= 0; i--)
    {
        Heapify(arr, n, i);
    }

    for (int i = n - 1; i &gt; 0; i--)
    {
        (arr[i], arr[0]) = (arr[0], arr[i]);
        Heapify(arr, i, 0);
    }
}

string[] arr = ["banana", "apple", "cherry", "date"];
HeapSort(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", arr));

This version adapts Heapify and
HeapSort for strings, using
String.Compare for comparison. It sorts the
array in place, arranging the strings alphabetically.

This is useful for tasks like sorting lists of names or tags
in C# programs, leveraging the same heap-based logic as with
numbers.

## Heap Sort in Descending Order

For descending order, we modify Heapify to build
a min-heap instead of a max-heap.

HeapSortDesc.cs
  

// HeapSortDesc.cs
void Heapify(int[] arr, int n, int i)
{
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left &lt; n &amp;&amp; arr[i] &gt; arr[left])
    {
        smallest = left;
    }

    if (right &lt; n &amp;&amp; arr[smallest] &gt; arr[right])
    {
        smallest = right;
    }

    if (smallest != i)
    {
        (arr[i], arr[smallest]) = (arr[smallest], arr[i]);
        Heapify(arr, n, smallest);
    }
}

void HeapSortDesc(int[] arr)
{
    int n = arr.Length;

    for (int i = n / 2 - 1; i &gt;= 0; i--)
    {
        Heapify(arr, n, i);
    }

    for (int i = n - 1; i &gt; 0; i--)
    {
        (arr[i], arr[0]) = (arr[0], arr[i]);
        Heapify(arr, i, 0);
    }
}

int[] arr = [12, 11, 13, 5, 6, 7];
HeapSortDesc(arr);
Console.WriteLine("Sorted array in descending order: " + string.Join(" ", arr));

The Heapify method now ensures a min-heap by
selecting the smallest value among the node and its children.
HeapSortDesc builds and extracts from this
min-heap.

This sorts the array in descending order, useful for ranking
items from highest to lowest, such as scores or priorities
in C# applications.

## Heap Sort vs Quick Sort

Heap Sort guarantees O(n log n) time complexity, making it
predictable. Quick Sort averages O(n log n) but can hit O(n²)
in rare worst-case scenarios, like nearly sorted data.

## Benchmarking Heap Sort and Quick Sort

This benchmark compares Heap Sort and Quick Sort on a random
dataset in C#.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

void Heapify(int[] arr, int n, int i)
{
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left &lt; n &amp;&amp; arr[i] &lt; arr[left])
    {
        largest = left;
    }

    if (right &lt; n &amp;&amp; arr[largest] &lt; arr[right])
    {
        largest = right;
    }

    if (largest != i)
    {
        (arr[i], arr[largest]) = (arr[largest], arr[i]);
        Heapify(arr, n, largest);
    }
}

void HeapSort(int[] arr)
{
    int n = arr.Length;

    for (int i = n / 2 - 1; i &gt;= 0; i--)
    {
        Heapify(arr, n, i);
    }

    for (int i = n - 1; i &gt; 0; i--)
    {
        (arr[i], arr[0]) = (arr[0], arr[i]);
        Heapify(arr, i, 0);
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
int[] arr = new int[1000];
for (int i = 0; i &lt; arr.Length; i++)
{
    arr[i] = rand.Next(1000);
}

int[] heapData = arr.ToArray();
Stopwatch sw = Stopwatch.StartNew();
HeapSort(heapData);
double heapTime = sw.Elapsed.TotalSeconds;

int[] quickData = arr.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Heap Sort Time: {heapTime:F6} seconds");
Console.WriteLine($"Quick Sort Time: {quickTime:F6} seconds");

This code benchmarks both algorithms on 1,000 random
integers. Heap Sort sorts in place using a max-heap, while
Quick Sort builds new arrays via partitioning.

Heap Sort's consistent O(n log n) performance contrasts with
Quick Sort's potential variability. Quick Sort often edges
out slightly due to better cache usage, but results depend on
data patterns.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial explained Heap Sort in C#, with examples for
numbers and text, and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar and I am a passionate programmer with
many years of programming experience. I have been writing
programming articles since 2007.

So far, I have written over 1400 articles and 8 e-books. I
have over eight years of experience in teaching programming.

List [all C# tutorials](/csharp/).