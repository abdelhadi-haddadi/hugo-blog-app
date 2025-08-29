+++
title = "JavaScript findIndex method"
date = 2025-08-29T20:02:04.848+01:00
draft = false
description = "JavaScript findIndex tutorial shows how to find elements in arrays in JavaScript. The tutorial provides numerous examples to demonstrate element searching in JS arrays."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript findIndex method

last modified April 4, 2025

 

In this article we show how to find elements in arrays using the
findIndex method in JavaScript.

## Array element searching

The findIndex method returns the index of the first element in an
array that satisfies a provided testing function. If no elements satisfy the
testing function, it returns -1.

This method is useful when you need to locate the position of an element based
on specific criteria rather than just its value. Unlike indexOf,
findIndex can handle complex search conditions.

The method executes the callback function once for each index in the array until
it finds one where the callback returns a truthy value. The original array
remains unchanged after the operation.

## Basic findIndex example

The following example demonstrates the basic usage of the findIndex
method.

main.js
  

const numbers = [5, 12, 8, 130, 44];
const isLargeNumber = (element) =&gt; element &gt; 13;
const firstLargeIndex = numbers.findIndex(isLargeNumber);

console.log(firstLargeIndex);
console.log(numbers);  // Original array remains unchanged

We search for the first number greater than 13 in the array. The callback
function tests each element until it finds a match. The method returns the
index of the first matching element.

$ node main.js
3
[ 5, 12, 8, 130, 44 ]

## Finding an object in an array

The findIndex method is particularly useful for searching arrays
of objects.

main.js
  

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const index = users.findIndex(user =&gt; user.name === 'Jane');
console.log(index);

We search for a user object with the name 'Jane' in the array. The callback
function checks each object's name property. The method returns the index of
the first matching object.

$ node main.js
1

## Handling no match found

When no element satisfies the condition, findIndex returns -1.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
const index = fruits.findIndex(fruit =&gt; fruit === 'grape');

if (index === -1) {
  console.log('Fruit not found');
} else {
  console.log(`Found at index ${index}`);
}

We attempt to find 'grape' in the fruits array. Since it doesn't exist, the
method returns -1. This behavior is useful for checking element existence.

$ node main.js
Fruit not found

## Using thisArg parameter

The findIndex method accepts an optional thisArg
parameter to set the this value in the callback.

main.js
  

const inventory = [
  { name: 'apples', quantity: 2 },
  { name: 'bananas', quantity: 0 },
  { name: 'cherries', quantity: 5 }
];

function isStockLow(item) {
  return item.quantity &lt; this.threshold;
}

const index = inventory.findIndex(isStockLow, { threshold: 3 });
console.log(index);

We use thisArg to pass a threshold value to our callback function.
The method finds the first item with quantity below the threshold. This approach
makes the callback more flexible.

$ node main.js
0

## Finding index with complex conditions

The findIndex method can handle complex search conditions.

main.js
  

const data = [
  { id: 1, value: 10, active: true },
  { id: 2, value: 20, active: false },
  { id: 3, value: 30, active: true },
  { id: 4, value: 40, active: true }
];

const index = data.findIndex(item =&gt; {
  return item.active &amp;&amp; item.value &gt; 25;
});

console.log(index);

We search for the first active item with value greater than 25. The callback
combines multiple conditions. The method returns the index of the first item
that meets all conditions.

$ node main.js
2

## Source

[Array findIndex - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

In this article we have demonstrated how to use the findIndex
method to locate elements in JavaScript arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)