+++
title = "PHP array_sum Function"
date = 2025-08-29T20:05:11.183+01:00
draft = false
description = "PHP array_sum function tutorial shows how to calculate the sum of array elements in PHP. Learn array_sum with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_sum Function

last modified March 13, 2025

The PHP array_sum function calculates the sum of values in an array.
It's a convenient way to add up numeric values without manual iteration.

## Basic Definition

The array_sum function returns the sum of values in an array.
It converts non-numeric values to numbers (0 for non-convertible values).

Syntax: array_sum(array $array): int|float. The function returns
an integer or float depending on the array values. Empty arrays return 0.

## Basic array_sum Example

This demonstrates summing a simple array of integers to get a total.

basic_array_sum.php
  

&lt;?php

$numbers = [10, 20, 30, 40];
$total = array_sum($numbers);

echo "The sum is: " . $total; 

This adds all numbers in the array. The function handles the iteration and
summation automatically, returning the combined total of all elements.

## Summing Floating Point Numbers

array_sum works with floating-point numbers, returning a float.

float_sum.php
  

&lt;?php

$prices = [12.99, 9.99, 24.50, 5.75];
$totalPrice = array_sum($prices);

echo "Total price: $" . number_format($totalPrice, 2); 

This calculates the sum of product prices. The result is a float value that
we format to two decimal places for proper monetary display.

## Handling Mixed Numeric Types

The function automatically handles arrays containing both integers and floats.

mixed_types.php
  

&lt;?php

$values = [5, 10.5, "15", "20.25"];
$sum = array_sum($values);

echo "Mixed sum: " . $sum; 

Numeric strings are converted to numbers. The function returns a float since
some values contain decimal points, maintaining precision in the result.

## Non-Numeric Values Behavior

Non-numeric values are treated as 0 in the summation process.

non_numeric.php
  

&lt;?php

$mixed = [10, "apple", 20, "orange", 5.5];
$result = array_sum($mixed);

echo "Sum with non-numerics: " . $result; 

String values that can't be converted to numbers are treated as 0. Only the
numeric values (10, 20, 5.5) contribute to the final sum in this example.

## Empty Array Handling

When passed an empty array, array_sum returns 0 by default.

empty_array.php
  

&lt;?php

$empty = [];
$sum = array_sum($empty);

echo "Empty array sum: " . $sum; 

This behavior is useful when working with dynamically generated arrays that
might be empty, preventing the need for special empty array checks.

## Best Practices

- **Type Checking:** Validate array contents if strict typing is needed.

- **Precision:** Be aware of floating-point precision limitations.

- **Large Arrays:** Works efficiently even with large arrays.

- **Error Handling:** Consider checking array contents for non-numeric values.

## Source

[PHP array_sum Documentation](https://www.php.net/manual/en/function.array-sum.php)

This tutorial covered the PHP array_sum function with practical
examples showing its usage for various array summation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).