+++
title = "JavaScript reduceRight method"
date = 2025-08-29T20:02:11.509+01:00
draft = false
description = "JavaScript reduceRight tutorial shows how to reduce arrays from right to left in JavaScript. The tutorial provides numerous examples to demonstrate array reduction from the end in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript reduceRight method

last modified April 4, 2025

 

In this article we show how to reduce arrays from right to left using the
reduceRight method in JavaScript.

## Array reduction from right

The reduceRight method executes a reducer function on each array
element from right to left, resulting in a single output value. It works
similarly to reduce, but processes the array in the opposite
direction.

This method is useful when the order of operations matters, such as when
processing mathematical expressions or nested function calls. The
reduceRight method maintains an accumulator that's updated with
each iteration.

The reducer function takes four arguments: accumulator, current value,
current index, and the source array. The accumulator accumulates the callback's
return values. An initial value can be provided as the second argument to
reduceRight.

## Basic reduceRight example

The following example demonstrates the basic usage of the reduceRight
method to concatenate strings from right to left.

main.js
  

const words = ['world', ' ', 'hello'];
const sentence = words.reduceRight((acc, word) =&gt; acc + word);

console.log(sentence);

We create an array of words and use reduceRight to concatenate them
from right to left. The accumulator starts with the last element ('hello') and
builds the string by prepending each subsequent element.

$ node main.js
hello world

## Calculating factorial with reduceRight

The reduceRight method can be used for mathematical operations where
order matters.

main.js
  

const numbers = [1, 2, 3, 4];
const factorial = numbers.reduceRight((acc, num) =&gt; acc * num);

console.log(factorial);

We calculate the factorial of 4 by multiplying numbers from right to left.
The operation is equivalent to 4 * 3 * 2 * 1. Using reduceRight
ensures the multiplication happens in the correct order.

$ node main.js
24

## Flattening nested arrays from right

The reduceRight method can flatten nested arrays starting from
the rightmost element.

main.js
  

const nested = [[0, 1], [2, 3], [4, 5]];
const flattened = nested.reduceRight((acc, val) =&gt; acc.concat(val), []);

console.log(flattened);

We flatten a nested array starting from the rightmost sub-array. The empty array
[] is provided as the initial value. Each sub-array is concatenated
to the accumulator from right to left.

$ node main.js
[4, 5, 2, 3, 0, 1]

## Composing functions with reduceRight

The reduceRight method is perfect for function composition where
functions need to be applied from right to left.

main.js
  

const add5 = x =&gt; x + 5;
const multiply3 = x =&gt; x * 3;
const subtract2 = x =&gt; x - 2;

const operations = [add5, multiply3, subtract2];
const composed = operations.reduceRight((acc, fn) =&gt; fn(acc), 4);

console.log(composed);

We compose three functions that operate on a number. The functions are applied
from right to left to the initial value 4. The order is: subtract2, then
multiply3, then add5.

$ node main.js
17

## Reversing an array with reduceRight

The reduceRight method can be used to create a reversed version of
an array.

main.js
  

const letters = ['a', 'b', 'c', 'd'];
const reversed = letters.reduceRight((acc, letter) =&gt; [...acc, letter], []);

console.log(reversed);

We create a reversed array by accumulating elements from right to left. The
spread operator ... is used to create a new array with each
iteration. The empty array [] serves as the initial accumulator.

$ node main.js
['d', 'c', 'b', 'a']

## Source

[Array reduceRight - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)

In this article we have demonstrated how to use the reduceRight() method to
process arrays from right to left in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)