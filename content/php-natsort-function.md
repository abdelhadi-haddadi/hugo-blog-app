+++
title = "PHP natsort Function"
date = 2025-08-29T20:05:21.291+01:00
draft = false
description = "PHP natsort function tutorial shows how to sort arrays in natural order in PHP. Learn natsort with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP natsort Function

last modified March 13, 2025

The PHP natsort function sorts an array using a "natural order"
algorithm. It maintains index association, unlike regular sorting functions.

## Basic Definition

The natsort function implements a sorting algorithm that orders
alphanumeric strings in the way a human being would. It's case-sensitive.

Syntax: natsort(array &amp;$array): bool. The function sorts the
array in place and returns true on success or false on failure.

## Basic natsort Example

This demonstrates the difference between regular sort and natural sort.

basic_natsort.php
  

&lt;?php

$files = ["img1.png", "img10.png", "img2.png", "img12.png"];

// Regular sort
sort($files);
echo "Regular sort:\n";
print_r($files);

// Natural sort
natsort($files);
echo "\nNatural sort:\n";
print_r($files);

Regular sort orders lexicographically (1, 10, 12, 2), while natural sort
orders numerically (1, 2, 10, 12). The output shows the difference clearly.

## Case Sensitivity in natsort

natsort is case-sensitive, which affects sorting order.

case_sensitive.php
  

&lt;?php

$items = ["Apple", "apple", "Banana", "banana", "1apple", "10apple"];

natsort($items);
print_r($items);

Uppercase letters come before lowercase in ASCII, so "Apple" sorts before
"apple". Numbers come before letters, so "1apple" appears first.

## Mixed Alphanumeric Sorting

natsort handles mixed alphanumeric strings intelligently.

mixed_sorting.php
  

&lt;?php

$versions = ["version-1.9", "version-1.10", "version-2.0", "version-1.1"];

natsort($versions);
print_r($versions);

The function correctly orders version numbers: 1.1, 1.9, 1.10, then 2.0.
This demonstrates its ability to handle complex alphanumeric patterns.

## Preserving Keys with natsort

Unlike sort, natsort maintains key-value association.

key_preservation.php
  

&lt;?php

$data = [
    "item3" =&gt; "value3",
    "item10" =&gt; "value10",
    "item1" =&gt; "value1",
    "item20" =&gt; "value20"
];

natsort($data);
print_r($data);

The output shows the array sorted by values while keeping original keys intact.
This is useful when you need to maintain the relationship between keys and values.

## Sorting File Names

A practical example of sorting file names with numbered sequences.

file_sorting.php
  

&lt;?php

$images = [
    "vacation_photo1.jpg",
    "vacation_photo10.jpg",
    "vacation_photo2.jpg",
    "vacation_photo20.jpg",
    "vacation_photo3.jpg"
];

natsort($images);
foreach ($images as $image) {
    echo $image . "\n";
}

This demonstrates how natsort correctly orders files with numbers,
producing the sequence photo1, photo2, photo3, photo10, photo20.

## Best Practices

- **Case Sensitivity:** Use natcasesort for case-insensitive sorting.

- **Key Preservation:** Choose natsort when you need to keep keys.

- **Performance:** For large arrays, natural sorting is slower than regular sorting.

- **Mixed Data:** Works best with strings containing numbers.

## Source

[PHP natsort Documentation](https://www.php.net/manual/en/function.natsort.php)

This tutorial covered the PHP natsort function with practical
examples showing its usage for natural order sorting scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).