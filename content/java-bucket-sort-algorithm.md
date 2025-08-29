+++
title = "Java Bucket Sort Algorithm"
date = 2025-08-29T19:58:07.818+01:00
draft = false
description = "Complete Java bucket sort algorithm tutorial covering implementation with examples for both numeric and textual data sorting."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Bucket Sort Algorithm

Last modified: April 16, 2025

 
## Introduction to Sorting Algorithms

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order, usually
numerical or lexicographical. Efficient sorting is crucial for optimizing
other algorithms.

Common sorting algorithms include bubble sort, selection sort, insertion sort,
merge sort, quick sort, heap sort, and bucket sort. Each has different time
and space complexity characteristics.

## Bucket Sort Overview

Bucket sort is a distribution sorting algorithm that works by distributing
elements into several buckets. Each bucket is then sorted individually, either
using a different algorithm or recursively applying bucket sort.

Bucket sort is efficient when input is uniformly distributed over a range. It
has average case time complexity of O(n + k), where n is number of elements
and k is number of buckets.

## Bucket Sort Implementation for Numbers

Here's a basic implementation of bucket sort for numeric data in Java. This
example sorts an array of integers in ascending order.

BucketSortNumbers.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;

public class BucketSortNumbers {

    public static void bucketSort(int[] arr, int bucketSize) {
        if (arr.length == 0) {
            return;
        }

        // Find minimum and maximum values
        int minValue = arr[0];
        int maxValue = arr[0];
        for (int i = 1; i &lt; arr.length; i++) {
            if (arr[i] &lt; minValue) {
                minValue = arr[i];
            } else if (arr[i] &gt; maxValue) {
                maxValue = arr[i];
            }
        }

        // Initialize buckets
        int bucketCount = (maxValue - minValue) / bucketSize + 1;
        ArrayList&lt;ArrayList&lt;Integer&gt;&gt; buckets = new ArrayList&lt;&gt;(bucketCount);
        for (int i = 0; i &lt; bucketCount; i++) {
            buckets.add(new ArrayList&lt;Integer&gt;());
        }

        // Distribute input array values into buckets
        for (int i = 0; i &lt; arr.length; i++) {
            int bucketIndex = (arr[i] - minValue) / bucketSize;
            buckets.get(bucketIndex).add(arr[i]);
        }

        // Sort buckets and place back into input array
        int currentIndex = 0;
        for (int i = 0; i &lt; buckets.size(); i++) {
            ArrayList&lt;Integer&gt; bucket = buckets.get(i);
            Collections.sort(bucket);
            for (int j = 0; j &lt; bucket.size(); j++) {
                arr[currentIndex++] = bucket.get(j);
            }
        }
    }

    public static void main(String[] args) {

        int[] data = {29, 25, 3, 49, 9, 37, 21, 43};
        System.out.println("Before sorting:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        bucketSort(data, 10);
        
        System.out.println("\nAfter sorting (ascending):");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

This implementation first finds the range of values, creates appropriate buckets,
distributes elements into these buckets, sorts each bucket, and finally
concatenates them. The bucketSize parameter controls how many buckets are used.

## Sorting in Descending Order

To sort in descending order, we can either reverse the sorted buckets or modify
the collection sorting to use a reverse comparator. Here's the modified version.

BucketSortDescending.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class BucketSortDescending {

    public static void bucketSort(int[] arr, int bucketSize) {
        if (arr.length == 0) {
            return;
        }

        int minValue = arr[0];
        int maxValue = arr[0];
        for (int i = 1; i &lt; arr.length; i++) {
            if (arr[i] &lt; minValue) {
                minValue = arr[i];
            } else if (arr[i] &gt; maxValue) {
                maxValue = arr[i];
            }
        }

        int bucketCount = (maxValue - minValue) / bucketSize + 1;
        ArrayList&lt;ArrayList&lt;Integer&gt;&gt; buckets = new ArrayList&lt;&gt;(bucketCount);
        for (int i = 0; i &lt; bucketCount; i++) {
            buckets.add(new ArrayList&lt;Integer&gt;());
        }

        for (int i = 0; i &lt; arr.length; i++) {
            int bucketIndex = (arr[i] - minValue) / bucketSize;
            buckets.get(bucketIndex).add(arr[i]);
        }

        int currentIndex = 0;
        for (int i = buckets.size() - 1; i &gt;= 0; i--) {
            ArrayList&lt;Integer&gt; bucket = buckets.get(i);
            Collections.sort(bucket, Comparator.reverseOrder());
            for (int j = 0; j &lt; bucket.size(); j++) {
                arr[currentIndex++] = bucket.get(j);
            }
        }
    }

    public static void main(String[] args) {

        int[] data = {29, 25, 3, 49, 9, 37, 21, 43};
        System.out.println("Before sorting:");
        for (int num : data) {
            System.out.print(num + " ");
        }
        
        bucketSort(data, 10);
        
        System.out.println("\nAfter sorting (descending):");
        for (int num : data) {
            System.out.print(num + " ");
        }
    }
}

The key changes are using Comparator.reverseOrder for sorting
buckets and iterating through buckets in reverse order. This produces a
descending sorted array.

## Bucket Sort for Strings

Bucket sort can also be applied to strings by using their characters as keys.
Here's an implementation that sorts strings based on their first character.

BucketSortStrings.java
  

package com.zetcode;

import java.util.ArrayList;
import java.util.Collections;

public class BucketSortStrings {

    public static void bucketSort(String[] arr) {
        if (arr.length == 0) {
            return;
        }

        // Determine range (ASCII values of first characters)
        int minValue = (int) arr[0].charAt(0);
        int maxValue = (int) arr[0].charAt(0);
        for (int i = 1; i &lt; arr.length; i++) {
            int firstChar = (int) arr[i].charAt(0);
            if (firstChar &lt; minValue) {
                minValue = firstChar;
            } else if (firstChar &gt; maxValue) {
                maxValue = firstChar;
            }
        }

        // Initialize buckets
        int bucketCount = maxValue - minValue + 1;
        ArrayList&lt;ArrayList&lt;String&gt;&gt; buckets = new ArrayList&lt;&gt;(bucketCount);
        for (int i = 0; i &lt; bucketCount; i++) {
            buckets.add(new ArrayList&lt;String&gt;());
        }

        // Distribute strings into buckets based on first character
        for (int i = 0; i &lt; arr.length; i++) {
            int bucketIndex = (int) arr[i].charAt(0) - minValue;
            buckets.get(bucketIndex).add(arr[i]);
        }

        // Sort each bucket and concatenate
        int currentIndex = 0;
        for (int i = 0; i &lt; buckets.size(); i++) {
            ArrayList&lt;String&gt; bucket = buckets.get(i);
            Collections.sort(bucket);
            for (int j = 0; j &lt; bucket.size(); j++) {
                arr[currentIndex++] = bucket.get(j);
            }
        }
    }

    public static void main(String[] args) {

        String[] words = {"apple", "banana", "orange", "pear", "grape", "kiwi"};
        System.out.println("Before sorting:");
        for (String word : words) {
            System.out.print(word + " ");
        }
        
        bucketSort(words);
        
        System.out.println("\nAfter sorting (ascending):");
        for (String word : words) {
            System.out.print(word + " ");
        }
    }
}

This implementation uses the ASCII value of the first character to distribute
strings into buckets. Each bucket is then sorted alphabetically before
concatenation.

## Bucket Sort vs Quick Sort Benchmark

To compare performance, we'll benchmark bucket sort against quick sort with
different input sizes and distributions. We'll use Java's System.nanoTime()
for measurements.

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void bucketSort(int[] arr, int bucketSize) {
        // Implementation from previous example
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
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {

        int[] sizes = {1000, 10000, 100000};
        Random random = new Random();
        
        for (int size : sizes) {
            System.out.println("\nBenchmark for array size: " + size);
            
            // Uniformly distributed data
            int[] uniformData = new int[size];
            for (int i = 0; i &lt; size; i++) {
                uniformData[i] = random.nextInt(size);
            }
            
            // Highly clustered data
            int[] clusteredData = new int[size];
            for (int i = 0; i &lt; size; i++) {
                clusteredData[i] = random.nextInt(size / 10);
            }
            
            // Benchmark uniform data
            benchmarkSorts(uniformData, "Uniform distribution");
            
            // Benchmark clustered data
            benchmarkSorts(clusteredData, "Clustered distribution");
        }
    }
    
    private static void benchmarkSorts(int[] originalData, String distributionType) {
        System.out.println("\n" + distributionType + ":");
        
        // Bucket sort
        int[] data = Arrays.copyOf(originalData, originalData.length);
        long start = System.nanoTime();
        bucketSort(data, 100);
        long end = System.nanoTime();
        System.out.printf("Bucket sort time: %d ns%n", (end - start));
        
        // Quick sort
        data = Arrays.copyOf(originalData, originalData.length);
        start = System.nanoTime();
        quickSort(data, 0, data.length - 1);
        end = System.nanoTime();
        System.out.printf("Quick sort time: %d ns%n", (end - start));
    }
}

The benchmark shows that bucket sort performs better than quick sort when data
is uniformly distributed, especially with larger datasets. However, with
clustered data, quick sort generally outperforms bucket sort.

## When to Use Bucket Sort

Bucket sort is ideal when input is uniformly distributed over a range. It's
also useful when you need stable sorting (maintaining relative order of equal
elements) and when you can afford the extra space for buckets.

For small datasets or when memory is constrained, simpler algorithms like
insertion sort or quick sort might be more appropriate. Always consider your
specific use case when choosing a sorting algorithm.

## Source

[Bucket Sort Wikipedia](https://en.wikipedia.org/wiki/Bucket_sort)

In this article, we've covered the bucket sort algorithm in Java, including
implementations for both numeric and textual data, and compared its performance
with quick sort.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).