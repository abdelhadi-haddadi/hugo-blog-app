+++
title = "PHP throw Statement"
date = 2025-08-29T20:04:47.246+01:00
draft = false
description = "PHP throw tutorial shows how to use exceptions in PHP. Learn exception handling with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP throw Statement

last modified April 16, 2025

The PHP throw keyword is used to manually trigger exceptions in
your code. Exceptions are a powerful error handling mechanism that allows
you to handle errors gracefully. The throw statement works with try-catch
blocks to implement robust error handling.

## Basic Definitions

The throw statement raises an exception in PHP. When thrown,
execution stops and PHP looks for a matching catch block. Exceptions must
be objects that implement the Throwable interface.

Built-in Exception is the base class for all exceptions in PHP. You can
also create custom exception classes by extending Exception. Exceptions
bubble up through call stacks until caught.

Syntax: throw new Exception("Error message");. The throw
keyword is followed by an exception object. Exception messages should
clearly describe the error.

## Basic throw Example

This example demonstrates the simplest usage of the throw keyword.

basic_throw.php
  

&lt;?php

function divide($numerator, $denominator) {
    if ($denominator == 0) {
        throw new Exception("Division by zero");
    }
    return $numerator / $denominator;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo "Caught exception: " . $e-&gt;getMessage();
}

The code throws an exception when division by zero is attempted. The try
block contains code that might throw exceptions. The catch block handles
the exception and displays its message. This prevents fatal errors.

## Custom Exception Class

This example shows how to create and use a custom exception class.

custom_exception.php
  

&lt;?php

class InvalidEmailException extends Exception {}

function validateEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidEmailException("Invalid email format");
    }
    return true;
}

try {
    validateEmail("invalid-email");
} catch (InvalidEmailException $e) {
    echo "Email error: " . $e-&gt;getMessage();
}

The code defines a custom InvalidEmailException class. The validateEmail
function throws this exception for invalid emails. Custom exceptions make
error handling more specific. They can include additional methods.

## Multiple catch Blocks

This example demonstrates handling different exception types separately.

multiple_catch.php
  

&lt;?php

class FileNotFoundException extends Exception {}
class PermissionDeniedException extends Exception {}

function openFile($filename) {
    if (!file_exists($filename)) {
        throw new FileNotFoundException("File not found");
    }
    if (!is_readable($filename)) {
        throw new PermissionDeniedException("Permission denied");
    }
    return fopen($filename, 'r');
}

try {
    openFile("nonexistent.txt");
} catch (FileNotFoundException $e) {
    echo "File error: " . $e-&gt;getMessage();
} catch (PermissionDeniedException $e) {
    echo "Permission error: " . $e-&gt;getMessage();
} catch (Exception $e) {
    echo "General error: " . $e-&gt;getMessage();
}

The code has multiple catch blocks for different exception types. More
specific exceptions should be caught first. The last catch handles any
remaining Exception types. This allows tailored error handling.

## Rethrowing Exceptions

This example shows how to catch an exception and rethrow it.

rethrow.php
  

&lt;?php

function processData($data) {
    if (empty($data)) {
        throw new InvalidArgumentException("Empty data");
    }
    // Process data here
}

function handleRequest($data) {
    try {
        processData($data);
    } catch (InvalidArgumentException $e) {
        error_log("Invalid data: " . $e-&gt;getMessage());
        throw $e; // Rethrow the exception
    }
}

try {
    handleRequest([]);
} catch (Exception $e) {
    echo "Request failed: " . $e-&gt;getMessage();
}

The code catches an exception, logs it, then rethrows it. This allows
partial handling while letting higher levels know about the error. The
same exception object is thrown again. Rethrowing is useful for logging.

## Exception with Additional Data

This example demonstrates extending Exception to include extra data.

exception_with_data.php
  

&lt;?php

class ValidationException extends Exception {
    private $errors;
    
    public function __construct($message, $errors) {
        parent::__construct($message);
        $this-&gt;errors = $errors;
    }
    
    public function getErrors() {
        return $this-&gt;errors;
    }
}

function validateUser($user) {
    $errors = [];
    
    if (empty($user['name'])) {
        $errors[] = "Name is required";
    }
    if (empty($user['email'])) {
        $errors[] = "Email is required";
    }
    
    if (!empty($errors)) {
        throw new ValidationException("Validation failed", $errors);
    }
}

try {
    validateUser(['age' =&gt; 25]);
} catch (ValidationException $e) {
    echo $e-&gt;getMessage() . ": ";
    print_r($e-&gt;getErrors());
}

The custom ValidationException stores validation errors. The constructor
accepts both a message and error details. The getErrors method provides
access to the additional data. This pattern is useful for form validation.

## Finally Block

This example shows the finally block that always executes.

finally_block.php
  

&lt;?php

function processFile($filename) {
    $file = null;
    try {
        $file = fopen($filename, 'r');
        if (!$file) {
            throw new Exception("Failed to open file");
        }
        // Process file contents
    } catch (Exception $e) {
        echo "Error: " . $e-&gt;getMessage();
    } finally {
        if ($file) {
            fclose($file);
            echo "File handle closed";
        }
    }
}

processFile("example.txt");

The finally block executes whether an exception occurs or not. It's ideal
for cleanup code like closing files. The file handle is closed regardless
of success. Finally ensures resources are properly released.

## Error vs Exception

This example demonstrates throwing Error for unrecoverable issues.

error_vs_exception.php
  

&lt;?php

function checkMemoryLimit() {
    $memoryLimit = ini_get('memory_limit');
    $usedMemory = memory_get_usage(true);
    
    if ($usedMemory &gt; 0.9 * $this-&gt;convertToBytes($memoryLimit)) {
        throw new Error("Memory limit exceeded");
    }
}

function convertToBytes($size) {
    // Conversion logic here
    return 0;
}

try {
    checkMemoryLimit();
} catch (Error $e) {
    echo "Fatal error: " . $e-&gt;getMessage();
    // Log and exit gracefully
}

The code throws an Error for critical issues like memory exhaustion. Errors
typically indicate unrecoverable problems. They can be caught like Exceptions.
PHP 7+ unified exceptions and errors under Throwable. Use Errors sparingly.

## Best Practices

- **Specific Exceptions:** Create custom exceptions for different error types.

- **Meaningful Messages:** Provide clear, actionable error messages.

- **Proper Logging:** Log exceptions before handling or rethrowing.

- **Catch Order:** Catch more specific exceptions before general ones.

- **Resource Cleanup:** Use finally blocks for releasing resources.

## Source

[PHP Exceptions Documentation](https://www.php.net/manual/en/language.exceptions.php)

This tutorial covered PHP exception handling with practical examples
showing throw usage in various scenarios with try-catch blocks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).