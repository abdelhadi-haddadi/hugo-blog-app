+++
title = "PHP array_udiff Function"
date = 2025-08-29T20:05:11.170+01:00
draft = false
description = "PHP array_udiff function tutorial shows how to compute array differences in PHP. Learn array_udiff with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_udiff Function

last modified March 13, 2025

The PHP array_udiff function computes the difference of arrays
using a callback function for data comparison. It's useful for custom
comparisons.

## Basic Definition

The array_udiff function compares array values using a callback.
It returns values from the first array not present in other arrays.

Syntax: array_udiff(array $array1, array $array2, ..., callable $value_compare_func): array.
The callback must return an integer less than, equal to, or greater than zero.

## Basic array_udiff Example

This shows a simple comparison of arrays containing numbers using a callback.

basic_array_udiff.php
  

&lt;?php

declare(strict_types=1);

function compareNumbers(int $a, int $b): int {
    return $a &lt;=&gt; $b;
}

$array1 = [1, 2, 3, 4, 5];
$array2 = [3, 4, 5, 6, 7];

$result = array_udiff($array1, $array2, 'compareNumbers');

print_r($result); 

This finds elements in $array1 not in $array2. The callback uses the spaceship
operator for comparison. The result contains values 1 and 2.

## Comparing Objects

Compare arrays of objects based on specific object properties.

object_comparison.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

function compareProducts(Product $a, Product $b): int {
    return $a-&gt;price &lt;=&gt; $b-&gt;price;
}

$products1 = [
    new Product("Laptop", 999.99),
    new Product("Phone", 699.99),
    new Product("Tablet", 399.99)
];

$products2 = [
    new Product("Monitor", 299.99),
    new Product("Keyboard", 99.99),
    new Product("Phone", 699.99)
];

$result = array_udiff($products1, $products2, 'compareProducts');

foreach ($result as $product) {
    echo $product-&gt;name . "\n"; 
}

This compares products by price. The callback checks the price property.
Products with unique prices in the first array are returned.

## Case-Insensitive String Comparison

Perform a case-insensitive comparison of string arrays.

case_insensitive.php
  

&lt;?php

declare(strict_types=1);

function compareStrings(string $a, string $b): int {
    return strcasecmp($a, $b);
}

$array1 = ["Apple", "Banana", "Cherry"];
$array2 = ["apple", "banana", "grape"];

$result = array_udiff($array1, $array2, 'compareStrings');

print_r($result); 

This compares strings ignoring case. The callback uses strcasecmp. Only
"Cherry" is different as the others match case-insensitively.

## Multi-dimensional Array Comparison

Compare multi-dimensional arrays based on specific elements.

multi_dimensional.php
  

&lt;?php

declare(strict_types=1);

function compareArrays(array $a, array $b): int {
    return $a['id'] &lt;=&gt; $b['id'];
}

$users1 = [
    ['id' =&gt; 1, 'name' =&gt; 'Alice'],
    ['id' =&gt; 2, 'name' =&gt; 'Bob'],
    ['id' =&gt; 3, 'name' =&gt; 'Charlie']
];

$users2 = [
    ['id' =&gt; 2, 'name' =&gt; 'Robert'],
    ['id' =&gt; 4, 'name' =&gt; 'David']
];

$result = array_udiff($users1, $users2, 'compareArrays');

print_r($result); // Outputs users with IDs 1 and 3

This compares arrays by their 'id' elements. The callback checks the id key.
Users with unique IDs in the first array are returned.

## Multiple Array Comparison

Compare one array against multiple other arrays simultaneously.

multiple_arrays.php
  

&lt;?php

declare(strict_types=1);

function compareValues($a, $b): int {
    if (is_numeric($a) &amp;&amp; is_numeric($b)) {
        return $a &lt;=&gt; $b;
    }
    return strcmp((string)$a, (string)$b);
}

$mainArray = [1, 'apple', 3.14, true, 'orange'];
$array2 = [1, 3.14];
$array3 = ['apple', 'banana'];

$result = array_udiff($mainArray, $array2, $array3, 'compareValues');

print_r($result); 

This compares against multiple arrays with mixed types. The callback handles
both numeric and string comparisons. Only unique values remain.

## Best Practices

- **Consistent Callbacks:** Ensure callbacks return consistent comparison results.

- **Type Safety:** Add type hints to callback parameters when possible.

- **Performance:** For large arrays, optimize callback functions.

- **Readability:** Use descriptive names for callback functions.

## Source

[PHP array_udiff Documentation](https://www.php.net/manual/en/function.array-udiff.php)

This tutorial covered the PHP array_udiff function with practical
examples showing its usage for various comparison scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).