+++
title = "JavaScript reverse method"
date = 2025-08-29T20:02:11.557+01:00
draft = false
description = "JavaScript reverse tutorial shows how to reverse arrays in JavaScript. The tutorial provides numerous examples to demonstrate array reversal in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript reverse method

last modified April 4, 2025

 

In this article we show how to reverse arrays using the reverse method
in JavaScript.

## Array reversal

Array reversal is the operation of changing the order of elements in an array.
The reverse method reverses the order of elements in an array in
place. The first element becomes last, and the last element becomes first.

This method modifies the original array and returns a reference to the same
array. Unlike some array methods, reverse does not create a new
array but changes the existing one.

The reverse method is useful when you need to process elements in
reverse order or display data from newest to oldest. It works with all types
of array elements including numbers, strings, and objects.

## Basic reverse example

The following example demonstrates the basic usage of the reverse
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
fruits.reverse();

console.log(fruits);

We create an array of fruits and reverse its order. The original array is
modified directly. The first element becomes last and vice versa.

$ node main.js
[ 'cherry', 'banana', 'apple' ]

## Reversing an array of numbers

The reverse method works with arrays containing any data type.

main.js
  

const numbers = [1, 2, 3, 4, 5];
numbers.reverse();

console.log(numbers);

We reverse an array of numbers. The method works the same way regardless of
the element type. The original array is modified in place.

$ node main.js
[ 5, 4, 3, 2, 1 ]

## Reversing and creating a new array

To reverse an array without modifying the original, we can create a copy first.

main.js
  

const original = ['a', 'b', 'c'];
const reversed = [...original].reverse();

console.log(original);
console.log(reversed);

We use the spread operator to create a shallow copy of the array before
reversing. This preserves the original array while giving us a reversed
version.

$ node main.js
[ 'a', 'b', 'c' ]
[ 'c', 'b', 'a' ]

## Reversing a string using reverse

We can use reverse with string manipulation by converting to an array.

main.js
  

const str = 'hello';
const reversedStr = str.split('').reverse().join('');

console.log(reversedStr);

We split the string into an array of characters, reverse the array, then join
it back into a string. This is a common technique for string reversal in JS.

$ node main.js
olleh

## Reversing nested arrays

The reverse method only reverses the top-level array elements.

main.js
  

const nested = [[1, 2], [3, 4], [5, 6]];
nested.reverse();

console.log(nested);

When reversing an array containing nested arrays, the nested arrays themselves
are reversed as elements. Their internal order remains unchanged.

$ node main.js
[ [ 5, 6 ], [ 3, 4 ], [ 1, 2 ] ]

## Source

[Array reverse - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

In this article we have demonstrated how to use the reverse() method to reverse
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)