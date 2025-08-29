+++
title = "PHP current Function"
date = 2025-08-29T20:05:16.709+01:00
draft = false
description = "PHP current function tutorial shows how to get the current array element in PHP. Learn current() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP current Function

last modified March 13, 2025

The PHP current function returns the value of the current
element in an array. It's part of PHP's array pointer functions.

## Basic Definition

The current function fetches the value of the array element
that's currently pointed to by the internal pointer. It doesn't move the
pointer.

Syntax: current(array|object $array): mixed. The function
returns the current element's value or false on empty array or error.

## Basic current() Example

This demonstrates getting the current element from a simple array.

basic_current.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];

// Set pointer to first element
reset($fruits);

$current = current($fruits);
echo "Current fruit: $current"; 

We first reset the array pointer to ensure it's at the start. Then
current returns 'apple', the first element's value.

## Using current() in a Loop

Show how current can be used with other pointer functions.

current_in_loop.php
  

&lt;?php

$colors = ['red', 'green', 'blue'];

// Set pointer to first element
reset($colors);

while ($color = current($colors)) {
    echo "Color: $color\n";
    next($colors);
}

This loops through the array using current and
next. The output shows all three colors in sequence.

## Associative Array Example

Demonstrate current with an associative array.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John Doe',
    'email' =&gt; 'john@example.com',
    'age' =&gt; 30
];

reset($user);

echo "First value: " . current($user); 

With associative arrays, current returns the value of
the first element regardless of its key. Here it returns 'John Doe'.

## Current After Array Modification

Show how array modifications affect the current element.

modification_effect.php
  

&lt;?php

$numbers = [10, 20, 30];
reset($numbers);

echo "Current: " . current($numbers) . "\n"; // 10

// Modify array
array_unshift($numbers, 5);

echo "Current after modification: " . current($numbers); // 5

Adding elements to the beginning shifts the internal pointer.
The current element changes from 10 to 5 after array_unshift.

## Current With Empty Array

Demonstrate current behavior with empty arrays.

empty_array.php
  

&lt;?php

$empty = [];

$result = current($empty);

var_dump($result); 

When called on an empty array, current returns false.
This is important to check when working with potentially empty arrays.

## Best Practices

- **Reset Pointer:** Always reset pointer with reset first.

- **Check Return:** Verify return value as it can be false.

- **Combine Functions:** Use with next, prev for traversal.

- **Avoid Modification:** Don't modify array during iteration.

## Source

[PHP current() Documentation](https://www.php.net/manual/en/function.current.php)

This tutorial covered the PHP current function with practical
examples showing its usage for array traversal scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).