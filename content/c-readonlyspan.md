+++
title = "C# ReadOnlySpan"
date = 2025-08-29T19:51:17.757+01:00
draft = false
description = "Learn how to use the C# ReadOnlySpan class for efficient memory management. This tutorial includes detailed explanations, practical examples, and tips for optimizing performance in C# programming."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ReadOnlySpan

last modified April 27, 2025

This tutorial explains how to use the ReadOnlySpan struct in C# to handle
memory efficiently. ReadOnlySpan provides a safe way to work with memory
slices without allocations.

The ReadOnlySpan struct represents a contiguous region of memory and
is a key feature in .NET that enables efficient handling of data without
creating unnecessary copies. By providing a lightweight, immutable view of
arrays, strings, or raw memory, ReadOnlySpan optimizes performance
and reduces memory overhead. Its design ensures that any modifications are
prohibited, making it an excellent tool for scenarios where data integrity and
immutability are critical. Additionally, ReadOnlySpan is
stack-allocated, contributing to lower garbage collection pressure and better
overall application performance.

ReadOnlySpan is particularly well-suited for tasks like parsing
structured data, processing substrings, or working with data buffers, especially
in high-performance applications. Its type safety ensures that developers can
confidently work with strongly-typed data, while its built-in bounds checking
prevents out-of-range access, reducing the likelihood of runtime errors. These
characteristics make ReadOnlySpan a powerful abstraction for
handling contiguous data in memory-intensive operations, where both reliability
and efficiency are essential.

## Basic ReadOnlySpan Example

This example shows how to create a ReadOnlySpan from an array and access its
elements without copying the data.

Program.cs
  

int[] numbers = { 1, 2, 3, 4, 5 };
ReadOnlySpan&lt;int&gt; span = numbers.AsReadOnlySpan();

Console.WriteLine($"First: {span[0]}");
Console.WriteLine($"Length: {span.Length}");
Console.WriteLine($"Slice (2-4): {string.Join(", ", span.Slice(2, 2).ToArray())}");

The program creates a ReadOnlySpan from an integer array and
demonstrates accessing elements and slicing. AsReadOnlySpan creates
a span without copying the array. The example accesses the first element using
indexing, retrieves the span's length, and creates a slice of two elements
starting at index 2.

Since ReadOnlySpan is immutable, it ensures the underlying data
cannot be modified, providing safety while maintaining performance by avoiding
memory allocations.

## Slicing Strings with ReadOnlySpan

ReadOnlySpan is useful for efficient string manipulation. This example
parses a string without creating substrings.

Program.cs
  

string text = "Hello, World!";
ReadOnlySpan&lt;char&gt; span = text.AsSpan();

ReadOnlySpan&lt;char&gt; hello = span.Slice(0, 5);
ReadOnlySpan&lt;char&gt; world = span.Slice(7, 5);

Console.WriteLine($"First word: {hello.ToString()}");
Console.WriteLine($"Second word: {world.ToString()}");

The example creates a ReadOnlySpan from a string and extracts
substrings using slicing. AsSpan creates a span over the string's
characters without copying. The program slices the span to extract "Hello" and
"World" by specifying start indices and lengths.

Unlike traditional substring methods, slicing with ReadOnlySpan
avoids allocating new strings, improving performance. The ToString
method converts the spans back to strings for display, but the slicing itself is
allocation-free.

## Parsing Numbers with ReadOnlySpan

ReadOnlySpan can parse data efficiently. This example parses
integers from a comma-separated string.

Program.cs
  

using System;

string data = "42,100,7";
ReadOnlySpan&lt;char&gt; span = data.AsSpan();
List&lt;int&gt; numbers = [];

while (!span.IsEmpty)
{
    int commaIndex = span.IndexOf(',');
    ReadOnlySpan&lt;char&gt; numberSpan = commaIndex == -1 ? span : span.Slice(0, commaIndex);
    numbers.Add(int.Parse(numberSpan));
    span = commaIndex == -1 ? [] : span.Slice(commaIndex + 1);
}

Console.WriteLine($"Parsed numbers: {string.Join(", ", numbers)}");

The program parses integers from a string using ReadOnlySpan to
avoid allocations. It creates a span from the input string and iteratively finds
commas to split the data. For each segment, IndexOf locates the
next comma, and Slice extracts the number portion.
int.Parse converts the span to an integer, which is added to a
list.

The span is updated to skip the comma and continue parsing. This
approach is efficient because it avoids creating intermediate strings,
relying instead on ReadOnlySpan's ability to work directly with the string's
memory.

## Working with Memory Buffers

ReadOnlySpan can handle raw memory buffers. This example processes a byte
buffer as a span.

Program.cs
  

byte[] buffer = { 0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00 };
ReadOnlySpan span = buffer;

int firstInt = BitConverter.ToInt32(span.Slice(0, 4));
int secondInt = BitConverter.ToInt32(span.Slice(4, 4));

Console.WriteLine($"First int: {firstInt}");
Console.WriteLine($"Second int: {secondInt}");

The example treats a byte array as a ReadOnlySpan to read integers from a
buffer. The array contains two 32-bit integers in little-endian format.
Slice extracts 4-byte segments, and
BitConverter.ToInt32 converts each segment to an integer. Using
ReadOnlySpan avoids copying the buffer and provides a safe,
bounds-checked way to access the data. This technique is useful for processing
binary data, such as network packets or file formats, where direct memory access
is needed without allocations.

## Using ReadOnlySpan with Stack Allocation

ReadOnlySpan can work with stack-allocated memory for maximum efficiency.
This example uses stackalloc.

Program.cs
  

using System;

Span&lt;int&gt; temp = stackalloc int[3];
temp[0] = 10; temp[1] = 20; temp[2] = 30;
ReadOnlySpan&lt;int&gt; span = temp;

Console.WriteLine($"Sum: {span[0] + span[1] + span[2]}");
Console.WriteLine($"Slice (1-2): {string.Join(", ", span.Slice(1, 2).ToArray())}");

The program uses stackalloc to allocate a temporary array on the
stack, which is converted to a ReadOnlySpan. The Span&lt;int&gt; is
filled with values, then cast to a ReadOnlySpan for safe, read-only access.
The example calculates the sum of the elements and creates a slice. Stack
allocation avoids heap allocations, making this approach extremely efficient
for small, short-lived buffers.

ReadOnlySpan ensures the data is accessed safely with bounds
checking, and its immutability prevents accidental modifications to the
underlying memory.

## Comparing Strings with ReadOnlySpan

ReadOnlySpan enables efficient string comparisons. This example compares
portions of strings.

Program.cs
  

using System;

string text1 = "Hello, World!";
string text2 = "Hello, Universe!";
ReadOnlySpan&lt;char&gt; span1 = text1.AsSpan(0, 5);
ReadOnlySpan&lt;char&gt; span2 = text2.AsSpan(0, 5);

bool areEqual = span1.SequenceEqual(span2);
Console.WriteLine($"First 5 chars equal: {areEqual}");

The example compares the first five characters of two strings using
ReadOnlySpan. AsSpan creates spans over the relevant portions of
the strings, and SequenceEqual checks if they are identical.

This method is more efficient than creating substrings or using traditional
string comparison methods because it operates directly on the string's
memory without allocations. This technique is particularly useful in
performance-critical scenarios, such as parsing or validating large datasets,
where minimizing memory usage and processing time is crucial.

## ReadOnlySpan with ReadOnlyMemory

ReadOnlySpan can work with ReadOnlyMemory for flexible
memory management. This example demonstrates conversion.

Program.cs
  

using System;

int[] numbers = { 1, 2, 3, 4, 5 };
ReadOnlyMemory&lt;int&gt; memory = numbers.AsMemory();
ReadOnlySpan&lt;int&gt; span = memory.Span;

Console.WriteLine($"First: {span[0]}");
Console.WriteLine($"Last: {span[^1]}");

The program converts an array to a ReadOnlyMemory, then extracts a
ReadOnlySpan from it. AsMemory creates a memory object, and the
Span property provides a span for direct access. The example
accesses the first and last elements using indexing. ReadOnlyMemory
is useful for passing memory regions between methods or async operations, while
ReadOnlySpan provides a lightweight, stack-based view for immediate
processing. This combination allows flexible and efficient memory management,
particularly in scenarios involving asynchronous or layered data processing.

## Source

[ReadOnlySpan Struct Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.readonlyspan-1)

This tutorial covered using ReadOnlySpan in C# for efficient memory handling,
including arrays, strings, buffers, and stack-allocated memory.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).