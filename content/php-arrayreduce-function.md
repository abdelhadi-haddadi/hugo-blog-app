+++
title = "PHP array_reduce Function"
date = 2025-08-29T20:05:07.861+01:00
draft = false
description = "PHP array_reduce function tutorial shows how to reduce arrays to single values in PHP. Learn array_reduce with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_reduce Function

last modified March 13, 2025

The PHP array_reduce function iteratively reduces an array to a
single value using a callback function. It's powerful for aggregation.

## Basic Definition

The array_reduce function processes array elements sequentially.
It applies a callback to combine elements into a single accumulated result.

Syntax: array_reduce(array $array, callable $callback, mixed $initial = null): mixed.
The callback receives the carry (accumulator) and current item value.

## Summing Array Elements

This example demonstrates how to sum all elements in an array using reduction.

sum_array.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4, 5];
$sum = array_reduce($numbers, function($carry, $item) {
    return $carry + $item;
}, 0);

echo "The sum is: $sum"; 

The callback adds each element to the accumulated sum. We start with 0 as
initial value. The result is the total sum of all array elements.

## Concatenating Strings

Reduce can combine array elements into a single string with a separator.

concat_strings.php
  

&lt;?php

declare(strict_types=1);

$words = ["Hello", "world", "from", "PHP"];
$sentence = array_reduce($words, function($carry, $item) {
    return $carry ? "$carry $item" : $item;
}, "");

echo $sentence; 

This builds a sentence by concatenating words with spaces. The initial empty
string prevents leading space. Each iteration adds the next word.

## Finding Maximum Value

Implement a max function using array_reduce to find the largest value.

find_max.php
  

&lt;?php

declare(strict_types=1);

$numbers = [42, 17, 89, 23, 56];
$max = array_reduce($numbers, function($carry, $item) {
    return $item &gt; $carry ? $item : $carry;
}, PHP_INT_MIN);

echo "Maximum value: $max"; 

The callback compares each element with the current maximum. We start with
the smallest possible integer. The result is the largest array element.

## Flattening Nested Arrays

Use array_reduce to flatten a two-dimensional array into one dimension.

flatten_array.php
  

&lt;?php

declare(strict_types=1);

$matrix = [[1, 2], [3, 4], [5, 6]];
$flat = array_reduce($matrix, function($carry, $item) {
    return array_merge($carry, $item);
}, []);

print_r($flat); 

This merges all subarrays into one. We start with an empty array. Each
iteration merges the current subarray with the accumulated result.

## Counting Occurrences

Count how many times each value appears in an array using reduction.

count_occurrences.php
  

&lt;?php

declare(strict_types=1);

$fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
$counts = array_reduce($fruits, function($carry, $item) {
    $carry[$item] = ($carry[$item] ?? 0) + 1;
    return $carry;
}, []);

print_r($counts); 

This builds an associative array counting each fruit. The null coalescing
operator handles first occurrences. The result shows each fruit's count.

## Best Practices

- **Initial Value:** Always provide a meaningful initial value.

- **Type Consistency:** Ensure callback returns match initial type.

- **Performance:** For large arrays, consider simpler loops.

- **Readability:** Use named functions for complex logic.

- **Error Handling:** Validate array contents before reduction.

## Source

[PHP array_reduce Documentation](https://www.php.net/manual/en/function.array-reduce.php)

This tutorial covered PHP's array_reduce with practical examples
showing its versatility for array aggregation and transformation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).