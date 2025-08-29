+++
title = "PHP array_uintersect_assoc Function"
date = 2025-08-29T20:05:12.291+01:00
draft = false
description = "PHP array_uintersect_assoc function tutorial shows how to compute array intersection with custom comparison in PHP. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_uintersect_assoc Function

last modified March 13, 2025

The PHP array_uintersect_assoc function computes the intersection
of arrays with additional index check, comparing data by a callback function.

## Basic Definition

array_uintersect_assoc returns an array containing all values
from array1 that are present in all arguments. Keys are used in comparison.

Syntax: array_uintersect_assoc(array $array1, array $array2, ..., callable $value_compare_func): array.
The callback must return an integer less than, equal to, or greater than zero.

## Basic array_uintersect_assoc Example

This example shows a simple case-insensitive string comparison intersection.

basic_array_uintersect_assoc.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; "green", "b" =&gt; "brown", "c" =&gt; "blue"];
$array2 = ["a" =&gt; "GREEN", "B" =&gt; "yellow", "c" =&gt; "BLUE"];

$result = array_uintersect_assoc($array1, $array2, "strcasecmp");

print_r($result);

This compares arrays case-insensitively using strcasecmp. Only
elements with matching keys AND case-insensitive values are included.

## Custom Object Comparison

Compare arrays of objects using a custom callback function for intersection.

object_comparison.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products1 = [
    "p1" =&gt; new Product("Laptop", 999.99),
    "p2" =&gt; new Product("Phone", 699.99)
];

$products2 = [
    "p1" =&gt; new Product("Laptop", 899.99),
    "p3" =&gt; new Product("Tablet", 399.99)
];

$result = array_uintersect_assoc($products1, $products2, 
    fn($a, $b) =&gt; $a-&gt;name &lt;=&gt; $b-&gt;name);

print_r($result);

This intersects arrays of Product objects comparing only the name property.
The same key ("p1") and matching names result in inclusion in the output.

## Numeric Comparison with Precision

Compare floating-point numbers with a precision tolerance in the intersection.

float_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; 1.2345, "b" =&gt; 2.3456, "c" =&gt; 3.4567];
$array2 = ["a" =&gt; 1.2346, "b" =&gt; 2.3450, "d" =&gt; 3.4567];

$result = array_uintersect_assoc($array1, $array2, function($a, $b) {
    return abs($a - $b) &lt; 0.001 ? 0 : ($a &lt;=&gt; $b);
});

print_r($result);

This compares floats with 0.001 precision tolerance. Keys must match exactly,
while values are considered equal if within the specified tolerance.

## Multi-array Intersection

Compute intersection across multiple arrays with custom comparison function.

multi_array_intersection.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; "apple", "b" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["a" =&gt; "APPLE", "c" =&gt; "CHERRY", "d" =&gt; "date"];
$array3 = ["a" =&gt; "Apple", "c" =&gt; "Cherry", "e" =&gt; "elderberry"];

$result = array_uintersect_assoc($array1, $array2, $array3, "strcasecmp");

print_r($result);

This finds elements present in all three arrays with matching keys and
case-insensitive matching values using strcasecmp.

## Complex Data Structure Comparison

Compare arrays containing complex data structures with a custom callback.

complex_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = [
    "user1" =&gt; ["id" =&gt; 1, "name" =&gt; "John"],
    "user2" =&gt; ["id" =&gt; 2, "name" =&gt; "Jane"]
];

$array2 = [
    "user1" =&gt; ["id" =&gt; 1, "name" =&gt; "JOHN"],
    "user3" =&gt; ["id" =&gt; 3, "name" =&gt; "Alice"]
];

$result = array_uintersect_assoc($array1, $array2, function($a, $b) {
    return $a["id"] &lt;=&gt; $b["id"];
});

print_r($result);

This intersects arrays of associative arrays comparing only the "id" field.
The key "user1" matches and the id values are equal, so it's included.

## Best Practices

- **Consistent Callbacks:** Ensure callback returns proper comparison values.

- **Key Awareness:** Remember both keys and values are compared.

- **Performance:** For large arrays, optimize callback functions.

- **Type Safety:** Add type hints in callbacks for robustness.

## Source

[PHP array_uintersect_assoc Documentation](https://www.php.net/manual/en/function.array-uintersect-assoc.php)

This tutorial covered the PHP array_uintersect_assoc function
with practical examples showing its usage for array intersection scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).