+++
title = "PHP array_filter Function"
date = 2025-08-29T20:04:58.878+01:00
draft = false
description = "PHP array_filter function tutorial shows how to filter array elements in PHP. Learn array_filter with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_filter Function

last modified March 13, 2025

The PHP array_filter function filters elements of an array using
a callback function. It returns a new array containing all elements that pass
the callback test.

## Basic Definition

The array_filter function iterates over each array element and
passes it to the callback. Elements that return true are included in the
result array.

Syntax: array_filter(array $array, ?callable $callback = null, int $mode = 0): array.
The callback can be omitted to filter empty values. Mode controls arguments
passed to callback.

## Basic array_filter Example

This example filters out all odd numbers from an array, keeping only evens.

basic_array_filter.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6];
$evenNumbers = array_filter($numbers, function($n) {
    return $n % 2 === 0;
});

print_r($evenNumbers);

The callback checks if each number is even. The resulting array contains only
elements where the callback returned true. Note original keys are preserved.

## Filtering Without Callback

When no callback is provided, array_filter removes all falsy
values from the array.

no_callback.php
  

&lt;?php

$mixedValues = [0, 1, '', 'hello', null, false, true, [], [1]];
$filtered = array_filter($mixedValues);

print_r($filtered);

This removes 0, empty string, null, false, and empty array - all falsy values.
Only truthy values remain in the filtered array.

## Filtering with ARRAY_FILTER_USE_BOTH

Using the mode parameter, we can pass both value and key to the callback.

use_both.php
  

&lt;?php

$data = [
    'user1' =&gt; 'admin',
    'user2' =&gt; 'editor',
    'user3' =&gt; 'viewer',
    'user4' =&gt; 'admin'
];

$admins = array_filter($data, function($value, $key) {
    return $value === 'admin' &amp;&amp; $key !== 'user1';
}, ARRAY_FILTER_USE_BOTH);

print_r($admins);

This filters for admin users while excluding user1. The callback receives both
value and key, allowing complex filtering logic based on both.

## Filtering Array of Objects

array_filter works well with object arrays when filtering based
on object properties.

object_filter.php
  

&lt;?php

class Product {
    public function __construct(
        public string $name,
        public float $price,
        public bool $inStock
    ) {}
}

$products = [
    new Product('Laptop', 999.99, true),
    new Product('Phone', 699.99, false),
    new Product('Tablet', 399.99, true)
];

$availableProducts = array_filter($products, fn($p) =&gt; $p-&gt;inStock);

print_r($availableProducts);

This filters out products not in stock. The arrow function checks the inStock
property, keeping only available products in the result.

## Filtering with ARRAY_FILTER_USE_KEY

When we need to filter based on array keys rather than values.

use_key.php
  

&lt;?php

$config = [
    'db_host' =&gt; 'localhost',
    'db_user' =&gt; 'root',
    'db_pass' =&gt; 'secret',
    'cache_ttl' =&gt; 3600,
    'debug_mode' =&gt; true
];

$dbConfig = array_filter($config, function($key) {
    return str_starts_with($key, 'db_');
}, ARRAY_FILTER_USE_KEY);

print_r($dbConfig);

This filters the array to include only keys starting with 'db_'. The callback
receives only the key when using ARRAY_FILTER_USE_KEY mode.

## Best Practices

- **Preserve Keys:** Remember array_filter keeps original keys by default.

- **Type Safety:** Add type hints in callbacks for better code.

- **Performance:** For large arrays, consider more efficient approaches.

- **Readability:** Use named functions for complex filtering logic.

- **Reindexing:** Use array_values() if you need sequential keys.

## Source

[PHP array_filter Documentation](https://www.php.net/manual/en/function.array-filter.php)

This tutorial covered the PHP array_filter function with practical
examples showing its usage for various array filtering scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).