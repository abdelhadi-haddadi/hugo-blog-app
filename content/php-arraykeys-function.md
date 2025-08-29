+++
title = "PHP array_keys Function"
date = 2025-08-29T20:05:04.527+01:00
draft = false
description = "PHP array_keys function tutorial shows how to extract array keys in PHP. Learn array_keys with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_keys Function

last modified March 13, 2025

The PHP array_keys function returns all the keys or a subset of
keys from an array. It's useful for extracting and working with array keys.

## Basic Definition

The array_keys function returns all the keys of an array. It can
also return keys for a specific value when the search_value parameter is used.

Syntax: array_keys(array $array, mixed $search_value = null, bool $strict = false): array.
The function returns a new array containing the keys.

## Basic array_keys Example

This shows how to extract all keys from a simple associative array.

basic_array_keys.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 30,
    'email' =&gt; 'john@example.com'
];

$keys = array_keys($user);

print_r($keys);

This code outputs all keys from the $user array. The result will be:
Array ( [0] =&gt; name [1] =&gt; age [2] =&gt; email ).

## Searching for Specific Values

Find all keys that have a specific value in an array.

search_values.php
  

&lt;?php

$colors = [
    'red' =&gt; '#FF0000',
    'green' =&gt; '#00FF00',
    'blue' =&gt; '#0000FF',
    'dark_red' =&gt; '#FF0000'
];

$redKeys = array_keys($colors, '#FF0000');

print_r($redKeys);

This finds all keys with the value '#FF0000'. The output will be:
Array ( [0] =&gt; red [1] =&gt; dark_red ).

## Using Strict Comparison

Demonstrate the difference between loose and strict comparison when searching.

strict_comparison.php
  

&lt;?php

$data = [
    'a' =&gt; '1',
    'b' =&gt; 1,
    'c' =&gt; '1.0',
    'd' =&gt; 1.0
];

$looseMatch = array_keys($data, 1);
$strictMatch = array_keys($data, 1, true);

print_r($looseMatch);
print_r($strictMatch);

With loose comparison, all elements match 1. With strict comparison, only
the integer 1 matches. This shows the importance of the strict parameter.

## Working with Numeric Arrays

Even numeric arrays have keys, which array_keys can extract.

numeric_array.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$keys = array_keys($fruits);

print_r($keys);

This demonstrates that numeric arrays have sequential numeric keys. The
output will be: Array ( [0] =&gt; 0 [1] =&gt; 1 [2] =&gt; 2 ).

## Multidimensional Arrays

Extract keys from a multidimensional array structure.

multidimensional_array.php
  

&lt;?php

$users = [
    'user1' =&gt; ['name' =&gt; 'Alice', 'age' =&gt; 25],
    'user2' =&gt; ['name' =&gt; 'Bob', 'age' =&gt; 30],
    'user3' =&gt; ['name' =&gt; 'Charlie', 'age' =&gt; 35]
];

$userKeys = array_keys($users);

print_r($userKeys);

This extracts the top-level keys from a multidimensional array. The output
will be: Array ( [0] =&gt; user1 [1] =&gt; user2 [2] =&gt; user3 ).

## Best Practices

- **Memory Usage:** Be mindful when working with large arrays.

- **Strict Mode:** Use strict comparison for precise matching.

- **Key Types:** Remember keys can be integers or strings.

- **Performance:** Consider alternatives for simple iterations.

## Source

[PHP array_keys Documentation](https://www.php.net/manual/en/function.array-keys.php)

This tutorial covered the PHP array_keys function with practical
examples showing its usage for various array key extraction scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).