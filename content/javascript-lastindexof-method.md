+++
title = "JavaScript lastIndexOf method"
date = 2025-08-29T20:02:09.284+01:00
draft = false
description = "JavaScript lastIndexOf tutorial shows how to find elements in arrays and strings in JavaScript. The tutorial provides numerous examples to demonstrate element searching in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript lastIndexOf method

last modified April 4, 2025

 

In this article we show how to find elements using the lastIndexOf
method in JavaScript for both arrays and strings.

## The lastIndexOf method

The lastIndexOf method returns the last index at which a given
element can be found in an array or string. For arrays, it searches backwards
from the end. For strings, it searches backwards from the specified index.

The method returns -1 if the element is not found. For arrays, it uses strict
equality (===) for comparison. For strings, it performs a case-sensitive search.
The method is available on both Array and String prototypes in JavaScript.

The lastIndexOf method can take an optional second parameter to
specify the starting index for the search. Negative values count back from the
end of the array or string. This makes it useful for finding the last occurrence
of an element.

## Basic array lastIndexOf example

The following example demonstrates the basic usage of lastIndexOf
with arrays.

main.js
  

const fruits = ['apple', 'banana', 'orange', 'banana', 'kiwi'];
const lastBanana = fruits.lastIndexOf('banana');

console.log(`Last banana at index: ${lastBanana}`);
console.log(`Mango not found: ${fruits.lastIndexOf('mango')}`);

We create an array of fruits and search for the last occurrence of 'banana'.
The method returns 3, which is the index of the last 'banana'. When searching
for 'mango', it returns -1 as it doesn't exist in the array.

$ node main.js
Last banana at index: 3
Mango not found: -1

## String lastIndexOf example

The lastIndexOf method works similarly with strings.

main.js
  

const quote = "To be, or not to be, that is the question.";
const lastBe = quote.lastIndexOf("be");

console.log(`Last 'be' at index: ${lastBe}`);
console.log(`Case sensitive search: ${quote.lastIndexOf("Be")}`);

We search a string for the last occurrence of "be". The method returns the
index where it's found. Note that the search is case-sensitive, so searching
for "Be" returns -1 as it doesn't match exactly.

$ node main.js
Last 'be' at index: 17
Case sensitive search: -1

## Using the fromIndex parameter

The lastIndexOf method accepts an optional second parameter to
specify where to start searching.

main.js
  

const numbers = [2, 5, 9, 2, 5, 9, 2];
const search1 = numbers.lastIndexOf(2);
const search2 = numbers.lastIndexOf(2, 3);
const search3 = numbers.lastIndexOf(2, -3);

console.log(`Search1: ${search1}`);
console.log(`Search2: ${search2}`);
console.log(`Search3: ${search3}`);

We demonstrate different searches with the fromIndex parameter. The first search
finds the last 2 at index 6. The second starts at index 3 and finds 2 at index 3.
The third uses a negative index, counting back from the end.

$ node main.js
Search1: 6
Search2: 3
Search3: 0

## Finding all occurrences with lastIndexOf

We can use lastIndexOf in a loop to find all occurrences of an
element.

main.js
  

const data = [1, 2, 3, 4, 2, 5, 2, 6];
const target = 2;
let indices = [];
let currentIndex = data.lastIndexOf(target);

while (currentIndex !== -1) {
    indices.push(currentIndex);
    currentIndex = data.lastIndexOf(target, currentIndex - 1);
}

console.log(`All indices of ${target}:`, indices);

This code finds all indices where the number 2 appears in the array. We start
with the last occurrence and work backwards, updating the search position each
time. The loop continues until no more occurrences are found.

$ node main.js
All indices of 2: [ 6, 4, 1 ]

## Complex object search with lastIndexOf

The lastIndexOf method uses strict equality, which affects how it
works with objects.

main.js
  

const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 1 };
const objects = [obj1, obj2, obj3, obj1];

console.log(`Last obj1: ${objects.lastIndexOf(obj1)}`);
console.log(`Last obj3: ${objects.lastIndexOf(obj3)}`);
console.log(`Same content but different object: ${objects.lastIndexOf({ id: 1 })}`);

We demonstrate how lastIndexOf works with objects. It only finds
objects that reference the exact same object in memory. Even though obj1 and
obj3 have the same content, they are different objects. A new object with the
same content is not found at all.

$ node main.js
Last obj1: 3
Last obj3: 2
Same content but different object: -1

## Source

[Array lastIndexOf - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

In this article we have demonstrated how to use the lastIndexOf() method to
find elements in arrays and strings in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)