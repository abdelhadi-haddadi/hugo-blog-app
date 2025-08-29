+++
title = "JavaScript at method"
date = 2025-08-29T20:02:02.540+01:00
draft = false
description = "JavaScript at() tutorial shows how to access array elements in JavaScript. The tutorial provides numerous examples to demonstrate element access in JS arrays."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript at method

last modified April 4, 2025

 

In this article we show how to access array elements using the at
method in JavaScript.

## Array element access

The at method takes an integer value and returns the item at that
index. It allows positive and negative integers, where negative integers count
back from the last item in the array.

This method provides a more readable alternative to bracket notation, especially
for accessing elements from the end of an array. It was introduced in ES2022 to
simplify common array access patterns.

The at method works similarly to bracket notation but with better
handling of negative indices. It returns undefined if the index is
out of bounds, just like bracket notation.

## Basic at() example

The following example demonstrates the basic usage of the at
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
console.log(fruits.at(0));   // First element
console.log(fruits.at(-1));  // Last element
console.log(fruits.at(5));   // Out of bounds

We create an array and access elements using positive and negative indices.
The at method provides a clean way to access elements from both
ends of the array.

$ node main.js
apple
cherry
undefined

## Comparing at() with bracket notation

The at method provides similar functionality to bracket notation
but with better readability for negative indices.

main.js
  

const colors = ['red', 'green', 'blue'];

// Using bracket notation
const last1 = colors[colors.length - 1];

// Using at()
const last2 = colors.at(-1);

console.log(last1);
console.log(last2);

We compare accessing the last element using both bracket notation and the
at method. The at version is more concise and
readable when working with elements at the end of arrays.

$ node main.js
blue
blue

## Using at() with strings

The at method also works with strings, providing character access
by position.

main.js
  

const message = "Hello World";
console.log(message.at(0));    // First character
console.log(message.at(-1));   // Last character
console.log(message.at(-3));   // Third from last

We use at to access characters in a string. The method works
identically for strings as it does for arrays, supporting both positive and
negative indices.

$ node main.js
H
d
r

## at() with typed arrays

The at method is also available on typed arrays like Int8Array.

main.js
  

const intArray = new Int8Array([10, 20, 30, 40]);
console.log(intArray.at(1));   // Second element
console.log(intArray.at(-2));  // Third element

We demonstrate using at with a typed array. The method behaves
consistently across different array-like objects in JavaScript, including typed
arrays.

$ node main.js
20
30

## Using at() in array methods

The at method can be used within other array methods for more
expressive code.

main.js
  

const numbers = [1, 2, 3, 4, 5];

const lastTwo = numbers.slice(-2).map((_, i, arr) =&gt; 
    arr.at(i - 1) + arr.at(i)
);

console.log(lastTwo);

We use at within a map callback to access adjacent
elements. This demonstrates how at can simplify array operations
that require relative indexing.

$ node main.js
[ 7, 9 ]

## Source

[Array at() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at)

In this article we have demonstrated how to use the at() method to access
elements in JavaScript arrays and strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)