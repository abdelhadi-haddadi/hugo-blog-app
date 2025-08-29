+++
title = "PHP array_multisort Function"
date = 2025-08-29T20:05:05.616+01:00
draft = false
description = "PHP array_multisort function tutorial shows how to sort multiple or multidimensional arrays in PHP. Learn array_multisort with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_multisort Function

last modified March 13, 2025

The PHP array_multisort function sorts multiple arrays or a
multidimensional array by one or more dimensions. It's powerful for complex
sorting scenarios.

## Basic Definition

array_multisort can sort several arrays at once or a multi-
dimensional array by one or more columns. It maintains index association.

Syntax: array_multisort(array &amp;$array1 [, mixed $array1_sort_order = SORT_ASC
[, mixed $array1_sort_flags = SORT_REGULAR [, mixed $... ]]]): bool.

## Sorting Two Parallel Arrays

This example demonstrates sorting two arrays where one array acts as sort key.

parallel_arrays.php
  

&lt;?php

$names = ["Tom", "Alice", "Bob"];
$ages = [25, 22, 30];

array_multisort($ages, SORT_ASC, $names);

print_r($names); 
print_r($ages);  

Here we sort both arrays by age in ascending order. The $names
array is rearranged to match the sorted $ages array order.

## Sorting a Multidimensional Array

Sort a multidimensional array by one of its columns while maintaining structure.

multidimensional_array.php
  

&lt;?php

$users = [
    ["name" =&gt; "Tom", "age" =&gt; 25],
    ["name" =&gt; "Alice", "age" =&gt; 22],
    ["name" =&gt; "Bob", "age" =&gt; 30]
];

$ages = array_column($users, 'age');
array_multisort($ages, SORT_ASC, $users);

print_r($users);

This sorts the $users array by age in ascending order. We first
extract the age column, then use it as the sort key for the main array.

## Sorting by Multiple Columns

Sort a multidimensional array by multiple columns with different sort orders.

multiple_columns.php
  

&lt;?php

$products = [
    ["name" =&gt; "Laptop", "price" =&gt; 999, "stock" =&gt; 5],
    ["name" =&gt; "Phone", "price" =&gt; 699, "stock" =&gt; 10],
    ["name" =&gt; "Tablet", "price" =&gt; 399, "stock" =&gt; 8],
    ["name" =&gt; "Monitor", "price" =&gt; 199, "stock" =&gt; 3]
];

$prices = array_column($products, 'price');
$stocks = array_column($products, 'stock');

array_multisort(
    $prices, SORT_ASC,
    $stocks, SORT_DESC,
    $products
);

print_r($products);

This sorts products by price ascending, then by stock descending. The primary
sort is on price, with stock used to break ties between equal prices.

## Case-Insensitive String Sorting

Sort string arrays case-insensitively using the SORT_FLAG_CASE flag.

case_insensitive.php
  

&lt;?php

$fruits = ["apple", "Orange", "banana", "PEAR"];
array_multisort($fruits, SORT_ASC, SORT_FLAG_CASE | SORT_STRING);

print_r($fruits); 

The SORT_FLAG_CASE flag makes the sort case-insensitive. Without
it, uppercase letters would sort before lowercase ones.

## Natural Order Sorting

Sort strings containing numbers in natural human order using SORT_NATURAL.

natural_sort.php
  

&lt;?php

$versions = ["version1", "version10", "version2", "version20"];
array_multisort($versions, SORT_ASC, SORT_NATURAL);

print_r($versions); 

Natural sorting treats numeric parts of strings as numbers rather than text.
This produces more intuitive results for version numbers or filenames.

## Best Practices

- **Reference Parameters:** Remember arrays are passed by reference.

- **Column Extraction:** Use array_column() for multidimensional arrays.

- **Flag Combinations:** Combine flags like SORT_NATURAL | SORT_FLAG_CASE.

- **Error Handling:** Check return value as it returns bool.

- **Memory:** Be mindful with large arrays as it sorts in-place.

## Source

[PHP array_multisort Documentation](https://www.php.net/manual/en/function.array-multisort.php)

This tutorial covered the PHP array_multisort function with practical
examples showing its usage for various sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).