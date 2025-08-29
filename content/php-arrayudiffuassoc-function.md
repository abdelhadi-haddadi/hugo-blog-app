+++
title = "PHP array_udiff_uassoc Function"
date = 2025-08-29T20:05:12.297+01:00
draft = false
description = "PHP array_udiff_uassoc function tutorial shows how to compute array difference with callbacks in PHP. Learn array_udiff_uassoc with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_udiff_uassoc Function

last modified March 13, 2025

The PHP array_udiff_uassoc function computes the difference of
arrays with additional index check, using callbacks for both data and index
comparison. It's useful for complex array comparisons.

## Basic Definition

The array_udiff_uassoc function compares arrays by values and
keys. It uses two callback functions - one for value comparison and another
for key comparison.

Syntax: array_udiff_uassoc(array $array1, array $array2, ..., callable $value_compare_func, callable $key_compare_func): array.
Returns values from array1 not present in other arrays.

## Basic array_udiff_uassoc Example

This shows a simple comparison of two arrays with custom comparison functions.

basic_array_udiff_uassoc.php
  

&lt;?php

declare(strict_types=1);

function compareValues($a, $b): int {
    return $a &lt;=&gt; $b;
}

function compareKeys($a, $b): int {
    return strcasecmp($a, $b);
}

$array1 = ["a" =&gt; 1, "b" =&gt; 2, "c" =&gt; 3];
$array2 = ["A" =&gt; 1, "B" =&gt; 5, "C" =&gt; 3];

$result = array_udiff_uassoc($array1, $array2, 'compareValues', 'compareKeys');

print_r($result); 

This compares arrays case-insensitively for keys and normally for values.
Only the element with key "b" and value 2 is in array1 but not array2.

## Comparing Objects with Custom Logic

Compare arrays of objects using custom comparison functions for properties.

object_comparison.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

function compareProducts($a, $b): int {
    return $a-&gt;price &lt;=&gt; $b-&gt;price;
}

function compareKeys($a, $b): int {
    return strcmp($a, $b);
}

$products1 = [
    "p1" =&gt; new Product("Laptop", 999.99),
    "p2" =&gt; new Product("Phone", 699.99)
];

$products2 = [
    "p1" =&gt; new Product("Tablet", 399.99),
    "p3" =&gt; new Product("Monitor", 299.99)
];

$result = array_udiff_uassoc($products1, $products2, 'compareProducts', 'compareKeys');

print_r($result); // Outputs both products from $products1

This compares products by price and keys normally. Since no products in
array1 have matching prices in array2, both are returned in the result.

## Case-Insensitive String Comparison

Perform case-insensitive comparison for both keys and values.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

function compareValues($a, $b): int {
    return strcasecmp($a, $b);
}

function compareKeys($a, $b): int {
    return strcasecmp($a, $b);
}

$array1 = ["Name" =&gt; "John", "Age" =&gt; "30"];
$array2 = ["name" =&gt; "JOHN", "age" =&gt; "25"];

$result = array_udiff_uassoc($array1, $array2, 'compareValues', 'compareKeys');

print_r($result); 

This performs case-insensitive comparison for both keys and values. Only
the Age element differs between arrays when compared this way.

## Multi-Dimensional Array Comparison

Compare multi-dimensional arrays with custom comparison logic.

multi_dimensional.php
  

&lt;?php

declare(strict_types=1);

function compareValues($a, $b): int {
    return $a['score'] &lt;=&gt; $b['score'];
}

function compareKeys($a, $b): int {
    return $a &lt;=&gt; $b;
}

$students1 = [
    101 =&gt; ['name' =&gt; 'Alice', 'score' =&gt; 85],
    102 =&gt; ['name' =&gt; 'Bob', 'score' =&gt; 90]
];

$students2 = [
    101 =&gt; ['name' =&gt; 'Alice', 'score' =&gt; 80],
    103 =&gt; ['name' =&gt; 'Charlie', 'score' =&gt; 95]
];

$result = array_udiff_uassoc($students1, $students2, 'compareValues', 'compareKeys');

print_r($result); // Outputs both students from $students1

This compares student records by their score values. Since no students in
array1 have matching scores in array2, both are included in the result.

## Complex Custom Comparison

Implement complex comparison logic combining multiple factors.

complex_comparison.php
  

&lt;?php

declare(strict_types=1);

function compareValues($a, $b): int {
    $scoreA = $a['points'] * $a['multiplier'];
    $scoreB = $b['points'] * $b['multiplier'];
    return $scoreA &lt;=&gt; $scoreB;
}

function compareKeys($a, $b): int {
    return strlen($a) &lt;=&gt; strlen($b);
}

$data1 = [
    "user1" =&gt; ['points' =&gt; 10, 'multiplier' =&gt; 2],
    "longuser" =&gt; ['points' =&gt; 5, 'multiplier' =&gt; 3]
];

$data2 = [
    "usr" =&gt; ['points' =&gt; 10, 'multiplier' =&gt; 2],
    "user" =&gt; ['points' =&gt; 5, 'multiplier' =&gt; 4]
];

$result = array_udiff_uassoc($data1, $data2, 'compareValues', 'compareKeys');

print_r($result); 

This compares data by calculated score (points * multiplier) and keys by
length. Only the first element differs when compared this way.

## Best Practices

- **Consistent Callbacks:** Ensure comparison functions return consistent results.

- **Type Safety:** Add type hints to callback functions for robustness.

- **Performance:** Optimize callbacks for large array comparisons.

- **Readability:** Use descriptive names for callback functions.

## Source

[PHP array_udiff_uassoc Documentation](https://www.php.net/manual/en/function.array-udiff-uassoc.php)

This tutorial covered the PHP array_udiff_uassoc function with
practical examples showing its usage for complex array comparisons.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).