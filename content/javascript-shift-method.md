+++
title = "JavaScript shift method"
date = 2025-08-29T20:02:12.673+01:00
draft = false
description = "JavaScript shift tutorial shows how to remove elements from arrays in JavaScript. The tutorial provides numerous examples to demonstrate array manipulation in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript shift method

last modified April 4, 2025

 

In this article we show how to remove elements from arrays using the shift method
in JavaScript.

## Array shift operation

The shift method removes the first element from an array and returns
that removed element. This method changes the length of the array. Unlike some
other array methods, shift modifies the original array directly.

This method is useful when you need to process elements in a queue-like fashion,
removing items from the front of the array. The shift operation
has a time complexity of O(n) as it needs to reindex all remaining elements.

If the array is empty, shift returns undefined and
the array remains unchanged. The method is often paired with push
to implement queue data structures in JavaScript.

## Basic shift example

The following example demonstrates the basic usage of the shift
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const firstFruit = fruits.shift();

console.log(firstFruit);  // Removed element
console.log(fruits);      // Modified array

We create an array of fruits and remove its first element. The shift
method returns the removed element ('apple') and modifies the original array.
The array length decreases by one.

$ node main.js
apple
[ 'banana', 'cherry' ]

## Shifting from an empty array

The behavior of shift when called on an empty array.

main.js
  

const emptyArray = [];
const result = emptyArray.shift();

console.log(result);       // undefined
console.log(emptyArray);   // Still empty

When shift is called on an empty array, it returns undefined
without modifying the array. This behavior is important to handle in code to
avoid unexpected errors when processing arrays that might be empty.

$ node main.js
undefined
[]

## Using shift in a loop

The shift method can be used to process all elements of an array.

main.js
  

const numbers = [1, 2, 3, 4, 5];

while (numbers.length &gt; 0) {
    const num = numbers.shift();
    console.log(`Processing: ${num}`);
}

console.log(numbers);  // Empty array

We use a while loop to process and remove all elements from the array. Each
iteration removes and processes the first element until the array is empty.
This approach completely consumes the array.

$ node main.js
Processing: 1
Processing: 2
Processing: 3
Processing: 4
Processing: 5
[]

## Shift with different data types

The shift method works with arrays containing any data type.

main.js
  

const mixedArray = [true, {name: 'John'}, 42, 'hello', null];
const firstElement = mixedArray.shift();

console.log(firstElement);
console.log(mixedArray);

We demonstrate that shift works with arrays containing booleans,
objects, numbers, strings, and null values. The method removes and returns
the first element regardless of its type, preserving references to objects.

$ node main.js
true
[ { name: 'John' }, 42, 'hello', null ]

## Implementing a queue with shift and push

The shift and push methods can implement a queue.

main.js
  

const queue = [];

// Enqueue items
queue.push('first');
queue.push('second');
queue.push('third');

// Dequeue items
while (queue.length &gt; 0) {
    const item = queue.shift();
    console.log(`Processing: ${item}`);
}

console.log(queue);  // Empty queue

We implement a simple queue using push to add items to the end
and shift to remove items from the front. This follows the
First-In-First-Out (FIFO) principle of queue data structures.

$ node main.js
Processing: first
Processing: second
Processing: third
[]

## Source

[Array shift - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

In this article we have demonstrated how to use the shift() method to remove
elements from arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)