+++
title = "Java Heap Sort Algorithm"
date = 2025-08-29T19:59:03.182+01:00
draft = false
description = "Complete Java heap sort algorithm tutorial covering implementation with examples. Learn how to sort numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Heap Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
numerical or lexicographical. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort,
Merge Sort, Quick Sort, and Heap Sort. Each has different time and space
complexity characteristics, making them suitable for different scenarios.

## Heap Sort Overview

Heap Sort is a comparison-based sorting algorithm that uses a binary heap data
structure. It has O(n log n) time complexity for all cases, making it efficient
for large datasets. Heap Sort is not stable but has O(1) space complexity.

The algorithm works by first building a max-heap from the input data. Then it
repeatedly extracts the maximum element from the heap and reconstructs the heap
until all elements are sorted. This in-place sorting makes it memory efficient.

## Heap Sort Implementation

Here's a basic implementation of Heap Sort in Java for sorting integers in
ascending order. The implementation consists of two main parts: heapify and
the actual sort method.

HeapSort.java
  

package com.zetcode;

public class HeapSort {

    public void sort(int[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i &gt;= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap
        for (int i = n - 1; i &gt; 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // If left child is larger than root
        if (left &lt; n &amp;&amp; arr[left] &gt; arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right &lt; n &amp;&amp; arr[right] &gt; arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify affected sub-tree
            heapify(arr, n, largest);
        }
    }

    public static void main(String[] args) {

        int[] arr = {12, 11, 13, 5, 6, 7};
        
        System.out.println("Original array:");
        printArray(arr);

        HeapSort heapSort = new HeapSort();
        heapSort.sort(arr);

        System.out.println("Sorted array:");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

This implementation first builds a max-heap from the input array. Then it
repeatedly extracts the maximum element and maintains the heap property.
The heapify method ensures the subtree rooted at index i is a max-heap.

## Sorting Textual Data

Heap Sort can also sort strings lexicographically. The implementation is similar
to the numeric version but compares strings using the compareTo method.

StringHeapSort.java
  

package com.zetcode;

public class StringHeapSort {

    public void sort(String[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i &gt;= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap
        for (int i = n - 1; i &gt; 0; i--) {
            // Move current root to end
            String temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    void heapify(String[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left &lt; n &amp;&amp; arr[left].compareTo(arr[largest]) &gt; 0) {
            largest = left;
        }

        if (right &lt; n &amp;&amp; arr[right].compareTo(arr[largest]) &gt; 0) {
            largest = right;
        }

        if (largest != i) {
            String swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            heapify(arr, n, largest);
        }
    }

    public static void main(String[] args) {

        String[] words = {"banana", "apple", "orange", "grape", "kiwi"};
        
        System.out.println("Original array:");
        printArray(words);

        StringHeapSort sorter = new StringHeapSort();
        sorter.sort(words);

        System.out.println("Sorted array:");
        printArray(words);
    }

    static void printArray(String[] arr) {
        for (String word : arr) {
            System.out.print(word + " ");
        }
        System.out.println();
    }
}

This version sorts strings in ascending order. The heapify method uses
String.compareTo for comparisons. The algorithm maintains the same
O(n log n) time complexity as the numeric version.

## Descending Order Sorting

To sort in descending order, we can modify the heap property to create a min-heap
instead of a max-heap. Alternatively, we can sort in ascending order and then
reverse the array.

DescendingHeapSort.java
  

package com.zetcode;

public class DescendingHeapSort {

    public void sort(int[] arr) {
        int n = arr.length;

        // Build min heap
        for (int i = n / 2 - 1; i &gt;= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap
        for (int i = n - 1; i &gt; 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int smallest = i; // Initialize smallest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // If left child is smaller than root
        if (left &lt; n &amp;&amp; arr[left] &lt; arr[smallest]) {
            smallest = left;
        }

        // If right child is smaller than smallest so far
        if (right &lt; n &amp;&amp; arr[right] &lt; arr[smallest]) {
            smallest = right;
        }

        // If smallest is not root
        if (smallest != i) {
            int swap = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = swap;

            // Recursively heapify affected sub-tree
            heapify(arr, n, smallest);
        }
    }

    public static void main(String[] args) {

        int[] arr = {12, 11, 13, 5, 6, 7};
        
        System.out.println("Original array:");
        printArray(arr);

        DescendingHeapSort heapSort = new DescendingHeapSort();
        heapSort.sort(arr);

        System.out.println("Sorted array (descending):");
        printArray(arr);
    }

    static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

This implementation creates a min-heap instead of a max-heap by changing the
comparison operators. The smallest elements are moved to the end of the array,
resulting in descending order. The time complexity remains O(n log n).

## Heap Sort vs Quick Sort Benchmark

Heap Sort and Quick Sort are both efficient sorting algorithms with O(n log n)
average time complexity. However, they have different characteristics that make
them suitable for different scenarios.

Quick Sort is generally faster in practice due to better cache performance and
lower constant factors. However, it has O(n²) worst-case time complexity, while
Heap Sort maintains O(n log n) in all cases. Heap Sort is also in-place.

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void main(String[] args) {

        int size = 100000;
        int[] arr1 = generateRandomArray(size);
        int[] arr2 = Arrays.copyOf(arr1, arr1.length);

        // Heap Sort benchmark
        long start = System.currentTimeMillis();
        sort(arr1);
        long heapTime = System.currentTimeMillis() - start;

        // Quick Sort benchmark
        start = System.currentTimeMillis();
        Arrays.sort(arr2); // Uses Dual-Pivot QuickSort
        long quickTime = System.currentTimeMillis() - start;

        System.out.println("Heap Sort time: " + heapTime + " ms");
        System.out.println("Quick Sort time: " + quickTime + " ms");
    }

    static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i &lt; size; i++) {
            arr[i] = random.nextInt(size * 10);
        }
        return arr;
    }

    static private void sort(int[] arr) {
        int n = arr.length;

        // Build max heap
        for (int i = n / 2 - 1; i &gt;= 0; i--) {
            heapify(arr, n, i);
        }

        // Extract elements from heap
        for (int i = n - 1; i &gt; 0; i--) {
            // Move current root to end
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // Heapify reduced heap
            heapify(arr, i, 0);
        }
    }

    static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // If left child is larger than root
        if (left &lt; n &amp;&amp; arr[left] &gt; arr[largest]) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right &lt; n &amp;&amp; arr[right] &gt; arr[largest]) {
            largest = right;
        }

        // If largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // Recursively heapify affected sub-tree
            heapify(arr, n, largest);
        }
    }
}

This benchmark compares our Heap Sort implementation with Java's built-in
Arrays.sort (which uses Dual-Pivot QuickSort). On average, Quick
Sort is faster, but Heap Sort provides consistent performance across all cases.

## When to Use Heap Sort

Heap Sort is particularly useful when you need guaranteed O(n log n) performance
and in-place sorting. It's ideal for systems with limited memory or when worst-
case performance is critical. However, for most general-purpose sorting, Quick
Sort or Merge Sort might be better choices.

Heap Sort is also the basis for priority queues and is used in graph algorithms
like Dijkstra's and Prim's. Understanding Heap Sort helps in mastering these
more advanced algorithms and data structures.

## Source

[Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)

In this article, we've covered the Heap Sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared it with Quick Sort through a simple benchmark.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).