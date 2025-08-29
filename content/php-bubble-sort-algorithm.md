+++
title = "PHP Bubble Sort Algorithm"
date = 2025-08-29T20:04:12.470+01:00
draft = false
description = "PHP Bubble Sort algorithm tutorial with examples for sorting numeric and textual data in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Bubble Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem
or perform a computation. In programming, algorithms are implemented as
functions or methods.

**Sorting** is arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for optimizing other
algorithms that require sorted input.

Common sorting algorithms include:

- Bubble Sort

- Quick Sort

- Merge Sort

- Insertion Sort

- Selection Sort

- Heap Sort

## Bubble Sort Algorithm

Bubble Sort is a simple comparison-based algorithm. It repeatedly steps
through the list, compares adjacent elements and swaps them if they are
in the wrong order.

The algorithm gets its name because smaller elements "bubble" to the top
of the list. It has O(n²) time complexity, making it inefficient for large
datasets.

## Basic Bubble Sort Implementation

Here's a basic implementation of Bubble Sort in PHP for numeric data:

bubble_sort.php
  

&lt;?php

function bubbleSort(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        for ($j = 0; $j &lt; $n - $i - 1; $j++) {
            if ($arr[$j] &gt; $arr[$j + 1]) {
                // Swap elements
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    
    return $arr;
}

$numbers = [64, 34, 25, 12, 22, 11, 90];
$sorted = bubbleSort($numbers);

print_r($sorted);
// Output: Array ( [0] =&gt; 11 [1] =&gt; 12 [2] =&gt; 22 [3] =&gt; 25 [4] =&gt; 34 [5] =&gt; 64 [6] =&gt; 90 )

## Optimized Bubble Sort

We can optimize Bubble Sort by adding a flag to check if any swaps were
made in a pass. If no swaps occur, the array is already sorted.

optimized_bubble.php
  

&lt;?php

function optimizedBubbleSort(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        $swapped = false;
        
        for ($j = 0; $j &lt; $n - $i - 1; $j++) {
            if ($arr[$j] &gt; $arr[$j + 1]) {
                // Swap elements
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
                $swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!$swapped) break;
    }
    
    return $arr;
}

$numbers = [5, 1, 4, 2, 8];
$sorted = optimizedBubbleSort($numbers);

print_r($sorted);
// Output: Array ( [0] =&gt; 1 [1] =&gt; 2 [2] =&gt; 4 [3] =&gt; 5 [4] =&gt; 8 )

## Sorting in Descending Order

To sort in descending order, we simply reverse the comparison condition.

descending_bubble.php
  

&lt;?php

function bubbleSortDesc(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        for ($j = 0; $j &lt; $n - $i - 1; $j++) {
            if ($arr[$j] &lt; $arr[$j + 1]) {  // Changed comparison operator
                // Swap elements
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    
    return $arr;
}

$numbers = [64, 34, 25, 12, 22, 11, 90];
$sorted = bubbleSortDesc($numbers);

print_r($sorted);
// Output: Array ( [0] =&gt; 90 [1] =&gt; 64 [2] =&gt; 34 [3] =&gt; 25 [4] =&gt; 22 [5] =&gt; 12 [6] =&gt; 11 )

## Sorting Textual Data

Bubble Sort can also sort strings alphabetically by comparing them with
the strcmp function.

text_bubble.php
  

&lt;?php

function bubbleSortText(array $arr): array {
    $n = count($arr);
    
    for ($i = 0; $i &lt; $n - 1; $i++) {
        for ($j = 0; $j &lt; $n - $i - 1; $j++) {
            if (strcmp($arr[$j], $arr[$j + 1]) &gt; 0) {
                // Swap elements
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    
    return $arr;
}

$names = ["John", "Alice", "Bob", "Eve", "David"];
$sorted = bubbleSortText($names);

print_r($sorted);
// Output: Array ( [0] =&gt; Alice [1] =&gt; Bob [2] =&gt; David [3] =&gt; Eve [4] =&gt; John )

## Bubble Sort vs Quick Sort Benchmark

Let's compare Bubble Sort with the more efficient Quick Sort algorithm.
We'll measure execution time for sorting large arrays.

sort_benchmark.php
  

&lt;?php

function bubbleSort(array $arr): array {
    $n = count($arr);
    for ($i = 0; $i &lt; $n - 1; $i++) {
        for ($j = 0; $j &lt; $n - $i - 1; $j++) {
            if ($arr[$j] &gt; $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
    return $arr;
}

function quickSort(array $arr): array {
    if (count($arr) &lt;= 1) return $arr;
    
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
$largeArray = range(1, 2000);
shuffle($largeArray);

// Benchmark Bubble Sort
$start = microtime(true);
bubbleSort($largeArray);
$bubbleTime = microtime(true) - $start;

// Benchmark Quick Sort
$start = microtime(true);
quickSort($largeArray);
$quickTime = microtime(true) - $start;

printf("Bubble Sort time: %.4f seconds\n", $bubbleTime);
printf("Quick Sort time: %.4f seconds\n", $quickTime);

// Typical output:
// Bubble Sort time: 1.2345 seconds
// Quick Sort time: 0.0123 seconds

The benchmark clearly shows Quick Sort's superior performance for large
datasets. Bubble Sort's O(n²) complexity makes it impractical for large
arrays, while Quick Sort's O(n log n) performs much better.

## When to Use Bubble Sort

Despite its inefficiency, Bubble Sort has some use cases:

- Educational purposes to understand sorting algorithms

- When simplicity is more important than performance

- For nearly sorted data (with the optimized version)

- When working with very small datasets

## Source

[PHP Sorting Functions](https://www.php.net/manual/en/function.usort.php)

This tutorial covered the Bubble Sort algorithm in PHP with examples for
both numeric and textual data, including performance comparisons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).