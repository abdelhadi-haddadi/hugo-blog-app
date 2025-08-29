+++
title = "JavaScript void keyword"
date = 2025-08-29T20:01:43.829+01:00
draft = false
description = "Learn how to use the JavaScript void keyword for evaluating expressions without return values, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript void keyword

last modified April 16, 2025

In this article we explore the void keyword in JavaScript.
The void operator evaluates an expression and returns undefined.

## The void keyword

The void operator evaluates any given expression and then
returns undefined. It is a unary operator that precedes its operand.
The operand can be of any type. The void operator is rarely used in
modern JavaScript.

The primary use of void is to obtain the undefined primitive value.
This is useful when you want to ensure an expression has no return
value. It can also prevent unwanted behavior in certain contexts.

Void is commonly seen in older JavaScript code, particularly with
javascript: URLs. Modern JavaScript practices have reduced its usage.
However, understanding void remains important for legacy code.

## Basic void usage

The simplest use of void is to evaluate an expression and return undefined.

main.js
  

const result = void(5 + 3);
console.log(result);

Here, void evaluates the expression (5 + 3) but discards the result.
The variable result gets assigned undefined. The calculation happens
but the result isn't used.

$ node main.js
undefined

## Void with function calls

Void can be used to call functions while ignoring their return values.

main.js
  

function greet() {
    console.log('Hello!');
    return 'Greeting complete';
}

const output = void greet();
console.log(output);

The greet function executes and logs 'Hello!', but its return value
is discarded. The output variable receives undefined from the void
operator.

$ node main.js
Hello!
undefined

## Void in href attributes

A traditional use of void was in javascript: URLs to prevent navigation.

index.html
  

&lt;a href="javascript:void(0)" onclick="alert('Clicked!')"&gt;
    Click me
&lt;/a&gt;

This prevents the page from navigating when the link is clicked.
The void(0) returns undefined, which stops the default link behavior.
The onclick handler still executes normally.

## Void with IIFEs

Void can be used with Immediately Invoked Function Expressions (IIFEs).

main.js
  

void function() {
    console.log('IIFE executed');
}();

This pattern ensures the function's return value (if any) is discarded.
The void operator makes it clear the IIFE's purpose is side effects only.
This is an alternative to wrapping in parentheses.

$ node main.js
IIFE executed

## Void vs undefined

Void always returns undefined, but it's not the same as using undefined directly.

main.js
  

const a = void 0;
const b = undefined;

console.log(a === b);
console.log(typeof a);
console.log(typeof b);

Both variables contain undefined and are equal, but void is an operator
while undefined is a primitive value. In modern JS, using undefined
directly is preferred over void 0.

$ node main.js
true
undefined
undefined

## Void in arrow functions

Void can be used with arrow functions to ensure they return undefined.

main.js
  

const logMessage = (msg) =&gt; void console.log(msg);
const result = logMessage('Hello void');
console.log(result);

The arrow function logs the message but returns undefined due to void.
This pattern explicitly indicates the function shouldn't return a value.
It's clearer than just calling console.log without void.

$ node main.js
Hello void
undefined

## Void with async functions

Void can be used with async functions to ignore their promises.

main.js
  

async function fetchData() {
    // Simulate API call
    return { data: 'Sample data' };
}

void fetchData().then(() =&gt; console.log('Data fetched'));
console.log('Continuing execution');

Here, void is used to execute the async operation without handling
the promise. The code continues execution immediately. This pattern
is useful for fire-and-forget async operations.

$ node main.js
Continuing execution
Data fetched

## Source

[void - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)

In this article we have demonstrated how to use the void keyword in
JavaScript to evaluate expressions without return values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)