+++
title = "JavaScript super keyword"
date = 2025-08-29T20:01:40.438+01:00
draft = false
description = "Understand how to use the super keyword in JavaScript to access parent class members, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript super keyword

last modified April 16, 2025

In this article we show how to access parent class members using the super
keyword in JavaScript.

## The super keyword

The super keyword is used to access and call functions on an object's
parent class. It can be used in two ways: as a function call in constructors,
or as a property lookup to access parent class methods.

In constructor functions, super() must be called before using
this. This ensures the parent class is properly initialized.
In methods, super provides access to parent class implementations.

The super keyword is essential for implementing inheritance and
method overriding in JavaScript classes. It maintains the prototype chain
between parent and child classes.

## Basic super in constructor

The following example demonstrates the basic usage of super in a
constructor function.

main.js
  

class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}

const myDog = new Dog('Max', 'Labrador');
console.log(myDog);

Here, super(name) calls the parent class constructor with the name
parameter. The Dog class extends Animal and adds a breed property. The super
call must come before accessing this in the constructor.

$ node main.js
Dog { name: 'Max', breed: 'Labrador' }

## Calling parent class methods

The super keyword can be used to call parent class methods.

main.js
  

class Vehicle {
    startEngine() {
        return 'Engine started';
    }
}

class Car extends Vehicle {
    startEngine() {
        return `${super.startEngine()} - Car ready to drive`;
    }
}

const myCar = new Car();
console.log(myCar.startEngine());

This example shows how to extend a parent class method. The Car class overrides
startEngine but still calls the parent implementation using super. This allows
for method augmentation rather than complete replacement.

$ node main.js
Engine started - Car ready to drive

## Accessing parent static methods

super can also access static methods of the parent class.

main.js
  

class MathOperations {
    static add(a, b) {
        return a + b;
    }
}

class AdvancedMath extends MathOperations {
    static add(a, b, c) {
        return super.add(a, b) + c;
    }
}

console.log(AdvancedMath.add(1, 2, 3));

Here we use super to call a static method from the parent class. The AdvancedMath
class extends the add functionality while reusing the parent implementation.
Static methods are called on the class itself, not instances.

$ node main.js
6

## Super in object literals

The super keyword can be used in object literals with the __proto__
property.

main.js
  

const parent = {
    greet() {
        return 'Hello from parent';
    }
};

const child = {
    __proto__: parent,
    greet() {
        return `${super.greet()} and child`;
    }
};

console.log(child.greet());

This example demonstrates super usage in object literals with prototype chains.
The child object inherits from parent and overrides the greet method. Super
provides access to the parent implementation within the overridden method.

$ node main.js
Hello from parent and child

## Super with getters and setters

The super keyword works with getters and setters in classes.

main.js
  

class Person {
    constructor(name) {
        this._name = name;
    }
    
    get name() {
        return this._name;
    }
}

class Employee extends Person {
    get name() {
        return `${super.name} (employee)`;
    }
}

const emp = new Employee('John');
console.log(emp.name);

Here we override a getter method and use super to access the parent
implementation. The Employee class extends the name getter to add additional
information while preserving the original functionality.

$ node main.js
John (employee)

## Multiple inheritance levels

super works through multiple levels of inheritance.

main.js
  

class A {
    method() {
        return 'A';
    }
}

class B extends A {
    method() {
        return `${super.method()} B`;
    }
}

class C extends B {
    method() {
        return `${super.method()} C`;
    }
}

const instance = new C();
console.log(instance.method());

This example shows super traversing multiple inheritance levels. Each class
extends the previous one and builds upon its method implementation. The call
chain follows the prototype hierarchy upwards.

$ node main.js
A B C

## Practical use case: extending built-ins

Here's a practical example of using super to extend built-in classes.

main.js
  

class CustomArray extends Array {
    sum() {
        return this.reduce((acc, val) =&gt; acc + val, 0);
    }
    
    first() {
        return super[0];
    }
}

const nums = new CustomArray(1, 2, 3, 4);
console.log(nums.sum());
console.log(nums.first());

This code extends the built-in Array class to add custom methods. The sum method
is new functionality, while first uses super to access array indexing. This
demonstrates how to build upon existing classes while maintaining their features.

$ node main.js
10
1

## Source

[super - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)

In this article we have demonstrated how to use the super keyword to access
parent class members in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)