+++
title = "Java Counting Sort Algorithm"
date = 2025-08-29T19:58:31.580+01:00
draft = false
description = "Complete Java counting sort algorithm tutorial covering implementation with examples for numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Counting Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, typically
numerical or lexicographical. Efficient sorting is crucial for optimizing other
algorithms.

Common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

- Counting Sort

- Radix Sort

## Counting Sort Overview

Counting sort is a non-comparison based sorting algorithm that works by
counting the occurrences of each element. It has O(n + k) time complexity,
where n is the number of elements and k is the range of input.

Counting sort is efficient when the range of input data (k) is not significantly
greater than the number of elements (n). It's often used as a subroutine in
other algorithms like radix sort.

## Counting Sort Implementation

Here's a basic implementation of counting sort for integer arrays:

CountingSort.java
  

package com.zetcode;

public class CountingSort {

    public static void countingSort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // Find the maximum value to determine the range
        int max = arr[0];
        for (int num : arr) {
            if (num &gt; max) {
                max = num;
            }
        }

        // Initialize count array
        int[] count = new int[max + 1];

        // Store count of each element
        for (int num : arr) {
            count[num]++;
        }

        // Modify count array to store cumulative counts
        for (int i = 1; i &lt;= max; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i &gt;= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }

        // Copy the output array to original array
        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    public static void main(String[] args) {

        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Original array: " + Arrays.toString(arr));
        
        countingSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}

This implementation first finds the maximum value to determine the range. It
then counts occurrences of each element, calculates cumulative counts, and
finally builds the sorted array.

## Counting Sort for Textual Data

Counting sort can also be adapted to sort strings or characters. Here's an
example sorting characters in a string:

CharCountingSort.java
  

package com.zetcode;

public class CharCountingSort {

    public static String countingSort(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        char[] arr = input.toCharArray();
        int n = arr.length;

        // The number of possible ASCII characters
        int range = 256;
        int[] count = new int[range];

        // Count occurrences of each character
        for (char c : arr) {
            count[c]++;
        }

        // Build the output string
        int index = 0;
        for (int i = 0; i &lt; range; i++) {
            while (count[i] &gt; 0) {
                arr[index++] = (char) i;
                count[i]--;
            }
        }

        return new String(arr);
    }

    public static void main(String[] args) {

        String text = "counting sort example";
        System.out.println("Original: " + text);
        System.out.println("Sorted: " + countingSort(text));
    }
}

This version counts ASCII characters (range 0-255) and reconstructs the string
in sorted order. Note that it sorts based on ASCII values, so uppercase letters
will appear before lowercase.

## Descending Order Counting Sort

To sort in descending order, we can modify the counting sort algorithm to
process counts from highest to lowest:

DescendingCountingSort.java
  

package com.zetcode;

public class DescendingCountingSort {

    public static void countingSortDescending(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        int max = Arrays.stream(arr).max().getAsInt();
        int min = Arrays.stream(arr).min().getAsInt();
        int range = max - min + 1;

        int[] count = new int[range];
        int[] output = new int[arr.length];

        // Count occurrences
        for (int num : arr) {
            count[num - min]++;
        }

        // Modify count for descending order
        for (int i = count.length - 2; i &gt;= 0; i--) {
            count[i] += count[i + 1];
        }

        // Build output array
        for (int i = arr.length - 1; i &gt;= 0; i--) {
            output[count[arr[i] - min] - 1] = arr[i];
            count[arr[i] - min]--;
        }

        System.arraycopy(output, 0, arr, 0, arr.length);
    }

    public static void main(String[] args) {

        int[] arr = {4, 2, 2, 8, 3, 3, 1};
        System.out.println("Original: " + Arrays.toString(arr));
        
        countingSortDescending(arr);
        System.out.println("Sorted (descending): " + Arrays.toString(arr));
    }
}

This implementation calculates the range from min to max values. It then
processes the counts from highest to lowest to achieve descending order.

## Counting Sort vs Quick Sort Benchmark

Let's compare counting sort with quick sort to understand their performance
characteristics. We'll test both with different input sizes and ranges.

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void countingSort(int[] arr) {
        if (arr == null || arr.length == 0) {
            return;
        }

        // Find the maximum value to determine the range
        int max = arr[0];
        for (int num : arr) {
            if (num &gt; max) {
                max = num;
            }
        }

        // Initialize count array
        int[] count = new int[max + 1];

        // Store count of each element
        for (int num : arr) {
            count[num]++;
        }

        // Modify count array to store cumulative counts
        for (int i = 1; i &lt;= max; i++) {
            count[i] += count[i - 1];
        }

        // Build the output array
        int[] output = new int[arr.length];
        for (int i = arr.length - 1; i &gt;= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }

        // Copy the output array to original array
        System.arraycopy(output, 0, arr, 0, arr.length);
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

        int[] sizes = {1000, 10000, 100000};
        int[] ranges = {100, 1000, 10000};

        for (int size : sizes) {
            for (int range : ranges) {
                System.out.printf("\nBenchmark - Size: %,d, 
                    Range: %,d\n", size, range);
                
                int[] arr1 = generateRandomArray(size, range);
                int[] arr2 = Arrays.copyOf(arr1, arr1.length);
                
                // Counting Sort
                long start = System.nanoTime();
                countingSort(arr1);
                long end = System.nanoTime();
                System.out.printf("Counting Sort: %.3f ms\n", (end - start) / 1e6);
                
                // Quick Sort
                start = System.nanoTime();
                quickSort(arr2, 0, arr2.length - 1);
                end = System.nanoTime();
                System.out.printf("Quick Sort:    %.3f ms\n", (end - start) / 1e6);
            }
        }
    }

    private static int[] generateRandomArray(int size, int range) {
        Random random = new Random();
        int[] arr = new int[size];
        for (int i = 0; i &lt; size; i++) {
            arr[i] = random.nextInt(range);
        }
        return arr;
    }
}

The benchmark shows that counting sort performs better when the range (k) is
small compared to the input size (n). Quick sort generally performs better
for larger ranges or when the range is unknown.

## When to Use Counting Sort

Counting sort is ideal when:

- The range of input data (k) is not significantly larger than number of elements (n)

- You need a stable sort (maintains relative order of equal elements)

- You're sorting integer data or data that can be mapped to integers

Avoid counting sort when:

- The range is very large compared to number of elements

- Memory is constrained (as it requires additional space)

- Sorting floating-point numbers (without special handling)

## Source

[Counting Sort on Wikipedia](https://en.wikipedia.org/wiki/Counting_sort)

In this tutorial, we've covered the counting sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared its performance with quick sort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).