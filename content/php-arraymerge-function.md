+++
title = "PHP array_merge Function"
date = 2025-08-29T20:05:04.522+01:00
draft = false
description = "PHP array_merge function tutorial shows how to merge arrays in PHP. Learn array_merge with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_merge Function

last modified March 13, 2025

The PHP array_merge function combines two or more arrays into a
single array. It's essential for array manipulation in PHP applications.

## Basic Definition

The array_merge function merges elements of multiple arrays into
one array. Values from later arrays overwrite earlier ones for matching keys.

Syntax: array_merge(array ...$arrays): array. It accepts one or
more arrays as parameters. String keys are overwritten, numeric keys are reindexed.

## Basic array_merge Example

This demonstrates merging two simple arrays with string keys.

basic_array_merge.php
  

&lt;?php

$array1 = ["color" =&gt; "red", 2, 4];
$array2 = ["a", "b", "color" =&gt; "green", "shape" =&gt; "circle", 4];

$result = array_merge($array1, $array2);
print_r($result);

This merges two arrays with both string and numeric keys. The "color" value
from $array2 overwrites $array1's value. Numeric keys are reindexed.

## Merging Numeric Keys

When merging arrays with numeric keys, values are appended and keys renumbered.

numeric_keys.php
  

&lt;?php

$numbers1 = [10, 20, 30];
$numbers2 = [40, 50, 60];

$merged = array_merge($numbers1, $numbers2);
print_r($merged);

The output shows all elements combined with new numeric indices (0-5). Unlike
string keys, numeric keys don't cause overwrites but get reindexed.

## Merging Multiple Arrays

array_merge can combine more than two arrays in a single call.

multiple_arrays.php
  

&lt;?php

$user = ["name" =&gt; "John"];
$profile = ["age" =&gt; 30, "city" =&gt; "New York"];
$preferences = ["theme" =&gt; "dark", "notifications" =&gt; true];

$account = array_merge($user, $profile, $preferences);
print_r($account);

This combines three associative arrays into one. All string keys remain
distinct, so no values are overwritten in this example.

## Merging With Duplicate String Keys

When string keys collide, later array values overwrite earlier ones.

duplicate_keys.php
  

&lt;?php

$config1 = ["debug" =&gt; false, "log_level" =&gt; "warning"];
$config2 = ["debug" =&gt; true, "timeout" =&gt; 30];

$finalConfig = array_merge($config1, $config2);
print_r($finalConfig);

The "debug" value from $config2 overwrites $config1's value. Other keys merge
normally. This behavior is useful for configuration overrides.

## Merging Indexed and Associative Arrays

array_merge handles mixed key types appropriately.

mixed_arrays.php
  

&lt;?php

$indexed = ["apple", "banana"];
$associative = ["fruit" =&gt; "orange", "vegetable" =&gt; "carrot"];

$combined = array_merge($indexed, $associative);
print_r($combined);

Numeric keys are reindexed (0,1), while string keys remain unchanged. The
result contains all elements from both arrays in sequence.

## Best Practices

- **Key Conflicts:** Be aware of overwrite behavior with string keys.

- **Performance:** For large arrays, consider memory implications.

- **Type Safety:** Ensure merged arrays have compatible value types.

- **Alternatives:** Use + operator for different merge behavior.

## Source

[PHP array_merge Documentation](https://www.php.net/manual/en/function.array-merge.php)

This tutorial covered the PHP array_merge function with practical
examples showing various merging scenarios and behaviors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).