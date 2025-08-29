+++
title = "PHP list() Function"
date = 2025-08-29T20:05:20.042+01:00
draft = false
description = "PHP list() function tutorial shows how to destructure arrays in PHP. Learn list() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP list() Function

last modified March 13, 2025

The PHP list function assigns array elements to variables in
one operation. It's a convenient way to destructure arrays in PHP.

## Basic Definition

The list function assigns values from an array to variables
in a single statement. It works like array destructuring in other languages.

Syntax: list(var1, var2, ...) = array. The function assigns
array elements to variables in order. Extra array elements are ignored.

## Basic list() Example

This shows the simplest usage of list to assign array values.

basic_list.php
  

&lt;?php

$person = ["John", "Doe", 32];

list($firstName, $lastName, $age) = $person;

echo "$firstName $lastName is $age years old.";

The array elements are assigned to variables in order. The first element goes
to $firstName, second to $lastName, and third to
$age.

## Skipping Elements

You can skip array elements by omitting variables or using empty commas.

skip_elements.php
  

&lt;?php

$data = ["red", "green", "blue", "yellow"];

list($color1, , $color3) = $data;

echo "First color: $color1, Third color: $color3";

The second element is skipped by having two commas in a row. Only the first
and third elements are assigned to variables.

## Associative Arrays

With PHP 7.1+, list supports associative array destructuring.

associative_array.php
  

&lt;?php

$user = [
    "name" =&gt; "Alice",
    "email" =&gt; "alice@example.com",
    "age" =&gt; 28
];

["name" =&gt; $name, "email" =&gt; $email] = $user;

echo "$name &lt;$email&gt;";

This assigns values from an associative array to variables using key names.
The syntax is similar to JavaScript object destructuring.

## Nested Arrays

list can destructure nested arrays with a similar syntax.

nested_array.php
  

&lt;?php

$data = [
    [1, 2],
    [3, 4],
    [5, 6]
];

list(list($a, $b), list($c, $d)) = $data;

echo "$a, $b, $c, $d";

This example shows how to destructure a multidimensional array. Each nested
list corresponds to a nested array level.

## Short List Syntax

PHP 7.1 introduced a shorter square bracket syntax for array destructuring.

short_syntax.php
  

&lt;?php

$coordinates = [12.34, 56.78];

[$latitude, $longitude] = $coordinates;

echo "Lat: $latitude, Long: $longitude";

The square bracket syntax works exactly like list but is more
concise. This is the preferred syntax in modern PHP code.

## Best Practices

- **Modern Syntax:** Use square brackets instead of list in PHP 7.1+.

- **Error Handling:** Ensure arrays have enough elements to avoid notices.

- **Readability:** Use destructuring when it improves code clarity.

- **Type Safety:** Add type hints when working with typed properties.

## Source

[PHP list() Documentation](https://www.php.net/manual/en/function.list.php)

This tutorial covered the PHP list function with practical
examples showing array destructuring in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).