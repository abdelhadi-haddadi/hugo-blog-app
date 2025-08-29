+++
title = "Java Shell Sort Algorithm"
date = 2025-08-29T20:00:31.269+01:00
draft = false
description = "Complete Java Shell Sort algorithm tutorial covering implementation with examples. Learn how to sort numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Shell Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements of a list in a specific
order, typically numerical or lexicographical. Efficient sorting is crucial
for optimizing other algorithms.

Common sorting algorithms include Bubble Sort, Selection Sort, Insertion Sort,
Shell Sort, Merge Sort, Quick Sort, and Heap Sort. Each has different time and
space complexity characteristics making them suitable for different scenarios.

## Shell Sort Overview

Shell Sort is an optimization of Insertion Sort that allows exchange of items
far apart. It works by sorting elements at specific intervals, gradually
reducing the interval until it becomes 1. The final pass is a regular Insertion
Sort, but data is nearly sorted by then.

The algorithm's time complexity depends on the gap sequence used. In the worst
case it's O(n²), but with optimal gaps it can reach O(n log² n). It's an
in-place algorithm but not stable (doesn't maintain relative order of equal
elements).

## Shell Sort Implementation

Here's a basic implementation of Shell Sort in Java for sorting integers in
ascending order. The gap sequence used is n/2, n/4, n/8, etc., which is simple
but not optimal for performance.

ShellSort.java
  

package com.zetcode;

public class ShellSort {

    public static void shellSort(int[] array) {
        int n = array.length;
        
        // Start with a big gap, then reduce the gap
        for (int gap = n/2; gap &gt; 0; gap /= 2) {
            // Do a gapped insertion sort for this gap size
            for (int i = gap; i &lt; n; i++) {
                int temp = array[i];
                int j;
                for (j = i; j &gt;= gap &amp;&amp; array[j - gap] &gt; temp; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = temp;
            }
        }
    }

    public static void main(String[] args) {

        int[] data = {12, 34, 54, 2, 3};
        System.out.println("Array before sorting:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        shellSort(data);
        
        System.out.println("\nArray after sorting:");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

This implementation first divides the array into subarrays using the gap size.
Each subarray is sorted using insertion sort. The gap is reduced until it
becomes 1, at which point the array is nearly sorted.

## Sorting Textual Data

Shell Sort can also sort strings lexicographically. Here's an implementation
that sorts an array of strings in ascending order. The comparison uses
String's compareTo method.

StringShellSort.java
  

package com.zetcode;

public class StringShellSort {

    public static void shellSort(String[] array) {
        int n = array.length;
        
        for (int gap = n/2; gap &gt; 0; gap /= 2) {
            for (int i = gap; i &lt; n; i++) {
                String temp = array[i];
                int j;
                for (j = i; j &gt;= gap &amp;&amp; array[j - gap].compareTo(temp) &gt; 0; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = temp;
            }
        }
    }

    public static void main(String[] args) {

        String[] names = {"John", "Alice", "Bob", "Eve", "David"};
        System.out.println("Names before sorting:");
        for (String name : names) {
            System.out.print(name + " ");
        }
        
        shellSort(names);
        
        System.out.println("\nNames after sorting:");
        for (String name : names) {
            System.out.print(name + " ");
        }
    }
}

This version works similarly to the numeric sort but compares strings using
compareTo. The algorithm maintains the same structure, only changing the
comparison operation to work with strings instead of numbers.

## Descending Order Sorting

To sort in descending order, we simply reverse the comparison condition. Here
are both numeric and string versions modified for descending order.

DescendingShellSort.java
  

package com.zetcode;

public class DescendingShellSort {

    // Numeric descending sort
    public static void shellSortDesc(int[] array) {
        int n = array.length;
        
        for (int gap = n/2; gap &gt; 0; gap /= 2) {
            for (int i = gap; i &lt; n; i++) {
                int temp = array[i];
                int j;
                for (j = i; j &gt;= gap &amp;&amp; array[j - gap] &lt; temp; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = temp;
            }
        }
    }

    // String descending sort
    public static void shellSortDesc(String[] array) {
        int n = array.length;
        
        for (int gap = n/2; gap &gt; 0; gap /= 2) {
            for (int i = gap; i &lt; n; i++) {
                String temp = array[i];
                int j;
                for (j = i; j &gt;= gap &amp;&amp; array[j - gap].compareTo(temp) &lt; 0; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = temp;
            }
        }
    }

    public static void main(String[] args) {

        int[] numbers = {45, 23, 78, 12, 99, 34};
        String[] words = {"apple", "orange", "banana", "grape", "kiwi"};
        
        shellSortDesc(numbers);
        shellSortDesc(words);
        
        System.out.println("Numbers in descending order:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        System.out.println("\nWords in descending order:");
        for (String word : words) {
            System.out.print(word + " ");
        }
    }
}

The only change needed for descending order is reversing the comparison
operator (from &gt; to &lt; for numbers, and compareTo result from &gt; 0 to &lt; 0 for
strings). This simple modification changes the sort direction.

## Shell Sort vs Quick Sort Benchmark

Let's compare Shell Sort with Quick Sort, one of the fastest general-purpose
sorting algorithms. We'll measure execution time for different array sizes to
see their performance characteristics.

SortBenchmark.java
  

package com.zetcode;

import java.util.Random;

public class SortBenchmark {

    public static void shellSort(int[] array) {
        int n = array.length;
        for (int gap = n/2; gap &gt; 0; gap /= 2) {
            for (int i = gap; i &lt; n; i++) {
                int temp = array[i];
                int j;
                for (j = i; j &gt;= gap &amp;&amp; array[j - gap] &gt; temp; j -= gap) {
                    array[j] = array[j - gap];
                }
                array[j] = temp;
            }
        }
    }

    public static void quickSort(int[] array, int low, int high) {
        if (low &lt; high) {
            int pi = partition(array, low, high);
            quickSort(array, low, pi - 1);
            quickSort(array, pi + 1, high);
        }
    }

    private static int partition(int[] array, int low, int high) {
        int pivot = array[high];
        int i = low - 1;
        for (int j = low; j &lt; high; j++) {
            if (array[j] &lt; pivot) {
                i++;
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        int temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {

        int[] sizes = {1000, 10000, 100000, 1000000};
        Random random = new Random();
        
        for (int size : sizes) {
            int[] data1 = new int[size];
            int[] data2 = new int[size];
            
            for (int i = 0; i &lt; size; i++) {
                int num = random.nextInt(size * 10);
                data1[i] = num;
                data2[i] = num;
            }
            
            // Shell Sort benchmark
            long start = System.nanoTime();
            shellSort(data1);
            long shellTime = System.nanoTime() - start;
            
            // Quick Sort benchmark
            start = System.nanoTime();
            quickSort(data2, 0, data2.length - 1);
            long quickTime = System.nanoTime() - start;
            
            System.out.printf("Size: %,d | Shell Sort: %,d ns | Quick Sort: %,d ns%n",
                             size, shellTime, quickTime);
        }
    }
}

This benchmark generates random arrays of different sizes and measures the time
taken by each algorithm to sort them. Quick Sort generally outperforms Shell
Sort, especially for larger datasets, due to its O(n log n) average time
complexity compared to Shell Sort's O(n log² n).

## Source

[Shellsort Wikipedia](https://en.wikipedia.org/wiki/Shellsort)

In this article, we've covered the Shell Sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared its performance with Quick Sort through a benchmark.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).