+++
title = "Python Bubble Sort"
date = 2025-08-29T20:07:44.348+01:00
draft = false
description = "Python Bubble Sort tutorial explains the Bubble Sort algorithm with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Bubble Sort

last modified March 8, 2025

In this article, we explain the Bubble Sort algorithm in Python. We cover
sorting numeric and textual data in ascending and descending order. We also
compare Bubble Sort with Quick Sort and perform a benchmark.

An algorithm is a step-by-step procedure to solve a problem or
perform a computation. Algorithms are fundamental to computer science and
programming.

Sorting is the process of arranging data in a specific order, such as
ascending or descending. Sorting is a common operation in programming and is
used in various applications.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Quick Sort

- Merge Sort

- Insertion Sort

- Selection Sort

## Bubble Sort Algorithm

Bubble Sort is a simple sorting algorithm that repeatedly steps through the
list, compares adjacent elements, and swaps them if they are in the wrong order.
The pass through the list is repeated until the list is sorted.

## Bubble Sort Example

The following is a Python implementation of the Bubble Sort algorithm.

bubble_sort.py
  

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] &gt; arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Example usage
nums = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(nums)
print("Sorted array:", nums)

The example sorts a list of numbers in ascending order using Bubble Sort.

$ ./bubble_sort.py 
Sorted array: [11, 12, 22, 25, 34, 64, 90]

## Sorting Textual Data

Bubble Sort can also be used to sort textual data. The following example sorts a
list of strings in ascending and descending order.

bubble_sort_text.py
  

def bubble_sort(arr, reverse=False):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if (arr[j] &gt; arr[j+1] and not reverse) or (arr[j] &lt; arr[j+1] and reverse):
                arr[j], arr[j+1] = arr[j+1], arr[j]

# Example usage
words = ["banana", "apple", "cherry", "date"]
bubble_sort(words)
print("Sorted in ascending order:", words)

bubble_sort(words, reverse=True)
print("Sorted in descending order:", words)

The example sorts a list of words in both ascending and descending order.

$ ./bubble_sort_text.py 
Sorted in ascending order: ['apple', 'banana', 'cherry', 'date']
Sorted in descending order: ['date', 'cherry', 'banana', 'apple']

## Comparing Bubble Sort with Quick Sort

Bubble Sort is simple but inefficient for large datasets. Quick Sort is more
efficient and widely used. The following example compares the performance of
Bubble Sort and Quick Sort.

sort_benchmark.py
  

import time
import random

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] &gt; arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Generate a large list of random numbers
data = [random.randint(0, 1000) for _ in range(1000)]

# Benchmark Bubble Sort
start_time = time.time()
bubble_sort(data.copy())
bubble_time = time.time() - start_time

# Benchmark Quick Sort
start_time = time.time()
quick_sort(data.copy())
quick_time = time.time() - start_time

print(f"Bubble Sort time: {bubble_time:.6f} seconds")
print(f"Quick Sort time: {quick_time:.6f} seconds")

The example benchmarks Bubble Sort and Quick Sort on a list of 1000 random
numbers.

Bubble Sort is a simple sorting algorithm but is inefficient for large datasets.
Quick Sort is more efficient and is preferred for practical applications.
Understanding sorting algorithms is essential for writing efficient programs.

## Source

[Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html)

In this article, we have explained the Bubble Sort algorithm in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).