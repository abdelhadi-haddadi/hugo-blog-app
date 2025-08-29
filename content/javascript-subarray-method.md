+++
title = "JavaScript subarray method"
date = 2025-08-29T20:02:14.915+01:00
draft = false
description = "JavaScript subarray tutorial shows how to extract portions of arrays in JavaScript. The tutorial provides numerous examples to demonstrate array extraction in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript subarray method

last modified April 4, 2025

 

In this article we show how to extract portions of arrays using the
subarray method in JavaScript.

## Array extraction

Array extraction is the operation of creating a new array from a portion of
an existing array. The subarray method is used with typed arrays
to return a new typed array on the same ArrayBuffer.

This method is useful when you need to work with a subset of array elements
without modifying the original array. The subarray shares the
same memory as the original array.

The subarray method takes start and end index parameters. The
returned array includes elements from the start index up to but not including
the end index. Negative indices count from the end of the array.

## Basic subarray example

The following example demonstrates the basic usage of the subarray
method with a typed array.

main.js
  

const buffer = new ArrayBuffer(8);
const arr = new Int8Array(buffer);
arr.set([10, 20, 30, 40, 50, 60, 70, 80]);

const sub = arr.subarray(2, 5);

console.log('Original:', arr);
console.log('Subarray:', sub);

We create an Int8Array and extract elements from index 2 to 4 (5 is excluded).
The subarray shares the same buffer as the original array. Changes to one will
affect the other.

$ node main.js
Original: Int8Array(8) [
  10, 20, 30, 40,
  50, 60, 70, 80
]
Subarray: Int8Array(3) [ 30, 40, 50 ]

## Using negative indices

The subarray method accepts negative indices which count from the array end.

main.js
  

const buffer = new ArrayBuffer(12);
const arr = new Uint16Array(buffer);
arr.set([100, 200, 300, 400, 500, 600]);

const sub = arr.subarray(-4, -1);

console.log('Original:', arr);
console.log('Subarray:', sub);

We create a Uint16Array and extract elements using negative indices. -4 refers
to the 4th element from the end, -1 refers to the last element (excluded).

$ node main.js
Original: Uint16Array(6) [ 100, 200, 300, 400, 500, 600 ]
Subarray: Uint16Array(3) [ 300, 400, 500 ]

## Omitting end index

When the end index is omitted, subarray extracts to the end of the array.

main.js
  

const buffer = new ArrayBuffer(10);
const arr = new Int32Array(buffer);
arr.set([1, 2, 3, 4, 5]);

const sub = arr.subarray(2);

console.log('Original:', arr);
console.log('Subarray:', sub);

We create an Int32Array and extract elements from index 2 to the end. The
subarray includes all elements from the start index to the array's end.

$ node main.js
Original: Int32Array(5) [ 1, 2, 3, 4, 5 ]
Subarray: Int32Array(3) [ 3, 4, 5 ]

## Shared buffer behavior

The subarray shares the same buffer as the original array, so changes are visible
in both.

main.js
  

const buffer = new ArrayBuffer(16);
const arr = new Float64Array(buffer);
arr.set([1.1, 2.2, 3.3, 4.4]);

const sub = arr.subarray(1, 3);
sub[0] = 9.9;

console.log('Original:', arr);
console.log('Subarray:', sub);

We demonstrate that modifying the subarray affects the original array. Both
arrays share the same underlying buffer. This is different from slice() which
creates a copy.

$ node main.js
Original: Float64Array(4) [ 1.1, 9.9, 3.3, 4.4 ]
Subarray: Float64Array(2) [ 9.9, 3.3 ]

## Creating a full copy

To create a completely independent copy, you can combine subarray with slice.

main.js
  

const buffer = new ArrayBuffer(8);
const arr = new Uint8Array(buffer);
arr.set([10, 20, 30, 40, 50, 60, 70, 80]);

const copy = new Uint8Array(arr.subarray(2, 6).buffer.slice(0));

console.log('Original:', arr);
console.log('Copy:', copy);

copy[0] = 99;
console.log('After modification:');
console.log('Original:', arr);
console.log('Copy:', copy);

We create a true copy that doesn't share memory with the original. Modifying
the copy doesn't affect the original array. This technique creates a new
buffer for the copy.

$ node main.js
Original: Uint8Array(8) [
  10, 20, 30, 40,
  50, 60, 70, 80
]
Copy: Uint8Array(4) [ 30, 40, 50, 60 ]
After modification:
Original: Uint8Array(8) [
  10, 20, 30, 40,
  50, 60, 70, 80
]
Copy: Uint8Array(4) [ 99, 40, 50, 60 ]

## Source

[TypedArray subarray - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray)

In this article we have demonstrated how to use the subarray() method to extract
portions of typed arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)