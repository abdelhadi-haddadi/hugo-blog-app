+++
title = "PHP array_intersect_ukey Function"
date = 2025-08-29T20:05:02.279+01:00
draft = false
description = "PHP array_intersect_ukey function tutorial shows how to compute array key intersections in PHP. Learn array_intersect_ukey with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_intersect_ukey Function

last modified March 13, 2025

The PHP array_intersect_ukey function computes the intersection
of arrays using keys and a user-defined comparison function. It's useful for
complex key comparisons.

## Basic Definition

The array_intersect_ukey function compares array keys using a
callback function. It returns an array containing all entries from the first
array whose keys exist in all other arrays.

Syntax: array_intersect_ukey(array $array1, array $array2, ..., callable $key_compare_func): array.
The callback should return an integer less than, equal to, or greater than zero.

## Basic array_intersect_ukey Example

This shows a simple case-insensitive key comparison between two arrays.

basic_array_intersect_ukey.php
  

&lt;?php

declare(strict_types=1);

function keyCompare($key1, $key2): int {
    return strcasecmp($key1, $key2);
}

$array1 = ["Name" =&gt; "Alice", "Age" =&gt; 25];
$array2 = ["name" =&gt; "Bob", "City" =&gt; "London"];

$result = array_intersect_ukey($array1, $array2, 'keyCompare');

print_r($result); 

This compares keys case-insensitively. The callback uses strcasecmp
to match "Name" and "name". The result contains matching key-value pairs.

## Numeric Key Comparison

Compare numeric keys with a custom tolerance for floating-point differences.

numeric_key_comparison.php
  

&lt;?php

declare(strict_types=1);

function floatKeyCompare($key1, $key2): int {
    $epsilon = 0.00001;
    $diff = abs($key1 - $key2);
    if ($diff &lt; $epsilon) {
        return 0;
    }
    return ($key1 &lt; $key2) ? -1 : 1;
}

$array1 = [1.00001 =&gt; "A", 2.5 =&gt; "B"];
$array2 = [1.0 =&gt; "X", 2.49999 =&gt; "Y"];

$result = array_intersect_ukey($array1, $array2, 'floatKeyCompare');

print_r($result);

This compares floating-point keys with a small tolerance. The callback considers
keys equal if they differ by less than 0.00001. Both keys match in this example.

## Multi-Array Intersection

Find keys present in three arrays using a custom comparison function.

multi_array_intersection.php
  

&lt;?php

declare(strict_types=1);

function lengthCompare($key1, $key2): int {
    return strlen($key1) &lt;=&gt; strlen($key2);
}

$array1 = ["apple" =&gt; 1, "banana" =&gt; 2];
$array2 = ["orange" =&gt; 3, "kiwi" =&gt; 4];
$array3 = ["pear" =&gt; 5, "grape" =&gt; 6];

$result = array_intersect_ukey($array1, $array2, $array3, 'lengthCompare');

print_r($result); 

This matches keys based on their length. Only "apple" (5 letters) has matching
length keys in all arrays ("orange" and "grape"). The callback uses the spaceship
operator for comparison.

## Object Key Comparison

Compare arrays with object keys using a custom property-based comparison.

object_key_comparison.php
  

&lt;?php

declare(strict_types=1);

class ProductKey {
    public function __construct(public string $id) {}
}

function productKeyCompare($key1, $key2): int {
    return strcmp($key1-&gt;id, $key2-&gt;id);
}

$key1 = new ProductKey("P100");
$key2 = new ProductKey("P200");
$key3 = new ProductKey("P100");

$array1 = [$key1 =&gt; "Laptop", $key2 =&gt; "Phone"];
$array2 = [$key3 =&gt; "Tablet"];

$result = array_intersect_ukey($array1, $array2, 'productKeyCompare');

print_r($result); 

This compares objects as keys based on their id property. The callback uses
strcmp on the id values. Only the P100 key matches between arrays.

## Complex Key Matching

Implement advanced key matching with multiple comparison criteria.

complex_key_matching.php
  

&lt;?php

declare(strict_types=1);

function complexKeyCompare($key1, $key2): int {

    $score = 0;
    $score += strcasecmp(substr($key1, 0, 3), substr($key2, 0, 3));
    $score += (strlen($key1) &lt;=&gt; strlen($key2)) * 2;
    return $score;
}

$array1 = ["user_123" =&gt; "Alice", "admin_45" =&gt; "Bob"];
$array2 = ["USER_123" =&gt; "Active", "guest_78" =&gt; "Inactive"];

$result = array_intersect_ukey($array1, $array2, 'complexKeyCompare');

print_r($result); 

This implements a multi-factor key comparison. It matches the first 3 characters
case-insensitively and considers key length. The "user_123" key matches despite
case differences in the second array.

## Best Practices

- **Consistent Returns:** Ensure callback always returns integers.

- **Performance:** Keep comparison logic efficient for large arrays.

- **Type Safety:** Add type hints to callback parameters.

- **Documentation:** Clearly document custom comparison rules.

## Source

[PHP array_intersect_ukey Documentation](https://www.php.net/manual/en/function.array-intersect-ukey.php)

This tutorial covered the PHP array_intersect_ukey function with
practical examples showing its usage for complex key comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).