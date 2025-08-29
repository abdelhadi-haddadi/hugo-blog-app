+++
title = "JavaScript instanceof keyword"
date = 2025-08-29T20:01:23.708+01:00
draft = false
description = "Learn how to use the instanceof keyword in JavaScript for checking object types, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript instanceof keyword

last modified April 16, 2025

In this article we show how to check object types using the instanceof
operator in JavaScript.

## The instanceof operator

The instanceof operator tests whether an object belongs to a specific
class or constructor function. It returns true if the object is an
instance of the specified type, otherwise false.

The operator checks the object's prototype chain for the constructor's prototype.
This makes it useful for checking inheritance relationships in JavaScript.
Unlike typeof, it works with custom object types.

The syntax is object instanceof constructor. The left operand is the
object to test, and the right operand is the constructor function to test against.

## Basic instanceof usage

The following example demonstrates the basic usage of the instanceof
operator with built-in types.

main.js
  

const arr = [1, 2, 3];
const date = new Date();

console.log(arr instanceof Array);     // true
console.log(date instanceof Date);     // true
console.log(arr instanceof Object);    // true
console.log(date instanceof Object);   // true
console.log(arr instanceof Date);      // false

This shows that arrays are instances of Array and Object, but not Date. All
objects inherit from Object in JavaScript. The operator correctly identifies
the object's type and its inheritance chain.

$ node main.js
true
true
true
true
false

## instanceof with custom classes

The instanceof operator works with user-defined classes as well.

main.js
  

class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);       // true
console.log(dog instanceof Animal);   // true
console.log(dog instanceof Object);    // true

This example demonstrates inheritance checking. A Dog instance is also an
instance of Animal and Object. The operator traverses the entire prototype
chain to determine the relationship.

$ node main.js
true
true
true

## instanceof vs typeof

The instanceof operator provides more specific type checking than
typeof.

main.js
  

const arr = [1, 2, 3];
const obj = {};

console.log(typeof arr);          // "object"
console.log(typeof obj);          // "object"
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false

While typeof returns "object" for both arrays and plain objects,
instanceof can distinguish between them. This makes instanceof
more useful for precise type checking of objects.

$ node main.js
object
object
true
false

## instanceof with constructor functions

The operator works with traditional constructor functions, not just ES6 classes.

main.js
  

function Person(name) {
    this.name = name;
}

const john = new Person('John');

console.log(john instanceof Person);   // true
console.log(john instanceof Object);   // true
console.log(john instanceof Array);    // false

This shows that instanceof works with function constructors just
like with classes. The operator checks the prototype chain created by the
constructor function.

$ node main.js
true
true
false

## instanceof and inheritance

The operator correctly identifies inheritance relationships in complex hierarchies.

main.js
  

class Vehicle {}
class Car extends Vehicle {}
class SportsCar extends Car {}

const myCar = new SportsCar();

console.log(myCar instanceof SportsCar); // true
console.log(myCar instanceof Car);      // true
console.log(myCar instanceof Vehicle);  // true
console.log(myCar instanceof Object);   // true

This multi-level inheritance example shows that instanceof checks
the entire prototype chain. A SportsCar is also a Car, Vehicle, and Object.

$ node main.js
true
true
true
true

## Edge cases with instanceof

There are some edge cases to be aware of when using instanceof.

main.js
  

console.log(null instanceof Object);    // false
console.log(undefined instanceof Object); // false
console.log(123 instanceof Number);     // false
console.log('text' instanceof String);  // false
console.log(true instanceof Boolean);   // false

const numObj = new Number(123);
console.log(numObj instanceof Number);  // true

Primitive values are not objects, so they return false. Only object versions
of primitives (created with constructors) return true. Null and undefined
always return false as they have no prototype chain.

$ node main.js
false
false
false
false
false
true

## Practical use case: type checking in functions

Here's a practical example of using instanceof for runtime type checking.

main.js
  

class User {
    constructor(name) {
        this.name = name;
    }
}

class Admin extends User {
    constructor(name, level) {
        super(name);
        this.level = level;
    }
}

function greet(user) {
    if (user instanceof Admin) {
        console.log(`Hello Admin ${user.name} (level ${user.level})`);
    } else if (user instanceof User) {
        console.log(`Hello ${user.name}`);
    } else {
        console.log('Invalid user type');
    }
}

const regular = new User('John');
const admin = new Admin('Jane', 5);

greet(regular);
greet(admin);
greet({});

This function behaves differently based on the type of user passed to it.
The instanceof checks allow for polymorphic behavior based on
the object's type in the inheritance hierarchy.

$ node main.js
Hello John
Hello Admin Jane (level 5)
Invalid user type

## Source

[instanceof - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)

In this article we have demonstrated how to use the instanceof operator to check
object types and inheritance relationships in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)