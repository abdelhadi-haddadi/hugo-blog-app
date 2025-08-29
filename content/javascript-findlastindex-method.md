+++
title = "JavaScript findLastIndex method"
date = 2025-08-29T20:02:05.988+01:00
draft = false
description = "JavaScript findLastIndex tutorial shows how to find elements in arrays in JavaScript. The tutorial provides numerous examples to demonstrate element searching in JS arrays."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript findLastIndex method

last modified April 4, 2025

 

In this article we show how to find elements in arrays using the
findLastIndex method in JavaScript.

## Array element searching

The findLastIndex method searches an array for the last element
that satisfies a provided testing function. It returns the index of the found
element or -1 if no element satisfies the condition.

This method is useful when you need to find the position of the last occurrence
of an element matching specific criteria. Unlike findIndex, which
searches from the start, findLastIndex searches from the end.

The method executes the callback function once for each index of the array in
descending order until it finds one where the callback returns a truthy value.
If no such element is found, it returns -1.

## Basic findLastIndex example

The following example demonstrates the basic usage of the
findLastIndex method.

main.js
  

const numbers = [5, 12, 8, 130, 44, 12];
const isLargeNumber = (element) =&gt; element &gt; 10;

const lastIndex = numbers.findLastIndex(isLargeNumber);

console.log(lastIndex);  // Index of last element &gt; 10
console.log(numbers[lastIndex]);  // The element itself

We create an array and search for the last element greater than 10. The method
returns the index of the last matching element (5 in this case). The original
array remains unchanged.

$ node main.js
5
12

## Finding last even number

This example shows how to find the index of the last even number in an array.

main.js
  

const nums = [1, 3, 5, 7, 8, 9, 10, 11, 12];
const isEven = (num) =&gt; num % 2 === 0;

const lastEvenIndex = nums.findLastIndex(isEven);

console.log(`Last even number at index: ${lastEvenIndex}`);
console.log(`Value: ${nums[lastEvenIndex]}`);

We define an array of numbers and a function to check for even numbers. The
findLastIndex method returns the index of the last even number
(8 in this case). The callback function checks each element from the end.

$ node main.js
Last even number at index: 8
Value: 12

## Finding last object matching criteria

The findLastIndex method works well with arrays of objects.

main.js
  

const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true },
  { id: 4, name: 'Alice', active: false }
];

const lastActiveIndex = users.findLastIndex(user =&gt; user.active);

console.log(`Last active user at index: ${lastActiveIndex}`);
console.log(users[lastActiveIndex]);

We search an array of user objects for the last active user. The callback checks
the active property of each object. The method returns the index
of the last object where active is true.

$ node main.js
Last active user at index: 2
{ id: 3, name: 'Bob', active: true }

## Handling no match found

When no element satisfies the condition, findLastIndex returns -1.

main.js
  

const temperatures = [22, 23, 19, 20, 18];
const isFreezing = (temp) =&gt; temp &lt;= 0;

const freezingIndex = temperatures.findLastIndex(isFreezing);

if (freezingIndex === -1) {
  console.log('No freezing temperatures found');
} else {
  console.log(`Last freezing at index: ${freezingIndex}`);
}

We attempt to find the last freezing temperature in an array. Since none exist,
the method returns -1. This example demonstrates proper handling of the no-match
case, which is important for robust code.

$ node main.js
No freezing temperatures found

## Using array element and index in callback

The callback function can access both the element and its index.

main.js
  

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];

const isLongWord = (word, index) =&gt; {
  console.log(`Checking index ${index}: ${word}`);
  return word.length &gt; 5;
};

const lastLongWordIndex = words.findLastIndex(isLongWord);

console.log(`Last long word at index: ${lastLongWordIndex}`);

We search for the last long word (length &gt; 5) while logging each check. The
callback receives both the element and its index. This demonstrates how the
method processes elements from the end of the array.

$ node main.js
Checking index 4: elderberry
Checking index 3: date
Checking index 2: cherry
Checking index 1: banana
Checking index 0: apple
Last long word at index: 4

## Source

[Array findLastIndex - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)

In this article we have demonstrated how to use the findLastIndex() method to
search arrays in JavaScript from the end.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)