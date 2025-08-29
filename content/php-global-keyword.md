+++
title = "PHP global Keyword"
date = 2025-08-29T20:04:26.533+01:00
draft = false
description = "PHP global keyword tutorial shows how to use global variables in PHP. Learn variable scope with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP global Keyword

last modified April 16, 2025

The PHP global keyword is used to access global variables from
within functions. By default, variables inside functions have local scope.
The global keyword imports global variables into the local scope.

## Basic Definitions

Global variables are declared outside any function and can be accessed
anywhere in the script. However, inside functions, variables have local
scope by default.

The global keyword allows accessing global variables within
functions. It creates a reference to the global variable in the local scope.
Multiple variables can be made global by separating them with commas.

Syntax: global $var1, $var2;. The global keyword must be used
inside functions before the variables are referenced. It doesn't create new
variables but references existing ones.

## Basic global Usage

This example demonstrates the basic usage of the global keyword inside a function.

basic_global.php
  

&lt;?php

declare(strict_types=1);

$counter = 0;

function incrementCounter() {
    global $counter;
    $counter++;
}

incrementCounter();
echo $counter; // Outputs 1

The $counter variable is declared in the global scope. Inside
the function, we use the global keyword to access it. Without global, the
function would create a local variable instead. The function modifies the
global variable directly.

## Accessing Multiple Global Variables

This example shows how to access multiple global variables within a function.

multiple_globals.php
  

&lt;?php

declare(strict_types=1);

$name = "John";
$age = 30;

function displayInfo() {
    global $name, $age;
    echo "Name: $name, Age: $age";
}

displayInfo(); // Outputs Name: John, Age: 30

Two global variables are declared outside the function. Inside the function,
both are made accessible using the global keyword. The function can then use
these variables as if they were local. Multiple variables are separated by
commas in the global statement.

## Global vs Local Variables

This example demonstrates the difference between global and local variables.

global_vs_local.php
  

&lt;?php

declare(strict_types=1);

$var = "global";

function testScope() {
    $var = "local";
    echo "Inside function: $var\n";
}

testScope(); // Outputs Inside function: local
echo "Outside function: $var"; // Outputs Outside function: global

The example shows that without the global keyword, a function creates its own
local variable. The global $var remains unchanged. The local
variable shadows the global one inside the function. This demonstrates PHP's
variable scoping rules.

## Modifying Global Arrays

This example shows how to modify global array variables within a function.

global_array.php
  

&lt;?php

declare(strict_types=1);

$colors = ["red", "green", "blue"];

function addColor($newColor) {
    global $colors;
    $colors[] = $newColor;
}

addColor("yellow");
print_r($colors);

The global $colors array is modified inside the function. The
global keyword allows accessing and modifying the array directly. The new
element is added to the original array, not a local copy. This works with
all array operations.

## Global in Nested Functions

This example demonstrates using global variables in nested function calls.

nested_global.php
  

&lt;?php

declare(strict_types=1);

$value = 10;

function outer() {
    global $value;
    $value += 5;
    
    function inner() {
        global $value;
        $value *= 2;
    }
    
    inner();
}

outer();
echo $value; // Outputs 30

The global variable is accessed in both outer and inner functions. Each
function modifies the same global variable. The changes persist across
function calls. This shows how global variables maintain their state
throughout the script execution.

## Global vs $GLOBALS

This example compares using the global keyword with the $GLOBALS superglobal.

global_vs_globals.php
  

&lt;?php

declare(strict_types=1);

$count = 0;

function incrementWithGlobal() {
    global $count;
    $count++;
}

function incrementWithGlobals() {
    $GLOBALS['count']++;
}

incrementWithGlobal();
incrementWithGlobals();
echo $count; // Outputs 2

Both methods achieve the same result but work differently. The global keyword
imports the variable into local scope. $GLOBALS is a superglobal
array that always contains all global variables. Both approaches modify the
original global variable.

## Best Practices with Global

This example shows a better approach than using global variables directly.

global_best_practice.php
  

&lt;?php

declare(strict_types=1);

$config = [
    'debug' =&gt; true,
    'log_level' =&gt; 'warning'
];

function getConfig($key) {
    global $config;
    return $config[$key] ?? null;
}

function setConfig($key, $value) {
    global $config;
    $config[$key] = $value;
}

setConfig('log_level', 'error');
echo getConfig('log_level'); // Outputs error

Instead of accessing global variables directly, use accessor functions. This
provides better control and encapsulation. The functions act as an interface
to the global data. This pattern is more maintainable than direct global
access throughout the code.

## Best Practices

- **Minimize Usage:** Avoid excessive use of global variables.

- **Accessor Functions:** Use functions to access globals when needed.

- **Documentation:** Clearly document global variables and their purposes.

- **Constants:** Consider using constants for values that shouldn't change.

- **Dependency Injection:** Pass values as parameters when possible.

## Source

[PHP Variable Scope Documentation](https://www.php.net/manual/en/language.variables.scope.php)

This tutorial covered the PHP global keyword with practical examples showing
how to access and modify global variables within functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).