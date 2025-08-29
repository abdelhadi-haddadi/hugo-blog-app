+++
title = "Python Quick Sort Tutorial"
date = 2025-08-29T20:10:03.912+01:00
draft = false
description = "Python Quick Sort tutorial explains the Quick Sort algorithm with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Quick Sort Tutorial

last modified March 8, 2025

In this article, we explain the Quick Sort algorithm and demonstrate its use in Python.

An algorithm is a step-by-step procedure for solving a problem or
performing a computation. Algorithms are fundamental to computer science and
programming.

Sorting is the process of arranging data in a specific order, such as
ascending or descending. Sorting is a common operation in programming.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Quick Sort

- Merge Sort

- Bubble Sort

- Insertion Sort

- Selection Sort

## Quick Sort Algorithm

Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

## Quick Sort Example

The following is a Python implementation of the Quick Sort algorithm.

quick_sort.py
  

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print("Sorted numbers:", sorted_numbers)

words = ["banana", "apple", "cherry", "date"]
sorted_words = quick_sort(words)
print("Sorted words:", sorted_words)

The quick_sort function sorts a list of numbers or words in ascending order.

$ ./quick_sort.py 
Sorted numbers: [1, 1, 2, 3, 6, 8, 10]
Sorted words: ['apple', 'banana', 'cherry', 'date']

## Sorting in Descending Order

To sort in descending order, we can modify the Quick Sort function.

quick_sort_desc.py
  

def quick_sort_desc(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &gt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &lt; pivot]
    return quick_sort_desc(left) + middle + quick_sort_desc(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers_desc = quick_sort_desc(numbers)
print("Sorted numbers (descending):", sorted_numbers_desc)

words = ["banana", "apple", "cherry", "date"]
sorted_words_desc = quick_sort_desc(words)
print("Sorted words (descending):", sorted_words_desc)

The quick_sort_desc function sorts a list in descending order.

$ ./quick_sort_desc.py 
Sorted numbers (descending): [10, 8, 6, 3, 2, 1, 1]
Sorted words (descending): ['date', 'cherry', 'banana', 'apple']

## Comparing Quick Sort with Insertion Sort

Quick Sort is generally faster than Insertion Sort for large datasets. Let's
compare their performance using a benchmark.

benchmark.py
  

import time
import random

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j &gt;= 0 and key &lt; arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Generate a large list of random numbers
data = [random.randint(0, 1000) for _ in range(10000)]

# Benchmark Quick Sort
start_time = time.time()
quick_sort(data.copy())
quick_sort_time = time.time() - start_time

# Benchmark Insertion Sort
start_time = time.time()
insertion_sort(data.copy())
insertion_sort_time = time.time() - start_time

print(f"Quick Sort time: {quick_sort_time:.6f} seconds")
print(f"Insertion Sort time: {insertion_sort_time:.6f} seconds")

The benchmark compares the time taken by Quick Sort and Insertion Sort to sort a
list of 10,000 random numbers.

## Source

[Quick Sort on Wikipedia](https://en.wikipedia.org/wiki/Quicksort)

In this article, we have explained the Quick Sort algorithm and demonstrated its
use in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).