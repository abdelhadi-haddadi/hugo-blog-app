+++
title = "PHP uksort Function"
date = 2025-08-29T20:05:24.681+01:00
draft = false
description = "PHP uksort function tutorial shows how to sort arrays by keys in PHP. Learn uksort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP uksort Function

last modified March 13, 2025

The PHP uksort function sorts an array by keys using a user-defined
comparison function. It maintains key-value associations during sorting.

## Basic Definition

The uksort function sorts an array by keys using a callback
comparison function. It modifies the original array and returns true on success.

Syntax: uksort(array &amp;$array, callable $callback): bool. The
callback compares two keys and returns an integer less than, equal to, or
greater than zero.

## Basic uksort Example

This example demonstrates sorting an associative array by keys in ascending order.

basic_uksort.php
  

&lt;?php

$data = [
    "banana" =&gt; 3,
    "apple" =&gt; 2,
    "orange" =&gt; 5
];

uksort($data, function($a, $b) {
    return strcmp($a, $b);
});

print_r($data);

Output shows the array sorted alphabetically by keys. The callback uses
strcmp for string comparison. Keys maintain their values.

## Reverse Key Sorting

Sort array keys in descending order by modifying the comparison logic.

reverse_uksort.php
  

&lt;?php

$data = [
    "banana" =&gt; 3,
    "apple" =&gt; 2,
    "orange" =&gt; 5
];

uksort($data, function($a, $b) {
    return strcmp($b, $a); // Reverse comparison
});

print_r($data);

This reverses the key order by swapping $a and $b in
strcmp. The output shows keys from "orange" to "apple".

## Numeric Key Sorting

Sort numeric keys with custom comparison logic for different sorting needs.

numeric_uksort.php
  

&lt;?php

$data = [
    10 =&gt; "ten",
    2 =&gt; "two",
    5 =&gt; "five"
];

uksort($data, function($a, $b) {
    return $a &lt;=&gt; $b; // Spaceship operator for numeric comparison
});

print_r($data);

The spaceship operator (&lt;=&gt;) provides clean numeric comparison.
Output shows keys sorted from 2 to 10 with their corresponding values.

## Case-Insensitive Sorting

Sort keys case-insensitively by modifying the string comparison approach.

case_insensitive_uksort.php
  

&lt;?php

$data = [
    "Banana" =&gt; 3,
    "apple" =&gt; 2,
    "Orange" =&gt; 5
];

uksort($data, function($a, $b) {
    return strcasecmp($a, $b); // Case-insensitive comparison
});

print_r($data);

strcasecmp ignores case differences. Output shows "apple" first
despite lowercase, followed by "Banana" and "Orange" in alphabetical order.

## Custom Key Sorting Logic

Implement complex sorting logic based on key characteristics or patterns.

custom_uksort.php
  

&lt;?php

$data = [
    "file1.txt" =&gt; "Content 1",
    "file10.txt" =&gt; "Content 10",
    "file2.txt" =&gt; "Content 2"
];

uksort($data, function($a, $b) {
    $numA = intval(preg_replace('/[^0-9]/', '', $a));
    $numB = intval(preg_replace('/[^0-9]/', '', $b));
    return $numA &lt;=&gt; $numB;
});

print_r($data);

This extracts numbers from filenames for natural sorting. Output shows files
ordered by their numeric parts (1, 2, 10) rather than lexicographically.

## Best Practices

- **Consistent Returns:** Ensure callback always returns integer.

- **Performance:** Avoid complex logic in large-array callbacks.

- **Readability:** Use named functions for complex comparisons.

- **Type Safety:** Add type hints if keys have specific types.

## Source

[PHP uksort Documentation](https://www.php.net/manual/en/function.uksort.php)

This tutorial covered the PHP uksort function with practical
examples showing various key sorting scenarios and custom comparison logic.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).