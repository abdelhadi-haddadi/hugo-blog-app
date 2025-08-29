+++
title = "JavaScript forEach method"
date = 2025-08-29T20:02:07.074+01:00
draft = false
description = "JavaScript forEach tutorial shows how to iterate over arrays in JavaScript. The tutorial provides numerous examples to demonstrate array iteration in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript forEach method

last modified April 4, 2025

 

In this article we show how to iterate over arrays using the forEach
method in JavaScript.

## Array iteration

The forEach method executes a provided function once for each array
element. It is a cleaner alternative to traditional for loops when
working with arrays. The method does not return a value and cannot be chained.

Unlike map or filter, forEach is used for
its side effects rather than transforming data. It provides a simple way to
perform operations on each element without creating a new array.

The callback function passed to forEach receives three arguments:
the current element, its index, and the array being traversed. Only the element
value is required; other parameters are optional.

## Basic forEach example

The following example demonstrates the basic usage of the forEach
method.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];

fruits.forEach(function(fruit) {
    console.log(fruit);
});

We create an array of fruits and use forEach to log each one. The
callback function receives each element in turn. This is the simplest form of
forEach usage.

$ node main.js
apple
banana
cherry

## Using index parameter

The forEach callback can access the current element's index.

main.js
  

const colors = ['red', 'green', 'blue'];

colors.forEach(function(color, index) {
    console.log(`Color at position ${index} is ${color}`);
});

We log both the color and its index in the array. The second parameter of the
callback function provides the current index. This is useful when you need to
know the position of elements.

$ node main.js
Color at position 0 is red
Color at position 1 is green
Color at position 2 is blue

## Modifying array elements

forEach can be used to modify array elements in place.

main.js
  

const numbers = [1, 2, 3, 4];
numbers.forEach(function(num, index, arr) {
    arr[index] = num * 2;
});

console.log(numbers);

We double each number in the array by accessing it through the array reference.
The third parameter provides access to the original array. Note that we're
modifying the original array directly.

$ node main.js
[ 2, 4, 6, 8 ]

## Using arrow functions

Arrow functions provide a concise syntax for forEach callbacks.

main.js
  

const languages = ['JavaScript', 'Python', 'Ruby'];

languages.forEach(lang =&gt; {
    console.log(`${lang} has ${lang.length} letters`);
});

We use an arrow function to log each language and its character count. Arrow
functions are especially clean for simple operations. They inherit this
from the surrounding context.

$ node main.js
JavaScript has 10 letters
Python has 6 letters
Ruby has 4 letters

## Breaking forEach iteration

Unlike for loops, forEach cannot be broken with
break.

main.js
  

const data = [1, 2, 3, 4, 5];
let sum = 0;

data.forEach(num =&gt; {
    if (sum &gt;= 6) return; // Can't break, but can skip
    sum += num;
});

console.log(sum);

We demonstrate that forEach iterations cannot be stopped early.
While return exits the current callback, it doesn't stop the entire
loop. For early termination, consider for...of or some.

$ node main.js
6

## Source

[Array forEach - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

In this article we have demonstrated how to use the forEach() method to iterate
over arrays in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)