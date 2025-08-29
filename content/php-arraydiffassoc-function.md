+++
title = "PHP array_diff_assoc Function"
date = 2025-08-29T20:04:56.627+01:00
draft = false
description = "PHP array_diff_assoc function tutorial shows how to compare arrays with key checks in PHP. Learn array_diff_assoc with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_diff_assoc Function

last modified March 13, 2025

The PHP array_diff_assoc function compares arrays and returns
differences with key checks. It's useful for finding mismatches in both
keys and values.

## Basic Definition

The array_diff_assoc function compares arrays and returns
differences. It checks both keys and values, unlike array_diff.

Syntax: array_diff_assoc(array $array1, array $array2, ...): array.
It returns elements from $array1 not present in other arrays. Comparison is
strict (===).

## Basic array_diff_assoc Example

This shows simple comparison of two arrays with both key and value checks.

basic_array_diff_assoc.php
  

&lt;?php

$array1 = ["a" =&gt; "apple", "b" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["a" =&gt; "apple", "b" =&gt; "blueberry", "c" =&gt; "cherry"];

$result = array_diff_assoc($array1, $array2);

print_r($result);

This compares two arrays and finds differences. The output will be:
Array ( [b] =&gt; banana ) because the "b" key has different
values in both arrays.

## Comparing Multiple Arrays

array_diff_assoc can compare more than two arrays at once.

multiple_arrays.php
  

&lt;?php

$array1 = ["a" =&gt; "apple", "b" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["a" =&gt; "apple", "b" =&gt; "banana"];
$array3 = ["a" =&gt; "apple", "c" =&gt; "cherry"];

$result = array_diff_assoc($array1, $array2, $array3);

print_r($result);

This compares three arrays. The output will be empty because all elements
in $array1 exist in at least one of the other arrays with same keys/values.

## Numeric Key Comparison

The function works with numeric keys just like with string keys.

numeric_keys.php
  

&lt;?php

$array1 = [1 =&gt; "one", 2 =&gt; "two", 3 =&gt; "three"];
$array2 = [1 =&gt; "one", 2 =&gt; "TWO", 4 =&gt; "four"];

$result = array_diff_assoc($array1, $array2);

print_r($result);

This compares arrays with numeric keys. The output will be:
Array ( [2] =&gt; two [3] =&gt; three ) because key 2 has different
values and key 3 doesn't exist in $array2.

## Type-Sensitive Comparison

array_diff_assoc uses strict comparison (===) for both keys and values.

type_sensitive.php
  

&lt;?php

$array1 = ["a" =&gt; "1", "b" =&gt; 2, "c" =&gt; 3.0];
$array2 = ["a" =&gt; 1, "b" =&gt; 2, "c" =&gt; 3];

$result = array_diff_assoc($array1, $array2);

print_r($result);

This demonstrates strict comparison. The output will be:
Array ( [a] =&gt; 1 [c] =&gt; 3.0 ) because "1" (string) !== 1 (int)
and 3.0 (float) !== 3 (int).

## Complex Array Comparison

The function can handle complex arrays with nested structures.

complex_arrays.php
  

&lt;?php

$array1 = [
    "fruit" =&gt; ["a" =&gt; "apple", "b" =&gt; "banana"],
    "color" =&gt; "red"
];
$array2 = [
    "fruit" =&gt; ["a" =&gt; "apple", "b" =&gt; "blueberry"],
    "color" =&gt; "red"
];

$result = array_diff_assoc($array1, $array2);

print_r($result);

This compares multidimensional arrays. The output will be empty because
the function doesn't recursively compare nested arrays. Only top-level
differences are detected.

## Best Practices

- **Key Importance:** Use when key-value pairs must match exactly.

- **Performance:** Be mindful with large arrays as it's O(n*m).

- **Type Safety:** Remember it uses strict comparison.

- **Nested Arrays:** Combine with array_diff for deep comparison.

## Source

[PHP array_diff_assoc Documentation](https://www.php.net/manual/en/function.array-diff-assoc.php)

This tutorial covered the PHP array_diff_assoc function with
practical examples showing its usage for array comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).