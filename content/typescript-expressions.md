+++
title = "TypeScript Expressions"
date = 2025-08-29T20:14:28.205+01:00
draft = false
description = "Comprehensive TypeScript expressions tutorial covering syntax, type annotations, and practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Expressions

last modified March 3, 2025

Expressions in TypeScript are combinations of values, variables, operators, and 
functions that evaluate to a single value. TypeScript enhances JavaScript 
expressions by adding type annotations and type safety. This tutorial explores 
various expressions with practical examples.

## Basic Arithmetic Expressions

TypeScript supports arithmetic expressions with type safety. This example 
demonstrates basic arithmetic operations.

arithmetic.ts
  

const sum: number = 10 + 5;
const difference: number = 10 - 5;
const product: number = 10 * 5;
const quotient: number = 10 / 5;

console.log(sum);        // Output: 15
console.log(difference); // Output: 5
console.log(product);    // Output: 50
console.log(quotient);   // Output: 2

TypeScript ensures that arithmetic operations are performed on numbers, 
preventing type-related errors.

## String Concatenation

String concatenation combines strings using the + operator. 
TypeScript enforces string types.

string_concat.ts
  

const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = firstName + " " + lastName;

console.log(fullName);  // Output: John Doe

## Logical Expressions

Logical expressions evaluate to boolean values. TypeScript ensures type safety 
for logical operations.

logical.ts
  

const isAdult: boolean = true;
const hasLicense: boolean = false;
const canDrive: boolean = isAdult &amp;&amp; hasLicense;

console.log(canDrive);  // Output: false

## Ternary Operator

The ternary operator provides a concise way to write conditional expressions.

ternary.ts
  

const age: number = 20;
const status: string = age &gt;= 18 ? "Adult" : "Minor";

console.log(status);  // Output: Adult

## Template Literals

Template literals allow embedding expressions within strings using backticks.

template_literals.ts
  

const name: string = "Alice";
const greeting: string = `Hello, ${name}!`;

console.log(greeting);  // Output: Hello, Alice!

## Array Expressions

Arrays can be initialized and manipulated using expressions. TypeScript ensures 
type safety for array elements.

array.ts
  

const numbers: number[] = [1, 2, 3, 4, 5];
const doubled: number[] = numbers.map(num =&gt; num * 2);

console.log(doubled);  // Output: [2, 4, 6, 8, 10]

## Object Expressions

Objects can be created and manipulated using expressions. TypeScript enforces 
property types.

object.ts
  

const person: { name: string, age: number } = {
    name: "Bob",
    age: 30
};

console.log(person.name);  // Output: Bob

## Function Expressions

Functions can be used as expressions. TypeScript ensures type safety for 
parameters and return values.

function_expression.ts
  

const add: (a: number, b: number) =&gt; number = function(a, b) {
    return a + b;
};

console.log(add(5, 10));  // Output: 15

## Type Assertions

Type assertions allow overriding TypeScript's inferred type. Use them cautiously.

type_assertion.ts
  

const input: unknown = "123";
const numberValue: number = (input as string).length;

console.log(numberValue);  // Output: 3

## Best Practices

- **Type Safety:** Always use type annotations for clarity

- **Readability:** Write expressions that are easy to understand

- **Avoid Type Assertions:** Use them only when necessary

- **Consistency:** Follow consistent coding patterns

- **Testing:** Validate expressions with unit tests

## Source

[TypeScript Expressions Documentation](https://www.typescriptlang.org/docs/handbook/expressions.html)

This tutorial covered TypeScript expressions with practical examples. Implement 
these patterns to write safer, more maintainable code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).