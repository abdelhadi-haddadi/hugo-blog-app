+++
title = "PHP rsort Function"
date = 2025-08-29T20:05:23.547+01:00
draft = false
description = "PHP rsort function tutorial shows how to sort arrays in descending order in PHP. Learn rsort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP rsort Function

last modified March 13, 2025

The PHP rsort function sorts an array in descending order. It
modifies the original array and returns a boolean indicating success.

## Basic Definition

The rsort function sorts an array by values in reverse order.
It maintains index association for associative arrays but resets numeric keys.

Syntax: rsort(array &amp;$array, int $flags = SORT_REGULAR): bool. The
function returns true on success, false on failure. The array is passed by
reference.

## Basic rsort Example

This demonstrates sorting a simple numeric array in descending order.

basic_rsort.php
  

&lt;?php

$numbers = [3, 1, 4, 1, 5, 9, 2, 6];
rsort($numbers);

print_r($numbers);

The array is sorted from highest to lowest value. The original array is
modified, and numeric keys are reindexed starting from 0.

## Sorting Strings with rsort

The rsort function can also sort string arrays alphabetically
in reverse order.

string_rsort.php
  

&lt;?php

$fruits = ["apple", "Orange", "banana", "cherry"];
rsort($fruits);

print_r($fruits);

Strings are sorted in reverse alphabetical order. Note that uppercase letters
come before lowercase in ASCII order, affecting the sort result.

## Using Sorting Flags

The second parameter allows specifying sorting behavior with various flags.

rsort_flags.php
  

&lt;?php

$mixed = ["10", 2, "1", 20];
rsort($mixed, SORT_NUMERIC);

print_r($mixed);

Using SORT_NUMERIC treats values as numbers during comparison.
String numbers are converted to numeric values for proper numerical sorting.

## Associative Array Behavior

With associative arrays, rsort maintains value-key association
but resets numeric keys.

assoc_rsort.php
  

&lt;?php

$prices = [
    "apple" =&gt; 1.2,
    "banana" =&gt; 0.5,
    "orange" =&gt; 0.8
];
rsort($prices);

print_r($prices);

The values are sorted in descending order, but string keys are lost. Only the
values remain with new numeric indices.

## Case-Insensitive Sorting

Combine rsort with strcasecmp for case-insensitive
sorting of string arrays.

case_insensitive_rsort.php
  

&lt;?php

$words = ["Apple", "banana", "cherry", "apricot"];
rsort($words, SORT_STRING | SORT_FLAG_CASE);

print_r($words);

The SORT_FLAG_CASE flag makes the sorting case-insensitive.
"Apple" and "apricot" are properly ordered despite different cases.

## Best Practices

- **Preserve Keys:** Use arsort to keep key-value associations.

- **Memory Usage:** Be aware rsort modifies the original array.

- **Custom Sorting:** For complex sorts, consider usort.

- **Large Arrays:** Test performance with very large datasets.

## Source

[PHP rsort Documentation](https://www.php.net/manual/en/function.rsort.php)

This tutorial covered the PHP rsort function with practical
examples showing its usage for sorting arrays in descending order.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).