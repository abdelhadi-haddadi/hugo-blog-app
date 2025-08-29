+++
title = "PHP array_intersect_uassoc Function"
date = 2025-08-29T20:05:02.283+01:00
draft = false
description = "PHP array_intersect_uassoc function tutorial shows how to compute array intersection with key comparison in PHP. Learn array_intersect_uassoc with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_intersect_uassoc Function

last modified March 13, 2025

The PHP array_intersect_uassoc function computes the intersection
of arrays with additional index check. It compares keys using a callback.

## Basic Definition

array_intersect_uassoc returns an array containing all values
from the first array that are present in all other arrays. Keys are compared
using a user-supplied callback function.

Syntax: array_intersect_uassoc(array $array1, array $array2, ..., callable $key_compare_func): array.
The callback should return an integer less than, equal to, or greater than zero.

## Basic array_intersect_uassoc Example

This example shows how to find intersection of arrays with case-insensitive
key comparison.

basic_array_intersect_uassoc.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; "apple", "B" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["A" =&gt; "apple", "b" =&gt; "banana", "C" =&gt; "cherry"];

$result = array_intersect_uassoc($array1, $array2, function($a, $b) {
    return strcasecmp($a, $b);
});

print_r($result);

This finds elements present in both arrays where keys match case-insensitively.
The callback uses strcasecmp for case-insensitive comparison.

## Numeric Key Comparison

Compare numeric keys with custom logic to find matching elements.

numeric_key_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = [1 =&gt; "one", 2 =&gt; "two", 3 =&gt; "three"];
$array2 = ["1" =&gt; "one", "2" =&gt; "two", 4 =&gt; "four"];

$result = array_intersect_uassoc($array1, $array2, function($a, $b) {
    return $a &lt;=&gt; $b;
});

print_r($result);

This compares numeric keys loosely (string vs integer). The spaceship operator
(&lt;=&gt;) handles the comparison, matching keys 1 and 2.

## Complex Key Comparison

Use a more complex callback function to compare composite keys.

complex_key_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["user_1" =&gt; "Alice", "user_2" =&gt; "Bob", "admin_1" =&gt; "Charlie"];
$array2 = ["USER_1" =&gt; "Alice", "user_3" =&gt; "Dave", "ADMIN_1" =&gt; "Charlie"];

$result = array_intersect_uassoc($array1, $array2, function($a, $b) {
    $aParts = explode('_', strtolower($a));
    $bParts = explode('_', strtolower($b));
    
    if ($aParts[0] !== $bParts[0]) return $aParts[0] &lt;=&gt; $bParts[0];
    return $aParts[1] &lt;=&gt; $bParts[1];
});

print_r($result);

This compares keys by splitting them into parts and comparing each part. The
callback normalizes case and compares type then ID separately.

## Multiple Array Comparison

Compare more than two arrays with custom key comparison logic.

multiple_array_comparison.php
  

&lt;?php

declare(strict_types=1);

$array1 = ["a" =&gt; "apple", "b" =&gt; "banana", "c" =&gt; "cherry"];
$array2 = ["A" =&gt; "apple", "B" =&gt; "banana", "D" =&gt; "date"];
$array3 = ["a" =&gt; "apple", "b" =&gt; "blueberry", "c" =&gt; "cherry"];

$result = array_intersect_uassoc($array1, $array2, $array3, function($a, $b) {
    return strcasecmp($a, $b);
});

print_r($result);

This finds elements present in all three arrays with case-insensitive key
matching. Only "apple" with key "a" appears in all arrays.

## Object Key Comparison

Compare arrays with object keys using a custom comparison function.

object_key_comparison.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(public int $id) {}
}

$user1 = new User(1);
$user2 = new User(2);
$user3 = new User(1);

$array1 = [$user1 =&gt; "Alice", $user2 =&gt; "Bob"];
$array2 = [$user3 =&gt; "Alice", $user2 =&gt; "Charlie"];

$result = array_intersect_uassoc($array1, $array2, function($a, $b) {
    return $a-&gt;id &lt;=&gt; $b-&gt;id;
});

print_r($result);

This compares objects as keys by their ID property. The callback uses the
spaceship operator to compare IDs, matching User 1 in both arrays.

## Best Practices

- **Consistent Callbacks:** Ensure your callback provides consistent comparisons.

- **Type Safety:** Add type hints to callback parameters when possible.

- **Performance:** Keep key comparison logic efficient for large arrays.

- **Documentation:** Clearly document custom comparison logic.

## Source

[PHP array_intersect_uassoc Documentation](https://www.php.net/manual/en/function.array-intersect-uassoc.php)

This tutorial covered the PHP array_intersect_uassoc function with
practical examples showing its usage for array intersection with custom key comparison.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).