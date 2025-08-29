+++
title = "PHP array_key_last Function"
date = 2025-08-29T20:05:03.411+01:00
draft = false
description = "PHP array_key_last function tutorial shows how to get the last key of an array in PHP. Learn array_key_last with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_key_last Function

last modified March 13, 2025

The PHP array_key_last function returns the last key of an array
without affecting the internal array pointer. It's useful for array traversal.

## Basic Definition

The array_key_last function retrieves the last key from an array.
It works with both indexed and associative arrays.

Syntax: array_key_last(array $array): int|string|null. Returns
null for empty arrays. Introduced in PHP 7.3.

## Basic array_key_last Example

This demonstrates getting the last key from a simple indexed array.

basic_array_key_last.php
  

&lt;?php

$colors = ['red', 'green', 'blue'];
$lastKey = array_key_last($colors);

echo "Last key: $lastKey"; 

The function returns 2, which is the index of the last element 'blue'.
Indexed arrays start counting from 0.

## Associative Array Example

Get the last key from an associative array with string keys.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 34,
    'email' =&gt; 'john@example.com'
];

$lastKey = array_key_last($user);

echo "Last key: $lastKey"; 

The function returns 'email', the last key in the associative array.
Order is preserved as per the array definition.

## Empty Array Behavior

array_key_last returns null when called on an empty array.

empty_array.php
  

&lt;?php

$emptyArray = [];
$lastKey = array_key_last($emptyArray);

var_dump($lastKey); 

The function safely handles empty arrays by returning null. This helps
avoid errors when processing dynamic array data.

## Mixed Key Types Example

The function works with arrays containing both numeric and string keys.

mixed_keys.php
  

&lt;?php

$mixedArray = [
    0 =&gt; 'zero',
    'one' =&gt; 1,
    2 =&gt; 'two',
    'three' =&gt; 3
];

$lastKey = array_key_last($mixedArray);

echo "Last key: "; 
var_dump($lastKey); 

The function correctly identifies 'three' as the last key regardless of
the mixed key types in the array.

## Practical Usage Example

Use array_key_last to get the last item in a configuration array.

practical_usage.php
  

&lt;?php

$config = [
    'debug' =&gt; true,
    'log_level' =&gt; 'warning',
    'timeout' =&gt; 30,
    'last_modified' =&gt; '2025-03-13'
];

$lastKey = array_key_last($config);
$lastValue = $config[$lastKey];

echo "Last config item: $lastKey = $lastValue"; 

This shows how to access both the last key and its value. Useful for
getting the most recent item in ordered data.

## Best Practices

- **Check for null:** Always verify the return value isn't null.

- **Preserve order:** Remember array order matters for this function.

- **Performance:** Faster than array_keys() for large arrays.

- **Readability:** More clear than end()+key() alternatives.

## Source

[PHP array_key_last Documentation](https://www.php.net/manual/en/function.array-key-last.php)

This tutorial covered the PHP array_key_last function with practical
examples showing its usage for array key retrieval scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).