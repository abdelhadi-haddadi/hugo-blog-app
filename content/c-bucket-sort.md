+++
title = "C# Bucket Sort"
date = 2025-08-27T23:22:47.008+01:00
draft = false
description = "C# Bucket Sort tutorial explains the
bucket sort algorithm with examples for numeric and textual data, and compares
it with Quick Sort."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Bucket Sort

last modified March 9, 2025

 

This tutorial dives into the bucket sort algorithm in C#. We'll
explore sorting numbers and text in ascending and descending
order, and compare it with Quick Sort using benchmarks.

An algorithm is a structured set of steps to solve a
problem or complete a task. It's a cornerstone of programming
and computer science.

Sorting organizes data into a specific sequence, like
ascending or descending. It's vital for efficient data handling
and analysis in programs.

## Common Sorting Algorithms

Here are some popular sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Bucket Sort

## Bucket Sort Algorithm

Bucket sort is a distribution-based sorting method. It divides
elements into “buckets,” sorts each bucket individually, and
then combines them.

It shines when data is evenly spread across a range. Unlike
comparison-based sorts, it relies on distributing data, making
it fast for uniform distributions but less effective otherwise.

## Bucket Sort Example: Numeric Data

Here's a C# implementation of bucket sort for numbers in
ascending order using top-level statements.

BucketSortNumeric.cs
  

// BucketSortNumeric.cs
double[] BucketSort(double[] arr)
{
    if (arr.Length == 0) return arr;

    double maxVal = arr.Max();
    double bucketSize = maxVal / arr.Length;
    List&lt;double&gt;[] buckets = new List&lt;double&gt;[arr.Length];

    for (int i = 0; i &lt; buckets.Length; i++)
        buckets[i] = [];

    foreach (double num in arr)
    {
        int idx = (int)(num / bucketSize);
        if (idx &gt;= arr.Length) idx = arr.Length - 1;
        buckets[idx].Add(num);
    }

    foreach (var bucket in buckets)
        bucket.Sort();

    return buckets.SelectMany(bucket =&gt; bucket).ToArray();
}

double[] arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
double[] sorted = BucketSort(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", sorted));

This sorts an array of doubles using bucket sort. It uses
List.Sort to sort each bucket.

## Bucket Sort Example: Textual Data

Here's an example sorting strings by length in descending order
using bucket sort.

BucketSortTextual.cs
  

// BucketSortTextual.cs
string[] BucketSortTextual(string[] arr)
{
    if (arr.Length == 0) return arr;

    int maxLen = arr.Max(s =&gt; s.Length);
    List&lt;string&gt;[] buckets = new List&lt;string&gt;[maxLen + 1];

    for (int i = 0; i &lt; buckets.Length; i++)
        buckets[i] = [];

    foreach (string s in arr)
        buckets[s.Length].Add(s);

    foreach (var bucket in buckets)
        bucket.Sort((a, b) =&gt; b.CompareTo(a));

    List&lt;string&gt; result = [];
    for (int i = buckets.Length - 1; i &gt;= 0; i--)
        result.AddRange(buckets[i]);

    return result.ToArray();
}

string[] arr = ["apple", "banana", "kiwi", "mango", "pear"];
string[] sorted = BucketSortTextual(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", sorted));

This sorts strings by length in descending order, with
alphabetical reverse order within each bucket using a custom
comparison.

## Comparing Bucket Sort with Quick Sort

Bucket sort excels with uniformly distributed data, running in
O(n + k) time where k is the number of buckets. Quick Sort,
averaging O(n log n), is more versatile for general cases.

### Benchmark Example

This compares bucket sort and Quick Sort performance on a
large dataset.

Benchmark.cs
  

// Benchmark.cs
using System.Diagnostics;

double[] BucketSort(double[] arr)
{
    if (arr.Length == 0) return arr;

    double maxVal = arr.Max();
    double bucketSize = maxVal / arr.Length;
    List&lt;double&gt;[] buckets = new List&lt;double&gt;[arr.Length];

    for (int i = 0; i &lt; buckets.Length; i++)
        buckets[i] = [];

    foreach (double num in arr)
    {
        int idx = (int)(num / bucketSize);
        if (idx &gt;= arr.Length) idx = arr.Length - 1;
        buckets[idx].Add(num);
    }

    foreach (var bucket in buckets)
        bucket.Sort();

    return buckets.SelectMany(bucket =&gt; bucket).ToArray();
}

double[] QuickSort(double[] arr)
{
    if (arr.Length &lt;= 1) return arr;

    double pivot = arr[arr.Length / 2];
    var left = new List&lt;double&gt;();
    var middle = new List&lt;double&gt;();
    var right = new List&lt;double&gt;();

    foreach (double x in arr)
    {
        if (x &lt; pivot) left.Add(x);
        else if (x == pivot) middle.Add(x);
        else right.Add(x);
    }

    return [.. QuickSort(left.ToArray()), .. middle, .. QuickSort(right.ToArray())];
}

Random rand = new(Random.Shared.Next());
double[] arr = new double[10000];
for (int i = 0; i &lt; arr.Length; i++)
    arr[i] = rand.NextDouble() * 1000;

double[] bucketData = arr.ToArray();
Stopwatch sw = Stopwatch.StartNew();
BucketSort(bucketData);
double bucketTime = sw.Elapsed.TotalSeconds;

double[] quickData = arr.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Bucket Sort Time: {bucketTime:F6} seconds");
Console.WriteLine($"Quick Sort Time: {quickTime:F6} seconds");

This benchmarks both algorithms on 10,000 random doubles.
Bucket sort may edge out on uniform data, but Quick Sort is
more consistent overall.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

We've covered bucket sort in C# and compared it with Quick
Sort. It's great for uniform data, while Quick Sort is a
robust all-purpose choice.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).