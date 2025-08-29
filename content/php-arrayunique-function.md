+++
title = "PHP array_unique Function"
date = 2025-08-29T20:05:13.394+01:00
draft = false
description = "PHP array_unique function tutorial shows how to remove duplicate values from arrays in PHP. Learn array_unique with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_unique Function

last modified March 13, 2025

The PHP array_unique function removes duplicate values from an
array. It's useful for cleaning data and ensuring unique elements.

## Basic Definition

The array_unique function takes an array and returns a new array
without duplicate values. It preserves the keys of the first occurrence.

Syntax: array_unique(array $array, int $flags = SORT_STRING): array.
The flags parameter controls comparison behavior (SORT_REGULAR, SORT_NUMERIC).

## Basic array_unique Example

This shows the simplest usage of removing duplicate values from an array.

basic_array_unique.php
  

&lt;?php

$numbers = [1, 2, 2, 3, 4, 4, 5];
$uniqueNumbers = array_unique($numbers);

print_r($uniqueNumbers);

Output: Array ( [0] =&gt; 1 [1] =&gt; 2 [3] =&gt; 3 [4] =&gt; 4 [6] =&gt; 5 ).
The function removed duplicates while keeping first occurrences and keys.

## String Array Example

Remove duplicate strings from an array while preserving case sensitivity.

string_array.php
  

&lt;?php

$fruits = ["apple", "Apple", "banana", "banana", "orange"];
$uniqueFruits = array_unique($fruits);

print_r($uniqueFruits);

Output: Array ( [0] =&gt; apple [1] =&gt; Apple [2] =&gt; banana [4] =&gt; orange ).
Note "apple" and "Apple" are treated as different due to case sensitivity.

## Using Flags Parameter

Demonstrate how the flags parameter affects comparison behavior.

flags_parameter.php
  

&lt;?php

$values = ["10", 10, "20", 20, "30"];
$uniqueRegular = array_unique($values, SORT_REGULAR);
$uniqueString = array_unique($values, SORT_STRING);

echo "SORT_REGULAR: ";
print_r($uniqueRegular);

echo "SORT_STRING: ";
print_r($uniqueString);

SORT_REGULAR treats "10" and 10 as equal (type juggling), while SORT_STRING
treats them as different. Choose the appropriate flag for your needs.

## Associative Array Example

Remove duplicates from an associative array while preserving keys.

associative_array.php
  

&lt;?php

$users = [
    "john" =&gt; "admin",
    "jane" =&gt; "editor",
    "bob" =&gt; "admin",
    "alice" =&gt; "viewer"
];

$uniqueRoles = array_unique($users);

print_r($uniqueRoles);

Output: Array ( [john] =&gt; admin [jane] =&gt; editor [alice] =&gt; viewer ).
The duplicate "admin" role was removed while keeping the first occurrence.

## Multidimensional Array Challenge

Show limitations with multidimensional arrays and a workaround solution.

multidimensional_array.php
  

&lt;?php

$data = [
    ["id" =&gt; 1, "name" =&gt; "John"],
    ["id" =&gt; 2, "name" =&gt; "Jane"],
    ["id" =&gt; 1, "name" =&gt; "John"],
];

// array_unique won't work directly on multidimensional arrays
$serialized = array_map('serialize', $data);
$unique = array_unique($serialized);
$result = array_map('unserialize', $unique);

print_r($result);

This workaround serializes each element for comparison, then unserializes back.
Output shows only unique objects based on all properties.

## Best Practices

- **Performance:** For large arrays, consider sorting first.

- **Type Awareness:** Be mindful of type comparison behavior.

- **Key Preservation:** Remember original keys are kept.

- **Multidimensional:** Use serialization for complex arrays.

## Source

[PHP array_unique Documentation](https://www.php.net/manual/en/function.array-unique.php)

This tutorial covered the PHP array_unique function with practical
examples showing its usage for removing duplicate array values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).