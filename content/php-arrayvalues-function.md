+++
title = "PHP array_values Function"
date = 2025-08-29T20:05:14.518+01:00
draft = false
description = "PHP array_values function tutorial shows how to get all values from an array in PHP. Learn array_values with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_values Function

last modified March 13, 2025

The PHP array_values function returns all values from an array
and indexes the array numerically. It's useful for reindexing arrays.

## Basic Definition

The array_values function extracts all values from an array.
It returns a new array with sequential numeric keys starting from 0.

Syntax: array_values(array $array): array. The function
preserves the order of values but resets all keys to numeric indices.

## Basic array_values Example

This shows how to extract values from an associative array with string keys.

basic_array_values.php
  

&lt;?php

$user = [
    'name' =&gt; 'John Doe',
    'email' =&gt; 'john@example.com',
    'age' =&gt; 30
];

$values = array_values($user);

print_r($values);

This extracts all values from the associative array. The output will be:
['John Doe', 'john@example.com', 30] with numeric indices.

## Reindexing an Array

Use array_values to reset numeric keys after unset operations.

reindex_array.php
  

&lt;?php

$numbers = [10 =&gt; 'a', 20 =&gt; 'b', 30 =&gt; 'c'];
unset($numbers[20]);

$reindexed = array_values($numbers);

print_r($reindexed);

After removing element 'b', the array has gaps. array_values
creates a new array with sequential keys: [0 =&gt; 'a', 1 =&gt; 'c'].

## Working with Mixed Arrays

array_values works with arrays containing different value types.

mixed_array.php
  

&lt;?php

$mixed = [
    'a' =&gt; 'apple',
    5 =&gt; 3.14,
    'test' =&gt; true,
    null
];

$values = array_values($mixed);

print_r($values);

The function preserves all values regardless of type. The output contains:
['apple', 3.14, true, null] with new numeric indices.

## Preserving Order with array_values

The function maintains the original order of elements in the array.

order_preservation.php
  

&lt;?php

$unordered = [
    10 =&gt; 'ten',
    2 =&gt; 'two',
    5 =&gt; 'five'
];

$ordered = array_values($unordered);

print_r($ordered);

Despite the original non-sequential keys, the values keep their order:
['ten', 'two', 'five']. Only the indices become sequential.

## Combining with Other Functions

array_values can be combined with functions like array_unique.

combined_functions.php
  

&lt;?php

$duplicates = ['a', 'b', 'a', 'c', 'b', 'd'];
$unique = array_values(array_unique($duplicates));

print_r($unique);

This removes duplicates and reindexes the array. The result is:
[0 =&gt; 'a', 1 =&gt; 'b', 2 =&gt; 'c', 3 =&gt; 'd'].

## Best Practices

- **Memory Usage:** Creates new array, consider memory for large arrays.

- **Key Preservation:** Use only when keys don't matter.

- **Performance:** Generally efficient for most use cases.

- **Readability:** Makes code clearer when only values are needed.

## Source

[PHP array_values Documentation](https://www.php.net/manual/en/function.array-values.php)

This tutorial covered the PHP array_values function with practical
examples showing its usage for array manipulation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).