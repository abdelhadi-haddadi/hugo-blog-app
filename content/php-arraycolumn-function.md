+++
title = "PHP array_column Function"
date = 2025-08-29T20:04:55.526+01:00
draft = false
description = "PHP array_column function tutorial shows how to extract columns from arrays in PHP. Learn array_column with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_column Function

last modified March 13, 2025

The PHP array_column function extracts a single column from a
multi-dimensional array or an array of objects. It's useful for data extraction.

## Basic Definition

The array_column function returns values from a single column in
the input array. It works with both arrays and objects.

Syntax: array_column(array $array, mixed $column_key, mixed $index_key = null): array.
The column_key specifies which column to extract.

## Basic array_column Example

This shows how to extract a column of values from an array of associative arrays.

basic_array_column.php
  

&lt;?php

$users = [
    ['id' =&gt; 1, 'name' =&gt; 'John', 'email' =&gt; 'john@example.com'],
    ['id' =&gt; 2, 'name' =&gt; 'Mary', 'email' =&gt; 'mary@example.com'],
    ['id' =&gt; 3, 'name' =&gt; 'Peter', 'email' =&gt; 'peter@example.com']
];

$names = array_column($users, 'name');

print_r($names);

This extracts all names from the users array. The output will be an array
containing ['John', 'Mary', 'Peter'].

## Extracting with Index Key

You can specify an index key to use as keys in the resulting array.

index_key_example.php
  

&lt;?php

$users = [
    ['id' =&gt; 1, 'name' =&gt; 'John', 'email' =&gt; 'john@example.com'],
    ['id' =&gt; 2, 'name' =&gt; 'Mary', 'email' =&gt; 'mary@example.com'],
    ['id' =&gt; 3, 'name' =&gt; 'Peter', 'email' =&gt; 'peter@example.com']
];

$emails = array_column($users, 'email', 'id');

print_r($emails);

This creates an array with IDs as keys and emails as values. The output will
be [1 =&gt; 'john@example.com', 2 =&gt; 'mary@example.com', 3 =&gt; 'peter@example.com'].

## Working with Objects

array_column can also extract public properties from objects.

object_properties.php
  

&lt;?php

class User {
    public function __construct(
        public int $id,
        public string $name,
        public string $email
    ) {}
}

$users = [
    new User(1, 'John', 'john@example.com'),
    new User(2, 'Mary', 'mary@example.com'),
    new User(3, 'Peter', 'peter@example.com')
];

$names = array_column($users, 'name');

print_r($names);

This extracts the name property from each User object. The output will be
the same as the first example: ['John', 'Mary', 'Peter'].

## Extracting Nested Data

array_column can extract values from nested arrays using dot notation.

nested_data.php
  

&lt;?php

$products = [
    ['id' =&gt; 1, 'details' =&gt; ['name' =&gt; 'Laptop', 'price' =&gt; 999]],
    ['id' =&gt; 2, 'details' =&gt; ['name' =&gt; 'Phone', 'price' =&gt; 699]],
    ['id' =&gt; 3, 'details' =&gt; ['name' =&gt; 'Tablet', 'price' =&gt; 399]]
];

$prices = array_column($products, 'details.price');

print_r($prices);

This extracts all prices from the nested details array. The output will be
[999, 699, 399]. The dot notation accesses nested array elements.

## Using array_column with array_map

Combine array_column with array_map for more complex data transformations.

with_array_map.php
  

&lt;?php

$users = [
    ['id' =&gt; 1, 'name' =&gt; 'John', 'email' =&gt; 'john@example.com'],
    ['id' =&gt; 2, 'name' =&gt; 'Mary', 'email' =&gt; 'mary@example.com'],
    ['id' =&gt; 3, 'name' =&gt; 'Peter', 'email' =&gt; 'peter@example.com']
];

$formattedEmails = array_map(
    fn($email) =&gt; "Email: $email",
    array_column($users, 'email')
);

print_r($formattedEmails);

This extracts emails and formats them with a prefix. The output will be
['Email: john@example.com', 'Email: mary@example.com', 'Email: peter@example.com'].

## Best Practices

- **Column Existence:** Verify columns exist before extraction.

- **Performance:** Use for large datasets efficiently.

- **Readability:** Combine with other array functions carefully.

- **Type Safety:** Consider data types when extracting values.

## Source

[PHP array_column Documentation](https://www.php.net/manual/en/function.array-column.php)

This tutorial covered the PHP array_column function with practical
examples showing its usage for data extraction scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).