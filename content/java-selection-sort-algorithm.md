+++
title = "Java Selection Sort Algorithm"
date = 2025-08-29T20:00:30.172+01:00
draft = false
description = "Complete Java selection sort tutorial covering implementation with examples. Learn how selection sort works and compare it with other algorithms."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Selection Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
numerical or lexicographical. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include bubble sort, insertion sort, selection sort,
merge sort, quick sort, and heap sort. Each has different time and space
complexity characteristics making them suitable for different scenarios.

## Selection Sort Overview

Selection sort is a simple comparison-based algorithm. It divides the input into
a sorted and unsorted region. It repeatedly selects the smallest (or largest)
element from the unsorted region and moves it to the sorted region.

The algorithm has O(n²) time complexity in all cases, making it inefficient for
large datasets. However, it performs well on small lists and has the advantage
of doing at most n-1 swaps.

## Selection Sort Implementation

Here's a basic implementation of selection sort in Java for sorting integers in
ascending order. The algorithm works by finding the minimum element in each pass.

SelectionSort.java
  

package com.zetcode;

public class SelectionSort {

    public static void selectionSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i &lt; n-1; i++) {
            int minIdx = i;
            
            for (int j = i+1; j &lt; n; j++) {
                if (arr[j] &lt; arr[minIdx]) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum element with the first element
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {

        int[] numbers = {64, 25, 12, 22, 11};
        
        System.out.println("Before sorting:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        selectionSort(numbers);
        
        System.out.println("\nAfter sorting:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}

This implementation shows the core selection sort algorithm. The outer loop moves
the boundary of the unsorted subarray. The inner loop finds the minimum element.
Finally, we swap the found minimum with the first element.

## Sorting in Descending Order

To sort in descending order, we simply modify the comparison to find the maximum
element instead of the minimum. Here's how the algorithm changes:

SelectionSortDescending.java
  

package com.zetcode;

public class SelectionSortDescending {

    public static void selectionSortDesc(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i &lt; n-1; i++) {
            int maxIdx = i;
            
            for (int j = i+1; j &lt; n; j++) {
                if (arr[j] &gt; arr[maxIdx]) {
                    maxIdx = j;
                }
            }
            
            // Swap the found maximum element with the first element
            int temp = arr[maxIdx];
            arr[maxIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {

        int[] numbers = {64, 25, 12, 22, 11};
        
        System.out.println("Before sorting:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        selectionSortDesc(numbers);
        
        System.out.println("\nAfter sorting (descending):");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}

The only change needed is the comparison operator in the inner loop. Instead of
looking for elements smaller than the current minimum, we look for elements
larger than the current maximum.

## Sorting Strings with Selection Sort

Selection sort can also sort textual data. Here's an implementation for sorting
strings in ascending order using Java's compareTo method for lexicographical
comparison.

StringSelectionSort.java
  

package com.zetcode;

public class StringSelectionSort {

    public static void selectionSortStrings(String[] arr) {
        int n = arr.length;
        
        for (int i = 0; i &lt; n-1; i++) {
            int minIdx = i;
            
            for (int j = i+1; j &lt; n; j++) {
                if (arr[j].compareTo(arr[minIdx]) &lt; 0) {
                    minIdx = j;
                }
            }
            
            // Swap the found minimum element with the first element
            String temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {

        String[] words = {"banana", "apple", "pear", "orange", "grape"};
        
        System.out.println("Before sorting:");
        for (String word : words) {
            System.out.print(word + " ");
        }
        
        selectionSortStrings(words);
        
        System.out.println("\nAfter sorting:");
        for (String word : words) {
            System.out.print(word + " ");
        }
    }
}

This implementation demonstrates sorting strings alphabetically. The compareTo
method returns a negative number if the string is lexicographically smaller,
which we use to find the minimum string in each pass.

## Selection Sort vs Quick Sort

Selection sort and quick sort represent two different approaches to sorting.
Selection sort is simple but inefficient (O(n²)), while quick sort is more
complex but much faster on average (O(n log n)).

Here's a benchmark comparing the two algorithms on the same dataset. Note how
quick sort outperforms selection sort as the dataset size grows.

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i &lt; n-1; i++) {
            int minIdx = i;
            for (int j = i+1; j &lt; n; j++) {
                if (arr[j] &lt; arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
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
        int[] mediumArray = new int[10000];
        int[] largeArray = new int[100000];
        
        Random rand = new Random();
        for (int i = 0; i &lt; smallArray.length; i++) {
            smallArray[i] = rand.nextInt();
        }
        for (int i = 0; i &lt; mediumArray.length; i++) {
            mediumArray[i] = rand.nextInt();
        }
        for (int i = 0; i &lt; largeArray.length; i++) {
            largeArray[i] = rand.nextInt();
        }
        
        // Benchmark selection sort
        long startTime = System.nanoTime();
        selectionSort(Arrays.copyOf(smallArray, smallArray.length));
        long endTime = System.nanoTime();
        System.out.println("Selection sort (1,000 elements): " + 
            (endTime - startTime)/1_000_000 + " ms");
        
        startTime = System.nanoTime();
        selectionSort(Arrays.copyOf(mediumArray, mediumArray.length));
        endTime = System.nanoTime();
        System.out.println("Selection sort (10,000 elements): " + 
            (endTime - startTime)/1_000_000 + " ms");
        
        // Benchmark quick sort
        startTime = System.nanoTime();
        quickSort(Arrays.copyOf(smallArray, smallArray.length), 0, smallArray.length-1);
        endTime = System.nanoTime();
        System.out.println("Quick sort (1,000 elements): " + 
            (endTime - startTime)/1_000_000 + " ms");
        
        startTime = System.nanoTime();
        quickSort(Arrays.copyOf(mediumArray, mediumArray.length), 0, mediumArray.length-1);
        endTime = System.nanoTime();
        System.out.println("Quick sort (10,000 elements): " + 
            (endTime - startTime)/1_000_000 + " ms");
        
        startTime = System.nanoTime();
        quickSort(Arrays.copyOf(largeArray, largeArray.length), 0, largeArray.length-1);
        endTime = System.nanoTime();
        System.out.println("Quick sort (100,000 elements): " + 
            (endTime - startTime)/1_000_000 + " ms");
    }
}

This benchmark clearly shows the performance difference. Selection sort becomes
impractical for large datasets, while quick sort maintains good performance.
However, selection sort may be preferable when memory writes are expensive.

## When to Use Selection Sort

Despite its inefficiency, selection sort has some advantages. It performs a
limited number of swaps (O(n)), making it useful when write operations are
costly. It's also simple to implement and understand for educational purposes.

Selection sort works well for small datasets or nearly sorted data. However, for
most practical applications, Java's built-in Arrays.sort (which
uses a tuned quicksort) is preferable for primitive types and mergesort for
objects.

## Source

[Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)

In this tutorial, we've covered the selection sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared its performance with quick sort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).