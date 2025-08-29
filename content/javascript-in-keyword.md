+++
title = "JavaScript in keyword"
date = 2025-08-29T20:01:23.754+01:00
draft = false
description = "Explore how to use the in keyword in JavaScript for checking property existence in objects, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript in keyword

last modified April 16, 2025

In this article we show how to check for property existence using the in
operator in JavaScript.

## The in keyword

The in operator returns true if a specified property
exists in an object or its prototype chain. It checks for both own and inherited
properties. The syntax is property in object where property is a
string or symbol.

The in operator is useful when you need to verify if an object has
a certain property before accessing it. It works with arrays to check for index
existence. It's different from checking if a property's value is undefined.

Unlike hasOwnProperty(), the in operator checks the
entire prototype chain. For own properties only, combine in with
hasOwnProperty() or use Object.hasOwn() in modern JS.

## Basic object property check

The following example demonstrates the basic usage of the in
operator with an object.

main.js
  

const person = {
    name: 'John',
    age: 30
};

console.log('name' in person);  // true
console.log('email' in person); // false

This checks if 'name' and 'email' properties exist in the person object. The
first check returns true as 'name' exists, while 'email' returns false. The
property name must be specified as a string.

$ node main.js
true
false

## Checking array indices

The in operator can check if an array has a specific index.

main.js
  

const colors = ['red', 'green', 'blue'];

console.log(0 in colors);  // true
console.log(3 in colors);  // false
console.log('length' in colors); // true

Arrays are objects in JavaScript, so we can check for index existence. Note that
'length' is a built-in array property. The check returns true for existing
indices and false for non-existent ones.

$ node main.js
true
false
true

## Inherited properties check

The in operator checks the entire prototype chain for properties.

main.js
  

function Person(name) {
    this.name = name;
}

Person.prototype.age = 30;

const john = new Person('John');

console.log('name' in john); // true
console.log('age' in john);  // true
console.log('toString' in john); // true

Here we see that in finds both own properties (name) and inherited
properties (age, toString). The age property comes from the prototype, while
toString comes from Object.prototype.

$ node main.js
true
true
true

## Difference between in and hasOwnProperty

This example shows the difference between in and hasOwnProperty.

main.js
  

const car = {
    make: 'Toyota'
};

console.log('make' in car);          // true
console.log(car.hasOwnProperty('make')); // true

console.log('toString' in car);          // true
console.log(car.hasOwnProperty('toString')); // false

The in operator finds inherited properties like toString, while
hasOwnProperty only checks for own properties. Use hasOwnProperty
when you need to exclude inherited properties from the check.

$ node main.js
true
true
true
false

## Checking for Symbol properties

The in operator works with Symbol properties as well.

main.js
  

const id = Symbol('id');
const user = {
    [id]: 123,
    name: 'Alice'
};

console.log(id in user);       // true
console.log('name' in user);   // true
console.log(Symbol('id') in user); // false

Symbols must be referenced exactly to be found. The last check fails because it
uses a different Symbol instance. Symbol properties are unique and cannot be
accidentally overwritten.

$ node main.js
true
true
false

## Checking DOM element properties

The in operator can check for DOM element properties and methods.

main.js
  

const element = document.createElement('div');

console.log('innerHTML' in element);  // true
console.log('click' in element);      // true
console.log('nonExistent' in element); // false

This checks if certain properties and methods exist on a DOM element. Note that
this works in browser environments. DOM elements have many inherited properties
from their prototype chain.

$ node main.js
true
true
false

## Practical use case: feature detection

Here's a practical example of using in for feature detection.

main.js
  

// Check if browser supports the fetch API
if ('fetch' in window) {
    console.log('Fetch API is supported');
} else {
    console.log('Consider using XMLHttpRequest or a polyfill');
}

// Check if a specific method exists
const obj = {
    modernMethod() {
        console.log('Modern method called');
    }
};

if ('modernMethod' in obj) {
    obj.modernMethod();
}

This demonstrates how to check for API support before using it. Feature detection
is more reliable than browser sniffing. The second part shows checking for a
specific method in an object before calling it.

$ node main.js
Consider using XMLHttpRequest or a polyfill
Modern method called

## Source

[in - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)

In this article we have demonstrated how to use the in operator to check for
property existence in JavaScript objects and arrays.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)