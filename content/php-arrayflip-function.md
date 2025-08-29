+++
title = "PHP array_flip Function"
date = 2025-08-29T20:05:00.059+01:00
draft = false
description = "PHP array_flip function tutorial shows how to exchange keys with their values in PHP arrays. Learn array_flip with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_flip Function

last modified March 13, 2025

The PHP array_flip function exchanges all keys with their
associated values in an array. It's useful for reversing key-value pairs.

## Basic Definition

The array_flip function swaps array keys and values. The original
values become keys, and keys become values in the returned array.

Syntax: array_flip(array $array): array. Values must be valid
keys (string or integer). Duplicate values will be overwritten.

## Basic array_flip Example

This demonstrates a simple key-value swap in an associative array.

basic_array_flip.php
  

&lt;?php

$colors = [
    'red' =&gt; '#FF0000',
    'green' =&gt; '#00FF00',
    'blue' =&gt; '#0000FF'
];

$flipped = array_flip($colors);

print_r($flipped);

Output: The hex color codes become keys, and color names become values.
Original keys must be strings or integers, and values must be valid keys.

## Handling Duplicate Values

When duplicate values exist, the last key wins in the flipped array.

duplicate_values.php
  

&lt;?php

$fruitCounts = [
    'apples' =&gt; 5,
    'oranges' =&gt; 3,
    'bananas' =&gt; 5
];

$flipped = array_flip($fruitCounts);

print_r($flipped);

Output shows only one '5' key (from bananas) since apples also had value 5.
The last occurrence of a value determines which key is kept in the result.

## Numeric Array Flipping

Flipping a numeric array effectively creates a value-to-index mapping.

numeric_array.php
  

&lt;?php

$numbers = [10, 20, 30];
$flipped = array_flip($numbers);

print_r($flipped);

Output shows the original values as keys with their original indices as
values. This creates an inverted index useful for reverse lookups.

## Type Requirements

Values must be valid keys (string or integer) or array_flip will warn.

type_requirements.php
  

&lt;?php

$mixed = [
    'a' =&gt; 1,
    'b' =&gt; 'two',
    'c' =&gt; ['invalid']
];

$flipped = @array_flip($mixed); // Suppress warning

print_r($flipped);

Output shows only valid key-value pairs. The array element is skipped
with a warning since arrays can't be keys. Use error suppression carefully.

## Practical Use Case

Flipping can create efficient value-to-key lookups for validation.

practical_use.php
  

&lt;?php

$allowedRoles = ['admin', 'editor', 'viewer'];
$roleLookup = array_flip($allowedRoles);

$userRole = 'editor';

if (isset($roleLookup[$userRole])) {
    echo "Access granted";
} else {
    echo "Access denied";
}

This technique provides O(1) lookup time compared to in_array's O(n).
Flipped arrays are memory-efficient for checking value existence.

## Best Practices

- **Valid Keys:** Ensure all values can be valid array keys.

- **Unique Values:** Be aware of duplicate value behavior.

- **Memory:** Flipping large arrays consumes memory.

- **Lookups:** Use flipped arrays for fast value checks.

## Source

[PHP array_flip Documentation](https://www.php.net/manual/en/function.array-flip.php)

This tutorial covered PHP's array_flip function with practical
examples showing key-value swapping and common use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).