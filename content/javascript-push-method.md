+++
title = "JavaScript push method"
date = 2025-08-29T20:02:10.403+01:00
draft = false
description = "JavaScript push tutorial shows how to add elements to arrays in JavaScript. The tutorial provides numerous examples to demonstrate array manipulation in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript push method

last modified April 4, 2025

 

In this article we show how to add elements to arrays using the push
method in JavaScript.

## Array push operation

The push method adds one or more elements to the end of an array.
It modifies the original array and returns the new length of the array.
This is different from methods like concat that create new arrays.

The push method is commonly used when you need to dynamically grow
an array during program execution. It's efficient for building collections of
data where you don't know the final size in advance.

Unlike some array methods, push directly mutates the original array.
This can be useful when you want to modify an existing array rather than create
a new one. The method can accept multiple arguments to add several elements at
once.

## Basic push example

The following example demonstrates the basic usage of the push
method.

main.js
  

const fruits = ['apple', 'banana'];
const newLength = fruits.push('orange');

console.log(fruits);
console.log(newLength);

We start with an array containing two fruits. We push a third fruit to the end.
The push() method returns the new length (3) and modifies the original array.
The array now contains all three elements.

$ node main.js
[ 'apple', 'banana', 'orange' ]
3

## Pushing multiple elements

The push method can add multiple elements at once.

main.js
  

const numbers = [1, 2];
const newLength = numbers.push(3, 4, 5);

console.log(numbers);
console.log(newLength);

We add three numbers to our array with a single push() call. The method accepts
multiple arguments separated by commas. All elements are added in the order they
are specified. The original array is modified to include all new elements.

$ node main.js
[ 1, 2, 3, 4, 5 ]
5

## Pushing elements from another array

To push elements from another array, we can use the spread operator.

main.js
  

const colors = ['red', 'green'];
const newColors = ['blue', 'yellow'];

colors.push(...newColors);
console.log(colors);

We use the spread operator (...) to expand the newColors array into individual
elements. This pushes each element separately rather than pushing the array as
a single element. The original colors array now contains all four color values.

$ node main.js
[ 'red', 'green', 'blue', 'yellow' ]

## Pushing objects to an array

The push method can add objects and other complex types to arrays.

main.js
  

const users = [{name: 'John'}];
users.push({name: 'Jane'}, {name: 'Bob'});

console.log(users);

We start with an array containing one user object. We push two additional user
objects to the array. The push() method works with any JavaScript value type,
including objects, arrays, functions, etc. The original array is modified.

$ node main.js
[ { name: 'John' }, { name: 'Jane' }, { name: 'Bob' } ]

## Using push in a loop

The push method is often used in loops to build arrays dynamically.

main.js
  

const squares = [];
for (let i = 1; i &lt;= 5; i++) {
    squares.push(i * i);
}

console.log(squares);

We start with an empty array and use a for loop to calculate squares of numbers.
Each calculated square is pushed to the array. This demonstrates how push() can
build arrays incrementally. The final array contains all calculated squares.

$ node main.js
[ 1, 4, 9, 16, 25 ]

## Source

[Array push - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

In this article we have demonstrated how to use the push() method to add
elements to arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)