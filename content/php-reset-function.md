+++
title = "PHP reset Function"
date = 2025-08-29T20:05:22.428+01:00
draft = false
description = "PHP reset function tutorial shows how to reset array internal pointer in PHP. Learn reset with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP reset Function

last modified March 13, 2025

The PHP reset function rewinds array's internal pointer to the
first element. It's useful when you need to start processing an array from
the beginning.

## Basic Definition

The reset function sets the internal pointer of an array to its
first element. It returns the value of the first array element or false if
the array is empty.

Syntax: reset(array &amp;$array): mixed. The function takes an array
by reference and returns its first element's value. It affects the array's
internal pointer.

## Basic reset Example

This demonstrates how to reset an array's internal pointer to its start.

basic_reset.php
  

&lt;?php

$fruits = ['apple', 'banana', 'cherry'];

// Move pointer to second element
next($fruits);

// Reset to first element
$first = reset($fruits);

echo "First fruit: $first"; 

After moving the pointer with next, reset returns
it to the first element. The function also returns the first element's value.

## Getting First Element

Use reset to safely get an array's first element without knowing
its key.

get_first_element.php
  

&lt;?php

$colors = ['red' =&gt; '#FF0000', 'green' =&gt; '#00FF00', 'blue' =&gt; '#0000FF'];

$firstColor = reset($colors);

echo "First color code: $firstColor"; 

This retrieves the first value from an associative array without needing to
know its key. reset is handy for arrays with unknown keys.

## Empty Array Handling

reset returns false for empty arrays, which requires careful
handling.

empty_array.php
  

&lt;?php

$emptyArray = [];

$result = reset($emptyArray);

if ($result === false) {
    echo "Array is empty or first element is false";
} else {
    echo "First element: $result";
}

Since reset returns false for empty arrays, use strict
comparison to distinguish from a false first element. This prevents bugs.

## Combined with current

Compare reset with current to understand pointer
position.

reset_vs_current.php
  

&lt;?php

$numbers = [10, 20, 30];

next($numbers); // Move to second element
echo "Current: " . current($numbers) . "\n"; // 20

reset($numbers);
echo "After reset: " . current($numbers); // 10

This shows how reset changes the internal pointer position.
current confirms the pointer moved back to the first element.

## In Loop Processing

Use reset when you need to reprocess an array multiple times.

loop_processing.php
  

&lt;?php

$data = ['A', 'B', 'C'];

// First processing
while ($value = current($data)) {
    echo "$value ";
    next($data);
}

reset($data); // Rewind for second processing

// Second processing
while ($value = current($data)) {
    echo strtolower($value) . " ";
    next($data);
}

After the first loop exhausts the array, reset allows processing
again. This outputs "A B C a b c", demonstrating array reuse.

## Best Practices

- **Pointer Awareness:** Remember it affects array's internal pointer.

- **Empty Arrays:** Always check return value for empty arrays.

- **Alternative:** Consider array_key_first for PHP 7.3+.

- **Performance:** Minimal overhead for small to medium arrays.

## Source

[PHP reset Documentation](https://www.php.net/manual/en/function.reset.php)

This tutorial covered the PHP reset function with practical
examples showing its usage for array pointer management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).