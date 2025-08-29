+++
title = "PHP shuffle Function"
date = 2025-08-29T20:05:23.555+01:00
draft = false
description = "PHP shuffle function tutorial shows how to randomize array elements in PHP. Learn shuffle with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP shuffle Function

last modified March 13, 2025

The PHP shuffle function randomizes the order of elements in
an array. It modifies the original array directly and returns true on success.

## Basic Definition

The shuffle function reorders array elements randomly. It uses
a pseudo-random number generator to create the new order. The function works
on both indexed and associative arrays.

Syntax: shuffle(array &amp;$array): bool. Note it takes the array by
reference and modifies it directly. Numeric keys are re-indexed starting from 0.

## Basic shuffle Example

This demonstrates shuffling a simple indexed array of numbers.

basic_shuffle.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5];
shuffle($numbers);

print_r($numbers);

Each run produces different output like [3, 1, 5, 2, 4]. The
original array order is lost, and keys are re-indexed starting from 0.

## Shuffling Associative Arrays

When shuffling associative arrays, string keys are lost and replaced with
numeric indices.

assoc_shuffle.php
  

&lt;?php

$colors = [
    'red' =&gt; '#FF0000',
    'green' =&gt; '#00FF00',
    'blue' =&gt; '#0000FF'
];

shuffle($colors);
print_r($colors);

Output might be Array ( [0] =&gt; #00FF00 [1] =&gt; #0000FF [2] =&gt; #FF0000 ).
The string keys are lost during shuffling, which is important to remember.

## Preserving Keys While Shuffling

To shuffle while preserving keys, we can use array_keys and
array_values with some additional logic.

preserve_keys.php
  

&lt;?php

function shuffle_assoc(array &amp;$array): void {
    $keys = array_keys($array);
    shuffle($keys);
    
    $new = [];
    foreach ($keys as $key) {
        $new[$key] = $array[$key];
    }
    
    $array = $new;
}

$data = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3];
shuffle_assoc($data);
print_r($data);

This custom function shuffles while keeping key-value pairs intact. Output
might be Array ( [b] =&gt; 2 [a] =&gt; 1 [c] =&gt; 3 ) with random order.

## Shuffling Multidimensional Arrays

For multidimensional arrays, we need to decide whether to shuffle the outer
array or inner arrays.

multidimensional.php
  

&lt;?php

$deck = [
    ['suit' =&gt; 'hearts', 'value' =&gt; 'K'],
    ['suit' =&gt; 'diamonds', 'value' =&gt; 'A'],
    ['suit' =&gt; 'clubs', 'value' =&gt; 'Q']
];

shuffle($deck);
print_r($deck);

This shuffles the order of cards in the deck while keeping each card's
structure intact. The inner arrays remain unchanged, just their order varies.

## Creating a Random Sample

Combine shuffle with array_slice to get a random
sample from an array.

random_sample.php
  

&lt;?php

$students = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
shuffle($students);
$randomThree = array_slice($students, 0, 3);

print_r($randomThree);

This selects 3 random students from the list. Each run produces different
results like ['David', 'Alice', 'Charlie'].

## Best Practices

- **Backup Data:** Make a copy if you need the original order.

- **Associative Arrays:** Be aware key-value pairs are lost.

- **Randomness:** For cryptography, use cryptographically secure functions.

- **Performance:** Shuffle is efficient even for large arrays.

## Source

[PHP Shuffle Documentation](https://www.php.net/manual/en/function.shuffle.php)

This tutorial covered the PHP shuffle function with practical
examples showing its usage for array randomization scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).