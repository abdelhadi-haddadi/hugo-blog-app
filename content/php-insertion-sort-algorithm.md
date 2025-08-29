+++
title = "PHP Insertion Sort Algorithm"
date = 2025-08-29T20:04:28.760+01:00
draft = false
description = "PHP insertion sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Insertion Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem
or perform a computation. In programming, algorithms are implemented as
functions or methods.

**Sorting** is arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for optimizing other
algorithms like search operations.

Common sorting algorithms include:

- Insertion Sort

- Quick Sort

- Merge Sort

- Bubble Sort

- Selection Sort

- Heap Sort

## Insertion Sort Overview

Insertion sort builds the final sorted array one item at a time. It is
efficient for small data sets or nearly sorted data. The algorithm works
by dividing the array into sorted and unsorted parts.

Time complexity: O(n²) in worst case, O(n) in best case (already sorted).
Space complexity: O(1) as it sorts in place.

## Basic Insertion Sort Implementation

Here's a basic implementation of insertion sort for numeric data in PHP.

basic_insertion_sort.php
  

&lt;?php

function insertionSort(array &amp;$arr): void {
    $n = count($arr);
    
    for ($i = 1; $i &lt; $n; $i++) {
        $key = $arr[$i];
        $j = $i - 1;
        
        while ($j &gt;= 0 &amp;&amp; $arr[$j] &gt; $key) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        
        $arr[$j + 1] = $key;
    }
}

$numbers = [12, 11, 13, 5, 6];
insertionSort($numbers);

print_r($numbers); // Outputs sorted array: [5, 6, 11, 12, 13]

This implementation sorts the array in ascending order. The algorithm picks
each element and inserts it into its correct position in the sorted part.

## Sorting Textual Data

Insertion sort can also sort strings alphabetically. Here's an example.

textual_sort.php
  

&lt;?php

function insertionSortText(array &amp;$arr): void {
    $n = count($arr);
    
    for ($i = 1; $i &lt; $n; $i++) {
        $key = $arr[$i];
        $j = $i - 1;
        
        while ($j &gt;= 0 &amp;&amp; strcmp($arr[$j], $key) &gt; 0) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        
        $arr[$j + 1] = $key;
    }
}

$names = ["John", "Alice", "Bob", "Eve", "David"];
insertionSortText($names);

print_r($names); // Outputs: ["Alice", "Bob", "David", "Eve", "John"]

This version uses strcmp to compare strings. The algorithm
works similarly to the numeric version but compares string values.

## Descending Order Sorting

To sort in descending order, we simply reverse the comparison condition.

descending_sort.php
  

&lt;?php

function insertionSortDesc(array &amp;$arr): void {
    $n = count($arr);
    
    for ($i = 1; $i &lt; $n; $i++) {
        $key = $arr[$i];
        $j = $i - 1;
        
        while ($j &gt;= 0 &amp;&amp; $arr[$j] &lt; $key) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        
        $arr[$j + 1] = $key;
    }
}

$numbers = [12, 11, 13, 5, 6];
insertionSortDesc($numbers);

print_r($numbers); // Outputs: [13, 12, 11, 6, 5]

The only change is the comparison operator from &gt; to
&lt;. This makes the algorithm sort in descending order instead of
ascending.

## Generic Insertion Sort Function

We can create a more flexible version that accepts a comparison callback.

generic_insertion_sort.php
  

&lt;?php

function insertionSortGeneric(array &amp;$arr, callable $compare): void {
    $n = count($arr);
    
    for ($i = 1; $i &lt; $n; $i++) {
        $key = $arr[$i];
        $j = $i - 1;
        
        while ($j &gt;= 0 &amp;&amp; $compare($arr[$j], $key) &gt; 0) {
            $arr[$j + 1] = $arr[$j];
            $j--;
        }
        
        $arr[$j + 1] = $key;
    }
}

// Ascending sort
$numbers = [12, 11, 13, 5, 6];
insertionSortGeneric($numbers, fn($a, $b) =&gt; $a - $b);
print_r($numbers);

// Descending sort
insertionSortGeneric($numbers, fn($a, $b) =&gt; $b - $a);
print_r($numbers);

// String sort
$names = ["John", "Alice", "Bob"];
insertionSortGeneric($names, 'strcmp');
print_r($names);

This version is more versatile as it delegates the comparison logic to a
callback function. The same function can now handle different sort orders
and data types.

## Insertion Sort vs Quick Sort Benchmark

Let's compare insertion sort with quick sort to see performance differences.

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
    
    for ($j = $low; $j &lt; $high; $j++) {
        if ($arr[$j] &lt; $pivot) {
            $i++;
            [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
        }
    }
    
    [$arr[$i + 1], $arr[$high]] = [$arr[$high], $arr[$i + 1]];
    return $i + 1;
}

function generateRandomArray(int $size): array {
    $arr = [];
    for ($i = 0; $i &lt; $size; $i++) {
        $arr[] = rand(1, 10000);
    }
    return $arr;
}

$smallArray = generateRandomArray(100);
$mediumArray = generateRandomArray(1000);
$largeArray = generateRandomArray(10000);

// Benchmark insertion sort
$start = microtime(true);
$arr = $smallArray;
insertionSortGeneric($arr, fn($a, $b) =&gt; $a - $b);
$time = microtime(true) - $start;
echo "Insertion sort (100): $time seconds\n";

$start = microtime(true);
$arr = $mediumArray;
insertionSortGeneric($arr, fn($a, $b) =&gt; $a - $b);
$time = microtime(true) - $start;
echo "Insertion sort (1000): $time seconds\n";

// Benchmark quick sort
$start = microtime(true);
$arr = $smallArray;
quickSort($arr, 0, count($arr) - 1);
$time = microtime(true) - $start;
echo "Quick sort (100): $time seconds\n";

$start = microtime(true);
$arr = $mediumArray;
quickSort($arr, 0, count($arr) - 1);
$time = microtime(true) - $start;
echo "Quick sort (1000): $time seconds\n";

$start = microtime(true);
$arr = $largeArray;
quickSort($arr, 0, count($arr) - 1);
$time = microtime(true) - $start;
echo "Quick sort (10000): $time seconds\n";

Expected output will show that insertion sort is faster for very small
arrays but becomes significantly slower than quick sort as the array size
grows. Quick sort's O(n log n) average case outperforms insertion sort's
O(n²) for larger datasets.

## When to Use Insertion Sort

- **Small datasets:** Efficient for arrays with ≤ 10-20 elements

- **Nearly sorted data:** Performs well when array is mostly sorted

- **Simple implementation:** Easy to understand and implement

- **Stable sort:** Maintains relative order of equal elements

## Source

[PHP Sorting Functions Documentation](https://www.php.net/manual/en/function.usort.php)

This tutorial covered the PHP insertion sort algorithm with examples for
numeric and textual data, different sort orders, and performance comparison.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).