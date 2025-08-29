+++
title = "TypeScript Decorators"
date = 2025-08-29T20:14:27.091+01:00
draft = false
description = "Learn TypeScript decorators with practical examples. Understand how to use decorators for classes, methods, properties, and more."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Decorators

last modified March 3, 2025

Decorators in TypeScript are a special kind of declaration that can be attached
to classes, methods, properties, or parameters. They provide a way to add
metadata or modify the behavior of these elements. This tutorial explores
decorators with practical examples.

## Basic Definitions

Decorators are functions prefixed with the @ symbol. They are
called with specific arguments depending on what they decorate. TypeScript
supports class, method, property, and parameter decorators.

## Class Decorator

A class decorator is applied to a class constructor. It can observe, modify, or
replace the class definition. This example logs the class name.

class_decorator.ts
  

function LogClass(target: Function) {
    console.log(`Class: ${target.name}`);
}

@LogClass
class User {
    constructor(public name: string) {}
}

// Output: Class: User

The LogClass decorator logs the class name when the class is
defined. It receives the constructor function as its argument.

## Method Decorator

Method decorators are applied to method definitions. They can modify or replace
the method. This example logs method calls.

method_decorator.ts
  

function LogMethod(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`Method called: ${key}`);
}

class Calculator {
    @LogMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);  // Output: Method called: add

The LogMethod decorator logs the method name when it is called. It
receives the target object, method name, and property descriptor.

## Property Decorator

Property decorators are applied to property declarations. They can observe or
modify the property. This example logs property names.

property_decorator.ts
  

function LogProperty(target: any, key: string) {
    console.log(`Property: ${key}`);
}

class Product {
    @LogProperty
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Output: Property: name

The LogProperty decorator logs the property name when the class is
defined. It receives the target object and property name.

## Parameter Decorator

Parameter decorators are applied to method parameters. They can observe or
modify the parameter. This example logs parameter names.

parameter_decorator.ts
  

function LogParameter(target: any, key: string, index: number) {
    console.log(`Parameter: ${key}[${index}]`);
}

class Greeter {
    greet(@LogParameter name: string): void {
        console.log(`Hello, ${name}!`);
    }
}

// Output: Parameter: greet[0]

The LogParameter decorator logs the parameter name and index when
the method is defined. It receives the target object, method name, and parameter
index.

## Accessor Decorator

Accessor decorators are applied to getter or setter methods. They can modify or
replace the accessor. This example logs accessor calls.

accessor_decorator.ts
  

function LogAccessor(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`Accessor called: ${key}`);
}

class Account {
    private _balance: number = 0;

    @LogAccessor
    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        this._balance = value;
    }
}

const acc = new Account();
acc.balance = 100;  // Output: Accessor called: balance

The LogAccessor decorator logs the accessor name when it is called.
It receives the target object, accessor name, and property descriptor.

## Factory Decorator

Factory decorators are functions that return decorators. They allow customization
of the decorator behavior. This example creates a configurable logging decorator.

factory_decorator.ts
  

function LogFactory(message: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(`${message}: ${key}`);
    };
}

class Logger {
    @LogFactory("Method called")
    log(message: string): void {
        console.log(message);
    }
}

const logger = new Logger();
logger.log("Test");  // Output: Method called: log

The LogFactory function returns a decorator that logs a custom
message. It allows dynamic configuration of the decorator behavior.

## Multiple Decorators

Multiple decorators can be applied to the same element. They are executed in
reverse order. This example demonstrates multiple decorators.

multiple_decorators.ts
  

function First(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("First decorator");
}

function Second(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("Second decorator");
}

class Example {
    @First
    @Second
    method(): void {
        console.log("Method called");
    }
}

// Output: Second decorator
// Output: First decorator

The First and Second decorators are applied to the
same method. They are executed in reverse order, with Second first.

## Best Practices

- **Use Sparingly:** Avoid overusing decorators to keep code clean

- **Document Behavior:** Clearly document decorator functionality

- **Test Thoroughly:** Ensure decorators work as expected in all cases

- **Follow Conventions:** Stick to established naming and usage patterns

- **Consider Performance:** Be mindful of potential performance impacts

## Source

[TypeScript Decorators Documentation](https://www.typescriptlang.org/docs/handbook/decorators.html)

This tutorial covered TypeScript decorators with practical examples. Use
decorators to enhance your TypeScript applications with metadata and behavior
modifications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).