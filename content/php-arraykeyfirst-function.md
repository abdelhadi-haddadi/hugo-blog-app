+++
title = "PHP array_key_first Function"
date = 2025-08-29T20:05:03.396+01:00
draft = false
description = "PHP array_key_first function tutorial shows how to get the first key of an array in PHP. Learn array_key_first with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_key_first Function

last modified March 13, 2025

The PHP array_key_first function retrieves the first key of an
array. It's useful when you need to access the initial element without
resetting the array pointer.

## Basic Definition

The array_key_first function returns the first key of the given
array. It works with both indexed and associative arrays.

Syntax: array_key_first(array $array): int|string|null. Returns
null for empty arrays. Available since PHP 7.3.

## Basic array_key_first Example

This demonstrates getting the first key from a simple associative array.

basic_array_key_first.php
  

&lt;?php

$colors = [
    'red' =&gt; '#FF0000',
    'green' =&gt; '#00FF00',
    'blue' =&gt; '#0000FF'
];

$firstKey = array_key_first($colors);

echo "First color key: $firstKey"; 

The function returns 'red' as it's the first key in the array. The original
array remains unchanged.

## Indexed Array Example

array_key_first works with numeric indexes as well.

indexed_array.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$firstIndex = array_key_first($fruits);

echo "First fruit index: $firstIndex"; 

For indexed arrays, it returns 0 (the first numeric index). This matches
PHP's standard array indexing behavior.

## Empty Array Handling

The function returns null when called with an empty array.

empty_array.php
  

&lt;?php

$emptyArray = [];
$result = array_key_first($emptyArray);

var_dump($result); 

This behavior helps distinguish between arrays with a null key and truly
empty arrays. Always check for null when working with unknown arrays.

## Mixed Key Types

The function handles arrays with mixed key types (numeric and string).

mixed_keys.php
  

&lt;?php

$mixed = [
    10 =&gt; 'ten',
    'color' =&gt; 'blue',
    20 =&gt; 'twenty'
];

$firstKey = array_key_first($mixed);

echo "First key: "; 
var_dump($firstKey); 

Despite having string keys later, the function returns the first key (10).
The type (int) is preserved in the return value.

## Practical Usage Example

Here's how to use array_key_first in a real-world scenario.

practical_usage.php
  

&lt;?php

$userPreferences = [
    'theme' =&gt; 'dark',
    'language' =&gt; 'en',
    'notifications' =&gt; true
];

$mainPreference = array_key_first($userPreferences);

echo "Main preference setting: $mainPreference"; 

This shows getting the primary preference key without affecting the array.
Useful when you need the first setting but want to preserve the array.

## Best Practices

- **Null Checks:** Always verify the return value isn't null.

- **PHP Version:** Ensure PHP 7.3+ for this function.

- **Readability:** Prefer over reset()+key() for clarity.

- **Performance:** Faster than array_keys()[0] for large arrays.

## Source

[PHP array_key_first Documentation](https://www.php.net/manual/en/function.array-key-first.php)

This tutorial covered the PHP array_key_first function with
practical examples showing its usage for array key retrieval.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).