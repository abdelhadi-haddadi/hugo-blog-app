+++
title = "PHP fn Keyword"
date = 2025-08-29T20:04:23.202+01:00
draft = false
description = "PHP fn keyword tutorial shows how to use arrow functions in PHP. Learn arrow functions with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fn Keyword

last modified April 16, 2025

The PHP fn keyword introduces arrow functions, a concise syntax
for anonymous functions. Arrow functions automatically inherit variables from
the parent scope. They were added in PHP 7.4 as a more compact alternative
to traditional closures.

## Basic Definitions

The fn keyword creates arrow functions with implicit variable
binding. Unlike regular closures, arrow functions automatically capture
variables from the containing scope. This makes them ideal for short
callback functions.

Syntax: fn(parameters) =&gt; expression. The expression's result
is automatically returned. Arrow functions can't contain statements or
multiple expressions. They must be a single expression.

Arrow functions are particularly useful with array operations like
array_map, array_filter, and array_reduce.
They reduce boilerplate code when working with callbacks.

## Basic Arrow Function

This example demonstrates a simple arrow function that doubles a number.

basic_fn.php
  

&lt;?php

declare(strict_types=1);

$double = fn($x) =&gt; $x * 2;

echo $double(5); // Outputs 10

The code defines an arrow function that takes one parameter $x.
It returns $x * 2 without an explicit return statement. The
function is assigned to $double variable. Arrow functions can
be called like regular functions.

## Using Parent Scope Variables

This example shows how arrow functions automatically capture parent scope.

scope_vars.php
  

&lt;?php

declare(strict_types=1);

$factor = 3;

$multiply = fn($x) =&gt; $x * $factor;

echo $multiply(5); // Outputs 15

The arrow function uses $factor from the parent scope without
explicitly importing it. Unlike closures, no use keyword is
needed. The variable binding is by-value, not by-reference. Changes to
$factor won't affect the bound value.

## Array Mapping with Arrow Function

This example demonstrates using arrow functions with array_map.

array_map.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4];
$squared = array_map(fn($n) =&gt; $n ** 2, $numbers);

print_r($squared); // [1, 4, 9, 16]

The code squares each array element using array_map with an
arrow function. The concise syntax eliminates the need for a separate
function definition. Arrow functions work well with array operations
that require simple transformations.

## Multiple Parameters

This example shows an arrow function with multiple parameters.

multiple_params.php
  

&lt;?php

declare(strict_types=1);

$add = fn($a, $b) =&gt; $a + $b;

echo $add(3, 7); // Outputs 10

The arrow function takes two parameters and returns their sum. Parameters
are separated by commas like regular functions. Type hints and default
values can be used with parameters. The expression after =&gt; must still
be a single expression.

## Filtering Arrays

This example demonstrates filtering an array with an arrow function.

array_filter.php
  

&lt;?php

declare(strict_types=1);

$ages = [12, 18, 25, 15, 30];
$adults = array_filter($ages, fn($age) =&gt; $age &gt;= 18);

print_r($adults); // [18, 25, 30]

The code filters the array to keep only adult ages. The arrow function
provides a clean, inline condition for filtering. The result includes
only elements where the condition returns true. Arrow functions make
array operations more readable.

## Nested Arrow Functions

This example shows arrow functions used within other arrow functions.

nested_functions.php
  

&lt;?php

declare(strict_types=1);

$calculate = fn($x) =&gt; fn($y) =&gt; $x + $y;

$addFive = $calculate(5);
echo $addFive(3); // Outputs 8

The outer arrow function returns another arrow function. This creates
a function that adds a fixed number to its input. The technique is
known as currying. Each arrow function captures variables from its
respective parent scope.

## Object Method Call

This example demonstrates calling an object method from an arrow function.

object_method.php
  

&lt;?php

declare(strict_types=1);

class Calculator {
    public function square($n) {
        return $n * $n;
    }
}

$calc = new Calculator();
$square = fn($x) =&gt; $calc-&gt;square($x);

echo $square(4); // Outputs 16

The arrow function calls the square method on the $calc
object. The object is automatically captured from the parent scope. Arrow
functions can interact with objects and their methods. They maintain the
object context when calling methods.

## Best Practices

- **Conciseness:** Use arrow functions for short, simple operations.

- **Readability:** Avoid complex expressions in arrow functions.

- **Scope:** Remember they capture variables by value, not reference.

- **Limitations:** Don't use for multi-statement functions.

- **Array Operations:** Prefer with array_map, filter, reduce.

## Source

[PHP Arrow Functions Documentation](https://www.php.net/manual/en/functions.arrow.php)

This tutorial covered PHP arrow functions with practical examples showing
the fn keyword usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).