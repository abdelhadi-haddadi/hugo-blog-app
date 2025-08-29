+++
title = "PHP range Function"
date = 2025-08-29T20:05:22.439+01:00
draft = false
description = "PHP range function tutorial shows how to create arrays containing a range of elements in PHP. Learn range() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP range Function

last modified March 13, 2025

The PHP range function creates an array containing a range of
elements. It's useful for generating sequences of numbers or characters.

## Basic Definition

The range function generates an array with elements from a start
value to an end value. It can create sequences of numbers or characters.

Syntax: range(mixed $start, mixed $end, int|float $step = 1): array.
The step parameter controls the increment between elements in the sequence.

## Basic Numeric Range Example

This example demonstrates creating a simple numeric range from 1 to 5.

basic_range.php
  

&lt;?php

$numbers = range(1, 5);
print_r($numbers);

This creates an array with numbers from 1 to 5. The default step of 1 is
used when not specified. The array includes both start and end values.

## Range With Custom Step

This shows how to create a range with a custom increment between values.

range_with_step.php
  

&lt;?php

$evenNumbers = range(0, 10, 2);
print_r($evenNumbers);

This generates even numbers from 0 to 10. The step parameter of 2 creates
each subsequent number by adding 2 to the previous value.

## Descending Range

The range function can also create sequences in descending order.

descending_range.php
  

&lt;?php

$countdown = range(5, 1);
print_r($countdown);

When the start value is greater than the end value, range creates a
descending sequence. The default step of -1 is used automatically.

## Character Range

The range function works with characters, creating alphabetical sequences.

character_range.php
  

&lt;?php

$letters = range('a', 'e');
print_r($letters);

This generates an array of lowercase letters from 'a' to 'e'. Character
ranges follow the ASCII/Unicode sequence for the given characters.

## Floating Point Range

Range can work with floating point numbers, though precision should be noted.

float_range.php
  

&lt;?php

$decimalRange = range(0.1, 0.5, 0.1);
print_r($decimalRange);

This creates a range of decimal numbers. Be cautious with floating-point
precision as rounding errors might occur in some cases.

## Best Practices

- **Memory Usage:** Large ranges consume significant memory.

- **Step Values:** Ensure step direction matches range direction.

- **Character Ranges:** Works with single-byte characters.

- **Performance:** Consider alternatives for very large ranges.

## Source

[PHP Range Documentation](https://www.php.net/manual/en/function.range.php)

This tutorial covered the PHP range function with practical
examples showing its usage for creating numeric and character sequences.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).