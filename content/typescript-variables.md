+++
title = "TypeScript Variables"
date = 2025-08-29T20:14:37.210+01:00
draft = false
description = "Comprehensive TypeScript variables tutorial covering declarations, type annotations, and best practices with practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Variables

last modified March 3, 2025

Variables in TypeScript store data with strict type annotations. They enhance 
JavaScript variables by adding type safety and better tooling support. This 
tutorial explores variable declarations, type annotations, and best practices 
through practical examples.

## Basic Variable Declarations

TypeScript variables can be declared using let, const, 
or var. This example shows basic variable declarations with types.

basic_variables.ts
  

let age: number = 30;
const name: string = "Alice";
var isActive: boolean = true;

console.log(age, name, isActive);  // Output: 30 Alice true

TypeScript enforces type annotations, ensuring variables hold the correct data 
types throughout their lifecycle.

## Type Inference

TypeScript infers types when variables are initialized without explicit 
annotations. This reduces redundancy while maintaining type safety.

type_inference.ts
  

let score = 95;        // TypeScript infers `number`
const message = "Hi";  // TypeScript infers `string`

console.log(score, message);  // Output: 95 Hi

Type inference works for primitive types, arrays, and objects. Explicit 
annotations are recommended for complex types.

## Union Types

Variables can hold multiple types using union types. This is useful for 
flexible data handling.

union_types.ts
  

let id: string | number;
id = "ABC123";
console.log(id);  // Output: ABC123

id = 123;
console.log(id);  // Output: 123

Union types allow variables to switch between specified types, providing 
flexibility while maintaining type safety.

## Literal Types

Literal types restrict variables to specific values. This is useful for 
enumerations or fixed sets of values.

literal_types.ts
  

let status: "active" | "inactive";
status = "active";
console.log(status);  // Output: active

// status = "pending";  // Error: Type '"pending"' is not assignable

Literal types ensure variables only hold predefined values, reducing runtime 
errors.

## Arrays and Tuples

Arrays and tuples store collections of values. TypeScript enforces element 
types for arrays and fixed structures for tuples.

arrays_tuples.ts
  

let numbers: number[] = [1, 2, 3];
let person: [string, number] = ["Alice", 30];

console.log(numbers);  // Output: [1, 2, 3]
console.log(person);   // Output: ["Alice", 30]

Arrays allow dynamic collections, while tuples enforce fixed-length structures 
with specific types.

## Objects and Interfaces

Objects store key-value pairs. Interfaces define the structure of objects for 
type safety.

objects_interfaces.ts
  

interface User {
    name: string;
    age: number;
}

let user: User = { name: "Bob", age: 25 };
console.log(user);  // Output: { name: "Bob", age: 25 }

Interfaces ensure objects adhere to predefined structures, improving code 
readability and maintainability.

## Enums

Enums define a set of named constants. They improve code readability by 
replacing magic numbers or strings.

enums.ts
  

enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
}

let currentStatus: Status = Status.Active;
console.log(currentStatus);  // Output: ACTIVE

Enums provide a structured way to manage constants, reducing errors and 
improving code clarity.

## Type Aliases

Type aliases create custom types for reuse. They simplify complex type 
definitions and improve code organization.

type_aliases.ts
  

type Point = {
    x: number;
    y: number;
};

let origin: Point = { x: 0, y: 0 };
console.log(origin);  // Output: { x: 0, y: 0 }

Type aliases make code more readable by abstracting complex type definitions 
into reusable components.

## Best Practices

- **Use const for Constants:** Prefer const for immutable values

- **Explicit Types:** Use explicit types for clarity in complex scenarios

- **Avoid var:** Prefer let and const over var

- **Type Inference:** Leverage type inference for simple cases

- **Interfaces for Objects:** Use interfaces to define object structures

## Source

[TypeScript Variables Documentation](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)

This tutorial covered TypeScript variables with practical examples. Implement 
these patterns to write safer, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).