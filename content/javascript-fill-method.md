+++
title = "JavaScript fill method"
date = 2025-08-29T20:02:03.698+01:00
draft = false
description = "JavaScript fill tutorial shows how to fill arrays in JavaScript. The tutorial provides numerous examples to demonstrate array filling in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript fill method

last modified April 4, 2025

 

In this article we show how to fill arrays using the fill method
in JavaScript.

## Array filling

The fill method changes all elements in an array to a static value.
It modifies the original array and returns the modified array. The method can
take up to three arguments: value, start index, and end index.

This method is useful when you need to initialize an array with default values
or reset existing array values. The fill method works with both
empty and populated arrays. It can fill the entire array or just a portion.

The fill method is a mutating method that changes the array's
contents. Unlike some array methods, it does not create a new array. The
original array is modified directly by this operation.

## Basic fill example

The following example demonstrates the basic usage of the fill
method.

main.js
  

const arr = [1, 2, 3, 4, 5];
arr.fill(0);

console.log(arr);

We create an array and fill all its elements with the value 0. The original
array is modified. The fill method returns the modified array but
we don't need to capture it since the original array is changed.

$ node main.js
[ 0, 0, 0, 0, 0 ]

## Filling with start index

The fill method can take a start index to begin filling from.

main.js
  

const fruits = ['apple', 'banana', 'cherry', 'date'];
fruits.fill('orange', 2);

console.log(fruits);

We fill the array starting from index 2. Elements before index 2 remain
unchanged. The fill operation continues to the end of the array when no
end index is specified.

$ node main.js
[ 'apple', 'banana', 'orange', 'orange' ]

## Filling with start and end index

The fill method can take both start and end indexes to fill a specific range.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6];
numbers.fill(9, 1, 4);

console.log(numbers);

We fill the array with value 9 from index 1 up to but not including index 4.
The end index is exclusive. The original array is modified with the new values
in the specified range.

$ node main.js
[ 1, 9, 9, 9, 5, 6 ]

## Filling an empty array

The fill method can be used with empty arrays created with a
specific length.

main.js
  

const emptyArray = new Array(5);
emptyArray.fill('default');

console.log(emptyArray);

We create an empty array of length 5 and fill all elements with 'default'.
This is a common pattern for initializing arrays with default values. The
fill method works on sparse arrays created with the Array
constructor.

$ node main.js
[ 'default', 'default', 'default', 'default', 'default' ]

## Filling with objects

When filling arrays with objects, all elements reference the same object.

main.js
  

const objArray = new Array(3).fill({ value: 0 });
objArray[0].value = 5;

console.log(objArray);

We create an array filled with objects. Changing one object's property affects
all elements because they reference the same object. For independent objects,
use Array.from with a mapping function instead.

$ node main.js
[ { value: 5 }, { value: 5 }, { value: 5 } ]

## Source

[Array fill - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

In this article we have demonstrated how to use the fill() method to modify
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)