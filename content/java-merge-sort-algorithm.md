+++
title = "Java Merge Sort Algorithm"
date = 2025-08-29T20:00:01.763+01:00
draft = false
description = "Complete Java merge sort algorithm tutorial covering implementation with examples for both numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Merge Sort Algorithm

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

## Merge Sort Overview

Merge sort is a divide-and-conquer algorithm that recursively splits the input
into smaller subarrays, sorts them, and then merges them back together. It has
a time complexity of O(n log n) in all cases, making it efficient for large
datasets.

## Basic Merge Sort Implementation

Here's a basic implementation of merge sort for integers in ascending order:

MergeSort.java
  

package com.zetcode;

import java.util.Arrays;

public class MergeSort {

    public static void mergeSort(int[] array) {
        if (array.length &gt; 1) {
            int mid = array.length / 2;
            int[] left = Arrays.copyOfRange(array, 0, mid);
            int[] right = Arrays.copyOfRange(array, mid, array.length);
            
            mergeSort(left);
            mergeSort(right);
            
            merge(array, left, right);
        }
    }
    
    private static void merge(int[] result, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i &lt; left.length &amp;&amp; j &lt; right.length) {
            if (left[i] &lt;= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i &lt; left.length) {
            result[k++] = left[i++];
        }
        
        while (j &lt; right.length) {
            result[k++] = right[j++];
        }
    }
    
    public static void main(String[] args) {

        int[] numbers = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Before sorting: " + Arrays.toString(numbers));
        
        mergeSort(numbers);
        System.out.println("After sorting: " + Arrays.toString(numbers));
    }
}

This implementation demonstrates the classic merge sort approach. The array is
divided into halves recursively until base cases of single elements are reached.
Then the merge operation combines the sorted halves.

## Sorting Textual Data

Merge sort can also sort strings lexicographically. Here's an implementation
for sorting strings in ascending order:

StringMergeSort.java
  

package com.zetcode;

import java.util.Arrays;

public class StringMergeSort {

    public static void mergeSort(String[] array) {
        if (array.length &gt; 1) {
            int mid = array.length / 2;
            String[] left = Arrays.copyOfRange(array, 0, mid);
            String[] right = Arrays.copyOfRange(array, mid, array.length);
            
            mergeSort(left);
            mergeSort(right);
            
            merge(array, left, right);
        }
    }
    
    private static void merge(String[] result, String[] left, String[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i &lt; left.length &amp;&amp; j &lt; right.length) {
            if (left[i].compareTo(right[j]) &lt;= 0) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i &lt; left.length) {
            result[k++] = left[i++];
        }
        
        while (j &lt; right.length) {
            result[k++] = right[j++];
        }
    }
    
    public static void main(String[] args) {

        String[] words = {"apple", "orange", "banana", "pear", "kiwi"};
        System.out.println("Before sorting: " + Arrays.toString(words));
        
        mergeSort(words);
        System.out.println("After sorting: " + Arrays.toString(words));
    }
}

The string version uses the compareTo method for lexicographical
comparison. The algorithm structure remains identical to the numeric version,
only the comparison operation changes.

## Descending Order Sort

To sort in descending order, we simply reverse the comparison condition in the
merge step. Here's how to modify the numeric merge sort for descending order:

DescendingMergeSort.java
  

package com.zetcode;

import java.util.Arrays;

public class DescendingMergeSort {

    public static void mergeSort(int[] array) {
        if (array.length &gt; 1) {
            int mid = array.length / 2;
            int[] left = Arrays.copyOfRange(array, 0, mid);
            int[] right = Arrays.copyOfRange(array, mid, array.length);
            
            mergeSort(left);
            mergeSort(right);
            
            merge(array, left, right);
        }
    }
    
    private static void merge(int[] result, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i &lt; left.length &amp;&amp; j &lt; right.length) {
            if (left[i] &gt;= right[j]) {  // Changed comparison operator
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i &lt; left.length) {
            result[k++] = left[i++];
        }
        
        while (j &lt; right.length) {
            result[k++] = right[j++];
        }
    }
    
    public static void main(String[] args) {

        int[] numbers = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Before sorting: " + Arrays.toString(numbers));
        
        mergeSort(numbers);
        System.out.println("After sorting: " + Arrays.toString(numbers));
    }
}

The only change needed is the comparison operator in the merge method from
&lt;= to &gt;=. This small modification completely
reverses the sort order.

## Generic Merge Sort Implementation

We can create a generic version that works with any Comparable type, making the
code more reusable. Here's how to implement a generic merge sort:

GenericMergeSort.java
  

package com.zetcode;

import java.util.Arrays;

public class GenericMergeSort&lt;T extends Comparable&lt;T&gt;&gt; {

    public void mergeSort(T[] array) {
        if (array.length &gt; 1) {
            int mid = array.length / 2;
            T[] left = Arrays.copyOfRange(array, 0, mid);
            T[] right = Arrays.copyOfRange(array, mid, array.length);
            
            mergeSort(left);
            mergeSort(right);
            
            merge(array, left, right);
        }
    }
    
    private void merge(T[] result, T[] left, T[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i &lt; left.length &amp;&amp; j &lt; right.length) {
            if (left[i].compareTo(right[j]) &lt;= 0) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i &lt; left.length) {
            result[k++] = left[i++];
        }
        
        while (j &lt; right.length) {
            result[k++] = right[j++];
        }
    }
    
    public static void main(String[] args) {

        // Test with integers
        Integer[] numbers = {38, 27, 43, 3, 9, 82, 10};
        GenericMergeSort&lt;Integer&gt; intSorter = new GenericMergeSort&lt;&gt;();
        intSorter.mergeSort(numbers);
        System.out.println("Sorted numbers: " + Arrays.toString(numbers));
        
        // Test with strings
        String[] words = {"apple", "orange", "banana", "pear", "kiwi"};
        GenericMergeSort&lt;String&gt; stringSorter = new GenericMergeSort&lt;&gt;();
        stringSorter.mergeSort(words);
        System.out.println("Sorted words: " + Arrays.toString(words));
    }
}

This generic implementation can sort any array of objects that implement the
Comparable interface. It works for both numeric and textual data without
modification.

## Merge Sort vs Quick Sort Benchmark

Merge sort and quick sort are both efficient O(n log n) algorithms, but they
have different characteristics. Let's compare their performance with a simple
benchmark:

SortBenchmark.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.Random;

public class SortBenchmark {

    public static void main(String[] args) {

        int size = 1000000;
        int[] numbers = generateRandomArray(size);
        int[] numbersCopy = Arrays.copyOf(numbers, numbers.length);
        
        // Merge sort benchmark
        long startTime = System.currentTimeMillis();
        mergeSort(numbers);
        long mergeSortTime = System.currentTimeMillis() - startTime;
        
        // Quick sort benchmark
        startTime = System.currentTimeMillis();
        Arrays.sort(numbersCopy);  // Uses dual-pivot quick sort
        long quickSortTime = System.currentTimeMillis() - startTime;
        
        System.out.println("Merge sort time: " + mergeSortTime + " ms");
        System.out.println("Quick sort time: " + quickSortTime + " ms");
    }
    
    private static int[] generateRandomArray(int size) {
        Random random = new Random();
        int[] array = new int[size];
        for (int i = 0; i &lt; size; i++) {
            array[i] = random.nextInt();
        }
        return array;
    }

    public static void mergeSort(int[] array) {
        if (array.length &gt; 1) {
            int mid = array.length / 2;
            int[] left = Arrays.copyOfRange(array, 0, mid);
            int[] right = Arrays.copyOfRange(array, mid, array.length);
            
            mergeSort(left);
            mergeSort(right);
            
            merge(array, left, right);
        }
    }
    
    private static void merge(int[] result, int[] left, int[] right) {
        int i = 0, j = 0, k = 0;
        
        while (i &lt; left.length &amp;&amp; j &lt; right.length) {
            if (left[i] &lt;= right[j]) {
                result[k++] = left[i++];
            } else {
                result[k++] = right[j++];
            }
        }
        
        while (i &lt; left.length) {
            result[k++] = left[i++];
        }
        
        while (j &lt; right.length) {
            result[k++] = right[j++];
        }
    }    
}

The example benchmarks two sorting algorithms, Merge Sort and Quick Sort. It
generates an array of random integers, makes a copy of it, and measures the time
taken to sort each using mergeSort (a custom implementation) and Java's built-in
Arrays.sort (which uses Dual-Pivot Quick Sort). The program then outputs the
time taken by each algorithm. This comparison highlights the performance of two
different sorting techniques on a large dataset while showcasing how to measure
execution time accurately in Java.

Key differences between merge sort and quick sort:

- Merge sort is stable (maintains order of equal elements)

- Quick sort typically has better constant factors (faster in practice)

- Merge sort requires O(n) additional space

- Quick sort has worst-case O(n²) time (though rare with good pivot selection)

- Java's Arrays.sort uses a tuned quick sort for primitives

## Source

[Java Arrays Documentation](https://docs.oracle.com/javase/8/docs/api/java/util/Arrays.html)

In this tutorial, we've covered the merge sort algorithm in Java, including
implementations for both numeric and textual data in ascending and descending
order. We also compared merge sort with quick sort through a simple benchmark.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).