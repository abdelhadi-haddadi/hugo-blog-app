+++
title = "JavaScript unshift method"
date = 2025-08-29T20:02:17.139+01:00
draft = false
description = "JavaScript unshift tutorial shows how to add elements to the beginning of an array in JavaScript. The tutorial provides examples to demonstrate array manipulation with unshift()."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript unshift method

last modified April 4, 2025

 

In this article we show how to add elements to the beginning of an array using
the unshift method in JavaScript.

## Array unshift operation

The unshift method adds one or more elements to the beginning of
an array and returns the new length of the array. Unlike concat,
unshift modifies the original array directly.

This method is useful when you need to prepend elements to an existing array.
The unshift method changes the length of the array and shifts all
existing elements to higher indices to make room for the new elements.

The unshift method can take multiple arguments. Each argument
becomes a new element at the start of the array. The elements are added in
the order they are provided to the method.

## Basic unshift example

The following example demonstrates the basic usage of the unshift
method.

main.js
  

const fruits = ['banana', 'apple'];
const newLength = fruits.unshift('orange');

console.log(fruits);    // Modified original array
console.log(newLength); // New array length

We create an array and add a new element to its beginning. The original array
is modified. The method returns the new length of the array.

$ node main.js
[ 'orange', 'banana', 'apple' ]
3

## Unshifting multiple elements

The unshift method can add multiple elements at once.

main.js
  

const numbers = [3, 4];
const newLength = numbers.unshift(1, 2);

console.log(numbers);
console.log(newLength);

We add two elements to the beginning of the array. The elements are added in
the order they are specified. The method returns the updated array length.

$ node main.js
[ 1, 2, 3, 4 ]
4

## Unshifting different data types

The unshift() method can handle elements of different data types.

main.js
  

const mixed = [true, {name: 'John'}];
mixed.unshift(42, 'hello', [1, 2]);

console.log(mixed);

We add a number, string, and array to the beginning of an array containing
a boolean and an object. JavaScript arrays can hold mixed data types.

$ node main.js
[ 42, 'hello', [ 1, 2 ], true, { name: 'John' } ]

## Unshifting to an empty array

The unshift method works with empty arrays.

main.js
  

const empty = [];
const newLength = empty.unshift('first', 'second');

console.log(empty);
console.log(newLength);

When unshifting to an empty array, the elements become the array's contents.
The method returns the count of added elements as the new array length.

$ node main.js
[ 'first', 'second' ]
2

## Performance considerations

The unshift method has O(n) time complexity as it must shift all
existing elements.

main.js
  

const bigArray = new Array(1000000).fill(0);
console.time('unshift');
bigArray.unshift(1);
console.timeEnd('unshift');

This example demonstrates the performance impact of unshifting to a large array.
The operation becomes slower as the array size increases due to element shifting.

$ node main.js
unshift: 5.234ms

## Source

[Array unshift - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

In this article we have demonstrated how to use the unshift() method to add
elements to the beginning of an array in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)