+++
title = "Python Heap Sort Algorithm"
date = 2025-08-29T20:08:39.776+01:00
draft = false
description = "Python Heap Sort tutorial explains the heap sort algorithm with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Heap Sort Algorithm

last modified March 8, 2025

In this article, we explain the heap sort algorithm in Python. We cover sorting
numeric and textual data in both ascending and descending order. Finally, we
compare heap sort with quick sort and perform a benchmark.

An algorithm is a step-by-step procedure to solve a problem or
perform a computation. Algorithms are the backbone of computer programs.

Sorting is the process of arranging data in a specific order, such as
ascending or descending. Sorting is a fundamental operation in computer science.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Heap Sort Algorithm

Heap sort is a comparison-based sorting algorithm. It uses a binary heap data
structure to sort elements. The algorithm has a time complexity of O(n log n),
making it efficient for large datasets.

## Heap Sort Example

The following example demonstrates heap sort in Python for numeric data.

heap_sort.py
  

#!/usr/bin/python

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left &lt; n and arr[i] &lt; arr[left]:
        largest = left

    if right &lt; n and arr[largest] &lt; arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

arr = [12, 11, 13, 5, 6, 7]
heap_sort(arr)
print("Sorted array:", arr)

The example sorts an array of integers in ascending order using heap sort.

$ ./heap_sort.py 
Sorted array: [5, 6, 7, 11, 12, 13]

## Heap Sort for Textual Data

Heap sort can also be used to sort textual data. The following example sorts a
list of strings in ascending order.

heap_sort_text.py
  

#!/usr/bin/python

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left &lt; n and arr[i] &lt; arr[left]:
        largest = left

    if right &lt; n and arr[largest] &lt; arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

arr = ["banana", "apple", "cherry", "date"]
heap_sort(arr)
print("Sorted array:", arr)

The example sorts a list of strings in ascending order.

$ ./heap_sort_text.py 
Sorted array: ['apple', 'banana', 'cherry', 'date']

## Heap Sort in Descending Order

To sort data in descending order, modify the heapify function to build a min-heap
instead of a max-heap.

heap_sort_desc.py
  

#!/usr/bin/python

def heapify(arr, n, i):
    smallest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left &lt; n and arr[i] &gt; arr[left]:
        smallest = left

    if right &lt; n and arr[smallest] &gt; arr[right]:
        smallest = right

    if smallest != i:
        arr[i], arr[smallest] = arr[smallest], arr[i]
        heapify(arr, n, smallest)

def heap_sort_desc(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

arr = [12, 11, 13, 5, 6, 7]
heap_sort_desc(arr)
print("Sorted array in descending order:", arr)

The example sorts an array of integers in descending order.

$ ./heap_sort_desc.py 
Sorted array in descending order: [13, 12, 11, 7, 6, 5]

## Heap Sort vs Quick Sort

Heap sort and quick sort are both efficient sorting algorithms. Heap sort has a
guaranteed time complexity of O(n log n), while quick sort has an average time
complexity of O(n log n) but can degrade to O(n^2) in the worst case.

## Benchmarking Heap Sort and Quick Sort

The following example benchmarks heap sort and quick sort using Python's
timeit module.

benchmark.py
  

#!/usr/bin/python

import timeit
import random

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left &lt; n and arr[i] &lt; arr[left]:
        largest = left

    if right &lt; n and arr[largest] &lt; arr[right]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

arr = [random.randint(0, 1000) for _ in range(1000)]

heap_time = timeit.timeit(lambda: heap_sort(arr.copy()), number=100)
quick_time = timeit.timeit(lambda: quick_sort(arr.copy()), number=100)

print(f"Heap Sort Time: {heap_time}")
print(f"Quick Sort Time: {quick_time}")

The example benchmarks heap sort and quick sort on a list of 1000 random integers.

## Source

[Functional Programming HOWTO](https://docs.python.org/3/howto/functional.html)

In this article, we have explained the heap sort algorithm in Python with examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).