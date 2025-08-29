+++
title = "Java Quick Sort Algorithm"
date = 2025-08-29T20:00:07.491+01:00
draft = false
description = "Complete Java Quick Sort algorithm tutorial covering implementation with examples for both numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Quick Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
numerical or lexicographical. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort,
Merge Sort, Heap Sort, and Quick Sort. Each has different time and space
complexity characteristics making them suitable for different scenarios.

## Quick Sort Overview

Quick Sort is a divide-and-conquer algorithm that works by selecting a 'pivot'
element and partitioning the array around it. Elements smaller than the pivot
go to its left, and larger elements to its right. This process repeats for the
sub-arrays.

Quick Sort has an average time complexity of O(n log n), making it one of the
fastest sorting algorithms. However, its worst-case performance is O(n²) when
the pivot selection is poor.

## Basic Quick Sort Implementation

Here's a basic implementation of Quick Sort for integers in ascending order.
The algorithm recursively partitions the array until all elements are sorted.

QuickSort.java
  

package com.zetcode;

public class QuickSort {

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

        int[] data = { 10, 7, 8, 9, 1, 5 };
        System.out.println("Unsorted array:");
        printArray(data);
        
        quickSort(data, 0, data.length - 1);
        
        System.out.println("Sorted array in ascending order:");
        printArray(data);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

This implementation shows the core Quick Sort algorithm. The partition method
selects the last element as pivot and places it in its correct position. All
smaller elements go left and larger elements go right of the pivot.

## Quick Sort for Descending Order

Modifying the comparison in the partition method allows sorting in descending
order. Only the comparison operator needs to change from &lt; to
&gt;.

QuickSortDescending.java
  

package com.zetcode;

public class QuickSortDescending {

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
            if (arr[j] &gt; pivot) {  // Changed from &lt; to &gt;
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

        int[] data = { 10, 7, 8, 9, 1, 5 };
        System.out.println("Unsorted array:");
        printArray(data);
        
        quickSort(data, 0, data.length - 1);
        
        System.out.println("Sorted array in descending order:");
        printArray(data);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

The only change needed for descending order is the comparison operator in the
partition method. This demonstrates how flexible Quick Sort can be with simple
modifications.

## Quick Sort for Strings

Quick Sort can also sort textual data. The implementation is similar but uses
String comparison methods instead of numerical comparisons.

StringQuickSort.java
  

package com.zetcode;

public class StringQuickSort {

    private static void quickSort(String[] arr, int low, int high) {
        if (low &lt; high) {
            int pi = partition(arr, low, high);

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(String[] arr, int low, int high) {
        String pivot = arr[high];
        int i = low - 1;

        for (int j = low; j &lt; high; j++) {
            if (arr[j].compareTo(pivot) &lt; 0) {
                i++;
                swap(arr, i, j);
            }
        }

        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void swap(String[] arr, int i, int j) {
        String temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {

        String[] names = { "John", "Alice", "Bob", "Eve", "David" };
        System.out.println("Unsorted array:");
        printArray(names);

        quickSort(names, 0, names.length - 1);

        System.out.println("Sorted array in ascending order:");
        printArray(names);
    }

    private static void printArray(String[] arr) {
        for (String str : arr) {
            System.out.print(str + " ");
        }
        System.out.println();
    }
}

This version sorts strings lexicographically using the compareTo method. The
same approach can be modified for descending order by changing the comparison.

## Generic Quick Sort Implementation

Using Java Generics, we can create a single Quick Sort implementation that
works with any Comparable type. This makes the code more reusable and type-safe.

GenericQuickSort.java
  

package com.zetcode;

public class GenericQuickSort&lt;T extends Comparable&lt;T&gt;&gt; {

    private void quickSort(T[] arr, int low, int high) {
        if (low &lt; high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private int partition(T[] arr, int low, int high) {
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j &lt; high; j++) {
            if (arr[j].compareTo(pivot) &lt; 0) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {

        // Sorting integers
        Integer[] numbers = { 10, 7, 8, 9, 1, 5 };
        GenericQuickSort&lt;Integer&gt; intSorter = new GenericQuickSort&lt;&gt;();
        intSorter.quickSort(numbers, 0, numbers.length - 1);
        System.out.println("Sorted integers:");
        printArray(numbers);
        
        // Sorting strings
        String[] names = { "John", "Alice", "Bob", "Eve", "David" };
        GenericQuickSort&lt;String&gt; stringSorter = new GenericQuickSort&lt;&gt;();
        stringSorter.quickSort(names, 0, names.length - 1);
        System.out.println("Sorted strings:");
        printArray(names);
    }
    
    private static &lt;T&gt; void printArray(T[] arr) {
        for (T element : arr) {
            System.out.print(element + " ");
        }
        System.out.println();
    }
}

This Java example demonstrates a generic implementation of the QuickSort
algorithm, allowing it to sort arrays of any type that implements the
Comparable interface. The program includes methods to recursively
perform the sorting, partitioning the array using a pivot element, and swapping
elements. The main method showcases its versatility by sorting both integers and
strings. The results of the sorted arrays are then printed, highlighting the
reusability and adaptability of the generic QuickSort implementation.

## Quick Sort vs Insertion Sort Benchmark

Quick Sort generally outperforms Insertion Sort for large datasets. Insertion
Sort is more efficient for small or nearly sorted data. Let's compare their
performance.

SortBenchmark.java
  

package com.zetcode;

import java.util.Random;

public class SortBenchmark {

    private static void quickSort(int[] arr, int low, int high) {
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
    
    public static void insertionSort(int[] arr) {
        for (int i = 1; i &lt; arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j &gt;= 0 &amp;&amp; arr[j] &gt; key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {

        int[] sizes = { 100, 1000, 10000, 50000 };
        Random random = new Random();
        
        for (int size : sizes) {
            int[] arr1 = new int[size];
            int[] arr2 = new int[size];
            
            for (int i = 0; i &lt; size; i++) {
                int num = random.nextInt(size * 10);
                arr1[i] = num;
                arr2[i] = num;
            }
            
            // Quick Sort benchmark
            long start = System.nanoTime();
            quickSort(arr1, 0, arr1.length - 1);
            long quickTime = System.nanoTime() - start;
            
            // Insertion Sort benchmark
            start = System.nanoTime();
            insertionSort(arr2);
            long insertionTime = System.nanoTime() - start;
            
            System.out.printf("Size: %d | Quick Sort: %d ns | Insertion Sort: %d ns%n",
                            size, quickTime, insertionTime);
        }
    }
}

This benchmark compares Quick Sort and Insertion Sort with different array sizes.
Quick Sort shows better performance as the dataset grows, while Insertion Sort
may be faster for very small arrays.

## Optimizing Quick Sort

Several optimizations can improve Quick Sort's performance. These include:

- Median-of-three pivot selection to avoid worst-case scenarios

- Insertion Sort for small subarrays (typically when size &lt; 10)

- Tail recursion elimination to reduce stack space

- Three-way partitioning for arrays with many duplicates

Here's an optimized implementation incorporating these techniques.

OptimizedQuickSort.java
  

package com.zetcode;

public class OptimizedQuickSort {

    private static final int INSERTION_THRESHOLD = 10;
    
    private static void quickSort(int[] arr, int low, int high) {
        while (low &lt; high) {
            if (high - low &lt; INSERTION_THRESHOLD) {
                insertionSort(arr, low, high);
                break;
            } else {
                int pi = partition(arr, low, high);
                
                // Tail recursion optimization
                if (pi - low &lt; high - pi) {
                    quickSort(arr, low, pi - 1);
                    low = pi + 1;
                } else {
                    quickSort(arr, pi + 1, high);
                    high = pi - 1;
                }
            }
        }
    }
    
    private static int partition(int[] arr, int low, int high) {
        // Median-of-three pivot selection
        int mid = low + (high - low) / 2;
        if (arr[high] &lt; arr[low]) swap(arr, low, high);
        if (arr[mid] &lt; arr[low]) swap(arr, low, mid);
        if (arr[high] &lt; arr[mid]) swap(arr, mid, high);
        
        int pivot = arr[mid];
        swap(arr, mid, high - 1);
        
        int i = low;
        int j = high - 1;
        
        while (true) {
            while (arr[++i] &lt; pivot);
            while (arr[--j] &gt; pivot);
            if (i &gt;= j) break;
            swap(arr, i, j);
        }
        
        swap(arr, i, high - 1);
        return i;
    }
    
    private static void insertionSort(int[] arr, int low, int high) {
        for (int i = low + 1; i &lt;= high; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j &gt;= low &amp;&amp; arr[j] &gt; key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {

        int[] data = { 10, 7, 8, 9, 1, 5, 3, 12, 4, 11 };
        System.out.println("Unsorted array:");
        printArray(data);
        
        quickSort(data, 0, data.length - 1);
        
        System.out.println("Sorted array in ascending order:");
        printArray(data);
    }
    
    private static void printArray(int[] arr) {
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}

The Optimized QuickSort algorithm is an advanced variation of the traditional
QuickSort, designed to improve performance and handle edge cases more
efficiently. It uses a hybrid approach, switching to Insertion Sort for smaller
subarrays (determined by the defined threshold) to take advantage of its lower
overhead. This ensures faster sorting for small datasets while maintaining the
divide-and-conquer nature of QuickSort for larger arrays.

An important feature is the median-of-three pivot selection, which improves
partitioning by reducing the chances of unbalanced splits. By selecting the
median of the first, middle, and last elements as the pivot, the algorithm
avoids the pitfalls of poor pivot selection, leading to more evenly distributed
partitions. This reduces the likelihood of encountering QuickSort's worst-case
performance.

Another key optimization is tail recursion reduction. Instead of blindly
using recursive calls, the algorithm prioritizes sorting the smaller subarray
with recursion and the larger one iteratively. This minimizes stack usage,
preventing stack overflow for large datasets, and ensures better scalability.
Combined, these enhancements make the algorithm both reliable and efficient
across different data sizes and scenarios.

## When to Use Quick Sort

Quick Sort is ideal for large datasets due to its average-case O(n log n)
performance. It is widely used in practice, including in Java's
Arrays.sort for primitive types. However, for very small arrays or
nearly sorted data, simpler algorithms like Insertion Sort may be faster. The
optimizations shown above make Quick Sort robust for a variety of scenarios.

In real-world applications, Java's Arrays.sort should be preferred
for most sorting tasks, as it is highly optimized and handles edge cases
efficiently.

## Source

[Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)

In this article, we've covered the Quick Sort algorithm in Java, including basic
and optimized implementations, sorting of different data types in both ascending
and descending orders, generic implementations, and performance comparisons with
Insertion Sort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).