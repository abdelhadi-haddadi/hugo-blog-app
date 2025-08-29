+++
title = "JavaScript Set keyword"
date = 2025-08-29T20:01:38.135+01:00
draft = false
description = "Understand how to work with JavaScript Set for managing collections of unique values, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Set keyword

last modified April 16, 2025

In this article we show how to work with collections of unique values using the
Set object in JavaScript.

## The Set object

The Set object is a collection of unique values. It can store any
type of value, whether primitive values or object references. Each value may
occur only once in a Set.

Sets are similar to arrays, but they don't allow duplicate values. They provide
methods to add, delete, and check for the existence of elements. Sets maintain
insertion order of elements.

Sets are useful when you need to maintain a collection of unique items. They
offer better performance for certain operations compared to arrays.

## Creating a Set

The following example demonstrates how to create a Set in JavaScript.

main.js
  

const mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add('text');
mySet.add({name: 'John'});

console.log(mySet);

We create a new Set using the new Set() constructor. We add various
types of values to the Set using the add() method. The Set can
contain numbers, strings, and objects.

$ node main.js
Set { 1, 5, 'text', { name: 'John' } }

## Set from an array

We can create a Set from an array, which automatically removes duplicates.

main.js
  

const numbers = [1, 2, 3, 4, 4, 5, 5, 5];
const uniqueNumbers = new Set(numbers);

console.log(uniqueNumbers);
console.log([...uniqueNumbers]);

This example shows how to create a Set from an array with duplicate values. The
Set automatically removes duplicates. We convert the Set back to an array using
the spread operator.

$ node main.js
Set { 1, 2, 3, 4, 5 }
[ 1, 2, 3, 4, 5 ]

## Checking Set size and existence

Sets provide methods to check their size and whether they contain a value.

main.js
  

const fruits = new Set(['apple', 'banana', 'orange']);

console.log(fruits.size);
console.log(fruits.has('apple'));
console.log(fruits.has('grape'));

The size property returns the number of elements in the Set. The
has() method checks if a value exists in the Set. Both operations
are very efficient with Sets.

$ node main.js
3
true
false

## Removing elements from a Set

Sets provide methods to remove individual elements or clear all elements.

main.js
  

const colors = new Set(['red', 'green', 'blue']);

colors.delete('green');
console.log(colors);

colors.clear();
console.log(colors);

The delete() method removes a specific element from the Set. The
clear() method removes all elements from the Set. Both methods
modify the Set in place.

$ node main.js
Set { 'red', 'blue' }
Set {}

## Iterating through a Set

Sets can be iterated using various methods, similar to arrays.

main.js
  

const letters = new Set(['a', 'b', 'c']);

// Using for...of
for (const letter of letters) {
    console.log(letter);
}

// Using forEach
letters.forEach(letter =&gt; {
    console.log(letter);
});

Sets maintain insertion order, so iteration follows the order elements were added.
We can use for...of or forEach to iterate through a
Set. Sets are iterable objects.

$ node main.js
a
b
c
a
b
c

## Set operations: union, intersection, difference

We can perform common set operations like union, intersection, and difference.

main.js
  

const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

// Union
const union = new Set([...setA, ...setB]);
console.log(union);

// Intersection
const intersection = new Set([...setA].filter(x =&gt; setB.has(x)));
console.log(intersection);

// Difference
const difference = new Set([...setA].filter(x =&gt; !setB.has(x)));
console.log(difference);

This example demonstrates basic set operations. Union combines elements from both
sets. Intersection finds common elements. Difference finds elements in setA not
in setB.

$ node main.js
Set { 1, 2, 3, 4 }
Set { 2, 3 }
Set { 1 }

## Practical use case: tracking unique visitors

Here's a practical example of using Set to track unique website visitors.

main.js
  

const visitors = new Set();

function addVisitor(id) {
    visitors.add(id);
    console.log(`Total unique visitors: ${visitors.size}`);
}

addVisitor('user1');
addVisitor('user2');
addVisitor('user1'); // Duplicate
addVisitor('user3');

console.log('All visitors:', [...visitors]);

This code uses a Set to track unique visitor IDs. Duplicate IDs are automatically
ignored. The size property gives the count of unique visitors.

$ node main.js
Total unique visitors: 1
Total unique visitors: 2
Total unique visitors: 2
Total unique visitors: 3
All visitors: [ 'user1', 'user2', 'user3' ]

## Source

[Set - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

In this article we have demonstrated how to use the Set object to work with
collections of unique values in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)