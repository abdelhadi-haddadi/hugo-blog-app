+++
title = "PHP array_walk Function"
date = 2025-08-29T20:05:14.509+01:00
draft = false
description = "PHP array_walk function tutorial shows how to process array elements in PHP. Learn array_walk with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_walk Function

last modified March 13, 2025

The PHP array_walk function applies a user-defined callback to
each element of an array. It's useful for processing array elements without
creating a new array.

## Basic Definition

The array_walk function iterates through each array element and
applies a callback function to it. The original array is modified by reference.

Syntax: array_walk(array &amp;$array, callable $callback, mixed $userdata = null): bool.
The callback receives both value and key by default. Returns true on success.

## Basic array_walk Example

This demonstrates modifying each element in an array by squaring the numbers.

basic_array_walk.php
  

&lt;?php

$numbers = [1, 2, 3, 4];

function square(&amp;$value, $key) {
    $value = $value * $value;
}

array_walk($numbers, 'square');

print_r($numbers);

The callback modifies each element by reference. The original array is changed
to contain squared values. Note the &amp; before $value in the callback.

## Using array_walk with Keys

This example shows how to access both keys and values in the callback.

array_walk_keys.php
  

&lt;?php

$fruits = [
    'a' =&gt; 'apple',
    'b' =&gt; 'banana',
    'c' =&gt; 'cherry'
];

function printPair($value, $key) {
    echo "$key: $value\n";
}

array_walk($fruits, 'printPair');

The callback receives both key and value parameters. This allows processing
associative arrays where keys are meaningful. Output shows each key-value pair.

## Using User Data with array_walk

The third parameter allows passing additional data to the callback function.

array_walk_userdata.php
  

&lt;?php

$prices = [10, 20, 30];
$discount = 0.2; // 20% discount

function applyDiscount(&amp;$price, $key, $discount) {
    $price = $price * (1 - $discount);
}

array_walk($prices, 'applyDiscount', $discount);

print_r($prices);

The discount rate is passed as user data. The callback applies this discount
to each price. This demonstrates how to share data across all callback calls.

## Modifying Array Elements by Reference

This example shows how to modify array elements directly in the callback.

array_walk_reference.php
  

&lt;?php

$names = ['alice', 'bob', 'charlie'];

function capitalize(&amp;$name) {
    $name = ucfirst($name);
}

array_walk($names, 'capitalize');

print_r($names);

The callback capitalizes each name by modifying the value through reference.
The original array is updated with capitalized names after array_walk executes.

## Using Anonymous Functions with array_walk

Modern PHP allows using anonymous functions for more concise code.

array_walk_anonymous.php
  

&lt;?php

$temperatures = [22.5, 19.3, 25.1, 18.7];

array_walk($temperatures, function(&amp;$temp) {
    $temp = round($temp);
});

print_r($temperatures);

An anonymous function rounds each temperature. This approach keeps the logic
close to where it's used, improving code readability for simple operations.

## Best Practices

- **Reference Parameters:** Use &amp; to modify array elements directly.

- **Type Safety:** Add type hints for robust callback functions.

- **Performance:** Avoid complex operations in large array processing.

- **Readability:** Use named functions for complex transformations.

- **Return Values:** Remember array_walk returns bool, not the array.

## Source

[PHP array_walk Documentation](https://www.php.net/manual/en/function.array-walk.php)

This tutorial covered the PHP array_walk function with practical
examples showing its usage for array processing scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).