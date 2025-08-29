+++
title = "JavaScript try/catch/finally keywords"
date = 2025-08-29T20:01:42.721+01:00
draft = false
description = "Master error handling in JavaScript using try, catch, and finally blocks, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript try/catch/finally keywords

last modified April 16, 2025

In this article we show how to handle errors using the try/catch/finally
keywords in JavaScript.

## The try/catch/finally keywords

The try/catch/finally statement marks a block of code to try and
specifies a response should an exception be thrown. It allows graceful error
handling rather than abrupt program termination.

The try block contains code that might throw an exception. The
catch block contains code to handle the exception. The
finally block executes after try/catch regardless of outcome.

JavaScript errors can be thrown by the runtime or explicitly using the
throw statement. The try/catch/finally construct provides
structured exception handling similar to other programming languages.

## Basic try/catch example

The following example demonstrates the basic usage of try/catch.

main.js
  

try {
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    console.log('An error occurred:', error.message);
}

This code attempts to execute riskyOperation() which might throw
an error. If an error occurs, execution jumps to the catch block. The error
object contains details about what went wrong.

$ node main.js
An error occurred: riskyOperation is not defined

## Catching specific error types

JavaScript allows catching specific error types for more precise handling.

main.js
  

try {
    JSON.parse('invalid json');
} catch (error) {
    if (error instanceof SyntaxError) {
        console.log('Syntax error:', error.message);
    } else {
        console.log('Unexpected error:', error);
    }
}

This example specifically checks for SyntaxError when parsing JSON.
Different error types can be handled differently. The instanceof
operator checks the error type.

$ node main.js
Syntax error: Unexpected token i in JSON at position 0

## The finally block

The finally block executes regardless of whether an error occurred.

main.js
  

let connection = { open: true };

try {
    console.log('Using connection');
    throw new Error('Network failure');
} catch (error) {
    console.log('Error:', error.message);
} finally {
    connection.open = false;
    console.log('Connection closed');
}

Here, finally ensures the connection is properly closed even if
an error occurs. This is useful for cleanup operations like closing files or
database connections.

$ node main.js
Using connection
Error: Network failure
Connection closed

## Nested try/catch blocks

Try/catch blocks can be nested to handle errors at different levels.

main.js
  

try {
    try {
        nonExistentFunction();
    } catch (innerError) {
        console.log('Inner catch:', innerError.message);
        throw new Error('Wrapped error');
    }
} catch (outerError) {
    console.log('Outer catch:', outerError.message);
}

This example shows nested error handling. The inner catch handles the initial
error, then throws a new error caught by the outer catch. This allows error
wrapping and rethrowing.

$ node main.js
Inner catch: nonExistentFunction is not defined
Outer catch: Wrapped error

## Custom error throwing

You can throw custom errors using the throw statement.

main.js
  

function validateAge(age) {
    if (age &lt; 0) {
        throw new Error('Age cannot be negative');
    }
    if (age &gt; 120) {
        throw new RangeError('Age seems invalid');
    }
    return age;
}

try {
    validateAge(150);
} catch (error) {
    console.log(error.name + ':', error.message);
}

This function throws different error types based on validation failures.
Custom errors provide meaningful feedback about what went wrong. Error types
help categorize different failure scenarios.

$ node main.js
RangeError: Age seems invalid

## Async/await with try/catch

Try/catch works with async functions to handle promise rejections.

main.js
  

async function fetchData() {
    try {
        let response = await fetch('https://invalid.url');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Fetch failed:', error.message);
    }
}

fetchData();

This example shows error handling in async code. The try/catch block catches
both network errors and JSON parsing errors. Async/await makes promise-based
error handling more intuitive.

$ node main.js
Fetch failed: fetch failed

## Error object properties

Error objects contain useful properties for debugging.

main.js
  

try {
    null.someProperty;
} catch (error) {
    console.log('Name:', error.name);
    console.log('Message:', error.message);
    console.log('Stack:', error.stack.split('\n')[0]);
}

This code demonstrates common error properties. The name identifies
the error type. message provides a human-readable description.
stack contains the call stack trace for debugging.

$ node main.js
Name: TypeError
Message: Cannot read properties of null (reading 'someProperty')
Stack: TypeError: Cannot read properties of null (reading 'someProperty')

## Source

[try/catch - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

In this article we have demonstrated how to use try/catch/finally for error
handling in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)