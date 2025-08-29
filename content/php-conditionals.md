+++
title = "PHP Conditionals"
date = 2025-08-29T20:04:14.936+01:00
draft = false
description = "PHP Conditionals tutorial shows how to use conditionals for control flow in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Conditionals

last modified March 11, 2025

In this article, we explore PHP conditionals, which are control structures used
to make decisions in code. Conditionals allow you to execute different blocks of
code based on whether certain conditions are true or false.

## Main Features of PHP Conditionals

    - if: Executes a block of code if a condition is true.

    else: Executes a block of code if the if
    condition is false.
    elseif: Checks additional conditions if the previous
    if or elseif conditions are false.
    switch: Executes one of many blocks of code based on the
    value of a variable.
    ternary operator: A shorthand for simple
    if-else conditions.

Conditionals are essential for controlling the flow of your PHP programs.

## Basic Usage of Conditionals

The following example demonstrates the basic usage of the if
statement in PHP.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 20;

if ($age &gt;= 18) {
    echo "You are an adult.\n";
}

In this program, the if statement checks if the $age
variable is greater than or equal to 18. If true, it prints "You are an adult."

$ php main.php
You are an adult.

## if-else Statement

The following example demonstrates the if-else statement.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 15;

if ($age &gt;= 18) {
    echo "You are an adult.\n";
} else {
    echo "You are a minor.\n";
}

In this program, the else block is executed if the if
condition is false.

$ php main.php
You are a minor.

## elseif Statement

The following example demonstrates the elseif statement.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 25;

if ($age &lt; 18) {
    echo "You are a minor.\n";
} elseif ($age &lt; 30) {
    echo "You are a young adult.\n";
} else {
    echo "You are an adult.\n";
}

In this program, the elseif block is executed if the first
if condition is false and the elseif condition is true.

$ php main.php
You are a young adult.

## Ternary Operator

The following example demonstrates the ternary operator.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 20;

$message = ($age &gt;= 18) ? "You are an adult.\n" : "You are a minor.\n";
echo $message;

In this program, the ternary operator is used as a shorthand for the
if-else statement.

$ php main.php
You are an adult.

## switch Statement

The following example demonstrates the switch statement.

main.php
    

&lt;?php

declare(strict_types=1);

$day = "Monday";

switch ($day) {
    case "Monday":
        echo "Today is Monday.\n";
        break;
    case "Tuesday":
        echo "Today is Tuesday.\n";
        break;
    default:
        echo "Today is not Monday or Tuesday.\n";
}

In this program, the switch statement checks the value of
$day and executes the corresponding block of code.

$ php main.php
Today is Monday.

## Nested if Statements

The following example demonstrates nested if statements.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 25;
$isStudent = true;

if ($age &gt;= 18) {
    if ($isStudent) {
        echo "You are an adult student.\n";
    } else {
        echo "You are an adult.\n";
    }
} else {
    echo "You are a minor.\n";
}

In this program, a nested if statement is used to check additional
conditions.

$ php main.php
You are an adult student.

## Logical Operators

The following example demonstrates the use of logical operators in conditionals.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 25;
$isStudent = true;

if ($age &gt;= 18 &amp;&amp; $isStudent) {
    echo "You are an adult student.\n";
} else {
    echo "You are not an adult student.\n";
}

In this program, the &amp;&amp; (logical AND) operator is used to combine
multiple conditions.

$ php main.php
You are an adult student.

## Null Coalescing Operator

The following example demonstrates the null coalescing operator.

main.php
    

&lt;?php

declare(strict_types=1);

$name = null;

$username = $name ?? "Guest";
echo "Welcome, $username!\n";

In this program, the null coalescing operator (??) is used to assign
a default value if the variable is null.

$ php main.php
Welcome, Guest!

## Combining Conditions

The following example demonstrates combining multiple conditions.

main.php
    

&lt;?php

declare(strict_types=1);

$age = 25;
$isStudent = false;
$hasJob = true;

if (($age &gt;= 18 &amp;&amp; $hasJob) || $isStudent) {
    echo "You are eligible for the program.\n";
} else {
    echo "You are not eligible for the program.\n";
}

In this program, multiple conditions are combined using logical operators.

$ php main.php
You are eligible for the program.

## Source

[PHP Conditionals - Documentation](https://www.php.net/manual/en/language.control-structures.php)

In this article, we have shown how to use conditionals in PHP for control flow.
Conditionals are a powerful tool for making decisions in your code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).