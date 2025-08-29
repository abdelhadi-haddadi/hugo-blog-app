+++
title = "PHP array_find Function"
date = 2025-08-29T20:05:00.051+01:00
draft = false
description = "PHP array_find function tutorial shows how to search array elements in PHP. Learn array_find with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_find Function

last modified March 13, 2025

The PHP array_find function searches for an element in an array
using a callback function. It returns the first matching element or null.

## Basic Definition

The array_find function searches an array for the first element
that satisfies a condition. It's useful for finding specific array items.

Syntax: array_find(array $array, callable $callback): mixed. The
callback should return true for matching elements. Returns null if none match.

## Basic array_find Example

This example demonstrates finding the first even number in an array.

basic_array_find.php
  

&lt;?php

declare(strict_types=1);

function array_find(array $array, callable $callback): mixed {
    foreach ($array as $element) {
        if ($callback($element)) {
            return $element;
        }
    }
    return null;
}

$numbers = [1, 3, 4, 7, 8];
$firstEven = array_find($numbers, fn($n): bool =&gt; $n % 2 === 0);

echo $firstEven ?? 'Not found'; 

The code finds the first even number (4) in the array. The callback checks
each element until it finds a match, then returns it immediately.

## Finding Objects by Property

Search for an object in an array where a specific property meets criteria.

object_property_find.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(
        public string $name,
        public int $age
    ) {}
}

$users = [
    new User("Alice", 25),
    new User("Bob", 30),
    new User("Charlie", 22)
];

$youngUser = array_find($users, fn(User $u): bool =&gt; $u-&gt;age &lt; 25);

echo $youngUser?-&gt;name ?? 'Not found'; 

This finds the first user under 25 years old. The callback checks the age
property, returning the matching User object (Charlie in this case).

## Finding Strings by Pattern

Use array_find to locate the first string matching a regex pattern.

string_pattern_find.php
  

&lt;?php

declare(strict_types=1);

$words = ["apple", "banana", "cherry", "date"];
$fruitWithA = array_find($words, fn(string $w): bool =&gt; preg_match('/a/', $w));

echo $fruitWithA ?? 'Not found'; 

This finds the first fruit name containing the letter 'a'. The callback uses
preg_match to test each string until it finds a match (apple).

## Finding in Associative Arrays

Search for items in associative arrays based on key-value combinations.

associative_array_find.php
  

&lt;?php

declare(strict_types=1);

$products = [
    ['id' =&gt; 1, 'name' =&gt; 'Laptop', 'stock' =&gt; 5],
    ['id' =&gt; 2, 'name' =&gt; 'Phone', 'stock' =&gt; 0],
    ['id' =&gt; 3, 'name' =&gt; 'Tablet', 'stock' =&gt; 10]
];

$outOfStock = array_find($products, fn(array $p): bool =&gt; $p['stock'] === 0);

echo $outOfStock['name'] ?? 'All in stock'; 

This locates the first product with zero stock. The callback checks the
'stock' key in each associative array, returning the matching item (Phone).

## Finding with Complex Conditions

Combine multiple conditions in the callback for more sophisticated searches.

complex_condition_find.php
  

&lt;?php

declare(strict_types=1);

$employees = [
    ['name' =&gt; 'John', 'department' =&gt; 'IT', 'salary' =&gt; 75000],
    ['name' =&gt; 'Jane', 'department' =&gt; 'HR', 'salary' =&gt; 65000],
    ['name' =&gt; 'Bob', 'department' =&gt; 'IT', 'salary' =&gt; 80000]
];

$highEarnerInIT = array_find($employees, fn(array $e): bool =&gt; 
    $e['department'] === 'IT' &amp;&amp; $e['salary'] &gt; 70000
);

echo $highEarnerInIT['name'] ?? 'Not found'; 

This finds the first IT department employee earning over 70,000. The callback
combines two conditions to precisely locate the desired element (John).

## Best Practices

- **Early Returns:** Place likely matches early in large arrays.

- **Type Safety:** Use type hints for robust callback functions.

- **Readability:** Extract complex conditions to named functions.

- **Null Safety:** Always check the return value for null.

- **Performance:** Consider array structure for optimal searches.

## Source

[PHP Array Filter Documentation](https://www.php.net/manual/en/function.array-filter.php) (related functionality)

This tutorial covered the PHP array_find pattern with practical
examples showing its usage for various array search scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).