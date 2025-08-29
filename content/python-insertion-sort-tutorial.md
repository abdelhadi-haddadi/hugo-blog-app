+++
title = "Python Insertion Sort Tutorial"
date = 2025-08-29T20:08:43.144+01:00
draft = false
description = "Python insertion sort tutorial explains the insertion sort algorithm with examples for numeric and textual data."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Insertion Sort Tutorial

last modified March 8, 2025

In this article, we explain the insertion sort algorithm and demonstrate its
implementation in Python. We also compare it with the quick sort algorithm.

An algorithm is a step-by-step procedure for solving a problem or
performing a computation. Algorithms are fundamental to computer science and
are used to process data, perform calculations, and automate tasks.

Sorting is the process of arranging data in a specific order, such
as ascending or descending. Sorting is essential for efficient data retrieval
and analysis.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final
sorted array one item at a time. It is efficient for small datasets but
inefficient for large datasets.

### Insertion Sort Example

The following Python code demonstrates the insertion sort algorithm.

insertion_sort.py
  

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &lt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Sorting numeric data in ascending order
numbers = [12, 11, 13, 5, 6]
insertion_sort(numbers)
print("Sorted numbers (ascending):", numbers)

# Sorting textual data in ascending order
words = ["apple", "banana", "cherry", "date"]
insertion_sort(words)
print("Sorted words (ascending):", words)

# Sorting numeric data in descending order
def insertion_sort_desc(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &gt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

insertion_sort_desc(numbers)
print("Sorted numbers (descending):", numbers)

# Sorting textual data in descending order
insertion_sort_desc(words)
print("Sorted words (descending):", words)

The code sorts both numeric and textual data in ascending and descending order.

### Explanation

The insertion sort algorithm works by iterating through the list and inserting
each element into its correct position in the sorted portion of the list.

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &lt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

The insertion_sort function sorts the array in ascending order.

def insertion_sort_desc(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &gt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

The insertion_sort_desc function sorts the array in descending
order.

## Comparing Insertion Sort with Quick Sort

Insertion sort is efficient for small datasets but has a time complexity of
O(n²) for larger datasets. Quick sort, on the other hand, has an average time
complexity of O(n log n) and is more efficient for larger datasets.

benchmark.py
  

import time
import random

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &lt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Generate a large dataset
data = [random.randint(1, 1000) for _ in range(1000)]

# Benchmark insertion sort
start_time = time.time()
insertion_sort(data.copy())
insertion_time = time.time() - start_time

# Benchmark quick sort
start_time = time.time()
quick_sort(data.copy())
quick_time = time.time() - start_time

print(f"Insertion Sort Time: {insertion_time:.6f} seconds")
print(f"Quick Sort Time: {quick_time:.6f} seconds")

The benchmark compares the performance of insertion sort and quick sort on a
large dataset.

## Source

[Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html)

In this article, we have explained the insertion sort algorithm and demonstrated
its implementation in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).