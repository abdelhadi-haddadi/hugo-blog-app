+++
title = "PHP array_combine Function"
date = 2025-08-29T20:04:55.515+01:00
draft = false
description = "PHP array_combine function tutorial shows how to create an array by using one array for keys and another for values. Learn array_combine with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_combine Function

last modified March 13, 2025

The PHP array_combine function creates an array by using one
array for keys and another for values. It's useful for pairing related data.

## Basic Definition

The array_combine function merges two arrays into an associative
array. The first array provides keys, the second provides corresponding values.

Syntax: array_combine(array $keys, array $values): array. Both
arrays must have equal number of elements. Returns new associative array.

## Basic array_combine Example

This shows how to combine simple arrays of keys and values into an associative
array.

basic_array_combine.php
  

&lt;?php

$keys = ['name', 'age', 'city'];
$values = ['Alice', 25, 'New York'];

$combined = array_combine($keys, $values);

print_r($combined);

This combines string keys with mixed values. The resulting array uses $keys
as keys and $values as corresponding values in the same order.

## Combining Numeric Arrays

Demonstrates combining numeric arrays to create an associative array.

numeric_arrays.php
  

&lt;?php

$ids = [101, 102, 103];
$names = ['Product A', 'Product B', 'Product C'];

$products = array_combine($ids, $names);

print_r($products);

Here numeric IDs become array keys paired with product names. Note that array
keys can be integers in PHP associative arrays.

## Error Handling

Shows what happens when arrays of different sizes are combined.

error_handling.php
  

&lt;?php

$keys = ['a', 'b', 'c'];
$values = [1, 2];

try {
    $result = array_combine($keys, $values);
    print_r($result);
} catch (ValueError $e) {
    echo "Error: " . $e-&gt;getMessage();
    // Output: Error: array_combine(): Argument #2 ($values) must have the same number of elements as argument #1 ($keys)
}

The function throws a ValueError when array sizes differ. Always ensure arrays
have equal length before combining them.

## Combining with Array Functions

Demonstrates using array_combine with other array functions like array_map.

with_functions.php
  

&lt;?php

$headers = ['ID', 'NAME', 'PRICE'];
$data = ['101', 'Widget', '19.99'];

// Convert headers to lowercase keys
$keys = array_map('strtolower', $headers);
$combined = array_combine($keys, $data);

print_r($combined);

This transforms headers to lowercase before combining. The array_map function
modifies the keys array before it's used in array_combine.

## Real-world CSV Example

Shows a practical example of processing CSV data into associative arrays.

csv_example.php
  

&lt;?php

$csvData = [
    ['id', 'name', 'email'],
    [1, 'John Doe', 'john@example.com'],
    [2, 'Jane Smith', 'jane@example.com']
];

$headers = array_shift($csvData); // Get headers
$result = [];

foreach ($csvData as $row) {
    $result[] = array_combine($headers, $row);
}

print_r($result);

This processes CSV-like data into an array of associative arrays. Each row
is combined with the headers to create meaningful key-value pairs.

## Best Practices

- **Equal Length:** Always verify arrays have same number of elements.

- **Valid Keys:** Ensure keys are valid (strings or integers).

- **Data Alignment:** Confirm values correspond to correct keys.

- **Error Handling:** Use try-catch for production code.

## Source

[PHP array_combine Documentation](https://www.php.net/manual/en/function.array-combine.php)

This tutorial covered the PHP array_combine function with practical
examples showing its usage for creating associative arrays from separate keys
and values arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).