+++
title = "JavaScript const keyword"
date = 2025-08-29T20:01:12.344+01:00
draft = false
description = "Learn how to declare constants in JavaScript using the const keyword, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript const keyword

last modified April 16, 2025

In this article we show how to declare constants using the const
keyword in JavaScript. We cover basic usage, scope, and important behaviors.

## The const keyword

The const keyword declares block-scoped constants in JavaScript.
Once declared, the identifier cannot be reassigned. This helps prevent
accidental changes to important values in your code.

Constants must be initialized during declaration. Unlike let and
var, you cannot declare a const without assigning a
value. The constant's value cannot change through reassignment.

However, for objects and arrays declared with const, their
properties or elements can still be modified. The const only
prevents reassignment of the variable itself, not mutation of its contents.

## Basic const declaration

The simplest use of const is to declare a primitive constant.

main.js
  

const PI = 3.14159;
console.log(PI);

// PI = 3.14; // TypeError: Assignment to constant variable

Here we declare a mathematical constant PI. Attempting to reassign it throws
an error. This demonstrates the immutability of const-declared primitives.
The value remains constant throughout the program's execution.

$ node main.js
3.14159

## Const with objects

While the object reference cannot change, its properties can be modified.

main.js
  

const person = {
    name: 'John',
    age: 30
};

person.age = 31; // Allowed
console.log(person);

// person = { name: 'Jane' }; // TypeError

This shows that while we can't reassign the person constant, we can modify its
properties. The const declaration protects the binding, not the object's
contents. This behavior is important to understand when working with objects.

$ node main.js
{ name: 'John', age: 31 }

## Const with arrays

Similar to objects, array elements can be modified even when declared with const.

main.js
  

const colors = ['red', 'green', 'blue'];
colors.push('yellow');
console.log(colors);

// colors = ['purple']; // TypeError

We can modify the array's contents but cannot reassign the colors constant.
This demonstrates that const protects the array reference, not its elements.
Array methods like push, pop, and splice still work on const arrays.

$ node main.js
[ 'red', 'green', 'blue', 'yellow' ]

## Block scope of const

Constants declared with const have block scope like let.

main.js
  

{
    const x = 10;
    console.log(x); // 10
}

// console.log(x); // ReferenceError: x is not defined

The constant x is only accessible within its block. Attempting to access it
outside throws an error. This block scoping prevents pollution of the global
namespace and avoids naming conflicts.

$ node main.js
10

## Const in loops

Using const in loops creates a new constant for each iteration.

main.js
  

for (const i = 0; i &lt; 3; i++) {
    console.log(i); // Works only once
}

// Better usage in for...of loops
const arr = [1, 2, 3];
for (const num of arr) {
    console.log(num);
}

The first loop fails because i cannot be incremented. However, for...of loops
work well with const as each iteration gets a new constant. This is a common
pattern when you don't need to modify loop variables.

$ node main.js
0
TypeError: Assignment to constant variable

## Temporal dead zone

Like let, const declarations are hoisted but not
initialized until declaration.

main.js
  

// console.log(MY_CONST); // ReferenceError
const MY_CONST = 42;
console.log(MY_CONST);

Accessing MY_CONST before declaration causes a ReferenceError due to the
temporal dead zone. This behavior helps catch bugs by preventing access to
variables before they're initialized. Always declare constants before use.

$ node main.js
42

## Object.freeze with const

To make an object truly immutable, combine const with
Object.freeze.

main.js
  

const settings = Object.freeze({
    theme: 'dark',
    fontSize: 14
});

// settings.theme = 'light'; // Error in strict mode
console.log(settings);

This creates a deeply immutable constant. While const prevents reassignment,
Object.freeze prevents property modification. Together they provide complete
immutability for the object's top-level properties.

$ node main.js
{ theme: 'dark', fontSize: 14 }

## Source

[const - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

In this article we have demonstrated how to use the const keyword to declare
constants in JavaScript. We covered basic usage, scope, and important behaviors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)