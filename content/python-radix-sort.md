+++
title = "Python Radix Sort"
date = 2025-08-29T20:10:03.930+01:00
draft = false
description = "Python Radix Sort tutorial shows how to use the Radix Sort algorithm to sort numeric and textual data in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Radix Sort

last modified March 8, 2025

In this article, we explain and implement the Radix Sort algorithm in Python.

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

- Radix Sort

## Radix Sort

Radix Sort is a non-comparative sorting algorithm that sorts data by
processing individual digits or characters. It is efficient for sorting integers
and strings.

## Radix Sort Example

The following example demonstrates how to implement Radix Sort in Python.

radix_sort.py
  

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i &gt;= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max_num = max(arr)
    exp = 1
    while max_num // exp &gt; 0:
        counting_sort(arr, exp)
        exp *= 10

arr = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(arr)
print("Sorted array:", arr)

The example sorts an array of integers using Radix Sort. The algorithm processes
digits from the least significant to the most significant.

$ ./radix_sort.py 
Sorted array: [2, 24, 45, 66, 75, 90, 170, 802]

## Sorting Textual Data

Radix Sort can also be used to sort strings. The following example sorts a list
of strings in ascending and descending order.

radix_sort_strings.py
  

def counting_sort_strings(arr, index):
    n = len(arr)
    output = [''] * n
    count = [0] * 256

    for s in arr:
        char = s[index] if index &lt; len(s) else '\0'
        count[ord(char)] += 1

    for i in range(1, 256):
        count[i] += count[i - 1]

    i = n - 1
    while i &gt;= 0:
        char = arr[i][index] if index &lt; len(arr[i]) else '\0'
        output[count[ord(char)] - 1] = arr[i]
        count[ord(char)] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort_strings(arr, reverse=False):
    max_len = max(len(s) for s in arr)
    for i in range(max_len - 1, -1, -1):
        counting_sort_strings(arr, i)
    if reverse:
        arr.reverse()

arr = ["apple", "banana", "kiwi", "mango", "cherry"]
radix_sort_strings(arr)
print("Sorted array (ascending):", arr)

radix_sort_strings(arr, reverse=True)
print("Sorted array (descending):", arr)

The example sorts a list of strings using Radix Sort. The algorithm processes
characters from the least significant to the most significant.

$ ./radix_sort_strings.py 
Sorted array (ascending): ['apple', 'banana', 'cherry', 'kiwi', 'mango']
Sorted array (descending): ['mango', 'kiwi', 'cherry', 'banana', 'apple']

## Radix Sort vs Quick Sort

Radix Sort and Quick Sort are both efficient sorting algorithms, but they have
different use cases. Radix Sort is ideal for sorting integers and strings, while
Quick Sort is a general-purpose sorting algorithm.

The following example compares the performance of Radix Sort and Quick Sort.

radix_vs_quick.py
  

import time
import random

import time
import random

def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    i = n - 1
    while i &gt;= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max_num = max(arr)
    exp = 1
    while max_num // exp &gt; 0:
        counting_sort(arr, exp)
        exp *= 10

def quick_sort(arr):
    if len(arr) &lt;= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x &lt; pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quick_sort(left) + middle + quick_sort(right)

arr = [random.randint(0, 10000) for _ in range(10000)]

start = time.time()
radix_sort(arr.copy())
end = time.time()
print("Radix Sort time:", end - start)

start = time.time()
quick_sort(arr.copy())
end = time.time()
print("Quick Sort time:", end - start)

The example benchmarks Radix Sort and Quick Sort on a large array of random
integers.

## Source

[Radix Sort on Wikipedia](https://en.wikipedia.org/wiki/Radix_sort)

In this article, we have implemented and explained the Radix Sort algorithm in
Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).