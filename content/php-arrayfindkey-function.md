+++
title = "PHP array_find_key Function"
date = 2025-08-29T20:05:00.047+01:00
draft = false
description = "PHP array_find_key function tutorial shows how to find array keys by value in PHP. Learn array_find_key with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_find_key Function

last modified March 13, 2025

The PHP array_find_key function searches for a key in an array
using a callback function. It returns the first key where the callback
returns true.

## Basic Definition

The array_find_key function searches an array for a value that
satisfies a condition. It returns the corresponding key if found.

Syntax: array_find_key(array $array, callable $callback): mixed.
The callback tests each value. Returns null if no match is found.

## Basic array_find_key Example

This example finds the key of the first even number in an array.

basic_array_find_key.php
  

&lt;?php

declare(strict_types=1);

function array_find_key(array $array, callable $callback): mixed {
    foreach ($array as $key =&gt; $value) {
        if ($callback($value)) {
            return $key;
        }
    }
    return null;
}

$numbers = [1, 3, 4, 7, 8];
$firstEvenKey = array_find_key($numbers, fn($n): bool =&gt; $n % 2 === 0);

echo "First even at key: " . $firstEvenKey; 

The callback checks for even numbers. It returns key 2 where value 4 is found.
The search stops at the first match.

## Finding String Key

Search for a key where the value matches a specific string pattern.

string_search.php
  

&lt;?php

declare(strict_types=1);

$users = [
    'john' =&gt; 'admin',
    'jane' =&gt; 'editor',
    'bob' =&gt; 'viewer',
    'alice' =&gt; 'editor'
];

$editorKey = array_find_key($users, fn($role): bool =&gt; $role === 'editor');

echo "First editor: " . $editorKey; 

This finds the first user with 'editor' role. The callback compares each
value, returning 'jane' as the first matching key.

## Object Property Search

Find a key where an object property meets certain criteria.

object_search.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products = [
    'p1' =&gt; new Product("Laptop", 999.99),
    'p2' =&gt; new Product("Phone", 699.99),
    'p3' =&gt; new Product("Tablet", 399.99)
];

$affordableKey = array_find_key($products, 
    fn(Product $p): bool =&gt; $p-&gt;price &lt; 700);

echo "First affordable: " . $affordableKey; 

This locates the first product under $700. The callback checks the price
property, returning 'p2' (Phone) as the first match.

## No Match Scenario

When no element satisfies the callback, the function returns null.

no_match.php
  

&lt;?php

declare(strict_types=1);

$colors = ['red', 'green', 'blue'];
$result = array_find_key($colors, fn($c): bool =&gt; $c === 'yellow');

var_dump($result); 

Since 'yellow' isn't in the array, the function returns null. This helps
distinguish between finding a key with null value versus no match.

## Early Termination

array_find_key stops at the first match, which is efficient.

early_termination.php
  

&lt;?php

declare(strict_types=1);

$data = [10, 20, 30, 40, 50];
$key = array_find_key($data, function($n): bool {
    echo "Checking $n\n";
    return $n &gt; 25;
});

echo "Found at key: " . $key; 

The function stops checking after finding 30. You'll only see output for
10, 20, and 30, demonstrating the short-circuit behavior.

## Best Practices

- **Specific Callbacks:** Make callback conditions precise.

- **Type Safety:** Use type hints for reliable comparisons.

- **Performance:** Place likely matches early in large arrays.

- **Null Checks:** Always handle null return values.

## Source

[PHP Array Search Documentation](https://www.php.net/manual/en/function.array-search.php) (related functionality)

This tutorial covered the PHP array_find_key pattern with practical
examples showing its usage for array search scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).