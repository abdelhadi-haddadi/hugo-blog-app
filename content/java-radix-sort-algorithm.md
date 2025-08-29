+++
title = "Java Radix Sort Algorithm"
date = 2025-08-29T20:00:08.601+01:00
draft = false
description = "Complete Java Radix Sort tutorial covering implementation with examples for both numeric and textual data. Includes performance comparison with QuickSort."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Radix Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
ascending or descending. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include:

- Bubble Sort - Simple but inefficient O(n²) algorithm

- Selection Sort - Another O(n²) algorithm with fewer swaps

- Insertion Sort - Efficient for small or nearly sorted data

- Merge Sort - Divide-and-conquer algorithm with O(n log n) performance

- Quick Sort - Fast average-case O(n log n) with O(n²) worst case

- Heap Sort - O(n log n) sort using a binary heap

- Radix Sort - Non-comparative integer sorting algorithm

## Understanding Radix Sort

Radix sort is a non-comparative integer sorting algorithm that processes digits.
It sorts numbers by processing individual digits from least significant to most
significant (LSD) or vice versa (MSD). Radix sort has O(nk) time complexity.

Key characteristics of radix sort:

- Works with integers, strings, or any data with digits/characters

- Uses counting sort as a subroutine

- Stable sort (preserves original order of equal elements)

- Performs well when k (number of digits) is small

## Radix Sort Implementation for Numbers

Here's a Java implementation of radix sort for integers. This version processes
digits from least significant to most significant (LSD radix sort).

RadixSort.java
  

package com.zetcode;

public class RadixSort {

    // Main method to perform radix sort
    public static void radixSort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // Find the maximum number to know number of digits
        int max = getMax(arr);
        
        // Do counting sort for every digit
        for (int exp = 1; max / exp &gt; 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    // Utility method to get maximum value in array
    private static int getMax(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num &gt; max) {
                max = num;
            }
        }
        return max;
    }

    // Counting sort for a specific digit (exp)
    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];
        
        // Store count of occurrences in count[]
        for (int num : arr) {
            count[(num / exp) % 10]++;
        }
        
        // Change count[i] to contain actual position
        for (int i = 1; i &lt; 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build the output array
        for (int i = n - 1; i &gt;= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        
        // Copy the output array to arr[]
        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {

        int[] data = {170, 45, 75, 90, 802, 24, 2, 66};
        
        System.out.println("Original array:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        radixSort(data);
        
        System.out.println("\nSorted array (ascending):");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

This implementation first finds the maximum number to determine the number of
digits needed. Then it performs counting sort for each digit position from
least significant to most significant. The sorted array is built in each pass.

## Sorting in Descending Order

To sort in descending order, we can modify the counting sort step to build the
output array in reverse order. Here's the modified version:

RadixSortDescending.java
  

package com.zetcode;

public class RadixSortDescending {

    public static void radixSortDescending(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        int max = getMax(arr);
        
        for (int exp = 1; max / exp &gt; 0; exp *= 10) {
            countingSortDescending(arr, exp);
        }
    }

    private static int getMax(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num &gt; max) {
                max = num;
            }
        }
        return max;
    }

    private static void countingSortDescending(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];
        
        for (int num : arr) {
            count[9 - (num / exp) % 10]++; // Modified for descending
        }
        
        for (int i = 1; i &lt; 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (int i = n - 1; i &gt;= 0; i--) {
            output[count[9 - (arr[i] / exp) % 10] - 1] = arr[i];
            count[9 - (arr[i] / exp) % 10]--;
        }
        
        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {

        int[] data = {170, 45, 75, 90, 802, 24, 2, 66};
        
        System.out.println("Original array:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        radixSortDescending(data);
        
        System.out.println("\nSorted array (descending):");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

The key change is in the countingSortDescending method where we use
9 - (num / exp) % 10 instead of just (num / exp) % 10.
This reverses the digit order during counting, resulting in descending sort.

## Radix Sort for Strings

Radix sort can also sort strings lexicographically. Each character position is
treated as a digit. Here's an implementation for sorting strings:

StringRadixSort.java
  

package com.zetcode;

public class StringRadixSort {

    public static void radixSort(String[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // Find the maximum length string
        int maxLength = getMaxLength(arr);
        
        // Perform counting sort for each character position
        for (int pos = maxLength - 1; pos &gt;= 0; pos--) {
            countingSort(arr, pos);
        }
    }

    private static int getMaxLength(String[] arr) {
        int max = arr[0].length();
        for (String s : arr) {
            if (s.length() &gt; max) {
                max = s.length();
            }
        }
        return max;
    }

    private static void countingSort(String[] arr, int pos) {
        int n = arr.length;
        String[] output = new String[n];
        int[] count = new int[256]; // ASCII range
        
        // Count occurrences
        for (String s : arr) {
            int index = (pos &lt; s.length()) ? s.charAt(pos) : 0;
            count[index]++;
        }
        
        // Compute cumulative counts
        for (int i = 1; i &lt; 256; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array
        for (int i = n - 1; i &gt;= 0; i--) {
            String s = arr[i];
            int index = (pos &lt; s.length()) ? s.charAt(pos) : 0;
            output[count[index] - 1] = s;
            count[index]--;
        }
        
        // Copy back to original array
        System.arraycopy(output, 0, arr, 0, n);
    }

    public static void main(String[] args) {

        String[] data = {"apple", "banana", "kiwi", "orange", "grape", "pear"};
        
        System.out.println("Original array:");
        for (String s : data) {
            System.out.print(s + " ");
        }
        
        radixSort(data);
        
        System.out.println("\nSorted array (ascending):");
        for (String s : data) {
            System.out.print(s + " ");
        }
    }
}

This implementation processes strings from right to left (MSD radix sort). Shorter
strings are treated as having null characters (ASCII 0) at missing positions.
The sort is stable and maintains relative order of equal strings.

## Performance Comparison: Radix Sort vs QuickSort

Radix sort and QuickSort have different performance characteristics. Radix sort
performs in O(nk) time where n is number of elements and k is number of digits.
QuickSort averages O(n log n) but can degrade to O(n²) in worst case.

Let's compare their performance with a benchmark test:

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void main(String[] args) {

        int size = 1000000;
        int[] radixData = generateRandomArray(size);
        int[] quickData = Arrays.copyOf(radixData, radixData.length);

        // Radix Sort benchmark
        long start = System.currentTimeMillis();
        radixSort(radixData);
        long radixTime = System.currentTimeMillis() - start;

        // QuickSort benchmark
        start = System.currentTimeMillis();
        Arrays.sort(quickData);
        long quickTime = System.currentTimeMillis() - start;

        System.out.println("Radix Sort time: " + radixTime + " ms");
        System.out.println("QuickSort time: " + quickTime + " ms");
    }

    private static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i &lt; size; i++) {
            arr[i] = random.nextInt(1000000);
        }
        return arr;
    }

    // Main method to perform radix sort
    private static void radixSort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // Find the maximum number to know number of digits
        int max = getMax(arr);

        // Do counting sort for every digit
        for (int exp = 1; max / exp &gt; 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    // Utility method to get maximum value in array
    private static int getMax(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num &gt; max) {
                max = num;
            }
        }
        return max;
    }

    // Counting sort for a specific digit (exp)
    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];

        // Store count of occurrences in count[]
        for (int num : arr) {
            count[(num / exp) % 10]++;
        }

        // Change count[i] to contain actual position
        for (int i = 1; i &lt; 10; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        for (int i = n - 1; i &gt;= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // Copy the output array to arr[]
        System.arraycopy(output, 0, arr, 0, n);
    }
}

This Java program benchmarks the performance of two sorting algorithms: Radix
Sort and QuickSort. It generates a large array of random integers, sorts the
array using both algorithms, and measures the time each algorithm takes to sort.
Radix Sort is implemented manually, focusing on digit-based sorting, while
QuickSort uses Java's built-in Arrays.sort method. The program
outputs the sorting times for comparison, making it useful for understanding
algorithm efficiency.

Typical results might show:

- For small ranges (small k), radix sort often outperforms QuickSort

- For large ranges, QuickSort usually performs better

- Radix sort uses more memory (O(n+k) vs QuickSort's O(log n) stack space)

- QuickSort is comparison-based and works for any comparable data

## When to Use Radix Sort

Radix sort is particularly effective when:

- Sorting integers with a limited range of values

- Sorting fixed-length strings or data with consistent digit/character count

- Stability in sorting is required

- You can trade memory usage for speed

QuickSort is generally preferred when:

- Sorting arbitrary comparable objects

- Memory is constrained

- The data has a large range of possible values

## Source

[Radix Sort Wikipedia](https://en.wikipedia.org/wiki/Radix_sort)

In this tutorial, we've covered the radix sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared its performance with QuickSort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).