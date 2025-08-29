+++
title = "PHP array_diff Function"
date = 2025-08-29T20:04:56.630+01:00
draft = false
description = "PHP array_diff function tutorial shows how to compare arrays in PHP. Learn array_diff with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_diff Function

last modified March 13, 2025

The PHP array_diff function compares arrays and returns the
differences. It's useful for finding values that exist in one array but not
others.

## Basic Definition

The array_diff function compares array values and returns a new
array containing entries from the first array not present in others.

Syntax: array_diff(array $array, array ...$arrays): array. It
compares values using loose comparison (==). Keys are preserved in the result.

## Basic array_diff Example

This shows a simple comparison between two arrays to find unique values.

basic_array_diff.php
  

&lt;?php

$array1 = ["a", "b", "c", "d"];
$array2 = ["b", "c", "e"];

$result = array_diff($array1, $array2);

print_r($result);
// Output: Array ( [0] =&gt; a [3] =&gt; d )

This finds values in $array1 not present in $array2. The result contains "a"
and "d" with their original indices preserved from $array1.

## Comparing Multiple Arrays

array_diff can compare against multiple arrays at once.

multi_array_diff.php
  

&lt;?php

$mainArray = [1, 2, 3, 4, 5, 6];
$arrayA = [2, 4];
$arrayB = [3, 5];

$result = array_diff($mainArray, $arrayA, $arrayB);

print_r($result);
// Output: Array ( [0] =&gt; 1 [5] =&gt; 6 )

This finds values in $mainArray not present in either $arrayA or $arrayB. The
result contains 1 and 6, the only numbers unique to $mainArray.

## Associative Array Comparison

array_diff works with associative arrays, comparing only values.

assoc_array_diff.php
  

&lt;?php

$user1 = ["name" =&gt; "John", "age" =&gt; 30, "city" =&gt; "New York"];
$user2 = ["name" =&gt; "Jane", "age" =&gt; 25, "city" =&gt; "New York"];

$result = array_diff($user1, $user2);

print_r($result);
// Output: Array ( [name] =&gt; John [age] =&gt; 30 )

This compares associative arrays by value. The result shows differences in name
and age fields. The city value is the same so it's excluded from the result.

## Strict Comparison with array_diff

For strict comparison (===), combine array_diff with
array_udiff.

strict_array_diff.php
  

&lt;?php

$array1 = ["1", 2, 3];
$array2 = [1, 2, "3"];

// Regular array_diff (loose comparison)
$looseDiff = array_diff($array1, $array2);

// Strict comparison
$strictDiff = array_udiff($array1, $array2, function($a, $b) {
    return $a === $b ? 0 : 1;
});

print_r($looseDiff);   // Output: Array ( )
print_r($strictDiff);  // Output: Array ( [0] =&gt; 1 [2] =&gt; 3 )

This demonstrates the difference between loose and strict comparison. The
regular array_diff finds no differences while the strict version
does, due to type differences between string "1" and integer 1.

## Finding New Items in Updated Data

Practical example: finding new items in an updated dataset compared to original.

practical_array_diff.php
  

&lt;?php

$originalProducts = ["Laptop", "Phone", "Tablet"];
$updatedProducts = ["Laptop", "Phone", "Tablet", "Watch", "Headphones"];

$newProducts = array_diff($updatedProducts, $originalProducts);

print_r($newProducts);
// Output: Array ( [3] =&gt; Watch [4] =&gt; Headphones )

This identifies new products added to the inventory. The result contains
"Watch" and "Headphones" which weren't in the original product list.

## Best Practices

- **Key Preservation:** Be aware that keys are preserved from the first array.

- **Performance:** For large arrays, consider sorting first for better performance.

- **Type Awareness:** Remember it uses loose comparison by default.

- **Order Matters:** The first array determines which values are checked.

## Source

[PHP array_diff Documentation](https://www.php.net/manual/en/function.array-diff.php)

This tutorial covered the PHP array_diff function with practical
examples showing its usage for array comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).