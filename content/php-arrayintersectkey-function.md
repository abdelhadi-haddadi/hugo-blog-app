+++
title = "PHP array_intersect_key Function"
date = 2025-08-29T20:05:01.161+01:00
draft = false
description = "PHP array_intersect_key function tutorial shows how to find array key intersections in PHP. Learn array_intersect_key with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_intersect_key Function

last modified March 13, 2025

The PHP array_intersect_key function computes the intersection
of arrays using keys for comparison. It returns an array containing all the
entries from the first array whose keys exist in all the arguments.

## Basic Definition

The array_intersect_key function compares array keys and returns
matching key-value pairs from the first array. It preserves the original
key-value associations.

Syntax: array_intersect_key(array $array1, array ...$arrays): array.
The function accepts multiple arrays but only compares keys, not values.

## Basic array_intersect_key Example

This demonstrates a simple intersection between two arrays based on keys.

basic_array_intersect_key.php
  

&lt;?php

$array1 = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3];
$array2 = ['b' =&gt; 4, 'c' =&gt; 5, 'd' =&gt; 6];

$result = array_intersect_key($array1, $array2);

print_r($result);

The function returns elements from $array1 where keys exist in $array2.
Note that values from $array1 are preserved, not those from $array2.

## Multiple Array Intersection

This example shows intersection across three arrays based on keys.

multiple_array_intersect.php
  

&lt;?php

$array1 = ['red' =&gt; '#FF0000', 'green' =&gt; '#00FF00', 'blue' =&gt; '#0000FF'];
$array2 = ['red' =&gt; 'Rouge', 'blue' =&gt; 'Bleu', 'yellow' =&gt; 'Jaune'];
$array3 = ['red' =&gt; '赤', 'blue' =&gt; '青', 'black' =&gt; '黒'];

$result = array_intersect_key($array1, $array2, $array3);

print_r($result);

Only keys present in all three arrays ('red' and 'blue') are returned.
The values come from the first array ($array1) in the argument list.

## Numeric Key Intersection

This example demonstrates intersection with numeric array keys.

numeric_key_intersect.php
  

&lt;?php

$array1 = [10 =&gt; 'A', 20 =&gt; 'B', 30 =&gt; 'C'];
$array2 = [20 =&gt; 'X', 30 =&gt; 'Y', 40 =&gt; 'Z'];

$result = array_intersect_key($array1, $array2);

print_r($result);

The function works identically with numeric keys as with string keys.
Only elements with keys 20 and 30 appear in both arrays.

## Preserving First Array Values

This example highlights that values always come from the first array.

value_preservation.php
  

&lt;?php

$userData = ['name' =&gt; 'Alice', 'age' =&gt; 25, 'email' =&gt; 'alice@example.com'];
$allowedFields = ['name' =&gt; true, 'email' =&gt; true];

$filteredData = array_intersect_key($userData, $allowedFields);

print_r($filteredData);

This is a common use case for filtering data. Only fields listed in
$allowedFields are kept, with values from $userData preserved.

## Empty Result Example

This shows what happens when there are no matching keys between arrays.

no_intersection.php
  

&lt;?php

$weekdays = ['Mon' =&gt; 'Monday', 'Tue' =&gt; 'Tuesday'];
$weekend = ['Sat' =&gt; 'Saturday', 'Sun' =&gt; 'Sunday'];

$result = array_intersect_key($weekdays, $weekend);

print_r($result);

When no keys match between arrays, an empty array is returned. This is
useful for cases where you need to verify no overlap exists.

## Best Practices

- **Key Consistency:** Ensure consistent key types for reliable results.

- **Order Matters:** Remember values come from the first array.

- **Performance:** For large arrays, consider key extraction first.

- **Readability:** Document which array provides the values.

## Source

[PHP array_intersect_key Documentation](https://www.php.net/manual/en/function.array-intersect-key.php)

This tutorial covered the PHP array_intersect_key function with
practical examples showing its usage for array key intersection scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).