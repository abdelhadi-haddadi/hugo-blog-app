+++
title = "JavaScript true keyword"
date = 2025-08-29T20:01:41.621+01:00
draft = false
description = "Understand the true boolean literal in JavaScript, with examples and detailed explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript true keyword

last modified April 16, 2025

In this article we show how to use the true boolean literal in
JavaScript. The true keyword represents one of two possible
boolean values in JavaScript.

## The true keyword

The true keyword is one of JavaScript's boolean literals,
representing the logical true value. It's one of the primitive values in
JavaScript along with false, numbers, strings, etc.

Boolean values are fundamental in programming for making decisions and
controlling program flow. The true value is often the result
of comparison operations or logical expressions.

In JavaScript, true is not the same as truthy values. While
many values can be considered truthy in boolean contexts, true
is the explicit boolean value representing truth.

## Basic true value

The simplest way to use true is as a direct boolean value.

main.js
  

let isActive = true;

if (isActive) {
    console.log("The feature is active");
} else {
    console.log("The feature is inactive");
}

Here we assign true to a variable and use it in a conditional
statement. The if statement executes its block when the condition evaluates
to true. This demonstrates basic boolean variable usage.

$ node main.js
The feature is active

## Comparison returning true

Comparison operations often result in true or false.

main.js
  

let x = 10;
let y = 5;

let result = x &gt; y;
console.log(result);

if (x &gt; y) {
    console.log("x is greater than y");
}

The comparison x &gt; y evaluates to true because 10
is greater than 5. We store this result in a variable and also use it directly
in an if statement. This shows how comparisons generate boolean values.

$ node main.js
true
x is greater than y

## Logical AND operator

The logical AND operator (&amp;&amp;) returns true when both
operands are truthy.

main.js
  

let hasPermission = true;
let isLoggedIn = true;

let canAccess = hasPermission &amp;&amp; isLoggedIn;
console.log(canAccess);

if (hasPermission &amp;&amp; isLoggedIn) {
    console.log("Access granted");
}

When both variables are true, the AND operation returns
true. This is useful for checking multiple conditions that
must all be true. The result is stored and used directly in a condition.

$ node main.js
true
Access granted

## Logical OR operator

The logical OR operator (||) returns true if at
least one operand is truthy.

main.js
  

let isAdmin = false;
let isModerator = true;

let hasPrivileges = isAdmin || isModerator;
console.log(hasPrivileges);

if (isAdmin || isModerator) {
    console.log("User has privileges");
}

The OR operator returns true because one of the operands is
true. This demonstrates how to check if at least one condition
is met. The operation short-circuits when the first truthy value is found.

$ node main.js
true
User has privileges

## Boolean function

The Boolean() function can convert values to their boolean
representation.

main.js
  

let value1 = Boolean(1);
let value2 = Boolean("hello");
let value3 = Boolean(true);

console.log(value1);
console.log(value2);
console.log(value3);

The Boolean() function converts truthy values to true.
Non-zero numbers, non-empty strings, and true itself all convert
to true. This shows explicit boolean conversion.

$ node main.js
true
true
true

## Truthy vs true

It's important to distinguish between truthy values and the true
boolean.

main.js
  

let value = "hello";

if (value) {
    console.log("The string is truthy");
}

if (value === true) {
    console.log("The string equals true");
} else {
    console.log("The string doesn't equal true");
}

While the string is truthy (causing the first if to execute), it's not
equal to the boolean true. This demonstrates the difference
between truthy values and the actual true boolean literal.

$ node main.js
The string is truthy
The string doesn't equal true

## Default function parameter

The true value can be used as a default parameter in functions.

main.js
  

function greet(name, verbose = true) {
    if (verbose) {
        console.log(`Hello, ${name}! Welcome to our application.`);
    } else {
        console.log(`Hello, ${name}`);
    }
}

greet("John");
greet("Alice", false);

Here we use true as a default value for the verbose parameter.
When not specified, verbose defaults to true, showing the full greeting.
When set to false, a shorter version is displayed.

$ node main.js
Hello, John! Welcome to our application.
Hello, Alice

## Source

[Boolean - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

In this article we have demonstrated how to use the true boolean literal in
JavaScript programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)