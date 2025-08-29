+++
title = "PHP print Statement"
date = 2025-08-29T20:04:38.146+01:00
draft = false
description = "PHP print tutorial shows how to use the print keyword in PHP. Learn output with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP print Statement

last modified April 16, 2025

The PHP print statement is a language construct used for outputting
data. It's similar to echo but with some differences. Print is
fundamental for displaying content in PHP applications.

## Basic Definitions

The print statement outputs one or more strings. It's not actually
a function but a language construct. Parentheses are optional when using print.

Unlike echo, print always returns 1, allowing it to be used in
expressions. It can output strings, variables, and HTML content directly.

Syntax: print "string"; or print("string");. The
statement converts non-string values to strings automatically.

## Basic print Usage

This example demonstrates the simplest form of print statement.

basic_print.php
  

&lt;?php

declare(strict_types=1);

print "Hello, World!";

The code outputs the string "Hello, World!" to the browser or console. The
print statement doesn't require parentheses in this basic form. It's one of
the most common ways to output text in PHP.

## Printing Variables

This example shows how to print variable values with print.

print_variable.php
  

&lt;?php

declare(strict_types=1);

$name = "John Doe";
$age = 32;

print "Name: $name, Age: $age";

The code demonstrates variable interpolation in strings with print. Variables
are automatically converted to strings when printed. Double quotes allow
variable values to be inserted directly.

## Print with Parentheses

This example demonstrates using print with parentheses syntax.

print_parentheses.php
  

&lt;?php

declare(strict_types=1);

print("This is printed with parentheses.");

The parentheses syntax works identically to the standard form. This style is
sometimes preferred for readability. The parentheses don't affect the output.

## Print Return Value

This example shows how print returns 1 and can be used in expressions.

print_return.php
  

&lt;?php

declare(strict_types=1);

$result = print "Hello";
echo "&lt;br&gt;Return value: $result";

The code assigns print's return value to a variable. Print always returns 1,
unlike echo which has no return value. This allows print to be used where
expressions are required.

## Printing HTML

This example demonstrates printing HTML content directly.

print_html.php
  

&lt;?php

declare(strict_types=1);

print "&lt;h1&gt;Welcome&lt;/h1&gt;";
print "&lt;p&gt;This is a paragraph.&lt;/p&gt;";

The code outputs HTML markup directly to the browser. Print can output any
valid HTML content. The browser will render the HTML elements properly.

## Print Multiple Values

This example shows how to print multiple values with concatenation.

print_multiple.php
  

&lt;?php

declare(strict_types=1);

$firstName = "Jane";
$lastName = "Smith";

print "Full name: " . $firstName . " " . $lastName;

The code concatenates strings and variables with the dot operator. Unlike echo,
print can only take one argument. Concatenation is needed for multiple values.

## Print vs Echo

This example compares print and echo statements.

print_vs_echo.php
  

&lt;?php

declare(strict_types=1);

// Echo can take multiple parameters
echo "Hello", " ", "World", "!";

// Print can only take one parameter
print "Hello World!";

The main difference is echo can output multiple strings separated by commas.
Print is slightly slower as it returns a value. Both are language constructs,
not functions.

## Best Practices

- **Readability:** Use consistent style (with/without parentheses).

- **Performance:** Use echo for multiple outputs in one statement.

- **Security:** Escape output with htmlspecialchars when needed.

- **Concatenation:** Use proper spacing in concatenated strings.

- **Formatting:** Break long print statements for better readability.

## Source

[PHP print Documentation](https://www.php.net/manual/en/function.print.php)

This tutorial covered PHP print statement with practical examples showing
basic usage, variable output, HTML printing, and comparisons with echo.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).