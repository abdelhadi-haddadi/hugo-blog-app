+++
title = "JavaScript get keyword"
date = 2025-08-29T20:01:20.143+01:00
draft = false
description = "Learn how to use the get keyword in JavaScript for creating property getters, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript get keyword

last modified April 16, 2025

In this article we show how to use the get keyword to create
property getters in JavaScript objects.

## The get keyword

The get keyword binds an object property to a function that
will be called when that property is accessed. Getters provide a way to
define computed properties. They execute a function when accessed but
appear as normal properties.

Getters are defined using the get keyword followed by the
property name and function. They cannot accept parameters and must return
a value. Getters are often paired with setters for complete property control.

Using getters allows for more flexible object properties that can compute
values dynamically. They help encapsulate internal state while providing
a clean property-like interface to consumers.

## Basic getter example

The following example demonstrates the basic usage of the get
keyword to create a simple getter.

main.js
  

const person = {
    firstName: 'John',
    lastName: 'Doe',
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log(person.fullName);

This code defines a fullName getter that combines firstName and
lastName. When accessed, it computes and returns the full name. The getter is
called without parentheses like a regular property.

$ node main.js
John Doe

## Getter with private property

Getters are often used to provide access to private properties.

main.js
  

class Circle {
    #radius = 0;
    
    constructor(radius) {
        this.#radius = radius;
    }
    
    get area() {
        return Math.PI * this.#radius ** 2;
    }
}

const circle = new Circle(5);
console.log(circle.area);

This example shows a getter accessing a private class field. The area
getter calculates the circle's area based on its private radius. The private field
is inaccessible directly, but the getter provides controlled access.

$ node main.js
78.53981633974483

## Getter with validation

Getters can include validation logic when returning values.

main.js
  

const account = {
    _balance: 0,
    
    get balance() {
        if (this._balance &lt; 0) {
            console.warn('Warning: Negative balance');
        }
        return this._balance;
    }
};

account._balance = -50;
console.log(account.balance);

This getter checks if the balance is negative before returning it. While the
underlying value can be modified directly, the getter adds validation. In a
real application, the balance would likely be properly encapsulated.

$ node main.js
Warning: Negative balance
-50

## Getter with caching

Getters can implement caching to avoid expensive recalculations.

main.js
  

const expensiveCalc = {
    _cache: null,
    _dirty: true,
    
    get result() {
        if (this._dirty) {
            console.log('Performing expensive calculation...');
            this._cache = Math.random() * 100;
            this._dirty = false;
        }
        return this._cache;
    },
    
    invalidate() {
        this._dirty = true;
    }
};

console.log(expensiveCalc.result);
console.log(expensiveCalc.result);
expensiveCalc.invalidate();
console.log(expensiveCalc.result);

This getter caches its result and only recalculates when needed. The
_dirty flag controls when recalculation occurs. This pattern
is useful for expensive operations that don't change often.

$ node main.js
Performing expensive calculation...
42.123456789
42.123456789
Performing expensive calculation...
87.654321098

## Getter in object literal

Getters can be defined in object literals using the get syntax.

main.js
  

const rectangle = {
    width: 10,
    height: 20,
    
    get area() {
        return this.width * this.height;
    },
    
    get perimeter() {
        return 2 * (this.width + this.height);
    }
};

console.log('Area:', rectangle.area);
console.log('Perimeter:', rectangle.perimeter);

This object defines two getters that compute geometric properties. The getters
use the object's width and height properties. The calculations are performed
dynamically when the properties are accessed.

$ node main.js
Area: 200
Perimeter: 60

## Getter with setter

Getters are often paired with setters for complete property control.

main.js
  

class Temperature {
    _celsius = 0;
    
    get fahrenheit() {
        return this._celsius * 9/5 + 32;
    }
    
    set fahrenheit(value) {
        this._celsius = (value - 32) * 5/9;
    }
}

const temp = new Temperature();
temp.fahrenheit = 77;
console.log(`Celsius: ${temp._celsius.toFixed(1)}`);
console.log(`Fahrenheit: ${temp.fahrenheit.toFixed(1)}`);

This class uses getter/setter pairs to convert between Celsius and Fahrenheit.
The getter computes Fahrenheit from Celsius, while the setter does the reverse.
This maintains consistency between the two temperature scales.

$ node main.js
Celsius: 25.0
Fahrenheit: 77.0

## Getter in prototype

Getters can be defined on an object's prototype for shared behavior.

main.js
  

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype = {
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

const person = new Person('Jane', 'Smith');
console.log(person.fullName);

This example adds a getter to the Person prototype. All Person instances will
share this getter. The getter has access to instance properties through
this. This is a memory-efficient way to add computed properties.

$ node main.js
Jane Smith

## Source

[get - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)

In this article we have demonstrated how to use the get keyword to create
property getters in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)