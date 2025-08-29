+++
title = "JavaScript null keyword"
date = 2025-08-29T20:01:31.974+01:00
draft = false
description = "Learn how to use the null keyword in JavaScript to represent the intentional absence of any object value, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript null keyword

last modified April 16, 2025

In this article we explore the null keyword in JavaScript, which
represents the intentional absence of any object value. We'll examine its
behavior and usage through practical examples.

## The null keyword

The null keyword is a primitive value that represents the intentional
absence of any object value. It is one of JavaScript's primitive types along with
undefined, boolean, number, string, and symbol.

null is often used to indicate that a variable should have no value
or that an object property should be empty. It's different from undefined, which
means a variable has been declared but not assigned a value.

In type checking, null returns "object" due to a historical bug in
JavaScript. This can be confusing but is important to remember when writing type
checks in your code.

## Basic null assignment

The simplest way to use null is to assign it to a variable.

main.js
  

let user = null;
console.log(user); // null
console.log(typeof user); // object

Here we assign null to the user variable. When logged, it shows null, but its
type is reported as "object". This demonstrates null's special behavior in
JavaScript's type system.

$ node main.js
null
object

## Checking for null

To check if a value is null, use strict equality (===).

main.js
  

let data = null;

if (data === null) {
    console.log('Data is null');
} else {
    console.log('Data has a value');
}

This example shows the proper way to check for null values. Using == would also
match undefined, which is usually not desired. The strict equality operator
ensures we only match null.

$ node main.js
Data is null

## Null vs undefined

Null and undefined are similar but have important differences.

main.js
  

let var1 = null;
let var2;

console.log(var1); // null
console.log(var2); // undefined
console.log(var1 == var2); // true
console.log(var1 === var2); // false

This demonstrates how null and undefined compare. They're equal with == but not
with ===. Undefined means "no value assigned", while null means "no value on
purpose".

$ node main.js
null
undefined
true
false

## Null in object properties

Null is often used to clear object properties.

main.js
  

let person = {
    name: 'John',
    age: 30,
    address: null
};

console.log(person.address); // null
person.address = '123 Main St';
console.log(person.address); // 123 Main St
person.address = null;
console.log(person.address); // null

Here we use null to indicate the address property is intentionally empty. We can
later assign a real value or set it back to null. This is a common pattern for
optional object properties.

$ node main.js
null
123 Main St
null

## Null as function return value

Functions can return null to indicate no valid result.

main.js
  

function findUser(id) {
    // Simulate not finding a user
    return null;
}

let user = findUser(123);
if (user === null) {
    console.log('User not found');
}

This pattern is common in functions that search for data. Returning null clearly
indicates no result was found, unlike undefined which might imply an error or
that the function wasn't properly implemented.

$ node main.js
User not found

## Null in default parameters

Null can be used with default parameters to distinguish between missing and null values.

main.js
  

function greet(name = 'Guest') {
    if (name === null) {
        console.log('Hello Anonymous');
    } else {
        console.log(`Hello ${name}`);
    }
}

greet(); // Hello Guest
greet(null); // Hello Anonymous
greet('John'); // Hello John

Here we handle null differently from an omitted parameter. The default value only
applies when the argument is undefined, not when it's explicitly null. This
allows for more precise parameter handling.

$ node main.js
Hello Guest
Hello Anonymous
Hello John

## Null in JSON

Null is properly serialized in JSON, unlike undefined.

main.js
  

let data = {
    name: 'Alice',
    age: null,
    score: undefined
};

let json = JSON.stringify(data);
console.log(json); // {"name":"Alice","age":null}

When converting to JSON, null values are preserved while undefined properties are
omitted. This shows how null is a valid JSON value while undefined is not part
of the JSON specification.

$ node main.js
{"name":"Alice","age":null}

## Source

[null - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

In this article we have demonstrated how to use the null keyword to represent
intentional absence of values in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)