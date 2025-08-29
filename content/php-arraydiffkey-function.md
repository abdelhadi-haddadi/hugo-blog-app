+++
title = "PHP array_diff_key Function"
date = 2025-08-29T20:04:57.765+01:00
draft = false
description = "PHP array_diff_key function tutorial shows how to compare array keys in PHP. Learn array_diff_key with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_diff_key Function

last modified March 13, 2025

The PHP array_diff_key function compares array keys and returns
the differences. It's useful for finding keys that exist in one array but
not others.

## Basic Definition

The array_diff_key function compares keys of multiple arrays.
It returns an array containing all entries from the first array whose keys
are not present in any of the other arrays.

Syntax: array_diff_key(array $array1, array ...$arrays): array.
The comparison is based on keys only, not values. Key types must match.

## Basic array_diff_key Example

This shows a simple comparison between two arrays with different keys.

basic_array_diff_key.php
  

&lt;?php

$array1 = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3];
$array2 = ['a' =&gt; 4, 'd' =&gt; 5];

$result = array_diff_key($array1, $array2);

print_r($result);

Output: Array ( [b] =&gt; 2 [c] =&gt; 3 ). The function returns
elements from $array1 whose keys ('b' and 'c') don't exist in $array2.

## Comparing Multiple Arrays

You can compare the first array against several other arrays at once.

multiple_arrays.php
  

&lt;?php

$array1 = ['red' =&gt; '#FF0000', 'green' =&gt; '#00FF00', 'blue' =&gt; '#0000FF'];
$array2 = ['red' =&gt; '#FF0000', 'yellow' =&gt; '#FFFF00'];
$array3 = ['green' =&gt; '#00FF00', 'cyan' =&gt; '#00FFFF'];

$result = array_diff_key($array1, $array2, $array3);

print_r($result);

Output: Array ( [blue] =&gt; #0000FF ). Only 'blue' key exists
in $array1 but not in $array2 or $array3. Values are irrelevant.

## Numeric Key Comparison

The function works with numeric keys just like with string keys.

numeric_keys.php
  

&lt;?php

$array1 = [10 =&gt; 'A', 20 =&gt; 'B', 30 =&gt; 'C'];
$array2 = [10 =&gt; 'X', 40 =&gt; 'Y'];

$result = array_diff_key($array1, $array2);

print_r($result);

Output: Array ( [20] =&gt; B [30] =&gt; C ). The keys 20 and 30
from $array1 don't exist in $array2, so their elements are returned.

## Mixed Key Types

The function distinguishes between different key types (string vs integer).

mixed_key_types.php
  

&lt;?php

$array1 = ['10' =&gt; 'String key', 10 =&gt; 'Integer key', '20' =&gt; 'Twenty'];
$array2 = [10 =&gt; 'Integer value'];

$result = array_diff_key($array1, $array2);

print_r($result);

Output: Array ( [10] =&gt; String key [20] =&gt; Twenty ). The
string key '10' is different from integer key 10, so it's included.

## Empty Array Behavior

When comparing with empty arrays, all keys from the first array are returned.

empty_array.php
  

&lt;?php

$array1 = ['a' =&gt; 1, 'b' =&gt; 2];
$array2 = [];

$result = array_diff_key($array1, $array2);

print_r($result);

Output: Array ( [a] =&gt; 1 [b] =&gt; 2 ). Since $array2 has no
keys, all keys from $array1 are considered different and returned.

## Best Practices

- **Key Consistency:** Maintain consistent key types for reliable comparisons.

- **Multiple Arrays:** Compare against several arrays at once for efficiency.

- **Type Awareness:** Remember that '1' and 1 are different keys.

- **Performance:** For large arrays, consider key extraction first.

## Source

[PHP array_diff_key Documentation](https://www.php.net/manual/en/function.array-diff-key.php)

This tutorial covered the PHP array_diff_key function with
practical examples showing its usage for array key comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).