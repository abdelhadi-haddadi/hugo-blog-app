+++
title = "Python Bucket Sort"
date = 2025-08-29T20:07:44.345+01:00
draft = false
description = "Python Bucket Sort tutorial explains the bucket sort algorithm with examples for numeric and textual data, and compares it with Quick Sort."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Bucket Sort

last modified March 8, 2025

In this article, we explain the bucket sort algorithm in Python. We cover sorting 
numeric and textual data in ascending and descending order. Finally, we compare 
bucket sort with quick sort and benchmark their performance.

An algorithm is a step-by-step procedure to solve a problem or perform 
a computation. Algorithms are fundamental to computer science and programming.

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

- Bucket Sort

## Bucket Sort Algorithm

Bucket sort is a distribution-based sorting algorithm. It works by distributing 
elements into a number of buckets and then sorting each bucket individually. 
Bucket sort is efficient when the input is uniformly distributed.

## Bucket Sort Example: Numeric Data

The following example demonstrates bucket sort for numeric data in ascending order.

bucket_sort_numeric.py
  

def bucket_sort(arr):
    max_val = max(arr)
    size = max_val / len(arr)
    buckets = [[] for _ in range(len(arr))]

    for i in range(len(arr)):
        j = int(arr[i] / size)
        if j != len(arr):
            buckets[j].append(arr[i])
        else:
            buckets[len(arr) - 1].append(arr[i])

    for i in range(len(arr)):
        buckets[i] = sorted(buckets[i])

    result = []
    for i in range(len(arr)):
        result.extend(buckets[i])

    return result

arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
sorted_arr = bucket_sort(arr)
print("Sorted array:", sorted_arr)

This code sorts a list of floating-point numbers using the bucket sort algorithm.

## Bucket Sort Example: Textual Data

The following example demonstrates bucket sort for textual data in descending order.

bucket_sort_textual.py
  

def bucket_sort_textual(arr):
    max_len = max(len(s) for s in arr)
    buckets = [[] for _ in range(max_len + 1)]

    for s in arr:
        buckets[len(s)].append(s)

    for i in range(len(buckets)):
        buckets[i] = sorted(buckets[i], reverse=True)

    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])

    return result

arr = ["apple", "banana", "kiwi", "mango", "pear"]
sorted_arr = bucket_sort_textual(arr)
print("Sorted array:", sorted_arr)

This code sorts a list of strings by their length in descending order.

## Comparing Bucket Sort with Quick Sort

Bucket sort and quick sort are both efficient sorting algorithms, but they have 
different use cases. Bucket sort is ideal for uniformly distributed data, while 
quick sort is a general-purpose algorithm.

### Benchmark Example

The following example compares the performance of bucket sort and quick sort.

benchmark.py
  

import time
import random

def bucket_sort(arr):
    max_val = max(arr)
    size = max_val / len(arr)
    buckets = [[] for _ in range(len(arr))]

    for i in range(len(arr)):
        j = int(arr[i] / size)
        if j != len(arr):
            buckets[j].append(arr[i])
        else:
            buckets[len(arr) - 1].append(arr[i])

    for i in range(len(arr)):
        buckets[i] = sorted(buckets[i])

    result = []
    for i in range(len(arr)):
        result.extend(buckets[i])

    return result

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

arr = [random.randint(0, 1000) for _ in range(10000)]

start_time = time.time()
bucket_sort(arr)
print("Bucket Sort Time:", time.time() - start_time)

start_time = time.time()
quick_sort(arr)
print("Quick Sort Time:", time.time() - start_time)

This code benchmarks the performance of bucket sort and quick sort on a large 
random dataset.

## Source

[Bucket Sort on Wikipedia](https://en.wikipedia.org/wiki/Bucket_sort)

In this article, we explored the bucket sort algorithm in Python and compared it 
with quick sort. Bucket sort is efficient for uniformly distributed data, while 
quick sort is a versatile general-purpose algorithm.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).