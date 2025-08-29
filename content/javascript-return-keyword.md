+++
title = "JavaScript return keyword"
date = 2025-08-29T20:01:37.040+01:00
draft = false
description = "Learn how to use the return keyword in JavaScript to return values from functions, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript return keyword

last modified April 16, 2025

In this article we show how to use the return keyword to return
values from functions in JavaScript.

## The return keyword

The return keyword is used to specify the value that a function
should return when it is called. When JavaScript encounters a return statement,
it immediately exits the function and returns the specified value to the caller.

Functions in JavaScript can return any valid value: numbers, strings, objects,
arrays, other functions, or even no value (undefined). The return statement is
optional; functions without it implicitly return undefined.

The return keyword serves two main purposes: providing output from a function
and terminating function execution early. It's a fundamental part of function
behavior in JavaScript.

## Basic function return

The simplest use of return is to provide a value from a function.

main.js
  

function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log(result);

This example shows a basic function that returns the sum of two numbers. The
return statement calculates the sum and provides it as the function's result.
The returned value is then stored in the result variable.

$ node main.js
8

## Returning early from a function

Return can be used to exit a function before reaching its end.

main.js
  

function checkAge(age) {
    if (age &lt; 18) {
        return 'Minor';
    }
    return 'Adult';
}

console.log(checkAge(15));
console.log(checkAge(25));

Here, the function returns early if the age is less than 18. Otherwise, it
continues to the next return statement. This pattern is common for conditional
returns in functions.

$ node main.js
Minor
Adult

## Returning multiple values

While functions can only return one value, you can return multiple values using
an object or array.

main.js
  

function getPerson() {
    return {
        name: 'John Doe',
        age: 30,
        occupation: 'Developer'
    };
}

const person = getPerson();
console.log(person.name);

This function returns an object containing multiple properties. The caller can
then access any of these properties. This is a common pattern for grouping
related data.

$ node main.js
John Doe

## Returning functions

Functions can return other functions, enabling powerful patterns like closures.

main.js
  

function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const greetHello = createGreeter('Hello');
console.log(greetHello('Alice'));

Here, createGreeter returns a new function that remembers the greeting parameter.
This demonstrates how return can be used with higher-order functions to create
specialized functions.

$ node main.js
Hello, Alice!

## Returning nothing

Functions without a return statement implicitly return undefined.

main.js
  

function noReturn() {
    console.log('This function does not return anything');
}

const result = noReturn();
console.log(result);

This function performs an action (logging) but doesn't return a value. When we
assign its result to a variable, that variable gets undefined. This is common
for functions that perform side effects.

$ node main.js
This function does not return anything
undefined

## Return in arrow functions

Arrow functions have implicit return when using concise body syntax.

main.js
  

const square = x =&gt; x * x;
const cube = x =&gt; {
    return x * x * x;
};

console.log(square(4));
console.log(cube(3));

The first arrow function implicitly returns the result of x * x. The second uses
an explicit return statement. Both forms are valid but have different use cases.

$ node main.js
16
27

## Practical use case: input validation

Return is often used for early validation in functions.

main.js
  

function calculateArea(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number') {
        return 'Invalid input: width and height must be numbers';
    }
    if (width &lt;= 0 || height &lt;= 0) {
        return 'Invalid input: dimensions must be positive';
    }
    return width * height;
}

console.log(calculateArea(10, 'five'));
console.log(calculateArea(10, 5));

This function first validates its inputs, returning early with error messages if
validation fails. Only if all checks pass does it calculate and return the area.
This pattern makes functions more robust.

$ node main.js
Invalid input: width and height must be numbers
50

## Source

[return - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

In this article we have demonstrated how to use the return keyword to control
function output in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)