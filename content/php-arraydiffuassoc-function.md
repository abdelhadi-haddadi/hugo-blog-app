+++
title = "PHP array_diff_uassoc Function"
date = 2025-08-29T20:04:57.760+01:00
draft = false
description = "PHP array_diff_uassoc function tutorial shows how to compute array difference with key comparison in PHP. Learn array_diff_uassoc with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_diff_uassoc Function

last modified March 13, 2025

The PHP array_diff_uassoc function computes the difference of
arrays with additional index check. It compares both keys and values using
a user-defined callback function.

## Basic Definition

The array_diff_uassoc function compares arrays and returns the
difference. It checks both keys and values, using a callback for key comparison.

Syntax: array_diff_uassoc(array $array1, array $array2, ..., callable $key_compare_func): array.
The callback should return an integer less than, equal to, or greater than zero.

## Basic array_diff_uassoc Example

This example shows a simple comparison of two arrays with custom key comparison.

basic_array_diff_uassoc.php
  

&lt;?php

function key_compare($a, $b) {
    if ($a === $b) {
        return 0;
    }
    return ($a &gt; $b) ? 1 : -1;
}

$array1 = ["a" =&gt; "red", "b" =&gt; "green", "c" =&gt; "blue"];
$array2 = ["a" =&gt; "red", "d" =&gt; "green"];

$result = array_diff_uassoc($array1, $array2, "key_compare");

print_r($result);

This compares two arrays using a custom key comparison function. The output
shows elements from $array1 not present in $array2, considering both keys
and values.

## Case-Insensitive Key Comparison

This example demonstrates case-insensitive key comparison between arrays.

case_insensitive.php
  

&lt;?php

function case_insensitive_compare($a, $b) {
    return strcasecmp($a, $b);
}

$array1 = ["A" =&gt; "apple", "B" =&gt; "banana", "C" =&gt; "cherry"];
$array2 = ["a" =&gt; "apple", "b" =&gt; "berry"];

$result = array_diff_uassoc($array1, $array2, "case_insensitive_compare");

print_r($result);

The callback uses strcasecmp for case-insensitive comparison.
Only elements with different case-insensitive keys or different values are
returned in the result.

## Comparing Multiple Arrays

This example shows how to compare more than two arrays using array_diff_uassoc.

multiple_arrays.php
  

&lt;?php

function numeric_compare($a, $b) {
    return $a &lt;=&gt; $b;
}

$array1 = [10 =&gt; "ten", 20 =&gt; "twenty", 30 =&gt; "thirty"];
$array2 = [10 =&gt; "ten", 20 =&gt; "twentyone"];
$array3 = [10 =&gt; "ten", 30 =&gt; "thirtytwo"];

$result = array_diff_uassoc($array1, $array2, $array3, "numeric_compare");

print_r($result);

The function compares all arrays against the first array. Only elements not
present in any of the other arrays (considering both keys and values) are
returned. The spaceship operator simplifies the comparison.

## Complex Key Comparison

This example demonstrates a more complex key comparison logic.

complex_comparison.php
  

&lt;?php

function complex_compare($a, $b) {
    // Compare string length first, then alphabetical order
    $len1 = strlen($a);
    $len2 = strlen($b);
    
    if ($len1 != $len2) {
        return $len1 &lt;=&gt; $len2;
    }
    return strcmp($a, $b);
}

$array1 = ["apple" =&gt; 1, "banana" =&gt; 2, "cherry" =&gt; 3];
$array2 = ["apple" =&gt; 1, "berry" =&gt; 4, "cherry" =&gt; 5];

$result = array_diff_uassoc($array1, $array2, "complex_compare");

print_r($result);

The callback first compares key lengths, then alphabetical order. This shows
how to implement multi-criteria comparison logic for array keys.

## Object Key Comparison

This advanced example compares arrays with object keys using array_diff_uassoc.

object_keys.php
  

&lt;?php

class ProductKey {
    public function __construct(public string $id) {}
}

function object_compare($a, $b) {
    return strcmp($a-&gt;id, $b-&gt;id);
}

$key1 = new ProductKey("p1");
$key2 = new ProductKey("p2");
$key3 = new ProductKey("p3");

$array1 = [$key1 =&gt; "Laptop", $key2 =&gt; "Phone"];
$array2 = [$key1 =&gt; "Laptop", $key3 =&gt; "Tablet"];

$result = array_diff_uassoc($array1, $array2, "object_compare");

print_r($result);

This demonstrates comparing arrays with object keys. The callback compares
objects based on their id property. Only the Phone entry is returned as
it's not present in $array2 with the same key and value.

## Best Practices

- **Consistent Callbacks:** Ensure your comparison function is consistent.

- **Performance:** Keep comparison logic efficient for large arrays.

- **Type Safety:** Add type hints in PHP 7+ for robust code.

- **Documentation:** Clearly document your comparison logic.

## Source

[PHP array_diff_uassoc Documentation](https://www.php.net/manual/en/function.array-diff-uassoc.php)

This tutorial covered the PHP array_diff_uassoc function with
practical examples showing its usage for array comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).