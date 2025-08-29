+++
title = "PHP natcasesort Function"
date = 2025-08-29T20:05:20.185+01:00
draft = false
description = "PHP natcasesort function tutorial shows how to sort arrays using natural order case-insensitive algorithm. Learn with examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP natcasesort Function

last modified March 13, 2025

The PHP natcasesort function sorts an array using a case-insensitive
"natural order" algorithm. It maintains index association and is useful for
sorting strings containing numbers.

## Basic Definition

natcasesort implements a natural order sorting algorithm while
ignoring case differences. It's similar to how humans would sort strings.

Syntax: natcasesort(array &amp;$array): bool. The function sorts the
array in place and returns true on success or false on failure.

Natural order sorting means numbers in strings are compared numerically rather
than alphabetically. For example, "item2" comes before "item10".

## Basic natcasesort Example

This demonstrates simple case-insensitive natural sorting of an array.

basic_natcasesort.php
  

&lt;?php

$files = ["file1.txt", "File10.txt", "file2.txt", "FILE20.txt"];
natcasesort($files);

print_r($files);

Output will be: Array ( [0] =&gt; file1.txt [2] =&gt; file2.txt [1] =&gt; File10.txt 
[3] =&gt; FILE20.txt ). The function ignores case and sorts numbers correctly.

## Mixed Case Strings

Shows how natcasesort handles strings with varying case patterns.

mixed_case.php
  

&lt;?php

$items = ["Apple", "banana", "apricot", "Banana", "apple"];
natcasesort($items);

print_r($items);

Case is ignored, placing all similar words together.

## Natural Number Sorting

Demonstrates the natural order sorting of numbers within strings.

number_sorting.php
  

&lt;?php

$versions = ["version-2", "Version-10", "version-1", "VERSION-20"];
natcasesort($versions);

print_r($versions);

Numbers are sorted numerically despite case differences.

## Maintaining Key Association

Shows that natcasesort preserves the original key-value relationships.

key_association.php
  

&lt;?php

$data = [
    "id3" =&gt; "Value C",
    "ID1" =&gt; "Value A",
    "id10" =&gt; "Value D",
    "Id2" =&gt; "Value B"
];
natcasesort($data);

print_r($data);

Keys maintain their association with values after sorting.

## Comparison with Other Sort Functions

Illustrates differences between natcasesort and regular sort functions.

comparison.php
  

&lt;?php

$items = ["img1.png", "Img10.png", "img2.png", "IMG12.png"];

$regular = $items;
sort($regular);

$natural = $items;
natsort($natural);

$naturalCase = $items;
natcasesort($naturalCase);

echo "Regular sort:\n";
print_r($regular);

echo "\nNatural sort:\n";
print_r($natural);

echo "\nNatural case-insensitive sort:\n";
print_r($naturalCase);

Regular sort orders alphabetically (1,10,12,2). Natural sorts respect numbers
but are case-sensitive. Natcasesort combines both natural order and case
insensitivity.

## Best Practices

- **Use when needed:** Only for case-insensitive natural sorting.

- **Performance:** Slower than simple sorts due to complex comparison.

- **Key preservation:** Use when maintaining associations is important.

- **Mixed data:** Works best with strings containing numbers.

## Source

[PHP natcasesort Documentation](https://www.php.net/manual/en/function.natcasesort.php)

This tutorial covered the PHP natcasesort function with practical
examples showing its usage for natural case-insensitive array sorting.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).