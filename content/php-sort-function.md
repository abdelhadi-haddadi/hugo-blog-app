+++
title = "PHP sort Function"
date = 2025-08-29T20:05:24.665+01:00
draft = false
description = "PHP sort function tutorial shows how to sort arrays in PHP. Learn sort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP sort Function

last modified March 13, 2025

The PHP sort function sorts an array in ascending order. It
modifies the original array and returns true on success.

## Basic Definition

The sort function sorts an array by values in ascending order.
It maintains index association for associative arrays by default.

Syntax: sort(array &amp;$array, int $flags = SORT_REGULAR): bool. The
flags parameter modifies the sorting behavior. The function returns true.

## Basic sort Example

This demonstrates sorting a simple numeric array in ascending order.

basic_sort.php
  

&lt;?php

$numbers = [3, 1, 4, 1, 5, 9, 2, 6];
sort($numbers);

print_r($numbers);

The array is sorted in ascending order. Note that the original array is
modified, and numeric indices are reordered starting from 0.

## Sorting String Arrays

The sort function works with string arrays using alphabetical order.

string_sort.php
  

&lt;?php

$fruits = ["banana", "apple", "orange", "pear"];
sort($fruits);

print_r($fruits);

Strings are sorted alphabetically. The sorting is case-sensitive, with
uppercase letters coming before lowercase ones in default sorting.

## Sorting With Flags

PHP provides sorting flags to modify the sorting behavior. This example uses
SORT_NUMERIC for proper numeric comparison.

sort_flags.php
  

&lt;?php

$mixed = ["10", 2, "100", 5, 1];
sort($mixed, SORT_NUMERIC);

print_r($mixed);

With SORT_NUMERIC, string numbers are properly compared as
numeric values. Without this flag, they would be compared as strings.

## Sorting Associative Arrays

Sorting associative arrays with sort loses the original keys.

associative_sort.php
  

&lt;?php

$ages = ["Peter" =&gt; 35, "Ben" =&gt; 37, "Joe" =&gt; 43];
sort($ages);

print_r($ages);

The keys are replaced with numeric indices. To preserve key-value
association, use asort instead of sort.

## Case-Insensitive Sorting

Use SORT_STRING | SORT_FLAG_CASE for case-insensitive sorting.

case_insensitive_sort.php
  

&lt;?php

$names = ["John", "alice", "bob", "Alice"];
sort($names, SORT_STRING | SORT_FLAG_CASE);

print_r($names);

The combination of flags enables case-insensitive comparison. Note that
original case is preserved in the sorted array, only comparison changes.

## Best Practices

- **Preserve Keys:** Use asort for associative arrays.

- **Flag Selection:** Choose appropriate flags for data type.

- **Copy Arrays:** Make a copy if you need the original order.

- **Large Arrays:** Consider usort for complex sorts.

## Source

[PHP sort Documentation](https://www.php.net/manual/en/function.sort.php)

This tutorial covered the PHP sort function with practical
examples showing its usage for various sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).