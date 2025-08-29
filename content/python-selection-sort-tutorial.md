+++
title = "Python Selection Sort Tutorial"
date = 2025-08-29T20:10:20.922+01:00
draft = false
description = "Python selection sort tutorial explains the selection sort algorithm with examples for numeric and textual data, and compares it with quick sort."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Selection Sort Tutorial

last modified March 8, 2025

In this article, we explain the selection sort algorithm in Python. We cover
basic definitions, provide examples for sorting numeric and textual data, and
compare selection sort with quick sort.

An algorithm is a step-by-step procedure for solving a problem or
performing a computation. Algorithms are the backbone of computer programs.

Sorting is the process of arranging data in a specific order, such
as ascending or descending. Sorting is a fundamental operation in computer
science.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Selection Sort

- Bubble Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Selection Sort Algorithm

The selection sort algorithm works by repeatedly finding the minimum
(or maximum) element from the unsorted portion of the list and swapping it with
the first unsorted element. This process continues until the entire list is
sorted.

## Selection Sort Example

The following is a Python implementation of the selection sort algorithm.

selection_sort.py
  

def selection_sort(arr, ascending=True):
    n = len(arr)
    for i in range(n):
        idx = i
        for j in range(i + 1, n):
            if (ascending and arr[j] &lt; arr[idx]) or (not ascending and arr[j] &gt; arr[idx]):
                idx = j
        arr[i], arr[idx] = arr[idx], arr[i]
    return arr

# Sorting numeric data
numbers = [64, 25, 12, 22, 11]
print("Sorted in ascending order:", selection_sort(numbers))
print("Sorted in descending order:", selection_sort(numbers, ascending=False))

# Sorting textual data
words = ["apple", "banana", "kiwi", "cherry"]
print("Sorted in ascending order:", selection_sort(words))
print("Sorted in descending order:", selection_sort(words, ascending=False))

The selection_sort function sorts a list in either ascending or
descending order. It works for both numeric and textual data.

$ ./selection_sort.py
Sorted in ascending order: [11, 12, 22, 25, 64]
Sorted in descending order: [64, 25, 22, 12, 11]
Sorted in ascending order: ['apple', 'banana', 'cherry', 'kiwi']
Sorted in descending order: ['kiwi', 'cherry', 'banana', 'apple']

## Comparing Selection Sort with Quick Sort

Selection sort is simple but inefficient for large datasets. Quick sort, on the
other hand, is much faster for large datasets due to its divide-and-conquer
approach. Let's compare their performance.

benchmark.py
  

import time
import random

def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        idx = i
        for j in range(i + 1, n):
            if arr[j] &lt; arr[idx]:
                idx = j
        arr[i], arr[idx] = arr[idx], arr[i]
    return arr

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

# Benchmark selection sort
start = time.time()
selection_sort(data.copy())
end = time.time()
print(f"Selection Sort Time: {end - start:.6f} seconds")

# Benchmark quick sort
start = time.time()
quick_sort(data.copy())
end = time.time()
print(f"Quick Sort Time: {end - start:.6f} seconds")

The example benchmarks the performance of selection sort and quick sort on a
dataset of 1000 random integers.

## Source

[Sorting HOWTO](https://docs.python.org/3/howto/sorting.html)

In this article, we explained the selection sort algorithm in Python and compared
it with quick sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).