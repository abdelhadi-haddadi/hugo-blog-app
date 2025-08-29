+++
title = "PHP array_any Function"
date = 2025-08-29T20:04:54.429+01:00
draft = false
description = "PHP array_any function tutorial shows how to validate any array elements in PHP. Learn array_any with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_any Function

last modified March 13, 2025

The PHP array_any function checks if any element in an array
passes a test implemented by a callback function. It's useful for partial
validation.

## Basic Definition

The array_any function tests whether any element satisfies a
condition. It returns true if at least one element passes the test.

Syntax: array_any(array $array, callable $callback): bool. The
callback should return true for passing elements. Empty arrays return false.

## Basic array_any Example

This shows simple validation checking if any array element is positive.

basic_array_any.php
  

&lt;?php

declare(strict_types=1);

function array_any(array $array, callable $callback): bool {
    foreach ($array as $element) {
        if ($callback($element)) {
            return true;
        }
    }
    return false;
}

$numbers = [-2, -1, 0, 1];
$hasPositive = array_any($numbers, fn($n): bool =&gt; $n &gt; 0);

echo $hasPositive ? 'Has positive' : 'No positives'; 

This checks if any number is positive. The callback tests each element, and
array_any returns true since 1 passes the test.

## Checking for Specific Values

Verify if any string in an array matches a specific value.

specific_values.php
  

&lt;?php

declare(strict_types=1);

$colors = ["red", "green", "blue"];
$hasBlue = array_any($colors, fn($color): bool =&gt; $color === "blue");

echo $hasBlue ? 'Has blue' : 'No blue'; 

This checks if "blue" exists in the array. The callback compares each
element, returning true when it finds the matching value.

## Object Property Check

Check if any object in an array has a property meeting certain criteria.

object_property_check.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(
        public string $name,
        public bool $isAdmin
    ) {}
}

$users = [
    new User("Alice", false),
    new User("Bob", false),
    new User("Charlie", true)
];

$hasAdmin = array_any($users, fn(User $u): bool =&gt; $u-&gt;isAdmin);

echo $hasAdmin ? 'Has admin' : 'No admins'; 

This verifies if any user is an admin. The callback checks each object's
isAdmin property, returning true when it finds an admin user.

## Empty Array Behavior

array_any returns false for empty arrays, which is logical.

empty_array.php
  

&lt;?php

declare(strict_types=1);

$emptyArray = [];
$result = array_any($emptyArray, fn($x): bool =&gt; $x &gt; 10);

echo $result ? 'Some pass' : 'None pass'; 

With no elements to check, array_any returns false. This follows
mathematical logic where existential quantification over an empty set is false.

## Early Termination

array_any stops checking after first success for efficiency.

early_termination.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 3, 5, 8, 9];
$hasEven = array_any($numbers, function($n): bool {
    echo "Checking $n\n";
    return $n % 2 === 0;
});

echo $hasEven ? 'Has even' : 'No evens'; 

The function stops at the first even number (8). You'll only see output for
1, 3, 5, and 8, demonstrating the short-circuit behavior.

## Best Practices

- **Clear Callbacks:** Use descriptive names for callback logic.

- **Type Safety:** Add type hints for robust validation.

- **Performance:** Place likely matches early in large arrays.

- **Readability:** Consider helper functions for complex checks.

## Source

[PHP Array Filter Documentation](https://www.php.net/manual/en/function.array-filter.php) (related functionality)

This tutorial covered the PHP array_any pattern with practical
examples showing its usage for array validation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).