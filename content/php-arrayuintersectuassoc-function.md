+++
title = "PHP array_uintersect_uassoc Function"
date = 2025-08-29T20:05:13.403+01:00
draft = false
description = "PHP array_uintersect_uassoc function tutorial shows how to compute array intersection with custom comparison in PHP. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_uintersect_uassoc Function

last modified March 13, 2025

The PHP array_uintersect_uassoc function computes the intersection
of arrays with additional index check and custom comparison functions. It's
useful for complex array comparisons.

## Basic Definition

The array_uintersect_uassoc function compares arrays using two
callback functions. One for value comparison and one for key comparison.

Syntax: array_uintersect_uassoc(array $array1, array $array2, ..., callable $value_compare_func, callable $key_compare_func): array.
It returns an array containing all values present in all arguments.

## Basic array_uintersect_uassoc Example

This shows simple intersection with custom value and key comparison functions.

basic_array_uintersect_uassoc.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; "green", "b" =&gt; "brown", "c" =&gt; "blue"];
$array2 = ["a" =&gt; "GREEN", "B" =&gt; "brown", "yellow"];

$result = array_uintersect_uassoc(
    $array1,
    $array2,
    fn($a, $b) =&gt; strcasecmp($a, $b), // Case-insensitive value compare
    fn($a, $b) =&gt; strcasecmp($a, $b)  // Case-insensitive key compare
);

print_r($result); 

This finds intersection using case-insensitive comparison for both values and
keys. Only "green"/"GREEN" with key "a" appears in both arrays.

## Comparing Objects

Use custom callbacks to compare objects in arrays by their properties.

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
    "P1" =&gt; new Product("Laptop", 999.99),
    "p3" =&gt; new Product("Tablet", 399.99)
];

$result = array_uintersect_uassoc(
    $products1,
    $products2,
    fn($a, $b) =&gt; $a-&gt;name &lt;=&gt; $b-&gt;name, // Compare by name
    fn($a, $b) =&gt; strcasecmp($a, $b)     // Case-insensitive key compare
);

print_r($result); 

This finds products with same name, ignoring key case. The Laptop product is
included in the result despite different key cases ("p1" vs "P1").

## Complex Key Comparison

Implement advanced key comparison logic for specialized intersection needs.

complex_key_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["user_1" =&gt; "Alice", "user_2" =&gt; "Bob", "admin" =&gt; "Charlie"];
$array2 = ["USER-1" =&gt; "Alice", "guest" =&gt; "Dave", "ADMIN" =&gt; "Charlie"];

$result = array_uintersect_uassoc(
    $array1,
    $array2,
    fn($a, $b) =&gt; strcmp($a, $b), // Standard value comparison
    function($a, $b) {            // Custom key comparison
        $normalize = fn($k) =&gt; strtolower(str_replace(['_', '-'], '', $k));
        return strcmp($normalize($a), $normalize($b));
    }
);

print_r($result); 

This normalizes keys by removing underscores/dashes and ignoring case before
comparison. Matches "user_1" with "USER-1" and "admin" with "ADMIN".

## Multiple Array Comparison

Compare more than two arrays with custom comparison functions.

multiple_array_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["A" =&gt; 1, "B" =&gt; 2, "C" =&gt; 3];
$array2 = ["a" =&gt; 1, "b" =&gt; 4, "c" =&gt; 3];
$array3 = ["A" =&gt; 1, "B" =&gt; 5, "C" =&gt; 3];

$result = array_uintersect_uassoc(
    $array1,
    $array2,
    $array3,
    fn($a, $b) =&gt; $a &lt;=&gt; $b,      // Numeric value comparison
    fn($a, $b) =&gt; strcasecmp($a, $b) // Case-insensitive key comparison
);

print_r($result); 

This finds entries with same values and case-insensitive matching keys across
three arrays. Only keys "A"/"a" and "C"/"c" with value 1 and 3 match.

## Custom Value Comparison Logic

Implement complex value comparison logic for specialized intersection needs.

custom_value_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["id1" =&gt; ["name" =&gt; "Alice", "score" =&gt; 85], "id2" =&gt; ["name" =&gt; "Bob", "score" =&gt; 90]];
$array2 = ["ID1" =&gt; ["name" =&gt; "Alice", "score" =&gt; 85], "id3" =&gt; ["name" =&gt; "Charlie", "score" =&gt; 95]];

$result = array_uintersect_uassoc(
    $array1,
    $array2,
    function($a, $b) { // Compare associative arrays
        return $a["name"] &lt;=&gt; $b["name"] ?: $a["score"] &lt;=&gt; $b["score"];
    },
    fn($a, $b) =&gt; strcasecmp($a, $b) // Case-insensitive key comparison
);

print_r($result); 

This compares nested arrays by both name and score, while matching keys case-
insensitively. Only Alice's record matches in both arrays with same details.

## Best Practices

- **Consistent Comparisons:** Ensure comparison functions are transitive.

- **Performance:** Optimize callbacks for large arrays.

- **Type Safety:** Add type hints in callbacks for PHP 8+.

- **Readability:** Use named functions for complex logic.

- **Testing:** Verify edge cases in comparison functions.

## Source

[PHP array_uintersect_uassoc Documentation](https://www.php.net/manual/en/function.array-uintersect-uassoc.php)

This tutorial covered the PHP array_uintersect_uassoc function
with practical examples showing its usage for complex array intersections.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).