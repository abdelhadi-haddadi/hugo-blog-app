+++
title = "PHP each() Function"
date = 2025-08-29T20:05:16.706+01:00
draft = false
description = "PHP each() function tutorial shows how to iterate through arrays in PHP. Learn each() with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP each() Function

last modified March 13, 2025

The PHP each function returns the current key-value pair from an
array and advances the array pointer. It's useful for array iteration.

## Basic Definition

The each function returns the current element in an array and
moves the internal pointer forward. It returns a four-element array.

Syntax: each(array &amp;$array): array|false. Returns false when the
pointer reaches the end. The returned array contains 'key', 'value', 0, and 1.

## Basic each() Example

This demonstrates the basic usage of each to iterate an array.

basic_each.php
  

&lt;?php

$fruits = ["apple" =&gt; "red", "banana" =&gt; "yellow", "grape" =&gt; "purple"];

while ($element = each($fruits)) {
    echo "Key: " . $element['key'] . ", Value: " . $element['value'] . "\n";
    echo "0: " . $element[0] . ", 1: " . $element[1] . "\n\n";
}

This code iterates through the array using each. Each call
returns the current key-value pair and advances the pointer until the end.

## Combining each() with list()

each can be combined with list for cleaner code.

each_with_list.php
  

&lt;?php

$colors = ["red", "green", "blue"];

reset($colors); // Ensure pointer is at start
while (list($key, $val) = each($colors)) {
    echo "$key =&gt; $val\n";
}

Here, list unpacks the key-value pair from each.
This pattern was common before PHP 7.2 but is now deprecated.

## each() with Associative Arrays

each works particularly well with associative arrays.

associative_each.php
  

&lt;?php

$user = [
    "name" =&gt; "John Doe",
    "email" =&gt; "john@example.com",
    "age" =&gt; 30
];

while ($pair = each($user)) {
    echo "Field: " . $pair['key'] . ", Value: " . $pair['value'] . "\n";
}

This example shows how each can access both keys and values in
an associative array. The function returns both numeric and string indexes.

## Reset Pointer Before each()

Always reset the array pointer before using each in a loop.

reset_pointer.php
  

&lt;?php

$numbers = [10, 20, 30];

// First iteration
while ($element = each($numbers)) {
    echo $element['value'] . " ";
}

echo "\n";

// Reset pointer for second iteration
reset($numbers);
while ($element = each($numbers)) {
    echo $element['value'] . " ";
}

Without reset, the second loop wouldn't execute because the
pointer would already be at the end of the array from the first loop.

## Deprecation Notice

This example shows the deprecation warning in PHP 7.2+ and alternatives.

deprecation_notice.php
  

&lt;?php

$data = ["a", "b", "c"];

// Deprecated in PHP 7.2+, removed in PHP 8.0
while (list($key, $val) = each($data)) {
    echo "$key: $val\n";
}

// Modern alternative
foreach ($data as $key =&gt; $val) {
    echo "$key: $val\n";
}

The each function is deprecated as of PHP 7.2. The example
shows both the old syntax and the recommended foreach alternative.

## Best Practices

- **Avoid in New Code:** Use foreach instead of each.

- **Pointer Management:** Always reset pointers before iteration.

- **Error Handling:** Check for false return value properly.

- **Modern Alternatives:** Prefer current/next if needed.

## Source

[PHP each() Documentation](https://www.php.net/manual/en/function.each.php)

This tutorial covered the PHP each function with practical
examples showing its usage for array iteration scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).