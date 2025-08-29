+++
title = "JavaScript throw keyword"
date = 2025-08-29T20:01:41.617+01:00
draft = false
description = "Learn how to handle errors in JavaScript using the throw keyword, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript throw keyword

last modified April 16, 2025

In this article we show how to handle errors using the throw
keyword in JavaScript.

## The throw keyword

The throw keyword is used to create custom errors in JavaScript.
When executed, it stops the current function execution and passes control to
the first catch block in the call stack. If no catch block exists, the program
terminates.

You can throw any expression, but it's best practice to throw Error objects or
objects that inherit from Error. This provides consistent error handling and
access to stack traces. The throw statement is typically used with try-catch
blocks for proper error handling.

Unlike some languages, JavaScript allows throwing any value - strings, numbers,
objects. However, using Error objects is recommended for better debugging.
The throw statement is essential for creating robust, fault-tolerant code.

## Basic throw with string

The simplest example throws a string as an error.

main.js
  

try {
    throw "An error occurred";
} catch (e) {
    console.log("Caught:", e);
}

This demonstrates throwing a primitive string value. While possible, this isn't
recommended for production code. The catch block receives the thrown string and
logs it. This shows the basic throw-catch mechanism.

$ node main.js
Caught: An error occurred

## Throwing an Error object

A better practice is throwing an Error object.

main.js
  

try {
    throw new Error("Something went wrong");
} catch (e) {
    console.log("Error name:", e.name);
    console.log("Error message:", e.message);
    console.log("Stack trace:", e.stack);
}

Error objects provide more information than primitive values. They include a
stack trace for debugging. This example shows accessing the error's properties.
The Error constructor accepts a message describing the error.

$ node main.js
Error name: Error
Error message: Something went wrong
Stack trace: Error: Something went wrong
    at Object.&lt;anonymous&gt; (...)

## Custom error class

You can create custom error classes by extending Error.

main.js
  

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

try {
    throw new ValidationError("Invalid input");
} catch (e) {
    if (e instanceof ValidationError) {
        console.log("Custom error caught:", e.name, e.message);
    }
}

This creates a specialized error type for validation failures. Custom errors
allow for more specific error handling. The instanceof check verifies the error
type. This pattern is useful for creating domain-specific error hierarchies.

$ node main.js
Custom error caught: ValidationError Invalid input

## Throwing in functions

Functions can throw errors that are caught by calling code.

main.js
  

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}

try {
    console.log(divide(10, 0));
} catch (e) {
    console.log("Error:", e.message);
}

This shows throwing from a function when invalid input is detected. The calling
code handles the potential error. This is a common pattern for input validation.
The error propagates up the call stack until caught.

$ node main.js
Error: Division by zero

## Rethrowing errors

You can catch an error, handle it partially, then rethrow it.

main.js
  

function processData(data) {
    if (!data) {
        throw new Error("No data provided");
    }
    // Process data...
}

try {
    try {
        processData(null);
    } catch (e) {
        console.log("Logging error:", e.message);
        throw e; // Rethrow
    }
} catch (e) {
    console.log("Outer catch:", e.message);
}

This demonstrates error handling at multiple levels. The inner catch logs the
error before rethrowing. The outer catch handles the rethrown error. This is
useful when different layers need to handle errors differently.

$ node main.js
Logging error: No data provided
Outer catch: No data provided

## Throwing non-Error objects

While not recommended, you can throw any JavaScript value.

main.js
  

try {
    throw { 
        code: 404, 
        message: "Not Found",
        timestamp: new Date()
    };
} catch (e) {
    console.log(`Error ${e.code} at ${e.timestamp}: ${e.message}`);
}

This throws a custom object instead of an Error. While flexible, this approach
lacks stack traces and standard error properties. The catch block must know the
object's structure. This pattern is sometimes used for API error responses.

$ node main.js
Error 404 at Wed Apr 16 2025 12:00:00 GMT+0000: Not Found

## Practical use case: input validation

Here's a practical example of using throw for input validation.

main.js
  

function registerUser(user) {
    if (!user.name) {
        throw new Error("Name is required");
    }
    if (user.age &lt; 18) {
        throw new Error("User must be 18 or older");
    }
    // Registration logic...
    console.log("User registered:", user.name);
}

try {
    registerUser({ name: "John", age: 16 });
} catch (e) {
    console.log("Registration failed:", e.message);
}

This validates user input before processing. Each validation failure throws a
descriptive error. The calling code handles any validation errors gracefully.
This pattern ensures invalid data doesn't proceed further in the application.

$ node main.js
Registration failed: User must be 18 or older

## Source

[throw - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)

In this article we have demonstrated how to use the throw keyword for error
handling in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)