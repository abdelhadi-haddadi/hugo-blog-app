+++
title = "PHP array_change_key_case Function"
date = 2025-08-29T20:04:54.438+01:00
draft = false
description = "PHP array_change_key_case function tutorial shows how to change array keys case in PHP. Learn array_change_key_case with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_change_key_case Function

last modified March 13, 2025

The PHP array_change_key_case function changes the case of all
keys in an array. It can convert keys to uppercase or lowercase.

## Basic Definition

The array_change_key_case function returns an array with all
keys converted to the specified case. It works with both string and numeric
keys.

Syntax: array_change_key_case(array $array, int $case = CASE_LOWER): array.
The $case parameter can be either CASE_LOWER or
CASE_UPPER.

## Basic array_change_key_case Example

This example demonstrates converting all array keys to lowercase.

basic_array_change_key_case.php
  

&lt;?php

$user = [
    'FirstName' =&gt; 'John',
    'LastName' =&gt; 'Doe',
    'Age' =&gt; 30
];

$lowerKeys = array_change_key_case($user);

print_r($lowerKeys);

The output will show all keys converted to lowercase. Numeric keys remain
unchanged as they're not affected by case conversion.

## Converting to Uppercase

This example shows how to convert all keys to uppercase using the function.

uppercase_keys.php
  

&lt;?php

$config = [
    'db_host' =&gt; 'localhost',
    'db_user' =&gt; 'admin',
    'db_pass' =&gt; 'secret'
];

$upperKeys = array_change_key_case($config, CASE_UPPER);

print_r($upperKeys);

The resulting array will have all keys in uppercase. This is useful when
you need consistent key cases for case-sensitive operations.

## Mixed Key Types

The function handles arrays with mixed key types (string and numeric).

mixed_keys.php
  

&lt;?php

$mixed = [
    'Name' =&gt; 'Alice',
    0 =&gt; 'Zero',
    'Age' =&gt; 25,
    1 =&gt; 'One'
];

$lowerMixed = array_change_key_case($mixed);

print_r($lowerMixed);

Only string keys are converted to lowercase. Numeric keys remain unchanged
in the output array, maintaining their original values and positions.

## Duplicate Key Handling

When case conversion creates duplicate keys, later values overwrite earlier
ones.

duplicate_keys.php
  

&lt;?php

$data = [
    'USERNAME' =&gt; 'admin',
    'username' =&gt; 'guest',
    'Password' =&gt; '12345'
];

$uniformKeys = array_change_key_case($data);

print_r($uniformKeys);

Both 'USERNAME' and 'username' become 'username' after conversion. The last
occurrence ('guest') overwrites the first value ('admin') in the result.

## Multidimensional Arrays

The function only changes keys at the top level of the array structure.

multidimensional_array.php
  

&lt;?php

$company = [
    'CompanyName' =&gt; 'ACME',
    'Departments' =&gt; [
        'Sales' =&gt; ['John', 'Jane'],
        'IT' =&gt; ['Mike', 'Sarah']
    ]
];

$lowerCompany = array_change_key_case($company);

print_r($lowerCompany);

Only the top-level keys ('CompanyName' and 'Departments') are converted.
Nested array keys remain unchanged, preserving their original case.

## Best Practices

- **Consistency:** Use consistent key cases throughout your code.

- **Case Sensitivity:** Be aware of case-sensitive operations.

- **Data Integrity:** Check for potential key collisions.

- **Performance:** Consider impact on large arrays.

## Source

[PHP array_change_key_case Documentation](https://www.php.net/manual/en/function.array-change-key-case.php)

This tutorial covered the PHP array_change_key_case function with
practical examples showing its usage for array key case conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).