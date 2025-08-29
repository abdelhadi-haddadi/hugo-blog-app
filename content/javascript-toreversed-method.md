+++
title = "JavaScript toReversed method"
date = 2025-08-29T20:02:16.009+01:00
draft = false
description = "JavaScript toReversed tutorial shows how to reverse arrays in JavaScript without mutating the original. The tutorial provides examples to demonstrate array reversal in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript toReversed method

last modified April 4, 2025

 

In this article we show how to reverse arrays using the toReversed
method in JavaScript. This method was introduced in ECMAScript 2023.

## Array reversal

Array reversal is the operation of changing the order of elements in an array.
The toReversed method returns a new array with elements in reverse
order. Unlike the reverse method, it doesn't modify the original.

This method is useful when you need to work with reversed data while preserving
the original array. The toReversed method is part of a new family
of non-mutating array methods in JavaScript.

The method works on any array-like object that has a length property and
indexed elements. It creates a shallow copy of the array before reversing it.
The original array remains unchanged after the operation.

## Basic toReversed example

The following example demonstrates the basic usage of the toReversed
method.

main.js
  

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = numbers.toReversed();

console.log(numbers);        // Original array unchanged
console.log(reversedNumbers); // New reversed array

We create an array and reverse it using toReversed. The original
array remains unmodified. The method returns a new array with elements in
reverse order.

$ node main.js
[ 1, 2, 3, 4, 5 ]
[ 5, 4, 3, 2, 1 ]

## Reversing an array of strings

The toReversed method works with arrays containing any data type.

main.js
  

const fruits = ['apple', 'banana', 'cherry', 'date'];
const reversedFruits = fruits.toReversed();

console.log(fruits);
console.log(reversedFruits);

We reverse an array of strings. The original array remains intact while we get
a new array with the elements in reverse order. This works with any array
element type.

$ node main.js
[ 'apple', 'banana', 'cherry', 'date' ]
[ 'date', 'cherry', 'banana', 'apple' ]

## Comparing toReversed with reverse

This example shows the difference between toReversed and the
mutating reverse method.

main.js
  

const original1 = [1, 2, 3];
const result1 = original1.toReversed();

const original2 = [1, 2, 3];
const result2 = original2.reverse();

console.log(original1, result1);
console.log(original2, result2);

We demonstrate the key difference between the two methods. toReversed
preserves the original array while reverse modifies it in place.
Both methods produce the same reversed output.

$ node main.js
[ 1, 2, 3 ] [ 3, 2, 1 ]
[ 3, 2, 1 ] [ 3, 2, 1 ]

## Reversing a sparse array

The toReversed method handles sparse arrays (arrays with holes).

main.js
  

const sparseArray = [1, , 3, , 5];
const reversedSparse = sparseArray.toReversed();

console.log(sparseArray);
console.log(reversedSparse);

We create a sparse array with empty slots and reverse it. The empty slots are
preserved in the reversed array. The method maintains the array's sparsity
pattern in the result.

$ node main.js
[ 1, &lt;1 empty item&gt;, 3, &lt;1 empty item&gt;, 5 ]
[ 5, &lt;1 empty item&gt;, 3, &lt;1 empty item&gt;, 1 ]

## Using toReversed with array-like objects

The toReversed method can be called on array-like objects.

main.js
  

const arrayLike = {
  length: 3,
  0: 'a',
  1: 'b',
  2: 'c'
};

const reversed = Array.prototype.toReversed.call(arrayLike);
console.log(reversed);

We demonstrate using toReversed with an array-like object. The
method is called using Array.prototype and works on any object
with length and indexed properties.

$ node main.js
[ 'c', 'b', 'a' ]

## Source

[Array toReversed - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)

In this article we have demonstrated how to use the toReversed() method to
reverse arrays in JavaScript without mutation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)