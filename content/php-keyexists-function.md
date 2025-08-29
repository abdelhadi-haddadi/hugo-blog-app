+++
title = "PHP key_exists Function"
date = 2025-08-29T20:05:18.928+01:00
draft = false
description = "PHP key_exists function tutorial shows how to check if array keys exist in PHP. Learn key_exists with practical examples."
image = ""
imageBig = ""
categories = ["php-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP key_exists Function

last modified March 13, 2025

The PHP key_exists function checks if a specified key exists in
an array. It's an essential tool for array key validation in PHP.

## Basic Definition

The key_exists function checks whether a given key exists in
an array. It returns true if the key exists, false otherwise.

Syntax: key_exists(string|int $key, array $array): bool. The
function works with both string and integer keys. It's an alias of array_key_exists.

## Basic key_exists Example

This demonstrates checking for a key in a simple associative array.

basic_key_exists.php
  

&lt;?php

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 30,
    'email' =&gt; 'john@example.com'
];

if (key_exists('email', $user)) {
    echo "Email exists: " . $user['email'];
} else {
    echo "Email does not exist";
}

This checks if the 'email' key exists in the $user array. Since it does,
the code outputs the email address. The function returns true in this case.

## Checking Numeric Keys

key_exists works with both string and numeric array keys.

numeric_keys.php
  

&lt;?php

$colors = [1 =&gt; 'red', 2 =&gt; 'green', 3 =&gt; 'blue'];

if (key_exists(2, $colors)) {
    echo "Key 2 exists with value: " . $colors[2];
} else {
    echo "Key 2 does not exist";
}

This verifies if the numeric key 2 exists in the $colors array. The function
correctly identifies the key and returns its value 'green'.

## Checking Non-existent Keys

The function returns false when checking for keys that don't exist.

nonexistent_key.php
  

&lt;?php

$settings = [
    'theme' =&gt; 'dark',
    'notifications' =&gt; true
];

$key = 'language';
$exists = key_exists($key, $settings);

echo $exists ? "Key '$key' exists" : "Key '$key' does not exist";

This checks for a 'language' key that isn't present in the array. The function
returns false, and the code outputs that the key doesn't exist.

## Null Values Handling

key_exists returns true even if the key's value is null.

null_values.php
  

&lt;?php

$data = [
    'username' =&gt; 'johndoe',
    'middle_name' =&gt; null,
    'last_name' =&gt; 'Doe'
];

$key = 'middle_name';
if (key_exists($key, $data)) {
    echo "Key '$key' exists (value is null)";
} else {
    echo "Key '$key' does not exist";
}

This shows that key_exists only checks for key existence, not
value content. It returns true for 'middle_name' despite its null value.

## Difference Between key_exists and isset

Demonstrates how key_exists differs from isset.

key_exists_vs_isset.php
  

&lt;?php

$array = [
    'a' =&gt; 1,
    'b' =&gt; null,
    'c' =&gt; 0
];

echo "key_exists('b', \$array): " . (key_exists('b', $array) ? 'true' : 'false') . "\n";
echo "isset(\$array['b']): " . (isset($array['b']) ? 'true' : 'false') . "\n";

key_exists returns true for key 'b' (value null), while isset
returns false. isset also checks if the value is not null.

## Best Practices

- **Key Validation:** Always check array keys before access.

- **Null Values:** Use key_exists when null values are valid.

- **Performance:** key_exists is slightly slower than isset.

- **Readability:** Consider array_key_exists for clarity.

## Source

[PHP key_exists Documentation](https://www.php.net/manual/en/function.key-exists.php)

This tutorial covered the PHP key_exists function with practical
examples showing its usage for array key validation scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Array Functions](/php/#php-array).