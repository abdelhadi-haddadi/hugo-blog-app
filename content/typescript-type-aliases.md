+++
title = "TypeScript Type Aliases"
date = 2025-08-29T20:14:34.972+01:00
draft = false
description = "TypeScript tutorial on type aliases, covering their creation, usage, and practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Type Aliases

last modified January 24, 2025

Type aliases in TypeScript allow you to create custom names for types, making
your code more readable and maintainable. They can be used to simplify complex
type definitions, create reusable types, and improve type safety. This tutorial
covers the creation, usage, and practical examples of type aliases in
TypeScript.

## What Are Type Aliases?

Type aliases are a way to give a name to a type. They are created using the
type keyword and can represent primitive types, object types, union
types, and more. Type aliases do not create new types but provide a convenient
way to refer to existing types.

## Basic Type Alias

This example demonstrates how to create a basic type alias for a primitive type.

basic_type_alias.ts
  

type Age = number;

let userAge: Age = 25;
console.log(userAge);  // Output: 25

The Age type alias is created for the number type.
This makes the code more readable and allows for easier changes if the type
needs to be updated.

## Object Type Alias

This example demonstrates how to create a type alias for an object type.

object_type_alias.ts
  

type User = {
    name: string;
    age: number;
    isActive: boolean;
};

let user: User = {
    name: "Alice",
    age: 30,
    isActive: true
};

console.log(user);  // Output: { name: "Alice", age: 30, isActive: true }

The User type alias is created for an object type with specific
properties. This makes it easier to define and reuse the structure of user
objects.

## Union Type Alias

This example demonstrates how to create a type alias for a union type.

union_type_alias.ts
  

type ID = string | number;

let userId: ID = "12345";
let productId: ID = 67890;

console.log(userId);    // Output: 12345
console.log(productId); // Output: 67890

The ID type alias is created for a union type that can be either a
string or a number. This allows for flexible type
definitions.

## Function Type Alias

This example demonstrates how to create a type alias for a function type.

function_type_alias.ts
  

type GreetFunction = (name: string) =&gt; string;

let greet: GreetFunction = (name) =&gt; {
    return `Hello, ${name}!`;
};

console.log(greet("Alice"));  // Output: Hello, Alice!

The GreetFunction type alias is created for a function type that
takes a string parameter and returns a string. This
makes it easier to define and use functions with the same signature.

## Tuple Type Alias

This example demonstrates how to create a type alias for a tuple type.

tuple_type_alias.ts
  

type Point = [number, number];

let coordinates: Point = [10, 20];
console.log(coordinates);  // Output: [10, 20]

The Point type alias is created for a tuple type that represents a
pair of numbers. This makes it easier to work with coordinate pairs or similar
data structures.

## Combining Type Aliases

This example demonstrates how to combine multiple type aliases to create complex types.

combining_type_aliases.ts
  

type ID = string | number;
type User = {
    id: ID;
    name: string;
    age: number;
};

let user: User = {
    id: "12345",
    name: "Alice",
    age: 30
};

console.log(user);  // Output: { id: "12345", name: "Alice", age: 30 }

The User type alias combines the ID type alias with
other properties to create a more complex type. This allows for reusable and
modular type definitions.

## Best Practices for Using Type Aliases

- **Use Descriptive Names:** Choose meaningful names for type aliases to improve code readability.

- **Reuse Common Types:** Create type aliases for commonly used types to avoid repetition.

- **Combine Types:** Use type aliases to combine and simplify complex type definitions.

- **Document Types:** Add comments or documentation to explain the purpose of custom type aliases.

## Source

[TypeScript Type Aliases Documentation](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)

In this article, we have explored TypeScript type aliases and demonstrated their
usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).