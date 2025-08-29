+++
title = "C# ArraySegment"
date = 2025-08-27T23:22:43.603+01:00
draft = false
description = "Learn how to use the C# ArraySegment struct for efficient array slicing and manipulation. This tutorial includes detailed explanations, practical examples, and tips for optimizing array operations in C# programming."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ArraySegment

last modified April 27, 2025

This tutorial explains how to use the ArraySegment struct in C# to work with 
portions of arrays efficiently. ArraySegment provides a view into a segment 
of an array without copying.

The ArraySegment struct represents a segment of an array, which is
specified by a starting offset and a count of elements. This structure provides
a way to work with a contiguous subset of elements from an existing array
without creating a new one. By maintaining a reference to the original array, it
enables efficient manipulation and processing of its specific sections, all
while avoiding the overhead associated with duplicating data. This makes
ArraySegment a lightweight and flexible tool for managing array
subsets in memory-intensive applications.

ArraySegment is particularly useful in scenarios that involve 
processing portions of arrays, such as when parsing structured data, buffering 
large streams of information, or implementing custom algorithms for data handling. 
Its ability to reference a portion of an array directly, rather than creating a 
copy, significantly reduces memory usage, especially for large datasets. 

Furthermore, ArraySegment retains type safety, ensuring that
developers can work with strongly-typed data while avoiding errors associated
with manual slicing or custom subarray handling. It is a valuable utility for
improving both the performance and clarity of code that operates on array
segments.

## Basic ArraySegment Example

This example shows how to create an ArraySegment from an array and access its 
elements without copying the data.

Program.cs
  

int[] numbers = [1, 2, 3, 4, 5];
ArraySegment&lt;int&gt; segment = new(numbers, 1, 3);

Console.WriteLine($"First: {segment[0]}");
Console.WriteLine($"Count: {segment.Count}");
Console.WriteLine($"Array reference: {segment.Array == numbers}");

The program creates an ArraySegment from an integer array, starting
at index 1 with 3 elements. It demonstrates accessing the first element,
checking the segment's count, and verifying that the segment references the
original array. The ArraySegment constructor specifies the array,
offset, and count, creating a view without copying. Modifications to the segment
affect the original array, as they share the same memory, making it efficient
for manipulating array subsets.

## Slicing ArraySegment

ArraySegment can be further sliced to create smaller segments. This example 
shows how to create a sub-segment.

Program.cs
  

int[] numbers = [1, 2, 3, 4, 5];
ArraySegment&lt;int&gt; segment = new(numbers, 1, 4);
ArraySegment&lt;int&gt; subSegment = segment.Slice(1, 2);

Console.WriteLine($"Sub-segment: {string.Join(", ", subSegment.ToArray())}");
Console.WriteLine($"Sub-segment count: {subSegment.Count}");

The example creates an ArraySegment from an array, then uses
Slice to create a smaller segment. The initial segment covers
indices 1 to 4 (elements 2, 3, 4, 5). The sub-segment slices 2 elements starting
at index 1 of the segment (elements 3, 4). The Slice method is
efficient, as it creates a new ArraySegment without copying data,
maintaining a reference to the original array.The ToArray method is
used for display, but the slicing itself avoids allocations.

## Modifying ArraySegment Elements

ArraySegment allows modification of the underlying array. This
example demonstrates updating elements via a segment.

Program.cs
  

int[] numbers = [1, 2, 3, 4, 5];
ArraySegment&lt;int&gt; segment = new(numbers, 2, 2);

segment[0] = 10;
segment[1] = 20;

Console.WriteLine($"Modified array: {string.Join(", ", numbers)}");

The program creates an ArraySegment covering indices 2 and 3
(elements 3, 4) and modifies its elements. Assigning new values to
segment[0] and segment[1] updates the original array's
elements at those indices to 10 and 20. Since ArraySegment is a
view into the original array, changes are reflected immediately. 

This demonstrates the efficiency of ArraySegment for in-place
modifications, avoiding the need to create new arrays or copy data while
maintaining direct access to the underlying memory.

## Using ArraySegment with Buffers

ArraySegment is useful for buffer management. This example
processes a byte buffer as a segment.

Program.cs
  

byte[] buffer = [0x01, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00];
ArraySegment segment = new(buffer, 0, 4);

int value = BitConverter.ToInt32(segment);
Console.WriteLine($"Integer from buffer: {value}");

The example uses an ArraySegment to read an integer from a byte
buffer. The segment covers the first 4 bytes of the buffer, which represent a
32-bit integer in little-endian format. BitConverter.ToInt32
converts the segment directly to an integer, leveraging ArraySegment's ability
to provide a view into the buffer without copying. This is particularly useful
in scenarios like network programming or file parsing, where buffers need to be
processed efficiently without allocating new memory for each operation.

## Iterating Over ArraySegment

ArraySegment supports iteration over its elements. This example
iterates through a segment's elements.

Program.cs
  

int[] numbers = [1, 2, 3, 4, 5];
ArraySegment&lt;int&gt; segment = new(numbers, 1, 3);
int sum = 0;

foreach (int num in segment)
{
    sum += num;
}

Console.WriteLine($"Sum of segment: {sum}");

The program creates an ArraySegment covering indices 1 to 3
(elements 2, 3, 4) and uses a foreach loop to sum its elements.
ArraySegment implements IEnumerable, allowing
iteration over its elements as if it were a collection. The loop accesses only
the segment's elements, not the entire array, ensuring efficiency. This approach
is useful for processing specific portions of large arrays, such as when
computing aggregates or filtering data, without needing to copy or reallocate
memory.

## Passing ArraySegment to Methods

ArraySegment is useful for passing array portions to methods. This
example demonstrates method usage.

Program.cs
  

int[] numbers = [1, 2, 3, 4, 5];
ArraySegment&lt;int&gt; segment = new(numbers, 1, 3);

Console.WriteLine($"Segment max: {FindMax(segment)}");

static int FindMax(ArraySegment&lt;int&gt; segment)
{
    int max = segment[0];
    foreach (int num in segment)
    {
        if (num &gt; max) max = num;
    }
    return max;
}

The example passes an ArraySegment to a method that finds the
maximum value. The segment covers indices 1 to 3 (elements 2, 3, 4). The
FindMax method iterates over the segment to determine the largest
value, treating it like a collection. 

Passing an ArraySegment instead of copying a new array or passing
the entire array with indices is more efficient, as it encapsulates the offset
and count while maintaining direct access to the original array's data. This is
ideal for modular code that processes array subsets.

## ArraySegment with Strings

ArraySegment can work with character arrays for string-like
operations. This example processes a string's characters.

Program.cs
  

string text = "Hello, World!";
char[] chars = text.ToCharArray();
ArraySegment segment = new(chars, 0, 5);

Console.WriteLine($"Segment as string: {new string(segment.ToArray())}");

The program converts a string to a character array and creates an ArraySegment 
covering the first 5 characters ("Hello"). The segment is converted back to a 
string for display using new string(segment.ToArray()). 

While ArraySegment is primarily designed for arrays, this example
shows its applicability to string processing by treating strings as character
arrays. Although ReadOnlySpan is often preferred for string
manipulation due to its allocation-free nature, ArraySegment is
useful when working with legacy code or when modifications to the underlying
array are needed, as it provides a mutable view.

## Source

[ArraySegment Struct Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.arraysegment-1)

This tutorial covered using ArraySegment in C# for efficient array slicing and 
manipulation, including accessing, modifying, and iterating over array segments.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive 
programming experience. I have been writing programming articles since 2007. 
To date, I have authored over 1,400 articles and 8 e-books. I possess more 
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).