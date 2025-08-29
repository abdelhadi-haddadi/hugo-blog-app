+++
title = "JavaScript indexOf method"
date = 2025-08-29T20:02:08.183+01:00
draft = false
description = "JavaScript indexOf tutorial shows how to find elements in JavaScript arrays and strings. The tutorial provides numerous examples to demonstrate element searching in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript indexOf method

last modified April 4, 2025

 

In this article we show how to find elements using the indexOf method
in JavaScript. The method works with both arrays and strings.

## The indexOf method

The indexOf method returns the first index at which a given element
can be found in an array or string. If the element is not present, it returns -1.
The method performs a strict equality comparison (===) when searching.

For arrays, it searches for the specified value starting from the beginning. For
strings, it searches for a substring within the string. Both versions can take an
optional second parameter to specify the starting position for the search.

The indexOf method is case-sensitive when used with strings. It does
not modify the original array or string. The method is commonly used to check for
the presence of an element or to find its position in a collection.

## Basic array indexOf example

The following example demonstrates the basic usage of the indexOf
method with arrays.

main.js
  

const fruits = ['apple', 'banana', 'orange', 'grape'];
const index = fruits.indexOf('banana');

console.log(index);  // Position of 'banana'
console.log(fruits.indexOf('pear'));  // Not found

We create an array of fruits and search for 'banana'. The method returns its
position (1). When searching for 'pear', it returns -1 as it's not in the array.
Array indices start at 0, so the second element has index 1.

$ node main.js
1
-1

## Finding elements with fromIndex

The indexOf method can take a second parameter to specify where to
start the search.

main.js
  

const numbers = [1, 2, 3, 2, 1];
const firstTwo = numbers.indexOf(2);
const secondTwo = numbers.indexOf(2, 2);

console.log(firstTwo);  // First occurrence
console.log(secondTwo); // Second occurrence

We search for the number 2 in an array. The first search starts from index 0.
The second search starts from index 2, skipping the first occurrence. This
demonstrates how to find multiple occurrences of the same value.

$ node main.js
1
3

## String indexOf example

The indexOf method can also be used with strings to find substrings.

main.js
  

const text = 'Hello world, welcome to JavaScript';
const position = text.indexOf('world');

console.log(position);  // Position of 'world'
console.log(text.indexOf('World'));  // Case-sensitive

We search for the substring 'world' in a string. The method returns its starting
position (6). The search is case-sensitive, so 'World' returns -1. String
indices also start at 0.

$ node main.js
6
-1

## Checking element existence

The indexOf method is often used to check if an element exists.

main.js
  

const colors = ['red', 'green', 'blue'];
const hasGreen = colors.indexOf('green') !== -1;
const hasYellow = colors.indexOf('yellow') !== -1;

console.log(hasGreen);  // true
console.log(hasYellow); // false

We check if 'green' and 'yellow' exist in the array. By comparing with -1, we
convert the position to a boolean. This is a common pattern for existence checks.
Modern JavaScript also provides includes for this purpose.

$ node main.js
true
false

## Finding all occurrences

We can use indexOf in a loop to find all occurrences of an element.

main.js
  

const data = [1, 3, 5, 3, 7, 3, 9];
const target = 3;
let indices = [];
let currentIndex = -1;

while ((currentIndex = data.indexOf(target, currentIndex + 1)) !== -1) {
    indices.push(currentIndex);
}

console.log(indices);  // All positions of 3

We find all occurrences of the number 3 in an array. The loop starts searching
from the position after the last found index. Each found position is added to
the indices array. This technique works for both arrays and strings.

$ node main.js
[ 1, 3, 5 ]

## Source

[Array indexOf - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

In this article we have demonstrated how to use the indexOf() method to find
elements in JavaScript arrays and strings.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)