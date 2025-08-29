+++
title = "C# Radix Sort"
date = 2025-08-29T19:51:16.526+01:00
draft = false
description = "C# Radix Sort tutorial demonstrates the Radix Sort algorithm for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Radix Sort

last modified March 8, 2025

 

This tutorial implements and explains the Radix Sort algorithm
in C#, focusing on sorting numeric and textual data efficiently.

An algorithm is a precise sequence of steps crafted
to solve a problem or execute a task. It's a core concept in
programming, driving computational solutions.

Sorting involves arranging data into a defined order,
like ascending or descending. It enhances data access speed and
supports analysis in applications like search engines.

## Common Sorting Algorithms

Here are some notable sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Radix Sort

## Radix Sort

Radix Sort is a non-comparative algorithm that sorts
by processing each digit or character of the data, from least
to most significant. It excels with integers and fixed-length
strings.

Unlike comparison-based sorts like Quick Sort, Radix Sort uses
counting to distribute elements into buckets, offering linear
time complexity under specific conditions.

## Radix Sort Example

Here's a C# implementation of Radix Sort for integers using
top-level statements.

RadixSort.cs
  

// RadixSort.cs
void CountingSort(int[] arr, int exp)
{
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int i = 0; i &lt; n; i++)
    {
        int index = arr[i] / exp;
        count[index % 10]++;
    }

    for (int i = 1; i &lt; 10; i++)
    {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i &gt;= 0; i--)
    {
        int index = arr[i] / exp;
        output[count[index % 10] - 1] = arr[i];
        count[index % 10]--;
    }

    for (int i = 0; i &lt; n; i++)
    {
        arr[i] = output[i];
    }
}

void RadixSort(int[] arr)
{
    int maxNum = arr.Max();
    for (int exp = 1; maxNum / exp &gt; 0; exp *= 10)
    {
        CountingSort(arr, exp);
    }
}

int[] arr = [170, 45, 75, 90, 802, 24, 2, 66];
RadixSort(arr);
Console.WriteLine("Sorted array: " + string.Join(" ", arr));

This code uses CountingSort as a helper to sort by
each digit, starting from the least significant. The
exp variable tracks the current digit place (1, 10,
100, etc.).

The RadixSort method finds the maximum number to
determine how many digits to process. It modifies the array in
place, sorting it in ascending order efficiently.

## Sorting Textual Data

Radix Sort can sort strings too. Below is an example sorting
strings in both ascending and descending order.

RadixSortStrings.cs
  

// RadixSortStrings.cs
void CountingSortStrings(string[] arr, int index)
{
    int n = arr.Length;
    string[] output = new string[n];
    int[] count = new int[256];

    for (int i = 0; i &lt; n; i++)
    {
        byte charVal = 0;
        if (index &lt; arr[i].Length)
        {
            charVal = (byte)arr[i][index];
        }
        count[charVal]++;
    }

    for (int i = 1; i &lt; 256; i++)
    {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i &gt;= 0; i--)
    {
        byte charVal = 0;
        if (index &lt; arr[i].Length)
        {
            charVal = (byte)arr[i][index];
        }
        output[count[charVal] - 1] = arr[i];
        count[charVal]--;
    }

    for (int i = 0; i &lt; n; i++)
    {
        arr[i] = output[i];
    }
}

void RadixSortStrings(string[] arr, bool reverse)
{
    int maxLen = arr.Max(s =&gt; s.Length);
    for (int i = maxLen - 1; i &gt;= 0; i--)
    {
        CountingSortStrings(arr, i);
    }
    if (reverse)
    {
        for (int i = 0, j = arr.Length - 1; i &lt; j; i++, j--)
        {
            (arr[i], arr[j]) = (arr[j], arr[i]);
        }
    }
}

string[] arr = ["apple", "banana", "kiwi", "mango", "cherry"];
RadixSortStrings(arr, false);
Console.WriteLine("Ascending order: " + string.Join(" ", arr));

RadixSortStrings(arr, true);
Console.WriteLine("Descending order: " + string.Join(" ", arr));

The CountingSortStrings method sorts based on a
specific character position, using a 256-slot count array for
ASCII characters. It pads shorter strings with null bytes
implicitly.

The RadixSortStrings method processes characters
from right to left, ensuring correct lexicographical order.
The reverse flag swaps elements for descending
order after sorting.

This is practical for sorting names, IDs, or tags in C#
applications requiring textual data organization.

## Radix Sort vs Quick Sort

Radix Sort shines with fixed-size data like integers or
strings, boasting a time complexity of O(nk), where k is the
number of digits or characters. Quick Sort, with O(n log n)
average complexity, is more versatile.

The benchmark below compares their performance on a large
integer dataset in C#, highlighting their strengths.

RadixVsQuick.cs
  

// RadixVsQuick.cs
using System.Diagnostics;

void CountingSort(int[] arr, int exp)
{
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];

    for (int i = 0; i &lt; n; i++)
    {
        int index = arr[i] / exp;
        count[index % 10]++;
    }

    for (int i = 1; i &lt; 10; i++)
    {
        count[i] += count[i - 1];
    }

    for (int i = n - 1; i &gt;= 0; i--)
    {
        int index = arr[i] / exp;
        output[count[index % 10] - 1] = arr[i];
        count[index % 10]--;
    }

    for (int i = 0; i &lt; n; i++)
    {
        arr[i] = output[i];
    }
}

void RadixSort(int[] arr)
{
    int maxNum = arr.Max();
    for (int exp = 1; maxNum / exp &gt; 0; exp *= 10)
    {
        CountingSort(arr, exp);
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
int[] arr = new int[10000];
for (int i = 0; i &lt; arr.Length; i++)
{
    arr[i] = rand.Next(10000);
}

int[] radixData = arr.ToArray();
Stopwatch sw = Stopwatch.StartNew();
RadixSort(radixData);
double radixTime = sw.Elapsed.TotalSeconds;

int[] quickData = arr.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Radix Sort time: {radixTime:F6} seconds");
Console.WriteLine($"Quick Sort time: {quickTime:F6} seconds");

This benchmark creates 10,000 random integers.
RadixSort sorts in place using digit-based
counting, while QuickSort recursively partitions
the data, returning a new array.

Radix Sort often outperforms Quick Sort for integers with a
small range of digits, but Quick Sort adapts better to varied
data types. Results vary, but Radix Sort typically edges out
on this dataset.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial implemented Radix Sort in C#, covering numbers
and strings, with a comparison to Quick Sort for performance
insights.

## Author

My name is Jan Bodnar and I am a passionate programmer with
many years of programming experience. I have been writing
programming articles since 2007.

So far, I have written over 1400 articles and 8 e-books. I
have over eight years of experience in teaching programming.

List [all C# tutorials](/csharp/).