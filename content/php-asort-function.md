+++
title = "PHP asort Function"
date = 2025-08-29T20:05:15.620+01:00
draft = false
description = "PHP asort function tutorial shows how to sort associative arrays in PHP while maintaining index association. Learn asort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP asort Function

last modified March 13, 2025

The PHP asort function sorts an associative array in ascending
order while maintaining index association. It's useful for sorting arrays
where the key-value relationship is important.

## Basic Definition

The asort function sorts an array by its values while keeping
the keys associated with their respective values. It modifies the original
array directly.

Syntax: asort(array &amp;$array, int $flags = SORT_REGULAR): bool.
The function returns true on success, false on failure. The optional flags
parameter modifies sorting behavior.

## Basic asort Example

This demonstrates sorting an associative array by values while maintaining
key-value pairs.

basic_asort.php
  

&lt;?php

$fruits = [
    "a" =&gt; "orange",
    "b" =&gt; "banana",
    "c" =&gt; "apple"
];

asort($fruits);

print_r($fruits);

Output: Array ( [c] =&gt; apple [b] =&gt; banana [a] =&gt; orange ).
The array is sorted alphabetically by values while preserving the keys.

## Sorting Numeric Values

asort can sort arrays with numeric values while keeping keys.

numeric_asort.php
  

&lt;?php

$scores = [
    "Alice" =&gt; 85,
    "Bob" =&gt; 92,
    "Charlie" =&gt; 78
];

asort($scores);

print_r($scores);

Output: Array ( [Charlie] =&gt; 78 [Alice] =&gt; 85 [Bob] =&gt; 92 ).
The scores are sorted from lowest to highest while maintaining name keys.

## Using Sorting Flags

The optional second parameter allows specifying different sorting behaviors.

flags_asort.php
  

&lt;?php

$mixedNumbers = [
    "first" =&gt; "10",
    "second" =&gt; 2,
    "third" =&gt; "1"
];

asort($mixedNumbers, SORT_NUMERIC);

print_r($mixedNumbers);

Output: Array ( [third] =&gt; 1 [second] =&gt; 2 [first] =&gt; 10 ).
The SORT_NUMERIC flag ensures numeric comparison of values.

## Sorting with Custom Comparison

For complex sorting, combine asort with uksort.

custom_asort.php
  

&lt;?php

$products = [
    "widgetA" =&gt; ["price" =&gt; 15, "rating" =&gt; 4],
    "widgetB" =&gt; ["price" =&gt; 10, "rating" =&gt; 5],
    "widgetC" =&gt; ["price" =&gt; 20, "rating" =&gt; 3]
];

// Sort by price then rating
uasort($products, function($a, $b) {
    return $a["price"] &lt;=&gt; $b["price"] ?: $a["rating"] &lt;=&gt; $b["rating"];
});

print_r($products);

Output shows products sorted first by price, then by rating. The spaceship
operator (&lt;=&gt;) simplifies comparison logic.

## Reverse Sorting with arsort

The related arsort function sorts in descending order.

reverse_asort.php
  

&lt;?php

$ages = [
    "John" =&gt; 25,
    "Mary" =&gt; 30,
    "Peter" =&gt; 20
];

arsort($ages);

print_r($ages);

Output: Array ( [Mary] =&gt; 30 [John] =&gt; 25 [Peter] =&gt; 20 ).
arsort maintains key association while sorting high to low.

## Best Practices

- **Preserve Keys:** Use asort when key-value pairs must remain intact.

- **Performance:** For large arrays, consider sorting flags for optimization.

- **Stable Sort:** PHP's sort functions are not stable by default.

- **Alternative Functions:** Consider ksort for key-based sorting.

## Source

[PHP asort Documentation](https://www.php.net/manual/en/function.asort.php)

This tutorial covered the PHP asort function with practical
examples showing its usage for sorting associative arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).