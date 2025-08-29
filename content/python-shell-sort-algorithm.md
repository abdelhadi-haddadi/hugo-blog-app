+++
title = "Python Shell Sort Algorithm"
date = 2025-08-29T20:10:23.134+01:00
draft = false
description = "Python Shell Sort tutorial explains the Shell Sort algorithm with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Shell Sort Algorithm

last modified March 8, 2025

In this article, we explain the Shell Sort algorithm in Python. We cover sorting
numeric and textual data in ascending and descending order. We also compare
Shell Sort with Quick Sort and perform a benchmark.

An algorithm is a step-by-step procedure to solve a problem or
perform a computation. Algorithms are fundamental to computer science and
programming.

Sorting is the process of arranging data in a specific order, such as
ascending or descending. Sorting is essential for efficient data retrieval and
analysis.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Shell Sort

## Shell Sort Algorithm

Shell Sort is an efficient sorting algorithm that improves on Insertion Sort by
sorting elements at specific intervals. It reduces the number of comparisons
and swaps by sorting sublists of the original list.

## Shell Sort Example

The following example demonstrates Shell Sort in Python for numeric data.

shell_sort.py
  

#!/usr/bin/python

def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap &gt; 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j &gt;= gap and arr[j - gap] &gt; temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2

nums = [12, 34, 54, 2, 3]
shell_sort(nums)
print("Sorted array:", nums)

The example sorts a list of numbers in ascending order using Shell Sort.

$ ./shell_sort.py 
Sorted array: [2, 3, 12, 34, 54]

## Sorting Textual Data

Shell Sort can also sort textual data. The following example sorts a list of
strings in ascending and descending order.

shell_sort_text.py
  

#!/usr/bin/python

def shell_sort(arr, reverse=False):
    n = len(arr)
    gap = n // 2

    while gap &gt; 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            if reverse:
                while j &gt;= gap and arr[j - gap] &lt; temp:
                    arr[j] = arr[j - gap]
                    j -= gap
            else:
                while j &gt;= gap and arr[j - gap] &gt; temp:
                    arr[j] = arr[j - gap]
                    j -= gap
            arr[j] = temp
        gap //= 2

words = ["apple", "banana", "cherry", "date", "elderberry"]
shell_sort(words)
print("Ascending order:", words)

shell_sort(words, reverse=True)
print("Descending order:", words)

The example sorts a list of words in ascending and descending order.

$ ./shell_sort_text.py 
Ascending order: ['apple', 'banana', 'cherry', 'date', 'elderberry']
Descending order: ['elderberry', 'date', 'cherry', 'banana', 'apple']

## Comparing Shell Sort with Quick Sort

Shell Sort and Quick Sort are both efficient sorting algorithms. However, Quick
Sort is generally faster for large datasets. The following example compares
their performance.

compare_sorts.py
  

#!/usr/bin/python

import time
import random

def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap &gt; 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j &gt;= gap and arr[j - gap] &gt; temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Generate a large list of random numbers
data = [random.randint(0, 1000) for _ in range(10000)]

# Benchmark Shell Sort
start_time = time.time()
shell_sort(data.copy())
shell_time = time.time() - start_time

# Benchmark Quick Sort
start_time = time.time()
quick_sort(data.copy())
quick_time = time.time() - start_time

print(f"Shell Sort time: {shell_time:.6f} seconds")
print(f"Quick Sort time: {quick_time:.6f} seconds")

The example benchmarks Shell Sort and Quick Sort on a large dataset.

Shell Sort is an efficient sorting algorithm that improves on Insertion Sort.
It is useful for medium-sized datasets. However, for larger datasets, Quick
Sort is generally faster. Understanding different sorting algorithms helps in
choosing the right one for specific use cases.

## Source

[Shell Sort on Wikipedia](https://en.wikipedia.org/wiki/Shellsort)

In this article, we have explained the Shell Sort algorithm in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).