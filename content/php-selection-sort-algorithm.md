+++
title = "PHP Selection Sort Algorithm"
date = 2025-08-29T20:04:43.831+01:00
draft = false
description = "PHP selection sort algorithm tutorial with examples. Learn how to implement selection sort for numeric and textual data in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Selection Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem.
In programming, algorithms are implemented as functions or methods.

**Sorting** means arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for optimal data access.

Common sorting algorithms include:

- Selection Sort

- Bubble Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Selection Sort Algorithm

Selection sort works by repeatedly finding the minimum (or maximum) element
from the unsorted part and putting it at the beginning. It has O(n²) time
complexity, making it inefficient for large datasets.

## Selection Sort Implementation

Here's a basic implementation of selection sort in PHP for numeric data:

selection_sort.php
  

&lt;?php

function selectionSort(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        $minIndex = $i;
        
        for ($j = $i + 1; $j &lt; $n; $j++) {
            if ($arr[$j] &lt; $arr[$minIndex]) {
                $minIndex = $j;
            }
        }
        
        if ($minIndex != $i) {
            // Swap elements
            $temp = $arr[$i];
            $arr[$i] = $arr[$minIndex];
            $arr[$minIndex] = $temp;
        }
    }
    
    return $arr;
}

$numbers = [64, 25, 12, 22, 11];
$sorted = selectionSort($numbers);

print_r($sorted); // Outputs: [11, 12, 22, 25, 64]

This implementation sorts numbers in ascending order. The outer loop tracks
the sorted portion, while the inner loop finds the next smallest element.

## Descending Order Sort

To sort in descending order, we modify the comparison to find maximums:

selection_sort_desc.php
  

&lt;?php

function selectionSortDesc(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        $maxIndex = $i;
        
        for ($j = $i + 1; $j &lt; $n; $j++) {
            if ($arr[$j] &gt; $arr[$maxIndex]) {
                $maxIndex = $j;
            }
        }
        
        if ($maxIndex != $i) {
            // Swap elements
            $temp = $arr[$i];
            $arr[$i] = $arr[$maxIndex];
            $arr[$maxIndex] = $temp;
        }
    }
    
    return $arr;
}

$numbers = [64, 25, 12, 22, 11];
$sorted = selectionSortDesc($numbers);

print_r($sorted); // Outputs: [64, 25, 22, 12, 11]

The only change is the comparison operator from &lt; to &gt; to find maximums
instead of minimums.

## Sorting Textual Data

Selection sort can also sort strings alphabetically:

selection_sort_strings.php
  

&lt;?php

function selectionSortStrings(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        $minIndex = $i;
        
        for ($j = $i + 1; $j &lt; $n; $j++) {
            if (strcmp($arr[$j], $arr[$minIndex]) &lt; 0) {
                $minIndex = $j;
            }
        }
        
        if ($minIndex != $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$minIndex];
            $arr[$minIndex] = $temp;
        }
    }
    
    return $arr;
}

$names = ["John", "Alice", "Bob", "Eve", "David"];
$sorted = selectionSortStrings($names);

print_r($sorted); // Outputs: ["Alice", "Bob", "David", "Eve", "John"]

We use strcmp for string comparison. It returns a value less than
0 if the first string is less than the second.

## Generic Selection Sort

We can make a more generic version that accepts a comparison callback:

generic_selection_sort.php
  

&lt;?php

function selectionSortGeneric(array $arr, callable $compare): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        $selectedIndex = $i;
        
        for ($j = $i + 1; $j &lt; $n; $j++) {
            if ($compare($arr[$j], $arr[$selectedIndex])) {
                $selectedIndex = $j;
            }
        }
        
        if ($selectedIndex != $i) {
            $temp = $arr[$i];
            $arr[$i] = $arr[$selectedIndex];
            $arr[$selectedIndex] = $temp;
        }
    }
    
    return $arr;
}

// Sort numbers ascending
$numbers = [64, 25, 12, 22, 11];
$sortedAsc = selectionSortGeneric($numbers, fn($a, $b) =&gt; $a &lt; $b);
print_r($sortedAsc);

// Sort strings descending
$names = ["John", "Alice", "Bob", "Eve", "David"];
$sortedDesc = selectionSortGeneric($names, fn($a, $b) =&gt; strcmp($a, $b) &gt; 0);
print_r($sortedDesc);

This version is more flexible as it delegates the comparison logic to the
caller. The callback should return true if the first argument should come
before the second in the sorted order.

## Selection Sort vs Quick Sort

Let's compare selection sort with the more efficient quick sort algorithm:

sort_benchmark.php
  

&lt;?php

function quickSort(array $arr): array {
    if (count($arr) &lt;= 1) {
        return $arr;
    }
    
    $pivot = $arr[0];
    $left = $right = [];
    
    for ($i = 1; $i &lt; count($arr); $i++) {
        if ($arr[$i] &lt; $pivot) {
            $left[] = $arr[$i];
        } else {
            $right[] = $arr[$i];
        }
    }
    
    return array_merge(quickSort($left), [$pivot], quickSort($right));
}

// Generate large array
$largeArray = range(1, 10000);
shuffle($largeArray);

// Benchmark selection sort
$start = microtime(true);
selectionSortGeneric($largeArray, fn($a, $b) =&gt; $a &lt; $b);
$selectionTime = microtime(true) - $start;

// Benchmark quick sort
$start = microtime(true);
quickSort($largeArray);
$quickTime = microtime(true) - $start;

echo "Selection Sort: " . number_format($selectionTime, 4) . " seconds\n";
echo "Quick Sort: " . number_format($quickTime, 4) . " seconds\n";

On a typical machine with 10,000 elements, you'll see results like:

Selection Sort: 2.3456 seconds
Quick Sort: 0.0123 seconds

Quick sort is significantly faster for large datasets due to its O(n log n)
average time complexity compared to selection sort's O(n²). However, selection
sort may be simpler to implement and understand for small datasets.

## When to Use Selection Sort

- **Small datasets:** When n is small, overhead matters less.

- **Memory constraints:** It's an in-place sort with O(1) space.

- **Simple implementation:** Good for educational purposes.

- **Few swaps needed:** Only O(n) swaps total.

## Source

[PHP Sorting Functions](https://www.php.net/manual/en/function.sort.php)

This tutorial covered the selection sort algorithm in PHP with examples for
both numeric and textual data, including performance comparisons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).