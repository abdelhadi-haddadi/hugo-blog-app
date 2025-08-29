+++
title = "Lodash tutorial"
date = 2025-08-29T20:01:28.384+01:00
draft = false
description = "Learn how to use Lodash, a JavaScript utility library, with examples covering various functions and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Lodash tutorial

last modified last modified October 18, 2023

 

Lodash tutorial covers the Lodash JavaScript library. In this introductory
Lodash tutorial, we cover Lodash functions in multiple examples.

## Lodash

Lodash is a JavaScript library which provides utility functions for
common programming tasks. It uses functional programming paradigm. Lodash was
inspired by Underscore.js.

Lodash helps programmers write more concise and easier to maintain JavaScript
code. Lodash contains tools to simplify programming with strings, numbers,
arrays, functions and objects.

By convention, Lodash module is mapped to the underscore character.

## Lodash installation

First, we install the Lodash library.

$ npm init -y
$ npm i lodash

The Lodash library is installed locally with npm.

## Lodash version

In the first example, we determine the version of the Lodash library.

main.js
  

const _ = require("lodash");

const ver = _.VERSION;
console.log(ver);

The example prints the version of the Lodash library.

const _ = require("lodash");

By convention, the Lodash library is mapped to the underscore character.

const ver = _.VERSION;
console.log(ver);

The version is stored in the VERSION variable.

$ node main.js
4.17.21

We use Lodash version 4.17.21.

## Lodash first and last array elements

The _.first/_.head functions return the first
array element; the _.last function returns the last array element.

main.js
  

const _ = require("lodash");

let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

let fel = _.first(words);
let lel = _.last(words);

console.log(`First element: ${fel}`);
console.log(`Last element: ${lel}`);

The example outputs the first and last elements of an array of words.

$ node main.js
First element: sky
Last element: universe

## Lodash nth array elements

The _.nth funcion gets the element at index n of an array. If n is
negative, the nth element from the end is returned.

main.js
  

const _ = require("lodash");

let nums = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(_.nth(nums, 3));
console.log(_.nth(nums, -3));

In the example, we get the fourth element from the beginning and end. The
indexing starts from zero.

$ node main.js
4
6

## Lodash chunking array

The _.chunk function creates an array of elements split into
groups the length of the specified size.

main.js
  

const _ = require("lodash");

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let c1 = _.chunk(nums, 2);
console.log(c1);

let c2 = _.chunk(nums, 3);
console.log(c2);

The example chunks the nums array into an array of two and three
element subarrays.

$ node main.js
[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9 ] ]
[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]

## Getting array slice

The _.slice method gets a slice from an array. It takes two
indexes: the starting and ending index, where the starting index is inclusive
and the ending is exclusive.

main.js
  

const _ = require("lodash");

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let c1 = _.slice(nums, 2, 6);
console.log(c1);

let c2 = _.slice(nums, 0, 8);
console.log(c2);

The example creates two slices from the nums array.

$ node main.js
[ 3, 4, 5, 6 ]
[ 1, 2, 3, 4, 5, 6, 7, 8 ]

## Lodash random number

The _.random function produces random values between the inclusive
lower and upper bounds.

main.js
  

const _ = require("lodash");

let r = _.random(10);
console.log(r);

r = _.random(5, 10);
console.log(r);

The example prints two random values.

let r = _.random(10);

We produce a random value between 0 and 10.

r = _.random(5, 10);

Here we produce a random value between 5 and 10.

## Lodash random array element

With the _.sample function, we can pick a random
element from an array.

main.js
  

const _ = require("lodash");

let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

let word = _.sample(words);
console.log(word);

The example picks a random word from an array with _.sample.

$ node main.js
falcon

## Lodash shuffling array elements

The _.shuffle function shuffles a collection.

main.js
  

```
const _ = require("lodash");

let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

console.log(_.shuffle(words));
console.log(_.shuffle(words));
console.log(_.shuffle(words));
console.log(words);

```