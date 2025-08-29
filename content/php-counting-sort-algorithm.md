+++
title = "PHP Counting Sort Algorithm"
date = 2025-08-29T20:04:17.470+01:00
draft = false
description = "PHP counting sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Counting Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An algorithm is a step-by-step procedure to solve a problem or perform a
computation. Sorting algorithms arrange elements in a specific order.

Common sorting algorithms include bubble sort, selection sort, insertion sort,
merge sort, quick sort, heap sort, and counting sort. Each has different
performance characteristics.

## Counting Sort Overview

Counting sort is an integer sorting algorithm that works by counting the
number of objects with distinct key values. It operates in O(n + k) time,
where n is the number of elements and k is the range of input.

Counting sort is efficient when the range of input data (k) is not
significantly greater than the number of objects (n). It's not a comparison
sort and can be faster than O(n log n) algorithms in these cases.

## Counting Sort Implementation

Here's a basic counting sort implementation for positive integers in PHP.

counting_sort.php
  

&lt;?php

function countingSort(array $array): array {
    $max = max($array);
    $count = array_fill(0, $max + 1, 0);
    
    foreach ($array as $num) {
        $count[$num]++;
    }
    
    $sorted = [];
    for ($i = 0; $i &lt;= $max; $i++) {
        while ($count[$i]-- &gt; 0) {
            $sorted[] = $i;
        }
    }
    
    return $sorted;
}

$numbers = [4, 2, 2, 8, 3, 3, 1];
$sorted = countingSort($numbers);

print_r($sorted); // Outputs: [1, 2, 2, 3, 3, 4, 8]

This implementation first counts occurrences of each number, then reconstructs
the sorted array from the counts. It works well for small integer ranges.

## Counting Sort with Negative Numbers

Here's an enhanced version that handles negative numbers by adjusting indices.

counting_sort_negative.php
  

&lt;?php

function countingSort(array $array): array {
    $min = min($array);
    $max = max($array);
    $range = $max - $min + 1;
    
    $count = array_fill(0, $range, 0);
    
    foreach ($array as $num) {
        $count[$num - $min]++;
    }
    
    $sorted = [];
    for ($i = 0; $i &lt; $range; $i++) {
        while ($count[$i]-- &gt; 0) {
            $sorted[] = $i + $min;
        }
    }
    
    return $sorted;
}

$numbers = [-5, 2, -3, 8, 0, -1, 2];
$sorted = countingSort($numbers);

print_r($sorted); // Outputs: [-5, -3, -1, 0, 2, 2, 8]

The algorithm adjusts indices by subtracting the minimum value, allowing it to
handle negative numbers while maintaining O(n + k) time complexity.

## Descending Order Counting Sort

To sort in descending order, we simply iterate the count array in reverse.

counting_sort_desc.php
  

&lt;?php

function countingSortDesc(array $array): array {
    $max = max($array);
    $count = array_fill(0, $max + 1, 0);
    
    foreach ($array as $num) {
        $count[$num]++;
    }
    
    $sorted = [];
    for ($i = $max; $i &gt;= 0; $i--) {
        while ($count[$i]-- &gt; 0) {
            $sorted[] = $i;
        }
    }
    
    return $sorted;
}

$numbers = [4, 2, 2, 8, 3, 3, 1];
$sorted = countingSortDesc($numbers);

print_r($sorted); // Outputs: [8, 4, 3, 3, 2, 2, 1]

The only change from ascending order is the loop direction when building the
sorted array. This maintains the same time complexity as the ascending version.

## Counting Sort for Textual Data

Counting sort can be adapted for textual data by using character codes as keys.

counting_sort_text.php
  

&lt;?php

function countingSortText(string $str): string {
    $chars = str_split($str);
    $max = max(array_map('ord', $chars));
    $min = min(array_map('ord', $chars));
    $range = $max - $min + 1;
    
    $count = array_fill(0, $range, 0);
    
    foreach ($chars as $char) {
        $count[ord($char) - $min]++;
    }
    
    $sorted = '';
    for ($i = 0; $i &lt; $range; $i++) {
        while ($count[$i]-- &gt; 0) {
            $sorted .= chr($i + $min);
        }
    }
    
    return $sorted;
}

$text = "counting sort";
$sorted = countingSortText($text);

echo $sorted; // Outputs: " cgiinnoorsttu"

This version converts characters to their ASCII values for counting. Note that
it preserves spaces and is case-sensitive (uppercase comes before lowercase).

## Performance Comparison: Counting Sort vs Quick Sort

Let's compare counting sort with PHP's built-in quick sort implementation.

sort_benchmark.php
  

&lt;?php

function generateRandomArray(int $size, int $min, int $max): array {
    return array_map(fn() =&gt; rand($min, $max), array_fill(0, $size, 0));
}

function benchmark(callable $func, array $array): float {
    $start = microtime(true);
    $func($array);
    return microtime(true) - $start;
}

$smallRange = generateRandomArray(10000, 0, 100);
$largeRange = generateRandomArray(10000, 0, 1000000);

$countingTimeSmall = benchmark('countingSort', $smallRange);
$quickTimeSmall = benchmark('sort', $smallRange);

$countingTimeLarge = benchmark('countingSort', $largeRange);
$quickTimeLarge = benchmark('sort', $largeRange);

echo "Small range (0-100):\n";
echo "Counting sort: " . number_format($countingTimeSmall, 6) . "s\n";
echo "Quick sort: " . number_format($quickTimeSmall, 6) . "s\n\n";

echo "Large range (0-1000000):\n";
echo "Counting sort: " . number_format($countingTimeLarge, 6) . "s\n";
echo "Quick sort: " . number_format($quickTimeLarge, 6) . "s\n";

Results will vary, but typically counting sort is faster for small ranges,
while quick sort performs better with large ranges. Counting sort's memory
usage grows with the range size, making it less efficient for large ranges.

## When to Use Counting Sort

- **Small Integer Ranges:** Best when k is O(n) or smaller.

- **Stable Sort Needed:** Can be implemented as a stable sort.

- **Non-comparison:** Useful when comparison cost is high.

- **Known Range:** Requires prior knowledge of data range.

## Limitations of Counting Sort

- **Integer Data:** Works best with integer keys.

- **Memory Usage:** Requires O(k) additional memory.

- **Large Ranges:** Inefficient for widely dispersed data.

- **Negative Numbers:** Requires adjustments to handle.

## Source

[Counting Sort on Wikipedia](https://en.wikipedia.org/wiki/Counting_sort)

This tutorial covered the counting sort algorithm in PHP with examples for
numeric and textual data, including performance comparisons with quick sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).