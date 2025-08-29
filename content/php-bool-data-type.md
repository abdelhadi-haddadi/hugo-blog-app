+++
title = "PHP bool Data Type"
date = 2025-08-29T20:04:11.345+01:00
draft = false
description = "PHP bool tutorial shows how to use boolean data type in PHP. Learn booleans with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP bool Data Type

last modified April 16, 2025

The PHP bool keyword represents the boolean data type. Booleans
are fundamental in programming for decision making. They can only be
true or false values. Booleans are used in
conditional statements and comparisons.

## Basic Definitions

The bool type is one of PHP's scalar data types. It represents
truth values in logical operations. Boolean values are case-insensitive
constants in PHP. The true and false values are
used directly.

Boolean values often result from comparison operations. They control program
flow in conditionals and loops. Many PHP functions return boolean values to
indicate success or failure.

Syntax: $var = true; or $var = false;. PHP
automatically converts values to boolean when needed in boolean context.

## Basic Boolean Declaration

This example shows how to declare and use simple boolean variables.

basic_bool.php
  

&lt;?php

declare(strict_types=1);

$isActive = true;
$isAdmin = false;

var_dump($isActive);
var_dump($isAdmin);

The code declares two boolean variables with true and false values.
The var_dump function shows their types and values.
Booleans are often used as flags to represent binary states.

## Boolean in Conditional Statements

This example demonstrates using boolean values in if statements.

bool_conditional.php
  

&lt;?php

declare(strict_types=1);

$hasPermission = true;

if ($hasPermission) {
    echo "Access granted.";
} else {
    echo "Access denied.";
}

The if statement checks the boolean variable directly. No comparison
operator is needed when checking boolean values. The condition evaluates
to true when the variable contains true.

## Boolean Return from Function

This example shows a function that returns a boolean value.

bool_function.php
  

&lt;?php

declare(strict_types=1);

function isEven(int $num): bool {
    return $num % 2 === 0;
}

$result = isEven(10);
var_dump($result);

The function checks if a number is even and returns a boolean.
The return type is explicitly declared as bool. This
makes the function's purpose and return value clear.

## Type Casting to Boolean

This example demonstrates how values are converted to boolean.

bool_casting.php
  

&lt;?php

declare(strict_types=1);

$val1 = (bool) "";        // false
$val2 = (bool) "hello";   // true
$val3 = (bool) 0;         // false
$val4 = (bool) 1;         // true
$val5 = (bool) [];        // false

var_dump($val1, $val2, $val3, $val4, $val5);

The code shows common type casting scenarios to boolean. Empty strings,
zero, and empty arrays convert to false. Non-empty values convert to true.
This is important for understanding truthy/falsy values in PHP.

## Boolean in Logical Operations

This example shows boolean values in logical AND/OR operations.

bool_logical.php
  

&lt;?php

declare(strict_types=1);

$isLoggedIn = true;
$isAdmin = false;

if ($isLoggedIn &amp;&amp; $isAdmin) {
    echo "Admin dashboard";
} elseif ($isLoggedIn || $isAdmin) {
    echo "User dashboard";
} else {
    echo "Login page";
}

The code combines boolean values with logical operators. The &amp;&amp;
operator requires both values to be true. The || operator requires at
least one true value. These are fundamental for complex conditions.

## Boolean as Function Parameter

This example demonstrates using boolean type in function parameters.

bool_parameter.php
  

&lt;?php

declare(strict_types=1);

function showMessage(string $text, bool $urgent): void {
    if ($urgent) {
        echo "URGENT: $text";
    } else {
        echo "Notice: $text";
    }
}

showMessage("System update required", true);
showMessage("New features available", false);

The function accepts a boolean parameter to control output formatting.
Type hints ensure only boolean values can be passed. This makes the
function's interface clear and prevents type-related bugs.

## Boolean in Array Operations

This example shows boolean values used with array functions.

bool_array.php
  

&lt;?php

declare(strict_types=1);

$users = [
    ['name' =&gt; 'Alice', 'active' =&gt; true],
    ['name' =&gt; 'Bob', 'active' =&gt; false],
    ['name' =&gt; 'Charlie', 'active' =&gt; true]
];

$activeUsers = array_filter($users, function($user) {
    return $user['active'];
});

print_r($activeUsers);

The code filters an array based on boolean values. The callback
function returns the boolean 'active' field. array_filter
includes elements where the callback returns true. This is a common
pattern for data filtering.

## Best Practices

- **Type hints:** Use bool type hints for clarity.

- **Naming:** Prefix boolean variables with 'is', 'has', or 'can'.

- **Strict comparison:** Use === for boolean comparisons.

- **Explicit returns:** Return true/false directly when possible.

- **Documentation:** Document boolean parameters and returns.

## Source

[PHP Boolean Documentation](https://www.php.net/manual/en/language.types.boolean.php)

This tutorial covered PHP boolean data type with practical examples
showing declaration, usage in functions, and logical operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).