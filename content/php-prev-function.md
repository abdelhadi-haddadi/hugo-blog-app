+++
title = "PHP prev Function"
date = 2025-08-29T20:05:22.443+01:00
draft = false
description = "PHP prev function tutorial shows how to navigate arrays in PHP. Learn prev with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP prev Function

last modified March 13, 2025

The PHP prev function moves an array's internal pointer to the
previous element and returns its value. It's part of PHP's array navigation.

## Basic Definition

The prev function moves the internal array pointer backward.
It returns the value of the previous element or false if no more elements.

Syntax: prev(array &amp;$array): mixed. The function affects the
array's internal pointer. It's the opposite of next.

## Basic prev Example

This demonstrates moving backward through an array using prev.

basic_prev.php
  

&lt;?php

$fruits = ['Apple', 'Banana', 'Cherry'];

// Move to end first
end($fruits);

echo prev($fruits) . "\n"; 
echo prev($fruits) . "\n"; 
var_dump(prev($fruits));   

We first move to the end with end, then use prev
twice. The third call returns false as we've reached the array's start.

## Combining with next

This shows how prev and next work together.

prev_next.php
  

&lt;?php

$colors = ['Red', 'Green', 'Blue'];

// Start at first element
reset($colors);

echo next($colors) . "\n"; 
echo prev($colors) . "\n"; 
echo next($colors) . "\n"; 

We reset the pointer, move forward with next, then back with
prev, then forward again. The pointer moves as expected.

## In a Loop

Using prev in a loop to traverse an array backward.

prev_loop.php
  

&lt;?php

$numbers = [10, 20, 30, 40];

// Start at end
end($numbers);

while ($current = prev($numbers)) {
    echo $current . "\n";
}

This outputs 40, 30, 20, 10. The loop stops when prev returns
false. Note it doesn't process the first element in this approach.

## With Associative Arrays

prev works with associative arrays just like indexed ones.

associative_prev.php
  

&lt;?php

$user = [
    'name' =&gt; 'Alice',
    'age' =&gt; 25,
    'email' =&gt; 'alice@example.com'
];

end($user);

do {
    $key = key($user);
    $value = current($user);
    echo "$key: $value\n";
} while (prev($user));

This outputs the array in reverse order. The do-while ensures
we process the current element before moving the pointer.

## Edge Case: Empty Array

How prev behaves with an empty array.

empty_array.php
  

&lt;?php

$empty = [];

end($empty);
var_dump(prev($empty)); 

With no elements, prev immediately returns false. This matches
its behavior when reaching the start of a non-empty array.

## Best Practices

- **Reset First:** Use reset or end to ensure pointer position.

- **Check Return:** Always verify the return value isn't false.

- **Combine with key():** Use key to get the current key.

- **Avoid Modification:** Don't modify arrays while iterating.

## Source

[PHP prev Documentation](https://www.php.net/manual/en/function.prev.php)

This tutorial covered the PHP prev function with practical
examples showing its usage for array navigation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).