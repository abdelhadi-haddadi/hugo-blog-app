+++
title = "PHP Radix Sort Algorithm"
date = 2025-08-29T20:04:40.408+01:00
draft = false
description = "PHP radix sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Radix Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order.

Common sorting algorithms include bubble sort, selection sort, insertion sort,
merge sort, quick sort, heap sort, and radix sort. Each has different time and
space complexity characteristics.

## Radix Sort Overview

Radix sort is a non-comparative integer sorting algorithm. It processes digits
by grouping numbers by each digit, from least significant to most significant.

Radix sort has O(nk) time complexity, where n is the number of elements and k
is the number of digits in the longest number. It's efficient for large datasets.

## Numeric Radix Sort (Ascending)

This example demonstrates radix sort for positive integers in ascending order.

numeric_radix_sort.php
  

&lt;?php

function radixSort(array $arr): array {
    $maxDigits = max(array_map('strlen', array_map('strval', $arr)));
    
    for ($digit = 0; $digit &lt; $maxDigits; $digit++) {
        $buckets = array_fill(0, 10, []);
        
        foreach ($arr as $num) {
            $digitVal = (int) (($num / (10 ** $digit)) % 10);
            $buckets[$digitVal][] = $num;
        }
        
        $arr = array_merge(...$buckets);
    }
    
    return $arr;
}

$numbers = [170, 45, 75, 90, 802, 24, 2, 66];
$sorted = radixSort($numbers);

print_r($sorted); // [2, 24, 45, 66, 75, 90, 170, 802]

The algorithm processes each digit position, distributing numbers into buckets
based on the current digit, then collects them in order.

## Numeric Radix Sort (Descending)

This modified version sorts numbers in descending order by reversing bucket order.

numeric_radix_sort_desc.php
  

&lt;?php

function radixSortDesc(array $arr): array {
    $maxDigits = max(array_map('strlen', array_map('strval', $arr)));
    
    for ($digit = 0; $digit &lt; $maxDigits; $digit++) {
        $buckets = array_fill(0, 10, []);
        
        foreach ($arr as $num) {
            $digitVal = (int) (($num / (10 ** $digit)) % 10);
            $buckets[$digitVal][] = $num;
        }
        
        $arr = array_merge(...array_reverse($buckets));
    }
    
    return $arr;
}

$numbers = [170, 45, 75, 90, 802, 24, 2, 66];
$sorted = radixSortDesc($numbers);

print_r($sorted); // [802, 170, 90, 75, 66, 45, 24, 2]

The only change from ascending sort is reversing the buckets before merging.
This gives us the descending order result.

## String Radix Sort (Ascending)

Radix sort can also sort strings alphabetically by processing characters.

string_radix_sort.php
  

&lt;?php

function stringRadixSort(array $arr): array {
    $maxLength = max(array_map('strlen', $arr));
    
    for ($pos = $maxLength - 1; $pos &gt;= 0; $pos--) {
        $buckets = array_fill(0, 256, []);
        
        foreach ($arr as $str) {
            $char = $pos &lt; strlen($str) ? ord($str[$pos]) : 0;
            $buckets[$char][] = $str;
        }
        
        $arr = array_merge(...$buckets);
    }
    
    return $arr;
}

$words = ["apple", "banana", "kiwi", "orange", "pear"];
$sorted = stringRadixSort($words);

print_r($sorted); // ["apple", "banana", "kiwi", "orange", "pear"]

This processes strings from right to left, using ASCII values for character
comparison. Shorter strings are treated as having null characters.

## String Radix Sort (Descending)

For descending alphabetical order, we reverse the bucket merging order.

string_radix_sort_desc.php
  

&lt;?php

function stringRadixSortDesc(array $arr): array {
    $maxLength = max(array_map('strlen', $arr));
    
    for ($pos = $maxLength - 1; $pos &gt;= 0; $pos--) {
        $buckets = array_fill(0, 256, []);
        
        foreach ($arr as $str) {
            $char = $pos &lt; strlen($str) ? ord($str[$pos]) : 0;
            $buckets[$char][] = $str;
        }
        
        $arr = array_merge(...array_reverse($buckets));
    }
    
    return $arr;
}

$words = ["apple", "banana", "kiwi", "orange", "pear"];
$sorted = stringRadixSortDesc($words);

print_r($sorted); // ["pear", "orange", "kiwi", "banana", "apple"]

The descending version reverses the buckets before merging, similar to the
numeric descending sort implementation.

## Radix Sort vs Quick Sort Benchmark

Let's compare radix sort with quick sort performance on large datasets.

sort_benchmark.php
  

&lt;?php

function generateRandomNumbers(int $count): array {
    $numbers = [];
    for ($i = 0; $i &lt; $count; $i++) {
        $numbers[] = rand(1000, 999999);
    }
    return $numbers;
}

function benchmark(callable $sortFunc, array $data): float {
    $start = microtime(true);
    $sortFunc($data);
    return microtime(true) - $start;
}

$largeDataset = generateRandomNumbers(100000);

$radixTime = benchmark('radixSort', $largeDataset);
$quickTime = benchmark(function($arr) { sort($arr); }, $largeDataset);

echo "Radix sort time: " . number_format($radixTime, 4) . " seconds\n";
echo "Quick sort time: " . number_format($quickTime, 4) . " seconds\n";

On a typical test with 100,000 numbers, radix sort often outperforms quick sort
for integer data, especially when numbers have limited digit lengths.

## When to Use Radix Sort

- **Fixed-width keys:** Ideal for sorting numbers or fixed-length strings

- **Large datasets:** Efficient O(n) performance for suitable data

- **Stable sort needed:** Maintains relative order of equal elements

- **Integer sorting:** Particularly effective for integer data types

## Limitations of Radix Sort

- **Data constraints:** Works best with fixed-size keys

- **Memory usage:** Requires additional space for buckets

- **Negative numbers:** Needs special handling for signed integers

- **Floating points:** Not directly suitable for floating-point numbers

## Source

[Radix Sort on Wikipedia](https://en.wikipedia.org/wiki/Radix_sort)

This tutorial covered the radix sort algorithm in PHP with examples for both
numeric and textual data in ascending and descending order.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).