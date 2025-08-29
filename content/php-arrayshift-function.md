+++
title = "PHP array_shift Function"
date = 2025-08-29T20:05:10.074+01:00
draft = false
description = "PHP array_shift function tutorial shows how to remove and return the first element of an array in PHP. Learn array_shift with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_shift Function

last modified March 13, 2025

The PHP array_shift function removes and returns the first element
of an array. It's useful for queue-like operations where you need FIFO behavior.

## Basic Definition

The array_shift function extracts the first element from an array.
All numerical array keys are re-indexed starting from 0 after the operation.

Syntax: array_shift(array &amp;$array): mixed. The function modifies
the original array and returns the shifted value. Returns null if array is empty.

## Basic array_shift Example

This demonstrates the fundamental usage of array_shift to remove
the first element from an array.

basic_array_shift.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];
$firstFruit = array_shift($fruits);

echo "Removed: $firstFruit\n"; 
print_r($fruits); 

This removes 'apple' from the array and returns it. The remaining elements
are re-indexed starting from 0. The original array is modified.

## Using array_shift in a Loop

Process array elements one by one using array_shift in a loop.

loop_array_shift.php
  

&lt;?php

$tasks = ['task1', 'task2', 'task3'];

while (!empty($tasks)) {
    $currentTask = array_shift($tasks);
    echo "Processing: $currentTask\n";
}

// Processing: task1
// Processing: task2
// Processing: task3

This processes each task in order, removing them from the array as they're
processed. The loop continues until the array is empty.

## Handling Empty Arrays

array_shift returns null when called on an empty array.

empty_array.php
  

&lt;?php

$emptyArray = [];
$result = array_shift($emptyArray);

var_dump($result); 

When the array is empty, array_shift returns null without
modifying the array. This behavior is useful for error handling.

## Preserving Associative Keys

array_shift only re-indexes numerical keys, preserving string keys.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 30,
    0 =&gt; 'admin'
];

$firstValue = array_shift($user);

echo "Removed: $firstValue\n"; 
print_r($user);

The numerical key (0) is removed while string keys remain unchanged. The
function only re-indexes numerical array keys.

## Combining with array_push for Queue

Implement a simple queue using array_shift and array_push.

queue_implementation.php
  

&lt;?php

$queue = [];

// Enqueue items
array_push($queue, 'item1');
array_push($queue, 'item2');

// Dequeue items
$firstItem = array_shift($queue);
echo "Processed: $firstItem\n"; 

$secondItem = array_shift($queue);
echo "Processed: $secondItem\n"; 

This demonstrates a FIFO (First-In-First-Out) queue. Items are added to the
end and removed from the front, maintaining proper queue order.

## Best Practices

- **Performance:** Avoid on large arrays as re-indexing is O(n).

- **Error Handling:** Check array isn't empty before shifting.

- **Alternatives:** Consider SplQueue for better performance.

- **Memory:** Be aware it modifies the original array.

## Source

[PHP array_shift Documentation](https://www.php.net/manual/en/function.array-shift.php)

This tutorial covered the PHP array_shift function with practical
examples showing its usage for array manipulation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).