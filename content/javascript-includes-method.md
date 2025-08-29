+++
title = "JavaScript includes method"
date = 2025-08-29T20:02:08.186+01:00
draft = false
description = "JavaScript includes tutorial shows how to check for elements in arrays and strings in JavaScript. The tutorial provides examples to demonstrate element checking in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript includes method

last modified April 4, 2025

 

In this article we show how to check for elements using the includes
method in JavaScript.

## Element checking with includes

The includes method determines whether an array or string contains
a specified element or substring. It returns true if found,
false otherwise. This method performs a case-sensitive search.

For arrays, it checks if any element matches the search element. For strings,
it checks for substring matches. The method accepts an optional second parameter
to specify the starting position for the search.

The includes method is useful for simple existence checks without
needing the index position. It provides a more readable alternative to
indexOf when you only need a boolean result.

## Basic array includes example

The following example demonstrates checking for an element in an array.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
const hasBanana = fruits.includes('banana');
const hasMango = fruits.includes('mango');

console.log(hasBanana);
console.log(hasMango);

We check if 'banana' and 'mango' exist in the fruits array. The method returns
true for elements present in the array and false for
elements not found. The search is case-sensitive.

$ node main.js
true
false

## String includes example

The includes method can also check for substrings in strings.

main.js
  

const sentence = 'The quick brown fox jumps over the lazy dog';
const hasFox = sentence.includes('fox');
const hasCat = sentence.includes('cat');

console.log(hasFox);
console.log(hasCat);

We check if the sentence contains 'fox' and 'cat' substrings. The method works
similarly for strings as it does for arrays. String searches are also
case-sensitive by default.

$ node main.js
true
false

## Case sensitivity in includes

The includes method performs case-sensitive searches by default.

main.js
  

const colors = ['Red', 'Green', 'Blue'];
const hasRed = colors.includes('red');
const hasGreen = colors.includes('Green');

console.log(hasRed);
console.log(hasGreen);

We demonstrate the case sensitivity of the includes method. The
search for 'red' fails because the array contains 'Red' with uppercase R.
Matching case is required for successful searches.

$ node main.js
false
true

## Using the position parameter

The optional second parameter specifies the starting position for the search.

main.js
  

const numbers = [1, 2, 3, 4, 5, 2];
const hasTwoAtStart = numbers.includes(2);
const hasTwoAfterPos3 = numbers.includes(2, 3);

console.log(hasTwoAtStart);
console.log(hasTwoAfterPos3);

We search for the number 2 starting from different positions. The first search
finds the first occurrence. The second search starts at position 3 and finds
the second occurrence. Negative positions count from the end of the array.

$ node main.js
true
true

## Checking for NaN with includes

The includes method can correctly identify NaN values.

main.js
  

const values = [1, NaN, 3];
const hasNaN = values.includes(NaN);
const indexOfNaN = values.indexOf(NaN);

console.log(hasNaN);
console.log(indexOfNaN);

Unlike indexOf, includes can properly detect NaN
values in arrays. This is because includes uses the SameValueZero
algorithm, which considers NaN equal to itself.

$ node main.js
true
-1

## Source

[Array includes - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

In this article we have demonstrated how to use the includes() method to check
for elements in arrays and strings in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)