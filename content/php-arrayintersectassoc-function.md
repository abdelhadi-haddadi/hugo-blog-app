+++
title = "PHP array_intersect_assoc Function"
date = 2025-08-29T20:05:01.158+01:00
draft = false
description = "PHP array_intersect_assoc function tutorial shows how to find matching elements in associative arrays in PHP. Learn array_intersect_assoc with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_intersect_assoc Function

last modified March 13, 2025

The PHP array_intersect_assoc function compares arrays and returns
elements that exist in all arrays with matching keys and values. It's useful
for finding exact matches in associative arrays.

## Basic Definition

The array_intersect_assoc function compares both keys and values
of arrays. It returns an array containing all entries from the first array
that are present in all other arrays with identical keys and values.

Syntax: array_intersect_assoc(array $array1, array $array2, ...): array.
The comparison is strict (===) for both keys and values. Order is preserved.

## Basic array_intersect_assoc Example

This demonstrates finding common elements with matching keys and values.

basic_array_intersect_assoc.php
  

&lt;?php

$array1 = ["a" =&gt; "apple", "b" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["a" =&gt; "apple", "b" =&gt; "blueberry", "c" =&gt; "cherry"];

$result = array_intersect_assoc($array1, $array2);

print_r($result);

Only elements with matching keys AND values appear in the result. "banana"
and "blueberry" are excluded because their values differ under key "b".

## Multiple Array Comparison

Compare more than two arrays to find elements common to all with matching keys.

multiple_arrays.php
  

&lt;?php

$array1 = ["id" =&gt; 1, "name" =&gt; "Alice", "role" =&gt; "admin"];
$array2 = ["id" =&gt; 1, "name" =&gt; "Bob", "role" =&gt; "admin"];
$array3 = ["id" =&gt; 1, "name" =&gt; "Alice", "role" =&gt; "user"];

$result = array_intersect_assoc($array1, $array2, $array3);

print_r($result);

Only the "id" key with value 1 appears in all arrays with matching keys.
Other elements differ in at least one array, so they're excluded.

## Strict Value Comparison

The function uses strict comparison (===), so types must match exactly.

strict_comparison.php
  

&lt;?php

$array1 = ["a" =&gt; "1", "b" =&gt; 2, "c" =&gt; 3];
$array2 = ["a" =&gt; 1, "b" =&gt; "2", "c" =&gt; 3];

$result = array_intersect_assoc($array1, $array2);

print_r($result);

Only the value 3 matches exactly in type and value. String "1" doesn't match
integer 1, and string "2" doesn't match integer 2, despite loose equality.

## Nested Arrays Behavior

When comparing nested arrays, the function checks for identical structure.

nested_arrays.php
  

&lt;?php

$array1 = ["user" =&gt; ["id" =&gt; 1, "name" =&gt; "Alice"], "active" =&gt; true];
$array2 = ["user" =&gt; ["id" =&gt; 1, "name" =&gt; "Bob"], "active" =&gt; true];

$result = array_intersect_assoc($array1, $array2);

print_r($result);

Only the "active" key matches exactly. The nested "user" arrays differ in
the "name" value, so they're not considered identical matches.

## Empty Arrays Handling

When comparing with empty arrays, the result will always be empty.

empty_arrays.php
  

&lt;?php

$array1 = ["a" =&gt; 1, "b" =&gt; 2];
$array2 = [];

$result = array_intersect_assoc($array1, $array2);

print_r($result);

An empty array has no keys or values to match, so the intersection is empty.
This behavior is consistent with mathematical set intersection principles.

## Best Practices

- **Key Consistency:** Ensure arrays have similar key structures.

- **Type Safety:** Be aware of strict type comparisons.

- **Performance:** Sort arrays by size (smallest first) for efficiency.

- **Readability:** Use meaningful key names for clarity.

## Source

[PHP array_intersect_assoc Documentation](https://www.php.net/manual/en/function.array-intersect-assoc.php)

This tutorial covered the PHP array_intersect_assoc function with
practical examples showing its usage for comparing associative arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).