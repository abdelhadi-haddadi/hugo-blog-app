+++
title = "PHP array_slice Function"
date = 2025-08-29T20:05:10.070+01:00
draft = false
description = "PHP array_slice function tutorial shows how to extract array slices in PHP. Learn array_slice with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_slice Function

last modified March 13, 2025

The PHP array_slice function extracts a slice of an array. It's
useful for getting portions of arrays without modifying the original array.

## Basic Definition

The array_slice function returns selected parts of an array. It
can extract elements from any position with specified length.

Syntax: array_slice(array $array, int $offset, ?int $length = null, bool $preserve_keys = false): array.
Negative offsets count from the end of the array.

## Basic array_slice Example

This shows how to extract a simple slice from an array starting at position 2.

basic_array_slice.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
$slice = array_slice($fruits, 2);

print_r($slice);

This extracts elements starting from index 2 to the end. The output will be
['cherry', 'date', 'elderberry']. Original array remains unchanged.

## Specifying Length Parameter

This example demonstrates how to specify both offset and length parameters.

length_parameter.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6, 7, 8];
$slice = array_slice($numbers, 3, 3);

print_r($slice);

This extracts 3 elements starting from index 3. The output will be [4, 5, 6].
The length parameter limits how many elements to include in the slice.

## Negative Offset

Using negative offset starts the slice from the end of the array.

negative_offset.php
  

&lt;?php

$letters = ['a', 'b', 'c', 'd', 'e', 'f'];
$slice = array_slice($letters, -3, 2);

print_r($slice);

This starts 3 elements from the end and takes 2 elements. The output will be
['d', 'e']. Negative offsets are useful when you know positions from the end.

## Preserving Keys

The preserve_keys parameter maintains original array keys in the slice.

preserve_keys.php
  

&lt;?php

$assoc = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3, 'd' =&gt; 4];
$slice = array_slice($assoc, 1, 2, true);

print_r($slice);

This preserves the original keys 'b' and 'c' in the slice. The output will be
['b' =&gt; 2, 'c' =&gt; 3]. Without true, keys would be reindexed starting from 0.

## Combining Parameters

This example combines negative offset and length with key preservation.

combined_parameters.php
  

&lt;?php

$data = [10, 20, 30, 40, 50, 60];
$slice = array_slice($data, -4, 3, true);

print_r($slice);

This starts 4 elements from the end, takes 3 elements, and preserves keys.
The output will be [2 =&gt; 30, 3 =&gt; 40, 4 =&gt; 50] with original indices.

## Best Practices

- **Bounds Checking:** Verify offsets exist to avoid empty slices.

- **Key Preservation:** Use true for associative arrays.

- **Negative Indices:** Useful for end-relative operations.

- **Immutability:** Remember original array isn't modified.

## Source

[PHP array_slice Documentation](https://www.php.net/manual/en/function.array-slice.php)

This tutorial covered the PHP array_slice function with practical
examples showing its usage for array extraction scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).