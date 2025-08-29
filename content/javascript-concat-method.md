+++
title = "JavaScript concat method"
date = 2025-08-29T20:02:02.586+01:00
draft = false
description = "JavaScript concat tutorial shows how to merge arrays in JavaScript. The tutorial provides numerous examples to demonstrate array concatenation in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript concat method

last modified April 4, 2025

 

In this article we show how to merge arrays using the concat method
in JavaScript.

## Array concatenation

Array concatenation is the operation of joining two or more arrays end-to-end.
The concat method is used to merge two or more arrays without
modifying the original arrays. Instead, it returns a new array containing the
joined elements.

This method is useful when you need to combine data from multiple sources while
preserving the original arrays. The concat method does not change
the existing arrays but returns a new array.

The concat method can take multiple array arguments or non-array
values. When non-array values are passed, they are added to the new array as
single elements. The original arrays remain unchanged after the concatenation
operation.

## Basic concat example

The following example demonstrates the basic usage of the concat
method.

main.js
  

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = arr1.concat(arr2);

console.log(arr1);  // Original array unchanged
console.log(arr2);  // Original array unchanged
console.log(arr3);  // New concatenated array

We create two arrays and concatenate them. The original arrays remain unmodified.
The concat() method returns a new array containing all elements from both arrays.

$ node main.js
[ 1, 2, 3 ]
[ 4, 5, 6 ]
[ 1, 2, 3, 4, 5, 6 ]

## Concatenating multiple arrays

The concat method can take multiple array arguments.

main.js
  

const letters = ['a', 'b'];
const numbers = [1, 2];
const symbols = ['!', '@'];
const combined = letters.concat(numbers, symbols);

console.log(combined);

We concatenate three arrays into one new array. The concat method
accepts multiple array arguments separated by commas. The elements are added in
the order the arrays are specified.

$ node main.js
[ 'a', 'b', 1, 2, '!', '@' ]

## Concatenating arrays and values

The concat() method can also take non-array values as arguments.

main.js
  

const colors = ['red', 'green'];
const newColors = colors.concat('blue', ['yellow', 'purple']);

console.log(newColors);

We concatenate an array with a string and another array. The string is added as
a single element. The nested array's elements are added individually, not as a
nested array.

$ node main.js
[ 'red', 'green', 'blue', 'yellow', 'purple' ]

## Concatenating nested arrays

The concat method does not recursively flatten nested arrays.

main.js
  

const arr1 = [1, 2, [3, 4]];
const arr2 = [[5, 6], 7, 8];
const combined = arr1.concat(arr2);

console.log(combined);

When concatenating arrays containing nested arrays, the nested arrays remain
as single elements in the resulting array. The concat() method does not
flatten the nested structures.

$ node main.js
[ 1, 2, [ 3, 4 ], [ 5, 6 ], 7, 8 ]

## Using concat to copy an array

The concat method can be used to create a shallow copy of an array.

main.js
  

const original = [1, 2, 3];
const copy = original.concat();

console.log(original);
console.log(copy);
console.log(original === copy);  // false - different references

Calling concat without arguments creates a new array with the same
elements. This creates a shallow copy where primitive values are copied, but
object references are shared between arrays.

$ node main.js
[ 1, 2, 3 ]
[ 1, 2, 3 ]
false

## Source

[Array concat - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

In this article we have demonstrated how to use the concat() method to merge
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)