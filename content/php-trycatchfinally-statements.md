+++
title = "PHP try/catch/finally Statements"
date = 2025-08-29T20:04:48.543+01:00
draft = false
description = "PHP try/catch/finally tutorial shows how to use exception handling in PHP. Learn error handling with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP try/catch/finally Statements

last modified April 16, 2025

The PHP try, catch, and finally statements
are essential for exception handling. They allow graceful error recovery and
cleanup operations. These constructs help manage runtime errors in PHP.

## Basic Definitions

The try block contains code that might throw exceptions. The
catch block handles exceptions thrown from the try block.

The finally block executes code regardless of whether an exception
was thrown. It's ideal for cleanup operations like closing files or connections.

Syntax: try { code } catch (ExceptionType $e) { handle } finally { cleanup }.
Exceptions are objects representing errors that occur during execution.

## Basic try-catch

This example demonstrates a simple try-catch block handling division by zero.

basic_try_catch.php
  

&lt;?php

declare(strict_types=1);

try {
    $result = 10 / 0;
    echo "Result: $result";
} catch (DivisionByZeroError $e) {
    echo "Error: Cannot divide by zero";
}

The code attempts division by zero in the try block. This throws a
DivisionByZeroError. The catch block catches this specific exception type.
The error message is displayed instead of crashing the program.

## Multiple catch blocks

This example shows handling different exception types with multiple catches.

multiple_catch.php
  

&lt;?php

declare(strict_types=1);

try {
    $file = fopen("nonexistent.txt", "r");
    $content = fread($file, 100);
    fclose($file);
} catch (RuntimeException $e) {
    echo "Runtime error: " . $e-&gt;getMessage();
} catch (Exception $e) {
    echo "General error: " . $e-&gt;getMessage();
}

The code attempts to open a non-existent file. This throws a RuntimeException.
The first catch handles runtime errors specifically. The second catches all
other exceptions. More specific catches should come first.

## Finally block

This example demonstrates using finally for cleanup operations.

finally_block.php
  

&lt;?php

declare(strict_types=1);

$resource = null;

try {
    $resource = fopen("data.txt", "w");
    fwrite($resource, "Hello World");
} catch (Exception $e) {
    echo "Error: " . $e-&gt;getMessage();
} finally {
    if ($resource) {
        fclose($resource);
        echo "Resource closed";
    }
}

The code opens a file and writes to it in the try block. The finally block
ensures the file is closed whether an exception occurs or not. This prevents
resource leaks. The finally block always executes.

## Custom exceptions

This example shows creating and throwing custom exceptions.

custom_exception.php
  

&lt;?php

declare(strict_types=1);

class InvalidEmailException extends Exception {}

function validateEmail(string $email): bool {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidEmailException("Invalid email format");
    }
    return true;
}

try {
    validateEmail("invalid-email");
} catch (InvalidEmailException $e) {
    echo "Validation error: " . $e-&gt;getMessage();
}

The code defines a custom InvalidEmailException class. The validateEmail
function throws this exception for invalid emails. The catch block handles
this specific exception type. Custom exceptions make error handling clearer.

## Nested try-catch

This example demonstrates nested try-catch blocks for complex error handling.

nested_try_catch.php
  

&lt;?php

declare(strict_types=1);

try {
    try {
        $result = 10 / 0;
    } catch (DivisionByZeroError $e) {
        throw new Exception("Calculation failed", 0, $e);
    }
} catch (Exception $e) {
    echo "Outer catch: " . $e-&gt;getMessage();
    echo "Previous: " . $e-&gt;getPrevious()-&gt;getMessage();
}

The inner try attempts division by zero. The inner catch converts the error to
a more general Exception. The outer catch handles this and can access the
original error via getPrevious(). This allows error wrapping and propagation.

## Exception information

This example shows accessing exception details in the catch block.

exception_info.php
  

&lt;?php

declare(strict_types=1);

try {
    $array = [1, 2, 3];
    echo $array[5];
} catch (OutOfBoundsException $e) {
    echo "Error: " . $e-&gt;getMessage() . "\n";
    echo "File: " . $e-&gt;getFile() . "\n";
    echo "Line: " . $e-&gt;getLine() . "\n";
    echo "Trace: " . $e-&gt;getTraceAsString() . "\n";
}

The code attempts to access an invalid array index. The catch block shows how
to get detailed error information. getMessage() returns the error description.
getFile() and getLine() show where the error occurred. getTraceAsString()
provides the call stack.

## Global exception handler

This example demonstrates setting a global exception handler.

global_handler.php
  

&lt;?php

declare(strict_types=1);

function globalExceptionHandler(Throwable $e) {
    echo "Global handler caught: " . $e-&gt;getMessage();
    error_log("Uncaught exception: " . $e-&gt;getMessage());
}

set_exception_handler('globalExceptionHandler');

// This exception won't be caught by any try-catch
throw new Exception("Something went wrong");

The code sets a global exception handler function. This function will catch any
uncaught exceptions in the script. The handler logs the error and displays a
message. Global handlers are useful for centralized error logging and display.

## Best Practices

- **Specific catches:** Catch specific exception types first.

- **Cleanup:** Use finally for resource cleanup operations.

- **Logging:** Log exceptions for debugging purposes.

- **Custom exceptions:** Create domain-specific exceptions.

- **Graceful recovery:** Provide fallback behavior when possible.

## Source

[PHP Exception Handling Documentation](https://www.php.net/manual/en/language.exceptions.php)

This tutorial covered PHP exception handling with practical examples showing
try, catch, and finally usage in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).