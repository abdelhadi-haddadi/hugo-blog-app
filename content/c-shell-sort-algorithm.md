+++
title = "C# Shell Sort Algorithm"
date = 2025-08-29T19:51:23.259+01:00
draft = false
description = "C# Shell Sort tutorial explains the Shell Sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Shell Sort Algorithm

last modified March 8, 2025

 

This tutorial explains the Shell Sort algorithm in C#,
demonstrating its use for sorting numeric and textual data in
ascending and descending order, with a benchmark against
Quick Sort.

An algorithm is a well-defined series of steps
crafted to solve a problem or execute a task efficiently. It
forms the backbone of programming, enabling systematic
solutions.

Sorting is the act of arranging data into a specific
sequence, such as ascending or descending. It's crucial for
optimizing data access and analysis in various applications.

## Common Sorting Algorithms

Here are some widely used sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Shell Sort

## Shell Sort Algorithm

Shell Sort enhances Insertion Sort by comparing and sorting
elements at specific intervals, or gaps, rather than adjacent
ones. It starts with large gaps and reduces them over
iterations.

This approach minimizes the number of shifts needed, making
it more efficient than plain Insertion Sort. Its time
complexity varies between O(n log n) and O(n²), depending on
the gap sequence.

## Shell Sort Example

Here's a C# implementation of Shell Sort for numeric data
using top-level statements.

ShellSort.cs
  

// ShellSort.cs
void ShellSort(int[] arr)
{
    int n = arr.Length;
    int gap = n / 2;

    for (; gap &gt; 0; gap /= 2)
    {
        for (int i = gap; i &lt; n; i++)
        {
            int temp = arr[i];
            int j = i;
            for (; j &gt;= gap &amp;&amp; arr[j - gap] &gt; temp; j -= gap)
            {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
}

int[] nums = [12, 34, 54, 2, 3];
ShellSort(nums);
Console.WriteLine("Sorted array: " + string.Join(" ", nums));

The ShellSort method sorts an integer array in
ascending order. It begins with a gap of half the array
length, shrinking it by half each iteration.

Within each gap, it performs an insertion-like sort, shifting
larger elements rightward. This example sorts a small array,
showing the algorithm's basic operation in C#.

## Sorting Textual Data

Shell Sort can also sort strings. Below is an example for
ascending and descending order in C#.

ShellSortText.cs
  

// ShellSortText.cs
void ShellSort(string[] arr, bool reverse)
{
    int n = arr.Length;
    int gap = n / 2;

    for (; gap &gt; 0; gap /= 2)
    {
        for (int i = gap; i &lt; n; i++)
        {
            string temp = arr[i];
            int j = i;
            if (reverse)
            {
                for (; j &gt;= gap &amp;&amp; arr[j - gap] &lt; temp; j -= gap)
                {
                    arr[j] = arr[j - gap];
                }
            }
            else
            {
                for (; j &gt;= gap &amp;&amp; arr[j - gap] &gt; temp; j -= gap)
                {
                    arr[j] = arr[j - gap];
                }
            }
            arr[j] = temp;
        }
    }
}

string[] words = ["apple", "banana", "cherry", "date", "elderberry"];
ShellSort(words, false);
Console.WriteLine("Ascending order: " + string.Join(" ", words));

ShellSort(words, true);
Console.WriteLine("Descending order: " + string.Join(" ", words));

The ShellSort method now takes a
reverse boolean to toggle sorting direction. For
ascending, it shifts larger strings; for descending, smaller
ones.

This sorts the string array in place, making it versatile for
text data like names or categories in C# programs, with the
gap-based approach improving efficiency.

## Comparing Shell Sort with Quick Sort

Shell Sort offers good performance for medium-sized data, but
Quick Sort's average O(n log n) complexity often makes it
faster for large datasets. This benchmark compares them in
C#.

CompareSorts.cs
  

// CompareSorts.cs
using System.Diagnostics;

void ShellSort(int[] arr)
{
    int n = arr.Length;
    int gap = n / 2;

    for (; gap &gt; 0; gap /= 2)
    {
        for (int i = gap; i &lt; n; i++)
        {
            int temp = arr[i];
            int j = i;
            for (; j &gt;= gap &amp;&amp; arr[j - gap] &gt; temp; j -= gap)
            {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
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
int[] data = new int[10000];
for (int i = 0; i &lt; data.Length; i++)
{
    data[i] = rand.Next(1000);
}

int[] shellData = data.ToArray();
Stopwatch sw = Stopwatch.StartNew();
ShellSort(shellData);
double shellTime = sw.Elapsed.TotalSeconds;

int[] quickData = data.ToArray();
sw = Stopwatch.StartNew();
QuickSort(quickData);
double quickTime = sw.Elapsed.TotalSeconds;

Console.WriteLine($"Shell Sort time: {shellTime:F6} seconds");
Console.WriteLine($"Quick Sort time: {quickTime:F6} seconds");

This benchmark tests both algorithms on 10,000 random
integers. Shell Sort modifies the array in place using gaps,
while Quick Sort creates new arrays via recursion.

Quick Sort typically outperforms Shell Sort on large datasets
due to its divide-and-conquer efficiency. Shell Sort shines
with smaller or partially sorted data, offering a practical
tradeoff.

Understanding these differences aids in selecting the best
algorithm for specific use cases in C#, balancing simplicity
and speed.

## Source

[C# Array.Sort documentation](https://docs.microsoft.com/en-us/dotnet/api/system.array.sort)

This tutorial covered Shell Sort in C#, with examples for
numbers and text, plus a performance comparison to Quick
Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).