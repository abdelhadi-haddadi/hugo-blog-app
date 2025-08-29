+++
title = "PHP ksort Function"
date = 2025-08-29T20:05:20.039+01:00
draft = false
description = "PHP ksort function tutorial shows how to sort arrays by key in PHP. Learn ksort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP ksort Function

last modified March 13, 2025

The PHP ksort function sorts an array by key in ascending order.
It maintains key-value associations, making it ideal for associative arrays.

## Basic Definition

The ksort function sorts an array by its keys while preserving
the relationship between keys and values. It modifies the original array.

Syntax: ksort(array &amp;$array, int $flags = SORT_REGULAR): bool.
The optional flags parameter controls sorting behavior. Returns true on success.

## Basic ksort Example

This demonstrates sorting a simple associative array by its keys in ascending
order.

basic_ksort.php
  

&lt;?php

$fruits = [
    "d" =&gt; "lemon",
    "a" =&gt; "orange",
    "b" =&gt; "banana",
    "c" =&gt; "apple"
];

ksort($fruits);

foreach ($fruits as $key =&gt; $val) {
    echo "$key = $val\n";
}

Output will show keys in alphabetical order: a, b, c, d. The original array
is modified, with key-value pairs maintained during sorting.

## Sorting Numeric Keys

ksort works with numeric keys, sorting them in ascending order.

numeric_keys.php
  

&lt;?php

$numbers = [
    10 =&gt; "ten",
    2 =&gt; "two",
    5 =&gt; "five",
    1 =&gt; "one"
];

ksort($numbers);

print_r($numbers);

The output will show keys in order: 1, 2, 5, 10. Note that numeric keys are
sorted numerically, not as strings.

## Using Sorting Flags

The optional flags parameter allows different sorting behaviors like numeric
or string comparison.

sorting_flags.php
  

&lt;?php

$mixedKeys = [
    "10" =&gt; "ten",
    "2" =&gt; "two",
    "05" =&gt; "five",
    "1" =&gt; "one"
];

ksort($mixedKeys, SORT_STRING);

print_r($mixedKeys);

With SORT_STRING, keys are compared as strings. Output shows:
"05", "1", "10", "2". Without this flag, they'd sort numerically.

## Sorting Multi-dimensional Arrays

ksort can sort multi-dimensional arrays by their outer keys.

multi_dimensional.php
  

&lt;?php

$users = [
    "user3" =&gt; ["age" =&gt; 25, "name" =&gt; "Charlie"],
    "user1" =&gt; ["age" =&gt; 30, "name" =&gt; "Alice"],
    "user2" =&gt; ["age" =&gt; 22, "name" =&gt; "Bob"]
];

ksort($users);

print_r($users);

This sorts the outer array by user keys while preserving the inner arrays.
The output shows user1, user2, user3 in order.

## Case-Insensitive Sorting

Combine ksort with array_change_key_case for case-
insensitive key sorting.

case_insensitive.php
  

&lt;?php

$colors = [
    "Red" =&gt; "#FF0000",
    "green" =&gt; "#00FF00",
    "BLUE" =&gt; "#0000FF"
];

$colors = array_change_key_case($colors, CASE_LOWER);
ksort($colors);

print_r($colors);

First convert all keys to lowercase, then sort. Output shows keys in order:
blue, green, red. Original case is lost in this approach.

## Best Practices

- **Preserve Keys:** Use when maintaining key-value pairs is essential.

- **Performance:** Faster than asort for large arrays.

- **Flags:** Choose appropriate sorting flags for your data type.

- **Copying:** Create a copy if original order must be preserved.

## Source

[PHP ksort Documentation](https://www.php.net/manual/en/function.ksort.php)

This tutorial covered the PHP ksort function with practical
examples showing its usage for sorting arrays by keys.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).