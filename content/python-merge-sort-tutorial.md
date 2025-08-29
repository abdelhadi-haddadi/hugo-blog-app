+++
title = "Python Merge Sort Tutorial"
date = 2025-08-29T20:08:55.572+01:00
draft = false
description = "Python Merge Sort tutorial explains the merge sort algorithm with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Merge Sort Tutorial

last modified March 8, 2025

In this article, we explain the merge sort algorithm and demonstrate its use in Python.

An algorithm is a step-by-step procedure for solving a problem or performing a computation. Algorithms are fundamental to computer science and programming.

Sorting is the process of arranging data in a specific order, such as ascending or descending. Sorting is essential for efficient data retrieval and analysis.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Merge Sort Algorithm

Merge Sort is a divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts them, and then merges the two sorted halves.

## Merge Sort Example

Below is a Python implementation of the Merge Sort algorithm.

merge_sort.py
  

def merge_sort(arr):
    if len(arr) &gt; 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i &lt; len(left_half) and j &lt; len(right_half):
            if left_half[i] &lt; right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i &lt; len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j &lt; len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

def sort_ascending(arr):
    merge_sort(arr)
    return arr

def sort_descending(arr):
    merge_sort(arr)
    return arr[::-1]

# Example usage
numbers = [38, 27, 43, 3, 9, 82, 10]
words = ["apple", "banana", "cherry", "date", "elderberry"]

print("Sorted numbers (ascending):", sort_ascending(numbers))
print("Sorted numbers (descending):", sort_descending(numbers))
print("Sorted words (ascending):", sort_ascending(words))
print("Sorted words (descending):", sort_descending(words))

The merge_sort function sorts the array in ascending order. The sort_ascending and sort_descending functions use merge_sort to sort the array in ascending and descending order, respectively.

$ ./merge_sort.py 
Sorted numbers (ascending): [3, 9, 10, 27, 38, 43, 82]
Sorted numbers (descending): [82, 43, 38, 27, 10, 9, 3]
Sorted words (ascending): ['apple', 'banana', 'cherry', 'date', 'elderberry']
Sorted words (descending): ['elderberry', 'date', 'cherry', 'banana', 'apple']

## Comparing Merge Sort with Quick Sort

Merge Sort and Quick Sort are both efficient sorting algorithms. Merge Sort has a consistent time complexity of O(n log n), while Quick Sort has an average time complexity of O(n log n) but can degrade to O(n^2) in the worst case.

Below is a benchmark comparing the performance of Merge Sort and Quick Sort.

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

def benchmark(sort_func, arr):
    start_time = time.time()
    sort_func(arr)
    end_time = time.time()
    return end_time - start_time

# Generate a large list of random numbers
random_numbers = [random.randint(0, 10000) for _ in range(10000)]

# Benchmark Merge Sort
merge_sort_time = benchmark(lambda arr: merge_sort(arr), random_numbers.copy())

# Benchmark Quick Sort
quick_sort_time = benchmark(lambda arr: quick_sort(arr), random_numbers.copy())

print(f"Merge Sort Time: {merge_sort_time:.6f} seconds")
print(f"Quick Sort Time: {quick_sort_time:.6f} seconds")

The benchmark compares the time taken by Merge Sort and Quick Sort to sort a
large list of random numbers.

## Source

[Merge Sort on Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)

In this article, we have explained and demonstrated the Merge Sort algorithm in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).