+++
title = "JavaScript Array.from() method"
date = 2025-08-29T20:02:01.452+01:00
draft = false
description = "JavaScript Array.from() tutorial shows how to create arrays from array-like objects in JavaScript. The tutorial provides numerous examples to demonstrate array creation in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Array.from() method

last modified April 4, 2025

 

In this article we show how to create arrays from array-like objects using the
Array.from method in JavaScript.

## Array.from() method

The Array.from method creates a new, shallow-copied Array instance
from an array-like or iterable object. It provides a way to convert objects that
are not arrays into proper arrays that can use array methods.

This method is particularly useful for working with DOM collections, arguments
objects, strings, and other iterable objects. The original object remains
unchanged, and a new array is returned with the converted elements.

The Array.from method can take an optional map function and
thisArg parameter. This allows transforming elements during the conversion
process. The method was introduced in ES6 to handle array-like objects more
conveniently.

## Basic Array.from() example

The following example demonstrates the basic usage of the Array.from
method with a string.

main.js
  

const str = 'hello';
const arr = Array.from(str);

console.log(str);  // Original string unchanged
console.log(arr);  // New array created from string

We convert a string into an array of characters. Each character becomes an
element in the new array. The original string remains unmodified by this
operation.

$ node main.js
hello
[ 'h', 'e', 'l', 'l', 'o' ]

## Creating array from Set

The Array.from method can convert Set objects into arrays.

main.js
  

const mySet = new Set([1, 2, 3, 3, 4, 5]);
const arr = Array.from(mySet);

console.log(mySet);  // Original Set
console.log(arr);    // New array (duplicates removed)

We create an array from a Set, which automatically removes duplicate values.
The resulting array contains only unique elements from the original Set.

$ node main.js
Set(5) { 1, 2, 3, 4, 5 }
[ 1, 2, 3, 4, 5 ]

## Using map function with Array.from()

The Array.from method can take a map function as second argument.

main.js
  

const arrLike = { length: 5 };
const arr = Array.from(arrLike, (v, i) =&gt; i * 2);

console.log(arr);

We create an array from an array-like object with length property. The map
function transforms each element during creation. Here we create an array of
even numbers.

$ node main.js
[ 0, 2, 4, 6, 8 ]

## Creating array from arguments object

The Array.from method is useful for converting the arguments
object in functions.

main.js
  

function test() {
    const args = Array.from(arguments);
    console.log(args);
}

test(1, 2, 3, 'a', 'b');

Inside the function, we convert the arguments object to a proper array. This
allows using array methods like map, filter, or reduce on the arguments.

$ node main.js
[ 1, 2, 3, 'a', 'b' ]

## Creating array from NodeList

The Array.from method is commonly used to convert DOM NodeLists.

main.js
  

// In a browser environment:
// const divs = document.querySelectorAll('div');
// const divArray = Array.from(divs);

// For demonstration in Node.js:
const fakeNodeList = { 0: 'div1', 1: 'div2', length: 2 };
const nodeArray = Array.from(fakeNodeList);

console.log(nodeArray);

We simulate converting a NodeList to an array. In real browser code, this allows
using array methods on DOM collections. The example shows the pattern even in
Node.js environment.

$ node main.js
[ 'div1', 'div2' ]

## Source

[Array.from() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

In this article we have demonstrated how to use the Array.from() method to create
arrays from array-like and iterable objects in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)