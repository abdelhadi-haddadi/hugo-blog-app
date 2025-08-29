+++
title = "PHP array_unshift Function"
date = 2025-08-29T20:05:13.397+01:00
draft = false
description = "PHP array_unshift function tutorial shows how to add elements to the beginning of an array in PHP. Learn array_unshift with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_unshift Function

last modified March 13, 2025

The PHP array_unshift function prepends one or more elements to
the beginning of an array. It modifies the original array and returns the new
count of elements.

## Basic Definition

array_unshift adds elements to the start of an array. All
numeric array keys are re-indexed starting from zero. String keys remain
unchanged.

Syntax: array_unshift(array &amp;$array, mixed ...$values): int. The
function returns the new number of elements in the array after prepending.

## Basic array_unshift Example

This demonstrates adding a single element to the beginning of an array.

basic_array_unshift.php
  

&lt;?php

$fruits = ["banana", "apple"];
$count = array_unshift($fruits, "orange");

print_r($fruits);
echo "New count: $count";

The function adds "orange" to the start and returns 3, the new element count.

## Adding Multiple Elements

array_unshift can prepend multiple elements at once.

multiple_elements.php
  

&lt;?php

$numbers = [3, 4];
$count = array_unshift($numbers, 1, 2);

print_r($numbers);
echo "New count: $count";

Both 1 and 2 are added to the start. The function returns 4, the new array
length.

## Associative Arrays

With associative arrays, numeric keys are re-indexed while string keys stay.

associative_array.php
  

&lt;?php

$data = ["name" =&gt; "John", 0 =&gt; "apple"];
$count = array_unshift($data, "first");

print_r($data);
echo "New count: $count";

Output shows the string key remains: Array ( [0] =&gt; first [name] =&gt; John
[1] =&gt; apple ). The numeric key was re-indexed from 0 to 1.

## Empty Array Handling

When used on empty arrays, array_unshift simply adds elements.

empty_array.php
  

&lt;?php

$empty = [];
$count = array_unshift($empty, "a", "b");

print_r($empty);
echo "New count: $count";

The function works the same way, adding elements to an empty array and returning
the new count (2).

## Return Value Usage

The return value can be used directly in expressions or assignments.

return_value.php
  

&lt;?php

$colors = ["red", "blue"];
if (array_unshift($colors, "green") &gt; 2) {
    echo "Array now has more than 2 elements";
}

print_r($colors);

This checks the return value immediately. Output shows the message and the
modified array: Array ( [0] =&gt; green [1] =&gt; red [2] =&gt; blue ).

## Best Practices

- **Performance:** Avoid frequent unshifts on large arrays.

- **Clarity:** Use for clear prepend operations only.

- **Indexing:** Be aware of numeric key re-indexing.

- **Alternatives:** Consider array_merge for complex cases.

## Source

[PHP array_unshift Documentation](https://www.php.net/manual/en/function.array-unshift.php)

This tutorial covered PHP's array_unshift function with examples
showing how to prepend elements to arrays in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).