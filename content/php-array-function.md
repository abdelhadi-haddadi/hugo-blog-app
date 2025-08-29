+++
title = "PHP array() Function"
date = 2025-08-29T20:04:53.342+01:00
draft = false
description = "PHP array() function tutorial shows how to create and work with arrays in PHP. Learn array() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array() Function

last modified March 13, 2025

The PHP array function is used to create arrays. Arrays are
essential data structures that store multiple values in a single variable.

## Basic Definition

An array in PHP is an ordered map that associates values to keys. The
array function creates a new array with optional elements.

Syntax: array(mixed ...$values): array. It accepts any number
of comma-separated key =&gt; value pairs. Keys can be integers or strings.

## Creating a Simple Array

This example demonstrates creating a basic indexed array with numeric keys.

simple_array.php
  

&lt;?php

$fruits = array("apple", "banana", "orange");

print_r($fruits);

This creates an indexed array with three elements. The print_r
function displays the array structure with automatically assigned keys.

## Associative Array

Associative arrays use named keys that you assign to values.

associative_array.php
  

&lt;?php

$person = array(
    "name" =&gt; "John",
    "age" =&gt; 30,
    "city" =&gt; "New York"
);

print_r($person);

This creates an associative array with string keys. Each element is accessed
using its key name rather than a numeric index.

## Multidimensional Array

Arrays can contain other arrays, creating multidimensional structures.

multidimensional_array.php
  

&lt;?php

$employees = array(
    array("name" =&gt; "John", "position" =&gt; "Manager"),
    array("name" =&gt; "Sarah", "position" =&gt; "Developer"),
    array("name" =&gt; "Mike", "position" =&gt; "Designer")
);

print_r($employees);

This creates an array of arrays. Each sub-array represents an employee with
name and position properties. Useful for complex data organization.

## Mixed Key Types

PHP arrays can mix different key types in the same array structure.

mixed_keys.php
  

&lt;?php

$mixed = array(
    "name" =&gt; "Alice",
    1 =&gt; "age",
    "1.5" =&gt; "height",
    true =&gt; "boolean key"
);

print_r($mixed);

This shows how PHP handles different key types. Note how numeric strings and
booleans are converted to integers when used as array keys.

## Short Array Syntax

PHP 5.4+ supports a shorter syntax using square brackets instead of array().

short_syntax.php
  

&lt;?php

$colors = ["red", "green", "blue"];
$user = ["name" =&gt; "Bob", "email" =&gt; "bob@example.com"];

print_r($colors);
print_r($user);

This demonstrates the modern array syntax. It's functionally identical to
array but more concise and commonly used in modern PHP code.

## Best Practices

- **Consistency:** Stick to one array syntax style per project.

- **Readability:** Use associative arrays for named data.

- **Performance:** Prefer indexed arrays for large datasets.

- **Documentation:** Comment complex array structures.

## Source

[PHP Arrays Documentation](https://www.php.net/manual/en/language.types.array.php)

This tutorial covered the PHP array function with practical
examples showing its usage for various array creation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).