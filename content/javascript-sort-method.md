+++
title = "JavaScript sort method"
date = 2025-08-29T20:02:13.804+01:00
draft = false
description = "JavaScript sort tutorial shows how to sort arrays in JavaScript. The tutorial provides numerous examples to demonstrate array sorting in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript sort method

last modified April 4, 2025

 

In this article we show how to sort arrays using the sort method
in JavaScript.

## Array sorting

The sort method sorts the elements of an array in place and
returns the sorted array. By default, it converts elements to strings and
compares their UTF-16 code unit values. This means numbers aren't sorted
numerically by default.

The method accepts an optional compare function that defines the sort order.
This function should return a negative, zero, or positive value depending on
the arguments. The original array is modified when using the sort method.

For simple arrays of strings, the default sort works well. For numbers or
complex objects, a compare function is usually needed. The sort is stable
in modern JavaScript engines, meaning equal elements keep their original order.

## Basic string sorting

The following example demonstrates the default sorting behavior with strings.

main.js
  

const fruits = ['banana', 'apple', 'orange', 'pear'];
fruits.sort();

console.log(fruits);

We create an array of fruits and sort them alphabetically. The default sort
converts elements to strings and compares them. The original array is modified.

$ node main.js
[ 'apple', 'banana', 'orange', 'pear' ]

## Sorting numbers

The default sort doesn't work well with numbers as it compares them as strings.

main.js
  

const numbers = [10, 5, 100, 2, 1000];
numbers.sort();

console.log(numbers);

Without a compare function, numbers are converted to strings and compared
lexicographically. This results in '100' coming before '2' because '1' is
less than '2' in string comparison.

$ node main.js
[ 10, 100, 1000, 2, 5 ]

## Sorting numbers with compare function

To sort numbers correctly, we need to provide a compare function.

main.js
  

const numbers = [10, 5, 100, 2, 1000];
numbers.sort((a, b) =&gt; a - b);

console.log(numbers);

The compare function subtracts b from a. If the result is negative, a comes
before b. If positive, b comes before a. If zero, their order remains unchanged.
This sorts numbers in ascending order.

$ node main.js
[ 2, 5, 10, 100, 1000 ]

## Sorting objects by property

We can sort arrays of objects by comparing their properties.

main.js
  

const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

users.sort((a, b) =&gt; a.age - b.age);
console.log(users);

We sort an array of user objects by their age property. The compare function
subtracts ages to determine the order. This sorts users from youngest to oldest.

$ node main.js
[
  { name: 'Jane', age: 25 },
  { name: 'John', age: 30 },
  { name: 'Bob', age: 35 }
]

## Case-insensitive string sorting

To sort strings case-insensitively, we need a custom compare function.

main.js
  

const words = ['apple', 'Banana', 'cherry', 'Date'];
words.sort((a, b) =&gt; a.localeCompare(b, undefined, { sensitivity: 'base' }));

console.log(words);

We use localeCompare with sensitivity set to 'base' for case-
insensitive comparison. This treats uppercase and lowercase letters as equal.
The sort order is now truly alphabetical regardless of case.

$ node main.js
[ 'apple', 'Banana', 'cherry', 'Date' ]

## Source

[Array sort - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

In this article we have demonstrated how to use the sort() method to sort
arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)