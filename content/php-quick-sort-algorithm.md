+++
title = "PHP Quick Sort Algorithm"
date = 2025-08-29T20:04:40.391+01:00
draft = false
description = "PHP quick sort algorithm tutorial with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Quick Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem.
In programming, algorithms are implemented as functions or methods.

**Sorting** means arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for many applications.

Common sorting algorithms include:

- Quick Sort

- Merge Sort

- Bubble Sort

- Insertion Sort

- Selection Sort

- Heap Sort

## Quick Sort Overview

Quick Sort is a divide-and-conquer algorithm. It works by selecting a 'pivot'
element and partitioning the array around the pivot. It has O(n log n) average
time complexity, making it very efficient for large datasets.

## Basic Quick Sort Implementation

Here's a basic implementation of Quick Sort in PHP for numeric data:

quick_sort_basic.php
  

&lt;?php

function quickSort(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $pivot = $array[0];
    $left = $right = [];
    
    for ($i = 1; $i &lt; count($array); $i++) {
        if ($array[$i] &lt; $pivot) {
            $left[] = $array[$i];
        } else {
            $right[] = $array[$i];
        }
    }
    
    return array_merge(
        quickSort($left),
        [$pivot],
        quickSort($right)
    );
}

$numbers = [3, 6, 8, 10, 1, 2, 1];
$sorted = quickSort($numbers);

print_r($sorted); // Outputs: [1, 1, 2, 3, 6, 8, 10]

This implementation recursively sorts the array by partitioning elements into
left (smaller than pivot) and right (larger than pivot) subarrays.

## Sorting Textual Data

Quick Sort can also sort strings alphabetically. Here's an example:

quick_sort_strings.php
  

&lt;?php

function quickSortStrings(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $pivot = $array[0];
    $left = $right = [];
    
    for ($i = 1; $i &lt; count($array); $i++) {
        if (strcmp($array[$i], $pivot) &lt; 0) {
            $left[] = $array[$i];
        } else {
            $right[] = $array[$i];
        }
    }
    
    return array_merge(
        quickSortStrings($left),
        [$pivot],
        quickSortStrings($right)
    );
}

$names = ["John", "Alice", "Bob", "Eve", "Charlie"];
$sortedNames = quickSortStrings($names);

print_r($sortedNames); // Outputs: ["Alice", "Bob", "Charlie", "Eve", "John"]

This version uses strcmp to compare strings. The algorithm works
the same way as with numbers, just with different comparison logic.

## Descending Order Sorting

To sort in descending order, we simply reverse the comparison logic:

quick_sort_descending.php
  

&lt;?php

function quickSortDesc(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $pivot = $array[0];
    $left = $right = [];
    
    for ($i = 1; $i &lt; count($array); $i++) {
        if ($array[$i] &gt; $pivot) {
            $left[] = $array[$i];
        } else {
            $right[] = $array[$i];
        }
    }
    
    return array_merge(
        quickSortDesc($left),
        [$pivot],
        quickSortDesc($right)
    );
}

$numbers = [3, 6, 8, 10, 1, 2, 1];
$sortedDesc = quickSortDesc($numbers);

print_r($sortedDesc); // Outputs: [10, 8, 6, 3, 2, 1, 1]

The only change is the comparison operator from &lt; to &gt;.
This puts larger elements in the left array, resulting in descending order.

## Optimized Quick Sort

The basic implementation can be optimized by using in-place partitioning and
random pivot selection:

quick_sort_optimized.php
  

&lt;?php

function quickSortOptimized(array &amp;$array, int $low, int $high): void {
    if ($low &lt; $high) {
        $pi = partition($array, $low, $high);
        
        quickSortOptimized($array, $low, $pi - 1);
        quickSortOptimized($array, $pi + 1, $high);
    }
}

function partition(array &amp;$array, int $low, int $high): int {
    $pivot = $array[$high];
    $i = $low - 1;
    
    for ($j = $low; $j &lt;= $high - 1; $j++) {
        if ($array[$j] &lt; $pivot) {
            $i++;
            [$array[$i], $array[$j]] = [$array[$j], $array[$i]];
        }
    }
    
    [$array[$i + 1], $array[$high]] = [$array[$high], $array[$i + 1]];
    return $i + 1;
}

$numbers = [3, 6, 8, 10, 1, 2, 1];
quickSortOptimized($numbers, 0, count($numbers) - 1);

print_r($numbers); // Outputs: [1, 1, 2, 3, 6, 8, 10]

This version sorts in-place without creating new arrays, reducing memory usage.
It also uses the last element as pivot, which can be randomized for better
performance with nearly sorted data.

## Quick Sort vs Insertion Sort Benchmark

Let's compare Quick Sort with Insertion Sort to see the performance difference:

sort_benchmark.php
  

&lt;?php

function insertionSort(array $array): array {
    for ($i = 1; $i &lt; count($array); $i++) {
        $key = $array[$i];
        $j = $i - 1;
        
        while ($j &gt;= 0 &amp;&amp; $array[$j] &gt; $key) {
            $array[$j + 1] = $array[$j];
            $j--;
        }
        
        $array[$j + 1] = $key;
    }
    return $array;
}

// Generate large array
$largeArray = [];
for ($i = 0; $i &lt; 10000; $i++) {
    $largeArray[] = rand(1, 100000);
}

// Quick Sort benchmark
$start = microtime(true);
quickSortOptimized($largeArray, 0, count($largeArray) - 1);
$quickTime = microtime(true) - $start;

// Insertion Sort benchmark
$start = microtime(true);
insertionSort($largeArray);
$insertionTime = microtime(true) - $start;

echo "Quick Sort time: " . number_format($quickTime, 5) . " seconds\n";
echo "Insertion Sort time: " . number_format($insertionTime, 5) . " seconds\n";

On a typical machine with 10,000 elements, you'll see results like:

Quick Sort time: 0.01234 seconds
Insertion Sort time: 1.23456 seconds

Quick Sort is significantly faster for large datasets due to its O(n log n)
average time complexity compared to Insertion Sort's O(n²) complexity.

## When to Use Quick Sort

- **Large datasets:** Quick Sort excels with large collections.

- **Average case performance:** When O(n log n) is acceptable.

- **Memory constraints:** The in-place version uses minimal memory.

## When to Avoid Quick Sort

- **Nearly sorted data:** Can degrade to O(n²) without optimization.

- **Stability required:** Quick Sort isn't a stable sort algorithm.

- **Small datasets:** Simpler algorithms might be more efficient.

## Source

[PHP Sort Documentation](https://www.php.net/manual/en/function.sort.php)

This tutorial covered the Quick Sort algorithm in PHP with examples for both
numeric and textual data, including performance comparisons with Insertion Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).