+++
title = "PHP array_search Function"
date = 2025-08-29T20:05:08.967+01:00
draft = false
description = "PHP array_search function tutorial shows how to search arrays in PHP. Learn array_search with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_search Function

last modified March 13, 2025

The PHP array_search function searches an array for a given value.
It returns the first corresponding key if the value is found. This is useful
for locating elements in arrays.

## Basic Definition

The array_search function searches for a value in an array. It
returns the key of the found element or false if not found. The search is
case-sensitive for strings.

Syntax: array_search(mixed $needle, array $haystack, bool $strict = false): mixed.
The strict parameter enables type comparison. Returns false on failure.

## Basic array_search Example

This demonstrates searching for a value in a simple indexed array.

basic_array_search.php
  

&lt;?php

$fruits = ["apple", "banana", "cherry", "date"];
$key = array_search("cherry", $fruits);

if ($key !== false) {
    echo "Found at index: $key"; 
} else {
    echo "Not found";
}

This searches for "cherry" in the fruits array. The function returns 2, the
index of "cherry". Note the strict (!==) comparison to distinguish from 0.

## Associative Array Search

Searching in an associative array returns the corresponding key.

assoc_array_search.php
  

&lt;?php

$user = [
    "name" =&gt; "John",
    "age" =&gt; 30,
    "email" =&gt; "john@example.com"
];

$key = array_search("john@example.com", $user);

if ($key !== false) {
    echo "Email field: $key"; 
} else {
    echo "Not found";
}

This finds the email value in an associative array. The function returns
"email", the key where the value was found. Works with any array type.

## Strict Type Comparison

Using strict mode ensures both value and type match during search.

strict_search.php
  

&lt;?php

$values = ["10", 10, 20, 30];
$key = array_search(10, $values, true);

if ($key !== false) {
    echo "Found at index: $key"; 
} else {
    echo "Not found";
}

With strict mode on, the string "10" doesn't match integer 10. The function
returns 1, where the integer 10 is located. Type matters in strict mode.

## Searching for False Values

Special care is needed when searching for false, 0, or empty strings.

false_search.php
  

&lt;?php

$data = [true, false, 0, ""];
$key = array_search(false, $data);

if ($key !== false) {
    echo "Found at index: $key"; 
} else {
    echo "Not found";
}

This finds the false value at index 1. Always use strict comparison (!==) to
distinguish between found at index 0 and not found (false) cases.

## Searching in Multidimensional Arrays

For multidimensional arrays, combine array_search with array_column.

multi_array_search.php
  

&lt;?php

$users = [
    ["id" =&gt; 1, "name" =&gt; "Alice"],
    ["id" =&gt; 2, "name" =&gt; "Bob"],
    ["id" =&gt; 3, "name" =&gt; "Charlie"]
];

$key = array_search("Bob", array_column($users, "name"));

if ($key !== false) {
    echo "Found at index: $key"; 
} else {
    echo "Not found";
}

This searches for "Bob" in the name column of a 2D array. array_column extracts
the name values, then array_search finds the index. Useful for database-like data.

## Best Practices

- **Strict Comparison:** Always use !== to check return values.

- **Type Safety:** Use strict mode when types matter.

- **Performance:** For large arrays, consider alternative data structures.

- **Readability:** Document searches when logic isn't obvious.

- **Error Handling:** Handle false returns appropriately.

## Source

[PHP array_search Documentation](https://www.php.net/manual/en/function.array-search.php)

This tutorial covered the PHP array_search function with practical
examples showing its usage for various array searching scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).