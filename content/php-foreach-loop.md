+++
title = "PHP foreach Loop"
date = 2025-08-29T20:04:24.316+01:00
draft = false
description = "PHP foreach tutorial shows how to use foreach loops in PHP. Learn array iteration with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP foreach Loop

last modified April 16, 2025

The PHP foreach loop provides an easy way to iterate over arrays.
It works only on arrays and objects, automatically advancing through each
element. The foreach construct is essential for array manipulation in PHP.

## Basic Definitions

The foreach loop has two syntax forms. The first iterates over
array values, while the second provides both keys and values. It automatically
resets the array pointer before looping.

Syntax: foreach ($array as $value) { code } for values only.
foreach ($array as $key =&gt; $value) { code } for keys and values.
The loop variable scope is limited to the loop body.

The foreach loop is read-only by default but can modify array elements when
using references. It's generally safer and more readable than traditional
for loops for array iteration.

## Basic foreach Loop

This example demonstrates a simple foreach loop iterating through an array.

basic_foreach.php
  

&lt;?php

declare(strict_types=1);

$colors = ['red', 'green', 'blue', 'yellow'];

foreach ($colors as $color) {
    echo "$color ";
}

The code loops through each element in the $colors array. On each
iteration, the current element's value is assigned to $color. The
loop continues until all elements are processed. This is the simplest foreach
usage pattern.

## foreach with Keys and Values

This example shows how to access both keys and values in a foreach loop.

foreach_keys.php
  

&lt;?php

declare(strict_types=1);

$capitals = [
    'France' =&gt; 'Paris',
    'Germany' =&gt; 'Berlin',
    'Italy' =&gt; 'Rome'
];

foreach ($capitals as $country =&gt; $capital) {
    echo "The capital of $country is $capital\n";
}

The code iterates through an associative array where keys are country names
and values are capitals. The $country =&gt; $capital syntax captures
both. This form is essential for working with associative arrays in PHP.

## Modifying Array Values

This example demonstrates modifying array elements during iteration.

foreach_modify.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4, 5];

foreach ($numbers as &amp;$number) {
    $number *= 2;
}

print_r($numbers);

The code doubles each value in the array by using a reference (&amp;).
The reference allows modifying the original array elements. After the loop, the
array contains [2, 4, 6, 8, 10]. References should be used carefully.

## foreach with Multidimensional Arrays

This example shows how to use nested foreach loops with multidimensional arrays.

foreach_multidimensional.php
  

&lt;?php

declare(strict_types=1);

$matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

foreach ($matrix as $row) {
    foreach ($row as $cell) {
        echo "$cell ";
    }
    echo "\n";
}

The outer loop iterates through each row of the 2D array. The inner loop processes
each element within the current row. This pattern works for arrays of any depth.
Nested foreach loops are common when working with complex data structures.

## Breaking and Continuing

This example demonstrates using break and continue in foreach loops.

foreach_control.php
  

&lt;?php

declare(strict_types=1);

$values = [10, 20, 30, 40, 50, 60];

foreach ($values as $value) {
    if ($value == 30) {
        continue;
    }
    if ($value == 50) {
        break;
    }
    echo "$value ";
}

The code skips value 30 using continue and stops at 50 using
break. Only 10, 20, and 40 will be printed. These control
statements work the same as in other loops. They provide flow control within
foreach iterations.

## foreach with Object Iteration

This example shows how foreach can iterate over object properties.

foreach_object.php
  

&lt;?php

declare(strict_types=1);

class Book {
    public $title = 'PHP Guide';
    public $author = 'John Doe';
    public $price = 29.99;
}

$book = new Book();

foreach ($book as $property =&gt; $value) {
    echo "$property: $value\n";
}

The code iterates through all public properties of the Book object. Each
property name and value is printed. Objects must implement Traversable for
custom iteration behavior. By default, foreach works with public properties.

## Using list with foreach

This example demonstrates destructuring arrays in foreach using list.

foreach_list.php
  

&lt;?php

declare(strict_types=1);

$people = [
    ['John', 'Doe', 30],
    ['Jane', 'Smith', 25],
    ['Bob', 'Johnson', 45]
];

foreach ($people as list($firstName, $lastName, $age)) {
    echo "$firstName $lastName is $age years old\n";
}

The code uses list to destructure each sub-array into variables.
This provides a clean way to work with structured array data. The number of
variables must match the sub-array structure. Destructuring simplifies array
element access.

## Best Practices

- **References:** Unset reference variables after modifying arrays.

- **Performance:** Foreach is generally faster than for with arrays.

- **Readability:** Use meaningful variable names for keys/values.

- **Safety:** Avoid modifying array structure during iteration.

- **Type Hinting:** Use iterable type hints for foreach parameters.

## Source

[PHP foreach Documentation](https://www.php.net/manual/en/control-structures.foreach.php)

This tutorial covered PHP foreach loops with practical examples showing basic
iteration, key/value access, modification, and advanced usage patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).