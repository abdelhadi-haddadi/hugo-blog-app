+++
title = "PHP krsort Function"
date = 2025-08-29T20:05:18.918+01:00
draft = false
description = "PHP krsort function tutorial shows how to sort arrays by key in reverse order in PHP. Learn krsort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP krsort Function

last modified March 13, 2025

The PHP krsort function sorts an array by key in reverse order.
It maintains index association, making it ideal for associative arrays.

## Basic Definition

The krsort function sorts an array by keys in descending order.
It returns true on success and false on failure. The sorting is done in-place.

Syntax: krsort(array &amp;$array, int $flags = SORT_REGULAR): bool.
The optional $flags parameter modifies the sorting behavior.

## Basic krsort Example

This demonstrates sorting an associative array by keys in reverse order.

basic_krsort.php
  

&lt;?php

$fruits = [
    "d" =&gt; "lemon",
    "a" =&gt; "orange",
    "b" =&gt; "banana",
    "c" =&gt; "apple"
];

krsort($fruits);

foreach ($fruits as $key =&gt; $val) {
    echo "$key = $val\n";
}

Output: d = lemon c = apple b = banana a = orange. The array is
sorted by keys in reverse alphabetical order while maintaining key-value pairs.

## Sorting Numeric Keys

krsort can sort arrays with numeric keys in descending order.

numeric_keys.php
  

&lt;?php

$numbers = [
    10 =&gt; "ten",
    2 =&gt; "two",
    5 =&gt; "five",
    8 =&gt; "eight"
];

krsort($numbers);

print_r($numbers);

Output shows keys sorted in descending numeric order: 10, 8, 5, 2.
The function correctly handles numeric comparisons when sorting the keys.

## Using Sorting Flags

The $flags parameter changes how keys are compared during sorting.

sorting_flags.php
  

&lt;?php

$mixed = [
    "10" =&gt; "ten",
    "2" =&gt; "two",
    "5" =&gt; "five",
    "8" =&gt; "eight"
];

krsort($mixed, SORT_NUMERIC);

print_r($mixed);

With SORT_NUMERIC, string keys are treated as numbers. Output shows
proper numeric ordering: 10, 8, 5, 2 despite being string keys.

## Sorting Multi-dimensional Arrays

krsort can sort arrays with complex keys like arrays or objects.

multi_dimensional.php
  

&lt;?php

$items = [
    ["id" =&gt; 3, "name" =&gt; "C"],
    ["id" =&gt; 1, "name" =&gt; "A"],
    ["id" =&gt; 4, "name" =&gt; "D"],
    ["id" =&gt; 2, "name" =&gt; "B"]
];

// Create keys from id values
$keyed = array_column($items, null, "id");

krsort($keyed);

print_r($keyed);

This first creates an array with IDs as keys, then sorts them in reverse order.
The output shows items sorted by ID in descending order (4, 3, 2, 1).

## Case-Insensitive Sorting

Combine krsort with array_change_key_case for case-insensitive sorting.

case_insensitive.php
  

&lt;?php

$colors = [
    "Red" =&gt; "#FF0000",
    "GREEN" =&gt; "#00FF00",
    "blue" =&gt; "#0000FF",
    "Yellow" =&gt; "#FFFF00"
];

// Convert keys to lowercase for consistent sorting
$lowerKeys = array_change_key_case($colors, CASE_LOWER);
krsort($lowerKeys);

print_r($lowerKeys);

This converts all keys to lowercase before sorting. Output shows keys sorted
in reverse alphabetical order: yellow, red, green, blue (case-insensitive).

## Best Practices

- **Associative Arrays:** Use krsort primarily with associative arrays.

- **Performance:** Be mindful with large arrays as it sorts in-place.

- **Flags:** Choose appropriate sorting flags for your data type.

- **Stability:** Remember that krsort is not a stable sort.

## Source

[PHP krsort Documentation](https://www.php.net/manual/en/function.krsort.php)

This tutorial covered the PHP krsort function with practical
examples showing its usage for reverse key sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).