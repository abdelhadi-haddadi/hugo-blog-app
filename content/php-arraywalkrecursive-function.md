+++
title = "PHP array_walk_recursive Function"
date = 2025-08-29T20:05:14.511+01:00
draft = false
description = "PHP array_walk_recursive function tutorial shows how to process arrays recursively in PHP. Learn array_walk_recursive with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_walk_recursive Function

last modified March 13, 2025

The PHP array_walk_recursive function applies a user function
recursively to every element of an array. It's useful for nested arrays.

## Basic Definition

array_walk_recursive processes arrays recursively, applying a
callback to each non-array element. It preserves array keys during traversal.

Syntax: array_walk_recursive(array &amp;$array, callable $callback, mixed $userdata = null): bool.
The callback receives value and key parameters.

## Basic array_walk_recursive Example

This example demonstrates printing all values from a nested array structure.

basic_array_walk_recursive.php
  

&lt;?php

declare(strict_types=1);

$data = [
    'name' =&gt; 'John',
    'contacts' =&gt; [
        'email' =&gt; 'john@example.com',
        'phone' =&gt; '123456789'
    ],
    'age' =&gt; 30
];

array_walk_recursive($data, function($value, $key) {
    echo "$key: $value\n";
});

The callback function receives each key-value pair. Nested arrays are
processed recursively, but their parent keys aren't passed to the callback.

## Modifying Array Values

This example shows how to modify array values in place using references.

modify_values.php
  

&lt;?php

declare(strict_types=1);

$numbers = [
    'a' =&gt; 1,
    'b' =&gt; [2, 3],
    'c' =&gt; 4
];

array_walk_recursive($numbers, function(&amp;$value, $key) {
    $value *= 2;
});

print_r($numbers);

By passing the value by reference (&amp;$value), we can modify the original
array elements. All numeric values are doubled in this example.

## Using User Data Parameter

The third parameter allows passing additional data to the callback function.

user_data.php
  

&lt;?php

declare(strict_types=1);

$products = [
    'item1' =&gt; ['price' =&gt; 100, 'quantity' =&gt; 2],
    'item2' =&gt; ['price' =&gt; 200, 'quantity' =&gt; 1]
];

$discount = 0.1; // 10% discount

array_walk_recursive($products, function(&amp;$value, $key, $discount) {
    if ($key === 'price') {
        $value *= (1 - $discount);
    }
}, $discount);

print_r($products);

The discount value is passed as user data and applied only to price fields.
This demonstrates selective modification based on both key and user data.

## Counting Array Elements

This example counts all non-array elements in a multidimensional array.

counting_elements.php
  

&lt;?php

declare(strict_types=1);

$data = [
    'a' =&gt; 1,
    'b' =&gt; [2, 3, [4, 5]],
    'c' =&gt; 6
];

$count = 0;
array_walk_recursive($data, function($value) use (&amp;$count) {
    $count++;
});

echo "Total elements: $count";

Using a closure with variable binding, we increment a counter for each
non-array element. The result shows the total count of leaf nodes.

## Building a Flat Array

This example collects all values from a nested array into a flat array.

flatten_array.php
  

&lt;?php

declare(strict_types=1);

$nested = [
    'a' =&gt; 1,
    'b' =&gt; [
        'c' =&gt; 2,
        'd' =&gt; [3, 4]
    ],
    'e' =&gt; 5
];

$flat = [];
array_walk_recursive($nested, function($value) use (&amp;$flat) {
    $flat[] = $value;
});

print_r($flat);

By appending each value to an external array, we create a flattened version.
This technique is useful when you need to process all values uniformly.

## Best Practices

- **Reference Parameters:** Use &amp;$value to modify array elements.

- **Key Awareness:** Check $key when you need conditional logic.

- **User Data:** Pass additional data via the third parameter.

- **Closures:** Use 'use' keyword to access external variables.

- **Performance:** Avoid complex operations in large arrays.

## Source

[PHP array_walk_recursive Documentation](https://www.php.net/manual/en/function.array-walk-recursive.php)

This tutorial covered the PHP array_walk_recursive function with
practical examples showing its usage for processing nested array structures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).