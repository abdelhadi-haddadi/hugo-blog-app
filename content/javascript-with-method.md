+++
title = "JavaScript with() method"
date = 2025-08-29T20:02:18.291+01:00
draft = false
description = "JavaScript with() tutorial shows how to use the with statement in JavaScript. The tutorial provides examples to demonstrate with statement usage in JS."
image = ""
imageBig = ""
categories = ["js-array"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript with() method

last modified April 4, 2025

 

In this article we show how to use the with statement in JavaScript.
The with statement extends the scope chain for a statement.

## The with statement

The with statement extends the scope chain for a block. It allows
you to access properties of an object without repeating the object reference.
The syntax is: with (expression) statement.

While it can make code shorter, the with statement is discouraged
in modern JavaScript. It makes code harder to optimize and can lead to confusing
scope issues. In strict mode, the with statement is not allowed.

The with statement adds the given object to the head of the scope
chain. When looking up variable names, JavaScript checks this object first. If
the property isn't found, it continues searching the normal scope chain.

## Basic with example

The following example demonstrates the basic usage of the with
statement.

main.js
  

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};

with (person) {
    console.log(firstName);  // John
    console.log(lastName);   // Doe
    console.log(age);        // 30
}

We create a person object and use with to access its properties.
Inside the block, we can reference properties directly without the object name.
The properties are looked up in the person object first.

$ node main.js
John
Doe
30

## with statement and variable scope

The with statement affects variable lookup but doesn't change scope.

main.js
  

const settings = { color: 'blue' };
const color = 'red';

with (settings) {
    console.log(color);  // blue (from settings)
    console.log(window.color);  // red (global)
}

console.log(color);  // red (global)

We demonstrate how with affects variable lookup. Inside the block,
color refers to the settings property. Outside, it refers to the
global variable. To access the global variable inside, we use window.color.

$ node main.js
blue
red
red

## with statement and function calls

Function calls inside a with block can behave unexpectedly.

main.js
  

const utils = {
    log: function(message) {
        console.log('Utils:', message);
    }
};

function log(message) {
    console.log('Global:', message);
}

with (utils) {
    log('Hello');  // Which log function is called?
}

We have a log function in both the utils object and global scope.
Inside the with block, JavaScript first checks the utils object for
log. Since it exists there, that version is called, not the global one.

$ node main.js
Utils: Hello

## with statement and assignment

Assignments inside a with block can be ambiguous.

main.js
  

const config = { debug: false };

with (config) {
    debug = true;  // Modifies config.debug
    verbose = true; // Creates global variable!
}

console.log(config.debug);  // true
console.log(config.verbose); // undefined
console.log(verbose);       // true (global)

We show how assignments work in with blocks. If the property exists
on the object, it's modified. If not, a global variable is created (in non-strict
mode). This behavior can lead to bugs and is one reason with is discouraged.

$ node main.js
true
undefined
true

## Nested with statements

Multiple with statements can be nested, with inner ones taking precedence.

main.js
  

const outer = { prop: 'outer' };
const inner = { prop: 'inner' };

with (outer) {
    console.log(prop);  // outer
    
    with (inner) {
        console.log(prop);  // inner
    }
    
    console.log(prop);  // outer
}

We demonstrate nested with statements. The inner block's object
takes precedence for property lookup. After the inner block ends, lookup
returns to using the outer object. This shows how with affects
the scope chain temporarily.

$ node main.js
outer
inner
outer

## Source

[with statement - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)

In this article we have demonstrated how to use the with statement
in JavaScript. While it can shorten code, it's generally discouraged due to
potential issues with scope and performance.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JS Array Functions.](/javascript/#js-array)