+++
title = "PHP Array Filtering"
date = 2025-08-29T20:04:22.097+01:00
draft = false
description = "PHP array filtering tutorial shows how to filter arrays and objects in PHP. Learn array_filter, array_map, and more with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Array Filtering

last modified March 13, 2025

PHP offers robust tools for filtering arrays and objects, such as
array_filter, array_map, and array_reduce.
This tutorial explores these functions with practical examples.

## Basic Array Filtering

The array_filter function filters array elements using a
callback, returning a new array with elements meeting the condition.

basic_filter.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6];
$evenNumbers = array_filter($numbers, fn($num) =&gt; $num % 2 === 0);
print_r($evenNumbers);

This filters even numbers from $numbers using an arrow function
for concise syntax. The array_filter function iterates over each
element in the $numbers array—here, integers 1 through 6—and applies
the callback. The arrow function fn($num) =&gt; $num % 2 === 0 checks
if the number is divisible by 2 with no remainder, identifying even numbers.

Only elements returning true are included in the new array. The
result, stored in $evenNumbers, is [2, 4, 6]. Note that
the original array remains unchanged, and the indices are preserved in the
output, though re-indexed sequentially since this is a numeric array.

## Filtering with Keys

Use array_filter with ARRAY_FILTER_USE_BOTH to
filter based on keys and values simultaneously.

filter_with_keys.php
  

&lt;?php

$data = ["a" =&gt; 1, "b" =&gt; 2, "c" =&gt; 3, "d" =&gt; 4];

$filtered = array_filter($data, fn($v, $k) =&gt; $k === "b" || $v &gt; 2, 
    ARRAY_FILTER_USE_BOTH);
print_r($filtered);

This keeps elements where the key is "b" or value exceeds 2. The
ARRAY_FILTER_USE_BOTH flag tells array_filter to pass
both the value and key to the callback function. Here, the associative array
$data has string keys ("a", "b", "c", "d") mapped to integers.

The callback fn($v, $k) =&gt; $k === "b" || $v &gt; 2 evaluates each
element. For "a" =&gt; 1, the key isn't "b" and 1 &lt;= 2, so it's excluded. For
"b" =&gt; 2, the key matches "b", so it's included despite the value not
exceeding 2. For "c" =&gt; 3 and "d" =&gt; 4, the values exceed 2, so they're
included. The output is ["b" =&gt; 2, "c" =&gt; 3, "d" =&gt; 4],
preserving original keys.

## Using array_map

array_map transforms each array element via a callback,
returning a new array with modified values.

array_map_example.php
  

&lt;?php

$numbers = [1, 2, 3, 4];
$squared = array_map(fn($num) =&gt; $num * $num, $numbers);
print_r($squared);

This squares each number in $numbers. The array_map
function applies the callback to every element in the input array, here
[1, 2, 3, 4]. The arrow function fn($num) =&gt; $num * $num
multiplies each number by itself, transforming 1 to 1, 2 to 4, 3 to 9, and 4 to 16.

The result, stored in $squared, is [1, 4, 9, 16].
Unlike array_filter, which reduces the array size based on a
condition, array_map always returns an array of the same length,
with each element replaced by the callback's return value. The original array
remains intact.

## Filtering Objects with Property Promotion

PHP 8.0+ supports constructor property promotion. Filter such objects
using array_filter.

filter_objects.php
  

&lt;?php

class Product {
    public function __construct(
        public string $name, 
        public float $price) {}
}

$products = [
    new Product("Laptop", 1000),
    new Product("Phone", 500),
    new Product("Tablet", 300)
];

$affordable = array_filter($products, fn($p) =&gt; $p-&gt;price &lt; 800);
print_r($affordable);

This filters products under 800. The Product class uses constructor
property promotion, a PHP 8.0+ feature that declares and assigns public
properties directly in the constructor. Each Product object in the
$products array has a $name and $price.

The array_filter callback fn($p) =&gt; $p-&gt;price &lt; 800
accesses the $price property of each object. "Laptop" (1000) is
excluded as 1000 &gt;= 800, while "Phone" (500) and "Tablet" (300) are included
since their prices are below 800. The output is an array with these two objects,
retaining their original indices (1 and 2).

## Combining array_filter and array_map

Combine array_filter and array_map to filter and
transform data in one flow.

combine_filter_map.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6];

$result = array_map(fn($num) =&gt; $num * 2, 
    array_filter($numbers, fn($num) =&gt; $num % 2 === 0));
print_r($result);

Filters even numbers, then doubles them. This example nests two functions.
First, array_filter with fn($num) =&gt; $num % 2 === 0
processes $numbers, keeping only even numbers—2, 4, and 6—producing
an intermediate array [2, 4, 6].

Next, array_map takes this filtered array and applies
fn($num) =&gt; $num * 2, doubling each value: 2 becomes 4, 4 becomes 8,
and 6 becomes 12. The final result in $result is [4, 8, 12].
This chaining is efficient for multi-step transformations, and the original
array remains unchanged.

## Using array_reduce

array_reduce reduces an array to a single value through
iterative callback application.

array_reduce_example.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5];
$sum = array_reduce($numbers, fn($carry, $num) =&gt; $carry + $num, 0);
echo "Sum: $sum";

This sums all numbers in $numbers. The array_reduce
function iterates over [1, 2, 3, 4, 5], using a callback that takes
two parameters: $carry (the accumulated result) and $num
(the current element). The initial value of $carry is set to 0.

On each iteration, $carry + $num updates the total: 0 + 1 = 1,
1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10, and 10 + 5 = 15. The final value of
$sum is 15, output as "Sum: 15". This method is versatile for
aggregations like sums, products, or custom reductions.

## Filtering Associative Arrays

Filter associative arrays using array_filter with custom
conditions.

filter_associative.php
  

&lt;?php

$users = [
    ["name" =&gt; "John", "age" =&gt; 25],
    ["name" =&gt; "Jane", "age" =&gt; 30],
    ["name" =&gt; "Doe", "age" =&gt; 17]
];

$adults = array_filter($users, fn($user) =&gt; $user["age"] &gt;= 18);
print_r($adults);

Filters users 18 or older. The $users array contains associative
arrays, each representing a user with "name" and "age" keys. The
array_filter callback fn($user) =&gt; $user["age"] &gt;= 18
checks the "age" value of each sub-array.

For "John" (age 25) and "Jane" (age 30), the condition is true, so they're
included. For "Doe" (age 17), it's false, so it's excluded. The result in
$adults is an array with two elements—indices 0 and 1 preserved—showing
only adult users. This is useful for filtering structured data like records.

## Filtering Objects by Multiple Criteria

Filter objects with multiple conditions using promoted properties.

filter_multi_criteria.php
  

&lt;?php

class Item {
    public function __construct(
        public string $name, 
        public float $price, 
        public int $stock) {}
}

$items = [
    new Item("Laptop", 1000, 5),
    new Item("Phone", 500, 10),
    new Item("Tablet", 300, 0)
];

$inStock = array_filter($items, fn($i) =&gt; $i-&gt;price &lt; 800 &amp;&amp; $i-&gt;stock &gt; 0);
print_r($inStock);

Filters items under 800 and in stock. The Item class uses property
promotion to define $name, $price, and $stock.
The $items array holds three objects representing products with
these attributes.

The callback fn($i) =&gt; $i-&gt;price &lt; 800 &amp;&amp; $i-&gt;stock &gt; 0
applies two conditions: price below 800 and stock above 0. "Laptop" (1000, 5)
fails the price check, "Tablet" (300, 0) fails the stock check, but "Phone"
(500, 10) passes both. The output in $inStock is an array with just
the "Phone" object at index 1.

## Filtering Unique Values

Use array_unique with array_map to filter unique
transformed values.

filter_unique.php
  

&lt;?php

$values = [1, 2, 2, 3, 3, 4];
$uniqueSquares = array_unique(array_map(fn($v) =&gt; $v * $v, $values));
print_r($uniqueSquares);

Squares values and removes duplicates. First, array_map with
fn($v) =&gt; $v * $v transforms [1, 2, 2, 3, 3, 4]
into [1, 4, 4, 9, 9, 16]. Each element is squared, so duplicates
like 2 and 2 both become 4, and 3 and 3 both become 9.

Then, array_unique removes duplicate values, keeping only the first
occurrence: [1, 4, 9, 16]. The result in $uniqueSquares
is a re-indexed array with unique squared values. This combination is handy for
data normalization tasks.

## Filtering with array_reduce for Objects

Use array_reduce to filter objects into a new array.

reduce_filter_objects.php
  

&lt;?php

class User {
    public function __construct(public string $name, public int $age) {}
}

$users = [
    new User("John", 25),
    new User("Jane", 30),
    new User("Doe", 17)
];

$adults = array_reduce($users, fn($carry, $u) =&gt; 
    $u-&gt;age &gt;= 18 ? [...$carry, $u] : $carry, []);

print_r($adults);

Accumulates adult users. The $users array contains
User objects with promoted properties. The
array_reduce function starts with an empty array ([])
as the initial $carry value.

The callback uses a ternary operator: if $u-&gt;age &gt;= 18, the
current user is appended to $carry using the spread operator
(...); otherwise, $carry is unchanged. "John" (25) and
"Jane" (30) are added, but "Doe" (17) is skipped. The result in
$adults is an array of two adult user objects.

## Filtering with array_walk

array_walk modifies elements in place, often paired with
array_filter.

array_walk_filter.php
  

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6];
array_walk($numbers, fn(&amp;$num) =&gt; $num = $num % 2 === 0 ? $num : null);
$numbers = array_filter($numbers);

print_r($numbers);

Keeps even numbers by nulling odd ones. The array_walk function
applies the callback to each element in $numbers, modifying it
directly because $num is passed by reference (using &amp;).
The ternary operator sets even numbers to themselves and odd numbers to
null.

After array_walk, $numbers becomes
[null, 2, null, 4, null, 6]. Then, array_filter
removes all null values, leaving [2, 4, 6] in
$numbers. This approach modifies the original array, unlike
pure array_filter.

## Filtering Nested Arrays

Filter nested arrays using recursive logic with array_filter.

filter_nested.php
  

&lt;?php

$data = [1, [2, 3], [4, [5, 6]]];

$flatten = fn($arr) =&gt; array_merge(...array_map(fn($v) =&gt; 
    is_array($v) ? $flatten($v) : [$v], $arr));

$evens = array_filter($flatten($data), fn($n) =&gt; $n % 2 === 0);
print_r($evens);

Flattens and filters even numbers. The $data array has nested
sub-arrays. The $flatten function recursively flattens it using
array_map and array_merge. For each value, if it's an
array, $flatten is called again; if not, it's wrapped in an array.

Applying $flatten($data) yields [1, 2, 3, 4, 5, 6].
Then, array_filter with fn($n) =&gt; $n % 2 === 0 keeps
even numbers, resulting in [2, 4, 6] stored in $evens.
This is ideal for handling hierarchical data structures.

## Filtering with array_column

Extract and filter specific columns from multi-dimensional arrays.

array_column_filter.php
  

&lt;?php

$users = [
    ["id" =&gt; 1, "name" =&gt; "John", "age" =&gt; 25],
    ["id" =&gt; 2, "name" =&gt; "Jane", "age" =&gt; 30],
    ["id" =&gt; 3, "name" =&gt; "Doe", "age" =&gt; 17]
];

$adultNames = array_filter(array_column($users, "name", "age"), 
    fn($n, $a) =&gt; $a &gt;= 18, ARRAY_FILTER_USE_BOTH);
print_r($adultNames);

Extracts names of adults. The array_column function extracts the
"name" column from $users, using "age" as the index, producing
[25 =&gt; "John", 30 =&gt; "Jane", 17 =&gt; "Doe"]. This creates an
associative array mapping ages to names.

Then, array_filter with ARRAY_FILTER_USE_BOTH filters
this array, keeping entries where the key (age) is 18 or more. The callback
fn($n, $a) =&gt; $a &gt;= 18 excludes 17 =&gt; "Doe", leaving
[25 =&gt; "John", 30 =&gt; "Jane"] in $adultNames.
This combines extraction and filtering effectively.

## Filtering Users by Age

Filter an array of user objects by age, calculated from their date of
birth, using array_filter.

filter_users_by_age.php
  

&lt;?php

class User {
    public function __construct(
        public string $first_name,
        public string $last_name,
        public string $city,
        public string $email,
        public string $date_of_birth
    ) {}
}

$users = [
    new User("John", "Doe", "New York", "john.doe@example.com", "2000-05-15"),
    new User("Jane", "Smith", "Los Angeles", "jane.smith@example.com", "1995-08-22"),
    new User("Alice", "Johnson", "Chicago", "alice.j@example.com", "2010-03-10"),
    new User("Bob", "Brown", "Houston", "bob.brown@example.com", "1998-11-30"),
    new User("Emma", "Davis", "Seattle", "emma.davis@example.com", "2005-07-19"),
    new User("Mike", "Wilson", "Boston", "mike.w@example.com", "1990-01-25"),
    new User("Sarah", "Taylor", "Miami", "sarah.t@example.com", "2008-09-12"),
    new User("Tom", "Moore", "Denver", "tom.moore@example.com", "1997-04-05"),
    new User("Lisa", "Clark", "Phoenix", "lisa.clark@example.com", "2003-12-01"),
    new User("David", "Lee", "Portland", "david.lee@example.com", "1985-06-18")
];

$adults = array_filter($users, fn($user) =&gt; 
    (new DateTime())-&gt;diff(new DateTime($user-&gt;date_of_birth))-&gt;y &gt; 18);
print_r($adults);

This filters user objects over 18 years old based on their date of birth.
The User class uses constructor property promotion to define
properties for first name, last name, city, email, and date of birth. The
$users array contains 10 User objects.

The array_filter callback calculates the age by comparing the
current date with each user's $date_of_birth property. Users under
18 years old at the time of calculation are excluded. The result in
$adults includes objects for users like "John" and "Jane", who are
over 18, retaining their original indices.

## Best Practices for Array Filtering

- **Use Arrow Functions:** Simplify callbacks with arrow syntax.

- **Combine Tools:** Mix functions for complex transformations.

- **Optimize Early:** Filter before mapping to reduce overhead.

- **Leverage Objects:** Use promoted properties for clean code.

## Source

[PHP array_filter Documentation](https://www.php.net/manual/en/function.array-filter.php)

This tutorial covers filtering arrays and objects in PHP with modern
techniques, including constructor property promotion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).