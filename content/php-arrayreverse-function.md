+++
title = "PHP array_reverse Function"
date = 2025-08-29T20:05:08.971+01:00
draft = false
description = "PHP array_reverse function tutorial shows how to reverse array elements in PHP. Learn array_reverse with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_reverse Function

last modified March 13, 2025

The PHP array_reverse function returns an array with elements
in reverse order. It's useful for processing arrays from end to start.

## Basic Definition

The array_reverse function reverses the order of array elements.
It can preserve or reset numeric keys based on the second parameter.

Syntax: array_reverse(array $array, bool $preserve_keys = false): array.
When $preserve_keys is true, numeric keys are preserved in the reversed array.

## Basic array_reverse Example

This demonstrates simple array reversal with default parameters.

basic_array_reverse.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5];
$reversed = array_reverse($numbers);

print_r($reversed);

The example reverses a simple numeric array. Note that new numeric keys are
assigned starting from 0 in the reversed array by default.

## Preserving Array Keys

This shows how to maintain original numeric keys when reversing an array.

preserve_keys.php
  

&lt;?php

$colors = [
    10 =&gt; 'red',
    20 =&gt; 'green',
    30 =&gt; 'blue'
];
$reversed = array_reverse($colors, true);

print_r($reversed);

With true as the second parameter, the original numeric keys
are preserved in the reversed array. This is useful for associative arrays.

## Reversing Associative Arrays

Demonstrates how string keys are always preserved in reversed arrays.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 30,
    'city' =&gt; 'New York'
];
$reversed = array_reverse($user);

print_r($reversed);

String keys in associative arrays are always preserved regardless of the
second parameter. The order of elements is reversed while keeping keys.

## Multidimensional Array Reversal

Shows how array_reverse affects only the top level of multidimensional arrays.

multidimensional_array.php
  

&lt;?php

$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
$reversed = array_reverse($matrix);

print_r($reversed);

Only the outer array is reversed while inner arrays maintain their order.
To reverse inner arrays, you would need to apply array_reverse recursively.

## Practical Use Case

Demonstrates a real-world scenario where array_reverse might be useful.

practical_use.php
  

&lt;?php

$logEntries = [
    '2023-01-01' =&gt; 'System started',
    '2023-01-02' =&gt; 'User logged in',
    '2023-01-03' =&gt; 'Data processed',
    '2023-01-04' =&gt; 'System shutdown'
];

// Display log entries in reverse chronological order
$reversedLogs = array_reverse($logEntries, true);

foreach ($reversedLogs as $date =&gt; $entry) {
    echo "$date: $entry\n";
}

This example shows how to display log entries in reverse chronological order.
The date keys are preserved to maintain the association between dates and events.

## Best Practices

- **Key Preservation:** Use true for $preserve_keys when key-value pairs matter.

- **Performance:** Consider memory usage with very large arrays.

- **Multidimensional Arrays:** Remember it only affects the first level.

- **Readability:** Document why you're reversing an array when it's not obvious.

## Source

[PHP array_reverse Documentation](https://www.php.net/manual/en/function.array-reverse.php)

This tutorial covered the PHP array_reverse function with practical
examples showing its usage for various array manipulation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).