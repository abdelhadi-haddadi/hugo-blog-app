+++
title = "PHP Functions"
date = 2025-08-29T20:04:25.430+01:00
draft = false
description = "PHP functions tutorial shows how to use the function keyword in PHP. Learn function syntax with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Functions

last modified April 16, 2025

The PHP function keyword is used to declare reusable blocks of
code. Functions help organize code into logical units and avoid repetition.
They can accept parameters and return values, making them versatile tools.

## Basic Definitions

A function is a named block of code that performs a specific task. Functions
are declared with the function keyword followed by a name.

Functions can accept parameters (inputs) and return values (outputs). They
promote code reuse and make programs easier to maintain and understand.

Syntax: function name(parameters) { code }. Functions must be
called to execute their code. They can be called multiple times with different
arguments.

## Basic Function

This example demonstrates a simple function that prints a greeting message.

basic_function.php
  

&lt;?php

declare(strict_types=1);

function greet() {
    echo "Hello, World!";
}

greet(); // Call the function

The code defines a function named greet that outputs a message.
The function is called using its name followed by parentheses. This shows the
most basic function structure without parameters or return values.

## Function with Parameters

This example shows a function that accepts parameters to customize its output.

function_params.php
  

&lt;?php

declare(strict_types=1);

function greetPerson(string $name) {
    echo "Hello, $name!";
}

greetPerson("Alice");
greetPerson("Bob");

The function greetPerson accepts a $name parameter.
The parameter is type-hinted as string. The function is called twice with
different names, demonstrating parameter usage. Each call produces different
output.

## Returning Values

This example demonstrates a function that calculates and returns a value.

return_value.php
  

&lt;?php

declare(strict_types=1);

function addNumbers(int $a, int $b): int {
    return $a + $b;
}

$result = addNumbers(5, 3);
echo "The sum is: $result";

The addNumbers function takes two integers and returns their sum.
The return type is declared as int after the parameter list. The returned
value is stored in $result and displayed. Return values make
functions more flexible.

## Default Parameter Values

This example shows how to define functions with default parameter values.

default_params.php
  

&lt;?php

declare(strict_types=1);

function makeCoffee(string $type = "cappuccino") {
    echo "Making a cup of $type.\n";
}

makeCoffee();
makeCoffee("espresso");

The function makeCoffee has a default value for its $type
parameter. When called without arguments, it uses the default. When provided,
it uses the specified value. Default parameters make functions more flexible.

## Variable Scope in Functions

This example demonstrates variable scope differences inside and outside functions.

variable_scope.php
  

&lt;?php

declare(strict_types=1);

$globalVar = "I'm global";

function testScope() {
    $localVar = "I'm local";
    echo $localVar;
    // echo $globalVar; // This would cause an error
}

testScope();
echo $globalVar;

Variables inside functions have local scope by default. The $localVar
is only accessible within testScope. Global variables must be
explicitly accessed with the global keyword or $GLOBALS.

## Recursive Function

This example shows a recursive function that calls itself to calculate factorial.

recursive.php
  

&lt;?php

declare(strict_types=1);

function factorial(int $n): int {
    if ($n &lt;= 1) {
        return 1;
    }
    return $n * factorial($n - 1);
}

echo "Factorial of 5 is: " . factorial(5);

The factorial function calls itself with a smaller value until
it reaches the base case ($n &lt;= 1). Recursion is powerful but
requires a termination condition. Each recursive call adds to the call stack.

## Anonymous Functions

This example demonstrates anonymous functions (closures) in PHP.

anonymous.php
  

&lt;?php

declare(strict_types=1);

$greet = function(string $name) {
    echo "Hello, $name!";
};

$greet("Charlie");

$numbers = [1, 2, 3, 4];
$squared = array_map(function($n) { return $n * $n; }, $numbers);
print_r($squared);

Anonymous functions are defined without a name and assigned to variables. They
can be passed as arguments to other functions like array_map. The
example shows both a simple closure and one used with array processing. Closures
are useful for callbacks.

## Best Practices

- **Naming:** Use descriptive names that indicate the function's purpose.

- **Single Responsibility:** Each function should do one thing well.

- **Parameter Count:** Limit parameters to a reasonable number (3-4 max).

- **Type Declarations:** Use type hints for parameters and return values.

- **Documentation:** Add PHPDoc comments to explain function behavior.

## Source

[PHP Functions Documentation](https://www.php.net/manual/en/functions.user-defined.php)

This tutorial covered PHP functions with practical examples showing declaration,
parameters, return values, and advanced function features in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).