+++
title = "PHP array_is_list Function"
date = 2025-08-29T20:05:02.275+01:00
draft = false
description = "PHP array_is_list function tutorial shows how to validate if an array is a list in PHP. Learn array_is_list with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_is_list Function

last modified March 13, 2025

The PHP array_is_list function checks if an array is a list. A list
is an array with sequential integer keys starting from 0. Introduced in PHP 8.1.

## Basic Definition

The array_is_list function determines if an array has consecutive
integer keys starting from 0. It returns true for such arrays, false otherwise.

Syntax: array_is_list(array $array): bool. Empty arrays always
return true. The function is particularly useful for JSON array validation.

## Basic array_is_list Example

This demonstrates a simple case where the array qualifies as a list.

basic_array_is_list.php
  

&lt;?php

$list = ['apple', 'banana', 'cherry'];
$result = array_is_list($list);

var_dump($result); 

The array has sequential 0-based integer keys (0, 1, 2), so array_is_list
returns true. This is the most common list structure in PHP.

## Non-Sequential Keys Example

Shows how the function behaves with non-sequential or non-integer keys.

non_sequential.php
  

&lt;?php

$array1 = [1 =&gt; 'a', 2 =&gt; 'b', 3 =&gt; 'c'];
$array2 = ['a', 'b', 'c', 'd' =&gt; 'e'];

var_dump(array_is_list($array1)); // bool(false)
var_dump(array_is_list($array2)); // bool(false)

$array1 fails because keys don't start at 0. $array2
fails because of the non-sequential 'd' key. Both are not considered lists.

## Empty and Mixed Arrays

Demonstrates behavior with empty arrays and arrays with mixed key types.

empty_mixed.php
  

&lt;?php

$empty = [];
$mixed = [0 =&gt; 'a', 1 =&gt; 'b', 'name' =&gt; 'John'];

var_dump(array_is_list($empty));   // bool(true)
var_dump(array_is_list($mixed));  // bool(false)

Empty arrays always return true. The mixed array fails because it contains
both integer and string keys, which disqualifies it as a list.

## JSON Array Validation

Practical example validating if decoded JSON represents a proper array/list.

json_validation.php
  

&lt;?php

$jsonArray = '[1, 2, 3]';
$jsonObject = '{"0":1, "1":2, "2":3}';

$decodedArray = json_decode($jsonArray, true);
$decodedObject = json_decode($jsonObject, true);

var_dump(array_is_list($decodedArray));   // bool(true)
var_dump(array_is_list($decodedObject)); // bool(false)

Both JSON strings contain the same data but different structures. Only the
first one decodes to a proper list. The second has string keys despite values.

## Performance Considerations

Shows how array_is_list behaves with large arrays.

performance.php
  

&lt;?php

// Generate a large list
$largeList = range(0, 100000);

// Add one non-list element at the end
$notList = $largeList;
$notList['x'] = 'break';

$start = microtime(true);
array_is_list($largeList);
$timeList = microtime(true) - $start;

$start = microtime(true);
array_is_list($notList);
$timeNotList = microtime(true) - $start;

echo "List check: $timeList seconds\n";
echo "Non-list check: $timeNotList seconds\n";

The function is optimized to fail fast. The non-list check will be faster as
it stops at first non-conforming key. List checks must verify all keys.

## Best Practices

- **JSON Validation:** Use to ensure decoded JSON is an array.

- **API Development:** Verify input arrays match expected format.

- **Data Processing:** Check before operations requiring lists.

- **Type Safety:** Combine with other type checks for robustness.

## Source

[PHP array_is_list Documentation](https://www.php.net/manual/en/function.array-is-list.php)

This tutorial covered the PHP array_is_list function with practical
examples showing its usage for array validation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).