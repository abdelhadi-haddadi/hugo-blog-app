+++
title = "PHP Bucket Sort Algorithm"
date = 2025-08-29T20:04:12.452+01:00
draft = false
description = "PHP bucket sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Bucket Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem. 
It takes inputs and produces outputs following a defined set of rules.

**Sorting** arranges data in a specific order (ascending or 
descending). Efficient sorting is crucial for optimizing other algorithms.

Common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

- Bucket Sort

- Radix Sort

## Bucket Sort Overview

Bucket sort distributes elements into buckets, sorts each bucket, then 
concatenates them. It works well when input is uniformly distributed.

Time complexity: O(n + k) in best case, O(n²) in worst case. Space 
complexity: O(n + k) where k is number of buckets.

## Numeric Bucket Sort (Ascending)

This example sorts numbers in ascending order using bucket sort.

numeric_ascending.php
  

&lt;?php

function bucketSort(array $numbers): array {
    $min = min($numbers);
    $max = max($numbers);
    $bucketCount = count($numbers);
    $range = ($max - $min) / $bucketCount;
    
    $buckets = array_fill(0, $bucketCount, []);
    
    foreach ($numbers as $num) {
        $index = floor(($num - $min) / $range);
        $index = min($index, $bucketCount - 1);
        $buckets[$index][] = $num;
    }
    
    $sorted = [];
    foreach ($buckets as $bucket) {
        sort($bucket);
        $sorted = array_merge($sorted, $bucket);
    }
    
    return $sorted;
}

$numbers = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
$sorted = bucketSort($numbers);

print_r($sorted);

Output shows numbers sorted in ascending order. The algorithm first 
distributes numbers into buckets based on their value range.

## Numeric Bucket Sort (Descending)

This modifies the previous example to sort in descending order.

numeric_descending.php
  

&lt;?php

function bucketSortDesc(array $numbers): array {
    $min = min($numbers);
    $max = max($numbers);
    $bucketCount = count($numbers);
    $range = ($max - $min) / $bucketCount;
    
    $buckets = array_fill(0, $bucketCount, []);
    
    foreach ($numbers as $num) {
        $index = floor(($num - $min) / $range);
        $index = min($index, $bucketCount - 1);
        $buckets[$index][] = $num;
    }
    
    $sorted = [];
    foreach ($buckets as $bucket) {
        rsort($bucket);
        $sorted = array_merge($sorted, $bucket);
    }
    
    return $sorted;
}

$numbers = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51];
$sorted = bucketSortDesc($numbers);

print_r($sorted);

The key change is using rsort() instead of sort() 
to sort individual buckets in descending order before merging.

## String Bucket Sort (Ascending)

Bucket sort can also sort strings alphabetically. This example shows how.

string_ascending.php
  

&lt;?php

function bucketSortStrings(array $strings): array {
    $minOrd = ord('a');
    $maxOrd = ord('z');
    $bucketCount = 26; // One for each letter
    
    $buckets = array_fill(0, $bucketCount, []);
    
    foreach ($strings as $str) {
        $firstChar = strtolower(substr($str, 0, 1));
        $index = ord($firstChar) - $minOrd;
        $buckets[$index][] = $str;
    }
    
    $sorted = [];
    foreach ($buckets as &amp;$bucket) {
        sort($bucket);
        $sorted = array_merge($sorted, $bucket);
    }
    
    return $sorted;
}

$names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
$sorted = bucketSortStrings($names);

print_r($sorted);

Strings are distributed into buckets based on their first letter. Each 
bucket is then sorted alphabetically before merging.

## String Bucket Sort (Descending)

This version sorts strings in reverse alphabetical order.

string_descending.php
  

&lt;?php

function bucketSortStringsDesc(array $strings): array {
    $minOrd = ord('a');
    $maxOrd = ord('z');
    $bucketCount = 26;
    
    $buckets = array_fill(0, $bucketCount, []);
    
    foreach ($strings as $str) {
        $firstChar = strtolower(substr($str, 0, 1));
        $index = ord($firstChar) - $minOrd;
        $buckets[$index][] = $str;
    }
    
    $sorted = [];
    foreach ($buckets as &amp;$bucket) {
        rsort($bucket);
        $sorted = array_merge($sorted, $bucket);
    }
    
    return array_reverse($sorted);
}

$names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
$sorted = bucketSortStringsDesc($names);

print_r($sorted);

We use rsort() for buckets and array_reverse() for 
the final result to get descending alphabetical order.

## Bucket Sort vs Quick Sort Benchmark

Let's compare performance between bucket sort and quick sort for large datasets.

benchmark.php
  

&lt;?php

function quickSort(array $array): array {
    if (count($array) &lt; 2) {
        return $array;
    }
    
    $pivot = $array[0];
    $less = $greater = [];
    
    for ($i = 1; $i &lt; count($array); $i++) {
        if ($array[$i] &lt;= $pivot) {
            $less[] = $array[$i];
        } else {
            $greater[] = $array[$i];
        }
    }
    
    return array_merge(quickSort($less), [$pivot], quickSort($greater));
}

// Generate large random dataset
$largeData = [];
for ($i = 0; $i &lt; 10000; $i++) {
    $largeData[] = mt_rand(0, 10000) / 100;
}

// Benchmark bucket sort
$start = microtime(true);
bucketSort($largeData);
$bucketTime = microtime(true) - $start;

// Benchmark quick sort
$start = microtime(true);
quickSort($largeData);
$quickTime = microtime(true) - $start;

echo "Bucket Sort Time: " . number_format($bucketTime, 6) . " seconds\n";
echo "Quick Sort Time: " . number_format($quickTime, 6) . " seconds\n";

Results will vary, but typically quick sort outperforms bucket sort for 
general cases. Bucket sort excels when data is uniformly distributed.

## When to Use Bucket Sort

- **Uniform Distribution:** When input is uniformly distributed

- **Known Range:** When data range is known in advance

- **Floating Points:** Particularly effective for floating-point numbers

- **External Sorting:** Useful for external sorting scenarios

## Source

[PHP Sorting Functions](https://www.php.net/manual/en/function.sort.php)

This tutorial covered PHP implementation of bucket sort with examples for 
both numeric and textual data in ascending and descending order.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).