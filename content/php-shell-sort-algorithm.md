+++
title = "PHP Shell Sort Algorithm"
date = 2025-08-29T20:04:43.824+01:00
draft = false
description = "PHP Shell Sort algorithm tutorial with examples for numeric and textual data sorting in ascending and descending order."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Shell Sort Algorithm

last modified April 16, 2025

## Basic Definitions

An **algorithm** is a step-by-step procedure to solve a problem
or perform a computation. In programming, algorithms are implemented as
functions or methods.

**Sorting** is arranging data in a particular order, typically
ascending or descending. Efficient sorting is crucial for optimizing other
algorithms like search operations.

Common sorting algorithms include:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

- Shell Sort

## Shell Sort Overview

Shell Sort is an optimization of Insertion Sort that allows exchange of items
that are far apart. It works by sorting elements at specific intervals, then
reducing the interval until it becomes 1.

The algorithm was invented by Donald Shell in 1959. Its time complexity varies
based on the gap sequence used, typically between O(n) and O(n²).

## Shell Sort Implementation

Here's a basic implementation of Shell Sort in PHP for numeric data:

shell_sort.php
  

&lt;?php

function shellSort(array $arr): array {
    $n = count($arr);
    $gap = floor($n / 2);
    
    while ($gap &gt; 0) {
        for ($i = $gap; $i &lt; $n; $i++) {
            $temp = $arr[$i];
            $j = $i;
            
            while ($j &gt;= $gap &amp;&amp; $arr[$j - $gap] &gt; $temp) {
                $arr[$j] = $arr[$j - $gap];
                $j -= $gap;
            }
            
            $arr[$j] = $temp;
        }
        
        $gap = floor($gap / 2);
    }
    
    return $arr;
}

$numbers = [12, 34, 54, 2, 3];
$sorted = shellSort($numbers);
print_r($sorted);

This implementation sorts numbers in ascending order. The gap starts at half
the array length and halves each iteration until it reaches 0.

## Sorting Textual Data

Shell Sort can also sort strings alphabetically. Here's an example:

shell_sort_strings.php
  

&lt;?php

function shellSortStrings(array $arr): array {
    $n = count($arr);
    $gap = floor($n / 2);
    
    while ($gap &gt; 0) {
        for ($i = $gap; $i &lt; $n; $i++) {
            $temp = $arr[$i];
            $j = $i;
            
            while ($j &gt;= $gap &amp;&amp; strcmp($arr[$j - $gap], $temp) &gt; 0) {
                $arr[$j] = $arr[$j - $gap];
                $j -= $gap;
            }
            
            $arr[$j] = $temp;
        }
        
        $gap = floor($gap / 2);
    }
    
    return $arr;
}

$names = ["apple", "orange", "banana", "pear"];
$sortedNames = shellSortStrings($names);
print_r($sortedNames);

This version uses strcmp to compare strings. It sorts the array
in ascending alphabetical order.

## Descending Order Sorting

To sort in descending order, we simply reverse the comparison condition:

shell_sort_desc.php
  

&lt;?php

function shellSortDesc(array $arr): array {
    $n = count($arr);
    $gap = floor($n / 2);
    
    while ($gap &gt; 0) {
        for ($i = $gap; $i &lt; $n; $i++) {
            $temp = $arr[$i];
            $j = $i;
            
            while ($j &gt;= $gap &amp;&amp; $arr[$j - $gap] &lt; $temp) {
                $arr[$j] = $arr[$j - $gap];
                $j -= $gap;
            }
            
            $arr[$j] = $temp;
        }
        
        $gap = floor($gap / 2);
    }
    
    return $arr;
}

$numbers = [12, 34, 54, 2, 3];
$sortedDesc = shellSortDesc($numbers);
print_r($sortedDesc);

The only change is the comparison operator from &gt; to &lt;.
This makes the algorithm sort in descending order.

## Shell Sort vs Quick Sort

Let's compare Shell Sort with Quick Sort, one of the fastest sorting algorithms.
We'll benchmark both with a large array.

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

// Shell Sort benchmark
$start = microtime(true);
shellSort($largeArray);
$shellTime = microtime(true) - $start;

// Quick Sort benchmark
$start = microtime(true);
quickSort($largeArray);
$quickTime = microtime(true) - $start;

echo "Shell Sort time: " . number_format($shellTime, 6) . " seconds\n";
echo "Quick Sort time: " . number_format($quickTime, 6) . " seconds\n";

On a typical run, Quick Sort will be faster than Shell Sort for large datasets.
However, Shell Sort has advantages when dealing with medium-sized arrays or
when memory is a constraint, as it's an in-place sorting algorithm.

## When to Use Shell Sort

**Medium-sized arrays:** Shell Sort performs well on arrays
that are too large for simple sorts but not huge.
**Memory constraints:** As an in-place algorithm, it uses
minimal additional memory.
**Partially sorted data:** It can be efficient when the data
is already somewhat ordered.

## Source

[Shellsort on Wikipedia](https://en.wikipedia.org/wiki/Shellsort)

This tutorial covered the Shell Sort algorithm in PHP with examples for both
numeric and textual data, including performance comparison with Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).