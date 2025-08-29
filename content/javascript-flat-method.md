+++
title = "JavaScript flat method"
date = 2025-08-29T20:02:05.977+01:00
draft = false
description = "JavaScript flat tutorial shows how to flatten arrays in JavaScript. The tutorial provides numerous examples to demonstrate array flattening in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript flat method

last modified April 4, 2025

 

In this article we show how to flatten arrays using the flat method
in JavaScript.

## Array flattening

Array flattening is the process of reducing the dimensionality of a nested array.
The flat method creates a new array with all sub-array elements
concatenated into it recursively up to the specified depth.

This method is useful when working with nested arrays and you need a single-level
array. The flat method does not modify the original array but
returns a new flattened array.

By default, flat only flattens one level deep. You can specify a
depth parameter to control how many levels to flatten. To flatten all levels,
use Infinity as the depth parameter.

## Basic flat example

The following example demonstrates the basic usage of the flat
method.

main.js
  

const arr = [1, 2, [3, 4]];
const flattened = arr.flat();

console.log(arr);        // Original array unchanged
console.log(flattened);  // New flattened array

We create a nested array and flatten it. The original array remains unmodified.
The flat() method returns a new array with one level of nesting removed.

$ node main.js
[ 1, 2, [ 3, 4 ] ]
[ 1, 2, 3, 4 ]

## Flattening multiple levels

The flat method can take a depth parameter to control flattening levels.

main.js
  

const arr = [1, [2, [3, [4, 5]]];
const flattened = arr.flat(2);

console.log(flattened);

We flatten an array with multiple levels of nesting. The depth parameter of 2
means we flatten two levels deep. The result still contains one level of nesting.

$ node main.js
[ 1, 2, 3, [ 4, 5 ] ]

## Fully flattening an array

To completely flatten an array regardless of nesting depth, use Infinity.

main.js
  

const deeplyNested = [1, [2, [3, [4, [5]]]]];
const fullyFlattened = deeplyNested.flat(Infinity);

console.log(fullyFlattened);

We use Infinity as the depth parameter to flatten all levels of
nesting. This works regardless of how deeply nested the original array is.

$ node main.js
[ 1, 2, 3, 4, 5 ]

## Flat with empty slots

The flat method removes empty slots in arrays when flattening.

main.js
  

const arr = [1, 2, , 4, 5];
const flattened = arr.flat();

console.log(flattened);

When flattening an array with empty slots, those empty slots are removed in the
result. This behavior is different from simply copying the array.

$ node main.js
[ 1, 2, 4, 5 ]

## Combining flat with map

The flat method is often combined with map for complex
transformations.

main.js
  

const arr = [1, 2, 3];
const result = arr.map(x =&gt; [x * 2]).flat();

console.log(result);

We first map each element to a new array, then flatten the result. This pattern
is so common that there's a separate flatMap method for it.

$ node main.js
[ 2, 4, 6 ]

## Source

[Array flat - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

In this article we have demonstrated how to use the flat() method to flatten
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)