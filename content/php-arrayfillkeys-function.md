+++
title = "PHP array_fill_keys Function"
date = 2025-08-29T20:04:58.883+01:00
draft = false
description = "PHP array_fill_keys function tutorial shows how to create arrays with specified keys in PHP. Learn array_fill_keys with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_fill_keys Function

last modified March 13, 2025

The PHP array_fill_keys function creates an array filled with
specified keys and a single value. It's useful for initializing arrays.

## Basic Definition

The array_fill_keys function fills an array with values,
specifying keys. It returns a new array with the given keys and value.

Syntax: array_fill_keys(array $keys, mixed $value): array. The
keys array provides the keys, and all elements get the same value.

## Basic array_fill_keys Example

This shows how to create a simple array with string keys and a default value.

basic_array_fill_keys.php
  

&lt;?php

$keys = ['apple', 'banana', 'orange'];
$fruitArray = array_fill_keys($keys, 'in_stock');

print_r($fruitArray);

This creates an array where each fruit is a key with 'in_stock' as value.
The output shows all elements share the same value but have different keys.

## Numeric Keys Example

Demonstrates using numeric keys to create an array with array_fill_keys.

numeric_keys.php
  

&lt;?php

$numbers = [1, 2, 3, 4];
$numberArray = array_fill_keys($numbers, 'prime');

print_r($numberArray);

This creates an array with numeric keys 1 through 4, each having 'prime'
as its value. The function works equally well with numeric and string keys.

## Mixed Key Types

Shows how array_fill_keys handles different key types in the same array.

mixed_keys.php
  

&lt;?php

$mixedKeys = ['name', 42, 3.14, true];
$mixedArray = array_fill_keys($mixedKeys, 'value');

print_r($mixedArray);

This example uses string, integer, float, and boolean keys. Note how PHP
converts the boolean true to integer 1 when used as an array key.

## Using Variables as Value

Demonstrates using a variable as the fill value with array_fill_keys.

variable_value.php
  

&lt;?php

$status = 'pending';
$userIds = [101, 102, 103, 104];
$userStatuses = array_fill_keys($userIds, $status);

print_r($userStatuses);

Here we use a variable as the fill value. All user IDs get the current
status value. Changing $status later won't affect the created array.

## Complex Value Example

Shows how to use an array as the fill value with array_fill_keys.

complex_value.php
  

&lt;?php

$categories = ['books', 'movies', 'music'];
$defaultData = [
    'count' =&gt; 0,
    'last_updated' =&gt; null
];
$inventory = array_fill_keys($categories, $defaultData);

print_r($inventory);

This creates a multi-dimensional array where each category has the same
default data structure. Note that all elements reference the same array.

## Best Practices

- **Key Uniqueness:** Duplicate keys will be overwritten.

- **Reference Values:** Objects/arrays are referenced, not copied.

- **Performance:** Efficient for initializing large arrays.

- **Readability:** Clearer than manual array initialization.

## Source

[PHP array_fill_keys Documentation](https://www.php.net/manual/en/function.array-fill-keys.php)

This tutorial covered the PHP array_fill_keys function with
practical examples showing its usage for array initialization scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).