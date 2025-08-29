+++
title = "JavaScript Array.isArray method"
date = 2025-08-29T20:02:01.448+01:00
draft = false
description = "JavaScript Array.isArray() tutorial shows how to check for array types in JavaScript. The tutorial provides numerous examples to demonstrate array type checking in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Array.isArray method

last modified April 4, 2025

 

In this article we show how to check for array types using the
Array.isArray method in JavaScript.

## Array type checking

The Array.isArray method determines whether the passed value is
an array. It returns true if the value is an array, and false
otherwise. This method is particularly useful for type checking in JavaScript.

Unlike the typeof operator which returns "object" for arrays, 
Array.isArray specifically identifies array objects. This makes
it the most reliable way to check for arrays in JavaScript code.

The method was introduced in ECMAScript 5 to solve the problem of reliably
detecting arrays across different execution contexts. It works even when
arrays are created in different frames or windows.

## Basic Array.isArray() example

The following example demonstrates the basic usage of the Array.isArray
method.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
const notArray = 'This is a string';

console.log(Array.isArray(fruits));    // true
console.log(Array.isArray(notArray));  // false

We check two different values with Array.isArray. The first is
an actual array which returns true, while the second is a string which returns
false. This demonstrates the method's basic functionality.

$ node main.js
true
false

## Checking different value types

The Array.isArray method can distinguish arrays from other
JavaScript objects and primitives.

main.js
  

console.log(Array.isArray([]));           // true
console.log(Array.isArray({}));           // false
console.log(Array.isArray(null));         // false
console.log(Array.isArray(undefined));    // false
console.log(Array.isArray(123));          // false
console.log(Array.isArray('array'));      // false
console.log(Array.isArray(true));         // false

We test various JavaScript types with Array.isArray. Only the
empty array literal returns true. All other types including objects, null,
undefined, numbers, strings, and booleans return false.

$ node main.js
true
false
false
false
false
false
false

## Checking array-like objects

Some objects in JavaScript resemble arrays but aren't true arrays.
Array.isArray can distinguish between them.

main.js
  

const realArray = [1, 2, 3];
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

console.log(Array.isArray(realArray));  // true
console.log(Array.isArray(arrayLike));  // false

We compare a real array with an array-like object. While both have indexed
properties and a length property, only the real array passes the
Array.isArray check. This is important for functions that
need to handle both array types differently.

$ node main.js
true
false

## Checking arguments object

The arguments object available inside functions is another
array-like object that isn't a true array.

main.js
  

function test() {
  console.log(Array.isArray(arguments));
}

test(1, 2, 3);

Inside a function, we check if the arguments object is an array.
Despite its array-like behavior (numeric indices and length property), it
returns false because it's not a true array. Modern JavaScript often uses
rest parameters instead of arguments for better array compatibility.

$ node main.js
false

## Checking across execution contexts

Array.isArray works correctly even when checking arrays from
different execution contexts like iframes or windows.

main.js
  

// Simulating an array from another context
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const foreignArray = window.frames[window.frames.length-1].Array;
const arr = new foreignArray(1, 2, 3);

console.log(Array.isArray(arr));  // true
document.body.removeChild(iframe);

We create an iframe to simulate a different execution context and check an
array created in that context. Unlike the instanceof check,
Array.isArray correctly identifies the foreign array as a
true array. This demonstrates its reliability across different contexts.

$ node main.js
true

## Source

[Array.isArray() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

In this article we have demonstrated how to use the Array.isArray
method to check for array types in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)