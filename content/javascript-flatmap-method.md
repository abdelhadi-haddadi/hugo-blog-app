+++
title = "JavaScript flatMap method"
date = 2025-08-29T20:02:07.087+01:00
draft = false
description = "JavaScript flatMap tutorial shows how to map and flatten arrays in JavaScript. The tutorial provides numerous examples to demonstrate array mapping and flattening in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript flatMap method

last modified April 4, 2025

 

In this article we show how to map and flatten arrays using the flatMap 
method in JavaScript.

## Array flatMap operation

The flatMap method is a combination of map and 
flat operations. It first maps each element using a mapping 
function, then flattens the result into a new array. This is identical 
to a map followed by a flat of depth 1.

The main advantage of flatMap is that it performs both operations 
in a single method call, making code more concise. It's particularly useful 
when working with arrays that contain nested arrays or when you need to 
transform and flatten data simultaneously.

The flatMap method does not modify the original array. Instead, 
it returns a new array with the mapped and flattened results. The callback 
function can return either a single value or an array of values.

## Basic flatMap example

The following example demonstrates the basic usage of the flatMap
method.

main.js
  

const numbers = [1, 2, 3];
const doubledAndFlattened = numbers.flatMap(num =&gt; [num * 2]);

console.log(numbers);  // Original array unchanged
console.log(doubledAndFlattened);  // New mapped and flattened array

We create an array and use flatMap to double each element. The 
callback returns each doubled number in an array, which flatMap 
then flattens. The original array remains unmodified.

$ node main.js
[ 1, 2, 3 ]
[ 2, 4, 6 ]

## Flattening nested arrays

flatMap can be used to flatten arrays while also transforming them.

main.js
  

const phrases = ["hello world", "good morning"];
const words = phrases.flatMap(phrase =&gt; phrase.split(' '));

console.log(words);

We split each phrase into words, which creates arrays of words. flatMap 
then flattens these arrays into a single array of words. This demonstrates 
how flatMap can process and flatten data in one step.

$ node main.js
[ 'hello', 'world', 'good', 'morning' ]

## Filtering and mapping with flatMap

flatMap can be used to both filter and map elements by returning 
empty arrays for elements to exclude.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const evenSquares = numbers.flatMap(num =&gt; 
    num % 2 === 0 ? [num * num] : []
);

console.log(evenSquares);

We filter out odd numbers and square the even ones. By returning an empty array 
for odd numbers, they're excluded from the result. This shows how flatMap 
can combine filtering and mapping operations.

$ node main.js
[ 4, 16 ]

## Working with nested arrays

flatMap is particularly useful for working with arrays of arrays.

main.js
  

const books = [
    { title: "Book 1", tags: ["fantasy", "adventure"] },
    { title: "Book 2", tags: ["science", "fiction"] }
];
const allTags = books.flatMap(book =&gt; book.tags);

console.log(allTags);

We extract all tags from an array of book objects. Each book's tags are in an 
array, and flatMap combines them into a single array. This is 
more concise than using map followed by flat.

$ node main.js
[ 'fantasy', 'adventure', 'science', 'fiction' ]

## Expanding elements with flatMap

flatMap can be used to expand each element into multiple elements.

main.js
  

const numbers = [1, 2, 3];
const expanded = numbers.flatMap(num =&gt; [num - 1, num, num + 1]);

console.log(expanded);

We create a new array that contains each original number along with its 
predecessor and successor. The callback returns an array of three values 
for each input, which flatMap flattens into the final result.

$ node main.js
[ 0, 1, 2, 1, 2, 3, 2, 3, 4 ]

## Source

[Array flatMap - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

In this article we have demonstrated how to use the flatMap() method to 
transform and flatten arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)