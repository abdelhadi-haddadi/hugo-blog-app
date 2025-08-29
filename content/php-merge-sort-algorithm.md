+++
title = "PHP Merge Sort Algorithm"
date = 2025-08-29T20:04:32.478+01:00
draft = false
description = "PHP merge sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Merge Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem
or perform a computation. In programming, algorithms are implemented as
functions or methods.

**Sorting** is arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for optimizing other
algorithms like search operations.

Common sorting algorithms include:

- Merge Sort

- Quick Sort

- Bubble Sort

- Insertion Sort

- Selection Sort

- Heap Sort

## Merge Sort Overview

Merge sort is a divide-and-conquer algorithm that recursively splits the
input array into halves, sorts them, and then merges the sorted halves.

It has a time complexity of O(n log n) in all cases, making it efficient
for large datasets. It's a stable sort that requires O(n) additional space.

## Basic Merge Sort Implementation

Here's a basic implementation of merge sort for numeric data in ascending
order.

merge_sort_basic.php
  

&lt;?php

function mergeSort(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $mid = (int) (count($array) / 2);
    $left = array_slice($array, 0, $mid);
    $right = array_slice($array, $mid);
    
    $left = mergeSort($left);
    $right = mergeSort($right);
    
    return merge($left, $right);
}

function merge(array $left, array $right): array {
    $result = [];
    $i = $j = 0;
    
    while ($i &lt; count($left) &amp;&amp; $j &lt; count($right)) {
        if ($left[$i] &lt;= $right[$j]) {
            $result[] = $left[$i++];
        } else {
            $result[] = $right[$j++];
        }
    }
    
    while ($i &lt; count($left)) {
        $result[] = $left[$i++];
    }
    
    while ($j &lt; count($right)) {
        $result[] = $right[$j++];
    }
    
    return $result;
}

$numbers = [34, 7, 23, 32, 5, 62];
$sorted = mergeSort($numbers);
print_r($sorted);

This implementation recursively divides the array until each subarray has
one element, then merges them back in sorted order.

## Sorting Textual Data

Merge sort can also sort strings alphabetically. Here's an example with
textual data.

merge_sort_text.php
  

&lt;?php

function mergeSortText(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $mid = (int) (count($array) / 2);
    $left = array_slice($array, 0, $mid);
    $right = array_slice($array, $mid);
    
    $left = mergeSortText($left);
    $right = mergeSortText($right);
    
    return mergeText($left, $right);
}

function mergeText(array $left, array $right): array {
    $result = [];
    $i = $j = 0;
    
    while ($i &lt; count($left) &amp;&amp; $j &lt; count($right)) {
        if (strcmp($left[$i], $right[$j]) &lt;= 0) {
            $result[] = $left[$i++];
        } else {
            $result[] = $right[$j++];
        }
    }
    
    while ($i &lt; count($left)) {
        $result[] = $left[$i++];
    }
    
    while ($j &lt; count($right)) {
        $result[] = $right[$j++];
    }
    
    return $result;
}

$names = ["John", "Alice", "Bob", "Zoe", "Charlie"];
$sortedNames = mergeSortText($names);
print_r($sortedNames);

This version uses strcmp to compare strings. The output will
be the names sorted in alphabetical order.

## Descending Order Sort

To sort in descending order, we simply reverse the comparison in the merge
function.

merge_sort_desc.php
  

&lt;?php

function mergeSortDesc(array $array): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $mid = (int) (count($array) / 2);
    $left = array_slice($array, 0, $mid);
    $right = array_slice($array, $mid);
    
    $left = mergeSortDesc($left);
    $right = mergeSortDesc($right);
    
    return mergeDesc($left, $right);
}

function mergeDesc(array $left, array $right): array {
    $result = [];
    $i = $j = 0;
    
    while ($i &lt; count($left) &amp;&amp; $j &lt; count($right)) {
        if ($left[$i] &gt;= $right[$j]) {
            $result[] = $left[$i++];
        } else {
            $result[] = $right[$j++];
        }
    }
    
    while ($i &lt; count($left)) {
        $result[] = $left[$i++];
    }
    
    while ($j &lt; count($right)) {
        $result[] = $right[$j++];
    }
    
    return $result;
}

$numbers = [34, 7, 23, 32, 5, 62];
$sortedDesc = mergeSortDesc($numbers);
print_r($sortedDesc);

The only change is the comparison operator in the merge function, which
now checks for greater-than-or-equal instead of less-than-or-equal.

## Generic Merge Sort with Callback

We can make our merge sort more flexible by adding a comparison callback.

merge_sort_generic.php
  

&lt;?php

function mergeSortGeneric(array $array, callable $compare): array {
    if (count($array) &lt;= 1) {
        return $array;
    }
    
    $mid = (int) (count($array) / 2);
    $left = array_slice($array, 0, $mid);
    $right = array_slice($array, $mid);
    
    $left = mergeSortGeneric($left, $compare);
    $right = mergeSortGeneric($right, $compare);
    
    return mergeGeneric($left, $right, $compare);
}

function mergeGeneric(array $left, array $right, callable $compare): array {
    $result = [];
    $i = $j = 0;
    
    while ($i &lt; count($left) &amp;&amp; $j &lt; count($right)) {
        if ($compare($left[$i], $right[$j]) &lt;= 0) {
            $result[] = $left[$i++];
        } else {
            $result[] = $right[$j++];
        }
    }
    
    while ($i &lt; count($left)) {
        $result[] = $left[$i++];
    }
    
    while ($j &lt; count($right)) {
        $result[] = $right[$j++];
    }
    
    return $result;
}

// Ascending sort
$ascCompare = fn($a, $b) =&gt; $a &lt;=&gt; $b;
$numbers = [34, 7, 23, 32, 5, 62];
$sortedAsc = mergeSortGeneric($numbers, $ascCompare);
print_r($sortedAsc);

// Descending sort
$descCompare = fn($a, $b) =&gt; $b &lt;=&gt; $a;
$sortedDesc = mergeSortGeneric($numbers, $descCompare);
print_r($sortedDesc);

This version accepts a comparison function, making it work with any data
type and sort order. The spaceship operator (&lt;=&gt;) simplifies
comparison logic.

## Merge Sort vs Quick Sort Benchmark

Let's compare merge sort with quick sort performance on large datasets.

sort_benchmark.php
  

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
    
    return array_merge(quickSort($left), [$pivot], quickSort($right));
}

function generateRandomArray(int $size): array {
    $array = range(1, $size);
    shuffle($array);
    return $array;
}

$largeArray = generateRandomArray(10000);

// Merge sort benchmark
$start = microtime(true);
$mergeSorted = mergeSort($largeArray);
$mergeTime = microtime(true) - $start;

// Quick sort benchmark
$start = microtime(true);
$quickSorted = quickSort($largeArray);
$quickTime = microtime(true) - $start;

echo "Merge Sort time: " . number_format($mergeTime, 6) . " seconds\n";
echo "Quick Sort time: " . number_format($quickTime, 6) . " seconds\n";

Both algorithms have O(n log n) average time complexity, but quick sort is
generally faster in practice due to better cache performance and less memory
usage. However, merge sort is stable and guarantees O(n log n) performance.

## When to Use Merge Sort

- **Stability needed:** When equal elements must retain order

- **External sorting:** When data doesn't fit in memory

- **Linked lists:** Works well with sequential access data

- **Predictable performance:** When worst-case matters

## Source

[Merge Sort on Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)

This tutorial covered the merge sort algorithm in PHP with examples for
different data types and sort orders, plus a performance comparison.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).