+++
title = "JavaScript toSpliced method"
date = 2025-08-29T20:02:16.012+01:00
draft = false
description = "JavaScript toSpliced tutorial shows how to manipulate arrays in JavaScript. The tutorial provides numerous examples to demonstrate array splicing in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toSpliced method

last modified April 4, 2025

 

In this article we show how to manipulate arrays using the toSpliced
method in JavaScript.

## Array splicing

Array splicing is the operation of removing, replacing, or adding elements to
an array. The toSpliced method is a non-destructive alternative to
the traditional splice method. It returns a new array with the
changes while leaving the original array unchanged.

This method was introduced in ECMAScript 2023 as part of the array copying
methods. It provides an immutable way to modify arrays, which is particularly
useful in functional programming and state management. The original array
remains untouched after the operation.

The toSpliced method takes three parameters: start index, delete
count, and optional items to insert. Unlike splice, it doesn't
modify the original array and always returns a new array with the changes.

## Basic toSpliced example

The following example demonstrates the basic usage of the toSpliced
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const newFruits = fruits.toSpliced(1, 1);

console.log(fruits);    // Original array unchanged
console.log(newFruits); // New array with changes

We create an array and use toSpliced to remove one element at
index 1. The original array remains unmodified. The method returns a new array
with the specified element removed.

$ node main.js
[ 'apple', 'banana', 'cherry' ]
[ 'apple', 'cherry' ]

## Removing multiple elements

The toSpliced method can remove multiple elements at once.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6];
const newNumbers = numbers.toSpliced(2, 3);

console.log(numbers);
console.log(newNumbers);

We remove three elements starting from index 2. The original array remains
intact. The new array contains all elements except those specified in the
range to remove.

$ node main.js
[ 1, 2, 3, 4, 5, 6 ]
[ 1, 2, 6 ]

## Adding elements with toSpliced

The toSpliced() method can also insert new elements without removing any.

main.js
  

const colors = ['red', 'green', 'blue'];
const newColors = colors.toSpliced(1, 0, 'yellow', 'orange');

console.log(colors);
console.log(newColors);

We insert two new colors at index 1 without removing any elements. The delete
count is set to 0. The new elements are inserted at the specified position in
the new array.

$ node main.js
[ 'red', 'green', 'blue' ]
[ 'red', 'yellow', 'orange', 'green', 'blue' ]

## Replacing elements

The toSpliced method can replace elements by removing and adding
elements in one operation.

main.js
  

const letters = ['a', 'b', 'c', 'd', 'e'];
const newLetters = letters.toSpliced(1, 2, 'x', 'y', 'z');

console.log(letters);
console.log(newLetters);

We replace two elements starting from index 1 with three new elements. The
original array remains unchanged. The new array has the specified elements
replaced with the new values.

$ node main.js
[ 'a', 'b', 'c', 'd', 'e' ]
[ 'a', 'x', 'y', 'z', 'd', 'e' ]

## Using negative indices

The toSpliced method accepts negative indices which count from
the end of the array.

main.js
  

const animals = ['cat', 'dog', 'elephant', 'fox'];
const newAnimals = animals.toSpliced(-2, 1, 'bear');

console.log(animals);
console.log(newAnimals);

We use a negative index (-2) to start from the second last element. We replace
one element ('elephant') with 'bear'. Negative indices make it easy to work
with elements near the end of the array.

$ node main.js
[ 'cat', 'dog', 'elephant', 'fox' ]
[ 'cat', 'dog', 'bear', 'fox' ]

## Source

[Array toSpliced - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)

In this article we have demonstrated how to use the toSpliced() method to
manipulate arrays in JavaScript without mutating the original array.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)