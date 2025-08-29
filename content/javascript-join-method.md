+++
title = "JavaScript join method"
date = 2025-08-29T20:02:09.275+01:00
draft = false
description = "JavaScript join tutorial shows how to convert arrays to strings in JavaScript. The tutorial provides numerous examples to demonstrate array joining in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript join method

last modified April 4, 2025

 

In this article we show how to convert arrays to strings using the
join method in JavaScript.

## Array joining

The join method creates and returns a new string by concatenating
all elements in an array. By default, elements are separated by commas, but you
can specify any separator.

This method is useful when you need to convert array data into a formatted
string for display or storage. The original array remains unchanged as
join does not modify the array it's called on.

If the array has only one item, that item will be returned without using the
separator. For empty arrays, an empty string is returned. All array elements
are converted to strings during the joining process.

## Basic join example

The following example demonstrates the basic usage of the join
method.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
const result = fruits.join();

console.log(result);
console.log(fruits);  // Original array remains unchanged

We create an array of fruits and join them into a string. Without a separator
argument, the elements are joined with commas. The original array remains
unmodified.

$ node main.js
apple,banana,orange
[ 'apple', 'banana', 'orange' ]

## Joining with a custom separator

The join method accepts a separator string as its parameter.

main.js
  

const colors = ['red', 'green', 'blue'];
const spaceSeparated = colors.join(' ');
const dashSeparated = colors.join('-');

console.log(spaceSeparated);
console.log(dashSeparated);

We join array elements with different separators. The first join uses a space,
while the second uses a dash. Any string can be used as a separator.

$ node main.js
red green blue
red-green-blue

## Joining with an empty separator

When an empty string is passed as separator, elements are joined without any
characters between them.

main.js
  

const letters = ['J', 'S', 'Q', 'L'];
const concatenated = letters.join('');

console.log(concatenated);

We join array elements with no separator between them. This is useful when you
need to concatenate characters or strings into a single continuous string.

$ node main.js
JSQL

## Joining array of numbers

The join method converts all elements to strings automatically.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const joinedNumbers = numbers.join(' + ');

console.log(joinedNumbers);
console.log(typeof joinedNumbers);

We join an array of numbers with a custom separator. All numbers are converted
to strings during the join operation. The result is always a string type.

$ node main.js
1 + 2 + 3 + 4 + 5
string

## Joining nested arrays

The join method does not recursively join nested arrays.

main.js
  

const mixedArray = [1, [2, 3], [4, [5, 6]]];
const result = mixedArray.join('|');

console.log(result);

When joining arrays containing nested arrays, the nested arrays are converted to
strings using their toString method. This results in
comma-separated values within the nested arrays.

$ node main.js
1|2,3|4,5,6

## Source

[Array join - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

In this article we have demonstrated how to use the join() method to convert
arrays to strings in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)