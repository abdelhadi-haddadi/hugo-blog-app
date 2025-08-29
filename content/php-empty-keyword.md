+++
title = "PHP empty Keyword"
date = 2025-08-29T20:04:19.728+01:00
draft = false
description = "PHP empty keyword tutorial shows how to check for empty values in PHP. Learn empty() with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP empty Keyword

last modified April 16, 2025

The PHP empty keyword is a language construct used to check if a
variable is considered empty. It's commonly used for form validation and
variable checking. The empty check returns true for several cases.

## Basic Definitions

The empty construct determines whether a variable is empty. A
variable is considered empty if it doesn't exist or if its value equals false.

empty returns true for: empty string, 0, 0.0, "0", null, false,
array with zero elements, or undeclared variable. It's not a function but a
language construct.

Syntax: empty($var). Unlike isset, empty doesn't
produce a warning for undefined variables. It's often used with form data.

## Checking an Empty String

This example demonstrates checking an empty string with the empty keyword.

empty_string.php
  

&lt;?php

declare(strict_types=1);

$username = "";

if (empty($username)) {
    echo "Username cannot be empty.";
} else {
    echo "Username is valid.";
}

The code checks if $username is empty. An empty string evaluates
to true with empty. This is useful for form validation where fields are
required. The else block handles non-empty cases.

## Checking Zero Values

This example shows how empty treats various zero values.

zero_values.php
  

&lt;?php

declare(strict_types=1);

$count = 0;
$price = 0.0;
$code = "0";

if (empty($count)) {
    echo "Count is empty (zero).";
}

if (empty($price)) {
    echo "Price is empty (0.0).";
}

if (empty($code)) {
    echo "Code is empty ('0').";
}

The code demonstrates that 0, 0.0, and "0" all evaluate as empty. This is
important when validating numeric inputs. Note that "0.0" as string isn't empty.

## Checking Null Values

This example demonstrates empty behavior with null variables.

null_check.php
  

&lt;?php

declare(strict_types=1);

$user = null;

if (empty($user)) {
    echo "User is not set or is null.";
} else {
    echo "User exists.";
}

The code checks a null variable with empty. Null values always return true.
This is useful when working with database results that might be null. The else
block would execute for any non-null value.

## Checking Arrays

This example shows how to use empty with array variables.

array_check.php
  

&lt;?php

declare(strict_types=1);

$cart = [];

if (empty($cart)) {
    echo "Your cart is empty.";
} else {
    echo "You have items in your cart.";
}

The code checks if an array is empty. Empty arrays return true with empty.
This is common when working with shopping carts or lists. Note that array
keys don't affect the empty check.

## Checking Undefined Variables

This example demonstrates empty's behavior with undefined variables.

undefined_var.php
  

&lt;?php

declare(strict_types=1);

if (empty($undefinedVar)) {
    echo "Variable is undefined or empty.";
} else {
    echo "Variable has a value.";
}

The code checks an undefined variable with empty. Unlike isset(), empty
doesn't generate a warning for undefined variables. This makes it safer for
checking variables that might not exist.

## Form Validation Example

This example shows a practical form validation using empty.

form_validation.php
  

&lt;?php

declare(strict_types=1);

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';

if (empty($name) || empty($email)) {
    echo "Both name and email are required fields.";
} else {
    echo "Form submitted successfully!";
}

The code checks form inputs using empty. The null coalescing operator (??)
provides default empty strings. This prevents undefined index notices while
still catching empty submissions. Both fields must be non-empty.

## Combining with isset

This example shows how to combine empty with isset for thorough checking.

isset_empty.php
  

&lt;?php

declare(strict_types=1);

$config = [];

if (isset($config['timeout']) &amp;&amp; !empty($config['timeout'])) {
    echo "Timeout is set to: " . $config['timeout'];
} else {
    echo "Using default timeout.";
}

The code first checks if the key exists with isset, then checks if it's non-empty.
This two-step check is common in configuration handling. It prevents undefined
index errors while ensuring meaningful values.

## Best Practices

- **Form Validation:** Use empty for required form field checks.

- **Undefined Variables:** Prefer empty over isset when values must be non-empty.

- **Type Awareness:** Remember empty considers "0" and 0 as empty.

- **Combined Checks:** Use isset with empty when existence and value both matter.

- **Readability:** Consider explicit checks for specific empty cases.

## Source

[PHP empty() Documentation](https://www.php.net/manual/en/function.empty.php)

This tutorial covered PHP's empty keyword with practical examples showing its
usage in various scenarios for checking empty values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).