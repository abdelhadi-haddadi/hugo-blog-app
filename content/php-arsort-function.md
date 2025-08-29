+++
title = "PHP arsort Function"
date = 2025-08-29T20:05:15.617+01:00
draft = false
description = "PHP arsort function tutorial shows how to sort associative arrays in descending order in PHP. Learn arsort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP arsort Function

last modified March 13, 2025

The PHP arsort function sorts an associative array in descending
order according to the value while maintaining key-value associations.

## Basic Definition

The arsort function sorts an array by values in descending order.
Unlike rsort, it preserves the key-value pairs of the array.

Syntax: arsort(array &amp;$array, int $flags = SORT_REGULAR): bool.
The function modifies the original array and returns true on success.

## Basic arsort Example

This demonstrates sorting an associative array by values in descending order.

basic_arsort.php
  

&lt;?php

$fruits = [
    "apple" =&gt; 5,
    "banana" =&gt; 2,
    "orange" =&gt; 8,
    "pear" =&gt; 3
];

arsort($fruits);

print_r($fruits);

Output shows the fruits sorted by quantity in descending order. The key-value
pairs remain intact, only their order changes.

## Sorting with Different Flags

arsort supports different sorting flags for varied behavior.

sorting_flags.php
  

&lt;?php

$numbers = [
    "first" =&gt; "10",
    "second" =&gt; "2",
    "third" =&gt; "100",
    "fourth" =&gt; "20"
];

arsort($numbers, SORT_STRING);
echo "String sort:\n";
print_r($numbers);

arsort($numbers, SORT_NUMERIC);
echo "\nNumeric sort:\n";
print_r($numbers);

The first sort treats values as strings (100 comes before 20), while the second
does numeric comparison. Flags change how values are compared.

## Sorting Multidimensional Arrays

When working with complex data, we can combine arsort with other
functions for multidimensional sorting.

multidimensional.php
  

&lt;?php

$students = [
    ["name" =&gt; "Alice", "score" =&gt; 85],
    ["name" =&gt; "Bob", "score" =&gt; 92],
    ["name" =&gt; "Charlie", "score" =&gt; 78]
];

$scores = array_column($students, "score");
arsort($scores);

$sortedStudents = [];
foreach ($scores as $key =&gt; $value) {
    $sortedStudents[] = $students[$key];
}

print_r($sortedStudents);

This sorts students by score in descending order while maintaining the full
student data structure. We first extract scores for sorting.

## Sorting Objects by Property

We can sort an array of objects by one of their properties using arsort.

object_sorting.php
  

&lt;?php

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products = [
    new Product("Laptop", 999.99),
    new Product("Phone", 699.99),
    new Product("Tablet", 399.99)
];

$prices = [];
foreach ($products as $key =&gt; $product) {
    $prices[$key] = $product-&gt;price;
}

arsort($prices);

$sortedProducts = [];
foreach ($prices as $key =&gt; $price) {
    $sortedProducts[] = $products[$key];
}

print_r($sortedProducts);

This example sorts products by price in descending order. We first extract prices
to an array, sort it, then rebuild the object array in the new order.

## Case-Insensitive Sorting

For string values, we might want case-insensitive sorting using a custom approach.

case_insensitive.php
  

&lt;?php

$words = [
    "a" =&gt; "Zebra",
    "b" =&gt; "apple",
    "c" =&gt; "Banana",
    "d" =&gt; "orange"
];

$lowercaseValues = array_map('strtolower', $words);
arsort($lowercaseValues);

$sortedWords = [];
foreach ($lowercaseValues as $key =&gt; $value) {
    $sortedWords[$key] = $words[$key];
}

print_r($sortedWords);

This sorts words alphabetically in descending order ignoring case. We create a
temporary array with lowercase values for case-insensitive comparison.

## Best Practices

- **Preserve Keys:** Use arsort when you need to maintain key-value associations.

- **Sort Flags:** Choose appropriate sorting flags for your data type.

- **Large Arrays:** For very large arrays, consider more efficient sorting algorithms.

- **Complex Data:** Combine with other array functions for multidimensional sorting.

## Source

[PHP arsort Documentation](https://www.php.net/manual/en/function.arsort.php)

This tutorial covered the PHP arsort function with practical
examples showing its usage for various sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).