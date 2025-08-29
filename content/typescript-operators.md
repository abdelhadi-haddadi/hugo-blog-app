+++
title = "TypeScript Operators"
date = 2025-08-29T20:14:32.699+01:00
draft = false
description = "Comprehensive TypeScript operators tutorial covering arithmetic, comparison, logical, and advanced operators with practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Operators

last modified March 3, 2025

Operators in TypeScript are symbols used to perform operations on variables and
values. They include arithmetic, comparison, logical, and advanced operators.
This tutorial explores their usage with practical examples.

## Arithmetic Operators

Arithmetic operators perform mathematical operations like addition, subtraction,
multiplication, and division. TypeScript enforces type safety for numeric
operations.

arithmetic_operators.ts
  

let a: number = 10;
let b: number = 5;

console.log(a + b);  // Output: 15
console.log(a - b);  // Output: 5
console.log(a * b);  // Output: 50
console.log(a / b);  // Output: 2
console.log(a % b);  // Output: 0

The +, -, *, /, and
% operators perform basic arithmetic operations.

## Comparison Operators

Comparison operators compare two values and return a boolean result. They are
useful in conditional statements.

comparison_operators.ts
  

let x: number = 10;
let y: number = 20;

console.log(x == y);  // Output: false
console.log(x != y);  // Output: true
console.log(x &gt; y);   // Output: false
console.log(x &lt; y);   // Output: true
console.log(x &gt;= y);  // Output: false
console.log(x &lt;= y);  // Output: true

The ==, !=, &gt;, &lt;,
&gt;=, and &lt;= operators compare values.

## Logical Operators

Logical operators combine boolean values and return a boolean result. They are
used in conditional logic.

logical_operators.ts
  

let isTrue: boolean = true;
let isFalse: boolean = false;

console.log(isTrue &amp;&amp; isFalse);  // Output: false
console.log(isTrue || isFalse);  // Output: true
console.log(!isTrue);            // Output: false

The &amp;&amp;, ||, and ! operators perform
logical AND, OR, and NOT operations.

## Assignment Operators

Assignment operators assign values to variables. They can also perform
arithmetic operations during assignment.

assignment_operators.ts
  

let num: number = 10;

num += 5;  // num = num + 5
console.log(num);  // Output: 15

num -= 3;  // num = num - 3
console.log(num);  // Output: 12

num *= 2;  // num = num * 2
console.log(num);  // Output: 24

num /= 4;  // num = num / 4
console.log(num);  // Output: 6

The +=, -=, *=, and /=
operators combine arithmetic and assignment.

## Ternary Operator

The ternary operator is a shorthand for conditional statements. It evaluates a
condition and returns one of two values.

ternary_operator.ts
  

let age: number = 18;
let status: string = age &gt;= 18 ? "Adult" : "Minor";

console.log(status);  // Output: Adult

The ternary operator ? : simplifies conditional logic.

## Type Operators

TypeScript provides operators like typeof and instanceof
to check types at runtime.

type_operators.ts
  

let value: any = "TypeScript";

console.log(typeof value);  // Output: string

class Animal {}
let dog = new Animal();
console.log(dog instanceof Animal);  // Output: true

The typeof operator checks the type of a variable, while
instanceof checks if an object is an instance of a class.

## Bitwise Operators

Bitwise operators perform operations on binary representations of numbers.
They are rarely used in high-level programming.

bitwise_operators.ts
  

let a: number = 5;  // Binary: 0101
let b: number = 3;  // Binary: 0011

console.log(a &amp; b);  // Output: 1 (Binary: 0001)
console.log(a | b);  // Output: 7 (Binary: 0111)
console.log(a ^ b);  // Output: 6 (Binary: 0110)
console.log(~a);     // Output: -6 (Binary: 1010)

The &amp;, |, ^, and ~ operators
perform bitwise AND, OR, XOR, and NOT operations.

## Nullish Coalescing Operator

The nullish coalescing operator ?? returns the right-hand operand
if the left-hand operand is null or undefined.

nullish_coalescing.ts
  

let input: string | null = null;
let output: string = input ?? "Default Value";

console.log(output);  // Output: Default Value

The ?? operator is useful for providing default values.

## Optional Chaining Operator

The optional chaining operator ?. accesses properties of an object
without causing errors if the object is null or undefined.

optional_chaining.ts
  

let user = { name: "John", address: { city: "New York" } };

console.log(user.address?.city);  // Output: New York
console.log(user.contact?.phone);  // Output: undefined

The ?. operator prevents runtime errors when accessing nested
properties.

## Best Practices

- **Use Strict Equality:** Prefer === over ==

- **Avoid Bitwise Operators:** Use them only when necessary

- **Leverage Optional Chaining:** Simplify nested property access

- **Use Nullish Coalescing:** Provide default values safely

- **Type Safety:** Validate types before operations

## Source

[TypeScript Operators Documentation](https://www.typescriptlang.org/docs/handbook/operators.html)

This tutorial covered TypeScript operators with practical examples. Use these
operators to write efficient and type-safe code.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).