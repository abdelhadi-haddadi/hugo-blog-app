+++
title = "JavaScript typeof keyword"
date = 2025-08-29T20:01:42.702+01:00
draft = false
description = "Learn how to check data types in JavaScript using the typeof keyword, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript typeof keyword

last modified April 16, 2025

In this article we show how to check data types using the typeof
operator in JavaScript.

## The typeof keyword

The typeof operator returns a string indicating the type of the
unevaluated operand. It's useful for type checking and debugging in JavaScript.
The operator can be used with or without parentheses.

JavaScript is a dynamically typed language, meaning variables can hold values
of any type. The typeof operator helps determine what type of
value a variable currently contains.

The operator returns one of these strings: "undefined", "boolean", "number",
"string", "bigint", "symbol", "function", or "object". Note that for arrays
and null, it returns "object".

## Basic typeof usage

The following example demonstrates the basic usage of the typeof
operator.

main.js
  

console.log(typeof 42);          // "number"
console.log(typeof 'hello');     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"

This shows typeof returning the type of various primitive values.
Note that null returns "object", which is a known quirk in
JavaScript. The operator works with both literals and variables.

$ node main.js
number
string
boolean
undefined
object

## Checking variable types

typeof is commonly used to check the type of variables.

main.js
  

let age = 30;
let name = 'John';
let isActive = true;
let user = { id: 1 };
let colors = ['red', 'green'];

console.log(typeof age);      // "number"
console.log(typeof name);    // "string"
console.log(typeof isActive);// "boolean"
console.log(typeof user);    // "object"
console.log(typeof colors);   // "object"

This example checks the types of different variables. Note that both objects
and arrays return "object". To distinguish arrays, use Array.isArray()
instead.

$ node main.js
number
string
boolean
object
object

## Checking function types

Functions have their own special return value from typeof.

main.js
  

function greet() {
    return 'Hello';
}

const arrowFunc = () =&gt; console.log('Hi');

console.log(typeof greet);       // "function"
console.log(typeof arrowFunc);   // "function"
console.log(typeof Math.max);    // "function"
console.log(typeof class {});    // "function"

All function types return "function" when used with typeof. This
includes regular functions, arrow functions, built-in functions, and class
constructors. Functions are callable objects in JavaScript.

$ node main.js
function
function
function
function

## Checking undefined variables

typeof is safe to use with undeclared variables.

main.js
  

let declaredButUndefined;
console.log(typeof declaredButUndefined);  // "undefined"
console.log(typeof nonExistentVariable);    // "undefined"

if (typeof nonExistentVariable === 'undefined') {
    console.log('Variable does not exist');
}

Unlike other operations, typeof won't throw a ReferenceError for
undeclared variables. This makes it useful for checking variable existence
before use. Both undeclared and undefined variables return "undefined".

$ node main.js
undefined
undefined
Variable does not exist

## Type checking objects and arrays

typeof has limitations when checking objects and arrays.

main.js
  

const obj = { a: 1 };
const arr = [1, 2, 3];
const date = new Date();
const regex = /pattern/;

console.log(typeof obj);    // "object"
console.log(typeof arr);    // "object"
console.log(typeof date);   // "object"
console.log(typeof regex);  // "object"

All object types return "object", making typeof insufficient for
distinguishing between different object types. For more precise checks, use
instanceof or constructor checks.

$ node main.js
object
object
object
object

## Type checking with operators

typeof can be combined with other operators for type checking.

main.js
  

function processValue(value) {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else if (typeof value === 'number') {
        return value * 2;
    } else if (typeof value === 'boolean') {
        return !value;
    }
    return 'Unsupported type';
}

console.log(processValue('hello'));  // "HELLO"
console.log(processValue(10));      // 20
console.log(processValue(true));    // false
console.log(processValue(null));    // "Unsupported type"

This example shows a practical use of typeof to handle different
types differently. The function processes values based on their type, using
appropriate operations for each case.

$ node main.js
HELLO
20
false
Unsupported type

## Edge cases with typeof

There are some edge cases to be aware of when using typeof.

main.js
  

console.log(typeof NaN);            // "number"
console.log(typeof Infinity);       // "number"
console.log(typeof document.all);   // "undefined" (legacy)
console.log(typeof BigInt(10));    // "bigint"
console.log(typeof Symbol('id'));  // "symbol"

These examples show some special cases. NaN is technically a number,
while document.all is a legacy case that returns "undefined".
Newer types like BigInt and Symbol have their own
type strings.

$ node main.js
number
number
undefined
bigint
symbol

## Source

[typeof - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

In this article we have demonstrated how to use the typeof operator to check
data types in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)