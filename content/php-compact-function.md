+++
title = "PHP compact Function"
date = 2025-08-29T20:05:15.612+01:00
draft = false
description = "PHP compact function tutorial shows how to create arrays from variables in PHP. Learn compact with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP compact Function

last modified March 13, 2025

The PHP compact function creates an array containing variables
and their values. It's useful for quickly bundling variables into an array.

## Basic Definition

The compact function takes variable names as arguments and
creates an array where keys are variable names and values are variable values.

Syntax: compact(string|array $var_name, ...): array. It accepts
one or more strings or an array of strings representing variable names.

## Basic compact Example

This demonstrates creating an array from three simple variables using compact.

basic_compact.php
  

&lt;?php

$name = "John";
$age = 30;
$city = "New York";

$person = compact('name', 'age', 'city');

print_r($person);

The function creates an associative array from the variables passed as
arguments.

## Using compact with an Array of Names

Instead of multiple arguments, you can pass an array of variable names.

compact_with_array.php
  

&lt;?php

$firstName = "Alice";
$lastName = "Smith";
$email = "alice@example.com";

$vars = ['firstName', 'lastName', 'email'];
$userData = compact($vars);

print_r($userData);

This produces the same result as passing names individually. The array
approach is useful when variable names are stored dynamically.

## Nested Variables with compact

compact can work with nested variable names when using array syntax.

nested_compact.php
  

&lt;?php

$user = [
    'name' =&gt; 'Bob',
    'profile' =&gt; [
        'age' =&gt; 25,
        'job' =&gt; 'Developer'
    ]
];

extract($user);
$result = compact('name', ['profile' =&gt; ['age', 'job']]);

print_r($result);

This shows how to compact nested variables. Note that you need to extract
the array first to make variables available in the current symbol table.

## compact with Undefined Variables

compact silently ignores undefined variables without throwing errors.

undefined_variables.php
  

&lt;?php

$definedVar = "I exist";
$result = compact('definedVar', 'undefinedVar');

print_r($result); // Only shows definedVar

The output only contains the defined variable. This behavior can be useful
when you're not sure which variables exist in the current scope.

## Combining compact with extract

compact and extract can be used together for variable manipulation.

compact_extract.php
  

&lt;?php

$original = [
    'title' =&gt; 'PHP Guide',
    'author' =&gt; 'Jane Doe',
    'pages' =&gt; 350
];

extract($original);
$modified = compact('title', 'author', 'pages');
$modified['edition'] = 2;

print_r($modified);

This extracts variables from an array, then compacts them back with an
additional field. It demonstrates round-trip variable conversion.

## Best Practices

- **Variable Scope:** compact only works with variables in current scope.

- **Dynamic Names:** Use array syntax for dynamic variable names.

- **Error Handling:** Check for undefined variables if needed.

- **Performance:** Avoid compact in tight loops with many variables.

## Source

[PHP compact Documentation](https://www.php.net/manual/en/function.compact.php)

This tutorial covered the PHP compact function with practical
examples showing its usage for creating arrays from variables.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).