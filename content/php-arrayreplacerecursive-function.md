+++
title = "PHP array_replace_recursive Function"
date = 2025-08-29T20:05:08.957+01:00
draft = false
description = "PHP array_replace_recursive function tutorial shows how to merge arrays recursively in PHP. Learn array_replace_recursive with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP array_replace_recursive Function

last modified March 13, 2025

The PHP array_replace_recursive function merges arrays by replacing
values from later arrays into earlier ones recursively. It handles nested arrays.

## Basic Definition

array_replace_recursive replaces values from subsequent arrays into
the first array recursively. If a key exists in multiple arrays, the last value wins.

Syntax: array_replace_recursive(array $array1, array ...$arrays): array.
It accepts one or more arrays and returns the merged array. Non-array values are
replaced directly.

## Basic array_replace_recursive Example

This demonstrates a simple merge of two arrays with some overlapping keys.

basic_replace_recursive.php
  

&lt;?php

$defaults = [
    'settings' =&gt; [
        'debug' =&gt; false,
        'log_level' =&gt; 'warning'
    ],
    'features' =&gt; ['search', 'filter']
];

$custom = [
    'settings' =&gt; [
        'debug' =&gt; true
    ],
    'features' =&gt; ['export']
];

$result = array_replace_recursive($defaults, $custom);

print_r($result);

This merges default settings with custom ones. The debug setting is replaced,
while other values remain. Features array is completely replaced (non-recursive).

## Deep Nested Array Replacement

Shows how nested arrays are merged recursively while scalar values are replaced.

nested_arrays.php
  

&lt;?php

$config1 = [
    'database' =&gt; [
        'host' =&gt; 'localhost',
        'credentials' =&gt; [
            'user' =&gt; 'admin',
            'pass' =&gt; 'secret'
        ]
    ]
];

$config2 = [
    'database' =&gt; [
        'credentials' =&gt; [
            'pass' =&gt; 'newpass'
        ],
        'port' =&gt; 3306
    ]
];

$merged = array_replace_recursive($config1, $config2);

print_r($merged);

The password is updated recursively while keeping other credentials. The new port
is added, and original host remains unchanged. This shows deep merging behavior.

## Multiple Array Replacement

Demonstrates merging more than two arrays with overlapping and unique keys.

multiple_arrays.php
  

&lt;?php

$base = [
    'colors' =&gt; ['red', 'green'],
    'sizes' =&gt; ['S', 'M']
];

$update1 = [
    'colors' =&gt; ['blue'],
    'sizes' =&gt; ['L']
];

$update2 = [
    'colors' =&gt; ['yellow'],
    'shapes' =&gt; ['circle']
];

$result = array_replace_recursive($base, $update1, $update2);

print_r($result);

The final colors array contains only 'yellow' from the last update. Sizes array
shows 'L' from update1. Shapes is added from update2. Later arrays take precedence.

## Mixed Array and Scalar Values

Shows how scalar values are replaced while arrays are merged recursively.

mixed_values.php
  

&lt;?php

$original = [
    'title' =&gt; 'Default Title',
    'meta' =&gt; [
        'keywords' =&gt; ['php', 'tutorial'],
        'description' =&gt; 'Default description'
    ]
];

$changes = [
    'title' =&gt; 'New Title',
    'meta' =&gt; [
        'description' =&gt; 'Updated description'
    ]
];

$updated = array_replace_recursive($original, $changes);

print_r($updated);

The title scalar is completely replaced. Meta array is merged recursively with
description updated but keywords remaining unchanged. This shows mixed behavior.

## Preserving Numeric Keys

Demonstrates how numeric keys are handled differently from string keys.

numeric_keys.php
  

&lt;?php

$array1 = [
    'a' =&gt; ['apple', 'apricot'],
    0 =&gt; ['zero']
];

$array2 = [
    'a' =&gt; ['banana'],
    0 =&gt; ['one'],
    1 =&gt; ['new']
];

$result = array_replace_recursive($array1, $array2);

print_r($result);

String key 'a' is merged recursively with new fruit replacing old. Numeric keys
are treated as distinct - 0 is replaced completely. New key 1 is added from array2.

## Best Practices

- **Configuration Merging:** Ideal for combining config files with defaults.

- **Nested Structures:** Use when working with deeply nested arrays.

- **Key Types:** Remember numeric keys are replaced, not merged.

- **Performance:** For simple arrays, array_replace may be faster.

## Source

[PHP array_replace_recursive Documentation](https://www.php.net/manual/en/function.array-replace-recursive.php)

This tutorial covered the PHP array_replace_recursive function with
practical examples showing its usage for recursive array merging scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).