+++
title = "PHP array_pop Function"
date = 2025-08-29T20:05:06.735+01:00
draft = false
description = "PHP array_pop function tutorial shows how to remove and return the last element of an array in PHP. Learn array_pop with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_pop Function

last modified March 13, 2025

The PHP array_pop function removes and returns the last element
of an array. It reduces the array length by one and returns the removed value.

## Basic Definition

The array_pop function removes the last element from an array.
It returns the removed element or null if the array is empty.

Syntax: array_pop(array &amp;$array): mixed. The function takes an
array by reference and modifies it directly. The array's length decreases by 1.

## Basic array_pop Example

This demonstrates removing the last element from a simple numeric array.

basic_array_pop.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$lastFruit = array_pop($fruits);

print_r($fruits); 
echo $lastFruit;  

The code removes 'cherry' from the array and stores it in $lastFruit.
The original array now contains only two elements.

## Working with Numeric Arrays

This example shows how array_pop affects numeric array indexes.

numeric_array.php
  

&lt;?php

$numbers = [10, 20, 30, 40];
$lastNumber = array_pop($numbers);

echo "Removed: $lastNumber\n"; 
echo "Count: " . count($numbers) . "\n"; 
print_r($numbers); 

The last element (40) is removed and returned. The array's count decreases
from 4 to 3, but existing indexes remain unchanged.

## Using array_pop with Associative Arrays

Demonstrates array_pop behavior with associative arrays.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'email' =&gt; 'john@example.com',
    'age' =&gt; 30
];

$lastValue = array_pop($user);

echo "Removed: $lastValue\n"; 
print_r($user); 

The last key-value pair ('age' =&gt; 30) is removed. The function works the same
way with associative arrays as with indexed arrays.

## Empty Array Behavior

Shows what happens when array_pop is called on an empty array.

empty_array.php
  

&lt;?php

$emptyArray = [];
$result = array_pop($emptyArray);

var_dump($result); 
echo count($emptyArray); 

When called on an empty array, array_pop returns NULL. The array remains
empty and no error is generated.

## Using array_pop in a Loop

Demonstrates processing array elements by repeatedly removing the last one.

loop_example.php
  

&lt;?php

$stack = ['first', 'second', 'third'];

while ($element = array_pop($stack)) {
    echo "Processing: $element\n";
}

// Processing: third
// Processing: second
// Processing: first

The loop removes and processes each element from the end until the array is
empty. This is a common pattern for stack-like operations.

## Best Practices

- **Check array length:** Verify array isn't empty if NULL is problematic.

- **Preserve original:** Copy array first if you need the original later.

- **Stack operations:** Use with array_push for stack functionality.

- **Performance:** Faster than array_shift for large arrays.

## Source

[PHP array_pop Documentation](https://www.php.net/manual/en/function.array-pop.php)

This tutorial covered the PHP array_pop function with practical
examples showing its usage for removing array elements.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).