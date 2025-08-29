+++
title = "JavaScript toSorted method"
date = 2025-08-29T20:02:16.027+01:00
draft = false
description = "JavaScript toSorted tutorial shows how to sort arrays in JavaScript. The tutorial provides numerous examples to demonstrate array sorting in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toSorted method

last modified April 4, 2025

 

In this article we show how to sort arrays using the toSorted method
in JavaScript.

## Array sorting

Array sorting is the operation of arranging elements in a specific order. The
toSorted method creates a new array with elements sorted in
ascending order by default. Unlike sort, it doesn't modify the
original array.

This method was introduced in ECMAScript 2023 as a safer alternative to
sort. It maintains immutability by returning a new sorted array
while leaving the original array unchanged. This is particularly useful in
functional programming.

The toSorted method can take an optional compare function as an
argument. This function determines the sorting order of elements. Without a
compare function, elements are converted to strings and sorted by UTF-16 code
units.

## Basic toSorted example

The following example demonstrates the basic usage of the toSorted
method.

main.js
  

const numbers = [3, 1, 4, 1, 5, 9];
const sortedNumbers = numbers.toSorted();

console.log(numbers);        // Original array unchanged
console.log(sortedNumbers);  // New sorted array

We create an array of numbers and sort them. The original array remains
unmodified. The toSorted() method returns a new array with elements sorted
in ascending order.

$ node main.js
[ 3, 1, 4, 1, 5, 9 ]
[ 1, 1, 3, 4, 5, 9 ]

## Sorting strings

The toSorted method works with string elements as well.

main.js
  

const fruits = ['banana', 'apple', 'cherry', 'date'];
const sortedFruits = fruits.toSorted();

console.log(fruits);
console.log(sortedFruits);

We sort an array of strings alphabetically. By default, string comparison is
case-sensitive and based on UTF-16 code unit values. The original array remains
unchanged.

$ node main.js
[ 'banana', 'apple', 'cherry', 'date' ]
[ 'apple', 'banana', 'cherry', 'date' ]

## Using a compare function

The toSorted() method can take a compare function for custom sorting.

main.js
  

const numbers = [10, 5, 8, 2, 1];
const descending = numbers.toSorted((a, b) =&gt; b - a);

console.log(numbers);
console.log(descending);

We sort numbers in descending order using a compare function. The function
returns a positive, negative, or zero value to determine the sort order. The
original array is preserved.

$ node main.js
[ 10, 5, 8, 2, 1 ]
[ 10, 8, 5, 2, 1 ]

## Sorting objects by property

We can sort arrays of objects using a property-based compare function.

main.js
  

const users = [
  { name: 'John', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 }
];

const byAge = users.toSorted((a, b) =&gt; a.age - b.age);
console.log(byAge);

We sort an array of objects by their age property. The compare function extracts
the age values for comparison. This creates a new sorted array without modifying
the original.

$ node main.js
[
  { name: 'Bob', age: 20 },
  { name: 'John', age: 25 },
  { name: 'Alice', age: 30 }
]

## Case-insensitive string sorting

For case-insensitive sorting, we need a custom compare function.

main.js
  

const words = ['Apple', 'banana', 'cherry', 'Date'];
const caseInsensitive = words.toSorted((a, b) =&gt; 
  a.localeCompare(b, undefined, { sensitivity: 'base' })
);

console.log(words);
console.log(caseInsensitive);

We sort strings case-insensitively using localeCompare with the
base sensitivity option. This treats uppercase and lowercase letters as
equivalent. The original array remains unchanged.

$ node main.js
[ 'Apple', 'banana', 'cherry', 'Date' ]
[ 'Apple', 'banana', 'cherry', 'Date' ]

## Source

[Array toSorted - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)

In this article we have demonstrated how to use the toSorted method
to sort arrays in JavaScript while preserving the original array.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)