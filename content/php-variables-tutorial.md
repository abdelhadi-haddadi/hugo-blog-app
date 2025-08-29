+++
title = "PHP Variables Tutorial"
date = 2025-08-29T20:04:52.072+01:00
draft = false
description = "A detailed tutorial on PHP variables, covering declaration, types, scope, and practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Variables Tutorial

last modified February 11, 2025

Variables in PHP are used to store data, such as numbers, strings, or objects.
They are essential for dynamic programming, allowing you to manipulate and
retrieve data throughout your script. This tutorial covers the basics of PHP
variables, including declaration, types, scope, and practical examples.

## Declaring Variables

In PHP, variables are declared using the dollar sign $ followed by
the variable name. Variable names must start with a letter or underscore and
cannot start with a number.

declaring_variables.php
  

&lt;?php

$name = "John Doe";
$age = 25;
echo "Name: $name, Age: $age";

In this example, $name stores a string, and $age stores
an integer. The echo statement outputs the values.

## Variable Types

PHP is a loosely typed language, meaning you don't need to declare the type of
a variable. PHP automatically converts variables to the appropriate type based
on their usage.

variable_types.php
  

&lt;?php

$string = "Hello, World!";
$integer = 42;
$float = 3.14;
$boolean = true;

echo "String: $string, Integer: $integer, Float: $float, Boolean: $boolean";

This example demonstrates different variable types: string, integer, float, and
boolean.

## Variable Scope

PHP variables have different scopes: local, global, and static. Local variables
are accessible only within the function they are declared in, while global
variables can be accessed anywhere in the script.

variable_scope.php
  

&lt;?php

$globalVar = "I am global";

function testFunction() {

    $localVar = "I am local";
    global $globalVar;
    echo $globalVar . " " . $localVar;
}

testFunction();

The global keyword is used to access a global variable inside a
function.

## Static Variables

Static variables retain their value between function calls. They are initialized
only once and persist throughout the script's execution.

static_variables.php
  

&lt;?php

function counter() {

    static $count = 0;
    $count++;
    echo "Count: $count\n";
}

counter();
counter();
counter();

Each call to counter increments the static variable
$count.

## Variable Variables

PHP allows you to use variable variables, where the name of a variable is
dynamically set using another variable's value.

variable_variables.php
  

&lt;?php

$varName = "message";
$$varName = "Hello, Variable Variables!";
echo $message;

Here, $$varName creates a variable named $message with
the value "Hello, Variable Variables!".

## Constants

Constants are similar to variables but cannot be changed once defined. They are
declared using the define function.

constants.php
  

&lt;?php

define("PI", 3.14159);
echo "The value of PI is " . PI;

Constants are useful for values that remain unchanged throughout the script.

## Superglobals

PHP provides several superglobal variables that are always accessible,
regardless of scope. Examples include $_GET, $_POST,
and $_SESSION.

superglobals.php
  

&lt;?php

echo "Your IP address is: " . $_SERVER['REMOTE_ADDR'];

This example retrieves the user's IP address using the $_SERVER
superglobal.

## Best Practices for PHP Variables

**Use Descriptive Names:** Choose meaningful variable names to
improve code readability.
**Avoid Global Variables:** Minimize the use of global
variables to prevent unintended side effects.
**Initialize Variables:** Always initialize variables to avoid
undefined behavior.
**Use Constants for Fixed Values:** Use constants for values
that do not change during script execution.

## Source

[PHP Variables Documentation](https://www.php.net/manual/en/language.variables.php)

This tutorial covered the basics of PHP variables, including declaration, types,
scope, and practical examples. By mastering variables, you can write more
dynamic and efficient PHP scripts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all PHP tutorials](/php/).