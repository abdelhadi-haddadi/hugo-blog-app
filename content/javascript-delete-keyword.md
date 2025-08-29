+++
title = "JavaScript delete keyword"
date = 2025-08-29T20:01:14.548+01:00
draft = false
description = "Learn how to use the delete keyword in JavaScript for removing object properties, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript delete keyword

last modified April 16, 2025

In this article we show how to remove object properties using the delete
keyword in JavaScript.

## The delete keyword

The delete operator removes a property from an object. It returns
true if the deletion was successful, or false otherwise.
The operator only affects the object's own properties, not inherited ones.

delete works on object properties, not variables or functions. It
cannot delete variables declared with var, let, or
const. For arrays, it removes the element but leaves the length
unchanged.

After deletion, accessing the property returns undefined. The
property is completely removed from the object, not just set to undefined.

## Basic property deletion

The following example demonstrates basic usage of the delete
operator.

main.js
  

const person = {
    name: 'John',
    age: 30,
    occupation: 'Developer'
};

console.log(person.name); // John
delete person.name;
console.log(person.name); // undefined

This code removes the name property from the person
object. After deletion, accessing the property returns undefined. The property
is completely removed from the object.

$ node main.js
John
undefined

## Deleting non-configurable properties

Some properties cannot be deleted because they are non-configurable.

main.js
  

const obj = {};
Object.defineProperty(obj, 'prop', {
    value: 42,
    configurable: false
});

console.log(delete obj.prop); // false
console.log(obj.prop); // 42

This example shows that non-configurable properties cannot be deleted. The
delete operation returns false and the property
remains. Built-in objects often have non-configurable properties.

$ node main.js
false
42

## Deleting array elements

The delete operator can remove array elements but leaves a hole.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];
delete fruits[1];

console.log(fruits); // ['apple', empty, 'cherry']
console.log(fruits.length); // 3

When deleting array elements, the length remains unchanged. The element is
removed but leaves an empty slot. For complete removal, use splice
instead of delete.

$ node main.js
[ 'apple', &lt;1 empty item&gt;, 'cherry' ]
3

## Deleting global variables

Global variables created without declaration can be deleted, but declared ones cannot.

main.js
  

// Implicit global (no var/let/const)
x = 10;
console.log(delete x); // true

// Declared variable
let y = 20;
console.log(delete y); // false

This shows the difference between implicit globals and declared variables.
Only properties of the global object (implicit globals) can be deleted.
Declared variables are non-configurable.

$ node main.js
true
false

## Deleting function parameters

Function parameters cannot be deleted in strict mode, but may be in non-strict.

main.js
  

function test(param) {
    console.log(delete param); // false in strict mode
    console.log(param); // remains
}

test('value');

Function parameters are treated like local variables. In strict mode, attempting
to delete them throws an error. In non-strict mode, it silently fails.

$ node main.js
false
value

## Deleting inherited properties

The delete operator only affects own properties, not inherited ones.

main.js
  

const parent = { prop: 'value' };
const child = Object.create(parent);

console.log(child.prop); // 'value'
console.log(delete child.prop); // true (but doesn't affect parent)
console.log(child.prop); // 'value' (still inherited)

This demonstrates that delete only removes own properties. Even
though it returns true, inherited properties remain accessible. The parent
object's property is untouched.

$ node main.js
value
true
value

## Checking property existence after deletion

After deletion, the in operator and hasOwnProperty
reflect the change.

main.js
  

const obj = { prop: 'exists' };
console.log('prop' in obj); // true

delete obj.prop;
console.log('prop' in obj); // false
console.log(obj.hasOwnProperty('prop')); // false

These methods correctly identify when a property has been deleted. They differ
from checking for undefined, as a property might exist with that
value.

$ node main.js
true
false
false

## Source

[delete - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)

In this article we have demonstrated how to use the delete keyword to remove
properties from objects in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)