+++
title = "PHP array_splice Function"
date = 2025-08-29T20:05:10.065+01:00
draft = false
description = "PHP array_splice function tutorial shows how to modify arrays by removing/replacing elements in PHP. Learn array_splice with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_splice Function

last modified March 13, 2025

The PHP array_splice function removes/replaces array elements and
optionally inserts new elements. It's a powerful array modification tool.

## Basic Definition

array_splice removes elements from an array and replaces them
with optional new elements. It modifies the original array and returns the
removed elements.

Syntax: array_splice(array &amp;$array, int $offset, ?int $length = null, mixed $replacement = []): array.
The function works with numeric keys and reindexes the array.

## Basic Removal Example

This shows how to remove elements from an array starting at a position.

basic_removal.php
  

&lt;?php

$colors = ['red', 'green', 'blue', 'yellow'];
$removed = array_splice($colors, 1, 2);

print_r($colors);    
print_r($removed);   

This removes 2 elements starting from index 1. The original array is
modified, and removed elements are returned. Note the reindexing.

## Inserting Elements

Demonstrates how to insert new elements without removing any existing ones.

insert_elements.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
array_splice($fruits, 1, 0, ['orange', 'grape']);

print_r($fruits);

By setting length to 0, we insert new elements at position 1 without
removing any. The array grows to accommodate the new elements.

## Replacing Elements

Shows how to replace existing elements with new ones in a single operation.

replacement.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5];
$removed = array_splice($numbers, 1, 3, ['two', 'three', 'four']);

print_r($numbers);  
print_r($removed);  

This replaces 3 elements starting at index 1 with new string values.
The function returns the original elements that were replaced.

## Negative Offset

Demonstrates using negative offsets to count from the end of the array.

negative_offset.php
  

&lt;?php

$letters = ['a', 'b', 'c', 'd', 'e'];
array_splice($letters, -2, 1);

print_r($letters);  

A negative offset counts from the end (-1 is last element). Here we remove
one element starting from the second-to-last position ('d' is removed).

## Complete Replacement

Shows how to replace the entire array contents with new elements.

complete_replacement.php
  

&lt;?php

$original = ['old1', 'old2', 'old3'];
$removed = array_splice($original, 0, count($original), ['new1', 'new2']);

print_r($original);  
print_r($removed);   

By specifying the full array length, we replace all elements. The original
array now contains only the new elements we provided.

## Best Practices

- **Backup Arrays:** Copy arrays before splicing if original needed.

- **Return Values:** Remember it returns removed elements.

- **Reindexing:** Be aware it reindexes numeric keys.

- **Performance:** Minimize large array modifications.

## Source

[PHP array_splice Documentation](https://www.php.net/manual/en/function.array-splice.php)

This tutorial covered the PHP array_splice function with practical
examples showing its usage for array modification scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).