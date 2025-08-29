+++
title = "JavaScript from keyword"
date = 2025-08-29T20:01:19.053+01:00
draft = false
description = "JavaScript from keyword tutorial shows how to create arrays from array-like objects in JavaScript. The tutorial provides numerous examples to demonstrate array creation in JS."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript from keyword

last modified April 16, 2025

In this article we explore the Array.from() method in JavaScript.
It creates new arrays from array-like or iterable objects.

## The from keyword

Array.from() is a static method that creates a new array instance
from an array-like or iterable object. It was introduced in ES6 to provide
a cleaner way to convert objects to arrays.

The method takes three parameters: the source object, an optional mapping
function, and an optional this value for the mapping function. It works with
objects like NodeLists, strings, Sets, Maps, and array-like objects.

Unlike the spread operator, Array.from() can handle array-like
objects that don't have iterator methods. It's particularly useful for DOM
manipulation and working with function arguments.

## Basic Array.from() usage

The simplest use of Array.from() converts an array-like object.

main.js
  

const str = 'hello';
const arr = Array.from(str);
console.log(arr);

This example converts a string into an array of characters. Each character
becomes an element in the new array. The original string remains unchanged.

$ node main.js
[ 'h', 'e', 'l', 'l', 'o' ]

## Array.from() with mapping function

Array.from() can accept a mapping function as its second parameter.

main.js
  

const nums = Array.from([1, 2, 3], x =&gt; x * 2);
console.log(nums);

Here we double each element during the conversion. The mapping function is
applied to each element before it's added to the new array. This is more
efficient than mapping after creation.

$ node main.js
[ 2, 4, 6 ]

## Converting Set to array

Array.from() can convert Set objects to arrays.

main.js
  

const mySet = new Set([1, 2, 3, 3, 4]);
const uniqueArr = Array.from(mySet);
console.log(uniqueArr);

This example demonstrates removing duplicates by converting a Set to an array.
The resulting array contains only unique values. The duplicate 3 is removed.

$ node main.js
[ 1, 2, 3, 4 ]

## Working with NodeLists

Array.from() is commonly used to convert NodeLists to arrays.

main.js
  

// In a browser environment:
// const divs = document.querySelectorAll('div');
// const divArray = Array.from(divs);

// For demonstration:
const fakeNodeList = { 0: 'div1', 1: 'div2', length: 2 };
const nodeArray = Array.from(fakeNodeList);
console.log(nodeArray);

This shows how to convert DOM NodeLists to arrays for easier manipulation.
Array methods like map and filter can then be used. The example uses a mock
NodeList for demonstration.

$ node main.js
[ 'div1', 'div2' ]

## Creating arrays from objects with length

Array.from() can create arrays from objects with length property.

main.js
  

const obj = { length: 5 };
const arr = Array.from(obj, (v, i) =&gt; i * 2);
console.log(arr);

Here we create an array of even numbers using just an object with length.
The mapping function receives the value and index. The index is used to
generate values since the source object has none.

$ node main.js
[ 0, 2, 4, 6, 8 ]

## Array.from() vs spread operator

Compare Array.from() with the spread operator.

main.js
  

const str = 'hello';
const arrFrom = Array.from(str);
const arrSpread = [...str];

console.log(arrFrom);
console.log(arrSpread);

Both methods convert the string to an array, but Array.from()
works with more types of objects. The spread operator requires the object
to be iterable, while Array.from() works with array-like objects too.

$ node main.js
[ 'h', 'e', 'l', 'l', 'o' ]
[ 'h', 'e', 'l', 'l', 'o' ]

## Practical use case: Generating sequences

Array.from() can generate number sequences efficiently.

main.js
  

const range = (start, stop, step) =&gt; 
    Array.from({ length: (stop - start) / step + 1 }, 
    (_, i) =&gt; start + (i * step));

console.log(range(0, 10, 2));

This example creates a range of numbers from start to stop with given step.
The length is calculated based on the parameters. The mapping function
generates each value in the sequence.

$ node main.js
[ 0, 2, 4, 6, 8, 10 ]

## Source

[Array.from() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

In this article we have demonstrated how to use the Array.from() method to
create arrays from various sources in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)