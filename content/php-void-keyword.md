+++
title = "PHP void Keyword"
date = 2025-08-29T20:04:52.068+01:00
draft = false
description = "PHP void keyword tutorial shows how to use void return type in PHP functions. Learn void with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP void Keyword

last modified April 16, 2025

The PHP void keyword is a return type declaration indicating a
function doesn't return any value. Introduced in PHP 7.1, it helps make code
more explicit and maintainable. Void functions perform actions but don't
provide return values.

## Basic Definitions

The void return type specifies that a function doesn't return
anything. It's used in function declarations after the parameter list.
Void functions can still use return statements without values.

Void differs from returning null - it means no return value exists at all.
Attempting to use a void function's result causes a TypeError in strict mode.
Void is useful for functions that perform side effects without calculations.

Syntax: function name(params): void { code }. The void return type
must be explicitly declared. Void functions can't be used in expressions
expecting values.

## Basic void Function

This example demonstrates a simple void function that prints a message.

basic_void.php
  

&lt;?php

declare(strict_types=1);

function greet(string $name): void {
    echo "Hello, $name!";
}

greet("Alice");

The greet function takes a name parameter but returns nothing.
It performs an action (printing) without producing a return value. The void
return type makes this explicit in the function signature.

## void Function with Early Return

This example shows a void function using return without a value.

void_return.php
  

&lt;?php

declare(strict_types=1);

function checkAge(int $age): void {
    if ($age &lt; 18) {
        echo "Access denied.";
        return;
    }
    echo "Access granted.";
}

checkAge(20);

The function exits early if age is under 18. Void functions can use empty
return statements to exit early. This doesn't conflict with the void return
type as no value is returned.

## void in Class Methods

This example demonstrates using void with class methods.

void_method.php
  

&lt;?php

declare(strict_types=1);

class Logger {
    public function log(string $message): void {
        file_put_contents('app.log', $message, FILE_APPEND);
    }
}

$logger = new Logger();
$logger-&gt;log("System started\n");

The log method writes to a file but returns nothing. Void is
commonly used for methods with side effects. The class enforces the void
return type consistently across all instances.

## Error When Returning Values

This example shows what happens when a void function tries to return a value.

void_error.php
  

&lt;?php

declare(strict_types=1);

function increment(int &amp;$num): void {
    $num++;
    return $num; // This will cause an error
}

$value = 5;
increment($value);

The function attempts to return the incremented value despite being void.
In strict mode, this causes a TypeError. The example demonstrates void's
enforcement of no-return behavior.

## void with Conditional Logic

This example shows a void function with complex conditional paths.

void_conditional.php
  

&lt;?php

declare(strict_types=1);

function processUser(string $status): void {
    switch ($status) {
        case 'active':
            echo "Processing active user...";
            break;
        case 'inactive':
            echo "Archiving user...";
            break;
        default:
            echo "Unknown status.";
    }
}

processUser('active');

The function handles different status cases without returning values. All paths
through the function must not return anything. Void ensures consistency across
all conditional branches.

## void in Interface Definitions

This example demonstrates using void in interface method declarations.

void_interface.php
  

&lt;?php

declare(strict_types=1);

interface Notifier {
    public function send(string $message): void;
}

class EmailNotifier implements Notifier {
    public function send(string $message): void {
        echo "Sending email: $message";
    }
}

$notifier = new EmailNotifier();
$notifier-&gt;send("Important update");

The interface defines a void return type for the send method. Implementing
classes must match this signature. Void in interfaces enforces consistent
behavior across implementations.

## void for Event Handlers

This example shows void used in an event handler pattern.

void_event.php
  

&lt;?php

declare(strict_types=1);

class Button {
    private $clickHandler;

    public function setClickHandler(callable $handler): void {
        $this-&gt;clickHandler = $handler;
    }

    public function click(): void {
        if ($this-&gt;clickHandler) {
            ($this-&gt;clickHandler)();
        }
    }
}

$button = new Button();
$button-&gt;setClickHandler(function(): void {
    echo "Button clicked!";
});
$button-&gt;click();

The click handler is a void callback function. Both the handler and click
method use void as they don't return values. This is typical for event-driven
code where actions matter more than returns.

## Best Practices

- **Explicit:** Always declare void for functions without returns.

- **Consistency:** Use void consistently in related functions.

- **Documentation:** Document why a function has no return value.

- **Side Effects:** Reserve void for functions with clear side effects.

- **Testing:** Test void functions for their effects, not returns.

## Source

[PHP Return Types Documentation](https://www.php.net/manual/en/functions.returning-values.php)

This tutorial covered PHP's void return type with practical examples showing
its usage in functions, methods, interfaces, and callbacks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).