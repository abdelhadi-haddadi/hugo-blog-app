+++
title = "JavaScript map method"
date = 2025-08-29T20:02:10.414+01:00
draft = false
description = "JavaScript map tutorial shows how to transform arrays in JavaScript. The tutorial provides numerous examples to demonstrate array mapping in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript map method

last modified April 4, 2025

 

In this article we show how to transform arrays using the map method
in JavaScript.

## Array transformation

The map method creates a new array populated with the results of
calling a provided function on every element in the calling array. It does not
modify the original array, making it a pure function when used correctly.

This method is commonly used when you need to transform each element in an array
according to specific logic. The map method executes the callback
function once for each element in order and constructs a new array from the
results.

The callback function can take three arguments: the current element being
processed, its index, and the array map was called upon. The
map method is chainable and often used with other array methods.

## Basic map example

The following example demonstrates the basic usage of the map
method.

main.js
  

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num =&gt; num * 2);

console.log(numbers);  // Original array unchanged
console.log(doubled);  // New transformed array

We create an array and use map to double each number. The original
array remains unmodified. The map() method returns a new array with transformed
values.

$ node main.js
[ 1, 2, 3, 4 ]
[ 2, 4, 6, 8 ]

## Mapping objects to new structures

The map method is often used to transform arrays of objects.

main.js
  

const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 }
];

const names = users.map(user =&gt; user.name);
const ages = users.map(user =&gt; ({ age: user.age }));

console.log(names);
console.log(ages);

We transform an array of user objects into arrays of names and age objects. The
callback function extracts specific properties from each object. Note the
parentheses around the object literal in the arrow function.

$ node main.js
[ 'John', 'Jane' ]
[ { age: 25 }, { age: 30 } ]

## Using map with index parameter

The callback function can access the current element's index.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
const indexedFruits = fruits.map((fruit, index) =&gt; 
  `${index + 1}. ${fruit.toUpperCase()}`
);

console.log(indexedFruits);

We transform an array of fruits by adding their position numbers. The index
parameter (second argument) provides the current element's position. We use
template literals for string interpolation.

$ node main.js
[ '1. APPLE', '2. BANANA', '3. CHERRY' ]

## Mapping with external functions

The callback function can be defined separately and passed to map.

main.js
  

function squareRoot(num) {
  return Math.sqrt(num).toFixed(2);
}

const numbers = [4, 9, 16, 25];
const roots = numbers.map(squareRoot);

console.log(roots);

We define a separate squareRoot function that calculates square
roots. The map method applies this function to each element. The
toFixed method formats the results to two decimal places.

$ node main.js
[ '2.00', '3.00', '4.00', '5.00' ]

## Chaining map with other array methods

The map method can be chained with other array methods.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers
  .filter(n =&gt; n % 2 === 0)
  .map(n =&gt; n * 10)
  .reverse();

console.log(result);

We first filter even numbers, then multiply them by 10, and finally reverse the
array. Each method returns a new array, allowing method chaining. This approach
is common in functional programming.

$ node main.js
[ 60, 40, 20 ]

## Source

[Array map - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

In this article we have demonstrated how to use the map() method to transform
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)