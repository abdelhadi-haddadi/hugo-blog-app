+++
title = "JavaScript let keyword"
date = 2025-08-29T20:01:27.228+01:00
draft = false
description = "Learn how to declare block-scoped variables in JavaScript using the let keyword, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript let keyword

last modified April 16, 2025

In this article we explore the let keyword in JavaScript, which
declares block-scoped variables. We'll examine its behavior and advantages.

## The let keyword

The let keyword declares variables that are limited to the block,
statement, or expression where they're used. Unlike var, let
variables aren't hoisted to the top of their scope. This prevents common
scoping issues in JavaScript.

Variables declared with let have block scope, meaning they only
exist within the nearest curly braces. They can't be redeclared in the same
scope, but can be reassigned. This makes code more predictable and maintainable.

The temporal dead zone is a period where variables exist but can't be accessed.
It starts at the beginning of the block and ends when the declaration is
processed. This prevents referencing variables before their declaration.

## Basic let declaration

This example shows the basic usage of the let keyword.

main.js
  

let message = "Hello, World!";
console.log(message);

message = "Updated message";
console.log(message);

Here we declare a variable message with let and
initialize it. We then reassign a new value to it. Unlike const,
let allows reassignment. The variable is block-scoped to the
current execution context.

$ node main.js
Hello, World!
Updated message

## Block scope demonstration

This example demonstrates the block-scoping behavior of let.

main.js
  

let x = 10;

if (true) {
    let x = 20;
    console.log(x); // 20
}

console.log(x); // 10

The x variable inside the if block is a separate variable from
the outer x. This shows how let creates new
variables in each block scope. The outer x remains unchanged.

$ node main.js
20
10

## Temporal dead zone

This example illustrates the temporal dead zone behavior with let.

main.js
  

console.log(y); // ReferenceError
let y = 5;

Attempting to access y before its declaration throws a
ReferenceError. This differs from var which would return
undefined. The temporal dead zone prevents usage before declaration.

$ node main.js
ReferenceError: Cannot access 'y' before initialization

## Loop counter with let

Using let in loop counters creates a new binding for each iteration.

main.js
  

for (let i = 0; i &lt; 3; i++) {
    setTimeout(() =&gt; {
        console.log(i);
    }, 100);
}

Each iteration gets its own i variable, solving the classic closure
problem in loops. With var, all timeouts would log 3. Here we get
0, 1, 2 as expected due to block scoping.

$ node main.js
0
1
2

## Redeclaration prevention

let prevents redeclaration of the same variable in the same scope.

main.js
  

let name = "Alice";
let name = "Bob"; // SyntaxError

Attempting to redeclare name in the same scope throws a SyntaxError.
This helps catch potential bugs where variables might be unintentionally reused.
Different scopes can have variables with the same name though.

$ node main.js
SyntaxError: Identifier 'name' has already been declared

## Block scope in switch statements

Switch statements create separate block scopes for each case when using let.

main.js
  

let choice = 1;

switch (choice) {
    case 1:
        let message = "First case";
        console.log(message);
        break;
    case 2:
        let message = "Second case"; // SyntaxError
        console.log(message);
        break;
}

This fails because message is being redeclared in the same block.
To fix this, wrap each case in curly braces to create separate blocks. This
demonstrates how switch statements share the same block scope.

$ node main.js
SyntaxError: Identifier 'message' has already been declared

## Practical use case: block-scoped variables

Here's a practical example showing how let improves code safety.

main.js
  

function calculate() {
    let result = 0;
    
    for (let i = 0; i &lt; 5; i++) {
        result += i;
    }
    
    // i is not accessible here
    console.log(result);
    
    if (result &gt; 3) {
        let message = "Large result";
        console.log(message);
    }
    
    // message is not accessible here
}

calculate();

This shows how let keeps variables contained to their logical blocks.
The loop counter i and the message variable are only
accessible within their respective blocks. This prevents accidental misuse.

$ node main.js
10
Large result

## Source

[let - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

In this article we have demonstrated how to use the let keyword to declare
block-scoped variables in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)