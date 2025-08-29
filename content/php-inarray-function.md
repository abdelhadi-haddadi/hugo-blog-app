+++
title = "PHP in_array Function"
date = 2025-08-29T20:05:17.829+01:00
draft = false
description = "PHP in_array function tutorial shows how to search for values in arrays in PHP. Learn in_array with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP in_array Function

last modified March 13, 2025

The PHP in_array function checks if a value exists in an array.
It's a fundamental tool for array searching and validation in PHP.

## Basic Definition

The in_array function searches an array for a given value. It
returns true if the value is found, false otherwise.

Syntax: in_array(mixed $needle, array $haystack, bool $strict = false): bool.
The strict parameter enables type checking.

## Basic in_array Example

This demonstrates searching for a value in a simple numeric array.

basic_in_array.php
  

&lt;?php

$fruits = ['apple', 'banana', 'orange', 'grape'];
$hasBanana = in_array('banana', $fruits);

if ($hasBanana) {
    echo 'Found banana in the array!';
} else {
    echo 'Banana not found.';
}

This searches for 'banana' in the fruits array. Since it exists,
in_array returns true and the positive message is displayed.

## Strict Type Checking

Using strict mode ensures both value and type match during comparison.

strict_checking.php
  

&lt;?php

$numbers = [1, 2, 3, '4', 5];
$hasFour = in_array(4, $numbers); // true without strict
$strictHasFour = in_array(4, $numbers, true); // false with strict

echo "Regular check: " . ($hasFour ? 'Found' : 'Not found') . "\n";
echo "Strict check: " . ($strictHasFour ? 'Found' : 'Not found');

Without strict, PHP does type juggling and finds '4'. With strict enabled,
it requires exact type matching, so 4 (integer) ≠ '4' (string).

## Searching in Associative Arrays

in_array searches values, not keys, in associative arrays.

associative_array.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 30,
    'email' =&gt; 'john@example.com'
];

$hasJohn = in_array('John', $user);
$hasThirty = in_array(30, $user);

echo $hasJohn ? 'Found John' : 'No John'; // Found John
echo "\n";
echo $hasThirty ? 'Found 30' : 'No 30'; // Found 30

This searches the values of an associative array. Both 'John' and 30 are
found in the array values, demonstrating value-only searching.

## Multi-dimensional Array Search

For multi-dimensional arrays, combine in_array with array_column.

multi_dimensional.php
  

&lt;?php

$users = [
    ['id' =&gt; 1, 'name' =&gt; 'Alice'],
    ['id' =&gt; 2, 'name' =&gt; 'Bob'],
    ['id' =&gt; 3, 'name' =&gt; 'Charlie']
];

// Search in specific column
$hasBob = in_array('Bob', array_column($users, 'name'));

echo $hasBob ? 'Bob exists' : 'Bob not found'; // Bob exists

This extracts the 'name' column using array_column, then searches
for 'Bob' in that extracted array. The combination allows efficient searching.

## Performance Considerations

For large arrays, consider alternative data structures or approaches.

performance.php
  

&lt;?php

$largeArray = range(1, 1000000);
$start = microtime(true);

// Searching at the end (worst case)
in_array(1000000, $largeArray);

$time = microtime(true) - $start;
echo "Search time: " . round($time * 1000, 2) . "ms";

This demonstrates in_array performance on a large array. For
frequent searches, consider flipping the array or using a hash map.

## Best Practices

- **Use strict mode** when type safety is important

- **Consider array_flip** for repeated searches on large arrays

- **Document expected types** to avoid confusion

- **Combine with array_column** for multi-dimensional arrays

## Source

[PHP in_array Documentation](https://www.php.net/manual/en/function.in-array.php)

This tutorial covered the PHP in_array function with practical
examples showing its usage for array searching scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).