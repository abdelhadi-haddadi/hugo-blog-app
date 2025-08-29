+++
title = "PHP Array Sorting"
date = 2025-08-29T20:04:09.131+01:00
draft = false
description = "PHP array sorting tutorial shows how to sort arrays and objects in PHP. Learn sort, usort, and more with examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Array Sorting

last modified March 13, 2025

PHP provides powerful functions for sorting arrays and objects, such as
sort, asort, ksort, and
usort. This tutorial covers these with practical examples.

## Basic Sorting with sort

The sort function sorts an array in ascending order,
re-indexing numeric keys.

basic_sort.php
  

&lt;?php

declare(strict_types=1);

$numbers = [3, 1, 4, 1, 5];
sort($numbers);
print_r($numbers);

This sorts $numbers in ascending order. The original array [3, 1,
4, 1, 5] becomes [1, 1, 3, 4, 5]. Keys are reset to 0 through 4.

## Sorting Strings with sort

Use sort to sort an array of strings alphabetically.

sort_strings.php
  

&lt;?php

declare(strict_types=1);

$fruits = ["banana", "apple", "cherry"];
sort($fruits);
print_r($fruits);

This sorts $fruits alphabetically. The result is
["apple", "banana", "cherry"], with keys re-indexed from 0.

## Preserving Keys with asort

The asort function sorts by value, keeping key associations.

asort_example.php
  

&lt;?php

declare(strict_types=1);

$scores = ["John" =&gt; 85, "Jane" =&gt; 92, "Bob" =&gt; 78];
asort($scores);
print_r($scores);

This sorts $scores by value. The result is
["Bob" =&gt; 78, "John" =&gt; 85, "Jane" =&gt; 92], with keys preserved.

## Sorting by Keys with ksort

The ksort function sorts an array by key in ascending order.

ksort_example.php
  

&lt;?php

declare(strict_types=1);

$data = ["z" =&gt; 1, "x" =&gt; 2, "y" =&gt; 3];
ksort($data);
print_r($data);

This sorts $data by key. The result is
["x" =&gt; 2, "y" =&gt; 3, "z" =&gt; 1], with values tied to their original keys.

## Descending Order with rsort

The rsort function sorts an array in descending order.

rsort_example.php
  

&lt;?php

declare(strict_types=1);

$numbers = [3, 1, 4, 1, 5];
rsort($numbers);
print_r($numbers);

This sorts $numbers in descending order. The result is
[5, 4, 3, 1, 1], with keys re-indexed from 0.

## Custom Sorting with usort

The usort function sorts using a custom comparison function.

usort_example.php
  

&lt;?php

declare(strict_types=1);

$numbers = [10, 5, 8, 3];
usort($numbers, fn($a, $b): int =&gt; $b - $a);
print_r($numbers);

This sorts $numbers in descending order using an arrow
function. The callback returns a negative, zero, or positive value to
determine order. The result is [10, 8, 5, 3].

## Sorting Objects by Property

Use usort to sort objects by a property value.

sort_objects.php
  

&lt;?php

declare(strict_types=1);

class Product {
    public function __construct(
        public string $name,
        public float $price
    ) {}
}

$products = [
    new Product("Phone", 500),
    new Product("Laptop", 1000),
    new Product("Tablet", 300)
];

usort($products, fn(Product $a, Product $b): int =&gt;  
    $a-&gt;price &lt;=&gt; $b-&gt;price);
print_r($products);

This sorts $products by price. The spaceship operator
(&lt;=&gt;) compares prices, resulting in objects ordered as
"Tablet" (300), "Phone" (500), "Laptop" (1000).

## Sorting Associative Arrays with uasort

The uasort function sorts by value, preserving keys, with a
custom function.

uasort_example.php
  

&lt;?php

declare(strict_types=1);

$scores = ["John" =&gt; 85, "Jane" =&gt; 92, "Bob" =&gt; 78];
uasort($scores, fn($a, $b): int =&gt; $b &lt;=&gt; $a);
print_r($scores);

This sorts $scores by value in descending order. The result
is ["Jane" =&gt; 92, "John" =&gt; 85, "Bob" =&gt; 78], with keys intact.

## Sorting by Key with uksort

The uksort function sorts by key using a custom function.

uksort_example.php
  

&lt;?php

declare(strict_types=1);

$data = ["z" =&gt; 1, "x" =&gt; 2, "y" =&gt; 3];
uksort($data, fn(string $a, string $b): int =&gt; strlen($a) &lt;=&gt; strlen($b));
print_r($data);

This sorts $data by key length. The result is ["x" =&gt; 2, "y"
=&gt; 3, "z" =&gt; 1], as all keys are single characters, sorted alphabetically
by default tie-breaking.

## Sorting Multidimensional Arrays

Sort multidimensional arrays by a specific key with usort.

sort_multi.php
  

&lt;?php

declare(strict_types=1);

$users = [
    ["name" =&gt; "John", "age" =&gt; 25],
    ["name" =&gt; "Jane", "age" =&gt; 30],
    ["name" =&gt; "Bob", "age" =&gt; 20]
];
usort($users, fn(array $a, array $b): int =&gt; $a["age"] &lt;=&gt; $b["age"]);
print_r($users);

This sorts $users by age. The result is "Bob" (20), "John"
(25), "Jane" (30), with array structure preserved.

## Sorting by Multiple Criteria

Sort objects by multiple properties using usort.

sort_multi_criteria.php
  

&lt;?php

declare(strict_types=1);

class Item {
    public function __construct(
        public string $name,
        public int $stock
    ) {}
}

$items = [
    new Item("Laptop", 5),
    new Item("Phone", 10),
    new Item("Tablet", 5)
];

usort($items, fn(Item $a, Item $b): int =&gt; $a-&gt;stock &lt;=&gt; 
    $b-&gt;stock ?: $a-&gt;name &lt;=&gt; $b-&gt;name);
print_r($items);

This sorts $items by stock, then name. The result is
"Laptop" (5), "Tablet" (5), "Phone" (10), with ties broken alphabetically.

## Sorting with array_multisort

Use array_multisort to sort multiple arrays or columns.

array_multisort_example.php
  

&lt;?php

declare(strict_types=1);

$names = ["John", "Jane", "Bob"];
$ages = [25, 30, 20];
array_multisort($ages, SORT_ASC, $names);
print_r([$names, $ages]);

This sorts $ages and aligns $names. The result
is $names = ["Bob", "John", "Jane"] and $ages = [20, 25, 30].

## Sorting Users by Age

Sort an array of user objects by age, calculated from date of birth.

sort_users_by_age.php
  

&lt;?php

declare(strict_types=1);

class User {
    public function __construct(
        public string $first_name,
        public string $last_name,
        public string $date_of_birth
    ) {}
}

$users = [
    new User("John", "Doe", "2000-05-15"),
    new User("Jane", "Smith", "1995-08-22"),
    new User("Bob", "Brown", "1998-11-30")
];

usort($users, fn(User $a, User $b): int =&gt; 
    (new DateTime($a-&gt;date_of_birth)) &lt;=&gt; (new DateTime($b-&gt;date_of_birth)));
print_r($users);

This sorts $users by birth date, oldest first. The callback
compares $date_of_birth values, resulting in "Jane" (1995),
"Bob" (1998), "John" (2000).

## Best Practices for Sorting

**Use Appropriate Functions:** Choose sort
or usort based on needs.
**Preserve Keys:** Use asort or
ksort for associative arrays.
**Leverage Spaceship:** Simplify comparisons with
&lt;=&gt;.
- **Optimize:** Sort early to reduce processing later.

## Source

[PHP sort Documentation](https://www.php.net/manual/en/function.sort.php)

This tutorial explores sorting arrays and objects in PHP with modern
techniques and practical examples.

## Author

My name is Jan Bodnar, a passionate programmer with over a decade of
experience. I've written 1400+ articles and 8 e-books since 2007.

List [all PHP tutorials](/php/).