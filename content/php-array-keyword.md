+++
title = "PHP array Keyword"
date = 2025-08-29T20:04:09.145+01:00
draft = false
description = "PHP array tutorial shows how to use arrays in PHP. Learn arrays with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array Keyword

last modified April 16, 2025

The PHP array keyword is used to create arrays, which are ordered
maps that associate values to keys. Arrays are fundamental data structures in
PHP that can hold multiple values of different types. They are versatile and
used in nearly all PHP applications.

## Basic Definitions

An array in PHP is actually an ordered map that associates values to keys. The
array keyword is used to create both indexed and associative arrays.
Indexed arrays use numeric keys starting from 0.

Associative arrays use named keys that you assign to them. PHP arrays can
contain values of different types, including other arrays. Arrays grow
dynamically as elements are added.

Syntax: array(value1, value2, ...) or array(key =&gt; value, ...).
Since PHP 5.4, you can also use the short syntax [].

## Creating an Indexed Array

This example demonstrates how to create a simple indexed array.

indexed_array.php
  

&lt;?php

declare(strict_types=1);

$fruits = array("Apple", "Banana", "Cherry");

print_r($fruits);

The code creates an indexed array with three string values. The array keys are
automatically assigned starting from 0. The print_r function
displays the array structure. Indexed arrays are commonly used for lists.

## Creating an Associative Array

This example shows how to create an associative array with named keys.

associative_array.php
  

&lt;?php

declare(strict_types=1);

$person = array(
    "name" =&gt; "John Doe",
    "age" =&gt; 30,
    "email" =&gt; "john@example.com"
);

print_r($person);

The code creates an associative array with three key-value pairs. Each key is
a string that describes its corresponding value. Associative arrays are ideal
for representing structured data. The values can be of different types.

## Multidimensional Arrays

This example demonstrates creating and accessing a multidimensional array.

multidimensional_array.php
  

&lt;?php

declare(strict_types=1);

$matrix = array(
    array(1, 2, 3),
    array(4, 5, 6),
    array(7, 8, 9)
);

echo $matrix[1][2]; // Outputs 6

The code creates a 3x3 matrix as a multidimensional array. Each element is
itself an array. To access elements, use multiple index operators. This is
useful for representing tables or matrices.

## Array Short Syntax

This example shows the modern short array syntax introduced in PHP 5.4.

short_syntax.php
  

&lt;?php

declare(strict_types=1);

$colors = ["Red", "Green", "Blue"];
$user = [
    "username" =&gt; "johndoe",
    "password" =&gt; "secret123"
];

print_r($colors);
print_r($user);

The code demonstrates the short array syntax using square brackets. This works
for both indexed and associative arrays. The short syntax is preferred in
modern PHP code. It's cleaner and more consistent with other languages.

## Adding Elements to Arrays

This example shows different ways to add elements to an array.

adding_elements.php
  

&lt;?php

declare(strict_types=1);

$languages = ["PHP", "Python"];

// Adding elements
$languages[] = "JavaScript"; // Automatic numeric key
$languages["fav"] = "Go";    // Custom string key

print_r($languages);

The code shows two methods to add elements. The empty brackets append to the
end with numeric keys. Specifying a key adds that specific association. PHP
arrays can mix numeric and string keys. The array grows dynamically.

## Array Functions

This example demonstrates some common PHP array functions.

array_functions.php
  

&lt;?php

declare(strict_types=1);

$numbers = [10, 20, 30, 40];

echo count($numbers) . "\n";       // 4
echo array_sum($numbers) . "\n";   // 100
print_r(array_reverse($numbers));  // [40, 30, 20, 10]

The code shows three useful array functions. count gets the number
of elements. array_sum calculates the total. array_reverse
returns a new reversed array. PHP has over 80 array functions for various tasks.

## Iterating Through Arrays

This example shows different ways to loop through array elements.

array_iteration.php
  

&lt;?php

declare(strict_types=1);

$animals = ["Cat", "Dog", "Elephant"];

// foreach loop
foreach ($animals as $animal) {
    echo $animal . "\n";
}

// for loop
for ($i = 0; $i &lt; count($animals); $i++) {
    echo $animals[$i] . "\n";
}

The code demonstrates two common iteration methods. foreach is
ideal for associative arrays and simpler syntax. The for loop
works well with indexed arrays. Choose based on array type and needs.

## Best Practices

- **Consistency:** Use either array() or [] consistently in your codebase.

- **Type Hinting:** Use array type hints in function declarations.

- **Documentation:** Document array structures when they're complex.

- **Functions:** Leverage built-in array functions when possible.

- **Validation:** Check array keys exist before accessing them.

## Source

[PHP Arrays Documentation](https://www.php.net/manual/en/language.types.array.php)

This tutorial covered PHP arrays with practical examples showing creation,
manipulation, and iteration of both indexed and associative arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).