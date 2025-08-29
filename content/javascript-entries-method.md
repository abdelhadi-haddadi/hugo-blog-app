+++
title = "JavaScript entries() method"
date = 2025-08-29T20:02:03.693+01:00
draft = false
description = "JavaScript entries() tutorial shows how to iterate arrays in JavaScript. The tutorial provides numerous examples to demonstrate array iteration in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript entries() method

last modified April 4, 2025

 

In this article we show how to iterate arrays using the entries method
in JavaScript.

## Array iteration with entries()

The entries method returns a new Array Iterator object that
contains key/value pairs for each index in the array. This method provides
a way to access both the index and value of array elements during iteration.

The iterator returned by entries follows the iterable protocol.
This means it can be used with for...of loops and other constructs
that consume iterables. Each iteration returns an array with two elements.

The first element is the index (key), and the second is the value at that index.
This is particularly useful when you need both the position and value of array
elements during processing. The original array remains unchanged.

## Basic entries() example

The following example demonstrates the basic usage of the entries
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const iterator = fruits.entries();

console.log(iterator.next().value); // [0, 'apple']
console.log(iterator.next().value); // [1, 'banana']
console.log(iterator.next().value); // [2, 'cherry']

We create an array iterator using entries and manually call
next to get each key/value pair. Each call returns an array
where index 0 is the position and index 1 is the value.

$ node main.js
[ 0, 'apple' ]
[ 1, 'banana' ]
[ 2, 'cherry' ]

## Using entries() with for...of loop

The entries method works particularly well with for...of
loops for clean iteration.

main.js
  

const colors = ['red', 'green', 'blue'];

for (const [index, color] of colors.entries()) {
    console.log(`Index ${index} has color ${color}`);
}

We use array destructuring in the for...of loop to directly
assign the index and value to variables. This provides a clean syntax for
accessing both position and value during iteration.

$ node main.js
Index 0 has color red
Index 1 has color green
Index 2 has color blue

## Converting entries() iterator to array

The iterator returned by entries can be converted to an array
using the spread operator or Array.from.

main.js
  

const letters = ['a', 'b', 'c'];
const entriesArray = [...letters.entries()];

console.log(entriesArray);

We convert the iterator to an array using the spread operator. The resulting
array contains subarrays, each representing an index/value pair from the
original array.

$ node main.js
[ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]

## Using entries() with sparse arrays

The entries method handles sparse arrays by including empty
slots in its iteration.

main.js
  

const sparseArray = [1, , 3];
const iterator = sparseArray.entries();

for (const [index, value] of iterator) {
    console.log(`Index ${index}:`, value);
}

We create a sparse array with an empty slot and iterate it with entries.
The empty slot is included in the iteration with its value being undefined.
This demonstrates how entries processes all array indices.

$ node main.js
Index 0: 1
Index 1: undefined
Index 2: 3

## Using entries() with array-like objects

The entries method can be used with array-like objects when
called via Array.prototype.entries.call.

main.js
  

const arrayLike = { 0: 'first', 1: 'second', length: 2 };
const iterator = Array.prototype.entries.call(arrayLike);

console.log([...iterator]);

We apply entries to an array-like object using call.
This demonstrates how to use array methods with objects that aren't true arrays
but have similar structure. The result shows key/value pairs for each property.

$ node main.js
[ [ 0, 'first' ], [ 1, 'second' ] ]

## Source

[Array entries() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

In this article we have demonstrated how to use the entries() method to iterate
arrays in JavaScript while accessing both indices and values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)