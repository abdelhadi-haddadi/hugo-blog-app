+++
title = "JavaScript splice method"
date = 2025-08-29T20:02:13.802+01:00
draft = false
description = "JavaScript splice tutorial shows how to modify arrays in JavaScript. The tutorial provides numerous examples to demonstrate array manipulation with splice in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript splice method

last modified April 4, 2025

 

In this article we show how to modify arrays using the splice method
in JavaScript.

## Array splicing

The splice method changes the contents of an array by removing or
replacing existing elements and/or adding new elements in place. Unlike many
array methods, splice modifies the original array directly.

This method is versatile and can be used for multiple operations: removing
elements, adding elements, or replacing elements. The method returns an array
containing the deleted elements, or an empty array if no elements are removed.

The splice method takes at least two parameters: the start index
and the delete count. Additional parameters are treated as elements to be added
to the array. Negative start indices count from the end of the array.

## Basic splice example

The following example demonstrates the basic usage of the splice
method to remove elements.

main.js
  

const fruits = ['apple', 'banana', 'cherry', 'date'];
const removed = fruits.splice(1, 2);

console.log(fruits);  // Modified original array
console.log(removed); // Array of removed elements

We remove two elements starting from index 1. The original array is modified,
and the removed elements are returned. The first parameter is the start index,
the second is the delete count.

$ node main.js
[ 'apple', 'date' ]
[ 'banana', 'cherry' ]

## Adding elements with splice

The splice method can add elements without removing any by setting deleteCount to 0.

main.js
  

const colors = ['red', 'green', 'blue'];
colors.splice(1, 0, 'yellow', 'orange');

console.log(colors);

We add two new elements at index 1 without removing any elements. The second
parameter (0) specifies we don't want to delete anything. Additional parameters
are inserted at the specified position.

$ node main.js
[ 'red', 'yellow', 'orange', 'green', 'blue' ]

## Replacing elements with splice

The splice() method can replace elements by specifying a delete count and new elements.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const removed = numbers.splice(2, 2, 'a', 'b', 'c');

console.log(numbers);
console.log(removed);

We replace two elements starting at index 2 with three new elements. The method
returns the removed elements. The array length changes when the number of added
elements differs from the number removed.

$ node main.js
[ 1, 2, 'a', 'b', 'c', 5 ]
[ 3, 4 ]

## Using negative start index

The start index can be negative, counting from the end of the array.

main.js
  

const letters = ['a', 'b', 'c', 'd', 'e'];
letters.splice(-2, 1);

console.log(letters);

We remove one element starting from the second-to-last position. Negative indices
count backward from the end of the array (-1 is the last element, -2 is the
second last, etc.). This is useful when you don't know the array length.

$ node main.js
[ 'a', 'b', 'c', 'e' ]

## Removing all elements after a specific index

Omitting the deleteCount parameter removes all elements from the start index onward.

main.js
  

const items = ['pen', 'pencil', 'eraser', 'ruler', 'sharpener'];
const removed = items.splice(2);

console.log(items);
console.log(removed);

When the deleteCount parameter is omitted, all elements from the start index to
the end are removed. This is equivalent to setting deleteCount to
(array.length - start). The method returns all removed elements.

$ node main.js
[ 'pen', 'pencil' ]
[ 'eraser', 'ruler', 'sharpener' ]

## Source

[Array splice - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

In this article we have demonstrated how to use the splice() method to modify
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)