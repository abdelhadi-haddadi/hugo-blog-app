+++
title = "PHP array_map Function"
date = 2025-08-29T20:05:04.536+01:00
draft = false
description = "PHP array_map function tutorial shows how to transform array elements in PHP. Learn array_map with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_map Function

last modified March 13, 2025

The PHP array_map function applies a callback to each element of
one or more arrays. It returns a new array with transformed elements.

## Basic Definition

The array_map function processes each array element through a
callback function. It creates a new array with the returned values.

Syntax: array_map(callable $callback, array $array, array ...$arrays): array.
The callback receives array elements as arguments and returns transformed values.

## Basic array_map Example

This example demonstrates squaring each number in an array using array_map.

basic_array_map.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4, 5];
$squared = array_map(fn($n): int =&gt; $n * $n, $numbers);

print_r($squared);
// Output: Array ( [0] =&gt; 1 [1] =&gt; 4 [2] =&gt; 9 [3] =&gt; 16 [4] =&gt; 25 )

The callback squares each number. array_map returns a new array
with the squared values while preserving the original array's structure.

## Processing Multiple Arrays

array_map can process multiple arrays simultaneously.

multiple_arrays.php
  

&lt;?php

declare(strict_types=1);

$names = ["Alice", "Bob", "Charlie"];
$ages = [25, 30, 35];

$combined = array_map(
    fn($name, $age): string =&gt; "$name is $age years old",
    $names,
    $ages
);

print_r($combined);
// Output: Array ( [0] =&gt; Alice is 25 years old [1] =&gt; Bob is 30 years old... )

This combines corresponding elements from two arrays into strings. The callback
receives one element from each array in the same position.

## Using Named Functions

You can use named functions instead of anonymous functions for complex logic.

named_function.php
  

&lt;?php

declare(strict_types=1);

function formatPrice(float $price): string {
    return '$' . number_format($price, 2);
}

$prices = [19.99, 29.95, 9.50];
$formatted = array_map('formatPrice', $prices);

print_r($formatted);
// Output: Array ( [0] =&gt; $19.99 [1] =&gt; $29.95 [2] =&gt; $9.50 )

The formatPrice function formats each price with a dollar sign
and two decimal places. The function name is passed as a string to array_map.

## Working with Array Keys

array_map doesn't preserve keys by default, but we can work around this.

preserving_keys.php
  

&lt;?php

declare(strict_types=1);

$data = ['a' =&gt; 1, 'b' =&gt; 2, 'c' =&gt; 3];
$result = array_map(
    fn($value, $key): array =&gt; [$key =&gt; $value * 2],
    $data,
    array_keys($data)
);

$final = array_merge(...$result);
print_r($final);
// Output: Array ( [a] =&gt; 2 [b] =&gt; 4 [c] =&gt; 6 )

This example shows how to preserve keys by passing array_keys as a second array.
The result is then merged to recreate the original associative array structure.

## Advanced: Using array_map with Objects

array_map can transform object properties or call methods.

object_transformation.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(
        public string $name,
        public string $email
    ) {}
    
    public function getDomain(): string {
        return explode('@', $this-&gt;email)[1];
    }
}

$users = [
    new User('Alice', 'alice@example.com'),
    new User('Bob', 'bob@domain.com'),
    new User('Charlie', 'charlie@test.com')
];

$domains = array_map(fn(User $u): string =&gt; $u-&gt;getDomain(), $users);

print_r($domains);

This extracts email domains from User objects. The callback calls the getDomain
method on each object, demonstrating object-oriented use of array_map.

## Best Practices

- **Type Safety:** Use type hints in callbacks for better code reliability.

- **Readability:** Prefer named functions for complex transformations.

- **Performance:** Avoid expensive operations in large array processing.

- **Immutability:** Remember array_map creates new arrays without modifying originals.

## Source

[PHP array_map Documentation](https://www.php.net/manual/en/function.array-map.php)

This tutorial covered the PHP array_map function with practical
examples showing its usage for array transformation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).