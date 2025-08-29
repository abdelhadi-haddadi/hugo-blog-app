+++
title = "JavaScript findLast method"
date = 2025-08-29T20:02:05.990+01:00
draft = false
description = "JavaScript findLast tutorial shows how to find the last matching element in an array in JavaScript. The tutorial provides examples to demonstrate the findLast method in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript findLast method

last modified April 4, 2025

 

In this article we show how to find the last matching element using the
findLast method in JavaScript.

## Array findLast method

The findLast method returns the value of the last element in an
array that satisfies the provided testing function. If no elements satisfy the
testing function, undefined is returned.

This method is useful when you need to find the last occurrence of an element
that matches certain criteria. Unlike find, which searches from
the start, findLast searches from the end of the array.

The method executes the callback function once for each element in descending
order until it finds one where the callback returns a truthy value. It then
returns that element and stops searching.

## Basic findLast example

The following example demonstrates the basic usage of the findLast
method.

main.js
  

const numbers = [5, 12, 8, 130, 44];
const found = numbers.findLast((element) =&gt; element &gt; 10);

console.log(found);

We create an array of numbers and use findLast to locate the last
element greater than 10. The method returns 44, which is the last element
satisfying the condition.

$ node main.js
44

## Finding last even number

This example shows how to find the last even number in an array.

main.js
  

const nums = [1, 3, 4, 7, 8, 9, 12];
const lastEven = nums.findLast((num) =&gt; num % 2 === 0);

console.log(lastEven);

We search for the last even number in the array. The callback function checks
if each number is divisible by 2. The method returns 12, the last even number.

$ node main.js
12

## Finding last object with property

The findLast method can be used with arrays of objects.

main.js
  

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true }
];

const lastActive = users.findLast((user) =&gt; user.active);
console.log(lastActive);

We find the last active user in an array of user objects. The callback checks
the active property. The method returns Bob's object as it's the
last active user.

$ node main.js
{ id: 3, name: 'Bob', active: true }

## Handling no match found

When no element satisfies the condition, findLast returns undefined.

main.js
  

const words = ['apple', 'banana', 'cherry'];
const result = words.findLast((word) =&gt; word.startsWith('z'));

console.log(result);  // undefined

We attempt to find a word starting with 'z'. Since no such word exists in the
array, the method returns undefined. This behavior is useful for checking if
any elements match a condition.

$ node main.js
undefined

## Using index parameter

The callback function can receive the current index as its second parameter.

main.js
  

const values = [10, 20, 30, 40, 50];
const result = values.findLast((value, index) =&gt; {
  console.log(`Checking index ${index}: ${value}`);
  return value &gt; 25;
});

console.log('Result:', result);

We use the index parameter to log each check. The method starts from the end
(index 4) and stops at index 2 where the condition is met. This demonstrates
the descending order of checks.

$ node main.js
Checking index 4: 50
Result: 50

## Source

[Array findLast - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)

In this article we have demonstrated how to use the findLast() method to locate
the last matching element in JavaScript arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)