+++
title = "PHP usort Function"
date = 2025-08-29T20:05:25.769+01:00
draft = false
description = "PHP usort function tutorial shows how to sort arrays with custom comparison logic in PHP. Learn usort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP usort Function

last modified March 13, 2025

The PHP usort function sorts an array using a user-defined
comparison function. It allows custom sorting logic not possible with
standard sort functions.

## Basic Definition

The usort function sorts an array by values using a comparison
function you provide. It maintains index association for array elements.

Syntax: usort(array &amp;$array, callable $callback): bool. The
callback defines the sort order. It modifies the original array directly.

The callback must return an integer less than, equal to, or greater than
zero if the first argument is considered to be respectively less than,
equal to, or greater than the second.

## Basic Numeric Sorting

This example demonstrates custom numeric sorting in descending order.

basic_usort.php
  

&lt;?php

declare(strict_types=1);

$numbers = [3, 1, 4, 1, 5, 9, 2, 6];

usort($numbers, function($a, $b) {
    return $b &lt;=&gt; $a; // Reverse spaceship operator for descending
});

print_r($numbers);

The callback uses the spaceship operator (&lt;=&gt;) reversed to
sort numbers in descending order. The array is modified in place.

## Sorting Associative Arrays

Sort an associative array by a specific key using usort.

associative_sort.php
  

&lt;?php

declare(strict_types=1);

$users = [
    ['name' =&gt; 'Alice', 'age' =&gt; 28],
    ['name' =&gt; 'Bob', 'age' =&gt; 22],
    ['name' =&gt; 'Charlie', 'age' =&gt; 25]
];

usort($users, function($a, $b) {
    return $a['age'] &lt;=&gt; $b['age'];
});

print_r($users);

This sorts users by age in ascending order. The callback compares the 'age'
values from each associative array element.

## Sorting Objects by Property

Sort an array of objects based on a property value with usort.

object_sort.php
  

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

usort($products, function($a, $b) {
    return $a-&gt;price &lt;=&gt; $b-&gt;price;
});

foreach ($products as $product) {
    echo "{$product-&gt;name}: {$product-&gt;price}\n";
}

Products are sorted by price in ascending order. The callback accesses the
object properties to determine the sort order.

## Multi-Criteria Sorting

Implement complex sorting with multiple criteria using usort.

multi_criteria.php
  

&lt;?php

declare(strict_types=1);

$employees = [
    ['name' =&gt; 'Alice', 'department' =&gt; 'Sales', 'salary' =&gt; 5000],
    ['name' =&gt; 'Bob', 'department' =&gt; 'IT', 'salary' =&gt; 6000],
    ['name' =&gt; 'Charlie', 'department' =&gt; 'Sales', 'salary' =&gt; 5500],
    ['name' =&gt; 'David', 'department' =&gt; 'IT', 'salary' =&gt; 5500]
];

usort($employees, function($a, $b) {
    // First by department (ascending)
    $deptCompare = $a['department'] &lt;=&gt; $b['department'];
    if ($deptCompare !== 0) {
        return $deptCompare;
    }
    // Then by salary (descending)
    return $b['salary'] &lt;=&gt; $a['salary'];
});

print_r($employees);

Employees are first sorted by department alphabetically, then by salary in
descending order within each department. The callback implements this logic.

## Case-Insensitive String Sorting

Sort strings case-insensitively with a custom comparison function.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

$names = ["apple", "Banana", "cherry", "Date"];

usort($names, function($a, $b) {
    return strcasecmp($a, $b);
});

print_r($names);

The strcasecmp function performs case-insensitive string
comparison. This ensures "Banana" appears between "apple" and "cherry".

## Best Practices

- **Type Safety:** Use type hints in callbacks for robustness.

- **Performance:** Keep comparison logic simple for large arrays.

- **Readability:** Use named functions for complex comparisons.

- **Stability:** Be aware that usort is not a stable sort.

- **Testing:** Verify edge cases in your comparison logic.

## Source

[PHP usort Documentation](https://www.php.net/manual/en/function.usort.php)

This tutorial covered the PHP usort function with practical
examples showing its usage for custom array sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).