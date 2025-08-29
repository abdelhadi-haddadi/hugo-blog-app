+++
title = "PHP array_merge_recursive Function"
date = 2025-08-29T20:05:05.630+01:00
draft = false
description = "PHP array_merge_recursive function tutorial shows how to merge arrays recursively in PHP. Learn array_merge_recursive with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_merge_recursive Function

last modified March 13, 2025

The PHP array_merge_recursive function merges two or more arrays
recursively. Unlike array_merge, it handles duplicate keys by
creating arrays of values.

## Basic Definition

The array_merge_recursive function combines arrays while preserving
keys. When keys match, values are merged into an array rather than overwritten.

Syntax: array_merge_recursive(array ...$arrays): array. It accepts
multiple array arguments and returns the merged result. String keys are merged,
numeric keys are renumbered.

## Basic array_merge_recursive Example

This demonstrates simple merging of two arrays with string keys.

basic_merge.php
  

&lt;?php

$array1 = ['color' =&gt; 'red', 'size' =&gt; 'small'];
$array2 = ['color' =&gt; 'blue', 'shape' =&gt; 'round'];

$result = array_merge_recursive($array1, $array2);

print_r($result);

Output shows the 'color' key now contains both values in an array. Other keys
are merged normally. This preserves all values from both arrays.

## Matching Numeric Keys

When arrays have matching numeric keys, values are appended with new indices.

numeric_keys.php
  

&lt;?php

$array1 = [0 =&gt; 'apple', 1 =&gt; 'banana'];
$array2 = [0 =&gt; 'orange', 1 =&gt; 'pear'];

$result = array_merge_recursive($array1, $array2);

print_r($result);

Numeric keys are renumbered sequentially. The output contains all four fruits
with indices 0 through 3. This differs from string key behavior.

## Multidimensional Arrays

The function recursively merges nested arrays, combining values at each level.

multidimensional.php
  

&lt;?php

$array1 = ['fruits' =&gt; ['apple', 'banana'], 'vegetables' =&gt; ['carrot']];
$array2 = ['fruits' =&gt; ['orange'], 'vegetables' =&gt; ['celery']];

$result = array_merge_recursive($array1, $array2);

print_r($result);

Both 'fruits' and 'vegetables' subarrays are merged. The result contains all
fruits and vegetables from both arrays in their respective categories.

## Mixed Key Types

Arrays with both string and numeric keys demonstrate different merging behaviors.

mixed_keys.php
  

&lt;?php

$array1 = ['name' =&gt; 'John', 0 =&gt; 'admin'];
$array2 = ['name' =&gt; 'Doe', 0 =&gt; 'user'];

$result = array_merge_recursive($array1, $array2);

print_r($result);

The 'name' values are combined in an array, while numeric indices are
renumbered. This shows how different key types are handled separately.

## Deep Recursive Merge

The function handles multiple levels of nesting, merging at each depth.

deep_merge.php
  

&lt;?php

$array1 = ['user' =&gt; ['name' =&gt; 'Alice', 'prefs' =&gt; ['theme' =&gt; 'dark']]];
$array2 = ['user' =&gt; ['email' =&gt; 'alice@example.com', 'prefs' =&gt; ['font' =&gt; 'arial']]];

$result = array_merge_recursive($array1, $array2);

print_r($result);

The user data is merged at all levels. Preferences combine both theme and font
settings while preserving the nested structure. This demonstrates deep merging.

## Best Practices

- **Key Conflicts:** Be aware of how different key types merge.

- **Performance:** Consider depth when merging large structures.

- **Alternatives:** Use array_replace_recursive for overwriting.

- **Debugging:** Inspect results carefully with complex merges.

## Source

[PHP array_merge_recursive Documentation](https://www.php.net/manual/en/function.array-merge-recursive.php)

This tutorial covered the PHP array_merge_recursive function with
practical examples showing its recursive merging behavior with various array types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).