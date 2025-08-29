+++
title = "PHP array_uintersect Function"
date = 2025-08-29T20:05:12.306+01:00
draft = false
description = "PHP array_uintersect function tutorial shows how to compute array intersection using callback in PHP. Learn array_uintersect with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_uintersect Function

last modified March 13, 2025

The PHP array_uintersect function computes the intersection of
arrays using a callback function for comparison. It's useful for custom
comparison logic.

## Basic Definition

The array_uintersect function compares array values using a
callback. It returns an array containing all values present in all arguments.

Syntax: array_uintersect(array $array1, array $array2, ..., callable $value_compare_func): array.
The callback must return an integer less than, equal to, or greater than zero.

## Basic array_uintersect Example

This shows simple intersection of arrays with case-insensitive comparison.

basic_array_uintersect.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["Apple", "Banana", "Cherry"];
$array2 = ["apple", "banana", "grape"];

$result = array_uintersect($array1, $array2, 'strcasecmp');

print_r($result);

This finds common elements ignoring case. The strcasecmp callback
performs case-insensitive comparison. Both "Apple" and "Banana" match.

## Custom Object Comparison

Compare arrays of objects using a custom property for intersection.

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
    new Product("Laptop", 999.99),
    new Product("Phone", 699.99)
];

$products2 = [
    new Product("Laptop", 899.99),
    new Product("Tablet", 399.99)
];

$result = array_uintersect($products1, $products2, 
    fn($a, $b) =&gt; strcmp($a-&gt;name, $b-&gt;name));

print_r($result);

This finds products with matching names, ignoring price differences. The
callback compares the name of each Product object.

## Multiple Array Intersection

Find common elements across three arrays with custom comparison.

multiple_arrays.php
  

&lt;?php

declare(strict_types=1);

$array1 = [10, 20, 30, 40];
$array2 = [15, 20, 25, 30];
$array3 = [20, 30, 35, 40];

$result = array_uintersect($array1, $array2, $array3,
    fn($a, $b) =&gt; $a &lt;=&gt; $b);

print_r($result);

This finds numbers present in all three arrays. The spaceship operator
callback performs standard numeric comparison. Only 20 and 30 match.

## Complex Value Comparison

Use complex logic to compare array elements for intersection.

complex_comparison.php
  

&lt;?php

declare(strict_types=1);

function compareLength($a, $b): int {
    return strlen($a) &lt;=&gt; strlen($b);
}

$array1 = ["apple", "banana", "cherry"];
$array2 = ["pear", "kiwi", "orange"];

$result = array_uintersect($array1, $array2, 'compareLength');

print_r($result);

This finds strings with matching lengths across arrays. The callback compares
string lengths rather than values. "apple" (5) matches "pear" (4) +1 diff.

## Case-Sensitive String Comparison

Perform exact string matching with case sensitivity.

case_sensitive.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["PHP", "Python", "Java"];
$array2 = ["php", "python", "ruby"];

$result = array_uintersect($array1, $array2, 'strcmp');

print_r($result);

This shows strict case-sensitive comparison. The strcmp callback
matches exact strings. No matches found due to case differences.

## Best Practices

- **Consistent Callbacks:** Ensure callback returns proper comparison values.

- **Type Safety:** Add type hints for robust comparison logic.

- **Performance:** Sort arrays first for large datasets.

- **Readability:** Use named functions for complex comparisons.

## Source

[PHP array_uintersect Documentation](https://www.php.net/manual/en/function.array-uintersect.php)

This tutorial covered the PHP array_uintersect function with
practical examples showing custom array intersection scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).