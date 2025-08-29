+++
title = "PHP array_replace Function"
date = 2025-08-29T20:05:07.863+01:00
draft = false
description = "PHP array_replace function tutorial shows how to replace array elements in PHP. Learn array_replace with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_replace Function

last modified March 13, 2025

The PHP array_replace function replaces elements from passed arrays
into the first array. It works with both numeric and string keys.

## Basic Definition

The array_replace function replaces values in the first array with
values from following arrays. If a key exists in multiple arrays, the last
array's value is used.

Syntax: array_replace(array $array, array ...$replacements): array.
The function returns the modified array. Original arrays are not changed.

## Basic array_replace Example

This shows simple replacement of values in an associative array.

basic_array_replace.php
  

&lt;?php

$base = ["a" =&gt; 1, "b" =&gt; 2, "c" =&gt; 3];
$replace = ["b" =&gt; 20, "d" =&gt; 40];

$result = array_replace($base, $replace);

print_r($result);

The value for key "b" is replaced with 20, and a new key "d" is added.
Original keys "a" and "c" remain unchanged in the resulting array.

## Multiple Array Replacement

Demonstrates how values are replaced when multiple arrays are provided.

multiple_replace.php
  

&lt;?php

$base = ["apple" =&gt; "red", "banana" =&gt; "yellow"];
$replace1 = ["apple" =&gt; "green", "orange" =&gt; "orange"];
$replace2 = ["banana" =&gt; "brown"];

$result = array_replace($base, $replace1, $replace2);

print_r($result);

The value for "apple" comes from $replace1, "banana" from $replace2, and
"orange" is added. Later arrays take precedence over earlier ones.

## Numeric Key Replacement

Shows how numeric keys are handled by the array_replace function.

numeric_keys.php
  

&lt;?php

$base = [10 =&gt; "ten", 20 =&gt; "twenty"];
$replace = [10 =&gt; "TEN", 30 =&gt; "THIRTY"];

$result = array_replace($base, $replace);

print_r($result);

Numeric key 10 is replaced, key 20 remains, and key 30 is added. The
function works the same way with numeric and string keys.

## Empty Arrays Behavior

Demonstrates what happens when empty arrays are passed to array_replace.

empty_arrays.php
  

&lt;?php

$base = ["a" =&gt; 1, "b" =&gt; 2];
$empty1 = [];
$empty2 = [];

$result = array_replace($base, $empty1, $empty2);

print_r($result);

Empty arrays don't affect the result. The output is identical to the base
array since no replacements were specified in the empty arrays.

## Combining Numeric and Associative

Shows how array_replace handles mixed numeric and associative arrays.

mixed_arrays.php
  

&lt;?php

$base = [0 =&gt; "zero", "color" =&gt; "red"];
$replace = [0 =&gt; "ZERO", 1 =&gt; "one", "color" =&gt; "blue"];

$result = array_replace($base, $replace);

print_r($result);

Numeric key 0 is replaced, string key "color" is updated, and new key 1
is added. The function handles mixed key types seamlessly.

## Best Practices

- **Key Clarity:** Be mindful of key collisions between arrays.

- **Order Matters:** Later arrays override earlier ones.

- **Immutability:** Original arrays remain unchanged.

- **Performance:** For large arrays, consider memory usage.

## Source

[PHP array_replace Documentation](https://www.php.net/manual/en/function.array-replace.php)

This tutorial covered the PHP array_replace function with practical
examples showing its usage for array manipulation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).