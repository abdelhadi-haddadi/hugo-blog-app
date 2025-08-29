+++
title = "JavaScript find method"
date = 2025-08-29T20:02:04.838+01:00
draft = false
description = "JavaScript find tutorial shows how to search arrays in JavaScript. The tutorial provides numerous examples to demonstrate array searching in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript find method

last modified April 4, 2025

 

In this article we show how to search arrays using the find method
in JavaScript.

## Array searching

The find method returns the first element in an array that satisfies
a provided testing function. If no values satisfy the testing function,
undefined is returned.

This method is useful when you need to locate a specific element in an array
based on certain criteria. The find method does not modify the
original array but returns the found element or undefined.

The find method executes the callback function once for each index
until it finds one where the callback returns a truthy value. It stops searching
after finding the first matching element.

## Basic find example

The following example demonstrates the basic usage of the find
method.

main.js
  

const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(element =&gt; element &gt; 10);

console.log(found);

We search for the first element greater than 10. The find method
returns 12, the first element that satisfies the condition. The original array
remains unchanged.

$ node main.js
12

## Finding objects in an array

The find method is particularly useful for searching arrays of
objects.

main.js
  

const inventory = [
  {name: 'apples', quantity: 2},
  {name: 'bananas', quantity: 0},
  {name: 'cherries', quantity: 5}
];

const result = inventory.find(fruit =&gt; fruit.name === 'cherries');

console.log(result);

We search an array of objects for a specific fruit by name. The method returns
the entire object where the name matches 'cherries'. This demonstrates how
find can work with complex data structures.

$ node main.js
{ name: 'cherries', quantity: 5 }

## Using find with index parameter

The callback function can also access the current element's index.

main.js
  

const numbers = [1, 5, 10, 15, 20];
const found = numbers.find((element, index) =&gt; {
  console.log(`Checking index ${index}: ${element}`);
  return element &gt; 13;
});

console.log('Found:', found);

We use the index parameter to log each search attempt. The method stops at the
first element (15) that satisfies the condition. This shows how find
processes elements sequentially.

$ node main.js
Checking index 0: 1
Checking index 1: 5
Checking index 2: 10
Checking index 3: 15
Found: 15

## find with thisArg parameter

The find method accepts an optional thisArg parameter
to set the this value in the callback.

main.js
  

function isPrime(element, index, array) {

  for (let i = 2; i &lt; element; i++) {
    if (element % i === 0) return false;
  }
  
  return element &gt; 1;
}

const numbers = [4, 6, 8, 9, 12, 13, 16];
const prime = numbers.find(isPrime);

console.log(prime);

We define a separate function to check for prime numbers and use it with
find. The method returns 13, the first prime number in the array.
This demonstrates using a named function instead of an arrow function.

$ node main.js
13

## When no element is found

The find method returns undefined when no match is
found.

main.js
  

const numbers = [1, 3, 5, 7, 9];
const even = numbers.find(num =&gt; num % 2 === 0);

console.log(even);
console.log(typeof even);

We search for an even number in an array of odd numbers. Since no element
satisfies the condition, find returns undefined.
This behavior is important for error handling in your code.

$ node main.js
undefined
undefined

## Source

[Array find - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

In this article we have demonstrated how to use the find() method to search
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)