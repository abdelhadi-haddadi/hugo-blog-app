+++
title = "JavaScript new keyword"
date = 2025-08-29T20:01:30.872+01:00
draft = false
description = "Understand how to use the new keyword in JavaScript for creating object instances, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript new keyword

last modified April 16, 2025

In this article we show how to create object instances using the new
keyword in JavaScript. The new operator creates instances of
user-defined object types or built-in object types.

## The new keyword

The new keyword in JavaScript is used to create an instance of an
object that has a constructor function. When used with a constructor function,
it creates a new object and sets the prototype chain.

The new operator performs four main operations: it creates a new
empty object, sets the prototype, executes the constructor with the given
arguments, and returns the created object (unless the constructor returns
another object).

Without new, constructor functions would behave like regular
functions and might modify the global object or return undefined. The
new keyword ensures proper object creation.

## Basic object creation

The following example demonstrates the basic usage of the new
keyword with a constructor function.

main.js
  

function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person1 = new Person('John', 30);
console.log(person1);

Here we create a Person constructor function and use new
to create an instance. The this inside the constructor refers to
the newly created object. The instance has properties name and age with the
provided values.

$ node main.js
Person { name: 'John', age: 30 }

## Creating built-in objects

The new keyword can also be used with built-in JavaScript objects.

main.js
  

const date = new Date();
console.log(date);

const array = new Array(1, 2, 3);
console.log(array);

This example shows creating instances of built-in Date and
Array objects. The new keyword initializes these
objects with the provided arguments. This is the traditional way to create
built-in objects.

$ node main.js
2025-04-16T12:34:56.789Z
[ 1, 2, 3 ]

## Constructor with methods

Constructor functions can also define methods that will be available to all
instances.

main.js
  

function Car(make, model) {
    this.make = make;
    this.model = model;
    
    this.getInfo = function() {
        return `${this.make} ${this.model}`;
    };
}

const myCar = new Car('Toyota', 'Corolla');
console.log(myCar.getInfo());

Here we add a method getInfo to the Car constructor.
All instances created with new Car() will have this method. Note
that this creates a new function for each instance, which may be inefficient.

$ node main.js
Toyota Corolla

## Prototype methods

A more efficient approach is to add methods to the constructor's prototype.

main.js
  

function Book(title, author) {
    this.title = title;
    this.author = author;
}

Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author}`;
};

const book = new Book('1984', 'George Orwell');
console.log(book.getInfo());

By adding methods to the prototype, all instances share the same function
reference. This is more memory-efficient than defining methods in the
constructor. The new keyword ensures the prototype chain is
properly set up.

$ node main.js
1984 by George Orwell

## Returning objects from constructors

Constructors can return objects, which overrides the default behavior of
new.

main.js
  

function Animal(type) {
    this.type = type;
    
    return { name: 'Override' };
}

const animal = new Animal('Dog');
console.log(animal);

If a constructor returns an object, that object becomes the result of the
new expression. Here, the returned object overrides the
default behavior. The type property is not set on the result.

$ node main.js
{ name: 'Override' }

## Omitting new (common mistake)

Forgetting new with constructors can lead to unexpected behavior.

main.js
  

function User(name) {
    this.name = name;
}

const user1 = new User('Alice');
const user2 = User('Bob');

console.log(user1);
console.log(user2);
console.log(global.name);

Without new, this refers to the global object (or
undefined in strict mode). user1 is properly created, but
user2 is undefined. The name property leaks to the global object.

$ node main.js
User { name: 'Alice' }
undefined
Bob

## ES6 classes with new

The new keyword is also used with ES6 class syntax.

main.js
  

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    getDescription() {
        return `${this.name} - $${this.price}`;
    }
}

const product = new Product('Laptop', 999);
console.log(product.getDescription());

ES6 classes are syntactic sugar over JavaScript's prototype-based inheritance.
The new keyword works the same way with classes as with
constructor functions. Attempting to call a class without new
throws an error.

$ node main.js
Laptop - $999

## Source

[new - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

In this article we have demonstrated how to use the new keyword to create
object instances in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)