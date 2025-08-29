+++
title = "PHP array_udiff_assoc Function"
date = 2025-08-29T20:05:11.176+01:00
draft = false
description = "PHP array_udiff_assoc function tutorial shows how to compute array differences with key checks in PHP. Learn array_udiff_assoc with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_udiff_assoc Function

last modified March 13, 2025

The PHP array_udiff_assoc function computes the difference of
arrays with additional index check. It compares data using a callback function.

## Basic Definition

array_udiff_assoc compares array values with a callback while
checking keys. It returns values from array1 not present in any other arrays.

Syntax: array_udiff_assoc(array $array1, array $array2, ..., callable $value_compare_func): array.
The callback should return an integer less than, equal to, or greater than zero.

## Basic array_udiff_assoc Example

This shows a simple comparison of two arrays with both value and key checks.

basic_array_udiff_assoc.php
  

&lt;?php

declare(strict_types=1);

function compare_values($a, $b): int {
    return $a &lt;=&gt; $b;
}

$array1 = ["a" =&gt; 1, "b" =&gt; 2, "c" =&gt; 3];
$array2 = ["a" =&gt; 1, "b" =&gt; 5, "d" =&gt; 4];

$result = array_udiff_assoc($array1, $array2, 'compare_values');

print_r($result); 

This compares arrays by both keys and values. Only elements with matching keys
and values are considered equal. The callback performs standard comparison.

## Comparing Objects

Use array_udiff_assoc to compare arrays containing objects.

object_comparison.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

function compare_products($a, $b): int {
    return $a-&gt;price &lt;=&gt; $b-&gt;price;
}

$products1 = [
    "p1" =&gt; new Product("Laptop", 999.99),
    "p2" =&gt; new Product("Phone", 699.99)
];

$products2 = [
    "p1" =&gt; new Product("Laptop", 999.99),
    "p3" =&gt; new Product("Tablet", 399.99)
];

$diff = array_udiff_assoc($products1, $products2, 'compare_products');

print_r($diff); 

This compares Product objects by price while checking array keys. Only products
with both matching keys and equal prices are considered the same.

## Case-Insensitive String Comparison

Perform case-insensitive comparison of string values while checking keys.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

function case_insensitive_compare($a, $b): int {
    return strcasecmp($a, $b);
}

$array1 = ["A" =&gt; "Apple", "B" =&gt; "Banana"];
$array2 = ["a" =&gt; "apple", "b" =&gt; "berry"];

$result = array_udiff_assoc($array1, $array2, 'case_insensitive_compare');

print_r($result); 

This compares string values case-insensitively while maintaining strict key
comparison. Keys must match exactly, but values are compared without case.

## Multiple Array Comparison

Compare one array against multiple other arrays with key and value checks.

multiple_arrays.php
  

&lt;?php

declare(strict_types=1);

function numeric_compare($a, $b): int {
    return $a - $b;
}

$main = ["x" =&gt; 10, "y" =&gt; 20, "z" =&gt; 30];
$array1 = ["x" =&gt; 10, "y" =&gt; 25];
$array2 = ["x" =&gt; 15, "z" =&gt; 30];

$diff = array_udiff_assoc($main, $array1, $array2, 'numeric_compare');

print_r($diff); 

This finds elements in $main not present in any other arrays, comparing both
keys and values. Only "y" =&gt; 20 meets this condition in the example.

## Complex Custom Comparison

Implement a custom comparison logic for specialized array difference checks.

custom_comparison.php
  

&lt;?php

declare(strict_types=1);

function complex_compare($a, $b): int {
    if (is_numeric($a) &amp;&amp; is_numeric($b)) {
        return ($a &gt; $b) ? 1 : (($a &lt; $b) ? -1 : 0);
    }
    return strcmp((string)$a, (string)$b);
}

$array1 = ["a" =&gt; "10", "b" =&gt; 20, "c" =&gt; "30"];
$array2 = ["a" =&gt; 10, "b" =&gt; "20", "d" =&gt; 40];

$result = array_udiff_assoc($array1, $array2, 'complex_compare');

print_r($result);

This implements a custom comparison that handles numeric strings differently.
The function treats numeric strings and numbers as equal if their values match.

## Best Practices

- **Consistent Callbacks:** Ensure your callback returns consistent comparison results.

- **Type Safety:** Add type hints to callback parameters when possible.

- **Performance:** For large arrays, optimize your comparison logic.

- **Key Awareness:** Remember keys must match exactly in addition to value comparison.

## Source

[PHP array_udiff_assoc Documentation](https://www.php.net/manual/en/function.array-udiff-assoc.php)

This tutorial covered the PHP array_udiff_assoc function with
practical examples showing its usage for array comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).