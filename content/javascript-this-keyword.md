+++
title = "JavaScript this keyword"
date = 2025-08-29T20:01:41.546+01:00
draft = false
description = "Understand the 'this' keyword in JavaScript for managing context, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript this keyword

last modified April 16, 2025

In this article we explore the JavaScript this keyword, which refers
to the context in which code is executed. Understanding this is
crucial for object-oriented programming in JavaScript.

## The this keyword

The this keyword in JavaScript refers to the object it belongs to.
Its value is determined by how a function is called (runtime binding). In most
cases, this refers to the object that owns the currently executing
code.

The value of this changes depending on the execution context. In
global scope, this refers to the global object (window in browsers).
Inside a method, this refers to the owner object.

Arrow functions don't have their own this binding. Instead, they
inherit this from the parent scope at creation time. This makes
arrow functions particularly useful for callbacks and event handlers.

## Global context

In the global execution context, this refers to the global object.

main.js
  

console.log(this === window); // true in browser

this.globalVar = 'Hello';
console.log(window.globalVar); // 'Hello'

In a browser environment, the global object is window. When we
assign a property to this in global scope, it becomes a global
variable. This demonstrates that this refers to the global object.

$ node main.js
true
Hello

## Function context

In a regular function, this depends on how the function is called.

main.js
  

function showThis() {
    console.log(this);
}

showThis(); // window/global in non-strict, undefined in strict

In non-strict mode, this in a function refers to the global object.
In strict mode, it's undefined. This example shows the default binding of
this in function calls.

$ node main.js
Object [global] {
  // ... global object properties
}

## Method context

When a function is called as a method of an object, this refers to
the object.

main.js
  

const person = {
    name: 'John',
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet();

Here, this inside the greet method refers to the
person object. We can access the object's properties through
this. This is called implicit binding.

$ node main.js
Hello, my name is John

## Constructor context

In constructor functions, this refers to the newly created instance.

main.js
  

function Car(make, model) {
    this.make = make;
    this.model = model;
    this.info = function() {
        console.log(`${this.make} ${this.model}`);
    };
}

const myCar = new Car('Toyota', 'Camry');
myCar.info();

When called with new, the constructor's this points to
the new object being created. The new keyword creates a new object
and sets this to reference it.

$ node main.js
Toyota Camry

## Explicit binding with call and apply

We can explicitly set this using call or apply.

main.js
  

function introduce(lang1, lang2) {
    console.log(`My name is ${this.name} and I know ${lang1} and ${lang2}`);
}

const person = { name: 'Alice' };
introduce.call(person, 'JavaScript', 'Python');
introduce.apply(person, ['Ruby', 'Java']);

Both call and apply invoke the function with a specific
this value. The difference is in how arguments are passed. This is
useful for borrowing methods between objects.

$ node main.js
My name is Alice and I know JavaScript and Python
My name is Alice and I know Ruby and Java

## Arrow functions and this

Arrow functions don't have their own this but inherit it from the
enclosing context.

main.js
  

const obj = {
    name: 'Bob',
    regularFunc: function() {
        console.log(this.name);
    },
    arrowFunc: () =&gt; {
        console.log(this.name);
    }
};

obj.regularFunc(); // 'Bob'
obj.arrowFunc();   // undefined (or window.name in browser)

The arrow function's this comes from its lexical scope (where it's
defined). In this case, it inherits this from the global scope,
not from obj.

$ node main.js
Bob
undefined

## Event handlers and this

In DOM event handlers, this refers to the element that received the
event.

main.js
  

// Assuming this runs in browser with a button element
document.querySelector('button').addEventListener('click', function() {
    console.log(this); // the button element
});

// With arrow function
document.querySelector('button').addEventListener('click', () =&gt; {
    console.log(this); // window (lexical this)
});

Regular functions in event handlers set this to the element. Arrow
functions maintain their lexical this binding. This difference is
important when working with DOM events.

// Output depends on browser environment

## Source

[this - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

In this article we have explored the JavaScript this keyword and its
various contexts. Understanding this is essential for effective
JavaScript programming.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)