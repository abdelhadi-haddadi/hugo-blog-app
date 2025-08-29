+++
title = "PHP array_all Function"
date = 2025-08-29T20:04:54.424+01:00
draft = false
description = "PHP array_all function tutorial shows how to validate all array elements in PHP. Learn array_all with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_all Function

last modified March 13, 2025

The PHP array_all function checks if all elements in an array
pass a test implemented by a callback function. It's useful for validation.

## Basic Definition

The array_all function tests whether all elements satisfy a
condition. It returns true if all elements pass the test, false otherwise.

Syntax: array_all(array $array, callable $callback): bool. The
callback should return true for passing elements. Empty arrays return true.

## Basic array_all Example

This shows simple validation of all array elements being positive numbers.

basic_array_all.php
  

&lt;?php

declare(strict_types=1);

function array_all(array $array, callable $callback): bool {
    foreach ($array as $element) {
        if (!$callback($element)) {
            return false;
        }
    }
    return true;
}

$numbers = [2, 4, 6, 8];
$allEven = array_all($numbers, fn($n): bool =&gt; $n % 2 === 0);

echo $allEven ? 'All even' : 'Not all even'; 

This checks if all numbers are even. The callback tests each element, and
array_all returns true since all elements pass the test.

## Validating String Lengths

Check if all strings in an array meet a minimum length requirement.

string_lengths.php
  

&lt;?php

declare(strict_types=1);

$names = ["Alice", "Bob", "Charlie"];
$allLongEnough = array_all($names, fn($name): bool =&gt; strlen($name) &gt;= 3);

echo $allLongEnough ? 'All valid' : 'Some too short'; 

This verifies all names have at least 3 characters. The callback checks
string length, returning true for all elements in this case.

## Object Property Validation

Validate that all objects in an array have a property meeting criteria.

object_validation.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products = [
    new Product("Laptop", 999.99),
    new Product("Phone", 699.99),
    new Product("Tablet", 399.99)
];

$allExpensive = array_all($products, fn(Product $p): bool =&gt; $p-&gt;price &gt; 300);

echo $allExpensive ? 'All expensive' : 'Some cheap'; 

This checks if all products cost more than 300. The callback examines each
object's price property, returning true for this dataset.

## Empty Array Behavior

array_all returns true for empty arrays, which can be useful.

empty_array.php
  

&lt;?php

declare(strict_types=1);

$emptyArray = [];
$result = array_all($emptyArray, fn($x): bool =&gt; $x &gt; 10);

echo $result ? 'All pass (vacuous truth)' : 'Some fail'; 

With no elements to check, array_all returns true. This follows
mathematical logic where universal quantification over an empty set is true.

## Early Termination

array_all stops checking after first failure for efficiency.

early_termination.php
  

&lt;?php

declare(strict_types=1);

$numbers = [2, 4, 5, 8];
$allEven = array_all($numbers, function($n): bool {
    echo "Checking $n\n";
    return $n % 2 === 0;
});

echo $allEven ? 'All even' : 'Not all even'; 

The function stops at the first odd number (5). You'll only see output for
2, 4, and 5, demonstrating the short-circuit behavior.

## Best Practices

- **Clear Callbacks:** Use descriptive names for callback logic.

- **Type Safety:** Add type hints for robust validation.

- **Performance:** Place likely failures early in large arrays.

- **Readability:** Consider helper functions for complex checks.

## Source

[PHP Array Filter Documentation](https://www.php.net/manual/en/function.array-filter.php) (related functionality)

This tutorial covered the PHP array_all pattern with practical
examples showing its usage for array validation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).