+++
title = "Python Counting Sort Algorithm"
date = 2025-08-29T20:07:53.310+01:00
draft = false
description = "Python tutorial on the counting sort algorithm with examples for numeric and textual data, and a comparison with quick sort."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Counting Sort Algorithm

last modified March 8, 2025

In this article, we explain the counting sort algorithm in Python. We cover
basic definitions, provide examples for sorting numeric and textual data, and
compare counting sort with quick sort.

An algorithm is a step-by-step procedure for solving a problem or
performing a computation. Algorithms are the backbone of computer programs.

Sorting is the process of arranging data in a specific order, such
as ascending or descending. Sorting is a fundamental operation in computer
science.

## Common Sorting Algorithms

Some common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Counting Sort

## Counting Sort Algorithm

Counting sort is a non-comparison-based sorting algorithm. It works by counting
the occurrences of each element in the input list and using arithmetic to
determine the positions of elements in the sorted output.

### Counting Sort Example

The following is a Python implementation of the counting sort algorithm.

counting_sort.py
  

def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    for num in arr:
        count[num] += 1
    
    sorted_arr = []
    for i in range(len(count)):
        sorted_arr.extend([i] * count[i])
    
    return sorted_arr

# Example usage
arr = [4, 2, 2, 8, 3, 3, 1]
sorted_arr = counting_sort(arr)
print("Sorted array:", sorted_arr)

The example sorts a list of integers in ascending order using counting sort.

$ ./counting_sort.py 
Sorted array: [1, 2, 2, 3, 3, 4, 8]

### Sorting Textual Data

Counting sort can also be used to sort textual data. Here's an example:

counting_sort_text.py
  

def counting_sort_text(arr):
    max_val = ord(max(arr))
    count = [0] * (max_val + 1)
    
    for char in arr:
        count[ord(char)] += 1
    
    sorted_arr = []
    for i in range(len(count)):
        sorted_arr.extend([chr(i)] * count[i])
    
    return sorted_arr

# Example usage
text = "counting"
sorted_text = counting_sort_text(text)
print("Sorted text:", ''.join(sorted_text))

The example sorts a string in ascending order using counting sort.

$ ./counting_sort_text.py 
Sorted text: cginnottu

### Sorting in Descending Order

To sort in descending order, we can modify the counting sort algorithm.

counting_sort_desc.py
  

def counting_sort_desc(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    for num in arr:
        count[num] += 1
    
    sorted_arr = []
    for i in range(len(count) - 1, -1, -1):
        sorted_arr.extend([i] * count[i])
    
    return sorted_arr

# Example usage
arr = [4, 2, 2, 8, 3, 3, 1]
sorted_arr = counting_sort_desc(arr)
print("Sorted array (descending):", sorted_arr)

The example sorts a list of integers in descending order.

$ ./counting_sort_desc.py 
Sorted array (descending): [8, 4, 3, 3, 2, 2, 1]

## Comparison with Quick Sort

Counting sort is efficient for small ranges of integers but has limitations.
Quick sort is a comparison-based algorithm that works well for larger datasets.

### Benchmark Example

The following example compares the performance of counting sort and quick sort.

benchmark.py
  

import time
import random

def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    
    for num in arr:
        count[num] += 1
    
    sorted_arr = []
    for i in range(len(count)):
        sorted_arr.extend([i] * count[i])
    
    return sorted_arr

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Generate a large dataset
data = [random.randint(0, 1000) for _ in range(10000)]

# Benchmark counting sort
start_time = time.time()
counting_sort(data)
counting_time = time.time() - start_time

# Benchmark quick sort
start_time = time.time()
quick_sort(data)
quick_time = time.time() - start_time

print(f"Counting sort time: {counting_time:.6f} seconds")
print(f"Quick sort time: {quick_time:.6f} seconds")

The example benchmarks counting sort and quick sort on a large dataset.

Counting sort is a simple and efficient algorithm for sorting integers within a
small range. However, for larger datasets, comparison-based algorithms like
quick sort are more suitable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).