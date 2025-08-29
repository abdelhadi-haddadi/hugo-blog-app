+++
title = "TypeScript Arrays"
date = 2025-08-29T20:14:25.986+01:00
draft = false
description = "TypeScript tutorial on arrays, covering their creation, manipulation, and common operations with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Arrays

last modified February 24, 2025

Arrays in TypeScript are used to store multiple values in a single variable.
They are similar to arrays in JavaScript but with the added benefit of type
safety. This article covers the creation, manipulation, and common operations
on TypeScript arrays with practical examples.

## What Are TypeScript Arrays?

TypeScript arrays are ordered collections of elements that can be of any type.
They can be declared using the Array&lt;T&gt; syntax or the
shorthand T[], where T is the type of elements in the
array.

## Creating Arrays

This example demonstrates how to create arrays in TypeScript.

creating_arrays.ts
  

let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: Array&lt;string&gt; = ["Apple", "Banana", "Cherry"];

console.log(numbers);  // Output: [1, 2, 3, 4, 5]
console.log(fruits);   // Output: ["Apple", "Banana", "Cherry"]

The numbers array is declared using the shorthand syntax, while the
fruits array is declared using the Array&lt;T&gt;
syntax. Both arrays are type-safe, ensuring that only elements of the specified
type can be added.

## Accessing Array Elements

This example demonstrates how to access elements in a TypeScript array.

accessing_elements.ts
  

let numbers: number[] = [1, 2, 3, 4, 5];

console.log(numbers[0]);  // Output: 1
console.log(numbers[2]);  // Output: 3

Array elements are accessed using their index. The first element is at index 0,
the second at index 1, and so on.

## Modifying Array Elements

This example demonstrates how to modify elements in a TypeScript array.

modifying_elements.ts
  

let numbers: number[] = [1, 2, 3, 4, 5];

numbers[1] = 10;  // Modify the second element
console.log(numbers);  // Output: [1, 10, 3, 4, 5]

Array elements can be modified by assigning a new value to a specific index.

## Array Methods

This example demonstrates common array methods in TypeScript.

array_methods.ts
  

let numbers: number[] = [1, 2, 3, 4, 5];

numbers.push(6);  // Add an element to the end
console.log(numbers);  // Output: [1, 2, 3, 4, 5, 6]

numbers.pop();  // Remove the last element
console.log(numbers);  // Output: [1, 2, 3, 4, 5]

numbers.shift();  // Remove the first element
console.log(numbers);  // Output: [2, 3, 4, 5]

numbers.unshift(1);  // Add an element to the beginning
console.log(numbers);  // Output: [1, 2, 3, 4, 5]

TypeScript arrays support common methods like push,
pop, shift, and unshift for adding and
removing elements.

## Iterating Over Arrays

This example demonstrates how to iterate over a TypeScript array.

iterating_arrays.ts
  

let fruits: string[] = ["Apple", "Banana", "Cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}
// Output:
// Apple
// Banana
// Cherry

The for...of loop is used to iterate over the elements of an array.
This is a clean and concise way to access each element.

## Multidimensional Arrays

This example demonstrates how to create and use multidimensional arrays in
TypeScript.

multidimensional_arrays.ts
  

let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let row of matrix) {
    for (let num of row) {
        console.log(num);
    }
}

Multidimensional arrays are arrays of arrays. They can be used to represent
matrices or grids.

## Best Practices for Using Arrays

- **Use Type Annotations:** Always specify the type of elements in an array to ensure type safety.

- **Prefer Immutable Operations:** Use methods like map, filter, and reduce to avoid mutating the original array.

- **Leverage Array Methods:** Use built-in array methods for common operations like adding, removing, and iterating over elements.

- **Handle Edge Cases:** Always check for edge cases like empty arrays or out-of-bounds access.

## Source

[TypeScript Arrays Documentation](https://www.typescriptlang.org/docs/handbook/arrays.html)

In this article, we have explored TypeScript arrays and demonstrated their usage
through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).