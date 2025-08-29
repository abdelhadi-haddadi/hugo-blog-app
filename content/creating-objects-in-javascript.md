+++
title = "Creating objects in JavaScript"
date = 2025-08-29T20:01:13.442+01:00
draft = false
description = "Learn how to create objects in JavaScript using literals, constructors, classes, and design patterns like builder and factory."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating objects in JavaScript

last modified last modified October 18, 2023

 

In this article we show how to create objects in JavaScript. Objects can be
created using an object literal, function constructor, or class definition.
Objects are often created with creational builder and factory design patterns.

In this article we use Node.js to execute our examples.

## Object literal

In object literal notation, we place object attributes separated by comma inside
curly brackets {}.

The attribute names and values are separated with colon.

object_literal.js
  

const person = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@example.com',
    info: function() {
        return `${this.firstName} ${this.lastName}, ${this.email}`
    }
};

console.log(person.info());

The example creates an object using literal notation.

$ node object_literal.js
John Doe, jdoe@example.com

## Object constructor

Objects can be created with new Object constructor. Attributes
are then dynamically added using dot operator.

object_constructor.js
  

let person = new Object();

person.firstName = "John";
person.lastName = "Doe";
person.email = 'jdoe@example.com';

person.info = function(){
    return `${this.firstName} ${this.lastName}, ${this.email}`;
};

console.log(person.info());

The example creates an object with Object constructor.

## Function constructor

A function constructor is created with a function keyword.
It takes the values as parameters. The attributes are set using this
keyword. Methods are created with this and function
keywords. New objects are created with new keyword.

function_constructor.js
  

function Person(firstName, lastName, email) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;

    this.info = function() {
        return `${this.firstName} ${this.lastName}, ${this.email}`;
    }
}

let person = new Person('John', 'Doe', 'jdoe@example.com');
console.log(person.info());

The example creates an object with function constructor.

## Class definition

Objects are defined with class keyword and generated with
new keyword. This is a classic way of creating objects known
from languages like C# or Java. JavaScript uses constructor
keyword to define an object constructor. Attributes are set with
this keyword.

class_definition.js
  

class Person {

    constructor(firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    info() {
        return `${this.firstName} ${this.lastName}, ${this.email}`;
    }
}

let person = new Person('John', 'Doe', 'jdoe@example.com');
console.log(person.info());

The example creates an object using class definition.

## Builder pattern

Builder pattern is a creational design pattern used to create objects. It builds
a complex object using simple objects by providing a step by step approach.
Builder pattern uses fluent API to create objects.

builder_pattern.js
  

let Person = function (firstName, lastName, email) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
}

let PersonBuilder = function () {

    let firstName;
    let lastName;
    let email;

    return {
        setFirstName: function (firstName) {
            this.firstName = firstName;
            return this;
        },
        setLastName: function (lastName) {
            this.lastName = lastName;
            return this;
        },
        setEmail: function (email) {
            this.email = email;
            return this;
        },
        info: function () {
            return `${this.firstName} ${this.lastName}, ${this.email}`;
        },
        build: function () {
            return new Person(firstName, lastName, email);
        }
    };
};

var person = new PersonBuilder().setFirstName('John').setLastName('Doe')
    .setEmail('jdoe@example.com');
console.log(person.info());

The example creates an object using builder design pattern.

## Factory pattern

With Factory pattern, we create objects without exposing the creation logic to
the client.

factory_pattern.js
  

const personFactory = (firstName, lastName, email) =&gt; {
    return {
        firstName: firstName,
        lastName: lastName,
        email: email,
        info() {
            return `${this.firstName} ${this.lastName}, ${this.email}`;
        }
    };
};

let person = personFactory('John', 'Doe', 'jdoe@example.com');

console.log(person.info());

The example creates an object with factory pattern.

In this article we have created JavaScript objects using different syntax.
We have also presented two creational design patterns, namely builder pattern
and factory pattern.

## Source

[Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)