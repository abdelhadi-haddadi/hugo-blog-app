+++
title = "JavaScript var keyword"
date = 2025-08-29T20:01:42.712+01:00
draft = false
description = "Understand how to declare variables in JavaScript using the var keyword, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript var keyword

last modified April 16, 2025

In this article we show how to declare variables using the var
keyword in JavaScript. We cover basic usage, hoisting, and scope rules.

## The var keyword

The var keyword is used to declare variables in JavaScript. It was
the original way to declare variables before ES6 introduced let and
const. Variables declared with var are function-scoped.

Unlike let and const, var declarations are
hoisted to the top of their scope. This means you can use a variable before it's
declared. However, only the declaration is hoisted, not the initialization.

Variables declared with var can be redeclared and updated within
their scope. They are also attached to the global object when declared outside
any function. This behavior differs from modern variable declarations.

## Basic variable declaration

The following example demonstrates the basic usage of the var
keyword to declare variables.

main.js
  

var message = "Hello, World!";
console.log(message);

var count = 10;
count = 20;
console.log(count);

Here we declare two variables using var. The first holds a string,
the second a number that we later update. Variables declared with var
can be reassigned new values. The console output shows both variable values.

$ node main.js
Hello, World!
20

## Variable hoisting

Variables declared with var are hoisted to the top of their scope.

main.js
  

console.log(name); // undefined
var name = "John Doe";
console.log(name); // John Doe

This example demonstrates hoisting. We can reference name before
its declaration, but its value is undefined until assignment. The
declaration is moved to the top, but initialization happens where written.

$ node main.js
undefined
John Doe

## Function scope

Variables declared with var are function-scoped, not block-scoped.

main.js
  

function testScope() {
    if (true) {
        var x = 10;
    }
    console.log(x); // 10
}
testScope();

The variable x is accessible outside the if block because var
declarations are function-scoped. This differs from let and const
which are block-scoped. The variable exists throughout the entire function.

$ node main.js
10

## Global scope

When declared outside any function, var variables become global.

main.js
  

var globalVar = "I'm global";

function checkGlobal() {
    console.log(globalVar); // Accessible
}

checkGlobal();
console.log(globalVar); // Also accessible
console.log(window.globalVar); // In browsers

This shows a global variable declaration. It's accessible everywhere in the code.
In browser environments, global var variables become properties of
the window object. This doesn't happen with let or const.

$ node main.js
I'm global
I'm global
undefined

## Redeclaration

Variables declared with var can be redeclared within the same scope.

main.js
  

var counter = 5;
console.log(counter);

var counter = 10; // Redeclaration allowed
console.log(counter);

This example shows redeclaration of a variable. With var, this
doesn't cause an error, unlike with let or const.
The second declaration simply updates the variable's value.

$ node main.js
5
10

## No block scope

Variables declared with var don't respect block scope.

main.js
  

for (var i = 0; i &lt; 3; i++) {
    console.log(i);
}
console.log("After loop:", i); // Still accessible

The variable i remains accessible after the loop because var
doesn't respect block scope. This can lead to unexpected behavior in some cases.
Modern JavaScript prefers let for loop counters to avoid this issue.

$ node main.js
0
1
2
After loop: 3

## Immediately Invoked Function Expression (IIFE)

IIFEs were commonly used with var to create private scope.

main.js
  

(function() {
    var privateVar = "I'm private";
    console.log(privateVar);
})();

// console.log(privateVar); // Would throw ReferenceError

This IIFE creates a new scope for privateVar. Before block-scoped
variables, this pattern was used to avoid polluting the global namespace. The
variable isn't accessible outside the function.

$ node main.js
I'm private

## Source

[var - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

In this article we have demonstrated how to use the var keyword to declare
variables in JavaScript, covering its unique characteristics and behaviors.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)