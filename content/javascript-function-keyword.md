+++
title = "JavaScript function keyword"
date = 2025-08-29T20:01:20.148+01:00
draft = false
description = "JavaScript function keyword tutorial shows how to create reusable code blocks in JavaScript. The tutorial provides numerous examples to demonstrate function usage in JS."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript function keyword

last modified April 16, 2025

In this article we show how to create reusable code blocks using the
function keyword in JavaScript.

## The function keyword

The function keyword is used to define a function in JavaScript.
Functions are reusable blocks of code that perform specific tasks. They help
organize code into logical, maintainable units.

Functions can accept parameters (inputs) and return values (outputs). They
promote code reuse and make programs easier to understand and maintain.
Functions are first-class objects in JavaScript.

JavaScript supports several function declaration styles: function declarations,
function expressions, arrow functions, and more. The function
keyword is used in declarations and expressions.

## Basic function declaration

The following example demonstrates the basic usage of the function
keyword to declare a function.

main.js
  

function greet() {
    console.log('Hello, World!');
}

greet();

This is the simplest form of function declaration. The greet
function takes no parameters and returns no value. It simply logs a message
to the console when called.

$ node main.js
Hello, World!

## Function with parameters

Functions can accept parameters to make them more flexible and reusable.

main.js
  

function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('Alice');
greet('Bob');

This example shows a function that accepts a name parameter.
The function uses this parameter to personalize the greeting message.
Parameters allow functions to work with different input values.

$ node main.js
Hello, Alice!
Hello, Bob!

## Function with return value

Functions can return values using the return statement.

main.js
  

function square(number) {
    return number * number;
}

const result = square(5);
console.log(result);

This function calculates the square of a number and returns the result.
The returned value can be assigned to a variable or used in expressions.
Functions without a return statement return undefined.

$ node main.js
25

## Function expression

Functions can be defined using expressions, where the function is assigned
to a variable.

main.js
  

const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(3, 4));

This is a function expression. The function is anonymous (has no name) and
is assigned to the multiply variable. Function expressions are
often used for callbacks and methods.

$ node main.js
12

## Function hoisting

Function declarations are hoisted, meaning they can be called before they
are defined in the code.

main.js
  

console.log(add(2, 3));

function add(a, b) {
    return a + b;
}

This works because function declarations are moved to the top of their scope
during compilation. Note that function expressions are not hoisted in the
same way.

$ node main.js
5

## Default parameters

JavaScript supports default parameters for functions.

main.js
  

function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

greet();
greet('Alice');

Default parameters provide fallback values when arguments are not provided.
This makes functions more flexible and reduces the need for parameter
validation code.

$ node main.js
Hello, Guest!
Hello, Alice!

## Rest parameters

Functions can accept an indefinite number of arguments using rest parameters.

main.js
  

function sum(...numbers) {
    return numbers.reduce((total, num) =&gt; total + num, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4, 5));

Rest parameters collect all remaining arguments into an array. This is useful
for functions that need to handle variable numbers of arguments. The example
shows a function that sums any number of values.

$ node main.js
6
15

## Source

[function - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

In this article we have demonstrated how to use the function keyword to create
reusable code blocks in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)