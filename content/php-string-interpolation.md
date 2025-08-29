+++
title = "PHP String Interpolation"
date = 2025-08-29T20:04:46.059+01:00
draft = false
description = "Complete PHP string interpolation tutorial covering all techniques with examples. Learn how to embed variables in strings in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP String Interpolation

Last modified: April 16, 2025

PHP string interpolation allows embedding variables directly within string
literals. It provides a convenient way to combine variables with static text.
PHP offers several syntax options for string interpolation.

Interpolation works differently in single-quoted and double-quoted strings.
Complex expressions and array/object access can also be interpolated with
specific syntax. Proper interpolation makes code cleaner and more readable.

## Basic Definitions

String interpolation is the process of evaluating variables within string
literals. In PHP, double-quoted strings and heredoc syntax support interpolation.
Single-quoted strings treat everything literally.

The simplest form is direct variable embedding: "Hello $name".
For complex expressions, use curly braces: "Total: {$price * $qty}".
Array/object access requires braces for clarity.

Interpolation occurs at runtime when the string is evaluated. It's more
readable than concatenation but has similar performance characteristics.
Choose syntax based on context and clarity needs.

## Simple Variable Interpolation

This example shows basic variable interpolation in double-quoted strings.

simple_interpolation.php
  

&lt;?php

declare(strict_types=1);

$name = "Alice";
$age = 25;

echo "Hello $name, you are $age years old.\n";

// Single quotes don't interpolate
echo 'Hello $name, you are $age years old.';

The first echo shows successful interpolation in double quotes. Variables are
replaced with their values. The second echo demonstrates single quotes where
variables appear literally. Double quotes are necessary for interpolation.

## Complex Expressions with Braces

This example demonstrates using curly braces for complex expressions.

complex_interpolation.php
  

&lt;?php

declare(strict_types=1);

$price = 19.99;
$quantity = 3;

// Calculate the total outside the string.
$total = $price * $quantity;
echo "Total: {$total}\n";

$taxRate = 0.08;
// Calculate the total with tax outside the string.
$totalWithTax = $total * (1 + $taxRate);
echo "Total with tax: {$totalWithTax}";

Curly braces allow embedding complex expressions within strings, but for
calculations, it is recommended to perform them outside the string for
compatibility and readability. The final values can then be interpolated into
the strings efficiently.

## Array and Object Interpolation

This example shows how to interpolate array elements and object properties.

array_object_interpolation.php
  

&lt;?php

declare(strict_types=1);

$user = [
    'name' =&gt; 'Bob',
    'age' =&gt; 30,
    'address' =&gt; [
        'city' =&gt; 'New York',
        'zip' =&gt; '10001'
    ]
];

echo "User: {$user['name']}, Age: {$user['age']}\n";
echo "City: {$user['address']['city']}, ZIP: {$user['address']['zip']}\n";

class Product {
    public string $name = "Laptop";
    public float $price = 999.99;
}

$product = new Product();
echo "Product: {$product-&gt;name}, Price: \${$product-&gt;price}";

Array elements require curly braces with quotes around keys. Multi-dimensional
arrays work with nested syntax. Object properties use arrow notation within
braces. Always use braces for complex variable access in strings.

## Heredoc String Interpolation

Heredoc syntax supports interpolation and is useful for multi-line strings.

heredoc_interpolation.php
  

&lt;?php

declare(strict_types=1);

$title = "PHP Tutorial";
$author = "Jane Doe";
$version = 8.2;

echo &lt;&lt;&lt;DOC
&lt;h1&gt;$title&lt;/h1&gt;
&lt;div class="meta"&gt;
    Author: $author&lt;br&gt;
    Version: $version
&lt;/div&gt;
DOC;

Heredoc strings (&lt;&lt;&lt;DOC) behave like double-quoted strings for
interpolation. They preserve line breaks and formatting. The closing identifier
must be on its own line at the start. Heredoc is ideal for HTML templates or SQL
queries.

## Nowdoc Syntax (Non-Interpolated)

Nowdoc is to single quotes what heredoc is to double quotes - no interpolation.

nowdoc_example.php
  

&lt;?php

declare(strict_types=1);

$language = "PHP";

$template = &lt;&lt;&lt;'TEMPLATE'
&lt;div class="header"&gt;
    Welcome to our $language tutorial.
    &lt;!-- $language won't be interpolated --&gt;
&lt;/div&gt;
TEMPLATE;

echo $template;

Nowdoc uses single quotes around the opening identifier. It treats all content
literally, like single quotes. Use nowdoc when you need multi-line strings
without variable substitution. It's good for code examples or templates.

## Interpolation with Function Calls

This example demonstrates interpolating function return values.

function_interpolation.php
  

&lt;?php

declare(strict_types=1);

function getDiscount(): float {
    return 15.0; // 15% discount
}

$price = 89.99;
echo "Price: \${$price}, After discount: \$" . $price * (1 - getDiscount()/100);

Function calls can be interpolated by first assigning to variables or using
complex syntax. Direct function calls in interpolation aren't supported.
For clarity, often better to calculate values before string creation.

## Special Character Escaping

This example shows escaping special characters in interpolated strings.

escaping_interpolation.php
  

&lt;?php

declare(strict_types=1);

$name = "O'Reilly";
echo "Hello \"$name\", how's your day?\n";

$path = "C:\\xampp\\htdocs";
echo "Path: $path\n";

$price = 19.99;
echo "Price: \$$price\n";
echo "Unicode: \u{1F60A}"; // Smiley face emoji

Double quotes in strings need escaping with backslashes. Backslashes themselves
must be escaped. Special sequences like \n, \t, and Unicode work in double
quotes. The dollar sign needs escaping when it's not for interpolation.

## Variable Variables in Interpolation

This advanced example shows using variable variables within strings.

variable_variables.php
  

&lt;?php

declare(strict_types=1);

$varName = "status";
$$varName = "active"; // Creates $status variable

// Use {${expr}} syntax to fix deprecation warning
echo "Current status: {${$varName}}\n";

$userData = [
    'name' =&gt; 'admin',
    'role' =&gt; 'administrator'
];

$field = 'name';
// Access array elements remains unchanged
echo "Username: {$userData[$field]}";

Variable variables require braces for interpolation. The updated syntax
{${expr}} ensures compatibility with PHP 8.2 and above. This
approach avoids deprecation warnings while maintaining dynamic variable access.
Use this technique carefully to ensure code clarity.

## Source

[PHP String Documentation](https://www.php.net/manual/en/language.types.string.php)

This tutorial covered PHP string interpolation with examples showing basic to
advanced techniques. Proper interpolation makes string handling cleaner and
more maintainable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).