+++
title = "PHP Heap Sort Algorithm"
date = 2025-08-29T20:04:26.529+01:00
draft = false
description = "PHP heap sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order. Includes comparison with quick sort."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Heap Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order.

Common sorting algorithms include bubble sort, selection sort, insertion sort,
merge sort, quick sort, and heap sort. Each has different time complexities.

## Heap Sort Overview

Heap sort is a comparison-based sorting algorithm that uses a binary heap data
structure. It has O(n log n) time complexity for all cases.

The algorithm works by first building a max heap from the input data. Then it
repeatedly extracts the maximum element and rebuilds the heap.

## Heap Sort Implementation

Here's a basic heap sort implementation in PHP for numeric data:

heap_sort.php
  

&lt;?php

function heapSort(array &amp;$arr): void {
    $n = count($arr);

    // Build max heap
    for ($i = (int)($n / 2) - 1; $i &gt;= 0; $i--) {
        heapify($arr, $n, $i);
    }

    // Extract elements one by one
    for ($i = $n - 1; $i &gt; 0; $i--) {
        // Move current root to end
        [$arr[0], $arr[$i]] = [$arr[$i], $arr[0]];
        
        // Heapify reduced heap
        heapify($arr, $i, 0);
    }
}

function heapify(array &amp;$arr, int $n, int $i): void {
    $largest = $i;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;

    if ($left &lt; $n &amp;&amp; $arr[$left] &gt; $arr[$largest]) {
        $largest = $left;
    }

    if ($right &lt; $n &amp;&amp; $arr[$right] &gt; $arr[$largest]) {
        $largest = $right;
    }

    if ($largest != $i) {
        [$arr[$i], $arr[$largest]] = [$arr[$largest], $arr[$i]];
        heapify($arr, $n, $largest);
    }
}

$numbers = [12, 11, 13, 5, 6, 7];
heapSort($numbers);
print_r($numbers);

This implementation first builds a max heap from the input array. Then it
repeatedly extracts the largest element and maintains the heap property.

## Sorting Textual Data

Heap sort can also sort strings alphabetically. Here's an example:

heap_sort_strings.php
  

&lt;?php

function heapSortStrings(array &amp;$arr): void {
    $n = count($arr);

    for ($i = (int)($n / 2) - 1; $i &gt;= 0; $i--) {
        heapifyStrings($arr, $n, $i);
    }

    for ($i = $n - 1; $i &gt; 0; $i--) {
        [$arr[0], $arr[$i]] = [$arr[$i], $arr[0]];
        heapifyStrings($arr, $i, 0);
    }
}

function heapifyStrings(array &amp;$arr, int $n, int $i): void {
    $largest = $i;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;

    if ($left &lt; $n &amp;&amp; strcmp($arr[$left], $arr[$largest]) &gt; 0) {
        $largest = $left;
    }

    if ($right &lt; $n &amp;&amp; strcmp($arr[$right], $arr[$largest]) &gt; 0) {
        $largest = $right;
    }

    if ($largest != $i) {
        [$arr[$i], $arr[$largest]] = [$arr[$largest], $arr[$i]];
        heapifyStrings($arr, $n, $largest);
    }
}

$words = ["banana", "apple", "cherry", "date"];
heapSortStrings($words);
print_r($words);

This version uses strcmp for string comparison. The algorithm
works the same way but compares strings instead of numbers.

## Descending Order Sorting

To sort in descending order, we modify the heapify function to create a min
heap instead of a max heap:

heap_sort_descending.php
  

&lt;?php

function heapSortDescending(array &amp;$arr): void {
    $n = count($arr);

    for ($i = (int)($n / 2) - 1; $i &gt;= 0; $i--) {
        heapifyDescending($arr, $n, $i);
    }

    for ($i = $n - 1; $i &gt; 0; $i--) {
        [$arr[0], $arr[$i]] = [$arr[$i], $arr[0]];
        heapifyDescending($arr, $i, 0);
    }
}

function heapifyDescending(array &amp;$arr, int $n, int $i): void {
    $smallest = $i;
    $left = 2 * $i + 1;
    $right = 2 * $i + 2;

    if ($left &lt; $n &amp;&amp; $arr[$left] &lt; $arr[$smallest]) {
        $smallest = $left;
    }

    if ($right &lt; $n &amp;&amp; $arr[$right] &lt; $arr[$smallest]) {
        $smallest = $right;
    }

    if ($smallest != $i) {
        [$arr[$i], $arr[$smallest]] = [$arr[$smallest], $arr[$i]];
        heapifyDescending($arr, $n, $smallest);
    }
}

$numbers = [12, 11, 13, 5, 6, 7];
heapSortDescending($numbers);
print_r($numbers);

This implementation finds the smallest element instead of the largest, resulting
in descending order. The same approach works for strings by modifying the
comparison.

## Heap Sort vs Quick Sort

Heap sort and quick sort are both efficient sorting algorithms with O(n log n)
average time complexity. However, they have different characteristics.

Quick sort is generally faster in practice due to better cache performance and
smaller constant factors. However, heap sort has guaranteed O(n log n)
performance in worst cases.

## Benchmark Comparison

Let's compare the performance of heap sort and quick sort with a benchmark:

sort_benchmark.php
  

&lt;?php

function quickSort(array &amp;$arr, int $low, int $high): void {
    if ($low &lt; $high) {
        $pi = partition($arr, $low, $high);
        quickSort($arr, $low, $pi - 1);
        quickSort($arr, $pi + 1, $high);
    }
}

function partition(array &amp;$arr, int $low, int $high): int {
    $pivot = $arr[$high];
    $i = $low - 1;

    for ($j = $low; $j &lt;= $high - 1; $j++) {
        if ($arr[$j] &lt; $pivot) {
            $i++;
            [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
        }
    }
    [$arr[$i + 1], $arr[$high]] = [$arr[$high], $arr[$i + 1]];
    return $i + 1;
}

// Generate large random array
$largeArray = [];
for ($i = 0; $i &lt; 10000; $i++) {
    $largeArray[] = rand(1, 100000);
}

// Benchmark heap sort
$heapArray = $largeArray;
$heapStart = microtime(true);
heapSort($heapArray);
$heapTime = microtime(true) - $heapStart;

// Benchmark quick sort
$quickArray = $largeArray;
$quickStart = microtime(true);
quickSort($quickArray, 0, count($quickArray) - 1);
$quickTime = microtime(true) - $quickStart;

echo "Heap sort time: " . number_format($heapTime, 6) . " seconds\n";
echo "Quick sort time: " . number_format($quickTime, 6) . " seconds\n";

This benchmark creates a large random array and measures sorting time for both
algorithms. Quick sort typically performs better on random data.

## When to Use Heap Sort

- **Worst-case guarantee:** When you need guaranteed O(n log n) performance.

- **Memory constraints:** Heap sort is in-place (O(1) space).

- **External sorting:** Useful for sorting data that doesn't fit in memory.

- **Priority queues:** The heap structure is useful beyond sorting.

## Source

[Heap Sort on Wikipedia](https://en.wikipedia.org/wiki/Heapsort)

This tutorial covered the PHP heap sort algorithm with examples for numeric and
textual data, including ascending and descending order sorting.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).