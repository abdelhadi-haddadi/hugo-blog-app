+++
title = "PHP array_diff_ukey Function"
date = 2025-08-29T20:04:57.762+01:00
draft = false
description = "PHP array_diff_ukey function tutorial shows how to compare array keys in PHP using a callback function. Learn array_diff_ukey with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_diff_ukey Function

last modified March 13, 2025

The PHP array_diff_ukey function compares array keys using a
callback function. It returns the difference between arrays based on key
comparison.

## Basic Definition

The array_diff_ukey function computes the difference of arrays
using keys. It compares keys with a user-supplied callback function.

Syntax: array_diff_ukey(array $array1, array $array2, ..., callable $key_compare_func): array.
The callback should return an integer less than, equal to, or greater than zero.

## Basic array_diff_ukey Example

This example shows simple key comparison between two arrays using a callback.

basic_array_diff_ukey.php
  

&lt;?php

function keyCompare($key1, $key2) {
    return strcasecmp($key1, $key2);
}

$array1 = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3];
$array2 = ['A' =&gt; 4, 'B' =&gt; 5];

$result = array_diff_ukey($array1, $array2, 'keyCompare');

print_r($result); 

The callback performs case-insensitive comparison. Only key 'c' exists in
$array1 but not in $array2 when ignoring case.

## Comparing Numeric Keys

This example demonstrates comparing numeric keys with custom logic.

numeric_keys.php
  

&lt;?php

function numericCompare($key1, $key2) {
    return $key1 &lt;=&gt; $key2;
}

$array1 = [10 =&gt; 'a', 20 =&gt; 'b', 30 =&gt; 'c'];
$array2 = [15 =&gt; 'd', 20 =&gt; 'e'];

$result = array_diff_ukey($array1, $array2, 'numericCompare');

print_r($result); 

The callback uses the spaceship operator for numeric comparison. Keys 10 and
30 exist only in the first array, so they appear in the result.

## Multiple Array Comparison

Compare one array against multiple arrays with custom key comparison.

multiple_arrays.php
  

&lt;?php

function lengthCompare($key1, $key2) {
    return strlen($key1) &lt;=&gt; strlen($key2);
}

$array1 = ['apple' =&gt; 1, 'banana' =&gt; 2, 'cherry' =&gt; 3];
$array2 = ['pear' =&gt; 4];
$array3 = ['kiwi' =&gt; 5, 'orange' =&gt; 6];

$result = array_diff_ukey($array1, $array2, $array3, 'lengthCompare');

print_r($result); 

The callback compares keys by length. Only 'banana' and 'cherry' have unique
lengths not found in other arrays.

## Object Key Comparison

Compare arrays with object keys using a custom comparison function.

object_keys.php
  

&lt;?php

class ProductKey {
    public function __construct(public string $id) {}
}

function productCompare($key1, $key2) {
    return strcmp($key1-&gt;id, $key2-&gt;id);
}

$key1 = new ProductKey('p1');
$key2 = new ProductKey('p2');
$key3 = new ProductKey('p3');

$array1 = [$key1 =&gt; 'Laptop', $key2 =&gt; 'Phone'];
$array2 = [$key3 =&gt; 'Tablet'];

$result = array_diff_ukey($array1, $array2, 'productCompare');

print_r($result); 

The callback compares object properties. Both keys in $array1 are different
from $array2's key based on their id property values.

## Case-Sensitive String Comparison

Perform case-sensitive key comparison between arrays.

case_sensitive.php
  

&lt;?php

function caseSensitiveCompare($key1, $key2) {
    return strcmp($key1, $key2);
}

$array1 = ['Name' =&gt; 'John', 'Age' =&gt; 30];
$array2 = ['name' =&gt; 'Jane', 'age' =&gt; 25];

$result = array_diff_ukey($array1, $array2, 'caseSensitiveCompare');

print_r($result); 

The callback performs case-sensitive comparison. All keys differ due to
different casing, so all elements from $array1 are returned.

## Best Practices

- **Consistent Callbacks:** Ensure your callback returns consistent comparison results.

- **Type Safety:** Add type hints to callback parameters when possible.

- **Performance:** Use simple comparison logic for large arrays.

- **Readability:** Name callback functions descriptively.

## Source

[PHP array_diff_ukey Documentation](https://www.php.net/manual/en/function.array-diff-ukey.php)

This tutorial covered the PHP array_diff_ukey function with
practical examples showing its usage for various key comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).