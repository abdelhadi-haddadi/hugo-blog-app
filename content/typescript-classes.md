+++
title = "TypeScript Classes"
date = 2025-08-29T20:14:25.970+01:00
draft = false
description = "Comprehensive TypeScript classes tutorial covering syntax, inheritance, encapsulation, and advanced patterns with practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Classes

last modified March 3, 2025

Classes in TypeScript provide a way to define blueprints for objects. They
support inheritance, encapsulation, and polymorphism. This tutorial explores
class syntax, constructors, access modifiers, and advanced patterns with
practical examples.

## Basic Class Syntax

A class in TypeScript is defined using the class keyword. It can
contain properties, methods, and a constructor.

basic_class.ts
  

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

const person = new Person("Alice", 30);
console.log(person.greet());  // Output: Hello, my name is Alice and I am 30 years old.

The Person class has properties name and age,
a constructor to initialize them, and a method greet.

## Inheritance

TypeScript supports inheritance using the extends keyword. A child
class inherits properties and methods from a parent class.

inheritance.ts
  

class Employee extends Person {
    employeeId: number;

    constructor(name: string, age: number, employeeId: number) {
        super(name, age);
        this.employeeId = employeeId;
    }

    displayId(): string {
        return `Employee ID: ${this.employeeId}`;
    }
}

const employee = new Employee("Bob", 25, 12345);
console.log(employee.greet());      // Output: Hello, my name is Bob and I am 25 years old.
console.log(employee.displayId());  // Output: Employee ID: 12345

The Employee class extends Person and adds a new
property employeeId and method displayId.

## Access Modifiers

TypeScript provides access modifiers like public, private,
and protected to control property and method visibility.

access_modifiers.ts
  

class BankAccount {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance());  // Output: 1500

The balance property is private and can only be accessed within
the class. Public methods like deposit and getBalance
provide controlled access.

## Readonly Properties

Properties marked as readonly can only be assigned during
initialization and cannot be modified afterward.

readonly_properties.ts
  

class Car {
    readonly make: string;
    readonly model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }
}

const myCar = new Car("Toyota", "Corolla");
console.log(myCar.make);  // Output: Toyota

The make and model properties are immutable after
initialization.

## Static Properties and Methods

Static properties and methods belong to the class itself rather than instances.
They are accessed using the class name.

static_members.ts
  

class MathOperations {
    static PI: number = 3.14;

    static calculateArea(radius: number): number {
        return this.PI * radius * radius;
    }
}

console.log(MathOperations.calculateArea(5));  // Output: 78.5

The PI property and calculateArea method are static
and accessed directly via the class.

## Abstract Classes

Abstract classes cannot be instantiated directly. They serve as base classes
for other classes and can define abstract methods.

abstract_classes.ts
  

abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log("Moving...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

const dog = new Dog();
dog.makeSound();  // Output: Woof!
dog.move();       // Output: Moving...

The Animal class is abstract and defines an abstract method
makeSound. The Dog class implements this method.

## Getters and Setters

Getters and setters allow controlled access to class properties. They are
defined using get and set keywords.

getters_setters.ts
  

class Temperature {
    private _celsius: number = 0;

    get celsius(): number {
        return this._celsius;
    }

    set celsius(value: number) {
        if (value &lt; -273.15) {
            throw new Error("Temperature below absolute zero is not possible.");
        }
        this._celsius = value;
    }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.celsius);  // Output: 25

The celsius property is accessed and modified using getters and
setters, ensuring valid values.

## Interfaces with Classes

Interfaces define contracts for classes. A class implementing an interface must
adhere to its structure.

interfaces_with_classes.ts
  

interface Drivable {
    start(): void;
    stop(): void;
}

class Car implements Drivable {
    start(): void {
        console.log("Car started.");
    }

    stop(): void {
        console.log("Car stopped.");
    }
}

const myCar = new Car();
myCar.start();  // Output: Car started.
myCar.stop();   // Output: Car stopped.

The Car class implements the Drivable interface,
ensuring it has start and stop methods.

## Best Practices

- **Encapsulation:** Use access modifiers to protect data.

- **Single Responsibility:** Keep classes focused on one task.

- **Inheritance:** Use inheritance to avoid code duplication.

- **Interfaces:** Define contracts for classes using interfaces.

- **Static Members:** Use static members for shared functionality.

## Source

[TypeScript Classes Documentation](https://www.typescriptlang.org/docs/handbook/classes.html)

This tutorial covered TypeScript classes with practical examples. Implement
these patterns to write cleaner, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).