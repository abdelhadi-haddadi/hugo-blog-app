+++
title = "PHP array_intersect Function"
date = 2025-08-29T20:05:01.165+01:00
draft = false
description = "PHP array_intersect function tutorial shows how to find common array elements in PHP. Learn array_intersect with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_intersect Function

last modified March 13, 2025

The PHP array_intersect function compares arrays and returns
values present in all arrays. It's useful for finding common elements.

## Basic Definition

The array_intersect function computes the intersection of arrays.
It returns an array containing all values present in all input arrays.

Syntax: array_intersect(array $array1, array $array2, ...): array.
Keys are preserved from the first array. Comparison is done using loose typing.

## Basic array_intersect Example

This shows finding common numbers between two simple arrays.

basic_array_intersect.php
  

&lt;?php

$array1 = [1, 2, 3, 4, 5];
$array2 = [3, 4, 5, 6, 7];

$result = array_intersect($array1, $array2);

print_r($result);

This finds numbers present in both arrays. The result contains 3, 4, and 5
with their original keys from the first array preserved.

## String Value Intersection

Find common string values between multiple arrays.

string_intersection.php
  

&lt;?php

$colors1 = ["red", "green", "blue"];
$colors2 = ["green", "blue", "yellow"];
$colors3 = ["blue", "purple", "green"];

$commonColors = array_intersect($colors1, $colors2, $colors3);

print_r($commonColors);

This finds colors present in all three arrays. Only "green" and "blue" appear
in all input arrays, so they are returned with their original keys.

## Associative Array Intersection

Find common values in associative arrays while preserving keys.

associative_intersect.php
  

&lt;?php

$users1 = [
    "admin" =&gt; "Alice",
    "editor" =&gt; "Bob",
    "viewer" =&gt; "Charlie"
];

$users2 = [
    "manager" =&gt; "Alice",
    "editor" =&gt; "Bob",
    "guest" =&gt; "Dave"
];

$commonUsers = array_intersect($users1, $users2);

print_r($commonUsers);

This finds common values in associative arrays. The keys from the first array
are preserved in the result, showing Alice and Bob are common to both arrays.

## Mixed Type Comparison

Demonstrate how array_intersect handles different types with loose comparison.

mixed_types.php
  

&lt;?php

$array1 = [1, "2", 3, "4", true];
$array2 = ["1", 2, "3", 4, false];

$result = array_intersect($array1, $array2);

print_r($result);

This shows loose type comparison. The string "1" equals integer 1, and "3"
equals 3, so these values are included in the result despite type differences.

## Multiple Array Intersection

Find common elements across more than two arrays.

multiple_arrays.php
  

&lt;?php

$array1 = [10, 20, 30, 40, 50];
$array2 = [20, 30, 50, 60];
$array3 = [10, 20, 30, 70];
$array4 = [20, 30, 80, 90];

$common = array_intersect($array1, $array2, $array3, $array4);

print_r($common);

This finds values present in all four arrays. Only 20 and 30 appear in every
input array, so they are returned with their original keys from the first array.

## Best Practices

- **Type Awareness:** Be mindful of loose comparison behavior.

- **Key Preservation:** Remember keys come from first array.

- **Performance:** For large arrays, consider sorting first.

- **Strict Comparison:** Use array_uintersect for strict checks.

## Source

[PHP array_intersect Documentation](https://www.php.net/manual/en/function.array-intersect.php)

This tutorial covered the PHP array_intersect function with
practical examples showing its usage for finding common array elements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).