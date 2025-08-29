+++
title = "JavaScript set() method"
date = 2025-08-29T20:02:12.676+01:00
draft = false
description = "JavaScript set() tutorial shows how to work with Sets in JavaScript. The tutorial provides numerous examples to demonstrate Set operations in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript set() method

last modified April 4, 2025

 

In this article we show how to work with Sets using the set method
in JavaScript.

## JavaScript Sets

A Set is a collection of unique values where each value may occur only once. 
The set method is used to add new elements to a Set object. 
Sets maintain insertion order and can store any type of value.

Unlike arrays, Sets automatically remove duplicate values when adding elements.
This makes them particularly useful for storing collections where uniqueness is
required. Sets provide efficient methods for checking element existence.

The set method is actually part of the Map object in JavaScript.
For Sets, we use the add method to insert new elements. This
tutorial covers both concepts to clarify this common point of confusion.

## Basic Set example

The following example demonstrates the basic usage of a Set in JavaScript.

main.js
  

const mySet = new Set();

// Adding elements to the Set
mySet.add(1);
mySet.add(5);
mySet.add('text');

console.log(mySet);

We create a new Set and add three different types of elements to it. The Set
automatically maintains uniqueness and preserves the insertion order of elements.

$ node main.js
Set(3) { 1, 5, 'text' }

## Set with duplicate values

Sets automatically handle duplicate values by keeping only one instance.

main.js
  

const numbers = new Set();

numbers.add(1);
numbers.add(2);
numbers.add(1); // Duplicate value
numbers.add(3);

console.log(numbers);
console.log(numbers.size); // Number of unique elements

We attempt to add duplicate values to the Set. The Set automatically filters
these duplicates, maintaining only unique values. The size property
shows the count of unique elements.

$ node main.js
Set(3) { 1, 2, 3 }
3

## Set with objects

Sets can store object references, treating different object instances as unique.

main.js
  

const objSet = new Set();
const obj1 = {name: 'John'};
const obj2 = {name: 'John'};

objSet.add(obj1);
objSet.add(obj2);
objSet.add(obj1); // Same object reference

console.log(objSet);

We add object references to a Set. Even though obj1 and obj2 have identical
properties, they are different objects in memory. Adding the same object
reference multiple times only stores it once.

$ node main.js
Set(2) { { name: 'John' }, { name: 'John' } }

## Converting Array to Set

Sets can be created from arrays to automatically remove duplicates.

main.js
  

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueFruits = new Set(fruits);

console.log(uniqueFruits);
console.log([...uniqueFruits]); // Convert back to array

We convert an array with duplicate values to a Set. The Set automatically removes
duplicates. We then convert the Set back to an array using the spread operator.

$ node main.js
Set(3) { 'apple', 'banana', 'orange' }
[ 'apple', 'banana', 'orange' ]

## Map set() method example

The actual set method belongs to Map objects for adding key-value
pairs.

main.js
  

const userMap = new Map();

// Using set() to add key-value pairs
userMap.set('name', 'Alice');
userMap.set('age', 30);
userMap.set('occupation', 'Developer');

console.log(userMap);
console.log(userMap.get('name')); // Retrieve value

We create a Map and use the set method to add key-value pairs.
The get method retrieves values by their keys. Maps maintain
insertion order like Sets but store keyed data.

$ node main.js
Map(3) {
  'name' =&gt; 'Alice',
  'age' =&gt; 30,
  'occupation' =&gt; 'Developer'
}
Alice

## Source

[Set - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

In this article we have demonstrated how to use Sets and the related Map.set()
method in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)