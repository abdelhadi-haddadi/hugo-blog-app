+++
title = "JavaScript slice method"
date = 2025-08-29T20:02:12.670+01:00
draft = false
description = "JavaScript slice tutorial shows how to extract array elements in JavaScript. The tutorial provides numerous examples to demonstrate array slicing in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript slice method

last modified April 4, 2025

 

In this article we show how to extract array elements using the slice
method in JavaScript.

## Array slicing

Array slicing is the operation of extracting a portion of an array into a new
array. The slice method returns a shallow copy of a portion of an
array into a new array object. The original array is not modified.

This method takes two optional parameters: start and end index. The start index
is inclusive, while the end index is exclusive. If no parameters are provided,
it returns a copy of the entire array.

Negative indices can be used to indicate positions from the end of the array.
The slice method is commonly used when you need to work with a
subset of an array while preserving the original data.

## Basic slice example

The following example demonstrates the basic usage of the slice
method.

main.js
  

const fruits = ['apple', 'banana', 'orange', 'mango', 'kiwi'];
const citrus = fruits.slice(1, 3);

console.log(fruits);  // Original array unchanged
console.log(citrus);  // New sliced array

We create an array of fruits and extract elements from index 1 to 3 (exclusive).
The original array remains unmodified. The slice() method returns a new array
containing the selected elements.

$ node main.js
[ 'apple', 'banana', 'orange', 'mango', 'kiwi' ]
[ 'banana', 'orange' ]

## Using negative indices

The slice method can accept negative indices to count from the end of the array.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const lastThree = numbers.slice(-3);

console.log(numbers);
console.log(lastThree);

We extract the last three elements using a negative start index. When only one
negative parameter is provided, slice extracts from that position to the end.
Negative indices count backward from the end of the array.

$ node main.js
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
[ 6, 7, 8 ]

## Omitting the end parameter

When the end parameter is omitted, slice extracts to the end of the array.

main.js
  

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const fromSecond = colors.slice(1);

console.log(colors);
console.log(fromSecond);

We slice the array starting from index 1 to the end. The end parameter defaults
to the array length when omitted. This is useful for getting all elements after
a certain position.

$ node main.js
[ 'red', 'green', 'blue', 'yellow', 'purple' ]
[ 'green', 'blue', 'yellow', 'purple' ]

## Copying an entire array

The slice method can create a shallow copy of an entire array.

main.js
  

const original = [10, 20, 30];
const copy = original.slice();

console.log(original);
console.log(copy);
console.log(original === copy);  // false - different references

Calling slice without parameters creates a new array with all
elements. This creates a shallow copy where primitive values are duplicated,
but object references are shared between arrays.

$ node main.js
[ 10, 20, 30 ]
[ 10, 20, 30 ]
false

## Combining positive and negative indices

The slice method can combine positive and negative indices in the same call.

main.js
  

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const middle = letters.slice(2, -2);

console.log(letters);
console.log(middle);

We extract elements starting from index 2 up to (but not including) the second
element from the end. This demonstrates how positive and negative indices can
work together to select a specific range.

$ node main.js
[ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
[ 'c', 'd', 'e' ]

## Source

[Array slice - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

In this article we have demonstrated how to use the slice() method to extract
array elements in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)