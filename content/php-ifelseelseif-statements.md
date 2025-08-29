+++
title = "PHP if/else/elseif Statements"
date = 2025-08-29T20:04:26.520+01:00
draft = false
description = "PHP if/else/elseif tutorial shows how to use conditional statements in PHP. Learn conditionals with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP if/else/elseif Statements

last modified April 16, 2025

The PHP if, else, and elseif statements
are fundamental for controlling program flow. They allow executing different
code blocks based on conditions. These constructs form the basis of decision
making in PHP.

## Basic Definitions

The if statement executes a block of code if a condition is true.
The else statement executes code when the if condition is false.

The elseif statement checks another condition if previous ones
were false. Multiple elseif statements can test several conditions in sequence.

Syntax: if (condition) { code } elseif (condition) { code } else { code }.
Conditions are expressions that evaluate to boolean true or false.

## Basic if Statement

This example demonstrates a simple if statement checking a numeric value.

basic_if.php
  

&lt;?php

declare(strict_types=1);

$age = 20;

if ($age &gt;= 18) {
    echo "You are an adult.";
}

The code checks if the $age variable is 18 or more. If true, it
prints the message. The condition uses the &gt;= comparison operator. Only one
statement executes when the condition is met.

## if-else Statement

This example shows how to use if with else for alternative execution paths.

if_else.php
  

&lt;?php

declare(strict_types=1);

$temperature = 25;

if ($temperature &gt; 30) {
    echo "It's hot outside.";
} else {
    echo "It's not too hot.";
}

The code checks if temperature exceeds 30 degrees. If not, the else block
executes. This provides a default action when the condition fails. Only one
of the two blocks will ever execute.

## Multiple elseif Statements

This example demonstrates checking multiple conditions with elseif.

elseif.php
  

&lt;?php

declare(strict_types=1);

$grade = 85;

if ($grade &gt;= 90) {
    echo "Grade: A";
} elseif ($grade &gt;= 80) {
    echo "Grade: B";
} elseif ($grade &gt;= 70) {
    echo "Grade: C";
} else {
    echo "Grade: F";
}

The code checks the grade against multiple thresholds. It stops at the first
true condition. The else provides a default for grades below 70. This pattern
is common for grading systems.

## Nested if Statements

This example shows how to nest if statements for complex conditions.

nested_if.php
  

&lt;?php

declare(strict_types=1);

$age = 25;
$hasLicense = true;

if ($age &gt;= 18) {
    if ($hasLicense) {
        echo "You can drive.";
    } else {
        echo "You need a license.";
    }
} else {
    echo "You're too young to drive.";
}

The outer if checks age, while the inner one checks license status. This
creates a hierarchical decision structure. Each condition must be true for
the innermost block to execute.

## Logical Operators in Conditions

This example demonstrates using logical operators (AND, OR) in conditions.

logical_operators.php
  

&lt;?php

declare(strict_types=1);

$isMember = true;
$orderTotal = 120;

if ($isMember &amp;&amp; $orderTotal &gt; 100) {
    echo "You qualify for free shipping!";
} elseif ($isMember || $orderTotal &gt; 150) {
    echo "You get 10% discount.";
} else {
    echo "No special offers available.";
}

The code checks combinations of conditions using &amp;&amp; (AND) and || (OR).
The first condition requires both to be true. The second needs either one true.
Logical operators allow complex condition combinations.

## Ternary Operator Alternative

This example shows the ternary operator as a concise if-else alternative.

ternary.php
  

&lt;?php

declare(strict_types=1);

$isLoggedIn = true;
$message = $isLoggedIn ? "Welcome back!" : "Please log in.";

echo $message;

The ternary operator evaluates the condition before the ?. If true, it returns
the first expression, otherwise the second. This is useful for simple decisions.
It's more compact than full if-else blocks.

## Checking Array Elements

This example demonstrates using if with array element checks.

array_check.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'name' =&gt; 'John',
    'age' =&gt; 25,
    'active' =&gt; true
];

if (!empty($user['name']) &amp;&amp; $user['active']) {
    echo "Welcome, {$user['name']}!";
} elseif (empty($user['name'])) {
    echo "Please set your name.";
} else {
    echo "Account not active.";
}

The code checks multiple array elements in conditions. It first verifies the
name exists and account is active. The empty function checks for
non-empty values. Array conditions work like variable conditions.

## Best Practices

- **Readability:** Use clear conditions and proper indentation.

- **Simplicity:** Avoid deeply nested if statements when possible.

- **Comparison:** Use strict comparison (===) when type matters.

- **Ordering:** Place most likely conditions first for efficiency.

- **Comments:** Document complex conditions for clarity.

## Source

[PHP if/else Documentation](https://www.php.net/manual/en/control-structures.if.php)

This tutorial covered PHP conditional statements with practical examples
showing if, else, and elseif usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).