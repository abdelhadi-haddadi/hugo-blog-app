+++
title = "PHP pos Function"
date = 2025-08-29T20:05:21.297+01:00
draft = false
description = "PHP pos function tutorial shows how to get the current array element in PHP. Learn pos with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP pos Function

last modified March 13, 2025

The PHP pos function retrieves the current element in an array.
It's an alias of current and works with the internal pointer.

## Basic Definition

The pos function returns the value of the current array element.
It doesn't move the pointer. Returns false if the pointer is beyond bounds.

Syntax: pos(array|object $array): mixed. Works with both arrays
and objects implementing Traversable. Returns false on empty array.

## Basic pos Example

This demonstrates getting the current element from a simple array.

basic_pos.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$current = pos($fruits);

echo "Current fruit: $current"; 

The pointer starts at first element. pos returns 'apple' without
changing the pointer position. Identical to current.

## After Pointer Movement

Shows pos behavior after moving the array pointer.

pointer_movement.php
  

&lt;?php

$colors = ['red', 'green', 'blue'];
next($colors); // Move to second element
$current = pos($colors);

echo "Current color: $current"; 

After next moves the pointer, pos returns the
second element. The function simply reports current position without moving.

## With Associative Array

Demonstrates pos working with associative arrays.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 32,
    'email' =&gt; 'john@example.com'
];

reset($user); // Ensure pointer at start
$firstValue = pos($user);

echo "First value: $firstValue"; 

pos returns the value of the first element in associative arrays.
The function works the same regardless of array keys being numeric or string.

## Empty Array Behavior

Shows pos return value when used with empty arrays.

empty_array.php
  

&lt;?php

$empty = [];
$result = pos($empty);

var_dump($result); 

When array is empty, pos returns false. This matches
current behavior. Always check return value with empty arrays.

## After end() Function

Demonstrates pos behavior when pointer is at array end.

end_position.php
  

&lt;?php

$numbers = [10, 20, 30];
end($numbers); // Move to last element
$last = pos($numbers);

echo "Last number: $last"; 

After end moves pointer to last element, pos
returns that element's value. The pointer remains at the last position.

## Best Practices

- **Pointer Awareness:** Know pointer position before using pos.

- **Reset First:** Use reset() if unsure of pointer position.

- **False Check:** Verify return value could be false.

- **Readability:** Consider current() for clearer code.

## Source

[PHP pos Documentation](https://www.php.net/manual/en/function.pos.php)

This tutorial covered the PHP pos function with practical
examples showing its usage for array pointer operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).