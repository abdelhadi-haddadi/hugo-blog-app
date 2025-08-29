+++
title = "JavaScript of keyword"
date = 2025-08-29T20:01:33.318+01:00
draft = false
description = "Understand how to use the for...of loop in JavaScript for iterating over iterable objects, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript of keyword

last modified April 16, 2025

In this article we show how to use the of keyword in JavaScript's
for...of loop to iterate over iterable objects.

## The of keyword

The of keyword is used in the for...of loop to iterate
over iterable objects. It provides a cleaner syntax compared to traditional
for loops when working with collections.

The for...of statement creates a loop iterating over iterable objects
including arrays, strings, maps, sets, and other array-like objects. It was
introduced in ES6 (ECMAScript 2015).

Unlike for...in which iterates over property names,
for...of iterates over property values. This makes it ideal for
working with the values of collections directly.

## Basic for...of with arrays

The following example demonstrates the basic usage of for...of with
an array.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];

for (const fruit of fruits) {
    console.log(fruit);
}

This loop iterates over each element in the fruits array. The fruit
variable takes the value of each array element in sequence. This is simpler
than traditional for loops with index variables.

$ node main.js
apple
banana
cherry

## Iterating over strings

The for...of loop can also iterate over strings character by
character.

main.js
  

const message = 'Hello';

for (const char of message) {
    console.log(char);
}

This example shows how to process each character in a string individually. The
char variable holds each character in turn. This is more readable
than using string indexing with a traditional for loop.

$ node main.js
H
e
l
l
o

## Working with Maps

for...of works well with Map objects, allowing iteration over
key-value pairs.

main.js
  

const colors = new Map();
colors.set('red', '#FF0000');
colors.set('green', '#00FF00');
colors.set('blue', '#0000FF');

for (const [name, hex] of colors) {
    console.log(`${name}: ${hex}`);
}

Here we use array destructuring in the loop to unpack the key and value from
each Map entry. The for...of loop provides a clean way to iterate
over Map collections.

$ node main.js
red: #FF0000
green: #00FF00
blue: #0000FF

## Iterating over Sets

Sets can also be iterated using for...of, as they are iterable
objects.

main.js
  

const uniqueNumbers = new Set([1, 2, 3, 2, 1]);

for (const num of uniqueNumbers) {
    console.log(num);
}

This example demonstrates iterating over a Set's unique values. The loop
automatically handles the Set's uniqueness property. Only unique values are
processed, even if duplicates were present in the original array.

$ node main.js
1
2
3

## Using with arguments object

The for...of loop can iterate over the arguments
object in functions.

main.js
  

function sumAll() {
    let total = 0;
    for (const num of arguments) {
        total += num;
    }
    return total;
}

console.log(sumAll(1, 2, 3, 4));

Here we use for...of to process all arguments passed to a function.
The arguments object is array-like and iterable. This provides a
clean way to handle variable numbers of arguments.

$ node main.js
10

## Breaking iteration with for...of

The for...of loop can be controlled using break and
continue statements.

main.js
  

const numbers = [1, 2, 3, 4, 5, 6];

for (const num of numbers) {
    if (num &gt; 4) {
        break;
    }
    console.log(num);
}

This example shows how to exit a for...of loop early using
break. The loop stops when it encounters a number greater than 4.
This demonstrates that for...of loops support normal loop control
statements.

$ node main.js
1
2
3
4

## Iterating over NodeLists

for...of is useful for working with DOM NodeLists returned by
methods like querySelectorAll.

main.js
  

// Assuming HTML with &lt;div class="box"&gt;Box 1&lt;/div&gt;&lt;div class="box"&gt;Box 2&lt;/div&gt;
const boxes = document.querySelectorAll('.box');

for (const box of boxes) {
    console.log(box.textContent);
}

This example shows how to iterate over DOM elements collected in a NodeList.
The for...of loop provides a cleaner alternative to traditional
methods like forEach or indexed loops for DOM manipulation.

$ node main.js
Box 1
Box 2

## Source

[for...of - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

In this article we have demonstrated how to use the of keyword in for...of loops
to iterate over various iterable objects in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)