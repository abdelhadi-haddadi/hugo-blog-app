+++
title = "PHP array_count_values Function"
date = 2025-08-29T20:04:56.638+01:00
draft = false
description = "PHP array_count_values function tutorial shows how to count values in arrays in PHP. Learn array_count_values with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_count_values Function

last modified March 13, 2025

The PHP array_count_values function counts the occurrences of
values in an array. It returns an associative array with value counts.

## Basic Definition

array_count_values counts how many times each value appears in
an array. The result is an array where keys are the original values.

Syntax: array_count_values(array $array): array. Values must be
strings or integers. Other types will trigger a warning and be skipped.

## Counting String Values

This example demonstrates counting occurrences of string values in an array.

string_count.php
  

&lt;?php

$colors = ["red", "blue", "green", "blue", "red", "red"];
$counts = array_count_values($colors);

print_r($counts);

The function counts each color occurrence. "red" appears 3 times, "blue" 2
times, and "green" once. The output is an associative array.

## Counting Integer Values

This example shows how to count occurrences of integer values in an array.

integer_count.php
  

&lt;?php

$numbers = [1, 2, 3, 2, 1, 1, 1, 3];
$counts = array_count_values($numbers);

print_r($counts);

The number 1 appears most frequently (4 times). Numbers 2 and 3 each appear
twice. The function works identically for integers and strings.

## Mixed Value Types

This example demonstrates behavior with mixed string and integer values.

mixed_values.php
  

&lt;?php

$mixed = ["apple", 1, "orange", 1, "apple", "1"];
$counts = array_count_values($mixed);

print_r($counts);

Note that integer 1 and string "1" are treated as the same value. The
function converts all values to strings before counting them.

## Handling Invalid Values

This example shows what happens when the array contains invalid values.

invalid_values.php
  

&lt;?php

$data = ["a", "b", 3.14, ["array"], null];
$counts = @array_count_values($data); // Suppress warnings

print_r($counts);

Float, array, and null values trigger warnings and are excluded from the
result. Only valid string and integer values are counted in the output.

## Practical Application

This example shows a practical use case for analyzing survey responses.

survey_analysis.php
  

&lt;?php

$responses = [
    "Excellent", "Good", "Fair", "Good",
    "Excellent", "Poor", "Good", "Excellent"
];

$ratings = array_count_values($responses);
arsort($ratings); // Sort by count descending

foreach ($ratings as $rating =&gt; $count) {
    echo "$rating: $count responses\n";
}

This analyzes survey responses by counting each rating. The results are then
sorted to show most common responses first, providing quick insights.

## Best Practices

- **Type Safety:** Ensure array contains only strings/integers.

- **Error Handling:** Check for warnings with invalid types.

- **Sorting:** Use sorting functions to analyze results.

- **Performance:** Works efficiently even with large arrays.

## Source

[PHP array_count_values Documentation](https://www.php.net/manual/en/function.array-count-values.php)

This tutorial covered the PHP array_count_values function with
practical examples showing its usage for counting value frequencies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).