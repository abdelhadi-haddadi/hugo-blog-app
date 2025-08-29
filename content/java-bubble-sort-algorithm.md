+++
title = "Java Bubble Sort Algorithm"
date = 2025-08-29T19:58:06.678+01:00
draft = false
description = "Complete Java Bubble Sort tutorial covering implementation with examples. Learn how to sort numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Bubble Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
numerical or lexicographical. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort,
Merge Sort, Quick Sort, and Heap Sort. Each has different time and space
complexity characteristics, making them suitable for different scenarios.

## Bubble Sort Overview

Bubble Sort is a simple comparison-based algorithm that repeatedly steps through
the list, compares adjacent elements, and swaps them if they are in the wrong
order. The pass through the list is repeated until the list is sorted.

The algorithm gets its name because smaller elements "bubble" to the top of the
list (beginning) while larger elements sink to the bottom (end). It has O(n²)
time complexity in the worst and average cases.

## Basic Bubble Sort Implementation

Here's a basic implementation of Bubble Sort in Java for sorting integers in
ascending order. The algorithm uses nested loops to compare and swap elements.

BubbleSort.java
  

package com.zetcode;

public class BubbleSort {

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j] &gt; arr[j+1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {

        int[] data = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Unsorted array:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        bubbleSort(data);
        
        System.out.println("\nSorted array:");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

This implementation shows the classic Bubble Sort algorithm. The outer loop
controls the number of passes, while the inner loop performs the comparisons
and swaps. After each pass, the largest unsorted element bubbles to its correct
position.

## Optimized Bubble Sort

We can optimize Bubble Sort by adding a flag to check if any swaps were made in
a pass. If no swaps occur, the array is already sorted, and we can terminate
early. This improves best-case performance to O(n).

OptimizedBubbleSort.java
  

package com.zetcode;

public class OptimizedBubbleSort {

    public static void optimizedBubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i &lt; n-1; i++) {
            swapped = false;
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j] &gt; arr[j+1]) {
                    // Swap arr[j] and arr[j+1]
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    swapped = true;
                }
            }
            // If no swaps, array is sorted
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {

        int[] data = {1, 2, 3, 4, 5, 6}; // Already sorted
        optimizedBubbleSort(data);
        System.out.println("Sorted array:");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

The optimized version adds a boolean flag to track swaps. If no swaps occur in a
complete pass, the algorithm terminates early. This is particularly useful for
nearly sorted arrays.

## Sorting Strings with Bubble Sort

Bubble Sort can also sort textual data. Here's an implementation for sorting an
array of strings in ascending order using the compareTo method.

StringBubbleSort.java
  

package com.zetcode;

public class StringBubbleSort {

    public static void bubbleSort(String[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j].compareTo(arr[j+1]) &gt; 0) {
                    // Swap arr[j] and arr[j+1]
                    String temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {

        String[] names = {"John", "Alice", "Bob", "Eve", "David"};
        System.out.println("Unsorted names:");
        for (String name : names) {
            System.out.print(name + " ");
        }
        
        bubbleSort(names);
        
        System.out.println("\nSorted names:");
        for (String name : names) {
            System.out.print(name + " ");
        }
    }
}

This example demonstrates sorting strings lexicographically. The compareTo method
returns a positive number if the first string is greater than the second,
triggering a swap.

## Descending Order Bubble Sort

To sort in descending order, we simply reverse the comparison condition. Here
are examples for both numeric and string arrays.

DescendingBubbleSort.java
  

package com.zetcode;

public class DescendingBubbleSort {

    public static void bubbleSortDescending(int[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j] &lt; arr[j+1]) { // Changed comparison
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void bubbleSortStringsDescending(String[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j].compareTo(arr[j+1]) &lt; 0) { // Changed comparison
                    String temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void main(String[] args) {

        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        bubbleSortDescending(numbers);
        System.out.println("Numbers in descending order:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        String[] names = {"John", "Alice", "Bob", "Eve", "David"};
        bubbleSortStringsDescending(names);
        System.out.println("\nNames in descending order:");
        for (String name : names) {
            System.out.print(name + " ");
        }
    }
}

For descending order, we simply change the comparison operators. For numbers, we
check if the current element is less than the next. For strings, we check if
compareTo returns a negative value.

## Bubble Sort vs Quick Sort Benchmark

Bubble Sort is simple but inefficient for large datasets. Quick Sort is much
faster on average (O(n log n)) but more complex. Let's compare their performance.

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            for (int j = 0; j &lt; n-i-1; j++) {
                if (arr[j] &gt; arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low &lt; high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi-1);
            quickSort(arr, pi+1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j &lt; high; j++) {
            if (arr[j] &lt; pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;
        return i+1;
    }

    public static void main(String[] args) {

        int[] smallArray = new int[1000];
        int[] largeArray = new int[10000];
        Random rand = new Random();
        
        // Fill arrays with random numbers
        for (int i = 0; i &lt; smallArray.length; i++) {
            smallArray[i] = rand.nextInt(10000);
        }
        for (int i = 0; i &lt; largeArray.length; i++) {
            largeArray[i] = rand.nextInt(10000);
        }
        
        // Benchmark Bubble Sort on small array
        int[] copy = Arrays.copyOf(smallArray, smallArray.length);
        long start = System.nanoTime();
        bubbleSort(copy);
        long end = System.nanoTime();
        System.out.println("Bubble Sort (1,000 elements): " + 
            (end - start) / 1_000_000 + " ms");
        
        // Benchmark Quick Sort on small array
        copy = Arrays.copyOf(smallArray, smallArray.length);
        start = System.nanoTime();
        quickSort(copy, 0, copy.length-1);
        end = System.nanoTime();
        System.out.println("Quick Sort (1,000 elements): " + 
            (end - start) / 1_000_000 + " ms");
        
        // Benchmark Quick Sort on large array
        copy = Arrays.copyOf(largeArray, largeArray.length);
        start = System.nanoTime();
        quickSort(copy, 0, copy.length-1);
        end = System.nanoTime();
        System.out.println("Quick Sort (10,000 elements): " + 
            (end - start) / 1_000_000 + " ms");
        
        // Bubble Sort on large array would be too slow for this demo
    }
}

This benchmark shows the dramatic performance difference between Bubble Sort and
Quick Sort. For 1,000 elements, Quick Sort is typically 10-100x faster. For
10,000 elements, Bubble Sort would take minutes while Quick Sort finishes in
milliseconds.

## When to Use Bubble Sort

Despite its inefficiency, Bubble Sort has some use cases. It's simple to
implement and understand, making it good for educational purposes. For nearly
sorted small datasets, the optimized version can be acceptable.

In practice, Java's Arrays.sort() (which uses a tuned Quick Sort for primitives
and Merge Sort for objects) should be preferred for most real-world sorting
needs.

## Source

[Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)

In this article, we've covered the Bubble Sort algorithm in Java, including
basic and optimized implementations, sorting of different data types in both
orders, and performance comparisons with Quick Sort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).