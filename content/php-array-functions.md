+++
title = "PHP Array Functions"
date = 2025-08-29T20:04:09.141+01:00
draft = false
description = "PHP Array Functions tutorial shows how to work with arrays in PHP using various array functions."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Array Functions

last modified February 17, 2025

In this article, we show how to work with arrays in PHP using various array
functions. Arrays are a fundamental data structure in PHP, and the language
provides a rich set of functions to manipulate them. We will use both numerical
and string data in the examples.

 
## Counting Elements

The following example demonstrates how to count the number of elements in an
array using the count function.

main.php
    

&lt;?php

$numbers = [1, 2, 3, 4, 5];
$fruits = [
    "apple" =&gt; "red",
    "banana" =&gt; "yellow",
    "grape" =&gt; "purple"
];

echo "Number of elements in numbers array: " . count($numbers) . "\n";
echo "Number of elements in fruits array: " . count($fruits) . "\n";

In this program, the count function is used to count the number of
elements in the $numbers and $fruits arrays.

$ php main.php
Number of elements in numbers array: 5
Number of elements in fruits array: 3

## Joining Array Elements

The following example demonstrates how to join the elements of an array into a
string using the implode function.

main.php
    

&lt;?php

$fruits = ['apple', 'banana', 'grape', 'orange'];

$joinedFruits = implode(', ', $fruits);

echo "Joined fruits: " . $joinedFruits . "\n";

In this program, the implode function is used to join all elements
of the $fruits array into a single string, separated by commas.

$ php main.php
Joined fruits: apple, banana, grape, orange

## Summing Array Elements

The following example demonstrates how to sum all the elements in an array using
the array_sum function.

main.php
    

&lt;?php

$numbers = [1, 2, 3, 4, 5];

echo "Sum of elements in numbers array: " . array_sum($numbers) . "\n";

In this program, the array_sum function is used to calculate the
sum of all elements in the $numbers array.

$ php main.php
Sum of elements in numbers array: 15

## Picking Random Elements from an Array

The following example demonstrates how to pick one or more random elements from
an array using the array_rand function.

main.php
&lt;?php

$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

$randomKey = array_rand($numbers);
$randomElement = $numbers[$randomKey];

echo "Random element: " . $randomElement . "\n";

// Picking multiple random elements
$randomKeys = array_rand($numbers, 3);
$randomElements = array_map(function ($key) use ($numbers) {
    return $numbers[$key];
}, $randomKeys);

echo "Multiple random elements: " . implode(', ', $randomElements) . "\n";

In this program, the array_rand function is used to pick random
keys from the $numbers array. The elements at these keys are then
accessed to get the random values.

$ php main.php
Random element: 7
Multiple random elements: 2, 8, 10

## Sorting Arrays

The following example demonstrates how to sort arrays using the
sort, rsort, asort, and
ksort functions.

main.php
    

&lt;?php

$numbers = [3, 1, 4, 1, 5, 9];
$fruits = [
    "apple" =&gt; "red",
    "banana" =&gt; "yellow",
    "grape" =&gt; "purple"
];

// Sort numerically
sort($numbers);
print_r($numbers);

// Sort numerically in reverse order
rsort($numbers);
print_r($numbers);

// Sort associative array by value
asort($fruits);
print_r($fruits);

// Sort associative array by key
ksort($fruits);
print_r($fruits);

In this program, the sort function sorts the $numbers
array in ascending order, while rsort sorts it in descending order.
The asort function sorts the $fruits array by value,
and ksort sorts it by key.

$ php main.php
Array
(
    [0] =&gt; 1
    [1] =&gt; 1
    [2] =&gt; 3
    [3] =&gt; 4
    [4] =&gt; 5
    [5] =&gt; 9
)
Array
(
    [0] =&gt; 9
    [1] =&gt; 5
    [2] =&gt; 4
    [3] =&gt; 3
    [4] =&gt; 1
    [5] =&gt; 1
)
Array
(
    [apple] =&gt; red
    [grape] =&gt; purple
    [banana] =&gt; yellow
)
Array
(
    [apple] =&gt; red
    [banana] =&gt; yellow
    [grape] =&gt; purple
)

## Extracting Columns from an Array

The following example demonstrates how to extract a column from a
multidimensional array using the array_column function.

main.php
    

&lt;?php

$records = [
    ['name' =&gt; 'John', 'age' =&gt; 25],
    ['name' =&gt; 'Jane', 'age' =&gt; 22],
    ['name' =&gt; 'Doe', 'age' =&gt; 30]
];

$names = array_column($records, 'name');

print_r($names);

In this program, the array_column function is used to extract the
values of the 'name' column from the $records array.

$ php main.php
Array
(
    [0] =&gt; John
    [1] =&gt; Jane
    [2] =&gt; Doe
)

## Shuffling an Array

The following example demonstrates how to shuffle the elements of an array using
the shuffle function.

main.php
    

&lt;?php

$numbers = [1, 2, 3, 4, 5];

shuffle($numbers);

print_r($numbers);

In this program, the shuffle function is used to randomly rearrange
the elements in the $numbers array.

$ php main.php
Array
(
    [0] =&gt; 3
    [1] =&gt; 1
    [2] =&gt; 4
    [3] =&gt; 5
    [4] =&gt; 2
)

## Merging Arrays

The following example demonstrates how to merge arrays using the
array_merge function.

main.php
    

&lt;?php

$numbers1 = [1, 2, 3];
$numbers2 = [4, 5, 6];
$fruits1 = ["apple" =&gt; "red"];
$fruits2 = ["banana" =&gt; "yellow"];

// Merge numerical arrays
$mergedNumbers = array_merge($numbers1, $numbers2);
print_r($mergedNumbers);

// Merge associative arrays
$mergedFruits = array_merge($fruits1, $fruits2);
print_r($mergedFruits);

In this program, the array_merge function is used to merge two
numerical arrays and two associative arrays.

$ php main.php
Array
(
    [0] =&gt; 1
    [1] =&gt; 2
    [2] =&gt; 3
    [3] =&gt; 4
    [4] =&gt; 5
    [5] =&gt; 6
)
Array
(
    [apple] =&gt; red
    [banana] =&gt; yellow
)

## Filtering Arrays

The following example demonstrates how to filter arrays using the
array_filter function.

main.php
    

&lt;?php

$numbers = [1, 2, 3, 4, 5, 6];
$fruits = [
    "apple" =&gt; "red",
    "banana" =&gt; "yellow",
    "grape" =&gt; "purple"
];

// Filter even numbers
$evenNumbers = array_filter($numbers, function($n) {
    return $n % 2 == 0;
});
print_r($evenNumbers);

// Filter fruits with names longer than 5 characters
$longFruits = array_filter($fruits, function($key) {
    return strlen($key) &gt; 5;
}, ARRAY_FILTER_USE_KEY);
print_r($longFruits);

In this program, the array_filter function is used to filter even
numbers from the $numbers array and fruits with names longer than 5
characters from the $fruits array.

$ php main.php
Array
(
    [1] =&gt; 2
    [3] =&gt; 4
    [5] =&gt; 6
)
Array
(
    [banana] =&gt; yellow
)

## Mapping Arrays

The following example demonstrates how to apply a function to all elements of an
array using the array_map function.

main.php
    

&lt;?php

$numbers = [1, 2, 3, 4, 5];
$fruits = ["apple", "banana", "grape"];

// Square all numbers
$squaredNumbers = array_map(function($n) {
    return $n * $n;
}, $numbers);

print_r($squaredNumbers);

// Uppercase all fruit names
$uppercaseFruits = array_map('strtoupper', $fruits);
print_r($uppercaseFruits);

In this program, the array_map function is used to square all
numbers in the $numbers array and convert all fruit names in the
$fruits array to uppercase.

$ php main.php
Array
(
    [0] =&gt; 1
    [1] =&gt; 4
    [2] =&gt; 9
    [3] =&gt; 16
    [4] =&gt; 25
)
Array
(
    [0] =&gt; APPLE
    [1] =&gt; BANANA
    [2] =&gt; GRAPE
)

## Finding an Element in an Array

The following example demonstrates how to find an element in an array using a
custom array_find function.

main.php
    

&lt;?php

function array_find($array, $predicate) {
    foreach ($array as $key =&gt; $value) {
        if ($predicate($value)) {
            return $value;
        }
    }
    return null;
}

$fruits = ['apple', 'banana', 'grape', 'orange'];

$result = array_find($fruits, function ($fruit) {
    return $fruit === 'banana';
});

echo "Found fruit: " . $result . "\n";

In this program, a custom array_find function is defined to find
the first element in the $fruits array that matches the condition
specified by the predicate function.

$ php main.php
Found fruit: banana

## Source

[PHP Array Functions - Documentation](https://www.php.net/manual/en/ref.array.php)

In this article, we have shown how to work with arrays in PHP using various
array functions. Arrays are a powerful tool for storing and manipulating
collections of data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).