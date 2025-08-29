+++
title = "PHP Exceptions"
date = 2025-08-29T20:04:19.686+01:00
draft = false
description = "PHP Exceptions tutorial shows how to use exceptions for error handling in PHP."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Exceptions

last modified March 11, 2025

In this article, we show how to use exceptions in PHP. Exceptions
are a mechanism for error handling in PHP, allowing developers to handle errors
gracefully and maintain control over the program flow. Exceptions are thrown
using the throw keyword and caught using the try-catch
block.

## Main Features of PHP Exceptions

    Error Handling: Exceptions provide a structured way to handle errors
    and unexpected situations.
    Custom Exceptions: Developers can create custom exception classes to
    handle specific types of errors.
    Graceful Degradation: Exceptions allow programs to degrade gracefully
    by catching and handling errors without crashing.
    Debugging: Exceptions provide detailed error information, making
    debugging easier.
    Control Flow: Exceptions allow developers to control the flow of the
    program by catching and handling errors at specific points.

Exceptions are instances of the Exception class or its subclasses.
They are thrown using the throw keyword and caught using the
try-catch block.

## Basic Usage of Exceptions

The following example demonstrates how to throw and catch an exception in PHP.

main.php
    

&lt;?php

declare(strict_types=1);

function divide(int $a, int $b): int
{
    if ($b === 0) {
        throw new Exception("Division by zero is not allowed.");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo "Caught exception: " . $e-&gt;getMessage();
}

In this program, the divide function throws an exception if the
second argument is zero. The exception is caught in the try-catch
block, and the error message is displayed.

$ php main.php
Caught exception: Division by zero is not allowed.

## Custom Exceptions

The following example demonstrates how to create and use a custom exception
class in PHP.

main.php
    

&lt;?php

declare(strict_types=1);

class DivisionByZeroException extends Exception
{
    public function __construct()
    {
        parent::__construct("Division by zero is not allowed.");
    }
}

function divide(int $a, int $b): int
{
    if ($b === 0) {
        throw new DivisionByZeroException();
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (DivisionByZeroException $e) {
    echo "Caught custom exception: " . $e-&gt;getMessage();
}

In this program, the DivisionByZeroException class extends the
Exception class. The divide function throws this
custom exception if the second argument is zero. The exception is caught and
handled in the try-catch block.

$ php main.php
Caught custom exception: Division by zero is not allowed.

## Multiple Catch Blocks

The following example demonstrates how to use multiple catch blocks
to handle different types of exceptions.

main.php
    

&lt;?php

declare(strict_types=1);

class DivisionByZeroException extends Exception {}
class InvalidArgumentException extends Exception {}

function divide(int $a, int $b): int
{
    if ($b === 0) {
        throw new DivisionByZeroException("Division by zero is not allowed.");
    }
    if ($a &lt; 0 || $b &lt; 0) {
        throw new InvalidArgumentException("Arguments must be positive.");
    }
    return $a / $b;
}

try {
    echo divide(-10, 5);
} catch (DivisionByZeroException $e) {
    echo "Caught DivisionByZeroException: " . $e-&gt;getMessage();
} catch (InvalidArgumentException $e) {
    echo "Caught InvalidArgumentException: " . $e-&gt;getMessage();
}

In this program, the divide function throws different exceptions
based on the input values. The exceptions are caught and handled in separate
catch blocks.

$ php main.php
Caught InvalidArgumentException: Arguments must be positive.

## Finally Block

The following example demonstrates how to use the finally block to
execute code regardless of whether an exception is thrown.

main.php
    

&lt;?php

declare(strict_types=1);

function divide(int $a, int $b): int
{
    if ($b === 0) {
        throw new Exception("Division by zero is not allowed.");
    }
    return $a / $b;
}

try {
    echo divide(10, 0);
} catch (Exception $e) {
    echo "Caught exception: " . $e-&gt;getMessage();
} finally {
    echo "\nFinally block executed.";
}

In this program, the finally block is executed after the
try-catch block, regardless of whether an exception is thrown.

$ php main.php
Caught exception: Division by zero is not allowed.
Finally block executed.

## Rethrowing Exceptions

The following example demonstrates how to rethrow an exception after catching it.

main.php
    

&lt;?php

declare(strict_types=1);

function divide(int $a, int $b): int
{
    if ($b === 0) {
        throw new Exception("Division by zero is not allowed.");
    }
    return $a / $b;
}

try {
    try {
        echo divide(10, 0);
    } catch (Exception $e) {
        echo "Caught exception: " . $e-&gt;getMessage();
        throw $e; // Rethrow the exception
    }
} catch (Exception $e) {
    echo "\nRethrown exception: " . $e-&gt;getMessage();
}

In this program, the exception is caught, logged, and then rethrown to be
handled by an outer catch block.

$ php main.php
Caught exception: Division by zero is not allowed.
Rethrown exception: Division by zero is not allowed.

## Exception Hierarchy

The following example demonstrates how to catch exceptions based on their
hierarchy.

main.php
    

&lt;?php

declare(strict_types=1);

class CustomException extends Exception {}
class AnotherException extends CustomException {}

function testException()
{
    throw new AnotherException("Another exception occurred.");
}

try {
    testException();
} catch (AnotherException $e) {
    echo "Caught AnotherException: " . $e-&gt;getMessage();
} catch (CustomException $e) {
    echo "Caught CustomException: " . $e-&gt;getMessage();
} catch (Exception $e) {
    echo "Caught Exception: " . $e-&gt;getMessage();
}

In this program, the AnotherException is caught first because it
is more specific than CustomException and Exception.

$ php main.php
Caught AnotherException: Another exception occurred.

## Source

[PHP Exceptions - Documentation](https://www.php.net/manual/en/language.exceptions.php)

In this article, we have shown how to use exceptions in PHP for
error handling. Exceptions are a powerful tool for managing errors and
maintaining control over the program flow.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).