+++
title = "JavaScript class keyword"
date = 2025-08-29T20:01:11.207+01:00
draft = false
description = "Understand how to use the class keyword in JavaScript for object-oriented programming, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript class keyword

last modified April 16, 2025

In this article we show how to use the class keyword for
object-oriented programming in JavaScript. Classes provide a cleaner syntax
for creating objects and handling inheritance.

## The class keyword

The class keyword was introduced in ES6 (ECMAScript 2015) to
create classes in JavaScript. It's syntactic sugar over JavaScript's
existing prototype-based inheritance. Classes provide a more familiar
object-oriented programming syntax.

A class is a blueprint for creating objects with predefined properties and
methods. Classes encapsulate data and behavior that belongs together. They
can be instantiated multiple times to create objects with the same structure.

JavaScript classes support constructors, methods, inheritance, and static
members. Under the hood, JavaScript classes still use prototypal inheritance.
The class syntax doesn't introduce a new object-oriented inheritance model.

## Basic class definition

The following example demonstrates the basic usage of the class
keyword to define a simple class.

main.js
  

class Person {
    constructor(name) {
        this.name = name;
    }
    
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const person = new Person('John');
person.greet();

This code defines a Person class with a constructor and a method. The
constructor is called when creating new instances. The greet method can
be called on instances of the class. We create an instance with the new
keyword.

$ node main.js
Hello, my name is John

## Class inheritance

JavaScript classes support inheritance using the extends keyword.

main.js
  

class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak();

This example shows inheritance where Dog extends Animal. The Dog class
inherits properties and methods from Animal. We override the speak method
in the Dog class. The super keyword can access parent class methods.

$ node main.js
Rex barks.

## Static methods

Static methods are called on the class itself, not on instances.

main.js
  

class MathUtils {
    static square(x) {
        return x * x;
    }
    
    static cube(x) {
        return x * x * x;
    }
}

console.log(MathUtils.square(3));
console.log(MathUtils.cube(3));

Static methods are defined using the static keyword. They are useful for
utility functions that don't need instance data. You can't call static
methods on class instances. They are called directly on the class.

$ node main.js
9
27

## Getters and setters

Classes support getter and setter methods to control property access.

main.js
  

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }
    
    get area() {
        return this._width * this._height;
    }
    
    set width(value) {
        if (value &gt; 0) {
            this._width = value;
        }
    }
}

const rect = new Rectangle(10, 20);
console.log(rect.area);
rect.width = 15;
console.log(rect.area);

Getters and setters allow controlled access to properties. The area getter
calculates the area dynamically. The width setter includes validation.
Properties with getters/setters often use an underscore prefix convention.

$ node main.js
200
300

## Private class fields

Modern JavaScript supports private class fields using a hash (#) prefix.

main.js
  

class Counter {
    #count = 0;
    
    increment() {
        this.#count++;
    }
    
    getCount() {
        return this.#count;
    }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount());

Private fields are only accessible within the class body. They can't be
accessed from outside the class. This provides true encapsulation. Private
fields must be declared before being referenced. They can't be accessed
through dot notation.

$ node main.js
1

## Class expressions

Classes can be defined using expressions, similar to function expressions.

main.js
  

const Circle = class {
    constructor(radius) {
        this.radius = radius;
    }
    
    get area() {
        return Math.PI * this.radius ** 2;
    }
};

const circle = new Circle(5);
console.log(circle.area.toFixed(2));

Class expressions can be named or unnamed. This example shows an unnamed
class expression assigned to a variable. The class can then be instantiated
using the variable name. Class expressions are useful when classes need to
be passed as arguments.

$ node main.js
78.54

## Practical use case: User management

Here's a practical example of using classes for user management.

main.js
  

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
        this.loggedIn = false;
    }
    
    login() {
        this.loggedIn = true;
        console.log(`${this.username} logged in`);
    }
    
    logout() {
        this.loggedIn = false;
        console.log(`${this.username} logged out`);
    }
}

class Admin extends User {
    constructor(username, email, permissions) {
        super(username, email);
        this.permissions = permissions;
    }
    
    deleteUser(user) {
        console.log(`${this.username} deleted user ${user.username}`);
    }
}

const admin = new Admin('admin', 'admin@example.com', ['delete', 'create']);
admin.login();

This example shows a User base class and an Admin subclass. The Admin class
inherits from User and adds additional functionality. The super keyword calls
the parent class constructor. This demonstrates a real-world class hierarchy.

$ node main.js
admin logged in

## Source

[Classes - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

In this article we have demonstrated how to use the class keyword for
object-oriented programming in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)