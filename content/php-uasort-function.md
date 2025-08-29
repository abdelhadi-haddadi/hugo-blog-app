+++
title = "PHP uasort Function"
date = 2025-08-29T20:05:24.679+01:00
draft = false
description = "PHP uasort function tutorial shows how to sort arrays while maintaining index association in PHP. Learn uasort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP uasort Function

last modified March 13, 2025

The PHP uasort function sorts an array with a user-defined
comparison function while maintaining index association. It's useful for
associative arrays where key-value pairs must be preserved.

## Basic Definition

The uasort function sorts an array using a callback comparison
function. Unlike usort, it preserves the original array keys.

Syntax: uasort(array &amp;$array, callable $callback): bool. The
callback must return an integer less than, equal to, or greater than zero.

## Basic uasort Example

This example demonstrates sorting an associative array by values while
keeping the key-value associations intact.

basic_uasort.php
  

&lt;?php

$fruits = [
    "a" =&gt; "lemon",
    "b" =&gt; "orange",
    "c" =&gt; "banana",
    "d" =&gt; "apple"
];

function compare($a, $b) {
    return strcmp($a, $b);
}

uasort($fruits, 'compare');

print_r($fruits);

This sorts the fruits array alphabetically by value while maintaining
the original keys. The output shows the sorted array with preserved
key-value pairs.

## Sorting by String Length

Sort an associative array by the length of its string values while
keeping the original keys.

string_length_sort.php
  

&lt;?php

$words = [
    "first" =&gt; "cat",
    "second" =&gt; "elephant",
    "third" =&gt; "dog",
    "fourth" =&gt; "giraffe"
];

uasort($words, function($a, $b) {
    return strlen($a) - strlen($b);
});

print_r($words);

The array is sorted by word length in ascending order. The anonymous
callback function compares string lengths to determine the order.

## Sorting Objects by Property

Sort an array of objects by a specific property while maintaining
the original array keys.

object_property_sort.php
  

&lt;?php

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products = [
    "p1" =&gt; new Product("Laptop", 999.99),
    "p2" =&gt; new Product("Phone", 699.99),
    "p3" =&gt; new Product("Tablet", 399.99)
];

uasort($products, function($a, $b) {
    return $a-&gt;price &lt;=&gt; $b-&gt;price;
});

print_r($products);

This sorts products by price in ascending order. The spaceship operator
(&lt;=&gt;) simplifies the comparison of numeric values.

## Case-Insensitive Sorting

Perform a case-insensitive sort on an associative array while
preserving the original keys.

case_insensitive_sort.php
  

&lt;?php

$names = [
    "user1" =&gt; "John",
    "user2" =&gt; "alice",
    "user3" =&gt; "Bob",
    "user4" =&gt; "CHARLIE"
];

uasort($names, function($a, $b) {
    return strcasecmp($a, $b);
});

print_r($names);

The array is sorted alphabetically without considering letter case.
The strcasecmp function handles the case-insensitive
comparison.

## Multi-Dimensional Array Sorting

Sort a multi-dimensional associative array by a specific sub-array
value while maintaining the outer array keys.

multi_dimensional_sort.php
  

&lt;?php

$employees = [
    "e1" =&gt; ["name" =&gt; "Alice", "salary" =&gt; 55000],
    "e2" =&gt; ["name" =&gt; "Bob", "salary" =&gt; 45000],
    "e3" =&gt; ["name" =&gt; "Charlie", "salary" =&gt; 60000]
];

uasort($employees, function($a, $b) {
    return $b["salary"] &lt;=&gt; $a["salary"];
});

print_r($employees);

This sorts employees by salary in descending order. The callback
accesses the salary values in each sub-array for comparison.

## Best Practices

- **Clear Callbacks:** Use descriptive names for comparison functions.

- **Type Safety:** Add type hints for robust comparison logic.

- **Performance:** Keep comparison functions efficient for large arrays.

- **Consistency:** Ensure comparison function returns consistent values.

## Source

[PHP uasort Documentation](https://www.php.net/manual/en/function.uasort.php)

This tutorial covered the PHP uasort function with practical
examples showing its usage for sorting associative arrays while preserving keys.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).