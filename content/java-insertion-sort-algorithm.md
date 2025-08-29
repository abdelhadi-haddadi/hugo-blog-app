+++
title = "Java Insertion Sort Algorithm"
date = 2025-08-29T19:59:06.208+01:00
draft = false
description = "Complete Java insertion sort tutorial covering implementation with examples. Learn how to sort numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Insertion Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements of a list in a specific order,
typically numerical or lexicographical. Efficient sorting is important for
optimizing other algorithms.

Common sorting algorithms include:

- Insertion Sort

- Bubble Sort

- Selection Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Insertion Sort Overview

Insertion sort is a simple sorting algorithm that builds the final sorted array
one item at a time. It is efficient for small data sets or nearly sorted data.
The algorithm works similarly to how you might sort playing cards in your hands.

Insertion sort has a time complexity of O(n²) in the worst and average cases,
but O(n) in the best case (when the input is already sorted). It is stable
(does not change the relative order of equal elements) and in-place (requires
only O(1) additional space).

## Basic Insertion Sort Implementation

Here's a basic implementation of insertion sort for integers in ascending order:

InsertionSort.java
  

package com.zetcode;

public class InsertionSort {

    public static void sort(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i &lt; n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements greater than key to one position ahead
            while (j &gt;= 0 &amp;&amp; arr[j] &gt; key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {

        int[] data = {12, 11, 13, 5, 6};
        System.out.println("Unsorted array:");
        printArray(data);
        
        sort(data);
        
        System.out.println("Sorted array (ascending):");
        printArray(data);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

This implementation sorts an integer array in ascending order. The algorithm
iterates through the array, comparing each element with the previous ones and
inserting it in the correct position. The printArray method displays the array.

## Sorting in Descending Order

To sort in descending order, we simply modify the comparison in the while loop:

InsertionSortDesc.java
  

package com.zetcode;

public class InsertionSortDesc {

    public static void sortDesc(int[] arr) {
        int n = arr.length;
        
        for (int i = 1; i &lt; n; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements smaller than key to one position ahead
            while (j &gt;= 0 &amp;&amp; arr[j] &lt; key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {

        int[] data = {12, 11, 13, 5, 6};
        System.out.println("Unsorted array:");
        printArray(data);
        
        sortDesc(data);
        
        System.out.println("Sorted array (descending):");
        printArray(data);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

The only change is the comparison operator in the while loop condition, from
&gt; to &lt;. This makes the algorithm sort in
descending order instead of ascending.

## Sorting Strings with Insertion Sort

Insertion sort can also sort textual data. Here's an implementation for sorting
strings in ascending order:

StringInsertionSort.java
  

package com.zetcode;

public class StringInsertionSort {

    public static void sortStrings(String[] arr) {
        int n = arr.length;
        
        for (int i = 1; i &lt; n; i++) {
            String key = arr[i];
            int j = i - 1;
            
            // Compare strings lexicographically
            while (j &gt;= 0 &amp;&amp; arr[j].compareTo(key) &gt; 0) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {

        String[] names = {"John", "Alice", "Bob", "Eve", "David"};
        System.out.println("Unsorted names:");
        printArray(names);
        
        sortStrings(names);
        
        System.out.println("Sorted names (ascending):");
        printArray(names);
    }
    
    private static void printArray(String[] arr) {
        for (String str : arr) {
            System.out.print(str + " ");
        }
        System.out.println();
    }
}

This version uses the compareTo method of the String class to
determine the order of elements. The algorithm works the same way as with
numbers, but compares strings lexicographically.

## Generic Insertion Sort Implementation

We can create a more flexible implementation using Java generics that works with
any Comparable type:

GenericInsertionSort.java
  

package com.zetcode;

public class GenericInsertionSort {

    public static &lt;T extends Comparable&lt;T&gt;&gt; void sort(T[] arr) {
        int n = arr.length;
        
        for (int i = 1; i &lt; n; i++) {
            T key = arr[i];
            int j = i - 1;
            
            while (j &gt;= 0 &amp;&amp; arr[j].compareTo(key) &gt; 0) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {

        // Sorting integers
        Integer[] numbers = {12, 11, 13, 5, 6};
        System.out.println("Unsorted numbers:");
        printArray(numbers);
        
        sort(numbers);
        System.out.println("Sorted numbers:");
        printArray(numbers);
        
        // Sorting strings
        String[] names = {"John", "Alice", "Bob", "Eve", "David"};
        System.out.println("\nUnsorted names:");
        printArray(names);
        
        sort(names);
        System.out.println("Sorted names:");
        printArray(names);
    }
    
    private static &lt;T&gt; void printArray(T[] arr) {
        for (T element : arr) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

This generic implementation can sort any array of objects that implement the
Comparable interface. It demonstrates the flexibility of Java generics while
maintaining type safety.

## Insertion Sort vs Quick Sort Benchmark

While insertion sort is simple, it's not the most efficient for large datasets.
Let's compare it with QuickSort, which has better average performance (O(n log n)
vs O(n²)):

SortBenchmark.java
  

package com.zetcode;

import java.util.Random;

public class SortBenchmark {

    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i &lt; n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j &gt;= 0 &amp;&amp; arr[j] &gt; key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low &lt; high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j &lt; high; j++) {
            if (arr[j] &lt; pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {

        int[] smallArray = generateRandomArray(100);
        int[] mediumArray = generateRandomArray(1_000);
        int[] largeArray = generateRandomArray(10_000);
        
        benchmarkSort("Insertion Sort (100)", smallArray.clone());
        benchmarkSort("QuickSort (100)", smallArray.clone());
        
        benchmarkSort("Insertion Sort (1,000)", mediumArray.clone());
        benchmarkSort("QuickSort (1,000)", mediumArray.clone());
        
        benchmarkSort("Insertion Sort (10,000)", largeArray.clone());
        benchmarkSort("QuickSort (10,000)", largeArray.clone());
    }
    
    private static void benchmarkSort(String name, int[] arr) {
        long startTime = System.nanoTime();
        
        if (name.startsWith("Insertion")) {
            insertionSort(arr);
        } else {
            quickSort(arr, 0, arr.length - 1);
        }
        
        long endTime = System.nanoTime();
        long duration = (endTime - startTime) / 1_000_000; // milliseconds
        
        System.out.printf("%s: %d ms%n", name, duration);
    }
    
    private static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i &lt; size; i++) {
            arr[i] = random.nextInt(10_000);
        }
        return arr;
    }
}

This benchmark compares the performance of insertion sort and quicksort on arrays
of different sizes. The results typically show that:

- For small arrays (100 elements), insertion sort may be comparable or faster

- For medium arrays (1,000 elements), quicksort starts to show advantage

- For large arrays (10,000+ elements), quicksort is significantly faster

## When to Use Insertion Sort

Despite its O(n²) complexity, insertion sort has some advantages that make it
useful in specific scenarios:

- When the data is nearly sorted (best case O(n) performance)

- For small datasets where its simplicity outweighs performance concerns

- When memory is constrained (it's an in-place sorting algorithm)

- As part of more advanced algorithms (e.g., Timsort uses it for small runs)

## Source

[Java Collections Algorithms Documentation](https://docs.oracle.com/javase/tutorial/collections/algorithms/index.html)

In this tutorial, we've covered the insertion sort algorithm in Java, including
implementations for different data types and orderings. We also compared its
performance with quicksort to understand when each algorithm is appropriate.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).