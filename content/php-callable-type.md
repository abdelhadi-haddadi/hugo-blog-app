+++
title = "PHP callable Type"
date = 2025-08-29T20:04:13.629+01:00
draft = false
description = "PHP callable tutorial shows how to use callable type in PHP. Learn callbacks with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP callable Type

last modified April 16, 2025

The PHP callable type represents anything that can be called as
a function. It's used to pass functions as parameters or store them in
variables. Callables enable powerful programming patterns like callbacks.

## Basic Definitions

A callable in PHP is a type that can be invoked as a function.
Several things qualify as callables: function names as strings, object
methods, static class methods, closures, and objects implementing __invoke().

The is_callable function checks if a variable is callable.
Callables are often used as callback parameters in functions like
array_map or usort.

Callable syntax varies: 'functionName' for functions,
[$object, 'method'] for methods, or function() {}
for anonymous functions. Type hints ensure parameters are callable.

## Basic Function Callback

This example shows passing a regular function as a callable.

basic_callable.php
  

&lt;?php

declare(strict_types=1);

function greet(string $name): void {
    echo "Hello, $name!";
}

function process(callable $callback, string $name): void {
    $callback($name);
}

process('greet', 'John');

The code defines a greet function and passes it to
process as a callable. The callable type hint ensures only
valid callbacks are accepted. The function name is passed as a string.

## Class Method Callback

This example demonstrates using an object method as a callable.

method_callable.php
  

&lt;?php

declare(strict_types=1);

class Greeter {
    public function greet(string $name): void {
        echo "Hello, $name from Greeter!";
    }
}

$greeter = new Greeter();
process([$greeter, 'greet'], 'Alice');

The code creates a Greeter class with a greet method. The method
is passed as a callable using array syntax: [object, methodName]. The same
process function from the first example works with different callable types.

## Static Method Callback

This example shows using a static class method as a callable.

static_callable.php
  

&lt;?php

declare(strict_types=1);

class StaticGreeter {
    public static function greet(string $name): void {
        echo "Hello, $name from static method!";
    }
}

process('StaticGreeter::greet', 'Bob');
// Or alternatively:
process([StaticGreeter::class, 'greet'], 'Charlie');

Static methods can be called using ClassName::methodName syntax or via an
array with the class name. Both forms are valid callables. Static callables
don't require object instantiation.

## Closure as Callable

This example demonstrates using an anonymous function (closure) as a callable.

closure_callable.php
  

&lt;?php

declare(strict_types=1);

$greeting = function(string $name): void {
    echo "Hi there, $name!";
};

process($greeting, 'Dave');

Closures are anonymous functions that can be assigned to variables. They're
naturally callable and can access variables from the parent scope with the
use keyword. Closures are often used for short callback logic.

## Invokable Object

This example shows an object implementing __invoke() being used as callable.

invokable_callable.php
  

&lt;?php

declare(strict_types=1);

class InvokableGreeter {
    public function __invoke(string $name): void {
        echo "Greetings, $name from invokable!";
    }
}

$invokable = new InvokableGreeter();
process($invokable, 'Eve');

Objects implementing the __invoke magic method can be called
as functions. When passed to a function expecting a callable, the object
itself is sufficient. This pattern is useful for stateful callables.

## Callable Validation

This example demonstrates validating callables before using them.

validate_callable.php
  

&lt;?php

declare(strict_types=1);

function safeProcess(callable $callback, string $name): void {
    if (!is_callable($callback)) {
        throw new InvalidArgumentException('Provided callback is not callable');
    }
    
    $callback($name);
}

try {
    safeProcess('nonexistent_function', 'Frank');
} catch (InvalidArgumentException $e) {
    echo "Error: " . $e-&gt;getMessage();
}

The code checks if the callback is actually callable before invoking it.
is_callable verifies the callback can be executed. This
prevents errors when dealing with dynamic callable references.

## Callable in Array Functions

This example shows using callables with PHP's array functions.

array_callable.php
  

&lt;?php

declare(strict_types=1);

$numbers = [1, 2, 3, 4, 5];

// Using closure
$squared = array_map(function($n) { return $n * $n; }, $numbers);

// Using named function
function cube($n) { return $n * $n * $n; }
$cubed = array_map('cube', $numbers);

print_r($squared);
print_r($cubed);

PHP's array functions like array_map accept callables to
transform array elements. Both closures and named functions work. This is
a common use case for callables in PHP.

## Best Practices

- **Type hints:** Use callable type hints for callback parameters.

- **Validation:** Verify callables with is_callable() when needed.

- **Clarity:** Prefer named functions for complex callbacks.

- **Closures:** Use closures for simple, one-off callbacks.

- **Performance:** Static methods are faster than object methods.

## Source

[PHP callable Documentation](https://www.php.net/manual/en/language.types.callable.php)

This tutorial covered PHP callable type with practical examples showing
various ways to create and use callables in PHP applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).