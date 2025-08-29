+++
title = "C# benchmark"
date = 2025-08-27T23:22:45.914+01:00
draft = false
description = "C# benchmark tutorial shows how to benchmark C# code with the BenchmarkDotNet library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# benchmark

last modified July 5, 2023

 

In this article we benchmark C# code with BenchmarkDotNet library.

Benchmarking is the process of measuring the performance of our code. It allows
us to determine performance bottlenecks in our programs.

*BenchmarkDotNet* is a powerful .NET library for performing benchmarks.
We can measure C#, F#, and VB code.

$ dotnet add package BenchmarkDotNet

We install the BenchmarkDotNet package.

$ dotnet run --project SimpleEx.csproj -c Release

This is how we run our benchmark.

## C# benchmark simple example

In the following example, we measure the performance of various ways of string
concatenation.

Program.cs
  

using System.Text;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]
public class Program
{
    int n = 10_000;

    [Benchmark]
    public string Builder()
    {
        StringBuilder output = new StringBuilder();

        for (int i = 0; i &lt; n; i++)
        {
            output.Append("falcon").Append(i);
        }

        return output.ToString();
    }

    [Benchmark]
    public string Interpolation()
    {
        string output = string.Empty;

        for (int i = 0; i &lt; n; i++)
        {
            output = $"{output}falcon{i}";
        }

        return output;
    }

    [Benchmark]
    public string Addition()
    {
        string output = string.Empty;

        for (int i = 0; i &lt; n; i++)
        {
            output += "falcon" + i;
        }

        return output.ToString();
    }

    static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run&lt;Program&gt;();
    }
}

In the program, we compare three methods of string concatenation: with
StringBuilder, string interpolation, and the addition operation.

[MemoryDiagnoser]
public class Program
{
    ...
}

Wit [MemoryDiagnoser], we also measure the memory usage.

[Benchmark]
public string Builder()
{
    StringBuilder output = new StringBuilder();

    for (int i = 0; i &lt; n; i++)
    {
        output.Append("falcon").Append(i);
    }

    return output.ToString();
}

This method uses the StringBuilder to add strings. The method is 
decorated with [Benchmark].

var summary = BenchmarkRunner.Run&lt;Program&gt;();

We run the benchmark.

// * Summary *

BenchmarkDotNet=v0.13.2, OS=ubuntu 22.04
11th Gen Intel Core i5-1135G7 2.40GHz, 1 CPU, 8 logical and 4 physical cores
.NET SDK=6.0.104
  [Host]     : .NET 6.0.4 (6.0.422.16404), X64 RyuJIT AVX2
  DefaultJob : .NET 6.0.4 (6.0.422.16404), X64 RyuJIT AVX2

|        Method |         Mean |     Error |    StdDev |        Gen0 |        Gen1 |        Gen2 |    Allocated |
|-------------- |-------------:|----------:|----------:|------------:|------------:|------------:|-------------:|
|       Builder |     120.6 us |   0.30 us |   0.27 us |     62.3779 |     62.3779 |     62.3779 |    398.29 KB |
| Interpolation | 120,826.4 us | 354.51 us | 331.61 us | 290600.0000 | 247600.0000 | 247600.0000 | 956382.51 KB |
|      Addition |  73,354.2 us | 448.96 us | 419.96 us | 290714.2857 | 249000.0000 | 247714.2857 |  956694.4 KB |

The output includes OS and hardware summary and a table showing benchark
statistics. From the output we can see that the addition was the fastest while
builder was the most memory efficient.

## C# benchmark sorting algorithms

In the next example, we benchmark sorting algorithms.

Program.cs
  

using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

[MemoryDiagnoser]
public class Program
{
    const int n = 100_000;
    int[] vals = new int[n];

    [GlobalSetup]
    public void GlobalSetup()
    {
        var rnd = new Random();

        for (int i = 0; i &lt; n; i++)
        {
            vals[i] = rnd.Next(1, 100);
        }
    }

    [Benchmark]
    public void SelectionSort()
    {
        int len = vals.Length;

        for (int i = 0; i &lt; len - 1; i++)
        {
            int min_idx = i;

            for (int j = i + 1; j &lt; len; j++)
            {
                if (vals[j] &lt; vals[min_idx])
                {
                    min_idx = j;
                }
            }

            int temp = vals[min_idx];
            vals[min_idx] = vals[i];
            vals[i] = temp;
        }
    }

    [Benchmark]
    public void BubbleSort()
    {
        int len = vals.Length;

        for (int i = 0; i &lt; len - 1; i++)
        {
            for (int j = 0; j &lt; len - i - 1; j++)
            {
                if (vals[j] &gt; vals[j + 1])
                {
                    int temp = vals[j];
                    vals[j] = vals[j + 1];
                    vals[j + 1] = temp;
                }
            }
        }
    }

    static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run&lt;Program&gt;();
    }
}

We compare selection sort with the bubble sort algorithm.

const int n = 100_000;
int[] vals = new int[n];

[GlobalSetup]
public void GlobalSetup()
{
    var rnd = new Random();

    for (int i = 0; i &lt; n; i++)
    {
        vals[i] = rnd.Next(1, n);
    }
}

Using [GlobalSetup] attribute, we prepare an array of 100000
randomly chosen integer values between 1 and 100000. This code is executed only 
once. 

[Benchmark]
public void SelectionSort()
{
    int len = vals.Length;

    for (int i = 0; i &lt; len - 1; i++)
    {
        int min_idx = i;

        for (int j = i + 1; j &lt; len; j++)
        {
            if (vals[j] &lt; vals[min_idx])
            {
                min_idx = j;
            }
        }

        int temp = vals[min_idx];
        vals[min_idx] = vals[i];
        vals[i] = temp;
    }
}

We have the selection sort algorithm; it sorts the prepared array of integers.

|        Method |    Mean |    Error |   StdDev | Allocated |
|-------------- |--------:|---------:|---------:|----------:|
| SelectionSort | 3.646 s | 0.0569 s | 0.0532 s |   1.38 KB |
|    BubbleSort | 4.124 s | 0.0136 s | 0.0127 s |   3.28 KB |

The selection sort is slightly better both in terms of memory and speed.

## Source

[BenchmarkDotNet Github page](https://github.com/dotnet/BenchmarkDotNet)

In this article we have measured the performance of our C# code with
BenchmarkDotNet library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).