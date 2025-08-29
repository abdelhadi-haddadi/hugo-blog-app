+++
title = "JavaScript keys() method"
date = 2025-08-29T20:02:09.291+01:00
draft = false
description = "JavaScript keys() tutorial shows how to work with object keys in JavaScript. The tutorial provides numerous examples to demonstrate key iteration in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript keys() method

last modified April 4, 2025

 

In this article we show how to work with object keys using the keys
method in JavaScript.

## Object keys overview

The Object.keys method returns an array of a given object's own
enumerable property names. These property names are returned in the same order
as they would be if manually looped over the object's properties.

This method is useful when you need to inspect or manipulate an object's keys.
It only returns the object's own properties, not those inherited through the
prototype chain. The returned array can be used with array methods like
forEach, map, or filter.

The keys method is a static method of the Object constructor.
It takes an object as its parameter and returns an array of strings representing
the object's enumerable properties. Non-enumerable properties are excluded.

## Basic keys() example

The following example demonstrates the basic usage of the Object.keys
method.

main.js
  

const person = {
  name: 'John',
  age: 30,
  occupation: 'Developer'
};

const keys = Object.keys(person);

console.log(keys);

We create an object with three properties and use Object.keys to
get its keys. The method returns an array containing the property names as
strings. The order of keys matches their insertion order in the object.

$ node main.js
[ 'name', 'age', 'occupation' ]

## Counting object properties

The Object.keys method can be used to count an object's properties.

main.js
  

const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2020,
  color: 'blue'
};

const propertyCount = Object.keys(car).length;

console.log(`The car object has ${propertyCount} properties`);

We determine the number of properties in the car object by getting the length
of the array returned by Object.keys. This is a common pattern
for counting an object's own enumerable properties.

$ node main.js
The car object has 4 properties

## Iterating over object keys

The array returned by Object.keys can be used to iterate over
an object's properties.

main.js
  

const book = {
  title: 'JavaScript: The Good Parts',
  author: 'Douglas Crockford',
  pages: 176,
  published: 2008
};

Object.keys(book).forEach(key =&gt; {
  console.log(`${key}: ${book[key]}`);
});

We iterate over the book object's keys using forEach. For each key,
we log both the property name and its corresponding value. This pattern is
useful for inspecting or processing all properties of an object.

$ node main.js
title: JavaScript: The Good Parts
author: Douglas Crockford
pages: 176
published: 2008

## Checking if an object is empty

The Object.keys method can help determine if an object has
any own properties.

main.js
  

const emptyObj = {};
const nonEmptyObj = { a: 1 };

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty(emptyObj));    // true
console.log(isEmpty(nonEmptyObj)); // false

We create a helper function that checks if an object has no own enumerable
properties. This is done by verifying the length of the array returned by
Object.keys. Note this only checks for own properties.

$ node main.js
true
false

## Using keys() with array-like objects

The Object.keys method can be used with array-like objects
such as strings.

main.js
  

const str = 'hello';
const strKeys = Object.keys(str);

console.log(strKeys);

When used with a string, Object.keys returns an array of
the string's character indices. This works because strings in JavaScript
have enumerable properties for each character index when treated as objects.

$ node main.js
[ '0', '1', '2', '3', '4' ]

## Source

[Object.keys() - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

In this article we have demonstrated how to use the Object.keys
method to work with object properties in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)