+++
title = "PHP array_push Function"
date = 2025-08-29T20:05:06.739+01:00
draft = false
description = "PHP array_push function tutorial shows how to add elements to arrays in PHP. Learn array_push with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_push Function

last modified March 13, 2025

The PHP array_push function adds one or more elements to the end
of an array. It's a convenient way to append values to an existing array.

## Basic Definition

The array_push function pushes elements onto the end of an array.
It modifies the original array and returns the new number of elements.

Syntax: array_push(array &amp;$array, mixed ...$values): int. The
first parameter is the array to modify, followed by values to add.

## Basic array_push Example

This demonstrates adding a single element to an array using array_push.

basic_array_push.php
  

&lt;?php

$fruits = ["apple", "banana"];
$count = array_push($fruits, "orange");

print_r($fruits);
// Output: Array ( [0] =&gt; apple [1] =&gt; banana [2] =&gt; orange )

echo "New count: $count"; // Output: New count: 3

This adds "orange" to the $fruits array. The function returns 3, the new
count of elements. The original array is modified.

## Adding Multiple Elements

array_push can add multiple elements at once to an array.

multiple_elements.php
  

&lt;?php

$numbers = [1, 2];
$newCount = array_push($numbers, 3, 4, 5);

print_r($numbers);
// Output: Array ( [0] =&gt; 1 [1] =&gt; 2 [2] =&gt; 3 [3] =&gt; 4 [4] =&gt; 5 )

echo "New count: $newCount"; // Output: New count: 5

This adds three numbers (3, 4, 5) to the $numbers array. The function
returns the new total count of 5 elements in the array.

## Using array_push with Associative Arrays

array_push works differently with associative arrays compared to indexed ones.

associative_array.php
  

&lt;?php

$user = ["name" =&gt; "John", "age" =&gt; 30];
$count = array_push($user, "New York");

print_r($user);
// Output: Array ( [name] =&gt; John [age] =&gt; 30 [0] =&gt; New York )

With associative arrays, array_push adds elements with numeric keys. The
"New York" value gets index 0 since it's the first numerically indexed element.

## Alternative Syntax with []

The [] syntax is often simpler than array_push for adding single elements.

alternative_syntax.php
  

&lt;?php

$colors = ["red", "green"];
$colors[] = "blue"; // Equivalent to array_push($colors, "blue")

print_r($colors);
// Output: Array ( [0] =&gt; red [1] =&gt; green [2] =&gt; blue )

The [] syntax is cleaner for single elements but array_push is better for
multiple elements. Both modify the original array.

## Performance Considerations

array_push has different performance characteristics than the [] syntax.

performance.php
  

&lt;?php

$largeArray = range(1, 100000);

// Test array_push
$start = microtime(true);
array_push($largeArray, 100001);
$timePush = microtime(true) - $start;

// Test [] syntax
$start = microtime(true);
$largeArray[] = 100001;
$timeBracket = microtime(true) - $start;

echo "array_push: " . $timePush . " seconds\n";
echo "[] syntax: " . $timeBracket . " seconds\n";

For single elements, [] is generally faster than array_push. However, for
multiple elements, array_push can be more efficient than multiple [] operations.

## Best Practices

- **Multiple Elements:** Use array_push for adding several values at once.

- **Single Element:** Prefer [] syntax for cleaner code.

- **Return Value:** Utilize the count return when needed.

- **Associative Arrays:** Be aware of numeric key behavior.

## Source

[PHP array_push Documentation](https://www.php.net/manual/en/function.array-push.php)

This tutorial covered the PHP array_push function with practical
examples showing its usage for adding elements to arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).