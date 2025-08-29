+++
title = "TypeScript Tuples"
date = 2025-08-29T20:14:33.838+01:00
draft = false
description = "Comprehensive TypeScript tuples tutorial covering syntax, type annotations, and practical coding examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Tuples

last modified March 3, 2025

Tuples in TypeScript are fixed-length arrays with elements of specific types.
They allow you to define an array where the type of each element is known.
This tutorial explores tuple syntax, type annotations, and practical examples.

## Basic Tuple Syntax

A tuple is defined by specifying the types of its elements in square brackets.
This example shows a simple tuple with a string and a number.

basic_tuple.ts
  

let user: [string, number] = ["Alice", 25];

console.log(user[0]);  // Output: Alice
console.log(user[1]);  // Output: 25

The user tuple contains a string and a number. TypeScript enforces
the types and order of elements.

## Accessing Tuple Elements

Tuple elements are accessed using indices, similar to arrays. TypeScript ensures
type safety when accessing elements.

access_tuple.ts
  

let point: [number, number] = [10, 20];

let x = point[0];
let y = point[1];

console.log(`X: ${x}, Y: ${y}`);  // Output: X: 10, Y: 20

## Modifying Tuple Elements

Tuple elements can be modified, but the new value must match the element type.
This example updates a tuple element.

modify_tuple.ts
  

let person: [string, number] = ["Bob", 30];

person[1] = 35;

console.log(person);  // Output: ["Bob", 35]

## Tuple with Optional Elements

Tuples can have optional elements using the ? symbol. Optional
elements must follow required elements.

optional_tuple.ts
  

let employee: [string, number, string?] = ["John", 40];

employee[2] = "Manager";

console.log(employee);  // Output: ["John", 40, "Manager"]

## Tuple with Rest Elements

Tuples can include rest elements to capture additional values. The rest element
must be of a specific type.

rest_tuple.ts
  

let scores: [string, ...number[]] = ["Math", 85, 90, 95];

console.log(scores);  // Output: ["Math", 85, 90, 95]

## Tuple as Function Return Type

Functions can return tuples to group multiple values. This example returns a
tuple with a string and a number.

return_tuple.ts
  

function getUser(): [string, number] {
    return ["Alice", 25];
}

let [name, age] = getUser();

console.log(`Name: ${name}, Age: ${age}`);  // Output: Name: Alice, Age: 25

## Tuple with Readonly Elements

Tuples can have readonly elements to prevent modification. This example uses
the readonly modifier.

readonly_tuple.ts
  

let config: readonly [string, number] = ["localhost", 8080];

// config[1] = 3000;  // Error: Cannot assign to '1' because it is a read-only property.

console.log(config);  // Output: ["localhost", 8080]

## Tuple with Mixed Types

Tuples can contain elements of different types. This example mixes string,
number, and boolean types.

mixed_tuple.ts
  

let data: [string, number, boolean] = ["Alice", 25, true];

console.log(data);  // Output: ["Alice", 25, true]

## Tuple with Default Values

Tuples can be initialized with default values. This example sets default
values for a tuple.

default_tuple.ts
  

let settings: [string, number] = ["localhost", 8080];

console.log(settings);  // Output: ["localhost", 8080]

## Tuple with Destructuring

Tuples can be destructured into individual variables. This example extracts
tuple elements into separate variables.

destructure_tuple.ts
  

let point: [number, number] = [10, 20];

let [x, y] = point;

console.log(`X: ${x}, Y: ${y}`);  // Output: X: 10, Y: 20

## Best Practices

- **Use Tuples Sparingly:** Prefer objects for complex data.

- **Type Safety:** Ensure tuple elements match their types.

- **Readonly Tuples:** Use readonly for immutable data.

- **Destructuring:** Simplify tuple access with destructuring.

- **Documentation:** Document tuple usage for clarity.

## Source

[TypeScript Tuples Documentation](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

This tutorial covered TypeScript tuples with practical examples. Use tuples to
group fixed-length, typed data effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).