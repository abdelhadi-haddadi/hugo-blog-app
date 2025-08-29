+++
title = "PHP array_product Function"
date = 2025-08-29T20:05:06.717+01:00
draft = false
description = "PHP array_product function tutorial shows how to calculate the product of array values in PHP. Learn array_product with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_product Function

last modified March 13, 2025

The PHP array_product function calculates the product of values
in an array. It multiplies all elements together and returns the result.

## Basic Definition

The array_product function computes the product of array values.
It returns the product as integer or float, depending on input values.

Syntax: array_product(array $array): int|float. Empty arrays
return 1. Non-numeric values are treated as 0 (except in PHP 8.0+).

## Basic array_product Example

This demonstrates multiplying a simple array of integers.

basic_array_product.php
  

&lt;?php

$numbers = [2, 3, 4];
$product = array_product($numbers);

echo "The product is: " . $product; 

This calculates 2 × 3 × 4 = 24. The function handles all numeric types
and returns the correct product of array elements.

## Multiplying Floating Point Numbers

array_product works with floating-point numbers too.

float_product.php
  

&lt;?php

$prices = [1.99, 2.49, 0.99];
$total = array_product($prices);

echo "Total product: " . number_format($total, 2); 

This multiplies decimal numbers. The result is formatted to 2 decimal places.
The function preserves floating-point precision in calculations.

## Empty Array Behavior

An empty array returns 1, which is the multiplicative identity.

empty_array.php
  

&lt;?php

$empty = [];
$result = array_product($empty);

echo "Product of empty array: " . $result; 

This shows the mathematical convention where the product of no elements
is 1. This matches how sum of empty array is 0 (additive identity).

## Handling Non-Numeric Values

Non-numeric values are converted to numbers before multiplication.

mixed_values.php
  

&lt;?php

$mixed = [2, "3", "apple", 4];
$product = array_product($mixed);

echo "Product: " . $product; 

Strings that can't be converted to numbers become 0, making the entire
product 0. Numeric strings are properly converted to numbers.

## Factorial Calculation

array_product can calculate factorials using range().

factorial.php
  

&lt;?php

function factorial(int $n): int {
    return array_product(range(1, $n));
}

echo "5! = " . factorial(5); 

This calculates 5 factorial (5! = 1×2×3×4×5 = 120). The range function
creates an array from 1 to n, which array_product multiplies.

## Best Practices

- **Type Safety:** Ensure array contains only numeric values.

- **Empty Arrays:** Remember empty arrays return 1.

- **Large Numbers:** Watch for integer overflow with big products.

- **Precision:** Be mindful of floating-point precision issues.

## Source

[PHP array_product Documentation](https://www.php.net/manual/en/function.array-product.php)

This tutorial covered the PHP array_product function with practical
examples showing its usage for various multiplication scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).