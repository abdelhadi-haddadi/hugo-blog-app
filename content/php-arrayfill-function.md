+++
title = "PHP array_fill Function"
date = 2025-08-29T20:04:58.880+01:00
draft = false
description = "PHP array_fill function tutorial shows how to create and fill arrays in PHP. Learn array_fill with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_fill Function

last modified March 13, 2025

The PHP array_fill function creates an array filled with a
specified value. It's useful for initializing arrays with default values.

## Basic Definition

The array_fill function generates an array with values. It
starts at a specified index and fills the array with the given value.

Syntax: array_fill(int $start_index, int $count, mixed $value): array.
The function returns a new array with $count elements.

## Basic array_fill Example

This demonstrates creating a simple array filled with a default value.

basic_array_fill.php
  

&lt;?php

$filledArray = array_fill(0, 5, 'default');

print_r($filledArray);

This creates an array with 5 elements, all set to 'default'. The array
starts at index 0. The output shows all elements have the same value.

## Negative Start Index

array_fill can create arrays with negative starting indices.

negative_index.php
  

&lt;?php

$negativeArray = array_fill(-3, 4, 'item');

print_r($negativeArray);

This creates an array starting at index -3 with 4 elements. The resulting
array will have keys -3, -2, -1, and 0, all filled with 'item'.

## Filling with Different Data Types

The function can fill arrays with any data type, including objects.

data_types.php
  

&lt;?php

$numberArray = array_fill(0, 3, 42);
$boolArray = array_fill(0, 2, true);
$objectArray = array_fill(0, 2, new stdClass());

print_r($numberArray);
print_r($boolArray);
print_r($objectArray);

This shows arrays filled with integers, booleans, and objects. Note that
object elements will be references to the same object instance.

## Multi-dimensional Arrays

array_fill can be used to create multi-dimensional arrays.

multi_dimensional.php
  

&lt;?php

$matrix = array_fill(0, 3, array_fill(0, 3, 0));

print_r($matrix);

This creates a 3x3 matrix filled with zeros. The outer array_fill
creates an array where each element is another array filled with zeros.

## Combining with array_fill_keys

array_fill can be combined with other array functions.

combined.php
  

&lt;?php

$keys = ['a', 'b', 'c'];
$filled = array_fill_keys($keys, array_fill(0, 3, null));

print_r($filled);

This creates an associative array where each key maps to a sub-array filled
with null values. It demonstrates combining array_fill with
array_fill_keys.

## Best Practices

- **Memory Usage:** Be cautious with large arrays as they consume memory.

- **Object References:** Remember all object elements reference the same instance.

- **Negative Indices:** Useful for specific use cases but can be confusing.

- **Performance:** Faster than manual loops for array initialization.

## Source

[PHP array_fill Documentation](https://www.php.net/manual/en/function.array-fill.php)

This tutorial covered the PHP array_fill function with practical
examples showing its usage for array initialization scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).