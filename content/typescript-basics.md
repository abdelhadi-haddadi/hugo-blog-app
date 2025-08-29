+++
title = "TypeScript Basics"
date = 2025-08-29T20:14:25.967+01:00
draft = false
description = "Learn TypeScript fundamentals: variables, functions, interfaces, and classes with type-safe examples and best practices."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Basics

last modified March 20, 2025

TypeScript extends JavaScript with static type definitions, enabling compile-
time error checking and better tooling. This tutorial covers variables,
functions, interfaces, and classes with practical examples.

## Variables and Types

TypeScript variables are declared with let or const.
Explicit type annotations ensure values match specified data types.

variables.ts
  

let age: number = 30;
const username: string = "Alice";
let isActive: boolean = true;

console.log(`${username} is ${age} years old.`);

TypeScript supports number, string, boolean,
Array, and complex types. Type checking prevents mismatched
assignments.

## Functions

Functions specify parameter types and return types. This example demonstrates
a type-safe function.

functions.ts
  

function calculateArea(width: number, height: number): number {
    return width * height;
}

const area = calculateArea(5, 4);
console.log(`Area: ${area}`);  // Output: Area: 20

Arrow functions work similarly. TypeScript enforces parameter types and checks
return values.

## Interfaces

Interfaces define object shapes. They enable type checking for object properties
and methods.

interfaces.ts
  

interface User {
    id: number;
    name: string;
    email?: string;  // Optional property
}

const user1: User = {
    id: 1,
    name: "Bob"
};

console.log(user1.name);  // Output: Bob

Interfaces support optional properties (marked with ?) and can be
extended by other interfaces.

## Classes

TypeScript classes support access modifiers and type-checked properties.

classes.ts
  

class Vehicle {
    constructor(public make: string, private model: string) {}

    getDescription(): string {
        return `${this.make} ${this.model}`;
    }
}

const car = new Vehicle("Toyota", "Corolla");
console.log(car.getDescription());  // Output: Toyota Corolla

The public and private modifiers control property
access. Classes can implement interfaces for additional type safety.

## Type Inference

TypeScript automatically infers types when variables are initialized. This
example shows implicit typing.

inference.ts
  

let score = 95;  // Type inferred as number
let items = ["Book", "Pen"];  // Type inferred as string[]

// score = "Ninety-five";  // Error: Type 'string' not assignable to 'number'

Explicit type annotations are optional when TypeScript can reliably infer types
from initial values.

## Best Practices

- **Enable Strict Mode:** Use "strict": true in tsconfig.json for rigorous type checks

- **Avoid any:** Minimize use of any type to preserve type safety

- **Use Interfaces:** Define contracts for objects and function parameters

- **Leverage Type Inference:** Omit explicit types when initialization values are clear

## Source

[TypeScript Official Documentation](https://www.typescriptlang.org/docs/handbook/intro.html)

This tutorial introduced TypeScript's core features through practical examples.
Master these concepts to build robust, maintainable applications.

## Author

Jan Bodnar is a seasoned software developer and technical writer with over 15
years of experience. Author of multiple programming books and 1400+ articles,
he specializes in making complex concepts accessible to learners worldwide.

List [all TypeScript tutorials](/all/#typescript).