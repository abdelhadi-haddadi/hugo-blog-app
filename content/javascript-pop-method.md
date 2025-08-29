+++
title = "JavaScript pop method"
date = 2025-08-29T20:02:10.408+01:00
draft = false
description = "JavaScript pop tutorial shows how to remove elements from arrays in JavaScript. The tutorial provides numerous examples to demonstrate array element removal in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript pop method

last modified April 4, 2025

 

In this article we show how to remove elements from arrays using the pop method
in JavaScript.

## Array pop operation

The pop method removes the last element from an array and returns
that element. This method changes the length of the array. If the array is empty,
pop returns undefined and the array remains unchanged.

The pop method is a mutating method that directly modifies the
original array. It is the opposite of the push method which adds
elements to the end of an array. The pop method is commonly used
when implementing stack-like behavior in JavaScript.

Since pop modifies the original array, it should be used with
caution when you need to preserve the original array contents. For immutable
operations, consider using array slicing instead.

## Basic pop example

The following example demonstrates the basic usage of the pop
method.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
const removedFruit = fruits.pop();

console.log(fruits);      // Modified array
console.log(removedFruit); // Removed element

We create an array of fruits and remove the last element. The pop
method returns the removed element while modifying the original array. The array's
length is reduced by one.

$ node main.js
[ 'apple', 'banana' ]
orange

## Popping from an empty array

The behavior of pop when called on an empty array.

main.js
  

const emptyArray = [];
const result = emptyArray.pop();

console.log(emptyArray);  // Still empty
console.log(result);      // undefined

When pop is called on an empty array, it returns undefined
and the array remains empty. This is important to check for in real-world
applications to avoid unexpected behavior.

$ node main.js
[]
undefined

## Using pop in a loop

The pop method can be used to process array elements in reverse order.

main.js
  

const numbers = [1, 2, 3, 4, 5];
while (numbers.length &gt; 0) {
    const num = numbers.pop();
    console.log(`Processing: ${num}`);
}
console.log(numbers); // Empty array

We use a while loop to process and remove all elements from the array. The loop
continues until the array is empty. This pattern is useful when you need to
process elements in last-in-first-out (LIFO) order.

$ node main.js
Processing: 5
Processing: 4
Processing: 3
Processing: 2
Processing: 1
[]

## Implementing a stack with pop

The pop method is essential for stack data structure implementation.

main.js
  

const stack = [];
stack.push('first');  // Add to top
stack.push('second');
stack.push('third');

console.log(stack.pop()); // Remove from top
console.log(stack.pop());
console.log(stack);

We demonstrate basic stack operations using push and pop.
The last element added is the first one removed (LIFO). This shows how JavaScript
arrays can be used as stacks.

$ node main.js
third
second
[ 'first' ]

## Combining pop with other methods

The pop method can be combined with other array methods for
complex operations.

main.js
  

const data = [10, 20, 30, 40, 50];
const lastTwo = [data.pop(), data.pop()].reverse();

console.log(data);    // Modified array
console.log(lastTwo); // Last two elements in original order

We remove the last two elements, store them in a new array, and reverse their
order. This demonstrates how pop can be part of more complex
array manipulations while maintaining readability.

$ node main.js
[ 10, 20, 30 ]
[ 40, 50 ]

## Source

[Array pop - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

In this article we have demonstrated how to use the pop() method to remove
elements from arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)