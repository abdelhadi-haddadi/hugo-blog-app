+++
title = "PHP never Keyword"
date = 2025-08-29T20:04:34.723+01:00
draft = false
description = "PHP never keyword tutorial shows how to use the never return type in PHP functions. Learn with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP never Keyword

last modified April 16, 2025

The PHP never return type indicates a function that never returns.
It was introduced in PHP 8.1. Functions with never type either throw exceptions
or terminate execution. This differs from void which completes normally.

## Basic Definitions

The never type represents functions that don't return control to
the caller. This includes functions that always throw exceptions or exit. The
never type is a bottom type in PHP's type system.

Syntax: function foo(): never { ... }. The never return type must
be explicitly declared. Functions with never type cannot have return statements.

Key characteristics: no return values allowed, execution must terminate, and
useful for fatal errors or infinite loops. It helps static analysis tools.

## Basic never Function

This example shows a simple function that always throws an exception.

basic_never.php
  

&lt;?php

declare(strict_types=1);

function fail(string $message): never {
    throw new RuntimeException($message);
}

fail("Operation failed");

The fail function declares never return type. It always throws an
exception, never returning normally. The call to fail terminates execution.
This is a common use case for never.

## never with exit()

This example demonstrates using never with the exit() function.

never_exit.php
  

&lt;?php

declare(strict_types=1);

function shutdown(): never {
    echo "Shutting down...";
    exit(1);
}

shutdown();
echo "This will never be executed";

The shutdown function calls exit(), terminating the script. The
never type correctly indicates this behavior. Code after shutdown() call is
unreachable. This helps catch logical errors.

## never in Error Handling

This example shows never used in an error handling scenario.

never_error.php
  

&lt;?php

declare(strict_types=1);

function handleError(string $message): never {
    error_log($message);
    http_response_code(500);
    exit(1);
}

try {
    // Some operation that might fail
    throw new Exception("Database connection failed");
} catch (Exception $e) {
    handleError($e-&gt;getMessage());
}

The handleError function logs the error and terminates. The never
type clearly communicates this behavior. This pattern is common in critical
error handlers. It prevents further execution.

## never with Infinite Loop

This example demonstrates never with an infinite loop.

never_loop.php
  

&lt;?php

declare(strict_types=1);

function runForever(): never {
    while (true) {
        echo "Running...\n";
        sleep(1);
    }
}

runForever();
echo "This line is unreachable";

The runForever

## never in Switch Default

This example uses never for exhaustive switch statements.

never_switch.php
  

&lt;?php

declare(strict_types=1);

function processStatus(string $status): string {
    return match ($status) {
        'success' =&gt; 'Operation succeeded',
        'pending' =&gt; 'Operation pending',
        default =&gt; throw new LogicException("Invalid status"),
    };
}

echo processStatus('success');

The match expression uses throw in default case. This ensures all cases are
handled. The never type would be used if extracted to a separate function.
This pattern enforces exhaustive matching.

## never with Type Checking

This example shows how never works with PHP's type system.

never_type.php
  

&lt;?php

declare(strict_types=1);

function terminate(): never {
    exit(0);
}

function foo(): string {
    terminate();
    // No return needed because terminate() is never
}

echo foo();

The foo function calls terminate() which never returns. Therefore,
foo doesn't need a return statement. PHP understands the code after terminate()
is unreachable. This helps avoid redundant code.

## never in Class Methods

This example demonstrates never in class methods.

never_class.php
  

&lt;?php

declare(strict_types=1);

class Auth {
    public function checkAccess(): never {
        if (!$this-&gt;isAuthenticated()) {
            header('Location: /login');
            exit();
        }
    }
    
    private function isAuthenticated(): bool {
        return false;
    }
}

$auth = new Auth();
$auth-&gt;checkAccess();
echo "Access granted";

The checkAccess method redirects if not authenticated. It never
returns when authentication fails. The never type documents this behavior.
This is useful for security checks.

## Best Practices

- **Documentation:** Clearly document never functions' behavior.

- **Exceptions:** Prefer throwing exceptions over exit() when possible.

- **Static Analysis:** Use never to help tools detect unreachable code.

- **Overuse:** Avoid using never for functions that might return.

- **Readability:** Use never to make termination behavior explicit.

## Source

[PHP never Documentation](https://www.php.net/manual/en/language.types.never.php)

This tutorial covered the PHP never return type with practical examples
showing its usage in various scenarios from error handling to infinite loops.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).